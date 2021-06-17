import * as React from 'react';
import { sp, Views, IViews } from "@pnp/sp/presets/all";

// For Pivot VVVV
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
// For Pivot ^^^^

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { PageContext } from '@microsoft/sp-page-context';

import styles from './contents.module.scss';

import { escape } from '@microsoft/sp-lodash-subset';

import { IPickedWebBasic, IPickedList, }  from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
import { IMyPivCat, IMyPivots,IPivot, ILink } from '@mikezimm/npmfunctions/dist/Pivots/IzPivots';
import { IMyIcons, IMyFonts } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IChartSeries, ICharNote, } from '@mikezimm/npmfunctions/dist/CSSCharts/ICSSCharts';

import * as links from '@mikezimm/npmfunctions/dist/HelpInfo/Links/LinksRepos';

import InfoPages from '../HelpInfo/Component/InfoPages';

import InspectLists from './Lists/listsComponent';

import InspectColumns from './Fields/fieldsComponent';

import InspectViews from './Views/viewsComponent';

import InspectWebs from './Webs/websComponent';

import InspectGroups from './Groups/groupsComponent';

import InspectUsers from './Users/usersComponent';

import InspectFeatures from './Features/featuresComponent';

import InspectParts from './WParts/partsComponent';

import InspectThisSite from './ThisSite/thisSiteComponent';

import { Web } from "@pnp/sp/presets/all";

import { pivotOptionsGroup, } from '../../../../services/propPane';
 
import { doesObjectExistInArray } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';

import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../../../services/createAnalytics';

import { IGenericWebpartProps } from '../IGenericWebpartProps';
import { IGenericWebpartState } from '../IGenericWebpartState';

export interface IInspectContentsProps {
    // 0 - Context
    
    parentProps?: IGenericWebpartProps;
    parentState?: IGenericWebpartState;

    wpContext: WebPartContext;
    pageContext: PageContext;

      // 1 - Analytics options
    useListAnalytics: boolean;
    analyticsWeb: string;
    analyticsList: string;
    tenant: string;
    urlVars: {};

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.
    pickedWeb : IPickedWebBasic;

    showPane: boolean;
    allLoaded: boolean;

    currentUser: IUser;

    allowSettings: boolean;
    allowRailsOff: boolean;
    allowCrazyLink: boolean;

    showSettings: boolean;  //property set by toggle to actually show or hide this content
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    WebpartHeight: number;
    WebpartWidth: number;

    uniqueId: string;

    // 2 - Source and destination list information

}

export interface IInspectContentsState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    tab?: string;

    pickedList? : IPickedList;

    allLoaded: boolean;

    allowSettings: boolean;  //property that determines if the related toggle is visible or not
    allowRailsOff: boolean;  //property that determines if the related toggle is visible or not
    allowCrazyLink: boolean;

    showSettings: boolean;  //property set by toggle to actually show or hide this content
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    WebpartHeight: number;
    WebpartWidth: number;

}

export const contentsTabs = ['Site','Web','Subsites','Lists','Columns','Views','Types','WebParts','Groups', 'Users', 'Features', 'RailsOff'];

export default class InspectContents extends React.Component<IInspectContentsProps, IInspectContentsState> {


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


