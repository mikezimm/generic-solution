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

//Harmonie columns
import { mapDrillDownProps

} from './columnsPreConfig';
//let checks = StepChecks(0,5);  // Email

export const stdViewFields = [ootbID, ootbTitle, 'webPartScenario', 'listDefinition' ];

export const stdPreConfigViewFields = ['Edit', ootbID,ootbTitle, 'webPartScenario', 'listDefinition' ].concat( mapDrillDownProps );
export const  PreConfigRecentUpdateFields = spliceCopyArray ( stdPreConfigViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export const PreConfigRecentAllItemsView : IMyView = {
    Title: 'All listDefinitions', //'All Items',  --- All Documents is default view for a library
    iFields: 	stdPreConfigViewFields,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};

/**
 *     'parentListWeb','parentListTitle',
    'updateRefinersOnTextSearch',
    'includeDetails','showCatCounts','showSummary',
    'groupByFields','stats',
 */
export const GeneralSettingsFieldsView : IMyView = {
    Title: 'General Settings',
    iFields: 	[...stdViewFields,'togCounts', 'togSummary', 'togStats',  ],
    orders: [ {field: ootbTitle, asc: false} ],
};


export const PerformanceFieldsView : IMyView = {
    Title: 'Performance Settings',
    iFields: 	[...stdViewFields , 'fetchCount', 'fetchCountMobile', 'restFilter', 'updateRefinersOnTextSearch'  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const ViewSettingsFieldsView : IMyView = {
    Title: 'View Settings',
    iFields: 	[...stdViewFields , 'groupByFields', 'viewWidth1', 'viewJSON1', 'viewWidth2', 'viewJSON2', 'viewWidth3', 'viewJSON3',  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const Refiner0FieldsView : IMyView = {
    Title: 'Refiner0 Settings',
    iFields: 	[...stdViewFields ,'togCounts', 'togSummary', 'showDisabled', 'refiner0' , 'rules0def', 'rules0',  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const Refiner1FieldsView : IMyView = {
    Title: 'Refiner1 Settings',
    iFields: 	[...stdViewFields ,'togCounts', 'togSummary', 'showDisabled', 'refiner1' , 'rules1def', 'rules1',  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const Refiner2FieldsView : IMyView = {
    Title: 'Refiner2 Settings',
    iFields: 	[...stdViewFields ,'togCounts', 'togSummary', 'showDisabled', 'refiner2' , 'rules2def', 'rules2',  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const StatsFieldsView : IMyView = {
    Title: 'Stats Settings',
    iFields: 	[...stdViewFields , 'togStats' , 'stats',  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const AllFieldsView : IMyView = {
    Title: 'zTest - All Fields',
    iFields: 	stdPreConfigViewFields,
    orders: [ {field: ootbTitle, asc: false} ],
};


export const GroupByTemplateView : IMyView = {
    Title: 'GroupByTemplate',
    iFields: 	stdPreConfigViewFields,
    orders: [ {field: ootbTitle, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: 'listDefinition', asc: false},
		],
	},
};

export const PreConfigViews : IMyView[] = [
    PreConfigRecentAllItemsView, createRecentUpdatesView( PreConfigRecentUpdateFields),
    AllFieldsView, GroupByTemplateView, GeneralSettingsFieldsView, ViewSettingsFieldsView,
    Refiner0FieldsView,
    Refiner1FieldsView,
    Refiner2FieldsView,
    StatsFieldsView,
    PerformanceFieldsView,
] ;




