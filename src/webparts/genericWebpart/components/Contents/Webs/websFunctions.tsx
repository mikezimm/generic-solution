import { Web, IList } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { IContentsWebInfo, IWebBucketInfo } from  './websComponent';

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime} from '../../../../../services/dateServices';

import { doesObjectExistInArray } from '../../../../../services/arrayServices';

import { getHelpfullError } from '../../../../../services/ErrorHandler';

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats } from './websComponent';

export type IValidTemplate = 'SITEPAGEPUBLISHING#0' | 'STS#3';
export type IValidWebTemplate2 = 64 | 68 ; //64 = Team; 68 = Communication

//[‎8/‎18/‎2020 1:41 PM]  Karina Stan:  
//  SITEPAGEPUBLISHING#0 - Communication site
//  STS#3  = team site no group 365
//  GROUP#0   = with group 365
 

// Copied from WPDef component
export function addItemToArrayIfItDoesNotExist (arr : string[], item: string ) {
    if ( item != '' && arr.indexOf(item) < 0 ) { arr.push(item); }
    return arr;
}

//export async function provisionTestPage( makeThisPage:  IContentsWebInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableWebs( webURL: string, listGUID: string, webBuckets: IWebBucketInfo[], addTheseWebsToState: any, setProgress: any, markComplete: any ): Promise<IContentsWebInfo[]>{

    let contentsWebs : IContentsWebInfo = null;

    //lists.getById(listGUID).webs.orderBy("Title", true).get().then(function(result) {
    //let allWebs : IContentsWebInfo[] = await sp.web.webs.get();

    let allWebs : IContentsWebInfo[] = [];
    let scope = '';
    let errMessage = '';
    try {
        if ( listGUID != '' ) {
            allWebs = await sp.web.webs.orderBy("Title", true).get();
            scope = 'List';
    
        } else {
            allWebs = await sp.web.webs.orderBy("Title", true).get();
            scope = 'Web';
    
        }
    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }


    console.log('allAvailableWebs allWebs:' , allWebs);

    for (let i in allWebs ) {

        let idx = getWebSort(allWebs[i], webBuckets);

        allWebs[i].sort = webBuckets[idx]['sort'];
        allWebs[i].bucketCategory = webBuckets[idx]['bucketCategory'];
        allWebs[i].bucketLabel = webBuckets[idx]['bucketLabel'];
        allWebs[i].bucketIdx = idx;       

        allWebs[i].meta = buildMetaFromWeb(allWebs[i]);
        allWebs[i].searchString = buildSearchStringFromWeb(allWebs[i]);


    }

    addTheseWebsToState(allWebs, scope, errMessage);
    return allWebs;

}

function getWebSort( theWeb: IContentsWebInfo, webBuckets: IWebBucketInfo[] ) {
/*
    { webs: [], count: 0, sort : '0' , bucketCategory: 'Custom' , bucketLabel: '0. User Content'} ,
    { webs: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
    { webs: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
*/

    let bucketCategory = '';

    /*
    if ( ootbWebs.indexOf( theWeb.StaticName ) > -1 ) {
        bucketCategory = 'OOTB';

    } else if ( SystemWebs.indexOf(theWeb.StaticName) > -1 ) {
        bucketCategory = 'System';

    } else if ( theWeb.CanBeDeleted === false ) {
        bucketCategory = 'System';

    } else if ( theWeb.ReadOnlyWeb === true ) {
        bucketCategory = 'ReadOnly';
        
    } else { bucketCategory = 'Custom'; }
*/

    let idx : any = doesObjectExistInArray(webBuckets, 'bucketCategory', bucketCategory ); 

    if ( idx === false ) { alert('getWebSort issue... bucketCategory (' + bucketCategory + ')not found in webBuckets.'); idx = -1; }

    return idx;

}

function buildMetaFromWeb( theWeb: IContentsWebInfo ) {
    let meta: string[] = [];

    meta = addItemToArrayIfItDoesNotExist(meta, theWeb.CanBeDeleted !== true ? pivCats.visible.title: '');

    meta = addItemToArrayIfItDoesNotExist(meta, theWeb.sort );
    meta = addItemToArrayIfItDoesNotExist(meta, theWeb.bucketLabel );

    return meta;
}

function createWebItem( responseWeb: any) {

//let newWeb : IContentsWebInfo = {


//}

//return newWeb;

}

function buildSearchStringFromWeb (newWeb : IContentsWebInfo) {

    let result = '';
    let delim = '|||';

    if ( newWeb.Title ) { result += 'Title=' + newWeb.Title + delim ; }

    if ( newWeb.Id ) { result += 'Id=' + newWeb.Id + delim ; }

    if ( newWeb.FillInChoice === true ) { result += 'FillInChoice' + delim ; }

    if ( newWeb['odata.type'] ) { result += newWeb['odata.type'] + delim ; }

    if ( newWeb.meta.length > 0 ) { result += 'Meta=' + newWeb.meta.join(',') + delim ; }

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


