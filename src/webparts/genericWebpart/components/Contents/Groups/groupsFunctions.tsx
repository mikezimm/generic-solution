

import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";

import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { IContentsGroupInfo, IGroupBucketInfo } from  './groupsComponent';

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime, getAge, getBestTimeDelta} from '../../../../../services/dateServices';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../../services/arrayServices';

import { getHelpfullError } from '../../../../../services/ErrorHandler';

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats } from './groupsComponent';

export type IValidTemplate = 'SITEPAGEPUBLISHING#0' | 'STS#3';
export type IValidWebTemplate2 = 64 | 68 ; //64 = Team; 68 = Communication


export const systemGroups = ["Approvers","Designers" ,"Excel Services Viewers" ,"External Editors" ,
"External Readers" ,"Hierarchy Managers", "Quick Deploy Users", "Restricted Readers"];

//export async function provisionTestPage( makeThisPage:  IContentsGroupInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableGroups( webURL: string, showUsers: boolean, groupBuckets: IGroupBucketInfo[], addTheseGroupsToState: any, setProgress: any, markComplete: any ): Promise<IContentsGroupInfo[]>{

    let contentsWebs : IContentsGroupInfo = null;

    //lists.getById(listGUID).groups.orderBy("Title", true).get().then(function(result) {
    //let allGroups : IContentsGroupInfo[] = await sp.web.groups.get();

    let thisGroupObject = null;
    let thisGroupInfos = null;

    let allGroups : IContentsGroupInfo[] = [];
    let scope = '';
    let errMessage = '';
    try {
        thisGroupObject = Web(webURL);
        allGroups = await thisGroupObject.siteGroups();

    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }

    console.log('allAvailableGroups thisGroupInfos:' , thisGroupInfos);

    let thisIsNow = new Date().toLocaleString();
    let indx = 0;
    let n = allGroups.length;

    for (let i in allGroups ) {

        indx ++;
        let idx = getGroupSort(allGroups[i], groupBuckets);

//        allGroups[i].timeCreated = makeSmallTimeObject(allGroups[i].Created);
        let thisGroup = allGroups[i];
        if ( showUsers === true ) {
            const users = await sp.web.siteGroups.getById(allGroups[i].Id).users();

        /**
            * 
            * @param progressHidden 
            * @param page : page you want to add this to 'E' | 'C' | 'V' | 'I'
            * @param current : current index of progress
            * @param ofThese : total count of items in progress
            * @param color : color of label like red, yellow, green, null
            * @param icon : Fabric Icon name if desired
            * @param logLabel : short label of item used for displaying in page
            * @param label : longer label used in Progress Indicator and hover card
            * @param description 
            */

          //setProgress(false, "C", i, n , 'darkgray', 'CalculatorSubtract', f.name, 'Adding fields to list (' + step +'): ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name , step + ' fieldsToDo ~ 102' );
            let label = i + ' of ' + n + ' - Getting users for ' + allGroups[i].Title;
            let description = 'Fetching users';
            setProgress( false ,'V', indx, n, null, null, null, label, description );
            console.log('Users for group: ' + allGroups[i].Id + ' - ' + allGroups[i].Title ,users );

        }

        allGroups[i].typeString = getGroupTypeString( allGroups[i].PrincipalType );
        allGroups[i].sort = groupBuckets[idx]['sort'];
        allGroups[i].bucketCategory = groupBuckets[idx]['bucketCategory'];
        allGroups[i].bucketLabel = groupBuckets[idx]['bucketLabel'];
        allGroups[i].bucketIdx = idx;

        allGroups[i].meta = buildMetaFromGroup(allGroups[i]);
        allGroups[i].searchString = buildSearchStringFromGroup(allGroups[i]);

    }

    setProgress(true,'V', n, n, null, null, null, null, null );

    if ( errMessage === '' && allGroups.length === 0 ) { 
        errMessage = 'This site/web does not have any subsites that you can see.';
     }
    addTheseGroupsToState(allGroups, scope, errMessage);
    return allGroups;

}

