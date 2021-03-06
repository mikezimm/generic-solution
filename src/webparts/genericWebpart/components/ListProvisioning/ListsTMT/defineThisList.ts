
import { TMTProjectFields, TMTTimeFields} from './columnsWebPart'; //Import column arrays (one file because both lists use many of same columns)

import { projectViews} from './viewsParentList';  //Import view arrays for Project list

import { timeViewsFull } from './viewsChildList'; //Import view arrays for Time list

import { TMTDefaultProjectItems, TMTTestTimeItems, } from './ItemsWebPart'; // Import items to create in the list

import { provisionTheList  } from '../component/provisionWebPartList';


import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../../../../../services/railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../../../../../services/railsCommon/ProvisionTypes';

// definedList: 'PreConfig',

import { defineTheListMaster } from '../component/provisionWebPartList';
import { getFieldNamesFromArray, getViewTitlesFromArray } from '../component/provisionFunctions';

//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: IListDefintionTMT , webURL: string, currentUser: number[], pageURL: string ) {

    let makeThisList:  IMakeThisList = defineTheListMaster(template, listTitle,listDefinition,webURL,pageURL, 'TrackMyTime');

    if ( listDefinition === 'Projects' ) {
        makeThisList.createTheseFields = TMTProjectFields();
        makeThisList.createTheseViews = projectViews;
        makeThisList.createTheseItems = TMTDefaultProjectItems;
        makeThisList.autoItemCreate = true;
        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';


    } else if ( listDefinition === 'TrackMyTime' ) {
        makeThisList.createTheseFields = TMTTimeFields();
        makeThisList.createTheseViews = timeViewsFull;
        makeThisList.createTheseItems =  TMTTestTimeItems(currentUser);
        makeThisList.autoItemCreate = false;
        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
    }

    //let listResult = await provisionTheList( makeThisList, setProgress );
    if ( makeThisList.templateDesc === null ) { 
        makeThisList.templateDesc = `Adds ${listDefinition} related views (${makeThisList.createTheseViews.length}) and fields (${makeThisList.createTheseFields.length}) to your list.`;}

    makeThisList.templateDetails = `Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }\nViews include:${ getViewTitlesFromArray(makeThisList.createTheseViews).join(', ') }` ;
    return makeThisList;

}

