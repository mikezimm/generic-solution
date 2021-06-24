import { sp } from '@pnp/sp';
import { Web, Items, } from '@pnp/sp/presets/all';

import { getHelpfullErrorV2, saveThisLogItem } from  '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { getExpandColumns, getSelectColumns, IZBasicList, IPerformanceSettings, createFetchList, } from '@mikezimm/npmfunctions/dist/Lists/getFunctions';
import { sortObjectArrayByStringKey } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';
import { IRailAnalytics } from '@mikezimm/npmfunctions/dist/Services/Arrays/grouping';
import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';
import { makeSmallTimeObject } from '@mikezimm/npmfunctions/dist/Services/Time/smallTimeObject';

import { getBrowser, amIOnThisWeb, getWebUrlFromLink, getUrlVars,  } from '@mikezimm/npmfunctions/dist/Services/Logging/LogFunctions';
import { getCurrentPageLink, makeListLink, makeSiteLink, } from '@mikezimm/npmfunctions/dist/Services/Logging/LogFunctions';

import { BaseErrorTrace } from './BaseErrorTrace';

import * as strings from 'GenericWebpartWebPartStrings';

/**
 * Be sure to update your analyticsList and analyticsWeb in en-us.js strings file
 * @param theProps 
 * @param theState 
 */

export function saveListory (analyticsWeb, analyticsList, SiteLink, webTitle, saveTitle, TargetSite, TargetList, listory, fields, views, types, info, Setting ) {

    //Do nothing if either of these strings is blank
    if (!analyticsList) { return ; }
    if (!analyticsWeb) { return ; }

    
    let saveItem: any ={
        Title: saveTitle,
        PageLink: getCurrentPageLink(),
    };

    let startTime = getTheCurrentTime();
    saveItem.zzzText1 = startTime.now;
    saveItem.zzzText2 = startTime.theTime;

    saveItem.getParams = getUrlVars().join(' & ');
    saveItem.Setting = Setting;

    saveItem.zzzRichText1 = listory ? JSON.stringify(listory) : null;
    saveItem.zzzRichText2 = fields ? JSON.stringify(fields) : null;
    saveItem.zzzRichText3 = views ? JSON.stringify(views) : null;

    let tempSite = TargetSite.split('|');
    TargetSite = tempSite[0];
    saveItem.WebID = tempSite[1] ? tempSite[1] : null;
    saveItem.CollectionUrl = tempSite[2] ? tempSite[2] : null;
    saveItem.SiteID = tempSite[3] ? tempSite[3] : null;
    saveItem.zzzText5 = saveItem.SiteID;

    SiteLink = getWebUrlFromLink( SiteLink, 'abs' );

    if ( webTitle === '' || !webTitle ) {
        saveItem.SiteTitle = SiteLink.substring(SiteLink.lastIndexOf("/") + 1);
    }

    saveItem.SiteLink = {
        'Url': SiteLink && SiteLink.indexOf('http') === 0 ? SiteLink : window.location.origin + SiteLink,
        'Description': saveItem.SiteTitle ,
    };
    
    saveItem.TargetSite = makeSiteLink( TargetSite, saveItem.SiteTitle );

    saveItem.TargetList = makeListLink( TargetList, webTitle );

    saveItem.PageLink = getCurrentPageLink();

    saveThisLogItem( analyticsWeb, analyticsList, saveItem );

}

/**
 * Be sure to update your analyticsList and analyticsWeb in en-us.js strings file
 * @param theProps 
 * @param theState 
 */
