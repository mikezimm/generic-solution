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

import * as links from '../../webparts/genericWebpart/components/HelpInfo/AllLinks';   //              { links.gitRepoGenericWebpart.issues }

import { IGenericWebpartWebPartProps } from '../../webparts/genericWebpart/GenericWebpartWebPart';

import { fpsLogo326 } from '@mikezimm/npmfunctions/dist/Icons';

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
        { groupName: 'Web Part Info',
          isCollapsed: false ,
          groupFields: [
            
            /**
             * https://base64.guru/converter/encode/image/svg
             * <a href="www.gotolinkhere.com">${longImageSource}</a>
             */
            PropertyPaneWebPartInformation({
              description: `<img src='${fpsLogo326}'/>`,
              /*
              moreInfoLink: `https://pnp.github.io/sp-dev-fx-property-controls/`,
              videoProperties: {
                embedLink: `https://www.youtube.com/embed/d_9o3tQ90zo`,
                properties: { allowFullScreen: true}
              },
               */
              key: 'webPartInfoId'
            }) , 
            PropertyPaneWebPartInformation({
              description: `<p><i>"If you change the way you look at things, the things you look at change."</i></p>`,
              /*
              moreInfoLink: `https://pnp.github.io/sp-dev-fx-property-controls/`,
              videoProperties: {
                embedLink: `https://www.youtube.com/embed/d_9o3tQ90zo`,
                properties: { allowFullScreen: true}
              },
               */
              key: 'webPartInfoId2'
            }) , 
/*
            PropertyPanePropertyEditor({
              webpart: this,
              key: 'propertyEditor'
            })  , 
 */
            PropertyPaneWebPartInformation({
              description: `<h4>This webpart looks at Site Contents in a whole new way.</h4>
              <p>It's geared towards the <strong>power user</strong> and <strong>SharePoint Professional</strong> :).</p>`,
              /*
              moreInfoLink: `https://pnp.github.io/sp-dev-fx-property-controls/`,
              videoProperties: {
                embedLink: `https://www.youtube.com/embed/d_9o3tQ90zo`,
                properties: { allowFullScreen: true}
              },
              */
              key: 'webPartInfoId3'
            }) , 

            PropertyPaneLabel('About Text', {
              text: '',
            }),

            PropertyPaneLink('About Link' , {
              text: 'Github Repo:  ' + links.gitRepoGenericWebpart.desc ,
              href: links.gitRepoGenericWebpart.href,
              target: links.gitRepoGenericWebpart.target,
            }),
          ]
        },


        ]}; // Groups
  } // getPropertyPanePage()
}

export let introPage = new IntroPage();