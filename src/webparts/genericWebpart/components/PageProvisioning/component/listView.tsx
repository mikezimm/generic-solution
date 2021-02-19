
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';
import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { buildPropsHoverCard } from '../../../../../services/hoverCardService';

import styles from './listView.module.scss';

import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogListProps {
    title: string;
    titles: [];
    items: IMyProgress[];
    descending: boolean;
    maxChars?: number;
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
          maxChars: this.props.maxChars ? this.props.maxChars : 20,
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

        let logItems : IMyProgress[] = this.props.items;

        let itemRows = logItems.length === 0 ? null : logItems.map( h => { 

            //let itemIcon = h.icon ? <Icon iconName={h.icon} className={iconClassAction} /> : null;
            let itemIcon = null;

            let actionCell = <div><span className={ styles.nowWrapping }>
              { itemIcon }
              { h.logLabel.length > this.state.maxChars ? h.logLabel.slice(0,this.state.maxChars) + '...' : h.logLabel }</span>
            </div>;

            let iconStyles: any = { root: {
              color: h.color ? h.color : "blue",
            }};

            let ref: any = h.ref;

            if  ( ref != null && ref.indexOf('\n') > 0 ) {
              //Remove left padding:  https://stackoverflow.com/a/13939142
              ref = <ul style={{paddingLeft:15}}>{
                ref.replace('-- FULL ERROR', '\n-- FULL ERROR').split('\n').map( x => { return <li style={{paddingLeft:0}}>{x}</li>; } )
                }</ul>;
            }

            h.refElement = ref;

            let normalIcon = <Icon iconName={ h.icon ? h.icon : "Info"} className={iconClassInfo} styles = {iconStyles}/>;

            //import { buildPropsHoverCard } from '../../../../../services/hoverCardService';
            let detailsCard = buildPropsHoverCard(h, ["refElement","time","logLabel","label","description"], [] , false, normalIcon );
            
            return <tr>
              <td className={ styles.nowWrapping }> {  actionCell  }</td>
              <td>{detailsCard}</td>
            </tr>; 
        });

//        let logTable = itemRows === null ? <div>Nothing to show</div> : <table style={{ display: 'block'}} className={stylesInfo.infoTable}>
        let logTable = <table style={{ display: 'block'}} className={stylesInfo.infoTable}>
            <tr><th>{ this.props.title }</th><th>Info</th></tr>
            { itemRows }
        </table>;

        thisLog = <div className={ stylesInfo.infoPane }><h2>{this.props.title + 's'}</h2>
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
