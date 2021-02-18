import * as React from 'react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';

import { sp } from "@pnp/sp";
import { Web, Lists } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties, } from "@pnp/sp/fields/types";

import "@pnp/sp/webs";

import { IValidTemplate, allAvailableFields } from './fieldsFunctions';

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '@mikezimm/npmfunctions/dist/arrayServices';

import { IGenericWebpartProps } from '../../IGenericWebpartProps';
import { IGenericWebpartState } from '../../IGenericWebpartState';

import {  } from '../contentsComponent';

import styles from '../contents.module.scss';

import { IPickedList, IMyProgress, IUser, IPickedWebBasic, IMyPivCat } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { createAdvancedContentChoices } from '../../fields/choiceFieldBuilder';

import { IContentsToggles, makeToggles } from '../../fields/toggleFieldBuilder';

import { createLink } from '../../HelpInfo/AllLinks';

import { PageContext } from '@microsoft/sp-page-context';
import { IMyPivots, IPivot,  } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';
import { pivotOptionsGroup, } from '../../../../../services/propPane';

import MyLogField from './fieldsListView';

import * as links from '../../HelpInfo/AllLinks';

import { getHelpfullError, } from '@mikezimm/npmfunctions/dist/ErrorHandler';
import { getRandomInt } from '../../ListProvisioning/ListsTMT/ItemsWebPart';

export const pivCats = {
    visible: {title: 'Visible', desc: '', order: 1, count: null },
    hidden: {title: 'Hidden', desc: '', order: 100, count: null },
    text: {title: 'Text', desc: '', order: 1, count: null },
    calculated: {title: 'Calculated', desc: '', order: 1, count: null },
    choice: {title: 'Choice', desc: '', order: 1, count: null },
    look: {title: 'Lookup', desc: '', order: 1, count: null },
    user: {title: 'User', desc: '', order: 1, count: null },
    number: {title: 'Number', desc: '', order: 1, count: null },
    date: {title: 'Date', desc: '', order: 1, count: null },
    url: {title: 'URL', desc: '', order: 1, count: null },      
    boolean: {title: 'Boolean' , desc: '', order: 1, count: null },
    computed:  {title: 'Computed' , desc: '', order: 1, count: null },
    system: {title: '9', desc: 'System', order: 9, count: null },
    required:  {title: '*', desc: 'Required', order: 9, count: null },
};


export interface IContentsFieldInfo extends Partial<IFieldInfo>{
    sort: string;
    bucketCategory: string;
    bucketLabel: string;
    bucketIdx: any;
    FillInChoice?: boolean; //Allow Fill In
    ShowInFiltersPane?: number;
    CanBeDeleted?: boolean;
    searchString: string;
    meta: string[];
    OutputType: number;

    Formula?: string;    //Calculated Fields
    MinimumValue?: number;  //Number Fields
    MaximumValue?: number;  //Number Fields

    MaxLength?: number; //Text Field

    DisplayFormat?: number;
    SelectionMode?: number;  //User Fields
    SelectionGroup?: number;  //User Fields

    FriendlyDisplayFormat?: number;     //Date Fields
    DateTimeCalendarType?: number;      //Date Fields

    Choices?: string[];                 //Choice Field

    NumberOfLines?: number;     // NOTE Field
    RichText?: boolean;         // NOTE Field

    LookupField?: string;                   // Lookup Field 
    AllowMultipleValues?: boolean;          // Lookup Field 
    LookupList?: string;                    // Lookup Field 
    RelationshipDeleteBehavior?: number;    // Lookup Field 

}


export interface IInspectColumnsProps {
    // 0 - Context
    
    pageContext: PageContext;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    allowRailsOff?: boolean;
    allowSettings?: boolean;
    allowCrazyLink: boolean; //property that determines if some links not intended for public are visible, like permissions of SharePoint system lists
    
    allLoaded: boolean;

    currentUser: IUser;

    pickedList? : IPickedList;

