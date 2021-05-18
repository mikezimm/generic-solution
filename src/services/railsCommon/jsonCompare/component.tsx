
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


import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField,  ITextFieldProps, IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";
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

 import { getStringArrayFromString } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';
 
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


export interface IMyJsonCompareProps {
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

export interface IMyJsonCompareState {

    disableDo: boolean;
    finished: boolean;
    refreshId: string;
    errorMess: string;

    otherWeb: string;
    otherList: string;
    otherProp: string;
    ignoreKeys: string[];

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

const pivotHeading1 = 'This';  //Templates
const pivotHeading2 = 'Other';  //Templates
const pivotHeading3 = 'Compare';  //Templates

const pivotTabHeading1 = 'List';  //Templates
const pivotTabHeading2 = 'Fields';  //Templates
const pivotTabHeading3 = 'Views';  //Templates
const pivotTabHeading4 = 'Types';  //Templates

const ignoreListKeys = ['Id','Date','Age','URL','Path','bucket','Schema','Xml','odata','searchString'];

export default class MyJsonCompare extends React.Component<IMyJsonCompareProps, IMyJsonCompareState> {


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

    constructor(props: IMyJsonCompareProps) {
        super(props);
        let listTitle = this.props.theList.Title;

        // let startTime = getTheCurrentTime();
        let startTime = new Date();
        let refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();

        this.state = {
            disableDo: false,
            refreshId: refreshId,
            finished: false,
            errorMess: '',
            otherWeb: this.props.theList.ParentWebUrl,
            otherList: this.props.theList.Title,
            otherProp: 'List',
            ignoreKeys: ignoreListKeys,

        };
    }
        
