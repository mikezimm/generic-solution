
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
import { queryValueCurrentUser, queryValueToday, IViewField } from '../../../../../services/listServices/viewTypes';

import { testAlertsView, createRecentUpdatesView } from '../../../../../services/listServices/viewsGeneric';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbVersion, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '../../../../../services/listServices/columnsOOTB';

//CustReq columns
import {ICustReqDefs,
DocSubjectCReq , zzzFileStatusCReq , IssueDateCReq , QuotePhaseCReq ,
RequirementNoCReq , MYCReq , ProductItemCReq , ProgramCReq , DateRequirementPhaseCReq ,
PhaseDateRequirementCReq , RequirementDatePhaseCReq

} from './columnsCustReq';
//let checks = StepChecks(0,5);  // Email
/*
    if ( includeSOR ) { theseFields.push(zzzFileStatusCReq); } //BOTH
    if ( includeStatus ) { theseFields.push(IssueDateCReq); }  //BOTH
    if ( includeStatus ) { theseFields.push(QuotePhaseCReq); }  //BOTH
    if ( includeStatus ) { theseFields.push(RequirementNoCReq); }  //BOTH
    theseFields.push(MYCReq);  //BOTH
    theseFields.push(ProductItemCReq);  //BOTH
    theseFields.push(ProgramCReq);  //BOTH
    if ( includeStatus ) { theseFields.push(DateRequirementPhaseCReq); } //BOTH
    if ( includeStatus ) { theseFields.push(PhaseDateRequirementCReq); } //BOTH
    if ( includeStatus ) { theseFields.push(RequirementDatePhaseCReq); } //BOTH
    */


export const stdViewFieldsProg = [ootbID, DocSubjectCReq, ProgramCReq, ProductItemCReq, MYCReq,  ];

let allFieldsProg = ["Edit", ootbTitle, DocSubjectCReq , zzzFileStatusCReq , MYCReq , ProductItemCReq , ProgramCReq ,];

export const stdViewFieldsSOR = [ootbID, DocSubjectCReq, ProgramCReq, ProductItemCReq, MYCReq,  ];

let allFieldsSOR = ["Edit", ootbTitle, DocSubjectCReq , zzzFileStatusCReq , MYCReq , ProductItemCReq , ProgramCReq , ];

export const stdViewFieldsStat = [ootbID, DocSubjectCReq, ProgramCReq, ProductItemCReq, MYCReq, IssueDateCReq, QuotePhaseCReq, RequirementNoCReq, ];

let allFieldsStat = ["Edit", ootbTitle, DocSubjectCReq , zzzFileStatusCReq , IssueDateCReq , QuotePhaseCReq ,
    RequirementNoCReq , MYCReq , ProductItemCReq , ProgramCReq , DateRequirementPhaseCReq ,
    PhaseDateRequirementCReq , RequirementDatePhaseCReq];

//export const  CustRecentUpdatesFields = spliceCopyArray ( stdViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export interface IViewFields {
    std?: IViewField[];
    rec?: IViewField[];
    all?: IViewField[];
}

export function getStdFields(listName: ICustReqDefs ) {
    let fields : IViewFields = null;
    if (listName === 'Program') {
        fields = { std: stdViewFieldsProg, all: allFieldsProg , rec: spliceCopyArray ( stdViewFieldsProg, null, null, 2, [ootbModified, ootbEditor ] ) };
    } else if ( listName === 'SORInfo') {
        fields =  { std: stdViewFieldsProg, all: allFieldsSOR , rec: spliceCopyArray ( stdViewFieldsSOR, null, null, 2, [ootbModified, ootbEditor ] ) };
    } else if ( listName === 'WithStatus') {
        fields =  { std: stdViewFieldsStat, all: allFieldsStat , rec: spliceCopyArray ( stdViewFieldsStat, null, null, 2, [ootbModified, ootbEditor ] ) };
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

export function AllFieldsView( viewFields ) {
    let x : IMyView= {
        Title: 'zTest - All Fields',
        iFields: 	viewFields,
        orders: [ {field: IssueDateCReq, asc: false} ],
    };
    return x;
}

export function ItemsByMYView(viewFields ) {
    let x : IMyView= {
        Title: 'Files By MY',
        iFields: 	viewFields,
        orders: [ {field: IssueDateCReq, asc: false} ],
        groups: { collapse: true, limit: 30,
            fields: [
                {field: MYCReq, asc: false},
            ],
        },
    };
    return x;
}

export function ItemsByProgramView(viewFields ) {
    let x : IMyView= {
        Title: 'Files By Program',
        iFields: 	viewFields,
        orders: [ {field: IssueDateCReq, asc: false} ],
        groups: { collapse: true, limit: 30,
            fields: [
                {field: ProgramCReq, asc: false},
            ],
        },
    };
    return x;
}

export function ItemsByProductView(viewFields ) {
    let x : IMyView= {
        Title: 'Files By Product',
        iFields: 	viewFields,
        orders: [ {field: IssueDateCReq, asc: false} ],
        groups: { collapse: true, limit: 30,
            fields: [
                {field: ProductItemCReq, asc: false},
            ],
        },
    };
    return x;
}

export function ItemsByDocSubjectView (viewFields) {
    let view = {
        Title: 'Files By DocSubject',
        iFields: viewFields,
        orders: [ {field: IssueDateCReq, asc: false} ],
        groups: { collapse: true, limit: 30,
            fields: [
                {field: DocSubjectCReq, asc: false},
            ],
        },
    };
    return view;
}


export function CustReqViews (listName: ICustReqDefs ) : IMyView[]  {

    let thisView : IMyView[] = [];

    let viewFields = getStdFields(listName);

    thisView.push(createRecentUpdatesView(viewFields.rec));

    thisView.push(CustAllItemsView(viewFields.std));
    thisView.push(AllFieldsView(viewFields.std));
    thisView.push(ItemsByMYView(viewFields.std));
    thisView.push(ItemsByProgramView(viewFields.std));
    thisView.push(ItemsByProductView(viewFields.std));
    thisView.push(ItemsByDocSubjectView(viewFields.std));

    thisView.push(AllFieldsView(viewFields.all));

    return thisView;

}

