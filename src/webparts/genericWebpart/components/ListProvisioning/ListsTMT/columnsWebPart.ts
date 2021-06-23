//  >>>> ADD import additional controls/components
import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField , 
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField , 
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook, 
    cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

//import { statusChoices, defStatus }  from '../../webparts/genericWebpart/components/GenericWebpart';

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '@mikezimm/npmfunctions/dist/Lists/columnsOOTB';

//SHARED Columns
import {Leader, Team, CCList, CCEmail } from './columnsTMT';
import {Category1, Category2, ProjectID1, ProjectID2, Story, Chapter, Everyone, Active,  } from './columnsLabels';
import { StatusTMT, StatusNumber, StatusText, EffectiveStatus, IsOpen } from './columnsStatus';
import { DueDateTMT, CompletedDateTMT, CompletedByTMT} from './columnsStatus';
//PROJECT columns
import { SortOrder, ActivityType, ActivityTMT, ActivtyURLCalc, OptionsTMT, OptionsTMTCalc,
	ProjectEditOptions, HistoryTMT, TimeTarget, StepChecks} from './columnsAdvanced';

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
 *    d88888b db    db  .d8b.  .88b  d88. d8888b. db      d88888b       .o88b.  .d88b.  db      db    db .88b  d88. d8b   db .d8888. 
 *    88'     `8b  d8' d8' `8b 88'YbdP`88 88  `8D 88      88'          d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88 88'  YP 
 *    88ooooo  `8bd8'  88ooo88 88  88  88 88oodD' 88      88ooooo      8P      88    88 88      88    88 88  88  88 88V8o 88 `8bo.   
 *    88~~~~~  .dPYb.  88~~~88 88  88  88 88~~~   88      88~~~~~      8b      88    88 88      88    88 88  88  88 88 V8o88   `Y8b. 
 *    88.     .8P  Y8. 88   88 88  88  88 88      88booo. 88.          Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888 db   8D 
 *    Y88888P YP    YP YP   YP YP  YP  YP 88      Y88888P Y88888P       `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P `8888Y' 
 *                                                                                                                                   
 *                                                                                                                                   
 */

export const example : ITextField = {
    fieldType: cText,
    name: 'xyz',
    title: 'xyz Title visible',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'To be used by webpart to email this address for every entry.  Not yet used.',
    },
    onCreateChanges: {
        //Hidden: true,
        Title: 'xyz Title Updated on Create',
    },
    showNew: true,
    showEdit: true,
    showDisplay: false,
    changes1: { Title: 'xyz Title changes1' },  //Properties you want changed any time in your code
    changes2: { Title: 'xyz Title changes2' },  //Properties you want changed any time in your code
    changes3: { Title: 'xyz Title changes3' },  //Properties you want changed any time in your code
    changesFinal: { Title: 'xyz Title changesFinal' },  //Properties you want changed at the very end... like hiding fields once formula columns are created and views are also created (can't add to view if it's hidden)

    //showDisplay: false,
};

/***
 *    d8888b. d88888b  .d8b.  db            .o88b.  .d88b.  db      db    db .88b  d88. d8b   db .d8888. 
 *    88  `8D 88'     d8' `8b 88           d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88 88'  YP 
 *    88oobY' 88ooooo 88ooo88 88           8P      88    88 88      88    88 88  88  88 88V8o 88 `8bo.   
 *    88`8b   88~~~~~ 88~~~88 88           8b      88    88 88      88    88 88  88  88 88 V8o88   `Y8b. 
 *    88 `88. 88.     88   88 88booo.      Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888 db   8D 
 *    88   YD Y88888P YP   YP Y88888P       `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P `8888Y' 
 *                                                                                                       
 *                                                                                                       
 */


/***
 *    d8888b. d8888b. d888888b .88b  d88.  .d8b.  d8888b. db    db 
 *    88  `8D 88  `8D   `88'   88'YbdP`88 d8' `8b 88  `8D `8b  d8' 
 *    88oodD' 88oobY'    88    88  88  88 88ooo88 88oobY'  `8bd8'  
 *    88~~~   88`8b      88    88  88  88 88~~~88 88`8b      88    
 *    88      88 `88.   .88.   88  88  88 88   88 88 `88.    88    
 *    88      88   YD Y888888P YP  YP  YP YP   YP 88   YD    YP    
 *                                                                 
 *                                                                 
 */



