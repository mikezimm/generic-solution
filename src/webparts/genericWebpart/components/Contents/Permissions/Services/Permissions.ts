import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PageContext } from '@microsoft/sp-page-context';
import { mergeAriaAttributeValues, IconNames } from "office-ui-fabric-react";


/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */


 import "@pnp/sp/sharing";
 import "@pnp/sp/folders";
 import { ISharingInformation } from "@pnp/sp/sharing";

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
import { doesObjectExistInArrayInt, } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
import { sortObjectArrayByNumberKey } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';
import { getSiteAdmins } from '@mikezimm/npmfunctions/dist/Services/Users/userServices';   //groupUsers = await getSiteAdmins( webURL, false);
import { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { getPrincipalTypeString } from '@mikezimm/npmfunctions/dist/Services/Users/userServices';


/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      .d8888. d88888b d8888b. db    db d888888b  .o88b. d88888b .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88'  YP 88'     88  `8D 88    88   `88'   d8P  Y8 88'     88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         `8bo.   88ooooo 88oobY' Y8    8P    88    8P      88ooooo `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88           `Y8b. 88~~~~~ 88`8b   `8b  d8'    88    8b      88~~~~~   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         db   8D 88.     88 `88.  `8bd8'    .88.   Y8b  d8 88.     db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         `8888Y' Y88888P 88   YD    YP    Y888888P  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */

import { getSharedFiles } from './Sharing';

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      db   db d88888b db      d8888b. d88888b d8888b. .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88   88 88'     88      88  `8D 88'     88  `8D 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88ooo88 88ooooo 88      88oodD' 88ooooo 88oobY' `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88~~~88 88~~~~~ 88      88~~~   88~~~~~ 88`8b     `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88   88 88.     88booo. 88      88.     88 `88. db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P 88      Y88888P 88   YD `8888Y' 
 *                                                                                                                       
 *                                                                                                                       
 */

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
 *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
 *                                                                                                                                               
 *                                                                                                                                               
 */


/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */


 export const ListSystemGroup = 'Limited Access System Group For List';
 export const WebSystemGroup = 'Limited Access System Group For Web';

export function getFullURLFromRelative( relUrl : string ) {
    let newURL = relUrl;

    if ( relUrl.indexOf('/sites/') === 0 ) {
        let domain = window.location.href.substr( 0, window.location.href.indexOf('/sites/') );
        newURL = domain + relUrl;
        console.log( 'updated Url to: ', newURL ) ;

    } 

    return newURL;

}


//export async function provisionTestPage( makeThisPage:  IContentsGroupInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
    export async function allAvailableRoleAssignments( webURL: string, listTitle: string, myPermissions: IMyPermissions, addThesePermissionsToState: any, setProgress: any, ) {

        webURL = getFullURLFromRelative( webURL );

        let webOrList = listTitle && listTitle.length > 0 && listTitle.toLowerCase() !== 'web' ? 'list' : 'web';
        let thisWebInstance = null;

        // RoleAssignments are all the users/groups/entities who have permissions on the list
        let allRoleAssignments: IRoleAssignment[] = [];

        let errMessage = '';
        /**
         * get Group information based on Titles
         */
        setProgress( 0, 50, 'Getting ' + webOrList + ' roleAssignments' );
        try {

            thisWebInstance = Web(webURL);
            if ( webOrList === 'list' ) {
                let thisListObject = thisWebInstance.lists.getByTitle( listTitle );
                allRoleAssignments = await thisListObject.roleAssignments();
            } else {
                allRoleAssignments = await thisWebInstance.roleAssignments();
            }

        } catch (e) {
            errMessage = getHelpfullError(e, false, true);

        }

        console.log('allAvailableRoleAssignments:', allRoleAssignments);

        let indx = 0;
        let n = allRoleAssignments.length;
        /**
         * Fetch all users from groups
         */

        //Get all the ids so we can get their titles
        //sp.web.siteUsers.filter("Id eq 147 or Id eq 7"); ,+ Use this to get all the user Titles
        let idsToGet = [];
        let titlesToGet = [];

        allRoleAssignments.map( ( role, idx ) => {
            idsToGet.push( role.PrincipalId );
        });

        /**
         * Get site admins
         */

        let siteAdmins = await getSiteAdmins( webURL, false);

        /**
         * Get all user Titles
         */

        let theseUsers : IThisPermissionUser[] = [];
        if ( errMessage === '' && allRoleAssignments.length === 0 ) { 
            errMessage = 'This list does not have any permissions that you can see.';

        } else if ( idsToGet.length > 0 ) {

            let currentIdx = 0;

            /**
             * Get all User ID info from site (like Title etc...)
             */
            try {
                let userFilter = 'Id eq ' + idsToGet.join(' or Id eq ');
                theseUsers = await sp.web.siteGroups.filter( userFilter ).select("Id,Title,Description,PrincipalType,IsSiteAdmin,UserPrincipalName").get();  
                myPermissions.theseUsers = theseUsers;
            } catch (e) {
                errMessage = getHelpfullError(e, false, true);

            }

            //Try to get  users because the not all the principals are groups.
            if ( theseUsers.length < idsToGet.length ) {
                try {
                    let userFilter = 'Id eq ' + idsToGet.join(' or Id eq ');
                    theseUsers = theseUsers.concat(await sp.web.siteUsers.filter( userFilter ).select("Id,Title,Description,PrincipalType,IsSiteAdmin,UserPrincipalName").get());  
                    myPermissions.theseUsers = theseUsers;
                } catch (e) {
                    errMessage = getHelpfullError(e, false, true);
        
                }
            }

            //This just trims down the Limited Access Group Title to remove the Guid of the list or web.
            theseUsers.map( user => { 
                user.shortTitle = user.Title + '';
                if ( user.shortTitle.indexOf( ListSystemGroup ) === 0 ) { user.shortTitle = ListSystemGroup ; }
                else if ( user.shortTitle.indexOf( WebSystemGroup ) === 0 ) { user.shortTitle = WebSystemGroup ; }
                user.PrincipalText = user['odata.type'].replace('SP.','');
            });

            /**
             * Loop through all User IDs and get role Assignments by them
             */
            let allUserPermissions : IAllUserPermission[] = [];
            for (let i in idsToGet ) {
                let thisUser = idsToGet[i];
                let userPermissions: IUserPermissionLevel[] = [];

                try {
                    if ( webOrList === 'list' ) {
                        setProgress( i, idsToGet.length , 'Checking Id: ( ' + thisUser + ' ) - ' + i + ' of ' + idsToGet.length  );
                        userPermissions = await sp.web.lists.getByTitle( listTitle ).roleAssignments.getById( thisUser ).bindings.select("Name,Description").get();
                    } else {
                        setProgress( i, idsToGet.length , 'Checking Id: ( ' + thisUser + ' ) - ' + i + ' of ' + idsToGet.length  );
                        userPermissions = await sp.web.roleAssignments.getById( thisUser ).bindings.select("Name,Description").get(); 
                    }
                } catch (e) {
                    errMessage = getHelpfullError(e, false, true);

                }

                let userInfo: number = doesObjectExistInArrayInt( theseUsers, 'Id', thisUser, true );
                allUserPermissions.push({
                    userId: thisUser,
                    permissions: userPermissions,
                    userInfo: theseUsers[ userInfo ],
                    highPriority: -1,
                    allPriorities: [],
                    onlyLimited: null,
                });
            }
            
            setProgress( idsToGet.length, idsToGet.length , 'Finished  ' + idsToGet.length + ' of ' + idsToGet.length  );

            myPermissions.allUserPermissions = allUserPermissions;
        }

        myPermissions.isLoading = errMessage.length === 0 ? false : true ,
        myPermissions = createSortedPermissions( myPermissions );
        addThesePermissionsToState(myPermissions,  errMessage);
        console.log('myPermissions:', myPermissions );
        return { myPermissions };

    }

    export type IPermKnown = 'Exact' | 'Similar' | 'Unknown';

    export interface IUserPermissionLevel {
        Name: IPermName;  //example:  Full Control
        Description: string;  //example:  Has full control
        simple?: number;    //Added from pre-defined list of permis for priority
        medium?: number;    //Added from pre-defined list of permis for priority
        complex?: number;    //Added from pre-defined list of permis for priority
        color?: string;    //Added from pre-defined list of permis for priority
        common?: boolean;    //Added from pre-defined list of permis for priority
        teams?: boolean;     //Added from pre-defined list of permis for priority
        known?:  IPermKnown;     //Added from pre-defined list of permis for priority
    }



    export interface IThisPermissionUser {
        Id: number;
        Title: string;
        shortTitle: string;
        Description: string;
        PrincipalType: number;
        PrincipalText: string;
        IsSiteAdmin: boolean;
        UserPrincipalName: string;
    }

        
    export interface IThisPermissionDelta {
        Id: number;
        Title: string;
        shortTitle: string;
        Description: string;
        PrincipalType: number;
        PrincipalText: string;
        IsSiteAdmin: boolean;
        UserPrincipalName: string;
        parentHighPriority: number;
        parentPermissions: IUserPermissionLevel[];
        childHighPriority: number;
        childPermissions: IUserPermissionLevel[];
        direction: 'up' | 'down' | 'equal' ;
        dirIcon: 'ArrowUpRight8' | 'ArrowDownRight8' | 'CalculatorEqualTo' ;
        color: string;
    }

    export interface IAllUserPermission {
        userId: number;
        permissions: IUserPermissionLevel[];
        userInfo: IThisPermissionUser;
        highPriority: number;
        allPriorities: number[];
        onlyLimited: boolean;
        common?: boolean;  //Does user have any common permissions?
        known?: IPermKnown;  //Does user have any known permissions?
    }

    export interface IGroupedPermission {
        name: string;
        description: string;
        priority: number;
        users: IAllUserPermission[];
    }

    export interface IMyPermissions {
        idsToGet: number[];
        isLoading: boolean;
        errMessage: string;
        theseUsers: IThisPermissionUser[];
        allUserPermissions: IAllUserPermission[];
        sortedPermissions: IAllUserPermission[];
        groupedPermissions: IGroupedPermission[];
        limtedPermissions: boolean;
    }

    export type IPermName = 'Full Control' | 'Manage Hierarchy' | 'Design' | 'Edit' | 'Approve' |  'Contribute' | 'Read' | 'Restricted Read'  | 
         'View' |  'Limited Access' | 'Web-Only Limited Access' | 'Restricted Interfaces for Translation' | 'Unknown Permission' ;

    //Restricted Interfaces for Translation
    export interface IPerm {
        Name: IPermName;
        simple: number;
        medium: number;
        complex: number;
        color?: string;
        common: boolean;
        teams: boolean; //Typical for Teams
        known: IPermKnown;
    }

    export const PermNames : IPerm[] = [
        { Name: 'Full Control', simple: 3, medium: 4, complex: 5, common: true, teams: true, known: 'Exact' },
        { Name: 'Manage Hierarchy', simple: 3, medium: 4, complex: 5, common: false, teams: false, known: 'Exact' },
        { Name: 'Design',       simple: 3, medium: 3, complex: 4, common: true, teams: false, known: 'Exact' },
        { Name: 'Edit',         simple: 3, medium: 3, complex: 4, common: true, teams: true, known: 'Exact' },
        { Name: 'Approve',      simple: 3, medium: 3, complex: 3, common: true, teams: false, known: 'Exact' },
        { Name: 'Contribute',   simple: 2, medium: 2, complex: 2, common: true, teams: false, known: 'Exact' },
        // { Name: 'Restricted Read',         simple: 1, medium: 1, complex: 1, common: false, teams: false, known: 'Exact' },
        { Name: 'Read',         simple: 1, medium: 1, complex: 1, common: true, teams: true, known: 'Exact' },
        { Name: 'View',          simple: 1, medium: 1, complex: 1, common: false, teams: false, known: 'Exact' },
        { Name: 'Limited Access',   simple: 0, medium: 0, complex: 0, common: true, teams: false, known: 'Exact' },

        //Restricted Interfaces:  Give this on site when they only have list permissions so they can still get to the list UI
        //  https://social.technet.microsoft.com/Forums/ie/en-US/9a6f7e55-fc39-4c47-a23b-7d709233b86d/giving-list-permission-to-users-with-no-access-to-the-main-site?forum=sharepointgeneral
        //  https://sharepoint.stackexchange.com/a/223593

        { Name: 'Restricted Interfaces for Translation',   simple: 0, medium: 0, complex: 0, common: false, teams: false, known: 'Exact' },
        { Name: 'Web-Only Limited Access',   simple: 0, medium: 0, complex: 0, common: false, teams: false, known: 'Exact' },  //"Can only view the web when given permissions."  -- This is what you get when you share with specific person.

        //
    ];

    export const UnknownPerm : IPerm = {
        Name: 'Unknown Permission',   simple: 6, medium: 6, complex: 6, common: false, teams: false, known: 'Unknown'
    };


    export const PermPriorityStyles = [
        { color: '' }, //priority 0
        { color: 'green' }, //priority 1
        { color: 'brown' }, //priority 2
        { color: 'red', fontWeight: 700 }, //priority 3
        { color: 'blue', fontWeight: 700 }, //priority 4
        { color: 'purple', fontWeight: 700 }, //priority 5
    ];

    export interface IRoleAssignment {
        PrincipalId: number;
    }

    export function createSortedPermissions( myPermissions: IMyPermissions ) {
        let limtedPermissions = false;
        let complexity = 'complex';
        let sortedPermissions: IAllUserPermission[] = [];
        let groupedPermissions: IGroupedPermission[] = [];
        let allUserPermissions = myPermissions.allUserPermissions;
        // export interface IAllUserPermission {
        //     userId: number;
        //     permissions: any[];
        //     userInfo: IThisPermissionUser;
        //     highPriority: number;
        //     allPriorities: number[];
        // }

        //Loop through all users
        allUserPermissions.map( user => {
            //Loop through this user's permissions and get highest level
            let onlyLimited = true;
            let common = false;
            let known : IPermKnown = 'Unknown';
            user.permissions.map( userPerm => {
            //Add highest level to the user
                let thisPerm : IPerm = null;
                PermNames.map( permName => {
                    if ( permName.Name === userPerm.Name ) { 
                        thisPerm = JSON.parse(JSON.stringify(permName));
                     }
                });

                if ( thisPerm === null ) { //Check for similarly named permission levels.
                    PermNames.map( permName => {
                        if ( userPerm.Name.toLowerCase().indexOf(permName.Name.toLowerCase()) > -1 ) { 
                            thisPerm = JSON.parse(JSON.stringify(permName));
                            // thisPerm.Name = userPerm.Name;
                            thisPerm.common = false;
                            thisPerm.teams = false;
                            thisPerm.known = 'Similar';
                        }
                    });
                    if ( thisPerm === null ) { //Check for similarly named permission levels.
                        thisPerm = JSON.parse(JSON.stringify(UnknownPerm));
                        // thisPerm.Name = userPerm.Name;
                    }
                }
                if ( thisPerm[complexity] > user.highPriority ) { 
                    user.highPriority = thisPerm[complexity]; }

                user.allPriorities.push( thisPerm[complexity] );
                if ( userPerm.Name.toLowerCase().indexOf('limited') > -1 ) { 
                    limtedPermissions = true;
                } else { onlyLimited = false ; }

                //Add all thisPerm props to userPerm except Name
                Object.keys( thisPerm ).map( key => { 
                    if ( key !== 'Name' ) { userPerm[key] = thisPerm[key] ; }
                });
                if ( thisPerm.common === true ) { common = true; }

                if ( thisPerm.known === 'Exact' ) { known = 'Exact' ; }
                else if ( thisPerm.known === 'Similar' && known === 'Unknown' ) { known = 'Similar' ; }
            });
            user.onlyLimited = onlyLimited;
            user.known = known;
            user.common = common;
           //Push User info to Sorted Users group
           sortedPermissions.push( user );
        });

        sortedPermissions = sortObjectArrayByNumberKey( sortedPermissions, 'dec', 'highPriority');
        myPermissions.sortedPermissions = sortedPermissions;
        myPermissions.limtedPermissions = limtedPermissions;

        return myPermissions;
    }
    
    export interface IPermissionLists {
        idsToGet: string[];
        isLoading: boolean;
        errMessage: string;
        restFilter: string;
        selectString: string;
        titles: string[];
        lists: IPermissionList[];
    }

    //sp.web.lists.filter('HasUniqueRoleAssignments eq true and Hidden eq false').select("Title,Id,ItemCount,EntityTypeName,Hidden,BaseType,BaseTemplate,AllowContentTypes,LastItemModifiedDate,ForceCheckout,EnableVersioning,EnableMinorVersions,MajorVersionLimit,MajorWithMinorVersionsLimit,NoCrawl,Created").get()
    export interface IPermissionList {
        Title: string;
        Id: string;
        ItemCount: number;
        EntityTypeName: string;
        Hidden: boolean;
        BaseType: number;
        BaseTemplate: number;
        AllowContentTypes: boolean;
        LastItemModifiedDate: string;
        ForceCheckout: boolean;
        EnableVersioning: boolean;
        EnableMinorVersions: boolean;
        MajorVersionLimit: number;
        MajorWithMinorVersionsLimit: number;
        NoCrawl: boolean;
        Created: string;
    }

    export async function allWebLists( webURL: string, startPermissions: IPermissionLists, addTheseListsToState: any, setProgress: any, ) {

        webURL = getFullURLFromRelative( webURL );

        let permissions : IPermissionLists = JSON.parse(JSON.stringify( startPermissions ));
        let thisWebInstance = null;
        if ( permissions.restFilter === null || permissions.restFilter === '') {
            permissions.restFilter = 'HasUniqueRoleAssignments eq true and Hidden eq false';
        }
        if ( permissions.selectString === null || permissions.selectString === '') {
            permissions.selectString = 'Title,Id,ItemCount,EntityTypeName,Hidden,BaseType,BaseTemplate,AllowContentTypes,LastItemModifiedDate,ForceCheckout,EnableVersioning,EnableMinorVersions,MajorVersionLimit,MajorWithMinorVersionsLimit,NoCrawl,Created';
        }
        // RoleAssignments are all the users/groups/entities who have permissions on the list
        let allLists : IPermissionList[] = [];

        let errMessage = '';
        /**
         * get Group information based on Titles
         */
        try {
            allLists = await sp.web.lists.filter(permissions.restFilter).select(permissions.selectString).get();
        } catch (e) {
            errMessage = getHelpfullError(e, false, true);
        }

        permissions.isLoading = errMessage.length === 0 ? false : true ,
        permissions.lists = allLists;
        permissions.titles = allLists.map( list => { return list.Title ; });
        permissions.errMessage = errMessage;

        console.log('allLists (visible and unique perms)', allLists);

        addTheseListsToState(permissions,  errMessage);
        console.log('permissions:', permissions );
        return { permissions };

    }

    export function comparePermissions( webPermissions: IMyPermissions, myPermissions: IMyPermissions ) {
        let delta : IThisPermissionDelta[] = [];

        //Add web permissions to delta
        webPermissions.allUserPermissions.map( user =>{

            delta.push( createUserDelta( user, 'parent') );

        });

        myPermissions.allUserPermissions.map( user =>{
            let Id = user.userId;
            let parentIndex = doesObjectExistInArrayInt( delta, 'Id', Id, true );
            if ( parentIndex < 0 ) {
                //user was not on parent
                let newUser = createUserDelta( user, 'child');
                newUser.direction = 'up';
                newUser.dirIcon = 'ArrowUpRight8';
                delta.push( newUser );

                // direction: 'up' | 'down' | 'equal' ;
                // dirIcon: 'ArrowUpRight8' | 'ArrowDownRight8' | 'CalculatorEqualTo' ;

            } else {
                //User was on parent
                let thisUser = delta[parentIndex];
                thisUser.childHighPriority = user.highPriority;
                thisUser.childPermissions = user.permissions;

                if ( thisUser.childHighPriority > thisUser.parentHighPriority ) {
                    thisUser.direction = 'up';
                    thisUser.dirIcon = 'ArrowUpRight8';
                } else if ( thisUser.childHighPriority === thisUser.parentHighPriority ) {
                    thisUser.direction = 'equal';
                    thisUser.dirIcon = 'CalculatorEqualTo';
                } else {
                    thisUser.direction = 'down';
                    thisUser.dirIcon = 'ArrowDownRight8';
                }
            }

        });

        // console.log('webPermissionAllDetla', delta );
        return delta;
    }

    export function createUserDelta( user : IAllUserPermission, parentOrChild: 'parent' | 'child' ) {


        let delta : IThisPermissionDelta = {
            Id: user.userId,
            Title: user.userInfo.Title,
            shortTitle: user.userInfo.shortTitle,
            Description: user.userInfo.Description,
            PrincipalType: user.userInfo.PrincipalType,
            PrincipalText: user.userInfo.PrincipalText,
            IsSiteAdmin: user.userInfo.IsSiteAdmin,
            UserPrincipalName: user.userInfo.UserPrincipalName,
            parentHighPriority: parentOrChild === 'parent' ? user.highPriority : null,
            parentPermissions: parentOrChild === 'parent' ? user.permissions : [],
            childHighPriority: parentOrChild === 'child' ? user.highPriority : null,
            childPermissions: parentOrChild === 'child' ? user.permissions : [],
            direction: null,
            dirIcon: null,
            color: null,
        };

        return delta;
    }