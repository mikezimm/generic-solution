
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
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";

import { Web, IList, sp, SiteGroups, SiteGroup, ISiteGroupInfo } from "@pnp/sp/presets/all";

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

import { IProcessStep, IProcessSteps, IProcessStatus, IStepPC } from './setup';

import { IContentsGroupInfo, IGroupBucketInfo } from  '../../Groups/groupsComponent';

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

 export async function doThisRailFunction( steps: IProcessSteps, theList: IContentsListInfo, updateState: any ) {

  let newSteps : IProcessSteps = JSON.parse(JSON.stringify( steps ));
  let currentStep = null;
  let listOrLib = theList.BaseType === 0 ? 'List' : 'Library' ;
  let thisWebInstance = null;
  let listInstance = null;
  let webUrl: string = theList['odata.id'];
  webUrl = webUrl.substr( 0, webUrl.indexOf('_api'));
  let errMessage = '';
  try {
      thisWebInstance = Web( webUrl );
  } catch (e) {
      errMessage = getHelpfullError(e, true, true);
  }


  /**
   * Get Site Owner Group
   * 
   */
  let ownerGroup : ISiteGroupInfo = null;
  try {
    // Gets the associated owners group of a web
    ownerGroup = await thisWebInstance.associatedOwnerGroup();
  } catch (e) {
    errMessage = getHelpfullError(e, true, true);
  }

  
  if ( newSteps.checkListPerms.required === true ) {

  }

  listInstance = await thisWebInstance.lists.getById( theList.Id );

  if ( newSteps.breakListPerms.required === true ) {
    currentStep = newSteps.breakListPerms;
    try {
      // Gets the associated owners group of a web
      await listInstance.breakRoleInheritance(true, true);
      currentStep.current = JSON.parse(JSON.stringify( currentStep.complete ));

    } catch (e) {
      errMessage = getHelpfullError(e, true, true);
      currentStep.current = JSON.parse(JSON.stringify( currentStep.error ));
    }
    updateState(newSteps);

  }



  /**
   * Create Contribute Group
   */
  let principalId = null;
  if ( newSteps.checkContribGroup.required === true ) {

    currentStep = newSteps.createContribGroup;
    if ( currentStep.required === true ) {
      let GroupTitle = theList.Title + ' Contributors';
      let GroupDesc = `Can UPDATE content in the ${ listOrLib } - ${ theList.Title }`;
      currentStep = await createThisGroup( thisWebInstance, GroupTitle, GroupDesc, currentStep );
      errMessage =  currentStep.current.error;
      principalId = currentStep.current.result;
      updateState(newSteps);
    }

    // Get role definition Id
    currentStep = newSteps.assignContribListRole;
    if ( currentStep.required === true ) {
      try {
        // Gets the associated owners group of a web
        const { Id: roleDefId } = await thisWebInstance.roleDefinitions.getByName('Contribute').get();
        await listInstance.roleAssignments.add(principalId, roleDefId);
        currentStep.current = JSON.parse(JSON.stringify( currentStep.complete ));
  
      } catch (e) {
        errMessage = getHelpfullError(e, true, true);
        currentStep.current = JSON.parse(JSON.stringify( currentStep.error ));
      }
      updateState(newSteps);
    }

  }

  /**
   * Create Reader Group
   */
  if ( newSteps.checkReaderGroup.required === true ) {
    currentStep = newSteps.createReaderGroup;
    if ( currentStep.required === true ) {
      let GroupTitle = theList.Title + ' Readers';
      let GroupDesc = `Can READ content in the ${ listOrLib }: ${ theList.Title }`;
      currentStep = await createThisGroup( thisWebInstance, GroupTitle, GroupDesc, currentStep );
      errMessage =  currentStep.current.error;
      principalId = currentStep.current.result;
      updateState(newSteps);
    }

    // Get role definition Id
    currentStep = newSteps.assignReaderListRole;
    if ( currentStep.required === true ) {
      try {
        // Gets the associated owners group of a web
        const { Id: roleDefId } = await thisWebInstance.roleDefinitions.getByName('Read').get();
        await listInstance.roleAssignments.add(principalId, roleDefId);
        currentStep.current = JSON.parse(JSON.stringify( currentStep.complete ));
  
      } catch (e) {
        errMessage = getHelpfullError(e, true, true);
        currentStep.current = JSON.parse(JSON.stringify( currentStep.error ));
      }
      updateState(newSteps);
    }

  }

  updateState(newSteps);

 }

 async function createThisGroup( thisWebInstance: any, title: string, description: string, currentStep: IProcessStep ) {
  let errMessage = '';
  try {
    // Creates a new site group with the specified title
    currentStep.current = JSON.parse(JSON.stringify( currentStep.process ));

    const contributeGroup = await thisWebInstance.siteGroups.add({
      "Title": title,
      "Description": description,
      // "OwnerTitle": ownerGroup.Title,
      "OnlyAllowMembersViewMembership": false,
    });

    currentStep.current = JSON.parse(JSON.stringify( currentStep.complete ));
    currentStep.current.result = contributeGroup.data.Id;

  } catch(e) {
    errMessage = getHelpfullError(e, true, true);
    currentStep.current = JSON.parse(JSON.stringify( currentStep.error ));
    if ( 'The specified name is already in use' ) {
      currentStep.current.error = 'Group already exists!';
    } else {
      currentStep.current.error = errMessage;
    }
    
  }

  return currentStep;

 }