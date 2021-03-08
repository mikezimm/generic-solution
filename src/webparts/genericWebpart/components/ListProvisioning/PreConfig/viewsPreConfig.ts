//  >>>> ADD import additional controls/components
import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField ,
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField ,
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '@mikezimm/npmfunctions/dist/columnTypes';

import { MyFieldDef, } from '@mikezimm/npmfunctions/dist/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
	cMText, cText, cNumb, cURL, cUser, cMUser, minInfinity, maxInfinity } from '@mikezimm/npmfunctions/dist/columnTypes';

import { IMyView, } from '@mikezimm/npmfunctions/dist/viewTypes';
import { Eq, Ne, Lt, Gt, Leq, Geq, IsNull, IsNotNull, Contains, BeginsWith } from '@mikezimm/npmfunctions/dist/viewTypes';

import { spliceCopyArray } from '@mikezimm/npmfunctions/dist/arrayServices';

//Standard Queries
import { queryValueCurrentUser, queryValueToday } from '@mikezimm/npmfunctions/dist/viewTypes';

import { testAlertsView, createRecentUpdatesView } from '../../../../../services/listServices/viewsGeneric';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbVersion, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '@mikezimm/npmfunctions/dist/columnsOOTB';

//Harmonie columns
import { mapDrillDownProps, mapCarrotChartsProps, mapGridChartsProps

} from './columnsPreConfig';
//let checks = StepChecks(0,5);  // Email

export const stdViewFields = [ootbID, ootbTitle, 'webPartScenario', 'listDefinition' ];

export const stdPreConfigViewDrillDownFields = ['Edit', ootbID,ootbTitle, 'webPartScenario', 'listDefinition' ].concat( mapDrillDownProps );
export const  PreConfigRecentUpdateDrillDownFields = spliceCopyArray ( stdPreConfigViewDrillDownFields, null, null, 2, [ootbModified, ootbEditor ] );

export const stdPreConfigViewCarrotChartsFields = ['Edit', ootbID,ootbTitle, 'webPartScenario', 'listDefinition' ].concat( mapCarrotChartsProps );
export const  PreConfigRecentUpdateCarrotChartsFields = spliceCopyArray ( stdPreConfigViewCarrotChartsFields, null, null, 2, [ootbModified, ootbEditor ] );

export const stdPreConfigViewGridChartsFields = ['Edit', ootbID,ootbTitle, 'webPartScenario', 'listDefinition' ].concat( mapGridChartsProps );
export const  PreConfigRecentUpdateGridChartsFields = spliceCopyArray ( stdPreConfigViewGridChartsFields, null, null, 2, [ootbModified, ootbEditor ] );

export const PreConfigRecentAllDrillDownItemsView : IMyView = {
    Title: 'All listDefinitions', //'All Items',  --- All Documents is default view for a library
    iFields: 	stdPreConfigViewDrillDownFields,
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
    iFields: 	[...stdViewFields,'togCounts', 'togSummary', 'togStats', 'includeListLink' ],
    orders: [ {field: ootbTitle, asc: false} ],
};


