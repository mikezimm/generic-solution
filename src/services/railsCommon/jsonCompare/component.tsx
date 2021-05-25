
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
import { Image, IImageProps, ImageFit, ImageCoverStyle } from 'office-ui-fabric-react/lib/Image';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SearchBox, } from 'office-ui-fabric-react/lib/SearchBox';


import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField,  ITextFieldProps, IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";

import { TooltipHost, TooltipDelay, DirectionalHint, ITooltipProps, ITooltipHostStyles } from 'office-ui-fabric-react';
import { DefaultButton, PrimaryButton, CompoundButton, elementContains } from 'office-ui-fabric-react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';

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
import { getKeyChanges, doesObjectExistInArrayInt, ICompareResult, DoesNotExistLabel } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';

import { getStringArrayFromString, getGuidsFromString } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';

import { getIconStyles } from '@mikezimm/npmfunctions/dist/Icons/stdIconsBuildersV02';
 
import { addItemToArrayIfItDoesNotExist, } from  '@mikezimm/npmfunctions/dist/Services/Arrays/manipulation';

import { ICompareObject, IComparePair, IIncludeOrIgnore, ICompareKeysResult, } 
    from '@mikezimm/npmfunctions/dist/Services/Arrays/compare';

import { compareFlatObjects, getListOfKeysToCompare, buildEmptyCompareResults,  } 
from '@mikezimm/npmfunctions/dist/Services/Arrays/compare';

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
  
import stylesInfo from '../../../webparts/genericWebpart/components/HelpInfo/InfoPane.module.scss';
import styles from './jsonCompare.module.scss';



  
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

import stylesCompare from './jsonCompare.module.scss';


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

    showTab: string;
    comparePivot: string;

    otherWeb: string;
    otherList: string;
    otherProp: string;

    ignoreKeys: string[];
    includeOrIgnoreKeys: IIncludeOrIgnore;

    ignoreItems: string[];
    includeOrIgnoreItems: IIncludeOrIgnore;

    comparedProps: any[];
    summaryRows: any[];

    compareResults: ICompareKeysResult;
    compareArray: ICompareKeysResult[];
    json1PropCount: number;
    json2PropCount: number;

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
const togglePadding = '';

const pivotHeading1 = 'This';  //Templates
const pivotHeading2 = 'Other';  //Templates
const pivotHeading3 = 'Compare';  //Templates

const pivotDoThis1 = 'Lists';  //Templates
const pivotDoThis2 = 'Fields';  //Templates
const pivotDoThis3 = 'Views';  //Templates
const pivotDoThis4 = 'Types';  //Templates

const comparePivot9 = 'Details';
const comparePivot0 = 'Summary';
const comparePivot1 = 'Ignored';
const comparePivot2 = 'Compared';
const comparePivot3 = 'Identical';
const comparePivot4 = 'Different';
const comparePivot5 = 'New';


const ignoreKeysDefaults = {
    'Lists': ['Id','Date','Age','URL','Path','bucket','Schema','Xml','odata','searchString','CurrentChangeToken'],
    'Fields': ['CustomFormatter','Id','=Scope','odata.','SchemaXml','bucket','Schema','Xml','searchString'],
    'Views': ['Id','Date','Age','URL','Path','bucket','Schema','Xml','odata','searchString','CurrentChangeToken'],
    'Types': ['Id','Date','Age','URL','Path','bucket','Schema','Xml','odata','searchString','CurrentChangeToken'],
};

const ignoreItemsDefaults  = {
    'Lists': [''],
    'Fields': ['','','','',''],
    'Views': ['','','','',''],
    'Types': ['','','','',''],
};

const itemCompareKey  = {
    'Lists': ['EntityTypeName','Title','Id'],
    'Fields': ['StaticName','InternalName','Title','Id'],
    'Views': [''],
    'Types': [''],
};

