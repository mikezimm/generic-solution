

import { IMyProgress, IUser } from '../../IReUsableInterfaces';

import { IMakeThisPage, provisionThePage  } from '../component/provisionWebPartPages';

import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType } from "@pnp/sp/clientside-pages";

export type IValidTemplate = 100 | 101;

import { cleanURL, camelize } from '@mikezimm/npmfunctions/dist/stringServices';

import { getRandomInt } from '../../ListProvisioning/ListsTMT/ItemsWebPart';

//export async function provisionThePageLoader( template: IValidTemplate , pageName : string, pageDefinition: 'ParentPageTitle' | 'ChildPageTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineDrilldownPage ( template: IValidTemplate , pageName : string, pageDefinition: 'SitePages' | 'Pages' | 'News' , webURL: string, currentUser: IUser, pageURL: string ) {

    //Sometimes the webURL is undefined  (when props are empty)
    pageURL = pageURL.toLowerCase();
    if ( webURL ) { 
        let webLastIndexOf = webURL.lastIndexOf('/');
        if ( webURL.length > 0 && webLastIndexOf != webURL.length -1 ) { webURL += '/'; } 
    }
    if ( pageURL.length > 0 && pageURL.lastIndexOf('/') != pageURL.length -1 ) { pageURL += '/'; }

    let isPageOnThisWeb = false;

    if ( webURL === '' ) {
        isPageOnThisWeb = true;

    } else if ( webURL === undefined ) {
        isPageOnThisWeb = true;

    } else if ( pageURL === webURL ) {
        isPageOnThisWeb = true;
    }
    pageName = pageName + ' - ' + getRandomInt(1,1000);
    let makeThisPage:  IMakeThisPage = {

        title: pageName,
        name: pageName,
        webURL: webURL,
        pageLayout: 'Article',
        desc: pageName + ' - Sample for webpart',
        template: template,

        
        createThesePages: null,
        autoItemCreate: false,
        pageURL: webURL + ( template === 100 ? 'Pages/' : '') + pageName,
        confirmed: false,
        onCurrentSite: isPageOnThisWeb,
        webExists: false,
        pageExists: false,
        pageExistedB4: false,
    
    };

    if ( pageDefinition === 'SitePages' ) {
        //makeThisPage.createTheseFields = TMTProjectFields();
        //makeThisPage.createTheseViews = projectViews;
        //makeThisPage.createTheseItems = TMTDefaultProjectItems;
        makeThisPage.autoItemCreate = true;
        makeThisPage.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';


    } else if ( pageDefinition === 'Pages' ) {
        //makeThisPage.createTheseFields = TMTTimeFields();
        //makeThisPage.createTheseViews = timeViewsFull;
        //makeThisPage.createTheseItems =  TMTTestTimeItems(currentUser);
        makeThisPage.autoItemCreate = false;
        makeThisPage.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
    }

    //let listResult = await provisionThePage( makeThisPage, setProgress );

    return makeThisPage;

}

