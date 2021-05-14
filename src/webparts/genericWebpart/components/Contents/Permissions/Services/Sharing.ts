

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
import { sp } from "@pnp/sp";

//https://sharepoint.stackexchange.com/questions/261222/spfx-and-pnp-sp-how-to-get-all-sites
//Just had to change SearchQuery to ISearchQuery.

import { ISearchQuery, SearchResults, ISearchResult, SortDirection } from "@pnp/sp/search";

import { IHubSiteWebData, IHubSiteInfo } from  "@pnp/sp/hubsites";
import "@pnp/sp/webs";
import "@pnp/sp/hubsites/web";

import { Web, IList, IItem } from "@pnp/sp/presets/all";

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

import { getExpandColumns, getKeysLike, getSelectColumns } from '@mikezimm/npmfunctions/dist/Lists/getFunctions';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
import { ISharingInformation } from '@pnp/sp/sharing';


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

import { buildSharingRows } from './SharingElements';

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

/**
 * 
 * https://www.techmikael.com/2018/04/working-with-hub-sites-and-search-api.html
 * 
 * There are other options to work with subsites. The CSOM Site object contains a property named IsHubSite
 * you can check on, as does the tenant properties of a site.
 * The site object also has a HubSiteId property which corresponds to the search managed property DepartmentId.
 * 
 */


/**
* Extract date in milliseconds from string:  https://stackoverflow.com/a/1016908
* @param details  details = "\/Date(1618104869979)\/" from SharedWithDetails
*/
export function getDateFromDetails( details : string ) {

 let re = /-?\d+/; 
 let m = re.exec(details); 
 let d = new Date(parseInt(m[0]));

 return d;

}


/*  Sample data from SharedWithDetails
fetch with:
sp.web.lists.getByTitle('Documents').items.filter('SharedWithUsersId ne null').get()

get back:
"SharedWithUsersId":[0:16]
"SharedWithDetails":"{"i:0#.f|membership|charris@mcclickster.onmicrosoft.com":{"DateTime":"\/Date(1618104869979)\/","LoginName":"mike.mcclickster@mcclickster.onmicrosoft.com"}}"
{
"i:0#.f|membership|charris@mcclickster.onmicrosoft.com":{
   "DateTime":"\/Date(1618104869979)\/",
   "LoginName":"mike.mcclickster@mcclickster.onmicrosoft.com"
}
}

This gets items in a specific folder, but not all files
sp.web.getFolderByServerRelativePath("Shared Documents").files()

sp.web.getFileById("4db8879e-4bce-4cda-9e92-1d567f7d206e");
4db8879e-4bce-4cda-9e92-1d567f7d206e

sp.web.getFileById("8986547f-50e5-4fe9-b959-e9ae31251593");
sp.web.getFileById("db369305-9f0e-4662-a991-1d938b45ec0a");

These are from sp.web.lists.getByTitle('Documents').items.filter('SharedWithUsersId ne null').get()
"odata.id":"8986547f-50e5-4fe9-b959-e9ae31251593"
"GUID":"db369305-9f0e-4662-a991-1d938b45ec0a"

This is from the sp.web.getFolderByServerRelativePath("Shared Documents").files()
"UniqueId":"c6eff1d2-fade-4a67-a9e0-646a32f68b62"
*/

// getSharedFiles( webURL, listTitle, null, null );
// allSharedItems( webURL, listTitle, null, null );

export interface ISharedArrayItem {
 key: string;
 keys: string[];
 sharedWith: string;
 sharedBy: string;
 DateTime: string;
 TimeMS: number;
 LoginName: string;
 SharedTime: Date;

 //Copying these down from item just for easier use.
 GUID: string;
 odataEditLink: string;
 FileSystemObjectType: number;
 AuthorId: number;
 Created: string;

 Modified: string;
 EditorId: number;

 CheckoutUserId: number;
}

export interface IMySharedItem {
 SharedWithDetails: string;
 SharedDetails: any;
 SharedArray: ISharedArrayItem[];
 SharedWithUsersId: number[];
 Title: string;

 Id: number;
 ID: number;
 
 GUID: string;
 odataEditLink: string;

 FileRef: string;
 FileLeafRef: string;

 FileSystemObjectType: number;
 ServerRedirectedEmbedUrl: string;
 ContentTypeId: string;
 AuthorId: number;
 Created: string;

 Modified: string;
 EditorId: number;

 CheckoutUserId: number;
}

export interface IMySharingInfo {
 sharedItems: IMySharedItem[];
 sharedElements: any[];
 detailItems: any[];
 detailElements: any[];
 isLoaded: boolean;
 errMessage: string;
}


