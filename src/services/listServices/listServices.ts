//  >>>> ADD import additional controls/components
import { Web } from "@pnp/sp/presets/all";

import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField, IFields,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties, } from "@pnp/sp/fields/types";

import { IItemAddResult } from "@pnp/sp/items";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField ,
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField ,
    IMultiChoiceField , IDepLookupField , ILocationField } from './columnTypes';

import { MyFieldDef, changes, cBool, cCalcT, cCalcN, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
    cMText, cText, cNumb, cURL, cUser, cMUser } from './columnTypes';

import { doesObjectExistInArray, compareArrays, ICompareResult, stringifyKeyValue } from '../arrayServices';

import { IListInfo, IMyListInfo, IServiceLog, notify } from './listTypes';

import { getHelpfullError } from '../ErrorHandler';

import "@pnp/sp/webs";
import "@pnp/sp/lists";

export type IAnyArray = any[];

export interface IListLog extends IServiceLog {
    list?: string;
}


export async function addTheseItemsToList( myList: IMyListInfo, thisWeb, ItemsToAdd: any[], setProgress: any, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IListLog[]>{
    let statusLog : IListLog[] = [];

    setProgress(false, "I", 0, 0 , '', 'TimePicker', myList.title, 'Adding ITEMS to list: ' + myList.title, 'Checking for ITEMS', 'Add items ~ 38' );
    let createThisBatch : IAnyArray = [];
    //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
    let totalItems = ItemsToAdd.length;
    let chunk = 10;
    let result3 = [];

    if ( totalItems <= 50 ) {
        result3 = await addTheseItemsToListNoBatch(myList, thisWeb, ItemsToAdd, setProgress, true, true);
    } else {
        for (var i=0; i < totalItems; i += chunk) {
            createThisBatch = ItemsToAdd.slice(i, i+chunk);
            result3 = await addTheseItemsToListInBatch(myList, thisWeb, createThisBatch, setProgress, true, true);
        }
    }

    return result3;

}



export async function addTheseItemsToListNoBatch( myList: IMyListInfo, thisWeb, ItemsToAdd: any[], setProgress: any, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IListLog[]>{

    let statusLog : IListLog[] = [];
    console.log('Starting addTheseItemsToList', ItemsToAdd);

    
      /**
    * @param progressHidden 
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in list
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
   */

    let list = thisWeb.lists.getByTitle(myList.title);
    const entityTypeFullName = await list.getListItemEntityTypeFullName();

    let i = 0;

    //let createThisBatch : IAnyArray = [];
    //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
    let totalItems = ItemsToAdd.length;

    for (let item of ItemsToAdd) {
    //, Category1: { results: ['Training']}
        let thisItem = stringifyKeyValue(item, 0, '===');
        i ++;
        if ( !item.Title ) { item.Title = 'Unknown error'; }
        try {
            delete item.compareArrays;
            await list.items.add( item , entityTypeFullName).then(b => {
                statusLog = notify(statusLog, 'Created Item', 'No-batch', null, null, null, thisItem );
                setProgress(false, "I", i, totalItems , 'darkgreen', 'CheckMark',  item.Title, 'Items: ' + myList.title, 'Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 95');
            });

        } catch (e) {
            let errMessage = getHelpfullError(e, alertMe, consoleLog);

            let missingColumn = false;
            if ( errMessage.indexOf('missing a column') > -1 ) { missingColumn = true; }
            if ( errMessage.indexOf('does not exist on list') > -1 ) { missingColumn = true; }
            if ( errMessage.indexOf('does not exist on type') > -1 ) { missingColumn = true; }

            if ( missingColumn ) {
                let err = `The ${myList.title} list does not have a column yet:  ${thisItem}`;
                statusLog = notify(statusLog, 'Created Item', err, null, null, null, null);
                setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title + ' Missing column', 'Items: ' + myList.title, 'Adding Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 109\n' + err);
            } else {
                let err = errMessage;
                statusLog = notify(statusLog, 'Problem processing item', err, null, null, null, null);
                setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title, 'Items: ' + myList.title, 'Adding Item ' + i + ' of ' + totalItems + '  item', 'Add item ~ 113 + \n' + err);
            }
        }

    }

    return statusLog;
}






/**
 * 
 * @param myList 
 * @param ensuredList 
 * @param ItemsToAdd - array of items to add to the list
 * @param alertMe 
 * @param consoleLog 
 * @param alwaysCreateNew - currently no functionality to use this but long term intent would be to check if item exists first, then only add if it does not exist.
 */

export async function addTheseItemsToListInBatch( myList: IMyListInfo, thisWeb, ItemsToAdd: any[], setProgress: any, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IListLog[]>{

    let statusLog : IListLog[] = [];
    console.log('Starting addTheseItemsToList', ItemsToAdd);

    
      /**
    * @param progressHidden 
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in list
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
   */

    let list = thisWeb.lists.getByTitle(myList.title);
    const entityTypeFullName = await list.getListItemEntityTypeFullName();

    let batch = thisWeb.createBatch();

    let i = 0;
    let n = ItemsToAdd.length;

    for (let item of ItemsToAdd) {
    //, Category1: { results: ['Training']}
        let thisItem = stringifyKeyValue(item, 0, '===');
        i ++;
        //let checkValue = thisItem;
        // Removed try/catch per https://github.com/pnp/pnpjs/issues/1275#issuecomment-658578589
        await list.items.inBatch(batch).add( item , entityTypeFullName).then(b => {
            statusLog = notify(statusLog, 'Created Item', 'Batched', null, null, null, thisItem );
            console.log('b', b, item);
            setProgress(false, "I", i, n , '', '', 'Item batch', 'Batching Items: ' + myList.title, 'Batching Item ' + i + ' of ' + n + ' item', 'Add item ~ 73');
        });
    }

    try {
        await batch.execute();

        // Have a way to check which items did not get added.

    } catch (e) {
        //ONLY SEEMS TO CATCH FIRST ERROR IN BATCH.
        //OTHER BATCH ITEMS GET PROCESSED BUT ONLY FLAGS FIRST ONE.
        //CONFIRMED LATER ITEMS IN ARRAY AFTER ERROR STILL GET PROCESSED, JUST NOT ERRORED OUT
        let errMessage = getHelpfullError(e, alertMe, consoleLog);
        if (errMessage.indexOf('missing a column') > -1) {
            let err = `The ${myList.title} list does not have XYZ or TBD yet:  ${'thisItem'}`;
            statusLog = notify(statusLog, 'Created Item', err, null, null, null, null);
            setProgress(false, "E", i, n , '', '', 'Missing column', 'Batching Items: ' + myList.title, 'Batching Item ' + i + ' of ' + n + ' item', 'Add item ~ 90+ \n' + err);
        } else {
            let err = errMessage;
            statusLog = notify(statusLog, 'Problem processing Batch', err, null, null, null, null);
            setProgress(false, "E", i, n , '', '', 'Missing column', 'Batching Items: ' + myList.title, 'Batching Item ' + i + ' of ' + n + '  item', 'Add item ~ 94+ \n' + err);
        }
    }

    let result : ICompareResult = compareArrays(statusLog, ItemsToAdd, 'ReturnNOTFound', 'checkValue','===', 'Both');

    return statusLog;
}

