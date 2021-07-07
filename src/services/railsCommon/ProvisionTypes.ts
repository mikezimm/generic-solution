

import { changes, IMyFieldTypes } from '@mikezimm/npmfunctions/dist/Lists/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '@mikezimm/npmfunctions/dist/Lists/viewTypes'; //Import view arrays for Time list

import { IAnyArray } from  '../listServices/listServices';

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      db   db d88888b db      d8888b. d88888b d8888b. .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88   88 88'     88      88  `8D 88'     88  `8D 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88ooo88 88ooooo 88      88oodD' 88ooooo 88oobY' `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88~~~88 88~~~~~ 88      88~~~   88~~~~~ 88`8b     `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88   88 88.     88booo. 88      88.     88 `88. db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P 88      Y88888P 88   YD `8888Y' 
 *                                                                                                                       
 *                                                                                                                       
 */

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
 *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
 *                                                                                                                                               
 *                                                                                                                                               
 */

/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */
export const DefStatusField = 'Status';
export const DefEffStatusField = 'Effective Status';

export const availComponents : IDefinedComponent[] =  [ DefStatusField , DefEffStatusField, 'Year-Period' , 'Steps Done' ]; 

export type IDefinedComponent = 'Pick component Type' | typeof DefStatusField | typeof DefEffStatusField | 'Year-Period' | 'Steps Done' | '';

export type IListDefintionReports = 'Reports1' | 'Reports2';
export type IListDefintionHarmonie = 'Emails' | 'BUEmails' ;
export type IListDefintionCustReq = 'Program' | 'SORInfo' ;
export type IListDefintionTMT = 'Projects' | 'TrackMyTime';
export type IListDefintionTurnOver = 'AOA Turnover' | 'IBC Turnover' | 'TBD Turnover';
export type IListDefintionPivot = 'OurTiles' | 'PivotTiles';
export type IListDefintionPreConfig = 'Drilldown' | 'CarrotCharts' | 'GridCharts';
export type IListDefintionFinTasks = 'Finance Tasks' | 'OurTasks' ;

export type IValidTemplate = 100 | 101;

//Add here to make available in dropdown (but does not work unless they are in the definedLists array )
export const availLists : IDefinedLists[] =  ['Pick list Type', 'TrackMyTime','Harmon.ie','Customer Requirements', 'Finance Tasks' ,  'Reports' ,  'Turnover' , 'PivotTiles' , 'PreConfig'];

//Currently Not beeing used
export const definedLists : IDefinedLists[] = ['TrackMyTime','Harmon.ie','Customer Requirements','Finance Tasks', 'Reports', 'Turnover', 'Socialiis', 'PivotTiles', 'PreConfig' ];

/**
 * NOTE:  'Pick list Type' ( availLists[0] ) is hard coded in numerous places.  If you change the text, be sure to change it everywhere.
 * First item in availLists array ( availLists[0] ) is default one so it should be the 'Pick list type' one.
 * 
 */
export type IDefinedLists = 'Pick list Type' | 'TrackMyTime' | 'Harmon.ie' | 'Customer Requirements' | 'Finance Tasks' |  'Reports' |  'Turnover' |  'Socialiis' | 'PivotTiles' | 'Drilldown' | 'PreConfig' | 'Components';

export type IDefinedChoice = 'Pick component Type' | IListDefintionTMT | IListDefintionHarmonie | IListDefintionCustReq | IListDefintionFinTasks |  IListDefintionReports |  IListDefintionTurnOver | IListDefintionPivot | IListDefintionPreConfig | '';

export interface IMakeThisList {

    title: string;
    name: string;
    webURL: string;
    listURL: string;
    desc: string;
    template: IValidTemplate;  // listURL, template
    enableContentTypes: boolean;
    additionalSettings: { 
        EnableVersioning: boolean;
        MajorVersionLimit: number;
        OnQuickLaunch: boolean;
     };
    createTheseFields: IMyFieldTypes[];
    createTheseViews: IMyView[];
    createTheseItems: IAnyArray;
    autoItemCreate: boolean;
    alternateItemCreateMessage?: string;
    confirmed: boolean;
    onCurrentSite: boolean;
    webExists: boolean;
    listExists: boolean;
    listExistedB4: boolean;
    existingTemplate: number;
    sameTemplate: boolean;
    listDefinition: string;
    definedList: IDefinedLists;
    validUserIds?: number[];
    templateDesc: any;
    templateDetails: any;

}