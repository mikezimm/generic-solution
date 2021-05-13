




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
  } from "office-ui-fabric-react";

import { sp } from "@pnp/sp";
import { Web, Lists } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

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

import { getHelpfullError, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { IListInfo, IMyListInfo, IServiceLog, notify } from '@mikezimm/npmfunctions/dist/Lists/listTypes';


import { cleanURL, cleanSPListURL } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';
import { camelize, randomizeCase, } from '@mikezimm/npmfunctions/dist/Services/Strings/stringCase';
import { isGuid, makeid, } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';
import { IMyPivCat } from '@mikezimm/npmfunctions/dist/Pivots/IzPivots';
import { getChoiceKey, getChoiceText } from '@mikezimm/npmfunctions/dist/Services/Strings/choiceKeys';

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

import { IListLog } from '../../../../../services/listServices/listServices';
   
import { pivotOptionsGroup, } from '../../../../../services/propPane';

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

import { createIconButton } from '../../createButtons/IconButton';

import * as links from '../../HelpInfo/AllLinks';

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

import { provisionTheList, IValidTemplate } from './provisionWebPartList';

import { IGenericWebpartProps } from '../../IGenericWebpartProps';
import { IGenericWebpartState } from '../../IGenericWebpartState';

import styles from './provisionList.module.scss';

import { IPageProvisionPivots } from '../../PageProvisioning/component/provisionPatternsComponent';

import MyLogList from './listView';

import { IMakeThisList } from './provisionWebPartList';

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

import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../../../../services/createAnalytics';

import { createGridDates } from '../../../../../services/sampleData';

import { IFieldDef } from '../../fields/fieldDefinitions';
import { createBasicTextField, createMultiLineTextField } from  '../../fields/textFieldBuilder';

/**
 * Steps to add new list def:
 * 1. Create folder and columns, define and view files
 * 2. Make sure the list def is in the availLists array
 * 3. Add logic to getDefinedLists to fetch the list definition
 * Rinse and repeat
 */
import * as dHarm from '../Harmonie/defineHarmonie';
import * as dTMT from '../ListsTMT/defineThisList';
import * as dCust from '../ListsCustReq/defineCustReq';
import * as dPCP from '../PreConfig/definePreConfig';

import { doesObjectExistInArray } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
//import * as dFinT from '../ListsFinTasks/defineFinTasks';
//import * as dReps from '../ListsReports/defineReports';
//import * as dTurn from '../ListsTurnover/defineTurnover';
//import * as dOurG from '../ListsOurGroups/defineOurGroups';
//import * as dSoci from '../ListsSocialiiS/defineSocialiiS';
//import * as dPivT from '../PivotTiles/definePivotTiles';


/**
 * NOTE:  'Pick list Type' ( availLists[0] ) is hard coded in numerous places.  If you change the text, be sure to change it everywhere.
 * First item in availLists array ( availLists[0] ) is default one so it should be the 'Pick list type' one.
 */

import { IDefinedLists, availLists, definedLists, dropDownWidth } from './provisionListComponent';

export interface IProvisionItemsProps {
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

}

export interface IMyHistory {
    count: number;
    errors: IMyProgress[];
    columns: IMyProgress[];
    views: IMyProgress[];
    items: IMyProgress[];
}

//export type IItemMode = 'Define' | 'Create' | 'Status' | 'History';

export interface IProvisionItemsState {

    alwaysReadOnly?: boolean;  // default is to be false so you can update at least local lists

    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    doMode: boolean;
    doItems: boolean;
    doEditMain: boolean;
    DoEditItems: boolean;
    
    mode: IItemMode;

    listNo: number;

    currentList: string;

    itemTitle: string;
    message1: string;
    code: string;
    datesJSON: string[];
    datesString: string;

    //createGridDates ( webUrl : string, listName : string, itemTitle : string, code: string, message1 : string, dates : string[] ) {


    // 2 - Source and destination list information
    definedList: IDefinedLists;
    provisionListTitles: string[];

    // 2 - Source and destination list information
    makeThisList: IMakeThisList;

    lists: IMakeThisList[];
    validUserIds: number[];

}

export type IItemMode = 'Define' | 'Create' | 'Status' | 'History';

export const pivCats = {
    Define: {title: 'Define', desc: '', order: 1, count: null, icon: null },
    Create: {title: 'Create', desc: '', order: 1, count: null, icon: null },
    Status: {title: 'Status', desc: '', order: 100, count: null, icon: null },
    History: {title: 'History', desc: '', order: 1, count: null, icon: null },

};

export default class ProvisionItems extends React.Component<IProvisionItemsProps, IProvisionItemsState> {


    private captureAnalytics(itemInfo2, result, ActionJSON ){
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
        saveAnalytics( this.props.analyticsWeb, this.props.analyticsList, //analyticsWeb, analyticsList,
            currentSiteURL, currentSiteURL,//serverRelativeUrl, webTitle, PageURL,
            'Provision Items', TargetSite, TargetList, //saveTitle, TargetSite, TargetList
            'Items', itemInfo2, result, //itemInfo1, itemInfo2, result, 
            ActionJSON, 'ProvisionItem' ); //richText

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

        //export type IItemMode = 'Define' | 'Create' | 'Status' | 'History';
        let Define = this.buildFilterPivot( pivCats.Define );
        let Create = this.buildFilterPivot( pivCats.Create );
        let Status = this.buildFilterPivot(pivCats.Status);
        let History = this.buildFilterPivot(pivCats.History);

        let thesePivots = [Define, Create, History];

        return thesePivots;
    }

    private buildFilterPivot(pivCat: IMyPivCat) {
        let p = <PivotItem 
            //itemCount={ pivCat.count }
            //itemIcon={ '' }
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

public constructor(props:IProvisionItemsProps){
    super(props);

    let definedList = this.props.definedList && this.props.definedList.length > 0 ? this.props.definedList : availLists[0];
    let theLists = this.props.makeThisList ? [ this.props.makeThisList ] : [] ;

    let allowOtherSites = this.props.allowOtherSites === true ? true : false;
    let alwaysReadOnly = this.props.alwaysReadOnly === true ? true : false;

    let currentSiteURL = this.props.pageContext.web.serverRelativeUrl;

    this.captureAnalytics('Constructor', 'Loading', null);

    let makeThisList : IMakeThisList = this.props.makeThisList ? this.props.makeThisList : null ;

    let provisionListTitles : string[] = this.props.provisionListTitles[0] && this.props.provisionListTitles[0].length > 0 ? [this.props.provisionListTitles[0]] : [ makeThisList ? makeThisList.title : 'Enter List Title' ];

    let doList = makeThisList && makeThisList.template === 100 ? true : false;

    this.state = {

        alwaysReadOnly: alwaysReadOnly,
        currentList: '',
        allLoaded: this.props.allLoaded,
        progress: null,
        history: this.clearHistory(),

        doMode: false,
        doItems: false,
        doEditMain: makeThisList ? false : true ,
        DoEditItems: true,

        listNo: makeThisList ? 0 : null,

        // 2 - Source and destination list information


        definedList: definedList,
        provisionListTitles: provisionListTitles,

        //parentListURL: parentWeb + 'lists/' + this.props.parentListTitle, //Get from list item
        //childListURL: childWeb + 'lists/' + this.props.childListTitle, //Get from list item
        
        //parentListWeb: parentWeb, //Get from list item
        //childListWeb: childWeb, //Get from list item
        
        //parentListTitle: this.props.parentListTitle,  // Static Name of list (for URL) - used for links and determined by first returned item
        //childListTitle: this.props.childListTitle,  // Static Name of list (for URL) - used for links and determined by first returned item

        lists: theLists,
        makeThisList: makeThisList,

        validUserIds: [],

        mode: 'Define',
        message1: '',
        code: '',
        datesJSON: [],
        datesString: '',
        itemTitle: '',

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

    public render(): React.ReactElement<IProvisionItemsProps> {

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

            let itemsPivots = <div style={{paddingBottom: '20px'}}> { this.createPivotObject(this.state.mode, '') } </div>;

            let thisPage = null;
            let stringsError = <tr><td>  </td><td>  </td><td>  </td></tr>;

            let pivotItem = null;

            if ( this.state.mode === 'Define' ) {

                let currentList = <TextField
                    defaultValue={ this.state.currentList }   label={ 'currentList' }    autoComplete='off'    required={ true }   className={ '' }
                    onChanged={ this.UpdateCurrentList.bind(this) }
                />;
                let message1 = <TextField
                    defaultValue={ this.state.message1 }   label={ 'message1' }    autoComplete='off'    required={ true }   className={ '' }
                    onChanged={ this.UpdateMessage1.bind(this) }
                />;
                let code = <TextField
                    defaultValue={ this.state.code }   label={ 'code' }    autoComplete='off'    required={ true }   className={ '' }
                    onChanged={ this.UpdateCode.bind(this) }
                />;

                let editToggles = <div style={ { display: 'inline-flex' , marginLeft: 20 }}> { makeToggles(this.getEditToggles()) } </div>;

                const stackInputTokens: IStackTokens = { childrenGap: 70 };
                let defineItem = <Stack horizontal={true} wrap={true} horizontalAlign={"start"} verticalAlign= {"center"} tokens={stackInputTokens}>{/* Stack for Buttons and Fields */}
                    { editToggles }
                    { currentList }
                    { message1 }
                    { code }
                </Stack>;

                let listDefInputField = this.state.DoEditItems === true ? 
                <div style={{ width: '90%' }}> { createMultiLineTextField( 'Paste List JSON', this.state.datesString, this.UpdateJSONItems.bind(this), styles.listProvTextField1 ) }</div> :
                <div style={{ overflowY: 'auto' }}>
                    <ReactJson src={ this.state.datesJSON } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                </div>;

                pivotItem = <Stack horizontal={false} wrap={true} horizontalAlign={"start"} verticalAlign= {"center"} tokens={stackInputTokens}>{/* Stack for Buttons and Fields */}
                    { defineItem }
                    { listDefInputField }
                </Stack>;

            } else if ( this.state.mode === 'Create' ) {
                let createGridDatesF = this.createGridDates.bind(this);
                let catItems = createIconButton('Cat', 'Create Items', 
                    createGridDatesF , 'CreateID',
                     {      root: {padding:'20px !important', height: 32},//color: 'green' works here
                            icon: { 
                                fontSize: 28,
                                fontWeight: "normal",
                                margin: '0px 2px',
                                color: '#00457e', //This will set icon color
                            },
                        });

                let myProgress = this.state.progress == null ? null : <ProgressIndicator
                    label={this.state.progress.label}
                    description={this.state.progress.description}
                    percentComplete={this.state.progress.percentComplete}
                    progressHidden={this.state.progress.progressHidden}/>;

                let errorList = <MyLogList
                    title={ 'Error'}           items={ this.state.history.errors }
                    descending={false}          titles={null}            ></MyLogList>;

                let itemList = <MyLogList
                    title={ 'Item'}           items={ this.state.history.items }
                    descending={false}          titles={null}            ></MyLogList>;

                const stackListTokens: IStackTokens = { childrenGap: 10 };
                pivotItem = <div>
                    { catItems }
                    { myProgress }
                    <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={stackListTokens}>{/* Stack for Buttons and Fields */}
                        { errorList }
                        { itemList }
                    </Stack>
                </div>;

            } else if ( this.state.mode === 'History' ) { 

            }

            const stackProvisionTokens: IStackTokens = { childrenGap: 70 };
            let listLinksRow = links.createLink( this.props.pickedWeb.url + '/lists/' + this.state.currentList, '_none',  'Go to: ' + this.state.currentList ) ;

            thisPage = <div style={{ paddingLeft: '30px', paddingTop: '30px' }}><div>{  }</div>
                <div> { listLinksRow } </div>
                <div> { itemsPivots } </div>
                <div> { pivotItem } </div>
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

  private markComplete() {

    this.setState({
        currentList: 'Finished ' + this.state.currentList,
    });

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
        } else if ( list === 'I') {
            history.items = history.items.length === 0 ? [progress] : [progress].concat(history.items);
        }
    }

    this.setState({
        progress: progress,
        history: history,
    });

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
        console.log('_updateStateOnPropsChange:', doThis, this.props );
        let testLists : IMakeThisList[] = [];
        let definedList : IDefinedLists = null;
        if ( doThis === 'props' ) {
            if ( this.props.lists ) { testLists = JSON.parse(JSON.stringify(this.props.lists)) ; definedList = this.props.definedList; }

        } else {
            if ( this.state.lists ) { testLists = JSON.parse(JSON.stringify(this.state.lists)) ; definedList = this.state.definedList; }
        }

        if ( this.state.validUserIds.length === 0 ) {
            const thisWeb = Web( this.props.pickedWeb.url );
            thisWeb.siteUsers.get().then((responseUsers) => {
                let validUserIds : any[] = [];
                responseUsers.map ( u => {
                    if ( u.UserId !== null && u.UserPrincipalName !== null ) { validUserIds.push( u.Id ); }
                });
                console.log('validUserIds SiteUsers:', validUserIds );
                this.setState({  validUserIds: validUserIds, });
            }).catch((e) => {
                let errMessage = getHelpfullError(e, true, true);
                console.log('Not able to get SiteUsers', errMessage);
            });
        }

        if ( testLists.length > 0 ) {
            for ( let i in testLists ) {
                this.checkThisWeb(parseInt(i,10), testLists, definedList);
            }
        }
    }

    private checkThisWeb(index: number, testLists : IMakeThisList[], definedList: IDefinedLists ){
        const thisWeb = Web(testLists[index].webURL);
        testLists[index].webExists = false;
        testLists[index].listExists = false;
        testLists[index].existingTemplate = null;
        testLists[index].sameTemplate = false;

        thisWeb.lists.get().then((response) => {
            testLists[index].webExists = true;
            //this.checkThisList(index, testLists, thisWeb, definedList);
            let responseIdx = doesObjectExistInArray(response, 'Title', testLists[index].title ); //Check existing lists for the new list

            if ( responseIdx === false ) {

            } else {
                testLists[index].listExists = true;     //Copied in from checkThisList
                testLists[index].listExistedB4 = true;  //Copied in from checkThisList
                testLists[index].existingTemplate = response[responseIdx].BaseTemplate;
                testLists[index].sameTemplate = testLists[index].existingTemplate === testLists[index].template ? true : false;    
                testLists[index].onCurrentSite = testLists[index].webURL.toLowerCase() === this.props.pageContext.web.absoluteUrl.toLowerCase() + '/' ? true : false; 
            }

            this.updateStateLists(index, testLists, definedList);

        }).catch((e) => {
            let errMessage = getHelpfullError(e, true, true);
            console.log('checkThisWeb', errMessage);
            this.updateStateLists(index, testLists, definedList);

        });
    }

    
    private updateStateLists(index: number, testLists : IMakeThisList[], definedList: IDefinedLists ) {
        let stateLists = this.state.lists;
        if (stateLists === undefined ) { stateLists = this.props.lists ; }
        stateLists[index] = testLists[index];
        this.setState({
            lists: stateLists,
            definedList: definedList,
        });
    }

/*
    private checkThisList(index: number, testLists : IMakeThisList[], thisWeb: any, definedList: IDefinedLists ){
        //const thisWeb = Web(testLists[index].webURL);
        thisWeb.lists.getByTitle(testLists[index].title).get().then((response) => {
            testLists[index].listExists = true;
            testLists[index].listExistedB4 = true;
            this.updateStateLists(index, testLists, definedList);

        }).catch((e) => {
            let errMessage = getHelpfullError(e, true, true);
            console.log('checkThisList', errMessage);
            this.updateStateLists(index, testLists, definedList);
        });
    }
*/

    //this.setState({ provisionListTitles: provisionListTitles, });
    
    
    private UpdateCurrentList(oldVal: any): any {
        this.setState({ currentList: oldVal, });
    }
    private UpdateMessage1(oldVal: any): any {
        this.setState({ message1: oldVal, });
    }
    private UpdateCode(oldVal: any): any {
        this.setState({ code: oldVal, });
    }

      private UpdateJSONItems(oldVal: any): any {

        try {

            let firstBrace =oldVal.indexOf('{');
            let closingBrace =  oldVal.lastIndexOf('}');
            if ( firstBrace === 0 && closingBrace === ( oldVal.length - 1 ) ) {
                oldVal= '[' + oldVal + ']';
            }

            let datesJSON = JSON.parse(oldVal);

            this.setState({ 
                datesJSON: datesJSON,
                datesString: oldVal,
            });

        } catch (e) {
            alert('Opps! Invalid Field JSON!' + e );
        }

      }


      private UpdateTitles( oldVal: any, index: number ) {
        let provisionListTitles = this.state.provisionListTitles;
        provisionListTitles[index] = oldVal;
        this.setState({ provisionListTitles: provisionListTitles, });

        let stateLists = this.state.lists;
        let listName = cleanSPListURL(camelize(oldVal, true));

        let definedList = this.state.definedList;

        let reDefinedList :  IMakeThisList = stateLists[0];
        reDefinedList.name = listName;
        reDefinedList.title = oldVal;
        reDefinedList.desc = oldVal + ' list for this Webpart';

        reDefinedList.listURL = this.props.pickedWeb.url + '/' + ( reDefinedList.template === 100 ? 'lists/' : '') + listName;

        this.checkThisWeb(index, [ reDefinedList ], definedList);

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
        private getEditToggles() {

            let toggleLabel = <span style={{ color: '', fontWeight: 700, whiteSpace: 'nowrap'}}>Edit or View items</span>;
            let togDoEditItems = {
                label: toggleLabel,
                key: 'togDoEdit',
                _onChange: this.updateTogggleDoEditItems.bind(this),
                checked: this.state.DoEditItems,
                onText: 'Edit',
                offText: 'View',
                className: '',
                styles: '',
            };

            let theseToggles = [ togDoEditItems ];

            let pageToggles : IContentsToggles = {
                toggles: theseToggles,
                childGap: 20,
                vertical: false,
                hAlign: 'end',
                vAlign: 'start',
                rootStyle: { width: 150, paddingTop: 0, paddingRight: '', }, //This defines the styles on each toggle
            };

            return pageToggles;

        }
        private updateTogggleDoEditItems = (item): void => {
            this.setState({
                DoEditItems: !this.state.DoEditItems,
            });
        }



    private async createGridDates (  ): Promise<IListLog[]>{

        //this.props.pickedWeb.url, this.state.currentList, this.state.itemTitle, this.state.code, this.state.message1, this.state.datesJSON, this.setProgress.bind(this)

        let webUrl : string = this.props.pickedWeb.url;
        let currentList : string = this.state.currentList;
        let itemTitle : string = this.state.itemTitle;
        let code : string = this.state.code;
        let message1 : string = this.state.message1;
        let dates : string[] = this.state.datesJSON;

        let web = Web(webUrl);
        let statusLog : IListLog[] = [];

        let list = web.lists.getByTitle(currentList);
        const entityTypeFullName = await list.getListItemEntityTypeFullName();

        let i = 0;

        //let createThisBatch : IAnyArray = [];
        //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
        let totalItems = dates.length;
        for (let thisDate of dates) {
            i ++;
            let newCode = makeid( 4 ) + randomizeCase( code ) + makeid( 3 );
            let now = new Date(thisDate);

            let item = {    'Title': itemTitle,
                'TheDate': now,
                'Message': message1,
                'Code': newCode,   };

            try {
                await list.items.add( item , entityTypeFullName).then(b => {
                    statusLog = notify(statusLog, 'Created Item', 'No-batch', null, null, null, true );
                    this.setProgress(false, "I", i, totalItems , 'darkgreen', 'CheckMark',  item.Title, 'Items: ' + item.TheDate, 'Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 95');
                });

            } catch (e) {
                let errMessage = getHelpfullError(e, true, true);

                let missingColumn = false;
                let userFieldMissingID = false;

                if ( errMessage.indexOf('missing a column') > -1 ) { missingColumn = true; }
                if ( errMessage.indexOf('does not exist on list') > -1 ) { missingColumn = true; }
                if ( errMessage.indexOf('does not exist on type') > -1 ) { missingColumn = true; }

                if ( errMessage.indexOf("A 'PrimitiveValue' node with non-null value was found when trying to read the value of a navigation property") > -1 ) { userFieldMissingID = true; }

                if ( missingColumn ) {
                    let err = errMessage;
                    statusLog = notify(statusLog, 'Problem processing item', err, null, null, null, null);
                    console.log('Issue trying to create this item:', item );
                    this.setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title, 'Items: ' + item.Code, 'Adding Item ' + i + ' of ' + totalItems + '  item', 'Add item ~ 142 + \n' + err);
                }
            }

    }

    return statusLog;
}


}