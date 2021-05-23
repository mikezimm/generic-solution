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

import { cleanSPListURL } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';
import { getChoiceKey, getChoiceText } from '@mikezimm/npmfunctions/dist/Services/Strings/choiceKeys';
import { camelize } from '@mikezimm/npmfunctions/dist/Services/Strings/stringCase';


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

import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../../../../services/createAnalytics';


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
import * as links from '@mikezimm/npmfunctions/dist/HelpInfo/Links/AllLinks';
import { IFieldDef } from '../../fields/fieldDefinitions';
import { createBasicTextField, createMultiLineTextField } from  '../../fields/textFieldBuilder';

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

import { provisionTheList, IValidTemplate } from './provisionWebPartList';

import { IGenericWebpartProps } from '../../IGenericWebpartProps';
import { IGenericWebpartState } from '../../IGenericWebpartState';
import styles from './provisionList.module.scss';

import MyLogList from './listView';

import { IMakeThisList } from './provisionWebPartList';

import { JSONEditorShort } from '../../HelpInfo/AllLinks';

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

export interface IProvisionFieldsProps {
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

export interface IProvisionFieldsState {

    alwaysReadOnly?: boolean;  // default is to be false so you can update at least local lists

    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    doMode: boolean;
    doList: boolean;
    doFields: boolean;
    doViews: boolean;
    doItems: boolean;
    doEditMain: boolean;
    doEditFields: boolean;

    listNo: number;

    currentList: string;

    // 2 - Source and destination list information
    definedList: IDefinedLists;
    provisionListTitles: string[];

    // 2 - Source and destination list information
    makeThisList: IMakeThisList;

    lists: IMakeThisList[];
    validUserIds: number[];

}

export default class ProvisionFields extends React.Component<IProvisionFieldsProps, IProvisionFieldsState> {

