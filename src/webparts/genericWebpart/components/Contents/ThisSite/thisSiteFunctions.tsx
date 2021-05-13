import { Web, IList, IWebInfo, IWeb } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";
import "@pnp/sp/sites";

import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsSiteInfo, ISitePropsBucketInfo } from  './thisSiteComponent';

import { makeSmallTimeObject, } from '@mikezimm/npmfunctions/dist/Services/Time/smallTimeObject';

import { doesObjectExistInArray, } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
import {  addItemToArrayIfItDoesNotExist } from '@mikezimm/npmfunctions/dist/Services/Arrays/manipulation';

import { buildMLineDiv } from '../../../../../services/stringFormatService';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { BasicProps, AdvProps, GraphProps, HubProps, NavProps, SPOProps, LegacyProps } from './thisSiteComponent';

import { pivCats } from './thisSiteComponent';

function getThisElement(K: string, val: any) {
    let result = null;
    let elements : string[] = [];
    if ( K === 'SiteLogoUrl') {
        let val2 : string = val;
        elements = val2.split('?');
        elements[0] += '?';
        result = elements.map( e => { return buildMLineDiv(0, e); });

    } else if ( K === 'CurrentChangeToken') {
        let val2 : string = JSON.stringify(val).replace(";",""); //Replace first semi-colon
        elements = val2.split(';');
        result = elements.map( e => { return buildMLineDiv(0, e); });

    } else if ( K = 'odata.metadata') {
        let val2 : string = val;
        elements = val2.split('$');
        elements[1] = '$' + elements[1];
        result = elements.map( e => { return buildMLineDiv(0, e); });

    } else if ( K = 'ResourcePath') {
        let val2 : string = val;
        elements = val2.split(':');
        elements[0] = elements[0] + ':' ;
        result = elements.map( e => { return buildMLineDiv(0, e); });

    } else if ( K === 'Created' || K === 'LastItemModifiedDate' || K === 'LastItemUserModifiedDate') {
        let thisTime = makeSmallTimeObject( val );
        result = val + ' ( ' + thisTime.dayDDDMMMDD + ' ) ' + thisTime.daysAgo.toString() + ' days ago';
    }

    return result;
}

//export async function provisionTestPage( makeThisPage:  IContentsSiteInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allSiteProps( webURL: string, propBuckets: ISitePropsBucketInfo[], addThesePropsToState: any, setProgress: any, markComplete: any ): Promise<IContentsSiteInfo[]>{

    let actualReturnObj = null;
    let allProps: IContentsSiteInfo[] = [];
    let addedKeys: string[] = [];

    let thisIsNow = new Date().toLocaleString();
    const thisWebObject = Web( webURL );
    
    let scope = '';
    let errMessage = '';

    let thisPropsObject = null;

        try {

            let rootWeb = await sp.site.getRootWeb();
            console.log( 'rootWeb:', rootWeb );
            let aOG = await rootWeb.associatedOwnerGroup.get();
            let aMG = await rootWeb.associatedMemberGroup.get();
            let aVG = await rootWeb.associatedVisitorGroup.get();
            let sFeatures = await rootWeb.features.get();
            let reg = await rootWeb.regionalSettings.get();
            let nav = await rootWeb.navigation.topNavigationBar.get();
            let nav2 = await rootWeb.navigation.quicklaunch.get();
            thisPropsObject = await rootWeb.allProperties();
            console.log( 'rootWeb All Props:', rootWeb );
            actualReturnObj = await thisPropsObject.get();
        
        } catch (e) {
            errMessage = getHelpfullError(e, true, true);
        }

        let allInfoKeys = actualReturnObj === null || actualReturnObj === undefined ? [] : Object.keys(actualReturnObj);
        
        //this.state.webBuckets.map( bucket => {
        allProps = allInfoKeys.map( thisKey => { 
    
            // Check if key has been added
            if ( addedKeys.indexOf(thisKey) >= 0 ) {
                return null;
    
            } else {
                let thisProp  = actualReturnObj[thisKey];
                let meta : string[] = buildMetaFromProp( thisKey );
    
                let idx = getPropsSort( thisProp , propBuckets);
                let bucketLabel = propBuckets[idx]['bucketLabel'];
                let bucketCategory = propBuckets[idx]['bucketCategory'];
                let sort = propBuckets[idx]['sort'];

                meta = addItemToArrayIfItDoesNotExist(meta, sort );
                meta = addItemToArrayIfItDoesNotExist(meta, bucketLabel );

                let result : IContentsSiteInfo = {
                    property : thisKey,
                    value: thisProp,
                    meta: meta,
                    element: getThisElement(thisKey,thisProp),
                    bucketIdx: idx,
                    bucketCategory: bucketCategory,
                    bucketLabel: bucketLabel,
                    searchString: '',
                    sort: sort,
                };

                result.searchString = buildSearchStringFromProp( result );
    
                return result;
    
            }
            // Check if key is in any of the designated arrays and not added, go ahead and add
    
            // If it's not in designated ones, add to "Other"
    
        });


    addThesePropsToState(allProps, scope, errMessage);
    return allProps;

}


