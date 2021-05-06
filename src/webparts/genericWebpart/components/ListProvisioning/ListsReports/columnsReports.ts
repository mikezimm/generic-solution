


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
    cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity,  cSLook, cComputed,  } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

//import { statusChoices, defStatus }  from '../../webparts/genericWebpart/components/GenericWebpart';

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '@mikezimm/npmfunctions/dist/Lists/columnsOOTB';

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

const thisColumnGroup = 'Used Periodic Reports libraries';
const colPrefix = 'zzz';
const thisDescription = 'Used Periodic Reports libraries';


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

let Choice1 = ["01 Jan", "02 Feb", "03 Mar", "03 EQ3", "04 Apr", "05 May", "06 Jun", "06 EQ6", "07 Jul", "08 Aug", "09 Sep", "09 EQ9", "10 Oct", "11 Nov", "11 FC", "12 Dec", "12 EQ12"];
export const PeriodRep : IChoiceField = {
    fieldType: cChoice,
    name: 'Period',
    title: 'Period',
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

let Choice2 = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035"];
export const YearRep : IChoiceField = {
    fieldType: cChoice,
    name: 'Year',
    title: 'Year',
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

let Choice3 = ["Group", "Company", "Other"];
export const ScopeRep : IChoiceField = {
    fieldType: cChoice,
    name: 'Category1',
    title: 'Scope',
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

let Choice4 = ["ACQ Module", "AL16", "Auditors", "Balance sheet", "Cash Flow", "Consolidation", "Equity", "File to ADS", "Fixed Assets", "Group Journals", "Head", "Inventory", "JV and Minority", "Management Reports", "Other Move", "PR-Earnings slides", "PR-Fin Rep", "PR-Key ratios", "Product Liability", "Restructuring", "Sales Analysis", "Validations", "Headcount", "Labor Minutes", "OverTime", "Project Hours", "Scrap", "Memo write down evaluation", "Planning", "Comments from auditors", "Engineering", "Bridge", "Engineering", "Memo write down evaluation", "Weekly Flash", "By Weekly OT", "Finance Heads", "Hours for Plants", "Weekly Temp Labor", "Activity Report", "AR Reconciliation", "AR Aging Reports", "Bad Debt Reserve", "AR Invoice Detail", "Cash Adjust", "Price Accruals", "AP Recon", "AP Detail", "POAI", "Live-AST ANA Recon", "Update Library Settings"];
export const SectionRep : IChoiceField = {
    fieldType: cChoice,
    name: 'Category2',
    title: 'Section',
    choices: Choice4,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + Choice4[Choice4.length-1] + '"',
        Indexed: true,
    },
};

    export const YearPerRepCalc : ICalculatedField = {
        fieldType: cCalcT,
        name: 'YearPer',
        //=[!Year]&"-"&[!Period]
        formula: '=[' + YearRep.title + ']&"-"&[' + PeriodRep.title + ']',
        dateFormat: DateTimeFieldFormatType.DateOnly,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: thisDescription,
        },
        onCreateChanges: {
            Title: 'Year-Per ^',
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


export function ReportsFields(listName: 'Reports1' | 'Reports2') {
    //return null;

    let theseFields: IMyFieldTypes[] = BuildReportsFields(listName);

    //console.log('ReportsFields', theseFields);
    return theseFields;
}


function BuildReportsFields(listName: 'Reports1' | 'Reports2') {

    let theseFields: IMyFieldTypes[] = [];

    theseFields.push(YearRep);  //BOTH
    theseFields.push(PeriodRep);  //BOTH
    theseFields.push(SectionRep);  //BOTH
    theseFields.push(ScopeRep);  //BOTH
    theseFields.push(YearPerRepCalc);  //BOTH
    return theseFields;

}


