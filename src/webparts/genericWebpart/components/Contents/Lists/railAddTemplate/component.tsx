
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
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { Web, IList, Site, ISite } from "@pnp/sp/presets/all";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import { Panel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { PageContext } from '@microsoft/sp-page-context';

import { Spinner, SpinnerSize, } from 'office-ui-fabric-react/lib/Spinner';
import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { MessageBar, MessageBarType,  } from 'office-ui-fabric-react/lib/MessageBar';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox, } from 'office-ui-fabric-react/lib/SearchBox';

import ButtonCompound from '../../../createButtons/ICreateButtons';

import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton, CompoundButton, elementContains } from 'office-ui-fabric-react';

import { mergeStyles, noWrap } from 'office-ui-fabric-react/lib/Styling';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ReactJson from "react-json-view";

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
 import { makeid } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';
 import { IArraySummary, IRailAnalytics, groupArrayItemsByField, } from '@mikezimm/npmfunctions/dist/Services/Arrays/grouping';
 import { getChoiceKey, getChoiceText } from '@mikezimm/npmfunctions/dist/Services/Strings/choiceKeys';
 import { JSONEditorShort } from '@mikezimm/npmfunctions/dist/HelpInfo/Links/LinksDevDocs';

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

import { saveTheTime, getTheCurrentTime, saveAnalytics, AddTemplateSaveTitle, ProvisionListsSaveTitle } from '../../../../../../services/createAnalytics';

import { createMainRailsWarningBar } from '../../../../../../services/railsCommon/RailsMainWarning';

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

  import { IContentsToggles, makeToggles } from '../../../fields/toggleFieldBuilder';
  import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';
  import { dropDownWidth } from '../../../ListProvisioning/component/provisionListComponent';  //IDefinedLists, availLists, definedLists,
  import { IDefinedLists, availLists, definedLists, getTheseDefinedLists, availComponents } from '../../../ListProvisioning/component/provisionFunctions';

  import { provisionTheList, IValidTemplate } from '../../../ListProvisioning/component/provisionWebPartList';
  import { IMakeThisList } from '../../../ListProvisioning/component/provisionWebPartList';
  import { fixTitleNameInViews  } from '../../../../../../services/listServices/viewServices'; //Import view arrays for Time list
  import MyLogList from '../../../ListProvisioning/component/listView';


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

 import stylesC from './component.module.scss';
 import { makeIMakeThisListFromExisting } from './functions';

//  "analyticsListRailsApply": "EasyContentsRailsApply",
//  "analyticsListRailsGroups": "EasyContentsRailsGroups",
//  "analyticsListPermissionsHistory": "PermissionsHistory",
 import * as strings from 'GenericWebpartWebPartStrings';


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


export interface IMyAddListTemplateProps {
    theList: IContentsListInfo;
    user: IUser;
    wpContext: WebPartContext;
    pageContext: PageContext;
    railFunction: string;
    showPanel: boolean;
    _closePanel: any;

    type: PanelType;

    // json1: any;
    // json2?: any;

    // _fetchCompare: any; //Function that will get json2 from inputs in this component

    pickedWeb : IPickedWebBasic;

    analyticsWeb: string;
    analyticsList: string;

    allowOtherSites: boolean;
    alwaysReadOnly: boolean;

    errorMess: string;

    theSite: ISite;
    currentPage: string; //this.context.pageContext.web.absoluteUrl;

  }

  export type IMainPivot = 'FullList' | 'Components' | 'History';

  const pivotHeading1 : IMainPivot = 'FullList';  //Templates
  const pivotHeading2 : IMainPivot = 'Components';  //Templates
  const pivotHeading3 : IMainPivot = 'History';  //Templates

export function buildMainPivotDescriptions() {
    let result : any = {};
    result[ pivotHeading1 ] = 'Apply Full List Template to existing list';
    result[ pivotHeading2 ] = 'Apply sets of columns and views to existing list';
    result[ pivotHeading3 ] = 'See history of what has already been done';

    return result;
}

export interface IMyAddListTemplateState {

