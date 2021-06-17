
/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */

import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import { Panel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { Spinner, SpinnerSize, } from 'office-ui-fabric-react/lib/Spinner';
import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SearchBox, } from 'office-ui-fabric-react/lib/SearchBox';
import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton, CompoundButton, elementContains } from 'office-ui-fabric-react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

 import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
 import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
 import { IMyHistory, clearHistory } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
 import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
 import { makeid } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';
 import { IArraySummary, IRailAnalytics, groupArrayItemsByField, } from '@mikezimm/npmfunctions/dist/Services/Arrays/grouping';
 
/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      .d8888. d88888b d8888b. db    db d888888b  .o88b. d88888b .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88'  YP 88'     88  `8D 88    88   `88'   d8P  Y8 88'     88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         `8bo.   88ooooo 88oobY' Y8    8P    88    8P      88ooooo `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88           `Y8b. 88~~~~~ 88`8b   `8b  d8'    88    8b      88~~~~~   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         db   8D 88.     88 `88.  `8bd8'    .88.   Y8b  d8 88.     db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         `8888Y' Y88888P 88   YD    YP    Y888888P  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */

import MyLogList from '../../webparts/genericWebpart/components/ListProvisioning/component/listView';
import { IMakeThisList } from '../../webparts/genericWebpart/components/ListProvisioning/component/provisionWebPartList';

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      db   db d88888b db      d8888b. d88888b d8888b. .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88   88 88'     88      88  `8D 88'     88  `8D 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88ooo88 88ooooo 88      88oodD' 88ooooo 88oobY' `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88~~~88 88~~~~~ 88      88~~~   88~~~~~ 88`8b     `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88   88 88.     88booo. 88      88.     88 `88. db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P 88      Y88888P 88   YD `8888Y' 
 *                                                                                                                       
 *                                                                                                                       
 */

//  import { getSiteInfoIncludingUnique } from './functions';

//   import { buildPropsHoverCard } from '../../../../../../services/hoverCardService';

//   import { createIconButton } from '../../../createButtons/IconButton';
  
  
 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
 *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
 *                                                                                                                                               
 *                                                                                                                                               
 */
import { fetchAnalytics, } from '../createAnalytics';

import { IProcessStep, StatusIcons, StatusColors } from './railsSetup';


/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */


export interface IProvisionHistoryProps {

    theList: IContentsListInfo;
    pickedWeb : IPickedWebBasic;

    analyticsWeb: string;
    analyticsListRails: string;

    progress: IMyProgress;
    history: IMyHistory;
    mapThisList: IMakeThisList;

    fetchHistory: boolean;

  }

export interface IProvisionHistoryState {
  progress: IMyProgress;
  history: IMyHistory;
  
  progressAll: IMyProgress[];
  historyAll: IMyHistory[];

  mapThisList: IMakeThisList;
  mapThisListAll: IMakeThisList[];

  dropDownLabels: any[];
  dropDownIndex: number;
  dropDownText: string;

}

const toggleStyles = { root: { width: 160, } };
const panelWidth = '90%';
const groupBottomPadding = '25px';
const toggleBottomPadding = '5px';

export default class ProvisionHistory extends React.Component<IProvisionHistoryProps, IProvisionHistoryState> {


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

    constructor(props: IProvisionHistoryProps) {
        super(props);
        let listTitle = this.props.theList.Title;

        this.state = {
          history: this.props.history,
          progress: this.props.progress,
          mapThisList: this.props.mapThisList,
          progressAll: [],
          historyAll: [],
          mapThisListAll: [],

          dropDownLabels: [],
          dropDownIndex: 0,
          dropDownText: 'Oops!  No history was found'

        };
    }
    