export async function allSharedItems( webURL: string, listTitle: string, addTheseItemsToState: any, setProgress: any, width: number ) {
 let sharedItems: IMySharedItem[] = [];
 let sharedElements: any[] = [];
 let detailItems: any[] = [];
 let detailElements = null;
 let isLoaded = false;

 let errMessage = '';
 let webOrList = listTitle && listTitle.length > 0 && listTitle.toLowerCase() !== 'web' ? 'list' : 'web';
 let thisWebInstance = null;

 let thisSelect = ["*","Title","FileRef","FileLeafRef","SharedWithUsers/Title","SharedWithUsers/Name","SharedWithDetails"];
 let thisExpand = ["SharedWithUsers"];

 try {
     thisWebInstance = Web(webURL);
     let thisListObject = thisWebInstance.lists.getByTitle( listTitle );
     sharedItems = await thisListObject.items.select(thisSelect).expand(thisExpand).filter('SharedWithUsersId ne null').get();
     sharedItems.map( item => {
       item.SharedDetails = JSON.parse(item.SharedWithDetails);
       item.SharedArray = Object.keys(item.SharedDetails).map( shareKey => {
         let keys = shareKey.split('|');
         let detail = item.SharedDetails[ shareKey ];
         let key: string = keys[0];
         let SharedTime = getDateFromDetails( detail.DateTime );
         return {
           key: shareKey,
           keys: keys,
           sharedWith: keys[2],
           sharedBy: detail.LoginName,
           DateTime: detail.DateTime,
           LoginName: detail.LoginName,
           TimeMS: SharedTime.getTime(),
           SharedTime: SharedTime,
           GUID: item.GUID ,
           odataEditLink: item.odataEditLink ,
           FileSystemObjectType: item.FileSystemObjectType ,
           AuthorId: item.AuthorId ,
           Created: item.Created ,
           FileRef: item.FileRef ,
           FileLeafRef: item.FileLeafRef ,

         
           Modified: item.Modified ,
           EditorId: item.EditorId ,
         
           CheckoutUserId: item.CheckoutUserId ,
         };
       });
     });
     sharedElements = buildSharingRows( sharedItems, width );

 } catch (e) {
     errMessage = getHelpfullError(e, false, true);

 }

 let mySharing : IMySharingInfo = {
   sharedItems: sharedItems,
   sharedElements: sharedElements,
   detailItems: detailItems,
   detailElements: detailElements,
   isLoaded: isLoaded,
   errMessage: errMessage,
 };

 addTheseItemsToState( mySharing, errMessage );
 // console.log('mySharing:', mySharing );
 return { mySharing };
}

export function processSharedItems( foundItems: any[] ) {


}

 
export interface MySearchResults extends ISearchResult {

}

export async function getSharedFiles( webURL: string, listTitle: string, addTheseItemsToState: any, setProgress: any ) {

    /**
     *  Updated search query per pnpjs issue response:
     *  https://github.com/pnp/pnpjs/issues/1552#issuecomment-767837463
     * 
     * GET Managed properties here:  https://tenanat-admin.sharepoint.com/_layouts/15/searchadmin/ta_listmanagedproperties.aspx?level=tenant
     * 
     */
   const thisWebInstance = Web(webURL);

   let thisListObject = thisWebInstance.lists.getByTitle( listTitle );
   const theList = await sp.web.lists.getByTitle('Documents').get();   //ListItemEntityTypeFullName: "SP.Data.Shared_x0020_DocumentsItem

   let DocumentTemplateUrl = theList.DocumentTemplateUrl;  //"DocumentTemplateUrl":"/sites/PivotNotInstalled/Shared Documents/Forms/template.dotx"
   let odataMetadata = theList['odata.metadata'];  // "odata.metadata":"https://mcclickster.sharepoint.com/sites/PivotNotInstalled/_api/$metadata#SP.ApiData.Lists/@Element"

   //Can get serverrelativeURL via sp.web.getFolderByServerRelativePath("Shared Documents/Folder1").files()

   let query=`Path:https://mcclickster.sharepoint.com/sites/PivotNotInstalled/Shared%20Documents* AND ContentClass:STS_ListItem` ;
   let shareSelect = ["*","Title", "ServerRelativeUrl", "ServerRelativePath", "ID", "Id", "Path", "Filename","FileLeafRef", "Author","Editor","SharedWithUsersId", "SharedWithDetails", "SharedWithInternal","FileLeafRef","ows_FileLeafRef","ModifiedBy","Created","Modified","CreatedBy","CreatedById","ModifiedById","ServerRedirectedEmbedURL","ServerRedirectedPreviewURL","ServerRedirectedPreviewURL"];

   sp.search(<ISearchQuery>{
       Querytext: query,
         SelectProperties: shareSelect,
         "RowLimit": 500,
//          "StartRow": 0,
         EnableInterleaving: true,  //https://docs.microsoft.com/en-us/answers/questions/270812/bh-bhattmeet-get-most-viewed-documents-from-sharep.html
//          "ClientType": "ContentSearchRegular",  //This is from Hubsearch
         TrimDuplicates: false, //This is needed in order to also get the hub itself.
         SortList:
         [
           {
             Property: 'Created',
             Direction: SortDirection.Descending
           }
         ],
       })
          .then( ( res: SearchResults) => {

            console.log('associated sites with URL/Desc', res);
            console.log(res.RowCount);
            console.log(res.PrimarySearchResults);

           //  entireResponse.hubs.map( h => {
           //      h.sourceType = hubsCategory;
           //  });
           //  callback( entireResponse, custCategories, newData );

    });

    return;

}
