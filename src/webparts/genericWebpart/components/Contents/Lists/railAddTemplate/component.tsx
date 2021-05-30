
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


import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton, CompoundButton, elementContains } from 'office-ui-fabric-react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import ReactJson from "react-json-view";

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
  
  import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';
  import { availLists, IDefinedLists, definedLists, dropDownWidth } from '../../../ListProvisioning/component/provisionListComponent';
  import { getTheseDefinedLists } from '../../../ListProvisioning/component/provisionFunctions';
  import { IMakeThisList } from '../../../ListProvisioning/component/provisionWebPartList';
  import { fixTitleNameInViews  } from '../../../../../../services/listServices/viewServices'; //Import view arrays for Time list

  /**
     * Steps to add new list def:
     * 1. Create folder and columns, define and view files
     * 2. Make sure the list def is in the availLists array and definedLists array
     * 3. Add logic to getDefinedLists to fetch the list definition
     * Rinse and repeat
     */
    import * as dHarm from '../../../ListProvisioning/Harmonie/defineHarmonie';
    import * as dTMT from '../../../ListProvisioning/ListsTMT/defineThisList';
    import * as dCust from '../../../ListProvisioning/ListsCustReq/defineCustReq';
    import * as dPCP from '../../../ListProvisioning/PreConfig/definePreConfig';

    import * as dFinT from '../../../ListProvisioning/ListsFinTasks/defineFinTasks';
    import * as dReps from '../../../ListProvisioning/ListsReports/defineReports';
    //import * as dTurn from '../ListsTurnover/defineTurnover';
    //import * as dOurG from '../ListsOurGroups/defineOurGroups';
    //import * as dSoci from '../ListsSocialiiS/defineSocialiiS';
    import * as dPivT from '../../../ListProvisioning/PivotTiles/definePivotTiles';

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

 import { makeIMakeThisListFromExisting } from './functions';

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


export interface IMyAddListTemplateProps {
    theList: IContentsListInfo;
    user: IUser;
    wpContext: WebPartContext;
    railFunction: string;
    showPanel: boolean;
    _closePanel: any;

    type: PanelType;

    json1: any;
    json2?: any;

    _fetchCompare: any; //Function that will get json2 from inputs in this component

    pickedWeb : IPickedWebBasic;

    analyticsWeb: string;
    analyticsList: string;

    errorMess: string;

  }

export interface IMyAddListTemplateState {

    disableDo: boolean;
    finished: boolean;
    refreshId: string;
    errorMess: string;

    otherWeb: string;
    otherList: string;
    otherProp: string;

    // 2 - Source and destination list information
    makeThisList: IMakeThisList;

    lists: IMakeThisList[];

    definedList: IDefinedLists; 
    doList: boolean;

}

const pivotStyles = {
    root: {
      whiteSpace: "normal",
    //   textAlign: "center"
    }};

const toggleStyles = { root: { width: 160, } };

const panelWidth = '90%';

const groupBottomPadding = '25px';
const toggleBottomPadding = '5px';

const pivotHeading1 = 'FullList';  //Templates
const pivotHeading2 = 'Components';  //Templates
const pivotHeading3 = 'History';  //Templates

export default class MyAddListTemplate extends React.Component<IMyAddListTemplateProps, IMyAddListTemplateState> {


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

    constructor(props: IMyAddListTemplateProps) {
        super(props);
        let listTitle = this.props.theList.Title;

        // let startTime = getTheCurrentTime();
        let startTime = new Date();
        let refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();

        let definedList = availLists[0];

        //makeIMakeThisListFromExisting( definedList: IDefinedLists, listDefinition: string, theList: IContentsListInfo, consoleLog: boolean = false ) {
        let makeThisList : IMakeThisList = makeIMakeThisListFromExisting( definedList , '' , this.props.theList, true ) ;
        let doList = this.props.theList.BaseType === 100 ? true : false;

        let theLists = getTheseDefinedLists( definedList, true, [ makeThisList.title ], [], makeThisList.webURL, makeThisList.webURL, doList, null );
        console.log( 'theLists in railAddTemplate props: ', theLists );

        this.state = {
            disableDo: false,
            refreshId: refreshId,
            finished: false,
            errorMess: '',
            otherWeb: '',
            otherList: '',
            otherProp: '',
            makeThisList: makeThisList,
            lists: theLists,
            definedList: definedList,
            doList: doList,
        };
    }
        