/***
 *    d888888b d888888b .88b  d88. d88888b       .d88b.  d8b   db db      db    db 
 *    `~~88~~'   `88'   88'YbdP`88 88'          .8P  Y8. 888o  88 88      `8b  d8' 
 *       88       88    88  88  88 88ooooo      88    88 88V8o 88 88       `8bd8'  
 *       88       88    88  88  88 88~~~~~      88    88 88 V8o88 88         88    
 *       88      .88.   88  88  88 88.          `8b  d8' 88  V888 88booo.    88    
 *       YP    Y888888P YP  YP  YP Y88888P       `Y88P'  VP   V8P Y88888P    YP    
 *                                                                                 
 *                                                                                 
 */


export const Activity : IURLField = {
    fieldType: cURL,
    name: 'Activity',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Link to the activity you are working on.',
    }
};

export const DeltaT : INumberField = {
    fieldType: cNumb,
    name: 'DeltaT',
    minValue: minInfinity,
    maxValue: maxInfinity,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'May be used to indicate difference between when an entry is created and the actual time of the entry.',
    }
};

export const Comments : ITextField = {
    fieldType: cText,
    name: 'Comments',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
    },
};

export const DescriptionSaveAtTime = 'Saved at time of creation for comparison of changes.';
export const OriginalHours : INumberField = {
    fieldType: cNumb,
    name: 'OriginalHours',
    minValue: minInfinity,
    maxValue: maxInfinity,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: DescriptionSaveAtTime,
    },
    changesFinal: {
        Hidden: true, //This needs to be hidden later because it's used in a calculated column.
        Title: 'OriginalHours*'
    },
};

export const StartTime : IDateTimeField = {
    fieldType: cDate,
    name: 'StartTime',
    displayFormat:  DateTimeFieldFormatType.DateTime,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Start Time for this entry.',
        Indexed: true,
        Required: true,
    },
};

export const EndTime : IDateTimeField = {
    fieldType: cDate,
    name: 'EndTime',
    displayFormat:  DateTimeFieldFormatType.DateTime,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'End Time for this entry.',
        Required: true,
    },
};

export const OriginalStart : IDateTimeField = {
    fieldType: cDate,
    name: 'OriginalStart',
    displayFormat:  DateTimeFieldFormatType.DateTime,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: DescriptionSaveAtTime,
        Indexed: true,
    },
    changesFinal: {
        Hidden: true, //This needs to be hidden later because it's used in a calculated column.
        Title: 'OriginalStart*'
    },
};

export const OriginalEnd : IDateTimeField = {
    fieldType: cDate,
    name: 'OriginalEnd',
    displayFormat:  DateTimeFieldFormatType.DateTime,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: DescriptionSaveAtTime,
    },
    changesFinal: {
        Hidden: true, //This needs to be hidden later because it's used in a calculated column.
        Title: 'OriginalEnd*'
    },
};

export const Hours : ICalculatedField = {
    fieldType: cCalcN,
    name: 'Hours',
    formula: '=IFERROR(24*(EndTime-StartTime),"")',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    //ReadOnlyField: true,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Calculates Start to End time in Hours.',
    },
};

export const Days : ICalculatedField = {
    fieldType: cCalcN,
    name: 'Days',
    formula: '=IFERROR((EndTime-StartTime),"")',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    //ReadOnlyField: true,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Calculates Start to End time in Days.',
    },
};

export const Minutes : ICalculatedField = {
    fieldType: cCalcN,
    name: 'Minutes',
    formula: '=IFERROR(24*60*(EndTime-StartTime),"")',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    //ReadOnlyField: true,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Calculates Start to End time in Minutes.',
    },
};

export const KeyChanges : ICalculatedField = {
    fieldType: cCalcN,
    name: 'KeyChanges',
    formula: '=IF(OriginalHours="","-NoOriginalHours",IF(ABS(Hours-OriginalHours)>0.05,"-HoursChanged",""))&IF(OriginalStart="","-NoOriginalStart",IF(StartTime<>OriginalStart,"-StartChanged",""))&IF(OriginalEnd="","-NoOriginalEnd",IF(EndTime<>OriginalEnd,"-EndChanged",""))',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    //ReadOnlyField: true,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Calculates if significant changes were made after item was created.',
    },
    changesFinal: {
        Title: 'KeyChanges*',
        Hidden: true,
    }
};

