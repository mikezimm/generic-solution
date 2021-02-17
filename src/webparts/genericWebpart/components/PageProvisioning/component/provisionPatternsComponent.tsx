import * as React from 'react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';

import {
    MessageBar,
    MessageBarType,
    SearchBox,
    Icon,
    Label,
    Pivot,
    PivotItem,
    PivotLinkFormat,
    PivotLinkSize,
    Dropdown,
    IDropdownOption,
  } from "office-ui-fabric-react";

import { sp } from "@pnp/sp";
import { Web, Lists } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState } from "@pnp/sp/clientside-pages";

import { getExpandColumns, getSelectColumns, IZBasicList, IPerformanceSettings, createFetchList, } from '@mikezimm/npmfunctions/dist/getFunctions';

import { IPickedList, IPickedWebBasic, IMyPivots, IPivot,  ILink, IUser, IMyIcons, IMyFonts, IChartSeries, ICharNote } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import { provisionThePage, IValidTemplate, provisionTestPage, provisionDrilldownPage } from './provisionWebPartPages';
import { IListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list
import { defineDrilldownPage } from '../DrilldownPages/defineThisPage';

import { IGenericWebpartProps } from '../../IGenericWebpartProps';
import { IGenericWebpartState } from '../../IGenericWebpartState';
import styles from './provisionPage.module.scss';
import stylesC from '../../Contents/contents.module.scss';

import { IMyProgress, } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { PageContext } from '@microsoft/sp-page-context';

import * as strings from 'GenericWebpartWebPartStrings';

import * as links from '../../HelpInfo/AllLinks';

import { IMakeThisPage } from './provisionWebPartPages';

import { getHelpfullError, } from '@mikezimm/npmfunctions/dist/ErrorHandler';

import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../../../../services/createAnalytics';

import { getRandomInt } from '../../ListProvisioning/ListsTMT/ItemsWebPart';

import {  getAllItems, ISitePagesList, IPatternItemInfo } from './GetPatternPages';

import MyPatternsList from './patternsListView';

import MyLogList from './listView';

export interface IProvisionPatternsProps {
    // 0 - Context
    
    pageContext: PageContext;

    // 1 - Analytics options
    useListAnalytics: boolean;
    analyticsWeb: string;
    analyticsList: string;
    tenant: string;
    urlVars: {};

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning pages on other sites.
    alwaysReadOnly?: boolean;  // default is to be false so you can update at least local lists

    pickedWeb : IPickedWebBasic;
    webURL: string;
    showPane: boolean;
    allLoaded: boolean;

    currentUser: IUser;

}

export interface IMyHistory {
    count: number;
    errors: IMyProgress[];
    columns: IMyProgress[];
    views: IMyProgress[];
    items: IMyProgress[];
}

export interface IFetchListInfo {
    fetchList: ISitePagesList;
    selectedDropdowns: string[]; //array of selected choices for dropdowns
}

export type IPageProvisionPivots =  'Select' | 'Que' | 'Copy';

export interface IProvisionPatternsState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning pages on other sites.
    alwaysReadOnly?: boolean;  // default is to be false so you can update at least local pages

    allLoaded: boolean;

    webURL: string;

    progress: IMyProgress;
    history: IMyHistory;

    currentPage: string;

    mode: IPageProvisionPivots;
    
    // 2 - Source and destination list information
    allItems: IPatternItemInfo[];
    searchedItems: IPatternItemInfo[];
    searchCount: number;
    errMessage: string;
    searchText: string;
    searchMeta: string[];
    quedIds: string[];
    quedPages: IPatternItemInfo[];
    quedSolutions: string[];

    fetchList: ISitePagesList;

    stateError: any[];

    selectedDropdowns: string[]; //array of selected choices for dropdowns
    dropDownItems: IDropdownOption[][]; //array of array of options for selected dropdown fields
    dropdownColumnIndex: number;

    lastStateChange: string;
    stateChangeLog: string[];

}


export const pivCats = {
    visible: {title: 'Select', desc: '', order: 1},
    hidden: {title: 'Que', desc: '', order: 100},
    text: {title: 'Copy', desc: '', order: 1},

};

export default class ProvisionPatterns extends React.Component<IProvisionPatternsProps, IProvisionPatternsState> {

    private dropDownColumns: string[] = ['Features','Topic'];

