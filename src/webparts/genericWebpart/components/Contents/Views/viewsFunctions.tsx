import { Web, IList } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { IContentsViewInfo, IViewBucketInfo } from  './viewsComponent';

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime} from '@mikezimm/npmfunctions/dist/dateServices';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '@mikezimm/npmfunctions/dist/arrayServices';

import { getXMLObjectFromString } from '../../../../../services/XMLServices';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/ErrorHandler';

import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats } from './viewsComponent';

export type IValidTemplate = 100 | 101;

import { MyFieldDef, cBool, cCalcT, cCalcN, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
    cMText, cText, cNumb, cURL, cUser, cMUser, myFieldDefs } from '../../../../../services/listServices/columnTypes';


let SystemViews = [ 'AccessPolicy', '_ModerationStatus', '_ModerationComments', 'SyncClientId', '_CommentCount', '_CommentFlags', 'ContentTypeId', 'ContentVersion',
    '_CopySource', '_EditMenuTableEnd', '_EditMenuTableStart', '_EditMenuTableStart2', 'PermMask', 'EncodedAbsUrl', 'BaseName', 'File_x0020_Type',
    'GUID', '_HasCopyDestinations', 'HTML_x0020_File_x0020_Type', 'InstanceID', '_IsCurrentVersion', 'FSObjType', 'SMLastModifiedDate', '_Level',
    'NoExecute', 'owshiddenversion', 'FileDirRef', 'ProgId', 'MetaInfo', 'Restricted', 'ScopeId', 'SelectTitle',
    'ServerUrl', 'SortBehavior', 'SMTotalFileCount', 'SMTotalFileStreamSize', '_VirusInfo', '_VirusStatus', '_VirusVendorID', 'WorkflowInstanceID',
    'WorkflowVersion', '', '', '', '', '', '', '',
];

let ootbViews = [ 'Created_x0020_Date', 'Last_x0020_Modified', 'FileLeafRef', 'LinkFilenameNoMenu', 'LinkFilename', 'LinkFilename2', '', '',
    'SMTotalSize', 'LinkTitle2', '_UIVersion', 'UniqueId', 'FileRef', 'Title', 'Created', 'Modified',
    'Author', 'Editor', '', '', '', '', '', '',
        
];


