
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
  ChoiceFieldFormatType,
  DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
  FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField , 
  IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField , 
  IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook, 
  cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { DefStatusField, DefEffStatusField } from '../../ListProvisioning/component/provisionFunctions';

/***
 *     .d8b.  d8888b. d8888b.       d888b  d8888b.  .d88b.  db    db d8888b.      d8b   db  .d8b.  .88b  d88. d88888b 
 *    d8' `8b 88  `8D 88  `8D      88' Y8b 88  `8D .8P  Y8. 88    88 88  `8D      888o  88 d8' `8b 88'YbdP`88 88'     
 *    88ooo88 88   88 88   88      88      88oobY' 88    88 88    88 88oodD'      88V8o 88 88ooo88 88  88  88 88ooooo 
 *    88~~~88 88   88 88   88      88  ooo 88`8b   88    88 88    88 88~~~        88 V8o88 88~~~88 88  88  88 88~~~~~ 
 *    88   88 88  .8D 88  .8D      88. ~8~ 88 `88. `8b  d8' 88b  d88 88           88  V888 88   88 88  88  88 88.     
 *    YP   YP Y8888D' Y8888D'       Y888P  88   YD  `Y88P'  ~Y8888P' 88           VP   V8P YP   YP YP  YP  YP Y88888P 
 *                                                                                                                    
 *                                                                                                                    
 */

const thisColumnGroup = 'TrackTimeProject';



/***
 *    .d8888. db   db  .d8b.  d8888b. d88888b d8888b. 
 *    88'  YP 88   88 d8' `8b 88  `8D 88'     88  `8D 
 *    `8bo.   88ooo88 88ooo88 88oobY' 88ooooo 88   88 
 *      `Y8b. 88~~~88 88~~~88 88`8b   88~~~~~ 88   88 
 *    db   8D 88   88 88   88 88 `88. 88.     88  .8D 
 *    `8888Y' YP   YP YP   YP 88   YD Y88888P Y8888D' 
 *                                                    
 *                                                    
 */

export const Leader : IUserField = {
  fieldType: cUser,
  name: 'Leader',
  selectionMode: FieldUserSelectionMode.PeopleOnly,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Leader of this Project Item.  Helps you find Projects you own.',
      Indexed: true
  }
};

//export const Team : IXMLField = {
export const Team : IUserField = { //IXMLField
  fieldType: cMUser,
  name: 'Team',
  selectionMode: FieldUserSelectionMode.PeopleOnly,
//    xml: '<Field DisplayName="Team" Description="' +  TeamDesc + '" Format="Dropdown" List="UserInfo" Mult="TRUE" Name="Team" Title="Team" Type="UserMulti" UserSelectionMode="0" UserSelectionScope="0" ID="{1614eec8-246a-4d63-9ce9-eb8c8a733af1}" SourceID="{53db1cec-2e4f-4db9-b4be-8abbbae91ee7}" Group="' + thisColumnGroup + '" StaticName="Team" ColName="int2" RowOrdinal="0" />',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: "Other Team Members for this project. Helps you find projects you are working on.",
  },
};


export const CCList : IURLField = {
  fieldType: cURL,
  name: 'CCList',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used by web part to create Time Entry on secondary list at the same time... aka like Cc in email.',
  }
};

export const CCEmail : ITextField = {
  fieldType: cText,
  name: 'CCEmail',
  maxLength: 255,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'To be used by webpart to email this address for every entry.  Not yet used.',
  }
};