    private clearHistory() {
        let history: IMyHistory = {
            count: 0,
            errors: [],
            columns: [],
            views: [],
            items: [],
        };
        return history;

    }

    private createRandom(str: string, webURL: string) {

        let rightNow = new Date();
        let todayTime = rightNow.getTime() ;
        let title =  str + ' - ' + getRandomInt(1,1000);

        let makeThisPage:  IMakeThisPage = {
            title: title,
            name: title,
            webURL: webURL,
            pageLayout: 'Article',
            onCurrentSite: true,
            webExists: true,
            pageExists: false,
            pageExistedB4: false,
        };

        return makeThisPage;

    }

    private buildFetchList() {

        //Copied from GridCharts for createFetchList
        let allColumns : string[] = ["File/ServerRelativeUrl"];

        let searchColumns : string[] = ['Title'];
        let metaColumns : string[] = [];
        let expandDates : string[] = [];
        let selectedDropdowns: string[] = [];
        //allColumns.push( this.props.dateColumn );
        //allColumns.push( this.props.valueColumn );

        searchColumns.map( c => { allColumns.push( c ) ; });
        metaColumns.map( c => { allColumns.push( c ) ; });

        let dropDownSort : string[] = this.dropDownColumns.map( c => { let c1 = c.replace('>','') ; if ( c1.indexOf('-') === 0 ) { return 'dec' ; } else if ( c1.indexOf('+') === 0 ) { return 'asc' ; } else { return ''; } });

        this.dropDownColumns.map( c => { let c1 = c.replace('>','').replace('+','').replace('-','') ; searchColumns.push( c1 ) ; metaColumns.push( c1 ) ; allColumns.push( c1 ); selectedDropdowns.push('') ; });

        let performance : IPerformanceSettings = {
            fetchCount: 1000,
            fetchCountMobile: 1000,
            minDataDownload: false,
            restFilter: '',
        };
        let isLibrary = true ;
        let basicList : IZBasicList = createFetchList( this.props.tenant + strings.patternsWeb, null, 'Site Pages', 'SitePages', isLibrary, performance, this.props.pageContext, allColumns, searchColumns, metaColumns, expandDates );
        //Have to do this to add dropDownColumns and dropDownSort to IZBasicList
        let tempList : any = basicList;
        tempList.dropDownColumns = this.dropDownColumns;
        tempList.dropDownSort = dropDownSort;
        let fetchList : ISitePagesList = tempList;

        return { fetchList: fetchList, selectedDropdowns: selectedDropdowns, };
    }
    /***
     *          .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
     *         d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
     *         8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
     *         8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
     *         Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
     *          `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
     *                                                                                                       
     *                                                                                                       
     */

    public constructor(props:IProvisionPatternsProps){
        super(props);

        let TargetSite = this.props.webURL && this.props.webURL.length > 0 ? this.props.webURL : '';

        let fetchInfo : IFetchListInfo = this.buildFetchList();
        
        //saveAnalytics (analyticsWeb, analyticsList, serverRelativeUrl, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, richText ) {
        saveAnalytics( this.props.analyticsWeb, this.props.analyticsList, //analyticsWeb, analyticsList,
            '', '',//serverRelativeUrl, webTitle, PageURL,
            'Provision Patterns', TargetSite, null, //saveTitle, TargetSite, TargetList
            'Pages', 'Constructor', 'Loading', //itemInfo1, itemInfo2, result, 
            '' ); //richText

        this.state = { 

            allowOtherSites: this.props.allowOtherSites === true ? true : false,
            alwaysReadOnly: this.props.alwaysReadOnly === true ? true : false,
            currentPage: 'Click Button to start',
            allLoaded: this.props.allLoaded,
            progress: null,
            history: this.clearHistory(),

            webURL: this.props.webURL,

            allItems: [],
            searchedItems: [],
            searchCount: 0,
            errMessage: '',
            searchText: '',
            searchMeta: [],
            quedPages: [],
            quedSolutions:[],
            quedIds: [],

            mode: 'Select',
            fetchList: fetchInfo.fetchList,

            stateError: [],

            dropdownColumnIndex: null,

            selectedDropdowns: fetchInfo.selectedDropdowns,

            dropDownItems: [],

            lastStateChange: 'Contructor',
            stateChangeLog: ['Contructor'],

        };

        // because our event handler needs access to the component, bind 
        //  the component to the function so it can get access to the
        //  components properties (this.props)... otherwise "this" is undefined
        //  If you do not do this here, then you need to pass the entire function.bind(this) to functions.
        // this.onLinkClick = this.onLinkClick.bind(this);
        this.addTheseItemsToState = this.addTheseItemsToState.bind(this);
        this.setProgress =this.setProgress.bind(this);
        this.markComplete =this.markComplete.bind(this);
        
    }

