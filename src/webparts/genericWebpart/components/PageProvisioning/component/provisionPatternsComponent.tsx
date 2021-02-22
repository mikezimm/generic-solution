import * as React from 'react';

import { CompoundButton, Stack, StackItem, IStackTokens, elementContains, initializeIcons, IPage } from 'office-ui-fabric-react';

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

  import { Spinner, SpinnerSize, SpinnerLabelPosition } from 'office-ui-fabric-react/lib/Spinner';

import { sp } from "@pnp/sp";
import { Web, Lists, LimitedWebPartManager } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState } from "@pnp/sp/clientside-pages";

import { getExpandColumns, getSelectColumns, IZBasicList, IPerformanceSettings, createFetchList, } from '@mikezimm/npmfunctions/dist/getFunctions';

import { IPickedList, IPickedWebBasic, IMyPivots, IPivot,  ILink, IUser, IMyIcons, IMyFonts, IChartSeries, ICharNote, IMyPivCat } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import { spliceCopyArray } from '@mikezimm/npmfunctions/dist/arrayServices';

import { provisionThePage, IValidTemplate, provisionTestPage, provisionDrilldownPage } from './provisionWebPartPages';
import { IListInfo, IMyListInfo, IServiceLog } from '@mikezimm/npmfunctions/dist/listTypes'; //Import view arrays for Time list
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

import { copyPatterns } from './provisionPatternsFunctions';

import { getHelpfullError, } from '@mikezimm/npmfunctions/dist/ErrorHandler';

import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../../../../services/createAnalytics';

import { pivotOptionsGroup, } from '../../../../../services/propPane';

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

export type IPageProvisionPivots =  'Current' | 'Available' | 'Selected' | 'Copy';
export type ILocation = 'current' | 'patterns';

export interface IProvisionPatternsState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning pages on other sites.
    alwaysReadOnly?: boolean;  // default is to be false so you can update at least local pages

    allLoaded: boolean;
    patternsLoaded: boolean;
    currentLoaded: boolean;

    webURL: string;

    progress: IMyProgress;
    history: IMyHistory;

    currentPage: string;

    mode: IPageProvisionPivots;
    
    // 2 - Source and destination list information
    currentItems: IPatternItemInfo[];
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
    currentList: ISitePagesList;

    stateError: any[];

    selectedDropdowns: string[]; //array of selected choices for dropdowns
    dropDownItems: IDropdownOption[][]; //array of array of options for selected dropdown fields
    dropdownColumnIndex: number;

    lastStateChange: string;
    stateChangeLog: string[];

}


export const pivCats = {
    current: {title: 'Current', desc: '', order: 1, count: null, icon: null },
    select: {title: 'Available', desc: '', order: 1, count: null, icon: null },
    que: {title: 'Selected', desc: '', order: 100, count: null, icon: null },
    copy: {title: 'Copy', desc: '', order: 1, count: null, icon: null },

};

export default class ProvisionPatterns extends React.Component<IProvisionPatternsProps, IProvisionPatternsState> {

    private dropDownColumns: string[] = ['Features','Topic'];

    

    /***
 *         d8888b. d888888b db    db  .d88b.  d888888b .d8888. 
 *         88  `8D   `88'   88    88 .8P  Y8. `~~88~~' 88'  YP 
 *         88oodD'    88    Y8    8P 88    88    88    `8bo.   
 *         88~~~      88    `8b  d8' 88    88    88      `Y8b. 
 *         88        .88.    `8bd8'  `8b  d8'    88    db   8D 
 *         88      Y888888P    YP     `Y88P'     YP    `8888Y' 
 *                                                             
 *                                                             
 */


public createPivotObject(setPivot, display){

    let theseStyles = null;

    let pivotField = 
    <Pivot 
      style={{ flexGrow: 1, paddingLeft: '10px', display: display }}
      styles={ theseStyles }
      linkSize= { pivotOptionsGroup.getPivSize('large') }
      linkFormat= { pivotOptionsGroup.getPivFormat('links') }
      onLinkClick= { this._onChangeMode.bind(this) }  //{this.specialClick.bind(this)}
      selectedKey={ setPivot }
      headersOnly={true}>
        {this.getFieldPivots()}
    </Pivot>;
    return pivotField;
  }

private getFieldPivots() {

    let current = this.buildFilterPivot( pivCats.current );
    let select = this.buildFilterPivot( pivCats.select );
    let que = this.buildFilterPivot(pivCats.que);
    let copy = this.buildFilterPivot(pivCats.copy);

    let thesePivots = [select, que, copy, current];

    return thesePivots;
}

private buildFilterPivot(pivCat: IMyPivCat) {
    let p = <PivotItem 
        itemCount={ pivCat.count }
        itemIcon={ '' }
        headerText={ pivCat.title }
        itemKey={ pivCat.title }
        >
        { pivCat.desc }
    </PivotItem>;

    return p;
}

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

