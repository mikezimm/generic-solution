
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

import { Web, IList, Site, ISite } from "@pnp/sp/presets/all";

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

import { getHelpfullErrorV2, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { BaseErrorTrace } from '../../../../../services/BaseErrorTrace';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';  //    webURL = getFullUrlFromSlashSitesUrl( webURL );

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

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';


import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';


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

import { pivCats, IListBucketInfo } from './listsComponent';

import { IFieldBucketInfo, IContentsFieldInfo } from '../Fields/fieldsComponent';
import * as ECFields from '../Fields/fieldsFunctions';

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

 
export type IValidTemplate = 100 | 101;



export async function allFieldsCompare( webURL: string, listTitleOrId: string, fieldBuckets: IFieldBucketInfo[], addTheseListsToState: any, setProgress: any, markComplete: any ): Promise<IContentsFieldInfo[]>{

    let fields : IContentsFieldInfo[] = [];
    let errMessage = '';
    addTheseListsToState(fields, errMessage, null );
    return fields;
}


export async function getSiteInfo( webUrl: string ) {
  
    webUrl = getFullUrlFromSlashSitesUrl( webUrl );

    let thisSiteInstance: ISite = null;
    let errMessage = null;

  
    try {
      thisSiteInstance = await Site( webUrl );
    } catch (e) {
    
      let helpfulErrorEnd = [ webUrl, '', '', null, null ].join('|');
      errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'getSiteInfo ~ 137', helpfulErrorEnd ].join('|') );
    }
  
    let theSite = null;

    try {
        theSite = await thisSiteInstance.get();
      } catch (e) {

        let helpfulErrorEnd = [ webUrl, '', '', null, null ].join('|');

        //Set alertMe = false because it was causing false positives when clicking to Site Contents from page with EasyContents on it.
        console.log('---===>>>> getSiteInfo FAILED, NO Alert');
        errMessage = getHelpfullErrorV2(e, false, true, [ BaseErrorTrace , 'Failed', 'getSiteInfo ~ 148', helpfulErrorEnd ].join('|') );
      }

 
    return theSite;
  
  }

//export async function provisionTestPage( makeThisPage:  IContentsListInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableLists( webURL: string, restFilter: string, listBuckets: IListBucketInfo[], addTheseListsToState: any, setProgress: any, markComplete: any ): Promise<IContentsListInfo[] | any >{

    webURL = getFullUrlFromSlashSitesUrl( webURL );

    let contentsLists : IContentsLists = null;

    let thisWebInstance = null;
    let scope = '';
    let errMessage = '';
    let allLists : IContentsListInfo[] = [];

    try {

        thisWebInstance = Web(webURL);

        if ( restFilter && restFilter.length > 0 ) {

            try {
                allLists = await thisWebInstance.lists.select('*,HasUniqueRoleAssignments').filter( restFilter ).get();
              } catch (e) {
        
                let helpfulErrorEnd = [ webURL, '', '', null, null ].join('|');
                errMessage = getHelpfullErrorV2(e, false, true, [ BaseErrorTrace , 'Failed', 'getSiteInfo GetLists With Filter ~ 182', helpfulErrorEnd ].join('|') );
              }

        } else {

            try {
                allLists = await thisWebInstance.lists.select('*,HasUniqueRoleAssignments').get();
              } catch (e) {
        
                let helpfulErrorEnd = [ webURL, '', '', null, null ].join('|');
                errMessage = getHelpfullErrorV2(e, false, true, [ BaseErrorTrace , 'Failed', 'getSiteInfo Get Lists No Filter ~ 192', helpfulErrorEnd ].join('|') );
              }
        }
        //console.log(allLists);

        for (let i in allLists ) {

            let lastModified = makeSmallTimeObject(allLists[i].LastItemModifiedDate);
            let created = makeSmallTimeObject(allLists[i].Created);

            allLists[i].Created = makeSmallTimeObject(allLists[i].Created).dayYYYYMMDD;

            allLists[i].LastItemModifiedDate = lastModified.daysAgo.toString() + ' days';
            allLists[i].modifiedAge = lastModified.daysAgo;
            allLists[i].createdAge = created.daysAgo;

            let urlEntityName = encodeDecodeString( allLists[i].EntityTypeName , 'decode');
            allLists[i].EntityTypeName = urlEntityName + '';

            let idx = getListSort(allLists[i], listBuckets);

            allLists[i].sort = listBuckets[idx]['sort'];
            allLists[i].bucketCategory = listBuckets[idx]['bucketCategory'];
            allLists[i].bucketLabel = listBuckets[idx]['bucketLabel'];
            allLists[i].bucketIdx = idx;

            allLists[i].meta = buildMetaFromList(allLists[i]);

            //console.log('EntityTypeName - urlEntityName: ', allLists[i].EntityTypeName , urlEntityName);

            if ( urlEntityName.indexOf('OData.') === 0 || urlEntityName.indexOf('OData_') === 0 ) {
                //These are special libraries
                urlEntityName = urlEntityName.replace('OData.','');
                urlEntityName = urlEntityName.replace('OData_','');
                allLists[i].EntityTypeName = urlEntityName;
                allLists[i].railsOffLink = true;
                allLists[i].allowCrazyLink = true;

            } else if ( doesObjectExistInArray( entityMaps, 'name', urlEntityName ) !== false ) {
                let index : any = doesObjectExistInArray( entityMaps, 'name', urlEntityName );
                urlEntityName = entityMaps[index].url;
                allLists[i].railsOffLink = true;
                allLists[i].allowCrazyLink = true;

            } else if ( allLists[i].meta.indexOf( pivCats.lists.title ) > -1 ) {
                urlEntityName = 'lists/' + urlEntityName.substr(0, urlEntityName.lastIndexOf('List')) ;
                allLists[i].railsOffLink = false;
            }

            allLists[i].listURL = webURL + '/' + urlEntityName;
            allLists[i].responseIndex = i;
            allLists[i].searchString = buildSearchStringFromList(allLists[i]);

        }

        addTheseListsToState(allLists, errMessage);
        return { allLists: allLists, errMessage: errMessage } ;

    } catch (e) {
            
        let helpfulErrorEnd = [ webURL, '', '', null, null ].join('|');
        errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'getSiteInfo ~ 252', helpfulErrorEnd ].join('|') );

        console.log('checkThisPage', errMessage);
        addTheseListsToState([], errMessage );
        return { allLists: allLists, errMessage: errMessage } ;
    }

}



