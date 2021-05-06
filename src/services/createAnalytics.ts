import { sp } from '@pnp/sp';
import { Web, } from '@pnp/sp/presets/all';

import { getHelpfullError } from  '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

export function getBrowser(validTypes,changeSiteIcon){

    let thisBrowser = "";
    return thisBrowser;

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

/**
 * Be sure to update your analyticsList and analyticsWeb in en-us.js strings file
 * @param theProps 
 * @param theState 
 */
export function saveAnalytics (analyticsWeb, analyticsList, SiteLink, webTitle, saveTitle, TargetSite, TargetList, itemInfo1, itemInfo2, result, ActionJSON ) {

    //Do nothing if either of these strings is blank
    if (!analyticsList) { return ; }
    if (!analyticsWeb) { return ; }

    //console.log('saveAnalytics: ', theProps, theState);
    let startTime = getTheCurrentTime();
    let web = Web(analyticsWeb);
    //alert(delta);
    //alert(getBrowser("Chrome",false));
    /*

    */

    if ( !SiteLink || SiteLink === '' ) {
        SiteLink = window.location.origin + window.location.pathname ;
        if ( SiteLink.toLowerCase().indexOf('/sitePages/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.indexOf('/sitePages/')  );  }
        if ( SiteLink.toLowerCase().indexOf('/documents/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.indexOf('/documents/')  );  }
        if ( SiteLink.toLowerCase().indexOf('/siteassets/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.indexOf('/siteassets/')  );  }
        if ( SiteLink.toLowerCase().indexOf('/lists/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.indexOf('/lists/')  );  }  
        if ( SiteLink.toLowerCase().indexOf('/_layouts/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.indexOf('/_layouts/')  );  }       
    }

    if ( webTitle === '' || !webTitle ) {
        webTitle = SiteLink.substring(SiteLink.lastIndexOf("/") + 1);
    }

    let siteLink = {
        'Url': SiteLink && SiteLink.indexOf('http') === 0 ? SiteLink : window.location.origin + SiteLink,
        'Description': webTitle ,
    };
    
    let targetSite = !TargetSite ? null : {
        'Url': TargetSite.indexOf('http') === 0 ? TargetSite : window.location.origin + TargetSite,
        'Description': TargetSite.replace(window.location.origin,'') ,
    };

    let targetList = !TargetList ? null :{
        'Url': TargetList.indexOf('http') === 0 ? TargetList : window.location.origin + TargetList,
        'Description': TargetList.replace(window.location.origin,'').replace(webTitle,'').replace(webTitle.toLowerCase(),'').replace('/lists',''),
    };
    
    let PageURL = window.location.href;
    let PageTitle = PageURL;
    if ( PageTitle.indexOf('?') > 0 ) { PageTitle = PageTitle.substring(0, PageTitle.indexOf('?') -1 ) ; }
    let PageLink = {
        'Url': PageURL,
        'Description': PageTitle.substring(PageTitle.lastIndexOf("/") + 1),
    };
    
/*
    let ignoreKeys = [ 'pageContext', 'context', 'loadListItems', 'convertCategoryToIndex', 'WebpartElement', 'themeVariant', 'startTime' ];
    Object.keys(theProps).map( key => {
        if ( ignoreKeys.indexOf(key) < 0 ) { propsJSON[key] = theProps[key]; }
    });
*/

    web.lists.getByTitle(analyticsList).items.add({
        'Title': saveTitle,
        'PageLink': PageLink,
        'zzzText1': startTime.now,      
        'zzzText2': startTime.theTime,
        'zzzText3': itemInfo1,
        'zzzText4': itemInfo2,
        'SiteLink': siteLink,
        'SiteTitle': webTitle,
        'TargetSite': targetSite,
        'Result': result,
        'TargetList': targetList,
        'zzzRichText1': ActionJSON ? JSON.stringify(ActionJSON) : null ,
        'getParams': getUrlVars().join(' & '),
        }).then((response) => {
        //Reload the page
            //location.reload();
        }).catch((e) => {
        //Throw Error
            //alert(e);
            console.log('e',getHelpfullError(e, true,true) );
    });

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
