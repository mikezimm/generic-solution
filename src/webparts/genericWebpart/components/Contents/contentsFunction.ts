import { Web, IList } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog } from '../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../services/listServices/listServices';

import { IFieldLog, addTheseFields } from '../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

export type IValidTemplate = 100 | 101;

// Copied from WPDef component
export function addItemToArrayIfItDoesNotExist (arr : string[], item: string ) {
    if ( item != '' && arr.indexOf(item) < 0 ) { arr.push(item); }
    return arr;
}
//export async function provisionTestPage( makeThisPage:  IContentsListInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableLists( webURL: string, addTheseListsToState: any, setProgress: any, markComplete: any ): Promise<IContentsListInfo[]>{

    let allLists : IContentsListInfo[] = [];

    allLists = await sp.web.lists.get();
    console.log(allLists);

    for (let i in allLists ) {
        allLists[i].meta = buildMetaFromList(allLists[i]);
        allLists[i].searchString = buildSearchStringFromList(allLists[i]);

    }

    addTheseListsToState(allLists);
    return allLists;
}

function buildMetaFromList( theList: IContentsListInfo ) {
    let meta: string[] = [];

    meta = addItemToArrayIfItDoesNotExist(meta, theList.Hidden ? 'Hidden': 'Visible');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.ForceCheckout ? 'CheckOut': '');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.NoCrawl ? 'NoSearch': '');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.ItemCount > 5000 ? 'MaxItems': theList.ItemCount > 1000 ? 'WarnItems':'');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.EnableVersioning ? 'NoVersions':'');

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


