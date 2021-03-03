import * as React from 'react';
import { sp, Views, IViews, IWebInfo, Web } from "@pnp/sp/presets/all";

// For Pivot VVVV
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';
import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
// For Pivot ^^^^

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { PageContext } from '@microsoft/sp-page-context';

import styles from '../contents.module.scss';

import { escape } from '@microsoft/sp-lodash-subset';

import { IPickedWebBasic, IMyPivots, IPivot,  ILink, IUser, IMyIcons, IMyFonts, IChartSeries, ICharNote, IMyPivCat } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import {  } from '../contentsComponent';

//import { analyticsList } from 'InspectThisSiteWebPartStrings';

import { makeSmallTimeObject, ITheTime, getAge, getBestTimeDelta} from '@mikezimm/npmfunctions/dist/dateServices';

import { cleanURL, camelize } from '@mikezimm/npmfunctions/dist/stringServices';

import { pivotOptionsGroup, } from '../../../../../services/propPane';
 
import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '@mikezimm/npmfunctions/dist/arrayServices';

import {  } from '../Fields/fieldsFunctions';

import { allSiteProps } from './thisSiteFunctions';

import { allWebProps } from './thisWebFunctions';

import MyLogProps from './thisSiteListView';

import { createLink } from '../../HelpInfo/AllLinks';

import { resultContent } from 'office-ui-fabric-react/lib/components/ExtendedPicker/PeoplePicker/ExtendedPeoplePicker.scss';

export const pivCats = {
    all: {title: 'All', desc: '', order: 1},
    basic: {title: 'Basic' , desc: '', order: 1},
    advanced:  {title: 'Advanced' , desc: '', order: 1},
    graph:  {title: 'Graph' , desc: '', order: 1},
    hub: {title: 'Hub', desc: '', order: 9 },
    nav: {title: 'Nav', desc: '', order: 9 },
    spo: {title: 'SPO', desc: '', order: 9 },
    legacy: {title: 'Legacy', desc: '', order: 9 },
    other: {title: 'Other', desc: '', order: 9 },
};

export interface IInspectThisSiteProps {
    // 0 - Context
    
    pageContext: PageContext;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.
    pickedWeb? : IPickedWebBasic;
    
    showPane?: boolean;
    allLoaded: boolean;

    currentUser: IUser;

    allowSettings?: boolean;
    allowRailsOff?: boolean;
    allowCrazyLink: boolean; //property that determines if some links not intended for public are visible, like permissions of SharePoint system lists

    showSettings?: boolean;  //property set by toggle to actually show or hide this content
    showRailsOff?: boolean;  //property set by toggle to actually show or hide this content

    WebpartHeight?: number;
    WebpartWidth?: number;

    // 2 - Source and destination list information

}

export const BasicProps = [
    "ServerRelativeUrl",
    "SiteLogoUrl",
    "Url",
    "WebTemplate",
    "Title",
    "Created",
    "Description",
    "WelcomePage",
    "EnableMinimalDownload",
    "Language",
    "IsMultilingual",
    "LastItemModifiedDate",
    "LastItemUserModifiedDate",
];

export const NavProps = [
    "MegaMenuEnabled",
    "NavAudienceTargetingEnabled",
    "QuickLaunchEnabled",
    "HorizontalQuickLaunch",
    "TreeViewEnabled",
];

export const SPOProps = [
    "IsHomepageModernized",
    "FooterEmphasis",
    "FooterEnabled",
    "FooterLayout",
    "HeaderEmphasis",
    "HeaderLayout",   
];

export const LegacyProps = [
    "ClassicWelcomePage",
    "MasterUrl",
];

export const GraphProps = [];

export const HubProps = [];

export const AdvProps = [
    "NoCrawl",
    "ObjectCacheEnabled",
    "OverwriteTranslationsOnChange",
    "RecycleBinEnabled",
    "DocumentLibraryCalloutOfficeWebAppPreviewersDisabled",
    "Configuration",
    "CustomMasterUrl",
    "DesignPackageId",
    "IsRevertHomepageLinkHidden",
    "SyndicationEnabled",
    "TenantAdminMembersCanShare",
    "Id",
    "CurrentChangeToken",
    "ResourcePath",
    "SearchScope",    
];

export interface IContentsSiteInfo {
    property: string;
    value: any;
    element?: HTMLElement;
    searchString: string;
    meta?: string[];
    sort: string;
    bucketCategory: string;
    bucketLabel: string;
    bucketIdx: any;

}


export interface ISitePropsBucketInfo {
    items: IContentsSiteInfo[];
    count: number;
    sort: string;
    bucketCategory: string;
    bucketLabel: string;

}

