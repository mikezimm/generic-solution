
import { IGenericWebpartProps } from './IGenericWebpartProps';

  
export interface IRefinerRules {
  rules: RefineRuleValues[];
}

export type RefineRuleValues = 
  'parseBySemiColons' | 'parseByCommas' | 'groupBy10s' |  'groupBy100s' |  'groupBy1000s' |  'groupByMillions' | 
  'isDate' | 'groupByDays' | 'groupByWeeks' |  'groupByMonths' |  'groupByYears' | 'groupByDayOfWeek' |  'groupByDateBuckets' |
  'groupByUsers' | 'invalidRules' | ''
;

export interface IItemRefiners {
  lev0: any[]; lev1: any[]; lev2: any[];
}

export interface IRefiners {
  multiCount: number; // Count when counting multi-value fields each time
  itemCount: number; // Count when only counting multi-value fields once
  childrenKeys: string[];
  childrenObjs: IRefinerLayer[];
}

export interface IRefinerLayer {
  thisKey: string;
  multiCount: number; // Count when counting multi-value fields each time
  itemCount: number; // Count when only counting multi-value fields once
  childrenKeys: string[];
  childrenObjs?: IRefinerLayer[];
}

export interface IPickedWebBasic {
  title: string;
  ServerRelativeUrl: string;
  guid: string;
  url: string;
  siteIcon: string;
}

export interface IPickedList {
  title: string;
  name: string;
  guid: string;
  isLibrary: boolean;
}

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
}

export interface IPivot {
    headerText: string;
    itemKey: string;
    filter?: string;
    data?: string;
    lastIndex: number;
  }
  
  export interface IMyPivots {
    heading1: IPivot[];
    heading2?: IPivot[];
    heading3?: IPivot[];
  }

  
export interface ILink {
    Description: string;
    Url: string;
  }
  
  export interface IUser {
    title?: string;
    Title?: string;
    initials?: string;  //Single person column
    email?: string;  //Single person column
    id?: any;
    Id?: any;
    ID?: any;
  
    isSiteAdmin?:boolean;
    LoginName?: string;
    Name?: string;
  
    //These optional props are from the React PeoplePicker control
    imageInitials?: string; //same as Initials;         From React People Picker control
    imageUrl?: string;  //Thumbnail URL;                From React People Picker control
    loginName?: string;  //Same as LoginName and Name;  From React People Picker control
    text?: string;   //Same as Title and title;         From React People Picker control
    tertiaryText?: string; //                           From React People Picker control
    secondaryText?: string; // same as email;           From React People Picker control
  
  }

export interface IMyFonts{

    size?: string;
    weight?: string;
    style?: string;
    color?: string;
  
  }
  
  export interface IMyIcons{
    hasIcon: boolean;
    name: string;
    size?: string;
    height?: string;
    width?: string;
    margin?: string;
  
  }

  // , IChartSeries, ICharNote

export interface IChartSeries {
    title: string;
    axisTitle: string;
    labels: any[];
    sums: any[];
    counts: any[];
    totalS: number;
    totalC: number;
    changes: any[];
    changeNotes: string[];
    warnNotes: string[];
    errorNotes: string[];
    origLabels?: any[];
    origSums?: any[];
    origCounts?: any[];
  }
  
  export interface ICharNote {
    parent: string;
    source: string;
    note: string;
  }