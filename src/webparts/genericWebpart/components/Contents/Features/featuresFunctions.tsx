

import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, IPrincipalInfo, PrincipalType, PrincipalSource, sp, IFeatures, Features } from "@pnp/sp/presets/all";

import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { IContentsFeatureInfo, IFeatureBucketInfo } from  './featuresComponent';

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime, getAge, getBestTimeDelta} from '../../../../../services/dateServices';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../../services/arrayServices';

import { getHelpfullError } from '../../../../../services/ErrorHandler';

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats } from './featuresComponent';

export const systemFeatures = ["Approvers","Designers" ,"Excel Services Viewers" ,"External Editors" ,
"External Readers" ,"Hierarchy Managers", "Quick Deploy Users", "Restricted Readers"];

//Courtesy of:  https://www.technologytobusiness.com/microsoft-sharepoint/sharepoint-web-feature-id-office-365

export const corpFeatures = [
    { name: "TrackMyTime7" ,  DefinitionId: "a0aaa00b-6a20-4543-8059-2bb990b56a96" },
    { name: "Generic Contents" ,  DefinitionId: "44f426eb-86a2-41d0-bf5d-3db469b93ab6" },
    { name: "Socialiis" ,  DefinitionId: "44f426eb-86a2-41d0-bf5d-3db469b93ab6" },

];

let webFeatures = [

{ name: "AccSvcAddAccessApp" ,  DefinitionId: "d2b9ec23-526b-42c5-87b6-852bd83e0364" },
{ name: "AnnouncementsList" ,  DefinitionId: "00bfea71-d1ce-42de-9c63-a44004ce0104" },
{ name: "BaseWeb" ,  DefinitionId: "99fe402e-89a0-45aa-9163-85342e865dc8" },
{ name: "BizAppsListTemplates" ,  DefinitionId: "065c78be-5231-477e-a972-14177cc5b3c7" },
{ name: "ca9903a1-97a3-4208-84cb-1c0f5fe7507f" ,  DefinitionId: "ca9903a1-97a3-4208-84cb-1c0f5fe7507f" },
{ name: "ContactsList" ,  DefinitionId: "00bfea71-7e6d-4186-9ba8-c047ac750105" },
{ name: "CustomList" ,  DefinitionId: "00bfea71-de22-43b2-a848-c05709900100" },
{ name: "DataConnectionLibrary" ,  DefinitionId: "00bfea71-dbd7-4f72-b8cb-da7ac0440130" },
{ name: "DataSourceLibrary" ,  DefinitionId: "00bfea71-f381-423d-b9d1-da7a54c50110" },
{ name: "dd0fb797-d2ba-4706-a31b-abc660aa65d3" ,  DefinitionId: "dd0fb797-d2ba-4706-a31b-abc660aa65d3" },
{ name: "DiscussionsList" ,  DefinitionId: "00bfea71-6a49-43fa-b535-d15c05500108" },
{ name: "DocumentLibrary" ,  DefinitionId: "00bfea71-e717-4e80-aa17-d0c71b360101" },
{ name: "DocumentRouting" ,  DefinitionId: "7ad5272a-2694-4349-953e-ea5ef290e97c" },
{ name: "EventsList" ,  DefinitionId: "00bfea71-ec85-4903-972d-ebe475780106" },
{ name: "ExternalList" ,  DefinitionId: "00bfea71-9549-43f8-b978-e47e54a10600" },
{ name: "fe736936-fb73-448f-81b7-18d77c93eaae" ,  DefinitionId: "fe736936-fb73-448f-81b7-18d77c93eaae" },
{ name: "FollowingContent" ,  DefinitionId: "a7a2793e-67cd-4dc1-9fd0-43f61581207a" },
{ name: "GanttTasksList" ,  DefinitionId: "00bfea71-513d-4ca0-96c2-6a47775c0119" },
{ name: "GettingStarted" ,  DefinitionId: "4aec7207-0d02-4f4f-aa07-b370199cd0c7" },


{ name: "GridList" ,  DefinitionId: "00bfea71-3a1d-41d3-a0ee-651d11570120" },
{ name: "GroupifyMenuButton" ,  DefinitionId: "5007df5b-1eea-49f8-9c02-5debc81ce3f2" },
{ name: "HierarchyTasksList" ,  DefinitionId: "f9ce21f8-f437-4f7e-8bc6-946378c850f0" },
{ name: "IPFSWebFeatures" ,  DefinitionId: "a0e5a010-1329-49d4-9e09-f280cdbed37d" },
{ name: "IssuesList" ,  DefinitionId: "00bfea71-5932-4f9c-ad71-1557e5751100" },
{ name: "LinksList" ,  DefinitionId: "00bfea71-2062-426c-90bf-714c59600103" },
{ name: "MaintenanceLogs" ,  DefinitionId: "8c6f9096-388d-4eed-96ff-698b3ec46fc4" },
{ name: "MBrowserRedirect" ,  DefinitionId: "d95c97f3-e528-4da2-ae9f-32b3535fbb59" },
{ name: "MobilityRedirect" ,  DefinitionId: "f41cc668-37e5-4743-b4a8-74d1db3fd8a4" },
{ name: "MySiteMicroBlog" ,  DefinitionId: "ea23650b-0340-4708-b465-441a41c37af7" },
{ name: "NewsPage" ,  DefinitionId: "b0d5ad7e-23bc-4545-98c6-de91686ba8bc" },
{ name: "NoCodeWorkflowLibrary" ,  DefinitionId: "00bfea71-f600-43f6-a895-40c0de7b0117" },
{ name: "PictureLibrary" ,  DefinitionId: "00bfea71-52d4-45b3-b544-b1c71b620109" },
{ name: "PremiumWeb" ,  DefinitionId: "0806d127-06e6-447a-980e-2e90b03101b8" },
{ name: "PromotedLinksList" ,  DefinitionId: "192efa95-e50c-475e-87ab-361cede5dd7f" },
{ name: "ReportListTemplate" ,  DefinitionId: "2510d73f-7109-4ccc-8a1c-314894deeb3a" },
{ name: "SiteFeed" ,  DefinitionId: "15a572c6-e545-4d32-897a-bab6f5846e18" },
{ name: "SiteFeedController" ,  DefinitionId: "5153156a-63af-4fac-b557-91bd8c315432" },
{ name: "SiteNotebook" ,  DefinitionId: "f151bb39-7c3b-414f-bb36-6bf18872052f" },
{ name: "SitePages" ,  DefinitionId: "b6917cb1-93a0-4b97-a84d-7cf49975d4ec" },
{ name: "SurveysList" ,  DefinitionId: "00bfea71-eb8a-40b1-80c7-506be7590102" },
{ name: "TaskListNewsFeed" ,  DefinitionId: "ff13819a-a9ac-46fb-8163-9d53357ef98d" },
{ name: "TasksList" ,  DefinitionId: "00bfea71-a83e-497e-9ba0-7a5c597d0107" },
{ name: "TeamCollab" ,  DefinitionId: "00bfea71-4ea5-48d4-a4ad-7ea5c011abe5" },


{ name: "WebPageLibrary" ,  DefinitionId: "00bfea71-c796-4402-9f2f-0eb9a6e71b18" },
{ name: "WikiPageHomePage" ,  DefinitionId: "00bfea71-d8fe-4fec-8dad-01c19a6e4053" },
{ name: "WorkflowHistoryList" ,  DefinitionId: "00bfea71-4ea5-48d4-a4ad-305cf7030140" },
{ name: "workflowProcessList" ,  DefinitionId: "00bfea71-2d77-4a75-9fca-76516689e21a" },
{ name: "WorkflowServiceStore" ,  DefinitionId: "2c63df2b-ceab-42c6-aeff-b3968162d4b1" },
{ name: "WorkflowTask" ,  DefinitionId: "57311b7a-9afd-4ff0-866e-9393ad6647b1" },
{ name: "XmlFormLibrary" ,  DefinitionId: "00bfea71-1e1d-4562-b56a-f05371bb0115" },

];


