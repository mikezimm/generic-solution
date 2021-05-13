
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { buildPropsHoverCard } from '../../../../../services/hoverCardService';

import { IContentsWebInfo, IWebBucketInfo} from './websComponent';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '../../HelpInfo/AllLinks';

import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogWebProps {
    //title: string;
    titles: [];
    searchMeta: string;
    webURL: string;

    items: IWebBucketInfo;
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;

    showDates?: boolean;

    showDesc?: boolean;
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    showXML: boolean;
    showJSON: boolean;
    showSPFx: boolean;

    showMinWebs: boolean;
    specialAlt: boolean;

}

export interface IMyLogWebState {
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


export default class MyLogWeb extends React.Component<IMyLogWebProps, IMyLogWebState> {


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

    constructor(props: IMyLogWebProps) {
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

    public componentDidUpdate(prevProps: IMyLogWebProps): void {
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


    public render(): React.ReactElement<IMyLogWebProps> {

      let thisLog = null;

      if ( this.props.items.webs != null && this.props.items.count > 0 ) { 

        let logItems : IContentsWebInfo[] = this.props.items.webs;

        let styleAdvanced = this.props.showSettings ? styles.showMe : styles.hideMe;
        let styleRails = this.props.railsOff ? styles.showMe : styles.hideMe;
        let columnsToVisible = !this.props.railsOff && ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.showCell : styles.hideMe;
        let styleSpecial = this.props.railsOff || ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.hideMe : styles.showCell;
        let styleDesc = !this.props.railsOff && this.props.showDesc && ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.showCell : styles.hideMe;
        let styleXML = !this.props.railsOff && this.props.showXML ? styles.showCell : styles.hideMe;
        let styleJSON = !this.props.railsOff && this.props.showJSON ? styles.showCell : styles.hideMe;
        let styleSPFx = !this.props.railsOff && this.props.showSPFx ? styles.showCell : styles.hideMe;
        let styleRailsOff = this.props.railsOff ? styles.showCell : styles.hideMe;
        let styleOnRailsOn = this.props.railsOff ? styles.hideMe : styles.showCell;

        if ( this.props.railsOff || this.props.showXML || this.props.showJSON || this.props.showSPFx ) { columnsToVisible = styles.hideMe ; }

        let itemRows = logItems.length === 0 ? null : logItems.map( W => { 

          let defButtonStyles = {
            root: {padding:'0px !important', height: 26, width: 26, backgroundColor: 'white'},//color: 'green' works here
            icon: { 
              fontSize: 14,
              fontWeight: "900",
              margin: '10px 5px',  //This puts the margin around the buttons
              //color: '#00457e', //This will set icon color : 00457e
           },
          };

          let columnsStyles = JSON.parse(JSON.stringify(defButtonStyles));
          columnsStyles.root.color = 'red !important';

          let viewsStyles = JSON.parse(JSON.stringify(defButtonStyles));
          viewsStyles.root.color = 'blue !important';

          let typesStyles = JSON.parse(JSON.stringify(defButtonStyles));
          typesStyles.root.color = 'green !important';

          //import { buildPropsHoverCard } from '../../../../../services/hoverCardService';
          let detailsCard = buildPropsHoverCard(W, ["Title","timeCreated","LastItemUserModifiedDate","IsHomepageModernized","MegaMenuEnabled","QuickLaunchEnabled",
            "EnableMinimalDownload","Language","odata.type","type","ClassicWelcomePage"], ["meta","searchString"] , true, null );

            let webCreated = this.props.showDates ?
                W.timeCreated.dayYYYYMMDD + ' ( ' + W.timeCreated.daysAgo + ' days )' : 
                W.bestCreate;

              let webModified = this.props.showDates ?
                W.timeModified.dayYYYYMMDD + ' ( ' + W.timeModified.daysAgo + ' days )' : 
                W.bestMod;

            //columnsToVisible
            return <tr>
                <td className={ '' }> { 'Add Site Icon' }</td> 
                <td className={ styles.nowWrapping }> { W.Title }</td>

                <td> { webCreated } </td>
                <td> { webModified } </td>

                <td> { W.WebTemplate } </td>
                <td> { W.ServerRelativeUrl } </td>
                <td className={ styleDesc }> { W.Description.length > this.state.maxChars ? W.Description.slice(0,this.state.maxChars) + '...' : W.Description } </td>

                <td className={ columnsToVisible }> { W.ServerRelativeUrl } </td>

                <td className={ styleSPFx }> { this.props.showSPFx ? /*this.getWebSPFx(F)*/ '' : null } </td>

                <td className={ styleSpecial }> { /*this.getWebSpecialValue( F ) */ '' } </td>
                <td className= { styleRailsOff }>Rails Off Content</td>

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
                <th>Icon</th>
                <th>Title</th>

                <th>Created</th>
                <th>Last Update</th>
                <th>Template</th>

                <th className={ styleDesc }>Description</th>

                { /* <th className={ columnsToVisible }>Group</th> */ }
                { /* <th className={ columnsToVisible }>Default</th> */ }

                <th className={ '' }> { 'URL' } </th>

                <th className={ styleSpecial }> TBD Special </th>

                <th className= { styleRailsOff }>Rails Off Heading</th>
                <th>Details</th>

            </tr>
            { itemRows }
        </table>;

        let webTitle = this.props.items.bucketLabel == '' ? null :
            <div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ this.props.items.bucketLabel } - ( { this.props.items.count } )</span></div>;

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
