
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { buildPropsHoverCard } from '../../../../../services/hoverCardService';

import { IContentsFeatureInfo, IFeatureBucketInfo} from './featuresComponent';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '@mikezimm/npmfunctions/dist/HelpInfo/Links/CreateLinks';

import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogFeatureProps {
    //title: string;
    titles: [];
    searchMeta: string;
    webURL: string;
    blueBar?: string;

    items: IFeatureBucketInfo;
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;

    showUsers: boolean;

    showDesc?: boolean;
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    specialAlt: boolean;

}

export interface IMyLogFeatureState {
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


export default class MyLogFeature extends React.Component<IMyLogFeatureProps, IMyLogFeatureState> {


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

    constructor(props: IMyLogFeatureProps) {
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

    public componentDidUpdate(prevProps: IMyLogFeatureProps): void {
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


    public render(): React.ReactElement<IMyLogFeatureProps> {

      let thisLog = null;

      if ( this.props.items.features != null && this.props.items.count > 0 ) { 

        let logItems : IContentsFeatureInfo[] = this.props.items.features;

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

        let itemRows = logItems.length === 0 ? null : logItems.map( Fetr => { 

          let defButtonStyles = {
            root: {padding:'0px !important', height: 26, width: 26, backgroundColor: 'white'},//color: 'green' works here
            icon: { 
              fontSize: 14,
              fontWeight: "900",
              margin: '10px 5px',  //This puts the margin around the buttons
              //color: '#00457e', //This will set icon color : 00457e
           },
          };

          //import { buildPropsHoverCard } from '../../../../../services/hoverCardService';
          let detailsCard = buildPropsHoverCard(Fetr, ["name","DefinitionId","type","typeString","odata.type"], ["meta","searchString"] , true, null );

            //columnsToVisible
            return <tr>
                <td className={ '' }> { '' }</td> 
                <td className={ styleTitle }> { Fetr.name }</td>
                <td className={ styleTitle }> { Fetr.DefinitionId }</td>

                <td className= { styleAdvanced }> { }</td>

                <td className={ styleDesc }> {  } </td>

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
                <th></th>
                <th className={ styleTitle }>Name</th>
                <th className={ styleTitle }>DefinitonId</th>

                <th className={ styleDesc }>Description</th>

                { /* <th className={ columnsToVisible }>Group</th> */ }
                { /* <th className={ columnsToVisible }>Default</th> */ }
                <th className={ styleSpecial }></th>

                <th className= { styleRailsOff }>Rails Off Heading</th>

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
