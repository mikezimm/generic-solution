
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '../IReUsableInterfaces';
import { IDrillItemInfo } from './drillComponent';
import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';


import styles from '../Contents/listView.module.scss';
import stylesInfo from '../HelpInfo/InfoPane.module.scss';

export interface IMyDrillItemsProps {
    title?: string;
    descending?: boolean;
    maxChars?: number;
    items: IDrillItemInfo[];

    blueBar?: string;

    showIDs?: boolean;
    showDesc?: boolean;

}

export interface IMyDrillItemsState {
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


export default class MyDrillItems extends React.Component<IMyDrillItemsProps, IMyDrillItemsState> {


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

    constructor(props: IMyDrillItemsProps) {
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

    public componentDidUpdate(prevProps: IMyDrillItemsProps): void {
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


    public render(): React.ReactElement<IMyDrillItemsProps> {

        let thisLog = null;

        if ( this.props.items != null && this.props.items.length > 0 ) { 

        let logItems : IDrillItemInfo[] = this.props.items;
        let styleDesc = this.props.showDesc ? styles.showCell : styles.hideMe;
        let styleIDs = this.props.showIDs ? styles.showCell : styles.hideMe;

        let itemRows = logItems.length === 0 ? null : logItems.map( h => { 

            let itemIcon = null;

            let iconStyles: any = { root: {
                //color: h.color ? h.color : "blue",
            }};

            let normalIcon = <Icon iconName={ "Info"} className={iconClassInfo} styles = {iconStyles}/>;

            const onRenderHoverCard = (item: any): JSX.Element => {
                let hoverWebStyle = { fontWeight: 700, paddingRight: 15 };
                return <div className={styles.hoverCard} style={{padding: 30, maxWidth: 800 }}>
                <div>
                    <p><span style={hoverWebStyle}>aaa</span> {  }</p>
                    <p><span style={hoverWebStyle}>bbb</span> </p>
                    <p><span style={hoverWebStyle}>ccc:</span> { '' }</p>
                    <p><span style={hoverWebStyle}>ddd:</span> { '' }</p>
                    <p><span style={hoverWebStyle}>Id:</span> { '' }</p>

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
                <td> { h.Title } </td>
            </tr>;
        });

        //        let logTable = itemRows === null ? <div>Nothing to show</div> : <table style={{ display: 'block'}} className={stylesInfo.infoTable}>

        let logTable = <table style={{ display: '', borderCollapse: 'collapse', width: '100%' }} className={stylesInfo.infoTable}>
            <tr>
                <th>Title</th>

            </tr>
            { itemRows }
        </table>;

        let barText = this.props.blueBar && this.props.blueBar != null ? this.props.blueBar : 'Items';
        if (barText != '') { barText = barText + 'Items' ; }

        let webTitle = null;

        if ( barText != null ) {
            webTitle =<div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ barText } - ( { this.props.items.length } )</span></div>;


        return (
            <div className={ styles.logListView }>
                <div style={{ paddingTop: 10}} className={ stylesInfo.infoPaneTight }>
                { webTitle }
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

        } //if ( this.props.items != null && this.props.items.length > 0 ) {    
    } // Render
}
