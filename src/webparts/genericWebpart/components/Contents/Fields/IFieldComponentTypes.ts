import * as React from 'react';

import { Web, Lists, ISite } from "@pnp/sp/presets/all"; //const projectWeb = Web(useProjectWeb);

import { IFieldAddResult, FieldTypes, IFieldInfo, } from "@pnp/sp/fields/types";

import "@pnp/sp/webs";

import { IUser, } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
import { IMyProgress, } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IMyPivCat } from '@mikezimm/npmfunctions/dist/Pivots/IzPivots';
import { IPickedList, IPickedWebBasic, } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';

import { IMyHistory, } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

import { PageContext } from '@microsoft/sp-page-context';

// import { IContentsFieldInfo, IInspectColumnsProps, IInspectColumnsState, IFieldBucketInfo } from '../../../../genericWebpart/components/Contents/Fields/types';

export interface IContentsFieldInfo extends Partial<IFieldInfo>{
  sort: string;
  bucketCategory: string;
  bucketLabel: string;
  bucketIdx: any;
  FillInChoice?: boolean; //Allow Fill In
  ShowInFiltersPane?: number;
  CanBeDeleted?: boolean;
  searchString: string;
  meta: string[];
  OutputType: number;

  Formula?: string;    //Calculated Fields
  MinimumValue?: number;  //Number Fields
  MaximumValue?: number;  //Number Fields

  MaxLength?: number; //Text Field

  DisplayFormat?: number;
  SelectionMode?: number;  //User Fields
  SelectionGroup?: number;  //User Fields

  FriendlyDisplayFormat?: number;     //Date Fields
  DateTimeCalendarType?: number;      //Date Fields

  Choices?: string[];                 //Choice Field

  NumberOfLines?: number;     // NOTE Field
  RichText?: boolean;         // NOTE Field

  LookupField?: string;                   // Lookup Field 
  AllowMultipleValues?: boolean;          // Lookup Field 
  LookupList?: string;                    // Lookup Field 
  RelationshipDeleteBehavior?: number;    // Lookup Field 

}


export interface IInspectColumnsProps {
  // 0 - Context
  
  pageContext: PageContext;

  allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

  allowRailsOff?: boolean;
  allowSettings?: boolean;
  allowCrazyLink: boolean; //property that determines if some links not intended for public are visible, like permissions of SharePoint system lists
  
  allLoaded: boolean;

  currentUser: IUser;

  pickedList? : IPickedList;

  pickedWeb? : IPickedWebBasic;

  theSite: ISite;
  // 2 - Source and destination list information

}


export interface IFieldBucketInfo {
  fields: IContentsFieldInfo[];
  count: number;
  sort: string;
  bucketCategory: string;
  bucketLabel: string;

}

export interface IInspectColumnsState {

  allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

  allLoaded: boolean;

  progress: IMyProgress;
  history: IMyHistory;

  currentPage: string;
  searchCount: number;
  
  searchText: string;
  searchMeta: string;

  searchedItems: IContentsFieldInfo[];
  first20searchedItems: IContentsFieldInfo[];

  fieldBuckets: IFieldBucketInfo[];
  // 2 - Source and destination list information
  allFields: IContentsFieldInfo[];
  meta: string[];

  allowSettings: boolean;  //property that determines if the related toggle is visible or not
  allowRailsOff: boolean;  //property that determines if the related toggle is visible or not

  showDesc: boolean;      //property set by toggle to actually show or hide this content
  showSettings: boolean;  //property set by toggle to actually show or hide this content
  showRailsOff: boolean;  //property set by toggle to actually show or hide this content

  showXML: boolean;
  showJSON: boolean;
  showSPFx: boolean;

  showMinFields: boolean;

  errMessage: string | JSX.Element;

  specialAlt: boolean;

}