//export async function provisionTestPage( makeThisPage:  IContentsFeatureInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableFeatures( webURL: string, featureBuckets: IFeatureBucketInfo[], addTheseFeaturesToState: any, setProgress: any, markComplete: any ): Promise<IContentsFeatureInfo[]>{

    let contentsWebs : IContentsFeatureInfo = null;

    //lists.getById(listGUID).features.orderBy("Title", true).get().then(function(result) {
    //let allFeatures : IContentsFeatureInfo[] = await sp.web.features.get();

    let thisFeatureObject = null;
    let thisFeatureInfos = null;

    let allFeatures : IContentsFeatureInfo[] = [];
    let scope = '';
    let errMessage = '';
    try {
        thisFeatureObject = Web(webURL);
        allFeatures = await thisFeatureObject.select("DisplayName", "DefinitionId").features.get();

    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }

    console.log('allAvailableFeatures allFeatures:' , allFeatures);

    let thisIsNow = new Date().toLocaleString();
    let indx = 0;
    let n = allFeatures.length;

    for (let i in allFeatures ) {

        indx ++;
        let idx = getFeatureSort(allFeatures[i], featureBuckets);

        const thisFeature = await thisFeatureObject.features.getById(allFeatures[i].DefinitionId);
        console.log('allAvailableFeatures thisFeature:' , thisFeature);



        //allFeatures[i].typeString = getFeatureTypeString( allFeatures[i].PrincipalType );
        allFeatures[i].sort = featureBuckets[idx]['sort'];
        allFeatures[i].bucketCategory = featureBuckets[idx]['bucketCategory'];
        allFeatures[i].bucketLabel = featureBuckets[idx]['bucketLabel'];
        allFeatures[i].bucketIdx = idx;
        let featIdx = doesObjectExistInArray(webFeatures, 'DefinitionId', allFeatures[i].DefinitionId);

        if (featIdx == false ) {
            featIdx = doesObjectExistInArray(corpFeatures, 'DefinitionId', allFeatures[i].DefinitionId);
        }

        // Had this error:  Objects are not valid as a React child (found: object with keys {name, DefinitionId}). If you meant to render a collection of children, use an array instead.
        // When I had this code:  allFeatures[i].name = featIdx ? webFeatures[featIdx] : 'Unknown';
        // Basically I was trying to make a string type an object.
        // This also came up when I was trying to put a json object on the page so I used JSON.stringify(obj) first!

        allFeatures[i].name = featIdx ? webFeatures[featIdx].name : 'Unknown';
        allFeatures[i].meta = buildMetaFromFeature(allFeatures[i]);
        allFeatures[i].searchString = buildSearchStringFromFeature(allFeatures[i]);

    }

    setProgress(true,'V', n, n, null, null, null, null, null );

    if ( errMessage === '' && allFeatures.length === 0 ) { 
        errMessage = 'This site/web does not have any subsites that you can see.';
     }
    addTheseFeaturesToState(allFeatures, scope, errMessage);
    return allFeatures;

}