    public componentDidMount() {

        console.log('fetchList componentDidMount:', this.state.fetchList );
        getAllItems( this.state.fetchList, this.addTheseItemsToState, this.setProgress, this.markComplete );
        
    }

  /***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *                                                                                         
 *                                                                                         
 */

  public componentDidUpdate(prevProps){

    if ( prevProps.webURL != this.props.webURL ) {

        let fetchInfo : IFetchListInfo = this.buildFetchList();

        console.log('fetchList componentDidMount:', fetchInfo );
        this.setState({ fetchList: fetchInfo.fetchList, selectedDropdowns: fetchInfo.selectedDropdowns, });
        getAllItems( fetchInfo.fetchList, this.addTheseItemsToState, this.setProgress, this.markComplete );

    }

  }

/***
 *         d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *         88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *         88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *         88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *         88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *         88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                          
 *                                                          
 */

    public render(): React.ReactElement<IProvisionPatternsProps> {


        
        if ( this.state.stateError.length > 0 ) {

            return (
                <div className={ styles.infoPane }>
                    { this.state.stateError.map( e => { return <div>{e}</div> ; }) }
                </div>
            );
        
        } else if ( this.state.allItems && this.state.allItems.length > 0 ) {



/***
 *              d888888b db   db d888888b .d8888.      d8888b.  .d8b.   d888b  d88888b 
 *              `~~88~~' 88   88   `88'   88'  YP      88  `8D d8' `8b 88' Y8b 88'     
 *                 88    88ooo88    88    `8bo.        88oodD' 88ooo88 88      88ooooo 
 *                 88    88~~~88    88      `Y8b.      88~~~   88~~~88 88  ooo 88~~~~~ 
 *                 88    88   88   .88.   db   8D      88      88   88 88. ~8~ 88.     
 *                 YP    YP   YP Y888888P `8888Y'      88      YP   YP  Y888P  Y88888P 
 *                                                                                     
 *                                                                                     
 */


            let thisPage = null;
            let stringsError = <tr><td>  </td><td>  </td><td>  </td></tr>;

            let provisionButtons = <div style={{ paddingTop: '20px' }}><ButtonCompound buttons={ [] } horizontal={true}/></div>;

            const stackProvisionTokens: IStackTokens = { childrenGap: 70 };

            let provisionButtonRow = <Stack horizontal={true} wrap={true} horizontalAlign={"start"} verticalAlign= {"center"} tokens={stackProvisionTokens}>{/* Stack for Buttons and Fields */}
                    { provisionButtons }
                    {  }
                </Stack>;

            const stackPageTokens: IStackTokens = { childrenGap: 10 };
            if ( this.state.mode === 'Select') {

                let patternList = <MyPatternsList 
                    quePage= { ( q : any ) => this._quePage( q, 'Testing') }
                    quedIds= { this.state.quedIds }
                    title={ 'Available Patterns'}           items={ this.state.searchedItems }
                    descending={false}          titles={null}            ></MyPatternsList>;

                let quedList = <MyPatternsList 
                    quePage= { ( q : any ) => this._quePage( q, 'Testing2') }
                    quedIds= { this.state.quedIds }
                    title={ 'Qued Patterns'}           items={ this.state.quedPages }
                    descending={false}          titles={null}            ></MyPatternsList>;

                thisPage = <div>
                    <div> { provisionButtonRow } </div>
                    <div style={{ height:30} }> {  } </div>
                    <div> {  } </div>
                    <div> <h2>{ this.state.currentPage }</h2> </div>
                    <div>
                    <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Fields */}
                        { patternList }
                        { quedList }  
                    </Stack>
                    </div>

                </div>;
            } else {

                let myProgress = this.state.progress == null ? null : <ProgressIndicator 
                label={this.state.progress.label} 
                description={this.state.progress.description} 
                percentComplete={this.state.progress.percentComplete} 
                progressHidden={this.state.progress.progressHidden}/>;

                let errorList = <MyLogList 
                    title={ 'Errors'}           items={ this.state.history.errors }
                    descending={false}          titles={null}            ></MyLogList>;

                let copiedList = <MyLogList 
                    title={ 'Copied'}           items={ this.state.history.columns }
                    descending={false}          titles={null}            ></MyLogList>;

                thisPage = <div>
                    <div> { provisionButtonRow } </div>
                    <div style={{ height:30} }> {  } </div>
                    <div> { myProgress } </div>
                    <div> <h2>{ this.state.currentPage }</h2> </div>
                    <div>
                    <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Fields */}
                        { errorList }
                        { copiedList }  
                    </Stack>
                    </div>

                </div>;
            }

