
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
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
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
 import { getChoiceKey, getChoiceText } from '@mikezimm/npmfunctions/dist/Services/Strings/choiceKeys';

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

    refreshId: string;

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
        this.fetchHistory( 'list' );
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
      // console.log('ProvisionHistoryPane fetchHistory', this.props.fetchHistory );
      if ( this.props.fetchHistory === true ) {
        if ( this.props.refreshId !== prevProps.refreshId ) {
          this.fetchHistory( 'list' );
        }

      } else if ( this.props.refreshId !== prevProps.refreshId ) {
        this.setState({
          history: this.props.history,
          progress: this.props.progress,
          mapThisList: this.props.mapThisList,
          progressAll: [],
          historyAll: [],
          mapThisListAll: [],

        });
      }
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

        if ( this.state.progress !== null || this.state.history !== null || this.state.mapThisList !== null ) {
            let listDropdown = this.props.fetchHistory !== true || this.state.dropDownLabels.length === 0 ? null :
                this._createDropdownField( 'History' , this.state.dropDownLabels , this._updateListDropdownChange.bind(this) , null );

            let myProgress = this.state.progress == null ? <div style={{paddingTop: '15px', height: '60px', display: 'inline-flex'}} >No Progress was found</div> : <ProgressIndicator
            label={this.state.progress.label}
            description={this.state.progress.description}
            percentComplete={this.state.progress.percentComplete}
            progressHidden={this.state.progress.progressHidden}/>;

            let historyStack : any = 'No history was found';
            if ( this.state.history !== null && this.state.history !== undefined ) {
                    
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
              historyStack = <div style={{ }}>
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
            }

            return (
              <div> 
                { listDropdown }
                { historyStack }
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


  private async fetchHistory( listOrWeb: 'list' | 'web' ) {

    let items: any[] = await fetchAnalytics( this.props.analyticsWeb, this.props.analyticsListRails , this.props.pickedWeb.guid );
    // let items: IRailAnalytics[] = await fetchAnalytics( this.props.analyticsWeb, this.props.analyticsListRails , this.props.pickedWeb.guid );

    let history = null;
    let progress = null;
    let mapThisList = null;

    let progressAll = [];
    let historyAll = [];
    let mapThisListAll = [];

    let dropDownLabels: any[] = ['Have to update this text!'];
    let dropDownIndex = 0;

    if ( items.length > 0 ) {
      // mapThisList, this.props.railFunction, this.state.progress, this.state.history ); //richText, Setting, richText2, richText3

      dropDownLabels = [];

      items.map( item => {

        let loadThisItem = item.Result === 'Complete' && ( listOrWeb === 'web' || item.TargetList.Url === this.props.theList.listURL) ? true : false ;
        if ( loadThisItem === true ) {
          let mapThisListX = null;
          let itemProgress = null;
          let itemHistory = null;
  
          let richText1 = item.zzzRichText1 ? JSON.parse( item.zzzRichText1 ) : null;
          let richText2 = item.zzzRichText2 ? JSON.parse( item.zzzRichText2 ) : null;
          let richText3 = item.zzzRichText3 ? JSON.parse( item.zzzRichText3 ) : null;
  
          /**
           * Doing this map just because I changed what objects I stored in the rich text fields and want to still be able to read it
           */
          [ richText1, richText2, richText3 ].map( richText => {
            if ( richText !== null && richText !== undefined && typeof richText === 'object' ) {
              if ( richText.definedList ) { mapThisListX = richText ; }
              else if ( richText.count ) { itemHistory = richText ; }
              else if ( richText.percentComplete ) { itemProgress = richText ; }
            }
          });
  
          mapThisListAll.push( mapThisListX );
          progressAll.push( itemProgress );
          historyAll.push( itemHistory );
  
          let created = item.Created;
          let realTime = new Date(created);
          let local = realTime.toLocaleString();
          let listDef = 'Not sure of list definition';
          if ( mapThisListX !== null ) {
            let definedList = mapThisListX.definedList ? mapThisListX.definedList : 'Unknown definedList';
            let listDefinition = mapThisListX.listDefinition ? mapThisListX.listDefinition : 'Unknown listDefinition';
            listDef = definedList + ' - ' + listDefinition;
          }

          let thisLabel = `${item.Created}  |  ${local}  |  ID: ${ item.Id }  |  By: ${ item.Author.Title }  |  ` ;
          if ( listOrWeb === 'list' ) { thisLabel += listDef ;  } else { thisLabel += ` Applied: ${ item.ListTitle }  |  ${listDef}` ; }
          // let thisLabel = <div> { item.Created } <span style={{fontSize: 'smaller'}}> { local } </span> { listDef } </div>;
          dropDownLabels.push( thisLabel );

        }

      });

      mapThisList = mapThisListAll[0];
      progress = progressAll[0];
      history = historyAll[0];

    }

    let dropDownText = dropDownLabels[0];

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


// let listDropdown = this.state.mainPivot !== 'FullList' ? null : 
// this._createDropdownField( 'Pick your list type' , availLists , this._updateListDropdownChange.bind(this) , null );

private _updateListDropdownChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {


  let thisValue : any = getChoiceText(item.text);

  let idx = this.state.dropDownLabels.indexOf( thisValue );
  console.log(`_updateListDropdownChange: ${ idx } ${thisValue} ${item.selected ? 'selected' : 'unselected'}`);

  if ( idx > -1 ) {
    // let mapThisList = this.state.mapThisListAll[ idx ];
    // let history = this.state.historyAll[ idx ];
    // let progress = this.state.progressAll[ idx ];

    this.setState({
      mapThisList : this.state.mapThisListAll[ idx ],
      history : this.state.historyAll[ idx ],
      progress : this.state.progressAll[ idx ],
      dropDownIndex: idx,
      dropDownText: thisValue,
    });

  }
}

  private _createDropdownField( label: string, choices: string[], _onChange: any, getStyles : IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>) {
      const dropdownStyles: Partial<IDropdownStyles> = {
          dropdown: { width: '800px' ,marginRight: '40px' }
      };

      let sOptions: IDropdownOption[] = choices == null ? null : 
          choices.map(val => {

            if ( val === this.state.dropDownText ) { 
              console.log(`_createDropdownField val MATCH: ${ val } `);
            } else {
              console.log(`_createDropdownField val: ${ val } `);
            }
              return {
                  key: getChoiceKey(val),
                  text: val,
                  selected: val === this.state.dropDownText ? true : false,
              };
          });

      let keyVal = this.state.dropDownText;
      console.log(`_createDropdownField keyVal: ${ keyVal } `);

      let thisDropdown = sOptions == null ? null : <div
          style={{  display: 'inline-flex', flexDirection: 'row', alignItems: 'center'   }}
              ><Dropdown 
                  label={ label }
                  //selectedKey={ getChoiceKey(keyVal) }
                  // selectedKey={ keyVal }
                  onChange={ _onChange }
                  options={ sOptions } 
                  styles={ dropdownStyles }
              />
              <div style={{paddingTop: '25px' }}> Selected: { this.state.dropDownIndex + 1 } of { choices.length } </div>
          </div>;

      return thisDropdown;

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