    pickedWeb? : IPickedWebBasic;

    // 2 - Source and destination list information

}

export interface IMyHistory {
    count: number;
    errors: IMyProgress[];
    fields: IMyProgress[];
    views: IMyProgress[];
    items: IMyProgress[];


}

export interface IFieldBucketInfo {
    fields: IContentsFieldInfo[];
    count: number;
    sort: string;
    bucketCategory: string;
    bucketLabel: string;

}

export interface IInspectColumnsState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    currentPage: string;
    searchCount: number;
    
    searchText: string;
    searchMeta: string;

    searchedItems: IContentsFieldInfo[];
    first20searchedItems: IContentsFieldInfo[];

    fieldBuckets: IFieldBucketInfo[];
    // 2 - Source and destination list information
    allFields: IContentsFieldInfo[];
    meta: string[];

    allowSettings: boolean;  //property that determines if the related toggle is visible or not
    allowRailsOff: boolean;  //property that determines if the related toggle is visible or not

    showDesc: boolean;      //property set by toggle to actually show or hide this content
    showSettings: boolean;  //property set by toggle to actually show or hide this content
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    showXML: boolean;
    showJSON: boolean;
    showSPFx: boolean;

    showMinFields: boolean;

    errMessage: string | JSX.Element;

    specialAlt: boolean;

}

export default class InspectColumns extends React.Component<IInspectColumnsProps, IInspectColumnsState> {

