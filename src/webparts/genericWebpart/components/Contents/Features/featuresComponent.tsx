import * as React from 'react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';

import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteUserProps, ISiteUser, IFeatures, Features, IFeatureInfo } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import "@pnp/sp/site-users";
import { ISiteUserInfo } from '@pnp/sp/site-users/types';

import { IWebAddResult, IWebInfo, IWeb, } from "@pnp/sp/webs/types";

import "@pnp/sp/webs";

import { allAvailableFeatures } from './featuresFunctions';
import {  } from './featuresFunctions';

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../../services/arrayServices';

import { ITheTime } from '../../../../../services/dateServices';

import { IGenericWebpartProps } from '../../IGenericWebpartProps';
import { IGenericWebpartState } from '../../IGenericWebpartState';

import { IPickedWebBasic } from '../contentsComponent';

import styles from '../contents.module.scss';

import { IMyProgress, IUser } from '../../IReUsableInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { createAdvancedContentChoices } from '../../fields/choiceFieldBuilder';

import { IContentsToggles, makeToggles } from '../../fields/toggleFieldBuilder';

import { createLink } from '../../HelpInfo/AllLinks';

import { PageContext } from '@microsoft/sp-page-context';
import { IMyPivots, IPivot,  } from '../../IReUsableInterfaces';
import { pivotOptionsGroup, } from '../../../../../services/propPane';

import MyLogFeature from './featuresListView';

import * as links from '../../HelpInfo/AllLinks';

import { getHelpfullError, } from '../../../../../services/ErrorHandler';
import { getRandomInt } from '../../ListProvisioning/ListsTMT/ItemsWebPart';

export interface IMyPivCat {
    title: string;
    desc: string;
    order: number;
}

export const pivCats = {
    all: {title: 'All', desc: '', order: 1},
    associatedGroups: {title: 'Associated' , desc: '', order: 1},
    system:  {title: 'System' , desc: '', order: 1},
    security: {title: 'Security', desc: '', order: 9 },
    sharepoint: {title: 'SharePoint', desc: '', order: 9 },
    visible: {title: 'Visible', desc: '', order: 9 },
    notvisible: {title: 'NotVisible', desc: '', order: 9 },
    hidden: {title: 'Hidden', desc: '', order: 9 },
    oGroups: {title: 'O', desc: '', order: 9 },
    mGroups: {title: 'M', desc: '', order: 9 },
    vGroups: {title: 'V', desc: '', order: 9 },
    empty: {title: 'Empty', desc: '', order: 9 },
    other: {title: 'Other', desc: '', order: 9 },
};


//export interface IContentsFeatureInfo extends Partial<ISiteFeatureInfo>{
    export interface IContentsFeatureInfo extends Partial<IFeatureInfo> {

    name?: string;
    sort: string;
    bucketCategory: string;
    bucketLabel: string;
    bucketIdx: any;
    searchString: string;
    meta: string[];
    typeString: string;

}


export interface IInspectFeaturesProps {
    // 0 - Context
    
    pageContext: PageContext;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    allowRailsOff?: boolean;
    allowSettings?: boolean;

    webURL?: string;

    showPane: boolean;

    allLoaded: boolean;

    currentUser: IUser;

    pickedWeb? : IPickedWebBasic;

    // 2 - Source and destination list information

}

export interface IMyHistory {
    count: number;
    errors: IMyProgress[];
    features: IMyProgress[];

}

export interface IFeatureBucketInfo {
    features: IContentsFeatureInfo[];
    count: number;
    sort: string;
    bucketCategory: string;
    bucketLabel: string;

}

export interface IInspectFeaturesState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    webURL?: string;

    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    currentPage: string;
    searchCount: number;
    
    searchText: string;
    searchMeta: string;

    searchedItems: IContentsFeatureInfo[];
    first20searchedItems: IContentsFeatureInfo[];

    featureBuckets: IFeatureBucketInfo[];
    // 2 - Source and destination list information
    allFeatures: IContentsFeatureInfo[];

    blueBar: string;
    meta: string[];

    allowSettings: boolean;  //property that determines if the related toggle is visible or not
    allowRailsOff: boolean;  //property that determines if the related toggle is visible or not

    showUsers: boolean;

    showDesc: boolean;      //property set by toggle to actually show or hide this content
    showSettings: boolean;  //property set by toggle to actually show or hide this content
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    showMinWebs: boolean;

    errMessage: string | JSX.Element;

    specialAlt: boolean;

}

export default class InspectFeatures extends React.Component<IInspectFeaturesProps, IInspectFeaturesState> {

