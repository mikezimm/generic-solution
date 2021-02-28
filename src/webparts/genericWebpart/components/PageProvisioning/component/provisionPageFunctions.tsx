
import { Web, IWeb } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText, IClientsidePage } from "@pnp/sp/clientside-pages";

import { cleanURL, camelize, getChoiceKey, getChoiceText, cleanSPListURL, makeid, randomizeCase, isGuid } from '@mikezimm/npmfunctions/dist/stringServices';

import { getMaxPropOfKeyInObjectArray } from '@mikezimm/npmfunctions/dist/arrayServices';

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
