import { sp } from '@pnp/sp';
import { Web, Items, } from '@pnp/sp/presets/all';

import { getHelpfullError } from  '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
import { getExpandColumns, getSelectColumns, IZBasicList, IPerformanceSettings, createFetchList, } from '@mikezimm/npmfunctions/dist/Lists/getFunctions';
import { sortObjectArrayByStringKey } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';
import { IRailAnalytics } from '@mikezimm/npmfunctions/dist/Services/Arrays/grouping';
import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';

import * as strings from 'GenericWebpartWebPartStrings';

export function getBrowser(validTypes,changeSiteIcon){

    let thisBrowser = "";
    return thisBrowser;

}

export function amIOnThisWeb( webUrl: string ) {

    let result = false;
    let ImOnThisWeb = getWebUrlFromLink( null , 'abs' );
    webUrl = getWebUrlFromLink( webUrl , 'abs' );

    if ( ImOnThisWeb == webUrl ) {
        result = true;
    }

    return result;

}

function getWebUrlFromLink( SiteLink: string, absoluteOrRelative: 'abs' | 'rel' ) {

    if ( !SiteLink || SiteLink === '' ) {
        SiteLink = window.location.pathname ; }
    else { SiteLink = SiteLink + ''; }

    //Remove all search parameters first
    if ( SiteLink.toLowerCase().indexOf('?') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('?')  );  }

    if ( SiteLink.toLowerCase().indexOf('/sitepages/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/sitepages/')  );  }
    if ( SiteLink.toLowerCase().indexOf('/documents/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/documents/')  );  }
    if ( SiteLink.toLowerCase().indexOf('/siteassets/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/siteassets/')  );  }
    if ( SiteLink.toLowerCase().indexOf('/lists/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/lists/')  );  }
    if ( SiteLink.toLowerCase().indexOf('/_layouts/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/_layouts/')  );  }
    if ( SiteLink.toLowerCase().indexOf('/forms/') > 0 ) { 
        SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.toLowerCase().indexOf('/forms/') );  
        //Need to take up one more notch
        SiteLink = SiteLink.substr( 0, SiteLink.lastIndexOf('/') );
    }

    if ( absoluteOrRelative === 'abs' ) {
        if ( SiteLink.toLowerCase().indexOf('/sites/') === 0 ) { SiteLink = window.location.origin + SiteLink; } 

    } else if ( absoluteOrRelative === 'rel' ) {
        if ( SiteLink.toLowerCase().indexOf(window.location.origin) === 0 ) { SiteLink = SiteLink.substring( window.location.origin.length ); } 

    } else {
        alert('whoops.... unexpected paramter in getWebUrlFromLink: absoluteOrRelative = ' + absoluteOrRelative );
    }
    

    return SiteLink;

}

function getUrlVars() {
    let vars = {};
    if ( !location.search || location.search.length === 0 ) { return [] ; }
    vars = location.search
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((obj, pair) => {
      const [key, value] = pair.map(decodeURIComponent);
      return ({ ...obj, [key]: value }) ;
    }, {});
    let params = Object.keys(vars).map( k => { return k + '=' + vars[k] ; } );
    return params;
  }

  function getCurrentPageLink ( ) {
    let PageURL = window.location.href;
    let PageTitle = PageURL;
    if ( PageTitle.indexOf('?') > 0 ) { PageTitle = PageTitle.substring(0, PageTitle.indexOf('?') ) ; }  //2021-05-10:  Removed -1 because page title was missing last character.
    let PageLink = {
        'Url': PageURL,
        'Description': PageTitle.substring(PageTitle.lastIndexOf("/") + 1) ,
    };
    return PageLink;
  }

  function makeListLink ( TargetList: string , webTitle: string ) {
    let targetList = !TargetList ? null :{
        'Url': TargetList.indexOf('http') === 0 ? TargetList : window.location.origin + TargetList,
        'Description': TargetList.replace(window.location.origin,'').replace(webTitle,'').replace(webTitle.toLowerCase(),'').replace('/lists',''),
    };
    return targetList;

  }

  function makeSiteLink ( TargetSite: string, webTitle: string ) {

    let targetSite = !TargetSite ? null : {
        'Url':  TargetSite && TargetSite.indexOf('http') === 0 ? TargetSite : window.location.origin + TargetSite ,
        'Description': webTitle ? webTitle : TargetSite.replace(window.location.origin,'') ,
    };

    return targetSite;
  }

  function saveThisItem ( web: string, list: string, saveItem: any ) {

    let saveWeb = Web(web);
    saveWeb.lists.getByTitle( list ).items.add( saveItem ).then((response) => {

        }).catch((e) => {

            console.log('e',getHelpfullError(e, true,true) );
    });

  }

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

    saveThisItem( analyticsWeb, analyticsList, saveItem );

}

/**
 * Be sure to update your analyticsList and analyticsWeb in en-us.js strings file
 * @param theProps 
 * @param theState 
 */
export const AddTemplateSaveTitle = 'Add Template';
export const ProvisionListsSaveTitle = 'Provision Lists';
export function saveAnalytics (analyticsWeb, analyticsList, SiteLink, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, ActionJSON, Setting ) {

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

    console.log('saveAnalytics StringifyActionJson: ', ActionJSON );
    saveItem.zzzRichText1 = ActionJSON ? JSON.stringify(ActionJSON) : null;

    if ( analyticsList === strings.analyticsListRailsGroups || saveTitle === AddTemplateSaveTitle ) { //Rails Off
        saveItem.ListTitle = itemInfo1;
        let infos2 = itemInfo2.split('|');

        saveItem.zzzText3 = infos2[0];

        saveItem.zzzText7 = infos2[1] ? parseInt(infos2[1]) < 10 ? '0' + infos2[1] : infos2[1] : null ; //stepOrder

        saveItem.zzzNumber4 = infos2[2] ? parseInt( infos2[2] ) : null ;
        saveItem.zzzNumber5 = infos2[3] ? parseInt( infos2[3] ) : null ;

        saveItem.zzzText1 = infos2[4] ? infos2[4] : null ;
        saveItem.zzzText4 = infos2[5] ? infos2[5] : null;

        let tempSite = TargetSite.split('|');
        TargetSite = tempSite[0];
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
    
    saveItem.TargetSite = makeSiteLink( TargetSite, saveItem.SiteTitle );

    saveItem.TargetList = makeListLink( TargetList, webTitle );

    saveThisItem( analyticsWeb, analyticsList, saveItem );

}


export async function fetchAnalytics( analyticsWeb: string, analyticsList: string, WebID: string ) {
    //Do nothing if either of these strings is blank
    if (!analyticsList) { return ; }
    if (!analyticsWeb) { return ; }

    let items: IRailAnalytics[] = [];

    let allColumns : any = [ 'Created','Modified','Author/Title','Id',
        'Title', 'zzzRichText1', 'zzzRichText2', 'getParams',
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
        console.log('e',getHelpfullError(e, true,true) );

    }

    return items ;

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
