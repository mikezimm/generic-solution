
//Format for getting user photo
//https://mcclickster.sharepoint.com/sites/Templates/PowerShell/_layouts/15/userphoto.aspx?size=M&accountname=bb@mcclickster.onmicrosoft.com

import * as React from 'react';
import styles from "./MyPermissions.module.scss";

import { Web, } from "@pnp/sp/presets/all";

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons, IStackProps, PersonaSize, GroupedList } from 'office-ui-fabric-react';

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

import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import { SiteAdminGroupName, SiteAdminIconName, GuestsGroupName, GuestsIconName } from './IMyPermissionsState';
import { IWebPermissionsProps } from './IWebPermissionsProps';
import { IWebPermissionsState } from './IWebPermissionsState';

import { allWebLists, IPermissionLists, IMyPermissions } from './Services/Permissions';

import MyPermissions from './MyPermissions';
import { makeid } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';

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

export default class WebPermissions extends React.Component<IWebPermissionsProps, IWebPermissionsState> {

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

    let restFilter = 'HasUniqueRoleAssignments eq true';
    
    if ( this.props.fetchInfo.permissionsHiddenExclude === true )  { 
      restFilter += ' and Hidden eq false';
    }

    let permissionLists: IPermissionLists =  {
        idsToGet: [],
        isLoading: true,
        errMessage: '',
        restFilter: restFilter,
        selectString: '',
        titles: [],
        lists: [],
    };
    return permissionLists;
}

