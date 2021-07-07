import * as React from 'react';
import * as ReactDom from 'react-dom';

import { sp } from '@pnp/sp';

import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GenericWebpartWebPartStrings';
import GenericWebpart from './components/GenericWebpart';
import { IGenericWebpartProps } from './components/IGenericWebpartProps';

import { PageContext } from '@microsoft/sp-page-context';

import { makeTheTimeObject } from '@mikezimm/npmfunctions/dist/Services/Time/timeObject';

import { setPageFormatting, IFPSPage } from '@mikezimm/npmfunctions/dist/Services/DOM/FPSFormatFunctions';
import { minimizeQuickLaunch } from '@mikezimm/npmfunctions/dist/Services/DOM/quickLaunch'; //For FPS Options

import { saveTheTime, getTheCurrentTime, saveAnalytics } from '../../services/createAnalytics';

import { propertyPaneBuilder } from '../../services/propPane/PropPaneBuilder';

require('../../services/GrayPropPaneAccordions.css');

import { defineTheList } from './components/ListProvisioning/ListsTMT/defineThisList';

import { IMyProgress, } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';

import { makeid, getStringArrayFromString } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';

import { IListory, IMyJsonCompareProps, IMyJsonCompareState } from '../../services/railsCommon/jsonCompare/ICompareTypes';  //listory: IListory;

export interface IGenericWebpartWebPartProps {

  description: string;

  // 0 - Context
  pageContext: PageContext;

  // 1 - Analytics options
  useListAnalytics: boolean;
  analyticsWeb?: string;
  analyticsList?: string;
  stressMultiplier?: number;

  // 2 - Source and destination list information
  createVerifyLists: boolean;
  parentListTitle: string;
  parentListWeb: string;

  childListTitle: string;
  childListWeb: string;
  parentListFieldTitles: string;

  onlyActiveParents: boolean;

  // 3 - General how accurate do you want this to be

  // 4 - Info Options

  // 5 - UI Defaults

  // 6 - User Feedback:
  progress: IMyProgress;

  // 7 - TBD

  // 9 - Other web part options
  webPartScenario: string; //Choice used to create mutiple versions of the webpart.
  allowRailsOff: boolean;
  listory: IListory;

  advancedPivotStyles: boolean;
  pivotSize: string;
  pivotFormat: string;
  pivotOptions: string;
  pivotTab: string;

  //General settings for FPS Options group
  searchShow: boolean;
  fpsPageStyle: string;
  fpsContainerMaxWidth: string;
  quickLaunchHide: boolean;

  uniqueId: string;
  
}


export default class GenericWebpartWebPart extends BaseClientSideWebPart <IGenericWebpartWebPartProps>  {

  private fpsPageDone: boolean = false;
  private fpsPageArray: any[] = null;
  private minQuickLaunch: boolean = false;

/***
 *          .d88b.  d8b   db d888888b d8b   db d888888b d888888b 
 *         .8P  Y8. 888o  88   `88'   888o  88   `88'   `~~88~~' 
 *         88    88 88V8o 88    88    88V8o 88    88       88    
 *         88    88 88 V8o88    88    88 V8o88    88       88    
 *         `8b  d8' 88  V888   .88.   88  V888   .88.      88    
 *          `Y88P'  VP   V8P Y888888P VP   V8P Y888888P    YP    
 *                                                               
 *                                                               
 */

    //Added for Get List Data:  https://www.youtube.com/watch?v=b9Ymnicb1kc
    public onInit():Promise<void> {
      return super.onInit().then(_ => {

        // other init code may be present

        let mess = 'onInit - ONINIT: ' + new Date().toLocaleTimeString();

        console.log(mess);

        //https://stackoverflow.com/questions/52010321/sharepoint-online-full-width-page
        if ( window.location.href &&  
          window.location.href.toLowerCase().indexOf("layouts/15/workbench.aspx") > 0 ) {
            
          if (document.getElementById("workbenchPageContent")) {
            document.getElementById("workbenchPageContent").style.maxWidth = "none";
          }
        } 

        if ( this.properties.uniqueId && this.properties.uniqueId.length > 0 ) {} else { 
          this.properties.uniqueId = makeid( 7 ) ;
        }

        //console.log('window.location',window.location);
        sp.setup({
          spfxContext: this.context
        });
      });
    }
  