            let disclaimers = <div>
                <h3>Next Steps</h3>
                <ul>
                    <li>Build typed objects for specific webparts and page layouts</li>
                </ul>
            </div>;

            let searchBox =           
                <div className={[stylesC.searchContainer, stylesC.padLeft20 ].join(' ')} >
                    <SearchBox
                        className={stylesC.searchBox}
                        styles={{ root: { maxWidth: 300 } }}
                        placeholder="Search"
                        //onSearch={ this._textSearch.bind(this) }
                        //onChange={ this._textSearch.bind(this) }
                        onSearch={ ( t ) => this._textSearch( t, this.state.mode) }
                        onChange={ ( t ) => this._textSearch( t, this.state.mode) }
                        //onFocus={ () => console.log('this.state',  this.state) }
                        //onBlur={ () => console.log('onBlur called') }
                    />
                    <div className={stylesC.searchStatus}>
                        { 'Searching about ' + this.state.searchCount + ' pages' }
                        { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
                    </div>
                </div>;


            let pageHeader = <div>
                { disclaimers }
                { searchBox }
            </div>;

/***
 *              d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *              88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *              88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *              88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *              88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *              88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                                 
 *                                                                 
 */

            return (
                <div className={ styles.infoPane }>
                    { pageHeader }
                    { thisPage }
                </div>
            );
            
        } else {
            console.log('provisionPage.tsx return null');
            return (  <div className={ styles.infoPane }>
                <h2>There are no pages to provision</h2>
            </div> );
        }

    }   //End Public Render


  private isPageReadOnly (mapThisPage) {

    let readOnly = true;
    if ( this.state.alwaysReadOnly === false ) {                //First test, only allow updates if the state is explicitly set so alwaysReadOnly === false
        if (mapThisPage.onCurrentSite === true ) {
            readOnly = false;                                   //If page is on current site, then allow writing (readonly = false)
        } else if ( this.state.allowOtherSites === true ) {
            readOnly = false;                                   //Else If you explicitly tell it to allowOtherSites, then allow writing (readonly = false)
        }
    }

    return readOnly;

  }

  private markComplete() {

    this.setState({
        currentPage: 'Finished ' + this.state.currentPage,
    });

  }

   /**
    * 
    * @param progressHidden 
    * @param page : page you want to add this to 'E' | 'C' | 'V' | 'I'
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in page
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
    */
  private setProgress(progressHidden: boolean, page: 'E' | 'C' | 'V' | 'I', current: number , ofThese: number, color: string, icon: string, logLabel: string, label: string, description: string, ref: string = null ){
    let thisTime = new Date().toLocaleTimeString();
    const percentComplete = ofThese !== 0 ? current/ofThese : 0;

    logLabel = current > 0 ? current + '/' + ofThese + ' - ' + logLabel : logLabel ;
    let progress: IMyProgress = {
        ref: ref,
        time: thisTime,
        logLabel: logLabel,
        label: label + '- at ' + thisTime,
        description: description,
        percentComplete: percentComplete,
        progressHidden: progressHidden,
        color: color,
        icon: icon,
      };

    //console.log('setting Progress:', progress);

    let history: IMyHistory = this.state.history;
    //let newHistory = null;
    

    if ( history === null ){

    } else {
        history.count ++;
        if ( page === 'E') {
            history.errors = history.errors.length === 0 ? [progress] : [progress].concat(history.errors);
        } else if ( page === 'C') {
            history.columns = history.columns.length === 0 ? [progress] : [progress].concat(history.columns);
        } else if ( page === 'V') {
            history.views = history.views.length === 0 ? [progress] : [progress].concat(history.views);
        } else if ( page === 'I') {
            history.items = history.items.length === 0 ? [progress] : [progress].concat(history.items);
        }
    }

    this.setState({
        progress: progress,
        history: history,
    });

  }

    private _quePage( q, test ) {
        let Id = q.currentTarget.parentElement.id;

        console.log('_quePage', Id, q, test );

        let quedIds: string[] = this.state.quedIds;
        quedIds.push(Id);

        let quedPages = this.state.quedPages;
        quedPages.push( this.state.allItems[Id]);

        console.log('quedIds', quedIds, quedPages );

        this.setState({
            quedIds: quedIds,
            quedPages: quedPages,
        });

    }   
  


    /***
     *    .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db      d88888b  .d88b.  d8888b.      d888888b d888888b d88888b .88b  d88. .d8888. 
     *    88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88      88'     .8P  Y8. 88  `8D        `88'   `~~88~~' 88'     88'YbdP`88 88'  YP 
     *    `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88      88ooo   88    88 88oobY'         88       88    88ooooo 88  88  88 `8bo.   
     *      `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88      88~~~   88    88 88`8b           88       88    88~~~~~ 88  88  88   `Y8b. 
     *    db   8D 88.     88   88 88 `88. Y8b  d8 88   88      88      `8b  d8' 88 `88.        .88.      88    88.     88  88  88 db   8D 
     *    `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP      YP       `Y88P'  88   YD      Y888888P    YP    Y88888P YP  YP  YP `8888Y' 
     *                                                                                                                                    
     *                                                                                                                                    
     */

    /**
     * Based on PivotTiles.tsx
     * @param item
     */
    private _textSearch = ( searchText: string, what: string ): void => {
        console.log('_textSearch: searchText, what: ', searchText, what );
        this.fullSearch( null, searchText );

    }

    public searchForItems = (item, choiceSliderDropdown: number, ev: any): void => {

        let choiceSliderValue = null;  //choiceSliderValue

        if ( ev.ctrlKey === true ) { 
        } else if ( ev.altKey === true ) { 
        }

        this.state.dropDownItems[choiceSliderDropdown].map( ( dd, ddIndex ) => {
        if ( dd.text === item ) { choiceSliderValue = ddIndex ; }
        });

        //this.setState({      });  //This was to sync sliders and dropdowns in GridCharts

        console.log('searchForItems: ',item, choiceSliderDropdown, choiceSliderValue, ev ) ;
        this.fullSearch( item, null );

    }

    public fullSearch = (item: any, searchText: string , ): void => {

        //This sends back the correct pivot category which matches the category on the tile.
        let e: any = event;

        /*
        console.log('searchForItems: e',e);
        console.log('searchForItems: item', item);
        console.log('searchForItems: this', this);


    
    if ( currentTimeScale === 'Weeks' ) { this.setState({ sliderValueWeek: newValue, }) ; }
    else if ( currentTimeScale === 'Years' ) { this.setState({ sliderValueYear: newValue, }) ; }
    else if ( currentTimeScale === 'Months' ) { this.setState({ sliderValueMonth: newValue, }) ; }
    else if ( currentTimeScale === 'WeekNo' ) { this.setState({ sliderValueWeekNo: newValue, }) ; }
        */

        let searchItems : IPatternItemInfo[] = [];
        let newFilteredItems: IPatternItemInfo[]  = [];

        searchItems =this.state.allItems;

        let searchCount = searchItems.length;

        let selectedDropdowns = this.state.selectedDropdowns;
        let dropDownItems = this.state.dropDownItems;
        let dropdownColumnIndex = null; //Index of dropdown column that was picked

        if ( searchText === null ) { //Then this is a choice dropdown filter

        dropDownItems.map ( ( thisDropDown, ddIndex ) => {
            thisDropDown.map( thisChoice => {
            if ( dropdownColumnIndex === null && thisChoice.text === item ) { dropdownColumnIndex = ddIndex ; thisChoice.isSelected = true ; }  else { thisChoice.isSelected = false;} 
            });
        });

        selectedDropdowns.map( (dd, index ) => {
            if ( dropdownColumnIndex !== null ) {  //This should never be null but just in case... 
            selectedDropdowns[index] = dropdownColumnIndex === index ? item : ''; 
            }
        });

        if ( item === '' ) {
            newFilteredItems = searchItems;
        } else {
            for (let thisItem of searchItems) {
            let searchChoices = thisItem.meta ;
            if(searchChoices.indexOf( item ) > -1) {
                //console.log('fileName', fileName);
                newFilteredItems.push(thisItem);
            }
            }
        }
        } else { //This is a text box filter

        //Clears the selectedDropdowns array
        selectedDropdowns.map( (dd, index ) => {
            selectedDropdowns[index] = ''; 
        });

        //Sets isSelected on all dropdown options to false
        dropDownItems.map ( ( thisDropDown ) => {
            thisDropDown.map( thisChoice => {
            thisChoice.isSelected = false;
            });
        });

        if ( searchText == null || searchText === '' ) {
            newFilteredItems = searchItems;
        } else {
            let searchTextLC = searchText.toLowerCase();
            for (let thisItem of searchItems) {
            if(thisItem.searchString.indexOf( searchTextLC ) > -1) {
                newFilteredItems.push(thisItem);
            }
            }
        }
        }

        searchCount = newFilteredItems.length;

        let lastStateChange = 'searchForItems: ' + item;
        let stateChangeLog : string[] = this.state.stateChangeLog;
        stateChangeLog.push(lastStateChange);

        this.setState({
        /*          */
            searchedItems: newFilteredItems, //newFilteredItems,  //Replaced with theseItems to update when props change.
            searchCount: newFilteredItems.length,
            searchText: searchText,
            searchMeta: [],
            dropDownItems: dropDownItems,
            selectedDropdowns: selectedDropdowns,
            dropdownColumnIndex: dropdownColumnIndex,
            allLoaded: true,
            lastStateChange: lastStateChange,
            stateChangeLog: stateChangeLog,

        });

        return ;
        
    }