function getFeatureTypeString( type: PrincipalType ) {
    if ( type === 0 ) { return 'None'; }
    if ( type === 1 ) { return 'User'; }
    if ( type === 2 ) { return 'Distribution'; }
    if ( type === 4 ) { return 'Security'; }
    if ( type === 8 ) { return 'SharePoint'; }
    if ( type === 15 ) { return 'All'; }
}

function getFeatureSort( theFeature: IContentsFeatureInfo, featureBuckets: IFeatureBucketInfo[] ) {
/*
    { features: [], count: 0, sort : '0' , bucketCategory: 'Custom' , bucketLabel: '0. User Content'} ,
    { features: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
    { features: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
*/

    let bucketCategory = 'All';

    /*
    } else if ( SystemWebs.indexOf(theFeature.StaticName) > -1 ) {
        bucketCategory = 'System';

    } else if ( theFeature.CanBeDeleted === false ) {
        bucketCategory = 'System';

    } else if ( theFeature.ReadOnlyWeb === true ) {
        bucketCategory = 'ReadOnly';
        
    } else { bucketCategory = 'Custom'; }
*/

    let idx : any = doesObjectExistInArray(featureBuckets, 'bucketCategory', bucketCategory ); 

    if ( idx === false ) { alert('getFeatureSort issue... bucketCategory (' + bucketCategory + ')not found in featureBuckets.'); idx = -1; }

    return idx;

}

function buildMetaFromFeature( theFeature: IContentsFeatureInfo ) {
    let meta: string[] = ['All'];

    /*
    if ( theFeature.timeCreated.daysAgo === 0 ) { 
        meta = addItemToArrayIfItDoesNotExist(meta, 'New');
    } else {
        meta = theFeature.timeCreated.daysAgo < 180 ? addItemToArrayIfItDoesNotExist(meta, 'RecentlyCreated') : addItemToArrayIfItDoesNotExist(meta, 'Old');
    }
*/

    meta = addItemToArrayIfItDoesNotExist(meta, theFeature.sort );
    meta = addItemToArrayIfItDoesNotExist(meta, theFeature.bucketLabel );

    return meta;
}

function createWebItem( responseWeb: any) {

//let newFeature : IContentsFeatureInfo = {


//}

//return newFeature;

}

function buildSearchStringFromFeature (newFeature : IContentsFeatureInfo) {

    let result = '';
    let delim = '|||';


    if ( newFeature.name ) { result += 'Name=' + newFeature.name + delim ; }

    if ( newFeature.DefinitionId ) { result += 'Id=' + newFeature.DefinitionId + delim ; }
    /*
    if ( newFeature.Description != null ) { result += 'Description=' + newFeature.Description + delim ; }

    if ( newFeature.OwnerTitle != null ) { result += 'Owner=' + newFeature.OwnerTitle + delim ; }

    if ( newFeature.users != null && newFeature.users.length > 0 ) { result += 'User=' + newFeature.userString + delim ; }

    if ( newFeature['odata.type'] ) { result += newFeature['odata.type'] + delim ; }

    if ( newFeature.meta.length > 0 ) { result += 'Meta=' + newFeature.meta.join(',') + delim ; }
*/
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


