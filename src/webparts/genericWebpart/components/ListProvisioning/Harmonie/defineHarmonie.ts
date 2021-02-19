
import { HarmonieEmailFields } from './columnsHarmonie'; //Import column arrays (one file because both lists use many of same columns)

import { HarmonieViews, BUHarmonieViews } from './viewsHarmonie';  //Import view arrays for Project list

import { IMyProgress, IUser } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import { IMakeThisList, provisionTheList  } from '../component/provisionWebPartList';

import { IDefinedLists } from '../component/provisionListComponent';
// definedList: 'PreConfig',

export type IValidTemplate = 100 | 101;

import { cleanURL, camelize, cleanSPListURL } from '@mikezimm/npmfunctions/dist/stringServices';

import { defineTheListMaster } from '../component/provisionWebPartList';

//export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: 'Emails' | 'BUEmails' , webURL: string, currentUser: number[], pageURL: string ) {

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

    return makeThisList;

}

