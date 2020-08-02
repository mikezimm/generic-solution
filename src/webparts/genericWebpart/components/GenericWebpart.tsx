import * as React from 'react';
import { sp, Views, IViews } from "@pnp/sp/presets/all";

import styles from './GenericWebpart.module.scss';
import { IGenericWebpartProps } from './IGenericWebpartProps';
import { IGenericWebpartState } from './IGenericWebpartState';

import { escape } from '@microsoft/sp-lodash-subset';

import { IMyPivots, IPivot,  ILink, IUser, IMyIcons, IMyFonts, IChartSeries, ICharNote } from './IReUsableInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import { IProvisionListsProps, IProvisionListsState} from './ListProvisioning/component/provisionListComponent';
import { defineTheList } from './ListProvisioning/ListsTMT/defineThisList';
import ProvisionLists from './ListProvisioning/component/provisionListComponent';

import { IMakeThisList } from './ListProvisioning/component/provisionWebPartList';
import { analyticsList } from 'GenericWebpartWebPartStrings';


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

  private createPivotData(onlyActiveProjects:boolean){
    // Using https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements
    let pivots : IMyPivots = {
      projects: 
        [
          { headerText: "Yours",
            filter: "your",
            itemKey: "your",
            data: "Projects where you are the Leader",
            lastIndex: null,
          },
          { headerText: "Your Team",
            filter: "team",
            itemKey: "team",
            data: "Projects where you are in the Team",
            lastIndex: null,
          },
          { headerText: "Everyone",
            filter: "everyone",
            itemKey: "everyone",
            data: "Projects where Everyone is marked Yes - overrides other categories",
            lastIndex: null,
          },
          { headerText: "Others",
            filter: "otherPeople",
            itemKey: "otherPeople",
            data: "Projects where you are not the Leader, nor in the team, and not marked Everyone",
            lastIndex: null,
          },
        ]
      ,
      history: 
        [
          { headerText: "Yours",
            filter: "your",
            itemKey: "your",
            data: "History where you are the User",
            lastIndex: null,
          },
          { headerText: "Your Team",
            filter: "team",
            itemKey: "team",
            data: "History where you are part of the Team, but not the User",
            lastIndex: null,
          },
          { headerText: "Everyone",
            filter: "everyone",
            itemKey: "everyone",
            data: "Currently not in use",
            lastIndex: null,
          },
          { headerText: "Others",
            filter: "otherPeople",
            itemKey: "otherPeople",
            data: "History where you are not the Leader, nor in the team, and not marked Everyone",
            lastIndex: null,
          },
        ]
      ,
    };

    pivots.projects.push(
      { headerText: "Parking lot",
      filter: "parkingLot",
      itemKey: "parkingLot",
      data: "Projects on hold or in parking lot",
      lastIndex: null,
    });

    if ( !onlyActiveProjects ) { 
      pivots.projects.push(
        { headerText: "Closed",
        filter: "closed",
        itemKey: "closed",
        data: "Completed or Cancelled projects",
        lastIndex: null,
      }
      );
    }

    return pivots;

  }

  private cleanURL(originalURL: String) {

    let newURL = originalURL.toLowerCase();
    if ( newURL.indexOf('/sitepages/') > 0 ) { return newURL.substring(0, newURL.indexOf('/sitepages/') + 1) ; }
    if ( newURL.indexOf('/lists/') > 0 ) { return newURL.substring(0, newURL.indexOf('/lists/') + 1) ; }
    if ( newURL.indexOf('/siteassets/') > 0 ) { return newURL.substring(0, newURL.indexOf('/siteassets/') + 1) ; }
    if ( newURL.indexOf('/_layouts/') > 0 ) { return newURL.substring(0, newURL.indexOf('/_layouts/') + 1) ; }
    if ( newURL.indexOf('/documents/') > 0 ) { return newURL.substring(0, newURL.indexOf('/documents/') + 1) ; }
    if ( newURL.indexOf('/shared documents/') > 0 ) { return newURL.substring(0, newURL.indexOf('/shared documents/') + 1) ; }
    if ( newURL.indexOf('/shared%20documents/') > 0 ) { return newURL.substring(0, newURL.indexOf('/shared%20documents/') + 1) ; }
    if ( newURL.indexOf('/forms/') > 0 ) { 
      newURL = newURL.substring(0, newURL.indexOf('/forms/'));
      newURL = newURL.substring(0, newURL.indexOf('/') + 1);
      return newURL;
    }
    if ( newURL.indexOf('/pages/') > 0 ) { return newURL.substring(0, newURL.indexOf('/pages/') + 1) ; }
    if ( newURL.substring(newURL.length) !== '/' ) { return newURL + '/'; }

    return newURL;

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

  let parentWeb = this.cleanURL(this.props.parentListWeb ? this.props.parentListWeb : props.pageContext.web.absoluteUrl);
  let childWeb = this.cleanURL(this.props.childListWeb ? this.props.childListWeb : props.pageContext.web.absoluteUrl);

  this.state = {

        // 0 - Context
        description: 'string',

        //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
        WebpartHeight: this.props.WebpartElement.getBoundingClientRect().height ,
        WebpartWidth:  this.props.WebpartElement.getBoundingClientRect().width - 50 ,

        currentUser: null,

        //pivots?: IMyPivots;
        pivots: this.createPivotData(this.props.onlyActiveParents),

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
      
        parentListName: this.props.parentListTitle,  // Static Name of list (for URL) - used for links and determined by first returned item
        childListName: this.props.childListTitle,  // Static Name of list (for URL) - used for links and determined by first returned item
      
        parentListConfirmed: false,
        childListConfirmed: false,


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
  
        searchType: '',
        searchShow: true,
        searchCount: 0,
        searchWhere: '',
  
  };
}


