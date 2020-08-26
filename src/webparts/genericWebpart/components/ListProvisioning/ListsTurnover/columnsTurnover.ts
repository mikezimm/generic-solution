
//  >>>> ADD import additional controls/components
import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField ,
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField ,
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '../../../../../services/listServices/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
    cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity,  cSLook, cComputed,  } from '../../../../../services/listServices/columnTypes';

//import { statusChoices, defStatus }  from '../../webparts/genericWebpart/components/GenericWebpart';

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '../../../../../services/listServices/columnsOOTB';

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

const thisColumnGroup = 'Used in Turnover list';
const colPrefix = 'zzz';
const thisDescription = 'Used in Turnover list';


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

export const Date01Turn : IDateTimeField = {
    fieldType: cDate,
    name: colPrefix + 'Date01',
    title: '1.0 - Date',
    displayFormat:  DateTimeFieldFormatType.DateTime,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        Indexed: false,
        Required: false,
    },
};

export const Date01TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Date01Turn.name + 'Calc',
    formula: '=IF(ISNUMBER([' + Date01Turn.title + ']),TEXT([' + Date01Turn.title + '],"YYYY-MM-DD"),"")',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Date01Turn.title + '^',
    }
};


let Choice1 = ["1. Days","2. Swings","3. Graves"];
export const Choice01Turn : IChoiceField = {
    fieldType: cChoice,
    name: colPrefix + 'Choice01',
    title: '1.1 - Shift',
    choices: Choice1,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + Choice1[Choice1.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const Choice01TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Choice01Turn.name + 'Calc',
    formula: '=IF(LEN([' + Choice01Turn.title +'])>0,[' + Choice01Turn.title +'],"")',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Choice01Turn.title + '^',
    }
};


let Choice2 = ["E8", "EA", "EB", "ED", "EE", "EG", "EM", "EN", "EP", "EQ", "ER", "EV", "EY", "EZ", "Other"];
export const ItemCategoryTurn : IChoiceField = {
    fieldType: cChoice,
    name: colPrefix + 'ItemCategory',
    title: '1.2 - Cell',
    choices: Choice2,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + Choice2[Choice2.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const ItemCategoryTurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: ItemCategoryTurn.name + 'Calc',
    formula: '=IF(LEN([' + ItemCategoryTurn.title +'])>0,[' + ItemCategoryTurn.title +'],"")',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: ItemCategoryTurn.title + '^',
    }
};

let Choice3 = ["0. Not Started", "1. Under Review", "2. In Process", "3. Verify", "4. Complete", "5. Rejected", "9. Cancelled"];
export const StatusTurn : IChoiceField = {
    fieldType: cChoice,
    name: colPrefix + 'Status',
    title: 'Status',
    choices: Choice3,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + Choice3[Choice3.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const StatusTurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: StatusTurn.name + 'Calc',
    formula: '=IF(LEN([' + StatusTurn.title +'])>0,[' + StatusTurn.title +'],"")',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: StatusTurn.title + '^',
    }
};

export const URL01Turn : IURLField = {
    fieldType: cURL,
    name: colPrefix + 'URL01',
    title: '3.1 - Downtime Link',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const Text01Turn : ITextField = {
    fieldType: cText,
    name: colPrefix + 'Text01',
    title: '3.5 - Scrapped parts',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const Text01TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Text01Turn.name + 'Calc',
    formula: '=IF(LEN([' + Text01Turn.title + '])>0,[' + Text01Turn.title + '],"")',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Text01Turn.title + '^',
    }
};

export const IdNumberTurn : ITextField = {
    fieldType: cText,
    name: colPrefix + 'IdNumber',
    title: 'IdNo',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const IdNumberTurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: IdNumberTurn.name + 'Calc',
    formula: '=[' + IdNumberTurn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: IdNumberTurn.title + '^',
    }
};

export const Number01Turn : INumberField = {
    fieldType: cNumb,
    name: colPrefix + 'Number01',
    title: '2.1 - Demand',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const Number01TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Number01Turn.name + 'Calc',
    formula: '=[' + Number01Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Number01Turn.title + '^',
    }
};

export const Number02Turn : INumberField = {
    fieldType: cNumb,
    name: colPrefix + 'Number02',
    title: '2.2 - Start',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const Number02TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Number02Turn.name + 'Calc',
    formula: '=[' + Number02Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Number02Turn.title + '^',
    }
};

export const Number03Turn : INumberField = {
    fieldType: cNumb,
    name: colPrefix + 'Number03',
    title: '2.3 - Total Time',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const Number03TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Number03Turn.name + 'Calc',
    formula: '=[' + Number03Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Number03Turn.title + '^',
    }
};

export const Number04Turn : INumberField = {
    fieldType: cNumb,
    name: colPrefix + 'Number04',
    title: '2.4 - Produced',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const Number04TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Number04Turn.name + 'Calc',
    formula: '=[' + Number04Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Number04Turn.title + '^',
    }
};

