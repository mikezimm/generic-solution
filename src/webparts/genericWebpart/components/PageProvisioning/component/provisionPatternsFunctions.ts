import { Web, IWeb } from "@pnp/sp/presets/all";

import { sp } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { ClientsideWebpart } from "@pnp/sp/clientside-pages";
import { CreateClientsidePage, PromotedState, ClientsidePageLayoutType, ClientsideText, IClientsidePage, ClientsidePageFromFile  } from "@pnp/sp/clientside-pages";

import { IListInfo, IMyListInfo, IServiceLog } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import { getHelpfullErrorV2,  } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler'; //Import view arrays for Time list

import { BaseErrorTrace } from '../../../../../services/BaseErrorTrace';

import * as strings from 'GenericWebpartWebPartStrings';

import { notify } from '@mikezimm/npmfunctions/dist/Lists/listTypes';

import { IPatternItemInfo } from  './GetPatternPages';

export type IValidTemplate = 100 | 101;

export async function copyThisPage( destWeb: IWeb, sourcePage: IPatternItemInfo, destPageName : string = null, setProgress: any, markComplete: any, i: number, n: number ): Promise<IServiceLog[]>{

    let sourcePageName : string = sourcePage["File"]["Name"].replace('.aspx','');
    if ( destPageName === '' || destPageName === null ) { destPageName = sourcePageName; }
    let statusLog : IServiceLog[] = [];

    console.log('getting page here:');

    /**
     * Need to look at this for ContentCanvas1
     * https://joaojmendes.com/2019/02/08/read-and-update-spfx-webpart-properties-from-code/
     * 
     */

    // use the web factory to target a specific web  https://autoliv.sharepoint.com/sites/webpartdev/SitePages/Home(1).aspx
    try {
        const page2 = await Web( window.location.origin + strings.patternsWeb ).loadClientsidePage( strings.patternsWeb + "SitePages/" + sourcePageName + ".aspx");
            //    let page2X = JSON.stringify(page2);
    //    let page2Y = JSON.parse(page2X);

        console.log( 'Source page ' + sourcePageName , page2 );
        //console.log( 'Source page sections' + sourcePageName , page2.json );  //Property 'json' is protected and only accessible within class '_ClientsidePage' and its subclasses.
        //console.log( 'Source page ' + sourcePageName , page2. );

        try {
            const pageCopy2a = await page2.copy(destWeb, sourcePageName, sourcePageName);
            pageCopy2a.layoutType = 'NoImage';
            await pageCopy2a.save();
            //console.log( 'CanvaseContent1 _data' + sourcePageName , pageCopy2a['_data'] ); // this did not give any meaningful information related to the page
            console.log( 'Succeded pasting page pageCopy2a.prototype.Target.json ' + sourcePageName , pageCopy2a['_data.ok'] );
            setProgress(false, "C", i, n , 'green', 'CheckboxComposite', 'Page: ' + sourcePageName, 'Page copied: ' + sourcePageName , 'Page = ' + sourcePageName, 'Copied sourcepage' + ' Success! ~ 66' );

        } catch (e){
            console.log( 'Failed pasting page ' + sourcePageName  );
            let helpfulErrorEnd = [ sourcePageName, '', null, null ].join('|');
            let errMessage = getHelpfullErrorV2(e, false, true, [ BaseErrorTrace , 'Failed', 'provisionPatterns ~ 59', helpfulErrorEnd ].join('|') );

            if (errMessage.indexOf('missing a column') > -1) {
                statusLog = notify(statusLog, 'Checked Field', 'err', 'step', 'f', null);
            }
            setProgress(false, "E", i, n , 'darkred', 'ErrorBadge', 'Page: ' + sourcePageName, 'Houston we have a problem: ' + sourcePageName , 'Page = ' + sourcePageName, 'Getting sourcepage' + ' Error! ~ 74' );
        }


    } catch (e) {
        // if any of the fields does not exist, raise an exception in the console log

        let helpfulErrorEnd = [ strings.patternsWeb, '', null, null ].join('|');
        let errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'provisionPatterns ~ 72', helpfulErrorEnd ].join('|') );
        if (errMessage.indexOf('The file') > -1 && errMessage.indexOf('does not exist.') > -1 ) {
            let err = `The page ${sourcePageName} does not exist... was it deleted?`;
            statusLog = notify(statusLog, 'Checked Field', err, 'step', 'f', null);
        }
        setProgress(false, "E", i, n , 'darkred', 'ErrorBadge', 'Page: ' + sourcePageName, 'Houston we have a problem: ' + sourcePageName , 'Page = ' + sourcePageName, 'Getting sourcepage' + ' Error! ~ 84' );
    }

   /*
        try {
            const pageCopy2Y = await page2Y.copy(destWeb, sourcePageName + 'Y', sourcePageName + 'Y');
            console.log( 'Succeded pasting page ' + sourcePageName , pageCopy2Y );

        } catch (e){
            console.log( 'Failed pasting page ' + sourcePageName  );

        }*/

    return statusLog;

}

    
//export async function provisionTestPage( makeThisPage:  IPatternItemInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
    export async function copyPatterns( destWeb: string, thesePages:  IPatternItemInfo[], setProgress: any, markComplete: any, finishFunction: any ): Promise<IServiceLog[]>{

        let statusLog : IServiceLog[] = [];
        const thisWeb = Web(destWeb);

        

        /**
         * Known issues:  
         * Hero webpart with images/links
         * Picture webpart with picture
         * File Viewer with file
         * 
         * Error message:  400  "Server relative urls must start with SPWeb.ServerRelativeUrl"
         * 
         * 
         * 
         */

        //await copyThisPage( thisWeb, 'Hero', '');  //Succeded
        //await copyThisPage( thisWeb, 'HeroGoogle', '');  //Succeded

        for ( let i = 0; i < thesePages.length; i++) {
            
            let thisPage = thesePages[i];
            let statusLogPage : IServiceLog[] = await copyThisPage( thisWeb, thisPage, '', setProgress, markComplete, i+1, thesePages.length );  //Succeded
            statusLogPage.map( item => { statusLogPage.push( item ) ; } ) ;

            if ( i === thesePages.length -1 ) { finishFunction() ; }
        }
 
        return statusLog;
    }