export interface IInspectThisSiteState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    tab?: string;

    searchCount: number;
    
    searchText: string;
    searchMeta: string;
    
    searchedItems: IContentsSiteInfo[];
    first20searchedItems: IContentsSiteInfo[];

    propBuckets: ISitePropsBucketInfo[];

    allItems: IContentsSiteInfo[];
    meta: string[];

    errMessage: string | JSX.Element;

    allLoaded: boolean;

    allowSettings: boolean;  //property that determines if the related toggle is visible or not
    allowRailsOff: boolean;  //property that determines if the related toggle is visible or not

    showSettings: boolean;  //property set by toggle to actually show or hide this content
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    WebpartHeight: number;
    WebpartWidth: number;

}

export default class InspectThisSite extends React.Component<IInspectThisSiteProps, IInspectThisSiteState> {

    private createSearchBuckets() {
        let result : ISitePropsBucketInfo[] = [
            { items: [], count: 0, sort : '0' , bucketCategory: 'All' , bucketLabel: 'Available props'} ,
//            { webs: [], count: 0, sort : '3' , bucketCategory: 'ReadOnly', bucketLabel: '3. ReadOnly - Calculated/Lookup?' } ,
//            { webs: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
//            { webs: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
        ];
        return result;
    }

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


    public constructor(props:IInspectThisSiteProps){
    super(props);

    let parentWeb = cleanURL(this.props.pickedWeb.url);

    let pickedWeb = null; //this.getThisWeb( parentWeb );

    let railsMode = this.props.allowRailsOff && this.props.showRailsOff ? true : false ;
    this.state = {

            //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
            WebpartHeight: this.props.WebpartHeight ,
            WebpartWidth:  this.props.WebpartWidth ,

            meta: [],

            allItems: [],
            propBuckets : this.createSearchBuckets(),
            searchedItems: [],
            first20searchedItems: [],
            searchCount: 0,

            searchMeta: 'All',
            searchText: '',

            errMessage: '',

            allLoaded: false,

            allowSettings: this.props.allowSettings === true ? true : false,
            allowRailsOff: this.props.allowRailsOff === true ? true : false,

            showRailsOff: railsMode ,
            showSettings: this.props.showSettings,

            tab: 'Lists',
    
    };
    }


    public componentDidMount() {
        this._updateStateOnPropsChange({});
        console.log('Mounted!');
    }


    //        
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

    public componentDidUpdate(prevProps){
        let rebuildPart = prevProps.pickedWeb.url === this.props.pickedWeb.url ? false : true;
        if (rebuildPart === true) {
        this._updateStateOnPropsChange({});
        }
    }

