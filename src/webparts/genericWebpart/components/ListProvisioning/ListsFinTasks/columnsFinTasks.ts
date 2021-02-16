



//  >>>> ADD import additional controls/components
import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField ,
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField ,
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '@mikezimm/npmfunctions/dist/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
    cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity,  cSLook, cComputed,  } from '@mikezimm/npmfunctions/dist/columnTypes';

//import { statusChoices, defStatus }  from '../../webparts/genericWebpart/components/GenericWebpart';

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '@mikezimm/npmfunctions/dist/columnsOOTB';

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

const thisColumnGroup = 'Used in SocialiiS list';
const colPrefix = 'zzz';
const thisDescription = 'Used in SocialiiS list';

export type IFinTasksDefs = 'Finance Tasks' | 'OurTasks' ;


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
    name: colPrefix + 'xyz',
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

export const Choice1Periods = ["01 Jan", "02 Feb", "03 Mar", "03 EQ3", "04 Apr", "05 May", "06 Jun", "06 EQ6", "07 Jul", "08 Aug", "09 Sep", "09 EQ9", "10 Oct", "11 Nov", "11 FC", "12 Dec", "12 EQ12"];
export const PeriodFin : IChoiceField = {
    fieldType: cChoice,
    name: 'Period',
    title: 'Period',
    choices: Choice1Periods,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + Choice1Periods[Choice1Periods.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const Choice2Years = ["2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035"];
export const YearFin : IChoiceField = {
    fieldType: cChoice,
    name: 'Year',
    title: 'Year',
    choices: Choice2Years,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + Choice2Years[Choice2Years.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const PercentCompleteFin : INumberField = {
    fieldType: cNumb,
    name: 'PercentComplete',
    title: '% Complete',
    minValue: 0,
    maxValue: 1,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Used by webpart to sort list of projects.',
    }
};

export const ReviewDaysFin : INumberField = {
    fieldType: cNumb,
    name: 'ReviewDays',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Used by webpart to sort list of projects.',
    }
};

export const CommentsFin : ITextField = {
    fieldType: cText,
    name: 'Comments',
    title: 'Comments',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'To be used by webpart to email this address for every entry.  Not yet used.',
    }
};

export const DeadlineFin : ITextField = {
    fieldType: cText,
    name: 'Deadline',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'To be used by webpart to email this address for every entry.  Not yet used.',
    }
};

export const BodyFin : ITextField = {
    fieldType: cText,
    name: 'Body',
    title: 'Description',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'To be used by webpart to email this address for every entry.  Not yet used.',
    }
};

export const EntityFin : ITextField = {
    fieldType: cText,
    name: 'Entity',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'To be used by webpart to email this address for every entry.  Not yet used.',
    }
};

export const ReferenceFin : ITextField = {
    fieldType: cText,
    name: 'Reference',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'To be used by webpart to email this address for every entry.  Not yet used.',
    }
};