export const Number05Turn : INumberField = {
    fieldType: cNumb,
    name: colPrefix + 'Number05',
    title: '2.5 - DT',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const Number05TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Number05Turn.name + 'Calc',
    formula: '=[' + Number05Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Number05Turn.title + '^',
    }
};

export const Number06Turn : INumberField = {
    fieldType: cNumb,
    name: colPrefix + 'Number06',
    title: '2.6 - HC',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const Number06TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Number06Turn.name + 'Calc',
    formula: '=[' + Number06Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Number06Turn.title + '^',
    }
};

export const Number07Turn : INumberField = {
    fieldType: cNumb,
    name: colPrefix + 'Number07',
    title: '2.8 - Scrapped',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const Number07TurnCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: Number07Turn.name + 'Calc',
    formula: '=[' + Number07Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: Number07Turn.title + '^',
    }
};

export const KPI01TurnCalc : ICalculatedField = {
    fieldType: cCalcN,
    name: 'KPI01Calc',
    //=[2.6 - HC]*([2.3 - Total Time])/[2.4 - Produced]
    formula: '=[' + Number06Turn.title + ']*([ ' + Number03Turn.title + '])/[' + Number04Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: '4.1 - LMPU^',
    }
};

export const KPI02TurnCalc : ICalculatedField = {
    fieldType: cCalcN,
    name: 'KPI02Calc',
    //=[2.2 - Start]-[2.1 - Demand]+[2.4 - Produced]
    formula: '=[' + Number02Turn.title + ']-[' + Number01Turn.title + ']+[' + Number04Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: '4.2 - End of shift^	',
    }
};

export const KPI03TurnCalc : ICalculatedField = {
    fieldType: cCalcN,
    name: 'KPI03Calc',
    //=[2.8 - Scrapped]/[2.4 - Produced]
    formula: '=[' + Number07Turn.title + ']/[' + Number04Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: '2.9 - FTQ^',
    }
};

export const KPI04TurnCalc : ICalculatedField = {
    fieldType: cCalcN,
    name: 'KPI04Turn',
    //=[2.8 - Scrapped]/[2.4 - Produced]
    formula: '=[' + Number07Turn.title + ']/[' + Number01Turn.title + ']',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: '4.0 - PEFF^',
    }
};

export const KPI05TurnCalc : ICalculatedField = {
    fieldType: cCalcN,
    name: 'KPI05Calc',
    //=31/(25200/[2.1 - Demand^])
    formula: '=31/(25200/[' + Number01Turn.title + '])',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: '2.7 - # Required per Map^',
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


export function TurnOverFields(listName: 'TurnOver' | 'TurnOver') {
    //return null;

    let theseFields: IMyFieldTypes[] = BuildTurnOverFields(listName);

    console.log('HarmonieEmailFields', theseFields);
    return theseFields;
}


function BuildTurnOverFields(listName: 'TurnOver' | 'TurnOver') {

    let theseFields: IMyFieldTypes[] = [];

    theseFields.push(Date01Turn);  //BOTH
    theseFields.push(Date01TurnCalc);  //BOTH
    theseFields.push(Choice01Turn);  //BOTH
    theseFields.push(Choice01TurnCalc);  //BOTH
    theseFields.push(ItemCategoryTurn);  //BOTH
    theseFields.push(ItemCategoryTurnCalc);  //BOTH
    theseFields.push(StatusTurn);  //BOTH
    theseFields.push(StatusTurnCalc);  //BOTH
    theseFields.push(URL01Turn);  //BOTH
    theseFields.push(Text01Turn);  //BOTH
    theseFields.push(Text01TurnCalc);  //BOTH
    theseFields.push(IdNumberTurn);  //BOTH
    theseFields.push(IdNumberTurnCalc);  //BOTH
    theseFields.push(Number01Turn);  //BOTH
    theseFields.push(Number01TurnCalc);  //BOTH
    theseFields.push(Number02Turn);  //BOTH
    theseFields.push(Number02TurnCalc);  //BOTH
    theseFields.push(Number03Turn);  //BOTH
    theseFields.push(Number03TurnCalc);  //BOTH
    theseFields.push(Number04Turn);  //BOTH
    theseFields.push(Number04TurnCalc);  //BOTH
    theseFields.push(Number05Turn);  //BOTH
    theseFields.push(Number05TurnCalc);  //BOTH
    theseFields.push(Number06Turn);  //BOTH
    theseFields.push(Number06TurnCalc);  //BOTH
    theseFields.push(Number07Turn);  //BOTH
    theseFields.push(Number07TurnCalc);  //BOTH
    theseFields.push(KPI01TurnCalc);  //BOTH
    theseFields.push(KPI02TurnCalc);  //BOTH
    theseFields.push(KPI03TurnCalc);  //BOTH
    theseFields.push(KPI04TurnCalc);  //BOTH
    theseFields.push(KPI05TurnCalc);  //BOTH


    return theseFields;

}


