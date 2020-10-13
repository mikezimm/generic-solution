import { Web, IList } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists,  } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime} from '../../../../../services/dateServices';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../../services/arrayServices';

import { encodeDecodeString } from '../../../../../services/stringServices';

import { getHelpfullError, } from '../../../../../services/ErrorHandler';

import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats, IListBucketInfo } from './listsComponent';

export type IValidTemplate = 100 | 101;



let SystemLists = ["WorkflowTasks", "Style Library",
"SitePages", "SiteAssets", "ReusableContent", "Pages", "SearchConfigList", "OData__catalogs/masterpage", "OData__catalogs/design",
"TeamSiteFooterQL1List", "TeamSiteFooterQL2List",
"SiteCollectionImages", "SiteCollectionDocuments", "FormServerTemplates", "Reports List", "PublishingImages",
"AEInspiredTilesItemsList", "AEInspiredTilesAssetsList", "PublishedFeedList", "Workflow TasksList", "AEGoalThermometerAssetsList", "AEMetroGridAssetsList", "AEMetroGridItemsList", "AEMetroGridPicLibList", "AESwipeGalleryAssetsList",
"AESwipeGalleryDefaultImagesList", "Workflows", "Workflow HistoryList", "OData__catalogs/fpdatasources", "IWConvertedForms", "Access Requests"
];

let TempSysLists = ["OurGroupsList", "OurTilesList", "TemplateHistoryList", "Template HistoryList",
"TemplateReferenceList", "AE KPI ListList", "PnpPanelList",
"SiteLaunchCheckListList", "EmailSettingsList", "YearView ConfigurationList", "SubscribeList","ProjectsList","TrackMyTimeList"
];

let TempContLists = ["ActionRegisterList", "AgendasList", "AutoOnBoardList", "BringOnBoardList", "BudgetDeptList", "BudgetFiles", "CalendarDocs", "CalendarList", "CustomerComplaints", "CustRequirements", "Deliverables", "DeskInstructions",
"Documents2", "Documents3", "Documents4", "Documents5", "Emails", "EventDocs", "EventsList", "FAQsList", "FinanceDocs2", "FinanceDocs3", "FinanceDocs4", "FinanceDocs5", "Itineraries", "LaunchThisSiteChecklistList", "ManufacturingRecords",
"Media", "OurForms", "OurOnBoardingList", "OurPNsList", "OurTasksList", "OurWiki", "PartTrackerList", "Performance", "PresentationLinksList", "Presentations", "ProcessProductionEquipment", "ProjectOverviewList", "QualityRecords",
"QualitySysReporting", "ReportFiles", "RequestsList", "RFQDocs2", "RFQDocs3", "RFQDocs4", "RFQDocs5", "SerialDocuments", "Shared Documents", "SiteLaunchCheckListList", "SuggestionsList", "TasksList", "TimelineList", "ToolTrackerList",
"TrainingRecords", "VehicleVolumesList", 
"Smile1List", "Smile2List", "Smile3List", "Smile4List", "Smile5List", "Smile6List", "Smile7List", "Smile8List", "Smile9List", "Smile10List", "Smile11List", "Smile12List", 
"Attachments00", "Attachments01", "Attachments02", "Attachments03", "Attachments04", "Attachments05", "Attachments06", "Attachments07", "Attachments08", "Attachments09",
"Attachments10", "Attachments11", "Attachments12", "LessonsLearned", "ReadAcrossList", "YokotensList",
"FilesYMCat","FilesYMCatU"
];

let entityMaps = [

    { name: 'ReusableContent' , url: 'ReusableContent/Content Preview.aspx' },
    { name: 'Style Library', url: 'Style Library' },
    { name: 'MicroFeed', url: '/Lists/PublishedFeed/' },
    { name: 'Long Running Operation Status', url: 'Long Running Operation Status' },
    { name: 'Notification Pages', url: 'Notification Pages' },
    { name: 'UserInfo', url: '_layouts/15/people.aspx' },
    { name: 'Reports List', url: 'Reports List' },
    { name: 'DeviceChannels', url: 'Device Channels' },
    { name: 'Cache Profiles', url: 'Cache Profiles' },
    { name: 'ProjectPolicyItemList', url: 'ProjectPolicyItemList' },
    { name: 'Quick Deploy Items', url: 'Quick Deploy Items' },
    { name: 'Relationships List', url: 'Relationships List' },
    { name: 'SharePointHomeCacheListList', url: 'SharePointHomeCacheList' },
    { name: 'PublishedLinks', url: 'PublishedLinks' },
    { name: 'Translation Packages', url: 'Translation Packages' },
    { name: 'Translation Status', url: 'Translation Status' },
    { name: 'TaxonomyHiddenListList', url: 'Lists/TaxonomyHiddenList' },
    { name: 'Variation Labels', url: 'Variation Labels' },
    { name: 'IWConvertedForms', url: 'IWConvertedForms' },
    { name: 'FormServerTemplates', url: 'FormServerTemplates' },
    { name: 'Access Requests', url: 'Access Requests/pendingreq.aspx?mbypass=1' },

    { name: 'ClientSideAssets', url: 'ClientSideAssets' },
    { name: 'ComponentManifestsList', url: 'Lists/ComponentManifests' },
    { name: 'ContentTypeSyncLogList', url: 'Lists/ContentTypeSyncLog' },
    { name: 'SiteCollectionAppCatalogsList', url: 'SiteCollectionAppCatalogsList' },
    { name: 'WebApiPermissionRequestsList', url: 'WebApiPermissionRequestsList' },
    { name: 'AppRequests', url: 'AppRequests' },
    { name: 'AgaveCatalog', url: 'AgaveCatalog' },
    { name: 'AppCatalog', url: 'AppCatalog' },
    { name: 'TenantWideExtensionsList', url: 'Lists/TaxonomyHiddenList' },
    { name: '_catalogs/appdata', url: '_catalogs/appdata' },
    { name: '_catalogs/appfiles', url: '_catalogs/appfiles' },
    { name: '_catalogs/lt', url: '_catalogs/lt' },
    { name: '_catalogs/MaintenanceLogs', url: '_catalogs/MaintenanceLogs' },
    { name: '_catalogs/solutions', url: '_catalogs/solutions' },
    { name: '_catalogs/theme', url: '_catalogs/theme' },
    { name: '_catalogs/wp', url: '_catalogs/wp' },
    { name: '', url: '' },
    { name: '', url: '' },
    { name: '', url: '' },
    { name: '', url: '' },
    { name: '', url: '' },
    { name: '', url: '' },
    { name: '', url: '' },
    { name: '', url: '' },
];

const EntityMapsNames = entityMaps.map( e => {
    return e.name;
});

//export async function provisionTestPage( makeThisPage:  IContentsListInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableLists( webURL: string, listBuckets: IListBucketInfo[], addTheseListsToState: any, setProgress: any, markComplete: any ): Promise<IContentsListInfo[]>{

    let contentsLists : IContentsLists = null;

    let thisWebInstance = null;
    let scope = '';
    let errMessage = '';

    try {
        thisWebInstance = Web(webURL);
        let allLists : IContentsListInfo[] = await thisWebInstance.lists.get();
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

        addTheseListsToState(allLists, '');
        return allLists;
    } catch (e) {
        errMessage = getHelpfullError(e, true, true);
        console.log('checkThisPage', errMessage);
        addTheseListsToState([], errMessage);
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