    private createSearchBuckets() {
        let result : IFieldBucketInfo[] = [
            { fields: [], count: 0, sort : '0' , bucketCategory: 'Custom' , bucketLabel: '0. User Content - Can update'} ,
            { fields: [], count: 0, sort : '3' , bucketCategory: 'ReadOnly', bucketLabel: '3. ReadOnly - Calculated/Lookup?' } ,
            { fields: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
            { fields: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
        ];
        return result;
    }
    private clearHistory() {
        let history: IMyHistory = {
            count: 0,
            errors: [],
            fields: [],
            views: [],
            items: [],
        };
        return history;

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

    public constructor(props:IInspectColumnsProps){
        super(props);

        this.state = { 

            allowOtherSites: this.props.allowOtherSites === true ? true : false,
            currentPage: 'Click Button to start',
            progress: null,
            history: this.clearHistory(),
            allLoaded: false,

            allFields: [],
            searchedItems: [],
            first20searchedItems: [],
            searchCount: 0,

            fieldBuckets : this.createSearchBuckets(),

            meta: [],

            allowSettings: this.props.allowSettings === true ? true : false,
            allowRailsOff: this.props.allowRailsOff === true ? true : false,

            showDesc: false,
            showSettings: false,
            showRailsOff: false,

            searchMeta: pivCats.visible.title,
            searchText: '',

            errMessage: '',

            showXML: false,
            showJSON: false,
            showSPFx: false,
            showMinFields: false,

            specialAlt: false,
        
        };

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);

    }

  public componentDidMount() {
    this._updateStateOnPropsChange();
    console.log('Mounted!');
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

    if ( prevProps.pickedWeb != this.props.pickedWeb || prevProps.pickedList != this.props.pickedList ) {
        this._updateStateOnPropsChange();
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

    public render(): React.ReactElement<IInspectColumnsProps> {

        if ( this.props.pickedWeb !== undefined && this.state.allFields.length > 0 ) {

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

            console.log('renderStateFields', this.state.allFields );

            let thisPage = null;

            let errMessage = this.state.errMessage === '' ? null : <div>
                { this.state.errMessage }
            </div>;

//          let fieldList = <div className={ styles.floatLeft }> {  // This format will put all tables horizontal
            let fieldList = <div> {
                this.state.fieldBuckets.map( bucket => {

                    return <MyLogField 
                        showSettings = { this.state.showSettings } railsOff= { this.state.showRailsOff }
                        items={ bucket }    specialAlt= { this.state.specialAlt }
                        searchMeta= { this.state.searchMeta } showDesc = { this.state.showDesc } showRailsOff= { this.state.showDesc } 
                        showXML= { this.state.showXML } showJSON= { this.state.showJSON } showSPFx= { this.state.showSPFx } showMinFields= { this.state.showDesc } 
                        webURL = { this.props.pickedWeb.url } descending={false} titles={null}   
                        listGuid = { this.props.pickedList.guid }
                        ></MyLogField>;
                })

            }

            </div>;

            /*https://developer.microsoft.com/en-us/fabric#/controls/web/searchbox*/
            let searchBox = 
            <div className={[styles.searchContainer, styles.padLeft20 ].join(' ')} >
              <SearchBox
                className={styles.searchBox}
                styles={{ root: { maxWidth: this.props.allowRailsOff === true ? 200 : 300 } }}
                placeholder="Search"
                onSearch={ this._searchForItems.bind(this) }
                onFocus={ () => console.log('this.state',  this.state) }
                onBlur={ () => console.log('onBlur called') }
                onChange={ this._searchForItems.bind(this) }
              />
              <div className={styles.searchStatus}>
                { 'Searching ' + this.state.searchCount + ' fields' }
                { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
              </div>
            </div>;

            let disclaimers = <h3>Columns for { this.props.pickedList.title} located here: { createLink( this.props.pickedWeb.url, '_blank', this.props.pickedWeb.url )  }</h3>;
            
            let xyz = <div>
                <h3>Next steps</h3>
                <ul>
                    <li>Icons in first field for meta tags</li>
                    <li>See if there are any other parts of the webpart def object that might be helpful</li>
                </ul>
            </div>;

            const stackPageTokens: IStackTokens = { childrenGap: 10 };

            let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles()) } </div>;

            let fieldPivots = this.createPivotObject(this.state.searchMeta, '');

            let settings = <div className = { this.state.showSettings ? styles.showSettings : styles.hideSettings } >
                { this.getSiteSettingsLinks() }
            </div>;

            let noInfo = [];
            noInfo.push( <h3>{'Found ' + this.state.searchCount + ' items with this search criteria:'}</h3> )  ;
            if ( this.state.searchText != '' ) { noInfo.push( <p>{'Search Text: ' + this.state.searchText}</p> )  ; }
            if ( this.state.searchMeta != '' ) { noInfo.push( <p>{'Refiner: ' + this.state.searchMeta}</p> ) ; }

            thisPage = <div className={styles.contents}><div><div>{ disclaimers }</div>

                { errMessage }

                <Stack horizontal={true} wrap={true} horizontalAlign={"space-between"} verticalAlign= {"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Fields */}
                     { searchBox } { toggles }
                </Stack>

                <div> { settings } </div>

                <div style={{ height:30, paddingBottom: 15} }> { fieldPivots } </div>

                <div>

                <div className={ this.state.searchCount !== 0 ? styles.hideMe : styles.showErrorMessage  }>{ noInfo } </div>

                <Stack horizontal={false} wrap={true} horizontalAlign={"stretch"} tokens={stackPageTokens}>{/* Stack for Buttons and Fields */}
                    { fieldList }
                </Stack>
                </div></div></div>;

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
                <div className={ styles.contents }>
                <div className={ styles.container }>
                <div className={ styles.rightPivot }>
                        { thisPage }
                </div></div></div>
            );
            
        } else {
            console.log('provisionPage.tsx return null');
            return (  <div className={ styles.contents }>
                <h2>There are no Fields to see</h2>
            </div> );
        }

    }   //End Public Render


    private getFieldDefs() {
        let listGuid = '';
        if ( this.props.pickedList && this.props.pickedList.guid ) { listGuid = this.props.pickedList.guid; }
        let result : any = allAvailableFields( this.props.pickedWeb.url, listGuid, this.createSearchBuckets(), this.addTheseFieldsToState.bind(this), this.setProgress.bind(this), this.markComplete.bind(this) );

    }

    private addTheseFieldsToState( allFields, scope : 'List' | 'Web' , errMessage : string ) {

        let newFilteredItems : IContentsFieldInfo[] = this.getNewFilteredItems( '', this.state.searchMeta, allFields );

        let fieldBuckets  : IFieldBucketInfo[] = this.bucketFields( newFilteredItems, this.createSearchBuckets() );
        
        this.setState({
            allFields: allFields,
            searchedItems: newFilteredItems,
            searchCount: newFilteredItems.length,
            errMessage: errMessage,
            fieldBuckets: fieldBuckets,
            searchText: '',
            searchMeta: this.state.searchMeta,
        });
        return true;
    }

    /**
     * This puts all the fields into the buckets
     * @param allFields 
     * @param fieldBuckets 
     */
    private bucketFields( allFields : IContentsFieldInfo[], fieldBuckets : IFieldBucketInfo[] ) {

        for (let i in allFields ) {
            fieldBuckets[allFields[i].bucketIdx].fields.push( allFields[i] );
            fieldBuckets[allFields[i].bucketIdx].count ++;
        }
        console.log('bucketFields:  fieldBuckets', fieldBuckets);

        return fieldBuckets;
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
            history.fields = history.fields.length === 0 ? [progress] : [progress].concat(history.fields);
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


/***
 *         .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db 
 *         88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88 
 *         `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88 
 *           `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88 
 *         db   8D 88.     88   88 88 `88. Y8b  d8 88   88 
 *         `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP 
 *                                                         
 *                                                         
 */

  public _onSearchForMeta = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log('searchForItems: e',e);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);

    //Be sure to pass item.props.itemKey to get filter value
    this.searchForFields( this.state.searchText, item.props.itemKey, false );
  }

  public _searchForItems = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log('searchForItems: e',e);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);

    this.searchForFields( item, this.state.searchMeta, true );
  }
  
