

//  >>>> ADD import additional controls/components
import { UrlFieldFormatType, Field } from "@pnp/sp/presets/all";
import { IFieldAddResult, FieldTypes, IFieldInfo, IField,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode, IFieldCreationProperties } from "@pnp/sp/fields/types";

import { IMyFieldTypes, IBaseField , ITextField , IMultiLineTextField , INumberField , IXMLField ,
    IBooleanField , ICalculatedField , IDateTimeField , ICurrencyField , IUserField , ILookupField , IChoiceField ,
    IMultiChoiceField , IDepLookupField , ILocationField, IURLField } from '../../../../../services/listServices/columnTypes';

import { cBool, cCalcN, cCalcT, cChoice, cMChoice, cCurr, cDate, cLocal, cLook, cDLook,
    cMText, cText, cNumb, cURL, cUser, cMUser, MyFieldDef, minInfinity, maxInfinity,  cSLook, cComputed,  } from '../../../../../services/listServices/columnTypes';

//import { statusChoices, defStatus }  from '../../webparts/genericWebpart/components/GenericWebpart';

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbTitle, ootbEditor, ootbAuthor, ootbCreated, ootbModified, } from '../../../../../services/listServices/columnsOOTB';

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

const thisColumnGroup = 'Used in SocialiiS list';
const colPrefix = 'zzz';
const thisDescription = 'Used in SocialiiS list';


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
    name: colPrefix + 'xyz',
    title: 'xyz Title visible',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'To be used by webpart to email this address for every entry.  Not yet used.',
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

export const keywordsSiiS : ITextField = {
    fieldType: cText,
    name: 'keywords',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'keywords',
    }
};

export const NavTitleSiiS : ITextField = {
    fieldType: cText,
    name: 'NavTitle',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'NavTitle',
    }
};

export const objectIDSiiS : ITextField = {
    fieldType: cText,
    name: 'objectID',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'objectID',
    }
};

export const profilePicSiiS : ITextField = {
    fieldType: cText,
    name: 'profilePic',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'profilePic',
    }
};

export const urlSiiS : ITextField = {
    fieldType: cText,
    name: 'url',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'url',
    }
};

let Choice1 = ["blog", "facebook", "feed", "github", "home", "instagram", "linkedIn", "location", "office365-SPList", "office365-SPPage", "office365-SPSite", "office365-team", "office365-user", "office365-YammerGroup", "office365-YammerUser", "office365-YammerSearch", "stackExchange", "stock", "twitter", "website", "wikipedia", "youtube-user", "youtube-playlist", "youtube-channel", "youtube-video"];
export const mediaObjectSiiS : IChoiceField = {
    fieldType: cChoice,
    name: 'mediaObject',
    title: 'mediaObject',
    choices: Choice1,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
        DefaultFormula:'="' + Choice1[Choice1.length-1] + '"',
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const orderSiiS : INumberField = {
    fieldType: cNumb,
    name: 'order',
    title: 'order',
    minValue: 0,
    maxValue: 1000,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    }
};

export const mediaSourceSiiSCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: 'mediaSource',
    //=IF(ISNUMBER(FIND("-",mediaObject)),TRIM(LEFT(mediaObject,FIND("-",mediaObject)-1)),TRIM(mediaObject))
    formula: '=IF(ISNUMBER(FIND("-", ' + mediaObjectSiiS.title + ')),TRIM(LEFT(' + mediaObjectSiiS.title + ',FIND("-",' + mediaObjectSiiS.title + ')-1)),TRIM(' + mediaObjectSiiS.title + '))',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'mediaSource',
    }
};

export const objectTypeSiiSCalc : ICalculatedField = {
    fieldType: cCalcT,
    name: 'objectType',
    //=IF(ISNUMBER(FIND("-",mediaObject)),TRIM(MID(mediaObject,FIND("-",mediaObject)+1,100)),"")
    formula: '=IF(ISNUMBER(FIND("-",' + mediaObjectSiiS.title + ')),TRIM(MID(' + mediaObjectSiiS.title + ',FIND("-",' + mediaObjectSiiS.title + ')+1,100)),"")',
    dateFormat: DateTimeFieldFormatType.DateOnly,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: thisDescription,
    },
    onCreateChanges: {
        Title: 'objectType',
    }
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


export function SocialiiSFields(listName: 'EntityList' | 'EntityList') {
    //return null;

    let theseFields: IMyFieldTypes[] = BuildSocialiiSFields(listName);

    console.log('HarmonieEmailFields', theseFields);
    return theseFields;
}


function BuildSocialiiSFields(listName: 'EntityList' | 'EntityList') {

    let theseFields: IMyFieldTypes[] = [];

    theseFields.push(keywordsSiiS);  //BOTH
    theseFields.push(NavTitleSiiS);  //BOTH
    theseFields.push(objectIDSiiS);  //BOTH
    theseFields.push(profilePicSiiS);  //BOTH
    theseFields.push(urlSiiS);  //BOTH
    theseFields.push(mediaObjectSiiS);  //BOTH
    theseFields.push(orderSiiS);  //BOTH
    theseFields.push(mediaSourceSiiSCalc);  //BOTH
    theseFields.push(objectTypeSiiSCalc);  //BOTH
    return theseFields;

}


