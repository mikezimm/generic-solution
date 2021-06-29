/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */


import * as React from 'react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";

import { sp } from "@pnp/sp";
import { Web, Lists, List, ISite } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import ReactJson from "react-json-view";
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import { PageContext } from '@microsoft/sp-page-context';


/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';

import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';

import { getHelpfullErrorV2, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { cleanURL, cleanSPListURL } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';
import { camelize } from '@mikezimm/npmfunctions/dist/Services/Strings/stringCase';
import { makeid } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';

import { getChoiceKey, getChoiceText } from '@mikezimm/npmfunctions/dist/Services/Strings/choiceKeys';

import { doesObjectExistInArray } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
import { getSiteUsers } from '@mikezimm/npmfunctions/dist/Services/Users/userServices';

import { IMyHistory, clearHistory } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      .d8888. d88888b d8888b. db    db d888888b  .o88b. d88888b .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88'  YP 88'     88  `8D 88    88   `88'   d8P  Y8 88'     88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         `8bo.   88ooooo 88oobY' Y8    8P    88    8P      88ooooo `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88           `Y8b. 88~~~~~ 88`8b   `8b  d8'    88    8b      88~~~~~   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         db   8D 88.     88 `88.  `8bd8'    .88.   Y8b  d8 88.     db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         `8888Y' Y88888P 88   YD    YP    Y888888P  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */
import { BaseErrorTrace } from '../../../../../services/BaseErrorTrace';

import { saveTheTime, getTheCurrentTime, saveAnalytics, ApplyTemplate_Rail_SaveTitle } from '../../../../../services/createAnalytics';

import { fixTitleNameInViews  } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import ProvisionHistory from '../../../../../services/railsCommon/ProvisionHistoryPane';

import { IMainPivot, pivotHeading1, pivotHeading2, pivotHeading3 } from './provisionConstants';  

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      db   db d88888b db      d8888b. d88888b d8888b. .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88   88 88'     88      88  `8D 88'     88  `8D 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88ooo88 88ooooo 88      88oodD' 88ooooo 88oobY' `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88~~~88 88~~~~~ 88      88~~~   88~~~~~ 88`8b     `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88   88 88.     88booo. 88      88.     88 `88. db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P 88      Y88888P 88   YD `8888Y' 
 *                                                                                                                       
 *                                                                                                                       
 */

import { IContentsToggles, makeToggles } from '../../fields/toggleFieldBuilder';
import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { IFieldDef } from '../../fields/fieldDefinitions';
import { createBasicTextField } from  '../../fields/textFieldBuilder';

import * as links from '@mikezimm/npmfunctions/dist/HelpInfo/Links/AllLinks';

import { JSONEditorShort } from '../../HelpInfo/AllLinks';

import { createProvisionTitlesRow } from './listTitleButtons';

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
 *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
 *                                                                                                                                               
 *                                                                                                                                               
 */
//
import * as strings from 'GenericWebpartWebPartStrings';

import { ICachedListId, IListRailFunction, IInspectListsProps, IInspectListsState, IListBucketInfo, IRailsOffPanel } from '../../Contents/Lists/IListComponentTypes';

import { provisionTheList, } from './provisionWebPartList';

import { getTheseDefinedLists, checkThisWeb } from './provisionFunctions';
import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';

import styles from './provisionList.module.scss';


/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */


/**
 * Steps to add new list def:
 * 1. Create folder and columns, define and view files
 * 2. Make sure the list def is in the availLists array and definedLists array
 * 3. Add logic to getDefinedLists to fetch the list definition
 * Rinse and repeat
 */
import * as dHarm from '../Harmonie/defineHarmonie';
import * as dTMT from '../ListsTMT/defineThisList';
import * as dCust from '../ListsCustReq/defineCustReq';
import * as dPCP from '../PreConfig/definePreConfig';

import * as dFinT from '../ListsFinTasks/defineFinTasks';
import * as dReps from '../ListsReports/defineReports';
//import * as dTurn from '../ListsTurnover/defineTurnover';
//import * as dOurG from '../ListsOurGroups/defineOurGroups';
//import * as dSoci from '../ListsSocialiiS/defineSocialiiS';
import * as dPivT from '../PivotTiles/definePivotTiles';

import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../../../../../services/railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../../../../../services/railsCommon/ProvisionTypes';

export const dropDownWidth = 200;

// IDefinedLists, availLists, definedLists, dropDownWidth

export interface IProvisionListsProps {
    // 0 - Context

    pageContext: PageContext;

    // 1 - Analytics options
    useListAnalytics: boolean;
    analyticsWeb: string;
    analyticsList: string;
    tenant: string;
    urlVars: {};

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning lists on other sites.
    alwaysReadOnly?: boolean;  // default is to be false so you can update at least local lists

    showPane: boolean;
    allLoaded: boolean;

    currentUser: IUser;

    // 2 - Source and destination list information
    definedList: IDefinedLists; 
    pickedWeb : IPickedWebBasic;
    isCurrentWeb: boolean;

    provisionListTitles: string[];

    // 2 - Source and destination list information

    makeThisList: IMakeThisList;
    updateMakeThisList: any;

    lists: IMakeThisList[];

    theSite: ISite;
    currentPage: string; //this.context.pageContext.web.absoluteUrl;

}

export interface IProvisionListsState {

    alwaysReadOnly?: boolean;  // default is to be false so you can update at least local lists

    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    priorProgress: IMyProgress;
    priorHistory: IMyHistory;

    doMode: boolean;
    doList: boolean;
    doFields: boolean;
    doViews: boolean;
    doItems: boolean;

    listNo: number;

    currentList: string;

    // 2 - Source and destination list information
    definedList: IDefinedLists;
    provisionListTitles: string[];

    // 2 - Source and destination list information
    makeThisList: IMakeThisList;

    lists: IMakeThisList[];

    validUserIds: number[];
    
    mainPivot: IMainPivot;
    showMainWarning: boolean;

}

export default class ProvisionLists extends React.Component<IProvisionListsProps, IProvisionListsState> {

    private captureAnalytics(itemInfo2, result, RichText1 ){
        let currentSiteURL = this.props.pageContext.web.serverRelativeUrl;

        let TargetList = '';
        let TargetSite = '';

        if ( this.state && this.state.lists && this.state.lists[0] ) {
            TargetList = this.state.lists[0] ? this.state.lists[0].listURL : '';
            TargetSite = this.state.lists[0] ? this.state.lists[0].webURL : '';  

        } else {
            TargetList = this.props.makeThisList ? this.props.makeThisList.listURL : '';
            TargetSite = this.props.makeThisList ? this.props.makeThisList.webURL : ''; 

        }

        //saveAnalytics (analyticsWeb, analyticsList, serverRelativeUrl, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, richText ) {
        saveAnalytics( this.props.analyticsWeb, strings.analyticsListRailsApply, //analyticsWeb, analyticsList,
            currentSiteURL, currentSiteURL,//serverRelativeUrl, webTitle, PageURL,
            'Provision Lists', TargetSite, TargetList, //saveTitle, TargetSite, TargetList
            'Lists', itemInfo2, result, //itemInfo1, itemInfo2, result, 
            RichText1, 'ProvisionList', null, null ); //richText, Setting, richText2, richText3

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

public constructor(props:IProvisionListsProps){
    super(props);

    let definedList = this.props.definedList && this.props.definedList.length > 0 ? this.props.definedList : availLists[0];

    let theLists = getTheseDefinedLists( definedList, true, this.props.provisionListTitles, [], this.props.pickedWeb.url, getFullUrlFromSlashSitesUrl(this.props.pickedWeb.url), true, this.updateStateLists.bind(this) );

    let allowOtherSites = this.props.allowOtherSites === true ? true : false;
    let alwaysReadOnly = this.props.alwaysReadOnly === true ? true : false;

    let currentSiteURL = this.props.pageContext.web.serverRelativeUrl;

    this.captureAnalytics('Constructor', 'Loading', null);

    let makeThisList : IMakeThisList = this.props.makeThisList ? this.props.makeThisList : null ;

    this.state = {

        alwaysReadOnly: alwaysReadOnly,
        currentList: 'Click Button to start',
        allLoaded: this.props.allLoaded,

        progress: null,
        history: clearHistory(),

        priorProgress: null,
        priorHistory: clearHistory(),

        doMode: false,
        doList: true,
        doFields: true,
        doViews: false,
        doItems: false,

        listNo: null,

        // 2 - Source and destination list information

        definedList: definedList,
        provisionListTitles: this.props.provisionListTitles,

        //parentListURL: parentWeb + 'lists/' + this.props.parentListTitle, //Get from list item
        //childListURL: childWeb + 'lists/' + this.props.childListTitle, //Get from list item
        
        //parentListWeb: parentWeb, //Get from list item
        //childListWeb: childWeb, //Get from list item
        
        //parentListTitle: this.props.parentListTitle,  // Static Name of list (for URL) - used for links and determined by first returned item
        //childListTitle: this.props.childListTitle,  // Static Name of list (for URL) - used for links and determined by first returned item

        makeThisList: makeThisList,
        lists: theLists,

        validUserIds: [],

        mainPivot: pivotHeading1,
        showMainWarning: true,

    };

    // because our event handler needs access to the component, bind
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);


  }

  public componentDidMount() {
    this._updateStateOnPropsChange('state');
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

    if ( prevProps.lists != this.props.lists ) {

        this._updateStateOnPropsChange('props');
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

    public render(): React.ReactElement<IProvisionListsProps> {

        if ( this.state.definedList === availLists[0] || ( this.state.lists && this.state.lists.length > 0 ) ) {
            //console.log('provisionList.tsx', this.props, this.state);

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


            let toggles = <div style={ { display: 'inline-flex' , marginLeft: 20 }}> { makeToggles(this.getPageToggles()) } </div>;

            let listDropdown = this._createDropdownField( 'Pick your list type' , availLists , this._updateDropdownChange.bind(this) , null );

            let thisPage = null;
            let stringsError = <tr><td>  </td><td>  </td><td>  </td></tr>;

            const createButtonOnClicks = [
                this.CreateList_0.bind(this),
                this.CreateList_1.bind(this),
                this.CreateList_2.bind(this),
            ];
            const updateTitleFunctions = [this.UpdateTitle_0.bind(this), this.UpdateTitle_1.bind(this), this.UpdateTitle_2.bind(this)];

            let doInputs = createProvisionTitlesRow( 
                this.state.provisionListTitles, 
                this.state.lists, 
                this.state.definedList, 
                createButtonOnClicks , 
                updateTitleFunctions,
                this.state.alwaysReadOnly, this.props.isCurrentWeb, this.props.allowOtherSites,
              );

            let historyStack = null;
            let listDefinitionJSON = null;

            let theList : any = this.state.makeThisList;

            if (  this.state.doMode === true || this.state.mainPivot === 'History' ) {

                let whichProgress = this.state.mainPivot === 'History' ? null : this.state.progress;
                let whichHistory = this.state.mainPivot === 'History' ? clearHistory() : this.state.history;
                let mapThisList = this.state.mainPivot === 'History' ? null : this.state.lists[ this.state.listNo ];

                historyStack = null;
                    historyStack = <ProvisionHistory
                    theList = { theList }

                    pickedWeb = { this.props.pickedWeb }

                    analyticsWeb = { strings.analyticsWeb }
                    analyticsListRails = { strings.analyticsListRailsApply }

                    progress = { whichProgress }
                    history = { whichHistory }
                    mapThisList = { mapThisList }

                    fetchHistory = { this.state.mainPivot === 'History' ? true : false }

                    refreshId = { makeid(6) }

                ></ProvisionHistory>;
            
            } else { //this.state.doMode !== true

                // if ( this.state.lists.length > 0) {
                if ( this.state.listNo !== null && this.state.lists && this.state.lists.length > 0 ) {
                    let listJSON = null; 
                    let tempJSON = JSON.parse(JSON.stringify( this.state.lists[ this.state.listNo ] )) ;
                    if ( this.state.doFields !== true ) { tempJSON.createTheseFields = []; }
                    if ( this.state.doViews !== true ) { tempJSON.createTheseViews = []; }
                    if ( this.state.doItems !== true ) { tempJSON.createTheseItems = []; }
    
                    listJSON = <div style={{ overflowY: 'auto' }}>
                        <ReactJson src={ tempJSON } collapsed={ 1 } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                    </div>;
    
                    listDefinitionJSON =
                     <div style={{display: '', marginBottom: '30px' }}>
                            <div><h2>Details for list:{ this.state.lists[ this.state.listNo ].listDefinition } <span style={{fontSize: 'small', paddingLeft: '50px'}}> { JSONEditorShort } </span></h2></div>
                        { listJSON }
                    </div>;
    
                } 
            }

            let disclaimers = <div>
                <h2>Disclaimers.... still need to work on</h2>
                <span style={{ fontSize : 'x-large'}}><mark>THIS PAGE IS BROKEN AND CAN RUIN LISTS... DO NOT USE</mark></span>
                <p>When selecting list type, it should set default list titles per list type.</p>
                <ul>
                    <li>Pick List definition</li>
                    <li>Pick List type (if more than one option is available)</li>
                    <li>Set Title above button (or leave blank for default)</li>
                    <li>Set Mode (1st Toggle).  Design just creates the json object you can look at.  Toggle to build.</li>
                </ul>
            </div>;

            const stackListTokens: IStackTokens = { childrenGap: 10 };

            thisPage = <div><div>{ disclaimers }</div>

                <div style={{ float: 'left' }}> { listDropdown } </div>
                <div> { toggles } </div>
                <div> { doInputs } </div>
                <div style={{ height:30} }> {  } </div>

                { historyStack }

                { listDefinitionJSON }

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
                <div className={ styles.infoPane } style={{ paddingBottom: '20px' }}>
                    { thisPage }
                </div>
            );

        } else {
            console.log('provisionList.tsx return null');
            return (  <div className={ styles.infoPane }>
                <h2>There are no lists to provision</h2>
            </div> );
        }

    }   //End Public Render


  /***
   *          .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      db      d888888b .d8888. d888888b .d8888.
   *         d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88        `88'   88'  YP `~~88~~' 88'  YP
   *         8P      88oobY' 88ooooo 88ooo88    88    88ooooo      88         88    `8bo.      88    `8bo.
   *         8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      88         88      `Y8b.    88      `Y8b.
   *         Y8b  d8 88 `88. 88.     88   88    88    88.          88booo.   .88.   db   8D    88    db   8D
   *          `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      Y88888P Y888888P `8888Y'    YP    `8888Y'
   *
   *
   */

  private CreateList_0(oldVal: any): any {
    let mapThisList: IMakeThisList = this.state.lists[0];
    this.CreateThisList(mapThisList, 0 );
  }

  private CreateList_1(oldVal: any): any {
    let mapThisList: IMakeThisList = this.state.lists[1];
    this.CreateThisList(mapThisList, 1 );
  }

  private CreateList_2(oldVal: any): any {
    let mapThisList: IMakeThisList = this.state.lists[2];
    this.CreateThisList(mapThisList, 2 );
  }

  private CreateThisList( mapThisList: IMakeThisList, listNo: number ) {

    this.setState({ currentList: mapThisList.listDefinition + ' list: ' + mapThisList.title, history: clearHistory(), listNo: listNo });

    let listName = mapThisList.title ? mapThisList.title : mapThisList.title;

    let readOnly: boolean  = this.isListReadOnly(mapThisList);

    if ( this.state.doMode === true ) {
        
        //Moved this above the provisionTheList because it was modifying mapThisList on the fly.
        let workingMessage = readOnly === true ? 'Verifying list: ': 'Building list: ' ;
        this.setState({
            currentList: workingMessage + listName,
            listNo: listNo,
        });

        this.captureAnalytics('Update List', 'Updating', mapThisList);

        let listCreated = provisionTheList( mapThisList, readOnly, this.setProgress.bind(this), this.markComplete.bind(this) , this.state.doFields, this.state.doViews, this.state.doItems );

        // if ( listCreated ) {
        //     this.setState({
        //         currentList: workingMessage + listName,
        //         listNo: listNo,
        //     });
        // }
    } else {
        console.log( 'listNo, mapThisList', listNo, mapThisList );

        //Pass this list back up to parent and down to Fields functionality

    }

    this.props.updateMakeThisList( mapThisList );
        
    return "Finished";
  }

  private isListReadOnly (mapThisList) {

    let readOnly = true;
    if ( this.state.alwaysReadOnly === false ) {                //First test, only allow updates if the state is explicitly set so alwaysReadOnly === false
        if (mapThisList.onCurrentSite === true ) {
            readOnly = false;                                   //If list is on current site, then allow writing (readonly = false)
        } else if ( this.props.isCurrentWeb === true || this.props.allowOtherSites === true ) {
            readOnly = false;                                   //Else If you explicitly tell it to allowOtherSites, then allow writing (readonly = false)
        }
    }

    return readOnly;

  }
  private markComplete( mapThisList: IMakeThisList ) {

    // if ( !listNo ) { listNo = this.state.listNo ; }
    let stateLists = this.state.lists;
    // stateLists[listNo].listExists = true;

    this.setState({
        currentList: 'Finished ' + this.state.currentList,
    });

    let theSite: any = this.props.theSite;
    let ServerRelativeUrl = this.props.currentPage;
    let pickedWeb = this.props.pickedWeb.ServerRelativeUrl + '|' + this.props.pickedWeb.guid + '|' + theSite.Url + '|' + theSite.Id ;

    let railFunction : IListRailFunction = 'AddTemplate'; 
    saveAnalytics( this.props.analyticsWeb, strings.analyticsListRailsApply , //analyticsWeb, analyticsList,
        ServerRelativeUrl, ServerRelativeUrl,//serverRelativeUrl, webTitle,
        ApplyTemplate_Rail_SaveTitle, pickedWeb, mapThisList.listURL, //saveTitle, TargetSite, TargetList
        mapThisList.title, null , 'Complete', //itemInfo1, itemInfo2, result, 
        mapThisList, railFunction, this.state.progress, this.state.history ); //richText, Setting, richText2, richText3

  }

   /**
    *
    * @param progressHidden
    * @param list : list you want to add this to 'E' | 'C' | 'V' | 'I'
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in list
    * @param label : longer label used in Progress Indicator and hover card
    * @param description
    */
  private setProgress(progressHidden: boolean, list: 'E' | 'C' | 'V' | 'I', current: number , ofThese: number, color: string, icon: string, logLabel: string, label: string, description: string, ref: string = null ){
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
        if ( list === 'E') {
            history.errors = history.errors.length === 0 ? [progress] : [progress].concat(history.errors);
        } else if ( list === 'C') {
            history.fields = history.fields.length === 0 ? [progress] : [progress].concat(history.fields);
        } else if ( list === 'V') {
            history.views = history.views.length === 0 ? [progress] : [progress].concat(history.views);
        } else if ( list === 'I') {
            history.items = history.items.length === 0 ? [progress] : [progress].concat(history.items);
        }
    }

    this.setState({
        progress: progress,
        history: history,
    });

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

    private async _updateStateOnPropsChange(doThis: 'props' | 'state' ) {
        console.log('_updateStateOnPropsChange:', doThis, this.props );
        let testLists : IMakeThisList[] = [];
        let definedList : IDefinedLists = null;

        if ( doThis === 'props' ) {
            if ( this.props.lists ) { testLists = JSON.parse(JSON.stringify(this.props.lists)) ; definedList = this.props.definedList; }

        } else {
            if ( this.state.lists ) { testLists = JSON.parse(JSON.stringify(this.state.lists)) ; definedList = this.state.definedList; }
        }

        if ( this.state.validUserIds.length === 0 ) {

            let validUsers = await getSiteUsers( this.props.pickedWeb.url, ['Id','Title','Name','Email'], true );

            this.setState({  validUserIds: validUsers.Ids, });

        }
        if ( testLists.length > 0 ) {
            for ( let i in testLists ) {
                checkThisWeb(parseInt(i,10), testLists, definedList, this.updateStateLists.bind(this), getFullUrlFromSlashSitesUrl( this.props.pickedWeb.url ) );
            }
        }

    }

    private updateStateLists(index: number, testLists : IMakeThisList[], definedList: IDefinedLists) {
        let stateLists = this.state.lists;
        if (stateLists === undefined ) { stateLists = this.props.lists ; }
        stateLists[index] = testLists[index];
        this.setState({
            lists: stateLists,
            definedList: definedList,
        });
    }

    private _createDropdownField( label: string, choices: string[], _onChange: any, getStyles : IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>) {
        const dropdownStyles: Partial<IDropdownStyles> = {
            dropdown: { width: dropDownWidth }
          };

          let sOptions: IDropdownOption[] = choices == null ? null : 
            choices.map(val => {
                  return {
                      //key: getChoiceKey(val),
                      key: val,
                      text: val,
                  };
              });

          let keyVal = this.state.definedList;

          let thisDropdown = sOptions == null ? null : <div
              //style={{  paddingTop: 10  }}
                ><Dropdown 
                label={ label }
                //selectedKey={ getChoiceKey(keyVal) }
                selectedKey={ keyVal }
                onChange={ _onChange }
                options={ sOptions } 
                styles={ dropdownStyles }
              />
            </div>;

        return thisDropdown;

    }

    private _updateDropdownChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        console.log(`_updateStatusChange: ${item.text} ${item.selected ? 'selected' : 'unselected'}`);

        let thisValue : any = getChoiceText(item.text);

        let provisionListTitles =  this.state ? this.state.provisionListTitles : this.props.provisionListTitles;
        let theLists = getTheseDefinedLists( thisValue , false, provisionListTitles, this.state.validUserIds, this.props.pickedWeb.url, this.props.pageContext.web.absoluteUrl, this.state.doList, this.updateStateLists.bind(this) );

        let doList: boolean = theLists.length === 0 ? null : theLists[0].template === 100 ? true : theLists[0].template === 101 ? false : null;

        provisionListTitles = theLists.map( list => {
            return list.listDefinition;
        });

        this.setState({ lists: theLists, doList: doList, provisionListTitles: provisionListTitles });

    }

    private UpdateTitle_0(oldVal: any): any {
        this.UpdateTitles(oldVal,0);
      }

      private UpdateTitle_1(oldVal: any): any {
        this.UpdateTitles(oldVal,1);
      }

      private UpdateTitle_2(oldVal: any): any {
        this.UpdateTitles(oldVal,2);
      }

      private UpdateTitles( oldVal: any, index: number ) {
        let provisionListTitles = this.state.provisionListTitles;
        provisionListTitles[index] = oldVal;
        this.setState({ provisionListTitles: provisionListTitles, });

        let stateLists = this.state.lists;
        let listName = cleanSPListURL(camelize(oldVal, true));

        let definedList = this.state.definedList;

        // let reDefinedLists = this.getDefinedLists(definedList, true);

        let reDefinedLists = getTheseDefinedLists( definedList , false, provisionListTitles, this.state.validUserIds, this.props.pickedWeb.url, this.props.pageContext.web.absoluteUrl, this.state.doList, this.updateStateLists.bind(this) );

        reDefinedLists[index].name = listName;
        reDefinedLists[index].title = oldVal;
        reDefinedLists[index].desc = oldVal + ' list for this Webpart';
        reDefinedLists.map( theList => {
            theList.template = this.state.doList === true ? 100 : 101 ;
            theList.listURL =  ( this.props.pickedWeb.url ) + '/' + ( theList.template === 100 ? 'lists/' : '') + listName;
        });

        checkThisWeb(index, reDefinedLists, definedList, this.updateStateLists.bind(this), getFullUrlFromSlashSitesUrl( this.props.pickedWeb.url ));

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

            let toggleLabel = <span style={{ color: '', fontWeight: 700}}>Mode</span>;
            let togDoMode = {
                label: toggleLabel,
                key: 'togDoMode',
                _onChange: this.updateTogggleDoMode.bind(this),
                checked: this.state.doMode,
                onText: 'Build',
                offText: 'Design',
                className: '',
                styles: '',
            };

            let togDoList = {
                label: this.state.doList === true ? 'Make List' : 'Make Library',
                key: 'togDoList',
                _onChange: this.updateTogggleDoList.bind(this),
                checked: this.state.doList,
                onText: '-',
                offText: '-',
                className: '',
                styles: '',
            };

            let listNo = this.state.listNo;
            let togDoFields = {
                label: 'Fields ' + ( this.state.lists.length > 0 && listNo !== null? `(${this.state.lists[listNo].createTheseFields.length})` : '' ),
                key: 'togDoFields',
                _onChange: this.updateTogggleDoFields.bind(this),
                checked: this.state.doFields,
                onText: 'Include',
                offText: 'Skip',
                className: '',
                styles: '',
            };

            let togDoViews = {
                label: 'Views ' + ( this.state.lists.length > 0 && listNo !== null? `(${this.state.lists[listNo].createTheseViews.length})` : '' ),
                key: 'togDoViews',
                _onChange: this.updateTogggleDoViews.bind(this),
                checked: this.state.doViews,
                onText: 'Include',
                offText: 'Skip',
                className: '',
                styles: '',
            };
            
            let togDoItems = {
                label: 'Items ' + ( this.state.lists.length > 0 && listNo !== null? `(${this.state.lists[listNo].createTheseItems.length})` : '' ),
                key: 'togDoItems',
                _onChange: this.updateTogggleDoItems.bind(this),
                checked: this.state.doItems,
                onText: 'Include',
                offText: 'Skip',
                className: '',
                styles: '',
            };

            let theseToggles = [togDoMode, togDoList, togDoFields, togDoViews, togDoItems ];

            let pageToggles : IContentsToggles = {
                toggles: theseToggles,
                childGap: 20,
                vertical: false,
                hAlign: 'end',
                vAlign: 'start',
                rootStyle: { width: 120, paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
            };

            return pageToggles;

        }

        private updateTogggleDoMode = (item): void => {
            this.setState({
                doMode: !this.state.doMode,
            });
        }

        private updateTogggleDoList = (item): void => {
            //Similar to CreateThisList... just update existing list though
            let stateLists = this.state.lists;
            let newSetting = !this.state.doList;
            // stateLists.map( list => {
            //     list = fixTitleNameInViews( newSetting , list );
            //  });

            stateLists.map( theList => {  // listURL, template
                theList.template = newSetting === true ? 100 : 101;
                theList.listURL = theList.webURL + ( newSetting === true ? 'lists/' : '' ) + theList.name;
                theList = fixTitleNameInViews( newSetting , theList );
            });

            this.setState({ doList: !this.state.doList, lists: stateLists });

        }

        private updateTogggleDoFields = (item): void => {
            this.setState({
                doFields: !this.state.doFields,
            });
        }

        private updateTogggleDoViews = (item): void => {
            this.setState({
                doViews: !this.state.doViews,
            });
        }


        private updateTogggleDoItems = (item): void => {
            this.setState({
                doItems: !this.state.doItems,
            });
        }

        

}