    private buildFetchList( location: ILocation ) {

        //Copied from GridCharts for createFetchList
        let allColumns : string[] = ["File/ServerRelativeUrl","File/Name"];  // File expanders here:  https://github.com/SharePoint/PnP-JS-Core/issues/778#issuecomment-380575103

        let searchColumns : string[] = ['Title'];
        let metaColumns : string[] = [];
        let expandDates : string[] = [];
        let selectedDropdowns: string[] = [];
        //allColumns.push( this.props.dateColumn );
        //allColumns.push( this.props.valueColumn );

        searchColumns.map( c => { allColumns.push( c ) ; });
        metaColumns.map( c => { allColumns.push( c ) ; });

        let dropDownColumns = location === 'patterns' ? this.dropDownColumns : [];
        let dropDownSort : string[] = dropDownColumns.map( c => { let c1 = c.replace('>','') ; if ( c1.indexOf('-') === 0 ) { return 'dec' ; } else if ( c1.indexOf('+') === 0 ) { return 'asc' ; } else { return ''; } });

        dropDownColumns.map( c => { let c1 = c.replace('>','').replace('+','').replace('-','') ; searchColumns.push( c1 ) ; metaColumns.push( c1 ) ; allColumns.push( c1 ); selectedDropdowns.push('') ; });

        let performance : IPerformanceSettings = {
            fetchCount: 1000,
            fetchCountMobile: 1000,
            minDataDownload: false,
            restFilter: '',
        };
        let isLibrary = true ;
        let libraryWeb = location === 'patterns' ? this.props.tenant + strings.patternsWeb : this.props.webURL;
        let basicList : IZBasicList = createFetchList( libraryWeb , null, 'Site Pages', 'SitePages', isLibrary, performance, this.props.pageContext, allColumns, searchColumns, metaColumns, expandDates );
        //Have to do this to add dropDownColumns and dropDownSort to IZBasicList
        let tempList : any = basicList;
        tempList.dropDownColumns = dropDownColumns;
        tempList.dropDownSort = dropDownSort;
        let fetchList : ISitePagesList = tempList;
        fetchList.location = location;

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

        let fetchInfo : IFetchListInfo = this.buildFetchList( 'patterns' );
        let currentInfo : IFetchListInfo = this.buildFetchList( 'current' );

        //saveAnalytics (analyticsWeb, analyticsList, serverRelativeUrl, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, richText ) {
        saveAnalytics( this.props.analyticsWeb, this.props.analyticsList, //analyticsWeb, analyticsList,
            '', '',//serverRelativeUrl, webTitle, PageURL,
            'Provision Patterns', TargetSite, null, //saveTitle, TargetSite, TargetList
            'Pages', 'Constructor', 'Loading', //itemInfo1, itemInfo2, result, 
            '' ); //richText

        this.state = { 

            allowOtherSites: this.props.allowOtherSites === true ? true : false,
            alwaysReadOnly: this.props.alwaysReadOnly === true ? true : false,
            currentPage: '',
            allLoaded: this.props.allLoaded,
            patternsLoaded: false,
            currentLoaded: false,

            progress: null,
            history: this.clearHistory(),

            webURL: this.props.webURL,

            allItems: [],
            currentItems: [],
            searchedItems: [],
            searchCount: 0,
            errMessage: '',
            searchText: '',
            searchMeta: [],
            quedPages: [],
            quedSolutions:[],
            quedIds: [],

            mode: 'Available',
            fetchList: fetchInfo.fetchList,
            currentList: currentInfo.fetchList,

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
  
        console.log('fetchList componentDidMount:', this.state.currentList );
        getAllItems( this.state.currentList, this.addTheseItemsToState, this.setProgress, this.markComplete );

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

        let fetchInfo : IFetchListInfo = this.buildFetchList('patterns');
        let currentInfo : IFetchListInfo = this.buildFetchList('current');

        console.log('fetchList componentDidMount:', fetchInfo );
        this.setState({ fetchList: fetchInfo.fetchList, selectedDropdowns: fetchInfo.selectedDropdowns, currentList: currentInfo.fetchList });

        getAllItems( fetchInfo.fetchList, this.addTheseItemsToState, this.setProgress, this.markComplete );
        getAllItems( currentInfo.fetchList, this.addTheseItemsToState, this.setProgress, this.markComplete );

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
        
        } else {



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

            const stackPageTokens: IStackTokens = { childrenGap: 10 };
            const stackHeadingTokens: IStackTokens = { childrenGap: 40 };

            let mode : IPageProvisionPivots = this.state.mode;

            if ( mode === 'Available' || mode === 'Selected' || mode === 'Current') {

                let noItemsMessage : any = null;
                let blueBar = '';
                let items : IPatternItemInfo[] = [];
                if ( this.state.allLoaded !== true ) {
                    noItemsMessage = <Spinner size={SpinnerSize.large} label={ 'Loading Patterns' } labelPosition='left'></Spinner>; }
                if ( mode === 'Available' ) { noItemsMessage = 'There were no valid Patterns found :(' ; blueBar = 'Available Patterns' ; items = this.state.searchedItems ; }
                else if ( mode === 'Selected' ) { noItemsMessage = 'You have not selected any patterns to copy yet :(' ; blueBar = 'Selected Patterns' ; items = this.state.quedPages ; }
                else if ( mode === 'Current' ) { noItemsMessage = 'There are no pages in your current site.' ; blueBar = 'Current Pages' ; items = this.state.currentItems ; }
                
                thisPage = <div><MyPatternsList 
                        blueBar = { blueBar }
                        mode = { mode }
                        noItemsMessage = { noItemsMessage }
                        quePage= { ( q : any ) => this._quePage( q, mode ) }
                        quedIds= { mode === 'Current' ? [] : this.state.quedIds }
                        title={ blueBar } 
                        items={ items }
                        descending={false}          titles={null}            >
                    </MyPatternsList></div>;

            } else {

                let myProgress = this.state.progress == null ? null : <ProgressIndicator 
                    label={this.state.progress.label} 
                    description={this.state.progress.description} 
                    percentComplete={this.state.progress.percentComplete} 
                    progressHidden={this.state.progress.progressHidden}/>;

                let errorList = <MyLogList 
                    title={ 'Error'}           items={ this.state.history.errors }
                    descending={false}          titles={null}            ></MyLogList>;

                let copiedList = <MyLogList 
                    title={ 'Copie'}           items={ this.state.history.columns }
                    descending={false}          titles={null}            ></MyLogList>;

                thisPage = <div>
                    <div> { myProgress } </div>
                    <div>
                    <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={ stackPageTokens }>{/* Stack for Buttons and Fields */}
                        { errorList }
                        { copiedList }  
                    </Stack>
                    </div>

                </div>;
            }

            let disclaimers = <div style={{ paddingTop: '30px', paddingBottom: '20px', paddingLeft: '10px', display: 'block '}}>

                <Stack horizontal={true} wrap={true} horizontalAlign={"start"}  verticalAlign={"center"} tokens={ stackHeadingTokens }>{/* Stack for Buttons and Fields */}
                    <div style={{whiteSpace: 'nowrap'}}><span style={{ fontSize: 'larger', fontWeight: 600}}>
                            Use this page to copy Patterns (our pre-built pages) to your site :)</span></div>

                    <div style={{ whiteSpace: 'nowrap'}}>
                            { <span style={{ fontSize: 'larger' }}> { links.createLink(this.props.webURL , '_none', this.props.webURL.replace( this.props.tenant, '' )) } </span> } </div> 

                    <div style={{ whiteSpace: 'nowrap'}}>
                            { <span style={{ fontSize: 'larger' }}> {links.createLink(this.props.webURL + '/SitePages/' , '_none', 'Site Pages')} </span>} </div> 
                </Stack>

            </div>;


                        
            const buttons: ISingleButtonProps[] = []; //ITCD  ITPPM

            if ( this.state.mode === 'Selected' ) {
                let theLabel = 'Copy patterns' ;
                let isDisabled = this.state.quedPages.length > 0 ? false : true ;
                
                buttons.push({     disabled: isDisabled,  checked: true, primary: false,
                    label: theLabel, buttonOnClick: this._copyPatterns.bind(this), } ) ;
            }

            let provisionButtons = <div style={{ paddingTop: '20px' }}><ButtonCompound buttons={buttons} horizontal={true}/></div>;

            let searchStatus = 'Searching for the meaning of life....';
            if ( mode === 'Available' ) {  searchStatus = 'Searching about ' + this.state.searchCount + ' pages'; }
            let searchBox =           
                <div className = {[stylesC.searchContainer, stylesC.padLeft20 ].join(' ')} style = {{ paddingBottom: '20px'}}>
                    <Stack horizontal={true} wrap={true} horizontalAlign={"start"}  verticalAlign={"center"} tokens={ stackHeadingTokens }>{/* Stack for Buttons and Fields */}
                        <StackItem >
                            <SearchBox
                                className={stylesC.searchBox}
                                styles={{ root: { maxWidth: 300 } }}
                                placeholder={ this.state.mode === 'Selected' ? 'Disabled' : 'Search' }
                                disabled={ this.state.mode === 'Selected' ? true : false }
                                //onSearch={ this._textSearch.bind(this) }
                                //onChange={ this._textSearch.bind(this) }
                                onSearch={ ( t ) => this._textSearch( t, mode) }
                                onChange={ ( t ) => this._textSearch( t, mode) }
                                //onFocus={ () => console.log('this.state',  this.state) }
                                //onBlur={ () => console.log('onBlur called') }
                            />
                            <div className={stylesC.searchStatus}>
                                { searchStatus }
                                { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
                            </div>
                        </StackItem>
                        <StackItem >
                            { provisionButtons }
                        </StackItem>
                    </Stack>
                </div>;

            pivCats.select.count = this.state.allItems.length;
            pivCats.que.count = this.state.quedIds.length > 0 ? this.state.quedIds.length : undefined ;
            pivCats.current.count = this.state.currentItems.length > 0 ? this.state.currentItems.length : undefined ;
            pivCats.copy.count = undefined ;

            let fieldPivots = <div style={{paddingBottom: '20px'}}> { this.createPivotObject(this.state.mode, '') } </div>;

            let pageHeader = <div>
                { disclaimers }
                { fieldPivots }
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

    private _copyPatterns = (item): void => {

        this.setState({ mode: 'Copy' }) ;
        copyPatterns( this.state.currentList.webURL, this.state.quedPages, this.setProgress.bind(this), this.markComplete.bind(this), this._updateCurrentPages.bind(this)) ;

    }

    private _updateCurrentPages() {
        
        let currentInfo : IFetchListInfo = this.buildFetchList('current');
        getAllItems( currentInfo.fetchList, this.addTheseItemsToState, this.setProgress, this.markComplete );


        let TargetSite = this.props.webURL && this.props.webURL.length > 0 ? this.props.webURL : '';

        let saveHistoryObject = {
            progress: this.state.progress,
            history: this.state.history,
        }
        let hadErrors = this.state.history.errors.length > 0 ? true : false;
        let saveHistoryStringified = JSON.stringify(saveHistoryObject);
        //saveAnalytics (analyticsWeb, analyticsList, serverRelativeUrl, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, richText ) {
        saveAnalytics( this.props.analyticsWeb, this.props.analyticsList, //analyticsWeb, analyticsList,
            '', '',//serverRelativeUrl, webTitle, PageURL,
            'Provision Patterns', TargetSite, null, //saveTitle, TargetSite, TargetList
            'Pages', 'Copied Pages', 'Complete' + ( hadErrors ? ' with some issues' : ' no issues!'), //itemInfo1, itemInfo2, result, 
            saveHistoryStringified ); //richText

    }
  
  public _onChangeMode = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log('searchForItems: e',e);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);

    this.setState({
        mode: item.props.itemKey,
    });

  }