export const ApplyTemplate_Rail_SaveTitle = 'Apply Template Rail';
export const ApplyTemplate_Page_SaveTitle = 'Apply Template Page';
export const ProvisionListsSaveTitle = 'Provision Lists';
export function saveAnalytics (analyticsWeb, analyticsList, SiteLink, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, RichTextJSON1, Setting, RichTextJSON2, RichTextJSON3 ) {

    //Do nothing if either of these strings is blank
    if (!analyticsList) { return ; }
    if (!analyticsWeb) { return ; }

    let saveItem: any ={
        Title: saveTitle,
        Result: result,
        PageLink: getCurrentPageLink(),
    };

    let startTime = getTheCurrentTime();
    saveItem.zzzText1 = startTime.now;
    saveItem.zzzText2 = startTime.theTime;

    saveItem.getParams = getUrlVars().join(' & ');
    saveItem.Setting = Setting;

    // console.log('saveAnalytics StringifyActionJson: ', RichTextJSON1, RichTextJSON2, RichTextJSON3 );
    saveItem.zzzRichText1 = RichTextJSON1 ? JSON.stringify(RichTextJSON1) : null;
    saveItem.zzzRichText2 = RichTextJSON2 ? JSON.stringify(RichTextJSON2) : null;
    saveItem.zzzRichText3 = RichTextJSON3 ? JSON.stringify(RichTextJSON3) : null;

    if ( analyticsList === strings.analyticsListRailsGroups || analyticsList === strings.analyticsListRailsApply ) { //Rails Off
        saveItem.ListTitle = itemInfo1;

        let infos2 = itemInfo2 ? itemInfo2.split('|') : [ ];

        saveItem.zzzText3 = infos2[0];

        saveItem.zzzText7 = infos2[1] ? parseInt(infos2[1]) < 10 ? '0' + infos2[1] : infos2[1] : null ; //stepOrder

        saveItem.zzzNumber4 = infos2[2] ? parseInt( infos2[2] ) : null ;
        saveItem.zzzNumber5 = infos2[3] ? parseInt( infos2[3] ) : null ;

        saveItem.zzzText1 = infos2[4] ? infos2[4] : null ;
        saveItem.zzzText4 = infos2[5] ? infos2[5] : null;

        let tempSite = TargetSite ? TargetSite.split('|') : [];
        TargetSite = tempSite[0] ? tempSite[0] : null;
        saveItem.WebID = tempSite[1] ? tempSite[1] : null;
        saveItem.CollectionUrl = tempSite[2] ? tempSite[2] : null;
        saveItem.SiteID = tempSite[3] ? tempSite[3] : null;
        saveItem.zzzText5 = saveItem.SiteID;


        let tempTitle = saveTitle.split('|');
        saveItem.zzzText6 = tempTitle[1] ? tempTitle[1] : null;//Get scope - site or list

    } else {
        saveItem.zzzText3 = itemInfo1;
        saveItem.zzzText4 = itemInfo2;

    }

    SiteLink = getWebUrlFromLink( SiteLink , 'abs');

    if ( webTitle === '' || !webTitle ) {
        saveItem.SiteTitle = SiteLink.substring(SiteLink.lastIndexOf("/") + 1);
    }

    saveItem.SiteLink = {
        'Url': SiteLink && SiteLink.indexOf('http') === 0 ? SiteLink : window.location.origin + SiteLink,
        'Description': saveItem.SiteTitle ,
    };
    
    saveItem.TargetSite = TargetSite ? makeSiteLink( TargetSite, saveItem.SiteTitle ) : null ;

    saveItem.TargetList = TargetList ? makeListLink( TargetList, webTitle ) : null;

    saveThisLogItem( analyticsWeb + '', analyticsList + '', saveItem );

}


