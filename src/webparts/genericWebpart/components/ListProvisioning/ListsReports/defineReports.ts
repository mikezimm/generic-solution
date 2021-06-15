
import { ReportsFields } from './columnsReports'; //Import column arrays (one file because both lists use many of same columns)

import { reportViews} from './viewsReports';  //Import view arrays for Project list

import { IMakeThisList, provisionTheList,  } from '../component/provisionWebPartList';

export type IValidTemplate = 100 | 101;

import { defineTheListMaster } from '../component/provisionWebPartList';
import { getFieldNamesFromArray } from '../component/provisionFunctions';

export type IListDefintionReports = 'Reports1' | 'Reports2';

//export async function provisionTheListLoader( template: IValidTemplate , listTitle : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: IListDefintionReports , webURL: string, currentUser:  number[], pageURL: string ) {

    let makeThisList:  IMakeThisList = defineTheListMaster(template, listTitle,listDefinition,webURL,pageURL, 'Reports');
    //Sometimes the webURL is undefined  (when props are empty)

    if ( listDefinition === 'Reports1' ) {
        makeThisList.createTheseFields = ReportsFields('Reports1');
        makeThisList.createTheseViews = reportViews;
        makeThisList.createTheseItems = [] ;// = TMTDefaultProjectItems;
        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';


    } else if ( listDefinition === 'Reports2' ) {
        makeThisList.createTheseFields = ReportsFields('Reports2');
        makeThisList.createTheseViews = reportViews;
        makeThisList.createTheseItems = [] ;// =  TMTTestTimeItems(currentUser);
        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
    }

    //let listResult = await provisionTheList( makeThisList, setProgress );
    if ( makeThisList.templateDesc === null ) { 
        makeThisList.templateDesc = `Adds ${listDefinition} related views(${makeThisList.createTheseViews.length} and fields(${makeThisList.createTheseFields.length}) to your list.`;}

    makeThisList.templateDetails = `Adds ${makeThisList.createTheseViews.length} views and ${makeThisList.createTheseFields.length} fields to your list.  Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }` ;
    return makeThisList;

}

