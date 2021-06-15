

import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
  ChoiceFieldFormatType,
  DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
  FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField , 
  IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField , 
  IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook, 
  cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

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
 *    d8888b. d8888b.  .d88b.     d88b d88888b  .o88b. d888888b       .d88b.  d8b   db db      db    db 
 *    88  `8D 88  `8D .8P  Y8.    `8P' 88'     d8P  Y8 `~~88~~'      .8P  Y8. 888o  88 88      `8b  d8' 
 *    88oodD' 88oobY' 88    88     88  88ooooo 8P         88         88    88 88V8o 88 88       `8bd8'  
 *    88~~~   88`8b   88    88     88  88~~~~~ 8b         88         88    88 88 V8o88 88         88    
 *    88      88 `88. `8b  d8' db. 88  88.     Y8b  d8    88         `8b  d8' 88  V888 88booo.    88    
 *    88      88   YD  `Y88P'  Y8888P  Y88888P  `Y88P'    YP          `Y88P'  VP   V8P Y88888P    YP    
 *                                                                                                      
 *                                                                                                      
 */


export const defStatus = '0. Review';
export const planStatus = '1. Plan';
export const processStatus = '2. Process';
export const parkStatus = '8. Parking lot';
export const cancelStatus = '9. Cancelled';
export const completeStatus = '9. Complete';

export const statusChoices : string[] = [defStatus, planStatus, processStatus, parkStatus, cancelStatus, completeStatus];

export const StatusTMT : IChoiceField = {
  fieldType: cChoice,
  name: 'StatusTMT',
  choices: statusChoices,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used as rule to apply to Project Activy Text to build Activity URL.',
      DefaultValue: defStatus,
      Indexed: true,
  },
  onCreateChanges: {
      Title: 'Status',  //NOTE:  Removed import of Title from provisionFunctions and it now shows correctly.  Must have been circular reference.
  }
};

export const StatusNumber : ICalculatedField = {
  fieldType: cCalcN,
  name: 'StatusNumber',
  formula: '=VALUE(LEFT(Status,1))',
  dateFormat: DateTimeFieldFormatType.DateOnly,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used in various places to track status.',
  },
};

export const StatusText : ICalculatedField = {
  fieldType: cCalcT,
  name: 'StatusText',
  formula: '=TRIM(MID(Status,FIND(".",Status)+1,100))',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used in various places to track status.',
  },
};


export const EffectiveStatus : ICalculatedField = {
  fieldType: cCalcN,
  name: 'EffectiveStatus',
  dateFormat: DateTimeFieldFormatType.DateOnly,
  formula: '=(IF([StatusNumber]=9,9,IF([StatusNumber]=8,8,IF(Step4Check="Yes",5,IF(Step3Check="Yes",4,IF(Step2Check="Yes",3,IF(Step1Check="Yes",2,IF(Step0Check="Yes",1,0))))))))',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Can be used to have checks at different status to impact Effective Status instead of just a number.',
  },
};

export const IsOpen : ICalculatedField = {
  fieldType: cCalcN,
  name: 'IsOpen',
  dateFormat: DateTimeFieldFormatType.DateOnly,
  formula: '=IF(EffectiveStatus<9,"Yes","No")',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Can be used to have checks at different status to impact Effective Status instead of just a number.',
  },
};



export const DueDateTMT : IDateTimeField = {
  fieldType: cDate,
  name: 'DueDateTMT',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'For use when using Project List for Task tracking.',
  },
  onCreateChanges: {
      Title: 'Due Date',
  }
};

export const CompletedDateTMT : IDateTimeField = {
  fieldType: cDate,
  name: 'CompletedDateTMT',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'For use when using Project List for Task tracking.',
      Indexed: true,
  },
  onCreateChanges: {
      Title: 'Completed',
  }
};

export const CompletedByTMT : IUserField = {
  fieldType: cUser,
  name: 'CompletedByTMT',
  selectionMode: FieldUserSelectionMode.PeopleOnly,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'For use when using Project List for Task tracking.',
      Indexed: true,
  },
  onCreateChanges: {
      Title: 'Completed By',
  }
};