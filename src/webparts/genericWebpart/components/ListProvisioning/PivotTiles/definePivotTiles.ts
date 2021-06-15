
import { PivotTilesFields } from './columnsPivotTiles'; //Import column arrays (one file because both lists use many of same columns)

import { pivotViews} from './viewsPivotTiles';  //Import view arrays for Project list

import { IMakeThisList, provisionTheList,  } from '../component/provisionWebPartList';

export type IValidTemplate = 100 | 101;

import { defineTheListMaster } from '../component/provisionWebPartList';
import { getFieldNamesFromArray, getViewTitlesFromArray } from '../component/provisionFunctions';

export type IListDefintionPivot = 'OurTiles' | 'PivotTiles';

//export async function provisionTheListLoader( template: IValidTemplate , listTitle : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
export function defineTheList ( template: IValidTemplate , listTitle : string, listDefinition: IListDefintionPivot , webURL: string, currentUser:  number[], pageURL: string ) {

    let makeThisList:  IMakeThisList = defineTheListMaster(template, listTitle,listDefinition,webURL,pageURL, 'PivotTiles');

    if ( listDefinition === 'PivotTiles' ) {
        makeThisList.createTheseFields = PivotTilesFields();
        makeThisList.createTheseViews = pivotViews;
        makeThisList.createTheseItems = [] ;// = TMTDefaultProjectItems;
        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';


    } else if ( listDefinition === 'OurTiles' ) {
        makeThisList.createTheseFields = PivotTilesFields();
        makeThisList.createTheseViews = pivotViews;
        makeThisList.createTheseItems = [] ;// =  TMTTestTimeItems(currentUser);
        makeThisList.autoItemCreate = false;
//        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
    }

    //let listResult = await provisionTheList( makeThisList, setProgress );
    if ( makeThisList.templateDesc === null ) { 
        makeThisList.templateDesc = `Adds ${listDefinition} related views (${makeThisList.createTheseViews.length}) and fields (${makeThisList.createTheseFields.length}) to your list.`;}

    makeThisList.templateDetails = `Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }\nViews include:${ getViewTitlesFromArray(makeThisList.createTheseViews).join(', ') }` ;
    return makeThisList;

}

