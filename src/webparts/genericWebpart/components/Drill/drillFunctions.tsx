import { Web, IList, IItem } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { IDrillItemInfo, IDrillList, pivCats } from  './drillComponent';

import { changes, IMyFieldTypes } from '../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../services/listServices/listServices';

import { makeSmallTimeObject, makeTheTimeObject,ITheTime, getAge, getBestTimeDelta, isStringValidDate} from '../../../../services/dateServices';

import { doesObjectExistInArray, addItemToArrayIfItDoesNotExist } from '../../../../services/arrayServices';

import { getHelpfullError } from '../../../../services/ErrorHandler';

import { IViewLog, addTheseViews } from '../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { IRefiners, IRefinerLayer, IItemRefiners, RefineRuleValues } from '../IReUsableInterfaces';

export async function getAllItems( drillList: IDrillList, addTheseItemsToState: any, setProgress: any, markComplete: any ): Promise<IDrillItemInfo[]>{

    let allRefiners : IRefiners = null;

    //lists.getById(listGUID).webs.orderBy("Title", true).get().then(function(result) {
    //let allItems : IDrillItemInfo[] = await sp.web.webs.get();

    let thisListObject = null;

    let allItems : IDrillItemInfo[] = [];
    let errMessage = '';
    try {
        thisListObject = Web(drillList.webURL);
        allItems = await thisListObject.lists.getByTitle(drillList.name).items.orderBy('ID',false).top(300).get();
    
    } catch (e) {
        errMessage = getHelpfullError(e, true, true);

    }

    let thisIsNow = new Date().toLocaleString();

    for (let i in allItems ) {

        allItems[i].timeCreated = makeTheTimeObject(allItems[i].Created);
        allItems[i].timeModified = makeTheTimeObject(allItems[i].Modified);

        allItems[i].bestCreate = getBestTimeDelta(allItems[i].Created, thisIsNow);
        allItems[i].bestMod = getBestTimeDelta(allItems[i].Modified, thisIsNow);

        allItems[i].refiners = getItemRefiners( drillList, allItems[i] );

        allItems[i].meta = buildMetaFromItem(allItems[i]);
        allItems[i].searchString = buildSearchStringFromItem(allItems[i]);

    }

    if ( errMessage === '' && allItems.length === 0 ) { 
        errMessage = 'This site/web does not have any subsites that you can see.';
     }
    
    console.log('drillList.refiners =', drillList.refiners );
    for ( let i = 0 ; i < 5000 ; i++ ) {
        allRefiners = buildRefinersObject( allItems );
        console.log(i);
    }

    console.log('Pre-Sort: getAllItems', allRefiners);

    allRefiners = sortRefinerObject(allRefiners);

    console.log('Post-Sort: getAllItems', allRefiners);

    addTheseItemsToState(allItems, errMessage, allRefiners );
    return allItems;

}

function sortRefinerObject ( allRefiners: IRefiners ) {

    //webPartDefs.sort((a, b) => (a.alias > b.alias) ? 1 : -1);
    allRefiners.childrenKeys.sort();
    allRefiners.childrenObjs.sort((a, b) => (a.thisKey > b.thisKey) ? 1 : -1);
    allRefiners.childrenObjs = sortRefinerLayer( allRefiners.childrenObjs );

    return allRefiners;

}

function sortRefinerLayer ( allRefiners: IRefinerLayer[] ) {

    for ( let r in allRefiners ) { //Go through all list items
        allRefiners[r].childrenKeys.sort();
        allRefiners[r].childrenObjs.sort((a, b) => (a.thisKey > b.thisKey) ? 1 : -1);
        allRefiners[r].childrenObjs = sortRefinerLayer( allRefiners[r].childrenObjs );
    }

    return allRefiners;
}

function createNewRefinerLayer( thisKey: string) {
    let newRefiner : IRefinerLayer = {
        multiCount: 0,
        itemCount: 0,
        thisKey: thisKey,
        childrenKeys: [],
        childrenObjs: [],
    };
    return newRefiner;
}

