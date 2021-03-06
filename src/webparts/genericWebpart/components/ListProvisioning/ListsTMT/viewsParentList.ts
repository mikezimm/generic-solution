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

//SHARED Columns
import {Leader, Team, CCList, CCEmail } from './columnsTMT';
import {Category1, Category2, ProjectID1, ProjectID2, Story, Chapter, Everyone, Active,  } from './columnsLabels';

    //SHARED Columns
import { DueDateTMT, CompletedDateTMT, CompletedByTMT} from './columnsStatus';
import { StatusTMT, StatusNumber, StatusText, EffectiveStatus, IsOpen } from './columnsStatus';

//PROJECT columns
import { SortOrder, ActivityType, ActivityTMT, ActivtyURLCalc, OptionsTMT, OptionsTMTCalc,
	ProjectEditOptions, HistoryTMT, TimeTarget} from './columnsAdvanced';
//let checks = StepChecks(0,5);  //Project

export const stdViewFields = [ootbID, Active, StatusTMT, SortOrder, ootbTitle, Everyone, Category1, Category2, ProjectID1, ProjectID2, Story, Chapter, Leader, Team];

export const stdProjectViewFields = ['Edit', ootbID, ootbTitle, Category1, Category2, ProjectID1, ProjectID2, Story, Chapter, Leader, Team, Everyone];
export const ProjectRecentUpdatesFields = spliceCopyArray ( stdProjectViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export function buildProjAllItemsView() {

    const ProjAllItemsView : IMyView = {
        Title: 'All Items',
        iFields: 	stdProjectViewFields,
        wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
                ],
        orders: [ {field: ootbModified, asc: false} ],
    };
    return ProjAllItemsView;

}



let OptionsFields = [ootbID, ootbTitle, OptionsTMT, OptionsTMTCalc, Category1, Category2, ProjectID1, ProjectID2, Story, Chapter, ProjectEditOptions];

export const ProjOptionsView : IMyView = {
    Title: 'Options',
    iFields: 	OptionsFields,
    orders: [ {field: SortOrder, asc: true} ],
};

let ActivityFields = [ootbID, ootbTitle, ActivityType, ActivityTMT, OptionsTMTCalc, ActivtyURLCalc, ootbModified];

export const ProjActivityGroupView : IMyView = {
    Title: 'Activity',
    iFields: 	ActivityFields,
    orders: [ {field: ActivityType, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [ {field: ActivityType, asc: false}, ],  },
};

export const ProjActivityFlatView : IMyView = {
    Title: 'ActivityFlat',
    iFields: 	ActivityFields,
    orders: [ {field: ootbModified, asc: false} ],
};

let TaskFields = [ootbID, Active, StatusTMT, SortOrder, ootbTitle, Everyone, Category1, EffectiveStatus, CompletedDateTMT, CompletedByTMT, DueDateTMT, IsOpen, StatusNumber, StatusText, 'Step0Check', 'Step1Check', 'Step2Check', 'Step3Check', 'Step4Check', 'Step5Check'];

export const ProjTaskColumnsView : IMyView = {
    Title: 'Task Columns',
    iFields: 	TaskFields,
    orders: [ {field: ootbID, asc: false} ],
};

export function ProjStepsViews(prefix : string, min: number, max: number, skip: number[], fieldSuffix: string, viewSuffix: string){

    let StepFields = [ootbID, Active, StatusTMT, SortOrder, ootbTitle, Everyone, Category1, StatusTMT, EffectiveStatus, CompletedDateTMT, CompletedByTMT, DueDateTMT, IsOpen, StatusNumber, StatusText ];

    let StepViews : IMyView[] = [];

    for ( let i = min; i < max; i++) {
        if ( skip.indexOf(i) < 0 ) {
            let thisField = prefix + i + fieldSuffix; //Only needed if we have columns for this.
            let thisTitle = prefix + i + '.' + viewSuffix;
            let thisView : IMyView = {
                Title: thisTitle,
                iFields: 	spliceCopyArray( StepFields, null, null, 1000, [thisField] ),
                orders: [ {field: DueDateTMT, asc: true} ],
                wheres: 	[  {field: EffectiveStatus, clause:'And', 	oper: Eq, 	val: i.toString() }, ],
            };
            StepViews.push(thisView);
        }
    }

    return StepViews;

}

export const projectViews : IMyView[] = [ 
    buildProjAllItemsView(), createRecentUpdatesView(ProjectRecentUpdatesFields),
    ProjOptionsView, ProjActivityGroupView, ProjActivityFlatView,
    ProjTaskColumnsView

].concat(ProjStepsViews('Step', 0, 10, [6,7], 'Check', 'All'))  ;