    private removeItemsFromObjectArray( array: any[], key: string, keyValue: any ) {
        let newArray: any[] = [];
        array.map( item => {
            if ( !item[key] || item[key] !== keyValue ) { 
                //If not a matching key then just push all items or if the keyValue <> the remove input
                newArray.push( item );
            }
        });
        return newArray;
    }

    private removeItemsFromFlatArray( array: any[], value: any, pushNull: boolean, pushUndefined: boolean ) {
        let newArray: any[] = [];
        array.map( item => {
            if ( item !== value ) { 
                //If not a matching key then just push all items or if the keyValue <> the remove input
                newArray.push( item );
            } else if ( pushNull === true && item === null ) {
                newArray.push( item );
            } else if ( pushUndefined === true && item === undefined ) {
                newArray.push( item );
            }
        });
        return newArray;
    }

    private _quePage( q, mode : IPageProvisionPivots ) {
        let Id = q.currentTarget.parentElement.id;

//        console.log('_quePage', Id, q, mode );

        let quedIds: string[] = this.state.quedIds;
        let quedPages = this.state.quedPages;

        let lastStateChange = '';
        let stateChangeLog: string[] = this.state.stateChangeLog;

        if ( mode === 'Available') {
            if ( quedIds.indexOf(Id) > - 1 ){
                alert('You already added this page (green cloud icon)... you can only add it once :)');

            } else {
                quedIds.push(Id);
                quedPages.push( this.state.allItems[Id]);
                lastStateChange = 'Selected page: ' + this.state.allItems[Id].Title;
            }

        } else if ( mode === 'Selected' ) {
            quedPages = this.removeItemsFromObjectArray ( quedPages, 'Id', this.state.allItems[Id].Id );
            quedIds = this.removeItemsFromFlatArray (quedIds, Id , false, false );
            lastStateChange = 'Removed page: ' + this.state.allItems[Id].Title;

        }

        stateChangeLog.push( lastStateChange );

        console.log('quedIds', quedIds, quedPages );

        this.setState({
            quedIds: quedIds,
            quedPages: quedPages,
            lastStateChange: lastStateChange,
            stateChangeLog: stateChangeLog,
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

        let location: ILocation = fetchList.location;
        let patternsLoaded: boolean = location === 'patterns' ? true : this.state.patternsLoaded;
        let currentLoaded: boolean = location === 'current' ? this.state.currentLoaded : true ;

        let dropDownColumns = location === 'patterns' ? this.dropDownColumns : [];

        if ( errMessage !== '') {
            let stateError : any[] = [];

            stateError.push( <div style={{ padding: '15px', background: 'yellow' }}> <span style={{ fontSize: 'larger', fontWeight: 600 }}>Had some issues getting Pattern Pages</span> </div>);
            dropDownColumns.map( ddc => {
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
                    if ( item.FileSystemObjectType === 0 ) { //Only get files  https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-server/ee537053(v=office.15), File=0, Folder=1, Web=2
                        let relativeUrl = item['File']['ServerRelativeUrl'] ? item['File']['ServerRelativeUrl'] : '';
                        let hasCanvas = item.LayoutWebpartsContent !== null ? true : false;
                        let inTemplatesFolder = relativeUrl.toLowerCase().indexOf('/sitepages/templates/') > -1 ? true : false;

                        let showPage : boolean = false;
                        if ( location === 'patterns' ) {
                            if ( relativeUrl !== '' && hasCanvas === true && inTemplatesFolder === false ) { 
                                if ( item.Topic !== 'Hide' && item.Topic.indexOf('Hide') < 0 ) { showPage = true ; }
                            }
                            
                        } else if ( location === 'current' ) {
                            if ( relativeUrl !== '' ) { showPage = true ; }
                        }

                        if ( showPage === true ) { //Ignore all items in the Templates folder
                            showItems.push(item) ; 
                        }
                    } 
                });

            //Need to do this to reset the allIndex based on the actual items saved in state allItems.
            showItems.map ( ( item, index ) => {
                item.allIndex = index;
            });

            if ( showItems.length < 300 ) {
                console.log('addTheseItemsToState showItems: ', showItems);
            } {
                console.log('addTheseItemsToState showItems: QTY: ', showItems.length );
            }
            
            let allItems : IPatternItemInfo[] = [];
            let currentItems : IPatternItemInfo[] = [];

            if ( location === 'patterns' ) {
                allItems = allNewData === false ? this.state.allItems : showItems;
                currentItems = this.state.currentItems;

            } else if ( location === 'current' ) {
                currentItems = allNewData === false ? this.state.currentItems : showItems;
                allItems = this.state.allItems;
            }
            
            let dropDownItems : IDropdownOption[][] = allNewData === true ? this.buildDataDropdownItems( fetchList, allItems ) : this.state.dropDownItems ;
        
            let lastStateChange = 'Fetched (' + showItems.length + ')' + location + ' items';
            let stateChangeLog: string[] = this.state.stateChangeLog;
            stateChangeLog.push( lastStateChange ) ;

            this.setState({
            /*          */
                allItems: allItems,
                currentItems: currentItems,
                searchedItems: allItems, //newFilteredItems,  //Replaced with showItems to update when props change.
                searchCount: allItems.length,
                errMessage: errMessage,
                searchText: '',
                searchMeta: [],
                fetchList: fetchList,
                allLoaded: patternsLoaded === true && currentLoaded === true ? true : false,
                patternsLoaded: patternsLoaded,
                currentLoaded: currentLoaded,
                dropDownItems: dropDownItems,
                lastStateChange: lastStateChange,
                stateChangeLog: stateChangeLog,
                stateError: patternsLoaded === true && currentLoaded === true ? [] : this.state.stateError,
        
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

        let dropDownColumns = fetchList.location === 'patterns' ? this.dropDownColumns : [];
        
        dropDownColumns.map( ( col, colIndex ) => {

        let actualColName = col.replace('>', '' ).replace('+', '' ).replace('-', '' );
        let parentColName = colIndex > 0 && col.indexOf('>') > -1 ? dropDownColumns[colIndex - 1] : null;
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