export function buildRefinersObject ( items: IDrillItemInfo[] ) {

    let refiners : IRefiners = {
        multiCount: 0,
        itemCount: 0,
        childrenKeys: [],
        childrenObjs: [],
    };

    //Go through all items
    for ( let i of items ) { //Go through all list items
        if ( i.refiners ) { //If Item has refiners (all should)

            //Do just level 1
            let thisRefinerValuesLev0 = i.refiners['lev' + 0];

            //  const found = arr1.some(r=> arr2.indexOf(r) >= 0)     https://stackoverflow.com/a/39893636  

            //Go through each array of refiners... 
            for ( let r0 in thisRefinerValuesLev0 ) { //Go through all list items

                let thisRefiner0 = thisRefinerValuesLev0[r0];
                let topKey0 = refiners.childrenKeys.indexOf( thisRefiner0 );

                if ( topKey0 < 0 ) { //Add to topKeys and create keys child object
                    refiners.childrenKeys.push( thisRefiner0 );
                    refiners.childrenObjs.push( createNewRefinerLayer (thisRefiner0) );
                    topKey0 = refiners.childrenKeys.length -1;
                }
                refiners.multiCount ++;
                if ( r0 == '0') { refiners.itemCount ++; }

                let thisRefinerValuesLev1 = i.refiners['lev' + 1];

                //  const found = arr1.some(r=> arr2.indexOf(r) >= 0)     https://stackoverflow.com/a/39893636  

                //Go through each array of refiners... 
                for ( let r1 in thisRefinerValuesLev1 ) { //Go through all list items

                    let thisRefiner1 = thisRefinerValuesLev1[r1];
                    let refiners1 = refiners.childrenObjs[topKey0];
                    let topKey1 = refiners1.childrenKeys.indexOf( thisRefiner1 );

                    if ( topKey1 < 0 ) { //Add to topKeys and create keys child object
                        refiners1.childrenKeys.push( thisRefiner1 );
                        refiners1.childrenObjs.push( createNewRefinerLayer (thisRefiner1 ) );
                        topKey1 = refiners1.childrenKeys.length -1;
                    }
                    refiners1.multiCount ++;
                    if ( r1 == '0') { refiners1.itemCount ++; }

                    let thisRefinerValuesLev2 = i.refiners['lev' + 2];

                    //  const found = arr1.some(r=> arr2.indexOf(r) >= 0)     https://stackoverflow.com/a/39893636  
    
                    //Go through each array of refiners... 
                    for ( let r2 in thisRefinerValuesLev2 ) { //Go through all list items
    
                        let thisRefiner2 = thisRefinerValuesLev2[r2];
                        let refiners2 = refiners1.childrenObjs[topKey1];
                        let topKey2 = refiners2.childrenKeys.indexOf( thisRefiner2 );
    
                        if ( topKey2 < 0 ) { //Add to topKeys and create keys child object
                            refiners2.childrenKeys.push( thisRefiner2 );
                            refiners2.childrenObjs.push( createNewRefinerLayer (thisRefiner2) );
                            topKey2 = refiners2.childrenKeys.length -1;
                        }
                        refiners2.multiCount ++;
                        if ( r2 == '0') { refiners2.itemCount ++; }
                        //now with topKey values, do second layer
                    }

                    //now with topKey values, do second layer
                }

                //now with topKey values, do second layer
            }


        }
    }

    return refiners;

}

export function getItemRefiners( drillList: IDrillList, item: IDrillItemInfo ) {
    let refiners = drillList.refiners;
    let result : IItemRefiners = {
        lev0: [],
        lev1: [],
        lev2: [],
    };

    if ( refiners && refiners.length > 0 ) {
        let x = 0;
        let i = 0;
        let allRules = drillList.refinerRules;
        for ( let r of refiners ) {
            if ( r != null ) {
                let thisRuleSet : any = allRules[i];
                let fieldValue = item[r];
                result['lev' + i] = getRefinerFromField( fieldValue , thisRuleSet , drillList.emptyRefiner );
            }
            i++;
        }
    }

    return result;
}

