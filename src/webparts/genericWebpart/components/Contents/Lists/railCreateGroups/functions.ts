
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

import { Web, IList, sp, SiteGroups, SiteGroup, ISiteGroupInfo, Site, ISite } from "@pnp/sp/presets/all";

import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";


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

import { encodeDecodeString, getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';

import { getHelpfullError, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';


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

import { IProcessSteps, } from './setup';

import { IProcessStatus, IStepPC, IProcessStep, shouldDoThisStepBasedOnDependant } from '../../../../../../services/railsCommon/railsSetup';

import { IContentsGroupInfo, IGroupBucketInfo } from  '../../Groups/groupsComponent';
import { BodyFin } from "../../../ListProvisioning/ListsFinTasks/columnsFinTasks";

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

 
export type IRoleDefs = 'Read' | 'Contribute' | 'Full control';


 export async function doThisRailFunction( steps: IProcessSteps, theList: IContentsListInfo, updateState: any ) {

  let newSteps : IProcessSteps = JSON.parse(JSON.stringify( steps ));
  let currentStep = null;
  let listOrLib = theList.BaseType === 0 ? 'List' : 'Library' ;
  let thisWebInstance = null;
  let thisSiteInstance = null;
  let listInstance = null;
  let webUrl: string = theList['odata.id'];
  webUrl = webUrl.substr( 0, webUrl.indexOf('_api'));
  let errMessage = '';
  try {
      thisWebInstance = Web( webUrl );
  } catch (e) {
      errMessage = getHelpfullError(e, true, true);
  }


  if ( newSteps.checkListPerms.required === true ) {

  }

  try {
    thisSiteInstance = Site( webUrl );
  } catch (e) {
      errMessage = getHelpfullError(e, true, true);
  }

  const { Id: siteId } = await thisSiteInstance.get();
  const { Url: siteUrl } = await thisSiteInstance.get();

  // // let siteUrl = theSite.Url;

  // console.log('railSiteID:', siteId );
  // console.log('siteUrl:', siteUrl );

  listInstance = await thisWebInstance.lists.getById( theList.Id );

  if ( newSteps.breakListPerms.required === true ) {
    currentStep = newSteps.breakListPerms;
    try {
      // Gets the associated owners group of a web
      await listInstance.breakRoleInheritance();
      currentStep.current = JSON.parse(JSON.stringify( currentStep.complete ));

    } catch (e) {
      errMessage = getHelpfullError(e, true, true);
      currentStep.current = JSON.parse(JSON.stringify( currentStep.error ));
    }
    updateState(newSteps, currentStep);

  }

    /**
   * Get Site Owner Group
   * 
   */
  let ownerGroup : ISiteGroupInfo = null;
  let memberGroup : ISiteGroupInfo = null;
  let visitorGroup : ISiteGroupInfo = null;

  const { Id: fullRoleDefId } = await thisWebInstance.roleDefinitions.getByName('Full Control').get();
  const { Id: contRoleDefId } = await thisWebInstance.roleDefinitions.getByName('Contribute').get();
  const { Id: readRoleDefId } = await thisWebInstance.roleDefinitions.getByName('Read').get();

  function convertLetterToRole( role: string ) {
    if ( role === 'Full Control') { return fullRoleDefId ; }
    if ( role === 'Contribute') { return contRoleDefId ; }
    if ( role === 'Read') { return readRoleDefId ; }

    else { return null ; }
  }

  
  let ownLevel = convertLetterToRole( steps.assignParentOwnerToList.value2 );
  let memLevel = convertLetterToRole( steps.assignParentMemberToList.value2 );
  let visLevel = convertLetterToRole( steps.assignParentVisitorToList.value2 );

  try { // Gets the associated owners group of a web
    ownerGroup = await thisWebInstance.associatedOwnerGroup();
    newSteps = await giveGroupPermissions( newSteps, 'assignParentOwnerToList', listInstance, thisWebInstance, ownerGroup.Id , ownLevel, updateState, 'list' ) ;
    // updateState(newSteps, newSteps.assignParentOwnerToList );
  } catch (e) { errMessage = getHelpfullError(e, true, true); }


  if ( memLevel !== null ) {
    try { // Gets the associated members group of a web
      memberGroup = await thisWebInstance.associatedMemberGroup();
      newSteps = await giveGroupPermissions( newSteps, 'assignParentMemberToList', listInstance, thisWebInstance, memberGroup.Id , memLevel, updateState, 'list' ) ;
      // updateState(newSteps, newSteps.assignParentMemberToList );
    } catch (e) { errMessage = getHelpfullError(e, true, true); }
  }
  
  if ( visLevel !== null ) {
    try { // Gets the associated visitors group of a web
      visitorGroup = await thisWebInstance.associatedVisitorGroup();
      newSteps = await giveGroupPermissions( newSteps, 'assignParentVisitorToList', listInstance, thisWebInstance, visitorGroup.Id , visLevel, updateState, 'list' ) ;
      // updateState(newSteps, newSteps.assignParentVisitorToList );
    } catch (e) { errMessage = getHelpfullError(e, true, true); }
  }


  /**
   * Create Contribute Group
   */
  let principalId = null;
  if ( newSteps.checkContribGroup.required === true ) {

    currentStep = newSteps.createContribGroup;
    if ( currentStep.required === true ) {
      let GroupTitle = currentStep.value2; //theList.Title + ' Contributors';
      let GroupDesc = `Can UPDATE content in the ${ listOrLib } - ${ theList.Title }`;
      newSteps = await createThisGroup( newSteps, thisWebInstance, GroupTitle, GroupDesc, currentStep, ownerGroup.Id, updateState );

      principalId = currentStep.current.result;
      newSteps = await updateGroupOwner( newSteps, 'updateContribOwner', GroupTitle, siteId, siteUrl, principalId, ownerGroup.Id, updateState );

    }

    principalId = currentStep.current.result;

    // currentStep = newSteps.assignReaderListRole;
    newSteps = await giveGroupPermissions( newSteps, 'assignContribListRole', listInstance, thisWebInstance, principalId , contRoleDefId, updateState, 'list' ) ;
    // currentStep = newSteps.assignReaderSiteRole;
    newSteps = await giveGroupPermissions( newSteps, 'assignContribSiteRole', listInstance, thisWebInstance, principalId , readRoleDefId, updateState, 'web' ) ;

  }

  /**
   * Create Reader Group
   */
  if ( newSteps.checkReaderGroup.required === true ) {
    currentStep = newSteps.createReaderGroup;

    if ( currentStep.required === true ) {
      let GroupTitle = currentStep.value2; //theList.Title + ' Readers';
      let GroupDesc = `Can READ content in the ${ listOrLib }: ${ theList.Title }`;
      newSteps = await createThisGroup( newSteps, thisWebInstance, GroupTitle, GroupDesc, currentStep, ownerGroup.Id, updateState );

      principalId = currentStep.current.result;
      newSteps = await updateGroupOwner( newSteps, 'updateReaderOwner', GroupTitle, siteId, siteUrl, principalId, ownerGroup.Id, updateState );

    }

    principalId = currentStep.current.result;
    // currentStep = newSteps.assignReaderListRole;
    newSteps = await giveGroupPermissions( newSteps, 'assignReaderListRole', listInstance, thisWebInstance, principalId , readRoleDefId, updateState, 'list' ) ;
    // currentStep = newSteps.assignReaderSiteRole;
    newSteps = await giveGroupPermissions( newSteps, 'assignReaderSiteRole', listInstance, thisWebInstance, principalId , readRoleDefId, updateState, 'web' ) ;

  }
  newSteps.complete.current = newSteps.complete.complete;
  updateState( newSteps, newSteps.complete );

  // updateState(newSteps, currentStep);

 }

 export function updateGroupOwner ( newSteps: IProcessSteps,  currentStepStr: string, GroupTitle: string, siteId: string, siteUrl: string, principalId: number, ownerGroupId: number, updateState ) {

  let currentStep: IProcessStep = JSON.parse( JSON.stringify( newSteps[currentStepStr] )) ;

  let doThisStep = shouldDoThisStepBasedOnDependant( currentStep, newSteps );

  if ( doThisStep === true && currentStep.required === true && principalId !== null && ownerGroupId !== null ) {

    currentStep.current = JSON.parse(JSON.stringify( currentStep.powerAuto ));
    currentStep.current.result = 'Que powerAuto';
    currentStep.value3 = principalId;
    currentStep.value4 = ownerGroupId;

    newSteps[currentStepStr] = currentStep;

    updateState(newSteps, currentStep, siteId );

  }

  return newSteps;
   
}

 export async function giveGroupPermissions (newSteps: IProcessSteps, currentStepStr: string, listInstance, thisWebInstance, principalId: number, roleDefId: number, updateState: any, listOrWeb: 'list' | 'web' ){

  let currentStep: IProcessStep = JSON.parse( JSON.stringify( newSteps[currentStepStr] )) ;
  
  let doThisStep = shouldDoThisStepBasedOnDependant( currentStep, newSteps );

  if ( doThisStep === true && currentStep.required === true && roleDefId !== null ) {

    let errMessage = '';
    try {

      if ( listOrWeb === 'list' ) {
        await listInstance.roleAssignments.add(principalId, roleDefId);
        currentStep.current = JSON.parse(JSON.stringify( currentStep.complete ));

      } else if ( listOrWeb === 'web' ) {
        await thisWebInstance.roleAssignments.add(principalId, roleDefId);
        currentStep.current = JSON.parse(JSON.stringify( currentStep.complete ));

      }

    } catch (e) {
      errMessage = getHelpfullError(e, false, true);
      currentStep.current = JSON.parse(JSON.stringify( currentStep.error ));

    }
    
    currentStep.value3 = principalId;
    currentStep.value4 = roleDefId;

    newSteps[currentStepStr] = currentStep;
    updateState(newSteps, currentStep);
  }

  return newSteps;

 }



 export async function createThisGroup( newSteps: IProcessSteps,  thisWebInstance: any, title: string, description: string, currentStep: IProcessStep, ownerGroupId: number, updateState ) {
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
    currentStep.value3 = contributeGroup.data.Id;
    currentStep.value4 = ownerGroupId;

  } catch(e) {
    errMessage = getHelpfullError(e, false, true);
    currentStep.current = JSON.parse(JSON.stringify( currentStep.error ));
    if ( errMessage.indexOf( 'The specified name is already in use' ) > -1 ) {
      currentStep.current.error = 'Group already exists!';
    } else {
      currentStep.current.error = errMessage;
    }
    currentStep.value3 = null;
    currentStep.value4 = ownerGroupId;

  }

  errMessage =  currentStep.current.error;
  updateState(newSteps, currentStep);

  return newSteps;

 }

 export async function getSiteInfoIncludingUnique( webURL : string , minOrAllProps: 'min' | 'all', alertErrors: boolean ) {

  webURL = getFullUrlFromSlashSitesUrl( webURL );
  let errMessage = '';

  const thisWebObject = Web( webURL );
  let getMinProps = 'Title,Id,Url,ServerRelativeUrl,SiteLogoUrl,Description,HasUniqueRoleAssignments';
  if ( minOrAllProps === 'all' ) { getMinProps = '*,' + getMinProps ; }
  let pickedWeb = null;

  try {
    const webbie = await thisWebObject.select(getMinProps).get();

    if ( minOrAllProps === 'min' ) {
      let pickedWebMin : IPickedWebBasic = {
        ServerRelativeUrl: 'Site ServerRelativeUrl',
        guid: 'Site Guid',
        title: 'Site Title',
        url: 'siteURL',
        siteIcon: 'Site Icon',
        error: '',
        HasUniqueRoleAssignments: null,
      };
  
      pickedWebMin = {
          ServerRelativeUrl: webbie.ServerRelativeUrl,
          guid: webbie.Id,
          title: webbie.Title,
          url: webbie.Url,
          siteIcon: webbie.SiteLogoUrl,
          error: '',
          HasUniqueRoleAssignments: webbie['HasUniqueRoleAssignments'],
      };

      pickedWeb = pickedWebMin;

    } else { pickedWeb = webbie; }

  } catch (e) {
    errMessage = getHelpfullError(e, alertErrors, true );
    pickedWeb.error = errMessage;
 
  }

  return pickedWeb;

 }
 

 
const APISiteGetEndPoint : string = '_api/site';
const APISitePostQueryEndPoint : string = '_vti_bin/client.svc/ProcessQuery';

export async function fUpdateGroup ( httpClient: HttpClient, siteUrl: string, siteGuid: string, targetGroupId: string, ownerGroupID: string  ) {

  if ( siteUrl.lastIndexOf('/') !== siteUrl.length -1 ) { siteUrl += '/';}

    const endpoint: string = `${ siteUrl }${ APISitePostQueryEndPoint }`;
    let body: string = '';
    body += '<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="15.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">';
    body +=   '<SetProperty Id="1" ObjectPathId="2" Name="Owner">';
    body +=     '<Parameter ObjectPathId="3" />';
    body +=   '</SetProperty>';
    body +=   '<Method Name="Update" Id="4" ObjectPathId="2" />';
    body +=   '</Actions>';
    body +=   '<ObjectPaths>';
    body +=     '<Identity Id="2" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:AddSiteGUIDHERE:g:TargetGroupID" />';
    body +=     '<Identity Id="3" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:AddSiteGUIDHERE:g:OwnerGroupID" />';
    body +=   '</ObjectPaths>';
    body += '</Request>';

    body = body.replace(/AddSiteGUIDHERE/g, siteGuid );
    body = body.replace(/TargetGroupID/g, targetGroupId );
    body = body.replace(/OwnerGroupID/g, ownerGroupID );

    const request: any = {
      body: body
    };
    let result = null;
    let errMessage = '';

    try {
      result = await httpClient.post( endpoint, HttpClient.configurations.v1, request);
    } catch (e) {
      errMessage = getHelpfullError(e, true, true );
    }

    console.log( result );
    return result;

}

export class UpdateGroup {

  constructor(private httpClient: HttpClient ) { }

  public updateOwner( siteUrl: string, siteGuid: string, targetGroupId: string, ownerGroupID: string ): Promise<any> {
    if ( siteUrl.lastIndexOf('/') !== siteUrl.length -1 ) { siteUrl += '/';}
    return new Promise<any>((resolve,reject) => {
      const endpoint: string = `${ siteUrl }${ APISitePostQueryEndPoint }`;
      let body = '<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="15.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">';
      body += '<SetProperty Id="1" ObjectPathId="2" Name="Owner">';
      body += '<Parameter ObjectPathId="3" />';
      body += '</SetProperty>';
      body += '<Method Name="Update" Id="4" ObjectPathId="2" />';
      body += '</Actions>';
      body += '<ObjectPaths>';
      body += '<Identity Id="2" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:AddSiteGUIDHERE:g:TargetGroupID" />';
      body += '<Identity Id="3" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:AddSiteGUIDHERE:g:OwnerGroupID" />';
      body += '</ObjectPaths>';
      body += '</Request>';

      body.replace('AddSiteGUIDHERE', siteGuid );
      body.replace('TargetGroupID', targetGroupId );
      body.replace('OwnerGroupID', ownerGroupID );

      const request: any = {
        body: body
      };

      this.httpClient.post( endpoint, HttpClient.configurations.v1, request)
      .then((rawResponse: HttpClientResponse) => {
          return rawResponse.json();
      })
      .then((jsonResponse: any ) => {
          resolve(jsonResponse);
      })
      .catch(( error ) => {
        reject( error );
      });

    });
  }
}