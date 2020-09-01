import { Web, IList } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { IDrillItemInfo, IDrillList } from  './drillComponent';

import { changes, IMyFieldTypes } from '../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime, getAge, getBestTimeDelta} from '../../../../services/dateServices';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../services/arrayServices';

import { getHelpfullError } from '../../../../services/ErrorHandler';

import { IViewLog, addTheseViews } from '../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats } from './drillComponent';

export async function getAllItems( drillList: IDrillList, addTheseItemsToState: any, setProgress: any, markComplete: any ): Promise<IDrillItemInfo[]>{

    let drillItems : IDrillItemInfo = null;

    //lists.getById(listGUID).webs.orderBy("Title", true).get().then(function(result) {
    //let allItems : IDrillItemInfo[] = await sp.web.webs.get();

    let thisListObject = null;

    let allItems : IDrillItemInfo[] = [];
    let errMessage = '';
    try {
        thisListObject = Web(drillList.webURL);
        allItems = await thisListObject.lists.getByTitle(drillList.name).items.get();
    
    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }

    let thisIsNow = new Date().toLocaleString();

    for (let i in allItems ) {

        allItems[i].timeCreated = makeSmallTimeObject(allItems[i].Created);
        allItems[i].timeModified = makeSmallTimeObject(allItems[i].Modified);

        allItems[i].bestCreate = getBestTimeDelta(allItems[i].Created, thisIsNow);
        allItems[i].bestMod = getBestTimeDelta(allItems[i].Modified, thisIsNow);

        allItems[i].meta = buildMetaFromItem(allItems[i]);
        allItems[i].searchString = buildSearchStringFromWeb(allItems[i]);

    }

    if ( errMessage === '' && allItems.length === 0 ) { 
        errMessage = 'This site/web does not have any subsites that you can see.';
     }
    addTheseItemsToState(allItems, errMessage);
    return allItems;

}


function buildMetaFromItem( theWeb: IDrillItemInfo ) {
    let meta: string[] = ['All'];

    if ( theWeb.timeCreated.daysAgo === 0 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, 'New');
    } else {
        meta = theWeb.timeCreated.daysAgo < 180 ? addItemToArrayIfItDoesNotExist(meta, 'RecentlyCreated') : addItemToArrayIfItDoesNotExist(meta, 'Old');
    }

    meta = theWeb.timeModified.daysAgo < 180 ? addItemToArrayIfItDoesNotExist(meta, 'RecentlyUpdated') : addItemToArrayIfItDoesNotExist(meta, 'Stale');

    meta = addItemToArrayIfItDoesNotExist(meta, theWeb.sort );

    return meta;
}

function buildSearchStringFromWeb (newWeb : IDrillItemInfo) {

    let result = '';
    let delim = '|||';

    if ( newWeb.Title ) { result += 'Title=' + newWeb.Title + delim ; }

    if ( newWeb.Id ) { result += 'Id=' + newWeb.Id + delim ; }

    if ( newWeb['odata.type'] ) { result += newWeb['odata.type'] + delim ; }

    if ( newWeb.meta.length > 0 ) { result += 'Meta=' + newWeb.meta.join(',') + delim ; }

    result = result.toLowerCase();

    return result;

}