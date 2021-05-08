
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

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists,  } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import { makeSmallTimeObject,} from '@mikezimm/npmfunctions/dist/Services/Time/smallTimeObject';

import { doesObjectExistInArray, } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
import {  addItemToArrayIfItDoesNotExist } from '@mikezimm/npmfunctions/dist/Services/Arrays/manipulation';

import { SystemLists, TempSysLists, TempContLists, entityMaps, EntityMapsNames } from '@mikezimm/npmfunctions/dist/Lists/Constants';

import { encodeDecodeString } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';

import { getHelpfullError, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

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
}

export function createStep( label: string, planInfo: string , processInfo: string , completeInfo: string , errorInfo: string, required: boolean, stepNo: number, value?: string | boolean ) {

  const Step : IProcessStep = {
    label: label,
    required: required,
    stepNo: stepNo,
    value: value,
    plan:  {
      key: 'plan',
      info: planInfo,
      order: 0, result: '', success: false,
    },
    process:  {
      key: 'process',
      info: processInfo,
      order: 1, result: '', success: false,
    },
    complete:  {
      key: 'complete',
      info: completeInfo,
      order: 2, result: '', success: false,
    },
    error:  {
      key: 'error',
      info: errorInfo,
      order: 3, result: '', success: false,
    },
    current:  {
      key: 'plan',
      info: planInfo,
      order: 0, result: '', success: false,
    },
  };
  return Step;

} 

function checkGroup( name: string, required: boolean, stepNo: number ) {
  return createStep( 'Check Group ' + name, 'Check for existing group', 'Checking for existing group', 'Checked for existing group', 'Was not able to check for group', required, stepNo  );
}

function createGroup( name: string, required: boolean, stepNo: number ) {
  return createStep( 'Create Group ' + name, 'Create for existing group', 'Creating group', 'Created group', 'Was not able to Create group', required, stepNo  );
}

function assignToList( name: string, required: boolean, stepNo: number ) {
  return createStep( 'Assign Group ' + name, 'Assign group to list', 'Assigning group to list', 'Assigned group to list', 'Was not able to Assign group to list', required, stepNo  );
}

function assignToSite( name: string, required: boolean, stepNo: number ) {
  return createStep( 'Assign Group ' + name,  'Assign group to Site', 'Assigning group to Site', 'Assigned group to Site', 'Was not able to Assign group to Site', required, stepNo  );
}

export const CheckListPermissions = createStep( 'Check List Permissions', 'Check existing list permissions', 'Fetching existing permissions', 'Checked existing permissions', 'Was not able to check list permissions', true, 0  );
export const BreakListPermissions = createStep( 'Break List Permissions', 'Break list permissions', 'Breaking list permissions', 'Broke list permissions', 'Was not able to Break list permissions', true, 1  );

export const CheckContribGroup = checkGroup('Contributors', true, 2);
export const CreateContribGroup = createGroup('Contributors', true, 3);
export const AssignContribToList = assignToList('Contributors', true, 4);
export const AssignContribToSite = assignToSite('Contributors', true, 5);

export const CheckReaderGroup = checkGroup('Readers', true, 6);
export const CreateReaderGroup = createGroup('Readers', true, 7);
export const AssignReaderToList = assignToList('Readers', true, 8);
export const AssignReaderToSite = assignToSite('Readers', true, 9);

export function createProcessSteps(){

  const Steps: IProcessSteps = {
    checkListPerms: CheckListPermissions,
    breakListPerms: BreakListPermissions,

    checkContribGroup: CheckContribGroup,
    createContribGroup:  CreateContribGroup,
    assignContribListRole:  AssignContribToList,
    assignContribSiteRole:  AssignContribToSite,

    checkReaderGroup:  CheckReaderGroup,
    createReaderGroup:  CreateReaderGroup,
    assignReaderListRole:  AssignReaderToList,
    assignReaderSiteRole:  AssignReaderToSite,

  };

  return Steps;
}
