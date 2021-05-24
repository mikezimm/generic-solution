import {
  IPropertyPanePage,
  PropertyPaneLabel,
  IPropertyPaneLabelProps,
  PropertyPaneHorizontalRule,
  PropertyPaneTextField, IPropertyPaneTextFieldProps,
  PropertyPaneLink, IPropertyPaneLinkProps,
  PropertyPaneDropdown, IPropertyPaneDropdownProps,
  IPropertyPaneDropdownOption,PropertyPaneToggle,
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType,
} from '@microsoft/sp-webpart-base';

import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { PropertyPanePropertyEditor } from '@pnp/spfx-property-controls/lib/PropertyPanePropertyEditor';

import * as strings from 'GenericWebpartWebPartStrings';
import { pivotOptionsGroup} from './index';

import { IGenericWebpartWebPartProps } from '../../webparts/genericWebpart/GenericWebpartWebPart';
import { FPSOptionsGroup } from '@mikezimm/npmfunctions/dist/Services/PropPane/FPSOptionsGroup';
import { WebPartInfoGroup, JSON_Edit_Link } from '@mikezimm/npmfunctions/dist/Services/PropPane/zReusablePropPane';
import * as links from '@mikezimm/npmfunctions/dist/HelpInfo/Links/LinksRepos';

export class IntroPage {
  public getPropertyPanePage(webPartProps: IGenericWebpartWebPartProps, _onClickUpdateTitles ): IPropertyPanePage {
    return <IPropertyPanePage>
    { // <page1>
/*
      header: {
        description: strings.PropertyPaneAbout
      },
*/
      displayGroupsAsAccordion: true,
      groups: [
        WebPartInfoGroup( links.gitRepoEasyContnets, 'Swiss Army Knife of tiles' ),

        ]}; // Groups
  } // getPropertyPanePage()
}

export let introPage = new IntroPage();