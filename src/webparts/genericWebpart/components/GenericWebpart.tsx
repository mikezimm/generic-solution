import * as React from 'react';
import { sp, Views, IViews, ISite } from "@pnp/sp/presets/all";

// For Pivot VVVV
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
// For Pivot ^^^^

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";
import { Web, IWeb } from "@pnp/sp/presets/all";

import { IconButton, IIconProps, IContextualMenuProps, Stack, Link } from 'office-ui-fabric-react';

import { debounce } from "throttle-debounce";

import styles from './GenericWebpart.module.scss';
import { IGenericWebpartProps } from './IGenericWebpartProps';
import { IGenericWebpartState } from './IGenericWebpartState';

import { escape } from '@microsoft/sp-lodash-subset';

import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
import { IMyPivots,  } from '@mikezimm/npmfunctions/dist/Pivots/IzPivots';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';


import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import  EarlyAccess from './HelpInfo/EarlyAccess';
import { IEarlyAccessItem } from './HelpInfo/EarlyAccess';

import InfoPages from './HelpInfo/Component/InfoPages';

import * as links from '@mikezimm/npmfunctions/dist/HelpInfo/Links/LinksRepos';



//These are for provisionLists
import { IProvisionListsProps, IProvisionListsState} from './ListProvisioning/component/provisionListComponent';
//import { defineTheList } from './ListProvisioning/ListsTMT/defineThisList';
import { defineTheList } from './ListProvisioning/Harmonie/defineHarmonie';
import ProvisionLists from './ListProvisioning/component/provisionListComponent';
import ProvisionFields from './ListProvisioning/component/provisionFieldComponent';
import ProvisionItems from './ListProvisioning/component/provisionItemsComponent';


import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../../../services/railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../../../services/railsCommon/ProvisionTypes';

import InspectContents from './Contents/contentsComponent';

import { createIconButton , defCommandIconStyles} from "./createButtons/IconButton";

//These are for provisionPages
import { IProvisionPagesProps, IProvisionPagesState} from './PageProvisioning/component/provisionPageComponent';
import { defineThePage } from './PageProvisioning/FinancePages/defineThisPage';
import ProvisionPages from './PageProvisioning/component/provisionPageComponent';
import ProvisionPatterns from './PageProvisioning/component/provisionPatternsComponent';

import { IMakeThisPage } from './PageProvisioning/component/provisionWebPartPages';


import { analyticsList } from 'GenericWebpartWebPartStrings';

import { cleanURL } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';
import { getHelpfullErrorV2 } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { BaseErrorTrace } from '../../../services/BaseErrorTrace';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

import { getSiteInfo } from './Contents/Lists/listsFunction';

const emptyString = (value: string | Date) : string => { return "";};

export default class GenericWebpart extends React.Component<IGenericWebpartProps, IGenericWebpartState> {

  // private buildEarlyAccessButton( title: string, icon: string, onClick: any, ) {
  //   defCommandIconStyles.icon.fontWeight = '600' ;
    
  //   return <div title={ title } className= {stylesB.buttons} id={ 'NoID' } style={{background: 'white', opacity: .7, borderRadius: '10px', cursor: 'pointer' }}>
  //     <IconButton iconProps={{ iconName: icon }} 
  //       text= { 'parent component' }
  //       title= { title } 
  //       //uniqueId= { titleText } 
  //       //data= { titleText } 
  //       //key= { titleText } 
  //       ariaLabel= { title } 
  //       disabled={false} 
  //       checked={false}
  //       onClick={ onClick }
  //       styles={ defCommandIconStyles }
  //       />
  //   </div>;

  // }

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
        isCurrentWeb: false,
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

        theSite: null,
  
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

      let allowOtherSites = false;
      let parentListWeb = cleanURL(this.props.parentListWeb);
      //if ( parentListWeb.toLowerCase().indexOf( '.sharepoint.com/sites/Templates/'.toLowerCase() ) === 0 ) { allowOtherSites = true ; } 
      //else if ( parentListWeb.toLowerCase().indexOf( '.sharepoint.com/sites/WebPartDev/'.toLowerCase() ) === 0 ) { allowOtherSites = true ; } 
      //else if ( this.props.urlVars['allowOtherSites'] && this.props.urlVars['allowOtherSites'] === "true" ) { allowOtherSites = true; }

      if ( this.props.urlVars['allowOtherSites'] && this.props.urlVars['allowOtherSites'] === "true" ) { allowOtherSites = true; }

      let isCurrentWeb = this.state.isCurrentWeb;
      let notAllowOtherSites =  <div><div style={{ padding: '30px', background: 'yellow', margin: '20px', marginBottom: '50px', textAlign: 'center' }}>
        <span style={{ fontSize: 'x-large', color: 'red'}}> Feature not available Cross-Site</span> </div><div style={{height: '20px'}}></div></div>;

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

