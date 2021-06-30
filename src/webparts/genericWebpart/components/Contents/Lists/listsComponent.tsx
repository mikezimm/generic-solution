import * as React from 'react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';

import { sp } from "@pnp/sp";
import { Web, Lists } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { Site, ISite } from "@pnp/sp/presets/all"; //    theSite: ISite;

import "@pnp/sp/webs";

import { Panel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { IValidTemplate, allAvailableLists, allFieldsCompare  } from './listsFunction';
import {  } from './listsFunction';

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import styles from '../contents.module.scss';

import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
import { doesObjectExistInArrayInt } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';

import { IMyHistory, clearHistory } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { createAdvancedContentChoices } from '../../fields/choiceFieldBuilder';

import { IContentsToggles, makeToggles } from '../../fields/toggleFieldBuilder';

import { createLink } from '@mikezimm/npmfunctions/dist/HelpInfo/Links/CreateLinks';

import { PageContext } from '@microsoft/sp-page-context';
import { IMyPivots, IPivot, IMyPivCat } from '@mikezimm/npmfunctions/dist/Pivots/IzPivots';
import { pivotOptionsGroup, } from '../../../../../services/propPane';

import MyJsonCompare from '../../../../../services/railsCommon/jsonCompare/component';
import MyAddListTemplate from './railAddTemplate/component';

import MyLogList from './listView';

import { getHelpfullErrorV2, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { BaseErrorTrace } from '../../../../../services/BaseErrorTrace';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

import { IContentsFieldInfo, IInspectColumnsProps, IInspectColumnsState, IFieldBucketInfo } from '../Fields/IFieldComponentTypes';

import * as ECFields from '../Fields/fieldsFunctions';

import CreateListPermissions from './railCreateGroups/component';

import { getWebInfoIncludingUnique , getSiteInfo } from './listsFunction';

import { IWebCache, ICachedWebIds, ICachedListId, IListRailFunction, IInspectListsProps, IInspectListsState, IListBucketInfo, IRailsOffPanel } from './IListComponentTypes';

import { pivCats } from './IListComponentConst';
import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';

export default class InspectLists extends React.Component<IInspectListsProps, IInspectListsState> {

    private createSearchBuckets() {
        let result : IListBucketInfo[] = [
            { lists: [], count: 0, sort : '0' , bucketCategory: 'Custom' , bucketLabel: '0. User Content'} ,
            { lists: [], count: 0, sort : '3' , bucketCategory: 'Template Content', bucketLabel: '3. Template Content' } ,
            { lists: [], count: 0, sort : '6' , bucketCategory: 'Template System', bucketLabel: '6. Template System' } ,
            { lists: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
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

    public constructor(props:IInspectListsProps){
        super(props);

        this.state = { 

            allowOtherSites: this.props.allowOtherSites === true ? true : false,
            currentPage: 'Click Button to start',
            progress: null,
            history: clearHistory(),
            allLoaded: false,

            allLists: [],
            searchedItems: [],
            first20searchedItems: [],
            searchCount: 0,
            
            listBuckets : this.createSearchBuckets(),

            meta: [],

            allowSettings: this.props.allowSettings === true ? true : false,
            allowRailsOff: this.props.allowRailsOff === true ? true : false,

            showDesc: false,
            showSettings: false,
            showRailsOff: false,

            searchMeta: pivCats.visible.title,
            searchText: '',

            errMessage: '',

            showPanel: false,
            panel: this.createStateRailsOffPanel( [''], false ),
            railFunction: '',
            selectedIndex: null,
            selectedEntity: null,

            firstJSON: null,
            secondJSON: null,
            compareError: '',
            lastCompare: null,
            applyTemplateError: '',

            cachedWebIds: this.props.cachedWebIds,

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

    if ( prevProps.pickedWeb != this.props.pickedWeb || prevProps.pickedList != this.props.pickedList ) {
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

    public render(): React.ReactElement<IInspectListsProps> {

        if ( this.props.pickedWeb !== undefined ) {

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

            // console.log('render allLists ~ 195', this.state.allLists );
            // console.log('render props.cachedWebIds ~ 196', this.props.cachedWebIds );
            console.log('render state.cachedWebIds ~ 197', this.state.cachedWebIds );

            let thisPage = null;

//            let listList = <div className={ styles.floatLeft }> {  // This format will put all tables horizontal
            let listList = <div> {
                this.state.listBuckets.map( bucket => {
                    return <MyLogList 
                        showSettings = { this.state.showSettings } railsOff= { this.state.showRailsOff }
                        title={ ''}           items={ bucket }
                        showDesc = { this.state.showDesc } 
                        webURL = { this.props.pickedWeb.url }
                        allowCrazyLink = { this.props.allowCrazyLink }
                        _openRailsOffPanel= { this._openRailsOffPanel.bind(this)}
                        pickThisList = { this.props.pickThisList }  descending={false}  titles={null}>

                    </MyLogList>;
                })

                }
                </div>;

            let railsPanel = null;
                      

            if ( this.state.showPanel === true ) {
                if ( this.state.railFunction === 'ListPermissions' ) { 
                    railsPanel = 
                        <CreateListPermissions 
                            wpContext={  this.props.wpContext }
                            railFunction={ this.state.railFunction }
                            theList={ this.state.selectedEntity }
                            currentPage= { this.props.pageContext.web.absoluteUrl }
                            pickedWeb= { this.props.pickedWeb }
                            user={ this.props.currentUser }
                            showPanel={ this.state.showPanel }
                            // this prop makes the panel non-modal
                            _closePanel={ this._closePanel.bind(this) }
                            type = { this.state.panel.type }
                            analyticsWeb= { this.props.analyticsWeb }
                            analyticsList= { this.props.analyticsList }
                            theSite={ this.props.theSite }
                        ></CreateListPermissions>;

                } else if ( this.state.railFunction === 'compareJSON' ) {

                    /**
                     * Got this error: Warning
                     * Warning - tslint - src\webparts\genericWebpart\components\Contents\Lists\listsComponent.tsx(332,17): error no-unused-expression: unused expression, exp
                     * Just put "railsPanel = ".... and it fixed it :)
                     */
                    railsPanel = <MyJsonCompare
                        wpContext={  this.props.wpContext }
                        railFunction={ this.state.railFunction }
                        theList={ this.state.selectedEntity }
                        pickedWeb= { this.props.pickedWeb }
                        user={ this.props.currentUser }
                        showPanel={ this.state.showPanel }
                        json1={ this.state.firstJSON }
                        json2={ this.state.secondJSON }
                        errorMess= { this.state.compareError }
                        _fetchCompare={ this._fetchCompare.bind(this) }
                        _closePanel={ this._closePanel.bind(this) }
                        type = { this.state.panel.type }
                        analyticsWeb= { this.props.analyticsWeb }
                        analyticsList= { this.props.analyticsList }
                        listory = { this.props.listory }

                    ></MyJsonCompare>;
                } else if ( this.state.railFunction === 'AddTemplate' ) {

                    /**
                     * Got this error: Warning
                     * Warning - tslint - src\webparts\genericWebpart\components\Contents\Lists\listsComponent.tsx(332,17): error no-unused-expression: unused expression, exp
                     * Just put "railsPanel = ".... and it fixed it :)
                     */
                    railsPanel = <MyAddListTemplate
                        panelOrPage={ 'panel'}
                        wpContext={  this.props.wpContext }
                        pageContext={ this.props.pageContext }
                        allowOtherSites={ this.state.allowOtherSites }
                        alwaysReadOnly={ false }
                        railFunction={ this.state.railFunction }
                        theList={ this.state.selectedEntity }
                        pickedWeb= { this.props.pickedWeb }
                        user={ this.props.currentUser }
                        showPanel={ this.state.showPanel }
                        // json1={ this.state.firstJSON }
                        // json2={ this.state.secondJSON }
                        errorMess= { this.state.applyTemplateError }
                        // _fetchCompare={ this._fetchCompare.bind(this) }
                        _closePanel={ this._closePanel.bind(this) }
                        type = { this.state.panel.type }
                        currentPage= { this.props.pageContext.web.absoluteUrl }
                        analyticsWeb= { this.props.analyticsWeb }
                        analyticsList= { this.props.analyticsList }
                        theSite={ this.props.theSite }
                    ></MyAddListTemplate>;
                } //
            }
            /*https://developer.microsoft.com/en-us/fabric#/controls/web/searchbox*/
            let searchBox =
            <div className={[styles.searchContainer, styles.padLeft20 ].join(' ')} >
              <SearchBox
                className={styles.searchBox}
                styles={{ root: { maxWidth: 300 } }}
                placeholder="Search"
                onSearch={ this._searchForItems.bind(this) }
                onFocus={ () => console.log('this.state',  this.state) }
                onBlur={ () => console.log('onBlur called') }
                onChange={ this._searchForItems.bind(this) }
              />
              <div className={styles.searchStatus}>
                { 'Searching about ' + this.state.searchCount + ' lists' }
                { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
              </div>
            </div>;

        let disclaimers = <h3>Contents for { createLink( this.props.pickedWeb.url, '_blank', this.props.pickedWeb.url )  }</h3>;

            let xyz = <div>
                <h3>Next steps</h3>
                <ul>
                    <li>Icons in first column for meta tags</li>
                    <li>See if there are any other parts of the webpart def object that might be helpful</li>
                </ul>
            </div>;

            const stackPageTokens: IStackTokens = { childrenGap: 10 };

            let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles()) } </div>;

            let listPivots = this.createPivotObject(this.state.searchMeta, '');

            let settings = <div className = { this.state.showSettings ? styles.showSettings : styles.hideSettings } >
                { this.getSiteSettingsLinks() }
            </div>;

            let noInfo = [];
            noInfo.push( <h3>{'Found ' + this.state.searchCount + ' items with this search criteria:'}</h3> )  ;
            if ( this.state.searchText != '' ) { noInfo.push( <p>{'Search Text: ' + this.state.searchText}</p> )  ; }
            if ( this.state.searchMeta != '' ) { noInfo.push( <p>{'Refiner: ' + this.state.searchMeta}</p> ) ; }

            thisPage = <div className={styles.contents}><div><div>{ disclaimers }</div>

                <div className={ this.state.errMessage === '' ? styles.hideMe : styles.showErrorMessage  }>{ this.state.errMessage } </div>
                { railsPanel }
                <Stack horizontal={true} wrap={true} horizontalAlign={"space-between"} verticalAlign= {"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Fields */}
                     { searchBox } { toggles }
                </Stack>

                <div> { settings } </div>

                <div style={{ height:30, paddingBottom: 15} }> { listPivots } </div>

                <div>

                <div className={ this.state.searchCount !== 0 ? styles.hideMe : styles.showErrorMessage  }>{ noInfo } </div>

                <Stack horizontal={false} wrap={true} horizontalAlign={"stretch"} tokens={stackPageTokens}>{/* Stack for Buttons and Fields */}
                    { listList }
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

        } else {
            console.log('listComponents.tsx return null');
            return (  <div className={ styles.contents }>
                <div className={ this.state.errMessage === '' ? styles.hideMe : styles.showErrorMessage  }>{ this.state.errMessage } </div>
                <h2>There are no parts to see</h2>
            </div> );
        }

    }   //End Public Render

    private async _fetchCompare( altWeb: string, altListTitle: string, doThis: string, updateWebCache: boolean = false ) {
        if ( doThis === 'Lists' ) {
            let secondJSON = null;
            let compareError = '';
            let cachedWebIds = this.state.cachedWebIds;
            let updateCache = false;
            console.log('_fetchCompare updateWebCache ~ 396 is', updateWebCache );

            if ( altWeb === this.state.selectedEntity.ParentWebUrl ) {

            } 


            if ( altListTitle === this.state.selectedEntity.Title && altWeb === this.state.selectedEntity.ParentWebUrl ) {
                secondJSON = this.state.selectedEntity ;

            } else {
                let restFilter = `Title eq '${ altListTitle }'`;
                // let result = await allAvailableLists( altWeb, restFilter, this.createSearchBuckets(),this.addCompareListToState.bind(this), null, null );
                let result = await allAvailableLists( altWeb, null, this.createSearchBuckets(),this.addCompareListToState.bind(this), null, null, false );
                let listIndex = -1;

                if ( result.errMessage && result.errMessage.length > 0 ) {
                    //There was an error... 
                    
                } else { 
                    let isSameWeb = altWeb === this.state.selectedEntity.ParentWebUrl ? true : false;
                    let cachedWeb = null;
                    let theSite = null;
                    if ( isSameWeb === true ) {
                        cachedWeb = this.props.pickedWeb;
                        theSite = this.props.theSite;

                    } else {
                        cachedWeb = await getWebInfoIncludingUnique( altWeb, 'min', false, null );
                        theSite = await getSiteInfo( altWeb, false, false );
                    }

                    listIndex = doesObjectExistInArrayInt( result.allLists , 'Title',altListTitle, true ); 
                    cachedWebIds = this.updateWebCacheObject( result.allLists, this.state.cachedWebIds, cachedWeb, theSite );
                    console.log('_fetchCompare updateCache ~ 413 is', updateCache );
                    updateCache = updateWebCache === true ? true : updateCache ;

                }

                if ( listIndex > -1 ) {
                    secondJSON = result.allLists[listIndex];
                } else {
                    secondJSON = null;
                    if ( result.errMessage === '' ) { result.errMessage = 'Unable to find the list you mentioned :(' ; } 
                }

                compareError= result.errMessage;
            }

            this.setState({ 
                firstJSON: this.state.selectedEntity,
                secondJSON: secondJSON,
                compareError: compareError, 
                lastCompare: doThis,
                cachedWebIds: cachedWebIds,
            });

            if ( updateCache === true ) { this.props.updateCachedLists( cachedWebIds ); }

        } else if ( doThis === 'Fields' ) {
            let firstJSON = [];
            let secondJSON = [];
            let compareError = '';
            let restFilter = "Hidden eq false";

            let result1 = await ECFields.allAvailableFields( this.state.selectedEntity.ParentWebUrl, this.state.selectedEntity.Title, restFilter, ECFields.createSearchBuckets(),this.addCompareFieldToState.bind(this), null, null );
            firstJSON = result1.allFields;
            compareError= result1.errMessage;

            let result2 = await ECFields.allAvailableFields( altWeb, altListTitle, restFilter, ECFields.createSearchBuckets(),this.addCompareFieldToState.bind(this), null, null );
            // secondJSON = await ECFields.allAvailableFields( altWeb, altListTitle, ECFields.createSearchBuckets(),null, null, null );

            secondJSON = result2.allFields;
            compareError += result2.errMessage;

            this.setState({ 
                firstJSON: firstJSON,
                secondJSON: secondJSON,
                compareError: compareError, 
                lastCompare: doThis,
            });

        } 

    }


    private addCompareFieldToState( allFields:  IContentsFieldInfo[] ,scope: string, errMessage : string ) {

        return ;
    }

    private addCompareListToState( allLists:  IContentsListInfo[] ,  errMessage : string ) {
        return ;
        this.setState({ secondJSON: allLists[0], compareError: errMessage, lastCompare: 'Lists' });

    }

    private getListDefs() {
        let result : any = allAvailableLists( this.props.pickedWeb.url, null, this.createSearchBuckets(),  this.addTheseListsToState.bind(this), this.setProgress.bind(this), this.markComplete.bind(this), ' ~ 497' );
    }

    private addTheseListsToState( allLists , errMessage : string ) {

        let newFilteredItems : IContentsListInfo[] = this.getNewFilteredItems( '', this.state.searchMeta, allLists );

        let listBuckets  : IListBucketInfo[] = this.bucketLists( newFilteredItems, this.createSearchBuckets() );

        // EntityTypeName: string;
        // Title: string;
        // Hidden: boolean;
        // Id: string;
        // Description: string;
        // ItemCount: number;
        // Created: string;
        // HasUniqueRoleAssignments: boolean;
        // LastItemDeletedDate: string;
        // LastItemModifiedDate: string;
        // LastItemUserModifiedDate: string;
        // ParentWebPath: {
        //     DecodedUrl: string;
        // };
        // ParentWebUrl: string;
        // listURL: string;
        // pickedWeb : IPickedWebBasic;
        // theSite: ISite;
        let cachedWebIds = this.updateWebCacheObject( allLists, this.state.cachedWebIds, this.props.pickedWeb, this.props.theSite );

        this.setState({
            allLists: allLists,
            searchedItems: newFilteredItems,
            searchCount: newFilteredItems.length,
            errMessage: errMessage,
            listBuckets: listBuckets,
            searchText: '',
            searchMeta: this.state.searchMeta,
            firstJSON: this.state.selectedEntity,
            secondJSON: allLists,
            cachedWebIds: cachedWebIds,
        });

        this.props.updateCachedLists( cachedWebIds );
        return true;
    }

    private updateWebCacheObject ( allLists:  IContentsListInfo[], cachedWebIds : ICachedWebIds, pickedWeb: IPickedWebBasic, theSite: ISite ) {
        
        // let cachedWebIds : ICachedWebIds = this.state.cachedWebIds;
        let pickedWebGuid = pickedWeb.guid;
        let cachedIndex = cachedWebIds.webIds.indexOf( pickedWebGuid );
        let cachedLists : ICachedListId[] = [];

        allLists.map( list => {
            // let theSite: any = this.props.theSite;
            let thisRecentList : ICachedListId = this.makeIContentsListInfoIntoRecentListId( pickedWeb, list, theSite );
            // cachedLists = this.addSimpleObjectToArrayIfNotExist( cachedLists, thisRecentList, ['webUrl','listTitle'] ) ;
            cachedLists.push( thisRecentList );
        });

        let thisWebCache: IWebCache = {
            id: pickedWeb.guid,
            title: pickedWeb.title,
            url: pickedWeb.url,
            lists: cachedLists,
        };

        if ( cachedIndex  > - 1 ) {
            cachedWebIds.webCache [ cachedIndex ] = thisWebCache ;

        } else {
            cachedWebIds.webCache.push( thisWebCache ) ;
            cachedWebIds.webIds.push( pickedWeb.guid ) ;
        }

        return cachedWebIds;

    }

    private makeIContentsListInfoIntoRecentListId ( pickedWeb: IPickedWebBasic, list: IContentsListInfo, theSite: any ) {

        let thisRecentList : ICachedListId = {
            siteId: theSite.Id,
            webTitle: pickedWeb.title,
            webUrl: getFullUrlFromSlashSitesUrl( pickedWeb.url ) ,  
            webId: pickedWeb.guid,
            listId: list.Id,
            listTitle: list.Title,
            listUrl: getFullUrlFromSlashSitesUrl( list.listURL ),
        };

        return thisRecentList;

    }

    /**
     * This is intended for simple flat objects, not complex
     * @param addToArray
     * @param objToAdd 
     * @param primaryKeys //This will only compare these sepcific keys if they are included.  
     *       If no primaryKeys are provided, it defaults to keys of the objToAdd.
     * @param stringifyOnPush //converts objToAdd to string and reparses before adding so it's not a direct copy of the original.
     */

    private addSimpleObjectToArrayIfNotExist( addToArray: any[] , objToAdd: any, primaryKeys: string[], stringifyOnPush: boolean = true ) {

        let isMatch = this.doesObjectExistInArrayPrimeKeys( addToArray, objToAdd, primaryKeys );
        if ( isMatch < 0 ) {
            if ( stringifyOnPush === true ) { objToAdd = JSON.parse(JSON.stringify( objToAdd )) ; }
            addToArray.push( objToAdd );
        }
        return addToArray;
    }

    /**
     * This is intended for simple flat objects, not complex
     * @param addToArray
     * @param objToAdd 
     * @param primaryKeys //This will only compare these sepcific keys if they are included.  
     *       If no primaryKeys are provided, it defaults to keys of the objToAdd.
     * @param stringifyOnPush //converts objToAdd to string and reparses before adding so it's not a direct copy of the original.
     */
    private doesObjectExistInArrayPrimeKeys( addToArray: any[] , objToAdd: any, primaryKeys: string[] ) {

        let matchIndex : any = -1 ;
        if ( addToArray.length === 0 ) {

        } else if ( addToArray.length > 0 ) {
            let keysToMatch = primaryKeys.length > 0 ? primaryKeys : Object.keys(objToAdd);
            let isItemFound = false;
            addToArray.map( ( checkArrayObject, index )  => { //map through original array
                if ( isItemFound === false ) {
                    let isThisAMatch : any = true;
                    keysToMatch.map( key => {
                        if ( checkArrayObject[key] != objToAdd[key] ) { isThisAMatch = false; }
                    });
                    if ( isThisAMatch === true ) { isItemFound = true ; matchIndex = index ; }
                }
            });

        }
        return matchIndex;
    }  


    private bucketLists( allLists : IContentsListInfo[], listBuckets : IListBucketInfo[] ) {

        for (let i in allLists ) {
            listBuckets[allLists[i].bucketIdx].lists.push( allLists[i] );
            listBuckets[allLists[i].bucketIdx].count ++;
        }
        console.log('bucketLists:  listBuckets ~ 557', listBuckets);

        return listBuckets;
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
            history.fields = history.fields.length === 0 ? [progress] : [progress].concat(history.fields);
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



  private createStateRailsOffPanel( groupNames: string[], visible: boolean, type: PanelType = PanelType.medium ) {

    let panel : IRailsOffPanel= {
      type: type,
      content: null,
      // width: number,
    };
  
    return panel;
  
  }
  
    private _openRailsOffPanel( e: any ) {
        //This element syntax works when you have <span><strong>text</strong></span>
        let testElement = e.nativeEvent.target;
        const parentElement = testElement.parentElement;
        //export type IListRailFunction = 'ListPermissions' | 'compareJSON' | '';
        const rail : IListRailFunction = parentElement.getAttribute('data-railFunction');
        const listTitle = parentElement.getAttribute('data-listTitle');
        const listIndex = doesObjectExistInArrayInt( this.state.allLists, 'Title', listTitle, true );
        const listObject = listIndex > -1 ? this.state.allLists[listIndex] : null;

        // if ( testElement.id.indexOf( this.groupTitlePrefix) === 0 ) {
        //   id = testElement.id.replace( this.groupTitlePrefix ,'' );
        // } else if ( testElement.parentElement.id.indexOf( this.groupTitlePrefix) === 0 ) {
        //   id = testElement.parentElement.id.replace( this.groupTitlePrefix ,'' );
        // }
        let panel = null;
        if ( rail === 'ListPermissions') {
            panel = this.createStateRailsOffPanel( [listIndex.toFixed()], false, PanelType.medium );

        } else if ( rail === 'compareJSON' ) {
            panel = this.createStateRailsOffPanel( [listIndex.toFixed()], false, PanelType.large );

        } else if ( rail === 'AddTemplate' ) {
            panel = this.createStateRailsOffPanel( [listIndex.toFixed()], false, PanelType.large );

        }
        
        this.setState({
            panel: panel,
            showPanel: true,
            selectedIndex: listIndex,
            selectedEntity: listObject,
            railFunction: rail,
        });

    }

    private _closePanel ( )  {
        this.setState({ showPanel: false, firstJSON: null, secondJSON: null });
        this._updateStateOnPropsChange();
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
    console.log('searchForItems: e ~ 699',e);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);

    //Be sure to pass item.props.itemKey to get filter value
    this.searchForLists( this.state.searchText, item.props.itemKey );
  }

  public _searchForItems = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
    console.log('searchForItems: e ~ 710 ',e);
    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);

    this.searchForLists( item, this.state.searchMeta );
  }

    
  private getNewFilteredItems(text: string, meta: string , searchItems : IContentsListInfo[]) {

    let newFilteredItems : IContentsListInfo[] = [];

    for (let thisSearchItem of searchItems) {

        let searchString = thisSearchItem.searchString;
        let fieldMeta = thisSearchItem.meta;
  
        if ( meta === undefined || meta == null || meta == '' || fieldMeta.indexOf(meta) > -1 ) {
          if( searchString.indexOf(text.toLowerCase()) > -1 ) {
            newFilteredItems.push(thisSearchItem);
            }
        }
      }

      return newFilteredItems;

  }

  public searchForLists = (text: string, meta: string): void => {

    let searchItems : IContentsListInfo[] = this.state.allLists;
    let searchCount = searchItems.length;

    let listBuckets : IListBucketInfo[] = this.createSearchBuckets();

    let newFilteredItems : IContentsListInfo[] = this.getNewFilteredItems( text, meta, searchItems );

    listBuckets  = this.bucketLists( newFilteredItems, listBuckets );

    console.log('Searched for ~ 749:' + text);
    console.log('List Meta:' + meta);
    console.log('and found these lists:', newFilteredItems);
    searchCount = newFilteredItems.length;

    this.setState({
      searchedItems: newFilteredItems,
      searchCount: searchCount,
      listBuckets: listBuckets,
      searchText: text.toLowerCase(),
      searchMeta: meta,
    });


    return ;

  } //End searchForItems


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
        this.getListDefs();
    }

    private checkThisWeb(index: number, testLists : IContentsListInfo[] ){
        //const thisWeb = Web(testLists[index].webURL);
        //testLists[index].webExists = false;
        //testLists[index].pageExists = false;

        /*
        thisWeb.pages.get().then((response) => {
            testLists[index].webExists = true;
            this.checkThisPage(index, testLists, thisWeb);

        }).catch((e) => {
            let errMessage = getHelpfullErrorV2(e, true, true);
            console.log('checkThisWeb', errMessage);
            this.updateStatePages(index, testLists);
        });
    */

    }
    
    private checkThisPage(index: number, testLists : IContentsListInfo[], thisWeb: any ){
        //const thisWeb = Web(testLists[index].webURL);
        thisWeb.lists.getByTitle(testLists[index].Title).get().then((response) => {
            //testLists[index].pageExists = true;
            //testLists[index].pageExistedB4 = true;   
            //this.updateStatePages(index,testLists);

        }).catch((e) => {
            
            let helpfulErrorEnd = [ thisWeb, '', '', index, testLists ].join('|');
            let errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'checkThisPage ~ 874', helpfulErrorEnd ].join('|') );
            console.log('checkThisPage', errMessage);
            //this.updateStatePages(index, testLists);
        });
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
    
        let pivotPart = 
        <Pivot 
          style={{ flexGrow: 1, paddingLeft: '10px', display: display }}
          styles={ theseStyles }
          linkSize= { pivotOptionsGroup.getPivSize('normal') }
          linkFormat= { pivotOptionsGroup.getPivFormat('links') }
          onLinkClick= { this._onSearchForMeta.bind(this) }  //{this.specialClick.bind(this)}
          selectedKey={ setPivot }
          headersOnly={true}>
            {this.getListPivots()}
        </Pivot>;
        return pivotPart;
      }

    private getListPivots() {

        let visible = this.buildFilterPivot( pivCats.visible );
        let old = this.buildFilterPivot(pivCats.old);
        let empty = this.buildFilterPivot(pivCats.empty);
        let notEmpty = this.buildFilterPivot(pivCats.notEmpty);
        let lots = this.buildFilterPivot(pivCats.lots);
        let max = this.buildFilterPivot(pivCats.max);
        let checkout = this.buildFilterPivot(pivCats.checkout);
        let versions = this.buildFilterPivot(pivCats.versions);
        let noVersions = this.buildFilterPivot(pivCats.noVersions);      
        let noSearch = this.buildFilterPivot(pivCats.noSearch);
        let hidden = this.buildFilterPivot(pivCats.hidden);

        let lists = this.buildFilterPivot(pivCats.lists);
        let libraries = this.buildFilterPivot(pivCats.libraries);

        let o0 = this.buildFilterPivot({title: '0', desc: 'User built lists', order: 1 });
        let o3 = this.buildFilterPivot({title: '3', desc: 'Pre-built Content lists', order: 3 });
        let o6 = this.buildFilterPivot({title: '6', desc: 'Template System lists', order: 6 });
        let o9 = this.buildFilterPivot({title: '9', desc: 'System lists', order: 9 });

        let thesePivots = [visible, o0, o3, o6, o9, lists, libraries, old, empty, notEmpty, lots, max, versions, noVersions  ,hidden];

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
//            let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles()) } </div>;
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

        let railsLabel = <span style={{ color: 'red', fontWeight: 700}}>Rails Off!</span>;
        let togRails = {
            label: railsLabel,
            key: 'togggleRailsOff',
            _onChange: this.updateTogggleRailsOff.bind(this),
            checked: this.state.showRailsOff,
            onText: '',
            offText: '',
            className: '',
            styles: '',
        };

        let theseToggles = [togDesc, togSet ];
        if ( this.props.allowRailsOff === true ) { theseToggles.push( togRails ); }

        let pageToggles : IContentsToggles = {
            toggles: theseToggles,
            childGap: 20,
            vertical: false,
            hAlign: 'end',
            vAlign: 'start',
            rootStyle: { width: 120, paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
        };

        return pageToggles;

    }

    private updateTogggleDesc() {
        this.setState({
            showDesc: !this.state.showDesc,
        });
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

        let stackSettingTokens = { childrenGap: 20 };
        let settingLinks = <div style={{ padding: 15, fontSize: 'large', }}>
                <Stack horizontal={true} wrap={true} horizontalAlign={"start"} tokens={stackSettingTokens}>{/* Stack for Buttons and Fields */}
                { createLink( this.props.pickedWeb.url + "/_layouts/15/viewlsts.aspx" ,'_blank', 'Contents' )}                
                { createLink( this.props.pickedWeb.url + "/SiteAssets" ,'_blank', 'SiteAssets' )}
                { createLink( this.props.pickedWeb.url + "/SitePages" ,'_blank', 'SitePages' )}

                { createLink( this.props.pickedWeb.url + "/_layouts/15/settings.aspx" ,'_blank', 'Site Settings' )}
                { createLink( this.props.pickedWeb.url + "/_layouts/15/user.aspx" ,'_blank', 'Permissions' )}
                { createLink( this.props.pickedWeb.url + "/_layouts/15/prjsetng.aspx" ,'_blank', 'Title/Logo' )}
                { createLink( this.props.pickedWeb.url + "/_layouts/15/AreaNavigationSettings.aspx" ,'_blank', 'Navigation' )}
                { createLink( this.props.pickedWeb.url + "/_layouts/15/people.aspx" ,'_blank', 'Groups' )}
                { createLink( this.props.pickedWeb.url + "/_layouts/15/ManageFeatures.aspx" ,'_blank', 'Features' )}            
            </Stack>
        </div>;

        return settingLinks;

    }
}