  private getNewFilteredItems(text: string, meta: string , searchItems : IContentsFieldInfo[] ) {

    let newFilteredItems : IContentsFieldInfo[] = [];

    for (let thisSearchItem of searchItems) {

        let searchString = thisSearchItem.searchString;
        let fieldMeta = thisSearchItem.meta;
  
        if ( meta === undefined || meta == null || meta == '' || fieldMeta.indexOf(meta) > -1 ) {
          if( searchString.indexOf(text.toLowerCase()) > -1 ) {
            newFilteredItems.push(thisSearchItem);
            }
        }
      }

      return newFilteredItems;

  }

  public searchForFields = (text: string, meta: string , resetSpecialAlt: boolean ): void => {

    let searchItems : IContentsFieldInfo[] = this.state.allFields;
    let searchCount = searchItems.length;

    let fieldBuckets : IFieldBucketInfo[] = this.createSearchBuckets();

    let newFilteredItems : IContentsFieldInfo[] = this.getNewFilteredItems( text, meta, searchItems );

    fieldBuckets  = this.bucketFields( newFilteredItems, fieldBuckets );

    console.log('Searched for:' + text);
    console.log('Field Meta:' + meta);
    console.log('and found these fields:', newFilteredItems);
    searchCount = newFilteredItems.length;

    this.setState({
      searchedItems: newFilteredItems,
      searchCount: searchCount,
      fieldBuckets: fieldBuckets,
      searchText: text.toLowerCase(),
      searchMeta: meta,
      specialAlt: resetSpecialAlt === true || this.state.searchMeta !== meta ? false : !this.state.specialAlt , 
    });


    return ;
    
  } //End searchForItems

  
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

    private _updateStateOnPropsChange(): void {
        this.getFieldDefs();
    }

    private checkThisWeb(index: number, testFields : IContentsFieldInfo[] ){
        //const thisWeb = Web(testFields[index].webURL);
        //testFields[index].webExists = false;
        //testFields[index].pageExists = false;

        /*
        thisWeb.pages.get().then((response) => {
            testFields[index].webExists = true;
            this.checkThisPage(index, testFields, thisWeb);

        }).catch((e) => {
            let errMessage = getHelpfullError(e, true, true);
            console.log('checkThisWeb', errMessage);
            this.updateStatePages(index, testFields);
        });
    */

    }
    
