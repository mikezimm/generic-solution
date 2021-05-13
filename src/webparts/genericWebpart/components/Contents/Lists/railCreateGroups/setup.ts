
/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */

import { Web, IList } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */


/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      .d8888. d88888b d8888b. db    db d888888b  .o88b. d88888b .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88'  YP 88'     88  `8D 88    88   `88'   d8P  Y8 88'     88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         `8bo.   88ooooo 88oobY' Y8    8P    88    8P      88ooooo `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88           `Y8b. 88~~~~~ 88`8b   `8b  d8'    88    8b      88~~~~~   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         db   8D 88.     88 `88.  `8bd8'    .88.   Y8b  d8 88.     db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         `8888Y' Y88888P 88   YD    YP    Y888888P  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */


 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      db   db d88888b db      d8888b. d88888b d8888b. .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88   88 88'     88      88  `8D 88'     88  `8D 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88ooo88 88ooooo 88      88oodD' 88ooooo 88oobY' `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88~~~88 88~~~~~ 88      88~~~   88~~~~~ 88`8b     `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88   88 88.     88booo. 88      88.     88 `88. db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P 88      Y88888P 88   YD `8888Y' 
 *                                                                                                                       
 *                                                                                                                       
 */

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
 *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
 *                                                                                                                                               
 *                                                                                                                                               
 */

import { pivCats, IListBucketInfo } from '../listsComponent';

/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */


export const StatusIcons: IStatusIcons = { plan: 'Edit', process: 'Gear', complete: 'Checkmark', error: 'Warning' };
export const StatusColors: IStatusIcons = { plan: 'black', process: 'blue', complete: 'green', error: 'red' };
export type IStatusIcon = 'Edit'| 'Gear'| 'Checkmark'| 'Warning';
export type IStepPC = 'Plan' | 'Process' | 'Complete' | '' | '';
export type IStepKey = 'plan' | 'process' | 'complete' | 'error' | '';

export interface IStatusIcons {
  plan: string;
  process: string;
  complete: string;
  error: string;
}

export interface IProcessStatus {
  // label: IStepPC;
  key: IStepKey; //should be lower case label IStep
  info: any;
  order?: number;
  result: string;
  success: boolean;
  error?: string;
}

export interface IProcessStep {
  label: string;
  required: boolean;
  stepNo: number;
  value?: string | boolean;
  plan?: IProcessStatus;
  process?: IProcessStatus;
  complete?: IProcessStatus;
  error?: IProcessStatus;
  current: IProcessStatus;
  value1: any; //List Title
  value2: any; //Group Title
  value3: any; //TBD
  value4: any; //TBD 

}

export interface IProcessSteps {
  checkListPerms: IProcessStep;
  breakListPerms: IProcessStep;

  checkContribGroup: IProcessStep;
  createContribGroup: IProcessStep;
  assignContribListRole: IProcessStep;
  assignContribSiteRole: IProcessStep;

  checkReaderGroup: IProcessStep;
  createReaderGroup: IProcessStep;
  assignReaderListRole: IProcessStep;
  assignReaderSiteRole: IProcessStep;

  assignParentOwnerToList: IProcessStep;
  assignParentMemberToList: IProcessStep;
  assignParentVisitorToList: IProcessStep;

  complete: IProcessStep;

}

export function createStep( label: string, planInfo: string , processInfo: string , completeInfo: string , errorInfo: string, required: boolean, stepNo: number, value1: any, value2: any, value3: any, value?: string | boolean ) {

  const Step : IProcessStep = {
    label: label,
    required: required,
    stepNo: stepNo,
    value: value,
    plan:  {
      key: 'plan',
      info: planInfo,
      order: 0, result: '', success: false, error: '',
    },
    process:  {
      key: 'process',
      info: processInfo,
      order: 1, result: '', success: false, error: '',
    },
    complete:  {
      key: 'complete',
      info: completeInfo,
      order: 2, result: '', success: false, error: '',
    },
    error:  {
      key: 'error',
      info: errorInfo,
      order: 3, result: '', success: false, error: '',
    },
    current:  {
      key: 'plan',
      info: planInfo,
      order: 0, result: '', success: false, error: '',
    },
    value1: value1 ? value1 : '', //List Title
    value2: value2 ? value2 : '', //Group Title
    value3: value3 ? value3 : '', //Group ID
    value4: '', //ParentGroupID
  };
  return Step;

} 