    public componentDidMount() {
        this.props._fetchCompare( this.props.theList.ParentWebUrl, this.props.theList.Title );
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

    public componentDidUpdate(prevProps: IMyJsonCompareProps): void {
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


    public render(): React.ReactElement<IMyJsonCompareProps> {

        if ( this.props.theList ) {
          
            let listOrLib = this.props.theList.BaseType === 0 ? 'List' : 'Library' ;

            let panelContent = null;

            let theListAny : any = this.props.theList; //Added because one property is required in MyPermissions but optional in this type.

            panelContent = <div>
                <h3> { `${ this.props.theList.Title } ${ listOrLib }` }</h3>
                <Pivot
                    styles={ pivotStyles }
                    linkFormat={PivotLinkFormat.links}
                    linkSize={PivotLinkSize.normal}
                    onLinkClick={this._selectedIndex.bind(this)}

                >
                    <PivotItem headerText={pivotHeading1} ariaLabel={pivotHeading1} title={pivotHeading1} itemKey={pivotHeading1} itemIcon={ null }>
                        <div style={{marginTop: '20px'}}>
                            {/* <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                                { this.makeToggle( 'Create Contributors', true, false, this.updateTogggle1.bind(this) ) }
                                { this.makeToggle( 'Read site', true, false, this.updateTogggle1.bind(this) ) }
                            </div> */}
                            <div style={{ overflowY: 'auto' }}>
                                <ReactJson src={ this.props.json1 } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                            </div>
                            </div>
                    </PivotItem>
                    <PivotItem headerText={pivotHeading2} ariaLabel={pivotHeading2} title={pivotHeading2} itemKey={pivotHeading2} itemIcon={ null }>
                        <div style={{marginTop: '20px'}}>
                            {/* { permissions } */}
                            <div style={{  display: 'flex' }}>
                                <div style={{ fontSize: 'larger', fontWeight: 'bolder', width: '100px'}} >Web URL</div>
                                { this.makeTextField( 'Enter compare web URL', this.props.theList.ParentWebUrl , this._updateText1.bind(this) , false, '0px 0px ' + '20px ' + '0px' )}
                            </div>
                            <div style={{  display: 'flex' }}>
                                <div style={{ fontSize: 'larger', fontWeight: 'bolder', width: '100px'}} >List Title</div>
                                { this.makeTextField( 'Enter compare List Title', this.props.theList.Title , this._updateText2.bind(this) , false, '0px 0px ' + '20px ' + '0px' )}
                            </div>
                            <div style={{  display: 'flex', marginBottom: '20px' }}>
                                <div style={{ fontSize: 'larger', fontWeight: 'bolder', width: '100px'}} >Do this</div>
                                <div style={{ paddingRight: '40px' }}>
                                    <Pivot
                                        styles={ pivotStyles }
                                        linkFormat={PivotLinkFormat.tabs}
                                        linkSize={PivotLinkSize.normal}
                                        onLinkClick={this._selectDoThis.bind(this)}
                                        selectedKey={ this.state.otherProp }
                                    >
                                        <PivotItem headerText={pivotTabHeading1} ariaLabel={pivotTabHeading1} title={pivotTabHeading1} itemKey={pivotTabHeading1} itemIcon={ null }></PivotItem>
                                        <PivotItem headerText={pivotTabHeading2} ariaLabel={pivotTabHeading2} title={pivotTabHeading2} itemKey={pivotTabHeading2} itemIcon={ null }></PivotItem>
                                        <PivotItem headerText={pivotTabHeading3} ariaLabel={pivotTabHeading3} title={pivotTabHeading3} itemKey={pivotTabHeading3} itemIcon={ null }></PivotItem>
                                        <PivotItem headerText={pivotTabHeading4} ariaLabel={pivotTabHeading4} title={pivotTabHeading4} itemKey={pivotTabHeading4} itemIcon={ null }></PivotItem>
                                    </Pivot>
                                </div>

                                { this.makeTextField( 'Keys to ignore', this.state.ignoreKeys.join(', ') , this._updateText3.bind(this) , false, '0px 0px ' + '20px ' + '0px', '500px' )}
                            </div>


                            { this.props.json2 === undefined || this.props.errorMess !== '' ? 
                                <MessageBar messageBarType={MessageBarType.warning}>
                                    { this.props.errorMess !== '' ? this.props.errorMess : 'Unable to find the list you mentioned :(' }
                                </MessageBar>
                            :<div style={{ overflowY: 'auto' }}>
                                <ReactJson src={ this.props.json2 } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                            </div>
                            }

                        </div>
                    </PivotItem>
                    <PivotItem headerText={pivotHeading3} ariaLabel={pivotHeading3} title={pivotHeading3} itemKey={pivotHeading3} itemIcon={ null }>
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


    private makeTextField( placeholder: string, def: string, onChanged: any, disabled: boolean, margin: any, width = panelWidth ) {
        return <div style={{ width: width, margin: margin }}>
             <TextField
                 defaultValue={ def }
                 placeholder={ placeholder }
                 autoComplete='off'
                 onChanged={ onChanged }
                 required={ true }
                 disabled={ disabled }
                 style={{ width: width }}
             />
         </div>;
    }

    private _updateText1(oldVal: any): any {  
        this.setState({  otherWeb: oldVal  }); 
        this.props._fetchCompare( oldVal, this.state.otherList, this.state.otherProp );
    }

    private _updateText2(oldVal: any): any {  
        this.setState({  otherList: oldVal  }); 
        this.props._fetchCompare( this.state.otherWeb, oldVal, this.state.otherProp );
    }

    private _updateText3(oldVal: any): any { 
        let ignoreKeys = getStringArrayFromString ( oldVal, ';or,', true, null, true );
        this.setState({  ignoreKeys: ignoreKeys }); 
        this.props._fetchCompare( this.state.otherWeb, this.state.otherList, oldVal );
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
    
    private updateTogggle1() {  
        this.setState({  

         }); 
    }


    
    private async _selectDoThis(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        //this.setState({ searchText: "" }, () => this._searchUsers(item.props.itemKey));
        let itemKey = item.props.itemKey;
        if ( itemKey === pivotHeading1 ) {
            if (ev.ctrlKey) {
                // window.open( this.props.theList.ParentWebUrl + "/_layouts/15/user.aspx?obj={" + this.props.theList.Id + "},doclib&List={" + this.props.theList.Id + "}", '_blank' );
            }

        } else if ( itemKey === pivotHeading2 ) {

        }
        this.setState({ otherProp : itemKey, });
        this.props._fetchCompare( this.state.otherWeb, this.state.otherList, itemKey );
      }

    private async _selectedIndex(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        /**
         * 
         * 
         * 
         * NEED TO DO SOMETHING HERE...
         * When clicking LIST pivot after clicking Fields,
         * NOTHING happens... need to refresh some data.
         * 
         * 
         * 
         */
        //this.setState({ searchText: "" }, () => this._searchUsers(item.props.itemKey));
        let itemKey = item.props.itemKey;
        if ( itemKey === pivotHeading1 ) {
            if (ev.ctrlKey) {
                // window.open( this.props.theList.ParentWebUrl + "/_layouts/15/user.aspx?obj={" + this.props.theList.Id + "},doclib&List={" + this.props.theList.Id + "}", '_blank' );
            }

        } else if ( itemKey === pivotHeading2 ) {

        }

        this.props._fetchCompare( this.state.otherWeb, this.state.otherList, itemKey );

    }
}
