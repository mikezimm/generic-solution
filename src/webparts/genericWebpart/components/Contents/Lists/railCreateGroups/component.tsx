
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

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import { Panel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { Spinner, SpinnerSize, } from 'office-ui-fabric-react/lib/Spinner';
import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SearchBox, } from 'office-ui-fabric-react/lib/SearchBox';


import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton, CompoundButton, elementContains } from 'office-ui-fabric-react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

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

 import { getSiteInfoIncludingUnique } from './functions';

  import { buildPropsHoverCard } from '../../../../../../services/hoverCardService';

  import { createIconButton } from '../../../createButtons/IconButton';
  
  
  import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';
  
  import { IContentsToggles, makeToggles } from '../../../fields/toggleFieldBuilder';
  
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
import { saveTheTime, getTheCurrentTime, saveAnalytics, fetchAnalytics, IArraySummary, IRailAnalytics, groupArrayItemsByField, } from '../../../../../../services/createAnalytics';
import { IListRailFunction } from '../listsComponent';
import { createProcessSteps, IProcessSteps, IProcessStep, StatusIcons, StatusColors } from './setup';
import { doThisRailFunction } from './functions';
import * as strings from 'GenericWebpartWebPartStrings';

import MyPermissions from '../../Permissions/MyPermissions';

import { IFetchInfoSettingsMin } from '../../Permissions/IWebPermissionsProps';

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


export interface IMyCreateListPermissionsProps {
    theList: IContentsListInfo;
    user: IUser;
    wpContext: WebPartContext;
    railFunction: IListRailFunction;
    showPanel: boolean;
    _closePanel: any;
    type: PanelType;

    currentPage: string; //this.context.pageContext.web.absoluteUrl;
    pickedWeb : IPickedWebBasic;

    analyticsWeb: string;
    analyticsList: string;
    //currentUser: IUser;

  }

export interface IMyCreateListPermissionsState {

    includeViewers: boolean;
    includeContrib: boolean;
    viewersSiteRead: boolean;
    contribSiteRead: boolean;
    parentGroupPerms: string;
    parentGroupValid: boolean;

    viewersName: string;
    contribName: string;
    disableDo: boolean;

    steps: IProcessSteps;

    refreshId: string;

    fetchInfoMin: IFetchInfoSettingsMin;

    HasUniqueRoleAssignments: boolean;
    errorWeb: string;

    finished: boolean;

    history: IArraySummary;

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

const currentPivotHeaderText = 'Current';  //Templates
const historyPivotHeaderText = 'History';  //Templates


export default class MyCreateListPermissions extends React.Component<IMyCreateListPermissionsProps, IMyCreateListPermissionsState> {


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

    constructor(props: IMyCreateListPermissionsProps) {
        super(props);
        let listTitle = this.props.theList.Title;
        let contribName= this.props.theList.Title + ' Contributors';
        let viewersName = this.props.theList.Title + ' Readers';

        let parentGroupPerms = "FCR";
        let steps : IProcessSteps = createProcessSteps( listTitle , contribName, viewersName );
        steps = this._updateParentGroupSteps( parentGroupPerms, steps );

        // let startTime = getTheCurrentTime();
        let startTime = new Date();
        let refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();

        this.state = {
            disableDo: false,

            includeViewers: true,
            includeContrib: true,

            viewersSiteRead: true,
            contribSiteRead: true,

            parentGroupPerms: parentGroupPerms,
            parentGroupValid: true,

            viewersName: viewersName,
            contribName: contribName,

            steps: steps,

            refreshId: refreshId,

            fetchInfoMin: {
                permissionsHiddenExclude: true,
                permissionsListsInclude: true,
                groupsShowAdmins: true,
                groupsShowGuests: true,
            },

            HasUniqueRoleAssignments: null,
            errorWeb: '',

            finished: false,

            history: null,

        };
    }
        
    public componentDidMount() {
        this._checkWebPerms();
        //this._getListItems();
    }

