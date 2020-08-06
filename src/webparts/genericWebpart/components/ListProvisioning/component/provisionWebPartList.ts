import { Web } from "@pnp/sp/presets/all";

import { IListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';

export type IValidTemplate = 100 | 101;

export interface IMakeThisList {

    title: string;
    name: string;
    webURL: string;
    listURL: string;
    desc: string;
    template: IValidTemplate;
    enableContentTypes: boolean;
    additionalSettings: { 
        EnableVersioning: boolean;
        MajorVersionLimit: number;
        OnQuickLaunch: boolean;
     };
    createTheseFields: IMyFieldTypes[];
    createTheseViews: IMyView[];
    createTheseItems: IAnyArray;
    autoItemCreate: boolean;
    alternateItemCreateMessage?: string;
    confirmed: boolean;
    onCurrentSite: boolean;
    webExists: boolean;
    listExists: boolean;

}
export async function provisionTheList( makeThisList:  IMakeThisList, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{

    let statusLog : IServiceLog[] = [];
    let alertMe = false;
    let consoleLog = false;

    let createItems: boolean = false;

    if ( readOnly === false  ) {
        if ( makeThisList.autoItemCreate === true ) {
            createItems = true;
        } else {
            //let confirmItems = confirm("We created your list, do you want us to create some sample Time entries so you can see how it looks?")
            if (confirm("Do you want us to: \n\nCreate some sample list items \n\nso you can see how it looks?")) {
                //You pressed Ok, add items
                createItems = true;
            }
        }
    }

    let fieldsToGet = makeThisList.createTheseFields.map ( thisField => {
        return thisField.name;
    });

    let fieldFilter = "StaticName eq '" + fieldsToGet.join("' or StaticName eq '") + "'";

    console.log('fieldFilter:', fieldFilter);

    const thisWeb = Web(makeThisList.webURL);

    let ensuredList = null;
    let listFields = null;
    let listViews = null;
    let currentFields = null;
    let currentViews = null;

    if ( readOnly === false ) {
        ensuredList = await thisWeb.lists.ensure(makeThisList.title);
        console.log('ensuredList:', readOnly, ensuredList );
        listFields = ensuredList.list.fields;   //Get the fields object from the list
        listViews = ensuredList.list.views;     //Get the views object from the list

        currentFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter(fieldFilter).get();
        currentViews = await listViews.get();
        
        console.log('currentFields:', readOnly, currentFields );
        console.log('currentViews:', readOnly, currentViews );

    } else {
        ensuredList = await thisWeb.lists.getByTitle(makeThisList.title);
        console.log('ensuredList:', readOnly, ensuredList );
        currentFields = await ensuredList.fields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter(fieldFilter).get();
        currentViews = await ensuredList.views.get();
        console.log('currentFields:', readOnly, currentFields );
        console.log('currentViews:', readOnly, currentViews );
    }


    console.log(makeThisList.title + ' list fields and views', currentFields, currentViews);

    let result = await addTheseFields(['create','changesFinal'], readOnly, makeThisList, ensuredList, currentFields, makeThisList.createTheseFields, setProgress, alertMe, consoleLog );

    let result2 = await addTheseViews(['create'], readOnly, makeThisList, ensuredList, currentViews, makeThisList.createTheseViews, setProgress, alertMe, consoleLog);

    let result3 = null;

    if ( createItems === true && readOnly === false ) {

        setProgress(false, "I", 0, 0 , '', '', makeThisList.title, 'Adding ITEMS to list: ' + makeThisList.title, 'Checking for ITEMS', 'Add items ~ 101' );
        let createThisBatch : IAnyArray = [];
        //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
        let totalItems = makeThisList.createTheseItems.length;
        let chunk = 3;

        if ( totalItems <= 50 ) {
            result3 = await addTheseItemsToList(makeThisList, thisWeb, makeThisList.createTheseItems, setProgress, true, true);
        } else {
            for (var i=0; i < totalItems; i += chunk) {
                createThisBatch = makeThisList.createTheseItems.slice(i, i+chunk);
                result3 = await addTheseItemsToListInBatch(makeThisList, thisWeb, createThisBatch, setProgress, true, true);
            }
        }
    }
    
    if ( readOnly === true  ) {
        alert( 'Your list has been checked... scroll down to see the results :)' );

    } else if ( makeThisList.alternateItemCreateMessage ) {
        alert( makeThisList.alternateItemCreateMessage );

    } else {
        alert(`Your  list is all ready to go!`);
    }

    markComplete();

    return statusLog;

}
