
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
import { queryValueCurrentUser, queryValueToday, IViewField } from '@mikezimm/npmfunctions/dist/Lists/viewTypes';

import { testAlertsView, createRecentUpdatesView } from '../../../../../services/listServices/viewsGeneric';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbVersion, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '@mikezimm/npmfunctions/dist/Lists/columnsOOTB';

//CustReq columns
import {
    DocSubjectCReq , zzzFileStatusCReq , IssueDateCReq , QuotePhaseCReq ,
    RequirementNoCReq , MYCReq , ProductItemCReq , ProgramCReq , DateRequirementPhaseCReq ,
    PhaseDateRequirementCReq , RequirementDatePhaseCReq
} from './columnsCustReq';

import { IListDefintionCustReq } from './defineCustReq';

export const stdViewFieldsProg = [ootbID, DocSubjectCReq, ProgramCReq, ProductItemCReq, MYCReq, ootbCreated, ootbVersion ];
export const stdViewFieldsStat = [ootbID, DocSubjectCReq, ProgramCReq, ProductItemCReq, MYCReq, IssueDateCReq, QuotePhaseCReq, RequirementNoCReq, ootbVersion ];

let allFieldsProg = ["Edit", ootbTitle, DocSubjectCReq , zzzFileStatusCReq , MYCReq , ProductItemCReq , ProgramCReq ,];
let allFieldsStat = ["Edit", ootbTitle, DocSubjectCReq , zzzFileStatusCReq , IssueDateCReq , QuotePhaseCReq ,
    RequirementNoCReq , MYCReq , ProductItemCReq , ProgramCReq , DateRequirementPhaseCReq ,
    PhaseDateRequirementCReq , RequirementDatePhaseCReq];

//export const  CustRecentUpdatesFields = spliceCopyArray ( stdViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export interface IViewFields {
    std?: IViewField[];
    rec?: IViewField[];
    all?: IViewField[];
}

export function getStdFields( listName: IListDefintionCustReq ) {
    let fields : IViewFields = null;
    if (listName === 'Program') {
        fields = { 
            std: stdViewFieldsProg,
            all: allFieldsProg ,
            rec: spliceCopyArray ( stdViewFieldsProg, null, null, 2, [ootbModified, ootbEditor ] ) 
        };
    } else if ( listName === 'SORInfo') {
        fields =  { std: stdViewFieldsStat,
            all: allFieldsStat ,
            rec: spliceCopyArray ( stdViewFieldsStat, null, null, 2, [ootbModified, ootbEditor ] )
        };
    }
    return fields;
}

export function CustAllItemsView( viewFields ) {
    let x : IMyView = {
        Title: 'All Documents', //'All Items',  --- All Documents is default view for a library
        iFields: 	viewFields,
        wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
                ],
        orders: [ {field: ootbModified, asc: false} ],
    };
    return x;

}

export function AllFieldsView( viewFields, sortField ) {
    let x : IMyView= {
        Title: 'zTest - All Fields',
        iFields: 	viewFields,
        orders: [ {field: sortField, asc: false} ],
    };
    return x;
}

export function ItemsByMYView( viewFields, sortField ) {
    let x : IMyView= {
        Title: 'Files By MY',
        iFields: 	viewFields,
        orders: [ {field: sortField, asc: false} ],
        groups: { collapse: true, limit: 30,
            fields: [
                {field: MYCReq, asc: false},
            ],
        },
    };
    return x;
}

export function ItemsByProgramView( viewFields, sortField ) {
    let x : IMyView= {
        Title: 'Files By Program',
        iFields: 	viewFields,
        orders: [ {field: sortField, asc: false} ],
        groups: { collapse: true, limit: 30,
            fields: [
                {field: ProgramCReq, asc: false},
            ],
        },
    };
    return x;
}

export function ItemsByProductView( viewFields, sortField ) {
    let x : IMyView= {
        Title: 'Files By Product',
        iFields: 	viewFields,
        orders: [ {field: sortField, asc: false} ],
        groups: { collapse: true, limit: 30,
            fields: [
                {field: ProductItemCReq, asc: false},
            ],
        },
    };
    return x;
}

export function ItemsByDocSubjectView ( viewFields, sortField ) {
    let view = {
        Title: 'Files By DocSubject',
        iFields: viewFields,
        orders: [ {field: sortField, asc: false} ],
        groups: { collapse: true, limit: 30,
            fields: [
                {field: DocSubjectCReq, asc: false},
            ],
        },
    };
    return view;
}

export function CustReqViews (listName: IListDefintionCustReq ) : IMyView[]  {

    let thisView : IMyView[] = [];
    let viewFields = getStdFields(listName);
    let sortField = listName === 'Program' ? ootbCreated : IssueDateCReq;
    thisView.push( createRecentUpdatesView( viewFields.rec ));
    thisView.push( CustAllItemsView( viewFields.std ));
    thisView.push( AllFieldsView( viewFields.all, sortField ));
    thisView.push( ItemsByMYView( viewFields.std, sortField ));
    thisView.push( ItemsByProgramView( viewFields.std, sortField ));
    thisView.push( ItemsByProductView( viewFields.std, sortField ));
    thisView.push( ItemsByDocSubjectView( viewFields.std, sortField ));

    return thisView;

}