    public getUrlVars(): {} {
      var vars = {};
      vars = location.search
      .slice(1)
      .split('&')
      .map(p => p.split('='))
      .reduce((obj, pair) => {
        const [key, value] = pair.map(decodeURIComponent);
        return ({ ...obj, [key]: value }) ;
      }, {});
      return vars;
    }

  public render(): void {

    let progress = this.properties.progress;
    console.log('this.properties.progress:',this.properties.progress);

    //For FPS Options
    this.setThisPageFormatting( this.properties.fpsPageStyle );
    this.setQuickLaunch( this.properties.quickLaunchHide );

    //Be sure to always pass down an actual URL if the webpart prop is empty at this point.
    //If it's undefined, null or '', get current page context value
    let parentWeb = this.properties.parentListWeb && this.properties.parentListWeb != '' ? this.properties.parentListWeb : this.context.pageContext.web.absoluteUrl;
    let childWeb = this.properties.childListWeb && this.properties.childListWeb != '' ? this.properties.childListWeb : this.context.pageContext.web.absoluteUrl;
    let tenant = this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl,"");

    let urlVars : any = this.getUrlVars();
    console.log('urlVars:' , urlVars );
    let allowRailsOff = this.properties.allowRailsOff;

    /**
     * These are the rules that allow webpart to run in RailsOff / Dev mode.
     */
    if ( this.context.pageContext.web.serverRelativeUrl.toLowerCase().indexOf('/sites/webpartdev') === 0 ) {  allowRailsOff = true;  }
    if ( this.context.pageContext.web.serverRelativeUrl.toLowerCase().indexOf('/sites/templates') === 0 ) {  allowRailsOff = true;  }

    if ( urlVars.scenario && urlVars.scenario === 'dev' ) {  allowRailsOff = true;  }
    if ( urlVars.ttp && urlVars.ttp === 'true' ) {  allowRailsOff = true;  }
    if ( urlVars.scenario && urlVars.scenario !== 'dev' ) {  allowRailsOff = false;  }

    //Unlocks dangerous settings links
    let allowCrazyLink = false;
    if ( allowRailsOff === true && urlVars.crazy === 'true' ) {  allowCrazyLink = true;  }

    if ( allowRailsOff === true && urlVars.web && urlVars.web.length > 10 ) {
      if ( urlVars.web.toLowerCase().indexOf( tenant.toLowerCase() ) === 0 ) {
        parentWeb = urlVars.web;

      } else {
        //web paramter is not on this tenant... error out
        alert('The web parameter is not on this tenant...\n\n' + urlVars.web );

      }
    }

