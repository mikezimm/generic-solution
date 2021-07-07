import { Web, Lists, List } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import { getHelpfullErrorV2, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
import { doesObjectExistInArray } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IMyView,  } from '@mikezimm/npmfunctions/dist/Lists/viewTypes'; //Import view arrays for Time list

import { dropDownWidth } from './provisionListComponent';
import { fixTitleNameInViews  } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { BaseErrorTrace } from '../../../../../services/BaseErrorTrace';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

/**
   * Steps to add new list def:
   * 1. Create folder and columns, define and view files
   * 2. Make sure the list def is in the availLists array and definedLists array
   * 3. Add logic to getDefinedLists to fetch the list definition
   * Rinse and repeat
   */

  import * as dComp from '../DefinedComponents/defineComponents';
  import * as dHarm from '../Harmonie/defineHarmonie';
  import * as dTMT from '../ListsTMT/defineThisList';
  import * as dCust from '../ListsCustReq/defineCustReq';
  import * as dPCP from '../PreConfig/definePreConfig';

  import * as dFinT from '../ListsFinTasks/defineFinTasks';
  import * as dReps from '../ListsReports/defineReports';
  import * as dTurn from '../ListsTurnover/defineTurnover';
  //import * as dOurG from '../ListsOurGroups/defineOurGroups';
  //import * as dSoci from '../ListsSocialiiS/defineSocialiiS';
  import * as dPivT from '../PivotTiles/definePivotTiles';

import { IMyFieldTypes } from "@mikezimm/npmfunctions/dist/Lists/columnTypes";

import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../../../../../services/railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../../../../../services/railsCommon/ProvisionTypes';

export const IDescObject = {
    Components: {
        [ DefStatusField ]: '',
        [ DefEffStatusField ]: '',
        'Year-Period': '' ,
        'Steps Done': ''
    },
    TrackMyTime: {
        Projects: '',
        TrackMyTime: ''
    }
};

export function getFieldNamesFromArray ( arr:  IMyFieldTypes[] ) {
    let result = [];
    arr.map( field => {
        let fieldName = typeof field  === 'object' ? field.name : field;
        result.push( fieldName);
    });
    return result;
}

export function getViewTitlesFromArray ( arr:  IMyView[] ) {
    let result = [];
    arr.map( view => {
        let viewTitle = typeof view  === 'object' ? view.Title : 'Unknown View';
        result.push( viewTitle);
    });
    return result;
}

