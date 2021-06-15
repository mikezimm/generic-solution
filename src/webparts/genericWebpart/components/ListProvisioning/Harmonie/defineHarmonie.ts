
import { HarmonieEmailFields } from './columnsHarmonie'; //Import column arrays (one file because both lists use many of same columns)

import { HarmonieViews, BUHarmonieViews } from './viewsHarmonie';  //Import view arrays for Project list

import { IMakeThisList, provisionTheList  } from '../component/provisionWebPartList';

// definedList: 'PreConfig',

export type IValidTemplate = 100 | 101;

import { defineTheListMaster } from '../component/provisionWebPartList';
import { getFieldNamesFromArray } from '../component/provisionFunctions';

export type IListDefintionHarmonie = 'Emails' | 'BUEmails' ;

//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: IListDefintionHarmonie , webURL: string, currentUser: number[], pageURL: string ) {

    //import { defineTheListMaster } from '../component/provisionWebPartList';
    let makeThisList:  IMakeThisList = defineTheListMaster(template, listTitle,listDefinition,webURL,pageURL, 'Harmon.ie');

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
    if ( makeThisList.templateDesc === null ) { 
        makeThisList.templateDesc = `Adds ${listDefinition} related views(${makeThisList.createTheseViews.length} and fields(${makeThisList.createTheseFields.length}) to your list.`;}

    makeThisList.templateDetails = `Adds ${makeThisList.createTheseViews.length} views and ${makeThisList.createTheseFields.length} fields to your list.  Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }` ;

    return makeThisList;

}