    const element: React.ReactElement<IGenericWebpartProps> = React.createElement(
      GenericWebpart,
      {
        description: this.properties.description,
        
        // 0 - Context
        pageContext: this.context.pageContext,
        wpContext: this.context,
        tenant: tenant,
        urlVars: urlVars,
        today: makeTheTimeObject(''),
        parentListFieldTitles: this.properties.parentListFieldTitles,

        //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
        WebpartElement: this.domElement,

        // 1 - Analytics options
        useListAnalytics: this.properties.useListAnalytics,
        analyticsList: strings.analyticsList,
        analyticsWeb: tenant + strings.analyticsWeb,
      
        // 2 - Source and destination list information
        parentListTitle: this.properties.parentListTitle,
        parentListWeb: parentWeb,
      
        childListTitle: this.properties.childListTitle,
        childListWeb: childWeb,

        onlyActiveParents: this.properties.onlyActiveParents,

        allowRailsOff: allowRailsOff,
        allowCrazyLink: allowCrazyLink,
        listory: this.properties.listory ? this.properties.listory : 2,

        // 3 - General how accurate do you want this to be

        // 4 - Info Options

        // 5 - UI Defaults

        // 6 - User Feedback:
        /*
        progress: {
          label: '',
          description: '',
          percentComplete: 0,
          progressHidden: true,
        },
        */
        progress: progress,
        // 7 - TBD

        // 9 - Other web part options
        webPartScenario: this.properties.webPartScenario, //Choice used to create mutiple versions of the webpart.
  
        pivotSize: this.properties.pivotSize,
        pivotFormat: this.properties.pivotFormat,
        pivotOptions: this.properties.pivotOptions,
        pivotTab: 'Projects', //this.properties.pivotTab (was setTab in pivot-tiles)

        showEarlyAccess: true,

        uniqueId: this.properties.uniqueId,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


  private async UpdateTitles(): Promise<boolean> {

    let listName = this.properties.parentListTitle ? this.properties.parentListTitle : 'ParentListTitle';
    const list = sp.web.lists.getByTitle(listName);
    const r = await list.fields();

    //2020-05-13:  Remove Active since it's replaced with StatusTMT which is not applicable here
    let defFields = ["Title","Author","Editor","Created","Modified"];
    let filterFields=["SSChoice1","SSChoiceA","MSChoice2","MSChoiceB"];
    let allFields = defFields.concat(filterFields);

    let fieldTitles = r.filter(f => f.Hidden !== true && allFields.indexOf(f.StaticName) > -1).map( 
      f => {return [f.StaticName,f.Title,f.Description,f.Required,f.FieldTypeKind];});
    
    //Update properties here:
    this.properties.parentListFieldTitles = JSON.stringify(fieldTitles);

    console.log('list fields: ', r);
    console.log('fieldTitles: ', fieldTitles);
    
    return true;

  } 


  /***
  *         d8888b. d8888b.  .d88b.  d8888b.      d8888b.  .d8b.  d8b   db d88888b 
  *         88  `8D 88  `8D .8P  Y8. 88  `8D      88  `8D d8' `8b 888o  88 88'     
  *         88oodD' 88oobY' 88    88 88oodD'      88oodD' 88ooo88 88V8o 88 88ooooo 
  *         88~~~   88`8b   88    88 88~~~        88~~~   88~~~88 88 V8o88 88~~~~~ 
  *         88      88 `88. `8b  d8' 88           88      88   88 88  V888 88.     
  *         88      88   YD  `Y88P'  88           88      YP   YP VP   V8P Y88888P 
  *                                                                                
  *                                                                                
  */


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return propertyPaneBuilder.getPropertyPaneConfiguration(
      this.properties,
      this.UpdateTitles.bind(this),
      );
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {

    /**
     * This section is used to determine when to refresh the pane options
     */
    let updateOnThese = [
      'setSize','setTab','otherTab','setTab','otherTab','setTab','otherTab','setTab','otherTab',
      'parentListFieldTitles','progress','UpdateTitles','parentListTitle','childListTitle','parentListWeb','childListWeb'
    ];
    //alert('props updated');
    console.log('onPropertyPaneFieldChanged:', propertyPath, oldValue, newValue);
    if (updateOnThese.indexOf(propertyPath) > -1 ) {
      this.properties[propertyPath] = newValue;   
      this.context.propertyPane.refresh();

    } else { //This can be removed if it works

    }
    this.render();
  }

  
  /**
   * Used with FPS Functions
   * @param quickLaunchHide 
   */
  private setQuickLaunch( quickLaunchHide: boolean ) {

    if ( quickLaunchHide === true && this.minQuickLaunch === false ) {
      minimizeQuickLaunch( document , quickLaunchHide );
      this.minQuickLaunch = true;
    }

  }

  /**
   * Used with FPS Functions
   * @param fpsPageStyle 
   */
  private setThisPageFormatting( fpsPageStyle: string ) {
    let fpsPage: IFPSPage = {
      Done: this.fpsPageDone,
      Style: fpsPageStyle,
      Array: this.fpsPageArray,
    };

    fpsPage = setPageFormatting( this.domElement, fpsPage );
    this.fpsPageArray = fpsPage.Array;
    this.fpsPageDone = fpsPage.Done;
  }


}
