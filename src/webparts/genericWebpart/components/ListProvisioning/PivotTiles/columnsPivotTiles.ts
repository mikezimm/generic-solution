//  >>>> ADD import additional controls/components
import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField ,
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField ,
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
    cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity,  cSLook, cComputed,  } from '@mikezimm/npmfunctions/dist/Lists/columnTypes';

//import { statusChoices, defStatus }  from '../../webparts/genericWebpart/components/GenericWebpart';

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '@mikezimm/npmfunctions/dist/Lists/columnsOOTB';

/***
 *     .d8b.  d8888b. d8888b.       d888b  d8888b.  .d88b.  db    db d8888b.      d8b   db  .d8b.  .88b  d88. d88888b
 *    d8' `8b 88  `8D 88  `8D      88' Y8b 88  `8D .8P  Y8. 88    88 88  `8D      888o  88 d8' `8b 88'YbdP`88 88'
 *    88ooo88 88   88 88   88      88      88oobY' 88    88 88    88 88oodD'      88V8o 88 88ooo88 88  88  88 88ooooo
 *    88~~~88 88   88 88   88      88  ooo 88`8b   88    88 88    88 88~~~        88 V8o88 88~~~88 88  88  88 88~~~~~
 *    88   88 88  .8D 88  .8D      88. ~8~ 88 `88. `8b  d8' 88b  d88 88           88  V888 88   88 88  88  88 88.
 *    YP   YP Y8888D' Y8888D'       Y888P  88   YD  `Y88P'  ~Y8888P' 88           VP   V8P YP   YP YP  YP  YP Y88888P
 *
 *
 */

const thisColumnGroup = 'OurTiles aka PivotTiles';
const thisColumnDescription = 'This column is used for PivotTiles webpart';



/***
 *    d88888b db    db  .d8b.  .88b  d88. d8888b. db      d88888b       .o88b.  .d88b.  db      db    db .88b  d88. d8b   db .d8888.
 *    88'     `8b  d8' d8' `8b 88'YbdP`88 88  `8D 88      88'          d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88 88'  YP
 *    88ooooo  `8bd8'  88ooo88 88  88  88 88oodD' 88      88ooooo      8P      88    88 88      88    88 88  88  88 88V8o 88 `8bo.
 *    88~~~~~  .dPYb.  88~~~88 88  88  88 88~~~   88      88~~~~~      8b      88    88 88      88    88 88  88  88 88 V8o88   `Y8b.
 *    88.     .8P  Y8. 88   88 88  88  88 88      88booo. 88.          Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888 db   8D
 *    Y88888P YP    YP YP   YP YP  YP  YP 88      Y88888P Y88888P       `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P `8888Y'
 *
 *
 */

export const example : ITextField = {
    fieldType: cText,
    name: 'xyz',
    title: 'xyz Title visible',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    },
    onCreateChanges: {
        //Hidden: true,
        Title: 'xyz Title Updated on Create',
    },
    showNew: true,
    showEdit: true,
    showDisplay: false,
    changes1: { Title: 'xyz Title changes1' },  //Properties you want changed any time in your code
    changes2: { Title: 'xyz Title changes2' },  //Properties you want changed any time in your code
    changes3: { Title: 'xyz Title changes3' },  //Properties you want changed any time in your code
    changesFinal: { Title: 'xyz Title changesFinal' },  //Properties you want changed at the very end... like hiding fields once formula columns are created and views are also created (can't add to view if it's hidden)

    //showDisplay: false,
};

/***
 *    d8888b. d88888b  .d8b.  db            .o88b.  .d88b.  db      db    db .88b  d88. d8b   db .d8888.
 *    88  `8D 88'     d8' `8b 88           d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88 88'  YP
 *    88oobY' 88ooooo 88ooo88 88           8P      88    88 88      88    88 88  88  88 88V8o 88 `8bo.
 *    88`8b   88~~~~~ 88~~~88 88           8b      88    88 88      88    88 88  88  88 88 V8o88   `Y8b.
 *    88 `88. 88.     88   88 88booo.      Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888 db   8D
 *    88   YD Y88888P YP   YP Y88888P       `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P `8888Y'
 *
 *
 */