/***
 *         db    db d8888b. d8888b.  .d8b.  d888888b d88888b      .d8888. d888888b  .d8b.  d888888b d88888b 
 *         88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
 *         88    88 88oodD' 88   88 88ooo88    88    88ooooo      `8bo.      88    88ooo88    88    88ooooo 
 *         88    88 88~~~   88   88 88~~~88    88    88~~~~~        `Y8b.    88    88~~~88    88    88~~~~~ 
 *         88b  d88 88      88  .8D 88   88    88    88.          db   8D    88    88   88    88    88.     
 *         ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      `8888Y'    YP    YP   YP    YP    Y88888P 
 *                                                                                                          
 *                                                                                                          
 */

    private _updateStateOnPropsChange(doThis: 'props' | 'state' ): void {


    }

    private checkThisWeb(index: number, testPages : IMakeThisPage[] ){
        const thisWeb = Web(testPages[index].webURL);
        testPages[index].webExists = false;
        testPages[index].pageExists = false;

        /*
        thisWeb.pages.get().then((response) => {
            testPages[index].webExists = true;
            this.checkThisPage(index, testPages, thisWeb);

        }).catch((e) => {
            let errMessage = getHelpfullError(e, true, true);
            console.log('checkThisWeb', errMessage);
            this.updateStatePages(index, testPages);
        });
    */

    }

    
  /***
 *     .d8b.  d8888b. d8888b.      d888888b d888888b d88888b .88b  d88. .d8888.      d888888b  .d88b.       .d8888. d888888b  .d8b.  d888888b d88888b 
 *    d8' `8b 88  `8D 88  `8D        `88'   `~~88~~' 88'     88'YbdP`88 88'  YP      `~~88~~' .8P  Y8.      88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
 *    88ooo88 88   88 88   88         88       88    88ooooo 88  88  88 `8bo.           88    88    88      `8bo.      88    88ooo88    88    88ooooo 
 *    88~~~88 88   88 88   88         88       88    88~~~~~ 88  88  88   `Y8b.         88    88    88        `Y8b.    88    88~~~88    88    88~~~~~ 
 *    88   88 88  .8D 88  .8D        .88.      88    88.     88  88  88 db   8D         88    `8b  d8'      db   8D    88    88   88    88    88.     
 *    YP   YP Y8888D' Y8888D'      Y888888P    YP    Y88888P YP  YP  YP `8888Y'         YP     `Y88P'       `8888Y'    YP    YP   YP    YP    Y88888P 
 *                                                                                                                                                    
 *                                                                                                                                                    
 */


    private addTheseItemsToState( fetchList: ISitePagesList, theseItems: IPatternItemInfo[] , errMessage : string, allNewData : boolean = true ) {

        if ( errMessage !== '') {
            let stateError : any[] = [];

            stateError.push( <div style={{ padding: '15px', background: 'yellow' }}> <span style={{ fontSize: 'larger', fontWeight: 600 }}>Had some issues getting Pattern Pages</span> </div>);
            this.dropDownColumns.map( ddc => {
                if ( errMessage.indexOf( '\'' + ddc + '\'') > -1 ) { 
                    stateError.push( <div style={{ padding: '15px', background: 'yellow' }}> <span style={{ fontSize: 'larger', fontWeight: 500 }}>Make sure { <em>ddc</em> } column is on the SitePages library</span> </div>);
                }
            });
            if ( errMessage.indexOf( 'Failed to fetch') > -1 ) { 
                stateError.push( <div style={{ padding: '15px', background: 'yellow' }}> <span style={{ fontSize: 'larger', fontWeight: 500 }}>Does your Patterns site exist? { this.props.tenant + strings.patternsWeb } </span></div>);
            }
            stateError.push( <div style={{ paddingLeft: '25px', paddingBottom: '30px', background: 'yellow' }}> <span style={{ fontSize: 'large', color: 'red'}}> { errMessage }</span> </div>);
    
            this.setState({ stateError: stateError });

        } else {

            //Only use pages where Topic !== Hide
            let showItems : IPatternItemInfo[] = [];
            theseItems.map( item => {
                if ( item.Topic !== 'Hide' && item.Topic.indexOf('Hide') < 0 ) { showItems.push(item) ; }
            });

            if ( showItems.length < 300 ) {
                console.log('addTheseItemsToState showItems: ', showItems);
            } {
                console.log('addTheseItemsToState showItems: QTY: ', showItems.length );
            }
        
            let allItems = allNewData === false ? this.state.allItems : showItems;
        
            let dropDownItems : IDropdownOption[][] = allNewData === true ? this.buildDataDropdownItems( fetchList, allItems ) : this.state.dropDownItems ;
        
            this.setState({
            /*          */
                allItems: allItems,
                searchedItems: allItems, //newFilteredItems,  //Replaced with showItems to update when props change.
                searchCount: allItems.length,
                errMessage: errMessage,
                searchText: '',
                searchMeta: [],
                fetchList: fetchList,
                allLoaded: true,
                dropDownItems: dropDownItems,
        
            });
        
            console.log('loadedState:', this.state );
            //This is required so that the old list items are removed and it's re-rendered.
            //If you do not re-run it, the old list items will remain and new results get added to the list.
            //However the list will show correctly if you click on a pivot.
            //this.searchForItems( '', this.state.searchMeta, 0, 'meta' );
            return true;


        }


    }


    private buildDataDropdownItems( fetchList: ISitePagesList, allItems : IPatternItemInfo[] ) {

        let dropDownItems : IDropdownOption[][] = [];

        this.dropDownColumns.map( ( col, colIndex ) => {

        let actualColName = col.replace('>', '' ).replace('+', '' ).replace('-', '' );
        let parentColName = colIndex > 0 && col.indexOf('>') > -1 ? this.dropDownColumns[colIndex - 1] : null;
        parentColName = parentColName !== null ? parentColName.replace('>', '' ).replace('+', '' ).replace('-', '' ) : null;

        let thisColumnChoices : IDropdownOption[] = [];
        let foundChoices : string[] = [];
        allItems.map( item => {
            let thisItemsChoices = item[ actualColName ];
            if ( actualColName.indexOf( '/') > -1 ) {
            let parts = actualColName.split('/');
            thisItemsChoices = item[ parts[0] ] ? item[ parts[0] ] [parts[1]] :  `. missing ${ parts[0] }`;
            }
            if ( parentColName !== null ) { thisItemsChoices = item[ parentColName ] + ' > ' + item[ actualColName ] ; }
            if ( thisItemsChoices && thisItemsChoices.length > 0 ) {
            if ( foundChoices.indexOf( thisItemsChoices ) < 0 ) {
                if ( thisColumnChoices.length === 0 ) { thisColumnChoices.push( { key: '', text: '- all -' } ) ; }
                thisColumnChoices.push( { key: thisItemsChoices, text: thisItemsChoices } ) ;
                foundChoices.push( thisItemsChoices ) ;
            }
            }
        });

        dropDownItems.push( thisColumnChoices ) ;

        });

        return dropDownItems;

    }

 
}