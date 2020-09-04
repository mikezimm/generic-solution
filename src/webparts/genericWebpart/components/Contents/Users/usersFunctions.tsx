
import * as React from 'react';

import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource, SiteUsers, SiteUser, } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";

import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { IContentsUserInfo, IUserBucketInfo } from  './usersComponent';

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime, getAge, getBestTimeDelta} from '../../../../../services/dateServices';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../../services/arrayServices';

import { getHelpfullError } from '../../../../../services/ErrorHandler';

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { pivCats } from './usersComponent';

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import stylesL from '../listView.module.scss';

import { getPrincipalTypeString } from '../Groups/groupsFunctions';

export const systemGroups = ["Approvers","Designers" ,"Excel Services Viewers" ,"External Editors" ,
"External Readers" ,"Hierarchy Managers", "Quick Deploy Users", "Restricted Readers"];

/**
 * Only certain props can go in the root.  fontWeight is not allowed so I use class for those props.
 */

const rootSiteAdmin = { root: { paddingLeft: 7, color: "purple" ,   fontSize: 12}};
const rootUser      = { root: { paddingLeft: 7, color: ""                       }};
const rootNoID      = { root: { paddingLeft: 7, color: "red"                    }};
const rootGuest     = { root: { paddingLeft: 7, color: "pink",                  }};
const rootShare     = { root: { paddingLeft: 7, color: "orangered", fontSize: 16}};

const rootSecurity  = { root: { paddingLeft: 7, color: "darkblue"               }};
const rootAD        = { root: { paddingLeft: 7, color: "darkred"                }};
const rootTrusted   = { root: { paddingLeft: 7, color: "darkgreen" ,            }};

const rootOther     = { root: { paddingLeft: 7, color: "darkblue"  ,            }};
const rootOther2    = { root: { paddingLeft: 7, color: "red"       ,            }};

const rootHidden    = { root: { paddingLeft: 7, color: "red"       ,            }};


export const iconSiteAdmin = <Icon iconName={ "Settings"        } title={ 'SiteAdmin' }     className={ '' } styles = { rootSiteAdmin }/>;
export const iconUser =     <Icon iconName={ "UserFollowed"     } title={ 'User' }     className={ '' } styles = { rootUser }/>;
export const iconNoID =     <Icon iconName={ "BlockContact"     } title={ 'Has no ID' }     className={ '' } styles = { rootNoID }/>;
export const iconGuest =    <Icon iconName={ "ArrangeByFrom"    } title={ 'Authenticated Guest' }     className={ stylesL.isBold } styles = { rootGuest }/>;
export const iconShare =    <Icon iconName={ "MailForward"      } title={ 'Shared by Email' }     className={ '' } styles = { rootShare }/>;

export const iconSecurity = <Icon iconName={ "SecurityGroup"    } title={ 'Security Group' }     className={ '' } styles = { rootSecurity }/>;
export const iconAD =       <Icon iconName={ "OpenSource"       } title={ 'Active Directory' }     className={ stylesL.isBold } styles = { rootAD }/>;
export const iconTrusted =  <Icon iconName={ "Lock12"           } title={ 'Trusted ID' }     className={ stylesL.isBold } styles = { rootTrusted }/>;

export const iconOther =    <Icon iconName={ "Info"             } title={ 'Other' }     className={ stylesL.isBold } styles = { rootOther }/>;
export const iconOther2 =   <Icon iconName={ "InfoSolid"        } title={ 'Other 2' }     className={ stylesL.isBold } styles = { rootOther2 }/>;

export const iconHidden =   <Icon iconName={ "Hide3"            } title={ 'Hidden from UI' }     className={ stylesL.isBold } styles = { rootHidden }/>;