export function getTheseDefinedLists( defineThisList : IDefinedLists, justReturnLists : boolean, provisionListTitles: string[], validUserIds: number[], pickedWebUrl: string, webAbsoluteUrl: string, doList: boolean, updateStateLists: any ) {

  let theLists : IMakeThisList[] = [];

  if ( defineThisList === 'Components' ) {
    if ( justReturnLists === false ) { availComponents.map( comp => {  provisionListTitles.push( comp );  } ); }

    availComponents.map( comp => {
        theLists.push( dComp.defineTheList( 100 , provisionListTitles[0], comp , pickedWebUrl, validUserIds, webAbsoluteUrl ) );
    } );

  } else if ( defineThisList === 'TrackMyTime' ) {

      if ( justReturnLists === false ) {  provisionListTitles.push('Projects');  provisionListTitles.push('TrackMyTime');  }

      let parentList : IMakeThisList = dTMT.defineTheList( 100 , provisionListTitles[0], 'Projects' , pickedWebUrl, validUserIds, webAbsoluteUrl );
      let childList : IMakeThisList = dTMT.defineTheList( 100 , provisionListTitles[1], 'TrackMyTime' , pickedWebUrl, validUserIds, webAbsoluteUrl );

      if ( parentList ) { theLists.push( parentList ); }
      if ( childList ) { theLists.push( childList ); }

  } else if ( defineThisList === 'Harmon.ie' ) {

      if ( justReturnLists === false ) {  provisionListTitles.push('BUEmails');  provisionListTitles.push('Emails');  }

      let buEmails : IMakeThisList = dHarm.defineTheList( 101 , provisionListTitles[0], 'BUEmails' , pickedWebUrl, validUserIds, webAbsoluteUrl );
      let justEmails : IMakeThisList = dHarm.defineTheList( 101 , provisionListTitles[1], 'Emails' , pickedWebUrl, validUserIds, webAbsoluteUrl );

      if ( buEmails ) { theLists.push( buEmails ); }
      if ( justEmails ) { theLists.push( justEmails ); }

  } else if ( defineThisList === 'PreConfig' ) {

      if ( justReturnLists === false ) {  provisionListTitles.push('Drilldown');  provisionListTitles.push('CarrotCharts');  provisionListTitles.push('GridCharts');}

      let drillDown : IMakeThisList = dPCP.defineTheList( 100 , provisionListTitles[0], 'Drilldown' , pickedWebUrl, validUserIds, webAbsoluteUrl );
      let carrotCharts : IMakeThisList = dPCP.defineTheList( 100 , provisionListTitles[1], 'CarrotCharts' , pickedWebUrl, validUserIds, webAbsoluteUrl );
      let gridCharts : IMakeThisList = dPCP.defineTheList( 100 , provisionListTitles[2], 'GridCharts' , pickedWebUrl, validUserIds, webAbsoluteUrl );

      if ( drillDown ) { theLists.push( drillDown ); }
      if ( carrotCharts ) { theLists.push( carrotCharts ); }
      if ( gridCharts ) { theLists.push( gridCharts ); }

  } else if ( defineThisList === 'Customer Requirements' ) {

      if ( justReturnLists === false ) {  provisionListTitles.push('Program');  provisionListTitles.push('SORInfo');  }

      let progCustRequire : IMakeThisList = dCust.defineTheList( 101 , provisionListTitles[0], 'Program' , pickedWebUrl, validUserIds, webAbsoluteUrl );
      let sorCustRequire : IMakeThisList = dCust.defineTheList( 101 , provisionListTitles[1], 'SORInfo' , pickedWebUrl, validUserIds, webAbsoluteUrl );

      if ( progCustRequire ) { theLists.push( progCustRequire ); }
      if ( sorCustRequire ) { theLists.push( sorCustRequire ); }

  } else if ( defineThisList === 'PivotTiles' ) {

      if ( justReturnLists === false ) {  provisionListTitles.push('PivotTiles');  provisionListTitles.push('OurTiles');  }

      let pivotTiles : IMakeThisList = dPivT.defineTheList( 100 , provisionListTitles[0], 'PivotTiles' , pickedWebUrl, validUserIds, webAbsoluteUrl );
      let ourTiles : IMakeThisList = dPivT.defineTheList( 100 , provisionListTitles[1], 'OurTiles' , pickedWebUrl, validUserIds, webAbsoluteUrl );

      if ( pivotTiles ) { theLists.push( pivotTiles ); }
      if ( ourTiles ) { theLists.push( ourTiles ); }

  } else if ( defineThisList === 'Reports' ) {

      if ( justReturnLists === false ) {  provisionListTitles.push('Reports1');  provisionListTitles.push('Reports2');  }

      let reports1 : IMakeThisList = dReps.defineTheList( 101 , provisionListTitles[0], 'Reports1' , pickedWebUrl, validUserIds, webAbsoluteUrl );
      let reports2 : IMakeThisList = dReps.defineTheList( 101 , provisionListTitles[1], 'Reports2' , pickedWebUrl, validUserIds, webAbsoluteUrl );

      if ( reports1 ) { theLists.push( reports1 ); }
      if ( reports2 ) { theLists.push( reports2 ); }

  } else if ( defineThisList === 'Finance Tasks' ) {

      if ( justReturnLists === false ) {  provisionListTitles.push('Finance Tasks');  provisionListTitles.push('OurTasks');  }

      let finTasks : IMakeThisList = dFinT.defineTheList( 100 , provisionListTitles[0], 'Finance Tasks' , pickedWebUrl, validUserIds, webAbsoluteUrl );
      let ourTasks : IMakeThisList = dFinT.defineTheList( 100 , provisionListTitles[1], 'OurTasks' , pickedWebUrl, validUserIds, webAbsoluteUrl );

      if ( finTasks ) { theLists.push( finTasks ); }
      if ( ourTasks ) { theLists.push( ourTasks ); }

    } else if ( defineThisList === 'Turnover' ) {
        //export type ITurnoverDefs = 'AOA' | 'IBC' | 'TBD';
        if ( justReturnLists === false ) {  provisionListTitles.push('AOA Turnover');  provisionListTitles.push('IBC Turnover');  }

        let AOA : IMakeThisList = dTurn.defineTheList( 100 , provisionListTitles[0], 'AOA Turnover' , pickedWebUrl, validUserIds, webAbsoluteUrl );
        let IBC : IMakeThisList = dTurn.defineTheList( 100 , provisionListTitles[1], 'IBC Turnover' , pickedWebUrl, validUserIds, webAbsoluteUrl );
        let TBD : IMakeThisList = dTurn.defineTheList( 100 , provisionListTitles[2], 'TBD Turnover' , pickedWebUrl, validUserIds, webAbsoluteUrl );

        if ( AOA ) { theLists.push( AOA ); }
        if ( IBC ) { theLists.push( IBC ); }
        if ( TBD ) { theLists.push( TBD ); }

    }

  /**
   * Fix Title vs Name fields depending on list or library
   */
  theLists.map( list => {
      list = fixTitleNameInViews( doList , list );
  });

  //'Finance Tasks' |  'Reports' |  'Turnover' |  'OurGroups' |  'Socialiis' | 'PreConfig' |  dFinT

  if ( justReturnLists === true ) {
      return theLists;

  } else {
      for ( let i in theLists ) {
          checkThisWeb(parseInt(i,10), theLists, defineThisList, updateStateLists, webAbsoluteUrl );
      }
  }
  return theLists;

}