    public render(): React.ReactElement<IInspectThisSiteProps> {


/***
 *              d888888b db   db d888888b .d8888.      d8888b.  .d8b.   d888b  d88888b 
 *              `~~88~~' 88   88   `88'   88'  YP      88  `8D d8' `8b 88' Y8b 88'     
 *                 88    88ooo88    88    `8bo.        88oodD' 88ooo88 88      88ooooo 
 *                 88    88~~~88    88      `Y8b.      88~~~   88~~~88 88  ooo 88~~~~~ 
 *                 88    88   88   .88.   db   8D      88      88   88 88. ~8~ 88.     
 *                 YP    YP   YP Y888888P `8888Y'      88      YP   YP  Y888P  Y88888P 
 *                                                                                     
 *                                                                                     
 */

        console.log('renderStateWebs', this.state.allItems );

        let thisPage = null;

        let errMessage = this.state.errMessage === '' ? null : <div>
            { this.state.errMessage }
        </div>;

        // let logComponent = <div className={ styles.floatLeft }> {  // This format will put all tables horizontal
        let logComponent = <div> {
            this.state.propBuckets.map( bucket => {

                return <MyLogProps 
                    showSettings = { this.state.showSettings } railsOff= { this.state.showRailsOff }
                    items={ bucket }    specialAlt= { false }
                    searchMeta= { this.state.searchMeta } showRailsOff= { this.state.allowRailsOff } 
                    webURL = { this.props.pickedWeb.url } descending={false} titles={null} 
                    ></MyLogProps>;
            })

        }

        </div>;

        /*https://developer.microsoft.com/en-us/fabric#/controls/web/searchbox*/
        let searchBox =  
        <div className={[styles.searchContainer, styles.padLeft20 ].join(' ')} >
        <SearchBox
            className={styles.searchBox}
            styles={{ root: { maxWidth: this.props.allowRailsOff === true ? 200 : 300 } }}
            placeholder="Search"
            onSearch={ this._searchForItems.bind(this) }
            onFocus={ () => console.log('this.state',  this.state) }
            onBlur={ () => console.log('onBlur called') }
            onChange={ this._searchForItems.bind(this) }
        />
        <div className={styles.searchStatus}>
            { 'Searching ' + this.state.searchCount + ' props' }
            { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
        </div>
        </div>;

        let disclaimers = <h3>Properties for { this.props.pickedWeb.title} located here: { createLink( this.props.pickedWeb.url, '_blank', this.props.pickedWeb.url )  }</h3>;

        const stackPageTokens: IStackTokens = { childrenGap: 10 };

        let propPivots = this.createPivotObject(this.state.searchMeta, '');

        let settings = this.state.showSettings ? this.getSiteSettingsLinks() : null;

        let noInfo = [];
        noInfo.push( <h3>{'Found ' + this.state.searchCount + ' items with this search criteria:'}</h3> )  ;
        if ( this.state.searchText != '' ) { noInfo.push( <p>{'Search Text: ' + this.state.searchText}</p> )  ; }
        if ( this.state.searchMeta != '' ) { noInfo.push( <p>{'Refiner: ' + this.state.searchMeta}</p> ) ; }

        thisPage = null;
        console.log('InspectThisSite state:', this.state );

        thisPage = <div className={styles.contents}><div><div>{ disclaimers }</div>

        <div className={ this.state.errMessage === '' ? styles.hideMe : styles.showErrorMessage  }>{ this.state.errMessage } </div>

        <Stack horizontal={true} wrap={true} horizontalAlign={"space-between"} verticalAlign= {"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Webs */}
            { searchBox } {  }
        </Stack>

        <div> { settings } </div>

        <div style={{ height:30, paddingBottom: 15} }> { propPivots } </div>

        <div>

        <div className={ this.state.searchCount !== 0 ? styles.hideMe : styles.showErrorMessage  }>{ noInfo } </div>

        <Stack horizontal={false} wrap={true} horizontalAlign={"stretch"} tokens={stackPageTokens}>{/* Stack for Buttons and Webs */}
            { logComponent }
        </Stack>
        </div></div></div>;


        /***
        *              d8888b. d88888b d888888b db    db d8888b. d8b   db 
        *              88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
        *              88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
        *              88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
        *              88 `88. 88.        88    88b  d88 88 `88. 88  V888 
        *              88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
        *                                                                 
        *                                                                 
        */

        return (
            <div className={ styles.contents }>
            <div className={ styles.container }>
            <div className={ styles.rightPivot }>
                    { thisPage }
            </div></div></div>
        );

    } //End PUBLIC RENDER


        /**
     * This puts all the webs into the buckets
     * @param allProps 
     * @param propBuckets 
     */
    private bucketProps( allProps : IContentsSiteInfo[], propBuckets : ISitePropsBucketInfo[] ) {

        for (let i in allProps ) {
            propBuckets[allProps[i].bucketIdx].items.push( allProps[i] );
            propBuckets[allProps[i].bucketIdx].count ++;
        }
        console.log('bucketProps:  propBuckets', propBuckets);

        return propBuckets;
    }
    
/***
 *         .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db 
 *         88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88 
 *         `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88 
 *           `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88 
 *         db   8D 88.     88   88 88 `88. Y8b  d8 88   88 
 *         `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP 
 *                                                         
 *                                                         
 */

public _onSearchForMeta = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log('searchForItems: e',e);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);

    //Be sure to pass item.props.itemKey to get filter value
    this.searchForProps( this.state.searchText, item.props.itemKey, false );
  }

  public _searchForItems = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log('searchForItems: e',e);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);

    this.searchForProps( item, this.state.searchMeta, true );
  }
  
  public searchForProps = (text: string, meta: string , resetSpecialAlt: boolean ): void => {

    let searchItems : IContentsSiteInfo[] = this.state.allItems;
    let searchCount = searchItems.length;

    let propBuckets : ISitePropsBucketInfo[] = this.createSearchBuckets();

    let newFilteredItems : IContentsSiteInfo[] = this.getNewFilteredItems( text, meta, searchItems );

    propBuckets  = this.bucketProps( newFilteredItems, propBuckets );

    console.log('Searched for:' + text);
    console.log('Web Meta:' + meta);
    console.log('and found these webs:', newFilteredItems);
    searchCount = newFilteredItems.length;

    this.setState({
      searchedItems: newFilteredItems,
      searchCount: searchCount,
      propBuckets: propBuckets,
      searchText: text.toLowerCase(),
      searchMeta: meta,
//      specialAlt: resetSpecialAlt === true || this.state.searchMeta !== meta ? false : !this.state.specialAlt , 
    });


    return ;
    
  } //End searchForItems

  private getNewFilteredItems(text: string, meta: string , searchItems : IContentsSiteInfo[] ) {

    let newFilteredItems : IContentsSiteInfo[] = [];

    for (let thisSearchItem of searchItems) {

        let searchString = thisSearchItem.searchString;
        let webMeta = thisSearchItem.meta;
  
        if ( meta === undefined || meta == null || meta == '' || webMeta.indexOf(meta) > -1 ) {
          if( searchString.indexOf(text.toLowerCase()) > -1 ) {
            newFilteredItems.push(thisSearchItem);
            }
        }
      }

      return newFilteredItems;

  }

  
