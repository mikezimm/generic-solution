/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */


import * as React from 'react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";

import { sp } from "@pnp/sp";
import { Web, Lists, List, ISite } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import ReactJson from "react-json-view";
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import { PageContext } from '@microsoft/sp-page-context';


/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
import { IMyView,  } from '@mikezimm/npmfunctions/dist/Lists/viewTypes'; //Import view arrays for Time list
import { queryValueCurrentUser, queryValueToday, IViewField } from '@mikezimm/npmfunctions/dist/Lists/viewTypes';

import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';

import { getHelpfullErrorV2, } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';

import { cleanURL, cleanSPListURL } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';
import { camelize } from '@mikezimm/npmfunctions/dist/Services/Strings/stringCase';
import { makeid } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';

import { getChoiceKey, getChoiceText } from '@mikezimm/npmfunctions/dist/Services/Strings/choiceKeys';

import { doesObjectExistInArray } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';

import { IMyHistory, clearHistory } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      .d8888. d88888b d8888b. db    db d888888b  .o88b. d88888b .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88'  YP 88'     88  `8D 88    88   `88'   d8P  Y8 88'     88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         `8bo.   88ooooo 88oobY' Y8    8P    88    8P      88ooooo `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88           `Y8b. 88~~~~~ 88`8b   `8b  d8'    88    8b      88~~~~~   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         db   8D 88.     88 `88.  `8bd8'    .88.   Y8b  d8 88.     db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         `8888Y' Y88888P 88   YD    YP    Y888888P  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */
import { BaseErrorTrace } from '../../../../../services/BaseErrorTrace';

import { saveTheTime, getTheCurrentTime, saveAnalytics, ApplyTemplate_Rail_SaveTitle } from '../../../../../services/createAnalytics';

import { fixTitleNameInViews  } from '../../../../../services/listServices/viewServices'; //Import view arrays for Time list

import ProvisionHistory from '../../../../../services/railsCommon/ProvisionHistoryPane';

import { IMainPivot, pivotHeading1, pivotHeading2, pivotHeading3 } from './provisionConstants';  

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

import { IContentsToggles, makeToggles } from '../../fields/toggleFieldBuilder';
import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { IFieldDef } from '../../fields/fieldDefinitions';
import { createBasicTextField } from  '../../fields/textFieldBuilder';

import * as links from '@mikezimm/npmfunctions/dist/HelpInfo/Links/AllLinks';

import { JSONEditorShort } from '../../HelpInfo/AllLinks';

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
//
import * as strings from 'GenericWebpartWebPartStrings';

import { IListRailFunction } from '../../Contents/Lists/listsComponent';
import { provisionTheList, } from './provisionWebPartList';

import { getTheseDefinedLists, checkThisWeb } from './provisionFunctions';
import { getFullURLFromRelative } from '../../Contents/Permissions/Services/Permissions';

import { IGenericWebpartProps } from '../../IGenericWebpartProps';
import { IGenericWebpartState } from '../../IGenericWebpartState';
import styles from './provisionList.module.scss';

import MyLogList from './listView';


import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../../../../../services/railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../../../../../services/railsCommon/ProvisionTypes';

export function createTitleField( title ) {
  let thisField : IFieldDef = {
      name: title,
      title: null,
      column: title,
      type: 'String', //Smart, Text, Number, etc...
      required: true,
      disabled: false,
      hidden: false,
      blinkOnProject: null,
      value: title,
  };
  return thisField;
}

export function isListReadOnly (mapThisList: IMakeThisList, alwaysReadOnly: boolean, isCurrentWeb: boolean, allowOtherSites: boolean ) {

  let readOnly = true;
  if ( alwaysReadOnly === false ) {                //First test, only allow updates if the state is explicitly set so alwaysReadOnly === false
      if (mapThisList.onCurrentSite === true ) {
          readOnly = false;                                   //If list is on current site, then allow writing (readonly = false)
      } else if ( isCurrentWeb === true || allowOtherSites === true ) {
          readOnly = false;                                   //Else If you explicitly tell it to allowOtherSites, then allow writing (readonly = false)
      }
  }

  return readOnly;

}

export function createProvisionTitlesRow( 
    provisionListTitles: string[], 
    lists: IMakeThisList[], 
    definedList: IDefinedLists, 
    createButtonOnClicks: any[], 
    updateTitleFunctions: any[],
    alwaysReadOnly: boolean, isCurrentWeb: boolean, allowOtherSites: boolean
  ) {
           
  const buttons: ISingleButtonProps[] = lists.map (( thelist, index ) => {
    let theLabel = null;
    let isDisabled = !thelist.webExists;

    if ( definedList === availLists[0] ) {
        isDisabled = true;
        theLabel = availLists[0];

    } else if ( thelist.webExists ) {
        if ( thelist.title === '' ) {
            theLabel = "Update Title";
            isDisabled = true;

        } else if ( isListReadOnly(thelist, alwaysReadOnly, isCurrentWeb, allowOtherSites) === false ) {

            if ( thelist.listExists === true ) {
                if ( thelist.sameTemplate === true ) {
                    theLabel = "UPDATE to " + thelist.listDefinition;

                } else {
                    theLabel = "Not a " + ( thelist.template === 100 ? "List" : "Library" );
                    isDisabled = true;
                }

            } else {
                theLabel = "Create as " + thelist.listDefinition;
            }

        } else {
            if ( thelist.listExists === true ) {
                theLabel = "Verify as " + thelist.listDefinition;
                console.log('render theList:', thelist ) ;

            } else {
                theLabel = "Can't verify List";
                isDisabled = true;
            }
        }
    } else {
        theLabel = thelist.title + ' web does not exist!';
    }

    return {     disabled: isDisabled,  checked: true, primary: false,
        label: theLabel, buttonOnClick: createButtonOnClicks[index], };
  });

  //let provisionButtons = <div style={{ paddingTop: '20px' }}><ButtonCompound buttons={buttons} horizontal={true}/></div>;

  let provisionButtons = buttons.map ( ( theButton, index ) => {
      let thisTitle = provisionListTitles[index];
      let titleBox = createBasicTextField(createTitleField(thisTitle), thisTitle, updateTitleFunctions[index], styles.listProvTextField1, index.toFixed() );
      return <div style={{ paddingTop: '20px' }}><div> { titleBox }</div><ButtonCompound buttons={[theButton]} horizontal={true} /></div>;
  });

  let listLinks = lists.map( mapThisList => (
      mapThisList.listExists ? links.createLink( mapThisList.listURL.replace('_layouts/15/undefined',''), '_none',  'Go to: ' + mapThisList.title ) : null ));

  const stackProvisionTokens: IStackTokens = { childrenGap: 70 };

  let provisionButtonRow = <Stack horizontal={true} wrap={true} horizontalAlign={"start"} verticalAlign= {"center"} tokens={stackProvisionTokens}>{/* Stack for Buttons and Fields */}
          { provisionButtons }
          { listLinks }
          {  }
      </Stack>;

  return provisionButtonRow;


}