import { IFormFields, IProjectFormFields } from './fields/fieldDefinitions';

import { ITheTime } from '@mikezimm/npmfunctions/dist/dateServices';

import { IUser, IPivot, IMyPivots, IMyIcons, IMyFonts, ILink, IChartSeries, ICharNote, IPickedWebBasic } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import { ISelectedUser, } from './Charts/charts';

import { IMakeThisList } from './ListProvisioning/component/provisionWebPartList';

import { IMakeThisPage } from './PageProvisioning/component/provisionWebPartPages';
import { IDefinedLists } from './ListProvisioning/component/provisionListComponent';




export interface IMyProgress {

  time: string;
  logLabel: string;
  label: string;
  description: string;
  percentComplete?: number;
  progressHidden?: boolean;
  icon?: string;
  color?: string;
  ref?: string;
  refElement?: any;
}


  export interface IUserSummary { 
    title: string; 
    Id: string; 
    count: number; 
    hours: number;
    normal: number;
    percent: number; 
    stories: string[];
    lastEntry: number;
    lastEntryText: string;
    daysAgo: number;
   }
  
  export interface IChartData {
    filter?: string;
    singleSeries?: IChartSeries;  
    multiSeries?: IChartSeries[];
  
  
    filterItems?: string[];
    
    index: number;
  
    users?: string[];
    usersSummary?: IUserSummary[];
    dateRange?: string[];
  
    warnNotesAll: ICharNote[];
    errorNotesAll: ICharNote[];
  
  }
  
  /**
   * ISaveEntry is basic entry needed to CREATE a new list item
   * Eventually upon save, this will turn into a full ITimeEntry
   */
  export interface ISaveEntry {
    //Values that would come from Project item
  
    titleParent: string;
    thisTimeObj?: ITheTime;
    category1?: string[];
    category2?: string[];
    leader?: IUser;  //Likely single person column
    team?: IUser[];  //Likely multi person column
    leaderId?: number;
    teamIds?: number[];
  
    //For new chart page:
    story?: string;
    chapter?: string;
  
  
    //Values that relate to project list item
    sourceParent?: ILink; //Link back to the source project list item.
    sourceParentRef?: string;
    activity?: ILink; //Link to the activity you worked on
  
  
    //Values specific to Time Entry
    userId?: number;
    userTitle?: string;
    startTime?: any; //Time stamp
    endTime?: any; // Time stamp
  
    //Saves what entry option was used... Since Last, Slider, Manual
    entryType?: string;
  
    //Other settings and information
    location?: string; // Location
    settings?: string;
  
  }
  
  
  export interface IGenericWebpartState {
  
    // 0 - Context
    description: string;
    WebpartHeight?:  number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
    WebpartWidth?:   number;    //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
      
    pivots?: IMyPivots;
  
    fields?: IFormFields; //List of field defininitions for making form fields
  
    // 1 - Analytics options
    loadData?: {
      //user: any;
      //projects: any[];
      //entries: any[];
    };
  
    // 2 - Source and destination list information
    allLists?: IMakeThisList[];
    allPages?: IMakeThisPage[];

    parentListURL?: string; //Get from list item
    childListURL?: string; //Get from list item
  
    parentListWeb?: string; //Get from list item
    childListWeb?: string; //Get from list item
  
    parentListTitle: string;  // Static Name of list (for URL) - used for links and determined by first returned item
    childListTitle: string;  // Static Name of list (for URL) - used for links and determined by first returned item
  
    pickedWeb : IPickedWebBasic;
    isCurrentWeb: boolean;

    makeThisList: IMakeThisList;

    // 3 - General how accurate do you want this to be
  
    // 4 - Info Options
    pivtTitles?:string[];
    filteredCategory?: string;
    pivotDefSelKey?: string;
    onlyActiveParents?: boolean; //Only read in active projects.
  
    // 5 - UI Defaults
  
    // 6 - User Feedback:
    currentUser?: IUser;  //Current user information

    blinkOnProject?: number; //Tells text fields to blink when project is clicked on and values reset
    
    chartData?: IChartData;
    showCharts?: boolean;
  
    selectedUser?: ISelectedUser;
    userFilter?: 'all' | 'user'; 
    chartStringFilter?: string;
  
    formEntry: ISaveEntry;
  
    progress:  IMyProgress;
    // 7 - TBD
  
    // 9 - Other web part options
  
    loadStatus?: string;
    allLoaded?: boolean;
  
    loadOrder?: string; //This just tells us what order the rest calls came back
  
    parentsLoadStatus?: string;
    parentsLoadError?: string;
    parentsListError: boolean;
    parentsItemsError: boolean;
  
    childLoadStatus?: string;
    childLoadError?: string;
    childListError: boolean;
    childItemsError: boolean;
  
    userLoadStatus?: string;
  
    errTitle?: string;
    showTips?: boolean;
    loadError?: string;
    debugColors?: boolean;
  
    listError?: boolean;
    itemsError?: boolean;
    stateError?: any[];
  
    searchType?: string;
    searchShow?: boolean;
    searchCount?: number;
    searchWhere?: string;
  
  }
  