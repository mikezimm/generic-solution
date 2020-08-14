
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '../../IReUsableInterfaces';
import { IContentsListInfo, IMyListInfo, IServiceLog,  } from '../../../../../services/listServices/listTypes';

import { createIconButton } from '../../createButtons/IconButton';

import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '../../HelpInfo/AllLinks';

import { IListBucketInfo } from './listsComponent';

import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogListProps {
    title: string;
    titles: [];
    webURL: string;
    items: IListBucketInfo;
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;
    showDesc?: boolean;
    pickThisList: any;

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
        let styleDesc = this.props.showDesc ? styles.showMe : styles.hideMe;

        let itemRows = logItems.length === 0 ? null : logItems.map( L => { 

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
          
          let listInfo = '|Splitme|' + L.Id + '|Splitme|' + L.EntityTypeName  + '|Splitme|' + L.Title;

          let gotoColumns = createIconButton('OEM', 'Columns', this.props.pickThisList, 'Columns' + listInfo , columnsStyles );
          let gotoViews = createIconButton('ChevronDown', 'Views', this.props.pickThisList, 'Views' + listInfo, viewsStyles );
          let gotoTypes = createIconButton('TypeScriptLanguage', 'Types', this.props.pickThisList, 'Types' + listInfo, typesStyles );

          let itemIcon = null;

          let iconStyles: any = { root: {
            //color: h.color ? h.color : "blue",
          }};

          let normalIcon = <Icon iconName={ "Info"} className={ iconClassInfo } styles = { iconStyles }/>;
          let keys = L.meta ? <div><h3>Properties</h3><ul> { L.meta.map(k => <li>{ k }</li>) } </ul></div> : null;

          const onRenderHoverCard = (item: any): JSX.Element => {
            let hoverFieldStyle = { fontWeight: 700};
            return <div className={styles.hoverCard} style={{padding: 30, maxWidth: 800 }}>
              <div>
                <p><span style={hoverFieldStyle}>Title:</span> { L.Title }</p>
                <p><span style={hoverFieldStyle}>Type:</span> { L.BaseTemplate }</p>
                <p><span style={hoverFieldStyle}>Description:</span> { L.Description }</p>
                <p><span style={hoverFieldStyle}>EntityName:</span> { L.EntityTypeName }</p>
                <p><span style={hoverFieldStyle}>Id:</span> { L.Id }</p>
                <p><br></br></p>
                <p><span style={hoverFieldStyle}>Search String:</span> { L.searchString }</p>
              </div>
            </div>;
          };

          let detailsCard = <div>
            <HoverCard
              cardDismissDelay={300}
              type={HoverCardType.plain}
              plainCardProps={{
                onRenderPlainCard: onRenderHoverCard,
                renderData: 'testRenderData'
              }}>
              { normalIcon }
            </HoverCard>
            </div>;


//.logListView {
//.listButtons {
//.buttons{


          let listSettingsURL = !this.props.showSettings ? L.EntityTypeName : createLink(this.props.webURL + "/_layouts/15/listedit.aspx?List=(" + L.Id + ")", '_blank', L.EntityTypeName);
          let listVersionURL = !this.props.showSettings ? L.MajorVersionLimit : createLink(this.props.webURL + "/_layouts/15/LstSetng.aspx?List=(" + L.Id + ")", '_blank', L.MajorVersionLimit.toString() );
          let listPermissionURL = !this.props.showSettings ? '' : createLink(this.props.webURL + "/_layouts/15/user.aspx?obj={" + L.Id + "},doclib&List={" + L.Id + "}", '_blank', 'Perms');
          let listAdvancedURL = !this.props.showSettings ? '-' : createLink(this.props.webURL + "/_layouts/15/advsetng.aspx?List=(" + L.Id + ")", '_blank', 'Adv');

          let listAdvancedCT = !this.props.showSettings ? L.ContentTypesEnabled : createLink(this.props.webURL + "/_layouts/15/advsetng.aspx?List=(" + L.Id + ")", '_blank', 'CT');


          let other = <div style={{ display: 'inline-flex', backgroundColor: 'white', padding: 0 }}> { gotoColumns } { gotoViews } { gotoTypes }  </div>;

          return <tr>
            <td className={ styles.nowWrapping }> { L.Title } </td>
            <td className={ styles.nowWrapping }> { listSettingsURL }</td>
            <td className={ styleDesc }> { L.Description.length > this.state.maxChars ? L.Description.slice(0,this.state.maxChars) + '...' : L.Description } </td>
            <td> { L.ItemCount } </td>

            <td className={ styles.nowWrapping }> { L.Created } </td>
            <td> { L.LastItemModifiedDate } </td>
            <td> { listVersionURL } </td>
            <td> { listPermissionURL } </td>
            <td> { L.NoCrawl } </td>
            <td> { listAdvancedCT } </td>
            <td> { listAdvancedURL } </td>
            <td> { L.BaseTemplate } </td>
            <td style={{ backgroundColor: 'white' }} className={ styles.listButtons }> { other } </td>
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
              <th>Created</th>
              <th>Updated</th>
              <th>Vers</th>
              <th>Perms</th>
              <th>Search</th>
              <th>CT</th>  
              <th>Exceptions</th>
              <th>Base</th>
              <th>Other</th>
              <th>More</th>

            </tr>
            { itemRows }
        </table>;

        let listTitle = this.props.items.bucketLabel == '' ? null : <h2>{ this.props.items.bucketLabel } - ( { this.props.items.count } )</h2>;

        return (
          <div className={ styles.logListView }>
              <div style={{ paddingTop: 15}} className={ stylesInfo.infoPaneTight }>
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
