
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

import { Web, IList, IItem, Item } from "@pnp/sp/presets/all";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import "@pnp/sp/site-users/web";


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

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist, sortKeysByOtherKey } from '@mikezimm/npmfunctions/dist/arrayServices';

import { makeTheTimeObject,  } from '@mikezimm/npmfunctions/dist/dateServices';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/ErrorHandler';

import { IPickedList, IPickedWebBasic, IMyPivots, IPivot,  ILink, IUser, IMyProgress, IMyIcons, IMyFonts, IChartSeries, 
    ICharNote, IRefinerRules, RefineRuleValues, ICustViewDef, IRefinerStat, ICSSChartTypes, QuickCommandsTMT, IZBasicItemInfo } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import { ensureUserInfo } from '@mikezimm/npmfunctions/dist/userServices';

import { getExpandColumns, getSelectColumns, IZBasicList, IPerformanceSettings, createFetchList, } from '@mikezimm/npmfunctions/dist/getFunctions';


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

import * as strings from 'GenericWebpartWebPartStrings';

import { ILocation } from './provisionPatternsComponent';

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

 export const NitroPages = [ 'CCSMSTeamsUtils', 'CCSBrandingSettings', 'CCSEditForm', 'CCSNewForm', 'CCSDisplayForm', '', '', '', ];

 export interface ISitePagesList extends IZBasicList {
    dropDownColumns: string[];
    dropDownSort: string[];
    location: ILocation;
  }



  export interface IPatternItemInfo extends IZBasicItemInfo {

    Title: string;
    Description: string;
    "File/ServerRelativeUrl": string;
    "File/Name": string;
    "BannerImageUrl.Url": string;
    allIndex: number;
    Features: string[];
    Topics: string[];

}

//   d888b  d88888b d888888b  .d8b.  db      db      d888888b d888888b d88888b .88b  d88. .d8888. 
//  88' Y8b 88'     `~~88~~' d8' `8b 88      88        `88'   `~~88~~' 88'     88'YbdP`88 88'  YP 
//  88      88ooooo    88    88ooo88 88      88         88       88    88ooooo 88  88  88 `8bo.   
//  88  ooo 88~~~~~    88    88~~~88 88      88         88       88    88~~~~~ 88  88  88   `Y8b. 
//  88. ~8~ 88.        88    88   88 88booo. 88booo.   .88.      88    88.     88  88  88 db   8D 
//   Y888P  Y88888P    YP    YP   YP Y88888P Y88888P Y888888P    YP    Y88888P YP  YP  YP `8888Y' 
//                                                                                                
//        


// This is what it was before I split off the other part
export async function getAllItems( sitePages: ISitePagesList, addTheseItemsToState: any, setProgress: any, markComplete: any ): Promise<void>{

    let allItems : IPatternItemInfo[] = [];
    let errMessage = '';

    let sourceUserInfo: any = null;
    try {
        sourceUserInfo = await ensureUserInfo( sitePages.webURL, sitePages.contextUserInfo.email );
    } catch (e) {
        errMessage = getHelpfullError(e, true, true);
    }


    sitePages.sourceUserInfo = sourceUserInfo;
    //lists.getById(listGUID).webs.orderBy("Title", true).get().then(function(result) {
    //let allItems : IPatternItemInfo[] = await sp.web.webs.get();

    let thisListWeb = Web(sitePages.webURL);
    let selColumns = sitePages.selectColumnsStr;
    let expandThese = sitePages.expandColumnsStr;
    let staticCols = sitePages.staticColumns.length > 0 ? sitePages.staticColumns.join(',') : '';
    let selectCols = sitePages.minDataDownload === true ?  staticCols :  '*,' + staticCols;

    let thisListObject = thisListWeb.lists.getByTitle(sitePages.title);

    /**
     * IN FUTURE, ALWAYS BE SURE TO PUT SELECT AND EXPAND AFTER .ITEMS !!!!!!
     */

    try {
        let fetchCount = sitePages.fetchCount > 0 ? sitePages.fetchCount : 200;
        if ( sitePages.restFilter.length > 1 ) {
            allItems = await thisListObject.items.select(selectCols).expand(expandThese).orderBy('ID',false).top(fetchCount).filter(sitePages.restFilter).get();
        } else {
            allItems = await thisListObject.items.select(selectCols).expand(expandThese).orderBy('ID',false).top(fetchCount).get();
        }
    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }

    /**
     * Add meta and searchString to every item
     */
    allItems.map( (i, index) => {
        //Add all date field objects
        sitePages.expandDates.map( d => {
            i['time' + d] = makeTheTimeObject(i[d]);
        });

        i.allIndex = index;
        //Add Meta tags
        
        if ( NitroPages.indexOf( i.Title) > -1 ) {
            i.Features = ['Crow Canyon'] ;
            if ( !i.Description || i.Description === '' ) { i.Description = 'Application page for Crow Canyon software' ; }
        }
        i.meta = buildMetaFromItem( i, sitePages );
        
        //Add Search string
        i.searchString = buildSearchStringFromItem( i, sitePages );
    });

    console.log('All Patternpages: ', allItems );
    //private addTheseItemsToState( sitePages: ISitePagesList, allItems , errMessage : string ) {
    addTheseItemsToState( sitePages, allItems, errMessage );

}







  
//  d8888b. db    db d888888b db      d8888b.      .88b  d88. d88888b d888888b  .d8b.  
//  88  `8D 88    88   `88'   88      88  `8D      88'YbdP`88 88'     `~~88~~' d8' `8b 
//  88oooY' 88    88    88    88      88   88      88  88  88 88ooooo    88    88ooo88 
//  88~~~b. 88    88    88    88      88   88      88  88  88 88~~~~~    88    88~~~88 
//  88   8D 88b  d88   .88.   88booo. 88  .8D      88  88  88 88.        88    88   88 
//  Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      YP  YP  YP Y88888P    YP    YP   YP 
//                                                                                     
//     