    public constructor(props:IInspectContentsProps){
    super(props);

    let ServerRelativeUrl = this.props.pageContext.web.serverRelativeUrl;
    let pickedWeb = this.props.pickedWeb ? this.props.pickedWeb.ServerRelativeUrl : ServerRelativeUrl;
    //saveAnalytics (analyticsWeb, analyticsList, serverRelativeUrl, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, richText ) {
    saveAnalytics( this.props.analyticsWeb, this.props.analyticsList, //analyticsWeb, analyticsList,
        ServerRelativeUrl, ServerRelativeUrl,//serverRelativeUrl, webTitle,
        'EasyContents', pickedWeb, null, //saveTitle, TargetSite, TargetList
        'Contents', 'Constructor', 'Loading', //itemInfo1, itemInfo2, result, 
        '','Contents', null, null ); //richText, Setting, richText2, richText3

    let railsMode = this.props.allowRailsOff && this.props.showRailsOff ? true : false ;
    this.state = {

            //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
            WebpartHeight: this.props.WebpartHeight ,
            WebpartWidth:  this.props.WebpartWidth ,
        
            // 2 - Source and destination list information

            allLoaded: false,

            allowSettings: this.props.allowSettings === true ? true : false,
            allowRailsOff: this.props.allowRailsOff === true ? true : false,
            allowCrazyLink: this.props.allowCrazyLink === true ? true : false,

            showRailsOff: railsMode ,
            showSettings: this.props.showSettings,

            tab: 'Lists',
    
    };
    }


    public componentDidMount() {
        
        
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

        let rebuildPart = prevProps.pickedWeb === this.props.pickedWeb ? false : true;
        if (rebuildPart === true) {
            console.log( 'componentDidUpdate: contentsComponent.tsx');
        }
    }

