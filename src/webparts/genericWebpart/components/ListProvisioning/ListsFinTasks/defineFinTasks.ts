
import { FinTasksFields, } from './columnsFinTasks'; //Import column arrays (one file because both lists use many of same columns)

import { FinTasksViews,  } from './viewsFinTasks';  //Import view arrays for Project list

import { provisionTheList  } from '../component/provisionWebPartList';

import { FinanceTaskItems } from './ItemsWebPart';
import { getFieldNamesFromArray, getViewTitlesFromArray } from '../component/provisionFunctions';


import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../../../../../services/railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../../../../../services/railsCommon/ProvisionTypes';
// definedList: 'PreConfig',

import { defineTheListMaster } from '../component/provisionWebPartList';

//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: IListDefintionFinTasks , webURL: string, currentUser: number[], pageURL: string ) {

    let makeThisList:  IMakeThisList = defineTheListMaster(template, listTitle,listDefinition,webURL,pageURL, 'Finance Tasks');
    
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
    if ( makeThisList.templateDesc === null ) { 
        makeThisList.templateDesc = `Adds ${listDefinition} related views (${makeThisList.createTheseViews.length}) and fields (${makeThisList.createTheseFields.length}) to your list.`;}

    makeThisList.templateDetails = `Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }\nViews include:${ getViewTitlesFromArray(makeThisList.createTheseViews).join(', ') }` ;
    return makeThisList;

}

