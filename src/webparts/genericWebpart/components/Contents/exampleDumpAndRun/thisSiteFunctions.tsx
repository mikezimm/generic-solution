import * as React from 'react';

import { Web, IList, IWebInfo } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

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