function getListSort( theList: IContentsListInfo, listBuckets: IListBucketInfo[] ) {

    let bucketCategory = '';

    if ( TempContLists.indexOf( theList.EntityTypeName ) > -1 ) {
        bucketCategory = 'Template Content';

    } else if ( TempSysLists.indexOf(theList.EntityTypeName) > -1 ) {
        bucketCategory = 'Template System';

    } else if ( SystemLists.indexOf(theList.EntityTypeName) > -1 || EntityMapsNames.indexOf(theList.EntityTypeName) > -1 ) {
        bucketCategory = 'System';

    } else if ( SystemLists.indexOf('OData__') === 0 ) {
        bucketCategory = 'System';

    } else { bucketCategory = 'Custom'; }

    let idx : any = doesObjectExistInArray(listBuckets, 'bucketCategory', bucketCategory ); 

    if ( idx === false ) { alert('getFieldSort issue... bucketCategory (' + bucketCategory + ')not found in fieldBuckets.'); idx = -1; }

    return idx;

}

function buildMetaFromList( theList: IContentsListInfo ) {
    let meta: string[] = [];

    meta = addItemToArrayIfItDoesNotExist(meta, theList.Hidden ? pivCats.hidden.title: pivCats.visible.title);
    meta = addItemToArrayIfItDoesNotExist(meta, theList.ForceCheckout ? pivCats.checkout.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.NoCrawl ? pivCats.noSearch.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.ItemCount > 5000 ? pivCats.max.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.ItemCount > 1000 ? pivCats.lots.title:'');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.ItemCount === 0 ? pivCats.empty.title: pivCats.notEmpty.title);    
    meta = addItemToArrayIfItDoesNotExist(meta, !theList.EnableVersioning ? pivCats.noVersions.title:'');

    meta = addItemToArrayIfItDoesNotExist(meta, theList.MajorVersionLimit > 100 ? pivCats.versions.title:'');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.modifiedAge > 180 ? pivCats.old.title:'');

    meta = addItemToArrayIfItDoesNotExist(meta, theList.sort );

    meta = addItemToArrayIfItDoesNotExist(meta, theList.bucketLabel );

    //List of List and Library types
    //https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-visio/jj245053(v=office.15)?redirectedfrom=MSDN#remarks

    let isLibrary = theList.BaseType === 0 ? pivCats.lists : pivCats.libraries ;
    meta = addItemToArrayIfItDoesNotExist(meta, isLibrary.title );
    // meta = addItemToArrayIfItDoesNotExist(meta, theList. > 100 ? 'Versioning':'');

    return meta;
}

function createListItem( responseList: any) {

//let newList : IContentsListInfo = {


//}

//return newList;

}
function buildSearchStringFromList (newList : IContentsListInfo) {

    let result = '';
    let delim = '|||';

    if ( newList.Title ) { result += 'Title=' + newList.Title + delim ; }
    if ( newList.EntityTypeName ) { result += 'Name=' + newList.EntityTypeName + delim ; }
    if ( newList.Id ) { result += 'Id=' + newList.Id + delim ; }
    if ( newList.meta.length > 0 ) { result += 'Meta=' + newList.meta.join(',') + delim ; }

    result += 'resindex=' + newList.responseIndex + delim ;

    result = result.toLowerCase();

    return result;

}
/**
 * 
 * The purpose of this function is to find an appropriate value on the entry if it's not directly available.
 * For example, if the manifest does not have a value, then look at preConfiguredEntries
 * 
 * @param key 
 * @param thisEntry 
 * @param thisManifest 
 * @param allPreConfigPropsLength 
 */


