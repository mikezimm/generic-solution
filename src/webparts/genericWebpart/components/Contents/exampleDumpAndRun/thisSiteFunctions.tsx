import * as React from 'react';

import { Web, IList, IWebInfo } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { makeSmallTimeObject, ITheTime, getAge, getBestTimeDelta} from '@mikezimm/npmfunctions/dist/dateServices';

import { doesObjectExistInArray } from '@mikezimm/npmfunctions/dist/arrayServices';

import { getHelpfullError } from '@mikezimm/npmfunctions/dist/ErrorHandler';

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';
import { mergeAriaAttributeValues } from "office-ui-fabric-react";

import { IPickedSite } from './thisSiteComponent';
import { JSXElementConstructor } from "react";

/**
 * This just dumps entire object key to screen bolding the keys
 * @param thisSite
 */
export function createDumpAndRunPage( thisSite: IPickedSite, primeKey: string ) {

    let primeKeys = thisSite === null || thisSite === undefined ? [] : Object.keys(thisSite);
    primeKey = primeKey.toLowerCase();
    let basicpage = null;

    if ( thisSite === null ) {
    } else if (primeKeys.indexOf(primeKey) < 0 ) {   
        basicpage = <div><h3>Did not find anything related to { primeKey }</h3></div> ;
    } else {
        let primeObject = thisSite[primeKey];
        let hoverWebStyle = { fontWeight: 700};
        let theseKeys = Object.keys(primeObject);
        if ( theseKeys.length === 0) {
            basicpage = <div><h3>Did not find anything related to { primeKey }</h3></div> ;
        } else {
            basicpage = theseKeys.length === 0 ? null : theseKeys.map( K => { 
                let thisValue = primeObject[K];
                if ( typeof primeObject[K] === 'object' ) { thisValue = JSON.stringify(primeObject[K]); }
                return <p><span style={hoverWebStyle}>{ K }:</span> { thisValue }</p>;
            });
        }

    }

    return ( basicpage );
}


export function createBasicPage( thisSite: IPickedSite ) {
    let primeKey = 'basic';
    let basicpage = null;

    if ( thisSite === null ) {
    } else if ( thisSite[primeKey] === null ) {       
    } else {
        let primeObject = thisSite[primeKey];
        let hoverWebStyle = { fontWeight: 700};
        let theseKeys = Object.keys(primeObject);
        basicpage = theseKeys.length === 0 ? null : theseKeys.map( K => { 
            let thisValue = primeObject[K];
            if ( typeof primeObject[K] === 'object' ) { thisValue = JSON.stringify(primeObject[K]); }
            return <p><span style={hoverWebStyle}>{ K }:</span> { thisValue }</p>;
        });
    }

    return ( basicpage );
}

