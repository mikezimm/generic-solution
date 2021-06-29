
import { ITheTime } from '@mikezimm/npmfunctions/dist/Services/Time/Interfaces';
import { PageContext } from '@microsoft/sp-page-context';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { IMyProgress, } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

import { IListory, IMyJsonCompareProps, IMyJsonCompareState } from '../../../services/railsCommon/jsonCompare/ICompareTypes';  //listory: IListory;

export interface IGenericWebpartProps {
 
  // 0 - Context
  description: string;
  
  pageContext: PageContext;
  wpContext: WebPartContext;

  today: ITheTime;
  WebpartElement: HTMLElement;   //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/

  parentListFieldTitles?: string;
  // 1 - Analytics options
  useListAnalytics: boolean;
  analyticsWeb?: string;
  analyticsList?: string;
  tenant: string;
  urlVars: {};
  
  // 2 - Source and destination list information
  parentListTitle: string;
  parentListWeb: string;

  childListTitle: string;
  childListWeb: string;

  onlyActiveParents: boolean;

  // 3 - General how accurate do you want this to be

  // 4 - Info Options

  // 5 - UI Defaults

  // 6 - User Feedback:
  progress: IMyProgress;
  
  // 7 - TBD

  // 9 - Other web part options
  webPartScenario: string; //Choice used to create mutiple versions of the webpart.
  allowRailsOff: boolean;
  allowCrazyLink: boolean;
  listory: IListory;

  pivotSize: string;
  pivotFormat: string;
  pivotOptions: string;
  pivotTab: string;  //May not be needed because we have projectMasterPriority

  showEarlyAccess: boolean;

  uniqueId: string;
  
}