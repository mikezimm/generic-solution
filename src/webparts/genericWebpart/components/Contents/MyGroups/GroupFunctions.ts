


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
import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PageContext } from '@microsoft/sp-page-context';
import { mergeAriaAttributeValues, IconNames } from "office-ui-fabric-react";

import { Panel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from 'office-ui-fabric-react/lib/Panel';

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
import { doesObjectExistInArray, } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
import { getSiteAdmins } from '@mikezimm/npmfunctions/dist/Services/Users/userServices';   //groupUsers = await getSiteAdmins( webURL, false);
import { getHelpfullErrorV2 } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

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
import { BaseErrorTrace } from '../../../../../services/BaseErrorTrace';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

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
 *                                                                   
 */
import { currentPermissions, sharedHistory, sharedDetails, IPermissionsPanel } from '../Permissions/IMyPermissionsState';

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


import { IGroupsProps } from './IMyGroupsProps';
import { IMyGroups, ISingleGroup, IMyGroupsState, SiteAdminGroupName, GuestsGroupName, GuestsIconName, SiteAdminIconName, } from './IMyGroupsState';

export function createStateGroupsPanel( groupNames: string[], visible: boolean ) {

    /** return null when not using groups vvvvvv */
    // set groups and groupsProps to empty arrays;
  
    let groups0:  IGroupsProps = {  // groupsProps: IGroupsProps[] ;
      title: groupNames[0],// string;
      description: '',// string;
      styles: '',// string;
      icon: '',// string;
      options: [],// string[];
    };
  
    let panel : IPermissionsPanel= {
      type: PanelType.medium,
      groups: [groupNames[0], SiteAdminGroupName],
      groupsProps: [groups0, buildGroupProps(SiteAdminGroupName)],
    };
  
    return panel;
  
  }

export function buildGroupProps( gName : string, description = '', styles = '', options = '' ) {
    let optionsArray : string[] = options !== '' ? JSON.parse(options) : null;
    let icon = null;
    if ( gName === SiteAdminGroupName && options === '' ) {
      optionsArray = [];
      icon = SiteAdminIconName;
    }
    if ( options.indexOf('iconName') > -1 ) {
      optionsArray.map( optObj => {
        if (optObj.indexOf('iconName=') === 0 ) { icon = optObj.substring( 9 ) ; }
      });
    }
    let result : IGroupsProps = {
      title: gName,
      description: description,
      styles: styles,
      options: optionsArray,
      icon: icon,
    };
    return result;
  }

//export async function provisionTestPage( makeThisPage:  IContentsGroupInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
    export async function allAvailableGroups( webURL: string, myGroups: IMyGroups, addTheseGroupsToState: any, setProgress: any, ) {

        let thisWebInstance = null;
        let thisGroupInfos = null;
    
        let newGroups : IMyGroups = myGroups;
        let allGroups : ISingleGroup[] = [];
        newGroups.counts = [];
        newGroups.titles = [];
        newGroups.Ids = [];
        newGroups.sortedIds = [];
        newGroups.sortedGroups = [];
        newGroups.isLoading = true;

        let errMessage = '';
        /**
         * get Group information based on Titles
         */
        try {
            //` and Title ne \'Style Library\'`
            let groupAdder = "\' or Title eq \'";
            let groupFilter = "Title eq \'" + myGroups.propTitles.join( groupAdder ) + "\'";

            thisWebInstance = Web(webURL);
            allGroups = await thisWebInstance.siteGroups.filter( groupFilter ).get();
    
            if ( myGroups.groupsShowAdmins === true && myGroups.propTitles.indexOf(SiteAdminGroupName) > -1 ) {
                //let siteAdmins = await getSiteAdmins( webURL, false);
                let adminGroup = createGroupObject( SiteAdminGroupName, 'Have ultimate permissions', -666, SiteAdminIconName );   
                allGroups.push( adminGroup );
            }

            
        } catch (e) {
            //
            let helpfulErrorEnd = [ webURL, '', null, null ].join('|');
            errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'GroupFunctions All Available Groups ~ 176', helpfulErrorEnd ].join('|') );
    
        }
    
        console.log('allAvailableGroups thisGroupInfos:' , allGroups);
    
        let indx = 0;
        let n = allGroups.length;
        let allUsers: IUser[] = [];
        let guestUsers: IUser[] = [];   

        /**
         * Fetch all users from groups
         */
        for (let i in allGroups ) {
    
    //        allGroups[i].timeCreated = makeSmallTimeObject(allGroups[i].Created);
            let thisGroup = allGroups[i];
            let groupUsers : any = null;
            
            if ( myGroups.groupsShowAdmins === true && thisGroup.Title === SiteAdminGroupName) {
                groupUsers = await getSiteAdmins( webURL, false);
                groupUsers.users.map( user => {
                    if ( user.Email === myGroups.currentUserEmail ) { newGroups.isSiteAdmin = true ; }
                });
            } else {
                groupUsers = await getUsersFromGroup( webURL, 'Name', thisGroup.Title );
            }

            if ( groupUsers.errMessage && groupUsers.errMessage.length > 0 ) {
                errMessage = errMessage.length > 0 ? errMessage += '\n' : errMessage;
                errMessage += groupUsers.errMessage;
                newGroups.counts.push( null );
                newGroups.titles.push( null );

            } else {
                let hasCurrentUser = false;

                let externalNameFilter = '.external';
                groupUsers.users.map( user => { 

                    if ( user.Id === newGroups.userId ) { hasCurrentUser = true; }
                    user.isGuest = false;

                    /**
                     * This series checks for external users.
                     */
                    if ( user.IsEmailAuthenticationGuestUser === true || user.IsShareByEmailGuestUser === true ) {
                        user.isGuest = true;
                    } else if ( user.LoginName  && user.LoginName.indexOf( externalNameFilter ) > -1 ) {
                        user.isGuest = true;
                    } else if ( user.Name  && user.Name.indexOf( externalNameFilter ) > -1 ) {
                        user.isGuest = true;
                    }

                    let userIndex : any = doesObjectExistInArray( allUsers, 'Id', user.Id );
                    if ( userIndex === false ) { 
                        allUsers.push( user ) ;
                        if ( user.isGuest ) {
                            guestUsers.push( user ) ;
                        }
                    }
                } ) ;
                
                let groupIndex : any = doesObjectExistInArray( newGroups.propProps, 'title', thisGroup.Title );

                thisGroup.users = groupUsers.users;
                thisGroup.uCount = groupUsers.users.length;
                thisGroup.hasCurrentUser = hasCurrentUser;
                thisGroup.groupProps = newGroups.propProps[ groupIndex ];
                newGroups.counts.push( groupUsers.users.length );
                newGroups.Ids.push(  thisGroup.Id );
                newGroups.titles.push( thisGroup.Title );
            }
        }

        if ( errMessage === '' && allGroups.length === 0 ) { 
            errMessage = 'This site/web does not have any subsites that you can see.';
        }

        if ( errMessage.length === 0 ) {
            newGroups.isLoading = false;
        }

        /**
         * resort titles back to original order because the response seems to be sorted by title if sort is not defined
         */

        let sortedTitles = [];
        newGroups.propTitles.map( title => {
            if ( newGroups.titles.indexOf( title ) > -1 ) { sortedTitles.push(title) ; }
        });

        // if ( myGroups.propTitles.indexOf( SiteAdminGroupName ) > -1 ) { sortedTitles.push( SiteAdminGroupName ) ; }
        
        sortedTitles.map( title => {
            allGroups.map( group => {
                if ( group.Title === title ) { 
                    newGroups.sortedIds.push ( group.Id ) ;
                    newGroups.sortedGroups.push ( group ) ;                
                }
            });
        });

        newGroups.titles = sortedTitles;
        
        /**
         * Alphabetical sort user arrays
         */
        allUsers.sort((a,b) => a['Title'].localeCompare(b['Title']));
        guestUsers.sort((a,b) => a['Title'].localeCompare(b['Title']));

        /**
         * Add Guest Tab and users if there are any
         */
        if ( myGroups.groupsShowGuests === true && guestUsers.length > 0 ) {
            let guestGroup = createGroupObject( GuestsGroupName, 'External users in these groups', -999, GuestsIconName );
            guestGroup.uCount = guestUsers.length;
            guestGroup.users = guestUsers;
            guestGroup.OwnerTitle = 'See group owners';
            allGroups.push( guestGroup );
            newGroups.sortedIds.push ( guestGroup.Id ) ;
            newGroups.sortedGroups.push ( guestGroup ) ;
            newGroups.propTitles.push( GuestsGroupName ) ;
            newGroups.titles.push( GuestsGroupName ) ;
            newGroups.Ids.push( guestGroup.Id ) ; 
            newGroups.counts.push( guestGroup.uCount ) ; 
        }

        newGroups.groups = allGroups;
        newGroups.allUsers = allUsers;
        newGroups.guestUsers = guestUsers;

        console.log('allAvailableGroups newGroups:' , newGroups);

        addTheseGroupsToState(newGroups,  errMessage);
        return { myGroups: newGroups, errMessage };
    
    }

    function createGroupObject( title: string, desc: string, Id: number, iconName: string ) {

        let groupProps : IGroupsProps = {
            title: title,
            description: desc,
            styles: null,
            options: [],
            icon: iconName,
          };

        let thisGroup : ISingleGroup = {
            users: [],
            Title: title,
            Description: desc,
            AllowMembersEditMembership: false,
            AllowRequestToJoinLeave: false,
            AutoAcceptRequestToJoinLeave: false,
            Id: Id,
            IsHiddenInUI: false,
            LoginName: null,
            OnlyAllowMembersViewMembership: false,
            OwnerTitle: title,
            PrincipalType: null,
            RequestToJoinLeaveEmailSetting: null,

            isLoading: null,
            uCount: 0,
            hasCurrentUser:  null,
            groupProps:  groupProps,

        };

        return thisGroup;

    }

    export async function getUsersFromGroup( webURL: string, titleOrId: 'Name' | 'Id' , thisGroup : string ) {

        let thisWebInstance = null;
        let users = [];
        let errMessage = '';
        try {
            thisWebInstance = Web(webURL);
            if ( titleOrId === 'Name' ) {
                try {
                    users = await thisWebInstance.siteGroups.getByName( thisGroup ).users();
                } catch (e) {
                    console.log('You may not have access to view members from this list: ', thisGroup );
                }
 
            } else {
                try {
                    users = await thisWebInstance.siteGroups.getById( thisGroup ).users();
                } catch (e) {
                    console.log('You may not have access to view members from this list: ', thisGroup );
                }
            }
        } catch (e) {
            let helpfulErrorEnd = [ webURL, thisGroup, null, null ].join('|');
            errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'Get Users from Groups ~ 375', helpfulErrorEnd ].join('|'));
        }
        return { users: users, errMessage: errMessage } ;

    }