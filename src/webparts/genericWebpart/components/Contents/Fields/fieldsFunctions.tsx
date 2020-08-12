import { Web, IList } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { IContentsFieldInfo } from  './fieldsComponent';

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime} from '../../../../../services/dateServices';

import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats } from './fieldsComponent';

export type IValidTemplate = 100 | 101;



let SystemFields = [

];

// Copied from WPDef component
export function addItemToArrayIfItDoesNotExist (arr : string[], item: string ) {
    if ( item != '' && arr.indexOf(item) < 0 ) { arr.push(item); }
    return arr;
}

//export async function provisionTestPage( makeThisPage:  IContentsFieldInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableFields( webURL: string, addTheseFieldsToState: any, setProgress: any, markComplete: any ): Promise<IContentsFieldInfo[]>{

    let contentsFields : IContentsFieldInfo = null;

    let allFields : IContentsFieldInfo[] = await sp.web.fields.get();
    console.log(allFields);

    for (let i in allFields ) {

        allFields[i].meta = buildMetaFromField(allFields[i]);
        allFields[i].searchString = buildSearchStringFromField(allFields[i]);

    }

    addTheseFieldsToState(allFields);
    return allFields;

}

function getFieldSort( theField: IContentsFieldInfo ) {

    let thisSort = '0';
    let thisLabel = 'Custom';

    if ( SystemFields.indexOf(theField.StaticName) > -1 ) {
        thisSort = '9';
        thisLabel = 'System';

    } 

    let thisGroup = thisSort + '. ' + thisLabel;

    return {
        sort: thisSort,
        label: thisLabel,
        group: thisGroup,
    };
}

function buildMetaFromField( theField: IContentsFieldInfo ) {
    let meta: string[] = [];

    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.hidden.title: pivCats.visible.title);

    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.text.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.calculated.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.choice.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.look.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.user.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.number.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.date.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.url.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.boolean.title: '');

    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.computed.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.system.title: '');

    meta = addItemToArrayIfItDoesNotExist(meta, theField.sort );
    meta = addItemToArrayIfItDoesNotExist(meta, theField.groupLabel );


    return meta;
}

function createFieldItem( responseField: any) {

//let newField : IContentsFieldInfo = {


//}

//return newField;

}
function buildSearchStringFromField (newField : IContentsFieldInfo) {

    let result = '';
    let delim = '|||';

    if ( newField.Title ) { result += 'Title=' + newField.Title + delim ; }
    if ( newField.StaticName ) { result += 'Name=' + newField.StaticName + delim ; }
    if ( newField.Id ) { result += 'Id=' + newField.Id + delim ; }

    if ( newField.meta.length > 0 ) { result += 'Meta=' + newField.meta.join(',') + delim ; }

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


