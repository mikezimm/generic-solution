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

import { doesObjectExistInArray } from '../../../../../services/arrayServices';

import { getHelpfullError } from '../../../../../services/ErrorHandler';

import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats } from './fieldsComponent';

export type IValidTemplate = 100 | 101;

import { MyFieldDef, cBool, cCalcT, cCalcN, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
    cMText, cText, cNumb, cURL, cUser, cMUser, myFieldDefs } from '../../../../../services/listServices/columnTypes';


let SystemFields = [ 'AccessPolicy', '_ModerationStatus', '_ModerationComments', 'SyncClientId', '_CommentCount', '_CommentFlags', 'ContentTypeId', 'ContentVersion',
    '_CopySource', '_EditMenuTableEnd', '_EditMenuTableStart', '_EditMenuTableStart2', 'PermMask', 'EncodedAbsUrl', 'BaseName', 'File_x0020_Type',
    'GUID', '_HasCopyDestinations', 'HTML_x0020_File_x0020_Type', 'InstanceID', '_IsCurrentVersion', 'FSObjType', 'SMLastModifiedDate', '_Level',
    'NoExecute', 'owshiddenversion', 'FileDirRef', 'ProgId', 'MetaInfo', 'Restricted', 'ScopeId', 'SelectTitle',
    'ServerUrl', 'SortBehavior', 'SMTotalFileCount', 'SMTotalFileStreamSize', '_VirusInfo', '_VirusStatus', '_VirusVendorID', 'WorkflowInstanceID',
    'WorkflowVersion', '', '', '', '', '', '', '',
];

let ootbFields = [ 'Created_x0020_Date', 'Last_x0020_Modified', 'FileLeafRef', 'LinkFilenameNoMenu', 'LinkFilename', 'LinkFilename2', '', '',
    'SMTotalSize', 'LinkTitle2', '_UIVersion', 'UniqueId', 'FileRef', '', '', '',
    '', '', '', '', '', '', '', '',
        
];

// Copied from WPDef component
export function addItemToArrayIfItDoesNotExist (arr : string[], item: string ) {
    if ( item != '' && arr.indexOf(item) < 0 ) { arr.push(item); }
    return arr;
}

//export async function provisionTestPage( makeThisPage:  IContentsFieldInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableFields( webURL: string, listGUID: string, addTheseFieldsToState: any, setProgress: any, markComplete: any ): Promise<IContentsFieldInfo[]>{

    let contentsFields : IContentsFieldInfo = null;

    //lists.getById(listGUID).fields.orderBy("Title", true).get().then(function(result) {
    //let allFields : IContentsFieldInfo[] = await sp.web.fields.get();

    let allFields : IContentsFieldInfo[] = [];
    let scope = '';
    let errMessage = '';
    try {
        if ( listGUID != '' ) {
            allFields = await sp.web.lists.getById(listGUID).fields.orderBy("Title", true).get();
            scope = 'List';
    
        } else {
            allFields = await sp.web.fields.orderBy("Title", true).get();
            scope = 'Web';
    
        }
    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }


    console.log('allAvailableFields allFields:' , allFields);

    for (let i in allFields ) {

        let sort = getFieldSort(allFields[i]);

        allFields[i].sort = sort.sort;
        allFields[i].cGroup = sort.group;
        allFields[i].groupLabel = sort.label;

        allFields[i].meta = buildMetaFromField(allFields[i]);
        allFields[i].searchString = buildSearchStringFromField(allFields[i]);

    }

    addTheseFieldsToState(allFields, scope, errMessage);
    return allFields;

}

function getFieldSort( theField: IContentsFieldInfo ) {

    let thisSort = '0';
    let thisLabel = 'Custom';

    if ( SystemFields.indexOf(theField.StaticName) > -1 ) {
        thisSort = '9';
        thisLabel = 'System';

    } else if ( ootbFields.indexOf( theField.StaticName ) > -1 ) {
        thisSort = '6';
        thisLabel = 'OOTB';

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

    meta = addItemToArrayIfItDoesNotExist(meta, theField.CanBeDeleted !== true && !theField.Hidden ? pivCats.visible.title: '');

    let getTypeIndex = doesObjectExistInArray( myFieldDefs, 'type', theField['odata.type']);

    if ( !getTypeIndex ) {
        meta = addItemToArrayIfItDoesNotExist(meta, 'Unk' );

    } else {
        let typeIndex : string = !getTypeIndex ? 'NotFoundAnywhere' :  getTypeIndex;
        let fieldType = myFieldDefs[typeIndex].label;
        meta = addItemToArrayIfItDoesNotExist(meta, fieldType );

    }

    //Add hidden to meta
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.hidden.title: '');

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

    if ( newField.FillInChoice === true ) { result += 'FillInChoice' + delim ; }
    if ( newField.Group.length > 0 ) { result += 'Group=' + newField.Group + delim ; }
    if ( newField.Sealed === true ) { result += 'IsSealed' + delim ; }
    if ( newField.ReadOnlyField === true ) { result += 'ReadOnlyField' + delim ; }
    if ( newField['odata.type'] ) { result += newField['odata.type'] + delim ; }

    result += 'Kind=' + newField.FieldTypeKind + delim ;

    if ( newField.Required === true ) { result += 'Required' + delim ; }
    if ( newField.Indexed === true ) { result += 'Indexed' + delim ; }
    if ( newField.EnforceUniqueValues === true ) { result += 'Unique' + delim ; }

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


