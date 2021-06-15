
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

export const Category1 : IMultiChoiceField = {
  fieldType: cMChoice,
  name: 'Category1',
  choices: ['Daily','SPFx','Assistance','Team Meetings','Training'],
  onCreateProps: {
      Group: 'TMT Project Columns',
      Description: 'Project level choice category in entry form.',
  }
};

export const Category2 : IMultiChoiceField = {
  fieldType: cMChoice,
  name: 'Category2',
  choices: ['EU','NA','SA','Asia'],
  onCreateProps: {
      Group: 'TMT Project Columns',
      Description: 'Project level choice category in entry form.',
  }
};

export const ProjectID1 : ITextField = {
  fieldType: cText,
  name: 'ProjectID1',
  maxLength: 255,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Special field used by webpart which can change the entry format based on the value in the Project List field.  See documentation.',
  }
};

export const ProjectID2 : ITextField = {
  fieldType: cText,
  name: 'ProjectID2',
  maxLength: 255,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Special field used by webpart which can change the entry format based on the value in the Project List field.  See documentation.',
  }
};

export const Story : ITextField = {
  fieldType: cText,
  name: 'Story',
  maxLength: 255,
  onCreateProps: {
      Group: thisColumnGroup,
      Indexed: true,
      Description: 'Special field in Project list used create a Story in Charts. This is the primary filter for the Chart Story page.',
  }
};

export const Chapter : ITextField = {
  fieldType: cText,
  name: 'Chapter',
  maxLength: 255,
  onCreateProps: {
      Group: thisColumnGroup,
      Indexed: true,
      Description: 'Special field used by webpart which can change the entry format based on the value in the Project List field.  See documentation.',
  }
};

export const Active : IBooleanField = {
  fieldType: cBool,
  name: 'Active',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used by webpart to filter out old items that should not be loaded (archived).',
  }
};

export const Everyone : IBooleanField = {
  fieldType: cBool,
  name: 'Everyone',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used by webpart to easily find common or standard Project Items.',
  }
};