function checkGroup( name: string, required: boolean,  listTitle: string , groupTitle: string,  stepNo: number ) {
  return createStep( 'Check Group ' + name, 'Check for existing group', 'Checking for existing group', 'Checked for existing group', 'Was not able to check for group', required, stepNo, listTitle, groupTitle, ''  );
}

function createGroup( name: string, required: boolean,  listTitle: string , groupTitle: string, stepNo: number ) {
  return createStep( 'Create Group ' + name, 'Create for existing group', 'Creating group', 'Created group', 'Was not able to Create group', required, stepNo, listTitle, groupTitle, ''  );
}

function assignParentToList( name: string, required: boolean,  listTitle: string , groupTitle: string, stepNo: number ) {
  return createStep( 'Assign ' + name + '|List', 'Assign parent group to list', 'Assigning parent group to list', 'Assigned parent group to list', 'Was not able to Assign parent group to list', required, stepNo, listTitle, groupTitle, ''  );
}

function assignToList( name: string, required: boolean,  listTitle: string , groupTitle: string, stepNo: number ) {
  return createStep( 'Assign List Group ' + name + '|List', 'Assign group to list', 'Assigning group to list', 'Assigned group to list', 'Was not able to Assign group to list', required, stepNo, listTitle, groupTitle, ''  );
}

function assignToSite( name: string, required: boolean,  listTitle: string , groupTitle: string, stepNo: number ) {
  return createStep( 'Assign List Group ' + name + '|Site',  'Assign group to Site', 'Assigning group to Site', 'Assigned group to Site', 'Was not able to Assign group to Site', required, stepNo, listTitle, groupTitle, ''  );
}

export function CheckListPermissions( listTitle: string ) { 
  return createStep( 'Check List Permissions', 'Check existing list permissions', 'Fetching existing permissions', 'Checked existing permissions', 'Was not able to check list permissions', true, 0, listTitle, '', ''  ); }

export function BreakListPermissions( listTitle: string ) { 
  return createStep( 'Break List Permissions', 'Break list permissions', 'Breaking list permissions', 'Broke list permissions', 'Was not able to Break list permissions', true, 1, listTitle, '', ''  ); }

export function createProcessSteps( listTitle , contribGroup, readerGroup ){

  const Steps: IProcessSteps = {
    checkListPerms: CheckListPermissions( listTitle ),
    breakListPerms: BreakListPermissions( listTitle ),

    assignParentOwnerToList: assignParentToList('SiteOwnerGroup', true, listTitle, 'SiteOwnerGroup', 10 ),
    assignParentMemberToList: assignParentToList('SiteMemberGroup', true, listTitle, 'SiteMemberGroup', 11 ),
    assignParentVisitorToList: assignParentToList('SiteVisitorGroup', true, listTitle, 'SiteVisitorGroup', 12 ),

    checkContribGroup: checkGroup('Contributors', true, listTitle, contribGroup, 20 ),
    createContribGroup:  createGroup('Contributors', true, listTitle, contribGroup, 30 ),

    assignContribListRole:  assignToList('Contributors', true, listTitle, contribGroup, 40 ),
    assignContribSiteRole:  assignToSite('Contributors', true, listTitle, contribGroup, 50 ),

    checkReaderGroup:  checkGroup('Readers', true, listTitle, readerGroup, 60 ),
    createReaderGroup:  createGroup('Readers', true, listTitle, readerGroup, 70 ),
    assignReaderListRole:  assignToList('Readers', true, listTitle, readerGroup, 80 ),
    assignReaderSiteRole:  assignToSite('Readers', true, listTitle, readerGroup, 90 ),

    complete: createStep( 'Complete', 'Complete', 'Completed all tasks', 'Completed permissions', 'Had a problem Completing Permissions', true, 99, listTitle, '', ''  ),

  };

  return Steps;
}
