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

//PivotTiles columns
import {
    zzzShowAllPivot , OrderPivot, TileCategoryPivot, TileDescriptionPivot,
    TileBgImageSizePivot, TileBgColorClassPivot, TileHrefLinkPivot, TileBgImageUrlPivot,
    zzzAutoFeaturePivot, zzzFeatureOptionPivot, zzzttpBMAllPivot, zzzttpBMAllChoicesPivot

} from './columnsPivotTiles';
//let checks = StepChecks(0,5);  // Email

export const stdViewFields = ['Edit', zzzShowAllPivot, OrderPivot, TileCategoryPivot, ootbTitle, TileDescriptionPivot, TileBgImageSizePivot,
    TileBgColorClassPivot, TileHrefLinkPivot, TileBgImageUrlPivot, zzzAutoFeaturePivot];

export const  PivotRecentUpdatesFields = spliceCopyArray ( stdViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export const PivotAllItemsView : IMyView = {
    Title: 'All Items',
    iFields: 	stdViewFields,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};

export const pivotViews : IMyView[] = [
    PivotAllItemsView, createRecentUpdatesView( PivotRecentUpdatesFields),


] ;