    private createSearchBuckets() {
        let result : IFeatureBucketInfo[] = [
            { features: [], count: 0, sort : '0' , bucketCategory: 'All' , bucketLabel: '0. All Subsites'} ,
//            { features: [], count: 0, sort : '3' , bucketCategory: 'ReadOnly', bucketLabel: '3. ReadOnly - Calculated/Lookup?' } ,
//            { features: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
//            { features: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
        ];
        return result;
    }
    private clearHistory() {
        let history: IMyHistory = {
            count: 0,
            errors: [],
            features: [],
        };
        return history;

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

    public constructor(props:IInspectFeaturesProps){
        super(props);

        this.state = { 

            allowOtherSites: this.props.allowOtherSites === true ? true : false,
            currentPage: 'Click Button to start',
            progress: null,
            history: this.clearHistory(),
            allLoaded: false,

            allFeatures: [],
            searchedItems: [],
            first20searchedItems: [],
            searchCount: 0,

            featureBuckets : this.createSearchBuckets(),

            meta: [],
            blueBar: null,

            webURL: this.props.webURL,

            allowSettings: this.props.allowSettings === true ? true : false,
            allowRailsOff: this.props.allowRailsOff === true ? true : false,

            showUsers: false,
            showDesc: false,
            showSettings: false,
            showRailsOff: false,

            searchMeta: pivCats.all.title,
            searchText: '',

            errMessage: '',

            showMinWebs: false,

            specialAlt: false,
        
        };

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);

    }

