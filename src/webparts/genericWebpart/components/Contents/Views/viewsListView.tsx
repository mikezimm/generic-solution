
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';
import { IContentsListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes';

import { buildPropsHoverCard } from '../../../../../services/hoverCardService';

import { buildMLineDiv } from '../../../../../services/stringFormatService';
import { getXMLObjectFromString, prettyUpXMLStringAsElements } from '../../../../../services/XMLServices';

import { IContentsViewInfo, IViewBucketInfo} from './viewsComponent';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '../../HelpInfo/AllLinks';


import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogViewProps {
    //title: string;
    titles: [];
    searchMeta: string;
    webURL: string;
    listGuid: string;
    items: IViewBucketInfo;
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;

    showID?: boolean;
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    showXML: boolean;
    showJSON: boolean;
    showSPFx: boolean;

    showMinViews: boolean;
    specialAlt: boolean;


}

export interface IMyLogViewState {
  maxChars?: number;
}

const stackFormRowTokens: IStackTokens = { childrenGap: 10 };

const iconClassAction = mergeStyles({
  fontSize: 18,
  fontWeight: "bolder",
  color: "black",
  margin: '5px',
  verticalAlign: 'bottom',
  padding: '0px !important',
});

const iconClassInfo = mergeStyles({
  fontSize: 18,
  margin: '5px',
  verticalAlign: 'bottom',
  padding: '0px !important',
});


export default class MyLogView extends React.Component<IMyLogViewProps, IMyLogViewState> {


    /***
 *          .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
 *         d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
 *         8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
 *         8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
 *         Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
 *          `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
 *                                                                                                       
 *                                                                                                       
 */ 

    constructor(props: IMyLogViewProps) {
        super(props);
        this.state = {
          maxChars: this.props.maxChars ? this.props.maxChars : 50,
        };
    }
        
    public componentDidMount() {
        //this._getFieldItems();

        
    }


/***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *                                                                                         
 *                                                                                         
 */

    public componentDidUpdate(prevProps: IMyLogViewProps): void {
    //this._updateWebPart(prevProps);
    }

/***
 *         d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *         88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *         88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *         88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *         88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *         88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                          
 *                                                          
 */


    public render(): React.ReactElement<IMyLogViewProps> {

      let thisLog = null;

      if ( this.props.items.views != null && this.props.items.count > 0 ) { 

        let logItems : IContentsViewInfo[] = this.props.items.views;

        let styleAdvanced = this.props.showSettings ? styles.showMe : styles.hideMe;
        let styleRails = this.props.railsOff ? styles.showMe : styles.hideMe;
        let columnsToVisible = !this.props.railsOff && ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.showCell : styles.hideMe;
        let styleSpecial = this.props.railsOff || ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.hideMe : styles.showCell;
        let styleID = !this.props.railsOff && this.props.showID && ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.showCell : styles.hideMe;
        let styleXML = !this.props.railsOff && this.props.showXML ? styles.showCell : styles.hideMe;
        let styleJSON = !this.props.railsOff && this.props.showJSON ? styles.showCell : styles.hideMe;
        let styleSPFx = !this.props.railsOff && this.props.showSPFx ? styles.showCell : styles.hideMe;
        let styleRailsOff = this.props.railsOff ? styles.showCell : styles.hideMe;
        let styleOnRailsOn = this.props.railsOff ? styles.hideMe : styles.showCell;

        if ( this.props.railsOff || this.props.showXML || this.props.showJSON || this.props.showSPFx ) { columnsToVisible = styles.hideMe ; }

        let itemRows = logItems.length === 0 ? null : logItems.map( Viw => { 

          let defButtonStyles = {
            root: {padding:'0px !important', height: 26, width: 26, backgroundColor: 'white'},//color: 'green' works here
            icon: { 
              fontSize: 14,
              fontWeight: "900",
              margin: '10px 5px',  //This puts the margin around the buttons
              //color: '#00457e', //This will set icon color : 00457e
           },
          };

          let columnsStyles = JSON.parse(JSON.stringify(defButtonStyles));
          columnsStyles.root.color = 'red !important';

          let viewsStyles = JSON.parse(JSON.stringify(defButtonStyles));
          viewsStyles.root.color = 'blue !important';

          let typesStyles = JSON.parse(JSON.stringify(defButtonStyles));
          typesStyles.root.color = 'green !important';

          let gotoColumns = null; //createIconButton('Pause', 'Columns', this.props.pickThisField, 'Columns' + fieldInfo , columnsStyles );


          
          let specialColumn = null;

          //#########################################################################################################
          //#######   Creates ViewFields options
          //#########################################################################################################
          let vViewFields = Viw.ViewFields;

          if ( this.props.searchMeta === 'Fields' ) {

            specialColumn = this.props.specialAlt === true ? <div> { vViewFields.map( f => <div>{ f } </div>) } </div> : <div> { vViewFields.join(', ') }</div>;

          } else if ( [ 'Query','Where', 'GroupBy', 'OrderBy', 'Joins', 'Options',  'Aggregations'].indexOf( this.props.searchMeta ) > -1 ) {
            let specValue = Viw[ this.props.searchMeta ];
            let indents = -1;
            let openTag = null;
            specialColumn = this.props.specialAlt === true ? <div> 
              { prettyUpXMLStringAsElements( specValue ) } 
              </div> : <div> { specValue }</div>;

          }

          //import { buildPropsHoverCard } from '../../../../../services/hoverCardService';
          let detailsCard = buildPropsHoverCard(Viw, 
            ["Title","DefaultView","PersonalView","Id","TabularView","Hidden"],
            ["odata.type","meta","searchString"] , true, null );

          let vIdUC = Viw.Id.toUpperCase();
          let viewSettingsURL = !this.props.showSettings ? Viw.Title : createLink(this.props.webURL + "/_layouts/15/ViewEdit.aspx?List={" + this.props.listGuid + "}&View={" + vIdUC + "}", '_blank', Viw.Title);

          let other = <div style={{ display: 'inline-flex', backgroundColor: 'white', padding: 0 }}> { gotoColumns }  </div>;

          let dev = '';
          if (Viw.CanBeDeleted !== true) { dev += "!Del" ; }

          let metaClass = Viw.meta.indexOf( this.props.searchMeta ) > -1 ? styles.showMe : styles.hideMe;

          //columnsToVisible
          let trStyle = {};
          if ( this.props.specialAlt === true ) { trStyle = { paddingTop: '10px', paddingBottom: '15px'} ; }

          return <tr>
              <td className={ styles.nowWrapping }> { Viw.Title } </td>
              <td className={ styles.nowWrapping }> { viewSettingsURL }</td>
              <td className={ styleID }> { Viw.Id } </td>
              <td className={ columnsToVisible }> { /* Viw.Group */ } </td>
              <td className={ columnsToVisible }> { Viw.settings ? Viw.settings : '-' } </td>


              <td className={ [styles.nowWrapping, columnsToVisible].join(', ') }> { dev } </td>

              <td className={ styleSpecial } style={ trStyle }> { specialColumn } </td>

              <td className={ styleXML } style={ trStyle }> { this.props.showXML ? prettyUpXMLStringAsElements(Viw.ListViewXml) : null } </td>
              <td className={ styleSPFx } style={ trStyle }> { this.props.showSPFx ? this.getFieldSPFx(Viw) : null } </td>
              <td className={ styleJSON } style={ trStyle }> { this.props.showJSON ? this.getFieldJSON(Viw) : null } </td>

              <td className= { styleRailsOff }>Rails Off Content</td>

              <td style={{ backgroundColor: 'white' }} className={ styles.listButtons }>  { detailsCard }</td>

            </tr>;

        });

    
/***
 *                   d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *                   88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *                   88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *                   88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *                   88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *                   88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                                      
 *                                                                      
 */

        let fieldTable = <table style={{ display: '', borderCollapse: 'collapse', width: '100%' }} className={stylesInfo.infoTable}>
            <tr>
                <th>Title</th>
                <th>Name</th>
                <th className={ styleID }>ID</th>
                <th className={ columnsToVisible }>Group</th>
                <th className={ columnsToVisible }>Default</th>


                <th className={ [styles.nowWrapping, columnsToVisible].join(', ') }>Dev</th>

                <th className={ styleSpecial }> View Props </th>

                <th className={ styleXML }> { 'ListViewXml' } </th>
                <th className={ styleSPFx }> { 'SPFx' } </th>
                <th className={ styleJSON }> { 'JSON' } </th>

                <th className= { styleRailsOff }>Rails Off Heading</th>
                <th>Details</th>

            </tr>
            { itemRows }
        </table>;

        let fieldTitle = this.props.items.bucketLabel == '' ? null :
            <div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ this.props.items.bucketLabel } - ( { this.props.items.count } )</span></div>;

        return (
          <div className={ styles.logListView }>
              <div style={{ paddingTop: 10}} className={ stylesInfo.infoPaneTight }>
                { fieldTitle }
                { fieldTable }
            </div>
          </div>
          );

    } else {


      // <div className={ styles.container }></div>
      return (
          <div className={ styles.logListView }>
              { thisLog }
          </div>
          );
        } 

    } 


    private getFieldJSON ( thisView ) {
        var jsonX : JSX.Element[] = [];
        jsonX.push(  buildMLineDiv(0 , "{" )  );

        var fieldChoices2 = "";
        var fieldChoices3 = "";
        var fieldChoicesJ = "['";

        if ( thisView.TypeAsString === "Choice" || thisView.TypeAsString === "MultiChoice") {
          for (let member in thisView.Choices.results) {

            fieldChoices2 += thisView.results[member] + ";";
            fieldChoices3 += thisView.results[member] + "<br>";
            fieldChoicesJ += thisView.results[member] ;
            if ( member == ( thisView.results.length - 1).toString() ) { fieldChoicesJ += "']"; } else {fieldChoicesJ += "','"; }
          }
        } //Need to show all values
        fieldChoices3 = "<p>" + fieldChoices3 + "</p>";


//        jsonX.push(  "'" +  + "': '" + "',"  )  ) ;

        //Can be used to stop code at certain fields
        if (thisView.Title === 'DisplayName1') { 
          thisView.Title=thisView.Title;
          thisView.Title=thisView.Title;

        }


        if (thisView.Title) { jsonX.push(  buildMLineDiv(0 , "'Title': '" + thisView.Title + "',")  ); }
        if (thisView.StaticName) { jsonX.push(  buildMLineDiv(0 , "'StaticName': '" + thisView.StaticName + "',")  ) ; }
        if (thisView.Required) { jsonX.push(  buildMLineDiv(0 , "'Required': " + thisView.Required + "',")  ) ; }
        if (thisView.Indexed) { jsonX.push(  buildMLineDiv(0 , "'Indexed':" + thisView.Indexed + "',")  ) ; }

        //https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.viewtype.aspx
        //I think we could use either of these to set the Field Type
        //if (thisView.TypeAsString) { jsonX.push(  "'TypeAsString': '" + thisView.TypeAsString + "',")  ) ; }
        if (thisView.FieldTypeKind) { jsonX.push(  buildMLineDiv(0 , "'FieldTypeKind': " + thisView.FieldTypeKind + "',")  ) ; }
        
        if (thisView.Description) { jsonX.push(  buildMLineDiv(0 , "'Description': '" + thisView.Description + "',")  ) ; }
        if (thisView.DefaultValue) { jsonX.push(  buildMLineDiv(0 , "'DefaultValue': " + thisView.DefaultValue + "',")  ) ; }
        if (thisView.OutputType) { jsonX.push(  buildMLineDiv(0 , "'OutputType': " + thisView.OutputType + "',")  ) ; }
        if (thisView.DateFormat) { jsonX.push(  buildMLineDiv(0 , "'DateFormat': '" + thisView.DateFormat + "',")  ) ; }
        if (thisView.Hidden) { jsonX.push(  buildMLineDiv(0 , "'Hidden': " + thisView.Hidden + "',")  ) ; }
        if (thisView.MinimumValue) { jsonX.push(  buildMLineDiv(0 , "'MinimumValue': " + thisView.MinimumValue + "',")  ) ; }
        if (thisView.MaximumValue) { jsonX.push(  buildMLineDiv(0 , "'MaximumValue': " + thisView.MaximumValue + "',")  ) ; }
        if (thisView.Choices) { jsonX.push(  buildMLineDiv(0 , "'Choices': " + fieldChoicesJ + "',")  ) ; }
        if (thisView.Formula) { jsonX.push(  buildMLineDiv(0 , "'Formula': '" + thisView.Formula + "',")  ) ; }
        if (thisView.EnforceUniqueValues) { jsonX.push(  buildMLineDiv(0 , "'EnforceUniqueValues': " + thisView.EnforceUniqueValues + "',")  ) ; }

        if (thisView.SelectionMode) { jsonX.push(  buildMLineDiv(0 , "'SelectionMode': " + thisView.SelectionMode + "',")  ) ; }
        if (thisView.DisplayFormat) { jsonX.push(  buildMLineDiv(0 , "'DisplayFormat': '" + thisView.DisplayFormat + "',")  ) ; }
        if (thisView.FriendlyDisplayFormat) { jsonX.push(  buildMLineDiv(0 , "'FriendlyDisplayFormat': " + thisView.FriendlyDisplayFormat + "',")  ) ; }
        if (thisView.DateTimeCalendarType) { jsonX.push(  buildMLineDiv(0 , "'DateTimeCalendarType': " + thisView.DateTimeCalendarType + "',")  ) ; }
        if (thisView.EnforceUniqueValues) { jsonX.push(  buildMLineDiv(0 , "'EnforceUniqueValues': " + thisView.EnforceUniqueValues + "',")  ) ; }

        if (thisView.RichText) { jsonX.push(  buildMLineDiv(0 , "'RichText': " + thisView.RichText + "',")  ) ; }
        if (thisView.NumberOfLines) { jsonX.push(  buildMLineDiv(0 , "'NumberOfLines': " + thisView.NumberOfLines + "',")  ) ; }
        if (thisView.AddToDefaultContentType) { jsonX.push(  buildMLineDiv(0 , "'AddToDefaultContentType': " + thisView.AddToDefaultContentType + "',")  ) ; }
       
        jsonX.push(  buildMLineDiv(0, "}" ) ) ;
        
        return jsonX;

    }

    private getFieldXML ( thisView ) {

      console.log( 'getFieldXML thisView:', thisView );

      let sample = thisView ;
      let xmlArray = [];

      let regex = /[\"] [A-Z]/g;

      do {
        let loc = sample.search(regex);
        if (xmlArray.length === 0 ) {
          //Do this to split the xml tag out
          let firstSlice = sample.slice(0, loc + 1 );
          let loc2 = firstSlice.indexOf(' ');
          let tag = firstSlice.slice(0, loc2 );
          let prop = firstSlice.slice(loc2 + 1 );
          xmlArray.push( buildMLineDiv(0,tag) );
          xmlArray.push( buildMLineDiv(2,prop) );

        } else {
          xmlArray.push( buildMLineDiv(2, sample.slice(0, loc + 1 ) ) );

        }

        sample = sample.slice( loc + 2 );

      } while ( sample.search(regex) > 0 );

      xmlArray.push( buildMLineDiv(2, sample ) );

      console.log( 'getFieldXML:', sample, xmlArray);

      /*
      let x = sample.search(regex);

      function testMe(str, index, replacement) {
          return str.substr(0, index + 1) + replacement + str.substr(index + 2);
      }

      let newV = testMe(sample,x,'---');

      console.log(newV);
      */

      return xmlArray;

    }

    private getFieldSPFx ( thisView  ) { // thisView is : IContentsViewInfo but not using because can't type the .results array

        var indent1 = 1;

        var fieldChoices2 = "";
        var fieldChoices3 = "";
        var fieldChoicesJ = "['";
        if ( thisView.TypeAsString === "Choice" || thisView.TypeAsString === "MultiChoice") {
          for (let member in thisView.Choices.results) {

            fieldChoices2 += thisView.results[member] + ";";
            fieldChoices3 += thisView.results[member] + "<br>";
            fieldChoicesJ += thisView.results[member] ;
            if ( member == ( thisView.results.length - 1).toString() ) { fieldChoicesJ += "']"; } else {fieldChoicesJ += "','"; }
          }
        } //Need to show all values
        fieldChoices3 = "<p>" + fieldChoices3 + "</p>";

        var jsonZ : JSX.Element[] = [];

        jsonZ.push(  buildMLineDiv(0 , "{"  )  ) ;

//        jsonX.push(  "'" +  + "': '" + "',"  )  ) ;

        //Can be used to stop code at certain fields
        if (thisView.Title === 'DisplayName1') { 
          thisView.Title=thisView.Title;
          thisView.Title=thisView.Title;

        }

        jsonZ.push(  buildMLineDiv(0 , "fieldType: {" + ""  )  ) ;
        jsonZ.push(  buildMLineDiv( indent1 , "kind: " + thisView.FieldTypeKind + ","  )  ) ;
        jsonZ.push(  buildMLineDiv( indent1 , "type:  '" + thisView['odata.type'] +"',"  )  ) ;
        jsonZ.push(  buildMLineDiv( indent1 , "vType: " + "'ADD_VType_Here',"  )  ) ;
        jsonZ.push(  buildMLineDiv(0 , "}" + ","  )  ) ;

        if (thisView.Title) { jsonZ.push(  buildMLineDiv(0 , "title: '" + thisView.Title + "',"  )  ) ; }
        if (thisView.StaticName) { jsonZ.push(  buildMLineDiv(0 , "name: '" + thisView.StaticName + "',"  )  ) ; }

        //https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.viewtype.aspx
        //I think we could use either of these to set the Field Type
        
        jsonZ.push(  buildMLineDiv(0 , "onCreateProps: {" + ""  )  ) ;  
        if (thisView.Description) { jsonZ.push(  buildMLineDiv( indent1 , "Description: '" + thisView.Description + "',"  )  ) ; }
        if (thisView.EnforceUniqueValues) { jsonZ.push(  buildMLineDiv( indent1 , "EnforceUniqueValues: " + thisView.EnforceUniqueValues + ","  )  ) ; }
        if (thisView.Group) { jsonZ.push(  buildMLineDiv( indent1 , "Group: '" + thisView.Group + "',"  )  ) ; }
        if (thisView.Required == true ) { jsonZ.push(  buildMLineDiv( indent1 , "Required: " + thisView.Required + ","  )  ) ; }
        if (thisView.Indexed == true ) { jsonZ.push(  buildMLineDiv( indent1 , "Indexed:" + thisView.Indexed + ","  )  ) ; }
        if (thisView.Hidden == true ) { jsonZ.push(  buildMLineDiv( indent1 , "Hidden: " + thisView.Hidden + ","  )  ) ; }
        if (thisView.ValidationFormula) { jsonZ.push(  buildMLineDiv( indent1 , "ValidationFormula: '" + thisView.ValidationFormula + "',"  )  ) ; }
        if (thisView.ValidationMessage) { jsonZ.push(  buildMLineDiv( indent1 , "ValidationMessage: '" + thisView.ValidationMessage + "',"  )  ) ; }
        jsonZ.push(  buildMLineDiv(0 , "}" + ","  )  ) ;

        if ( thisView.ListViewXml.indexOf('ShowInNewForm="FALSE"') > -1  ) { jsonZ.push(  buildMLineDiv(0 , "showNew: false,"  )  ) ; }
        if ( thisView.ListViewXml.indexOf('ShowInEditForm="FALSE"') > -1  ) { jsonZ.push(  buildMLineDiv(0 , "showEdit: false,"  )  ) ; }
        if ( thisView.ListViewXml.indexOf('ShowInDisplayForm="FALSE"') > -1  ) { jsonZ.push(  buildMLineDiv(0 , "showDisplay: false,"  )  ) ; }

        if (thisView.DefaultValue) { jsonZ.push(  buildMLineDiv(0 , "DefaultValue: " + thisView.DefaultValue + ","  )  ) ; }
        if (thisView.OutputType) { jsonZ.push(  buildMLineDiv(0 , "outputType: '" + thisView.OutputType + "',"  )  ) ; }
        if (thisView.DateFormat) { jsonZ.push(  buildMLineDiv(0 , "dateFormat: '" + thisView.DateFormat + "',"  )  ) ; }
        if (thisView.MinimumValue) { jsonZ.push(  buildMLineDiv(0 , "minValue: " + thisView.MinimumValue + ","  )  ) ; }
        if (thisView.MaximumValue) { jsonZ.push(  buildMLineDiv(0 , "maxValue: " + thisView.MaximumValue + ","  )  ) ; }
        if (thisView.Choices) { jsonZ.push(  buildMLineDiv(0 , "choices: '" + fieldChoicesJ + "',"  )  ) ; }
        if (thisView.Formula) { jsonZ.push(  buildMLineDiv(0 , "formula: '" + thisView.Formula + "',"  )  ) ; }

        if (thisView.SelectionMode) { jsonZ.push(  buildMLineDiv(0 , "selectionMode: " + thisView.SelectionMode + ","  )  ) ; }
        if (thisView.SelectionGroup) { jsonZ.push(  buildMLineDiv(0 , "selectionGroup: " + thisView.SelectionGroup + ","  )  ) ; }
        if (thisView.DisplayFormat) { jsonZ.push(  buildMLineDiv(0 , "displayFormat: '" + thisView.DisplayFormat + "',"  )  ) ; }
        if (thisView.FriendlyDisplayFormat) { jsonZ.push(  buildMLineDiv(0 , "friendlyDisplayFormat: " + thisView.FriendlyDisplayFormat + ","  )  ) ; }
        if (thisView.DateTimeCalendarType) { jsonZ.push(  buildMLineDiv(0 , "calendarType: " + thisView.DateTimeCalendarType + ","  )  ) ; }
        if (thisView.EnforceUniqueValues) { jsonZ.push(  buildMLineDiv(0 , "EnforceUniqueValues: " + thisView.EnforceUniqueValues + ","  )  ) ; }

        if ( thisView.FieldTypeKind == 3 ) { //This is rich text
          jsonZ.push(  buildMLineDiv(0 , "richText: true,"  )  ) ;
          jsonZ.push(  buildMLineDiv(0 , "numberOfLines: " + thisView.NumberOfLines + ","  )  ) ;
          jsonZ.push(  buildMLineDiv(0 , "allowHyperlink: " + thisView.AllowHyperlink + ","  )  ) ;
          jsonZ.push(  buildMLineDiv(0 , "appendOnly: " + thisView.AppendOnly + ","  )  ) ;
          jsonZ.push(  buildMLineDiv(0 , "restrictedMode: " + thisView.RestrictedMode + ","  )  ) ;
          
        }
        if (thisView.AddToDefaultContentType) { jsonZ.push(  buildMLineDiv(0 , "addToDefaultContentType: " + thisView.AddToDefaultContentType + ","  )  ) ; }

        jsonZ.push(  buildMLineDiv(0 , "}" )  );
        
        return jsonZ;
    }

    private getFieldSpecialValue ( Viw : IContentsViewInfo ) {


      var specialColumn : string | JSX.Element = "";

      let fieldOutputType = '';
      let FriendlyDisplayFormat = '';
      let DisplayFormat = '';
      let DateTimeCalendarType = '';
      let SelectionGroup = null;
      let SelectionMode = '';


/*
      switch ( Viw.TypeAsString ) {
        case "Calculated":
          if ( Viw.OutputType === 2) {
            fieldOutputType = "Single line text";
          }
          if ( Viw.OutputType === 9) {
            fieldOutputType = "Number";
          }
          if ( Viw.OutputType === 10) {
            fieldOutputType = "Currency";
          }
          if ( Viw.OutputType === 8) {
            fieldOutputType = "Yes/No";
          }
          if ( Viw.OutputType === 4) {
            fieldOutputType = "Date/Time";
          }

          specialColumn = <p><span style={{color:'green'}}> {Viw.Formula} </span><i><strong><span style={{color:"red", paddingLeft: 5}}> ( { fieldOutputType } ) </span></strong></i></p>;
          //specialColumn = specialColumn.split(")&IF(").join(")</br>&IF(");


          if (this.props.specialAlt === true ) {
           //Someday, we could use this function to find closing brackets for things like And and Or
            //https://codereview.stackexchange.com/questions/179471/find-the-corresponding-closing-parenthesis

            if (Viw.Formula.indexOf("=\"<a") == 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) </span><span style={{color:"blue"}}>Link</span></strong></i>
              <span style={{color:"green"}}> { Viw.Formula.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')} </span></p></div>;
  //                specialColumn = specialColumn.split(")&IF(").join(")</br>&IF(")
            } else if (Viw.Formula.indexOf(")&IF(") > 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) IF</span></strong></i>
                <span style={{color:"green"}}> { Viw.Formula.split(")&IF(").join(")</br>&IF(").split("</br>").map( r => { return <div>{ r }</div>; } ) } </span></p></div>;
  //                specialColumn = specialColumn.split(")&IF(").join(")</br>&IF(")

            } else if (Viw.Formula.indexOf(")+IF(") > 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) +IF</span></strong></i>
                <span style={{color:"green"}}> { Viw.Formula.split(")+IF(").join(")</br>+IF(").split("</br>").map( r => { return <div>{ r }</div>; } )} </span></p></div>;
  //                specialColumn = specialColumn.split(")+IF(").join(")</br>+IF(")

            } else if (Viw.Formula.indexOf(",IF(") > 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) ,IF</span></strong></i>
                <span style={{color:"green"}}> { Viw.Formula.split(",IF(").join("</br>,IF(").split("</br>").map( r => { return <div>{ r }</div>; } )} </span></p></div>;
  //                specialColumn = Viw.Formula.split(",IF(").join("</br>,IF(")

            } else if (Viw.Formula.indexOf(",") > 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) various</span></strong></i></p></div>;

                let newFormula = Viw.Formula;
                newFormula = newFormula.split("ISNUMBER(").join("</br>ISNUMBER(");
                newFormula = newFormula.split("ISDATE(").join("</br>ISDATE(");
                newFormula = newFormula.split(",TEXT(").join("</br>,TEXT(");
                newFormula = newFormula.split(",CONCATENATE(").join("</br>,CONCATENATE(");
                newFormula = newFormula.split("(OR(").join("(</br>OR(");
                newFormula = newFormula.split("(AND(").join("(</br>AND(");
                newFormula = newFormula.split("((").join("(</br>(");
                newFormula = newFormula.split("))").join(")</br>)");

//                newFormula = newFormula.split("])").join("])</br>");
                newFormula = newFormula.split("&TEXT").join("</br>&TEXT");

                specialColumn = <div><span style={{color:"green"}}>{ newFormula.split("</br>").map( r => { return <div>{ r }</div>; } ) }</span></div>;
  //                fieldDetails3 = fieldDetails3.split(",").join(")</br>,")

            } else if (Viw.Formula.indexOf(",,,,,,") > 0 ) {
              specialColumn = <div><div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( { fieldOutputType } ) ,</span></strong></i></p></div>
                  <div><span style={{color:"green"}}> { Viw.Formula.split(",").join(")</br>,")}</span></div></div>;
  //                specialColumn = specialColumn.split(",").join(")</br>,")

            } else {
              specialColumn = specialColumn;

            }

          }


          break;

        case "MultiChoice":
          specialColumn = this.props.specialAlt === true ? <div> { Viw.Choices.map( c => <div>{ c } </div>) } </div> : <div> { Viw.Choices.join('; ') }</div>;
          break;

        case "Choice":
          specialColumn = this.props.specialAlt === true ? <div> { Viw.Choices.map( c => <div>{ c } </div>) } </div> : <div> { Viw.Choices.join('; ') }</div>;
          break;

        case "Integer":
        case "Number":
          if ( this.props.specialAlt !== true ) {
              specialColumn = <div> {Viw.MinimumValue } to { Viw.MaximumValue }  <i><strong><span style={{color:"red", paddingLeft: 5}}>( {Viw.TypeShortDescription } )</span></strong></i></div>;

          } else {
            specialColumn = <div><div><i><strong><span style={{color:"red", paddingLeft: 5}}>( { Viw.TypeShortDescription } )</span></strong></i></div>
            <div>Min: { Viw.MinimumValue }</div>
            <div>Max: { Viw.MaximumValue }</div></div>;

          }

          break;

        case "Integer":
          specialColumn = Viw.MinimumValue + " to " + Viw.MaximumValue + <i><strong><span style={{color:"red", paddingLeft: 5}}>( ' + Viw.TypeShortDescription + " )</span></strong></i>;
          break;

        case "Currency":
          specialColumn = Viw.MinimumValue + " to " + Viw.MaximumValue + <i><strong><span style={{color:"red", paddingLeft: 5}}>( ' + Viw.TypeShortDescription + " Currency id=" + Viw.CurrencyLocaleId + " )</span></strong></i>;
          break;

        case "URL":
          specialColumn = Viw.DisplayFormat === 1 ? 'Picture format' : 'HyperLink format';
          break;

        case "Lookup":
          let lookupSettings = [];
          if ( Viw.AllowMultipleValues === true ) { lookupSettings.push('Multi') ; }
          lookupSettings.push('LookupField: ' + Viw.LookupField) ;
          lookupSettings.push('LookupList: ' + Viw.LookupList) ;
          lookupSettings.push('Relationship: ' + Viw.RelationshipDeleteBehavior) ;

          if ( this.props.specialAlt === true ) {
            specialColumn = lookupSettings.length > 0 ? <div> { lookupSettings.map( L => { return <div>{ L } </div> ; }) } </div> : null;

          } else { 
            specialColumn = lookupSettings.length > 0 ? lookupSettings.join(', ')  : null;

          }



          break;

        case "Text":
          specialColumn = Viw.TypeShortDescription;
          break;

        case "Note":
          specialColumn = [ 'Multi Line Text ( ' + Viw.NumberOfLines + ' ) ', ' RichText = ' + Viw.RichText].join(', ');
          break;

        case "DateTime":
        case "Date":
          FriendlyDisplayFormat = (Viw.FriendlyDisplayFormat === 1) ? "Friendly" : "";
          DisplayFormat = (Viw.DisplayFormat === 0) ? "Date Only" : "Date & Time";
          DateTimeCalendarType = "CalendarType = " + Viw.DateTimeCalendarType;
          specialColumn = <div> { Viw.TypeShortDescription }  <i><strong><span style={{color:"red", paddingLeft: 5}}>( { [DisplayFormat, FriendlyDisplayFormat, DateTimeCalendarType].join(', ') } ) </span></strong></i></div>;
          break;

        case "User":
        case "MultiUser":
        case "UserMulti":
          SelectionMode = (Viw.SelectionMode === 0) ? "People only" : "Users & Groups";
          specialColumn = SelectionMode + ",";
          SelectionGroup = (Viw.SelectionGroup === 0) ? "Everyone" : Viw.SelectionGroup;
          specialColumn += " from group ( " + SelectionGroup + " )";

          break;

        default:
          if (Viw.Hidden === true) {
            specialColumn = "";
            specialColumn = "";
          }
          break;

      }
*/
      return specialColumn;

    } // End getSpecialColumn
}
