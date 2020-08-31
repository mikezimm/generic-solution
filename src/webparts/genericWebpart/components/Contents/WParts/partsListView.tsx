
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '../../IReUsableInterfaces';
import { IWPart } from './partsFunction';
import { IPartsBucketInfo } from './partsComponent';
import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';


import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogListProps {
    title: string;
    titles: [];
    items: IPartsBucketInfo;
    descending: boolean;
    maxChars?: number;

    blueBar?: string;

    showIDs: boolean;
    showDesc: boolean;
    showProps: boolean;

}

export interface IMyLogListState {
  maxChars?: number;
}

const stackFormRowTokens: IStackTokens = { childrenGap: 10 };

const iconClassAction = mergeStyles({
  fontSize: 18,
  fontWeight: "bolder",
  color: "black",
  //margin: '0px 2px',
  paddingRight: '10px',
  verticalAlign: 'bottom',
});

const iconClassInfo = mergeStyles({
  fontSize: 18,
  //margin: '0px 2px',
  paddingRight: '10px',
  verticalAlign: 'bottom',
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

      if ( this.props.items != null) {

        
        let logItems : IWPart[] = this.props.items.parts;
        let styleDesc = this.props.showDesc ? styles.showCell : styles.hideMe;
        let styleIDs = this.props.showIDs ? styles.showCell : styles.hideMe;
        let styleProps = this.props.showProps ? styles.showCell : styles.hideMe;

        let itemRows = logItems.length === 0 ? null : logItems.map( h => { 

            //let itemIcon = h.icon ? <Icon iconName={h.icon} className={iconClassAction} /> : null;
            let itemIcon = null;

            let group = !h.group ? null : <div><span className={ styles.nowWrapping }>
              { h.group.length > 15 ? h.group.slice(0,15) + '...' : h.group }</span>
          </div>;

            let actionCell = <div><span className={ styles.nowWrapping }>
                { itemIcon }
                { h.title.length > this.state.maxChars ? h.title.slice(0,this.state.maxChars) + '...' : h.title }</span>
            </div>;

            let description = !h.desc ? null : <div><span className={ styles.nowWrapping }>
                { h.desc.length > 50 ? h.desc.slice(0,50) + '...' : h.desc }</span>
            </div>;

            let iconStyles: any = { root: {
              //color: h.color ? h.color : "blue",
            }};

            let normalIcon = <Icon iconName={ h.officeFabricIconFontName ? h.officeFabricIconFontName : "Info"} className={iconClassInfo} styles = {iconStyles}/>;
            let partProps = <ul> { h.keys.map(k => <li>{ k }</li>) } </ul>;
            let keys = h.keys ? <div><h3>Pre-Configured Properties</h3> { partProps } </div> : null;

            let supported = h.supportedHosts ? <div><h3>Supported Hosts</h3><ul> { h.supportedHosts.map(k => <li>{ k }</li>) } </ul></div> : null;


            const onRenderHoverCard = (item: any): JSX.Element => {
              let hoverWebStyle = { fontWeight: 700, paddingRight: 15 };
              return <div className={styles.hoverCard} style={{padding: 30, maxWidth: 800 }}>
                <div>
                  <p><span style={hoverWebStyle}> </span> {  }</p>
                  <p><span style={hoverWebStyle}> </span> </p>
                  <p><span style={hoverWebStyle}>Type:</span> { h.componentType }</p>
                  <p><span style={hoverWebStyle}>Alias:</span> { h.alias } Parent: { h.parentAlias }</p>
                  <p><span style={hoverWebStyle}>Description:</span> { h.desc }</p>
                  <p><span style={hoverWebStyle}>Id:</span> { h.partId }</p>
                  <p><span style={hoverWebStyle}>Group:</span> { h.group }</p>
                  <p><span style={hoverWebStyle}>Tags:</span>{ h.tags.join() }</p>
                  <p><span style={hoverWebStyle}>Supported:</span>{ supported }</p>
                  <p><span style={hoverWebStyle}>Keys:</span>{ keys }</p>
                  <p><span style={hoverWebStyle}> </span></p>
                  <p><span style={hoverWebStyle}>Search String:</span> { h.searchString }</p>
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

            return <tr>
              <td> { group } </td>
              <td className={ styles.nowWrapping }> {  actionCell  }</td>
              <td>{detailsCard}</td>
              <td className={ styleDesc }> {  description  }</td>
              <td className={ styleIDs }> {  h.partId  }</td>
              <td className={ styleProps }> { partProps }</td>
            </tr>; 
        });

//        let logTable = itemRows === null ? <div>Nothing to show</div> : <table style={{ display: 'block'}} className={stylesInfo.infoTable}>

        let logTable = <table style={{ display: '', borderCollapse: 'collapse', width: '100%' }} className={stylesInfo.infoTable}>
            <tr>
              <th>Group</th>
              <th>{ this.props.title }</th>
              <th>Icon</th>
              <th className={ styleDesc }>Description</th>
              <th className={ styleIDs }>ID</th>
              <th className={ styleProps }>Keys</th>
            </tr>
            { itemRows }
        </table>;

        let barText = this.props.blueBar && this.props.blueBar != null ? this.props.blueBar : this.props.items.bucketLabel;
        if (barText != '') { barText = barText + 'Webparts' ; }

        let webTitle = null;
        
        if ( barText != null ) {
          webTitle =<div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ barText } - ( { this.props.items.count } )</span></div>;

        } else if ( this.props.items.bucketLabel !== '' ) {
          webTitle =<div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ this.props.items.bucketLabel } - ( { this.props.items.count } )</span></div>;
        }

        thisLog = <div style={{ paddingTop: 10}} className={ stylesInfo.infoPaneTight }>
          { webTitle }
          { logTable }
        </div>;

      }


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

        // <div className={ styles.container }></div>
        return (
          <div className={ styles.logListView }>
              { thisLog }
          </div>
          );

    }
}