export const PerformanceFieldsView : IMyView = {
    Title: 'Performance Settings',
    iFields: 	[...stdViewFields , 'fetchCount', 'fetchCountMobile', 'restFilter'  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const ViewSettingsFieldsView : IMyView = {
    Title: 'View Settings',
    iFields: 	[...stdViewFields , 'includeListLink', 'includeAttach', 'groupByFields', 'viewWidth1', 'viewJSON1', 'viewWidth2', 'viewJSON2', 'viewWidth3', 'viewJSON3', 'quickCommands', ],
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

export const QuickCmdFieldsView : IMyView = {
    Title: 'Quick Command Settings',
    iFields: 	[...stdViewFields , 'quickCommands',  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const StatsFieldsView : IMyView = {
    Title: 'Stats Settings',
    iFields: 	[...stdViewFields , 'togStats' , 'stats',  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const GroupByTemplateView : IMyView = {
    Title: 'GroupByTemplate',
    iFields: 	stdPreConfigViewDrillDownFields,
    orders: [ {field: ootbTitle, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: 'listDefinition', asc: false},
		],
	},
};

/**
 * These are the "All Fields views"
 */
export const AllDrillDownFieldsView : IMyView = {
    Title: 'zTest - All Drilldown Fields',
    iFields: 	stdPreConfigViewDrillDownFields,
    orders: [ {field: ootbTitle, asc: false} ],
};


export const PreConfigDrillDownViews : IMyView[] = [
    //Common for most webparts
    PreConfigRecentAllDrillDownItemsView, createRecentUpdatesView( PreConfigRecentUpdateDrillDownFields),
    PerformanceFieldsView,
    AllDrillDownFieldsView,
    GroupByTemplateView, 

    //Specific to Drilldown
    GeneralSettingsFieldsView, ViewSettingsFieldsView,
    Refiner0FieldsView,
    Refiner1FieldsView,
    Refiner2FieldsView,
    StatsFieldsView,

    QuickCmdFieldsView,
] ;


/**
 * GridCharts
 * GridChartListFieldsView, GridChartSearchFieldsView, GridChartSquareStylesView, GridChartOtherStylesView
 */  

export const PreConfigRecentAllGridChartsItemsView : IMyView = {
    Title: 'All listDefinitions', //'All Items',  --- All Documents is default view for a library
    iFields: 	stdPreConfigViewGridChartsFields,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};

export const AllGridChartsFieldsView : IMyView = {
    Title: 'zTest - All GridCharts Fields',
    iFields: 	stdPreConfigViewGridChartsFields,
    orders: [ {field: ootbTitle, asc: false} ],
};

export const GridChartListFieldsView : IMyView = {
    Title: 'List Columns',
    iFields: 	[...stdViewFields , 'dateColumn', 'valueColumn' , 'valueType', 'valueOperator', 'dropDownColumns','searchColumns','metaColumns' ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const GridChartSearchFieldsView : IMyView = {
    Title: 'List Search Columns',
    iFields: 	[...stdViewFields , 'scaleMethod' , 'dropDownColumns','searchColumns','metaColumns'  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const GridChartSquareStylesView : IMyView = {
    Title: 'Styles - Square',
    iFields: 	[...stdViewFields , 'monthGap', 'squareCustom' , 'squareColor', 'emptyColor' , 'backGroundColor'   ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const GridChartOtherStylesView : IMyView = {
    Title: 'Styles - Other',
    iFields: 	[...stdViewFields , 'cellColor' , 'yearStyles', 'monthStyles' , 'dayStyles', 'cellStyles' , 'cellhoverInfoColor', 'otherStyles'  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const PreConfigGridChartsViews : IMyView[] = [
    //Common for most webparts
    PreConfigRecentAllGridChartsItemsView, createRecentUpdatesView( PreConfigRecentUpdateGridChartsFields),
    PerformanceFieldsView,
    AllGridChartsFieldsView,
    
    //Common to Carrot & Grid Charts
    GridChartListFieldsView, GridChartSearchFieldsView,

    //Specific to CarrotCharts
    GridChartSquareStylesView, GridChartOtherStylesView

] ;

/**
 * CarrotCharts
 * CarrotChartListFieldsView, CarrotChartSearchFieldsView, CarrotChartCarrotSearchPropsView, 
 */
 export const PreConfigRecentAllCarrotChartsItemsView : IMyView = {
    Title: 'All listDefinitions', //'All Items',  --- All Documents is default view for a library
    iFields: 	stdPreConfigViewCarrotChartsFields,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};

 export const AllCarrotChartsFieldsView : IMyView = {
    Title: 'zTest - All CarrotCharts Fields',
    iFields: 	stdPreConfigViewCarrotChartsFields,
    orders: [ {field: ootbTitle, asc: false} ],
};

 export const CarrotChartListFieldsView : IMyView = {
    Title: 'List Columns',
    iFields: 	[...stdViewFields , 'carrotCats', 'valueColumn' , 'valueType', 'valueOperator', 'dropDownColumns','searchColumns','metaColumns'  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const CarrotChartSearchFieldsView : IMyView = {
    Title: 'List Search Columns',
    iFields: 	[...stdViewFields , 'dropDownColumns','searchColumns','metaColumns'  ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const CarrotChartStylesView : IMyView = {
    Title: 'CarrotSearch Styles',
    iFields: 	[...stdViewFields , 'carrotStyles' ],
    orders: [ {field: ootbTitle, asc: false} ],
};

export const CarrotChartCarrotSearchPropsView : IMyView = {
    Title: 'CarrotSearch Props',
    iFields: 	[...stdViewFields , 'carrotProps' ,  ],
    orders: [ {field: ootbTitle, asc: false} ], //Specific to GridCharts
};

export const PreConfigCarrotChartsViews : IMyView[] = [
    //Common for most webparts
    PreConfigRecentAllCarrotChartsItemsView, createRecentUpdatesView( PreConfigRecentUpdateCarrotChartsFields),
    PerformanceFieldsView,
    AllCarrotChartsFieldsView,
    
    //Common to Carrot & Grid Charts
    CarrotChartListFieldsView, CarrotChartSearchFieldsView,

    //Specific to CarrotCharts
    CarrotChartCarrotSearchPropsView, CarrotChartStylesView

] ;




