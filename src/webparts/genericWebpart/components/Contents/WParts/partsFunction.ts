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

import { addItemToArrayIfItDoesNotExist } from '../../../../../services/arrayServices'; //Import view arrays for Time list

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
    version: string;
    isInternal: boolean;
    searchString: string;
    tags: string[];
    meta: string[];

    officeFabricIconFontName: string;

    parentAlias: string;
    parentIndex: number;

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
export async function allAvailableWebParts( addThesePartsToState: any, setProgress: any, markComplete: any ): Promise<IWPart[]>{

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

    for (let i in partDefs ) {

        let thisManifest = JSON.parse(partDefs[i].Manifest);
        //let entries: any = getAllPreConfiguredEntries(thisManifest);
        //let theseEntries : any = getAllPreConfiguredEntries(thisManifest);
        webPartDefs = getAllPreConfiguredEntries(webPartDefs, thisManifest, i );
        //webPartDefs.splice(webPartDefs.length, 0, theseEntries );

    }

    console.log('webPartDefs', webPartDefs);
    let result = await addThesePartsToState(webPartDefs);

    return result;
}

function getAllPreConfiguredEntries(webPartDefs : IWPart[], thisManifest, parentIndex) {

//    console.log('thisManifest', thisManifest);

    let baseManifest = makeBaseManifest (thisManifest, parentIndex) ;

    if ( parentIndex == 60  ) {
        console.log('Hi!');
    }

    if ( !thisManifest.preconfiguredEntries ) {
        baseManifest.alias = thisManifest.alias ? thisManifest.alias : thisManifest.title;
        baseManifest.name = thisManifest.name;
        baseManifest.title = thisManifest.title ? thisManifest.title : thisManifest.alias;
        baseManifest.desc = thisManifest.description;
        baseManifest.version = thisManifest.version;
        baseManifest.searchString = buildSearchStringFromDef(baseManifest);

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
            newManifest.alias = getWPKeyValue( 'alias', thisEntry, thisManifest, allPreConfigProps.length );
            newManifest.group = getWPKeyValue( 'group', thisEntry, thisManifest, allPreConfigProps.length );
            newManifest.desc = getWPKeyValue( 'description', thisEntry, thisManifest, allPreConfigProps.length );
            newManifest.title = getWPKeyValue( 'title', thisEntry, thisManifest, allPreConfigProps.length );
            newManifest.groupId = getWPKeyValue( 'groupId', thisEntry, thisManifest, allPreConfigProps.length );
            newManifest.version = getWPKeyValue( 'version', thisEntry, thisManifest, allPreConfigProps.length );

            newManifest.officeFabricIconFontName = thisEntry.officeFabricIconFontName ? thisEntry.officeFabricIconFontName : 'Unknown';

            newManifest.searchString = buildSearchStringFromDef(newManifest);

            let tags : string[] = [];
            let meta : string[] = [];

            tags = addItemToArrayIfItDoesNotExist(tags, newManifest.alias);
            
            tags = addItemToArrayIfItDoesNotExist(tags, newManifest.componentType);
            meta = addItemToArrayIfItDoesNotExist(meta, newManifest.componentType);

            tags = addItemToArrayIfItDoesNotExist(tags, newManifest.parentAlias);
            tags = addItemToArrayIfItDoesNotExist(tags, newManifest.group);
            tags = addItemToArrayIfItDoesNotExist(tags, newManifest.officeFabricIconFontName);

            
            if ( newManifest.supportsFullBleed ) { tags = addItemToArrayIfItDoesNotExist(tags, 'FullBleed'); }
            if ( newManifest.supportsThemeVariants ) { tags = addItemToArrayIfItDoesNotExist(tags, 'Themes'); }

            if ( newManifest.hiddenFromToolbox ) { 
                tags = addItemToArrayIfItDoesNotExist(tags, 'Hidden');
                meta = addItemToArrayIfItDoesNotExist(meta, 'Hidden');
             }


            tags = addItemToArrayIfItDoesNotExist(tags, newManifest.isInternal ? 'Internal' : 'External');
            meta = addItemToArrayIfItDoesNotExist(meta, newManifest.isInternal ? 'Internal' : 'External');

            if ( newManifest.disabledOnClassicSharepoint == false ) { 
                tags = addItemToArrayIfItDoesNotExist(tags, 'Classic'); 
                meta = addItemToArrayIfItDoesNotExist(meta, 'Classic'); 
            }


            if ( newManifest.useFallbackWhenPropertiesUpdatedExternally == false ) { tags = addItemToArrayIfItDoesNotExist(tags, 'FallBack'); }

            if ( newManifest.supportedHosts ) {
                for (let h of newManifest.supportedHosts ) {
                    tags = addItemToArrayIfItDoesNotExist(tags, h);
                    meta = addItemToArrayIfItDoesNotExist(meta, h);               
                }
            }
            newManifest.tags = tags;
            newManifest.meta = meta;

            webPartDefs.push(newManifest);

        }

    }

    webPartDefs.sort((a, b) => (a.alias > b.alias) ? 1 : -1);

    return webPartDefs;

}

