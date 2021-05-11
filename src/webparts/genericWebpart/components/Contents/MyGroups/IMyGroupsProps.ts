import { WebPartContext } from "@microsoft/sp-webpart-base";   //  context: WebPartContext;
import { DisplayMode } from "@microsoft/sp-core-library";
import { PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { PersonaSize, } from 'office-ui-fabric-react';

export interface IGroupsProps {  // groupsProps: IGroupsProps[] ;
  title: string;
  description: string;
  styles: string;
  icon: string;
  options: string[];
}

export interface IMyGroupsProps {
  webURL: string;
  isSiteAdmin: boolean;
  groups: any[];
  groupsProps: IGroupsProps[] ;
  title: string;
  width: number;
  maxWidth: any;
  userId: number;
  personaSize?: PersonaSize;
  displayMode: DisplayMode;
  context: WebPartContext;
  searchFirstName: boolean;
  setPivSize: PivotLinkSize;
  setPivFormat: PivotLinkFormat;
  updateProperty?: (value: string) => void;
  searchProps?: string;
  clearTextSearchProps?: string;
  pageSize?: number;
  groupsShowAdmins: boolean ;
  groupsShowGuests: boolean ;
  minAdminGuestIcons: boolean;
  
}
