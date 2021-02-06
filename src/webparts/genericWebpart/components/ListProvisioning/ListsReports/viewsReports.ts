
//  >>>> ADD import additional controls/components
import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField ,
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField ,
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '../../../../../services/listServices/columnTypes';

import { MyFieldDef, } from '../../../../../services/listServices/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
	cMText, cText, cNumb, cURL, cUser, cMUser, minInfinity, maxInfinity } from '../../../../../services/listServices/columnTypes';

import { IMyView, } from '../../../../../services/listServices/viewTypes';
import { Eq, Ne, Lt, Gt, Leq, Geq, IsNull, IsNotNull, Contains, BeginsWith } from '../../../../../services/listServices/viewTypes';

import { spliceCopyArray } from '../../../../../services/arrayServices';

//Standard Queries
import { queryValueCurrentUser, queryValueToday } from '../../../../../services/listServices/viewTypes';

import { testAlertsView, createRecentUpdatesView } from '../../../../../services/listServices/viewsGeneric';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbVersion, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '../../../../../services/listServices/columnsOOTB';

import {
    YearRep , PeriodRep, SectionRep, ScopeRep, YearPerRepCalc,

} from './columnsReports';
//let checks = StepChecks(0,5);  // Email

export const stdViewFields = ['Edit', YearRep, PeriodRep, SectionRep, ootbTitle, ScopeRep, YearPerRepCalc,];

export const  ReportRecentUpdatesFields = spliceCopyArray ( stdViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export const ReportAllItemsView : IMyView = {
    Title: 'All Items',
    iFields: 	stdViewFields,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};

export const ReportsByEditor : IMyView = {
    Title: 'By Editor',
    iFields: 	ReportRecentUpdatesFields,
    TabularView: true,
    RowLimit: 30,
    orders: [ {field: ootbModified, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: ootbEditor, asc: false},
		],
	},
};

export const ReportsByYear : IMyView = {
    Title: 'By Year',
    iFields: 	stdViewFields,
    TabularView: true,
    RowLimit: 30,
    orders: [ {field: YearPerRepCalc, asc: false},{field: ootbModified, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: YearRep, asc: false},
		],
	},
};

export const ReportsByYearPer : IMyView = {
    Title: 'By YearPeriod',
    iFields: 	stdViewFields,
    TabularView: true,
    RowLimit: 30,
    orders: [ {field: YearPerRepCalc, asc: false},{field: ootbModified, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: YearPerRepCalc, asc: false},
		],
	},
};

export const ReportsByCategory1 : IMyView = {
    Title: 'By Scope',
    iFields: 	stdViewFields,
    TabularView: true,
    RowLimit: 30,
    orders: [ {field: YearPerRepCalc, asc: false},{field: ootbModified, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: ScopeRep, asc: true},
		],
	},
};

export const ReportsByCategory2 : IMyView = {
    Title: 'By Section',
    iFields: 	stdViewFields,
    TabularView: true,
    RowLimit: 30,
    orders: [ {field: YearPerRepCalc, asc: false},{field: ootbModified, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: SectionRep, asc: true},
		],
	},
};

export const reportViews : IMyView[] = [
    ReportAllItemsView, createRecentUpdatesView( ReportRecentUpdatesFields),
    ReportsByEditor,
    ReportsByYear, ReportsByYearPer,
    ReportsByCategory1,ReportsByCategory2
] ;


