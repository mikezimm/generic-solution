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

export interface IListLog extends IServiceLog {
    list?: string;
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
export async function addTheseItemsToList( myList: IMyListInfo, thisWeb, ItemsToAdd: any[], setProgress: any, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IListLog[]>{

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

    setProgress(false, "I", 0, 0 , '', '', myList.title, 'Adding ITEMS to list: ' + myList.title, 'Checking for ITEMS' );

    let list = thisWeb.lists.getByTitle(myList.title);
    const entityTypeFullName = await list.getListItemEntityTypeFullName();

    let batch = thisWeb.createBatch();

    let i = 0;
    let n = ItemsToAdd.length;

    for (let item of ItemsToAdd) {
    //, Category1: { results: ['Training']}
        let thisItem = stringifyKeyValue(item, 0, '===');
        //let checkValue = thisItem;
        // Removed try/catch per https://github.com/pnp/pnpjs/issues/1275#issuecomment-658578589
        list.items.inBatch(batch).add( item , entityTypeFullName).then(b => {
            statusLog = notify(statusLog, 'Created Item', 'Batched', null, null, null, thisItem );
            setProgress(false, "I", i, n , '', '', item[0], 'Batching Items: ' + myList.title, 'Batching Item ' + i + ' of ' + n + ' ' + item[0], 'Add item ~ 75');
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
        } else {
            let err = errMessage;
            statusLog = notify(statusLog, 'Problem processing Batch', err, null, null, null, null);
        }
    }

    let result : ICompareResult = compareArrays(statusLog, ItemsToAdd, 'ReturnNOTFound', 'checkValue','===', 'Both');

    return statusLog;
}

