
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '../../IReUsableInterfaces';
import { IContentsListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes';

import { IContentsSiteInfo, ISitePropsBucketInfo } from  './thisSiteComponent';

import { createIconButton } from '../../createButtons/IconButton';

import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '../../HelpInfo/AllLinks';

import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogPropsProps {
    //title: string;
    titles: [];
    searchMeta: string;
    webURL: string;

    items: ISitePropsBucketInfo;
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;

    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    specialAlt: boolean;

}

export interface IMyLogPropsState {
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


export default class MyLogProps extends React.Component<IMyLogPropsProps, IMyLogPropsState> {


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

    constructor(props: IMyLogPropsProps) {
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

    public componentDidUpdate(prevProps: IMyLogPropsProps): void {
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


    public render(): React.ReactElement<IMyLogPropsProps> {

      let thisLog = null;

      if ( this.props.items.items != null && this.props.items.count > 0 ) { 

        let logItems : IContentsSiteInfo[] = this.props.items.items;

        let styleRails = this.props.railsOff ? styles.showMe : styles.hideMe;
        let styleSpecial = this.props.railsOff || ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.hideMe : styles.showCell;
        let styleRailsOff = this.props.railsOff ? styles.showCell : styles.hideMe;
        let styleOnRailsOn = this.props.railsOff ? styles.hideMe : styles.showCell;

        let itemRows = logItems.length === 0 ? null : logItems.map( thisItem => { 

          let defButtonStyles = {
            root: {padding:'0px !important', height: 26, width: 26, backgroundColor: 'white'},//color: 'green' works here
            icon: { 
              fontSize: 14,
              fontWeight: "900",
              margin: '10px 5px',  //This puts the margin around the buttons
              //color: '#00457e', //This will set icon color : 00457e
           },
          };

          let gotoColumns = null; //createIconButton('Pause', 'Columns', this.props.pickThisWeb, 'Columns' + webInfo , columnsStyles );

          let iconStyles: any = { root: {
            //color: h.color ? h.color : "blue",
          }};

          let normalIcon = <Icon iconName={ "Info"} className={ iconClassInfo } styles = { iconStyles }/>;
          let keys = thisItem.meta ? <div><h3>Properties</h3><ul> { thisItem.meta.map(k => <li>{ k }</li>) } </ul></div> : null;

          const onRenderHoverCard = (item: any): JSX.Element => {
            let hoverWebStyle = { fontWeight: 700};
            return <div className={styles.hoverCard} style={{padding: 30, maxWidth: 800 }}>
              <div>
                { /* Basic information */ }
                <p><span style={hoverWebStyle}>Property:</span> { thisItem.property }</p>
                <p><span style={hoverWebStyle}>Value:</span> { JSON.stringify(thisItem.value) }</p>
                <p><span style={hoverWebStyle}>Meta:</span> { thisItem.meta.join('; ') }</p>
                <p><br></br></p>
                <p><span style={hoverWebStyle}>Search String:</span> { thisItem.searchString }</p>
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

            //columnsToVisible
            console.log('building row:', thisItem );
            //let valueCell = thisItem.element;

            /**
             * Check if type is object if you get this react error:
             * 
             *   Objects are not valid as a React child (found: object with keys {StringValue}).
             *   If you meant to render a collection of children, use an array instead.
             */
            let valueCell = null;

            if ( thisItem.element != null ) {
              valueCell = thisItem.element;

            } else if ( typeof thisItem.value === 'object' ) { 
                valueCell = JSON.stringify(thisItem.value);

            } else { valueCell = thisItem.value; }

            let shortProperty = thisItem.property != null && thisItem.property.length > 30 ? thisItem.property.slice(0, 30) + '...' : thisItem.property;

            return <tr>
                <td className={ styles.nowWrapping }> {  thisItem.meta[0]  }</td> 
                <td className={ styles.nowWrapping }> {  shortProperty  }</td> 
                <td> {  valueCell }</td>

                { /*<td className={ styleSpecial }> this.getWebSpecialValue( F )  </td> */ }
                { /*<td className= { styleRailsOff }>Rails Off Content</td> */ }

                <td style={{ backgroundColor: 'white' }} className={ styles.listButtons }>  {  detailsCard  }</td>

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

        let propTable = <table style={{ display: '', borderCollapse: 'collapse', width: '100%' }} className={stylesInfo.infoTable}>
            <tr>
                <th>Category</th>           
                <th>Property</th>
                <th>Value</th>


                { /* <th className={ columnsToVisible }>Group</th> */ }
                { /* <th className={ columnsToVisible }>Default</th> */ }

                <th className= { styleRailsOff }>Rails Off Heading</th>
                <th>Details</th>

            </tr>
            {  itemRows  }
        </table>;

        let propTitle = this.props.items.bucketLabel == '' ? null :
            <div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ this.props.items.bucketLabel } - ( { this.props.items.count } )</span></div>;

        //Set to null to remove blue bar above buckets (for when there is only one bucket)
        //propTitle = null;

        return (
          <div className={ styles.logListView }>
              <div style={{ paddingTop: 10}} className={ stylesInfo.infoPaneTight }>
                { propTitle }
                {  propTable  }
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
