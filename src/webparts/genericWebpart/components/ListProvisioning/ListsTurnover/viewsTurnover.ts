
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

import { YearRep, PeriodRep, SectionRep, ScopeRep, YearPerRepCalc, } from '../ListsReports/columnsReports';

import {
  Date01Turn,
  Date01TurnCalc,
  Choice01Turn,
  Choice01TurnCalc,
  ItemCategoryTurn,
  ItemCategoryTurnCalc,
  StatusTurn,
  StatusTurnCalc,
  URL01Turn,
  Text01Turn,
  Text01TurnCalc,
  IdNumberTurn,
  IdNumberTurnCalc,
  Number01Turn,
  Number01TurnCalc,
  Number02Turn,
  Number02TurnCalc,
  Number03Turn,
  Number03TurnCalc,
  Number04Turn,
  Number04TurnCalc,
  Number05Turn,
  Number05TurnCalc,
  Number06Turn,
  Number06TurnCalc,
  Number07Turn,
  Number07TurnCalc,
  KPI01TurnCalc,
  KPI02TurnCalc,
  KPI03TurnCalc,
  KPI04TurnCalc,
  KPI05TurnCalc,

} from './columnsTurnover';
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

export const TurnoverByEditor : IMyView = {
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

export const TurnoverByYear : IMyView = {
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

export const TurnoverByYearPer : IMyView = {
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

export const TurnoverByShift : IMyView = {
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

export const TurnoverByCell : IMyView = {
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
    TurnoverByEditor,
    TurnoverByYear, TurnoverByYearPer,
    TurnoverByShift,TurnoverByCell
] ;