function getPropsSort( theWeb: IContentsSiteInfo, propBuckets: ISitePropsBucketInfo[] ) {
/*
    { webs: [], count: 0, sort : '0' , bucketCategory: 'Custom' , bucketLabel: '0. User Content'} ,
    { webs: [], count: 0, sort : '6' , bucketCategory: 'OOTB', bucketLabel: '6. OOTB' } ,
    { webs: [], count: 0, sort : '9' , bucketCategory: 'System', bucketLabel: '9. System'} ,
*/

    let bucketCategory = 'All';

    /*
    if ( ootbWebs.indexOf( theWeb.StaticName ) > -1 ) {
        bucketCategory = 'OOTB';

    } else if ( SystemWebs.indexOf(theWeb.StaticName) > -1 ) {
        bucketCategory = 'System';

    } else if ( theWeb.CanBeDeleted === false ) {
        bucketCategory = 'System';

    } else if ( theWeb.ReadOnlyWeb === true ) {
        bucketCategory = 'ReadOnly';
        
    } else { bucketCategory = 'Custom'; }
*/

    let idx : any = doesObjectExistInArray(propBuckets, 'bucketCategory', bucketCategory ); 

    if ( idx === false ) { alert('getPropsSort issue... bucketCategory (' + bucketCategory + ')not found in propBuckets.'); idx = -1; }

    return idx;

}

function buildMetaFromProp( thisKey: string ) {

    let meta: string[] = [];

    if ( BasicProps.indexOf(thisKey) > -1 ) { meta = addItemToArrayIfItDoesNotExist(meta,'Basic'); }
    if ( AdvProps.indexOf(thisKey) > -1 ) { meta = addItemToArrayIfItDoesNotExist(meta,'Advanced'); }
    if ( GraphProps.indexOf(thisKey) > -1 ) { meta = addItemToArrayIfItDoesNotExist(meta,'Graph'); }
    if ( HubProps.indexOf(thisKey) > -1 ) { meta = addItemToArrayIfItDoesNotExist(meta,'Hub'); }
    if ( NavProps.indexOf(thisKey) > -1 ) { meta = addItemToArrayIfItDoesNotExist(meta,'Nav'); }
    if ( SPOProps.indexOf(thisKey) > -1 ) { meta = addItemToArrayIfItDoesNotExist(meta,'SPO'); }
    if ( LegacyProps.indexOf(thisKey) > -1 ) { meta = addItemToArrayIfItDoesNotExist(meta,'Legacy'); }

    if ( meta.length === 0 ) { meta = addItemToArrayIfItDoesNotExist(meta,'Other'); }
    
    meta = addItemToArrayIfItDoesNotExist(meta,'All');

    return meta;

}

function buildSearchStringFromProp ( prop : IContentsSiteInfo ) {

    let result = '';
    let delim = '|||';

    if ( prop.property ) { result += 'Key=' + prop.property + delim ; }
    if ( prop.value ) { result += 'Value=' + prop.value + delim ; }
    if ( prop.meta.length > 0 ) { result += 'Meta=' + prop.meta.join(',') + delim ; }

    result = result.toLowerCase();

    return result;

}

