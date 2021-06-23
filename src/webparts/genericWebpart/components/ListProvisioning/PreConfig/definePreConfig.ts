
import { PreConfiguredListTemplates } from './columnsPreConfig'; //Import column arrays (one file because both lists use many of same columns)

import { PreConfigCarrotChartsViews, PreConfigDrillDownViews, PreConfigGridChartsViews } from './viewsPreConfig';  //Import view arrays for Project list

import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';

import { provisionTheList  } from '../component/provisionWebPartList';

import { defineTheListMaster } from '../component/provisionWebPartList';
import { getFieldNamesFromArray, getViewTitlesFromArray } from '../component/provisionFunctions';

import { CarrotItems } from './Items/CarrotItems';

import { GridItems } from './Items/GridItems';

import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../../../../../services/railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../../../../../services/railsCommon/ProvisionTypes';

//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: IListDefintionPreConfig, webURL: string, currentUser:  number[], pageURL: string ) {

    let makeThisList:  IMakeThisList = defineTheListMaster(template, listTitle,listDefinition,webURL,pageURL, 'PreConfig');

    if ( listDefinition === 'Drilldown' ) {
        makeThisList.createTheseFields = PreConfiguredListTemplates('Drilldown');
        makeThisList.createTheseViews = PreConfigDrillDownViews;
        makeThisList.createTheseItems = [] ;// = TMTDefaultProjectItems;
        makeThisList.autoItemCreate = true;
//        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';

    } else if ( listDefinition === 'CarrotCharts' ) {
        makeThisList.createTheseFields = PreConfiguredListTemplates('CarrotCharts');
        makeThisList.createTheseViews = PreConfigCarrotChartsViews;
        makeThisList.createTheseItems = CarrotItems ;// =  TMTTestTimeItems(currentUser);
        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';

    } else if ( listDefinition === 'GridCharts' ) {
        makeThisList.createTheseFields = PreConfiguredListTemplates('GridCharts');
        makeThisList.createTheseViews = PreConfigGridChartsViews;
        makeThisList.createTheseItems = GridItems ;// =  TMTTestTimeItems(currentUser);
        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
}
    //let listResult = await provisionTheList( makeThisList, setProgress );
    if ( makeThisList.templateDesc === null ) { 
        makeThisList.templateDesc = `Adds ${listDefinition} related views (${makeThisList.createTheseViews.length}) and fields (${makeThisList.createTheseFields.length}) to your list.`;}

    makeThisList.templateDetails = `Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }\nViews include:${ getViewTitlesFromArray(makeThisList.createTheseViews).join(', ') }` ;
    return makeThisList;

}

