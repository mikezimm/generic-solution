import { Web, IList } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime} from '../../../../../services/dateServices';

import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats } from './listsComponent';

export type IValidTemplate = 100 | 101;

// Copied from WPDef component
export function addItemToArrayIfItDoesNotExist (arr : string[], item: string ) {
    if ( item != '' && arr.indexOf(item) < 0 ) { arr.push(item); }
    return arr;
}
//export async function provisionTestPage( makeThisPage:  IContentsListInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableLists( webURL: string, addTheseListsToState: any, setProgress: any, markComplete: any ): Promise<IContentsListInfo[]>{

    let contentsLists : IContentsLists = null;

    let allLists : IContentsListInfo[] = await sp.web.lists.get();
    console.log(allLists);

    for (let i in allLists ) {

        allLists[i].Created = makeSmallTimeObject(allLists[i].Created).dayYYYYMMDD;
        allLists[i].LastItemModifiedDate = makeSmallTimeObject(allLists[i].LastItemModifiedDate).daysAgo.toString() + ' days';
        allLists[i].meta = buildMetaFromList(allLists[i]);
        allLists[i].searchString = buildSearchStringFromList(allLists[i]);

    }

    contentsLists = {
        tabs: [],
        lists : {
            all: allLists,
            searched: allLists,
        }
    };
    addTheseListsToState(allLists);
    return allLists;

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
    meta = addItemToArrayIfItDoesNotExist(meta, theList.LastItemModifiedDate > '100' ? pivCats.old.title:'');
    meta = addItemToArrayIfItDoesNotExist(meta, theList.MajorVersionLimit > 100 ? pivCats.versions.title:'');

    let libraryTemplates = [101, 116, 119,];
    let listTemplates = [100, 106];
    let isLibrary = libraryTemplates.indexOf(theList.BaseTemplate) > -1 ? pivCats.libraries : pivCats.lists ;
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


