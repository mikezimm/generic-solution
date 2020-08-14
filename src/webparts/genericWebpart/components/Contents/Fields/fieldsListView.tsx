
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '../../IReUsableInterfaces';
import { IContentsListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes';

import { IContentsFieldInfo, IFieldBucketInfo} from './fieldsComponent';

import { createIconButton } from '../../createButtons/IconButton';

import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
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
        let columnsToVisible = ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.showCell : styles.hideMe;
        let styleDesc = this.props.showDesc && ['Visible','9','Hidden',''].indexOf( this.props.searchMeta ) > -1 ? styles.showCell : styles.hideMe;
        let styleXML = this.props.showXML ? styles.showCell : styles.hideMe;
        let styleJSON = this.props.showJSON ? styles.showCell : styles.hideMe;
        let styleSPFx = this.props.showSPFx ? styles.showCell : styles.hideMe;
        if ( this.props.showXML || this.props.showJSON || this.props.showSPFx ) { columnsToVisible = styles.hideMe ; }

        let itemRows = logItems.length === 0 ? null : logItems.map( F => { 

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
          
          let fieldInfo = '|Splitme|' + F.Id + '|Splitme|' + F.StaticName  + '|Splitme|' + F.Title;

          let gotoColumns = null; //createIconButton('Pause', 'Columns', this.props.pickThisField, 'Columns' + fieldInfo , columnsStyles );


          let itemIcon = null;

          let iconStyles: any = { root: {
            //color: h.color ? h.color : "blue",
          }};

          let normalIcon = <Icon iconName={ "Info"} className={ iconClassInfo } styles = { iconStyles }/>;
          let keys = F.meta ? <div><h3>Properties</h3><ul> { F.meta.map(k => <li>{ k }</li>) } </ul></div> : null;

          const onRenderHoverCard = (item: any): JSX.Element => {
            let hoverFieldStyle = { fontWeight: 700};
            return <div className={styles.hoverCard} style={{padding: 30, maxWidth: 800 }}>
              <div>
                { /* Basic information */ }
                <p><span style={hoverFieldStyle}>Title:</span> { F.Title }</p>
                <p><span style={hoverFieldStyle}>TypeAsString:</span> { F.TypeAsString }</p>
                <p style={{ display: F.TypeAsString !== F.TypeDisplayName ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>TypeDisplayName:</span> { F.TypeDisplayName }</p>

                <p><span style={hoverFieldStyle}>Description:</span> { F.Description }</p>
                <p><span style={hoverFieldStyle}>EntityName:</span> { F.StaticName }</p>
                <p><span style={hoverFieldStyle}>Group:</span> { F.Group }</p>
                <p><span style={hoverFieldStyle}>Id:</span> { F.Id }</p>

                <p><span style={hoverFieldStyle}>Meta:</span> { F.meta.join('; ') }</p>

                { /* Types information */ }
                <p><span style={hoverFieldStyle}>odata.type:</span> { F['odata.type'] }</p>
                <p><span style={hoverFieldStyle}>odata.FieldTypeKind:</span> { F.FieldTypeKind }</p>
                
                { /* Exceptions information */ }
                <p style={{ display: F.FillInChoice === true ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>FillInChoice:</span> { F.FillInChoice === true ? 'true' : 'false' }</p>

                <p style={{ display: F.Hidden === true ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>Hidden:</span> { F.Hidden === true ? 'true' : 'false' }</p>

                <p style={{ display: F.Indexed === true ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>Indexed:</span> { F.Indexed === true ? 'true' : 'false' }</p>

                <p style={{ display: F.Required === true ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>Required:</span> { F.Required === true ? 'true' : 'false' }</p>

                <p style={{ display: F.Sealed === true ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>Sealed:</span> { F.Sealed === true ? 'true' : 'false' }</p>

                <p style={{ display: F.ShowInFiltersPane ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>ShowInFiltersPane:</span> { F.ShowInFiltersPane }</p>

                <p style={{ display: F.EnforceUniqueValues === true ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>EnforceUniqueValues:</span> { F.EnforceUniqueValues === true ? 'true' : 'false'  }</p>

                <p style={{ display: F.ValidationFormula != null ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>ValidationFormula:</span> { F.ValidationFormula != null ? F.ValidationFormula : '' }</p>

                <p style={{ display: F.ValidationMessage != null ? '' : 'none' }}>
                    <span style={hoverFieldStyle}>ValidationMessage:</span> { F.ValidationMessage != null ? F.ValidationMessage : ''  }</p>

                <p><br></br></p>
                <p><span style={hoverFieldStyle}>Search String:</span> { F.searchString }</p>
              </div>
            </div>;
          };

          let detailsCard = <div>
            <HoverCard
              cardDismissDelay={300}
              type={HoverCardType.plain}
              plainCardProps={{
                onRenderPlainCard: onRenderHoverCard,
                renderData: 'testRenderData'
              }}>
              { normalIcon }
            </HoverCard>
            </div>;

//.logFieldView {
//.fieldButtons {
//.buttons{


            let fieldSettingsURL = !this.props.showSettings ? F.StaticName : createLink(this.props.webURL + "/_layouts/15/listedit.aspx?Field=(" + F.Id + ")", '_blank', F.StaticName);

            let other = <div style={{ display: 'inline-flex', backgroundColor: 'white', padding: 0 }}> { gotoColumns }  </div>;

            let dev = '';
            if (F.Indexed === true) { dev += "Idx " ; }
            if (F.CanBeDeleted !== true) { dev += "!Del" ; }
            if (F.EnforceUniqueValues === true) { dev += "UQ" ; }
            if (F.ReadOnlyField === true) { dev += "RO" ; }
            if (F.Sealed === true) { dev += "S" ; }

            let metaClass = F.meta.indexOf( this.props.searchMeta ) > -1 ? styles.showMe : styles.hideMe;

            //columnsToVisible
            return <tr>
                <td className={ styles.nowWrapping }> { F.Title } </td>
                <td className={ styles.nowWrapping }> { fieldSettingsURL }</td>
                <td className={ styleDesc }> { F.Description.length > this.state.maxChars ? F.Description.slice(0,this.state.maxChars) + '...' : F.Description } </td>
                <td className={ columnsToVisible }> { F.TypeAsString } </td>
                <td className={ columnsToVisible }> { F.Group } </td>
                <td> { F.DefaultValue ? F.DefaultValue : '-' } </td>

                <td className={ styleXML }> { this.props.showXML ? this.getFieldXML(F.SchemaXml) : null } </td>
                <td className={ styleSPFx }> { this.props.showSPFx ? this.getFieldSPFx(F) : null } </td>
                <td className={ styleJSON }> { this.props.showJSON ? this.getFieldJSON(F) : null } </td>

                <td className={ [styles.nowWrapping, columnsToVisible].join(', ') }> { dev } </td>

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
                <th className={ columnsToVisible }>Type</th>
                <th className={ columnsToVisible }>Group</th>
                <th>Default</th>

                <th className={ styleXML }> { 'SchemaXml' } </th>
                <th className={ styleSPFx }> { 'SPFx' } </th>
                <th className={ styleJSON }> { 'JSON' } </th>

                <th className={ [styles.nowWrapping, columnsToVisible].join(', ') }>Dev</th>
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


    private buildMLineDiv ( indent: number, element: string | JSX.Element ) {
        let spaces4 = indent > 0 ? '\u00a0' + '\u00a0' + '\u00a0' + '\u00a0' : null;
        let spaces = '';

        if ( indent >= 1 ) { spaces += spaces4; }
        if ( indent >= 2 ) { spaces += spaces4; }
        if ( indent >= 3 ) { spaces += spaces4; }
        if ( indent >= 4 ) { spaces += spaces4; }
        if ( indent >= 5 ) { spaces += spaces4; }

        let newDiv = <div> 
            { spaces }
            { element }
        </div>;
        return newDiv;

    }

    private getFieldJSON ( thisField ) {
        var jsonX : JSX.Element[] = [];
        jsonX.push(  this.buildMLineDiv(0 , "{" )  );

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


//        jsonX.push(  "'" +  + "': '" + "',"  )  ) ;

        //Can be used to stop code at certain fields
        if (thisField.Title === 'DisplayName1') { 
          thisField.Title=thisField.Title;
          thisField.Title=thisField.Title;

        }


        if (thisField.Title) { jsonX.push(  this.buildMLineDiv(0 , "'Title': '" + thisField.Title + "',")  ); }
        if (thisField.StaticName) { jsonX.push(  this.buildMLineDiv(0 , "'StaticName': '" + thisField.StaticName + "',")  ) ; }
        if (thisField.Required) { jsonX.push(  this.buildMLineDiv(0 , "'Required': " + thisField.Required + "',")  ) ; }
        if (thisField.Indexed) { jsonX.push(  this.buildMLineDiv(0 , "'Indexed':" + thisField.Indexed + "',")  ) ; }

        //https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.fieldtype.aspx
        //I think we could use either of these to set the Field Type
        //if (thisField.TypeAsString) { jsonX.push(  "'TypeAsString': '" + thisField.TypeAsString + "',")  ) ; }
        if (thisField.FieldTypeKind) { jsonX.push(  this.buildMLineDiv(0 , "'FieldTypeKind': " + thisField.FieldTypeKind + "',")  ) ; }
        
        if (thisField.Description) { jsonX.push(  this.buildMLineDiv(0 , "'Description': '" + thisField.Description + "',")  ) ; }
        if (thisField.DefaultValue) { jsonX.push(  this.buildMLineDiv(0 , "'DefaultValue': " + thisField.DefaultValue + "',")  ) ; }
        if (thisField.OutputType) { jsonX.push(  this.buildMLineDiv(0 , "'OutputType': " + thisField.OutputType + "',")  ) ; }
        if (thisField.DateFormat) { jsonX.push(  this.buildMLineDiv(0 , "'DateFormat': '" + thisField.DateFormat + "',")  ) ; }
        if (thisField.Hidden) { jsonX.push(  this.buildMLineDiv(0 , "'Hidden': " + thisField.Hidden + "',")  ) ; }
        if (thisField.MinimumValue) { jsonX.push(  this.buildMLineDiv(0 , "'MinimumValue': " + thisField.MinimumValue + "',")  ) ; }
        if (thisField.MaximumValue) { jsonX.push(  this.buildMLineDiv(0 , "'MaximumValue': " + thisField.MaximumValue + "',")  ) ; }
        if (thisField.Choices) { jsonX.push(  this.buildMLineDiv(0 , "'Choices': " + fieldChoicesJ + "',")  ) ; }
        if (thisField.Formula) { jsonX.push(  this.buildMLineDiv(0 , "'Formula': '" + thisField.Formula + "',")  ) ; }
        if (thisField.EnforceUniqueValues) { jsonX.push(  this.buildMLineDiv(0 , "'EnforceUniqueValues': " + thisField.EnforceUniqueValues + "',")  ) ; }

        if (thisField.SelectionMode) { jsonX.push(  this.buildMLineDiv(0 , "'SelectionMode': " + thisField.SelectionMode + "',")  ) ; }
        if (thisField.DisplayFormat) { jsonX.push(  this.buildMLineDiv(0 , "'DisplayFormat': '" + thisField.DisplayFormat + "',")  ) ; }
        if (thisField.FriendlyDisplayFormat) { jsonX.push(  this.buildMLineDiv(0 , "'FriendlyDisplayFormat': " + thisField.FriendlyDisplayFormat + "',")  ) ; }
        if (thisField.DateTimeCalendarType) { jsonX.push(  this.buildMLineDiv(0 , "'DateTimeCalendarType': " + thisField.DateTimeCalendarType + "',")  ) ; }
        if (thisField.EnforceUniqueValues) { jsonX.push(  this.buildMLineDiv(0 , "'EnforceUniqueValues': " + thisField.EnforceUniqueValues + "',")  ) ; }

        if (thisField.RichText) { jsonX.push(  this.buildMLineDiv(0 , "'RichText': " + thisField.RichText + "',")  ) ; }
        if (thisField.NumberOfLines) { jsonX.push(  this.buildMLineDiv(0 , "'NumberOfLines': " + thisField.NumberOfLines + "',")  ) ; }
        if (thisField.AddToDefaultContentType) { jsonX.push(  this.buildMLineDiv(0 , "'AddToDefaultContentType': " + thisField.AddToDefaultContentType + "',")  ) ; }
       
        jsonX.push(  this.buildMLineDiv(0, "}" ) ) ;
        
        return jsonX;

    }

    private getFieldXML ( thisField ) {

      console.log( 'getFieldXML thisField:', thisField );

      let sample = thisField ;
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
          xmlArray.push( this.buildMLineDiv(0,tag) );
          xmlArray.push( this.buildMLineDiv(2,prop) );

        } else {
          xmlArray.push( this.buildMLineDiv(2, sample.slice(0, loc + 1 ) ) );

        }

        sample = sample.slice( loc + 2 );

      } while ( sample.search(regex) > 0 );

      xmlArray.push( this.buildMLineDiv(2, sample ) );

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

    private getFieldSPFx ( thisField ) {

        var indent1 = 1;

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

        var jsonZ : JSX.Element[] = [];

        jsonZ.push(  this.buildMLineDiv(0 , "{"  )  ) ;

//        jsonX.push(  "'" +  + "': '" + "',"  )  ) ;

        //Can be used to stop code at certain fields
        if (thisField.Title === 'DisplayName1') { 
          thisField.Title=thisField.Title;
          thisField.Title=thisField.Title;

        }

        jsonZ.push(  this.buildMLineDiv(0 , "fieldType: {" + ""  )  ) ;
        jsonZ.push(  this.buildMLineDiv( indent1 , "kind: " + thisField.FieldTypeKind + ","  )  ) ;
        jsonZ.push(  this.buildMLineDiv( indent1 , "type:  '" + thisField['odata.type'] +"',"  )  ) ;
        jsonZ.push(  this.buildMLineDiv( indent1 , "vType: " + "'ADD_VType_Here',"  )  ) ;
        jsonZ.push(  this.buildMLineDiv(0 , "}" + ","  )  ) ;

        if (thisField.Title) { jsonZ.push(  this.buildMLineDiv(0 , "title: '" + thisField.Title + "',"  )  ) ; }
        if (thisField.StaticName) { jsonZ.push(  this.buildMLineDiv(0 , "name: '" + thisField.StaticName + "',"  )  ) ; }

        //https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.fieldtype.aspx
        //I think we could use either of these to set the Field Type
        
        jsonZ.push(  this.buildMLineDiv(0 , "onCreateProps: {" + ""  )  ) ;  
        if (thisField.Description) { jsonZ.push(  this.buildMLineDiv( indent1 , "Description: '" + thisField.Description + "',"  )  ) ; }
        if (thisField.EnforceUniqueValues) { jsonZ.push(  this.buildMLineDiv( indent1 , "EnforceUniqueValues: " + thisField.EnforceUniqueValues + ","  )  ) ; }
        if (thisField.Group) { jsonZ.push(  this.buildMLineDiv( indent1 , "Group: '" + thisField.Group + "',"  )  ) ; }
        if (thisField.Required == true ) { jsonZ.push(  this.buildMLineDiv( indent1 , "Required: " + thisField.Required + ","  )  ) ; }
        if (thisField.Indexed == true ) { jsonZ.push(  this.buildMLineDiv( indent1 , "Indexed:" + thisField.Indexed + ","  )  ) ; }
        if (thisField.Hidden == true ) { jsonZ.push(  this.buildMLineDiv( indent1 , "Hidden: " + thisField.Hidden + ","  )  ) ; }
        if (thisField.ValidationFormula) { jsonZ.push(  this.buildMLineDiv( indent1 , "ValidationFormula: '" + thisField.ValidationFormula + "',"  )  ) ; }
        if (thisField.ValidationMessage) { jsonZ.push(  this.buildMLineDiv( indent1 , "ValidationMessage: '" + thisField.ValidationMessage + "',"  )  ) ; }
        jsonZ.push(  this.buildMLineDiv(0 , "}" + ","  )  ) ;

        if ( thisField.SchemaXml.indexOf('ShowInNewForm="FALSE"') > -1  ) { jsonZ.push(  this.buildMLineDiv(0 , "showNew: false,"  )  ) ; }
        if ( thisField.SchemaXml.indexOf('ShowInEditForm="FALSE"') > -1  ) { jsonZ.push(  this.buildMLineDiv(0 , "showEdit: false,"  )  ) ; }
        if ( thisField.SchemaXml.indexOf('ShowInDisplayForm="FALSE"') > -1  ) { jsonZ.push(  this.buildMLineDiv(0 , "showDisplay: false,"  )  ) ; }

        if (thisField.DefaultValue) { jsonZ.push(  this.buildMLineDiv(0 , "DefaultValue: " + thisField.DefaultValue + ","  )  ) ; }
        if (thisField.OutputType) { jsonZ.push(  this.buildMLineDiv(0 , "outputType: '" + thisField.OutputType + "',"  )  ) ; }
        if (thisField.DateFormat) { jsonZ.push(  this.buildMLineDiv(0 , "dateFormat: '" + thisField.DateFormat + "',"  )  ) ; }
        if (thisField.MinimumValue) { jsonZ.push(  this.buildMLineDiv(0 , "minValue: " + thisField.MinimumValue + ","  )  ) ; }
        if (thisField.MaximumValue) { jsonZ.push(  this.buildMLineDiv(0 , "maxValue: " + thisField.MaximumValue + ","  )  ) ; }
        if (thisField.Choices) { jsonZ.push(  this.buildMLineDiv(0 , "choices: '" + fieldChoicesJ + "',"  )  ) ; }
        if (thisField.Formula) { jsonZ.push(  this.buildMLineDiv(0 , "formula: '" + thisField.Formula + "',"  )  ) ; }

        if (thisField.SelectionMode) { jsonZ.push(  this.buildMLineDiv(0 , "selectionMode: " + thisField.SelectionMode + ","  )  ) ; }
        if (thisField.SelectionGroup) { jsonZ.push(  this.buildMLineDiv(0 , "selectionGroup: " + thisField.SelectionGroup + ","  )  ) ; }
        if (thisField.DisplayFormat) { jsonZ.push(  this.buildMLineDiv(0 , "displayFormat: '" + thisField.DisplayFormat + "',"  )  ) ; }
        if (thisField.FriendlyDisplayFormat) { jsonZ.push(  this.buildMLineDiv(0 , "friendlyDisplayFormat: " + thisField.FriendlyDisplayFormat + ","  )  ) ; }
        if (thisField.DateTimeCalendarType) { jsonZ.push(  this.buildMLineDiv(0 , "calendarType: " + thisField.DateTimeCalendarType + ","  )  ) ; }
        if (thisField.EnforceUniqueValues) { jsonZ.push(  this.buildMLineDiv(0 , "EnforceUniqueValues: " + thisField.EnforceUniqueValues + ","  )  ) ; }

        if ( thisField.FieldTypeKind == 3 ) { //This is rich text
          jsonZ.push(  this.buildMLineDiv(0 , "richText: true,"  )  ) ;
          jsonZ.push(  this.buildMLineDiv(0 , "numberOfLines: " + thisField.NumberOfLines + ","  )  ) ;
          jsonZ.push(  this.buildMLineDiv(0 , "allowHyperlink: " + thisField.AllowHyperlink + ","  )  ) ;
          jsonZ.push(  this.buildMLineDiv(0 , "appendOnly: " + thisField.AppendOnly + ","  )  ) ;
          jsonZ.push(  this.buildMLineDiv(0 , "restrictedMode: " + thisField.RestrictedMode + ","  )  ) ;
          
        }
        if (thisField.AddToDefaultContentType) { jsonZ.push(  this.buildMLineDiv(0 , "addToDefaultContentType: " + thisField.AddToDefaultContentType + ","  )  ) ; }

        jsonZ.push(  this.buildMLineDiv(0 , "}" )  );
        
        return jsonZ;
    }


}
