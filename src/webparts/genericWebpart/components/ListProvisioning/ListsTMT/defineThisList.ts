
import { TMTProjectFields, TMTTimeFields} from './columnsWebPart'; //Import column arrays (one file because both lists use many of same columns)

import { projectViews} from './viewsParentList';  //Import view arrays for Project list

import { timeViewsFull } from './viewsChildList'; //Import view arrays for Time list

import { TMTDefaultProjectItems, TMTTestTimeItems, } from './ItemsWebPart'; // Import items to create in the list

import { IMyProgress, IUser } from '../../IReUsableInterfaces';

import { IMakeThisList, provisionTheList  } from '../component/provisionWebPartList';

export type IValidTemplate = 100 | 101;


//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, currentUser: IUser, pageURL: string ) {

    if ( webURL.length > 0 && webURL.lastIndexOf('/') != webURL.length -1 ) { webURL += '/'; }
    if ( pageURL.length > 0 && pageURL.lastIndexOf('/') != pageURL.length -1 ) { pageURL += '/'; }

    let test1 = webURL == '' ? true : false;
    let test2 = webURL.toLowerCase().indexOf(pageURL.toLowerCase()) > -1 ? true : false;
    let test3 = pageURL.toLowerCase().indexOf(webURL.toLowerCase()) > -1 ? true : false;

    let test4 = test1 || test2 || test3 ? true : false;

    let makeThisList:  IMakeThisList = {

        title: listName,
        name: listName,
        webURL: webURL,
        desc: listName + ' list for this Webpart',
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
        listURL: webURL + ( template === 100 ? 'Lists/' : '') + listName,
        confirmed: false,
        onCurrentSite: test4,
        webExists: false,
        listExists: false,
    
    };

    if ( listDefinition === 'ParentListTitle' ) {
        makeThisList.createTheseFields = TMTProjectFields();
        makeThisList.createTheseViews = projectViews;
        makeThisList.createTheseItems = TMTDefaultProjectItems;
        makeThisList.autoItemCreate = true;
        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';


    } else if ( listDefinition === 'ChildListTitle' ) {
        makeThisList.createTheseFields = TMTTimeFields();
        makeThisList.createTheseViews = timeViewsFull;
        makeThisList.createTheseItems =  TMTTestTimeItems(currentUser);
        makeThisList.autoItemCreate = false;
        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
    }

    //let listResult = await provisionTheList( makeThisList, setProgress );

    return makeThisList;
}