    disableDo: boolean;
    finished: boolean;
    refreshId: string;
    errorMess: string;

    mainPivot: IMainPivot;

    otherWeb: string;
    otherList: string;
    otherProp: string;

    // 2 - Source and destination list information
    makeThisList: IMakeThisList;
    onCurrentSite: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    lists: IMakeThisList[];

    definedList: IDefinedLists; 
    applyThisVersion: string; //should tell us what version of the defined list is picked.
    listNo: number; //should tell us what version of the defined list is picked.
    status: string;

    doMode: boolean;
    doList: boolean;
    doFields: boolean;
    doViews: boolean;
    doItems: boolean;

    showMainWarning: boolean;

}

const pivotStyles = {
    root: {
      whiteSpace: "normal",
    //   textAlign: "center"
    }};

const toggleStyles = { root: { width: 160, } };

const panelWidth = '90%';

const groupBottomPadding = '25px';
const toggleBottomPadding = '5px';


export default class MyAddListTemplate extends React.Component<IMyAddListTemplateProps, IMyAddListTemplateState> {

    private headingDesc = buildMainPivotDescriptions();

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

    constructor(props: IMyAddListTemplateProps) {
        super(props);
        let listTitle = this.props.theList.Title;

        // let startTime = getTheCurrentTime();
        let startTime = new Date();
        let refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();

        let definedList = availLists[0];

        //makeIMakeThisListFromExisting( definedList: IDefinedLists, listDefinition: string, theList: IContentsListInfo, consoleLog: boolean = false ) {
        let makeThisList : IMakeThisList = makeIMakeThisListFromExisting( definedList , '' , this.props.theList, true ) ;
        let doList = this.props.theList.BaseType === 0 || this.props.theList.BaseTemplate === 100 ? true : false;

        let theLists = getTheseDefinedLists( definedList, true, [ makeThisList.title ], [], makeThisList.webURL, makeThisList.webURL, doList, null );
        console.log( 'theLists in railAddTemplate props: ', theLists );

        this.state = {
            disableDo: false,
            refreshId: refreshId,
            finished: false,
            errorMess: '',
            otherWeb: '',
            otherList: '',
            otherProp: '',
            makeThisList: makeThisList,
            onCurrentSite: makeThisList.onCurrentSite,
            applyThisVersion: '',
            listNo: 0,
            progress: null,
            status: null,
            history: clearHistory(),
            lists: theLists,
            definedList: definedList,
            doMode: false,
            doList: doList,
            doFields: true,
            doViews: true,
            doItems: false,
            mainPivot: pivotHeading1,
            showMainWarning: true,
        };
    }
        
    public componentDidMount() {
        // this._doCheck();
        //this._getListItems();
    }

    // private async _doCheck() {
    //     this.setState({

    //     });
    // }

    

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

