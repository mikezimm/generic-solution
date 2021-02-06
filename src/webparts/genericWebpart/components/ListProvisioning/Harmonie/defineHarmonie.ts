
import { HarmonieEmailFields } from './columnsHarmonie'; //Import column arrays (one file because both lists use many of same columns)

import { HarmonieViews, BUHarmonieViews } from './viewsHarmonie';  //Import view arrays for Project list

import { IMyProgress, IUser } from '../../IReUsableInterfaces';

import { IMakeThisList, provisionTheList  } from '../component/provisionWebPartList';

import { IDefinedLists } from '../component/provisionListComponent';
// definedList: 'PreConfig',

export type IValidTemplate = 100 | 101;

import { cleanURL, camelize, cleanSPListURL } from '../../../../../services/stringServices';

//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: 'Emails' | 'BUEmails' , webURL: string, currentUser: IUser, pageURL: string ) {

    //Sometimes the webURL is undefined  (when props are empty)
    pageURL = pageURL.toLowerCase();
    if ( webURL ) {
        let webLastIndexOf = webURL.lastIndexOf('/');
        if ( webURL.length > 0 && webLastIndexOf != webURL.length -1 ) { webURL += '/'; }
    }
    if ( pageURL.length > 0 && pageURL.lastIndexOf('/') != pageURL.length -1 ) { pageURL += '/'; }

    let isListOnThisWeb = false;

    if ( webURL === '' ) {
        isListOnThisWeb = true;

    } else if ( webURL === undefined ) {
        isListOnThisWeb = true;

    } else if ( pageURL === webURL ) {
        isListOnThisWeb = true;
    }

    webURL = webURL.replace('_layouts/15/','');

    let listName = cleanSPListURL(camelize(listTitle, true));
    let makeThisList:  IMakeThisList = {

        definedList: 'Harmon.ie',
        title: listTitle,
        name: listName,
        webURL: webURL,
        desc: listTitle + ' list for this Webpart',
        template: template,
        enableContentTypes: true,
        additionalSettings: {
            EnableVersioning: true,
            MajorVersionLimit: 50,
            OnQuickLaunch: true,
         },
        createTheseFields: null,
        createTheseViews: null,
        createTheseItems: null,
        autoItemCreate: false,
        listURL: webURL + ( template === 100 ? 'lists/' : '') + listName,
        confirmed: false,
        onCurrentSite: isListOnThisWeb,
        webExists: false,
        listExists: false,
        listExistedB4: false,
        existingTemplate: null,
        sameTemplate: false,
        listDefinition: listDefinition,

    };

    if ( listDefinition === 'Emails' ) {
        makeThisList.createTheseFields = HarmonieEmailFields('Emails');
        makeThisList.createTheseViews = HarmonieViews;
        makeThisList.createTheseItems = [];
        makeThisList.autoItemCreate = true;
//        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';


    } else if ( listDefinition === 'BUEmails' ) {
        makeThisList.createTheseFields = HarmonieEmailFields('BUEmails');
        makeThisList.createTheseViews = BUHarmonieViews;
        makeThisList.createTheseItems = [];
        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
    }

    //let listResult = await provisionTheList( makeThisList, setProgress );

    return makeThisList;

}