              allowOtherSites={ allowOtherSites }
              alwaysReadOnly = { false }
              pageContext={ this.props.pageContext }
              showPane={true}
              allLoaded={false}
              currentUser = {this.state.currentUser }
              lists = { [] }

              pickedWeb = { this.state.pickedWeb }
              theSite = { this.state.theSite }
              currentPage= { this.props.pageContext.web.absoluteUrl }

              isCurrentWeb = { this.state.isCurrentWeb }
              
              definedList = { availLists[0] }
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

          pickedWeb = { this.state.pickedWeb }
          theSite = { this.state.theSite }
          currentPage= { this.props.pageContext.web.absoluteUrl }

          isCurrentWeb = { this.state.isCurrentWeb }

          allowOtherSites={ allowOtherSites }
          alwaysReadOnly = { false }
          pageContext={ this.props.pageContext }
          showPane={true}
          allLoaded={false}
          currentUser = {this.state.currentUser }
          lists = { [] }

          definedList = { availLists[0] }
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

              allowOtherSites={ allowOtherSites }
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

              allowOtherSites={ allowOtherSites }
              alwaysReadOnly = { false }
              pageContext={ this.props.pageContext }
              showPane={true}
              allLoaded={false}
              webURL = { webUrl }
              currentUser = { this.state.currentUser }

            ></ProvisionPatterns>
        </div>;

      //Build up hard coded array of user emails that can
      let showTricks = false;
      links.trickyEmails.map( getsTricks => {
        if ( this.props.pageContext.user.loginName && this.props.pageContext.user.loginName.toLowerCase().indexOf( getsTricks ) > -1 ) { showTricks = true ; }   } ); 

      let infoPages = this.props.allowRailsOff !== true ? null : 
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

      const contentsPage = <div className= { defaultPageClass }>
        <InspectContents

          wpContext={  this.props.wpContext }
          useListAnalytics= { this.props.useListAnalytics }
          analyticsWeb= { this.props.analyticsWeb }
          analyticsList= { this.props.analyticsList }
          tenant= { this.props.tenant }
          urlVars= { this.props.urlVars }

          allowOtherSites={ allowOtherSites }
          pageContext={ this.props.pageContext }
          showPane={true}
          allLoaded={false}
          currentUser = {this.state.currentUser }
          pickedWeb = { this.state.pickedWeb }
          theSite = { this.state.theSite }
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

          uniqueId = { this.props.uniqueId }

        ></InspectContents>
      </div>;

      const contentsItems = <div className= { defaultPageClass }>
        <ProvisionItems

          updateMakeThisList= { this.updateMakeThisList.bind(this) }
          makeThisList={ this.state.makeThisList }

          useListAnalytics= { this.props.useListAnalytics }
          analyticsWeb= { this.props.analyticsWeb }
          analyticsList= { this.props.analyticsList }
          tenant= { this.props.tenant }
          urlVars= { this.props.urlVars }

          pickedWeb = { this.state.pickedWeb }
          isCurrentWeb = { this.state.isCurrentWeb }

          allowOtherSites={ allowOtherSites }
          alwaysReadOnly = { false }
          pageContext={ this.props.pageContext }
          showPane={true}
          allLoaded={false}
          currentUser = {this.state.currentUser }
          lists = { [] }

          definedList = { availLists[0] }
          provisionListTitles = { [] }

        ></ProvisionItems>
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
          defaultSelectedIndex ={ 4 }>

          <PivotItem headerText="Fields">
                { ( isCurrentWeb === true || allowOtherSites === true ? provisionFieldPage : notAllowOtherSites ) }
          </PivotItem>

          <PivotItem headerText="Lists">
                { ( isCurrentWeb === true || allowOtherSites === true ? provisionListPage : notAllowOtherSites ) }
          </PivotItem>

          <PivotItem headerText="Pages">
                { ( isCurrentWeb === true || allowOtherSites === true ? provisionPagesPage : notAllowOtherSites ) }
          </PivotItem>

          <PivotItem headerText="Patterns">
              { provisionPatternsPage }
          </PivotItem>

          <PivotItem headerText="Contents">
              { contentsPage }
          </PivotItem>    

          { this.props.urlVars['create'] ===  "true" ?
                <PivotItem headerText="Create">
                    { contentsItems }  
                </PivotItem>
          : null }

          <PivotItem headerText="Help">
              { infoPages }
          </PivotItem>



        </Pivot></div>;

    let stateError = this.state.stateError.length === 0 ? null :
      <div>
        { this.state.stateError }
      </div>;

