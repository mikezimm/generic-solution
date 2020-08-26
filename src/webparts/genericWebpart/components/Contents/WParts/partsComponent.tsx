import * as React from 'react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import { sp } from "@pnp/sp";
import { Web, Lists } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import { IValidTemplate, allAvailableWebParts } from './partsFunction';
import { IListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import styles from '../contents.module.scss';

import { IMyProgress, IUser } from '../../IReUsableInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { PageContext } from '@microsoft/sp-page-context';

import MyLogList from './partsListView';

import * as links from '../../HelpInfo/AllLinks';

import { IWPart,  } from './partsFunction';

import { getHelpfullError, } from '../../../../../services/ErrorHandler';

import { addItemToArrayIfItDoesNotExist, } from '../../../../../services/arrayServices';


import { getRandomInt } from '../../ListProvisioning/ListsTMT/ItemsWebPart';

export interface IInspectPartsProps {
    // 0 - Context
    
    pageContext: PageContext;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.
    webURL?: string;

    showPane: boolean;
    allLoaded: boolean;

    currentUser: IUser;

    // 2 - Source and destination list information

}

export interface IMyHistory {
    count: number;
    errors: IMyProgress[];
    columns: IMyProgress[];
    views: IMyProgress[];
    items: IMyProgress[];

}

export interface IInspectPartsState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    currentPage: string;
    searchCount: number;
    
    searchedParts: IWPart[];
    first20SearchedParts: IWPart[];
    // 2 - Source and destination list information
    parts: IWPart[];
    meta: string[];

}

export default class InspectParts extends React.Component<IInspectPartsProps, IInspectPartsState> {

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

        parts: [],
        meta: [],
        searchedParts: [],
        first20SearchedParts: [],
        searchCount: 0,
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

    if ( prevProps.webURL != this.props.webURL ) {

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


            let thisPage = null;
            let stringsError = <tr><td>  </td><td>  </td><td>  </td></tr>;
           
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

            let myProgress = this.state.progress == null ? null : <ProgressIndicator 
                label={this.state.progress.label} 
                description={this.state.progress.description} 
                percentComplete={this.state.progress.percentComplete} 
                progressHidden={this.state.progress.progressHidden}/>;

            let partList = <MyLogList 
                title={ 'WebPart'}           items={ this.state.searchedParts }
                descending={false}          titles={null}            ></MyLogList>;

            /*https://developer.microsoft.com/en-us/fabric#/controls/web/searchbox*/
            let searchBox =           
            <div className={[styles.floatLeft, styles.padLeft20 ].join(' ')} >
              <SearchBox
                className={styles.searchBox}
                styles={{ root: { maxWidth: 300 } }}
                placeholder="Search"
                onSearch={ this.searchForItems.bind(this) }
                onFocus={ () => console.log('this.state',  this.state) }
                onBlur={ () => console.log('onBlur called') }
                onChange={ this.searchForItems.bind(this) }
              />
              <div className={styles.searchStatus}>
                { 'Searching about ' + this.state.searchCount + ' parts' }
                { /* 'Searching ' + (this.state.searchType !== 'all' ? this.state.filteredTiles.length : ' all' ) + ' items' */ }
              </div>
            </div>;

            let disclaimers = <div>
                <h2>Next steps</h2>
                <ul>
                    <li>Icons in first column for meta tags</li>
                    <li>See if there are any other parts of the webpart def object that might be helpful</li>
                    <li>Meta Tags: { this.state.meta.join(', ') }</li>
                </ul>
            </div>;

            const stackPageTokens: IStackTokens = { childrenGap: 10 };

            thisPage = <div className={styles.contents}>

                <div><div>{ disclaimers }</div>
                <div> { searchBox } </div>                
                <div style={{ height:30} }> {  } </div>
                <div> { myProgress } </div>
                <div>
                <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={stackPageTokens}>{/* Stack for Buttons and Fields */}
                    { partList }
                </Stack>
                </div>

            </div></div>;

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
                    { thisPage }
                </div>
            );
            
        } else {
            console.log('provisionPage.tsx return null');
            return (  <div className={ styles.contents }>
                <h2>There are no parts to see</h2>
            </div> );
        }

    }   //End Public Render


    private getPartDefs() {
        let result : any = allAvailableWebParts( this.addThesePartsToState.bind(this), this.setProgress.bind(this), this.markComplete.bind(this) );

    }

    private addThesePartsToState( allWebParts ) {

        let meta: string[] = [];
        for ( let p of allWebParts ) {
            if ( p.meta ) {
                for ( let x of p.meta ) {
                    meta = addItemToArrayIfItDoesNotExist( meta, x );
                }
            }
        }

        this.setState({
            parts: allWebParts,
            meta: meta,
            searchedParts: allWebParts,
            searchCount: allWebParts.length,
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

  
  public searchForItems = (item): void => {
    //This sends back the correct pivot category which matches the category on the tile.
    let e: any = event;
 
    console.log('searchForItems: e',e);

    console.log('searchForItems: item', item);
    console.log('searchForItems: this', this);
          /*
    */

    let searchItems : IWPart[] = this.state.parts;
    let searchCount = searchItems.length;

    let newFilteredParts : IWPart[] = [];

    for (let thisSearcPart of searchItems) {

      let searchString = thisSearcPart.searchString;
      if(searchString.indexOf(item.toLowerCase()) > -1) {
        newFilteredParts.push(thisSearcPart);
      }
    }

    console.log('Searched for:' + item);
    console.log('and found these parts:', newFilteredParts);
    searchCount = newFilteredParts.length;

    this.setState({
      searchedParts: newFilteredParts,
      searchCount: searchCount,
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
        this.getPartDefs();
    }

    private checkThisWeb(index: number, testPages : IWPart[] ){
        //const thisWeb = Web(testPages[index].webURL);
        //testPages[index].webExists = false;
        //testPages[index].pageExists = false;

        /*
        thisWeb.pages.get().then((response) => {
            testPages[index].webExists = true;
            this.checkThisPage(index, testPages, thisWeb);

        }).catch((e) => {
            let errMessage = getHelpfullError(e, true, true);
            console.log('checkThisWeb', errMessage);
            this.updateStatePages(index, testPages);
        });
    */

    }
    
    private checkThisPage(index: number, testPages : IWPart[], thisWeb: any ){
        //const thisWeb = Web(testPages[index].webURL);
        thisWeb.pages.getByTitle(testPages[index].title).get().then((response) => {
            //testPages[index].pageExists = true;
            //testPages[index].pageExistedB4 = true;   
            this.updateStatePages(index,testPages);

        }).catch((e) => {
            let errMessage = getHelpfullError(e, true, true);
            console.log('checkThisPage', errMessage);
            this.updateStatePages(index, testPages);
        });
    }

    private updateStatePages(index: number, testPages : IWPart[] ) {
        let stateParts = this.state.parts;
        //if (statePages === undefined ) { statePages = this.props.webURL ; }
        this.setState({
            parts: stateParts,
        });
    }
}