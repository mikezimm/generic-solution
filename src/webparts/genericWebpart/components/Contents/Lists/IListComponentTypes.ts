import * as React from 'react';

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { Site, ISite } from "@pnp/sp/presets/all"; //    theSite: ISite;

// import "@pnp/sp/webs";

import { PanelType } from 'office-ui-fabric-react/lib/Panel';

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';

import { IMyHistory } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

import { PageContext } from '@microsoft/sp-page-context';

import { IListory, IMyJsonCompareProps, IMyJsonCompareState } from '../../../../../services/railsCommon/jsonCompare/ICompareTypes';  //listory: IListory;

// import { ICachedListId, IListRailFunction, IInspectListsProps, IInspectListsState, IListBucketInfo, IRailsOffPanel } from '../../../../genericWebpart/components/Contents/Lists/types';

export interface ICachedListId {

  webTitle: string;
  webUrl: string;
  webId: string;

  listTitle: string;
  listUrl: string;
  listId: string;
  siteId: string;

} 

export type IListRailFunction = 'ListPermissions' | 'compareJSON' | 'AddTemplate' | '';

export interface IInspectListsProps {
    // 0 - Context
    wpContext: WebPartContext;
    pageContext: PageContext;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    allowRailsOff?: boolean;
    allowSettings?: boolean;
    allowCrazyLink: boolean; //property that determines if some links not intended for public are visible, like permissions of SharePoint system lists
    listory: IListory;

    pickedWeb : IPickedWebBasic;
    theSite: ISite;
    analyticsWeb: string;
    analyticsList: string;
    cachedListIds: ICachedListId[]; //Used for analytics and error reporting to minimize calls to get this info.
    updateCachedLists: any;
    
    allLoaded: boolean;

    currentUser: IUser;

    pickedList? : IPickedList;

    pickThisList : any;

    // 2 - Source and destination list information

}

export interface IListBucketInfo {
    lists: IContentsListInfo[];
    count: number;
    sort: string;
    bucketCategory: string;
    bucketLabel: string;

}

export interface IInspectListsState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    currentPage: string;
    searchCount: number;

    searchText: string;
    searchMeta: string;

    searchedItems: IContentsListInfo[];
    first20searchedItems: IContentsListInfo[];

    listBuckets: IListBucketInfo[];

    // 2 - Source and destination list information
    allLists: IContentsListInfo[];
    meta: string[];

    cachedListIds: ICachedListId[]; //Used for analytics and error reporting to minimize calls to get this info.

    allowSettings: boolean;  //property that determines if the related toggle is visible or not
    allowRailsOff: boolean;  //property that determines if the related toggle is visible or not

    showDesc: boolean;      //property set by toggle to actually show or hide this content
    showSettings: boolean;  //property set by toggle to actually show or hide this content
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    errMessage: string | JSX.Element;

    showPanel: boolean;
    panel: IRailsOffPanel;
    railFunction: IListRailFunction;
    selectedIndex: any;
    selectedEntity: IContentsListInfo;

    firstJSON: any;
    secondJSON: any;
    compareError: string;
    lastCompare: string;

    applyTemplateError: string;

  }
  
  export interface IRailsOffPanel {
    // groups: IMyGroupsProps;
    type: PanelType;
    width?: number;
    content?: any;
  }