
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '../../IReUsableInterfaces';
import { IContentsListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes';

import { IContentsFieldInfo, } from './fieldsComponent';

import { createIconButton } from '../../createButtons/IconButton';

import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '../../HelpInfo/AllLinks';


import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogFieldProps {
    title: string;
    titles: [];
    webURL: string;
    items: IContentsFieldInfo[];
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;
    showDesc?: boolean;

}

export interface IMyLogFieldState {
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


export default class MyLogField extends React.Component<IMyLogFieldProps, IMyLogFieldState> {


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

    constructor(props: IMyLogFieldProps) {
        super(props);
        this.state = {
          maxChars: this.props.maxChars ? this.props.maxChars : 50,
        };
    }
        
    public componentDidMount() {
        //this._getFieldItems();
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

    public componentDidUpdate(prevProps: IMyLogFieldProps): void {
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


    public render(): React.ReactElement<IMyLogFieldProps> {

      let thisLog = null;

      if ( this.props.items != null) { 

        let logItems : IContentsFieldInfo[] = this.props.items;

        let styleAdvanced = this.props.showSettings ? styles.showMe : styles.hideMe;
        let styleRails = this.props.railsOff ? styles.showMe : styles.hideMe;
        let styleDesc = this.props.showDesc ? styles.showMe : styles.hideMe;

        let itemRows = logItems.length === 0 ? null : logItems.map( F => { 

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
          
          let fieldInfo = '|Splitme|' + F.Id + '|Splitme|' + F.StaticName  + '|Splitme|' + F.Title;

          let gotoColumns = null; //createIconButton('Pause', 'Columns', this.props.pickThisField, 'Columns' + fieldInfo , columnsStyles );


          let itemIcon = null;

          let iconStyles: any = { root: {
            //color: h.color ? h.color : "blue",
          }};

          let normalIcon = <Icon iconName={ "Info"} className={ iconClassInfo } styles = { iconStyles }/>;
          let keys = F.meta ? <div><h3>Properties</h3><ul> { F.meta.map(k => <li>{ k }</li>) } </ul></div> : null;

          const onRenderHoverCard = (item: any): JSX.Element => {
            let hoverFieldStyle = { fontWeight: 700};
            return <div className={styles.hoverCard} style={{padding: 30, maxWidth: 800 }}>
              <div>
                <p><span style={hoverFieldStyle}>Title:</span> { F.Title }</p>
                <p><span style={hoverFieldStyle}>Type:</span> { 'Type' }</p>
                <p><span style={hoverFieldStyle}>Description:</span> { F.Description }</p>
                <p><span style={hoverFieldStyle}>EntityName:</span> { F.StaticName }</p>
                <p><span style={hoverFieldStyle}>Id:</span> { F.Id }</p>
                <p><br></br></p>
                <p><span style={hoverFieldStyle}>Search String:</span> { F.searchString }</p>
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

//.logFieldView {
//.fieldButtons {
//.buttons{


          let fieldSettingsURL = !this.props.showSettings ? F.StaticName : createLink(this.props.webURL + "/_layouts/15/listedit.aspx?Field=(" + F.Id + ")", '_blank', F.StaticName);

          let other = <div style={{ display: 'inline-flex', backgroundColor: 'white', padding: 0 }}> { gotoColumns }  </div>;

          return <tr>
            <td className={ styles.nowWrapping }> { F.Title } </td>
            <td className={ styles.nowWrapping }> { fieldSettingsURL }</td>
            <td className={ styleDesc }> { F.Description.length > this.state.maxChars ? F.Description.slice(0,this.state.maxChars) + '...' : F.Description } </td>
            <td> { 'Count' } </td>

            <td className={ styles.nowWrapping }> { 'cre' } </td>
            <td> { 'last' } </td>
            <td> {  } </td>
            <td> {  } </td>
            <td> { 'crawl' } </td>
            <td> {  } </td>
            <td> {  } </td>
            <td> { 'baseT' } </td>
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

        let fieldTable = <table style={{ display: 'block'}} className={stylesInfo.infoTable}>
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

        let fieldTitle = this.props.title == '' ? null : <h2>{this.props.title + 's'}</h2>;

        return (
          <div className={ styles.logListView }>
              <div style={{ paddingTop: 15}} className={ stylesInfo.infoPaneTight }>
                { fieldTitle }
                { fieldTable }
            </div>;
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
