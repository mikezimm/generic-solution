import * as React from 'react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';

import { sp } from "@pnp/sp";
import { Web, Lists } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import { IValidTemplate, allAvailableWebParts } from './partsFunction';
import { IListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import styles from '../contents.module.scss';

import { IMyProgress, IUser, IPickedWebBasic } from '../../IReUsableInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { pivotOptionsGroup, } from '../../../../../services/propPane';

import { IContentsToggles, makeToggles } from '../../fields/toggleFieldBuilder';

import { PageContext } from '@microsoft/sp-page-context';

import MyLogList from './partsListView';

import * as links from '../../HelpInfo/AllLinks';

import { IWPart,  } from './partsFunction';

import { getHelpfullError, } from '@mikezimm/npmfunctions/dist/ErrorHandler';

import { addItemToArrayIfItDoesNotExist, } from '@mikezimm/npmfunctions/dist/arrayServices';

import { getRandomInt } from '../../ListProvisioning/ListsTMT/ItemsWebPart';

export interface IMyPivCat {
    title: string;
    desc: string;
    order: number;
}

export const pivCats = {

    visible: {title: 'Visible', desc: '', order: 1},
    base: {title: 'Base', desc: '', order: 1},   
    mixed: {title: 'Mixed', desc: '', order: 9 },
    conn: {title: 'Connectors', desc: '', order: 9 },
    media: {title: 'Media', desc: '', order: 9 },
    dev: {title: 'Development', desc: '', order: 9 },
    corp: {title: 'Corporate', desc: '', order: 9 },
    msft: {title: 'MSFT', desc: '', order: 9 },
    open: {title: 'Open Source', desc: '', order: 9 },
    hidden: {title: 'Hidden', desc: '', order: 9 },
    classic: {title: 'Classic', desc: '', order: 9 },    

    other: {title: 'Other', desc: '', order: 9 },

};

export interface IInspectPartsProps {
    // 0 - Context
    
    pageContext: PageContext;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    showPane: boolean;
    allLoaded: boolean;

    currentUser: IUser;

    pickedWeb? : IPickedWebBasic;

    // 2 - Source and destination list information

}

export interface IMyHistory {
    count: number;
    errors: IMyProgress[];
    columns: IMyProgress[];
    views: IMyProgress[];
    items: IMyProgress[];

}


export interface IPartsBucketInfo {
    parts: IWPart[];
    count: number;
    sort: string;
    bucketCategory: string;
    bucketLabel: string;

}

export interface IInspectPartsState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    currentPage: string;
    searchCount: number;
    
    searchText: string;
    searchMeta: string;

    searchedItems: IWPart[];
    first20SearchedParts: IWPart[];

    partBuckets: IPartsBucketInfo[];
    // 2 - Source and destination list information
    allParts: IWPart[];

    blueBar: string;
    meta: string[];

    errMessage: string | JSX.Element;

    showIDs: boolean;
    showDesc: boolean;
    showProps: boolean;


}

export default class InspectParts extends React.Component<IInspectPartsProps, IInspectPartsState> {