export const OrderPivot : INumberField = {
    fieldType: cNumb,
    name: 'Order1',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    }
};

export const TileCategoryPivot : IMultiChoiceField = {
    fieldType: cMChoice,
    name: 'TileCategory',
    choices: ['Files','Main Menu','Help','Permissions','Search','ttp','Calendar','Tasks','Templates'],
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    }
};

export const TileBgColorClassPivot : ITextField = {
    fieldType: cText,
    name: 'TileBgColorClass',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    }
};

export const TileBgImageUrlPivot : ITextField = {
    fieldType: cText,
    name: 'TileBgImageUrl',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    }
};

export const TileDescriptionPivot : ITextField = {
    fieldType: cText,
    name: 'TileDescription',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    }
};

export const TileHrefLinkPivot : ITextField = {
    fieldType: cText,
    name: 'TileHrefLink',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    }
};

export const zzzAutoFeaturePivot : ITextField = {
    fieldType: cText,
    name: 'zzzAutoFeature',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    }
};

export const zzzFeatureOptionPivot : ITextField = {
    fieldType: cText,
    name: 'zzzFeatureOption',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    }
};

export const TileBgImageSizePivot : INumberField = {
    fieldType: cNumb,
    name: 'TileBgImageSize',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    }
};

export const zzzShowAllPivot : IChoiceField = {
    fieldType: cChoice,
    name: 'zzzShowAll',
    choices: ['Yes','No','-'],
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
        DefaultValue: "Yes",
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const zzzttpBMAllPivot : ICalculatedField = {
    fieldType: cCalcT,
    name: 'zzzttpBMAll',
    formula: '=IF(ISERR(FIND(" ",zzzFeatureOption,1))=TRUE,zzzFeatureOption,TRIM(LEFT(zzzFeatureOption,FIND(" ",zzzFeatureOption)-1)))',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    },
};

export const zzzttpBMAllChoicesPivot : ICalculatedField = {
    fieldType: cCalcT,
    name: 'zzzttpBMAllChoices',
    formula: '=zzzttpBMAll',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisColumnDescription,
    },
};

/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP
 *
 *
 */
/***
 *     .o88b.  .d88b.  db      db    db .88b  d88. d8b   db       .d8b.  d8888b. d8888b.  .d8b.  db    db .d8888.
 *    d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 88'  YP
 *    8P      88    88 88      88    88 88  88  88 88V8o 88      88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  `8bo.
 *    8b      88    88 88      88    88 88  88  88 88 V8o88      88~~~88 88`8b   88`8b   88~~~88    88      `Y8b.
 *    Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888      88   88 88 `88. 88 `88. 88   88    88    db   8D
 *     `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P      YP   YP 88   YD 88   YD YP   YP    YP    `8888Y'
 *
 *
 */

/**
 * This just creates an array of fields for the build/test sequence
 * Each list would have an array of field objects like this.
 */


export function PivotTilesFields() {
    //return null;

    let theseFields: IMyFieldTypes[] = DefinePivotTilesFields('OurTiles');

    console.log('PivotTilesFields', theseFields);
    return theseFields;
}


export function DefinePivotTilesFields(listName: 'OurTiles' | 'PivotTiles') {

    let theseFields: IMyFieldTypes[] = [];
    theseFields.push(zzzShowAllPivot);  //BOTH
    theseFields.push(OrderPivot);  //BOTH
    theseFields.push(TileCategoryPivot);  //BOTH
    theseFields.push(TileDescriptionPivot);  //BOTH
    theseFields.push(TileBgImageSizePivot);  //BOTH
    theseFields.push(TileBgColorClassPivot);  //BOTH
    theseFields.push(TileHrefLinkPivot);  //BOTH
    theseFields.push(TileBgImageUrlPivot);  //BOTH
    theseFields.push(zzzAutoFeaturePivot);  //BOTH
    theseFields.push(zzzFeatureOptionPivot);  //BOTH
    theseFields.push(zzzttpBMAllPivot);  //BOTH
    theseFields.push(zzzttpBMAllChoicesPivot);  //BOTH

    return theseFields;

}