const hardSpacer = <div id="spacerX" style={{ height: '20px'}}></div>;

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
        
        let includeOrIgnoreKeys: IIncludeOrIgnore = 'Ignore';
        let defaultProp = pivotDoThis1;
        let ignoreKeys = ignoreKeysDefaults[defaultProp];
        let ignoreItems = ignoreItemsDefaults[defaultProp];

        let compareResults: ICompareKeysResult = buildEmptyCompareResults( ignoreKeys, includeOrIgnoreKeys );

        // let startTime = getTheCurrentTime();
        let startTime = new Date();
        let refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();

        let json1PropCount = this.props.json1 === null ? 0 : this.props.json1.length;
        let json2PropCount = this.props.json2 === null ? 0 : this.props.json2.length;

        this.state = {
            disableDo: false,
            refreshId: refreshId,
            finished: false,
            errorMess: '',
            otherWeb: this.props.theList.ParentWebUrl,
            otherList: this.props.theList.Title,
            otherProp: 'Lists',
            showTab: pivotHeading1,
            comparePivot: comparePivot9,

            ignoreKeys: ignoreKeys,
            includeOrIgnoreKeys: 'Ignore',

            ignoreItems: ignoreItems,
            includeOrIgnoreItems: 'Include',

            comparedProps: [],
            compareResults: compareResults,
            compareArray: [],

            json1PropCount: json1PropCount,
            json2PropCount: json2PropCount,

            summaryRows: [],

        };
    }
        
    public componentDidMount() {
        this.props._fetchCompare( this.props.theList.ParentWebUrl, this.props.theList.Title, this.state.otherProp );
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
        
        // return ;
        
        // let json1 = this.props.json1;
        // let json2 = this.props.json2;

        // let json1PropCount = 0;
        // let json2PropCount = 0;

        // if ( this.props.errorMess === '' ) {
        //     if ( this.state.otherProp  === pivotDoThis1 ) { //Flat Object, just count props
        //         json1PropCount = json1 === null ? 0 : Object.keys(json1).length;
        //         json2PropCount = json2 === null ? 0 : Object.keys(json2).length;

        //     } else {  //Object Array, count keys and objects
        //         json1PropCount = json1 === null ? 0 : json1.length * Object.keys(json1[0]).length;
        //         json2PropCount = json2 === null ? 0 : json2.length * Object.keys(json2[0]).length;

        //     }

        // }

        // this.setState({
        //     json1PropCount: json1PropCount,
        //     json2PropCount: json2PropCount,
        // });
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

            let includeKeyState = this.state.includeOrIgnoreKeys === 'Include' ? true : false;
            let includeItemState = this.state.includeOrIgnoreItems === 'Include' ? true : false;

            let x = this.state.compareResults;
            let ignoredKeys = x.ignoredKeys;
            let compareKeys = x.compareKeys;
            let identicalKeys = x.identicalKeys;
            let differentKeys = x.differentKeys;
            let newKeys = x.newKeys;

            let showSummary = this.state.otherProp !== pivotDoThis1 && this.state.comparePivot === comparePivot0 ? true : false;
            
            let history = this.state.showTab !== pivotHeading3 ? null : 
            <div>
                <div className={ stylesInfo.infoPaneTight }>
                    {/* { ['ignoredKeys','compareKeys','identicalKeys','differentKeys','newKeys'] } */}
                    <Pivot
                        styles={ pivotStyles }
                        linkFormat={PivotLinkFormat.tabs}
                        linkSize={PivotLinkSize.normal}
                        onLinkClick={this._selectedIndexComparePivot.bind(this)}
                        selectedKey={ this.state.comparePivot }
                    >
                        <PivotItem  headerText={comparePivot9} ariaLabel={comparePivot9} itemKey={comparePivot9} >
                        </PivotItem>

                        { this.state.otherProp === pivotDoThis1 ? null : 
                            <PivotItem  headerText={ comparePivot0 } ariaLabel={comparePivot0} itemKey={comparePivot0} >
                            </PivotItem> }

                        <PivotItem  headerText={comparePivot1} ariaLabel={comparePivot1} itemKey={comparePivot1} itemCount={ ignoredKeys.length }>
                            <div style={{ padding: '5px 30px 5px 20px'}}>
                                <h3>These ( { ignoredKeys.length } ) properties were { this.state.includeOrIgnoreKeys }d due to your filter criteria:</h3>
                                <p>{ this.state.ignoreKeys.join(', ') }</p>
                                { ignoredKeys.join(', ') }
                            </div>
                        </PivotItem>
                        <PivotItem  headerText={comparePivot2} ariaLabel={comparePivot2} itemKey={comparePivot2} itemCount={ compareKeys.length }>
                            <div style={{ padding: '5px 30px 5px 20px'}}>
                                <h3>These ( { compareKeys.length } )properties were NOT { this.state.includeOrIgnoreKeys }d due to your filter criteria:</h3>
                                { compareKeys.join(', ') }
                            </div>
                        </PivotItem>
                        <PivotItem  headerText={comparePivot3} ariaLabel={comparePivot3} itemKey={comparePivot3} itemCount={ identicalKeys.length }>
                            <div style={{ padding: '5px 30px 5px 20px'}}>
                                <h3>Of the ( { compareKeys.length } ) properties to compare, these had IDENTICAL values on all { this.state.otherProp }:</h3>
                                { identicalKeys.join(', ') }
                            </div>
                        </PivotItem>
                        <PivotItem  headerText={comparePivot4} ariaLabel={comparePivot4} itemKey={comparePivot4} itemCount={ differentKeys.length }>
                            <div style={{ padding: '5px 30px 5px 20px'}}>
                                <h3>Of the ( { compareKeys.length } ) properties to compare, these had DIFFERENT values on all { this.state.otherProp }:</h3>
                                { differentKeys.join(', ') }
                            </div>
                        </PivotItem>
                        <PivotItem  headerText={comparePivot5} ariaLabel={comparePivot5} itemKey={comparePivot5} itemCount={ newKeys.length }>
                            <div style={{ padding: '5px 30px 5px 20px'}}>
                                <h3>These were not on your Baseline List but were on the New { this.state.otherProp }:</h3>
                                { newKeys.join(', ') }
                            </div>
                        </PivotItem>
                    </Pivot>
                    { hardSpacer }
                    <div style={{ paddingTop: '20px !important' }}>We crunched a total of { this.state.json1PropCount + this.state.json2PropCount } properties for you.... and this is what was different</div>
                    <div id="whyGodwhy" style={{ paddingTop: '20px !important' }}>
                        { hardSpacer }
                        <table style={{ display: '', borderCollapse: 'collapse', width: '100%', padding: '20px' }} className={ [stylesInfo.infoTable , styles.jsonTable ].join( ' ') }>
                            { showSummary === true ? this.state.summaryRows : this.state.comparedProps }
                        </table>
                    </div>
                </div>
            </div>;
            
            let isSameList = this.props.theList.Title === this.state.otherList ? true : false;
            let isSameWeb = this.props.theList.ParentWebUrl === this.state.otherWeb ? true : false; 
            let isSameEntity = isSameList === true && isSameWeb === true ? true : false;
            let actualPivotHeading3 = isSameEntity === true || this.state.errorMess !== '' || this.props.errorMess !== '' ? null : pivotHeading3;

            let errorImageStyle = isSameEntity === false || this.state.showTab !== pivotHeading2 ? {
                    display: 'none',
                    transition:'all 0.3s ease',
                } : null ;

            let otherList = isSameEntity === true ? ' =>> Hey!  You can\'t compare a list url to itself goof!' : `<= VS => ${ this.state.otherList }`;
            panelContent = <div id='thisUniquePanelContent'>
                <h3> { `${ this.props.theList.Title } ${ listOrLib }` } { otherList } </h3>
                <Pivot
                    styles={ pivotStyles }
                    linkFormat={PivotLinkFormat.links}
                    linkSize={PivotLinkSize.normal}
                    onLinkClick={this._selectedIndexMainPivot.bind(this)}
                    selectedKey={ this.state.showTab }
                >
                    <PivotItem headerText={pivotHeading1} ariaLabel={pivotHeading1} itemKey={pivotHeading1} itemIcon={ null }>
                        <div style={{marginTop: '20px'}}>
                            {/* <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                                { this.makeToggle( 'Create Contributors', true, false, this.updateTogggle1.bind(this) ) }
                                { this.makeToggle( 'Read site', true, false, this.updateTogggle1.bind(this) ) }
                            </div> */}
                            <div style={{ paddingTop: '20px !important' }}>We found a total of <span style={{fontSize: 'larger'}}>{ this.state.json1PropCount }</span> properties in { this.props.theList.Title } </div>
                            { hardSpacer }
                            <div style={{ overflowY: 'auto' }}>
                                <ReactJson src={ this.props.json1 } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                            </div>
                            </div>
                    </PivotItem>
                    <PivotItem headerText={pivotHeading2} ariaLabel={pivotHeading2} itemKey={pivotHeading2} itemIcon={ null }>
                        <div style={{marginTop: '20px'}}>
                            {/* { permissions } */}
                            <div style={{  display: 'flex' }}>
                                <div style={{ fontSize: 'larger', fontWeight: 'bolder', width: '100px'}} >Web URL</div>
                                { this.makeTextField( 'Enter compare web URL', this.state.otherWeb , this._updateText1_Web.bind(this) , false, '0px 0px ' + '20px ' + '0px' )}
                            </div>
                            <div style={{  display: 'flex' }}>
                                <div style={{ fontSize: 'larger', fontWeight: 'bolder', width: '100px'}} >List Title</div>
                                { this.makeTextField( 'Enter compare List Title', this.state.otherList , this._updateText2_List.bind(this) , false, '0px 0px ' + '20px ' + '0px' )}
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
                                        <PivotItem headerText={pivotDoThis1} ariaLabel={pivotDoThis1} title={pivotDoThis1} itemKey={pivotDoThis1} itemIcon={ null }></PivotItem>
                                        <PivotItem headerText={pivotDoThis2} ariaLabel={pivotDoThis2} title={pivotDoThis2} itemKey={pivotDoThis2} itemIcon={ null }></PivotItem>
                                        <PivotItem headerText={pivotDoThis3} ariaLabel={pivotDoThis3} title={pivotDoThis3} itemKey={pivotDoThis3} itemIcon={ null }></PivotItem>
                                        <PivotItem headerText={pivotDoThis4} ariaLabel={pivotDoThis4} title={pivotDoThis4} itemKey={pivotDoThis4} itemIcon={ null }></PivotItem>
                                    </Pivot>
                                </div>

                            </div>

                            { this.props.json2 === undefined || this.props.errorMess !== '' ? 
                                <MessageBar messageBarType={MessageBarType.warning}>
                                    { this.props.errorMess !== '' ? this.props.errorMess : 'Unable to find the list you mentioned :(' }
                                </MessageBar>
                            :  <div>
                                    <div style={{ paddingTop: '20px !important' }}>We found a total of <span style={{fontSize: 'larger'}}>{ this.state.json2PropCount }</span> properties in { this.state.otherWeb } </div>
                                    { hardSpacer }
                                    <div style={{ overflowY: 'auto' }}>
                                        <ReactJson src={ this.props.json2 } collapsed={ true } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } />
                                    </div>
                                </div>
                            }

                        </div>
                    </PivotItem>
                    <PivotItem headerText={actualPivotHeading3} ariaLabel={actualPivotHeading3} itemKey={actualPivotHeading3} itemIcon={ null }>

                        <div style={{ paddingTop: '20px', display: 'flex' }}>
                            { <div style={{ fontSize: 'larger', fontWeight: 'bolder', paddingRight: '30px', minWidth: '235px'}}>{ this.state.otherProp } Properties to { this.state.includeOrIgnoreKeys }:</div>}
                            { this.makeToggle( '', includeKeyState, false, this.updateTogggle1.bind(this) , '125px' ) }
                            { this.makeTextField( 'Keys to ignore', this.state.ignoreKeys.join(', ') , this._updateText3_KeyFilters.bind(this) , false, '0px 0px ' + '20px ' + '0px', '600px' )}
                            <div style={{ marginLeft: '30px'}}>
                                <TooltipHost content={`${ this.state.includeOrIgnoreKeys} keys with these strings when comparing`} id={ 'includeOrIgnoreKeysTooltip' } calloutProps={ null }>
                                    <Icon iconName="Info" style={ getIconStyles('PivotTiles', 'black') }></Icon>
                                </TooltipHost>
                            </div>
                        </div>

                        <div style={{ paddingTop: '5px', display: 'flex' }}>
                            { <div style={{ fontSize: 'larger', fontWeight: 'bolder', paddingRight: '30px', minWidth: '235px'}}>{ this.state.otherProp } to { this.state.includeOrIgnoreItems }:</div>}
                            { this.makeToggle( '', includeItemState, false, this.updateTogggle2.bind(this) , '125px' ) }
                            { this.makeTextField( 'Keys to ignore', this.state.ignoreItems.join(', ') , this._updateText4_ItemFilters.bind(this) , false, '0px 0px ' + '20px ' + '0px', '600px' )}
                            <div style={{ marginLeft: '30px'}}>
                                <TooltipHost content={`${ this.state.includeOrIgnoreItems} keys with these strings when comparing`} id={ 'includeOrIgnoreItemsTooltip' } calloutProps={ null }>
                                    <Icon iconName="Info" style={ getIconStyles('PivotTiles', 'black') }></Icon>
                                </TooltipHost>
                            </div>
                        </div>

                        <div style={{marginTop: '20px'}}>
                            { history }
                        </div>
                    </PivotItem>
                </Pivot>
                <div className = { '' } style={ errorImageStyle }>
                    <div style={{ fontSize: '30px', paddingTop: '30px', textAlign: 'center' }}>I'm waiting for you to figure it out</div>
                    <Image
                        src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2017%2F05%2F2458_mdm3_prints_p1880-2000.jpg"
                        imageFit={ImageFit.centerContain}
                        coverStyle={ImageCoverStyle.portrait}
                        shouldFadeIn={true} 
                        styles={{ root: {height:'400px'}, }}
                    >
                        {/* <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2017%2F05%2F2458_mdm3_prints_p1880-2000.jpg" alt="" srcset=""/> */}
                    </Image>
                </div>

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

    private async _updateText1_Web(oldVal: any): Promise<any> {  
        if ( oldVal === undefined || oldVal === null || oldVal.length === 0 ) { oldVal = this.props.theList.ParentWebUrl ; }
        await this.setState({  otherWeb: oldVal  }); 
        this.props._fetchCompare( oldVal, this.state.otherList, this.state.otherProp );
    }

    private async _updateText2_List(oldVal: any):  Promise<any> {  
        if ( oldVal === undefined || oldVal === null || oldVal.length === 0 ) { oldVal = this.props.theList.Title ; }
        await this.setState({  otherList: oldVal  }); 
        this.props._fetchCompare( this.state.otherWeb, oldVal, this.state.otherProp );
    }

    private _updateText3_KeyFilters(oldVal: any): any { 
        let ignoreKeys = getStringArrayFromString ( oldVal, ';or,', true, null, true );
        this.updateCompareResults( this.state.showTab, ignoreKeys, this.state.ignoreItems , this.state.includeOrIgnoreKeys, this.state.includeOrIgnoreItems );

    }

    private _updateText4_ItemFilters(oldVal: any): any { 
        let ignoreItems = getStringArrayFromString ( oldVal, ';or,', true, null, true );
        this.updateCompareResults( this.state.showTab, this.state.ignoreKeys, ignoreItems, this.state.includeOrIgnoreKeys, this.state.includeOrIgnoreItems );

    }

    private async setItemFilter( filter: any ) {  //https://reactjs.org/docs/faq-functions.html
        let ignoreItems = [ filter ];
        await this.setState({  comparePivot: comparePivot9, }); 
        this.updateCompareResults( this.state.showTab, this.state.ignoreKeys, ignoreItems, this.state.includeOrIgnoreKeys, 'Include' );
    
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

    private makeToggle( label: string, checked: boolean, disabled: boolean, _onChange: any, width = panelWidth, padding = togglePadding ) {
        return <div style={{ width: width, padding: padding }}>
            { label !== '' && label !== null ? <h3>{ label } </h3> : null }
            <Toggle 
                onText={ 'Include' } 
                offText={ 'Ignore' } 
                onChange={ _onChange } 
                checked={ checked }
                disabled= { disabled }
                styles={ toggleStyles }
            />
        </div>;

    }
    private updateTogggle1() {
        
        let includeOrIgnoreKeys : IIncludeOrIgnore = this.state.includeOrIgnoreKeys === 'Include' ? 'Ignore' : 'Include';

        this.updateCompareResults( this.state.showTab, this.state.ignoreKeys, this.state.ignoreItems, includeOrIgnoreKeys, this.state.includeOrIgnoreItems );

    }
    
    private updateTogggle2() {
        
        let includeOrIgnoreItems : IIncludeOrIgnore = this.state.includeOrIgnoreItems === 'Include' ? 'Ignore' : 'Include';

        this.updateCompareResults( this.state.showTab, this.state.ignoreKeys, this.state.ignoreItems, this.state.includeOrIgnoreKeys, includeOrIgnoreItems,  );

    }
    
    private async _selectDoThis(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        //this.setState({ searchText: "" }, () => this._searchUsers(item.props.itemKey));
        let itemKey = item.props.itemKey;
        let comparePivot = comparePivot9;
        if ( itemKey === pivotHeading1 ) {
            if (ev.ctrlKey) {
                // window.open( this.props.theList.ParentWebUrl + "/_layouts/15/user.aspx?obj={" + this.props.theList.Id + "},doclib&List={" + this.props.theList.Id + "}", '_blank' );
            }

        } else if ( itemKey !== pivotDoThis1 ) {
            comparePivot = comparePivot0;

        }
        let ignoreKeys = ignoreKeysDefaults[itemKey];
        let ignoreItems = ignoreItemsDefaults[itemKey];

        this.setState({ otherProp : itemKey, ignoreKeys: ignoreKeys, ignoreItems: ignoreItems, comparePivot: comparePivot });
        this.props._fetchCompare( this.state.otherWeb, this.state.otherList, itemKey );
      }

      
      private async _selectedIndexComparePivot(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        //comparePivot: comparePivot9,
        let itemKey = item.props.itemKey;
        this.setState({ comparePivot: itemKey });
      }

    private async _selectedIndexMainPivot(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
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
        if ( itemKey === pivotHeading1 || itemKey === pivotHeading2 ) {
            if (ev.ctrlKey) {
                // window.open( this.props.theList.ParentWebUrl + "/_layouts/15/user.aspx?obj={" + this.props.theList.Id + "},doclib&List={" + this.props.theList.Id + "}", '_blank' );
            }
            this.setState({ showTab: itemKey });
            this.props._fetchCompare( this.state.otherWeb, this.state.otherList, this.state.otherProp );

        } else if ( itemKey === pivotHeading3 ) {
            this.updateCompareResults( itemKey, this.state.ignoreKeys, this.state.ignoreItems, this.state.includeOrIgnoreKeys, this.state.includeOrIgnoreItems );
        }
    }

    private updateCompareResults ( itemKey: string, ignoreKeys: string[], ignoreItems: string[], includeOrIgnoreKeys: IIncludeOrIgnore, includeOrIgnoreItems: IIncludeOrIgnore ) {
        if ( this.state.otherProp === pivotDoThis1 ) {
            this.updateCompareFlat( itemKey, ignoreKeys, includeOrIgnoreKeys, includeOrIgnoreItems );
        } else {
            this.updateCompareArray( itemKey, ignoreKeys, ignoreItems, includeOrIgnoreKeys, includeOrIgnoreItems );
        }

    }


    private updateCompareArray ( itemKey: string, ignoreKeys: string[], ignoreItems: string[], includeOrIgnoreKeys: IIncludeOrIgnore, includeOrIgnoreItems: IIncludeOrIgnore ) {

        let compareStyle = 'table'; //'table','text','json';
        let compareArray = [];
        let allTableRows = [];
        let summaryRows = [];

        let thisItemCompareKey = itemCompareKey[ this.state.otherProp ][0];
        let matchedPairs: IComparePair[] = [];
        let notFoundPairs: IComparePair[] = [];
        let allPairs: IComparePair[] = [];

        let foundJson2: number[] = [];

        let json1PropCount = 0;
        let json2PropCount = 0;

        //Find obvious matches
        this.props.json1.map( ( item, idx ) => {

            json1PropCount += Object.keys(item).length;

            let itemTitle = item[thisItemCompareKey];
            let obj1: ICompareObject = { title: itemTitle, idx: idx, status: 'Match', obj: item };
            let matchIdx = doesObjectExistInArrayInt ( this.props.json2, thisItemCompareKey, itemTitle, true );
            let obj2: ICompareObject = {
                title: itemTitle,
                idx: matchIdx > -1 ? matchIdx : matchIdx,
                obj: matchIdx > -1 ? this.props.json2[matchIdx] : null,
                status: matchIdx > -1 ? 'Match' : 'NotFound',
            };
            if ( matchIdx > -1 ) { foundJson2.push( matchIdx ) ; }
            let thisPair: IComparePair = { obj1: obj1, obj2: obj2 };
            matchedPairs.push( thisPair );
            allPairs.push( thisPair );
        });

        //Find objects in json2 that were not matched
        this.props.json2.map( ( item, idx ) => {

            // debugger;
            json2PropCount += Object.keys(item).length;

            let itemTitle = item[thisItemCompareKey];
            if ( foundJson2.indexOf( idx ) === -1 ) {

                let obj1: ICompareObject = { title: itemTitle, idx: -1, status: 'NoMatch', obj: null };
                let obj2: ICompareObject = { title: itemTitle, idx: -1, status: 'NoMatch', obj: item };
                let thisPair: IComparePair = { obj1: obj1, obj2: obj2 };
                console.log('unmatchedpair:',thisPair);
                notFoundPairs.push( thisPair );
                allPairs.push( thisPair );
            }
        });

        console.log('foundJson2:',foundJson2);
        console.log('notFoundPairs:',notFoundPairs);
        console.log('allPairs:',allPairs);

        //make consolidated compareResults
        let compareResults: ICompareKeysResult = buildEmptyCompareResults( ignoreKeys, this.state.includeOrIgnoreKeys );

        let otherProp = this.state.otherProp;
        //Go through all matched pairs and do full compare
        let summaryIndex = 0;
        allPairs.map( (pair, index1 ) => {
            // if ( pair.obj1.obj && pair.obj2.obj ) {
            let showPair = false ;
            if ( ignoreItems && ignoreItems.length > 0 && ignoreItems.join('').length > 0 ) {
                ignoreItems.map( item => {
                    if ( includeOrIgnoreItems === 'Include' ) {
                        if ( item.length > 0 && pair.obj1.title.indexOf( item ) > -1 ) {
                            showPair = true ;
                        }
                    } else if ( includeOrIgnoreItems === 'Ignore' ) {
                        if ( item.length > 0 && pair.obj1.title.indexOf( item ) === -1 ) {
                            showPair = true ;
                        }
                    }

                });
            } else { showPair = true ; }

            if ( showPair === true ) {

                let compareResultsItem: ICompareKeysResult = compareFlatObjects( pair.obj1.obj, pair.obj2.obj, ignoreKeys, includeOrIgnoreKeys );

                //consolidate compareResults
                ['ignoredKeys','compareKeys','identicalKeys','differentKeys','newKeys'].map( doThis => {
                    compareResultsItem[doThis].map( key => { compareResults[doThis] = addItemToArrayIfItDoesNotExist( compareResults[doThis], key, true ) ; } ) ;
                });
    
                //itemTitle will be from obj1 unless it's not available... then obj2
                let itemTitle = 'TBD';
                if ( pair.obj1.obj && pair.obj1.obj[thisItemCompareKey] ) {
                    itemTitle= pair.obj1.obj[thisItemCompareKey] ;
                } else {
                    itemTitle = pair.obj2.obj[thisItemCompareKey] ;
                }

                let fullTitle = itemTitle;

                let itemTitleGuid : string[] = getGuidsFromString( itemTitle, 'contains' );
                if ( itemTitleGuid === null ) { itemTitleGuid = getGuidsFromString( itemTitle, 'start' ); }
                if ( itemTitleGuid !== null ) {
                    fullTitle = itemTitle + '';
                    let guidIdx = itemTitle.indexOf( itemTitleGuid[0] ) ;
                    if ( guidIdx === 0 ) { //guid is at the start... trim out the ending part of the guid
                        let shortGuid = itemTitleGuid[0].substr(0, itemTitleGuid[0].indexOf('-') + 1 ) + '...';	
                        itemTitle = itemTitle.replace( itemTitleGuid[0] , '') + ' ( ' + shortGuid + ' )';

                    } else {
                        let shortGuid = itemTitleGuid[0].substr(0, itemTitleGuid[0].indexOf('-') + 1 ) + '...';	
                        itemTitle = itemTitle.replace( itemTitleGuid[0] , '') + ' ( ' + shortGuid + ' )';
                    }
                }

                let tableRows: any = [];

                let theListTitle = this.props.theList.Title;
                let otherListTitle = this.state.otherList;
                if ( this.props.theList.ParentWebUrl !== this.state.otherWeb && this.state.otherWeb !== null && this.state.otherWeb.length !== 0 ) {
                    theListTitle += ` - on:  ${ this.props.theList.ParentWebUrl.replace('/sites','') }`;
                    otherListTitle += ` - on:  ${ this.state.otherWeb.replace('/sites','') }`;
                }
        
                // let comparedProps: string[] = [];
                  
                let styleNo : React.CSSProperties = { textAlign: 'center', padding: '0px 15px' };
                let valueStyle : React.CSSProperties = { display: 'inline-block', width: '380px' };
                let titleStyle : React.CSSProperties = { fontWeight: 'bolder' };
                let propStyle : React.CSSProperties = { };
                let seeDetailsStyle : React.CSSProperties = { cursor: 'pointer' };


                if ( compareStyle === 'table' ) {
                    let tableHeaders = <tr>
                            <th style = { styleNo } > { 'No' } </th>
                            <th style = { null } > { otherProp } </th>
                            <th style = { propStyle } > { 'Property' } </th>
                            <th style = { valueStyle } > { theListTitle } </th>
                            <th style = { valueStyle } > { otherListTitle } </th>
                        </tr>;
                    tableRows.push( tableHeaders );
                    if ( allTableRows.length === 0 ) { allTableRows.push( tableHeaders ) ; }
                    if ( summaryRows.length === 0 ) { summaryRows.push( tableHeaders ) ; }

                    let isNewItem = true;
                    Object.keys(compareResultsItem.keyChanges).map( ( key, index ) => {
                        if ( isNewItem === true ) { summaryIndex ++ ; }
                        let thisRowStyle = isNewItem === true ? { borderTop: '1px dashed darkgray', paddingTop: '5px' } : null;
                        
                        // comparedProps.push(key);
                        let theseValues = compareResultsItem.keyChanges[key].split( ' >>> ' );
                        let value0 = theseValues[0] === 'undefined' ? '-' : theseValues[0] === 'null' ? '-null-' : theseValues[0];
                        let value1 = theseValues[1] === 'undefined' ? '-' : theseValues[1] === 'null' ? '-null-' : theseValues[1];
                        let value0Exists = true;
                        let value1Exists = true;
                        if ( value0 === DoesNotExistLabel ) { value0Exists = false; value0 = <span style={{fontWeight: 'bolder'}}><mark> { value0 } </mark></span> ; }
                        if ( value1 === DoesNotExistLabel ) { value1Exists = false; value1 = <span style={{fontWeight: 'bolder'}}><mark> { value1 } </mark></span> ; }

                        let bothExist = value0Exists === true && value1Exists === true ? true : false;

                        let thisProp = <tr style={ thisRowStyle }>
                                <td style = { styleNo } > { summaryIndex + '.' + ( index + 1 ) } </td> 
                                <td title={ fullTitle } style = { titleStyle } > { isNewItem === true ? itemTitle : null } </td>
                                <td style = { propStyle } > { key } </td>
                                <td style = { valueStyle } > { value0 } </td>
                                <td style = { valueStyle } > { value1 } </td>
                            </tr>;
                        tableRows.push( thisProp );
                        allTableRows.push( thisProp );

                        if ( isNewItem === true ) { 
                            let thisPropDiff = <tr style={ thisRowStyle }>
                                <td style = { styleNo } > { summaryIndex } </td> 
                                <td title={ fullTitle } style = { titleStyle } > { isNewItem === true ? itemTitle : null } </td>
                                {/* passingParams:  https://reactjs.org/docs/faq-functions.html */}
                                <td style = { seeDetailsStyle } onClick={ () => this.setItemFilter( fullTitle ) }> { 'See Details' } </td>
                                <td style = { valueStyle } > { bothExist === true ? 'is different' : value0Exists ? 'Exists' : value0 } </td>
                                <td style = { valueStyle } > { bothExist === true ? 'is different' : value1Exists ? 'Exists' : value1 } </td>
                            </tr>;
                            summaryRows.push( thisPropDiff );
                         }

                        isNewItem = false;
                    });
                }
    
                compareArray.push( tableRows );

            } else {
                console.log( pair.obj1.title + ' was filtered out using Item Filtering' ) ;
            }


            

            // } else {
            //     console.log('CANT COMPARE THESE:', pair.obj1.obj , pair.obj2.obj);
            //     //Need to decide what to do with unmatched items.
            //     //Maybe just place the obj1 in and leave it.  
            //     //Will need to modify the compareFlatObjects to auto-correct for that
            // }
        });

        this.setState({ 
            showTab: itemKey, 
            comparedProps: allTableRows, compareResults: compareResults, compareArray: compareArray, 
            summaryRows: summaryRows,
            ignoreKeys: ignoreKeys, includeOrIgnoreKeys: includeOrIgnoreKeys,
            ignoreItems: ignoreItems, includeOrIgnoreItems: includeOrIgnoreItems,
            json1PropCount: json1PropCount, json2PropCount: json2PropCount
        });

    }

    /**
     * Move this function to compare.ts
     */

    private updateCompareFlat ( itemKey: string, ignoreKeys: string[], includeOrIgnoreKeys: IIncludeOrIgnore, includeOrIgnoreItems: IIncludeOrIgnore ) {

        let compareResults: ICompareKeysResult = compareFlatObjects( this.props.json1, this.props.json2, ignoreKeys, includeOrIgnoreKeys );
        let compareStyle = 'table'; //'table','text','json';

        let tableRows: any = [];
        // let comparedProps: string[] = [];
        let theListTitle = this.props.theList.Title;
        let otherListTitle = this.state.otherList;
        if ( this.props.theList.ParentWebUrl !== this.state.otherWeb && this.state.otherWeb !== null && this.state.otherWeb.length !== 0 ) {
            theListTitle += ` - on:  ${ this.props.theList.ParentWebUrl.replace('/sites','') }`;
            otherListTitle += ` - on:  ${ this.state.otherWeb.replace('/sites','') }`;
        }

        if ( compareStyle === 'table' ) {

            let tableHeaders = <tr> { ['No','Property', theListTitle, otherListTitle ].map( h=> { return <th> { h } </th>; }) } </tr>;
            tableRows.push( tableHeaders );
            Object.keys(compareResults.keyChanges).map( ( key, index ) => {
                // comparedProps.push(key);
                let theseValues = compareResults.keyChanges[key].split( ' >>> ' );
                let value0 = theseValues[0] === 'undefined' ? '-' : theseValues[0] === 'null' ? '-null-' : theseValues[0];
                let value1 = theseValues[1] === 'undefined' ? '-' : theseValues[1] === 'null' ? '-null-' : theseValues[1];
                let thisProp = <tr>
                        <td> { index + 1 } </td>
                        <td style={{ maxWidth: '200px' }}> { key } </td>
                        <td> { value0 } </td>
                        <td> { value1 } </td>
                    </tr>;
                tableRows.push( thisProp );
            });
        }

        let json1PropCount = Object.keys(this.props.json1).length;
        let json2PropCount = Object.keys(this.props.json2).length;

        this.setState({ 
            showTab: itemKey, 
            comparedProps: tableRows, 
            compareResults: compareResults, compareArray: [], 
            ignoreKeys: ignoreKeys, includeOrIgnoreKeys: includeOrIgnoreKeys,
            json1PropCount: json1PropCount, json2PropCount: json2PropCount
          });
    }
}