    public componentDidMount() {
      if ( this.props.fetchHistory === true ) {
        this.fetchHistory();
      }
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

    public componentDidUpdate(prevProps: IProvisionHistoryProps): void {
        // this.setState({ refreshId: makeid(5) })
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


    public render(): React.ReactElement<IProvisionHistoryProps> {

        if ( this.props.progress !== null ) {
          
            let myProgress = this.state.progress == null ? null : <ProgressIndicator
            label={this.state.progress.label}
            description={this.state.progress.description}
            percentComplete={this.state.progress.percentComplete}
            progressHidden={this.state.progress.progressHidden}/>;

            let errorList = <MyLogList
                title={ 'Error'}           items={ this.state.history.errors }
                descending={false}          titles={null}            ></MyLogList>;

            let fieldList = <MyLogList
                title={ 'Column'}           items={ this.state.history.fields }
                descending={false}          titles={null}            ></MyLogList>;

            let viewList = <MyLogList
                title={ 'View'}           items={ this.state.history.views }
                descending={false}          titles={null}            ></MyLogList>;

            let itemList = <MyLogList
                title={ 'Item'}           items={ this.state.history.items }
                descending={false}          titles={null}            ></MyLogList>;
                
            const stackListTokens: IStackTokens = { childrenGap: 10 };
            let historyStack = <div style={{ }}>
                <div> { myProgress } </div>
                <div> {  } </div>
                <div>
                <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={stackListTokens}>{/* Stack for Buttons and Fields */}
                    { errorList }
                    { fieldList }
                    { viewList }
                    { itemList }
                </Stack>
                </div>
            </div>;

            return (
              <div> { historyStack }
                </div>

            );

        } else { //No list was detected

            // <div className={ styles.container }></div>
            return ( <div className={ '' }>
                  Error Message Here
                </div> );
        } 

    } 

    
    private buildHistoryStep( step: IRailAnalytics ) {
      // if ( step.required !== true ) { return null; }
      // let info = step.current.error !== '' ? step.current.error : step.current.info; 
      let results = step.Result.split(' ');
      let colors = results.map( key => {
        return StatusColors[ key ];
      });

      let Icons = results.map( ( key, index ) => {
        return <Icon iconName= { StatusIcons[ key ]} style={{ color: colors [ index ], padding: '0px 4px' }}></Icon>;
      });
          
      let itemPadding = step.zzzText4 ? '7px 0px 3px 0px' : '0px';

      return <tr  title={ step.Result + ' ' + step.Title }>
          <td>{ step.zzzText7 } </td>
          <td style={{ textAlign: 'center' }} ><div style={{ fontSize: 'larger', margin: itemPadding, whiteSpace: 'nowrap', padding: '0px 10px' }}> { Icons } </div></td>
          <td>{ step.Title } 
              <span style={{fontWeight: 700 }}>{ ( step.zzzText3 ? ' - ' + step.zzzText3 : '' ) } </span>
              {  step.zzzText4 ? <div style={{color: 'red', fontSize: 'x-small', paddingBottom: '7px' }}>{ ( step.zzzText4 ? ' ' + step.zzzText4 : '' ) } </div> : null  }
          </td>
      </tr>;
  }


  private async fetchHistory() {

    let items: IRailAnalytics[] = await fetchAnalytics( this.props.analyticsWeb, this.props.analyticsListRails , this.props.pickedWeb.guid );

    let history = null;
    let progress = null;
    let mapThisList = null;

    let progressAll = [];
    let historyAll = [];
    let mapThisListAll = [];

    let dropDownLabels = ['Have to update this text!'];
    let dropDownIndex = 0;
    let dropDownText = dropDownLabels[0];

    if ( items.length > 0 ) {
      // mapThisList, this.props.railFunction, this.state.progress, this.state.history ); //richText, Setting, richText2, richText3

      dropDownLabels = [];
      mapThisList = items[0].zzzRichText1 ? JSON.parse( items[0].zzzRichText1 ) : this.state.mapThisList;
      progress = items[0].zzzRichText2 ? JSON.parse( items[0].zzzRichText2 ) : this.state.progress;
      history = items[0].zzzRichText3 ? JSON.parse( items[0].zzzRichText3 ) : this.state.history;

      items.map( item => {
        mapThisListAll.push( item.zzzRichText1 );
        progressAll.push( item.zzzRichText2 );
        historyAll.push( item.zzzRichText3 );

      });

    }

    this.setState({ 
      mapThisList: mapThisList,
      history: history,
      progress: progress,

      progressAll: progressAll,
      historyAll: historyAll,
      mapThisListAll: mapThisListAll,

      dropDownLabels: dropDownLabels,
      dropDownIndex: dropDownIndex,
      dropDownText: dropDownText,

     });

  }

    private updateStateStatus( ) {
        
    }

    /***
     *         d888888b  .d88b.   d888b   d888b  db      d88888b .d8888. 
     *         `~~88~~' .8P  Y8. 88' Y8b 88' Y8b 88      88'     88'  YP 
     *            88    88    88 88      88      88      88ooooo `8bo.   
     *            88    88    88 88  ooo 88  ooo 88      88~~~~~   `Y8b. 
     *            88    `8b  d8' 88. ~8~ 88. ~8~ 88booo. 88.     db   8D 
     *            YP     `Y88P'   Y888P   Y888P  Y88888P Y88888P `8888Y' 
     *                                                                   
     *                                                                   
     */
    //            let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles()) } </div>;

    private makeToggle( label: string, checked: boolean, disabled: boolean, _onChange: any ) {
        return <div style={{ width: panelWidth, paddingBottom: toggleBottomPadding }}>
            <h3>{ label } </h3>
            <Toggle 
            onText={ 'Include' } 
            offText={ 'Skip' } 
            onChange={ _onChange } 
            checked={ checked }
            disabled= { disabled }
            styles={ toggleStyles }
            />
        </div>;

    }
    
    private updateTogggleReaders() {  

    }

}
