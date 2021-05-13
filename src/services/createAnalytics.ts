import { sp } from '@pnp/sp';
import { Web, Items, } from '@pnp/sp/presets/all';

import { getHelpfullError } from  '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
import { getExpandColumns, getSelectColumns, IZBasicList, IPerformanceSettings, createFetchList, } from '@mikezimm/npmfunctions/dist/Lists/getFunctions';
import { sortObjectArrayByStringKey } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';

import { DefaultChildListTitle } from 'GenericWebpartWebPartStrings';

import * as strings from 'GenericWebpartWebPartStrings';

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

    let startTime = getTheCurrentTime();
    let listTitle = null;
    let zzzText1 = startTime.now;
    let zzzText2 = startTime.theTime;
    let zzzText3 = null;
    let zzzText4 = null;
    let zzzText5 = null;
    let zzzNumber4 = null;
    let zzzNumber5 = null;
    let siteGuid = '';
    let zzzText6 = '';
    let zzzText7 = '';

    let zzzRichText1 = ActionJSON ? JSON.stringify(ActionJSON) : null;

    if ( analyticsList === strings.analyticsListRails ) { //Rails Off
        listTitle = itemInfo1;
        let infos2 = itemInfo2.split('|');

        // value1: value1 ? value1 : '', //List Title
        // value2: value2 ? value2 : '', //Group Title
        // value3: value3 ? value3 : '', //Group ID
        // value4: '', //ParentGroupID

        // currentStep.value2, 
        // currentStep.current.order,
        // currentStep.value3, 
        // currentStep.value4, 
        // this.state.makeid, 

        zzzText3 = infos2[0];

        zzzText7 = infos2[1] ? parseInt(infos2[1]) < 10 ? '0' + infos2[1] : infos2[1] : null ; //stepOrder

        zzzNumber4 = infos2[2] ? parseInt( infos2[2] ) : null ;
        zzzNumber5 = infos2[3] ? parseInt( infos2[3] ) : null ;

        zzzText1 = infos2[4] ? infos2[4] : null ; //makeId

        zzzText4 = null;
        let tempSite = TargetSite.split('|');
        TargetSite = tempSite[0];
        siteGuid = tempSite[1] ? tempSite[1] : null;

        let tempTitle = saveTitle.split('|');
        zzzText6 = tempTitle[1] ? tempTitle[1] : null;//Get scope - site or list

    } else {
        zzzText3 = itemInfo1;
        zzzText4 = itemInfo2;

    }

    //console.log('saveAnalytics: ', theProps, theState);

    let web = Web(analyticsWeb);
    //alert(delta);
    //alert(getBrowser("Chrome",false));
    /*

    */

    if ( !SiteLink || SiteLink === '' ) {
        SiteLink = window.location.origin + window.location.pathname ;
        if ( SiteLink.toLowerCase().indexOf('/sitepages/') > 0 ) { SiteLink = SiteLink.toLowerCase().substring(0, SiteLink.indexOf('/sitepages/')  );  }
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
        'Url': TargetSite.indexOf('http') === 0 ? TargetSite : window.location.origin + TargetSite ,
        'Description': TargetSite.replace(window.location.origin,'') ,
    };

    let targetList = !TargetList ? null :{
        'Url': TargetList.indexOf('http') === 0 ? TargetList : window.location.origin + TargetList,
        'Description': TargetList.replace(window.location.origin,'').replace(webTitle,'').replace(webTitle.toLowerCase(),'').replace('/lists',''),
    };
    
    let PageURL = window.location.href;
    let PageTitle = PageURL;
    if ( PageTitle.indexOf('?') > 0 ) { PageTitle = PageTitle.substring(0, PageTitle.indexOf('?') ) ; }  //2021-05-10:  Removed -1 because page title was missing last character.
    let PageLink = {
        'Url': PageURL,
        'Description': PageTitle.substring(PageTitle.lastIndexOf("/") + 1) ,
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
            'zzzText1': zzzText1,      
            'zzzText2': zzzText2,
            'zzzText3': zzzText3,
            'zzzText4': zzzText4,
            'zzzText5': siteGuid,
            'zzzText6': zzzText6,
            'zzzText7': zzzText7,
            'SiteLink': siteLink,
            'SiteTitle': webTitle,
            'TargetSite': targetSite,
            'Result': result,
            'TargetList': targetList,
            'ListTitle': listTitle,
            'zzzRichText1': zzzRichText1 ,
            'zzzNumber4': zzzNumber4,
            'zzzNumber5': zzzNumber5,
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

interface SimpleLink {
    Url: string;
    Description: string;
    target?: string;
}

export interface IRailAnalytics {
    'Title': string;            // What was done:  ie:
    'PageLink': SimpleLink;     // Link to page
    'zzzText1': string;         // Set ID
    'zzzText2': string;         // Time Key
    'zzzText3': string;         // Value1:  Group Name
    'zzzText4': string;         // 
    'zzzText5': string;         // siteGuid
    'zzzText6': string;         // List or Site for assigning permissions
    'zzzText7': string;         // Sort Order
    'SiteLink': SimpleLink;     // 
    'SiteTitle': string;        // 
    'TargetSite': SimpleLink;   //
    'Result': string;           // Was success or error
    'TargetList': SimpleLink;   // 
    'ListTitle': string;        // 
    'zzzRichText1': string;     // Action JSON 
    'zzzNumber4': number;       // Group ID
    'zzzNumber5': number;       // Either RoleID for item or Parent Group ID
    'getParams': string;        // 
}

export async function fetchAnalytics( analyticsWeb: string, analyticsList: string, siteGuid: string ) {
    //Do nothing if either of these strings is blank
    if (!analyticsList) { return ; }
    if (!analyticsWeb) { return ; }

    let items: IRailAnalytics[] = [];

    let allColumns : any = [ 'Created','Modified','Author/Title','Id',
        'Title', 'zzzRichText1', 'zzzRichText2', 'getParams',
        'zzzNumber1', 'zzzNumber2', 'zzzNumber3', 'zzzNumber4', 'zzzNumber5',
        'zzzText1', 'zzzText2', 'zzzText3', 'zzzText4', 'zzzText5', 'zzzText6', 'zzzText7',
        'PageLink', 'SiteLink', 'SiteTitle', 'TargetSite', 'Result',
        'TargetList', 'ListTitle',
    ];

    let expColumns : any = getExpandColumns(allColumns);
    // let selColumns = getSelectColumns(allColumns);

    // let selectCols: string = "*";
    // let expandThese = "";

    // selColumns.length > 0 ? selectCols += "," + selColumns.join(",") : selectCols = selectCols;
    // if (expColumns.length > 0) { expandThese = expColumns.join(","); }


    try {
        let web = Web(analyticsWeb);
        let restFilter = "zzzText5 eq '" + siteGuid + "'";
        items = await web.lists.getByTitle(analyticsList).items.select(allColumns).expand(expColumns).filter( restFilter ).top(5000).orderBy('Id',false).get();

    } catch (e) {
        console.log('e',getHelpfullError(e, true,true) );

    }

    return items ;

}

export interface IArraySummaryGroup {
    key: string;
    items: any[];
    groupFilter: any;
}

export interface IArraySummary {
    keys: string[]; //Keys is just string array of all the group.key which can be used to build easy list of the keys.
    items: any[];
    groups: IArraySummaryGroup[];
    filteredGroups: IArraySummaryGroup[];
    filteredKeys: string[]; //Keys is just string array of all the group.key which can be used to build easy list of the keys.
}

export function groupArrayItemsByField( items: IRailAnalytics[], keys: string[], keyDelim: string, groupFilterKey: string, groupItemOrderKey: string, sort: 'asc' | 'dec', ) {

    let summary: IArraySummary = {
        keys: [],
        items: [],
        groups: [],
        filteredGroups: [],
        filteredKeys: [],
    };

    items.map( item=> {
        let thisKey = keys.map( key => { return item[key]; }).join( keyDelim );
        let thisKey2 = item[keys[0]];
        thisKey2 += keyDelim + item[keys[1]];

        let keyIndex = summary.keys.indexOf( thisKey );

        if ( keyIndex < 0 ) {
            summary.keys.push( thisKey );
            keyIndex = summary.keys.length -1 ;
            summary.groups.push( { key: thisKey, items: [], groupFilter: null } ) ;

            //Set the groupFilter which is intended to be an easy way to filter this group... 
            //For instance, the All items are pre-filtered by the site the item pertains to.
            //The groupFilter could be the list in that site which the items in the group have in common

            let filterKeys = groupFilterKey.split('.');
            if ( filterKeys.length === 1 ) { summary.groups[keyIndex].groupFilter = item[groupFilterKey]; }
            else { summary.groups[keyIndex].groupFilter = item[filterKeys[0]][filterKeys[1]]; }
        }
        
        summary.groups[keyIndex].items.push( item );

    });

    if ( groupItemOrderKey !== null && groupItemOrderKey !== undefined && groupItemOrderKey !== '' ) {
        summary.groups.map( group => {
            let okToSort = true;
            group.items.map( item => {
                if ( item[groupItemOrderKey] === null ) { okToSort = false; }
                else if ( item[groupItemOrderKey] === undefined ) { okToSort = false; }
            });
            if ( okToSort === true ) {
                let newItems = sortObjectArrayByStringKey( group.items, sort, groupItemOrderKey );
                group.items = newItems;
            } else {
                console.log( 'Unable to sort this group of items... one of the keyValues was not valid.', group );
            }

        });
    }

    summary.filteredGroups = summary.groups;
    summary.filteredKeys = summary.keys;
    console.log( 'History summary: ', summary );

    return summary;

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