/***
 *         db    db d8888b. d8888b.  .d8b.  d888888b d88888b      .d8888. d888888b  .d8b.  d888888b d88888b 
 *         88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
 *         88    88 88oodD' 88   88 88ooo88    88    88ooooo      `8bo.      88    88ooo88    88    88ooooo 
 *         88    88 88~~~   88   88 88~~~88    88    88~~~~~        `Y8b.    88    88~~~88    88    88~~~~~ 
 *         88b  d88 88      88  .8D 88   88    88    88.          db   8D    88    88   88    88    88.     
 *         ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      `8888Y'    YP    YP   YP    YP    Y88888P 
 *                                                                                                          
 *                                                                                                          
 */

 
    private _updateStateOnPropsChange(params: any ): void {
        this.getPropDefs();
        console.log('_updateStateOnPropsChange');
    }


    private getPropDefs() {
        let listGuid = '';
        if ( this.props.pickedWeb && this.props.pickedWeb.guid ) { listGuid = this.props.pickedWeb.guid; }
    //    let resultWeb : any = allWebProps( this.props.pickedWeb.url, this.state.propBuckets, this.addThesePropsToState.bind(this), null, null );
        let resultSite : any = allWebProps( this.props.pickedWeb.url, this.createSearchBuckets(), this.addThesePropsToState.bind(this), null, null );

    }

    private addThesePropsToState( allProps, scope : 'Web' | 'Site' , errMessage : string ) {

        let newFilteredItems : IContentsSiteInfo[] = this.getNewFilteredItems( '', this.state.searchMeta, allProps );

        let propBuckets  : ISitePropsBucketInfo[] = this.bucketProps( newFilteredItems, this.createSearchBuckets() );
        
        this.setState({
            allItems: allProps,
            searchedItems: newFilteredItems,
            searchCount: newFilteredItems.length,
            errMessage: errMessage,
            propBuckets: propBuckets,
            searchText: '',
            searchMeta: this.state.searchMeta,
        });
        return true;
        
    }


       
        /***
     *         d8888b. d888888b db    db  .d88b.  d888888b .d8888. 
     *         88  `8D   `88'   88    88 .8P  Y8. `~~88~~' 88'  YP 
     *         88oodD'    88    Y8    8P 88    88    88    `8bo.   
     *         88~~~      88    `8b  d8' 88    88    88      `Y8b. 
     *         88        .88.    `8bd8'  `8b  d8'    88    db   8D 
     *         88      Y888888P    YP     `Y88P'     YP    `8888Y' 
     *                                                             
     *                                                             
     */


    public createPivotObject(setPivot, display){

        let theseStyles = null;

        let pivotWeb = 
        <Pivot 
        style={{ flexGrow: 1, paddingLeft: '10px', display: display }}
        styles={ theseStyles }
        linkSize= { pivotOptionsGroup.getPivSize('normal') }
        linkFormat= { pivotOptionsGroup.getPivFormat('links') }
        onLinkClick= { this._onSearchForMeta.bind(this) }  //{this.specialClick.bind(this)}
        selectedKey={ setPivot }
        headersOnly={true}>
            {this.getPropPivots()}
        </Pivot>;
        return pivotWeb;
    }

    private getPropPivots() {

        let pivKeys: string[] = pivCats === null || pivCats === undefined ? [] : Object.keys(pivCats);

        let thesePivots = pivKeys.map( thisKey => {
            return this.buildFilterPivot(pivCats[thisKey]);
        });
        
        return thesePivots;
    }

    private buildFilterPivot(pivCat: IMyPivCat) {
        let p = <PivotItem 
            headerText={ pivCat.title }
            itemKey={ pivCat.title }
            >
            { pivCat.desc }
        </PivotItem>;

        return p;
    }

    private getSiteSettingsLinks() {

        let listGUID = this.props.pickedWeb.guid;
        let stackSettingTokens = { childrenGap: 20 };

        let settingLinks = <div style={{ padding: 15, fontSize: 'large', }}>
                <Stack horizontal={true} wrap={true} horizontalAlign={"start"} tokens={stackSettingTokens}>{/* Stack for Buttons and Webs */}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/ListEdit.aspx?List=(" + listGUID + ")" ,'_blank', 'List Settings' )}
                    { createLink( this.props.pickedWeb.url + "/_layouts/15/ListGeneralSettings.aspx?List=(" + listGUID + ")" ,'_blank', 'Title' )}


                </Stack>
        </div>;

        return settingLinks;

    }

}
