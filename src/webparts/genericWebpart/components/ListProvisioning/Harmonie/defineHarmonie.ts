
import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../../../../../services/railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../../../../../services/railsCommon/ProvisionTypes';

import { HarmonieEmailFields } from './columnsHarmonie'; //Import column arrays (one file because both lists use many of same columns)

import { HarmonieViews, BUHarmonieViews } from './viewsHarmonie';  //Import view arrays for Project list

import { provisionTheList  } from '../component/provisionWebPartList';

// definedList: 'PreConfig',


import { defineTheListMaster } from '../component/provisionWebPartList';
import { getFieldNamesFromArray, getViewTitlesFromArray } from '../component/provisionFunctions';


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
        makeThisList.templateDesc = `Adds ${listDefinition} related views (${makeThisList.createTheseViews.length}) and fields (${makeThisList.createTheseFields.length}) to your list.`;}

    makeThisList.templateDetails = `Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }\nViews include:${ getViewTitlesFromArray(makeThisList.createTheseViews).join(', ') }` ;

    return makeThisList;

}

