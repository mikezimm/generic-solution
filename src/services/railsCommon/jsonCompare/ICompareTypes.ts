
/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */

import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import { Panel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { WebPartContext } from '@microsoft/sp-webpart-base';

// import { Spinner, SpinnerSize, } from 'office-ui-fabric-react/lib/Spinner';
// import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
// import { Image, IImageProps, ImageFit, ImageCoverStyle } from 'office-ui-fabric-react/lib/Image';
// import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
// import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
// import { SearchBox, } from 'office-ui-fabric-react/lib/SearchBox';


// import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
// import { TextField,  ITextFieldProps, IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";

// import { TooltipHost, TooltipDelay, DirectionalHint, ITooltipProps, ITooltipHostStyles } from 'office-ui-fabric-react';
// import { DefaultButton, PrimaryButton, CompoundButton, elementContains } from 'office-ui-fabric-react';

// import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

// import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';

// import ReactJson from "react-json-view";

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';

// import { IArraySummary, IRailAnalytics, groupArrayItemsByField, } from '@mikezimm/npmfunctions/dist/Services/Arrays/grouping';
// import { getKeyChanges, doesObjectExistInArrayInt, ICompareResult, DoesNotExistLabel } from '@mikezimm/npmfunctions/dist/Services/Arrays/checks';

import { ICompareObject, IComparePair, IIncludeOrIgnore, ICompareKeysResult, } 
    from '@mikezimm/npmfunctions/dist/Services/Arrays/compare';

/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */
//import { IListory, IMyJsonCompareProps, IMyJsonCompareState } from '../../../services/railsCommon/jsonCompare/types';

export type IListory = 0 | 1 | 2;  // 0 = no saving; 1 = only list compare was selected on; 2 = both the original and compare list

export interface IMyJsonCompareProps {
    theList: IContentsListInfo;
    user: IUser;
    wpContext: WebPartContext;
    railFunction: string;
    showPanel: boolean;
    _closePanel: any;

    type: PanelType;

    json1: any;
    json2?: any;

    _fetchCompare: any; //Function that will get json2 from inputs in this component

    pickedWeb : IPickedWebBasic;

    analyticsWeb: string;
    analyticsList: string;
    errorMess: string;

    listory: IListory;  // 0 = no saving; 1 = only list compare was selected on; 2 = both the original and compare list

  }


export interface IMyJsonCompareState {

    disableDo: boolean;
    finished: boolean;
    refreshId: string;
    errorMess: string;

    showTab: string;
    comparePivot: string;

    otherWeb: string;
    otherList: string;
    otherProp: string;

    ignoreKeys: string[];
    includeOrIgnoreKeys: IIncludeOrIgnore;

    ignoreItems: string[];
    includeOrIgnoreItems: IIncludeOrIgnore;

    comparedProps: any[];
    summaryRows: any[];

    compareResults: ICompareKeysResult;
    compareArray: ICompareKeysResult[];
    json1PropCount: number;
    json2PropCount: number;

}