//export async function provisionTestPage( makeThisPage:  IContentsUserInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableUsers( webURL: string, showGroups: boolean, groupBuckets: IUserBucketInfo[], addTheseUsersToState: any, setProgress: any, markComplete: any ): Promise<IContentsUserInfo[]>{

    let thisWebInstance = null;

    let allUsers : IContentsUserInfo[] = [];
    let scope = '';
    let errMessage = '';

    try {
        thisWebInstance = Web(webURL);
        allUsers = await thisWebInstance.siteUsers();

    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }

    console.log('allAvailableUsers allUsers:' , allUsers);

    let thisIsNow = new Date().toLocaleString();
    let indx = 0;
    let n = allUsers.length;

    for (let i in allUsers ) {

        indx ++;
        let idx = getUserSort(allUsers[i], groupBuckets);

//        allUsers[i].timeCreated = makeSmallTimeObject(allUsers[i].Created);
        let thisUser = allUsers[i];
        if ( showGroups === true ) {
            const usersGroups = await thisWebInstance.siteUsers.getById(allUsers[i].Id).groups.get();

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
            let label = (i + ' of ' + n + ' - Getting usersGroups for ' + allUsers[i].Title).substring( 0, 40 );
            let description = 'Fetching usersGroups';
            setProgress( false ,'V', indx, n, null, null, null, label, description );
            //console.log('Users for group: ' + allUsers[i].Id + ' - ' + allUsers[i].Title ,usersGroups );
            allUsers[i].groups = usersGroups;
            allUsers[i].groupCount = usersGroups.length;
            allUsers[i].groupString = allUsers[i].groups != null ? allUsers[i].groups.map( u => { return u.Title ; }).join('; ') : '';

        }

        allUsers[i].fabricIcon = [];
        allUsers[i].typeString = getPrincipalTypeString( allUsers[i].PrincipalType );
        allUsers[i].sort = groupBuckets[idx]['sort'];
        allUsers[i].bucketCategory = groupBuckets[idx]['bucketCategory'];
        allUsers[i].bucketLabel = groupBuckets[idx]['bucketLabel'];
        allUsers[i].bucketIdx = idx;

        allUsers[i].meta = buildMetaFromUser(allUsers[i]);
        allUsers[i].searchString = buildSearchStringFromUser(allUsers[i]);

    }

    setProgress(true,'V', n, n, null, null, null, null, null );

    if ( errMessage === '' && allUsers.length === 0 ) { 
        errMessage = 'This site/web does not have any subsites that you can see.';
     }
    addTheseUsersToState(allUsers, scope, errMessage);
    return allUsers;

}

function getUserSort( theUser: IContentsUserInfo, groupBuckets: IUserBucketInfo[] ) {
/*
    { groups: [], count: 0, sort : '0' , bucketCategory: 'Custom' , bucketLabel: '0. User Content'} ,
    { groups: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
    { groups: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
*/

    let bucketCategory = 'All';

    /*
    } else if ( SystemWebs.indexOf(theUser.StaticName) > -1 ) {
        bucketCategory = 'System';

    } else if ( theUser.CanBeDeleted === false ) {
        bucketCategory = 'System';

    } else if ( theUser.ReadOnlyWeb === true ) {
        bucketCategory = 'ReadOnly';
        
    } else { bucketCategory = 'Custom'; }
*/

    let idx : any = doesObjectExistInArray(groupBuckets, 'bucketCategory', bucketCategory ); 

    if ( idx === false ) { alert('getUserSort issue... bucketCategory (' + bucketCategory + ')not found in groupBuckets.'); idx = -1; }

    return idx;

}