function buildMetaFromItem( theItem: IPatternItemInfo, sitePages: ISitePagesList, ) {
    let meta: string[] = ['All'];

    sitePages.metaColumns.map( c=> {
        if ( c.indexOf('/') > -1 ) { 
            let cols = c.split('/');
            //console.log( 'theItem', theItem);
            if ( theItem[ cols[0] ]) {
                meta = addItemToArrayIfItDoesNotExist( meta, theItem[ cols[0] ][ cols[1] ] ) ;
            } else { meta = addItemToArrayIfItDoesNotExist( meta, `. missing ${ c }` ) ; }
        } else if ( c.indexOf('.') > -1 ) { 
            let cols = c.split('.');
            if ( theItem[ cols[0] ]) {
                meta = addItemToArrayIfItDoesNotExist( meta, theItem[ cols[0] ][ cols[1]]  ) ;
            } else { meta = addItemToArrayIfItDoesNotExist( meta, `. missing ${ c }` ) ; }
        } else {
            meta = addItemToArrayIfItDoesNotExist( meta, theItem[ c ] ) ;
        }
        
    });

    sitePages.dropDownColumns.map( ( col , colIndex ) => {

        let actualColName = col.replace('>', '' ).replace('+', '' ).replace('-', '' );
        let parentColName = colIndex > 0 && col.indexOf('>') > -1 ? sitePages.dropDownColumns[colIndex - 1] : null;
        parentColName = parentColName !== null ? parentColName.replace('>', '' ).replace('+', '' ).replace('-', '' ) : null;

        let thisItemsChoices = theItem[ actualColName ];
        if ( parentColName !== null ) { thisItemsChoices = theItem[ parentColName ] + ' > ' + theItem[ actualColName ] ; }

        meta = addItemToArrayIfItDoesNotExist( meta, thisItemsChoices ) ;

    });

    return meta;
}

//  d8888b. db    db d888888b db      d8888b.      .d8888. d88888b  .d8b.  d8888b.  .o88b. db   db 
//  88  `8D 88    88   `88'   88      88  `8D      88'  YP 88'     d8' `8b 88  `8D d8P  Y8 88   88 
//  88oooY' 88    88    88    88      88   88      `8bo.   88ooooo 88ooo88 88oobY' 8P      88ooo88 
//  88~~~b. 88    88    88    88      88   88        `Y8b. 88~~~~~ 88~~~88 88`8b   8b      88~~~88 
//  88   8D 88b  d88   .88.   88booo. 88  .8D      db   8D 88.     88   88 88 `88. Y8b  d8 88   88 
//  Y8888P' ~Y8888P' Y888888P Y88888P Y8888D'      `8888Y' Y88888P YP   YP 88   YD  `Y88P' YP   YP 
//                                                                                                 
//         

function buildSearchStringFromItem ( theItem: IPatternItemInfo, sitePages: ISitePagesList, ) {

    let result = '';
    let delim = '|||';

    if ( theItem.Title ) { result += 'Title=' + theItem.Title + delim ; }
    if ( theItem.Id ) { result += 'Id=' + theItem.Id + delim ; }

    sitePages.searchColumns.map( c => {
        let thisCol = c.replace('/','');
        if ( c.indexOf('/') > -1 ) { 
            let cols = c.split('/');
            if ( theItem[ cols[0] ] && theItem[ cols[0] ][ cols[1] ] ) { result += thisCol + '=' + theItem[ cols[0] ][ cols[1] ] + delim ; }
        } else if ( c.indexOf('.') > -1 ) { 
            let cols = c.split('.');
            if ( theItem[ cols[0] ] && theItem[ cols[0] ][ cols[1] ] ) { result += thisCol + '=' + theItem[ cols[0] ][ cols[1] ] + delim ; }
        } else {
            if ( theItem[thisCol] ) { result += thisCol + '=' + theItem[thisCol] + delim ; }
        }  

    });

    /**
     * Had this odata search from prior code:
     * if ( theItem['odata.type'] ) { result += theItem['odata.type'] + delim ; }
     * 
     */
    sitePages.odataSearch.map( odata => {
        if ( theItem[ odata ] ) { result += theItem[ odata ] + delim ; }
    });

    if ( theItem.meta.length > 0 ) { result += 'Meta=' + theItem.meta.join(',') + delim ; }

    result = result.toLowerCase();

    return result;

}