export const MinutesChanged : ICalculatedField = {
    fieldType: cCalcN,
    name: 'MinutesChanged',
    formula: '=ROUNDDOWN((Hours-OriginalHours)*60,0)',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Total Minutes that were adjusted since creating the item.',
    },
    changesFinal: {
        Title: 'Minutes Changed*',
        Hidden: true,
    }
    
};

export const SourceProject : IURLField = {
    fieldType: cURL,
    name: 'SourceProject',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Link to the Project List item used to create this entry.',
    }
};

export const SourceProjectRef : ITextField = {
    fieldType: cText,
    name: 'SourceProjectRef',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Used by webpart to get source project information.',
        Hidden: true,
        Indexed: true,
    },
};

export const Settings : ITextField = {
    fieldType: cText,
    name: 'Settings',
    maxLength: 255,
    onCreateProps: {
        Description: 'For internal use of webpart',
        Group: thisColumnGroup,
    },
};

export const Location : ITextField = {
    fieldType: cText,
    name: 'Location',
    maxLength: 255,
    onCreateProps: {
        Description: 'Optional category to indicate where time was spent.  Such as Office, Customer, Home, Traveling etc.',
        Group: thisColumnGroup,
    },
};

export const EntryType : ITextField = {
    fieldType: cText,
    name: 'EntryType',
    maxLength: 255,
    onCreateProps: {
        Description: 'Shows what entry type was used, used in Charting.',
        Group: thisColumnGroup,
    },
};

export const User : IUserField = {
    fieldType: cUser,
    name: 'User',
    selectionMode: FieldUserSelectionMode.PeopleOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'The person this time entry applies to.',
        Indexed: true
    }
};


/***
 *     .o88b.  .d8b.  db       .o88b. db    db db       .d8b.  d888888b d88888b d8888b. 
 *    d8P  Y8 d8' `8b 88      d8P  Y8 88    88 88      d8' `8b `~~88~~' 88'     88  `8D 
 *    8P      88ooo88 88      8P      88    88 88      88ooo88    88    88ooooo 88   88 
 *    8b      88~~~88 88      8b      88    88 88      88~~~88    88    88~~~~~ 88   88 
 *    Y8b  d8 88   88 88booo. Y8b  d8 88b  d88 88booo. 88   88    88    88.     88  .8D 
 *     `Y88P' YP   YP Y88888P  `Y88P' ~Y8888P' Y88888P YP   YP    YP    Y88888P Y8888D' 
 *                                                                                      
 *                                                                                      
 */




 /***
 *    db   db d888888b d8888b. d8888b. d88888b d8b   db 
 *    88   88   `88'   88  `8D 88  `8D 88'     888o  88 
 *    88ooo88    88    88   88 88   88 88ooooo 88V8o 88 
 *    88~~~88    88    88   88 88   88 88~~~~~ 88 V8o88 
 *    88   88   .88.   88  .8D 88  .8D 88.     88  V888 
 *    YP   YP Y888888P Y8888D' Y8888D' Y88888P VP   V8P 
 *                                                      
 *                                                      
 */




/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~' 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88    
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88    
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88    
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP    
 *                                                       
 *                                                       
 */
/***
 *     .o88b.  .d88b.  db      db    db .88b  d88. d8b   db       .d8b.  d8888b. d8888b.  .d8b.  db    db .d8888. 
 *    d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 88'  YP 
 *    8P      88    88 88      88    88 88  88  88 88V8o 88      88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  `8bo.   
 *    8b      88    88 88      88    88 88  88  88 88 V8o88      88~~~88 88`8b   88`8b   88~~~88    88      `Y8b. 
 *    Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888      88   88 88 `88. 88 `88. 88   88    88    db   8D 
 *     `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P      YP   YP 88   YD 88   YD YP   YP    YP    `8888Y' 
 *                                                                                                                
 *                                                                                                                
 */

/**
 * This just creates an array of fields for the build/test sequence
 * Each list would have an array of field objects like this.
 */