function buildMetaFromUser( theUser: IContentsUserInfo ) {
    let meta: string[] = ['All'];

    /*
    if ( theUser.timeCreated.daysAgo === 0 ) { 
        meta = addItemToArrayIfItDoesNotExist(meta, 'New');
    } else {
        meta = theUser.timeCreated.daysAgo < 180 ? addItemToArrayIfItDoesNotExist(meta, 'RecentlyCreated') : addItemToArrayIfItDoesNotExist(meta, 'Old');
    }
*/
    if ( systemGroups.indexOf( theUser.Title ) > -1 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, "System" );
    }
    if ( theUser.typeString != 'All' && theUser.typeString != 'None' ) {
        //
        if ( theUser.UserPrincipalName === null ) { //This is not a real group
            if ( theUser.typeString == 'Security' ) { 
                meta = addItemToArrayIfItDoesNotExist(meta, theUser.typeString );
                theUser.fabricIcon.push( iconSecurity );

            } else if ( theUser.UserId != null && theUser.UserId.NameIdIssuer.toLowerCase().indexOf('activedirectory') > -1 ) { 
                meta = addItemToArrayIfItDoesNotExist(meta, 'AD' );
                theUser.fabricIcon.push( iconAD );

            } else if ( theUser.UserId != null && theUser.UserId.NameIdIssuer.toLowerCase().indexOf('trusted') === 0 ) { 
                meta = addItemToArrayIfItDoesNotExist(meta, 'Trusted' );
                theUser.fabricIcon.push( iconTrusted );
            } else {
                meta = addItemToArrayIfItDoesNotExist(meta, 'Other' );
                theUser.fabricIcon.push( iconOther );
            }

        } else { //It might be a real group
            if ( theUser.UserId == null ) { 
                meta = addItemToArrayIfItDoesNotExist(meta, 'NoID' );
                theUser.fabricIcon.push( iconNoID ) ;
            } else {
                meta = addItemToArrayIfItDoesNotExist(meta, theUser.typeString );
                theUser.fabricIcon.push( iconUser ) ;
            }

        }

    }
    if ( theUser.Title.indexOf('Owners') > 0 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, "O" );

    } else if ( theUser.Title.indexOf('Members') > 0 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, "M" );

    } else if ( theUser.Title.indexOf('Visitors') > 0 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, "V" );

    } 

    if ( theUser.groupCount === 0 ) { meta = addItemToArrayIfItDoesNotExist(meta, "Empty" ); }
    meta = addItemToArrayIfItDoesNotExist(meta, theUser.sort );
    meta = addItemToArrayIfItDoesNotExist(meta, theUser.bucketLabel );
    //meta = theUser.OnlyAllowMembersViewMembership === true ?  addItemToArrayIfItDoesNotExist(meta, "NotVisible" ) :  addItemToArrayIfItDoesNotExist(meta, "Visible" ) ; 

    if ( theUser.IsHiddenInUI === true ) { 
        addItemToArrayIfItDoesNotExist(meta, "Hidden" ) ;
        theUser.fabricIcon.push( iconHidden ) ;
    }
    if ( theUser.IsEmailAuthenticationGuestUser === true ) { 
        addItemToArrayIfItDoesNotExist(meta, "Guest" ) ;
        theUser.fabricIcon.push( iconGuest );
    }
    if ( theUser.IsShareByEmailGuestUser === true ) { 
        addItemToArrayIfItDoesNotExist(meta, "Guest" ) ;
        addItemToArrayIfItDoesNotExist(meta, "Mail" ) ;
        theUser.fabricIcon.push( iconShare );
    }
    if ( theUser.IsSiteAdmin === true ) { 
        addItemToArrayIfItDoesNotExist(meta, "Admin" ) ;
        //theUser.fabricIcon = [ iconSiteAdmin ].concat( theUser.fabricIcon );
    }
    return meta;
}

function createWebItem( responseWeb: any) {

//let newUser : IContentsUserInfo = {


//}

//return newUser;

}

function buildSearchStringFromUser (newUser : IContentsUserInfo) {

    let result = '';
    let delim = '|||';

    if ( newUser.Title ) { result += 'Title=' + newUser.Title + delim ; }

    if ( newUser.Id ) { result += 'Id=' + newUser.Id + delim ; }

    //if ( newUser.Description != null ) { result += 'Description=' + newUser.Description + delim ; }

    //if ( newUser.OwnerTitle != null ) { result += 'Owner=' + newUser.OwnerTitle + delim ; }

    if ( newUser.groups != null && newUser.groups.length > 0 ) { result += 'User=' + newUser.groupString + delim ; }

    if ( newUser['odata.type'] ) { result += newUser['odata.type'] + delim ; }

    if ( newUser.meta.length > 0 ) { result += 'Meta=' + newUser.meta.join(',') + delim ; }

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


