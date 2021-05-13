

import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";

import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsGroupInfo, IGroupBucketInfo } from  './groupsComponent';


import { doesObjectExistInArray, } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
import {  addItemToArrayIfItDoesNotExist } from '@mikezimm/npmfunctions/dist/Services/Arrays/manipulation';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { getPrincipalTypeString } from '@mikezimm/npmfunctions/dist/Services/Users/userServices';

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

    let thisWebInstance = null;
    let thisGroupInfos = null;

    let allGroups : IContentsGroupInfo[] = [];
    let scope = '';
    let errMessage = '';
    try {
        thisWebInstance = Web(webURL);
        allGroups = await thisWebInstance.siteGroups();

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
            const users = await thisWebInstance.siteGroups.getById(allGroups[i].Id).users();

          //setProgress(false, "C", i, n , 'darkgray', 'CalculatorSubtract', f.name, 'Adding fields to list (' + step +'): ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name , step + ' fieldsToDo ~ 102' );
            let label = (i + ' of ' + n + ' - Getting users for ' + allGroups[i].Title).substring( 0, 40 );
            let description = 'Fetching users';
            setProgress( false ,'V', indx, n, null, null, null, label, description );
//            console.log('Users for group: ' + allGroups[i].Id + ' - ' + allGroups[i].Title ,users );
            allGroups[i].users = users;
            allGroups[i].userCount = users.length;
            allGroups[i].userString = allGroups[i].users != null ? allGroups[i].users.map( u => { return u.Title ; }).join('; ') : '';

        }

        allGroups[i].typeString = getPrincipalTypeString( allGroups[i].PrincipalType );
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

    if ( theGroup.userCount === 0 ) { meta = addItemToArrayIfItDoesNotExist(meta, "Empty" ); }
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

    if ( newGroup.users != null && newGroup.users.length > 0 ) { result += 'User=' + newGroup.userString + delim ; }

    if ( newGroup['odata.type'] ) { result += newGroup['odata.type'] + delim ; }

    if ( newGroup.meta.length > 0 ) { result += 'Meta=' + newGroup.meta.join(',') + delim ; }

    result = result.toLowerCase();

    return result;

}



