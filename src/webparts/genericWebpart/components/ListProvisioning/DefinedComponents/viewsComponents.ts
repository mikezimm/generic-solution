//  >>>> ADD import additional controls/components
import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField ,
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField ,
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { MyFieldDef, } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
	cMText, cText, cNumb, cURL, cUser, cMUser, minInfinity, maxInfinity } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { IMyView, } from '@mikezimm/npmfunctions/dist/Lists/viewTypes';
import { Eq, Ne, Lt, Gt, Leq, Geq, IsNull, IsNotNull, Contains, BeginsWith } from '@mikezimm/npmfunctions/dist/Lists/viewTypes';

import { spliceCopyArray } from '@mikezimm/npmfunctions/dist/Services/Arrays/manipulation';

//Standard Queries
import { queryValueCurrentUser, queryValueToday } from '@mikezimm/npmfunctions/dist/Lists/viewTypes';

import { testAlertsView, createRecentUpdatesView } from '../../../../../services/listServices/viewsGeneric';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbVersion, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '@mikezimm/npmfunctions/dist/Lists/columnsOOTB';

import { IDefinedComponent,  } from './defineComponents';
import { DefaultStatusChoices,  } from './columnsComponents';

//Harmonie columns
import {

} from './columnsComponents';
//let checks = StepChecks(0,5);  // Email

export const stdViewFields = [ootbID, ootbTitle, ];

export const stdStatusViewFields = ['Edit', ootbID, ootbTitle, ];

export function createGroupByStatusView( title: string ) {

    let name = title.replace("[^a-zA-Z0-9]", '');
    const GroupByStatusView : IMyView = {
        Title: 'Items By Status',
        iFields: 	stdStatusViewFields,
        orders: [ {field: name, asc: false} ],
        groups: { collapse: true, limit: 30,
            fields: [
                {field: name, asc: false},
            ],
        },
    };
    return GroupByStatusView;

}

export function createStatusViews( choices: string[] = DefaultStatusChoices, statusColumnTitle: string = 'Status' ) {
    
    if ( choices && choices.length === 0 ) { choices = DefaultStatusChoices ; }

    let TheseViews: IMyView[] = [
        createGroupByStatusView( statusColumnTitle ),
    ] ;
    return TheseViews;
}



export function createYearPeriodViews( choices: string[] = DefaultStatusChoices, statusColumnTitle: string = 'Status' ) {
    let TheseViews: IMyView[] = [
        // createGroupByStatusView( statusColumnTitle ),
    ] ;
    return TheseViews;
}



export function createStepsDoneViews( choices: string[] = DefaultStatusChoices, statusColumnTitle: string = 'Status' ) {
    let TheseViews: IMyView[] = [
        // createGroupByStatusView( statusColumnTitle ),
    ] ;
    return TheseViews;
}


