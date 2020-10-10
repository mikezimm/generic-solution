
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '../../IReUsableInterfaces';
import { IContentsListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes';

import { convertTextToListItems } from '../../../../../services/basicElements';

import { IContentsUserInfo, IUserBucketInfo} from './usersComponent';

import { iconSiteAdmin } from './usersFunctions';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '../../HelpInfo/AllLinks';

import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

import { buildPropsHoverCard } from '../../../../../services/hoverCardService';

export interface IMyLogUserProps {
    //title: string;
    titles: [];
    searchMeta: string;
    webURL: string;
    blueBar?: string;

    items: IUserBucketInfo;
    showProfile: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;

    showGroups: boolean;

    showDesc?: boolean;
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    specialAlt: boolean;

}

export interface IMyLogUserState {
  maxChars?: number;
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


export default class MyLogUser extends React.Component<IMyLogUserProps, IMyLogUserState> {


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

    constructor(props: IMyLogUserProps) {
        super(props);
        this.state = {
          maxChars: this.props.maxChars ? this.props.maxChars : 50,
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

    public componentDidUpdate(prevProps: IMyLogUserProps): void {
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


    public render(): React.ReactElement<IMyLogUserProps> {

      let thisLog = null;

      if ( this.props.items.users != null && this.props.items.count > 0 ) { 

        let logItems : IContentsUserInfo[] = this.props.items.users;

        let styleAdvanced = this.props.showProfile ? styles.showMe : styles.hideMe;
        let styleTitle = styles.nowWrapping;
        let styleRails = this.props.railsOff ? styles.showMe : styles.hideMe;
        let columnsToVisible = !this.props.railsOff ? styles.showCell : styles.hideMe;
        let styleSpecial = this.props.railsOff ? styles.hideMe : styles.showCell;
        let styleDesc = this.props.showDesc ? styles.showCell : styles.hideMe;

        let styleUsers = this.props.showGroups ? styles.showCell : styles.hideMe;

        let styleRailsOff = this.props.railsOff ? styles.showCell : styles.hideMe;
        let styleOnRailsOn = this.props.railsOff ? styles.hideMe : styles.showCell;

        if ( this.props.railsOff ) { columnsToVisible = styles.hideMe ; }

        let itemRows = logItems.length === 0 ? null : logItems.map( Usr => { 

          let defButtonStyles = {
            root: {padding:'0px !important', height: 26, width: 26, backgroundColor: 'white'},//color: 'green' works here
            icon: { 
              fontSize: 14,
              fontWeight: "900",
              margin: '10px 5px',  //This puts the margin around the buttons
              //color: '#00457e', //This will set icon color : 00457e
           },
          };

          let userTitle = Usr.Title != null && Usr.Title.indexOf('SharingLinks') === 0 ? Usr.Title.slice(0, 20) : Usr.Title;

          let userBold = <span style={{ fontWeight: 600, color: 'purple' }}>{ userTitle }</span>;

          let groupLink = null; //createLink(this.props.webURL + '_layouts/15/people.aspx?MembershipUserId=' + Usr.Id, '_blank', userTitle );

          let groupString = Usr.groupString;
          
          if  ( Usr.groupString === undefined || Usr.groupString === null ) {

          } else if ( this.props.specialAlt === true ) {
              groupString = convertTextToListItems( Usr.groupString, ';', 15, 'ul');
          }

          let detailsCard = buildPropsHoverCard(Usr, ["Title","Email","IsSiteAdmin","LoginName", "Id"], ["meta","searchString"] , true, null );

            let adminIcon = Usr.IsSiteAdmin === true ? iconSiteAdmin : null;
            //columnsToVisible
            return <tr>
                <td className={ '' }> { Usr.fabricIcon }</td> 

                <td className={ styleTitle }> { ( Usr.IsSiteAdmin ? userBold : userTitle) } { adminIcon } </td>
                <td className={ '' }> { Usr.Id }</td>

                <td className= { styleAdvanced }> { groupLink }</td>

                <td className={ styleDesc }> { /* Usr.Description != null ? Usr.Description.slice(0,this.state.maxChars) + '...' : Usr.Description */ } </td>

                <td className={ styleSpecial }> { /*this.getWebSpecialValue( F ) */ '' } </td>
                <td className= { styleRailsOff }>Rails Off Content</td>
                <td className= { styleUsers }> {Usr.groupCount } </td>
                <td className= { styleUsers }> { groupString } </td>
                
                <td style={{ backgroundColor: 'white' }} className={ styles.listButtons }>  { detailsCard }</td>

                </tr>;

        });

    
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
                <th style={{minWidth: 50}}></th>
                <th className={ styleTitle }>Title</th>
                <th className={ '' }>Id</th>
                <th className={ styleAdvanced }>Profile</th>

                <th className={ styleDesc }>Description</th>

                { /* <th className={ columnsToVisible }>User</th> */ }
                { /* <th className={ columnsToVisible }>Default</th> */ }
                <th className={ styleSpecial }></th>

                <th className= { styleRailsOff }>Rails Off Heading</th>
                <th className= { styleUsers }>Groups</th>
                <th className= { styleUsers }></th>
                <th>Details</th>

            </tr>
            { itemRows }
        </table>;
        let barText = this.props.blueBar && this.props.blueBar != null ? this.props.blueBar : this.props.items.bucketLabel;
        if (barText === 'Security') { barText = barText + ' Principal=4' ; }
        else if (barText === 'User' || barText === 'NoID' || barText === 'AD' || barText === 'Trusted') { barText = barText + ' Principal=1' ; }
        else if (barText != '') { barText = barText + ' Users' ; }

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

}