/**
 * This function checks to see if all the lists in the testLists array exist on the site.
 * @param index
 * @param testLists 
 * @param definedList 
 * @param updateStateLists 
 * @param webAbsoluteUrl 
 */
export function checkThisWeb(index: number, testLists : IMakeThisList[], definedList: IDefinedLists, updateStateLists: any, webAbsoluteUrl: string ){
  const thisWeb = Web(testLists[index].webURL);
  testLists[index].webExists = false;
  testLists[index].listExists = false;
  testLists[index].existingTemplate = null;
  testLists[index].sameTemplate = false;

  let helpfulErrorEnd = [ testLists[index].webURL, testLists[index].title , '', index, testLists.length ].join('|');

  thisWeb.lists.get().then((response) => {
      testLists[index].webExists = true;
      //this.checkThisList(index, testLists, thisWeb, definedList);
      let responseIdx = doesObjectExistInArray(response, 'Title', testLists[index].title ); //Check existing lists for the new list

      if ( responseIdx === false ) {

      } else {
          testLists[index].listExists = true;     //Copied in from checkThisList
          testLists[index].listExistedB4 = true;  //Copied in from checkThisList
          testLists[index].existingTemplate = response[responseIdx].BaseTemplate;
          testLists[index].sameTemplate = testLists[index].existingTemplate === testLists[index].template ? true : false;
          testLists[index].onCurrentSite = testLists[index].webURL.toLowerCase() === webAbsoluteUrl.toLowerCase() + '/' ? true : false;
      }

      if ( updateStateLists ) { updateStateLists(index, testLists, definedList, ); }

  }).catch((e) => {

      let errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'provisionFunctions ~ 244', helpfulErrorEnd ].join('|') );
      console.log('checkThisWeb', errMessage);
      if ( updateStateLists ) { updateStateLists(index, testLists, definedList, ); }

  });
}