    private createSearchBuckets() {
        let result : IPartsBucketInfo[] = [
            { parts: [], count: 0, sort : '0' , bucketCategory: 'All' , bucketLabel: ''} ,
//            { parts: [], count: 0, sort : '3' , bucketCategory: 'ReadOnly', bucketLabel: '3. ReadOnly - Calculated/Lookup?' } ,
//            { parts: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
//            { parts: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
        ];
        return result;
    }
    private clearHistory() {
        let history: IMyHistory = {
            count: 0,
            errors: [],
            columns: [],
            views: [],
            items: [],
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

public constructor(props:IInspectPartsProps){
    super(props);

    this.state = { 

        allowOtherSites: this.props.allowOtherSites === true ? true : false,
        currentPage: 'Click Button to start',
        progress: null,
        history: this.clearHistory(),
        allLoaded: false,

        partBuckets : this.createSearchBuckets(),

        allParts: [],
        meta: [],
        blueBar: null,

        searchedItems: [],
        first20SearchedParts: [],
        searchCount: 0,

        searchMeta: pivCats.visible.title,
        searchText: '',

        errMessage: '',

        showIDs: false,
        showDesc: true,
        showProps: false,

    };

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);

    
  }

  public componentDidMount() {
    this._updateStateOnPropsChange();
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

    if ( prevProps.pickedWeb !== this.props.pickedWeb ) {

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

    public render(): React.ReactElement<IInspectPartsProps> {

        if ( this.props.pickedWeb !== undefined && this.state.allParts.length > 0 ) {



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


            let thisPage = null;
           
            let errMessage = this.state.errMessage === '' ? null : <div>
                { this.state.errMessage }
            </div>;


            const buttons: ISingleButtonProps[] =
            [{  disabled: false,  checked: true, primary: false,
                label: "Test Button", buttonOnClick: this.getPartDefs.bind(this),
            },];

            let provisionButtons = <div style={{ paddingTop: '20px' }}><ButtonCompound buttons={buttons} horizontal={true}/></div>;

            const stackProvisionTokens: IStackTokens = { childrenGap: 70 };

            let provisionButtonRow = <Stack horizontal={true} wrap={true} horizontalAlign={"start"} verticalAlign= {"center"} tokens={stackProvisionTokens}>{/* Stack for Buttons and Fields */}
                    { provisionButtons }
                    {  }
                </Stack>;

            let partList = <div> {
                this.state.partBuckets.map( bucket => {
                    return <MyLogList 
                            title={ 'WebPart'} items={ bucket }
                            descending={false} titles={null}
                            showIDs = { this.state.showIDs }
                            showDesc = { this.state.showDesc }
                            showProps = { this.state.showProps }
                            blueBar={ this.state.blueBar }
                        ></MyLogList>;
                    })
                }
            </div>;
            /*https://developer.microsoft.com/en-us/fabric#/controls/web/searchbox*/
            let searchBox =           
            <div className={[styles.searchContainer, styles.padLeft20 ].join(' ')} >
              <SearchBox
                className={styles.searchBox}
                styles={{ root: { maxWidth: 300 } }}
                placeholder="Search"
                onSearch={ this._searchForItems.bind(this) }
                //onFocus={ () => console.log('this.state',  this.state) }
                //onBlur={ () => console.log('onBlur called') }
                onChange={ this._searchForItems.bind(this) }
              />
              <div className={styles.searchStatus}>
                { 'Searching about ' + this.state.searchCount + ' parts' }
                { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
              </div>
            </div>;

            let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles()) } </div>;

            let partPivots = this.createPivotObject(this.state.searchMeta, '', this._onSearchForMeta.bind(this), this.getFeaturePivots());

            let noInfo = [];
            noInfo.push( <h3>{'Found ' + this.state.searchCount + ' items with this search criteria:'}</h3> )  ;
            if ( this.state.searchText != '' ) { noInfo.push( <p>{'Search Text: ' + this.state.searchText}</p> )  ; }
            if ( this.state.searchMeta != '' ) { noInfo.push( <p>{'Refiner: ' + this.state.searchMeta}</p> ) ; }

            const stackPageTokens: IStackTokens = { childrenGap: 10 };
            let showProgress = false;
            if ( this.state.progress != null && this.state.progress.progressHidden === false ) { 
                showProgress = this.state.progress.percentComplete === 100 ? false : true; }

                
            let myProgress = this.state.progress == null ? null : <ProgressIndicator 
            label={this.state.progress.label} 
            description={this.state.progress.description} 
            percentComplete={this.state.progress.percentComplete} 
            progressHidden={this.state.progress.progressHidden}/>;

            thisPage = <div className={styles.contents}><div>

                <div className={ this.state.errMessage === '' ? styles.hideMe : styles.showErrorMessage  }>{ errMessage } </div>
                <div className={ showProgress === true ? styles.showSearch : styles.hideSearch}> { myProgress }</div>
                <Stack horizontal={true} wrap={true} horizontalAlign={"space-between"} verticalAlign= {"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Webs */}
                     { searchBox } { toggles }
                </Stack>

                <div style={{ height:30, paddingBottom: 15} }> { partPivots } </div>

                <div className={ this.state.searchCount !== 0 ? styles.hideMe : styles.showErrorMessage  }>{ noInfo } </div>

                <Stack horizontal={false} wrap={true} horizontalAlign={"stretch"} tokens={stackPageTokens}>{/* Stack for Buttons and Fields */}
                    { partList }
                </Stack>

            </div></div>;

            if ( this.state.allParts.length === 0 ) {
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
                <h2>There are no parts to see</h2>
            </div> );
        }

    }   //End Public Render


    private getPartDefs() {
        let result : any = allAvailableWebParts( this.createSearchBuckets(), this.addThesePartsToState.bind(this), this.setProgress.bind(this), this.markComplete.bind(this) );

    }

    private addThesePartsToState( allParts, errMessage : string ) {

        let newFilteredItems : IWPart[] = this.getNewFilteredItems( '', this.state.searchMeta, allParts );

        let partBuckets  : IPartsBucketInfo[] = this.bucketParts( newFilteredItems, this.createSearchBuckets() );

        let meta: string[] = [];
        for ( let p of allParts ) {
            if ( p.meta ) {
                for ( let x of p.meta ) {
                    meta = addItemToArrayIfItDoesNotExist( meta, x );
                }
            }
        }

        this.setState({
            allParts: allParts,
            searchedItems: newFilteredItems,
            searchCount: newFilteredItems.length,
            errMessage: errMessage,
            meta: meta,
            partBuckets: partBuckets,
            searchText: '',
            searchMeta: this.state.searchMeta,
        });
        return true;
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
            history.columns = history.columns.length === 0 ? [progress] : [progress].concat(history.columns);
        } else if ( page === 'V') {
            history.views = history.views.length === 0 ? [progress] : [progress].concat(history.views);
        } else if ( page === 'I') {
            history.items = history.items.length === 0 ? [progress] : [progress].concat(history.items);
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
    this.searchForParts( this.state.searchText, item.props.itemKey, false );
  }

  public _searchForItems = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log('searchForItems: e',e);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);

    this.searchForParts( item, this.state.searchMeta, true );
  }
  
  
  public searchForParts = (text: string, meta: string , resetSpecialAlt: boolean ): void => {

    let searchItems : IWPart[] = this.state.allParts;
    let searchCount = searchItems.length;

    let partBuckets : IPartsBucketInfo[] = this.createSearchBuckets();

    let newFilteredItems : IWPart[] = this.getNewFilteredItems( text, meta, searchItems );

    let blueBar = meta != null ? meta : null;

    partBuckets  = this.bucketParts( newFilteredItems, partBuckets );

    console.log('Searched for:' + text);
    console.log('Web Meta:' + meta);
    console.log('and found these Parts:', newFilteredItems);
    searchCount = newFilteredItems.length;

    this.setState({
      searchedItems: newFilteredItems,
      searchCount: searchCount,
      blueBar: blueBar,
      partBuckets: partBuckets,
      searchText: text.toLowerCase(),
      searchMeta: meta,
    });


    return ;
    
  } //End searchForParts
  
      /**
     * This puts all the parts into the buckets
     * @param allParts 
     * @param partBuckets 
     */
    private bucketParts( allParts : IWPart[], partBuckets : IPartsBucketInfo[] ) {

        for (let i in allParts ) {
            partBuckets[allParts[i].bucketIdx].parts.push( allParts[i] );
            partBuckets[allParts[i].bucketIdx].count ++;
        }
        console.log('bucketParts:  partBuckets', partBuckets);

        return partBuckets;
    }

  private getNewFilteredItems(text: string, meta: string , searchItems : IWPart[] ) {

    let newFilteredItems : IWPart[] = [];

    for (let thisSearchItem of searchItems) {

        let searchString = thisSearchItem.searchString;
        let partMeta = thisSearchItem.meta;
  
        if ( meta === undefined || meta == null || meta == '' || partMeta.indexOf(meta) > -1 ) {
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
        this.getPartDefs();
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

public createPivotObject(setPivot, display, onLinkClick, pivotItems, theseStyles = null){

    let pivotWeb = 
    <Pivot 
      style={{ flexGrow: 1, paddingLeft: '10px', display: display }}
      styles={ theseStyles }
      linkSize= { pivotOptionsGroup.getPivSize('normal') }
      linkFormat= { pivotOptionsGroup.getPivFormat('links') }
      onLinkClick= { onLinkClick }  //{this.specialClick.bind(this)}
      selectedKey={ setPivot }
      headersOnly={true}>
        { pivotItems }
    </Pivot>;
    return pivotWeb;
  }

private getFeaturePivots() {

    let visible = this.buildFilterPivot( pivCats.visible );

    let base = this.buildFilterPivot( pivCats.base );

    let mixed = this.buildFilterPivot(pivCats.mixed);
    let conn = this.buildFilterPivot(pivCats.conn);
    let media = this.buildFilterPivot(pivCats.media);
    let dev = this.buildFilterPivot(pivCats.dev);
    let corp = this.buildFilterPivot(pivCats.corp);
    let msft = this.buildFilterPivot(pivCats.msft);
    

    let open = this.buildFilterPivot(pivCats.open);

    let hidden = this.buildFilterPivot(pivCats.hidden);

    let other = this.buildFilterPivot(pivCats.other);
    let classic = this.buildFilterPivot(pivCats.classic);
    
    let thesePivots = [ visible, corp , conn , mixed , media , dev , msft, open, classic , base, hidden];

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

    let togIDs = {
        //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
        label: <span>IDs</span>,
        key: 'togggleIDs',
        _onChange: this.updateTogggleIDs.bind(this),
        checked: this.state.showIDs,
        onText: '',
        offText: '',
        className: '',
        styles: '',
    };

    let togProps = {
        //label: <span style={{ color: 'red', fontWeight: 900}}>Rails Off!</span>,
        label: <span>Props</span>,
        key: 'togggleProps',
        _onChange: this.updateTogggleProps.bind(this),
        checked: this.state.showProps,
        onText: '-',
        offText: '-',
        className: '',
        styles: '',
    };


    //let theseToggles = [togDesc, togSet ];
    //if ( this.props.allowRailsOff === true ) { theseToggles.push( togXML, togJSON, togSPFx, togRails ); }
    let theseToggles = [ togDesc , togIDs,  togProps];

    let pageToggles : IContentsToggles = {
        toggles: theseToggles,
        childGap: 30,
        vertical: false,
        hAlign: 'end',
        vAlign: 'start',
        rootStyle: { width: 120 , paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
    };

    return pageToggles;

}

private updateTogggleDesc() {
    let showIDs = this.state.showDesc === false ? false : true;
    this.setState({
        showDesc: !this.state.showDesc,
        showIDs: showIDs,
    });
}

private updateTogggleIDs() {

    let showDesc = this.state.showIDs === false ? false : true;

    this.setState({
        showIDs: !this.state.showIDs,
        showDesc: showDesc,

    });

}

private updateTogggleProps() {
    this.setState({
        showProps: !this.state.showProps,
    });
}

}