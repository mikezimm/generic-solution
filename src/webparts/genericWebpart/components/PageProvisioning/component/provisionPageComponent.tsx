import * as React from 'react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';

import { sp } from "@pnp/sp";
import { Web, Lists } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState } from "@pnp/sp/clientside-pages";

import { getExpandColumns, getSelectColumns, IZBasicList, IPerformanceSettings, createFetchList, } from '@mikezimm/npmfunctions/dist/Lists/getFunctions';

import { IPickedWebBasic, IPickedList, }  from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';

import { IMyHistory, clearHistory } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

import { provisionThePage, IValidTemplate, provisionTestPage, provisionDrilldownPage } from './provisionWebPartPages';

import styles from './provisionPage.module.scss';
import { IMyProgress, } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { PageContext } from '@microsoft/sp-page-context';

import MyLogList from './listView';

import * as links from '@mikezimm/npmfunctions/dist/HelpInfo/Links/AllLinks';

import { IMakeThisPage } from './provisionWebPartPages';

import { getHelpfullErrorV2, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../../../../services/createAnalytics';

import { BaseErrorTrace } from '../../../../../services/BaseErrorTrace';

import { getRandomInt, getRandomChance, getRandomFromArray, randomDate, generateVals, generateTitles }
    from '@mikezimm/npmfunctions/dist/Services/randomServices';

import {  getAllItems, ISitePagesList,  } from './GetPatternPages';

export interface IProvisionPagesProps {
    // 0 - Context
    
    pageContext: PageContext;

    // 1 - Analytics options
    useListAnalytics: boolean;
    analyticsWeb: string;
    analyticsList: string;
    tenant: string;
    urlVars: {};

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning pages on other sites.
    alwaysReadOnly?: boolean;  // default is to be false so you can update at least local lists

    pickedWeb : IPickedWebBasic;
    webURL: string;
    showPane: boolean;
    allLoaded: boolean;

    currentUser: IUser;

    // 2 - Source and destination list information

    pages: IMakeThisPage[];

}

export interface IProvisionPagesState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning pages on other sites.
    alwaysReadOnly?: boolean;  // default is to be false so you can update at least local pages

    allLoaded: boolean;

    webURL: string;

    progress: IMyProgress;
    history: IMyHistory;

    currentPage: string;
    
    // 2 - Source and destination list information
    pages: IMakeThisPage[];

    fetchList: ISitePagesList;

}

export default class ProvisionPages extends React.Component<IProvisionPagesProps, IProvisionPagesState> {

private createRandom(str: string, webURL: string) {

    let rightNow = new Date();
    let todayTime = rightNow.getTime() ;
    let title =  str + ' - ' + getRandomInt(1,1000);

    let makeThisPage:  IMakeThisPage = {
        title: title,
        name: title,
        webURL: webURL,
        pageLayout: 'Article',
        onCurrentSite: true,
        webExists: true,
        pageExists: false,
        pageExistedB4: false,
    };

    return makeThisPage;

}

private createRandomPages(webURL: string){
    let pages : IMakeThisPage[] = [];
    pages.push(this.createRandom('Drilldown7', webURL));
    pages.push(this.createRandom('Drilldown7', webURL));
    pages.push(this.createRandom('Drilldown7', webURL));
    return pages;

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

public constructor(props:IProvisionPagesProps){
    super(props);

    let thePages = this.createRandomPages(this.props.webURL); //this.props.pages.length > 0 ? this.props.pages : 

    let TargetSite = this.props.webURL && this.props.webURL.length > 0 ? this.props.webURL : '';

    //Copied from GridCharts for createFetchList
    let allColumns : string[] = [];
    let dropDownColumns: string[] = ['Features','Topic'];
    let searchColumns : string[] = ['Title'];
    let metaColumns : string[] = [];
    let expandDates : string[] = [];
    let selectedDropdowns: string[] = [];
    //allColumns.push( this.props.dateColumn );
    //allColumns.push( this.props.valueColumn );

    searchColumns.map( c => { allColumns.push( c ) ; });
    metaColumns.map( c => { allColumns.push( c ) ; });

    let dropDownSort : string[] = dropDownColumns.map( c => { let c1 = c.replace('>','') ; if ( c1.indexOf('-') === 0 ) { return 'dec' ; } else if ( c1.indexOf('+') === 0 ) { return 'asc' ; } else { return ''; } });

    dropDownColumns.map( c => { let c1 = c.replace('>','').replace('+','').replace('-','') ; searchColumns.push( c1 ) ; metaColumns.push( c1 ) ; allColumns.push( c1 ); selectedDropdowns.push('') ; });

    let basicList : IZBasicList = createFetchList( this.props.webURL, null, 'SitePages', null, null, null, this.props.pageContext, allColumns, searchColumns, metaColumns, expandDates );
    //Have to do this to add dropDownColumns and dropDownSort to IZBasicList
    let tempList : any = basicList;
    tempList.dropDownColumns = dropDownColumns;
    tempList.dropDownSort = dropDownSort;
    let fetchList : ISitePagesList = tempList;
    
    //saveAnalytics (analyticsWeb, analyticsList, serverRelativeUrl, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, richText ) {
    saveAnalytics( this.props.analyticsWeb, this.props.analyticsList, //analyticsWeb, analyticsList,
        '', '',//serverRelativeUrl, webTitle, PageURL,
        'Provision Pages', TargetSite, null, //saveTitle, TargetSite, TargetList
        'Pages', 'Constructor', 'Loading', //itemInfo1, itemInfo2, result, 
        '', 'ProvisionPage', null, null ); //richText, Setting, richText2, richText3

    this.state = { 

        allowOtherSites: this.props.allowOtherSites === true ? true : false,
        alwaysReadOnly: this.props.alwaysReadOnly === true ? true : false,
        currentPage: 'Click Button to start',
        allLoaded: this.props.allLoaded,
        progress: null,
        history: clearHistory(),

        webURL: this.props.webURL,

        pages: thePages,

        fetchList: fetchList,

    };

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);

    
  }

