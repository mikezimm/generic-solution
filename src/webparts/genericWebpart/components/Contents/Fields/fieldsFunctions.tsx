import { Web, IList } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsFieldInfo, IFieldBucketInfo } from  './fieldsComponent';

import { doesObjectExistInArray, } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
import {  addItemToArrayIfItDoesNotExist } from '@mikezimm/npmfunctions/dist/Services/Arrays/manipulation';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { pivCats } from './fieldsComponent';

export type IValidTemplate = 100 | 101;

import { MyFieldDef, cBool, cCalcT, cCalcN, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
    cMText, cText, cNumb, cURL, cUser, cMUser, myFieldDefs } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';


let SystemFields = [ 'AccessPolicy', '_ModerationStatus', '_ModerationComments', 'SyncClientId', '_CommentCount', '_CommentFlags', 'ContentTypeId', 'ContentVersion',
    '_CopySource', '_EditMenuTableEnd', '_EditMenuTableStart', '_EditMenuTableStart2', 'PermMask', 'EncodedAbsUrl', 'BaseName', 'File_x0020_Type',
    'GUID', '_HasCopyDestinations', 'HTML_x0020_File_x0020_Type', 'InstanceID', '_IsCurrentVersion', 'FSObjType', 'SMLastModifiedDate', '_Level',
    'NoExecute', 'owshiddenversion', 'FileDirRef', 'ProgId', 'MetaInfo', 'Restricted', 'ScopeId', 'SelectTitle',
    'ServerUrl', 'SortBehavior', 'SMTotalFileCount', 'SMTotalFileStreamSize', '_VirusInfo', '_VirusStatus', '_VirusVendorID', 'WorkflowInstanceID',
    'WorkflowVersion', '', '', '', '', '', '', '',
];

let ootbFields = [ 'Created_x0020_Date', 'Last_x0020_Modified', 'FileLeafRef', 'LinkFilenameNoMenu', 'LinkFilename', 'LinkFilename2', '', '',
    'SMTotalSize', 'LinkTitle2', '_UIVersion', 'UniqueId', 'FileRef', 'Title', 'Created', 'Modified',
    'Author', 'Editor', '', '', '', '', '', '',
        
];


//export async function provisionTestPage( makeThisPage:  IContentsFieldInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableFields( webURL: string, listGUID: string, fieldBuckets: IFieldBucketInfo[], addTheseFieldsToState: any, setProgress: any, markComplete: any ): Promise<IContentsFieldInfo[]>{

    let contentsFields : IContentsFieldInfo = null;

    //lists.getById(listGUID).fields.orderBy("Title", true).get().then(function(result) {
    //let allFields : IContentsFieldInfo[] = await thisWebInstance.fields.get();

    let allFields : IContentsFieldInfo[] = [];

    let thisWebInstance = null;
    let scope = '';
    let errMessage = '';

    try {
        if ( listGUID != '' ) {
            thisWebInstance = Web(webURL);
            allFields = await thisWebInstance.lists.getById(listGUID).fields.orderBy("Title", true).get();
            scope = 'List';
    
        } else {
            allFields = await thisWebInstance.fields.orderBy("Title", true).get();
            scope = 'Web';
    
        }
    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }


    console.log('allAvailableFields allFields:' , allFields);

    for (let i in allFields ) {

        let idx = getFieldSort(allFields[i], fieldBuckets);

        allFields[i].sort = fieldBuckets[idx]['sort'];
        allFields[i].bucketCategory = fieldBuckets[idx]['bucketCategory'];
        allFields[i].bucketLabel = fieldBuckets[idx]['bucketLabel'];
        allFields[i].bucketIdx = idx;       

        allFields[i].meta = buildMetaFromField(allFields[i]);
        allFields[i].searchString = buildSearchStringFromField(allFields[i]);


    }

    addTheseFieldsToState(allFields, scope, errMessage);
    return allFields;

}

function getFieldSort( theField: IContentsFieldInfo, fieldBuckets: IFieldBucketInfo[] ) {
/*
    { fields: [], count: 0, sort : '0' , bucketCategory: 'Custom' , bucketLabel: '0. User Content'} ,
    { fields: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
    { fields: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
*/

    let bucketCategory = '';

    if ( ootbFields.indexOf( theField.StaticName ) > -1 ) {
        bucketCategory = 'OOTB';

    } else if ( SystemFields.indexOf(theField.StaticName) > -1 ) {
        bucketCategory = 'System';

    } else if ( theField.CanBeDeleted === false ) {
        bucketCategory = 'System';

    } else if ( theField.ReadOnlyField === true ) {
        bucketCategory = 'ReadOnly';
        
    } else { bucketCategory = 'Custom'; }

    let idx : any = doesObjectExistInArray(fieldBuckets, 'bucketCategory', bucketCategory ); 

    if ( idx === false ) { alert('getFieldSort issue... bucketCategory (' + bucketCategory + ')not found in fieldBuckets.'); idx = -1; }

    return idx;

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
    meta = addItemToArrayIfItDoesNotExist(meta, theField.Hidden ? pivCats.hidden.title: pivCats.visible.title);
    if( theField.Required === true || theField.Indexed === true ) {
        meta = addItemToArrayIfItDoesNotExist(meta, pivCats.required.title);
    }

    meta = addItemToArrayIfItDoesNotExist(meta, theField.sort );
    meta = addItemToArrayIfItDoesNotExist(meta, theField.bucketLabel );

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

    if ( newField.TypeAsString === 'Calculated' ) { result += 'Formula=' + newField.Formula + delim ; }

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


