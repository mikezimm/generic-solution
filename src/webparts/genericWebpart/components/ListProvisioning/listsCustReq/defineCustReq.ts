
import { CustReqFields, ICustReqDefs } from './columnsCustReq'; //Import column arrays (one file because both lists use many of same columns)

import { CustReqViews,  } from './viewsCustReq';  //Import view arrays for Project list

import { IMyProgress, IUser } from '../../IReUsableInterfaces';

import { IMakeThisList, provisionTheList  } from '../component/provisionWebPartList';

import { IDefinedLists } from '../component/provisionListComponent';
// definedList: 'PreConfig',

import { defineTheListMaster } from '../component/provisionWebPartList';

export type IValidTemplate = 100 | 101;

import { cleanURL, camelize, cleanSPListURL } from '@mikezimm/npmfunctions/dist/stringServices';

//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: ICustReqDefs , webURL: string, currentUser:  number[], pageURL: string ) {


    let makeThisList:  IMakeThisList = defineTheListMaster(template, listTitle,listDefinition,webURL,pageURL, 'Customer Requirements');

    //'Program' | 'SORInfo' | 'WithStatus';
//    if ( listDefinition !== 'Program' ) {
        makeThisList.createTheseFields = CustReqFields(listDefinition);
        makeThisList.createTheseViews = CustReqViews(listDefinition);
        makeThisList.createTheseItems = [] ; // = TMTDefaultProjectItems;
        makeThisList.autoItemCreate = true;
//        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';


//    } else if ( listDefinition === 'SORInfo' ) {
//        makeThisList.createTheseFields = CustReqFields(listDefinition);
//        makeThisList.createTheseViews = CustReqViews;
        makeThisList.createTheseItems = [] ;// =  TMTTestTimeItems(currentUser);
//        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
//    }

    //let listResult = await provisionTheList( makeThisList, setProgress );

    return makeThisList;

}