  public componentDidMount() {
    this._updateStateOnPropsChange('state');
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

    if ( prevProps.pages != this.props.pages ) {

        this._updateStateOnPropsChange('props');
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

    public render(): React.ReactElement<IProvisionPagesProps> {



        if ( this.state.pages && this.state.pages.length > 0 ) {



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
            let stringsError = <tr><td>  </td><td>  </td><td>  </td></tr>;

            let createButtonOnClicks = [
                this.CreatePage_0.bind(this),
                this.CreatePage_1.bind(this),
                this.CreatePage_2.bind(this),
            ];

            
            const buttons: ISingleButtonProps[] = this.state.pages.map (( thePage, index ) => {
                let theLabel = null;
                let isDisabled = !thePage.webExists;
                if ( thePage.webExists ) {
                    if ( this.isPageReadOnly(thePage) === false ) {

                        if ( thePage.pageExists === true ) {
                            theLabel = "UPDATE " + thePage.title + " Page";

                        } else {
                            theLabel = "Create " + thePage.title + " Page";
                        }

                    } else {
                        if ( thePage.pageExists === true ) {
                            theLabel = "Verify " + thePage.title + " Page";

                        } else {
                            theLabel = "Can't verify " + thePage.title + " Page";
                            isDisabled = true;
                        }
                    }
                } else {
                    theLabel = thePage.title + ' web does not exist!';
                }
                
                return {     disabled: isDisabled,  checked: true, primary: false,
                    label: theLabel, buttonOnClick: createButtonOnClicks[index], };
            });

            let provisionButtons = <div style={{ paddingTop: '20px' }}><ButtonCompound buttons={buttons} horizontal={true}/></div>;

            let pageLinks = this.state.pages.map( mapThisPage => (
                mapThisPage.pageExists ? links.createLink( mapThisPage.pageURL, '_blank',  'Go to: ' + mapThisPage.title ) : null ));

            const stackProvisionTokens: IStackTokens = { childrenGap: 70 };

            let provisionButtonRow = <Stack horizontal={true} wrap={true} horizontalAlign={"start"} verticalAlign= {"center"} tokens={stackProvisionTokens}>{/* Stack for Buttons and Fields */}
                    { provisionButtons }
                    { pageLinks }
                    {  }
                </Stack>;

            let myProgress = this.state.progress == null ? null : <ProgressIndicator 
                label={this.state.progress.label} 
                description={this.state.progress.description} 
                percentComplete={this.state.progress.percentComplete} 
                progressHidden={this.state.progress.progressHidden}/>;


            let errorList = <MyLogList 
                title={ 'Page'}           items={ this.state.history.errors }
                descending={false}          titles={null}            ></MyLogList>;

            let fieldList = <MyLogList 
                title={ 'Webpart'}           items={ this.state.history.fields }
                descending={false}          titles={null}            ></MyLogList>;

            let viewList = <MyLogList 
                title={ 'Content'}           items={ this.state.history.views }
                descending={false}          titles={null}            ></MyLogList>;

            let itemList = <MyLogList 
                title={ 'TBD'}           items={ this.state.history.items }
                descending={false}          titles={null}            ></MyLogList>;

            let disclaimers = <div>
                <h3>Next Steps</h3>
                <ul>
                    <li>Build typed objects for specific webparts and page layouts</li>
                    <li>Set webpart properties for common ootb components</li>
                </ul>
            </div>;

            const stackPageTokens: IStackTokens = { childrenGap: 10 };

            thisPage = <div><div>{ disclaimers }</div>
                <div> { provisionButtonRow } </div>
                <div style={{ height:30} }> {  } </div>
                <div> { myProgress } </div>
                <div> {  } </div>
                <div> <h2>{ this.state.currentPage }</h2> </div>
                <div>
                <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Fields */}
                    { errorList }
                    { fieldList }  
                    { viewList }  
                    { itemList }  
                </Stack>
                </div>

            </div>;

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
                <div className={ styles.infoPane }>
                    { thisPage }
                </div>
            );
            
        } else {
            console.log('provisionPage.tsx return null');
            return (  <div className={ styles.infoPane }>
                <h2>There are no pages to provision</h2>
            </div> );
        }

    }   //End Public Render


