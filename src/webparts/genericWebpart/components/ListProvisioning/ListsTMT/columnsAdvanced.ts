
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
  ChoiceFieldFormatType,
  DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
  FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField , 
  IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField , 
  IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook, 
  cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../../../../../services/railsCommon/ProvisionTypes';

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

export const SortOrder : INumberField = {
  fieldType: cNumb,
  name: 'SortOrder',
  minValue: 0,
  maxValue: 1000,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used by webpart to sort list of projects.',
  }
};


export const TimeTarget : ITextField = {
  fieldType: cText,
  name: 'TimeTarget',
  maxLength: 255,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used by webpart to define targets for charting.',
  }
};

export const ActivityType : IChoiceField = {
  fieldType: cChoice,
  name: 'ActivityType',
  choices: [`Build`, `Test`, `Ship`, `Verify`, `Order`],
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used as rule to apply to Project Activy Text to build Activity URL.',
  }
};

export const ActivityTMT : ITextField = {
  fieldType: cText,
  name: 'ActivityTMT',
  maxLength: 255,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used to complete Activity URL based on the selected choice.  Auto Builds Activity Link in TrackMyTime form.',
  },
  onCreateChanges: {
      Title: 'Activity',
  }
};

export const ActivtyURLCalc : ICalculatedField = {
  fieldType: cCalcN,
  name: 'ActivtyURLCalc',
  formula: '=IF(ActivityType="Build","https://plm. ..... /enovia/common/emxNavigator.jsp?type=GEOBuildOrder&name=[Activity]&rev=-&return=specific",IF(ActivityType="Ship","https://alvweb.alv.autoliv.int/PRISM/SalesOrder_List.aspx?Order=[Activity]",IF(ActivityType="TMT Issue","https://github.com/mikezimm/GenericWebpart/issues/[Activity]",IF(ActivityType="Socialiis Issue","https://github.com/mikezimm/Social-iis-7/issues/[Activity]",IF(ActivityType="Pivot Tiles Issue","https://github.com/mikezimm/Pivot-Tiles/issues/[Activity]","")))))',
  dateFormat: DateTimeFieldFormatType.DateOnly,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used to build goto links for Activity and Activity Choice.  See docs for syntax.',
  },
  onCreateChanges: {
      Title: 'ActivityURL^',
  }
};

export const OptionsTMT : ITextField = {
  fieldType: cText,
  name: 'OptionsTMT',
  maxLength: 255,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Special field for enabling special project level options in the webpart.',
  },
  onCreateChanges: {
      Title: 'Options',
  }
};

export const OptionsTMTCalc : ICalculatedField = {
  fieldType: cCalcT,
  name: 'OptionsTMTCalc',
  dateFormat: DateTimeFieldFormatType.DateOnly,
  formula: '=IF(ISNUMBER(FIND("JIRA",ActivityType)),"icon=Info;","")&IF(OR(ISNUMBER(FIND("Lunch",Title)),ISNUMBER(FIND("Break",Title))),"icon=EatDrink;fColor=green","")&IF(ISNUMBER(FIND("Email",Title)),"icon=MailCheck;","")&IF(ISNUMBER(FIND("Training",Title)),"icon=BookAnswers;fColor=blue","")&IF(ISNUMBER(FIND("Meet",Title)),"icon=Group;","")&IF(ISNUMBER(FIND("Test",Title)),"icon=TestAutoSolid;","")',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Used to create Project settings like Icons, font color etc.  See docs for syntax.',
  },
  onCreateChanges: {
      Title: 'Options^',
  }
};

/**
* NOTE there is a duplicate of this function in DefinedComponents\columnsComponents
* @param min
* @param max 
*/
export function StepChecks(min: number, max: number) {
  let checkFields: IMyFieldTypes[] = [];
  for (let i = min; i <= max; i++) {
      let thisCheck = i === 0 ? '=IF(AND([StatusNumber]>' + i + ',[StatusNumber]>' + i + '),"Yes","No")'
      : '=IF(AND(Step' + (i - 1) + 'Check="Yes",[StatusNumber]>' + i + '),"Yes","No")';

      const thisField : ICalculatedField = {
          fieldType: cCalcN,
          name: 'Step' + i + 'Check',
          dateFormat: DateTimeFieldFormatType.DateOnly,
          formula: thisCheck,
          onCreateProps: {
              Group: thisColumnGroup,
              Description: 'Can be used to have checks at different status to impact Effective Status instead of just a number.',
          },
      };
      checkFields.push(thisField);  //Project
  }
  return checkFields;
}



export const HistoryTMT : IMultiLineTextField = {
  fieldType: cMText,
  name: 'HistoryTMT',
  //title: string,
  numberOfLines: 6,
  richText: false,
  restrictedMode: false,
  appendOnly: false,
  allowHyperlink: false,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Special field for change history from webpart.',
      Hidden: true,
  }
};

export const ProjectEditOptions : ITextField = {
  fieldType: cText,
  name: 'ProjectEditOptions',
  maxLength: 255,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Hidden field used to remember settings on Project Edit page for this project.',
      Hidden: true,
  },
};