public constructor(props:IWebPermissionsProps){
    super(props);
    this.state = { 
        permissionItems: [],
        permissionLists: this.setMyPermissions(),
        isLoading: true,
        errorMessage: "",
        hasError: false,
        indexSelectedKey: this.props.fetchInfo.permissionsListsInclude === true ? this.props.listTitles[0] : 'web',
        selectedEntityId: null,
        selectedEntity: null,
        searchString: "LastName",
        searchText: "",
        refreshId: '',
        webPermissions: null,

    };
   
  }


  public componentDidMount() {
    console.log('componentDidMount MyGroups:', this.props.listTitles);
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
    if (prevProps.width !== this.props.width ) { rebuildTiles = true ; }
    if ( prevProps.listTitles !== this.props.listTitles ) { reload = true ; }

    if ( reload === true ) {
      console.log('componentDidUpdate reloading MyGroups:', this.props.listTitles);
      this.fetchPermissions( this.setMyPermissions() );

    } else if (rebuildTiles === true) {
      console.log('componentDidUpdate rebuilding MyGroups:', this.props.listTitles);
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

    public render(): React.ReactElement<IWebPermissionsProps> {
        const color = this.props.context.microsoftTeams ? "white" : "";

        let isLoaded = this.state.isLoading === false ? true : false; 

        let webpartTitle = <div><WebPartTitle
            displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty}
          /></div>;

          let iconStyles: any = { root: {
            fontSize: 'larger',
            // fontWeight: 700,
            color: 'red',
            paddingRight: '30px',
            paddingLeft: '30px',
        }};

        const leftIcon = <Icon iconName={'ConstructionCone'} styles = {iconStyles}/>;
        const rightIcon = <Icon iconName={'ConstructionConeSolid'} styles = {iconStyles}/>;

        webpartTitle = <div style={{ padding: '5px 50px 30px 50px'}}>
          <div style={{ fontSize: 'x-large', paddingBottom: '5px' }}>
            { leftIcon } We are working to improve this tab. { rightIcon } 
          </div>
          <div style={{ paddingTop: '5px', paddingBottom: '1px', fontSize: 'larger' }}>
            You can see permissions for <strong>this site</strong> AND any <strong>Lists or Libraries where permissions <u>are not inheritted</u></strong>.
          </div>
          <div style={{ fontSize: 'small' }}>
            If you find anything incorrect, please report the details by clicking on the mail icon in the top bar of the webpart.
          </div>
        </div>;

        let permissionsPivot = <div><Pivot
            styles={{
              root: {
                paddingLeft: 10,
                paddingRight: 10,
                whiteSpace: "normal",
                textAlign: "center"
              }
            }}
            linkFormat={PivotLinkFormat.tabs}
            selectedKey={this.state.indexSelectedKey}
            onLinkClick={this._selectedIndex.bind(this)}
            linkSize={PivotLinkSize.large}
          >
            { this.state.permissionLists.titles.map(( thisList ) => { //_renderAdminsIcon
                return (<PivotItem headerText={thisList} itemKey={thisList} key={thisList} itemIcon={ null } /> );
            })}
          </Pivot></div>;

          let DirectoryMessage = [];
          let noPermissions = <div className={ styles.noPermissions }>
              <Icon
                iconName={"ProfileSearch"}
                style={{ fontSize: "54px", color: color }}
              />
              { DirectoryMessage }
            </div>;

        let errorBar = this.state.hasError ? <div><MessageBar messageBarType={MessageBarType.error}>
                {this.state.errorMessage}
            </MessageBar></div> : null ;

        let selectedEntity = this.state.selectedEntity;
        let showNoPermissions = isLoaded === false ? true : false;

        let searchSpinner = showNoPermissions !== true && this.state.isLoading ? <Spinner size={SpinnerSize.large} label={"searching ..."}  /> : null ;
   
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

          let whatPermissions = this.props.fetchInfo.permissionsListsInclude === false ? 'web' : 'list';

          let permissions = whatPermissions === '' ? null : <MyPermissions
              groupsShowAdmins= { this.props.fetchInfo.groupsShowAdmins }
              groupsShowGuests= { this.props.fetchInfo.groupsShowGuests }
              isSiteAdmin={ this.props.isSiteAdmin }
              userId= { this.props.userId }
              title={  ' Permissions for ' + this.state.indexSelectedKey }
              width= { this.props.width }
              maxWidth={ this.props.maxWidth }
              setPivSize = { this.props.setPivSize }
              setPivFormat = { PivotLinkFormat.tabs }
              listTitles={ whatPermissions === 'list' ? [ this.state.indexSelectedKey] : ['web'] }

              theList = { this.state.selectedEntity }
              webPermissions = { this.state.webPermissions }
              _updateWebPermissions= {  this.state.indexSelectedKey === 'web' && this.state.webPermissions === null ? this._updateWebPermissions.bind(this) : null }

              webURL={ this.props.webURL }
              context={ this.props.context }
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
        return (
          <div className={styles.directory} style={{ width: this.props.width }}>
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

                { showNoPermissions === true ? 
                      noPermissions 

                  : this.state.isLoading ? 
                      searchSpinner
                
                  : this.state.hasError ? 
                      errorBar 

                    : permissions

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

      private fetchPermissions( permissionLists: IPermissionLists ) {
        if ( this.props.fetchInfo.permissionsListsInclude === true ) {
          allWebLists( this.props.webURL , permissionLists, this.addTheseListsToState.bind(this), null );
        } else {
          permissionLists.isLoading = false;
          this.addTheseListsToState( permissionLists, '' );
        }
      }

      private addTheseListsToState( permissionLists: IPermissionLists, errorMessage: string ) {

        console.log('addTheseListsToState', errorMessage );
        console.log('THE Lists', permissionLists );
        let permissionItems = ['web'];
        permissionLists.lists.map( list => {
          permissionItems.push( list.Title );
        });
        permissionLists.titles = permissionItems;

        this.setState({ 
            permissionLists: permissionLists,
            indexSelectedKey: 'web',
            selectedEntityId: 'web',
            isLoading: permissionLists.isLoading,
            errorMessage: errorMessage,
            hasError: errorMessage.length > 0 ? true : false,
            refreshId: makeid(6),
            webPermissions: null,
        });
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

    let clickedRole = item.props.itemKey;

    let thisListIndex = this.state.permissionLists.titles.indexOf( clickedRole );
    let thisListId = thisListIndex === 0 ? 'web' : this.state.permissionLists.lists[thisListIndex - 1].Id;

    if (ev.ctrlKey ) {
      this.gotoPermissions( thisListIndex );

    } else if (ev.altKey) {

    }


   ///_layouts/15/people.aspx?MembershipGroupId=6

    this.setState({ 
      searchText: "",
      indexSelectedKey: clickedRole,
      selectedEntityId: thisListId,
      selectedEntity: this.state.permissionLists.lists[thisListIndex - 1], //must be -1 because first one is the web.
      refreshId: makeid(6),
     });

  }

  private async gotoPermissions( thisListIndex : number ) {

    let gotoUrl = this.props.context.pageContext.web.absoluteUrl;
    if ( thisListIndex === 0 ) {
      gotoUrl += '/_layouts/15/user.aspx';
    } else {
      let thisListId = this.state.permissionLists.lists[thisListIndex - 1].Id.toUpperCase();
      gotoUrl += `/_layouts/15/user.aspx?obj={${thisListId}},doclib&List={${thisListId}}`;
    }
    window.open( gotoUrl, '_blank');

  }

  private _updateWebPermissions( webPermissions: IMyPermissions, err: string ) {

    this.setState({
      webPermissions: webPermissions,
    });

  }

}