export const FinTasksFrequencyChoices = ['Daily','Weekly','Monthly','Quarterly','Annual','Week 1','PC Week','Other',];
export const FrequencyFin : IChoiceField = {
    fieldType: cChoice,
    name: 'Frequency',
    title: 'Frequency',
    choices: FinTasksFrequencyChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + FinTasksFrequencyChoices[FinTasksFrequencyChoices.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const OOTBTaskPriorityChoices = ["(1) High", "(2) Normal", "(3) Low"];
export const PriorityFin : IChoiceField = {
    fieldType: cChoice,
    name: 'Priority',
    title: 'Priority',
    choices: OOTBTaskPriorityChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + OOTBTaskPriorityChoices[OOTBTaskPriorityChoices.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const FinanceStageChoices = ['1. Preperation','2. Reporting','3. Distribution','4. Other',];
export const StageFin : IChoiceField = {
    fieldType: cChoice,
    name: 'Stage',
    title: 'Stage',
    choices: FinanceStageChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + FinanceStageChoices[FinanceStageChoices.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const OOTBTaskStatus = ['Not Started','In Progress','Completed','Deferred','Waiting on someone else',];
export const StatusFin : IChoiceField = {
    fieldType: cChoice,
    name: 'Status',
    title: 'Task Status',
    choices: OOTBTaskStatus,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + OOTBTaskStatus[OOTBTaskStatus.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const AssignedToFin : IUserField = {
    fieldType: cUser,
    name: 'AssignedTo',
    title: 'Assigned To',
    selectionMode: FieldUserSelectionMode.PeopleOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        Indexed: true
    }
};

export const BackupFin : IUserField = {
    fieldType: cUser,
    name: 'Backup',
    selectionMode: FieldUserSelectionMode.PeopleOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        Indexed: true
    }
};

export const ReviewerFin : IUserField = {
    fieldType: cUser,
    name: 'Reviewer',
    selectionMode: FieldUserSelectionMode.PeopleOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        Indexed: true
    }
};

export const RevAlternateFin : IUserField = {
    fieldType: cUser,
    name: 'ReviewerAlternate',
    title: 'Reviewer Alternate',
    selectionMode: FieldUserSelectionMode.PeopleOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        Indexed: true
    }
};


export const DueDateFin : IDateTimeField = {
    fieldType: cDate,
    name: 'DueDate',
    title: 'Due Date',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'Due Date',
    }
};

export const RevisionDateFin : IDateTimeField = {
    fieldType: cDate,
    name: 'RevisionDate',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'Revision Date',
    }
};

export const StartDateFin : IDateTimeField = {
    fieldType: cDate,
    name: 'StartDate',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'Start Date',
    }
};

export const HasCopyDestFin : IBooleanField = {
    fieldType: cBool,
    name: 'HasCopyDestinations',
    title: 'Has Copy Destinations',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const IsCurrentVerFin : IBooleanField = {
    fieldType: cBool,
    name: 'IsCurrentVersion',
    title: 'Is Current Version',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};


    export const ReviewDateFin : ICalculatedField = {
        fieldType: cCalcN,
        name: 'ReviewDate',
        //=[Due Date]-ReviewDays*1
        formula: '=[' + DueDateFin.title + ']-[' + ReviewDaysFin.name + ']',
        dateFormat: DateTimeFieldFormatType.DateOnly,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: thisDescription,
        },
        onCreateChanges: {
            Title: 'ReviewDate',
        }
    };

    export const YearPerFinCalc : ICalculatedField = {
        fieldType: cCalcT,
        name: 'YearPer',
        //=[!Year]&"-"&[!Period]
        formula: '=[' + YearFin.title + ']&"-"&[' + PeriodFin.title + ']',
        dateFormat: DateTimeFieldFormatType.DateOnly,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: thisDescription,
        },
        onCreateChanges: {
            Title: 'Year-Per ^',
        }
    };

    export const YearPerFreqFinCalc : ICalculatedField = {
        fieldType: cCalcT,
        name: 'YearPerFreq',
        //=[!Year]&" - "&[!Period]&" ("&IF(LEN([Frequency^])>0,[Frequency^]," -na- ")&")"
        formula: '=[' + YearFin.title + ']&" - "&[' + PeriodFin.title + ']&" ("&IF(LEN([' + FrequencyFin.title + '])>0,[' + FrequencyFin.title + ']," -na- ")&")"',
        dateFormat: DateTimeFieldFormatType.DateOnly,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: thisDescription,
        },
        onCreateChanges: {
            Title: 'Year-Per-Freq ^',
        }
    };



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


export function FinTasksFields(listName: IFinTasksDefs ) {
    //return null;

    let theseFields: IMyFieldTypes[] = BuildFinTasksFields(listName);
    return theseFields;
}


function BuildFinTasksFields(listName: IFinTasksDefs ) {

    let theseFields: IMyFieldTypes[] = [];

    theseFields.push(YearFin);  //BOTH
    theseFields.push(PeriodFin);  //BOTH
    theseFields.push(PercentCompleteFin);  //BOTH
    theseFields.push(ReviewDaysFin);  //BOTH
    theseFields.push(CommentsFin);  //BOTH
    theseFields.push(DeadlineFin);  //BOTH
    theseFields.push(BodyFin);  //BOTH
    theseFields.push(EntityFin);  //BOTH
    theseFields.push(ReferenceFin);  //BOTH
    theseFields.push(FrequencyFin);  //BOTH
    theseFields.push(PriorityFin);  //BOTH
    theseFields.push(StageFin);  //BOTH
    theseFields.push(StatusFin);  //BOTH
    theseFields.push(AssignedToFin);  //BOTH
    theseFields.push(BackupFin);  //BOTH
    theseFields.push(ReviewerFin);  //BOTH
    theseFields.push(RevAlternateFin);  //BOTH
    theseFields.push(DueDateFin);  //BOTH
    theseFields.push(RevisionDateFin);  //BOTH
    theseFields.push(StartDateFin);  //BOTH
    theseFields.push(HasCopyDestFin);  //BOTH
    theseFields.push(IsCurrentVerFin);  //BOTH
    theseFields.push(ReviewDateFin);  //BOTH
    theseFields.push(YearPerFinCalc);  //BOTH
    theseFields.push(YearPerFreqFinCalc);  //BOTH
    return theseFields;

}


