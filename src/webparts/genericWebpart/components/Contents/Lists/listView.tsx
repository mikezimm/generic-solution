
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';


import { IContentsListInfo, IMyListInfo, IServiceLog,  } from '@mikezimm/npmfunctions/dist/Lists/listTypes';

import { buildPropsHoverCard } from '../../../../../services/hoverCardService';

import { createIconButton } from '../../createButtons/IconButton';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '../../HelpInfo/AllLinks';

import { IListBucketInfo } from './listsComponent';

import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

import * as fpsAppIcons from '@mikezimm/npmfunctions/dist/Icons/standardEasyContents';

// const iconStyles: React.CSSProperties = { background: 'white', color: 'black', padding: '5px', margin: '1px', borderRadius: '50%', opacity: '80%'} ;
// const redIconStyles: React.CSSProperties = { background: 'white', color: 'red', padding: '5px', margin: '1px', borderRadius: '50%', opacity: '80%'} ;
// export const UniquePerms = <Icon iconName="Shield" title="Unique Permissions" style={ iconStyles }></Icon>;

export interface IMyLogListProps {
    title: string;
    titles: [];
    webURL: string;
    items: IListBucketInfo;
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    allowCrazyLink: boolean; //property that determines if some links not intended for public are visible, like permissions of SharePoint system lists
    descending: boolean;
    maxChars?: number;
    showDesc?: boolean;
    pickThisList: any;
    _openRailsOffPanel: any;

}

export interface IMyLogListState {
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


export default class MyLogList extends React.Component<IMyLogListProps, IMyLogListState> {


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

    constructor(props: IMyLogListProps) {
        super(props);
        this.state = {
          maxChars: this.props.maxChars ? this.props.maxChars : 50,

        };
    }
        
