import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';

/**
 * 
 *   USE THIS INTERFACE IN EASY CONTENTS where we are using minimally in panel
 * 
 */

export interface IFetchInfoSettingsMin {
  permissionsHiddenExclude: boolean;
  permissionsListsInclude: boolean;
  groupsShowAdmins: boolean;
  groupsShowGuests: boolean;

}

export interface IWebPermissionsProps {
  fetchInfo: IFetchInfoSettingsMin;
  webURL: string;
  isSiteAdmin: boolean;
  listTitles: string[];
  title: string;
  width: number;
  maxWidth: any;
  userId: number;
  displayMode: DisplayMode;
  context: WebPartContext;
  searchFirstName: boolean;
  setPivSize: PivotLinkSize;
  setPivFormat: PivotLinkFormat;
  updateProperty: (value: string) => void;
  searchProps?: string;
  clearTextSearchProps?: string;
  pageSize?: number;
  groupsShowAdmins: boolean ;
  groupsShowGuests: boolean ;

}