    public componentDidMount() {
        this._doCheck();
        //this._getListItems();
    }

    private async _doCheck() {
        this.setState({

        });
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

    public componentDidUpdate(prevProps: IMyAddListTemplateProps): void {
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


    public render(): React.ReactElement<IMyAddListTemplateProps> {

        if ( this.props.theList ) {
          
            let listOrLib = this.props.theList.BaseType === 0 ? 'List' : 'Library' ;

            let panelContent = null;

            let listDropdown = this._createDropdownField( 'Pick your list type' , availLists , this._updateDropdownChange.bind(this) , null );

            panelContent = <div>
                <h3> { `${ this.props.theList.Title } ${ listOrLib }` }</h3>
                <Pivot
                    styles={ pivotStyles }
                    linkFormat={PivotLinkFormat.links}
                    linkSize={PivotLinkSize.normal}
                    onLinkClick={this._selectedIndex.bind(this)}
                >
                    <PivotItem headerText={pivotHeading1} ariaLabel={pivotHeading1} title={pivotHeading1} itemKey={pivotHeading1} itemIcon={ ''}>

                        {/* <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                            { this.makeToggle( 'Create Contributors', true, false, this.updateTogggle1.bind(this) ) }
                            { this.makeToggle( 'Read site', true, false, this.updateTogggle1.bind(this) ) }
                        </div> */}

                        { this.makeGroupName( 'Enter compare web URL', 'def' , this._updateText1.bind(this) , false, '0px 0px ' + groupBottomPadding + '0px' )}
                        { this.makeGroupName( 'Enter compare List Title', 'def' , this._updateText2.bind(this) , false, '0px 0px ' + groupBottomPadding + '0px' )}
                        { this.makeGroupName( 'List, Fields, Views, Types', 'List' , this._updateText3.bind(this) , false, '0px 0px ' + groupBottomPadding + '0px' )}

                        { <div style={{display: this.state.errorMess !== '' ? 'none' : null, width: panelWidth, margin: '20px 0px' }}>
                            <MessageBar messageBarType={MessageBarType.warning}>
                                { this.state.errorMess }
                            </MessageBar>
                        </div> }

                        <div style={{ overflowY: 'auto' }}>
                            <ReactJson src={ this.state.makeThisList } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                        </div>;

                    </PivotItem>
                    <PivotItem headerText={pivotHeading2} ariaLabel={pivotHeading2} title={pivotHeading2} itemKey={pivotHeading2} itemIcon={ ''}>
                        <div style={{marginTop: '20px'}}>
                            {/* { permissions } */}
                        </div>
                    </PivotItem>
                    <PivotItem headerText={pivotHeading3} ariaLabel={pivotHeading3} title={pivotHeading3} itemKey={pivotHeading3} itemIcon={ ''}>
                        <div style={{marginTop: '20px'}}>
                            {/* { history } */}
                        </div>
                    </PivotItem>
                </Pivot>
            </div>;

            let panelHeader = 'Compare Properties' ;
            return (
                <div><Panel
                        isOpen={ this.props.showPanel }
                        // this prop makes the panel non-modal
                        isBlocking={true}
                        onDismiss={ this.props._closePanel }
                        closeButtonAriaLabel="Close"
                        type = { this.props.type }
                        isLightDismiss = { true }
                        headerText = { panelHeader }
                        >
                        { panelContent }

                    </Panel>
                </div>

            );

        } else { //No list was detected

            // <div className={ styles.container }></div>
            return ( <div className={ '' }>
                    <Panel
                        isOpen={ this.props.showPanel }
                        // this prop makes the panel non-modal
                        isBlocking={true}
                        onDismiss={ this.props._closePanel }
                        closeButtonAriaLabel="Close"
                        type = { this.props.type }
                        isLightDismiss = { true }
                        headerText = { 'Ooops!' }
                        >
                            { 'OOPS!  We don\'t have a list to show you right now :(' }

                        </Panel>
                </div> );
        } 

    } 


    private makeGroupName( placeholder: string, def: string, onChanged: any, disabled: boolean, margin: any ) {
        return <div style={{ width: panelWidth, margin: margin }}>
             <TextField
                 defaultValue={ def }
                 placeholder={ placeholder }
                 autoComplete='off'
                 onChanged={ onChanged }
                 required={ true }
                 disabled={ disabled }
                 style={{ width: panelWidth }}
             />
         </div>;
 }

 private getDefinedLists( defineThisList : IDefinedLists, justReturnLists : boolean ) {

    let theLists : IMakeThisList[] = [];

    let provisionListTitles =  [ this.props.theList.Title ];

    if ( justReturnLists === false ) { provisionListTitles = [] ; }

    if ( defineThisList !== availLists[0] ) { //Update to get available lists to build
        theLists = getTheseDefinedLists( defineThisList, true, [ this.state.makeThisList.title ], [], this.state.makeThisList.webURL, this.state.makeThisList.webURL, this.state.doList, null );
    }

    //let buEmails : IMakeThisList = dHarm.defineTheList( 101 , provisionListTitles[0], 'BUEmails' , this.props.pickedWeb.url, this.props.currentUser, this.props.pageContext.web.absoluteUrl );
    this.setState({
        lists: theLists,
        definedList: defineThisList,
    });

}

 private _updateDropdownChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    console.log(`_updateStatusChange: ${item.text} ${item.selected ? 'selected' : 'unselected'}`);

    let thisValue : any = getChoiceText(item.text);

    this.getDefinedLists(thisValue, true);

}


    private _createDropdownField( label: string, choices: string[], _onChange: any, getStyles : IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>) {
        const dropdownStyles: Partial<IDropdownStyles> = {
            dropdown: { width: dropDownWidth }
        };

        let sOptions: IDropdownOption[] = choices == null ? null : 
            choices.map(val => {
                return {
                    //key: getChoiceKey(val),
                    key: val,
                    text: val,
                };
            });

        let keyVal = this.state.definedList;

        let thisDropdown = sOptions == null ? null : <div
            //style={{  paddingTop: 10  }}
                ><Dropdown 
                label={ label }
                //selectedKey={ getChoiceKey(keyVal) }
                selectedKey={ keyVal }
                onChange={ _onChange }
                options={ sOptions } 
                styles={ dropdownStyles }
            />
            </div>;

        return thisDropdown;

    }

 private _updateText1(oldVal: any): any {  this.setState({  otherWeb: oldVal  }); }
 private _updateText2(oldVal: any): any {  this.setState({  otherList: oldVal  }); }
 private _updateText3(oldVal: any): any {  this.setState({  otherProp: oldVal  }); }

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
    
    private updateTogggle1() {  
        this.setState({  

         }); 
    }

    private async _selectedIndex(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        //this.setState({ searchText: "" }, () => this._searchUsers(item.props.itemKey));
        let itemKey = item.props.itemKey;
        if ( itemKey === pivotHeading1 ) {
            if (ev.ctrlKey) {
                // window.open( this.props.theList.ParentWebUrl + "/_layouts/15/user.aspx?obj={" + this.props.theList.Id + "},doclib&List={" + this.props.theList.Id + "}", '_blank' );
            }

        } else if ( itemKey === pivotHeading2 ) {

        }

      }

}