    private checkThisPage(index: number, testFields : IContentsFieldInfo[], thisWeb: any ){
        //const thisWeb = Web(testFields[index].webURL);
        thisWeb.fields.getByTitle(testFields[index].Title).get().then((response) => {
            //testFields[index].pageExists = true;
            //testFields[index].pageExistedB4 = true;   
            //this.updateStatePages(index,testFields);

        }).catch((e) => {
            let errMessage = getHelpfullError(e, true, true);
            console.log('checkThisPage', errMessage);
            //this.updateStatePages(index, testFields);
        });
    }


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
          linkSize= { pivotOptionsGroup.getPivSize('normal') }
          linkFormat= { pivotOptionsGroup.getPivFormat('links') }
          onLinkClick= { this._onSearchForMeta.bind(this) }  //{this.specialClick.bind(this)}
          selectedKey={ setPivot }
          headersOnly={true}>
            {this.getFieldPivots()}
        </Pivot>;
        return pivotField;
      }

    private getFieldPivots() {

        let visible = this.buildFilterPivot( pivCats.visible );
        let hidden = this.buildFilterPivot(pivCats.hidden);

        let text = this.buildFilterPivot(pivCats.text);
        let calculated = this.buildFilterPivot(pivCats.calculated);
        let choice = this.buildFilterPivot(pivCats.choice);
        let look = this.buildFilterPivot(pivCats.look);
        let user = this.buildFilterPivot(pivCats.user);
        let number = this.buildFilterPivot(pivCats.number);
        let date = this.buildFilterPivot(pivCats.date);
        let url = this.buildFilterPivot(pivCats.url);      
        let boolean = this.buildFilterPivot(pivCats.boolean);

        let computed = this.buildFilterPivot(pivCats.computed);

        let required = this.buildFilterPivot(pivCats.required);

        let system = this.buildFilterPivot({title: '9', desc: 'System', order: 9, count: null  });

        let thesePivots = [visible, required, text, calculated, choice, look, user, number, date, url, boolean, computed, system ,hidden];

        return thesePivots;
    }

    private buildFilterPivot(pivCat: IMyPivCat) {
        let p = <PivotItem 
            headerText={ pivCat.title }
            itemKey={ pivCat.title }
            >
            { pivCat.desc }
        </PivotItem>;

        return p;
    }

