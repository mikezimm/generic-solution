
import { ComponentFields } from './columnsComponents'; //Import column arrays (one file because both lists use many of same columns)

import { createStatusViews, createYearPeriodViews, createStepsDoneViews } from './viewsComponents';  //Import view arrays for Project list

import { IMakeThisList, provisionTheList  } from '../component/provisionWebPartList';

// definedList: 'PreConfig',

export type IValidTemplate = 100 | 101;

import { defineTheListMaster } from '../component/provisionWebPartList';
import { getFieldNamesFromArray } from '../component/provisionFunctions';

export type IDefinedComponent = 'Pick component Type' | 'Status' | 'Effective Status' | 'Year-Period' | 'Steps Done' | '';

//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: IDefinedComponent , webURL: string, currentUser: number[], pageURL: string ) {

    //import { defineTheListMaster } from '../component/provisionWebPartList';
    let makeThisList:  IMakeThisList = defineTheListMaster(template, listTitle,listDefinition,webURL,pageURL, 'Components');

    if ( listDefinition === 'Status' ) {
        let addFields = ComponentFields(listDefinition);
        let addViews = createStatusViews();
        makeThisList.createTheseFields = addFields;
        makeThisList.createTheseViews = addViews;
        makeThisList.createTheseItems = [];
        makeThisList.autoItemCreate = false;
        makeThisList.templateDesc = 'Good for adding a basic status process to your list.';
//        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';

    } else if ( listDefinition === 'Year-Period' ) {
        makeThisList.createTheseFields = ComponentFields(listDefinition);
        makeThisList.createTheseViews = createYearPeriodViews();
        makeThisList.createTheseItems = [];
        makeThisList.autoItemCreate = false;
        makeThisList.templateDesc = 'Good for when you want to group or categorize by time buckets.';
//        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';

    } else if ( listDefinition === 'Effective Status' ) {
        makeThisList.createTheseFields = ComponentFields(listDefinition);
        makeThisList.createTheseViews = createStepsDoneViews();
        makeThisList.createTheseItems = [];
        makeThisList.autoItemCreate = false;
        makeThisList.templateDesc = 'Enhances basic status flow by giving the option to conditionally set a status.';
    //        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';

    } else if ( listDefinition === 'Steps Done' ) {
        makeThisList.createTheseFields = ComponentFields(listDefinition);
        makeThisList.createTheseViews = createStepsDoneViews();
        makeThisList.createTheseItems = [];
        makeThisList.autoItemCreate = false;
        makeThisList.templateDesc = 'Enhances Effective status flow by adding dates for each status number.';
//        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
    }

    if ( makeThisList.templateDesc === null ) { 
        makeThisList.templateDesc = ( makeThisList.templateDesc != null ? makeThisList.templateDesc : '') + `Adds related views (${makeThisList.createTheseViews.length}) and fields (${makeThisList.createTheseFields.length}) to your list.`;}

    makeThisList.templateDetails = `Fields include: ${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }` ;

    //let listResult = await provisionTheList( makeThisList, setProgress );

    return makeThisList;

}

