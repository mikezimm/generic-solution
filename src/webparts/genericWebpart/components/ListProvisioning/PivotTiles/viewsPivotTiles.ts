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

//PivotTiles columns
import {
    zzzShowAllPivot , OrderPivot, TileCategoryPivot, TileDescriptionPivot,
    TileBgImageSizePivot, TileBgColorClassPivot, TileHrefLinkPivot, TileBgImageUrlPivot,
    zzzAutoFeaturePivot, zzzFeatureOptionPivot, zzzttpBMAllPivot, zzzttpBMAllChoicesPivot

} from './columnsPivotTiles';
//let checks = StepChecks(0,5);  // Email

export const stdViewFields = ['Edit', zzzShowAllPivot, OrderPivot, TileCategoryPivot, ootbTitle, TileDescriptionPivot, TileBgImageSizePivot,
    TileBgColorClassPivot, TileHrefLinkPivot, TileBgImageUrlPivot, zzzAutoFeaturePivot];

export const  EmailRecentUpdatesFields = spliceCopyArray ( stdEmailViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export const EmailAllItemsView : IMyView = {
    Title: 'All Items',
    iFields: 	stdEmailViewFields,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};

let EmailByYearViewFields = ['Edit', ootbID, EmailCategoriesHarm, EmailFromNameHarm, EmailDateHarm, EmailSubjectHarm, ootbTitle, ];

export const EmailsByYearView : IMyView = {
    Title: 'Emails by Year',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: EmailYrHarm, asc: false},
		],
	},
};

export const EmailsByYearMoView : IMyView = {
    Title: 'Emails by Year Month',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: EmailYrMoHarm, asc: false},
		],
	},
};

export const EmailsByProdView : IMyView = {
    Title: 'Emails By Product',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: ProductsALV, asc: false},
		],
	},
};

export const EmailsByCompanyView : IMyView = {
    Title: 'Emails By Company',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: FromCompanyHarm, asc: false},
		],
	},
};

export const EmailsByProgramView : IMyView = {
    Title: 'Emails By Program',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: ProgramsALV, asc: false},
		],
	},
};

export const projectViews : IMyView[] = [
    EmailAllItemsView, createRecentUpdatesView( EmailRecentUpdatesFields),
    EmailsByYearMoView,
    EmailsByYearView,
    EmailsByProdView,
    EmailsByProgramView,
    EmailsByCompanyView,

] ;