  public componentDidMount() {
    this._updateStateOnPropsChange();
    console.log('Mounted!');
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

  public componentDidUpdate(prevProps){

    if ( prevProps.webURL != this.props.webURL || prevProps.pickedWeb != this.props.pickedWeb ) {
        this._updateStateOnPropsChange();
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

    public render(): React.ReactElement<IInspectFeaturesProps> {


        let x = 1;
        if ( x === 1 ) {

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

            console.log('renderStateGroups', this.state.allFeatures );

            let thisPage = null;

            let errMessage = this.state.errMessage === '' ? null : <div>
                { this.state.errMessage }
            </div>;

//          let webFeature = <div className={ styles.floatLeft }> {  // This format will put all tables horizontal
            let webFeature = <div> {
                this.state.featureBuckets.map( bucket => {

                    return <MyLogFeature 
                        showSettings = { this.state.showSettings } railsOff= { this.state.showRailsOff }
                        showUsers = { this.state.showUsers } blueBar={ this.state.blueBar }
                        items={ bucket }    specialAlt= { this.state.specialAlt }
                        searchMeta= { this.state.searchMeta } showDesc = { this.state.showDesc } showRailsOff= { this.state.showDesc } 
                        webURL = { this.state.webURL } descending={false} titles={null} 
                        ></MyLogFeature>;
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
                { 'Searching ' + this.state.searchCount + ' features' }
                { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
              </div>
            </div>;

            let disclaimers = <h3>Subsites for { this.props.pickedWeb.title} located here: { createLink( this.props.webURL, '_blank', this.props.webURL )  }</h3>;
            
            let xyz = <div>
                <h3>Next steps</h3>
                <ul>
                    <li>Icons in first web for meta tags</li>
                    <li>See if there are any other parts of the webpart def object that might be helpful</li>
                </ul>
            </div>;

            const stackPageTokens: IStackTokens = { childrenGap: 10 };

            let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles()) } </div>;

            let featurePivots = this.createPivotObject(this.state.searchMeta, '');

//            let settings = this.state.showSettings ? this.getSiteSettingsLinks() : null;
            let settings = null;

            let noInfo = [];
            noInfo.push( <h3>{'Found ' + this.state.searchCount + ' items with this search criteria:'}</h3> )  ;
            if ( this.state.searchText != '' ) { noInfo.push( <p>{'Search Text: ' + this.state.searchText}</p> )  ; }
            if ( this.state.searchMeta != '' ) { noInfo.push( <p>{'Refiner: ' + this.state.searchMeta}</p> ) ; }

            let showProgress = false;
            if ( this.state.progress != null && this.state.progress.progressHidden === false ) { 
                showProgress = this.state.progress.percentComplete === 100 ? false : true; }

            let myProgress = showProgress === false ? null : <ProgressIndicator
                label={this.state.progress.label}
                description={this.state.progress.description}
                percentComplete={this.state.progress.percentComplete}
                progressHidden={this.state.progress.progressHidden}/>;

            thisPage = <div className={styles.contents}><div><div>{ disclaimers }</div>

                <div className={ this.state.errMessage === '' ? styles.hideMe : styles.showErrorMessage  }>{ errMessage } </div>
                <div className={ showProgress === true ? styles.showSearch : styles.hideSearch}> { myProgress }</div>
                <Stack horizontal={true} wrap={true} horizontalAlign={"space-between"} verticalAlign= {"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Webs */}
                     { searchBox } { toggles }
                </Stack>

                <div> { settings } </div>

                <div style={{ height:30, paddingBottom: 15} }> { featurePivots } </div>

                <div className={ this.state.searchCount !== 0 ? styles.hideMe : styles.showErrorMessage  }>{ noInfo } </div>

                <Stack horizontal={false} wrap={true} horizontalAlign={"stretch"} tokens={stackPageTokens}>{/* Stack for Buttons and Webs */}
                    { webFeature }
                </Stack>

                </div></div>;

                if ( this.state.allFeatures.length === 0 ) {
                    thisPage = <div style={{ paddingBottom: 30 }}className={styles.contents}>
                    { errMessage }</div>;
                }

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
            
        } else {
            console.log('provisionPage.tsx return null');
            return (  <div className={ styles.contents }>
                <h2>There are no Features to see</h2>
            </div> );
        }

    }   //End Public Render


    private getFeatureDefs( showUsers = null ) {
        let listGuid = '';
        if ( showUsers === null ) { showUsers = this.state.showUsers; }
        if ( this.props.pickedWeb && this.props.pickedWeb.guid ) { listGuid = this.props.pickedWeb.guid; }
        let result : any = allAvailableFeatures( this.state.webURL, this.state.featureBuckets, this.addTheseFeaturesToState.bind(this), this.setProgress.bind(this), this.markComplete.bind(this) );

    }

    private addTheseFeaturesToState( allFeatures, scope : 'Web' | 'Web' , errMessage : string ) {

        let newFilteredItems : IContentsFeatureInfo[] = this.getNewFilteredItems( '', this.state.searchMeta, allFeatures );

        let featureBuckets  : IFeatureBucketInfo[] = this.bucketFeatures( newFilteredItems, this.state.featureBuckets );
        
        this.setState({
            allFeatures: allFeatures,
            searchedItems: newFilteredItems,
            searchCount: newFilteredItems.length,
            errMessage: errMessage,
            featureBuckets: featureBuckets,
            searchText: '',
            searchMeta: this.state.searchMeta,
        });
        return true;
    }

    /**
     * This puts all the features into the buckets
     * @param allFeatures 
     * @param featureBuckets 
     */
    private bucketFeatures( allFeatures : IContentsFeatureInfo[], featureBuckets : IFeatureBucketInfo[] ) {

        for (let i in allFeatures ) {
            featureBuckets[allFeatures[i].bucketIdx].features.push( allFeatures[i] );
            featureBuckets[allFeatures[i].bucketIdx].count ++;
        }
        console.log('bucketFeatures:  featureBuckets', featureBuckets);

        return featureBuckets;
    }

    private markComplete() {

        this.setState({
            currentPage: 'Finished ' + this.state.currentPage,
        });

    }

   /**
    * 
    * @param progressHidden 
    * @param page : page you want to add this to 'E' | 'C' | 'V' | 'I'
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in page
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
    */
  private setProgress(progressHidden: boolean, page: 'E' | 'C' | 'V' | 'I', current: number , ofThese: number, color: string, icon: string, logLabel: string, label: string, description: string, ref: string = null ){
    let thisTime = new Date().toLocaleTimeString();
    const percentComplete = ofThese !== 0 ? current/ofThese : 0;

    logLabel = current > 0 ? current + '/' + ofThese + ' - ' + logLabel : logLabel ;
    let progress: IMyProgress = {
        ref: ref,
        time: thisTime,
        logLabel: logLabel,
        label: label + '- at ' + thisTime,
        description: description,
        percentComplete: percentComplete,
        progressHidden: progressHidden,
        color: color,
        icon: icon,
      };

    //console.log('setting Progress:', progress);

    let history: IMyHistory = this.state.history;
    //let newHistory = null;
    

    if ( history === null ){

    } else {
        history.count ++;
        if ( page === 'E') {
            history.errors = history.errors.length === 0 ? [progress] : [progress].concat(history.errors);
        } else if ( page === 'C') {
            history.features = history.features.length === 0 ? [progress] : [progress].concat(history.features);
        }
    }

    this.setState({
        progress: progress,
        history: history,
    });

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
    this.searchForFeatures( this.state.searchText, item.props.itemKey, false );
  }

  public _searchForItems = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log('searchForItems: e',e);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);

    this.searchForFeatures( item, this.state.searchMeta, true );
  }
  
  
  public searchForFeatures = (text: string, meta: string , resetSpecialAlt: boolean ): void => {

    let searchItems : IContentsFeatureInfo[] = this.state.allFeatures;
    let searchCount = searchItems.length;

    let featureBuckets : IFeatureBucketInfo[] = this.createSearchBuckets();

    let newFilteredItems : IContentsFeatureInfo[] = this.getNewFilteredItems( text, meta, searchItems );

    let blueBar = meta != null ? meta : null;

    featureBuckets  = this.bucketFeatures( newFilteredItems, featureBuckets );

    console.log('Searched for:' + text);
    console.log('Web Meta:' + meta);
    console.log('and found these features:', newFilteredItems);
    searchCount = newFilteredItems.length;

    this.setState({
      searchedItems: newFilteredItems,
      searchCount: searchCount,
      blueBar: blueBar,
      featureBuckets: featureBuckets,
      searchText: text.toLowerCase(),
      searchMeta: meta,
      specialAlt: resetSpecialAlt === true || this.state.searchMeta !== meta ? false : !this.state.specialAlt , 
    });


    return ;
    
  } //End searchForFeatures

  private getNewFilteredItems(text: string, meta: string , searchItems : IContentsFeatureInfo[] ) {

    let newFilteredItems : IContentsFeatureInfo[] = [];

    for (let thisSearchItem of searchItems) {

        let searchString = thisSearchItem.searchString;
        let featureMeta = thisSearchItem.meta;
  
        if ( meta === undefined || meta == null || meta == '' || featureMeta.indexOf(meta) > -1 ) {
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

    private _updateStateOnPropsChange(): void {
        this.getFeatureDefs();
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
            {this.getFeaturePivots()}
        </Pivot>;
        return pivotWeb;
      }

    private getFeaturePivots() {

        let all = this.buildFilterPivot( pivCats.all );
        let associatedGroups = this.buildFilterPivot(pivCats.associatedGroups);

        let system = this.buildFilterPivot(pivCats.system);
        let security = this.buildFilterPivot(pivCats.security);
        let sharepoint = this.buildFilterPivot(pivCats.sharepoint);
        let other = this.buildFilterPivot(pivCats.other);

        let empty = this.buildFilterPivot(pivCats.empty);
        let visible = this.buildFilterPivot(pivCats.visible);
        let notVisible = this.buildFilterPivot(pivCats.notvisible);
        let hidden = this.buildFilterPivot(pivCats.hidden);
        
        //let thesePivots = [all, , , , , security, sharepoint, other,visible,  system, notVisible, hidden ];
        let thesePivots = [ all ];

        if ( this.state.showUsers === true ) { thesePivots.push(empty); }
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

    private getPageToggles() {

        let togDesc = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Description</span>,
            key: 'togggleDescription',
            _onChange: this.updateTogggleDesc.bind(this),
            checked: this.state.showDesc,
            onText: '-',
            offText: '-',
            className: '',
            styles: '',
        };

        let togUsers = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Users</span>,
            key: 'togggleUsers',
            _onChange: this.updateTogggleUsers.bind(this),
            checked: this.state.showUsers,
            onText: '',
            offText: '',
            className: '',
            styles: '',
        };

        let togSet = {
            //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
            label: <span>Settings</span>,
            key: 'togggleSettings',
            _onChange: this.updateTogggleSettings.bind(this),
            checked: this.state.showSettings,
            onText: '-',
            offText: '-',
            className: '',
            styles: '',
        };


        //let theseToggles = [togDesc, togSet ];
        //if ( this.props.allowRailsOff === true ) { theseToggles.push( togXML, togJSON, togSPFx, togRails ); }
        let theseToggles = [ togSet ];

        let pageToggles : IContentsToggles = {
            toggles: theseToggles,
            childGap: this.props.allowRailsOff === true ? 30 : 30,
            vertical: false,
            hAlign: 'end',
            vAlign: 'start',
            rootStyle: { width: this.props.allowRailsOff === true ? 120 : 120 , paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
        };

        return pageToggles;

    }

    private updateTogggleDesc() {
        this.setState({
            showDesc: !this.state.showDesc,
        });
    }

    private updateTogggleUsers() {

        let showUser = this.state.showUsers === true ? false : true;

        this.setState({
            showUsers: !this.state.showUsers,
        });

        this.getFeatureDefs(showUser);

    }

    private updateTogggleSettings() {
        this.setState({
            showSettings: !this.state.showSettings,
        });
    }

    private updateTogggleRailsOff() {
        this.setState({
            showRailsOff: !this.state.showRailsOff,
        });
    }

    private getSiteSettingsLinks() {

        let listGUID = this.props.pickedWeb.guid;
        let stackSettingTokens = { childrenGap: 20 };

        let settingLinks = <div style={{ padding: 15, fontSize: 'large', }}>
                <Stack horizontal={true} wrap={true} horizontalAlign={"start"} tokens={stackSettingTokens}>{/* Stack for Buttons and Webs */}
                    { createLink( this.state.webURL + "/_layouts/15/ListEdit.aspx?List=(" + listGUID + ")" ,'_blank', 'List Settings' )}
                    { createLink( this.state.webURL + "/_layouts/15/ListGeneralSettings.aspx?List=(" + listGUID + ")" ,'_blank', 'Title' )}

                </Stack>
        </div>;

        return settingLinks;

    }
}