function buildSearchStringFromDef (newManifest : IWPart) {

    let result = '';
    let delim = '|||';

    if ( newManifest.title ) { result += 'title=' + newManifest.title + delim ; }
    if ( newManifest.alias ) { result += 'alias=' + newManifest.alias + delim ; }
    if ( newManifest.partId ) { result += 'partId=' + newManifest.partId + delim ; }
    if ( newManifest.group ) { result += 'group=' + newManifest.group + delim ; }
    if ( newManifest.groupId ) { result += 'groupId=' + newManifest.groupId + delim ; }
    if ( result.indexOf(newManifest.parentAlias) < 0 ) { result += 'parent=' + newManifest.parentAlias + delim ; }
    if ( newManifest.isInternal ) { result += 'isInternal' + delim ; } else { { result += 'isExternal' + delim ; }}
    if ( newManifest.isolatedDomain ) { result += 'isolatedDomain' + delim ; }
    if ( newManifest.solution ) { result += 'solution=' + newManifest.solution + delim ; }
    if ( newManifest.disabledOnClassicSharepoint ) { result += 'noClassic' + delim ; }

    if ( newManifest.hiddenFromToolbox ) { result += 'isHidden' + delim ; }

    if ( newManifest.searchablePropertyNames ) { result += 'isSearchable' + delim ; }
    if ( newManifest.supportsThemeVariants ) { result += 'Themes' + delim ; }
    if ( newManifest.template ) { result += 'template=' + newManifest.template + delim ; }
    if ( newManifest.componentType ) { result += 'type=' + newManifest.componentType + delim ; }
    if ( newManifest.desc ) { result += 'desc=' + newManifest.desc.substring(0,50) + delim ; }

    result = result.toLowerCase();

    return result;

}
/**
 * 
 * The purpose of this function is to find an appropriate value on the entry if it's not directly available.
 * For example, if the manifest does not have a value, then look at preConfiguredEntries
 * 
 * @param key 
 * @param thisEntry 
 * @param thisManifest 
 * @param allPreConfigPropsLength 
 */
function getWPKeyValue ( key: string, thisEntry, thisManifest, allPreConfigPropsLength ) {

    let keyValue = 'Unknown ' + key;


    if ( thisEntry[key] ) { 
        keyValue = getDefaultOrEnUS( thisEntry[key]);

    } else if (key === 'alias') {

        keyValue = getDefaultOrEnUS( thisEntry[key]);
        if (!keyValue) { keyValue = getDefaultOrEnUS( thisEntry['title']);  }
        if (!keyValue) { keyValue = getDefaultOrEnUS( thisManifest[key] , '*');  }
        if (!keyValue) { keyValue = getDefaultOrEnUS( thisManifest['title']);  }

    } else if ( key === 'title' ) {
        keyValue = getDefaultOrEnUS( thisEntry[key]);
        if (!keyValue) { keyValue = getDefaultOrEnUS( thisEntry['alias']);  }
        if (!keyValue) { keyValue = getDefaultOrEnUS( thisManifest[key] , '*');  }
        if (!keyValue) { keyValue = getDefaultOrEnUS( thisManifest['alias']);  }

    } else if ( key === 'desc' ) {
        keyValue = getDefaultOrEnUS( thisEntry[key]);
        if (!keyValue) { keyValue = getDefaultOrEnUS( thisEntry['description']);  }
        if (!keyValue) { keyValue = getDefaultOrEnUS( thisManifest[key] , '*');  }
        if (!keyValue) { keyValue = getDefaultOrEnUS( thisManifest['description']);  }


    } else if ( key === 'groupId' || key === 'group' ) {
        keyValue = 'Unexpected ' + keyValue;

    }

    return keyValue;
}

function getDefaultOrEnUS(thisItemKey, posSuffix = '') {

    let result : any = false;

    if ( thisItemKey === undefined || thisItemKey === null ) {

    } else {
        if ( thisItemKey['default'] ) { result = thisItemKey['default'] + posSuffix; }
        else if ( thisItemKey['en-US'] ) { result = thisItemKey['en-US'] + posSuffix; }
        else if ( thisItemKey ) { result = thisItemKey + posSuffix ; }
    }

    return result;

}
function makeBaseManifest (thisManifest, parentIndex) {

    let preconfiguredCount = thisManifest.preconfiguredEntries ? thisManifest.preconfiguredEntries.length : 0;
    let copyManifest = JSON.parse(JSON.stringify(thisManifest));
    let thisDef : IWPart = {
        title: 'Child',
        alias: 'Child',
        componentType: copyManifest.componentType,
        desc: '',
        name: '',
        parentAlias: copyManifest.alias,
        parentIndex: parentIndex,
        version: '',
        isInternal: copyManifest.isInternal,
        searchString: '',
        tags: [],
        meta: [],

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