export async function fetchAnalytics( analyticsWeb: string, analyticsList: string, WebID: string ) {
    //Do nothing if either of these strings is blank
    if (!analyticsList) { return ; }
    if (!analyticsWeb) { return ; }

    let items: IRailAnalytics[] = [];

    let allColumns : any = [ 'Created','Modified','Author/Name','Author/Id','Author/Title','Id',
        'Title', 'zzzRichText1', 'zzzRichText2', 'zzzRichText3', 'getParams',
        'zzzNumber1', 'zzzNumber2', 'zzzNumber3', 'zzzNumber4', 'zzzNumber5',
        'zzzText1', 'zzzText2', 'zzzText3', 'zzzText4', 'zzzText5', 'zzzText6', 'zzzText7',
        'PageLink', 'SiteLink', 'SiteTitle', 'TargetSite', 'Result',
        'TargetList', 'ListTitle', 'Setting','WebID','SiteID','CollectionUrl'
    ];

    let expColumns : any = getExpandColumns(allColumns);
    // let selColumns = getSelectColumns(allColumns);

    // let selectCols: string = "*";
    // let expandThese = "";

    // selColumns.length > 0 ? selectCols += "," + selColumns.join(",") : selectCols = selectCols;
    // if (expColumns.length > 0) { expandThese = expColumns.join(","); }

    analyticsWeb = getFullUrlFromSlashSitesUrl( analyticsWeb );
    try {
        let web = Web(analyticsWeb);
        let restFilter = "WebID eq '" + WebID + "'";
        items = await web.lists.getByTitle(analyticsList).items.select(allColumns).expand(expColumns).filter( restFilter ).top(5000).orderBy('Id',false).get();

    } catch (e) {
        console.log('e',getHelpfullErrorV2(e, true,true, [ BaseErrorTrace , 'Failed', 'Fetch Analytics', ].join('|') ) );

    }

    return items ;

}

/**
 * This function is for automatically creating a item in our Teams' request list in SharePoint.
 * Initially it's fired upon completing rail functions to auto-document support incidents.
 * 
 * So it's only going to execute in certain tenanats.
 * If you see this and want to re-purpose it, update the function to suit your needs and adjust the window.location.origin check
 * 
*/
export function saveAssist ( analyticsWeb, analyticsList, SiteLink, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2: string[], result, RichTextJSON1, Setting, RichTextJSON2, RichTextJSON3 ) {

    if ( window.location.origin.indexOf( 'utoliv.sharepoint.com') < 0 && window.location.origin.indexOf( 'clickster.sharepoint')  < 0 ) { return ; }

    if (!analyticsList) { return ; }
    if (!analyticsWeb) { return ; }

    SiteLink = getWebUrlFromLink( SiteLink, 'abs' );

    let location = makeListLink( TargetList, webTitle );

    let startTime = makeSmallTimeObject( null );
    let localTimeString = startTime.theTime;
    let StatusComments = RichTextJSON1 ? JSON.stringify(RichTextJSON1).replace('\"','') : null;
    let ScopeArray: string[] = itemInfo2;
    let saveItem: any ={
        Title: saveTitle,
        // PageLink: getCurrentPageLink(),
        Scope:  { results: ScopeArray },  //Need to add scope back in as multi-select choice.
        Status: '4. Completed',
        Complexity: '0 Automation',
        StatusComments: StatusComments,
        StartDate: localTimeString,
        EndDate: localTimeString,
        TargetCompleteDate: localTimeString,
        Location: location,
    };

    saveThisLogItem( analyticsWeb + '', analyticsList + '', saveItem );

}

export function saveAnalyticsX (theTime) {

    let analyticsList = "TilesCycleTesting";
    let currentTime = theTime;
    let web = Web('https://mcclickster.sharepoint.com/sites/Templates/SiteAudit/');

    web.lists.getByTitle(analyticsList).items.add({
        'Title': 'Pivot-Tiles x1asdf',
        'zzzText1': currentTime.now,      
        'zzzText2': currentTime.theTime,
        'zzzNumber1': currentTime.milliseconds,

        }).then((response) => {
        //Reload the page
            //location.reload();
        }).catch((e) => {
        //Throw Error
            alert(e);
    });


}

export function saveTheTime () {
    let theTime = getTheCurrentTime();
    saveAnalyticsX(theTime);

    return theTime;

}

export function getTheCurrentTime () {

    const now = new Date();
    const theTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds();
    let result : any = {
        'now': now,
        'theTime' : theTime,
        'milliseconds' : now.getMilliseconds(),
    };

    return result;

}
