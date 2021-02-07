
import { FinTasksFields, IFinTasksDefs } from './columnsFinTasks'; //Import column arrays (one file because both lists use many of same columns)

import { FinTasksViews,  } from './viewsFinTasks';  //Import view arrays for Project list

import { IMyProgress, IUser } from '../../IReUsableInterfaces';

import { IMakeThisList, provisionTheList  } from '../component/provisionWebPartList';

import { FinanceTaskItems } from './ItemsWebPart';

import { IDefinedLists } from '../component/provisionListComponent';
// definedList: 'PreConfig',

export type IValidTemplate = 100 | 101;

import { cleanURL, camelize, cleanSPListURL } from '@mikezimm/npmfunctions/dist/stringServices';

//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: IFinTasksDefs , webURL: string, currentUser: number[], pageURL: string ) {

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

    webURL = webURL.replace('_layouts/15/','');  //Remove all the workbench urls
    
    let listName = cleanSPListURL(camelize(listTitle, true));
    let makeThisList:  IMakeThisList = {

        definedList: 'Finance Tasks',
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
        validUserIds: currentUser,

    };

    //'Program' | 'SORInfo' | 'WithStatus';
//    if ( listDefinition !== 'Program' ) {
        makeThisList.createTheseFields = FinTasksFields(listDefinition);
        makeThisList.createTheseViews = FinTasksViews;
        makeThisList.createTheseItems = FinanceTaskItems(currentUser) ; // = TMTDefaultProjectItems;
        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';


//    } else if ( listDefinition === 'SORInfo' ) {
//        makeThisList.createTheseFields = FinTasksFields(listDefinition);
//        makeThisList.createTheseViews = FinTasksViews;
//        makeThisList.createTheseItems = [] ;// =  TMTTestTimeItems(currentUser);
//        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
//    }

    //let listResult = await provisionTheList( makeThisList, setProgress );

    return makeThisList;

}