    /**
     * Add early access bar
     */
     let earlyAccess = null;
     defCommandIconStyles.icon.fontWeight = '600' ;
     
    //  let buttonHelp = this.buildEarlyAccessButton( "Feedback" , 'Help', this._toggleInfoPages.bind(this));
    //  let buttonAdvanced = this.buildEarlyAccessButton( "Layout" , 'Design', this._toggleDesign.bind(this));
    //  let buttonData = this.buildEarlyAccessButton( "Data" , 'Calculator', this._toggleData.bind(this));
 
     if ( this.props.showEarlyAccess === true ) {
       let messages : IEarlyAccessItem[] = [];
       let linksArray : IEarlyAccessItem[] = [];
 
       messages.push( { minWidth: 1000, item: <div><span><b>{ 'Welcome to ALV Webpart Early Access!!!' }</b></span></div> });
       messages.push( { minWidth: 1000, item: <div><span><b>{ 'Get more info here -->' }</b></span></div> });
 
       messages.push( { minWidth: 700, maxWidth: 799.9, item: <div><span><b>{ 'Webpart Early Access!!!' }</b></span></div> });
       messages.push( { minWidth: 700, maxWidth: 799.9, item: <div><span><b>{ 'More info ->' }</b></span></div> });
 
       messages.push( { minWidth: 400, maxWidth: 699.9, item: <div><span><b>{ 'info ->' }</b></span></div> });
 
       linksArray.push( { minWidth: 450, item: links.gitRepoEasyContnets.wiki });
       linksArray.push( { minWidth: 600, item: links.gitRepoEasyContnets.issues });
       linksArray.push( { minWidth: 800, item: links.gitRepoEasyContnets.projects });
 
       earlyAccess = 
       <div style={{ paddingBottom: 10 }}>
         <EarlyAccess 
             image = { "https://autoliv.sharepoint.com/sites/crs/PublishingImages/Early%20Access%20Image.png" }
             messages = { messages }
             links = { linksArray }
             email = { 'mailto:General - WebPart Dev <0313a49d.Autoliv.onmicrosoft.com@amer.teams.ms>?subject=Drilldown Webpart Feedback&body=Enter your message here :)  \nScreenshots help!' }
             farRightIcons = { [ ] }
            //  farRightIcons = { [ { item: buttonData } , { item: buttonAdvanced } , { item: buttonHelp }  ] }
             WebpartWidth = { this.state.WebpartWidth }
         ></EarlyAccess>
       </div>;
 
     }
 

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

  private _onWebUrlChange(newValue: string){
    debounce(250, this.debounce_onWebUrlChange( newValue ) );
  }

  private async debounce_onWebUrlChange(newValue: string){
      let errMessage = null;
      let stateError : any[] = [];
      const thisWebObject = Web( newValue );
      let getMinProps = 'Title,Id,Url,ServerRelativeUrl,SiteLogoUrl,Description,HasUniqueRoleAssignments';

      let pickedWeb : IPickedWebBasic = {
          ServerRelativeUrl: 'Site ServerRelativeUrl',
          guid: 'Site Guid',
          title: 'Site Title',
          url: 'siteURL',
          siteIcon: 'Site Icon',
          error: errMessage,
          HasUniqueRoleAssignments: null,
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
            HasUniqueRoleAssignments: webbie['HasUniqueRoleAssignments'],
        };

      } catch (e) {
        let helpfulErrorEnd = [ newValue, getMinProps, '', null, null ].join('|');
        /**
         * 2021-06-22:  Removed the last traceParemeter so that it does not log an error on every keystroke change while modifying the web url.
         */
        // errMessage = getHelpfullErrorV2(e, false, true, [ BaseErrorTrace , 'Failed', 'getWebbie ~ 740', helpfulErrorEnd ].join('|')  );
        errMessage = getHelpfullErrorV2(e, false, true, '' );
        stateError.push( <div style={{ padding: '15px', background: 'yellow' }}> <span style={{ fontSize: 'larger', fontWeight: 600 }}>Can't find the site</span> </div>);
        stateError.push( <div style={{ paddingLeft: '25px', paddingBottom: '30px', background: 'yellow' }}> <span style={{ fontSize: 'large', color: 'red'}}> { errMessage }</span> </div>);
        pickedWeb.error = errMessage;

      }

      let theSite: ISite = await getSiteInfo( newValue );

      let isCurrentWeb: boolean = false;
      if ( newValue.toLowerCase().indexOf( this.props.pageContext.web.serverRelativeUrl.toLowerCase() ) > -1 ) { isCurrentWeb = true ; }
      this.setState({ parentListWeb: newValue, stateError: stateError, pickedWeb: pickedWeb, isCurrentWeb: isCurrentWeb, theSite: theSite });

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
