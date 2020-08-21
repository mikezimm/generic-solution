
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
import {
DocSubjectCReq , zzzFileStatusCReq , IssueDateCReq , QuotePhaseCReq ,
RequirementNoCReq , MYCReq , ProductItemCReq , ProgramCReq , DateRequirementPhaseCReq ,
PhaseDateRequirementCReq , RequirementDatePhaseCReq

} from './columnsCustReq';
//let checks = StepChecks(0,5);  // Email

export const stdViewFields = [ootbID, DocSubjectCReq, ProgramCReq, ProductItemCReq, MYCReq, IssueDateCReq, QuotePhaseCReq, RequirementNoCReq, ];

export const  CustRecentUpdatesFields = spliceCopyArray ( stdViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export const CustAllItemsView : IMyView = {
    Title: 'All Documents', //'All Items',  --- All Documents is default view for a library
    iFields: 	stdViewFields,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};


let allFields = ["Edit", ootbTitle, DocSubjectCReq , zzzFileStatusCReq , IssueDateCReq , QuotePhaseCReq ,
    RequirementNoCReq , MYCReq , ProductItemCReq , ProgramCReq , DateRequirementPhaseCReq ,
    PhaseDateRequirementCReq , RequirementDatePhaseCReq];

export const AllFieldsView : IMyView = {
    Title: 'zTest - All Fields',
    iFields: 	allFields,
    orders: [ {field: IssueDateCReq, asc: false} ],

};

export const ItemsByMYView : IMyView = {
    Title: 'Files By MY',
    iFields: 	stdViewFields,
    orders: [ {field: IssueDateCReq, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: MYCReq, asc: false},
		],
	},
};

export const ItemsByProgramView : IMyView = {
    Title: 'Files By Program',
    iFields: 	stdViewFields,
    orders: [ {field: IssueDateCReq, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: ProgramCReq, asc: false},
		],
	},
};

export const ItemsByProductView : IMyView = {
    Title: 'Files By Product',
    iFields: 	stdViewFields,
    orders: [ {field: IssueDateCReq, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: ProductItemCReq, asc: false},
		],
	},
};

export const ItemsByDocSubjectView : IMyView = {
    Title: 'Files By DocSubject',
    iFields: 	stdViewFields,
    orders: [ {field: IssueDateCReq, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: DocSubjectCReq, asc: false},
		],
	},
};

export const HarmonieViews : IMyView[] = [
    CustAllItemsView, createRecentUpdatesView( CustRecentUpdatesFields),
    ItemsByMYView,
    ItemsByProgramView,
    ItemsByProductView,
    ItemsByDocSubjectView,


] ;


