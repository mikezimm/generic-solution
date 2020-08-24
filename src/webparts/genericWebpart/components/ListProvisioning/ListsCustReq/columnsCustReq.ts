
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

const thisColumnGroup = 'Customer Requirements';
const thisDefaultDescription = 'Customer Requirements library';



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
        Description: thisDefaultDescription,
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



let theseDSubjectChoices = ["Appendix", "Award Letter", "BOM", "Correspondence", "Cost Breakdown", "Drawings, Design", "Letter of Intent", "Organization", "Other Cust Doc", "Packaging, Freight", "Quality", "RASIC", "RFQ", "SOR", "SOW", "Specification", "Tech Review", "Terms & Conditions", "Timing", "Tooling Breakdown", "Validation", "Volumes, Rates", "Other"];
export const DocSubjectCReq : IChoiceField = {
    fieldType: cChoice,
    name: 'DocSubject',
    choices: theseDSubjectChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
        DefaultFormula:'="' + theseDSubjectChoices[theseDSubjectChoices.length-1] + '"', // put the name you chose in the first line of the choice column, the one starting with let
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const zzzFileStatusCReq : IChoiceField = {
    fieldType: cChoice,
    name: 'zzzFileStatus',
    choices: ["Yes", "No"],
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
        DefaultFormula:'="Yes"' ,
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const IssueDateCReq : IDateTimeField = {
    fieldType: cDate,
    name: 'IssueDate',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
    },
//    onCreateChanges: {
//        Title: 'Due Date',
//    }
};

let theseQuotePhaseChoices = ["1. Pre-Quote", "2. Quote", "3. Sourcing", "4. Launch", "5. Maintainace", "6. Other"];
export const QuotePhaseCReq : IChoiceField = {
    fieldType: cChoice,
    name: 'QuotePhase',
    choices: theseQuotePhaseChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
        DefaultFormula:'="' + theseDSubjectChoices[theseDSubjectChoices.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const RequirementNoCReq : ITextField = {
    fieldType: cText,
    name: 'RequirementNo',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
    }
};


export const MYCReq : ITextField = {
    fieldType: cText,
    name: 'MY',
    maxLength: 10,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
    }
};

export const ProductItemCReq : ITextField = {
    fieldType: cText,
    name: 'ProductItem',
    maxLength: 10,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
    }
};

export const ProgramCReq : ITextField = {
    fieldType: cText,
    name: 'Program',
    maxLength: 20,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
    }
};


export const DateRequirementPhaseCReq : ICalculatedField = {
    fieldType: cCalcT,
    name: 'DateRequirementPhase',
    formula: '=TEXT([IssueDate],"YYYY-MM-DD")&": "&RequirementNo&" ("&QuotePhase&")"',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
    },
};


export const PhaseDateRequirementCReq : ICalculatedField = {
    fieldType: cCalcT,
    name: 'PhaseDateRequirement',
    formula: '=QuotePhase&": "&TEXT([IssueDate],"YYYY-MM-DD")&" - "&RequirementNo',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
    },
};


export const RequirementDatePhaseCReq : ICalculatedField = {
    fieldType: cCalcT,
    name: 'RequirementDatePhase',
    formula: '=RequirementNo&": "&TEXT([IssueDate],"YYYY-MM-DD")&" "&" ("&QuotePhase&")"',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDefaultDescription,
    },
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

export type ICustReqDefs = 'Program' | 'SORInfo' ;
export function CustReqFields(listName: ICustReqDefs ) {
    //return null;

    let theseFields: IMyFieldTypes[] = CustReqFieldsBuilder(listName);

    console.log('CustReqFields', theseFields);
    return theseFields;
}


export function CustReqFieldsBuilder(listName: ICustReqDefs ) {

    let includeStatus = listName === 'SORInfo' ? true : false ;

    let theseFields: IMyFieldTypes[] = [];
    theseFields.push(DocSubjectCReq);  //BOTH
    if ( includeStatus ) { theseFields.push(zzzFileStatusCReq); } //BOTH
    if ( includeStatus ) { theseFields.push(IssueDateCReq); }  //BOTH
    if ( includeStatus ) { theseFields.push(QuotePhaseCReq); }  //BOTH
    if ( includeStatus ) { theseFields.push(RequirementNoCReq); }  //BOTH
    theseFields.push(MYCReq);  //BOTH
    theseFields.push(ProductItemCReq);  //BOTH
    theseFields.push(ProgramCReq);  //BOTH
    if ( includeStatus ) { theseFields.push(DateRequirementPhaseCReq); } //BOTH
    if ( includeStatus ) { theseFields.push(PhaseDateRequirementCReq); } //BOTH
    if ( includeStatus ) { theseFields.push(RequirementDatePhaseCReq); } //BOTH

    return theseFields;

}


