import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { IMyPermissions, IPermissionLists, IPermissionList, IThisPermissionDelta } from './Services/Permissions';

export interface IMyPermissionsProps {
  webURL: string;
  isSiteAdmin: boolean;
  listTitles: string[];
  title: string;
  width: number;
  maxWidth: number;
  userId: number;

  theList: IPermissionList;
  webPermissions: IMyPermissions;
  _updateWebPermissions: any;

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
  refreshId: string;
  
}
