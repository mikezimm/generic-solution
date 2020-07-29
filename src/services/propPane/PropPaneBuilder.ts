import {
  IPropertyPaneConfiguration,
} from '@microsoft/sp-webpart-base';

import {
  introPage,
//  webPartSettingsPage,

} from './index';

/*
        IntroPage.getPropertyPanePage(),
        WebPartSettingsPage.getPropertyPanePage(),
        ListMappingPage.getPropertyPanePage(),
*/

export class PropertyPaneBuilder {
  public getPropertyPaneConfiguration(webPartProps, _onClickCreateProject, _onClickCreateTime, _onClickUpdateTitles, setProgress): IPropertyPaneConfiguration {
    return <IPropertyPaneConfiguration>{
      pages: [
        introPage.getPropertyPanePage(webPartProps, _onClickCreateProject, _onClickCreateTime, _onClickUpdateTitles, setProgress),
//        webPartSettingsPage.getPropertyPanePage(webPartProps),

      ]
    };
  } // getPropertyPaneConfiguration()

}

export let propertyPaneBuilder = new PropertyPaneBuilder();