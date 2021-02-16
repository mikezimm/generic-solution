import * as React from 'react';
import { sp, Views, IViews } from "@pnp/sp/presets/all";

// For Pivot VVVV
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
// For Pivot ^^^^

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";
import { Web, IWeb } from "@pnp/sp/presets/all";

import styles from './GenericWebpart.module.scss';
import { IGenericWebpartProps } from './IGenericWebpartProps';
import { IGenericWebpartState } from './IGenericWebpartState';

import { escape } from '@microsoft/sp-lodash-subset';

import { IMyPivots, IPivot,  ILink, IUser, IMyIcons, IMyFonts, IChartSeries, ICharNote, IRefinerRules, RefineRuleValues } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';
import { IPickedList, IPickedWebBasic,  } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import InfoPage from './HelpInfo/infoPages';


//These are for provisionLists
import { IProvisionListsProps, IProvisionListsState} from './ListProvisioning/component/provisionListComponent';
//import { defineTheList } from './ListProvisioning/ListsTMT/defineThisList';
import { defineTheList } from './ListProvisioning/Harmonie/defineHarmonie';
import ProvisionLists from './ListProvisioning/component/provisionListComponent';
import ProvisionFields from './ListProvisioning/component/provisionFieldComponent';

import InspectContents from './Contents/contentsComponent';

import { IMakeThisList } from './ListProvisioning/component/provisionWebPartList';

//These are for provisionPages
import { IProvisionPagesProps, IProvisionPagesState} from './PageProvisioning/component/provisionPageComponent';
import { defineThePage } from './PageProvisioning/FinancePages/defineThisPage';
import ProvisionPages from './PageProvisioning/component/provisionPageComponent';
import ProvisionPatterns from './PageProvisioning/component/provisionPatternsComponent';

import { IMakeThisPage } from './PageProvisioning/component/provisionWebPartPages';


import { analyticsList } from 'GenericWebpartWebPartStrings';

import { cleanURL, camelize } from '@mikezimm/npmfunctions/dist/stringServices';
import { getHelpfullError } from '@mikezimm/npmfunctions/dist/ErrorHandler';

import * as links from './HelpInfo/AllLinks';
import  EarlyAccess from './HelpInfo/EarlyAccess';

import { createIconButton } from './createButtons/IconButton';

import { createGridDates } from '../../../services/sampleData';


const emptyString = (value: string | Date) : string => { return "";};

export default class GenericWebpart extends React.Component<IGenericWebpartProps, IGenericWebpartState> {

  private errTitles() {
    let options = [
      'Oh Snap! We have a slight problem!',
      'Houston, We have a problem!',
      'Typo Alert!',
      'Uhhmm... I have an issue!',
      'Not sure what to say except...',
      'We call these possible Typos...',
      'Typos cost 1 Gazzilion lost electrons every year...',
      'My AutoCorrect never fails... but...',
      'May I call you ' + this.props.pageContext.user.displayName + '?',
      'But but but... I know humans don\'t make mistakes',
      'Please dial ++ (888)-TyposRUs'
    ];

    return options[Math.floor(Math.random() * options.length)];

  }