/***
 *         d888888b  .d88b.   d888b   d888b  db      d88888b .d8888. 
 *         `~~88~~' .8P  Y8. 88' Y8b 88' Y8b 88      88'     88'  YP 
 *            88    88    88 88      88      88      88ooooo `8bo.   
 *            88    88    88 88  ooo 88  ooo 88      88~~~~~   `Y8b. 
 *            88    `8b  d8' 88. ~8~ 88. ~8~ 88booo. 88.     db   8D 
 *            YP     `Y88P'   Y888P   Y888P  Y88888P Y88888P `8888Y' 
 *                                                                   
 *                                                                   
 */

    private getPageToggles() {

        let togDesc = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Description</span>,
            key: 'togggleDescription',
            _onChange: this.updateTogggleDesc.bind(this),
            checked: this.state.showDesc,
            onText: '-',
            offText: '-',
            className: '',
            styles: '',
        };

        let togSet = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Settings</span>,
            key: 'togggleSettings',
            _onChange: this.updateTogggleSettings.bind(this),
            checked: this.state.showSettings,
            onText: '-',
            offText: '-',
            className: '',
            styles: '',
        };

        let togXML = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>XML</span>,
            key: 'togggleXML',
            _onChange: this.updateTogggleXML.bind(this),
            checked: this.state.showXML,
            onText: '-',
            offText: '-',
            className: '',
            styles: '',
        };

        let togJSON = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>JSON</span>,
            key: 'togggleJSON',
            _onChange: this.updateTogggleJSON.bind(this),
            checked: this.state.showJSON,
            onText: '-',
            offText: '-',
            className: '',
            styles: '',
        };

        let togSPFx = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>SPFx</span>,
            key: 'togggleSPFx',
            _onChange: this.updateTogggleSPFx.bind(this),
            checked: this.state.showSPFx,
            onText: '-',
            offText: '-',
            className: '',
            styles: '',
        };

        let railsLabel = <span style={{ color: 'red', fontWeight: 700}}>Rails Off!</span>;
        let togRails = {
            label: railsLabel,
            key: 'togggleRailsOff',
            _onChange: this.updateTogggleRailsOff.bind(this),
            checked: this.state.showRailsOff,
            onText: '-',
            offText: '-',
            className: '',
            styles: '',
        };

        let theseToggles = [togDesc, togSet ];
        if ( this.props.allowRailsOff === true ) { theseToggles.push( togXML, togJSON, togSPFx, togRails ); }


        let pageToggles : IContentsToggles = {
            toggles: theseToggles,
            childGap: this.props.allowRailsOff === true ? 10 : 20,
            vertical: false,
            hAlign: 'end',
            vAlign: 'start',
            rootStyle: { width: this.props.allowRailsOff === true ? 80 : 120 , paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
        };

        return pageToggles;

    }

    private updateTogggleDesc() {
        this.setState({
            showDesc: !this.state.showDesc,
        });
    }

    private updateTogggleSettings() {
        this.setState({
            showSettings: !this.state.showSettings,
        });
    }

    private updateTogggleRailsOff() {
        this.setState({
            showRailsOff: !this.state.showRailsOff,
        });
    }

    private updateTogggleXML() {
        this.setState({
            showXML: !this.state.showXML,
            showJSON: this.state.showJSON,
            showSPFx: this.state.showSPFx,
        });
    }

    
    private updateTogggleJSON() {
        this.setState({
            showXML: this.state.showXML,
            showJSON: !this.state.showJSON,
            showSPFx: this.state.showSPFx,
        });
    }

    
    private updateTogggleSPFx() {
        this.setState({
            showXML: this.state.showXML,
            showJSON: this.state.showJSON,
            showSPFx: !this.state.showSPFx,
        });
    }

    private getSiteSettingsLinks() {

        let listGUID = this.props.pickedList.guid;
        let stackSettingTokens = { childrenGap: 20 };
        
        let listLibString = ( this.props.pickedList.isLibrary === true ) ? "},doclib&List={" : "},list&List={"; //Needed for if inherited permissions?

        let settingLinks = <div style={{ padding: 15, fontSize: 'large', }}>
                <Stack horizontal={true} wrap={true} horizontalAlign={"start"} tokens={stackSettingTokens}>{/* Stack for Buttons and Fields */}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/ListEdit.aspx?List=(" + listGUID + ")" ,'_blank', 'List Settings' )}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/ListGeneralSettings.aspx?List=(" + listGUID + ")" ,'_blank', 'Title' )}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/user.aspx?obj={" + listGUID + listLibString + listGUID + "}" ,'_blank', 'Permissions' )}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/LstSetng.aspx?List=(" + listGUID + ")" ,'_blank', 'Versioning' )}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/AdvSetng.aspx?List=(" + listGUID + ")" ,'_blank', 'Advanced' )}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/ManageCheckedOutFiles.aspx?List=(" + listGUID + ")" ,'_blank', 'Orphan files' )}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/IndexedColumns.aspx?List=(" + listGUID + ")" ,'_blank', 'Index' )}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/AddFieldFromTemplate.aspx?List=(" + listGUID + ")" ,'_blank', 'Add Site Col' )}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/fldNew.aspx?List=(" + listGUID + ")" ,'_blank', '+ New Col' )}

                </Stack>
        </div>;

        return settingLinks;

    }
}