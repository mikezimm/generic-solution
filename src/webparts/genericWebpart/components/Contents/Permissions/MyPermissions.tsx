
//Format for getting user photo
//https://mcclickster.sharepoint.com/sites/Templates/PowerShell/_layouts/15/userphoto.aspx?size=M&accountname=bb@mcclickster.onmicrosoft.com

import * as React from 'react';
import styles from "./MyPermissions.module.scss";

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons, IStackProps, PersonaSize, GroupedList } from 'office-ui-fabric-react';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  SearchBox,
  Icon,
  Label,
  Pivot,
  PivotItem,
  IPivotItemProps,
  PivotLinkFormat,
  PivotLinkSize,
  Dropdown,
  IDropdownOption
} from "office-ui-fabric-react";

import { Panel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import { IMyPermissionsState, SiteAdminGroupName, SiteAdminIconName, GuestsGroupName, GuestsIconName, IShowPermissionTab, sharedLimited, deltaPerms, samePerms  } from './IMyPermissionsState';

import { currentPermissions, sharedHistory, sharedDetails, IPermissionsPanel } from './IMyPermissionsState';
import { IMyPermissionsProps } from './IMyPermissionsProps';

/** Remove these when not using groups vvvvvv */
import MyGroups from '../MyGroups/MyGroups';
import { buildGroupProps, createStateGroupsPanel } from '../MyGroups/GroupFunctions';
import { IMyGroupsProps, IGroupsProps } from '../MyGroups/IMyGroupsProps';
/** Remove these when not using groups ^^^^^ */

import { allAvailableRoleAssignments, IMyPermissions, allWebLists, PermPriorityStyles, comparePermissions } from './Services/Permissions';
import { allSharedItems, IMySharingInfo,  } from './Services/Sharing';
import { IThisPermissionDelta } from './Services/Permissions';
import { IShowPermissionPage } from './IMyPermissionsState';

const orderOptions: IDropdownOption[] = [
    { key: "FirstName", text: "First Name" },
    { key: "LastName", text: "Last Name" },
    { key: "Department", text: "Department" },
    { key: "Location", text: "Location" },
    { key: "JobTitle", text: "Job Title" }
  ];

  const groupTitles = [
    'Title1' ,
    'Title2' ,
    'Title3' ,
    'Title4' ,
  ];

const deltaIconStyles: any = { root: {
  fontSize: 'larger',
  // fontWeight: 700,
  // color: 'red',
  paddingRight: '30px',
  paddingLeft: '30px',
}};


export default class MyPermissions extends React.Component<IMyPermissionsProps, IMyPermissionsState> {

    private groupTitlePrefix = "groupTitle-";
    private groupIdPrefix = "groupId-";

    // onClick={ this.openGroupPanel.bind(this)}   
    // id= { this.groupIdPrefix + user.userInfo.Title }>

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

private setMyPermissions() {

    let myPermissions: IMyPermissions =  {
        idsToGet: [],
        isLoading: true,
        errMessage: '',
        theseUsers: [],
        allUserPermissions: [],
        sortedPermissions: [],
        groupedPermissions: [],
        limtedPermissions: false,
    };

    return myPermissions;
}


public constructor(props:IMyPermissionsProps){
    super(props);
    console.log('THE WEBPART WIDTH === ', this.props.width );
    this.state = { 
        myPermissions: this.setMyPermissions(),
        isLoading: true,
        errorMessage: "",
        hasError: false,
        indexSelectedKey: this.props.listTitles[0],
        selectedUserId: null,
        selectedUser: null,
        searchString: "LastName",
        searchText: "",
        limtedPermissions: false,

        showThis: currentPermissions,
        panel: createStateGroupsPanel( [''], false ),
        showPanel: false,

        deltaPermissions: false,
        webPermissionAllDetla: null,
        webPermissionMinDetla: null,
        webPermissionEquals: null,

        deltaElements: [],
        equalElements: [],

        mySharing: {
          sharedItems: [],
          sharedElements: [],
          detailItems: [],
          detailElements: [],
          isLoaded: false,
          errMessage: '',
        },

        fetchTotal: 0,
        fetchCount: 0,
        fetchPerComp: 100,
        fetchLabel: '',
        showProgress: false,
    };
   
  }


  public componentDidMount() {
    console.log('componentDidMount MyPermissions:', this.props.listTitles);
    this.fetchPermissions( this.setMyPermissions() );
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

    let rebuildTiles = false;
    let reload = false;
    if (prevProps.width !== this.props.width ) { console.log('REFRESHING BECAUSE WIDTH CHANGE', prevProps.width, this.props.width); rebuildTiles = true ; }
    if ( prevProps.listTitles !== this.props.listTitles ) { 

      if ( prevProps.listTitles[0] === 'web' && this.props.listTitles[0] === 'web' ) {
        reload = false;
      } else {
        console.log('REFRESHING BECAUSE listTitles CHANGE', prevProps.listTitles, this.props.listTitles); 
        reload = true ;
      }
    }
    if ( prevProps.refreshId !== this.props.refreshId ) { console.log('REFRESHING BECAUSE refreshId CHANGE', prevProps.refreshId, this.props.refreshId); reload = true ; }

    if ( reload === true ) {
      this.setState({
        showThis: currentPermissions,
        myPermissions: this.setMyPermissions(),
        isLoading: true,
        errorMessage: "",
        hasError: false,
        indexSelectedKey: this.props.listTitles[0],
        limtedPermissions: false,
        webPermissionAllDetla: null,
        webPermissionMinDetla: null,
      });
      console.log('componentDidUpdate reloading MyPermissions:', this.props.listTitles);
      this.fetchPermissions( this.setMyPermissions() );

    } else if (rebuildTiles === true) {
      console.log('componentDidUpdate rebuilding MyPermissions:', this.props.listTitles);
      this._updateStateOnPropsChange();
    }
        /*
    */

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

    public render(): React.ReactElement<IMyPermissionsProps> {
        const color = this.props.context.microsoftTeams ? "white" : "";

        let isLoaded = this.state.myPermissions.isLoading === false ? true : false; 

        let prefix = this.state.isLoading === true ? 'Fetching' : 'Showing';
        let webpartTitle = <div><WebPartTitle
            displayMode={this.props.displayMode}
            title={prefix + ' ' + this.props.title}
            updateProperty={this.props.updateProperty}
          /></div>;

        let permissionsPivot = <div><Pivot
            styles={{
              root: {
                paddingLeft: 10,
                paddingRight: 10,
                whiteSpace: "normal",
                textAlign: "center"
              }
            }}
            linkFormat={PivotLinkFormat.links}
            selectedKey={this.state.showThis.tab8 }
            onLinkClick={this._selectedIndex.bind(this)}
            linkSize={PivotLinkSize.large}
          >

            <PivotItem headerText={ this.getTabPerWidth( currentPermissions ) } itemKey={currentPermissions.tab8} key={currentPermissions.tab8} itemIcon={ currentPermissions.icon} />

            { this.state.isLoading === false && this.state.limtedPermissions === true ?
              <PivotItem headerText={ this.getTabPerWidth( sharedLimited ) } itemKey={sharedLimited.tab8} key={sharedLimited.tab8} itemIcon={ sharedLimited.icon } />
              : null }

            { this.state.isLoading === false && this.state.deltaPermissions === true ?
              <PivotItem headerText={ this.getTabPerWidth( deltaPerms ) } itemKey={deltaPerms.tab8} key={deltaPerms.tab8} itemIcon={ deltaPerms.icon } />
              : null }

            { this.state.isLoading === false && this.state.deltaPermissions === true ?
              <PivotItem headerText={ this.getTabPerWidth( samePerms ) } itemKey={samePerms.tab8} key={samePerms.tab8} itemIcon={ samePerms.icon } />
              : null }

            { this.props.listTitles[0] !== 'web' && this.state.isLoading === false && this.state.limtedPermissions === true ?
              <PivotItem headerText={ this.getTabPerWidth( sharedHistory ) } itemKey={sharedHistory.tab8} key={sharedHistory.tab8} itemIcon={ sharedHistory.icon } />
              : null }

            { this.props.listTitles[0] !== 'web' && this.state.isLoading === false && this.state.limtedPermissions === true ?
              <PivotItem headerText={ this.getTabPerWidth( sharedDetails ) } itemKey={sharedDetails.tab8} key={sharedDetails.tab8} itemIcon={ sharedDetails.icon } />
              : null }

          </Pivot></div>;

          let DirectoryMessage = [];
          let noPermissions = <div className={ styles.noPermissions }>
              <Icon
                iconName={"ProfileSearch"}
                style={{ fontSize: "54px", color: color }}
              />
              { DirectoryMessage }
            </div>;
        let errorBar = null;

        if ( this.state.hasError === true && this.state.errorMessage.length > 0 ) {
          let errorMessages = this.state.errorMessage.split('--');
          let simpleMessage = <h3> { errorMessages[0] } </h3>;
          let detailMessage = errorMessages.length > 1 ? <h4> { errorMessages[1] } </h4> : null;
          errorBar = <div><MessageBar messageBarType={MessageBarType.error}>
                  {simpleMessage}
                  {detailMessage}
              </MessageBar></div>;
        }

        let selectedUser = this.state.selectedUser;
        let showNoPermissions = isLoaded === false ? false : !selectedUser || selectedUser.ID == 0 ? true : false;

        let searchSpinner = showNoPermissions !== true && this.state.isLoading ? <Spinner size={SpinnerSize.large} label={"fetching ..."} /> : null ;

        let myProgress = 1 === 1 ? <ProgressIndicator 
        label={ this.state.fetchLabel } 
        description={ '' } 
        percentComplete={ this.state.fetchPerComp } 
        progressHidden={ !this.state.showProgress }/> : null;

        let size : PersonaSize = PersonaSize.size72;
        let iconSize = 20;
        let iconTextSize = 16;
    
        let permissionElements = [];
        if ( isLoaded === true ) {

          /**
           * CURRENT PERMISSIONS
           */
          if ( this.state.showThis.tab8 === currentPermissions.tab8 ) {

            if ( this.state.limtedPermissions === true ) {
              if ( this.props.listTitles[0] === 'web' ) {
                permissionElements.push( <p style={{ paddingBottom: '10px' }}><strong>Something has broken permissions...</strong> Click on the libraries to find out more.</p>) ;
              } else {
                permissionElements.push( <p style={{ paddingBottom: '10px' }}><strong>{ this.props.listTitles[0] } has items with broken permissions.</strong>  Click on Shared History to find out more.</p>) ;
              }


            } else { permissionElements.push( <p style={{paddingBottom: '10px', color: 'darkgreen' }}>So far, no individual files have been shared!</p>) ; }

            this.state.myPermissions.sortedPermissions.map( user => {
              if ( user.onlyLimited === false ) {
                let userPerms = user.permissions.map( perm => { return perm.Name ; });
                let userInfo = <span style={{whiteSpace: 'nowrap'}} title={ user.userInfo.Title }>
                  ( {user.userInfo.PrincipalText} Id={user.userInfo.Id} ) - 
                  <span 
                    style={{ cursor: user.userInfo.PrincipalText === 'Group' ? 'pointer' : null }}
                    onClick={ user.userInfo.PrincipalText === 'Group' ? this.openGroupPanel.bind(this) : null } 
                    id= { this.groupTitlePrefix + user.userInfo.Title }>
                    <strong>{ user.userInfo.shortTitle }</strong>
                  </span>
                  &nbsp;-&nbsp; 
                  <strong><span style={ PermPriorityStyles[user.highPriority] } >{ userPerms.join(', ') }</span></strong></span>;
                permissionElements.push( <div> { userInfo } </div> ) ;
              }
            });

          /**
           * LIMITED PERMISSIONS
           */
          } else if ( this.state.showThis.tab8 === sharedLimited.tab8 ) {

            if ( this.props.listTitles[0] === 'web' ) {
              permissionElements.push( <p style={{paddingBottom: '10px', color: 'darkred', fontSize: 'larger' }}> <mark>{ sharedLimited.webLevel }</mark> </p> ) ;
            } else {
              permissionElements.push( <p style={{paddingBottom: '10px', color: 'darkred', fontSize: 'larger' }}> <mark>{ sharedLimited.listLevel }</mark> </p> ) ;
            }

            this.state.myPermissions.sortedPermissions.map( user => {
              if ( user.onlyLimited === true ) {
                let userPerms = user.permissions.map( perm => { return perm.Name ; });
                let userInfo = <span
                  style={{whiteSpace: 'nowrap'}} 
                  title={ user.userInfo.Title }>
                    (Id={user.userInfo.Id}) - 
                    <span
                        style={{ cursor: user.userInfo.PrincipalText === 'Group' ? 'pointer' : null }}
                        onClick={ user.userInfo.PrincipalText === 'Group' ? this.openGroupPanel.bind(this) : null } 
                        id= { this.groupTitlePrefix + user.userInfo.Title }>
                        <strong>{ user.userInfo.shortTitle}</strong>
                    </span>
                     - { userPerms.join(', ') }
                </span>;
                permissionElements.push( <div> { userInfo } </div> ) ;
              }
            });

           /**
           * DELTA PERMISSIONS
           */
           } else if ( this.state.showThis.tab8 === deltaPerms.tab8 ) {
            if ( this.state.webPermissionMinDetla.length > 0 ) {
              let parent = this.props.listTitles[0] === 'web' ? 'Parent Site' : 'This Site';
              let child = this.props.listTitles[0] === 'web' ? 'Libraries' : 'Items';

              let tableStyle = this.props.width < 800 ? styles.tableTight : styles.tableNormal;

              permissionElements.push( <p style={{paddingBottom: '10px', fontSize: 'larger'}}> { this.state.showThis.desc } </p>) ;
              permissionElements.push(
                // <p>This is only a test....</p>
                <table className={ tableStyle }>
                  <tr> { ['Id', 'Type', 'Name', parent, 'Change', this.props.listTitles[0], child ].map( h=> { return <th> { h }</th>; } )  }
                  </tr>
                    { this.state.deltaElements }
                </table>
              );

            }

           /**
           * SAME PERMISSIONS
           */
           } else if ( this.state.showThis.tab8 === samePerms.tab8 ) {
            if ( this.state.webPermissionEquals.length > 0 ) {
              let parent = this.props.listTitles[0] === 'web' ? 'Parent Site' : 'This Site';
              let child = this.props.listTitles[0] === 'web' ? 'Libraries' : 'Items';
              let tableStyle = this.props.width < 800 ? styles.tableTight : styles.tableNormal;

              permissionElements.push( <p style={{paddingBottom: '10px', fontSize: 'larger'}}> { this.state.showThis.desc } </p>) ;
              permissionElements.push(
                <table className={ tableStyle }>
                  <tr> { ['Id', 'Type', 'Name', parent, 'Change', this.props.listTitles[0], child ].map( h=> { return <th> { h }</th>; } )  }
                  </tr>
                    { this.state.equalElements }
                </table>
              );
            }

           /**
           * HISTORY PERMISSIONS
           */
          } else if ( this.state.showThis.tab8 === sharedHistory.tab8 ) {
            if ( this.state.mySharing.sharedElements.length > 0 ) {
              let tableStyle = this.props.width < 800 ? styles.tableTight : styles.tableNormal;

              permissionElements.push( <p style={{paddingBottom: '10px', fontSize: 'larger'}}> { this.state.showThis.desc } </p>) ;
              permissionElements.push(
                <table className={ tableStyle }>
                  <tr> { ['When', 'Type', 'GUID', 'Shared by', 'Shared with'].map( h=> { return <th> { h }</th>; } )  }
                  </tr>
                    { this.state.mySharing.sharedElements }
                </table>
              );

           /**
           * UNKNOWN PERMISSIONS
           */
            } else {
              permissionElements.push(
                <div><h2>Unfortunately I can't fetch history on the web.</h2><h3>Try one of the libraries instead :)</h3> { errorBar } </div>
              );
            }

          } else {
            if ( this.state.mySharing.detailItems.length > 0 ) {
              let tableStyle = this.props.width < 800 ? styles.tableTight : styles.tableNormal;

              permissionElements.push( <p style={{paddingBottom: '10px' }}> { this.state.showThis.desc } </p>) ;
              permissionElements.push(
                <table className={ tableStyle }>
                  <tr> { ['When', 'Type', 'GUID', 'Shared by', 'Shared with'].map( h=> { return <th> { h }</th>; } )  }
                  </tr>
                    { this.state.mySharing.detailElements }
                </table>
              );
            } else {
              permissionElements.push(
                <div> <h3>Unfortunately we haven't quite figured out how to get more details :(</h3>
                      <h4>But we are working on it so stay tuned for updates!</h4>
                 { errorBar } </div>
              );
            }

          }
        }

        let permissionInfoTokens = { childrenGap: 10 };
        const permissionInfo = isLoaded === true 
        ?  <Stack horizontal={false} wrap={true} horizontalAlign={"center"} tokens={permissionInfoTokens} >{/* Stack for Buttons and Webs */}
                { permissionElements }
            </Stack> : [];



        let myGroupsPanel = null;
        let myGroups = null;

        if ( this.state.showPanel == true ) {
            let userId = this.props.context.pageContext.legacyPageContext.userId;

            /** set myGroups null when not using groups vvvvvv */
            myGroups = <MyGroups
              groupsShowAdmins= { true }
              groupsShowGuests= { true }
              isSiteAdmin={ this.props.isSiteAdmin }
              minAdminGuestIcons = { true }
              userId= { userId }
              personaSize={ PersonaSize.size16 }
              title={ 'showGroupTitle'}
              width= { 425}
              maxWidth={ 425 }
              setPivSize = { this.props.setPivSize }
              setPivFormat = { PivotLinkFormat.tabs }
              groups={ this.state.panel.groups } //["PivotTiles Owners", "PivotTiles Members", "PivotTiles Visitors"]
              groupsProps={ this.state.panel.groupsProps } //["PivotTiles Owners", "PivotTiles Members", "PivotTiles Visitors"]
              webURL={ this.props.context.pageContext.web.absoluteUrl }
              context={ this.props.context }
              searchFirstName={ true }
              displayMode={ 0 }
              updateProperty={
                (value: string) => {
                  // this.properties.title = value; //This is for updating Title Props from webpart
              }
              }
              searchProps={ 'Mike' }
              clearTextSearchProps={ ''}
              pageSize={ 5 }
            ></MyGroups>;
        }

        myGroupsPanel = <div><Panel
              isOpen={ this.state.showPanel }
              // this prop makes the panel non-modal
              isBlocking={true}
              onDismiss={ this._closePanel.bind(this) }
              closeButtonAriaLabel="Close"
              type = { this.state.panel.type }
              isLightDismiss = { true }
            >
            { myGroups }
        </Panel></div>;
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
        let stackSettingTokens = { childrenGap: 20, width: '100%' };

        //If you set the width here, it drives the overall width of the part.
        //For some reason it is shown as 1204 in the actual page... not the full width of the page.
        let stylesDir = styles.directory;
        return (
          <div className={ stylesDir } style={{ width: this.props.width, maxWidth: this.props.maxWidth }}>
            { webpartTitle }
            <Stack horizontal={false} wrap={false} horizontalAlign={"center"} tokens={stackSettingTokens}>{/* Stack for Buttons and Webs */}

                {/*
                    <div className={styles.searchBox}>
                      { searchBox } 
                    </div>
                    */
                }

                <div>
                  { permissionsPivot } 
                </div>
                { myGroupsPanel }
                <div>
                  { permissionInfo } 
                </div>  

                { showNoPermissions === true ? 
                      noPermissions 
                
                  : this.state.hasError ? 
                      errorBar 

                  : this.state.isLoading ? 
                      <div>
                        { searchSpinner }
                        { myProgress }
                      </div>
                    : null

                }

             </Stack>
          </div>
        );
      }

      private _renderAdminsIcon(link: IPivotItemProps, defaultRenderer: (link: IPivotItemProps) => JSX.Element): JSX.Element {
        return (
          <span>
            {defaultRenderer(link)}
            <Icon iconName= { SiteAdminIconName } style={{ fontWeight: 'bold', fontSize: 'larger', color: 'black' }} />
          </span>
        );
      }

      private _updateStateOnPropsChange() {
        this.setState({ 
        });
      }
      
      private setProgress( fetchCount, fetchTotal, fetchLabel ) {
        let fetchPerComp = fetchTotal > 0 ? fetchCount / fetchTotal : 0 ;
        let showProgress = fetchCount !== fetchTotal ? true : false;

        this.setState({
          fetchTotal: fetchTotal,
          fetchCount: fetchCount,
          fetchPerComp: fetchPerComp,
          fetchLabel: fetchLabel,
          showProgress: showProgress,
        });

      }

      private fetchPermissions( myPermissions: IMyPermissions ) {
        this.setState({ 
          isLoading: true,
          errorMessage: '',
          hasError: false,
          myPermissions: this.setMyPermissions(),
        });
        allAvailableRoleAssignments( this.props.webURL , this.props.listTitles[0], myPermissions, this.addThesePermissionsToState.bind(this), this.setProgress.bind(this) );

      }

      private addThesePermissionsToState( myPermissions: IMyPermissions, errorMessage: string ) {

        console.log('addThesePermissionsToState', errorMessage );
        console.log('THE Permissions', myPermissions );

        let webPermissionAllDetla : IThisPermissionDelta[] = [];
        let webPermissionMinDetla : IThisPermissionDelta[] = [];
        let webPermissionEquals : IThisPermissionDelta[] = [];

        if ( this.props.webPermissions !== null && this.props.listTitles[0] !== 'web' ) {
          webPermissionAllDetla = comparePermissions( this.props.webPermissions, myPermissions );
          webPermissionAllDetla.map( user => {
            if ( user.direction !== 'equal' ) { webPermissionMinDetla.push( user ) ; } else { webPermissionEquals.push( user ) ; }
          });
          console.log('webPermissionAllDetla', webPermissionAllDetla );
          console.log('webPermissionEquals', webPermissionEquals );
          console.log('webPermissionMinDetla', webPermissionMinDetla );
        }

        this.setState({ 
            myPermissions: myPermissions,
            limtedPermissions: myPermissions.limtedPermissions,
            deltaPermissions: webPermissionMinDetla.length > 0 ? true : false,

            webPermissionAllDetla: webPermissionAllDetla,
            webPermissionMinDetla: webPermissionMinDetla,
            webPermissionEquals: webPermissionEquals,

            deltaElements: this.buildDeltaElements( webPermissionMinDetla ),
            equalElements: this.buildDeltaElements( webPermissionEquals ),
            
            isLoading: myPermissions.isLoading,
            errorMessage: errorMessage,
            hasError: errorMessage.length > 0 ? true : false,
        });

        if ( this.props._updateWebPermissions !== null && this.props.webPermissions === null  ) {
          console.log( '_updateWebPermissions', myPermissions );
          this.props._updateWebPermissions( myPermissions );
        }
      }

      private buildDeltaElements( webPermissionMinDetla : IThisPermissionDelta[] ) {
          let rows : any = [];
          let limitedAccess = this.props.width >= 800 ? 'Limited Access' : 'LimAcc';
          webPermissionMinDetla.map( user => {
            let subChild = null;
            if ( user.childPermissions.length > 0 ) { 
              user.childPermissions.map( perm=> { if ( perm.Name.toLowerCase().indexOf('limited') > -1 ) { subChild = 'Shared' ; }   });
            }
            if ( user.direction !== null  ) {
              let parentPerms = user.parentPermissions.length > 0 ? user.parentPermissions.map( perm => { return perm.Name ; }).join(', ') : 'Not on web';
              let childPerms = user.childPermissions.length > 0 ? user.childPermissions.map( perm => { return perm.Name ; }).join(', ') : 'Not on ' + this.props.listTitles[0];

              rows.push( <tr>
                <td>{ user.Id }</td>
                <td>{ user.PrincipalText }</td>
                <td title={ user.Title }
                    onClick={ user.PrincipalText === 'Group' ? this.openGroupPanel.bind(this) : null } 
                    id= { this.groupTitlePrefix + user.Title }
                    style={{ cursor: user.PrincipalText === 'Group' ? 'pointer' : null }}
                >{ user.shortTitle }</td>
                <td title={ parentPerms }>{ parentPerms.replace( 'Limited Access', limitedAccess ) }</td>
                <td>{ <Icon iconName={user.dirIcon} styles = { deltaIconStyles }/>  }</td>
                <td title={ childPerms }>{ childPerms.replace( 'Limited Access', limitedAccess ) }</td>
                <td>{ subChild }</td>
              </tr> );
            }
          });

          return rows;
      }

      private getTabPerWidth( tab: IShowPermissionPage ) {

        if ( this.props.width && this.props.width >= 800 ) {
          return tab.tab8;
        } else if ( this.props.width && this.props.width >= 600 ) {
          return tab.tab6;
        } else {
          return tab.tab0;
        }

      }

  /**
   *
   *
   * @private
   * @param {PivotItem} [item]
   * @param {React.MouseEvent<HTMLElement>} [ev]
   * @memberof Directory
   */
  private _selectedIndex(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
    //this.setState({ searchText: "" }, () => this._searchUsers(item.props.itemKey));

    let itemKey = item.props.itemKey;

    if ( itemKey === currentPermissions.tab8 ) {
      this.setState({ 
        showThis: currentPermissions,
      });

      if (ev.ctrlKey) {
        window.open( this.props.webURL + "/_layouts/15/user.aspx?obj={" + this.props.theList.Id + "},doclib&List={" + this.props.theList.Id + "}", '_blank' );
      }

    } else if ( itemKey === deltaPerms.tab8 ) {
      this.setState({ 
        showThis: deltaPerms,
      });
      
    } else if ( itemKey === samePerms.tab8 ) {
      this.setState({ 
        showThis: samePerms,
      });
      
    } else if ( itemKey === sharedLimited.tab8 ) {
      this.setState({ 
        showThis: sharedLimited,
      });
      
    } else if ( itemKey === sharedDetails.tab8 || itemKey === sharedHistory.tab8 ) {
      let showThis = itemKey === sharedDetails.tab8 ? sharedDetails : sharedHistory;

      if ( this.state.mySharing.isLoaded === true ) {
        this.setState({ 
          showThis: showThis,
        });

      } else {

        this.setState({ 
          showThis: showThis,
        });

        this.getShared();

      }

    } else { 
      this.setState({ 
        errorMessage: 'Not sure what\s up!  Unexpected Pivot Click',
      });
    }

  }

  private getShared() {
    allSharedItems( this.props.webURL , this.props.listTitles[0], this.addShareHistoryToState.bind(this), null, this.props.width  );
  }

  private addShareHistoryToState( mySharing : IMySharingInfo, errorMessage: string ) {

    console.log('addShareHistoryToState', errorMessage );
    console.log('THE Sharing', mySharing );

    this.setState({
        mySharing: mySharing,
        errorMessage: errorMessage,
        hasError: errorMessage.length > 0 ? true : false,
    });
  }

  private openGroupPanel( e: any ) {
    //This element syntax works when you have <span><strong>text</strong></span>
    let testElement = e.nativeEvent.target;
    let id = '';
    if ( testElement.id.indexOf( this.groupTitlePrefix) === 0 ) {
      id = testElement.id.replace( this.groupTitlePrefix ,'' );
    } else if ( testElement.parentElement.id.indexOf( this.groupTitlePrefix) === 0 ) {
      id = testElement.parentElement.id.replace( this.groupTitlePrefix ,'' );
    }
    let panel = createStateGroupsPanel( [id], false );

    this.setState({
      panel: panel,
      showPanel: true,
    });

  }
  private _closePanel ( )  {
    this.setState({ showPanel: false,});
  }

}