//export async function provisionTestPage( makeThisPage:  IContentsViewInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableViews( webURL: string, listGUID: string, viewBuckets: IViewBucketInfo[], addTheseViewsToState: any, setProgress: any, markComplete: any ): Promise<IContentsViewInfo[]>{

    let contentsViews : IContentsViewInfo = null;

    //lists.getById(listGUID).views.orderBy("Title", true).get().then(function(result) {
    //let allViews : IContentsViewInfo[] = await thisWebInstance.views.get();

    let allViews : IContentsViewInfo[] = [];

    let thisWebInstance = null;
    let scope = '';
    let errMessage = '';

    try {
        if ( listGUID != '' ) {
            thisWebInstance = Web(webURL);
            allViews = await thisWebInstance.lists.getById(listGUID).views.orderBy("Title", true).get();
            scope = 'List';
    
        } else {
            errMessage = 'I don\'t have a list to get views!';
    
        }
    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }


    console.log('allAvailableViews allViews:' , allViews);

    for (let i in allViews ) {

        let idx = getViewSort(allViews[i], viewBuckets);

        allViews[i].sort = viewBuckets[idx]['sort'];
        allViews[i].bucketCategory = viewBuckets[idx]['bucketCategory'];
        allViews[i].bucketLabel = viewBuckets[idx]['bucketLabel'];
        allViews[i].bucketIdx = idx;       

        let vViewFields1 = getXMLObjectFromString(allViews[i].ListViewXml, "ViewFields", false);
        vViewFields1 = vViewFields1.replace(/[<][F][i][e][l][d][R][e][f][ ][N][a][m][e][=]["]/gi, ";");
        vViewFields1 = vViewFields1.replace(/["][ ][\/][>]/gi, "");

        vViewFields1 = vViewFields1.replace(/<ViewFields>/gi, "");
        vViewFields1 = vViewFields1.replace(/[\/][<][V][i][e][w][F][i][e][l][d][s][>]/gi, "");
        vViewFields1 = vViewFields1.replace(/<\/ViewFields>/gi, "");
        vViewFields1 = vViewFields1.replace(/[\]][\[]/gi, ";");

        allViews[i].ViewFields = vViewFields1.split(';');
        allViews[i].ViewFields =  allViews[i].ViewFields.filter(value => value.length !== 0);

        allViews[i].OrderBy = getXMLObjectFromString(allViews[i].ViewQuery, "OrderBy", false);
        allViews[i].GroupBy = getXMLObjectFromString(allViews[i].ViewQuery, "GroupBy", false);
        allViews[i].Where = getXMLObjectFromString(allViews[i].ViewQuery, "Where", false);
        allViews[i].Options = getXMLObjectFromString(allViews[i].ViewQuery, "QueryOptions", false);
        allViews[i].Joins = getXMLObjectFromString(allViews[i].ViewQuery, "ViewJoins", false);
        allViews[i].Query = allViews[i].ViewQuery;

        allViews[i].meta = buildMetaFromView(allViews[i]);
        allViews[i].searchString = buildSearchStringFromView(allViews[i]);

    }

    addTheseViewsToState(allViews, scope, errMessage);
    return allViews;

}

function getViewSort( theView: IContentsViewInfo, viewBuckets: IViewBucketInfo[] ) {
/*
    { fields: [], count: 0, sort : '0' , bucketCategory: 'Custom' , bucketLabel: '0. User Content'} ,
    { fields: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
    { fields: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
*/

    let bucketCategory = '';

    if ( theView.DefaultView === true) {
        bucketCategory = 'Default';

    } else if ( theView.PersonalView === true) {
        bucketCategory = 'Personal';

    } else { bucketCategory = 'Others'; }

    let idx : any = doesObjectExistInArray(viewBuckets, 'bucketCategory', bucketCategory ); 

    if ( idx === false ) { alert('getViewSort issue... bucketCategory (' + bucketCategory + ')not found in viewBuckets.'); idx = -1; }

    return idx;

}

/**
 * 
 * @param theView - Typical Object
 * Aggregations: null
AggregationsStatus: null
AssociatedContentTypeId: null
BaseViewId: "1"
CalendarViewStyles: null
ColumnWidth: null
ContentTypeId: {StringValue: "0x"}
CustomFormatter: ""
DefaultView: true
DefaultViewForContentType: false
EditorModified: false
Formats: null
GridLayout: null
Hidden: false
HtmlSchemaXml: "<View Name="{45DB0B75-0883-40F3-B9EF-A6C98557A191}" DefaultView="TRUE" MobileView="TRUE" MobileDefaultView="TRUE" Type="HTML" DisplayName="All Items" Url="/sites/Templates/Testing/Lists/1ListForDrillDown/AllItems.aspx" Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=47"><ViewFields><FieldRef Name="LinkTitle" /><FieldRef Name="SSChoice1" /><FieldRef Name="SSChoiceA" /><FieldRef Name="MSChoice2" /><FieldRef Name="MSChoiceB" /><FieldRef Name="StatusChoice" /></ViewFields><CustomFormatter /><Toolbar Type="Standard" /><XslLink Default="TRUE">main.xsl</XslLink><JSLink>clienttemplates.js</JSLink><RowLimit Paged="TRUE">30</RowLimit><Query><OrderBy><FieldRef Name="ID" /></OrderBy></Query><ParameterBindings><ParameterBinding Name="NoAnnouncements" Location="Resource(wss,noXinviewofY_LIST)" /><ParameterBinding Name="NoAnnouncementsHowTo" Location="Resource(wss,noXinviewofY_DEFAULT)" /></ParameterBindings></View>"
Id: "45db0b75-0883-40f3-b9ef-a6c98557a191"
ImageUrl: "/_layouts/15/images/generic.png?rev=47"
IncludeRootFolder: false
JSLink: "clienttemplates.js"
ListViewXml: "<View Name="{45DB0B75-0883-40F3-B9EF-A6C98557A191}" DefaultView="TRUE" MobileView="TRUE" MobileDefaultView="TRUE" Type="HTML" DisplayName="All Items" Url="/sites/Templates/Testing/Lists/1ListForDrillDown/AllItems.aspx" Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=47" ><Query><OrderBy><FieldRef Name="ID" /></OrderBy></Query><ViewFields><FieldRef Name="LinkTitle" /><FieldRef Name="SSChoice1" /><FieldRef Name="SSChoiceA" /><FieldRef Name="MSChoice2" /><FieldRef Name="MSChoiceB" /><FieldRef Name="StatusChoice" /></ViewFields><RowLimit Paged="TRUE">30</RowLimit><JSLink>clienttemplates.js</JSLink><XslLink Default="TRUE">main.xsl</XslLink><CustomFormatter /><Toolbar Type="Standard"/></View>"
Method: null
MobileDefaultView: true
MobileView: true
ModerationType: null
NewDocumentTemplates: null
OrderedView: false
Paged: true
PersonalView: false
ReadOnlyView: false
RequiresClientIntegration: false
RowLimit: 30
Scope: 0
ServerRelativePath: {DecodedUrl: "/sites/Templates/Testing/Lists/1ListForDrillDown/AllItems.aspx"}
ServerRelativeUrl: "/sites/Templates/Testing/Lists/1ListForDrillDown/AllItems.aspx"
StyleId: null
TabularView: true
Threaded: false
Title: "All Items"
Toolbar: ""
ToolbarTemplateName: null
ViewData: null
ViewJoins: null
ViewProjectedFields: null
ViewQuery: "<OrderBy><FieldRef Name="ID" /></OrderBy>"
ViewType: "HTML"
ViewType2: null
VisualizationInfo: null
odata.editLink: "Web/Lists(guid'9f4f690c-47f4-4900-bd2f-2b89237adbd5')/Views(guid'45db0b75-0883-40f3-b9ef-a6c98557a191')"
odata.id: "https://mcclickster.sharepoint.com/sites/Templates/Testing/_api/Web/Lists(guid'9f4f690c-47f4-4900-bd2f-2b89237adbd5')/Views(guid'45db0b75-0883-40f3-b9ef-a6c98557a191')"
odata.type: "SP.View"
 */
function buildMetaFromView( theView: IContentsViewInfo ) {
    let meta: string[] = [];

    meta = addItemToArrayIfItDoesNotExist(meta, theView.CanBeDeleted !== true && !theView.Hidden ? pivCats.visible.title: '');

    let getTypeIndex = doesObjectExistInArray( myFieldDefs, 'type', theView['odata.type']);

    if ( !getTypeIndex ) {
        meta = addItemToArrayIfItDoesNotExist(meta, 'Unk' );

    } else {
        let typeIndex : string = !getTypeIndex ? 'NotFoundAnywhere' :  getTypeIndex;
        let fieldType = myFieldDefs[typeIndex].label;
        meta = addItemToArrayIfItDoesNotExist(meta, fieldType );

    }

    meta = addItemToArrayIfItDoesNotExist(meta, theView.Hidden ? pivCats.hidden.title: pivCats.visible.title);
 
    meta = addItemToArrayIfItDoesNotExist(meta, theView.ViewFields ? pivCats.fields.title: '');

    //2020-10-23:  Added this check for Task Lists with Gantt Views... there is no view Query.
    meta = addItemToArrayIfItDoesNotExist(meta, theView.ViewQuery && theView.ViewQuery.indexOf('ViewJoins') ? pivCats.joins.title: '');

    meta = addItemToArrayIfItDoesNotExist(meta, theView.OrderBy != '' ? pivCats.orderBy.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theView.GroupBy != '' ? pivCats.groupBy.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theView.ViewQuery ? pivCats.query.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theView.Where != '' ? pivCats.where.title: '');
    meta = addItemToArrayIfItDoesNotExist(meta, theView.Aggregations ? pivCats.aggregations.title: '');

    meta = addItemToArrayIfItDoesNotExist(meta, theView.TabularView ? 'TabularView' : 'NoTabs');
 
    meta = addItemToArrayIfItDoesNotExist(meta, theView.ReadOnlyView ? 'ReadOnly' : '');
    meta = addItemToArrayIfItDoesNotExist(meta, theView.PersonalView ? 'Personal' : '');
    meta = addItemToArrayIfItDoesNotExist(meta, theView.Paged ? 'Paged' : '');

    meta = addItemToArrayIfItDoesNotExist(meta, theView.MobileDefaultView ? 'MobileDefaultView' : '');
    meta = addItemToArrayIfItDoesNotExist(meta, theView.MobileView ? 'MobileView' : '');
    meta = addItemToArrayIfItDoesNotExist(meta, theView.Formats != null ? 'Formats' : '');

    meta = addItemToArrayIfItDoesNotExist(meta, theView.DefaultView != null ? 'DefaultView' : '');
    

    

    //Add hidden to meta
    meta = addItemToArrayIfItDoesNotExist(meta, theView.sort );
    meta = addItemToArrayIfItDoesNotExist(meta, theView.bucketLabel );

    return meta;
}

function createViewItem( responseView: any) {

//let theView : IContentsViewInfo = {


//}

//return theView;

}
function buildSearchStringFromView (theView : IContentsViewInfo) {

    let result = '';
    let delim = '|||';

    if ( theView.Title ) { result += 'Title=' + theView.Title + delim ; }
    if ( theView.Id ) { result += 'Id=' + theView.Id + delim ; }

    if ( theView['odata.type'] ) { result += theView['odata.type'] + delim ; }

    if ( theView.meta.length > 0 ) { result += 'Meta=' + theView.meta.join(',') + delim ; }

    if ( theView.ViewFields.length > 0 ) { result += 'ViewFields=' + theView.ViewFields.join(',') + delim ; }
    
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


