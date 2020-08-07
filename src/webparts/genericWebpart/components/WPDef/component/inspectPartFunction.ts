import { Web } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText,  } from "@pnp/sp/clientside-pages";

import { IListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../../services/listServices/listServices';

import { IFieldLog, addTheseFields } from '../../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  '../../../../../services/listServices/listServices';

import { getRandomInt } from '../../ListProvisioning/ListsTMT/ItemsWebPart';

export type IValidTemplate = 100 | 101;

export interface IWPart {

    title: string;
    name?: string;
    alias: string;
    componentType: string;
    solution?: string;
    partId?: string;
    solutionGUId?: string;
    groupId?: string;
    group: string;

    officeFabricIconFontName: string;

    parentAlias: string;

    desc?: string;
    template?: IValidTemplate;
    keys?: string[];
    disabledOnClassicSharepoint: boolean;
    hiddenFromToolbox: boolean;
    isolatedDomain: any;
    manifestVersion: number;
    preconfiguredCount: number;
    properties: any;
    searchablePropertyNames: any;
    supportedHosts: string[];
    supportsFullBleed: boolean;
    supportsThemeVariants: boolean;
    useFallbackWhenPropertiesUpdatedExternally: boolean;

}


//export async function provisionTestPage( makeThisPage:  IWPart, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
export async function allAvailableWebParts( setProgress: any, markComplete: any ): Promise<IWPart[]>{

    let webPartDefs : IWPart[] = [];

    const partDefs = await sp.web.getClientsideWebParts();
    console.log('partDefs:', partDefs);
    // find the definition we want, here by id
    //const partDef = partDefs.filter(c => c.Id === "490d7c76-1824-45b2-9de3-676421c997fa");
    //ff5f0cc8-b7e7-4e75-b46c-c0091483d2c2
    const partDef = partDefs.filter(c => c.Name === "Weather");
    //const partDef = partDefs.filter(c => c.Id === "490d7c76-1824-45b2-9de3-676421c997fa");


    // create a ClientWebPart instance from the definition
    const part = ClientsideWebpart.fromComponentDef(partDef[0]);
    console.log('part:', part);

    for (let i in partDefs ) {

        let thisManifest = JSON.parse(partDefs[i].Manifest);
        //let entries: any = getAllPreConfiguredEntries(thisManifest);
        //let theseEntries : any = getAllPreConfiguredEntries(thisManifest);
        webPartDefs = getAllPreConfiguredEntries(webPartDefs, thisManifest);
        //webPartDefs.splice(webPartDefs.length, 0, theseEntries );



    }

    console.log('webPartDefs', webPartDefs);

    return webPartDefs;
}

function getAllPreConfiguredEntries(webPartDefs : IWPart[], thisManifest) {

    console.log('thisManifest', thisManifest);

    let baseManifest = makeBaseManifest (thisManifest);

    if ( !thisManifest.preconfiguredEntries ) {
        webPartDefs.push(baseManifest);

    } else {
        let allPreConfigProps : any = JSON.parse(JSON.stringify( thisManifest.preconfiguredEntries ));

        if ( allPreConfigProps.length > 1 ) {
            console.log('Hi!');
        }
        for ( let e = 0; e < allPreConfigProps.length; e++) {

            let thisEntry = JSON.parse(JSON.stringify(allPreConfigProps[e]));

            let newManifest : IWPart = JSON.parse(JSON.stringify(baseManifest));

            let theseKeys = Object.keys(allPreConfigProps[e].properties);

            let theseProperties = JSON.parse(JSON.stringify(allPreConfigProps[e]['properties']));

            newManifest.keys = theseKeys;
            newManifest.alias = thisEntry.title ? thisEntry.title['en-US'] : 'Unknown';
            newManifest.group = thisEntry.group ? thisEntry.group['en-US'] : 'Unknown';
            newManifest.desc = thisEntry.desc ? thisEntry.desc['en-US'] : 'Unknown';
            newManifest.title = thisEntry.title ? thisEntry.title['en-US'] : 'Unknown';
            newManifest.groupId = thisEntry.groupId ? thisEntry.groupId : 'Unknown';
            newManifest.officeFabricIconFontName = thisEntry.officeFabricIconFontName ? thisEntry.officeFabricIconFontName : 'Unknown';
            
            webPartDefs.push(newManifest);

        }

    }

    return webPartDefs;

}

function makeBaseManifest (thisManifest) {

    let preconfiguredCount = thisManifest.preconfiguredEntries ? thisManifest.preconfiguredEntries.length : 0;
    let copyManifest = JSON.parse(JSON.stringify(thisManifest));
    let thisDef : IWPart = {
        title: 'Child',
        alias: 'Child',
        componentType: copyManifest.componentType,
        desc: '',
        name: '',
        parentAlias: copyManifest.alias,
        partId: copyManifest.id ,
        group: null,
        officeFabricIconFontName: '',

        preconfiguredCount: preconfiguredCount ,

        disabledOnClassicSharepoint: copyManifest.disabledOnClassicSharepoint ,
        hiddenFromToolbox: copyManifest.hiddenFromToolbox ,
        isolatedDomain: copyManifest.isolatedDomain ,
        manifestVersion: copyManifest.manifestVersion ,

        properties: copyManifest.properties ,
        searchablePropertyNames: copyManifest.searchablePropertyNames ,
        supportedHosts: copyManifest.supportedHosts ,
        supportsFullBleed: copyManifest.supportsFullBleed ,
        supportsThemeVariants: copyManifest.supportsThemeVariants ,
        useFallbackWhenPropertiesUpdatedExternally: copyManifest.useFallbackWhenPropertiesUpdatedExternally ,

    };

    //thisDef = JSON.parse(JSON.stringify(thisDef))

    return thisDef;
}