export function TMTProjectFields() {
    //return null;

    let theseFields: IMyFieldTypes[] = TMTFields('Projects');

    console.log('TMTProjectFields', theseFields);
    return theseFields;
}

export function TMTTimeFields() {
    let theseFields: IMyFieldTypes[] = TMTFields('TrackMyTime');
    console.log('TMTTimeFields', theseFields);
    
    return theseFields;
}

export function TMTFields(listName: 'Projects' | 'TrackMyTime') {

    let theseFields: IMyFieldTypes[] = [];
    if (listName === 'Projects' ) { theseFields.push(SortOrder); }  //Project
    if (listName === 'Projects' ) { theseFields.push(Everyone); }  //Project
    if (listName === 'Projects' ) { theseFields.push(Active); }  //Project

    theseFields.push(Leader);  //BOTH
    theseFields.push(Team);  //BOTH

    theseFields.push(Category1);  //BOTH
    theseFields.push(Category2);  //BOTH

    theseFields.push(ProjectID1);  //BOTH
    theseFields.push(ProjectID2);  //BOTH
    theseFields.push(Story);  //BOTH
    theseFields.push(Chapter);  //BOTH

    if (listName === 'Projects' ) { theseFields.push(ActivityType); }  //Project
    if (listName === 'Projects' ) { theseFields.push(ActivityTMT); }  //Project
    if (listName === 'Projects' ) { theseFields.push(ActivtyURLCalc); }  //Project
    if (listName === 'Projects' ) { theseFields.push(OptionsTMT); }  //Project
    if (listName === 'Projects' ) { theseFields.push(OptionsTMTCalc); }  //Project

    theseFields.push(StatusTMT);  //BOTH        - must be before StatusNumber, StatusText, StepChecks, EffectiveStatus, IsOpen
    theseFields.push(StatusNumber);  //BOTH     - must be before StatusNumber, StatusText, StepChecks, EffectiveStatus, IsOpen
    theseFields.push(StatusText);  //BOTH       - must be before StatusNumber, StatusText, StepChecks, EffectiveStatus, IsOpen

    let checks = StepChecks(0,5);  //Project
    theseFields.push(...checks);  //Project

    if (listName === 'Projects' ) { theseFields.push(EffectiveStatus); }  //Project
    if (listName === 'Projects' ) { theseFields.push(IsOpen); }  //Project

    theseFields.push(DueDateTMT);  //BOTH
    theseFields.push(CompletedDateTMT);  //BOTH
    theseFields.push(CompletedByTMT);  //BOTH

    if (listName === 'Projects' ) { theseFields.push(ProjectEditOptions); }  //Project
    if (listName === 'Projects' ) { theseFields.push(HistoryTMT); }  //Project
    if (listName === 'Projects' ) { theseFields.push(TimeTarget); }  //Project

    if (listName === 'TrackMyTime' ) { theseFields.push(Activity); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(DeltaT); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(Comments); }  //Time

    if (listName === 'TrackMyTime' ) { theseFields.push(User); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(StartTime); }  //Time      - must be before Hours, Days, Minutes, KeyChanges
    if (listName === 'TrackMyTime' ) { theseFields.push(EndTime); }  //Time        - must be before Hours, Days, Minutes, KeyChanges
    if (listName === 'TrackMyTime' ) { theseFields.push(OriginalStart); }  //Time  - must be before Hours, Days, Minutes, KeyChanges
    if (listName === 'TrackMyTime' ) { theseFields.push(OriginalEnd); }  //Time    - must be before Hours, Days, Minutes, KeyChanges
    if (listName === 'TrackMyTime' ) { theseFields.push(OriginalHours); }  //Time  - must be before KeyChanges

    if (listName === 'TrackMyTime' ) { theseFields.push(Hours); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(Days); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(Minutes); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(KeyChanges); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(MinutesChanged); }  //Time
    
    if (listName === 'TrackMyTime' ) { theseFields.push(SourceProject); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(SourceProjectRef); }  //Time

    if (listName === 'TrackMyTime' ) { theseFields.push(Settings); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(Location); }  //Time
    if (listName === 'TrackMyTime' ) { theseFields.push(EntryType); }  //Time

    theseFields.push(CCList);  //BOTH
    theseFields.push(CCEmail);  //BOTH

    return theseFields;

}