    private createTitleField( title ) {
        let thisField : IFieldDef = {
            name: title,
            title: null,
            column: title,
            type: 'String', //Smart, Text, Number, etc...
            required: true,
            disabled: false,
            hidden: false,
            blinkOnProject: null,
            value: title,
        };
        return thisField;
    }

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
            'Provision Lists', TargetSite, TargetList, //saveTitle, TargetSite, TargetList
            'Lists', itemInfo2, result, //itemInfo1, itemInfo2, result, 
            ActionJSON, 'ProvisionField' ); //richText

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

public constructor(props:IProvisionFieldsProps){
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
        currentList: 'Click Button to start',
        allLoaded: this.props.allLoaded,
        progress: null,
        history: this.clearHistory(),

        doMode: false,
        doList: doList,
        doFields: true,
        doViews: true,
        doItems: false,
        doEditMain: makeThisList ? false : true ,
        doEditFields: false,

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

    public render(): React.ReactElement<IProvisionFieldsProps> {

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

            let thisPage = null;
            let stringsError = <tr><td>  </td><td>  </td><td>  </td></tr>;

            let createButtonOnClicks = [
                this.CreateList_0.bind(this),
            ];

            const buttons: ISingleButtonProps[] = this.state.lists.map (( thelist, index ) => {
                let theLabel = null;
                let isDisabled = !thelist.webExists;

                if ( thelist.webExists ) {
                    if ( thelist.title === '' ) {
                        theLabel = "Update Title";
                        isDisabled = true;

                    } else if ( this.isListReadOnly(thelist) === false ) {

                        if ( thelist.listExists === true ) {
                            if ( thelist.sameTemplate === true ) {
                                theLabel = "UPDATE to " + thelist.listDefinition;

                            } else {
                                theLabel = "Not a " + ( thelist.template === 100 ? "List" : "Library" );
                                isDisabled = true;
                            }

                        } else {
                            theLabel = "Create as " + thelist.listDefinition;
                        }

                    } else {
                        if ( thelist.listExists === true ) {
                            theLabel = "Verify as " + thelist.listDefinition;
                            console.log('render theList:', thelist ) ;

                        } else {
                            theLabel = "Can't verify List";
                            isDisabled = true;
                        }
                    }
                } else {
                    theLabel = thelist.title + ' web does not exist!';
                }

                return {     disabled: isDisabled,  checked: true, primary: false,
                    label: theLabel, buttonOnClick: createButtonOnClicks[index], };
            });

        

            //let provisionButtons = <div style={{ paddingTop: '20px' }}><ButtonCompound buttons={buttons} horizontal={true}/></div>;
            let updateTitleFunctions = [this.UpdateTitle_0.bind(this)];
            let provisionButtons = buttons.map ( ( theButton, index ) => {
                let thisTitle = this.state.provisionListTitles[index];
                let titleBox = createBasicTextField(this.createTitleField(thisTitle), thisTitle, updateTitleFunctions[index], styles.listProvTextField1 );
                return <div style={{ paddingTop: '20px' }}><div> { titleBox }</div><ButtonCompound buttons={[theButton]} horizontal={true} /></div>;
            });


            let listLinks = this.state.lists.map( mapThisList => (
                mapThisList.listExists ? links.createLink( mapThisList.listURL, '_none',  'Go to: ' + mapThisList.title ) : null ));

            const stackProvisionTokens: IStackTokens = { childrenGap: 70 };

            let provisionButtonRow = <Stack horizontal={true} wrap={true} horizontalAlign={"start"} verticalAlign= {"center"} tokens={stackProvisionTokens}>{/* Stack for Buttons and Fields */}
                    { provisionButtons }
                    { listLinks }
                    {  }
                </Stack>;

            let myProgress = this.state.progress == null ? null : <ProgressIndicator
                label={this.state.progress.label}
                description={this.state.progress.description}
                percentComplete={this.state.progress.percentComplete}
                progressHidden={this.state.progress.progressHidden}/>;


            let errorList = <MyLogList
                title={ 'Error'}           items={ this.state.history.errors }
                descending={false}          titles={null}            ></MyLogList>;

            let fieldList = <MyLogList
                title={ 'Column'}           items={ this.state.history.columns }
                descending={false}          titles={null}            ></MyLogList>;

            let viewList = <MyLogList
                title={ 'View'}           items={ this.state.history.views }
                descending={false}          titles={null}            ></MyLogList>;

            let itemList = <MyLogList
                title={ 'Item'}           items={ this.state.history.items }
                descending={false}          titles={null}            ></MyLogList>;

            let disclaimers = <div>
                <h2>Disclaimers.... still need to work on</h2>
                <span style={{ fontSize : 'xx-large'}}><mark>THIS PAGE IS CAN BREAK LISTS</mark></span>
                <p>Every click is tracked :)</p>
                <p>When selecting list type, it should set default list titles per list type.</p>
                <ul>
                    <li>Set Title in onCreate</li>
                    <li>Create columns fields and views for other common lists</li>
                </ul>
            </div>;


            let listDetails = null;
            let editToggles = <div style={ { display: 'inline-flex' , marginLeft: 20 }}> { makeToggles(this.getEditToggles()) } </div>;

            if ( this.state.listNo !== null && this.state.lists && this.state.lists.length > 0 && this.state.doMode !== true ) {
                       
                let tempJSON = JSON.parse(JSON.stringify( this.state.lists[ this.state.listNo ] ));
                if ( this.state.doFields !== true ) { tempJSON.createTheseFields = []; }
                if ( this.state.doViews !== true ) { tempJSON.createTheseViews = []; }
                if ( this.state.doItems !== true ) { tempJSON.createTheseItems = []; }

                let JSONString = JSON.stringify(this.state.lists[0]);
                let listDefInputField = this.state.doEditMain === true ? 
                    createMultiLineTextField( 'Paste List JSON', JSONString, this.UpdateJSON.bind(this), styles.listProvTextField1 ) :
                    <div style={{ overflowY: 'auto' }}>
                        <ReactJson src={ tempJSON } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                    </div>;

                listDetails = <div style={{display: '', marginBottom: '30px' }}>
                        <div><h2>Details for list: <span style={{fontSize: 'small', paddingLeft: '50px'}}> { JSONEditorShort } </span></h2></div>
                        { listDefInputField }
                    </div>;

            } 


            let fieldDetails = null;

            if ( this.state.listNo !== null && this.state.lists && this.state.lists.length > 0 && this.state.doMode !== true  ) {
 
                let tempJSON = this.state.lists[ this.state.listNo ].createTheseFields ? JSON.parse(JSON.stringify( this.state.lists[ this.state.listNo ].createTheseFields )) : [];
                if ( this.state.doFields !== true ) { tempJSON.createTheseFields = []; }
    
                let JSONString = JSON.stringify(this.state.lists[0].createTheseFields);
                let fieldDefInputField = this.state.doEditFields === true ? 
                        createMultiLineTextField( 'Paste fields JSON', JSONString, this.UpdateJSONFields.bind(this), styles.listProvTextField1 ) :
                        <div style={{ overflowY: 'auto' }}>
                            <ReactJson src={ tempJSON } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                        </div>;

                fieldDetails = <div style={{display: '', marginBottom: '30px' }}>
                        <div><h2>Details for fields:  <span style={{fontSize: 'small', paddingLeft: '50px'}}> { JSONEditorShort } </span></h2></div>
                        { fieldDefInputField }
                    </div>;

            } 

            const stackListTokens: IStackTokens = { childrenGap: 10 };

            thisPage = <div><div>{ disclaimers }</div>

                <div> { toggles } </div>
                <div> { provisionButtonRow } </div>
                <div style={{ height:30} }> {  } </div>

                <div style={{display: this.state.doMode === true ? '': 'none' }}>
                        <div> { myProgress } </div>
                        <div> {  } </div>
                        <div> <h2>{ this.state.currentList }</h2> </div>
                        <div>
                        <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={stackListTokens}>{/* Stack for Buttons and Fields */}
                            { errorList }
                            { fieldList }
                            { viewList }
                            { itemList }
                        </Stack>
                        </div>
                </div>
                <div style={{display: this.state.doMode === true ? 'none': '' }}>
                    { editToggles }
                    { fieldDetails }
                    { listDetails }

                </div>
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

  private CreateThisList( mapThisList: IMakeThisList, listNo: number ): any {

    this.setState({ currentList: mapThisList.listDefinition + ' list: ' + mapThisList.title, history: this.clearHistory(), listNo: listNo });

    let listName = mapThisList.title ? mapThisList.title : mapThisList.title;

    let readOnly: boolean  = this.isListReadOnly(mapThisList);

    if ( this.state.doMode === true ) {

        this.captureAnalytics('Update List', 'Updating', mapThisList);

        let listCreated = provisionTheList( mapThisList, readOnly, this.setProgress.bind(this), this.markComplete.bind(this) , this.state.doFields, this.state.doViews, this.state.doItems, false );

        let stateLists = this.state.lists;
        stateLists[listNo].listExists = true;

        let workingMessage = readOnly === true ? 'Verifying list: ': 'Building list: ' ;

        if ( listCreated ) {
            this.setState({
                currentList: workingMessage + listName,
                lists: stateLists,
            });
        }
    } else {
        console.log( 'listNo, mapThisList', listNo, mapThisList );
    }


        
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
        } else if ( list === 'C') {
            history.columns = history.columns.length === 0 ? [progress] : [progress].concat(history.columns);
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

    private updateStateLists(index: number, testLists : IMakeThisList[], definedList: IDefinedLists ) {
        let stateLists = this.state.lists;
        if (stateLists === undefined ) { stateLists = this.props.lists ; }
        stateLists[index] = testLists[index];
        this.setState({
            lists: stateLists,
            definedList: definedList,
        });
    }

    private getDefinedLists( defineThisList : IDefinedLists, justReturnLists : boolean ) {

        let theLists : IMakeThisList[] = [];

        let provisionListTitles =  this.state ? this.state.provisionListTitles : this.props.provisionListTitles;

        if ( justReturnLists === false ) { provisionListTitles = [] ; }

        if ( defineThisList === availLists[0] ) {
            //let buEmails : IMakeThisList = dHarm.defineTheList( 101 , provisionListTitles[0], 'BUEmails' , this.props.pickedWeb.url, this.state.validUserIds, this.props.pageContext.web.absoluteUrl );
            this.setState({
                lists: theLists,
                definedList: defineThisList,
            });
        } else if ( defineThisList === 'TrackMyTime' ) {

            if ( justReturnLists === false ) {  provisionListTitles.push('Projects');  provisionListTitles.push('TrackMyTime');  }

            let parentList : IMakeThisList = dTMT.defineTheList( 100 , provisionListTitles[0], 'Projects' , this.props.pickedWeb.url, this.state.validUserIds, this.props.pageContext.web.absoluteUrl );
            let childList : IMakeThisList = dTMT.defineTheList( 100 , provisionListTitles[1], 'TrackMyTime' , this.props.pickedWeb.url, this.state.validUserIds, this.props.pageContext.web.absoluteUrl );
        
            if ( parentList ) { theLists.push( parentList ); }
            if ( childList ) { theLists.push( childList ); }

        } else if ( defineThisList === 'Harmon.ie' ) {
            
            if ( justReturnLists === false ) {  provisionListTitles.push('BUEmails');  provisionListTitles.push('Emails');  }

            let buEmails : IMakeThisList = dHarm.defineTheList( 101 , provisionListTitles[0], 'BUEmails' , this.props.pickedWeb.url, this.state.validUserIds, this.props.pageContext.web.absoluteUrl );
            let justEmails : IMakeThisList = dHarm.defineTheList( 101 , provisionListTitles[1], 'Emails' , this.props.pickedWeb.url, this.state.validUserIds, this.props.pageContext.web.absoluteUrl );
        
            if ( buEmails ) { theLists.push( buEmails ); }
            if ( justEmails ) { theLists.push( justEmails ); }

        } else if ( defineThisList === 'Drilldown' ) {

            if ( justReturnLists === false ) {  provisionListTitles.push('Drilldown');  provisionListTitles.push('Drilldown');  }

            let buEmails : IMakeThisList = dPCP.defineTheList( 100 , provisionListTitles[0], 'Drilldown' , this.props.pickedWeb.url, this.state.validUserIds, this.props.pageContext.web.absoluteUrl );
            let justEmails : IMakeThisList = dPCP.defineTheList( 100 , provisionListTitles[1], 'Drilldown' , this.props.pickedWeb.url, this.state.validUserIds, this.props.pageContext.web.absoluteUrl );
        
            if ( buEmails ) { theLists.push( buEmails ); }
            if ( justEmails ) { theLists.push( justEmails ); }

        } else if ( defineThisList === 'Customer Requirements' ) {

            if ( justReturnLists === false ) {  provisionListTitles.push('Program');  provisionListTitles.push('SORInfo');  }

            let progCustRequire : IMakeThisList = dCust.defineTheList( 101 , provisionListTitles[0], 'Program' , this.props.pickedWeb.url, this.state.validUserIds, this.props.pageContext.web.absoluteUrl );
            let sorCustRequire : IMakeThisList = dCust.defineTheList( 101 , provisionListTitles[1], 'SORInfo' , this.props.pickedWeb.url, this.state.validUserIds, this.props.pageContext.web.absoluteUrl );
        
            if ( progCustRequire ) { theLists.push( progCustRequire ); }
            if ( sorCustRequire ) { theLists.push( sorCustRequire ); }

        }

        if ( justReturnLists === true ) {
            return theLists;

        } else {
            for ( let i in theLists ) {
                this.checkThisWeb(parseInt(i,10), theLists, defineThisList );
            }
        }
        return theLists;
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

        let theLists = this.getDefinedLists(thisValue, false);

        let doList: boolean = theLists.length === 0 ? null : theLists[0].template === 100 ? true : theLists[0].template === 101 ? false : null;

        this.setState({ lists: theLists, doList: doList });

    }

    private UpdateTitle_0(oldVal: any): any {
        this.UpdateTitles(oldVal,0);
      }

      private UpdateJSON(oldVal: any): any {
        let newMapThisList = null;

        try {
            let doFields = this.state.doFields;
            let doViews = this.state.doViews;
            let doItems = this.state.doItems;

            //oldVal = oldVal.replace('doubleQuotes','\"');
            newMapThisList = JSON.parse(oldVal);

            if ( this.state.lists.length === 0 ) {
                if (  newMapThisList.createTheseFields && newMapThisList.createTheseFields.length > 0 ) { } else { doFields = false ; }
                if (  newMapThisList.createTheseViews && newMapThisList.createTheseViews.length > 0 ) { } else { doViews = false ; }
                if (  newMapThisList.createTheseItems && newMapThisList.createTheseItems.length > 0 ) { } else { doItems = false ; }
            }

            let definedList = newMapThisList.definedList;

            this.setState({ 
                lists: [newMapThisList],
                doFields: doFields,
                doViews: doViews,
                doItems: doItems,
                definedList: definedList,
                listNo: 0,
            });

        } catch (e) {
            alert('Opps! Invalid List JSON!' + e );
        }

      }

      private UpdateJSONFields(oldVal: any): any {
        let newMapThisList : IMakeThisList = null;

        try {
            let doFields = this.state.doFields;

            //oldVal = oldVal.replace('doubleQuotes','\"');
            newMapThisList  = this.state.lists[0];

            let firstBrace =oldVal.indexOf('{');
            let closingBrace =  oldVal.lastIndexOf('}');
            if ( firstBrace === 0 && closingBrace === ( oldVal.length - 1 ) ) {
                oldVal= '[' + oldVal + ']';
            }

            let newFields = JSON.parse(oldVal);

            if ( this.state.lists.length === 0 ) {
                if (  newMapThisList.createTheseFields && newMapThisList.createTheseFields.length > 0 ) { } else { doFields = false ; }
            }

            newMapThisList.createTheseFields = newFields;

            let definedList = newMapThisList.definedList;

            this.setState({ 
                lists: [newMapThisList],
                doFields: doFields,
                definedList: definedList,
                listNo: 0,
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

            let toggleLabelMain = <span style={{ color: '', fontWeight: 700, whiteSpace: 'nowrap'}}>Edit or View entire list</span>;
            let togDoEditMain = {
                label: toggleLabelMain,
                key: 'togDoEdit',
                _onChange: this.updateTogggleDoEditMain.bind(this),
                checked: this.state.doEditMain,
                onText: 'Edit',
                offText: 'View',
                className: '',
                styles: '',
            };

            let toggleLabel = <span style={{ color: '', fontWeight: 700, whiteSpace: 'nowrap'}}>Edit or View columns</span>;
            let togDoEditFields = {
                label: toggleLabel,
                key: 'togDoEdit',
                _onChange: this.updateTogggleDoEditFields.bind(this),
                checked: this.state.doEditFields,
                onText: 'Edit',
                offText: 'View',
                className: '',
                styles: '',
            };

            let theseToggles = [ togDoEditFields, togDoEditMain ];

            let pageToggles : IContentsToggles = {
                toggles: theseToggles,
                childGap: 20,
                vertical: false,
                hAlign: 'end',
                vAlign: 'start',
                rootStyle: { width: 200, paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
            };

            return pageToggles;

        }

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
                label: 'Fields ' + ( this.state.lists.length > 0 && listNo !== null ? `(${this.state.lists[listNo].createTheseFields.length})` : '' ),
                key: 'togDoFields',
                _onChange: this.updateTogggleDoFields.bind(this),
                checked: this.state.doFields,
                onText: 'Include',
                offText: 'Skip',
                className: '',
                styles: '',
            };

            let togDoViews = {
                label: 'Views ' + ( this.state.lists.length > 0 && listNo !== null ? `(${this.state.lists[listNo].createTheseViews.length})` : '' ),
                key: 'togDoViews',
                _onChange: this.updateTogggleDoViews.bind(this),
                checked: this.state.doViews,
                onText: 'Include',
                offText: 'Skip',
                className: '',
                styles: '',
            };

            
            let togDoItems = {
                label: 'Items ' + ( this.state.lists.length > 0 && listNo !== null ? `(${this.state.lists[listNo].createTheseItems.length})` : '' ),
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

        private updateTogggleDoEditMain = (item): void => {
            this.setState({
                doEditMain: !this.state.doEditMain,
            });
        }

        private updateTogggleDoEditFields = (item): void => {
            this.setState({
                doEditFields: !this.state.doEditFields,
            });
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

            stateLists.map( theList => {  // listURL, template
                theList.template = newSetting === true ? 100 : 101;
                theList.listURL = theList.webURL + ( newSetting === true ? 'lists/' : '' ) + theList.name;
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