    public render(): React.ReactElement<IInspectContentsProps> {

        let pickedWebError = null;
        let pickedWebUrl = null;
        let validWeb = !this.props.pickedWeb || this.props.pickedWeb.error !== null ? false : true;

        if ( validWeb === true ) {
            pickedWebUrl = this.props.pickedWeb.url;

        } else {
            pickedWebError = 'Web not found';
        }

        const pickListMessage = <div style={{ paddingBottom: 30, paddingTop: 30 }}>Please pick a list first</div>;
        const pickWebMessage = <div style={{ paddingBottom: 30, paddingTop: 30  }}>Please pick a WEB first</div>;
        const noPageAvailable = <div style={{ paddingBottom: 30, paddingTop: 30  }}>This feature is not yet available</div>;

        //InspectThisSite
        let thisSiteTab: any = contentsTabs[0];
        const sitePage = validWeb !== true ? pickWebMessage : <div>
            <InspectThisSite 
                siteOrWeb = { thisSiteTab }
                pageContext = { this.props.pageContext }
                currentUser = { this.props.currentUser }
                allowOtherSites = { true }
                allLoaded = { true }
                pickedWeb = { this.props.pickedWeb }
                allowRailsOff = { this.state.allowRailsOff }
                allowSettings = { this.state.allowSettings }
                allowCrazyLink = { this.props.allowCrazyLink }
                //webURL = { this.props.pickedWeb.url }
            ></InspectThisSite>
        </div>;
        //InspectThisWeb

        let thisWebTab: any = contentsTabs[1];
        const webPage = validWeb !== true ? pickWebMessage : <div>
            <InspectThisSite 
                siteOrWeb = { thisWebTab }
                pageContext = { this.props.pageContext }
                currentUser = { this.props.currentUser }
                allowOtherSites = { true }
                allLoaded = { true }
                pickedWeb = { this.props.pickedWeb }
                allowRailsOff = { this.state.allowRailsOff }
                allowSettings = { this.state.allowSettings }
                allowCrazyLink = { this.props.allowCrazyLink }
                //webURL = { this.props.pickedWeb.url }
            ></InspectThisSite>
        </div>;

        const websPage = validWeb !== true ? pickWebMessage : <div>
            <InspectWebs 
                pageContext = { this.props.pageContext }
                currentUser = { this.props.currentUser }
                allowOtherSites = { true }
                allLoaded = { true }
                pickedWeb = { this.props.pickedWeb }
                allowRailsOff = { this.state.allowRailsOff }
                allowSettings = { this.state.allowSettings }
                allowCrazyLink = { this.props.allowCrazyLink }
            ></InspectWebs>
        </div>;

        const listPage = validWeb !== true || this.state.tab !== 'Lists' ? null : <div>
            <InspectLists 
                wpContext={  this.props.wpContext }
                pageContext = { this.props.pageContext }
                currentUser = { this.props.currentUser }
                allowOtherSites = { true }
                allLoaded = { true }
                pickedList = { this.state.pickedList }
                pickThisList = { this.updatePickList.bind(this) }
                allowRailsOff = { this.state.allowRailsOff }
                allowSettings = { this.state.allowSettings }
                allowCrazyLink = { this.props.allowCrazyLink }
                pickedWeb = { this.props.pickedWeb }
                analyticsWeb= { this.props.analyticsWeb }
                analyticsList= { this.props.analyticsList }
            ></InspectLists>
        </div>;

        const columnsPage = validWeb !== true || !this.state.pickedList ? pickListMessage : <div>
            <InspectColumns 
                pageContext = { this.props.pageContext }
                currentUser = { this.props.currentUser }
                allowOtherSites = { true }
                allLoaded = { true }
                pickedList = { this.state.pickedList }
                allowRailsOff = { this.state.allowRailsOff }
                allowSettings = { this.state.allowSettings }
                allowCrazyLink = { this.props.allowCrazyLink }
                pickedWeb = { this.props.pickedWeb }
            ></InspectColumns>
        </div>;

        const partsPage = validWeb !== true ? null : <div>
            <InspectParts 
                allowOtherSites={ false }
                pageContext={ this.props.pageContext }
                showPane={true}
                allLoaded={false}
                currentUser = {this.props.currentUser }
                pickedWeb = { this.props.pickedWeb }
            ></InspectParts>
        </div>;

        const viewsPage = validWeb !== true || !this.state.pickedList ? pickListMessage : <div>
        <InspectViews 
            pageContext = { this.props.pageContext }
            currentUser = { this.props.currentUser }
            allowOtherSites = { true }
            allLoaded = { true }
            pickedList = { this.state.pickedList }
            allowRailsOff = { this.state.allowRailsOff }
            allowSettings = { this.state.allowSettings }
            allowCrazyLink = { this.props.allowCrazyLink }
            pickedWeb = { this.props.pickedWeb }
        ></InspectViews>
    </div>;

        const typesPage = <div>
                { noPageAvailable }
        </div>;

        const groupsPage = validWeb !== true ? null : <div>
            <InspectGroups
                wpContext={  this.props.wpContext }
                allowOtherSites={ false }
                pageContext={ this.props.pageContext }
                pickedWeb = { this.props.pickedWeb }
                showPane={true}
                allLoaded={false}
                currentUser = {this.props.currentUser }
            ></InspectGroups>
        </div>;

        const usersPage = validWeb !== true ? null : <div>
        <InspectUsers
            allowOtherSites={ false }
            pageContext={ this.props.pageContext }
            pickedWeb = { this.props.pickedWeb }
            showPane={true}
            allLoaded={false}
            currentUser = {this.props.currentUser }
        ></InspectUsers>
        </div>;

        const featurePage = validWeb !== true ? null : <div>
        <InspectFeatures
            allowOtherSites={ false }
            pageContext={ this.props.pageContext }
            pickedWeb = { this.props.pickedWeb }
            showPane={true}
            allLoaded={false}
            currentUser = {this.props.currentUser }
        ></InspectFeatures>
        </div>;

      //Build up hard coded array of user emails that can
      let showTricks = false;
      links.trickyEmails.map( getsTricks => {
        if ( this.props.pageContext.user.loginName && this.props.pageContext.user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { showTricks = true ; }   } ); 

        let infoPages = 
            // <div id={ 'InfoPagesID' + this.props.uniqueId } style={{ display: 'none' }}> //This was display:none on carrotCharts because it was not using react.
            <div id={ 'InfoPagesID' + this.props.uniqueId } style={{  }}>
                <InfoPages 
                    showInfo = { true }
                    allLoaded = { true }
                    showTricks = { showTricks }

                    parentListURL = { null }
                    childListURL = { null }

                    parentListName = { null }
                    childListName = { null }

                    gitHubRepo = { links.gitRepoEasyContnets }

                    hideWebPartLinks = { false }
                ></InfoPages>
            </div>;

        const railsPage = validWeb !== true ? null : <div>
            { noPageAvailable }
        </div>;

        const pivotGap: Partial<IStyleSet<ILabelStyles>> = {
            root: { marginTop: 10 },
        };


        let MyPivot = <div style={{ paddingLeft: 10, paddingRight: 20 }}><Pivot 
            aria-label="Contents Options"
            linkSize= { pivotOptionsGroup.getPivSize('normal') }
            linkFormat= { pivotOptionsGroup.getPivFormat('tabs') }
            selectedKey= { contentsTabs.indexOf(this.state.tab).toFixed() }
            defaultSelectedKey= { contentsTabs.indexOf(this.state.tab).toFixed() }
            onLinkClick={ this.updatePickList2.bind(this) }

        >
            { /* export const contentsTabs = ['Lists','Columns','Views','Types','WebParts','Groups']; */ }

            <PivotItem headerText={ contentsTabs[0] }>
                { sitePage }
            </PivotItem>

            <PivotItem headerText={ contentsTabs[1] }>
                { webPage }
            </PivotItem>

            <PivotItem headerText={ contentsTabs[2] }>
                { websPage }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[3] }>
                { listPage }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[4] }>
                { columnsPage }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[5] }>
                { viewsPage }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[6] }>
                <h3>Types</h3>
                { typesPage }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[7] }>
                { partsPage }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[8] }>
                { groupsPage }
            </PivotItem>

            <PivotItem headerText={ contentsTabs[9] }>
                { usersPage }
            </PivotItem>

            <PivotItem headerText={ contentsTabs[10] }>
                <h3>Features</h3>
                { featurePage }
            </PivotItem>

            

            {  !this.state.allowRailsOff ? 
                <PivotItem headerText="Help">
                    { infoPages }
                </PivotItem>:
                <PivotItem headerText={ contentsTabs[11] }>
                    <h3>RailsOff</h3>
                    { railsPage }
                </PivotItem>

             }
        </Pivot></div>;

        return (
            <div className={ styles.contents }>
            <div className={ styles.container }>
            <div className={ styles.rightContents }>
                { MyPivot }
            </div>
            </div>
            </div>
        );
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

    // public searchForItems = (item): void => {
    // private updatePickList2  = (ev: React.FormEvent<HTMLInputElement>): void => {
    private updatePickList2  = (item): void => {

        let thisTab = item.props.headerText;
        this.setState({
            tab: thisTab,
        });
    }
   
    private updatePickList  = (ev: React.FormEvent<HTMLInputElement>): void => {

        //let itemID = (item.title + '|Splitme|' + item.activity);
        let parent = ev.currentTarget.parentElement;
        let buttonID = parent.id;

        //2020-05-11:  Issue 44 Added so activity can have / or \ from partial URLs
        buttonID = buttonID.replace(/forwardSSlash/gi, '\/');
        buttonID = buttonID.replace(/backwardSSlash/gi, '\\');

        let splitID = buttonID.split('|Splitme|');
        let thisTab = splitID[0];
        let thisId = splitID[1];
        let thisName = splitID[2];
        let thisTitle = splitID[3];
        let isLibrary : boolean = splitID[4] === 'Libraries' ? true : false;

        console.log('updatePickList:', ev );
        console.log('splitID:', splitID );
        
        let thisList : IPickedList = {
            title: thisTitle,
            name: thisName,
            guid: thisId,
            isLibrary : isLibrary,
        };

        this.setState({
            pickedList: thisList,
            tab: thisTab,
        });
    }

    private _updateStateOnPropsChange(params: any ): void {
        console.log('_updateStateOnPropsChange');

    }

}
