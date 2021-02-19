import { Web, IWeb } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText, IClientsidePage, ClientsidePageFromFile  } from "@pnp/sp/clientside-pages";

import { IListInfo, IMyListInfo, IServiceLog } from '@mikezimm/npmfunctions/dist/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '@mikezimm/npmfunctions/dist/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '@mikezimm/npmfunctions/dist/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';

import { getRandomInt } from '../../ListProvisioning/ListsTMT/ItemsWebPart';

import { createDrilldownDemoWebParts, IWebPartDef } from './provisionPageFunctions';

export type IValidTemplate = 100 | 101;

export interface IMakeThisPage {

    title: string;
    name: string;
    pageLayout: ClientsidePageLayoutType;
    webURL?: string;
    pageURL?: string;
    desc?: string;
    template?: IValidTemplate;

    createThesePages?: IAnyArray;
    autoItemCreate?: boolean;
    alternateItemCreateMessage?: string;
    confirmed?: boolean;
    onCurrentSite?: boolean;
    webExists?: boolean;
    pageExists?: boolean;
    pageExistedB4?: boolean;

}

export async function copyThisPage( destWeb: IWeb, sourcePageName: string, destPageName : string = null): Promise<IServiceLog[]>{

    if ( destPageName === '' || destPageName === null ) { destPageName = sourcePageName; }
    let statusLog : IServiceLog[] = [];

    console.log('getting page here:');
    try {

        /**
         * Need to look at this for ContentCanvas1
         * https://joaojmendes.com/2019/02/08/read-and-update-spfx-webpart-properties-from-code/
         * 
         */

        // use the web factory to target a specific web  https://autoliv.sharepoint.com/sites/webpartdev/SitePages/Home(1).aspx
    const page2 = await Web("https://autoliv.sharepoint.com/sites/Patterns/").loadClientsidePage("/sites/Patterns/SitePages/" + sourcePageName + ".aspx");

//    let page2X = JSON.stringify(page2);
//    let page2Y = JSON.parse(page2X);

    console.log( 'Source page sections' + sourcePageName , page2.sections );
    console.log( 'Source page data' + sourcePageName , page2.data );
    console.log( 'Source page _data' + sourcePageName , page2['_data'] );
    //console.log( 'Source page ' + sourcePageName , page2. );

    try {
        const pageCopy2a = await page2.copy(destWeb, sourcePageName, sourcePageName);
        console.log( 'Succeded pasting page ' + sourcePageName , pageCopy2a );
        //console.log( 'CanvaseContent1 _data' + sourcePageName , pageCopy2a['_data'] ); // this did not give any meaningful information related to the page
        console.log( 'Succeded pasting page pageCopy2a.prototype.Target.json ' + sourcePageName , pageCopy2a['_data.ok'] );

    } catch (e){
        console.log( 'Failed pasting page ' + sourcePageName  );

    }
    /*
    try {
        const pageCopy2Y = await page2Y.copy(destWeb, sourcePageName + 'Y', sourcePageName + 'Y');
        console.log( 'Succeded pasting page ' + sourcePageName , pageCopy2Y );

    } catch (e){
        console.log( 'Failed pasting page ' + sourcePageName  );

    }*/

    } catch (e) {
            console.log( 'Failed getting page ' + sourcePageName  );
    }


    return statusLog;

}

    
//export async function provisionTestPage( makeThisPage:  IMakeThisPage, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
    export async function provisionDrilldownPage( makeThisPage:  IMakeThisPage, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{


        // our page instance

        //
//        console.log('getting page here:');
//        const page: IClientsidePage = await sp.web.loadClientsidePage("/sites/Infoiis/SitePages/Home.aspx");
 //       console.log( 'Home page 1' , page );

        // use the web factory to target a specific web  https://autoliv.sharepoint.com/sites/webpartdev/SitePages/Home(1).aspx
//        const page2 = await Web("https://autoliv.sharepoint.com/sites/WebPartDev/").loadClientsidePage("/sites/WebPartDev/SitePages/Home(1).aspx");
//        console.log( 'Home page 1' , page2 );

        // creates a published copy of the page
        //const pageCopy = await page.copy(sp.web, "newpagename", "New Page Title");

        // creates a published copy of the page
        const thisWeb = Web('https://autoliv.sharepoint.com/sites/Patterns/Sub1/');

        // const pageCopy2a = await page2.copy(thisWeb, "Contents2", "Contents2"); //This only worked on Home(1)
//        await copyThisPage( thisWeb, 'Connecting-to-our-hub', 'Test-Copy');  //Succeded
//        await copyThisPage( thisWeb, 'Hub-Connections', 'Test-Copy2');  //Succeded
        await copyThisPage( thisWeb, 'Hero', '');  //Succeded
        await copyThisPage( thisWeb, 'HeroGoogle', '');  //Succeded

        /**
         * Known issues:  
         * Hero webpart with images/links
         * Picture webpart with picture
         * File Viewer with file
         * 
         * Error message:  400  "Server relative urls must start with SPWeb.ServerRelativeUrl"
         * 
         * 
         * 
         */

        //await copyThisPage( thisWeb, 'Bing-Maps');  //Succeded

        //await copyThisPage( thisWeb, 'TestBlankPivot');  //Failed
        //await copyThisPage( thisWeb, 'Home');  //Failed
        //await copyThisPage( thisWeb, 'Markdown');  //Failed
        //await copyThisPage( thisWeb, 'News');  //Failed
        //await copyThisPage( thisWeb, 'List');  //Failed

        //await copyThisPage( thisWeb, 'Links');
        //await copyThisPage( thisWeb, 'YouTube---WebPart-Showcase.aspx');
        

        //const pageCopy2b = await page2.copy(sp.web, "newpagename2x", "New Page Title2x");

        // creates a draft (unpublished) copy of the page
        //const pageCopy2 = await page.copy(sp.web, "newpagename", "New Page Title", false);

        // edits to pageCopy2 ...

        // publish the page


        let buildTheseWebparts : IWebPartDef[] = createDrilldownDemoWebParts();

        let statusLog : IServiceLog[] = [];
    
        let extra = getRandomInt(1,10);
        makeThisPage.title += extra;
    
        // this will be a ClientsidePageComponent array
        // this can be cached on the client in production scenarios
        const partDefs = await sp.web.getClientsideWebParts();
        console.log('partDefs:', partDefs);

        let currentSection = -1;
        let currentColumn = -1;

        console.log('provisionTestPage' , makeThisPage.title);
        alert('Building page ' + makeThisPage.title);

        const thisPage : IClientsidePage = await CreateClientsidePage(Web(makeThisPage.webURL), makeThisPage.title, makeThisPage.title, makeThisPage.pageLayout );

        let sectionObj = null;
        let columnObj = null;

        buildTheseWebparts.map( webPart => {

            const getThisWPDef = partDefs.filter(c => c[webPart.isIdOrName] === webPart.NameOrId );
            if ( getThisWPDef.length > 0 ) {

                const buildMe = ClientsideWebpart.fromComponentDef(getThisWPDef[0]);
                buildMe.setProperties(  webPart.setProperties );

                try {
                    if ( webPart.section > currentSection ) { 
                        sectionObj = thisPage.addSection();
                        currentSection ++;
                        currentColumn = -1;
                    }
                    if ( webPart.column > currentColumn ) { 
                        columnObj = sectionObj.addColumn();
                        currentColumn ++;
                    }

                    columnObj.addControl(buildMe);

                } catch (e) {
                    alert(e);
                }
            }

        });
        // you must publish the new page
        await thisPage.save();
        console.log('Saved this thisPage: ', thisPage );

        let pageTitle = makeThisPage.title.replace(/\ /g, '-') + '.aspx';
        let pageURL = makeThisPage.webURL;
        let openURL = pageURL + '/SitePages/' + pageTitle;

        window.open( openURL, "_blank"); 

        return statusLog;
    }

//export async function provisionTestPage( makeThisPage:  IMakeThisPage, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
    export async function provisionTestPage( makeThisPage:  IMakeThisPage, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{

        let statusLog : IServiceLog[] = [];
    
        let extra = getRandomInt(1,10);
        makeThisPage.title += extra;
        makeThisPage.title += extra;
    
        // this will be a ClientsidePageComponent array
        // this can be cached on the client in production scenarios
        const partDefs = await sp.web.getClientsideWebParts();
        console.log('partDefs:', partDefs);
        // find the definition we want, here by id
        //const partDef = partDefs.filter(c => c.Id === "490d7c76-1824-45b2-9de3-676421c997fa");
        //ff5f0cc8-b7e7-4e75-b46c-c0091483d2c2
        //const partDef = partDefs.filter(c => c.Name === "TrackMyTime7");
        //const partDef = partDefs.filter(c => c.Id === "490d7c76-1824-45b2-9de3-676421c997fa");

        /*
            LIST webpart ID:  f92bf067-bc19-489e-a556-7fe95f508720
            listId: e.properties.selectedListId,
            viewId: e.properties.selectedViewId,
            folderKey: e.properties.selectedFolderKey,
            title: e.properties.listTitle,
            isDocumentLibrary: e.properties.isDocumentLibrary,
            forceRefresh: e.forceRefreshOnce,
            theme: e._variantTheme,
            hideCommandBar: e.properties.hideCommandBar,
            this.properties.showDefaultDocumentLibrary
            this.properties.webRelativeListUrl
            this.properties.selectedListUrl
            showFilterByControl
        */
        const partDef = partDefs.filter(c => c.Id === "f92bf067-bc19-489e-a556-7fe95f508720");
    
        console.log('provisionTestPage' , makeThisPage.title);
        alert('Building page ' + makeThisPage.title);
                    //export declare type ClientsidePageLayoutType = "Article" | "Home" | "SingleWebPartAppPage" | "RepostPage";
        // use the web factory to create a page in a specific web
        const page3 : IClientsidePage = await CreateClientsidePage(Web(makeThisPage.webURL), makeThisPage.title, makeThisPage.title, makeThisPage.pageLayout );
        console.log('Created this page3: ', page3 );
        // add two columns with factor 6 - this is a two column layout as the total factor in a section should add up to 12
        const section1 = page3.addSection();
    
        // we add that part to a new section
    
            for (let d in partDef ) {

                const thisPart = ClientsideWebpart.fromComponentDef(partDef[d]);

/*                thisPart.setProperties<{ timeTrackListTitle: string, pivotFormat: string }>({
                    timeTrackListTitle: "PNPTest",
                    pivotFormat: "tabs"

                });

                thisPart.setProperties<{ selectedListId: string, selectedViewId: string, hideCommandBar: boolean }>({
                    selectedListId: "db9efe6a-d1ea-4449-8527-a3ff84436d87",
                    selectedViewId: "8274B88A-1944-43B0-84DF-95DCA0568222",
                    hideCommandBar: false
                });
*/
                thisPart.setProperties({
                    selectedListId: "db9efe6a-d1ea-4449-8527-a3ff84436d87",
                    selectedViewId: "91defb23-3f2d-4f20-b592-3f2427318a53".toUpperCase(),
                    hideCommandBar: true
                });

                try {
                    const section2 = page3.addSection().addControl(thisPart);
                } catch (e) {
                    alert(e);
                }

        }

        const vertSection = page3.addVerticalSection();

        // you must publish the new page
        await page3.save();
        console.log('Saved this page3: ', page3 );

        let pageTitle = makeThisPage.title.replace(/\ /g, '-') + '.aspx';
        let pageURL = makeThisPage.webURL;
        let openURL = pageURL + 'SitePages/' + pageTitle;

        window.open( openURL, "_blank"); 

        return statusLog;
    }

//export async function provisionTestPage( makeThisPage:  IMakeThisPage, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function provisionTestPageWorks( makeThisPage:  IMakeThisPage, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{

    let statusLog : IServiceLog[] = [];

    let extra = getRandomInt(1,10);
    makeThisPage.title += extra;
    makeThisPage.title += extra;

    // this will be a ClientsidePageComponent array
    // this can be cached on the client in production scenarios
    const partDefs = await sp.web.getClientsideWebParts();
    console.log('partDefs:', partDefs);
    // find the definition we want, here by id
    //const partDef = partDefs.filter(c => c.Id === "490d7c76-1824-45b2-9de3-676421c997fa");
    //ff5f0cc8-b7e7-4e75-b46c-c0091483d2c2
    const partDef = partDefs.filter(c => c.Name === "TrackMyTime7");
    //const partDef = partDefs.filter(c => c.Id === "490d7c76-1824-45b2-9de3-676421c997fa");


    // create a ClientWebPart instance from the definition
    const part = ClientsideWebpart.fromComponentDef(partDef[0]);
    console.log('part:', part);
    // set the properties on the web part. Here for the embed web part we only have to supply an embedCode - in this case a youtube video.
    // the structure of the properties varies for each webpart and each version of a webpart, so you will need to ensure you are setting
    // the properties correctly
    part.setProperties<{ location: string }>({
        location: "48329, MI",
    });



    console.log('provisionTestPage' , makeThisPage.title);
    alert('Building page ' + makeThisPage.title);
                //export declare type ClientsidePageLayoutType = "Article" | "Home" | "SingleWebPartAppPage" | "RepostPage";
    // use the web factory to create a page in a specific web
    const page3 = await CreateClientsidePage(Web("https://mcclickster.sharepoint.com/sites/Templates/Testing"), makeThisPage.title, makeThisPage.title, makeThisPage.pageLayout );

    // add two columns with factor 6 - this is a two column layout as the total factor in a section should add up to 12
    const section1 = page3.addSection();

    // we add that part to a new section

    var doThese = [];
    for (var x = 47; x <= 50; x++) {
        doThese.push(x.toString());
    }

    let compInfo : string[]= [];
    for (let i in partDefs ) {
        if ( doThese.indexOf(i) > -1) {
            let thisManifest = JSON.parse(partDefs[i].Manifest);
            let theseProps = thisManifest.preconfiguredEntries[0].properties;
            let theseKeys = Object.keys(theseProps).join('</br>');
            if (theseKeys.length < 1) { theseKeys = 'No props here.'; }
            compInfo.push('<h2>' + i + ' - ' + thisManifest.alias + ":<h2><p>" + theseKeys + '</p>');
        }
    }
    console.log('compInfo', compInfo);
    let controlInfo = compInfo.join('</br>');
    page3.addVerticalSection().addControl(new ClientsideText(controlInfo));
    for (let d in partDefs ) {
        if ( doThese.indexOf(d) > -1) {
            let thisManifest = JSON.parse(partDefs[d].Manifest);
            let theseProps = thisManifest.preconfiguredEntries[0].properties;
            console.log( 'part: ' + thisManifest.alias, theseProps);
            
            const thisPart = ClientsideWebpart.fromComponentDef(partDefs[d]);

            if ( d === '49' ) {
                thisPart.setProperties<{ term: string, limit: number, displayHeader: boolean, title?: string, }>({
                    term: "@AutolivInc",
                    limit: 2,
                    displayHeader: true,
                });
            }

            try {
                const section2 = page3.addSection().addControl(thisPart);
            } catch (e) {
                alert(e);
            }

        }
    }

    const vertSection = page3.addVerticalSection();

    // you must publish the new page
    await page3.save();

    return statusLog;
}

export async function provisionThePage( makeThisPage:  IMakeThisPage, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{

    let statusLog : IServiceLog[] = [];
    let alertMe = false;
    let consoleLog = false;

    let createItems: boolean = false;

    if ( readOnly === false  ) {
        if ( makeThisPage.autoItemCreate === true ) {
            createItems = true;
        } else {
            //let confirmItems = confirm("We created your page, do you want us to create some sample Time entries so you can see how it looks?")
            if (confirm("Do you want us to: \n\nCreate some sample page items \n\nso you can see how it looks?")) {
                //You pressed Ok, add items
                createItems = true;
            }
        }
    }

    let fieldsToGet = makeThisPage.createThesePages.map ( thisField => {
        return thisField.name;
    });

    let fieldFilter = "StaticName eq '" + fieldsToGet.join("' or StaticName eq '") + "'";

    console.log('fieldFilter:', fieldFilter);

    const thisWeb = Web(makeThisPage.webURL);

    let ensuredPage = null;
    let pageFields = null;
    let pageViews = null;
    let currentFields = null;
    let currentViews = null;

    if ( readOnly === false ) {
        //ensuredPage = await thisWeb.pages.ensure(makeThisPage.title);
        console.log('ensuredPage:', readOnly, ensuredPage );
        pageFields = ensuredPage.page.fields;   //Get the fields object from the page
        pageViews = ensuredPage.page.views;     //Get the views object from the page

        currentFields = await pageFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter(fieldFilter).get();
        currentViews = await pageViews.get();
        
        console.log('currentFields:', readOnly, currentFields );
        console.log('currentViews:', readOnly, currentViews );

    } else {
        ensuredPage = await thisWeb.lists.getByTitle(makeThisPage.title);
        console.log('ensuredPage:', readOnly, ensuredPage );
        currentFields = await ensuredPage.fields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter(fieldFilter).get();
        currentViews = await ensuredPage.views.get();
        console.log('currentFields:', readOnly, currentFields );
        console.log('currentViews:', readOnly, currentViews );
    }


    console.log(makeThisPage.title + ' page fields and views', currentFields, currentViews);

//    let result = await addTheseFields(['create','changesFinal'], readOnly, makeThisPage, ensuredPage, currentFields, makeThisPage.createTheseFields, setProgress, alertMe, consoleLog );

//    let result2 = await addTheseViews( makeThisPage.pageExistedB4 , readOnly, makeThisPage, ensuredPage, currentViews, makeThisPage.createTheseViews, setProgress, alertMe, consoleLog);

    let result3 = null;

    if ( createItems === true && readOnly === false ) {

        //setProgress(false, "I", 0, 0 , '', 'TimePicker', makeThisPage.title, 'Adding ITEMS to page: ' + makeThisPage.title, 'Checking for ITEMS', 'Add items ~ 112' );
        let createThisBatch : IAnyArray = [];
        //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
        let totalItems = makeThisPage.createThesePages.length;
        let chunk = 3;

        if ( totalItems <= 50 ) {
//result3 = await addTheseItemsToPage(makeThisPage, thisWeb, makeThisPage.createThesePages, setProgress, true, true);
        } else {
            for (var i=0; i < totalItems; i += chunk) {
                createThisBatch = makeThisPage.createThesePages.slice(i, i+chunk);
//result3 = await addTheseItemsToPageInBatch(makeThisPage, thisWeb, createThisBatch, setProgress, true, true);
            }
        }
    }
    
    if ( readOnly === true  ) {
        alert( 'Your page has been checked... scroll down to see the results :)' );

    } else if ( makeThisPage.alternateItemCreateMessage ) {
        alert( makeThisPage.alternateItemCreateMessage );

    } else {
        alert(`Your  page is all ready to go!`);
    }

    markComplete();

    return statusLog;

}
