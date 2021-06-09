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
    let sourceFieldName = `${title}`.replace("[^a-zA-Z0-9]", '');
    title += 'Number';
    let name = title.replace("[^a-zA-Z0-9]", '');
    const DefaultStatusCalc : ICalculatedField = {
        fieldType: cCalcN,
        name: name, // + 'Calc',
        formula: `=VALUE(LEFT(${sourceFieldName},1))`,
        dateFormat: DateTimeFieldFormatType.DateOnly,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: `Number of the ${sourceFieldName} column`,
        },
        onCreateChanges: {
            Title: title + '^',
        }
    };

    return DefaultStatusCalc;
}

export function createStatusLabel( title: string = 'Status' ) {
    let sourceFieldName = `${title}`.replace("[^a-zA-Z0-9]", '');
    title += 'Label';
    let name = title.replace("[^a-zA-Z0-9]", '');
    const DefaultStatusCalc : ICalculatedField = {
        fieldType: cCalcT,
        name: name, // + 'Calc',
        formula: `=TRIM(MID(${sourceFieldName},FIND(".",${sourceFieldName})+1,100)) `,
        dateFormat: DateTimeFieldFormatType.DateOnly,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: `Text portion of the ${sourceFieldName} column`,
        },
        onCreateChanges: {
            Title: title + '^',
        }
    };

    return DefaultStatusCalc;
}

export function StepChecks( title: string = 'Status', min: number, max: number) {
    let titleNumber = title + 'Number^';
    let checkFields: IMyFieldTypes[] = [];
    for (let i = min; i <= max; i++) {
        let thisCheck = i === 0 ? `=IF(AND([${titleNumber}]>${i},[${titleNumber}]>${i}),"Yes","No")`
        : `=IF(AND(Step${i-1}Check="Yes",[${titleNumber}]>${i}),"Yes","No")`;

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
        checkFields.push(thisField);
    }
    return checkFields;
}

export function StepsDone( suffix: string = "Done", min: number, max: number) {

    let stepFields: IMyFieldTypes[] = [];
    for (let i = min; i <= max; i++) {
        let name = `Step${i}${suffix}`;
        const thisField : IDateTimeField = {    
            fieldType: cDate,
            name: name,
            title: name,
            displayFormat:  DateTimeFieldFormatType.DateTime,
            onCreateProps: {
                Group: thisColumnGroup,
                Description: `Used by calculated columns to estimate time between Created Date and steps in the process.  Step Number coordiates with the Status`,
                Indexed: false,
                Required: false,
            },
        };

        stepFields.push(thisField);
    }
    return stepFields;
}

export function StepsDoneCalc( suffix: string = "Done", min: number, max: number) {
    let stepFields: IMyFieldTypes[] = [];
    for (let i = min; i <= max; i++) {

        let sourceFieldName = `Step${i}${suffix}`;
        let name = `Step${i}${suffix}Calc`;
        let title = `Step${i}${suffix}^`;
        let thisCheck =`=IF(ISNUMBER(${sourceFieldName}),TEXT(${sourceFieldName},"YYYY-MM-DD"),"")`;

        const thisField : ICalculatedField = {
            fieldType: cCalcN,
            name: name,
            title: title,
            dateFormat: DateTimeFieldFormatType.DateOnly,
            formula: thisCheck,
            onCreateProps: {
                Group: thisColumnGroup,
                Description: `Read Only version of column: ${name}`,
            },
            onCreateChanges: {
                Title: title,
            }
        };
        stepFields.push(thisField);
    }
    return stepFields;
}

export function DaysToStepCalc( suffix: string = "Done", min: number, max: number) {
    let stepFields: IMyFieldTypes[] = [];
    for (let i = min; i <= max; i++) {
        let name = `DaysToStep${i}`;
        let sourceFieldName = `Step${i}${suffix}`;

        let thisCheck =`=IF(AND(Step0Check="Yes",ISNUMBER(${sourceFieldName})),${sourceFieldName}-ROUNDDOWN(Created,0),"")`;

        const thisField : ICalculatedField = {
            fieldType: cCalcN,
            name: name,
            dateFormat: DateTimeFieldFormatType.DateOnly,
            formula: thisCheck,
            onCreateProps: {
                Group: thisColumnGroup,
                Description: `Calculated days from Created Date until: ${sourceFieldName}`,
            },
        };
        stepFields.push(thisField);
    }
    return stepFields;
}

export function createEffectiveStatus( title: string = 'Status') {
    let sourceFieldName = `${title}Number`.replace("[^a-zA-Z0-9]", '') + '^';
    title = 'Effective' + title;
    let name = title.replace("[^a-zA-Z0-9]", '');
    const EffectiveStatus : ICalculatedField = {
        fieldType: cCalcN,
        name: name,
        dateFormat: DateTimeFieldFormatType.DateOnly,
        formula: `=(IF([${sourceFieldName}]=9,9,IF([${sourceFieldName}]=8,8,IF(Step4Check="Yes",5,IF(Step3Check="Yes",4,IF(Step2Check="Yes",3,IF(Step1Check="Yes",2,IF(Step0Check="Yes",1,0))))))))`,
        // formula: `=IF(Step4Check="Yes",5,IF(Step3Check="Yes",4,IF(Step2Check="Yes",3,IF(Step1Check="Yes",2,IF(Step0Check="Yes",1,0)))))`,
        onCreateProps: {
            Group: thisColumnGroup,
            Description: 'Can be used to have checks at different status to impact Effective Status instead of just a number.',
        },
    };

    return EffectiveStatus;
}

export function BuildStatusFields( listName: IDefinedComponent, statusColumnTitle: string = 'Status') {

    let columns: IMyFieldTypes[] = [
        createStatus( [], statusColumnTitle ),
        createStatusCalc( statusColumnTitle ),
        createStatusNumber( statusColumnTitle ),
        createStatusLabel( statusColumnTitle ),
    ];

    if ( listName === 'Effective Status' || listName === 'Steps Done' ) { 
        let checks = StepChecks(statusColumnTitle, 0,5);
        columns.push(...checks);
        columns.push( createEffectiveStatus( statusColumnTitle ) );
    }

    if ( listName === 'Steps Done' ) { 
        let done = StepsDone( undefined, 0,5);
        columns.push(...done);
    
        let doneC = StepsDoneCalc( undefined, 0,5);
        columns.push(...doneC);
    
        let daysToStep = DaysToStepCalc( undefined, 0,5);
        columns.push(...daysToStep);
    }

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

export function ComponentFields( listName: IDefinedComponent ) {

    let theseFields: IMyFieldTypes[] = [];

    if ( [ 'Status' , 'Effective Status', 'Steps Done' ].indexOf( listName ) > -1 ) { 
        theseFields = BuildStatusFields( listName, 'Status' ) ; // from '../ListsReports/columnsReports'

    } else if (listName === 'Year-Period' ) { 
        theseFields = [ YearRep , PeriodRep, SectionRep, ScopeRep, YearPerRepCalc ] ; // from '../ListsReports/columnsReports'

    }

    return theseFields;

}


