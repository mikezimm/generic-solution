

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

import { spliceCopyArray } from '@mikezimm/npmfunctions/dist/arrayServices';

//Standard Queries
import { queryValueCurrentUser, queryValueToday, IViewField } from '../../../../../services/listServices/viewTypes';

import { testAlertsView, createRecentUpdatesView } from '../../../../../services/listServices/viewsGeneric';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbVersion, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '../../../../../services/listServices/columnsOOTB';

//FinTasks columns
import {IFinTasksDefs,
    YearFin,   //BOTH
    PeriodFin,   //BOTH
    PercentCompleteFin,   //BOTH
    ReviewDaysFin,   //BOTH
    CommentsFin,   //BOTH
    DeadlineFin,   //BOTH
    BodyFin,   //BOTH
    EntityFin,   //BOTH
    ReferenceFin,   //BOTH
    FrequencyFin,   //BOTH
    PriorityFin,   //BOTH
    StageFin,   //BOTH
    StatusFin,   //BOTH
    AssignedToFin,   //BOTH
    BackupFin,   //BOTH
    ReviewerFin,   //BOTH
    RevAlternateFin,   //BOTH
    DueDateFin,   //BOTH   
    RevisionDateFin,   //BOTH
    StartDateFin,   //BOTH
    HasCopyDestFin,   //BOTH
    IsCurrentVerFin,   //BOTH
    ReviewDateFin,   //BOTH
    YearPerFinCalc,   //BOTH
    YearPerFreqFinCalc,   //BOTH
    Choice1Periods,
    Choice2Years,
    FinTasksFrequencyChoices,
    FinanceStageChoices,
    OOTBTaskPriorityChoices,
    OOTBTaskStatus,
} from './columnsFinTasks'; //

//let checks = StepChecks(0,5);  // Email

export const stdViewFields = ['Edit', YearFin, PeriodFin, ReferenceFin, ootbTitle, FrequencyFin, YearPerFreqFinCalc,];

export const  FinTasksRecentUpdatesFields = spliceCopyArray ( stdViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export const FinTasksAllItemsView : IMyView = {
    Title: 'All Items',
    iFields: 	stdViewFields,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};


export const TasksYourUserEntries : IMyView = {
    Title: 'Your AssignedToFin Items',
    iFields: 	stdViewFields,
    TabularView: true,
    RowLimit: 33,
	orders: [ {field: DueDateFin, asc: false} ],
	wheres: 	[ 	{field: AssignedToFin, 	clause:'Or', 	oper: Eq, 		val: queryValueCurrentUser },
	],
};

export const TasksByUserView : IMyView = {
    Title: 'By AssignedToFin',
    iFields: 	stdViewFields,
    TabularView: true,
    RowLimit: 33,
    orders: [ {field: DueDateFin, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: AssignedToFin, asc: true},
		],
	},
};

export const TasksByStatusFin : IMyView = {
    Title: 'By Status',
    iFields: 	stdViewFields,
    TabularView: true,
    RowLimit: 33,
    orders: [ {field: DueDateFin, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: StatusFin, asc: true},
		],
	},
};

export const TasksByYearPerView : IMyView = {
    Title: 'By YearPeriod',
    iFields: 	stdViewFields,
    TabularView: true,
    RowLimit: 33,
    orders: [ {field: DueDateFin, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: YearPerFinCalc, asc: true},
		],
	},
};

export const DatesView : IMyView = {
    Title: 'Dates Summary',
    iFields: 	['Edit', YearFin, PeriodFin, ReferenceFin, ootbTitle, StatusFin, DueDateFin, DueDateFin, RevisionDateFin, StartDateFin, ReviewDateFin, ReviewDaysFin,  ],
    TabularView: true,
    RowLimit: 33,
    orders: [ {field: DueDateFin, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: YearFin, asc: false},
		],
	},
};

export const UsersView : IMyView = {
    Title: 'Users impacted',
    iFields: 	['Edit', YearFin, PeriodFin, ReferenceFin, ootbTitle, AssignedToFin,BackupFin,ReviewerFin,RevAlternateFin ],
    TabularView: true,
    RowLimit: 33,
    orders: [ {field: DueDateFin, asc: false} ],

};

export const FinTasksViews : IMyView[] = [
    FinTasksAllItemsView, createRecentUpdatesView( FinTasksRecentUpdatesFields),
    TasksYourUserEntries, TasksByUserView,
    TasksByYearPerView, TasksByStatusFin,
    UsersView, DatesView

] ;


