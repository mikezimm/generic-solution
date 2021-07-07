
import * as React from 'react';

import { WebPartContext } from "@microsoft/sp-webpart-base";  //  wpContext: WebPartContext;

import { buildPropsHoverCard } from '../../../../../services/hoverCardService';

import { convertTextToListItems } from '../../../../../services/basicElements';

import { IContentsGroupInfo, IGroupBucketInfo} from './groupsComponent';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize} from 'office-ui-fabric-react/lib/Pivot';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { PersonaSize} from 'office-ui-fabric-react/lib/Persona';


import { createLink } from '@mikezimm/npmfunctions/dist/HelpInfo/Links/CreateLinks';
import { createSpanLink } from '../../../../../services/basicElements';

import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

/** Remove these when not using groups vvvvvv */
import MyGroups from '../MyGroups/MyGroups';
import { buildGroupProps, createStateGroupsPanel, } from '../MyGroups/GroupFunctions';
import { IMyGroupsProps, IGroupsProps } from '../MyGroups/IMyGroupsProps';
import { IPermissionsPanel } from '../Permissions/IMyPermissionsState';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
/** Remove these when not using groups ^^^^^ */

import * as fpsAppIcons from '@mikezimm/npmfunctions/dist/Icons/standardEasyContents';
import { doesObjectExistInArrayInt } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';

export interface IMyLogGroupProps {
    //title: string;
    titles: [];
    searchMeta: string;
    webURL: string;
    blueBar?: string;

    items: IGroupBucketInfo;
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;

    showUsers: boolean;

    showDesc?: boolean;
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    specialAlt: boolean;

    wpContext: WebPartContext;
    currentUser: IUser;

}

export interface IMyLogGroupState {
  maxChars?: number;
  
  panel: IPermissionsPanel;
  showPanel: boolean;
}

const stackFormRowTokens: IStackTokens = { childrenGap: 10 };

const iconClassAction = mergeStyles({
  fontSize: 18,
  fontWeight: "bolder",
  color: "black",
  margin: '5px',
  verticalAlign: 'bottom',
  padding: '0px !important',
});

const iconClassInfo = mergeStyles({
  fontSize: 18,
  margin: '5px',
  verticalAlign: 'bottom',
  padding: '0px !important',
});


export default class MyLogGroup extends React.Component<IMyLogGroupProps, IMyLogGroupState> {

  private groupTitlePrefix = "groupTitle-";
  private groupIdPrefix = "groupId-";

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

    constructor(props: IMyLogGroupProps) {
        super(props);
        this.state = {
          maxChars: this.props.maxChars ? this.props.maxChars : 50,
          panel: createStateGroupsPanel( [''], false ),
          showPanel: false,
        };
    }
        
