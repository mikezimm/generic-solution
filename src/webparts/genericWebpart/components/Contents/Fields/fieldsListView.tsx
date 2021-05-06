
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { buildPropsHoverCard } from '../../../../../services/hoverCardService';

import { buildMLineDiv } from '../../../../../services/stringFormatService';

import { IContentsFieldInfo, IFieldBucketInfo} from './fieldsComponent';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '../../HelpInfo/AllLinks';


import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogFieldProps {
    //title: string;
    titles: [];
    searchMeta: string;
    webURL: string;
    listGuid: string;
    items: IFieldBucketInfo;
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;

    showDesc?: boolean;
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    showXML: boolean;
    showJSON: boolean;
    showSPFx: boolean;

    showMinFields: boolean;
    specialAlt: boolean;


}

export interface IMyLogFieldState {
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


export default class MyLogField extends React.Component<IMyLogFieldProps, IMyLogFieldState> {


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

    constructor(props: IMyLogFieldProps) {
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

    public componentDidUpdate(prevProps: IMyLogFieldProps): void {
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


    public render(): React.ReactElement<IMyLogFieldProps> {

      let thisLog = null;

      if ( this.props.items.fields != null && this.props.items.count > 0 ) { 

        let logItems : IContentsFieldInfo[] = this.props.items.fields;

        let styleAdvanced = this.props.showSettings ? styles.showMe : styles.hideMe;
        let styleRails = this.props.railsOff ? styles.showMe : styles.hideMe;
        let columnsToVisible = !this.props.railsOff && ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.showCell : styles.hideMe;
        let styleSpecial = this.props.railsOff || ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.hideMe : styles.showCell;
        let styleDesc = !this.props.railsOff && this.props.showDesc && ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.showCell : styles.hideMe;
        let styleXML = !this.props.railsOff && this.props.showXML ? styles.showCell : styles.hideMe;
        let styleJSON = !this.props.railsOff && this.props.showJSON ? styles.showCell : styles.hideMe;
        let styleSPFx = !this.props.railsOff && this.props.showSPFx ? styles.showCell : styles.hideMe;
        let styleRailsOff = this.props.railsOff ? styles.showCell : styles.hideMe;
        let styleOnRailsOn = this.props.railsOff ? styles.hideMe : styles.showCell;

        if ( this.props.railsOff || this.props.showXML || this.props.showJSON || this.props.showSPFx ) { columnsToVisible = styles.hideMe ; }

        let itemRows = logItems.length === 0 ? null : logItems.map( Fld => { 

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

          //import { buildPropsHoverCard } from '../../../../../services/hoverCardService';
          let detailsCard = buildPropsHoverCard(Fld, ["Title","TypeAsString","TypeDisplayName","Description","StaticName","Group","Id","FillInChoice","Hidden","Indexed","Required"], ["odata.type", "FieldTypeKind","meta","searchString"] , true, null );

            let showSettings = this.props.showSettings === true ? true : false;
            if ( Fld.bucketCategory === 'System') { showSettings = false ; }

            let fieldSettingsURL = !showSettings ? Fld.StaticName : createLink(this.props.webURL + "/_layouts/15/FldEdit.aspx?List={" + this.props.listGuid + "}&Field=" + Fld.StaticName, '_blank', Fld.StaticName);

            let other = <div style={{ display: 'inline-flex', backgroundColor: 'white', padding: 0 }}> { gotoColumns }  </div>;

            let dev = '';
            let devT = '';
            if (Fld.Indexed === true) { dev += "Idx " ; devT += 'Indexed '; }
            if (Fld.Required === true) { dev += "Req " ; devT += 'Required '; }
            if (Fld.CanBeDeleted !== true) { dev += "!Del " ; devT += 'Can\'t be deleted '; }
            if (Fld.EnforceUniqueValues === true) { dev += "UQ " ; devT += 'EnforceUnique '; }
            if (Fld.ReadOnlyField === true) { dev += "RO " ; devT += 'ReadOnly '; }
            if (Fld.Sealed === true) { dev += "S " ; devT += 'Sealed '; }

            let metaClass = Fld.meta.indexOf( this.props.searchMeta ) > -1 ? styles.showMe : styles.hideMe;

            let trStyle = {};
            if ( this.props.specialAlt === true ) { trStyle = { paddingTop: '10px', paddingBottom: '15px'} ; }

            //columnsToVisible
            return <tr>
                <td className={ styles.nowWrapping }> { Fld.Title } </td>
                <td className={ styles.nowWrapping }> { fieldSettingsURL }</td>
                <td className={ styleDesc }> { Fld.Description.length > this.state.maxChars ? Fld.Description.slice(0,this.state.maxChars) + '...' : Fld.Description } </td>
                <td> { Fld.TypeAsString } </td>

                <td className={ columnsToVisible }> { Fld.Group } </td>
                <td className={ columnsToVisible }> { Fld.DefaultValue ? Fld.DefaultValue : '-' } </td>

                <td className={ styleXML } style={ trStyle }> { this.props.showXML ? this.getFieldXML(Fld.SchemaXml) : null } </td>
                <td className={ styleSPFx } style={ trStyle }> { this.props.showSPFx ? this.getFieldSPFx(Fld) : null } </td>
                <td className={ styleJSON } style={ trStyle }> { this.props.showJSON ? this.getFieldJSON(Fld) : null } </td>

                <td className={ [styles.nowWrapping, columnsToVisible].join(', ') } title= { devT }> { dev } </td>

                <td className={ styleSpecial } style={ trStyle }> { this.getFieldSpecialValue( Fld ) } </td>
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
                <th className={ styleDesc }>Description</th>
                <th>Type</th>
                <th className={ columnsToVisible }>Group</th>
                <th className={ columnsToVisible }>Default</th>

                <th className={ styleXML }> { 'SchemaXml' } </th>
                <th className={ styleSPFx }> { 'SPFx' } </th>
                <th className={ styleJSON }> { 'JSON' } </th>

                <th className={ [styles.nowWrapping, columnsToVisible].join(', ') }>Dev</th>

                <th className={ styleSpecial }> Column Props </th>

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


    private getFieldJSON ( thisField ) {
        var jsonX : JSX.Element[] = [];
        jsonX.push(  buildMLineDiv(0 , "{" )  );

        var fieldChoices2 = "";
        var fieldChoices3 = "";
        var fieldChoicesJ = "['";

        if ( thisField.TypeAsString === "Choice" || thisField.TypeAsString === "MultiChoice") {
          for (let member in thisField.Choices.results) {

            fieldChoices2 += thisField.results[member] + ";";
            fieldChoices3 += thisField.results[member] + "<br>";
            fieldChoicesJ += thisField.results[member] ;
            if ( member == ( thisField.results.length - 1).toString() ) { fieldChoicesJ += "']"; } else {fieldChoicesJ += "','"; }
          }
        } //Need to show all values
        fieldChoices3 = "<p>" + fieldChoices3 + "</p>";


//        jsonX.push(  "'" +  + "': '" + "\","  )  ) ;

        //Can be used to stop code at certain fields
        if (thisField.Title === 'DisplayName1') { 
          thisField.Title=thisField.Title;
          thisField.Title=thisField.Title;

        }


        if (thisField.Title) { jsonX.push(  buildMLineDiv(0 , "'Title': '" + thisField.Title + "\",")  ); }
        if (thisField.StaticName) { jsonX.push(  buildMLineDiv(0 , "'StaticName': '" + thisField.StaticName + "\",")  ) ; }
        if (thisField.Required) { jsonX.push(  buildMLineDiv(0 , "'Required': " + thisField.Required + "\",")  ) ; }
        if (thisField.Indexed) { jsonX.push(  buildMLineDiv(0 , "'Indexed':" + thisField.Indexed + "\",")  ) ; }

        //https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.fieldtype.aspx
        //I think we could use either of these to set the Field Type
        //if (thisField.TypeAsString) { jsonX.push(  "'TypeAsString': '" + thisField.TypeAsString + "\",")  ) ; }
        if (thisField.FieldTypeKind) { jsonX.push(  buildMLineDiv(0 , "'FieldTypeKind': " + thisField.FieldTypeKind + "\",")  ) ; }
        
        if (thisField.Description) { jsonX.push(  buildMLineDiv(0 , "'Description': '" + thisField.Description + "\",")  ) ; }
        if (thisField.DefaultValue) { jsonX.push(  buildMLineDiv(0 , "'DefaultValue': " + thisField.DefaultValue + "\",")  ) ; }
        if (thisField.OutputType) { jsonX.push(  buildMLineDiv(0 , "'OutputType': " + thisField.OutputType + "\",")  ) ; }
        if (thisField.DateFormat) { jsonX.push(  buildMLineDiv(0 , "'DateFormat': '" + thisField.DateFormat + "\",")  ) ; }
        if (thisField.Hidden) { jsonX.push(  buildMLineDiv(0 , "'Hidden': " + thisField.Hidden + "\",")  ) ; }
        if (thisField.MinimumValue) { jsonX.push(  buildMLineDiv(0 , "'MinimumValue': " + thisField.MinimumValue + "\",")  ) ; }
        if (thisField.MaximumValue) { jsonX.push(  buildMLineDiv(0 , "'MaximumValue': " + thisField.MaximumValue + "\",")  ) ; }
        if (thisField.Choices) { jsonX.push(  buildMLineDiv(0 , "'Choices': " + fieldChoicesJ + "\",")  ) ; }
        if (thisField.Formula) { jsonX.push(  buildMLineDiv(0 , "'Formula': '" + thisField.Formula + "\",")  ) ; }
        if (thisField.EnforceUniqueValues) { jsonX.push(  buildMLineDiv(0 , "'EnforceUniqueValues': " + thisField.EnforceUniqueValues + "\",")  ) ; }

        if (thisField.SelectionMode) { jsonX.push(  buildMLineDiv(0 , "'SelectionMode': " + thisField.SelectionMode + "\",")  ) ; }
        if (thisField.DisplayFormat) { jsonX.push(  buildMLineDiv(0 , "'DisplayFormat': '" + thisField.DisplayFormat + "\",")  ) ; }
        if (thisField.FriendlyDisplayFormat) { jsonX.push(  buildMLineDiv(0 , "'FriendlyDisplayFormat': " + thisField.FriendlyDisplayFormat + "\",")  ) ; }
        if (thisField.DateTimeCalendarType) { jsonX.push(  buildMLineDiv(0 , "'DateTimeCalendarType': " + thisField.DateTimeCalendarType + "\",")  ) ; }
        if (thisField.EnforceUniqueValues) { jsonX.push(  buildMLineDiv(0 , "'EnforceUniqueValues': " + thisField.EnforceUniqueValues + "\",")  ) ; }

        if (thisField.RichText) { jsonX.push(  buildMLineDiv(0 , "'RichText': " + thisField.RichText + "\",")  ) ; }
        if (thisField.NumberOfLines) { jsonX.push(  buildMLineDiv(0 , "'NumberOfLines': " + thisField.NumberOfLines + "\",")  ) ; }
        if (thisField.AddToDefaultContentType) { jsonX.push(  buildMLineDiv(0 , "'AddToDefaultContentType': " + thisField.AddToDefaultContentType + "\",")  ) ; }
       
        jsonX.push(  buildMLineDiv(0, "}" ) ) ;
        
        return jsonX;

    }

    private getFieldXML ( thisField ) {

      console.log( 'getFieldXML thisField:', thisField );

      let sample = thisField.replace(/&quot;/g,'"') ;
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


          //&#xA; = lineFeed
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

    private getFieldSPFx ( thisField  ) { // thisField is : IContentsFieldInfo but not using because can't type the .results array

        var indent1 = 1;

        var fieldChoices2 = "";
        var fieldChoices3 = "";
        var fieldChoicesJ = "[\"";
        if ( thisField.TypeAsString === "Choice" || thisField.TypeAsString === "MultiChoice") {
          for (let member in thisField.Choices) {

            fieldChoices2 += thisField.Choices[member] + ";";
            fieldChoices3 += thisField.Choices[member] + "<br>";
            fieldChoicesJ += thisField.Choices[member] ;
            if ( member == ( thisField.Choices.length - 1).toString() ) { fieldChoicesJ += "\"]"; } else {fieldChoicesJ += "\",\""; }
          }
        } //Need to show all values
        fieldChoices3 = "<p>" + fieldChoices3 + "</p>";

        var jsonZ : JSX.Element[] = [];

        jsonZ.push(  buildMLineDiv(0 , "{"  )  ) ;

//        jsonX.push(  "'" +  + "': '" + "\","  )  ) ;

        //Can be used to stop code at certain fields
        if (thisField.Title === 'DisplayName1') { 
          thisField.Title=thisField.Title;
          thisField.Title=thisField.Title;

        }

        jsonZ.push(  buildMLineDiv(0 , "\"fieldType\": {" + ""  )  ) ;
        jsonZ.push(  buildMLineDiv( indent1 , "\"kind\": " + thisField.FieldTypeKind + ","  )  ) ;
        jsonZ.push(  buildMLineDiv( indent1 , "\"type\":  \"" + thisField['odata.type'] +"\","  )  ) ;

        if ( ['SP.FieldText'].indexOf(thisField['odata.type']) > -1  ) {
          jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"Text\""  )  ) ;

        } else if ( thisField['odata.type'] === 'SP.FieldChoice' && thisField['FieldTypeKind'] === 23  ) {
          jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"\""  )  ) ;

        } else if ( thisField['odata.type'] === 'SP.FieldChoice' && thisField['FieldTypeKind'] === 6  ) {
          jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"Text\""  )  ) ;

        } else if ( ['SP.FieldDateTime'].indexOf(thisField['odata.type']) > -1 ) {
          jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"DateTime\""  )  ) ;
          
        } else if ( ['SP.FieldCreationInformation','SP.FieldMultiLineText','SP.FieldCurrency','SP.FieldUrl',
                    'SP.FieldMultiChoice','SP.FieldUserMulti','SP.FieldLocation','SP.FieldLookup','SP.FieldComputed'].indexOf(thisField['odata.type']) > -1 ) {
          jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"\""  )  ) ;
          
        } else if ( ['SP.FieldUser','SP.FieldUser'].indexOf(thisField['odata.type']) > -1 ) {
          jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"Integer\""  )  ) ;
          
        } else if ( ['SP.FieldNumber','SP.FieldNumber'].indexOf(thisField['odata.type']) > -1 ) {
          jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"Number\""  )  ) ;
          
        } else if ( ['SP.Field','SP.Field'].indexOf(thisField['odata.type']) > -1 ) {
          jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"Boolean\""  )  ) ;

        } else if ( thisField['odata.type'] === 'SP.FieldCalculated' ) {

          if ( thisField['OutputType'] === 2 ) { //Text
            jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"Text\""  )  ) ;

          } else if ( thisField['OutputType'] === 9 ) { //Number
            jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"Number\""  )  ) ;

          } else if ( thisField['OutputType'] === 10 ) { //Currency
            jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"Currency\""  )  ) ;

          } else if ( thisField['OutputType'] === 4 ) { //DateTime
            jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"DateTime\""  )  ) ;

          } else if ( thisField['OutputType'] === 8 ) { //Boolean
            jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"Boolean\""  )  ) ;

          } else {
            jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"ADD_VType_Here\""  )  ) ;
          }

        } else {
          jsonZ.push(  buildMLineDiv( indent1 , "\"vType\": " + "\"ADD_VType_Here\""  )  ) ;

        }

        jsonZ.push(  buildMLineDiv(0 , "}" + ","  )  ) ;

        if (thisField.Title) { jsonZ.push(  buildMLineDiv(0 , "\"title\": \"" + thisField.Title + "\","  )  ) ; }
        if (thisField.StaticName) { jsonZ.push(  buildMLineDiv(0 , "\"name\": \"" + thisField.StaticName + "\","  )  ) ; }

        //if (thisField.Choices ) { jsonZ.push(  buildMLineDiv( 0 , "\"choices\": [\"" + thisField.Choices.join('\",\"\") + "\"],"  )  ) ; }

        //https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.fieldtype.aspx
        //I think we could use either of these to set the Field Type
        
        jsonZ.push(  buildMLineDiv(0 , "\"onCreateProps\": {" + ""  )  ) ;
        if (thisField.Description) { jsonZ.push(  buildMLineDiv( indent1 , "\"Description\": \"" + thisField.Description + "\","  )  ) ; }
        if (thisField.EnforceUniqueValues) { jsonZ.push(  buildMLineDiv( indent1 , "\"EnforceUniqueValues\": " + thisField.EnforceUniqueValues + ","  )  ) ; }
        if (thisField.Group) { jsonZ.push(  buildMLineDiv( indent1 , "\"Group\": \"" + thisField.Group + "\","  )  ) ; }
        if (thisField.Required == true ) { jsonZ.push(  buildMLineDiv( indent1 , "\"Required\": " + thisField.Required + ","  )  ) ; }
        if (thisField.Indexed == true ) { jsonZ.push(  buildMLineDiv( indent1 , "\"Indexed\":" + thisField.Indexed + ","  )  ) ; }
        if (thisField.Hidden == true ) { jsonZ.push(  buildMLineDiv( indent1 , "\"Hidden\": " + thisField.Hidden + ","  )  ) ; }
        if (thisField.ValidationFormula) { jsonZ.push(  buildMLineDiv( indent1 , "\"ValidationFormula\": \"" + thisField.ValidationFormula + "\","  )  ) ; }
        if (thisField.ValidationMessage) { jsonZ.push(  buildMLineDiv( indent1 , "\"ValidationMessage\": \"" + thisField.ValidationMessage + "\","  )  ) ; }
        jsonZ.push(  buildMLineDiv( indent1 , "\"IgnoreMe\": \"ToRemoveExtraComma\""  )  ) ;
        jsonZ.push(  buildMLineDiv(0 , "}" + ","  )  ) ;

        if ( thisField.SchemaXml.indexOf('ShowInNewForm="FALSE"') > -1  ) { jsonZ.push(  buildMLineDiv(0 , "\"showNew\": false,"  )  ) ; }
        if ( thisField.SchemaXml.indexOf('ShowInEditForm="FALSE"') > -1  ) { jsonZ.push(  buildMLineDiv(0 , "\"showEdit\": false,"  )  ) ; }
        if ( thisField.SchemaXml.indexOf('ShowInDisplayForm="FALSE"') > -1  ) { jsonZ.push(  buildMLineDiv(0 , "\"showDisplay\": false,"  )  ) ; }

        if (thisField.DefaultValue) { 

          if ( ['SP.FieldText','SP.FieldChoice'].indexOf(thisField['odata.type']) > -1  ) {
            jsonZ.push(  buildMLineDiv(0 , "\"DefaultValue\": \"" + thisField.DefaultValue + "\","  )  ) ; 
          }

        }
        if (thisField.OutputType) { jsonZ.push(  buildMLineDiv(0 , "\"outputType\": \"" + thisField.OutputType + "\","  )  ) ; }
        if (thisField.DateFormat) { jsonZ.push(  buildMLineDiv(0 , "\"dateFormat\": \"" + thisField.DateFormat + "\","  )  ) ; }
        if (thisField.MinimumValue) { jsonZ.push(  buildMLineDiv(0 , "\"minValue\": " + thisField.MinimumValue + ","  )  ) ; }
        if (thisField.MaximumValue) { jsonZ.push(  buildMLineDiv(0 , "\"maxValue\": " + thisField.MaximumValue + ","  )  ) ; }
        if (thisField.Choices) { jsonZ.push(  buildMLineDiv(0 , "\"choices\": " + fieldChoicesJ + ","  )  ) ; }
        if (thisField.Formula) { jsonZ.push(  buildMLineDiv(0 , "\"formula\": \"" + thisField.Formula + "\","  )  ) ; }

        if (thisField.SelectionMode) { jsonZ.push(  buildMLineDiv(0 , "\"selectionMode\": " + thisField.SelectionMode + ","  )  ) ; }
        if (thisField.SelectionGroup) { jsonZ.push(  buildMLineDiv(0 , "\"selectionGroup\": " + thisField.SelectionGroup + ","  )  ) ; }
        if (thisField.DisplayFormat) { jsonZ.push(  buildMLineDiv(0 , "\"displayFormat\": " + thisField.DisplayFormat + ","  )  ) ; }
        if (thisField.FriendlyDisplayFormat) { jsonZ.push(  buildMLineDiv(0 , "\"friendlyDisplayFormat\": " + thisField.FriendlyDisplayFormat + ","  )  ) ; }
        if (thisField.DateTimeCalendarType) { jsonZ.push(  buildMLineDiv(0 , "\"calendarType\": " + thisField.DateTimeCalendarType + ","  )  ) ; }
        if (thisField.EnforceUniqueValues) { jsonZ.push(  buildMLineDiv(0 , "\"EnforceUniqueValues\": " + thisField.EnforceUniqueValues + ","  )  ) ; }

        if ( thisField.FieldTypeKind == 3 ) { //This is rich text
          jsonZ.push(  buildMLineDiv(0 , "\"richText\": true,"  )  ) ;
          jsonZ.push(  buildMLineDiv(0 , "\"numberOfLines\": " + thisField.NumberOfLines + ","  )  ) ;
          jsonZ.push(  buildMLineDiv(0 , "\"allowHyperlink\": " + thisField.AllowHyperlink + ","  )  ) ;
          jsonZ.push(  buildMLineDiv(0 , "\"appendOnly\": " + thisField.AppendOnly + ","  )  ) ;
          jsonZ.push(  buildMLineDiv(0 , "\"restrictedMode\": " + thisField.RestrictedMode + ","  )  ) ;
          
        }

        if (thisField.AddToDefaultContentType) { jsonZ.push(  buildMLineDiv(0 , "\"addToDefaultContentType\": " + thisField.AddToDefaultContentType + ","  )  ) ; }

        jsonZ.push(  buildMLineDiv( indent1 , "\"IgnoreMe\": \"ToRemoveExtraComma\""  )  ) ;

        jsonZ.push(  buildMLineDiv(0 , "}" )  );
        
        return jsonZ;

    }

    private getFieldSpecialValue ( Fld : IContentsFieldInfo ) {

      var specialColumn : string | JSX.Element = "";

      let fieldOutputType = '';
      let FriendlyDisplayFormat = '';
      let DisplayFormat = '';
      let DateTimeCalendarType = '';
      let SelectionGroup = null;
      let SelectionMode = '';

      switch ( Fld.TypeAsString ) {
        case "Calculated":
          if ( Fld.OutputType === 2) {
            fieldOutputType = "Single line text";
          }
          if ( Fld.OutputType === 9) {
            fieldOutputType = "Number";
          }
          if ( Fld.OutputType === 10) {
            fieldOutputType = "Currency";
          }
          if ( Fld.OutputType === 8) {
            fieldOutputType = "Yes/No";
          }
          if ( Fld.OutputType === 4) {
            fieldOutputType = "Date/Time";
          }

          specialColumn = <p><span style={{color:'green'}}> {Fld.Formula} </span><i><strong><span style={{color:"red", paddingLeft: 5}}> ( { fieldOutputType } ) </span></strong></i></p>;
          //specialColumn = specialColumn.split(")&IF(").join(")</br>&IF(");


          if (this.props.specialAlt === true ) {
           //Someday, we could use this function to find closing brackets for things like And and Or
            //https://codereview.stackexchange.com/questions/179471/find-the-corresponding-closing-parenthesis

            if (Fld.Formula.indexOf("=\"<a") == 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) </span><span style={{color:"blue"}}>Link</span></strong></i>
              <span style={{color:"green"}}> { Fld.Formula.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')} </span></p></div>;
  //                specialColumn = specialColumn.split(")&IF(").join(")</br>&IF(")
            } else if (Fld.Formula.indexOf(")&IF(") > 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) IF</span></strong></i>
                <span style={{color:"green"}}> { Fld.Formula.split(")&IF(").join(")</br>&IF(").split("</br>").map( r => { return <div>{ r }</div>; } ) } </span></p></div>;
  //                specialColumn = specialColumn.split(")&IF(").join(")</br>&IF(")

            } else if (Fld.Formula.indexOf(")+IF(") > 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) +IF</span></strong></i>
                <span style={{color:"green"}}> { Fld.Formula.split(")+IF(").join(")</br>+IF(").split("</br>").map( r => { return <div>{ r }</div>; } )} </span></p></div>;
  //                specialColumn = specialColumn.split(")+IF(").join(")</br>+IF(")

            } else if (Fld.Formula.indexOf(",IF(") > 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) ,IF</span></strong></i>
                <span style={{color:"green"}}> { Fld.Formula.split(",IF(").join("</br>,IF(").split("</br>").map( r => { return <div>{ r }</div>; } )} </span></p></div>;
  //                specialColumn = Fld.Formula.split(",IF(").join("</br>,IF(")

            } else if (Fld.Formula.indexOf(",") > 0 ) {
              specialColumn = <div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( {fieldOutputType } ) various</span></strong></i></p></div>;

                let newFormula = Fld.Formula;
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

            } else if (Fld.Formula.indexOf(",,,,,,") > 0 ) {
              specialColumn = <div><div><p><i><strong><span style={{color:"red", paddingLeft: 5}}>( { fieldOutputType } ) ,</span></strong></i></p></div>
                  <div><span style={{color:"green"}}> { Fld.Formula.split(",").join(")</br>,")}</span></div></div>;
  //                specialColumn = specialColumn.split(",").join(")</br>,")

            } else {
              specialColumn = specialColumn;

            }

          }


          break;

        case "MultiChoice":
          specialColumn = this.props.specialAlt === true ? <div> { Fld.Choices.map( c => <div>{ c } </div>) } </div> : <div> { Fld.Choices.join('; ') }</div>;
          break;

        case "Choice":
          specialColumn = this.props.specialAlt === true ? <div> { Fld.Choices.map( c => <div>{ c } </div>) } </div> : <div> { Fld.Choices.join('; ') }</div>;
          break;

        case "Integer":
        case "Number":
          if ( this.props.specialAlt !== true ) {
              specialColumn = <div> {Fld.MinimumValue } to { Fld.MaximumValue }  <i><strong><span style={{color:"red", paddingLeft: 5}}>( {Fld.TypeShortDescription } )</span></strong></i></div>;

          } else {
            specialColumn = <div><div><i><strong><span style={{color:"red", paddingLeft: 5}}>( { Fld.TypeShortDescription } )</span></strong></i></div>
            <div>Min: { Fld.MinimumValue }</div>
            <div>Max: { Fld.MaximumValue }</div></div>;

          }

          break;

        case "Integer":
          specialColumn = Fld.MinimumValue + " to " + Fld.MaximumValue + <i><strong><span style={{color:"red", paddingLeft: 5}}>( ' + Fld.TypeShortDescription + " )</span></strong></i>;
          break;

        case "Currency":
          specialColumn = Fld.MinimumValue + " to " + Fld.MaximumValue + <i><strong><span style={{color:"red", paddingLeft: 5}}>( ' + Fld.TypeShortDescription + " Currency id=" + Fld.CurrencyLocaleId + " )</span></strong></i>;
          break;

        case "URL":
          specialColumn = Fld.DisplayFormat === 1 ? 'Picture format' : 'HyperLink format';
          break;

        case "Lookup":
          let lookupSettings = [];
          if ( Fld.AllowMultipleValues === true ) { lookupSettings.push('Multi') ; }
          lookupSettings.push('LookupField: ' + Fld.LookupField) ;
          lookupSettings.push('LookupList: ' + Fld.LookupList) ;
          lookupSettings.push('Relationship: ' + Fld.RelationshipDeleteBehavior) ;

          if ( this.props.specialAlt === true ) {
            specialColumn = lookupSettings.length > 0 ? <div> { lookupSettings.map( L => { return <div>{ L } </div> ; }) } </div> : null;

          } else { 
            specialColumn = lookupSettings.length > 0 ? lookupSettings.join(', ')  : null;

          }



          break;

        case "Text":
          specialColumn = Fld.TypeShortDescription;
          if ( Fld.MaxLength < 255 ) { specialColumn += ' ; MaxLength =' + Fld.MaxLength ; }
          break;

        case "Note":
          specialColumn = [ 'Multi Line Text ( ' + Fld.NumberOfLines + ' ) ', ' RichText = ' + Fld.RichText].join(', ');
          break;

        case "DateTime":
        case "Date":
          FriendlyDisplayFormat = (Fld.FriendlyDisplayFormat === 1) ? "Friendly" : "";
          DisplayFormat = (Fld.DisplayFormat === 0) ? "Date Only" : "Date & Time";
          DateTimeCalendarType = "CalendarType = " + Fld.DateTimeCalendarType;
          specialColumn = <div> { Fld.TypeShortDescription }  <i><strong><span style={{color:"red", paddingLeft: 5}}>( { [DisplayFormat, FriendlyDisplayFormat, DateTimeCalendarType].join(', ') } ) </span></strong></i></div>;
          break;

        case "User":
        case "MultiUser":
        case "UserMulti":
          SelectionMode = (Fld.SelectionMode === 0) ? "People only" : "Users & Groups";
          specialColumn = SelectionMode + ",";
          SelectionGroup = (Fld.SelectionGroup === 0) ? "Everyone" : Fld.SelectionGroup;
          specialColumn += " from group ( " + SelectionGroup + " )";

          break;

        default:
          if (Fld.Hidden === true) {
            specialColumn = "";
            specialColumn = "";
          }
          break;

      }

      return specialColumn;

    } // End getSpecialColumn
}