    public componentDidMount() {
        //this._getListItems();
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

    public componentDidUpdate(prevProps: IMyLogListProps): void {
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


    public render(): React.ReactElement<IMyLogListProps> {

      let thisLog = null;

      if ( this.props.items.lists != null && this.props.items.count > 0 ) { 

        let logItems : IContentsListInfo[] = this.props.items.lists;

        let styleAdvanced = this.props.showSettings ? styles.showMe : styles.hideMe;
        let styleRails = this.props.railsOff ? styles.showMe : styles.hideMe;
        let styleRailsRev = this.props.railsOff ? styles.hideMe : null;
        let styleDesc = this.props.showDesc ? styles.showMe : styles.hideMe;

        let itemRows = logItems.length === 0 ? null : logItems.map( ( Lst, index)  => { 

          let defButtonStyles = {
            root: {padding:'0px !important', height: 26, width: 26, backgroundColor: 'white'},//color: 'green' works here
            icon: { 
              fontSize: 14,
              //fontWeight: "900",
              margin: '10px 5px',  //This puts the margin around the buttons
              //color: '#00457e', //This will set icon color : 00457e
           },
          };

          let columnsStyles = JSON.parse(JSON.stringify(defButtonStyles));
          columnsStyles.root.color = 'red !important';
          columnsStyles.root.fontWeight = "600 !important";

          let viewsStyles = JSON.parse(JSON.stringify(defButtonStyles));
          viewsStyles.root.color = 'blue !important';
          viewsStyles.root.fontWeight = "900 !important";

          let typesStyles = JSON.parse(JSON.stringify(defButtonStyles));
          typesStyles.root.color = 'green !important';
          typesStyles.root.fontWeight = "900 !important";
          
          let listOrLibrary = Lst.meta.indexOf('Libraries') > -1 ? 'Libraries' : 'Other';
          let listInfo = '|Splitme|' + Lst.Id + '|Splitme|' + Lst.EntityTypeName  + '|Splitme|' + Lst.Title + '|Splitme|' + listOrLibrary;

//          console.log('listInfo', listInfo);
//          console.log(' this.props.pickThisList',  this.props.pickThisList);
          let gotoColumns = createIconButton('OEM', 'Columns', this.props.pickThisList, 'Columns' + listInfo , columnsStyles );
          let gotoViews = createIconButton('ChevronDown', 'Views', this.props.pickThisList, 'Views' + listInfo, viewsStyles );
          let gotoTypes = createIconButton('TypeScriptLanguage', 'Types', this.props.pickThisList, 'Types' + listInfo, typesStyles );

          //import { buildPropsHoverCard } from '../../../../../services/hoverCardService';
          let detailsCard = buildPropsHoverCard(Lst, ["Title","BaseTemplate","Description","EntityTypeName","Id"], ["meta","searchString"] , true, null );

          let versionNumbers = 'none!';
          if ( Lst.EnableVersioning === true ) {
            versionNumbers = Lst.MajorVersionLimit.toString();
            if ( Lst.EnableMinorVersions === true ) {
              versionNumbers += '.' + Lst.MajorWithMinorVersionsLimit.toString();
            }
          }

          const UniquePermIcon: JSX.Element = <div id={ index.toString() } data-railFunction='ListPermissions' data-listTitle={ Lst.Title } onClick={ this.props._openRailsOffPanel}> { fpsAppIcons.UniquePerms } </div>;

          let listTitleRUL : any = Lst.Title;
          let listSettingsURL : any = Lst.EntityTypeName;
          let listVersionURL : any = versionNumbers ;
          let listPermissionURL : any = Lst.HasUniqueRoleAssignments === true ? UniquePermIcon : '-';
          let listAdvancedURL : any = '-';
          let listAdvancedCT : any = '-';
          
          let showList = false;
          let showSettings = false;
          let showVersion = false;
          let showPermission = false;
          let showAdvanced = false;

          if ( this.props.showSettings ) {
            if ( Lst.allowCrazyLink === true ) {
              if ( this.props.allowCrazyLink === true ) {
                showSettings = true;
                showList = true;
                if ( this.props.railsOff === true ) {
                  showVersion = true;
                  showPermission = true;
                  showAdvanced = true;
                }
              } else if ( this.props.railsOff === true ) { showList = true; }
            } else if ( Lst.railsOffLink === true ) {
              if ( this.props.railsOff === true ) {
                showSettings = true;
                showList = true;
              }
            } else {
              showSettings = true;
              showVersion = true;
              showPermission = true;
              showAdvanced = true;
              showList = true;
            }

          } else { //This will show list links if settings are not enabled
            if ( Lst.allowCrazyLink === true ) {
              if ( this.props.allowCrazyLink === true ) { showList = true; }

            } else if ( Lst.railsOffLink === true ) {
              if ( this.props.railsOff === true ) { showList = true; }
            }

          }

          if ( Lst.railsOffLink !== true && Lst.allowCrazyLink !== true ) { showList = true; }

          if ( showList === true ) { listTitleRUL = createLink( Lst.listURL, '_blank', Lst.Title); }
          if ( showSettings === true ) { listSettingsURL = createLink(this.props.webURL + "/_layouts/15/listedit.aspx?List=(" + Lst.Id + ")", '_blank', Lst.EntityTypeName); }
          if ( showVersion === true ) { listVersionURL = createLink(this.props.webURL + "/_layouts/15/LstSetng.aspx?List=(" + Lst.Id + ")", '_blank', versionNumbers ); }
          if ( showPermission === true ) { listPermissionURL = createLink(this.props.webURL + "/_layouts/15/user.aspx?obj={" + Lst.Id + "},doclib&List={" + Lst.Id + "}", '_blank', 'Perms'); }
          if ( showAdvanced === true ) { listAdvancedURL = createLink(this.props.webURL + "/_layouts/15/advsetng.aspx?List=(" + Lst.Id + ")", '_blank', 'Adv'); }
          if ( showAdvanced === true ) { listAdvancedCT = createLink(this.props.webURL + "/_layouts/15/advsetng.aspx?List=(" + Lst.Id + ")", '_blank', 'CT'); }

          let other = <div style={{ display: 'inline-flex', backgroundColor: 'white', padding: 0 }}> { gotoColumns } { gotoViews } { gotoTypes }  </div>;

          return <tr>
            <td className={ styles.nowWrapping }> { listTitleRUL } </td>
            <td className={ styles.nowWrapping }> { listSettingsURL }</td>
            <td className={ styleDesc }> { Lst.Description.length > this.state.maxChars ? Lst.Description.slice(0,this.state.maxChars) + '...' : Lst.Description } </td>
            <td> { Lst.ItemCount } </td>

            <td className={ [styles.nowWrapping, styleRailsRev].join(' ') }> { Lst.Created } </td>
            <td className={ styleRailsRev }> { Lst.LastItemModifiedDate } </td>
            <td> { listVersionURL } </td>
            <td> { listPermissionURL } </td>
            <td className={ styleRailsRev }> { Lst.NoCrawl } </td>
            <td className={ styleRailsRev }> { listAdvancedCT } </td>
            <td className={ styleRailsRev }> { listAdvancedURL } </td>
            <td className={ styleRailsRev }> { Lst.BaseTemplate } </td>
            <td style={{ backgroundColor: 'white' }} className={ [styles.listButtons, styleRailsRev].join(' ') }> { other } </td>
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

        let logTable = <table style={{ display: '', borderCollapse: 'collapse', width: '100%' }} className={stylesInfo.infoTable}>
            <tr>
              <th>Title</th>
              <th>Name</th>
              <th className={ styleDesc }>Description</th>
              <th>Items</th>
              <th className={ [styles.nowWrapping, styleRailsRev].join(' ') }>Created</th>
              <th className={ styleRailsRev }>Updated</th>
              <th>Vers</th>
              <th>Perms</th>
              <th className={ styleRailsRev }>Search</th>
              <th className={ styleRailsRev }>CT</th>  
              <th className={ styleRailsRev }>Exceptions</th>
              <th className={ styleRailsRev }>Base</th>
              <th className={ styleRailsRev }>Other</th>
              <th>More</th>

            </tr>
            { itemRows }
        </table>;

      let listTitle = this.props.items.bucketLabel == '' ? null :
        <div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ this.props.items.bucketLabel } - ( { this.props.items.count } )</span></div>;

        return (
          <div className={ styles.logListView }>
              <div style={{ paddingTop: 10}} className={ stylesInfo.infoPaneTight }>
                { listTitle }
                { logTable }
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
