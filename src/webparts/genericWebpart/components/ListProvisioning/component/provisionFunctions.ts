import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';

import { Web, Lists, List } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import { getHelpfullError, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
import { doesObjectExistInArray } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';
import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

import { availLists, IDefinedLists, definedLists, dropDownWidth } from './provisionListComponent';
import { IMakeThisList } from './provisionWebPartList';
import { fixTitleNameInViews  } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

/**
   * Steps to add new list def:
   * 1. Create folder and columns, define and view files
   * 2. Make sure the list def is in the availLists array and definedLists array
   * 3. Add logic to getDefinedLists to fetch the list definition
   * Rinse and repeat
   */
  import * as dHarm from '../Harmonie/defineHarmonie';
  import * as dTMT from '../ListsTMT/defineThisList';
  import * as dCust from '../ListsCustReq/defineCustReq';
  import * as dPCP from '../PreConfig/definePreConfig';

  import * as dFinT from '../ListsFinTasks/defineFinTasks';
  import * as dReps from '../ListsReports/defineReports';
  //import * as dTurn from '../ListsTurnover/defineTurnover';
  //import * as dOurG from '../ListsOurGroups/defineOurGroups';
  //import * as dSoci from '../ListsSocialiiS/defineSocialiiS';
  import * as dPivT from '../PivotTiles/definePivotTiles';

  
    export interface IMyHistory {
        count: number;
        errors: IMyProgress[];
        columns: IMyProgress[];
        views: IMyProgress[];
        items: IMyProgress[];
    }

  export function clearHistory() {
    let history: IMyHistory = {
        count: 0,
        errors: [],
        columns: [],
        views: [],
        items: [],
    };
    return history;

  }

export function getTheseDefinedLists( defineThisList : IDefinedLists, justReturnLists : boolean, provisionListTitles: string[], validUserIds: number[], pickedWebUrl: string, webAbsoluteUrl: string, doList: boolean, updateStateLists: any ) {

  let theLists : IMakeThisList[] = [];
  if ( defineThisList === 'TrackMyTime' ) {

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
          this.checkThisWeb(parseInt(i,10), theLists, defineThisList, updateStateLists, webAbsoluteUrl );
      }
  }
  return theLists;

}


export function checkThisWeb(index: number, testLists : IMakeThisList[], definedList: IDefinedLists, updateStateLists: any, webAbsoluteUrl: string ){
  const thisWeb = Web(testLists[index].webURL);
  testLists[index].webExists = false;
  testLists[index].listExists = false;
  testLists[index].existingTemplate = null;
  testLists[index].sameTemplate = false;

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
      let errMessage = getHelpfullError(e, true, true);
      console.log('checkThisWeb', errMessage);
      if ( updateStateLists ) { updateStateLists(index, testLists, definedList, ); }

  });
}