  /***
   *          .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      db      d888888b .d8888. d888888b .d8888. 
   *         d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88        `88'   88'  YP `~~88~~' 88'  YP 
   *         8P      88oobY' 88ooooo 88ooo88    88    88ooooo      88         88    `8bo.      88    `8bo.   
   *         8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      88         88      `Y8b.    88      `Y8b. 
   *         Y8b  d8 88 `88. 88.     88   88    88    88.          88booo.   .88.   db   8D    88    db   8D 
   *          `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      Y88888P Y888888P `8888Y'    YP    `8888Y' 
   *                                                                                                         
   *                                                                                                         
   */

  private CreatePage_0(oldVal: any): any {
    let mapThisPage: IMakeThisPage = this.state.pages[0];
    this.CreateThisPage(mapThisPage, 0 );
  }

  private CreatePage_1(oldVal: any): any {
    let mapThisPage: IMakeThisPage = this.state.pages[1];
    this.CreateThisPage(mapThisPage, 1 );
  }
  
  private CreatePage_2(oldVal: any): any {
    let mapThisPage: IMakeThisPage = this.state.pages[2];
    this.CreateThisPage(mapThisPage, 2 );
  }

  private CreateThisPage( mapThisPage: IMakeThisPage, pageNo: number ): any {

    let pageCreated2 = provisionDrilldownPage(mapThisPage, this.setProgress.bind(this), this.markComplete.bind(this));

    return "Finished";

    this.setState({ currentPage: mapThisPage + ' page: ' + mapThisPage.title, history: clearHistory(), });

    let pageName = mapThisPage.title ? mapThisPage.title : mapThisPage.title;

    let readOnly: boolean  = this.isPageReadOnly(mapThisPage);

    let pageCreated = provisionThePage( mapThisPage, readOnly, this.setProgress.bind(this), this.markComplete.bind(this));
    
    let statePages = this.state.pages;
    statePages[pageNo].pageExists = true;
    
    let workingMessage = readOnly === true ? 'Verifying page: ': 'Building page: ' ;

    if ( pageCreated ) { 
        this.setState({
            currentPage: workingMessage + pageName,
            pages: statePages,
        });
    }
    return "Finished";  
  } 

  private isPageReadOnly (mapThisPage) {

    let readOnly = true;
    if ( this.state.alwaysReadOnly === false ) {                //First test, only allow updates if the state is explicitly set so alwaysReadOnly === false
        if (mapThisPage.onCurrentSite === true ) {
            readOnly = false;                                   //If page is on current site, then allow writing (readonly = false)
        } else if ( this.state.allowOtherSites === true ) {
            readOnly = false;                                   //Else If you explicitly tell it to allowOtherSites, then allow writing (readonly = false)
        }
    }

    return readOnly;

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

    private _updateStateOnPropsChange(doThis: 'props' | 'state' ): void {
        console.log('_updateStateOnPropsChange:', doThis, this.props );
        let testPages : IMakeThisPage[] = [];
        if ( doThis === 'props' ) {
            if ( this.props.pages ) { testPages = JSON.parse(JSON.stringify(this.props.pages)) ; }

        } else {
            if ( this.state.pages ) { testPages = JSON.parse(JSON.stringify(this.state.pages)) ; }
        } 

        if ( testPages.length > 0 ) {
            for ( let i in testPages ) {
                this.checkThisWeb(parseInt(i,10), testPages);
            }
        }
    }

    private checkThisWeb(index: number, testPages : IMakeThisPage[] ){
        const thisWeb = Web(testPages[index].webURL);
        testPages[index].webExists = false;
        testPages[index].pageExists = false;

        /*
        thisWeb.pages.get().then((response) => {
            testPages[index].webExists = true;
            this.checkThisPage(index, testPages, thisWeb);

        }).catch((e) => {
            let errMessage = getHelpfullErrorV2(e, true, true);
            console.log('checkThisWeb', errMessage);
            this.updateStatePages(index, testPages);
        });
    */

    }
    
    private checkThisPage(index: number, testPages : IMakeThisPage[], thisWeb: any ){
        //const thisWeb = Web(testPages[index].webURL);
        thisWeb.pages.getByTitle(testPages[index].title).get().then((response) => {
            testPages[index].pageExists = true;
            testPages[index].pageExistedB4 = true;   
            this.updateStatePages(index,testPages);

        }).catch((e) => {
            let helpfulErrorEnd = [ 'checkThisPage', '', null, null ].join('|');
            let errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'provisionPageComponent ~ 579', helpfulErrorEnd ].join('|') );
            console.log('checkThisPage', errMessage);
            this.updateStatePages(index, testPages);
        });
    }

    private updateStatePages(index: number, testPages : IMakeThisPage[] ) {
        let statePages = this.state.pages;
        if (statePages === undefined ) { statePages = this.props.pages ; }
        statePages[index] = testPages[index];
        this.setState({
            pages: statePages,
        });
    }
}