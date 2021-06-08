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

import { IDefinedComponent } from './defineComponents';

import {
    YearRep , PeriodRep, SectionRep, ScopeRep, YearPerRepCalc,
} from '../ListsReports/columnsReports';

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
const thisColumnGroup = 'Component Columns';
const colPrefix = '';

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


export const DefaultStatusChoices = ["0. Not Started", "1. Under Review", "2. In Process", "3. Verify", "4. Complete", "9. Rejected", "9. Cancelled"];

/**
 * createStatus will build status choice field and also remove special chars from Title to make name
 * @param choices 
 * @param title 
 */

export function createStatus( choices: string[] = DefaultStatusChoices, title: string = 'Status' ) {

    if ( choices && choices.length === 0 ) { choices = DefaultStatusChoices ; }
    let name = title.replace("[^a-zA-Z0-9]", '');

    const DefaultStatus : IChoiceField = {
        fieldType: cChoice,
        name: colPrefix + name,
        title: title,
        choices: choices,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: 'Used to set the status of an item',
            DefaultFormula:'="' + choices[choices.length-1] + '"',
            Indexed: true,
        },
       onCreateChanges: {
           Title: title,
       }
    };

    return DefaultStatus;
}

export function createStatusCalc( title: string = 'Status' ) {

    let name = title.replace("[^a-zA-Z0-9]", '');
    const DefaultStatusCalc : ICalculatedField = {
        fieldType: cCalcT,
        name: name + 'Calc',
        formula: `=IF(LEN([${title}])>0,[${title}],"")`,
        dateFormat: DateTimeFieldFormatType.DateOnly,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: `Read Only version of the ${title} column`,
        },
        onCreateChanges: {
            Title: title + '^',
        }
    };

    return DefaultStatusCalc;
}

export function createStatusNumber( title: string = 'Status' ) {
    title += 'Number';
    let name = title.replace("[^a-zA-Z0-9]", '');
    const DefaultStatusCalc : ICalculatedField = {
        fieldType: cCalcN,
        name: name + 'Calc',
        formula: `=VALUE(LEFT(${title},1))`,
        dateFormat: DateTimeFieldFormatType.DateOnly,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: `Number of the ${title} column`,
        },
        onCreateChanges: {
            Title: title + '^',
        }
    };

    return DefaultStatusCalc;
}

export function createStatusLabel( title: string = 'Status' ) {
    title += 'Label';
    let name = title.replace("[^a-zA-Z0-9]", '');
    const DefaultStatusCalc : ICalculatedField = {
        fieldType: cCalcT,
        name: name + 'Calc',
        formula: `=TRIM(MID(${title},FIND(".",${title})+1,100)) `,
        dateFormat: DateTimeFieldFormatType.DateOnly,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: `Text portion of the ${title} column`,
        },
        onCreateChanges: {
            Title: title + '^',
        }
    };

    return DefaultStatusCalc;
}


export function StepChecks( title: string = 'Status', min: number, max: number) {
    title = 'Effective' + title;
    let titleNumber = title + 'Number';
    let checkFields: IMyFieldTypes[] = [];
    for (let i = min; i <= max; i++) {
        let thisCheck = i === 0 ? `=IF(AND([${titleNumber}]>${i},[${titleNumber}]>${i}),"Yes","No")`
        : `=IF(AND(Step${i-1}Check="Yes",[StatusNumber]>${i}),"Yes","No")`;

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

export function createEffectiveStatus( title: string = 'Status') {
    title = 'Effective' + title;
    let titleNumber = title + 'Number';
    let name = title.replace("[^a-zA-Z0-9]", '');
    const EffectiveStatus : ICalculatedField = {
        fieldType: cCalcN,
        name: 'EffectiveStatus',
        dateFormat: DateTimeFieldFormatType.DateOnly,
        formula: `=(IF([${titleNumber}]=9,9,IF([${titleNumber}]=8,8,IF(Step4Check="Yes",5,IF(Step3Check="Yes",4,IF(Step2Check="Yes",3,IF(Step1Check="Yes",2,IF(Step0Check="Yes",1,0))))))))`,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: 'Can be used to have checks at different status to impact Effective Status instead of just a number.',
        },
    };

    return EffectiveStatus;
}

export function DefaultStatusFields( statusColumnTitle: string = 'Status') {

    return [
        createStatus( [], statusColumnTitle ),
        createStatusCalc( statusColumnTitle ),
        createStatusNumber( statusColumnTitle ),
        createStatusLabel( statusColumnTitle ),
    ];
}

export function EffectiveStatusFields( statusColumnTitle: string = 'Status') {

    let columns: IMyFieldTypes[] = [
        createStatus( [], statusColumnTitle ),
        createStatusCalc( statusColumnTitle ),
        createStatusNumber( statusColumnTitle ),
        createStatusLabel( statusColumnTitle ),
        createEffectiveStatus( statusColumnTitle ),
    ];

    let checks = StepChecks(statusColumnTitle, 0,5);  //Project
    columns.push(...checks);  //Project

    return columns;
}


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

export function ComponentFields(listName: IDefinedComponent ) {

    let theseFields: IMyFieldTypes[] = [];

    if (listName === 'Status' ) { 
        theseFields = DefaultStatusFields( 'Status') ; // from '../ListsReports/columnsReports'
    }

    if (listName === 'Effective Status' ) { 
        theseFields = EffectiveStatusFields( 'Status') ; // from '../ListsReports/columnsReports'
    }

    if (listName === 'Steps Done' ) { 
        theseFields.push();
    }

    if (listName === 'Year-Period' ) { 
        theseFields = [ YearRep , PeriodRep, SectionRep, ScopeRep, YearPerRepCalc ] ; // from '../ListsReports/columnsReports'

    }



    return theseFields;

}