function getGroupTypeString( type: PrincipalType ) {
    if ( type === 0 ) { return 'None'; }
    if ( type === 1 ) { return 'User'; }
    if ( type === 2 ) { return 'Distribution'; }
    if ( type === 4 ) { return 'Security'; }
    if ( type === 8 ) { return 'SharePoint'; }
    if ( type === 15 ) { return 'All'; }
}

function getGroupSort( theGroup: IContentsGroupInfo, groupBuckets: IGroupBucketInfo[] ) {
/*
    { groups: [], count: 0, sort : '0' , bucketCategory: 'Custom' , bucketLabel: '0. User Content'} ,
    { groups: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
    { groups: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
*/

    let bucketCategory = 'All';

    /*
    } else if ( SystemWebs.indexOf(theGroup.StaticName) > -1 ) {
        bucketCategory = 'System';

    } else if ( theGroup.CanBeDeleted === false ) {
        bucketCategory = 'System';

    } else if ( theGroup.ReadOnlyWeb === true ) {
        bucketCategory = 'ReadOnly';
        
    } else { bucketCategory = 'Custom'; }
*/

    let idx : any = doesObjectExistInArray(groupBuckets, 'bucketCategory', bucketCategory ); 

    if ( idx === false ) { alert('getGroupSort issue... bucketCategory (' + bucketCategory + ')not found in groupBuckets.'); idx = -1; }

    return idx;

}

function buildMetaFromGroup( theGroup: IContentsGroupInfo ) {
    let meta: string[] = ['All'];

    /*
    if ( theGroup.timeCreated.daysAgo === 0 ) { 
        meta = addItemToArrayIfItDoesNotExist(meta, 'New');
    } else {
        meta = theGroup.timeCreated.daysAgo < 180 ? addItemToArrayIfItDoesNotExist(meta, 'RecentlyCreated') : addItemToArrayIfItDoesNotExist(meta, 'Old');
    }
*/
    if ( systemGroups.indexOf( theGroup.Title ) > -1 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, "System" );
    }
    if ( theGroup.typeString != 'All' && theGroup.typeString != 'None' ) {
        meta = addItemToArrayIfItDoesNotExist(meta, theGroup.typeString );
    }
    if ( theGroup.Title.indexOf('Owners') > 0 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, "O" );

    } else if ( theGroup.Title.indexOf('Members') > 0 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, "M" );

    } else if ( theGroup.Title.indexOf('Visitors') > 0 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, "V" );

    } 

    meta = addItemToArrayIfItDoesNotExist(meta, theGroup.sort );
    meta = addItemToArrayIfItDoesNotExist(meta, theGroup.bucketLabel );
    meta = theGroup.OnlyAllowMembersViewMembership === true ?  addItemToArrayIfItDoesNotExist(meta, "NotVisible" ) :  addItemToArrayIfItDoesNotExist(meta, "Visible" ) ; 
    if ( theGroup.IsHiddenInUI === true ) { addItemToArrayIfItDoesNotExist(meta, "Hidden" ) ; }
    return meta;
}

function createWebItem( responseWeb: any) {

//let newGroup : IContentsGroupInfo = {


//}

//return newGroup;

}

function buildSearchStringFromGroup (newGroup : IContentsGroupInfo) {

    let result = '';
    let delim = '|||';

    if ( newGroup.Title ) { result += 'Title=' + newGroup.Title + delim ; }

    if ( newGroup.Id ) { result += 'Id=' + newGroup.Id + delim ; }

    if ( newGroup.Description != null ) { result += 'Description=' + newGroup.Description + delim ; }

    if ( newGroup.OwnerTitle != null ) { result += 'Owner=' + newGroup.OwnerTitle + delim ; }

    if ( newGroup['odata.type'] ) { result += newGroup['odata.type'] + delim ; }

    if ( newGroup.meta.length > 0 ) { result += 'Meta=' + newGroup.meta.join(',') + delim ; }

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