    public componentDidUpdate(prevProps: IMyAddListTemplateProps): void {
        
        if ( prevProps.theList.Id !== this.props.theList.Id ) {
            let definedList = availLists[0];

            //makeIMakeThisListFromExisting( definedList: IDefinedLists, listDefinition: string, theList: IContentsListInfo, consoleLog: boolean = false ) {
            let makeThisList : IMakeThisList = makeIMakeThisListFromExisting( definedList , '' , this.props.theList, true ) ;
            let doList = this.props.theList.BaseType === 0 || this.props.theList.BaseTemplate === 100 ? true : false;
    
            let theLists = getTheseDefinedLists( definedList, true, [ makeThisList.title ], [], makeThisList.webURL, makeThisList.webURL, doList, null );
            console.log( 'theLists in railAddTemplate props: ', theLists );
            this.setState({ 
                doList: doList,
                lists: theLists,
                definedList: definedList,
            });
            console.log( 'componentDidUpdate: TRUE' );

        } else {
            // console.log( 'componentDidUpdate: FALSE' ); 
        }

        // this.setState({ refreshId: makeid(5) })
    //this._updateWebPart(prevProps);
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


    public render(): React.ReactElement<IMyAddListTemplateProps> {

        if ( this.props.theList ) {
            // console.log( 'render' );
            let listOrLib = this.props.theList.BaseType === 0 ? 'List' : 'Library' ;

            let panelContent = null;

            let listDropdown = null;
            if ( this.state.mainPivot === 'FullList' ) {
                listDropdown = this._createDropdownField( 'Pick your list type' , availLists , this._updateListDropdownChange.bind(this) , null );
            }

            let createButton = <PrimaryButton text={ 'Apply Template' } onClick={ this.CreateList.bind(this) } allowDisabledFocus disabled={ this.state.doMode !== true ? true : false } checked={ false } />;
            let cancelButton = <DefaultButton text={ 'Cancel' } onClick={ this.props._closePanel } allowDisabledFocus disabled={ false } checked={ false } />;
            let toggles = <div style={ { display: 'inline-flex' , marginLeft: 0 }}> { makeToggles(this.getPageToggles()) } { createButton } { cancelButton } </div>;

            let listDefinitionSelectPivot = 
                <Pivot
                    styles={ pivotStyles }
                    linkFormat={PivotLinkFormat.tabs}
                    linkSize={PivotLinkSize.normal}
                    onLinkClick={this._selectedListDefIndex.bind(this)}
                > 
                    { this.state.lists.map ( ( thelist, index ) => {
                        return <PivotItem headerText={ thelist.listDefinition } ariaLabel={thelist.listDefinition} title={thelist.listDefinition} itemKey={ thelist.listDefinition + '|' + index }></PivotItem>;
                    }) }
                </Pivot>;

            let myProgress = this.state.progress == null ? null : <ProgressIndicator
                label={this.state.progress.label}
                description={this.state.progress.description}
                percentComplete={this.state.progress.percentComplete}
                progressHidden={this.state.progress.progressHidden}/>;


            let errorList = <MyLogList
                title={ 'Error'}           items={ this.state.history.errors }
                descending={false}          titles={null}            ></MyLogList>;

            let fieldList = <MyLogList
                title={ 'Column'}           items={ this.state.history.fields }
                descending={false}          titles={null}            ></MyLogList>;

            let viewList = <MyLogList
                title={ 'View'}           items={ this.state.history.views }
                descending={false}          titles={null}            ></MyLogList>;

            let itemList = <MyLogList
                title={ 'Item'}           items={ this.state.history.items }
                descending={false}          titles={null}            ></MyLogList>;

            let listDefinitionJSON = null;

            if ( this.state.doMode !== true && this.state.lists.length > 0) {
                let listJSON = null; 
                let tempJSON = JSON.parse(JSON.stringify( this.state.lists[ this.state.listNo ] )) ;
                if ( this.state.doFields !== true ) { tempJSON.createTheseFields = []; }
                if ( this.state.doViews !== true ) { tempJSON.createTheseViews = []; }
                if ( this.state.doItems !== true ) { tempJSON.createTheseItems = []; }

                listJSON = <div style={{ overflowY: 'auto' }}>
                    <ReactJson src={ tempJSON } collapsed={ 1 } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                </div>;

                    listDefinitionJSON = <div style={{display: '', marginBottom: '30px' }}>
                         <div><h2>Details for list:{ this.state.lists[ this.state.listNo ].listDefinition } <span style={{fontSize: 'small', paddingLeft: '50px'}}> { JSONEditorShort } </span></h2></div>
                        { listJSON }
                    </div>;

            } 

            const stackListTokens: IStackTokens = { childrenGap: 10 };

            let pickedDesc = this.state.lists && this.state.lists.length > 0 ? this.state.lists[ this.state.listNo].templateDesc : 'Nothing selected yet' ;

            /**
             * This builds the Fields and Views details which are visible when you hover over the pickedDesc
             */
            let pickedDetails = this.state.lists && this.state.lists.length > 0 ? this.state.lists[ this.state.listNo].templateDetails : null ;
            let details = pickedDetails && pickedDetails.indexOf('\n') > 0 ? pickedDetails.split('\n') : [ pickedDetails ];

            if ( pickedDetails !== null ) {
                pickedDetails = [];
                details.map( detail => {
                    let detailSet = detail.split(':');
                    if ( detailSet.length > 1 ) {
                        let itemCount = detailSet[1].split(',').length;
                        detailSet[0] = `${detailSet[0]} ( ${ itemCount })`;
                        pickedDetails.push( <h3> { detailSet[0] } </h3>);
    
                        let detailItems = itemCount < 2 ? detailSet[1] :
                            detailSet[1].split(',').map( item => {
                                return <span style={{ whiteSpace: 'nowrap', paddingRight: '30px', minWidth: '180px' }}>{ item }</span>;
                            });
                        pickedDetails.push( <div style={{paddingTop: '15px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}> { detailItems } </div>);
                    } else {
                        pickedDetails.push( <p> { detailSet[0] } </p>);
                    }
                });
            }

            // let thisPage = <div><div>{ disclaimers }</div>
            let thisPage = <div style={{ paddingTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '20px' }}>
                    <div style={{ float: 'left' }}> { listDropdown } </div>
                    <div style={{ paddingLeft: listDropdown === null ? '0px' : '60px' }}> { listDefinitionSelectPivot } </div>
                </div>

                <div> { toggles } </div>
                <div className={ stylesC.description }>
                    <div style={{ paddingTop: '10px', }}> <span style={{ fontSize: 'larger' }}> { pickedDesc } </span></div>
                    <div style={{ paddingTop: '10px', display: pickedDetails === null ? 'none' : '' }}> { pickedDetails }</div>
                </div>

                <div style={{display: this.state.doMode === true ? '': 'none' }}>
                        <div> { myProgress } </div>
                        <div> {  } </div>
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
                    { listDefinitionJSON }
                </div>
            </div>;


            //This should be similar for all Rails
            let mainWaringContent = <div>
                <h2 style={{margin: '0px'}}>Applying changes will:</h2>
                <ul>
                    <li>Add fields and views if they do not exist</li>
                    <li>WILL Modify Views if they already exist</li>
                </ul>
                <h3>Applying changes will NOT:</h3>
                <ul>
                    <li>Will NOT Modify fields if they already exist</li>
                </ul>
            </div>
            let warning = createMainRailsWarningBar( panelWidth, this.state.showMainWarning , mainWaringContent, this.hideMainWarning.bind(this) );


            panelContent = <div>
                <div> { warning } </div>
                <h3> { `${ this.props.theList.Title } ${ listOrLib }` }</h3>
                <Pivot
                    styles={ pivotStyles }
                    linkFormat={PivotLinkFormat.links}
                    linkSize={PivotLinkSize.normal}
                    onLinkClick={this._selectedIndex.bind(this)}
                >
                    <PivotItem headerText={pivotHeading1} ariaLabel={pivotHeading1} title={pivotHeading1} itemKey={pivotHeading1} itemIcon={ null }>

                        {/* <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                            { this.makeToggle( 'Create Contributors', true, false, this.updateTogggle1.bind(this) ) }
                            { this.makeToggle( 'Read site', true, false, this.updateTogggle1.bind(this) ) }
                        </div> */}

                        {/* { this.makeGroupName( 'Enter compare web URL', 'def' , this._updateText1.bind(this) , false, '0px 0px ' + groupBottomPadding + '0px' )} */}
                        {/* { this.makeGroupName( 'Enter compare List Title', 'def' , this._updateText2.bind(this) , false, '0px 0px ' + groupBottomPadding + '0px' )} */}
                        {/* { this.makeGroupName( 'List, Fields, Views, Types', 'List' , this._updateText3.bind(this) , false, '0px 0px ' + groupBottomPadding + '0px' )} */}

                        { <div style={{display: this.state.errorMess !== '' ? null : 'none', width: panelWidth, margin: '20px 0px' }}>
                            <MessageBar messageBarType={MessageBarType.warning}>
                                { this.state.errorMess }
                            </MessageBar>
                        </div> }


                    </PivotItem>
                    <PivotItem headerText={pivotHeading2} ariaLabel={pivotHeading2} title={pivotHeading2} itemKey={pivotHeading2} itemIcon={ null }>
                        <div style={{marginTop: '20px'}}>
                            {/* { permissions } */}
                        </div>
                    </PivotItem>
                    <PivotItem headerText={pivotHeading3} ariaLabel={pivotHeading3} title={pivotHeading3} itemKey={pivotHeading3} itemIcon={ null }>
                        <div style={{marginTop: '20px'}}>
                            {/* { history } */}
                        </div>
                    </PivotItem>
                </Pivot>
                { thisPage }

            </div>;

            let panelHeader = this.headingDesc[ this.state.mainPivot ] ;
            return (
                <div><Panel
                        isOpen={ this.props.showPanel }
                        // this prop makes the panel non-modal
                        isBlocking={true}
                        onDismiss={ this.props._closePanel }
                        closeButtonAriaLabel="Close"
                        type = { this.props.type }
                        isLightDismiss = { true }
                        headerText = { panelHeader }
                        >
                        { panelContent }

                    </Panel>
                </div>

            );

        } else { //No list was detected

            // <div className={ styles.container }></div>
            return ( <div className={ '' }>
                    <Panel
                        isOpen={ this.props.showPanel }
                        // this prop makes the panel non-modal
                        isBlocking={true}
                        onDismiss={ this.props._closePanel }
                        closeButtonAriaLabel="Close"
                        type = { this.props.type }
                        isLightDismiss = { true }
                        headerText = { 'Ooops!' }
                        >
                            { 'OOPS!  We don\'t have a list to show you right now :(' }

                        </Panel>
                </div> );
        } 

    } 

    private async _selectedListDefIndex(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        //this.setState({ searchText: "" }, () => this._searchUsers(item.props.itemKey));
        let itemKey = item.props.itemKey;
        let itemKeys = itemKey.split('|');
        
        if ( itemKey === pivotHeading1 ) {
            if (ev.ctrlKey) {
                // window.open( this.props.theList.ParentWebUrl + "/_layouts/15/user.aspx?obj={" + this.props.theList.Id + "},doclib&List={" + this.props.theList.Id + "}", '_blank' );
            }

        } else if ( itemKey === pivotHeading2 ) {

        }

        console.log('picked:  _selectedListDefIndex : ', itemKey );
        this.setState({
            applyThisVersion: itemKeys[0],
            listNo: parseInt( itemKeys[1] ),
        });

      }

    private CreateList(oldVal: any): any {
        let idx = this.state.listNo;
        let mapThisList: IMakeThisList = this.state.lists[ idx ];
        this.CreateThisList(mapThisList, idx );
      }

    private CreateThisList( mapThisList: IMakeThisList, listNo: number ): any {
        console.log( 'CreateThisList' );
        this.setState({ history: clearHistory(), listNo: listNo });
    
        let listName = mapThisList.title ? mapThisList.title : mapThisList.title;
    
        let readOnly: boolean  = this.isListReadOnly(mapThisList);
    
        if ( this.state.doMode === true ) {
            
            this.captureAnalytics('Update List', 'Updating', mapThisList);
    
            let listCreated = provisionTheList( mapThisList, readOnly, this.setProgress.bind(this), this.markComplete.bind(this) , this.state.doFields, this.state.doViews, this.state.doItems );
    
            let stateLists = this.state.lists;
            stateLists[listNo].listExists = true;
    
            let workingMessage = readOnly === true ? 'Verifying list: ': 'Building list: ' ;
    
            if ( listCreated ) {
                this.setState({
                    status: workingMessage + listName,
                    lists: stateLists,
                });
            }
        } else {
            console.log( 'listNo, mapThisList', listNo, mapThisList );
    
            //Pass this list back up to parent and down to Fields functionality
    
        }
    
        // this.props.updateMakeThisList( mapThisList );
            
        return "Finished";
      }

      private isListReadOnly (mapThisList) {

        let readOnly = true;
        if ( this.props.alwaysReadOnly === false ) {                //First test, only allow updates if the state is explicitly set so alwaysReadOnly === false
            if  ( this.state.onCurrentSite === true ) {
                readOnly = false;                                   //If list is on current site, then allow writing (readonly = false)
            } else if ( this.props.allowOtherSites === true ) {
                readOnly = false;                                   //Else If you explicitly tell it to allowOtherSites, then allow writing (readonly = false)
            }
        }
    
        return readOnly;
    
      }
      
      private captureAnalytics(itemInfo2, result, ActionJSON ){

        console.log('captureAnalytics itemInfo2, result:',itemInfo2, result );
        console.log('captureAnalytics JSON:',ActionJSON );
        
        let currentSiteURL = this.props.pageContext.web.serverRelativeUrl;

        let TargetList = '';
        let TargetSite = '';
        let listNo = this.state.listNo;

        if ( this.state && this.state.lists && this.state.lists[listNo] ) {
            TargetList = this.state.lists[listNo] ? this.state.lists[listNo].listURL : '';
            TargetSite = this.state.lists[listNo] ? this.state.lists[listNo].webURL : '';  

        } else {
            TargetList = this.props.theList ? this.props.theList.listURL : '';
            TargetSite = this.props.theList ? this.props.theList.listURL : ''; 

        }

        //saveAnalytics (analyticsWeb, analyticsList, serverRelativeUrl, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, richText ) {
        saveAnalytics( this.props.analyticsWeb, strings.analyticsListRailsApply, //analyticsWeb, analyticsList,
            currentSiteURL, currentSiteURL,//serverRelativeUrl, webTitle, PageURL,
            ProvisionListsSaveTitle, TargetSite, TargetList, //saveTitle, TargetSite, TargetList
            'Lists', itemInfo2, result, //itemInfo1, itemInfo2, result, 
            ActionJSON, 'ProvisionList', null ); //richText, Setting, richText2

    }
      
  private markComplete() {

    this.setState({
        status: 'Finished ' + this.state.status,
    });

    let theSite: any = this.props.theSite;
    let ServerRelativeUrl = this.props.currentPage;
    let pickedWeb = this.props.pickedWeb.ServerRelativeUrl + '|' + this.props.pickedWeb.guid + '|' + theSite.Url + '|' + theSite.Id ;

    saveAnalytics( this.props.analyticsWeb, strings.analyticsListRailsApply , //analyticsWeb, analyticsList,
        ServerRelativeUrl, ServerRelativeUrl,//serverRelativeUrl, webTitle,
        AddTemplateSaveTitle, pickedWeb, this.props.theList.listURL, //saveTitle, TargetSite, TargetList
        this.props.theList.Title, null , 'Complete', //itemInfo1, itemInfo2, result, 
        this.state.history, this.props.railFunction, null ); //richText, Setting, richText2

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

 private getDefinedLists( defineThisList : IDefinedLists, justReturnLists : boolean ) {
    console.log( 'getDefinedLists' );
    let theLists : IMakeThisList[] = [];

    let provisionListTitles =  [ this.props.theList.Title ];

    if ( justReturnLists === false ) { provisionListTitles = [] ; }

    if ( defineThisList !== availLists[0] ) { //Update to get available lists to build
        
        theLists = getTheseDefinedLists( defineThisList, true, [ this.state.makeThisList.title ], [], this.state.makeThisList.webURL, this.state.makeThisList.webURL, this.state.doList, null );

        //Go through and re-map props that might not get set correctly
        theLists.map( list => {
            list.name = this.props.theList.EntityTypeName;
            list.title = this.props.theList.Title;
            list.title = this.props.theList.Title;
            list.desc = this.props.theList.Description;
            list.listURL = this.props.theList.listURL;
            list.listExists = true;
            list.listExistedB4 = true;
            list.webExists = true;
            list.existingTemplate = this.props.theList.BaseTemplate;
            list.onCurrentSite = this.state.onCurrentSite;
            list.autoItemCreate = false;
        });
    }

    //let buEmails : IMakeThisList = dHarm.defineTheList( 101 , provisionListTitles[0], 'BUEmails' , this.props.pickedWeb.url, this.props.currentUser, this.props.pageContext.web.absoluteUrl );
    this.setState({
        lists: theLists,
        definedList: defineThisList,
    });

}

 private _updateListDropdownChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    console.log(`_updateListDropdownChange: ${item.text} ${item.selected ? 'selected' : 'unselected'}`);

    let thisValue : any = getChoiceText(item.text);

    this.getDefinedLists(thisValue, true);

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
            style={{  display: 'inline-flex'  }}
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
    //            let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles()) } </div>;

        private getPageToggles() {

            let toggleLabel = <span style={{ color: '', fontWeight: 700}}>Mode</span>;
            let togDoMode = {
                label: toggleLabel,
                disabled: this.state.definedList === availLists[0] ? true : false,
                key: 'togDoMode',
                _onChange: () => this.updateGenericToggle('togDoMode'),
                checked: this.state.doMode,
                onText: 'Build',
                offText: 'Design',
                className: '',
                styles: '',
            };

            let togDoFields = {
                label: `Fields (${this.state.lists.length > 0 ? this.state.lists[this.state.listNo].createTheseFields.length : 0 })`,
                key: 'togDoFields',
                _onChange: () => this.updateGenericToggle('togDoFields'),
                checked: this.state.doFields,
                onText: 'Include',
                offText: 'Skip',
                className: '',
                styles: '',
            };

            let togDoViews = {
                label: `Views (${this.state.lists.length > 0 ? this.state.lists[this.state.listNo].createTheseViews.length : 0 })`,
                key: 'togDoViews',
                _onChange: () => this.updateGenericToggle('togDoViews'),
                checked: this.state.doViews,
                onText: 'Include',
                offText: 'Skip',
                className: '',
                styles: '',
            };

            
            // let togDoItems = {
            //     label: 'Items ' + ( this.state.lists && this.state.lists.length > 0 && listNo !== null? `(${this.state.lists[listNo].createTheseItems.length})` : '' ),
            //     key: 'togDoItems',
            //     _onChange: this.updateTogggleDoItems.bind(this),
            //     checked: this.state.doItems,
            //     onText: 'Include',
            //     offText: 'Skip',
            //     className: '',
            //     styles: '',
            // };

            let theseToggles = [togDoMode, togDoFields, togDoViews, ];

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
        
        private updateGenericToggle = (item): void => {
            // console.log('updateGenericToggle: ', item );
            this.setState({
                doMode: item === 'togDoMode' ? !this.state.doMode : this.state.doMode,
                doFields: item === 'togDoFields' ? !this.state.doFields : this.state.doFields,
                doViews: item === 'togDoViews' ? !this.state.doViews : this.state.doViews,
                doItems: item === 'togDoItems' ? !this.state.doItems : this.state.doItems,
            });
        }

    private async _selectedIndex(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        //this.setState({ searchText: "" }, () => this._searchUsers(item.props.itemKey));
        let itemKey: any = item.props.itemKey;
        if ( itemKey === pivotHeading1 ) {
            if (ev.ctrlKey) {
                // window.open( this.props.theList.ParentWebUrl + "/_layouts/15/user.aspx?obj={" + this.props.theList.Id + "},doclib&List={" + this.props.theList.Id + "}", '_blank' );
            }
        } else if ( itemKey === pivotHeading2 ) {
        }
        //makeIMakeThisListFromExisting( definedList: IDefinedLists, listDefinition: string, theList: IContentsListInfo, consoleLog: boolean = false ) {

        this.setState( {
            mainPivot: itemKey,
        });

        //Do this only after updating state
        if ( itemKey === pivotHeading1 ) {
            this.getDefinedLists(availLists[0], true);
        } else if ( itemKey === pivotHeading2 ) {
            this.getDefinedLists('Components', true);
        }
      }

      private hideMainWarning(){
          console.log('hideMainWarning');
          this.setState({ showMainWarning: false });
      }

}