    public componentDidMount() {
        //this._getWebItems();

        
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

    public componentDidUpdate(prevProps: IMyLogGroupProps): void {
      //this._updateWebPart(prevProps);
      let doUpdate = false;

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


    public render(): React.ReactElement<IMyLogGroupProps> {

      let thisLog = null;

      if ( this.props.items.groups != null && this.props.items.count > 0 ) { 

        let logItems : IContentsGroupInfo[] = this.props.items.groups;

        let styleAdvanced = this.props.showSettings ? styles.showMe : styles.hideMe;
        let styleTitle = this.props.showSettings ? styles.hideMe : styles.nowWrapping;
        let styleRails = this.props.railsOff ? styles.showMe : styles.hideMe;
        let columnsToVisible = !this.props.railsOff ? styles.showCell : styles.hideMe;
        let styleSpecial = this.props.railsOff ? styles.hideMe : styles.showCell;
        let styleDesc = this.props.showDesc ? styles.showCell : styles.hideMe;

        let styleUsers = this.props.showUsers ? styles.showCell : styles.hideMe;

        let styleRailsOff = this.props.railsOff ? styles.showCell : styles.hideMe;
        let styleOnRailsOn = this.props.railsOff ? styles.hideMe : styles.showCell;

        if ( this.props.railsOff ) { columnsToVisible = styles.hideMe ; }

        let itemRows = logItems.length === 0 ? null : logItems.map( ( Grp, index ) => { 

          let defButtonStyles = {
            root: {padding:'0px !important', height: 26, width: 26, backgroundColor: 'white'},//color: 'green' works here
            icon: { 
              fontSize: 14,
              fontWeight: "900",
              margin: '10px 5px',  //This puts the margin around the buttons
              //color: '#00457e', //This will set icon color : 00457e
           },
          };

          let groupTitle = Grp.Title != null && Grp.Title.indexOf('SharingLinks') === 0 ? Grp.Title.slice(0, 20) : Grp.Title;
          let groupLink = createSpanLink(this.props.webURL + '/_layouts/15/people.aspx?MembershipGroupId=' + Grp.Id, groupTitle );

          let userString = Grp.userString;
          
          if  ( Grp.userString === undefined || Grp.userString === null ) {

          } else if ( this.props.specialAlt === true ) {
              userString = convertTextToListItems( Grp.userString, ';', 15, 'ul');
          }

          // && this.props.specialAlt === true
          //import { buildPropsHoverCard } from '../../../../../services/hoverCardService';
          let detailsCard = buildPropsHoverCard(Grp, ["Title","Description","Id","odata.type", "typeString"], ["meta","searchString"] , true, null );

          const CreateGroupsIcon: JSX.Element = <div id={ index.toString() } data-railFunction='GetUsers' data-groupTitle={ Grp.Title } onClick={ this.openGroupPanel.bind(this) }> { fpsAppIcons.CreateGroups } </div>;

          let userCount = <div style={{ display: 'inline-flex', flexWrap: 'nowrap', alignItems: 'center' }}>
            <div>{ Grp.userCount }</div>
            { CreateGroupsIcon }
          </div>;
            let titleStyle : React.CSSProperties = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '350px', paddingTop: '5px' } ;
            //columnsToVisible
            return <tr>
                <td className={ '' }> { '' }</td> 
                <td className={ '' }> { Grp.Id }</td> 
                <td className={ styleTitle } style={ titleStyle } title={ groupTitle }> {  groupTitle }</td>

                <td className= { styleAdvanced }> { groupLink }</td>

                <td className={ '' } style={ titleStyle } title={ Grp.OwnerTitle }> { Grp.OwnerTitle }</td>
                <td className={ styleDesc }> { Grp.Description != null ? Grp.Description.slice(0,this.state.maxChars) + '...' : Grp.Description } </td>

                <td className={ styleSpecial }> { /*this.getWebSpecialValue( F ) */ '' } </td>
                <td className= { styleRailsOff }>Rails Off Content</td>
                <td className= { '' }> { userCount } </td>
                <td className= { styleUsers }> { userString } </td>
                
                <td style={{ backgroundColor: 'white' }} className={ styles.listButtons }>  { detailsCard }</td>

                </tr>;

        });

        
        let myGroupsPanel = null;
        let myGroups = null;

        if ( this.state.showPanel == true ) {
            let userId = this.props.wpContext.pageContext.legacyPageContext.userId;
            let isSiteAdmin = this.props.wpContext.pageContext.legacyPageContext.isSiteAdmin;

            /** set myGroups null when not using groups vvvvvv */
            myGroups = <MyGroups
              groupsShowAdmins= { true }
              groupsShowGuests= { true }
              isSiteAdmin={ isSiteAdmin }
              minAdminGuestIcons = { true }
              userId= { userId }
              personaSize={ PersonaSize.size16 }
              title={ 'showGroupTitle'}
              width= { 425}
              maxWidth={ 425 }
              setPivSize = { PivotLinkSize.normal }
              setPivFormat = { PivotLinkFormat.tabs }
              groups={ this.state.panel.groups } //["PivotTiles Owners", "PivotTiles Members", "PivotTiles Visitors"]
              groupsProps={ this.state.panel.groupsProps } //["PivotTiles Owners", "PivotTiles Members", "PivotTiles Visitors"]
              webURL={ this.props.wpContext.pageContext.web.absoluteUrl }
              context={ this.props.wpContext }
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
 *                   d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *                   88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *                   88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *                   88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *                   88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *                   88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                                      
 *                                                                      
 */

        let webTable = <table style={{ display: '', borderCollapse: 'collapse', width: '100%' }} className={stylesInfo.infoTable}>
            <tr>
                <th></th>
                <th className={ '' }>Id</th>
                <th className={ styleTitle }>Title</th>
                <th className={ styleAdvanced }>Link to Group</th>
                <th className={ '' }>Owner</th>
                <th className={ styleDesc }>Description</th>

                { /* <th className={ columnsToVisible }>Group</th> */ }
                { /* <th className={ columnsToVisible }>Default</th> */ }
                <th className={ styleSpecial }></th>

                <th className= { styleRailsOff }>Rails Off Heading</th>
                <th className= { '' }>Users</th>
                <th className= { styleUsers }></th>
                <th>Details</th>

            </tr>
            { itemRows }
        </table>;
        let barText = this.props.blueBar && this.props.blueBar != null ? this.props.blueBar : this.props.items.bucketLabel;
        if (barText === 'O') { barText = 'Groups with \"Owner\" in the Title' ; }
        else if (barText === 'M') { barText = 'Groups with \"Member\" in the Title' ; }
        else if (barText === 'V') { barText = 'Groups with \"Visitor\" in the Title' ; }
        else if (barText != '') { barText = barText + 'Groups' ; }

        let webTitle = null;
 
        if ( barText != null ) {
          webTitle =<div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ barText } - ( { this.props.items.count } )</span></div>;

        } else if ( this.props.items.bucketLabel !== '' ) {
          webTitle =<div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ this.props.items.bucketLabel } - ( { this.props.items.count } )</span></div>;
        }
            
        return (
          <div className={ styles.logListView }>
            <div style={{ paddingTop: 10}} className={ stylesInfo.infoPaneTight }>
                { webTitle }
                { webTable }
            </div>
            { myGroupsPanel }
          </div>
          );

    } else {

      // <div className={ styles.container }></div>
      return (
          <div className={ styles.logListView }>
              { thisLog }
          </div>
          );
        } 

    } 

    
  private openGroupPanel( e: any ) {
    //This element syntax works when you have <span><strong>text</strong></span>
    let testElement = e.nativeEvent.target;
    // let id = '';
    // if ( testElement.id.indexOf( this.groupTitlePrefix) === 0 ) {
    //   id = testElement.id.replace( this.groupTitlePrefix ,'' );
    // } else if ( testElement.parentElement.id.indexOf( this.groupTitlePrefix) === 0 ) {
    //   id = testElement.parentElement.id.replace( this.groupTitlePrefix ,'' );
    // }

    const parentElement = testElement.parentElement;
    // const rail = parentElement.getAttribute('data-railFunction');
    const groupTitle = parentElement.getAttribute('data-groupTitle');
    const listIndex = doesObjectExistInArrayInt( this.props.items.groups, 'Title', groupTitle, true );
    // const listObject = listIndex > -1 ? this.props.items.groups[listIndex] : null;

    let panel = createStateGroupsPanel( [groupTitle], true );

    this.setState({
      panel: panel,
      showPanel: true,
    });

  }
  private _closePanel ( )  {
    this.setState({ showPanel: false,});
  }

}
