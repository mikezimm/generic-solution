import { Web } from "@pnp/sp/presets/all";

import { IListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';

import { IDefinedLists } from './provisionListComponent';

import { IMyProgress, IUser } from '../../IReUsableInterfaces';

export type IValidTemplate = 100 | 101;

export interface IMakeThisList {

    title: string;
    name: string;
    webURL: string;
    listURL: string;
    desc: string;
    template: IValidTemplate;  // listURL, template
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
    listExistedB4: boolean;
    existingTemplate: number;
    sameTemplate: boolean;
    listDefinition: string;
    definedList: IDefinedLists;
    validUserIds?: number[];

}
export async function provisionTheList( makeThisList:  IMakeThisList, readOnly: boolean, setProgress: any, markComplete: any, doFields: boolean, doViews: boolean, doItems: boolean, requireAll: boolean = true ): Promise<IServiceLog[]>{

    let statusLog : IServiceLog[] = [];
    let alertMe = false;
    let consoleLog = false;

    let createItems: boolean = false;
    let hasFields: boolean = false;
    let hasViews: boolean = false;
    let errMess= '';


    if ( makeThisList.createTheseFields === null || makeThisList.createTheseFields === undefined  ) {
        hasFields = false; errMess += 'List defintion does not have any FIELDS (createTheseFields) defined.' ; }
    else if (  makeThisList.createTheseFields.length > 0 ) {
        hasFields = true; } else { errMess += 'List defintion does not have any FIELDS defined.' ; }

    if ( makeThisList.createTheseViews === null || makeThisList.createTheseViews === undefined  ) {
        hasViews = false;  errMess += 'List defintion does not have any VIEWS (createTheseViews) defined.' ; }
    else if ( makeThisList.createTheseViews.length > 0  ) {
        hasViews = true; } else {  errMess += 'List defintion does not have any VIEWS defined.' ; }


    if ( ( hasViews === false && doViews === true ) || ( hasFields === false && doFields === true ) ) {

        if ( requireAll === true ) {
            alert( errMess );
            return statusLog;
        } else { console.log( 'provisionTheList', errMess) ; }

    }

    if ( readOnly === false  ) {
        //if ( makeThisList.autoItemCreate === true ) {
            createItems = true;
        /*
        } else {
            //let confirmItems = confirm("We created your list, do you want us to create some sample Time entries so you can see how it looks?")
            if (confirm("Do you want us to: \n\nCreate some sample list items \n\nso you can see how it looks?")) {
                //You pressed Ok, add items
                createItems = true;
            }
        */
        //}
    }

    if ( makeThisList.createTheseItems == null || makeThisList.createTheseItems == undefined ) { createItems = false; }
    if ( createItems === true && makeThisList.createTheseItems.length === 0 ) { createItems = false; } 

    let fieldsToGet = makeThisList.createTheseFields.map ( thisField => {
        return thisField.name;
    });

    let fieldFilter = "StaticName eq '" + fieldsToGet.join("' or StaticName eq '") + "'";

    let arrFieldFilter = [''];
    let fieldFilterIndex = 0;
    let fieldFilterLength = 0;

    /*    */
    fieldsToGet.map( ( f, idx ) => {

        fieldFilterLength = arrFieldFilter.length === 0 ? 0 : arrFieldFilter[ fieldFilterIndex ].length;

        if ( fieldFilterLength > 1000 ) {

            //Remove extra "or StaticName eq" from end before moving on to next one
            let lastStatNameIdx = arrFieldFilter[ fieldFilterIndex ].lastIndexOf('\' or StaticName eq \'');
            //arrFieldFilter[ fieldFilterIndex ] = arrFieldFilter[ fieldFilterIndex ].substring(0,lastStatNameIdx + 1);

            fieldFilterIndex ++ ;
            fieldFilterLength = 0 ;
            arrFieldFilter.push('') ;

        }

        //let suffix =  fieldsToGet[ idx + 1 ] ? "' or StaticName eq '" : '';
        let suffix =  "' or StaticName eq '";
        arrFieldFilter[ fieldFilterIndex ] += f + suffix;

    });

    arrFieldFilter.map( (f, idx) => {
        arrFieldFilter[idx]= "StaticName eq '" + arrFieldFilter[idx] ;
        //Remove extra "or StaticName eq" from end before moving on to next one
        let lastStatNameIdx = arrFieldFilter[idx].lastIndexOf('\' or StaticName eq \'') ;
        arrFieldFilter[idx] = arrFieldFilter[idx].substring(0,lastStatNameIdx) + "\'" ;
    });

    console.log('arrFieldFilter:', arrFieldFilter);


    const thisWeb = Web(makeThisList.webURL);

    let ensuredList = null;
    let listFields = null;
    let listViews = null;
    let currentFields = [];
    let currentViews = null;

    if ( readOnly === false ) {
        if (makeThisList.template === 100 ) {
            ensuredList = await thisWeb.lists.ensure(makeThisList.title, makeThisList.desc, makeThisList.template, true, makeThisList.additionalSettings );
            listFields = ensuredList.list.fields;   //Get the fields object from the list
            listViews = ensuredList.list.views;     //Get the views object from the list
        } else {
            if ( makeThisList.listExists === true ) {
                ensuredList = await thisWeb.lists.getByTitle(makeThisList.title);
                listFields = ensuredList.fields;   //Get the fields object from the list
                listViews = ensuredList.views;     //Get the views object from the list
            } else {
                ensuredList = await thisWeb.lists.add(makeThisList.title, makeThisList.desc, makeThisList.template, true, { OnQuickLaunch: true });
                listFields = ensuredList.list.fields;   //Get the fields object from the list
                listViews = ensuredList.list.views;     //Get the views object from the list               
            }

        }

        console.log('ensuredList:', readOnly, ensuredList );

/*
        if ( arrFieldFilter.length > 0 ) {
            let theseFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter( arrFieldFilter[0] ).get() ;
            console.log('theseFields', theseFields ) ;
            let prevFields = currentFields;
            currentFields = prevFields.concat(theseFields);
        }
        if ( arrFieldFilter.length > 1 ) {
            let theseFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter( arrFieldFilter[1] ).get() ;
            let prevFields = currentFields;
            currentFields = prevFields.concat(theseFields);
        }
        if ( arrFieldFilter.length > 2 ) {
            let theseFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter( arrFieldFilter[2] ).get() ;
            let prevFields = currentFields;
            currentFields = prevFields.concat(theseFields);
        }
        if ( arrFieldFilter.length > 3 ) {
            let theseFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter( arrFieldFilter[3] ).get() ;
            let prevFields = currentFields;
            currentFields = prevFields.concat(theseFields);
        }
        if ( arrFieldFilter.length > 4 ) {
            let theseFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter( arrFieldFilter[4] ).get() ;
            let prevFields = currentFields;
            currentFields = prevFields.concat(theseFields);
        }
*/

//        currentFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter( arrFieldFilter[0] ).get() ;

        for (var i1=0; i1 < arrFieldFilter.length; i1 ++ ) {
            let theseFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter( arrFieldFilter[i1] ).get() ;
            console.log('currentFields:', currentFields );
            console.log('theseFields:', theseFields );     
            
            theseFields.map( f=>{ currentFields.push( f ) ; });
            //let prevFields = currentFields;
            //currentFields = prevFields.concat(theseFields);
        }

        currentViews = await listViews.get();
        
        console.log('currentFields:', readOnly, currentFields );
        console.log('currentViews:', readOnly, currentViews );

    } else {
        ensuredList = await thisWeb.lists.getByTitle(makeThisList.title);
        console.log('ensuredList:', readOnly, ensuredList );

        for (var i2=0; i2 < arrFieldFilter.length; i2 ++ ) {
            let theseFields = await ensuredList.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter( arrFieldFilter[i2] ).get() ;
            console.log('currentFields:', currentFields );
            console.log('theseFields:', theseFields );       

            theseFields.map( f=>{ currentFields.push( f ) ; });
            //let prevFields = currentFields;
            //currentFields = prevFields.concat(theseFields);
        }

        console.log( 'currentFields', currentFields );
        
//        currentFields = await ensuredList.fields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter(fieldFilter).get();

        currentViews = await ensuredList.views.get();
        console.log('currentFields:', readOnly, currentFields );
        console.log('currentViews:', readOnly, currentViews );
    }


    console.log(makeThisList.title + ' list fields and views', currentFields, currentViews);

    if ( doFields === true ) {
        let result = await addTheseFields(['create','changesFinal'], readOnly, makeThisList, ensuredList, currentFields, makeThisList.createTheseFields, setProgress, alertMe, consoleLog );
    } else { console.log('Skipping doFields') ; }

    if ( doViews === true ) {
        let result2 = await addTheseViews( makeThisList.listExistedB4 , readOnly, makeThisList, ensuredList, currentViews, makeThisList.createTheseViews, setProgress, alertMe, consoleLog);
    } else { console.log('Skipping doViews') ; }


    let result3 = null;

    if ( doItems === true && createItems === true && readOnly === false ) {

        //setProgress(false, "I", 0, 0 , '', 'TimePicker', makeThisList.title, 'Adding ITEMS to list: ' + makeThisList.title, 'Checking for ITEMS', 'Add items ~ 112' );
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

    } else if ( doItems === true && createItems === true && makeThisList.alternateItemCreateMessage ) {
        alert( makeThisList.alternateItemCreateMessage );

    } else {
        alert(`Your  list is all ready to go!`);
    }

    markComplete();

    return statusLog;

}

import { cleanURL, camelize, cleanSPListURL } from '@mikezimm/npmfunctions/dist/stringServices';

export function defineTheListMaster ( template: IValidTemplate , listTitle : string, listDefinition: string , webURL: string, pageURL: string, definedList: IDefinedLists ) {

    //Sometimes the webURL is undefined  (when props are empty)
    pageURL = pageURL.toLowerCase();
    if ( webURL ) {
        let webLastIndexOf = webURL.lastIndexOf('/');
        if ( webURL.length > 0 && webLastIndexOf != webURL.length -1 ) { webURL += '/'; }
    }
    if ( pageURL.length > 0 && pageURL.lastIndexOf('/') != pageURL.length -1 ) { pageURL += '/'; }

    let isListOnThisWeb = false;

    if ( webURL === '' ) {
        isListOnThisWeb = true;

    } else if ( webURL === undefined ) {
        isListOnThisWeb = true;

    } else if ( pageURL === webURL ) {
        isListOnThisWeb = true;
    }

    webURL = webURL.replace('_layouts/15/','');  //Remove all the workbench urls

    let listName = cleanSPListURL(camelize(listTitle, true));
    let makeThisList:  IMakeThisList = {

        definedList: definedList,
        title: listTitle,
        name: listName,
        webURL: webURL,
        desc: listTitle + ' list for this Webpart',
        template: template,
        enableContentTypes: true,
        additionalSettings: {
            EnableVersioning: true,
            MajorVersionLimit: 50,
            OnQuickLaunch: true,
         },
        createTheseFields: null,
        createTheseViews: null,
        createTheseItems: null,
        autoItemCreate: false,
        listURL: webURL + ( template === 100 ? 'lists/' : '') + listName,
        confirmed: false,
        onCurrentSite: isListOnThisWeb,
        webExists: false,
        listExists: false,
        listExistedB4: false,
        existingTemplate: null,
        sameTemplate: false,
        listDefinition: listDefinition,

    };

    //let listResult = await provisionTheList( makeThisList, setProgress );

    return makeThisList;

}