function getRefinerFromField ( fieldValue : any, ruleSet: RefineRuleValues[], emptyRefiner: string ) {

    let result : any[] = [];

    // Basic types copied from:  https://www.w3schools.com/js/tryit.asp?filename=tryjs_typeof_all
    let fieldType = typeof fieldValue;

    if ( fieldValue === null || fieldValue === undefined || fieldType === 'function' ){
        result = [emptyRefiner];

    } else if ( fieldType === 'string' ){

        if ( isNaN(fieldValue) ) { //This is a string or date string

            //If it's a string, then test if it's a date, return the best date in an array.   Object.prototype.toString.call(date) === '[object Date]'  //https://stackoverflow.com/a/643827
            //As of 2020-09-01:  This does not accurately detect dates.

                    //parse by semiColon or comma if rule dictates
            if ( ruleSet.indexOf('parseBySemiColons')  > -1 && fieldValue.indexOf(';') > -1 ) {
                fieldValue = getRefinerFromField ( fieldValue.split(';') , ruleSet, emptyRefiner );

            } else if (ruleSet.indexOf('parseByCommas')  > -1 && fieldValue.indexOf(',') > -1 ) {
                fieldValue = getRefinerFromField ( fieldValue.split(',') , ruleSet, emptyRefiner );

            } else if ( isStringValidDate(fieldValue, 'common') ) {
                //This is a date!

                let tempDate = makeTheTimeObject( fieldValue );
                let reFormattedDate = null;
                // 'groupByDays' | 'groupByWeeks' |  'groupByMonths' |  'groupByYears' | 'groupByDayOfWeek' | 
                if ( ruleSet.indexOf('groupByDays') > -1 ) {
                    reFormattedDate = tempDate.dayYYYYMMDD;

                } else if ( ruleSet.indexOf('groupByWeeks') > -1 ) {
                    reFormattedDate = tempDate.year + '-'+ tempDate.isoWeek;

                } else if ( ruleSet.indexOf('groupByMonths') > -1 ) {
                    reFormattedDate = tempDate.year + '-'+ ("0" + (tempDate.month + 1)).slice(-2) ;

                } else if ( ruleSet.indexOf('groupByYears') > -1 ) {
                    reFormattedDate = tempDate.year;

                } else if ( ruleSet.indexOf('groupByDayOfWeek') > -1 ) {
                    reFormattedDate = tempDate.dayStr;

                } else if ( ruleSet.indexOf('groupByDateBuckets') > -1 ) {
                    if ( tempDate.daysAgo > 360 ) {
                        reFormattedDate = '\> 1 Year' ;

                    } else if ( tempDate.daysAgo > 30 ) {
                        reFormattedDate = '\> 1 Month' ;

                    } else if ( tempDate.daysAgo > 7 ) {
                        reFormattedDate = '\> 1 Week' ;

                    } else if ( tempDate.daysAgo > 1 ) {
                        reFormattedDate = '\> 1 Day' ;                       
                        
                    } else { reFormattedDate = 'Today' ; }

                } 

                result = [ reFormattedDate ];

            } else { // This should be a string
                result = [ fieldValue ];

            }

        } else { //Is a number, return as such
            result = [ fieldValue ];

        }      

    } else if ( fieldType === 'boolean' ){
        result = [ fieldValue ];

    } else if ( fieldType === 'number' ){
        result = [ fieldValue ];

    } else if ( fieldType === 'object' ){

        //If it's a multi-choice; return all choices in an array.
        if (Array.isArray(fieldValue)) {
            result = fieldValue ;

        //Else just stringify it
        } else {
            result = [ JSON.stringify(fieldValue) ];
        }
    
    }

    return result;

}

export function getBestFieldType ( item: any ) {

let thisType = 'unknown';




}



function buildMetaFromItem( theItem: IDrillItemInfo ) {
    let meta: string[] = ['All'];

    if ( theItem.timeCreated.daysAgo === 0 ) {
        meta = addItemToArrayIfItDoesNotExist(meta, 'New');
    } else {
        meta = theItem.timeCreated.daysAgo < 180 ? addItemToArrayIfItDoesNotExist(meta, 'RecentlyCreated') : addItemToArrayIfItDoesNotExist(meta, 'Old');
    }

    meta = theItem.timeModified.daysAgo < 180 ? addItemToArrayIfItDoesNotExist(meta, 'RecentlyUpdated') : addItemToArrayIfItDoesNotExist(meta, 'Stale');

    for ( let L of Object.keys(theItem.refiners) ) {
        for ( let R in theItem.refiners[L] ) {
            meta = addItemToArrayIfItDoesNotExist(meta, theItem.refiners[L][R]);
        }
    }

    meta = addItemToArrayIfItDoesNotExist(meta, theItem.sort );

    return meta;
}

function buildSearchStringFromItem (newItem : IDrillItemInfo) {

    let result = '';
    let delim = '|||';

    if ( newItem.Title ) { result += 'Title=' + newItem.Title + delim ; }

    if ( newItem.Id ) { result += 'Id=' + newItem.Id + delim ; }

    if ( newItem['odata.type'] ) { result += newItem['odata.type'] + delim ; }

    if ( newItem.meta.length > 0 ) { result += 'Meta=' + newItem.meta.join(',') + delim ; }

    result = result.toLowerCase();

    return result;

}