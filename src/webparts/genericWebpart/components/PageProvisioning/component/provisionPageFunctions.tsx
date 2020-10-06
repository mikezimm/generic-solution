
import { Web, IWeb } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText, IClientsidePage } from "@pnp/sp/clientside-pages";

export interface IWebPartDef {

    Id?: string; //Need to have guid or name
    isIdOrName: 'Id' | 'Name';
    Name?: string;
    NameOrId?: string;
    setProperties?: any; //Object with preconfigured props
    section: number;
    column: number;
    columnSize?: 4 | 6 | 12;

}

const buttonPropsContents = {
    label: 'Contents',
    linkUrl: 'https://autoliv.sharepoint.com/sites/WebPartDev/SitePages/Contents.aspx',
    alignment: 'center', //Alternatives:  'center', 'left', 'right'
};

const buttonPropsWebPartDef = {
    label: 'PreConfigProps',
    linkUrl: 'https://autoliv.sharepoint.com/sites/PreConfigProps/lists/DrilldownPreConfigProps/zTest  All Fields.aspx',
    alignment: 'center', //Alternatives:  'center', 'left', 'right'
};

const ButtonWPID = "0f087d7f-520e-42b7-89c0-496aaf979d58";
const DrilldownWPName = "Drilldown7";

export function createDrilldownDemoWebParts() {

    let webparts: IWebPartDef[] = [];

    webparts.push( createThisWebPart( webparts, true, true, 4 , ButtonWPID, buttonPropsWebPartDef)  );
    webparts.push( createThisWebPart( webparts, false, true, 4 , ButtonWPID, buttonPropsContents)  );

    webparts.push( createThisWebPart( webparts, true, true, 4 , DrilldownWPName, {})  );

    return webparts;
}

export function isGuid( testMe: string ) {
    //Regex courtesy of:  https://stackoverflow.com/a/13653180/4210807
    let validGuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    let result : boolean = false;

    if ( testMe === undefined || testMe === null || testMe.length < 22 ) {
        result = false;

    } else {
        result = validGuidRegex.exec(testMe) ? true : false;
    }

    return result;  

}

export function createThisWebPart( webparts: IWebPartDef[], newSection: boolean, newColumn: boolean, colWidth: 4 | 6 | 12, NameOrId , setProperties: any ) {
    
    let section = getMaxPropOfKeyInObjectArray( webparts , 'section', 'max' );
    let column = getMaxPropOfKeyInObjectArray( webparts , 'column', 'max', 'section', 'eq', newSection );

    if ( newSection === true ) {
        //Get max current section # and ++
        section = section === null ? 0 : section + 1;
    } else if ( section === null ) { section = 0; }

    if ( newColumn === true ) {
        //Get max current column # in current section and ++
        column = column === null ? 0 : column + 1;
    } else if ( column === null ) { column = 0; }

    let webpart: IWebPartDef = {
        NameOrId: '',
        isIdOrName: null,
        section: section,
        column: column,
        setProperties: setProperties,

    };

    if ( isGuid(NameOrId) === true ) {  //IsName
        webpart.NameOrId = NameOrId;
        webpart.isIdOrName = 'Id';

    } else {
        webpart.NameOrId = NameOrId; 
        webpart.isIdOrName = 'Name';

    }

    return webpart;
    
}

//This function should eventually get into arrServices file:

export function getMaxPropOfKeyInObjectArray( arr: any[], key: string, find: 'max' | 'min', filterKey?: string, filterTest?: 'eq' | 'neq' , filterVal? : any ) {

    let bestValue = null;

    if ( arr === undefined || arr === null ) { return bestValue ; }
    if ( arr.length === 0 ) { return bestValue ; }

    for (let i in arr){

        let checkKeyVal = arr[i][key];
        let filterKeyVal = arr[i][filterKey];
        
        let validTest = true;

        if ( checkKeyVal === undefined || checkKeyVal === null) {
            validTest = false;

        } else if ( filterKey && filterTest && filterVal ) {
            if ( filterTest === 'eq') {
                if ( filterKeyVal == null || filterKeyVal == undefined || checkKeyVal !== filterKeyVal ) { validTest = false; }

            } else if ( filterTest === 'neq') {
                if ( filterKeyVal !== null && filterKeyVal !== undefined && checkKeyVal === filterKeyVal ) { validTest = false; }
            }
        }

        if ( validTest === true ) {
            if ( bestValue === null || bestValue === undefined ) {
                bestValue = checkKeyVal;

            } else if ( find === 'max' ) {
                if ( checkKeyVal > bestValue ) {
                    bestValue = checkKeyVal;
                }

            } else if ( find === 'min' ) {
                if ( checkKeyVal < bestValue ) {
                    bestValue = checkKeyVal;
                }

            } // END:  if ( bestValue === null ) {
        } // END:  if ( checkKeyVal ) {
    } // for (let i in arr){

    return bestValue;

}