public componentDidMount() {
  this.getListDefinitions( 'state');
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
      isSiteAdmin: r['IsSiteAdmin'],
      LoginName: r['LoginName'],
      Name: r['LoginName'],
    };

    let parentName =  doThis === 'state' ? this.state.parentListName : this.props.parentListTitle;
    let childName =  doThis === 'state' ? this.state.childListName : this.props.childListTitle;

    let parentList : IMakeThisList = defineTheList( 100 , parentName, 'ParentListTitle' , this.state.parentListWeb, currentUser );
    let childList : IMakeThisList = defineTheList( 100 , childName, 'ChildListTitle' , this.state.childListWeb, currentUser );

    this.setState({  
      currentUser: currentUser,
      allLists: [parentList, childList ],
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
    console.log('DIDUPDATE setting Progress:', this.props.progress);
    if (this.props.progress !== prevProps.progress) {  rebuildPart = true ; }

    if ( prevProps.parentListTitle != this.props.parentListTitle || prevProps.childListTitle != this.props.childListTitle ) {
      this.getListDefinitions('props');
    }
    if (rebuildPart === true) {
      this._updateStateOnPropsChange({});
    }
  }

  public render(): React.ReactElement<IGenericWebpartProps> {

    console.log('RENDER setting Progress:', this.props.progress);

    const provisionPage = <div>
    <ProvisionLists 
        allowOtherSites={ false }
        pageContext={ this.props.pageContext }
        showPane={true}
        allLoaded={false}
        currentUser = {this.state.currentUser }
        lists = { this.state.allLists }
        //parentProps: IGenericWebpartProps;
        //parentState: IGenericWebpartState;

        // 2 - Source and destination list information

        parentListWeb={this.state.parentListWeb}
        parentListTitle={this.state.parentListName}
        parentListConfirmed={this.state.parentListConfirmed}
        parentListTemplate={ 100 }

        childListWeb={this.state.childListWeb}
        childListTitle={this.state.childListName}
        childListConfirmed={this.state.childListConfirmed}
        childListTemplate={ 100 }

    ></ProvisionLists>
  </div>;


    let ootbComponent = <div className={ styles.genericWebpart }>
    <div className={ styles.container }>

        <div className={ styles.row }>
          <div className={ styles.column }>
            <span className={ styles.title }>Welcome to SharePoint!</span>
            <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
            <p className={ styles.description }>{escape(this.props.description)}</p>
            <a href="https://aka.ms/spfx" className={ styles.button }>
              <span className={ styles.label }>Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div>;


    return (
      provisionPage
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