    private async _checkWebPerms() {
        let currentWeb : any = await getSiteInfoIncludingUnique( this.props.theList.ParentWebUrl, 'min', true );
        let HasUniqueRoleAssignments = currentWeb.error === '' ? currentWeb.HasUniqueRoleAssignments : null ;

        this.setState({
            HasUniqueRoleAssignments: HasUniqueRoleAssignments,
            errorWeb: currentWeb.error,
            disableDo: currentWeb.error !== '' ? true : false ,
            viewersSiteRead: HasUniqueRoleAssignments === true ? true : false ,
            contribSiteRead: HasUniqueRoleAssignments === true ? true : false ,

        });
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

    public componentDidUpdate(prevProps: IMyCreateListPermissionsProps): void {
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


    public render(): React.ReactElement<IMyCreateListPermissionsProps> {

        if ( this.props.theList ) {
          
            let listOrLib = this.props.theList.BaseType === 0 ? 'List' : 'Library' ;

            let panelContent = null;

            let selectedSteps = [];
            if ( this.state.steps.checkListPerms.required === true ) { selectedSteps.push( this.buildSelectedStep( this.state.steps.checkListPerms ) ) ; }
            if ( this.state.steps.breakListPerms.required === true ) { selectedSteps.push( this.buildSelectedStep( this.state.steps.breakListPerms ) ) ; }
            if ( this.state.includeContrib === true ) { 
                selectedSteps.push( this.buildSelectedStep( this.state.steps.checkContribGroup ) ) ;
                selectedSteps.push( this.buildSelectedStep( this.state.steps.createContribGroup ) ) ;
                selectedSteps.push( this.buildSelectedStep( this.state.steps.assignContribListRole ) ) ;
                if ( this.state.contribSiteRead === true ) {
                    selectedSteps.push( this.buildSelectedStep( this.state.steps.assignContribSiteRole ) ) ;
                }
            }

            if ( this.state.includeViewers === true ) { 
                selectedSteps.push( this.buildSelectedStep( this.state.steps.checkReaderGroup ) ) ;
                selectedSteps.push( this.buildSelectedStep( this.state.steps.createReaderGroup ) ) ;
                selectedSteps.push( this.buildSelectedStep( this.state.steps.assignReaderListRole ) ) ;
                if ( this.state.viewersSiteRead === true ) {
                    selectedSteps.push( this.buildSelectedStep( this.state.steps.assignReaderSiteRole ) ) ;
                }
            }
            
            selectedSteps.push( this.buildSelectedStep( this.state.steps.assignParentOwnerToList ) ) ;
            selectedSteps.push( this.buildSelectedStep( this.state.steps.assignParentMemberToList ) ) ;
            selectedSteps.push( this.buildSelectedStep( this.state.steps.assignParentVisitorToList ) ) ;

            let selectedTable = <table style={{marginTop: '30px' }}>
                <tr><th>Step</th><th>Status</th><th>Info</th><th>Details</th></tr>
                { selectedSteps }
            </table>;

            let theListAny : any = this.props.theList; //Added because one property is required in MyPermissions but optional in this type.
            let permissions = <MyPermissions
                groupsShowAdmins= { this.state.fetchInfoMin.groupsShowAdmins }
                groupsShowGuests= { this.state.fetchInfoMin.groupsShowGuests }
                isSiteAdmin={ this.props.user.isSiteAdmin }
                userId= { this.props.user.Id }
                title={  ' Permissions for ' + this.props.theList.Title }
                width= { 400 }
                maxWidth={ 400 }
                setPivSize = { PivotLinkSize.normal }
                setPivFormat = { PivotLinkFormat.tabs }
                listTitles={ [ this.props.theList.Title ] }

                theList = { theListAny }
                webPermissions = { null }
                _updateWebPermissions= {  null }

                webURL={ this.props.theList.ParentWebUrl }
                context={ this.props.wpContext }
                searchFirstName={ true }
                displayMode={ 1 }
                updateProperty={
                    (value: string) => {
                        // this.properties.title = value; //This is for updating Title Props from webpart
                    }
                }
                searchProps={ 'Mike' }
                clearTextSearchProps={ ''}
                pageSize={ 5 }
                refreshId= { this.state.refreshId }
            ></MyPermissions>;

            let disableContribGroupSite = this.state.HasUniqueRoleAssignments === true && this.state.includeContrib === true ? false : true;
            let disableViewerGroupSite = this.state.HasUniqueRoleAssignments === true && this.state.includeViewers === true ? false : true;
            let finished = this.state.finished;
            
            let history = null;

            if ( this.state.history !== null ) {
                history = <div>
                    <div>Found { this.state.history.filteredKeys.length } tasks from this list: { this.props.theList.Title } </div>
                    {/* { this.state.history.filteredKeys.map( key=> <div> { key } </div> ) } */}
                    { this.state.history.filteredGroups.map( group=> 
                        <div><div style={{ fontSize: 'x-large', fontWeight: 600, background: 'lightgray', padding: '5px 15px', marginTop: '15px', borderRadius: '5px' }}>
                             { group.key.split('~')[0] } 
                             <span style={{ paddingLeft: '10px', fontSize: 'small' }}> { 
                                group.localTime
                                // new Date( group.key.split('~')[0] ).toLocaleString() //This does not work... gives "Invalid Date"
                              } </span>
                        </div>
                        <table>
                            <tr><th> Step </th><th> Result </th><th> Info </th></tr>
                            { group.items.map( item => {
                                return this.buildHistoryStep( item );
                            })
                            }
                        </table></div>
                    ) }
                </div>;
            }
            panelContent = <div>
                <Pivot
                    styles={ pivotStyles }
                    linkFormat={PivotLinkFormat.links}
                    linkSize={PivotLinkSize.normal}
                    onLinkClick={this._selectedIndex.bind(this)}
                >
                    <PivotItem headerText="Create Permissions" ariaLabel="Create Permissions" title="Create" key="Create">
                        <h3> { listOrLib + ': ' + this.props.theList.Title }</h3>

                        { <div style={{display: this.state.errorWeb === '' ? 'none' : null, width: panelWidth }}>
                            <MessageBar messageBarType={MessageBarType.severeWarning}>
                                Error fetching current web info:
                                { this.state.errorWeb }
                            </MessageBar>
                        </div> }

                        { this.makeGroupName( 'Parent Group Roles - FCx', this.state.parentGroupPerms , this._updateParentGroups.bind(this) , false , '0px 0px ' + groupBottomPadding + '0px' )}

                        { <div style={{display: this.state.parentGroupValid === true ? 'none' : null, width: panelWidth }}>
                            <MessageBar messageBarType={MessageBarType.severeWarning}>
                                You need 3 characters made up of F-C-R-x
                            </MessageBar>
                        </div> }

                        <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                            { this.makeToggle( 'Create Contributors', this.state.includeContrib, false, this.updateTogggleContrib.bind(this) ) }
                            { this.makeToggle( 'Read site', this.state.contribSiteRead, disableContribGroupSite, this.updateTogggleContribSiteRead.bind(this) ) }
                        </div>

                        { this.makeGroupName( 'Enter Group Name', this.state.contribName , this._updateContribGroup.bind(this) , !this.state.includeContrib, '0px 0px ' + groupBottomPadding + '0px' )}

                        <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                            { this.makeToggle( 'Create Readers', this.state.includeViewers, false, this.updateTogggleReaders.bind(this) ) }
                            { this.makeToggle( 'Read site', this.state.viewersSiteRead, disableViewerGroupSite, this.updateTogggleReadersSiteRead.bind(this) ) }
                        </div>

                        { this.makeGroupName( 'Enter Group Name', this.state.viewersName , this._updateVisitorGroup.bind(this) , !this.state.includeViewers, '0px 0px ' + groupBottomPadding + '0px' )}

                        <div style={{ marginTop: '50px', width: panelWidth, boxSizing: 'border-box' }}>
                            <DefaultButton
                                    onClick = { this.props._closePanel }
                                    title= { finished === true ? "Finished" : "Cancel" }
                                    style={{ marginRight: '0px', padding: '20px' }}
                                >
                                { finished === true ? "Finished" : "Cancel" }
                            </DefaultButton>
                            <PrimaryButton
                                onClick = { this.startThisRailFunction.bind(this) }
                                title="ClickMe"
                                style={{ padding: '20px', float: 'right' }}
                                disabled={ this.state.disableDo }
                            >
                                Add Groups and Permissions
                            </PrimaryButton>
                        </div>

                        { <div style={{display: this.state.HasUniqueRoleAssignments === true ? 'none' : null, width: panelWidth, margin: '20px 0px' }}>
                            <MessageBar messageBarType={MessageBarType.warning}>
                                This site doesn't have Unqiue Permissions.  Will not break site permissions or assign groups to parent :(
                            </MessageBar>
                        </div> }

                        { selectedTable }

                    </PivotItem>
                    <PivotItem headerText={currentPivotHeaderText} ariaLabel={currentPivotHeaderText} title={currentPivotHeaderText} itemKey={currentPivotHeaderText}>
                        <div style={{marginTop: '20px'}}>
                            { permissions }
                        </div>
                    </PivotItem>
                    <PivotItem headerText={historyPivotHeaderText} ariaLabel={historyPivotHeaderText} title={historyPivotHeaderText} itemKey={historyPivotHeaderText} itemIcon={ 'History '}>
                        <div style={{marginTop: '20px'}}>
                            { history }
                        </div>
                    </PivotItem>

                </Pivot>
            </div>;

            let panelHeader = 'Create Permissions for ' + listOrLib ;
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

    private startThisRailFunction() {
        doThisRailFunction( this.state.steps, this.props.theList , this.updateStateStatus.bind(this) );
    }

    private updateStateStatus( steps: IProcessSteps, currentStep: IProcessStep ) {

        let finished = currentStep.label.toLowerCase() === 'complete' ? true : false;
        this.setState({ 
            steps: steps,
            finished: finished,
            disableDo: finished === true ? true : this.state.disableDo,
        });
        
        let ServerRelativeUrl = this.props.currentPage;
        let pickedWeb = this.props.pickedWeb ? this.props.pickedWeb.ServerRelativeUrl + '|' + this.props.pickedWeb.guid : ServerRelativeUrl;
        
        // value1: value1 ? value1 : '', //List Title
        // value2: value2 ? value2 : '', //Group Title
        // value3: value3 ? value3 : '', //Group ID
        // value4: '', //ParentGroupID

        let extraInfo = currentStep.current.key === 'error' ? currentStep.current.info + ' - ' + currentStep.current.error : '' ;

        let value2 = [ 
            currentStep.value2, 
            currentStep.stepNo,
            currentStep.value3, 
            currentStep.value4, 
            this.state.refreshId, 
            extraInfo,
        ].join('|');

        saveAnalytics( this.props.analyticsWeb, strings.analyticsListRails , //analyticsWeb, analyticsList,
            ServerRelativeUrl, ServerRelativeUrl,//serverRelativeUrl, webTitle,
            currentStep.label, pickedWeb, this.props.theList.listURL, //saveTitle, TargetSite, TargetList
            currentStep.value1, value2, currentStep.current.key, //itemInfo1, itemInfo2, result, 
            JSON.stringify(currentStep), this.props.railFunction ); //richText
        
    }

    private buildSelectedStep( step: IProcessStep ) {
        if ( step.required !== true ) { return null; }
        let info = step.current.error !== '' ? step.current.error : step.current.info; 
        let key = step.current.key;
        let color = StatusColors[ key ];

        return <tr  title={ step.current.info }>
            <td>{ step.label.split('|')[0] } </td>
            <td style={{ textAlign: 'center' }} ><Icon iconName= { StatusIcons[ key ]} style={{ color: color }}></Icon></td>
            <td style={{ color: color }}>{ info } </td>
            <td>{ step.current.result } </td>
        </tr>;
    }

    private buildHistoryStep( step: IRailAnalytics ) {
        // if ( step.required !== true ) { return null; }
        // let info = step.current.error !== '' ? step.current.error : step.current.info; 
        let key = step.Result;
        let color = StatusColors[ key ];
        let itemPadding = step.zzzText4 ? '7px 0px 3px 0px' : '0px';

        return <tr  title={ step.Result + ' ' + step.Title }>
            <td>{ step.zzzText7 } </td>
            <td style={{ textAlign: 'center' }} ><div style={{ fontSize: 'larger', margin: itemPadding }}><Icon iconName= { StatusIcons[ key ]} style={{ color: color }}></Icon></div></td>
            <td>{ step.Title } 
                <span style={{fontWeight: 700 }}>{ ( step.zzzText3 ? ' - ' + step.zzzText3 : '' ) } </span>
                {  step.zzzText4 ? <div style={{color: 'red', fontSize: 'x-small', paddingBottom: '7px' }}>{ ( step.zzzText4 ? ' ' + step.zzzText4 : '' ) } </div> : null  }
            </td>
        </tr>;
    }

    private makeGroupName( placeholder: string, def: string, onChanged: any, disabled: boolean, margin: any ) {
           return <div style={{ width: panelWidth, margin: margin }}>
                <TextField
                    defaultValue={ def }
                    placeholder={ placeholder }
                    autoComplete='off'
                    onChanged={ onChanged }
                    required={ true }
                    disabled={ disabled }
                    style={{ width: panelWidth }}
                />
            </div>;
    }

    private _updateVisitorGroup(oldVal: any): any {  
        let steps = JSON.parse(JSON.stringify( this.state.steps ));
        [ 'checkReaderGroup', 'createReaderGroup', 'assignReaderListRole', 'assignReaderSiteRole' ].map( step => {
            steps[step].value2 = oldVal;
        });
    
        this.setState({  viewersName: oldVal, steps: steps });  
    }
    private _updateContribGroup(oldVal: any): any {  
        let steps = JSON.parse(JSON.stringify( this.state.steps ));
        [ 'checkContribGroup', 'createContribGroup', 'assignContribListRole', 'assignContribSiteRole' ].map( step => {
            steps[step].value2 = oldVal;
        });
        this.setState({  contribName: oldVal, steps: steps  });  
    }

    private convertLetterToRole( letter: string ) {
        if (letter.toUpperCase() === 'F') { return "Full Control" ; }
        else if (letter.toUpperCase() === 'C') { return "Contribute" ; }
        else if (letter.toUpperCase() === 'R') { return "Read" ; }
        // else if (letter.toUpperCase() === 'D') { return "Design" ; }
        // else if (letter.toUpperCase() === 'E') { return "Edit" ; }
        // else if (letter.toUpperCase() === 'A') { return "Approve" ; }
        else if (letter.toUpperCase() === 'X') { return "skip" ; }
        else { return null ; }
    }

    private setParentPerms( step: IProcessStep, oldVal: string ) {
        step.value2 = this.convertLetterToRole(oldVal) ;
        if ( step.value2 === null || step.value2 === 'skip' ) { step.required = false; } else { step.required = true; }
        return step;
    }

    private _updateParentGroupSteps( oldVal: string , origSteps: IProcessSteps ) {
        let steps : IProcessSteps = JSON.parse(JSON.stringify( origSteps ));
        steps.assignParentOwnerToList = this.setParentPerms( steps.assignParentOwnerToList, oldVal.substr(0,1) ) ;
        steps.assignParentMemberToList = this.setParentPerms( steps.assignParentMemberToList, oldVal.substr(1,1) ) ;
        steps.assignParentVisitorToList = this.setParentPerms( steps.assignParentVisitorToList, oldVal.substr(2,1) ) ;

        return steps;
    }

    private _updateParentGroups(oldVal: string): any {
        let steps : IProcessSteps = this._updateParentGroupSteps( oldVal, this.state.steps );

        let parentGroupValid = true;
        ['assignParentOwnerToList','assignParentMemberToList','assignParentVisitorToList'].map( key=> {
            if ( steps[key].value2 === null ) { parentGroupValid = false; }
        });

        if ( oldVal && oldVal.length !== 3 ) { parentGroupValid = false ; }

        this.setState({ parentGroupValid: parentGroupValid, parentGroupPerms: oldVal, steps: steps  });  
        
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

    private makeToggle( label: string, checked: boolean, disabled: boolean, _onChange: any ) {
        return <div style={{ width: panelWidth, paddingBottom: toggleBottomPadding }}>
            <h3>{ label } </h3>
            <Toggle 
            onText={ 'Include' } 
            offText={ 'Skip' } 
            onChange={ _onChange } 
            checked={ checked }
            disabled= { disabled }
            styles={ toggleStyles }
            />
        </div>;

    }
    
    private updateSteps( step: any, key: string, newValue: any ) {
        if ( step[ key ] === undefined ) {
            alert( 'Unable to update step key: ' + key );
            return step;
        } else {
            step[ key ] = newValue;
            return step;
        }
    }

    private updateCommonSteps( newSteps : IProcessSteps ) {
        let updateList = newSteps.assignContribListRole.required === true || newSteps.assignReaderListRole.required === true ? true : false ;
        newSteps.checkListPerms.required = updateList;
        newSteps.breakListPerms.required = updateList;
        return newSteps;
    }

    private updateTogggleReaders() {  
        let newValue = !this.state.includeViewers;
        let newSteps : IProcessSteps = JSON.parse(JSON.stringify( this.state.steps ));
        newSteps.checkReaderGroup = this.updateSteps( newSteps.checkReaderGroup, 'required', newValue );
        newSteps.assignReaderListRole = this.updateSteps( newSteps.assignReaderListRole, 'required', newValue );
        newSteps = this.updateCommonSteps( newSteps );

        this.setState({  
            includeViewers: newValue, 
            steps: newSteps,
            disableDo: this.state.includeContrib === true || newValue === true ? false : true,
         }); 
    }

    private updateTogggleContrib() {
        let newValue = !this.state.includeContrib;
        let newSteps : IProcessSteps = JSON.parse(JSON.stringify( this.state.steps ));
        newSteps.checkContribGroup = this.updateSteps( newSteps.checkContribGroup, 'required', newValue );
        newSteps.assignContribListRole = this.updateSteps( newSteps.assignContribListRole, 'required', newValue );
        newSteps = this.updateCommonSteps( newSteps );

        this.setState({  
            includeContrib: newValue,  
            steps: newSteps,
            disableDo: this.state.includeViewers === true || newValue === true ? false : true,
        });  
    }

    private updateTogggleReadersSiteRead() {  
        let newValue = !this.state.viewersSiteRead;
        let newSteps : IProcessSteps = JSON.parse(JSON.stringify( this.state.steps ));
        newSteps.assignReaderSiteRole = this.updateSteps( newSteps.assignReaderSiteRole, 'required', newValue );

        this.setState({  
            viewersSiteRead: newValue,
            steps: newSteps,
        });  
    }

    private updateTogggleContribSiteRead() {  
        let newValue = !this.state.contribSiteRead;
        let newSteps : IProcessSteps = JSON.parse(JSON.stringify( this.state.steps ));
        newSteps.assignContribSiteRole = this.updateSteps( newSteps.assignContribSiteRole, 'required', newValue );

        this.setState({  
            contribSiteRead: newValue,  
            steps: newSteps,
        });  
    }

    private async _selectedIndex(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        //this.setState({ searchText: "" }, () => this._searchUsers(item.props.itemKey));
        let itemKey = item.props.itemKey;
        if ( itemKey === currentPivotHeaderText ) {
            if (ev.ctrlKey) {
                window.open( this.props.theList.ParentWebUrl + "/_layouts/15/user.aspx?obj={" + this.props.theList.Id + "},doclib&List={" + this.props.theList.Id + "}", '_blank' );
            }

        } else if ( itemKey === historyPivotHeaderText ) {
            let items: IRailAnalytics[] = await fetchAnalytics( this.props.analyticsWeb, strings.analyticsListRails , this.props.pickedWeb.guid );

            let history: IArraySummary = groupArrayItemsByField( items, ['zzzText1'], ' - ', 'TargetList.Url', 'zzzText7','asc' );
            let filterBy = this.props.theList.listURL.indexOf('http') === 0 ? this.props.theList.listURL : window.location.origin + this.props.theList.listURL;
            history.filteredGroups = [];
            history.filteredKeys = [];
            history.groups.map( group => {
                if ( group.groupFilter === filterBy ) { 
                    history.filteredGroups.push( group ) ;
                    history.filteredKeys.push( group.key ) ;
                }
            });

            this.setState({ history: history });
            // console.log('HISTORY:' , history );
        }

      }

}