  private createPivotData(testForSomething:boolean){
    // Using https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements
    let pivots : IMyPivots = {
      heading1: 
        [
          { headerText: "Lists",
            filter: "lists",
            itemKey: "lists",
            data: "Provision Lists",
            lastIndex: null,
          },
          { headerText: "Pages",
            filter: "pages",
            itemKey: "pages",
            data: "Provision Pages",
            lastIndex: null,
          },
          { headerText: "WebParts",
            filter: "webparts",
            itemKey: "webparts",
            data: "Get webpart definitions",
            lastIndex: null,
          },
          { headerText: "DrillDown",
          filter: "drillDown",
          itemKey: "drillDown",
          data: "Test Drilldown",
          lastIndex: null,
        },
        ]
      ,
    };

    return pivots;

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


public constructor(props:IGenericWebpartProps){
  super(props);

  let parentWeb = cleanURL(this.props.parentListWeb);
  let childWeb = cleanURL(this.props.childListWeb);

  this.state = {

        // 0 - Context
        description: 'string',

        //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
        WebpartHeight: this.props.WebpartElement.getBoundingClientRect().height ,
        WebpartWidth:  this.props.WebpartElement.getBoundingClientRect().width - 50 ,

        currentUser: null,

        //pivots?: IMyPivots;
        pivots: this.createPivotData(false),

        //fields?: IFormFields; //List of field defininitions for making form fields
      
        // 1 - Analytics options
        //loadData?: {
          //user: any;
          //projects: any[];
          //entries: any[];
        //};
      
        // 2 - Source and destination list information
        parentListURL: parentWeb + 'lists/' + this.props.parentListTitle, //Get from list item
        childListURL: childWeb + 'lists/' + this.props.childListTitle, //Get from list item
      
        parentListWeb: parentWeb, //Get from list item
        childListWeb: childWeb, //Get from list item
      
        parentListTitle: this.props.parentListTitle,  // Static Name of list (for URL) - used for links and determined by first returned item
        childListTitle: this.props.childListTitle,  // Static Name of list (for URL) - used for links and determined by first returned item

        pickedWeb: null,
        // 3 - General how accurate do you want this to be
      
        // 4 - Info Options
        pivtTitles:['Yours', 'Your Team','Everyone','Others'],
        filteredCategory: null, //this.props.defaultProjectPicker,
        pivotDefSelKey: "",
        onlyActiveParents: null, //Only read in active projects.
      
        // 5 - UI Defaults
      
        // 6 - User Feedback:
        //currentUser?: IUser;  //Current user information
        
        chartData: null,
        showCharts: null,
      
        selectedUser: null,
        userFilter: null,
        chartStringFilter: null,
      
        formEntry: null,
      
        progress: this.props.progress,
        // 7 - TBD
      
        // 9 - Other web part options
      
        loadStatus: "Loading",
        allLoaded: false,
      
        loadOrder: "", //This just tells us what order the rest calls came back
      
        parentsLoadStatus: "Loading",
        parentsLoadError: "",
        parentsListError: false,
        parentsItemsError: false,
      
        childLoadStatus: "Loading",
        childLoadError: "",
        childListError: false,
        childItemsError: false,
      
        userLoadStatus:"Loading",
      
        errTitle: this.errTitles(),
        showTips: false,
        loadError: "",
        debugColors: false,
      
        listError: false,
        itemsError: false,
        stateError: [],
  
        searchType: '',
        searchShow: true,
        searchCount: 0,
        searchWhere: '',

        makeThisList: null,
  
  };
}


public componentDidMount() {
  this._onWebUrlChange(this.props.parentListWeb);
  if ( this.props.allowRailsOff === true ) {
    this.getListDefinitions('state');
  }
}

public async getListDefinitions( doThis: 'props' | 'state') {

  //This only needs to be async if you are generating sample list items based on the current user.
  //If not, just create the allLists onInit
  sp.web.currentUser.get().then((r) => {

    let currentUser : IUser = {
      title: r['Title'] , //
      Title: r['Title'] , //
      initials: r['Title'].split(" ").map((n)=>n[0]).join(""), //Single person column
      email: r['Email'] , //Single person column
      id: r['Id'] , //
      Id: r['Id'] , //
      ID: r['Id'] , //
      remoteID: null,
      isSiteAdmin: r['IsSiteAdmin'],
      LoginName: r['LoginName'],
      Name: r['LoginName'],
    };

    let theLists : IMakeThisList[] = [];

    if( theLists.length > 1 ) { //This may not be required... maybe just legacy setup when I had to update prop pane props for Web and ListName

      let parentName =  doThis === 'state' ? this.state.parentListTitle : this.props.parentListTitle;
      let childName =  doThis === 'state' ? this.state.childListTitle : this.props.childListTitle;
      let parentListWeb = doThis === 'state' ? this.state.parentListWeb : this.props.parentListWeb;
      let childListWeb = doThis === 'state' ? this.state.childListWeb : this.props.childListWeb;
  
      parentListWeb = cleanURL(parentListWeb);
      childListWeb = cleanURL(childListWeb);
  
      let parentList : IMakeThisList = defineTheList( 101 , parentName, 'Emails' , parentListWeb, [currentUser.Id], this.props.pageContext.web.absoluteUrl );
      let childList : IMakeThisList = defineTheList( 101 , childName, 'Emails' , childListWeb, [currentUser.Id], this.props.pageContext.web.absoluteUrl );
  
      if ( parentList ) { theLists.push( parentList ); }
      if ( childList ) { theLists.push( childList ); }
    }

    this.setState({  
      currentUser: currentUser,
      allLists: theLists,
    });

  }).catch((e) => {
    console.log('ERROR:  catch sp.web.currentUser:', e);
  });

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

    let rebuildPart = false;
    //console.log('DIDUPDATE setting Progress:', this.props.progress);
    if (this.props.progress !== prevProps.progress) {  rebuildPart = true ; }

    if ( prevProps.parentListTitle != this.props.parentListTitle || prevProps.childListTitle != this.props.childListTitle || prevProps.parentListWeb != this.props.parentListWeb || prevProps.childListWeb != this.props.childListWeb ) {
      if ( this.props.allowRailsOff === true ) {
        this.getListDefinitions('props');
      }
      rebuildPart = true ;
    }
    if (rebuildPart === true) {
      this._updateStateOnPropsChange({});
    }
  }

    //Format copied from:  https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield
    private getWebBoxStyles( props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
        const { required } = props;
        return { fieldGroup: [ { width: '75%', maxWidth: '700px' }, { borderColor: 'lightgray', }, ], };
    }


  public render(): React.ReactElement<IGenericWebpartProps> {

      //console.log('RENDER setting Progress:', this.props.progress);

      //Set the web Url passed down to a component
      let webUrl = this.state.parentListWeb && this.state.parentListWeb.length > 0 ? this.state.parentListWeb : this.props.pageContext.web.absoluteUrl;
      let defaultPageClass = this.state.stateError.length === 0 ? styles.showPage : styles.hidePage;

      let thisWebURL = this.props.allowRailsOff !== true ? null : 
        <div style={{ display: 'inline-table', paddingBottom: '20px', paddingTop: '20px', width: '100%', background: 'lightgray' }}>
          <span style={{ paddingLeft: '20px', paddingRight: '20px', fontSize: 'larger', fontWeight: 600 }}>WebURL</span>
          <TextField
            className={ styles.textField }
            styles={ this.getWebBoxStyles  } //this.getReportingStyles
            defaultValue={ this.props.parentListWeb }
            label={ null }
            autoComplete='off'
            onChanged={ this._onWebUrlChange.bind(this) }
            onGetErrorMessage= { emptyString }
            validateOnFocusIn
            validateOnFocusOut
            multiline= { false }
            autoAdjustHeight= { true }

          /></div>;


      /**
       * NOTE:  Before I messed it up, provisionListPage had these props.
          provisionWebs = { [this.props.parentListWeb, this.props.childListWeb] }
          provisionListTitles = { [this.props.parentListTitle, this.props.childListTitle] }
       */
      const provisionListPage  = this.props.allowRailsOff !== true ? null : 
        <div className= { defaultPageClass }>
          <ProvisionLists 

              updateMakeThisList= { this.updateMakeThisList.bind(this) }
              makeThisList={ this.state.makeThisList }
              
              useListAnalytics= { this.props.useListAnalytics }
              analyticsWeb= { this.props.analyticsWeb }
              analyticsList= { this.props.analyticsList }
              tenant= { this.props.tenant }
              urlVars= { this.props.urlVars }

              allowOtherSites={ false }
              alwaysReadOnly = { false }
              pageContext={ this.props.pageContext }
              showPane={true}
              allLoaded={false}
              currentUser = {this.state.currentUser }
              lists = { [] }

              definedList = { '' }
              provisionWebs = { [ this.state.pickedWeb ? this.state.pickedWeb.url : '' ] }
              provisionListTitles = { [] }

            ></ProvisionLists>
          </div>;

    const provisionFieldPage  = this.props.allowRailsOff !== true ? null : 
    <div className= { defaultPageClass }>
      <ProvisionFields 
      
        updateMakeThisList= { this.updateMakeThisList.bind(this) }
        makeThisList={ this.state.makeThisList }

        useListAnalytics= { this.props.useListAnalytics }
        analyticsWeb= { this.props.analyticsWeb }
        analyticsList= { this.props.analyticsList }
        tenant= { this.props.tenant }
        urlVars= { this.props.urlVars }



          allowOtherSites={ false }
          alwaysReadOnly = { false }
          pageContext={ this.props.pageContext }
          showPane={true}
          allLoaded={false}
          currentUser = {this.state.currentUser }
          lists = { [] }

          definedList = { '' }
          provisionWebs = { [ this.state.pickedWeb ? this.state.pickedWeb.url : '' ] }
          provisionListTitles = { [] }

        ></ProvisionFields>
      </div>;

      const provisionPagesPage = this.props.allowRailsOff !== true ? null :  
        <div className= { defaultPageClass }>
          <ProvisionPages 
              
              useListAnalytics= { this.props.useListAnalytics }
              analyticsWeb= { this.props.analyticsWeb }
              analyticsList= { this.props.analyticsList }
              tenant= { this.props.tenant }
              urlVars= { this.props.urlVars }
              pickedWeb = { this.state.pickedWeb }

              allowOtherSites={ false }
              alwaysReadOnly = { false }
              pageContext={ this.props.pageContext }
              showPane={true}
              allLoaded={false}
              webURL = { webUrl }
              currentUser = {this.state.currentUser }
              pages = { this.state.allPages }

            ></ProvisionPages>
        </div>;

      const provisionPatternsPage = this.props.allowRailsOff !== true ? null :  
        <div className= { defaultPageClass }>
          <ProvisionPatterns 
              
              useListAnalytics= { this.props.useListAnalytics }
              analyticsWeb= { this.props.analyticsWeb }
              analyticsList= { this.props.analyticsList }
              tenant= { this.props.tenant }
              urlVars= { this.props.urlVars }
              pickedWeb = { this.state.pickedWeb }

              allowOtherSites={ false }
              alwaysReadOnly = { false }
              pageContext={ this.props.pageContext }
              showPane={true}
              allLoaded={false}
              webURL = { webUrl }
              currentUser = {this.state.currentUser }
              pages = { this.state.allPages }

            ></ProvisionPatterns>
        </div>;


      const infoPage = this.props.allowRailsOff !== true ? null : 
        <div>
          <InfoPage 
              allLoaded={ true }
              showInfo={ true }
              parentProps= { this.props }
              parentState= { this.state }
          ></InfoPage>
        </div>;

      const contentsPage = <div className= { defaultPageClass }>
        <InspectContents

          useListAnalytics= { this.props.useListAnalytics }
          analyticsWeb= { this.props.analyticsWeb }
          analyticsList= { this.props.analyticsList }
          tenant= { this.props.tenant }
          urlVars= { this.props.urlVars }

          allowOtherSites={ false }
          pageContext={ this.props.pageContext }
          showPane={true}
          allLoaded={false}
          currentUser = {this.state.currentUser }
          pickedWeb = { this.state.pickedWeb }
          showSettings = { true }
          showRailsOff = { true }
          allowRailsOff = { this.props.allowRailsOff }
          allowSettings = { true }
          allowCrazyLink = { this.props.allowCrazyLink }
          WebpartHeight = { this.state.WebpartHeight }
          WebpartWidth = { this.state.WebpartWidth }
          parentProps = { this.props.allowRailsOff === true ? null : this.props }
          parentState = { this.props.allowRailsOff === true ? null : this.state } 
                  //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

        ></InspectContents>
      </div>;

      const pivotGap: Partial<IStyleSet<ILabelStyles>> = {
        root: { marginTop: 10 },
      };


      let MyPivot = this.props.allowRailsOff !== true ?
        <div className= { defaultPageClass } style={{ paddingLeft: 10, paddingRight: 20 }}>
          { contentsPage }
        </div>
        
      :<div className= { defaultPageClass } style={{ paddingLeft: 10, paddingRight: 20 }}>
        <Pivot aria-label="Provision Options"
          defaultSelectedIndex ={ 3 }>

          <PivotItem headerText="Fields">
                { provisionFieldPage }
          </PivotItem>

          <PivotItem headerText="Lists">
                { provisionListPage }
          </PivotItem>

          <PivotItem headerText="Pages">
              { provisionPagesPage }
          </PivotItem>

          <PivotItem headerText="Patterns">
              { provisionPatternsPage }
          </PivotItem>
          
          <PivotItem headerText="Contents">
              { contentsPage }
          </PivotItem>    

          { this.props.urlVars['create'] ===  "true" ?
                <PivotItem headerText="Create">
                    { createIconButton('Cat', 'Create Items', createGridDates , 'CreateID', {
                        root: {padding:'20px !important', height: 32},//color: 'green' works here
                        icon: { 
                          fontSize: 28,
                          fontWeight: "normal",
                          margin: '0px 2px',
                          color: '#00457e', //This will set icon color
                      },
                      }) 
                    }
                </PivotItem>
          : null }

          <PivotItem headerText="Help">
              { infoPage }
          </PivotItem>



        </Pivot></div>;

    let stateError = this.state.stateError.length === 0 ? null :
      <div>
        { this.state.stateError }
      </div>;
      
      let earlyAccess = 
      <EarlyAccess 
          image = { "https://autoliv.sharepoint.com/sites/crs/PublishingImages/Early%20Access%20Image.png" }
          messages = { [ <div><span><b>Welcome to ALV Webpart Early Access!!!</b></span></div>, "Get more info here -->"] }
          links = { [ links.gitRepoGenericWebpart.wiki, links.gitRepoGenericWebpart.issues ]}
          email = { 'mailto:General - WebPart Dev <0313a49d.Autoliv.onmicrosoft.com@amer.teams.ms>?subject=Contents Webpart Feedback&body=Enter your message here :)  \nScreenshots help!' }
      ></EarlyAccess>;

    return (
      <div className={ styles.genericWebpart }>
      <div className={ styles.container }>
      <div className={ styles.topPivots }>
          { /* thisWebURL */ }
          { earlyAccess }
          { thisWebURL }
          { stateError }
          { MyPivot }
      </div>
      </div>
      </div>

    );
  }

  private async _onWebUrlChange(newValue: string){

      let ev = event.target;
      let errMessage = null;
      let stateError : any[] = [];
      const thisWebObject = Web( newValue );
      let getMinProps = 'Title,Id,Url,ServerRelativeUrl,SiteLogoUrl,Description';

      let pickedWeb : IPickedWebBasic = {
          ServerRelativeUrl: 'Site ServerRelativeUrl',
          guid: 'Site Guid',
          title: 'Site Title',
          url: 'siteURL',
          siteIcon: 'Site Icon',
          error: errMessage,
      };

      try {
        const webbie = await thisWebObject.select(getMinProps).get();
        pickedWeb = {
            ServerRelativeUrl: webbie.ServerRelativeUrl,
            guid: webbie.Id,
            title: webbie.Title,
            url: webbie.Url,
            siteIcon: webbie.SiteLogoUrl,
            error: errMessage,
        };

      } catch (e) {
        errMessage = getHelpfullError(e, true, true );
        stateError.push( <div style={{ padding: '15px', background: 'yellow' }}> <span style={{ fontSize: 'larger', fontWeight: 600 }}>Can't find the site</span> </div>);
        stateError.push( <div style={{ paddingLeft: '25px', paddingBottom: '30px', background: 'yellow' }}> <span style={{ fontSize: 'large', color: 'red'}}> { errMessage }</span> </div>);
      }

      this.setState({ parentListWeb: newValue, stateError: stateError, pickedWeb: pickedWeb });

    return;

  }


  //definedList

  private updateMakeThisList( makeThisList: IMakeThisList ) {

    this.setState({ makeThisList: makeThisList, });
  }


  //This does not work either to float right button/tab
    private _customRenderer(
      link: IPivotItemProps,
      defaultRenderer: (link: IPivotItemProps) => JSX.Element,
    ): JSX.Element {
      return (
        <span>
          {defaultRenderer({ ...link, itemIcon: undefined, })}
          <Icon iconName={'Info'} style={{ color: 'red' }} />
        </span>
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

  private _updateStateOnPropsChange(params: any ): void {

      
    this.setState({
      progress: this.props.progress,
    });
  }

}
