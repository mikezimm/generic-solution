
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IMyProgress } from '../../IReUsableInterfaces';
import { IContentsListInfo, IMyListInfo, IServiceLog } from '../../../../../services/listServices/listTypes';

import { IContentsWebInfo, IWebBucketInfo} from './websComponent';

import { createIconButton } from '../../createButtons/IconButton';

import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

import { createLink } from '../../HelpInfo/AllLinks';


import styles from '../listView.module.scss';
import stylesInfo from '../../HelpInfo/InfoPane.module.scss';

export interface IMyLogWebProps {
    //title: string;
    titles: [];
    searchMeta: string;
    webURL: string;
    listGuid: string;
    items: IWebBucketInfo;
    showSettings: boolean;
    railsOff: boolean;  //Should only be used by people who know what they are doing.  Can cause destructive functions very quickly
    descending: boolean;
    maxChars?: number;

    showDesc?: boolean;
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    showXML: boolean;
    showJSON: boolean;
    showSPFx: boolean;

    showMinWebs: boolean;
    specialAlt: boolean;


}

export interface IMyLogWebState {
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


export default class MyLogWeb extends React.Component<IMyLogWebProps, IMyLogWebState> {


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

    constructor(props: IMyLogWebProps) {
        super(props);
        this.state = {
          maxChars: this.props.maxChars ? this.props.maxChars : 50,
        };
    }
        
    public componentDidMount() {
        //this._getWebItems();

        
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

    public componentDidUpdate(prevProps: IMyLogWebProps): void {
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


    public render(): React.ReactElement<IMyLogWebProps> {

      let thisLog = null;

      if ( this.props.items.webs != null && this.props.items.count > 0 ) { 

        let logItems : IContentsWebInfo[] = this.props.items.webs;

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

        let itemRows = logItems.length === 0 ? null : logItems.map( W => { 

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
          
          let webInfo = '|Splitme|' + W.Id + '|Splitme|' + W.Title  + '|Splitme|' + W.Title;

          let gotoColumns = null; //createIconButton('Pause', 'Columns', this.props.pickThisWeb, 'Columns' + webInfo , columnsStyles );


          let itemIcon = null;

          let iconStyles: any = { root: {
            //color: h.color ? h.color : "blue",
          }};

          let normalIcon = <Icon iconName={ "Info"} className={ iconClassInfo } styles = { iconStyles }/>;
          let keys = W.meta ? <div><h3>Properties</h3><ul> { W.meta.map(k => <li>{ k }</li>) } </ul></div> : null;

          const onRenderHoverCard = (item: any): JSX.Element => {
            let hoverWebStyle = { fontWeight: 700};
            return <div className={styles.hoverCard} style={{padding: 30, maxWidth: 800 }}>
              <div>
                { /* Basic information */ }
                <p><span style={hoverWebStyle}>Title:</span> { W.Title }</p>
                <p><span style={hoverWebStyle}>TypeAsString:</span> { W.TypeAsString }</p>
                <p style={{ display: W.TypeAsString !== W.TypeDisplayName ? '' : 'none' }}>
                    <span style={hoverWebStyle}>TypeDisplayName:</span> { W.TypeDisplayName }</p>

                <p><span style={hoverWebStyle}>Description:</span> { W.Description }</p>
                <p><span style={hoverWebStyle}>EntityName:</span> { W.StaticName }</p>
                <p><span style={hoverWebStyle}>Group:</span> { W.Group }</p>
                <p><span style={hoverWebStyle}>Id:</span> { W.Id }</p>

                <p><span style={hoverWebStyle}>Meta:</span> { W.meta.join('; ') }</p>

                { /* Types information */ }
                <p><span style={hoverWebStyle}>odata.type:</span> { F['odata.type'] }</p>
                <p><span style={hoverWebStyle}>odata.WebTypeKind:</span> { W.WebTypeKind }</p>
                
                { /* Exceptions information */ }
                <p style={{ display: W.FillInChoice === true ? '' : 'none' }}>
                    <span style={hoverWebStyle}>FillInChoice:</span> { W.FillInChoice === true ? 'true' : 'false' }</p>

                <p><br></br></p>
                <p><span style={hoverWebStyle}>Search String:</span> { W.searchString }</p>
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


            let webSettingsURL = !this.props.showSettings ? W.StaticName : createLink(this.props.webURL + "/_layouts/15/FldEdit.aspx?List={" + this.props.listGuid + "}&Web=" + W.StaticName, '_blank', W.StaticName);

            let other = <div style={{ display: 'inline-flex', backgroundColor: 'white', padding: 0 }}> { gotoColumns }  </div>;

            let dev = '';

            let metaClass = W.meta.indexOf( this.props.searchMeta ) > -1 ? styles.showMe : styles.hideMe;

            //columnsToVisible
            return <tr>
                <td className={ styles.nowWrapping }> { W.Title } </td>
                <td className={ styles.nowWrapping }> { webSettingsURL }</td>
                <td className={ styleDesc }> { W.Description.length > this.state.maxChars ? W.Description.slice(0,this.state.maxChars) + '...' : W.Description } </td>
                <td> { W.TypeAsString } </td>

                <td className={ columnsToVisible }> { W.Group } </td>
                <td className={ columnsToVisible }> { W.DefaultValue ? W.DefaultValue : '-' } </td>

                <td className={ styleXML }> { this.props.showXML ? this.getWebXML(W.SchemaXml) : null } </td>
                <td className={ styleSPFx }> { this.props.showSPFx ? this.getWebSPFx(F) : null } </td>
                <td className={ styleJSON }> { this.props.showJSON ? this.getWebJSON(F) : null } </td>

                <td className={ [styles.nowWrapping, columnsToVisible].join(', ') }> { dev } </td>

                <td className={ styleSpecial }> { this.getWebSpecialValue( F ) } </td>
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

        let webTable = <table style={{ display: '', borderCollapse: 'collapse', width: '100%' }} className={stylesInfo.infoTable}>
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

        let webTitle = this.props.items.bucketLabel == '' ? null :
            <div className={ stylesInfo.infoHeading }><span style={{ paddingLeft: 20 }}>{ this.props.items.bucketLabel } - ( { this.props.items.count } )</span></div>;

        return (
          <div className={ styles.logListView }>
              <div style={{ paddingTop: 10}} className={ stylesInfo.infoPaneTight }>
                { webTitle }
                { webTable }
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

    private getWebXML ( thisWeb ) {

      console.log( 'getWebXML thisWeb:', thisWeb );

      let sample = thisWeb ;
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

      console.log( 'getWebXML:', sample, xmlArray);

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

    private getWebSPFx ( thisWeb  ) { // thisWeb is : IContentsWebInfo but not using because can't type the .results array

        var indent1 = 1;

        var webChoices2 = "";
        var webChoices3 = "";
        var webChoicesJ = "['";
        if ( thisWeb.TypeAsString === "Choice" || thisWeb.TypeAsString === "MultiChoice") {
          for (let member in thisWeb.Choices.results) {

            webChoices2 += thisWeb.results[member] + ";";
            webChoices3 += thisWeb.results[member] + "<br>";
            webChoicesJ += thisWeb.results[member] ;
            if ( member == ( thisWeb.results.length - 1).toString() ) { webChoicesJ += "']"; } else {webChoicesJ += "','"; }
          }
        } //Need to show all values
        webChoices3 = "<p>" + webChoices3 + "</p>";

        var jsonZ : JSX.Element[] = [];

        jsonZ.push(  this.buildMLineDiv(0 , "{"  )  ) ;

//        jsonX.push(  "'" +  + "': '" + "',"  )  ) ;

        //Can be used to stop code at certain webs
        if (thisWeb.Title === 'DisplayName1') { 
          thisWeb.Title=thisWeb.Title;
          thisWeb.Title=thisWeb.Title;

        }

        jsonZ.push(  this.buildMLineDiv(0 , "webType: {" + ""  )  ) ;
        jsonZ.push(  this.buildMLineDiv( indent1 , "kind: " + thisWeb.WebTypeKind + ","  )  ) ;
        jsonZ.push(  this.buildMLineDiv( indent1 , "type:  '" + thisWeb['odata.type'] +"',"  )  ) ;
        jsonZ.push(  this.buildMLineDiv( indent1 , "vType: " + "'ADD_VType_Here',"  )  ) ;
        jsonZ.push(  this.buildMLineDiv(0 , "}" + ","  )  ) ;

        if (thisWeb.Title) { jsonZ.push(  this.buildMLineDiv(0 , "title: '" + thisWeb.Title + "',"  )  ) ; }
        if (thisWeb.StaticName) { jsonZ.push(  this.buildMLineDiv(0 , "name: '" + thisWeb.StaticName + "',"  )  ) ; }

        //https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.webtype.aspx
        //I think we could use either of these to set the Web Type
        
        jsonZ.push(  this.buildMLineDiv(0 , "onCreateProps: {" + ""  )  ) ;  
        if (thisWeb.Description) { jsonZ.push(  this.buildMLineDiv( indent1 , "Description: '" + thisWeb.Description + "',"  )  ) ; }
        if (thisWeb.EnforceUniqueValues) { jsonZ.push(  this.buildMLineDiv( indent1 , "EnforceUniqueValues: " + thisWeb.EnforceUniqueValues + ","  )  ) ; }
        if (thisWeb.Group) { jsonZ.push(  this.buildMLineDiv( indent1 , "Group: '" + thisWeb.Group + "',"  )  ) ; }
        if (thisWeb.Required == true ) { jsonZ.push(  this.buildMLineDiv( indent1 , "Required: " + thisWeb.Required + ","  )  ) ; }
        if (thisWeb.Indexed == true ) { jsonZ.push(  this.buildMLineDiv( indent1 , "Indexed:" + thisWeb.Indexed + ","  )  ) ; }
        if (thisWeb.Hidden == true ) { jsonZ.push(  this.buildMLineDiv( indent1 , "Hidden: " + thisWeb.Hidden + ","  )  ) ; }
        if (thisWeb.ValidationFormula) { jsonZ.push(  this.buildMLineDiv( indent1 , "ValidationFormula: '" + thisWeb.ValidationFormula + "',"  )  ) ; }
        if (thisWeb.ValidationMessage) { jsonZ.push(  this.buildMLineDiv( indent1 , "ValidationMessage: '" + thisWeb.ValidationMessage + "',"  )  ) ; }
        jsonZ.push(  this.buildMLineDiv(0 , "}" + ","  )  ) ;

        if ( thisWeb.SchemaXml.indexOf('ShowInNewForm="FALSE"') > -1  ) { jsonZ.push(  this.buildMLineDiv(0 , "showNew: false,"  )  ) ; }
        if ( thisWeb.SchemaXml.indexOf('ShowInEditForm="FALSE"') > -1  ) { jsonZ.push(  this.buildMLineDiv(0 , "showEdit: false,"  )  ) ; }
        if ( thisWeb.SchemaXml.indexOf('ShowInDisplayForm="FALSE"') > -1  ) { jsonZ.push(  this.buildMLineDiv(0 , "showDisplay: false,"  )  ) ; }

        if (thisWeb.DefaultValue) { jsonZ.push(  this.buildMLineDiv(0 , "DefaultValue: " + thisWeb.DefaultValue + ","  )  ) ; }
        if (thisWeb.OutputType) { jsonZ.push(  this.buildMLineDiv(0 , "outputType: '" + thisWeb.OutputType + "',"  )  ) ; }
        if (thisWeb.DateFormat) { jsonZ.push(  this.buildMLineDiv(0 , "dateFormat: '" + thisWeb.DateFormat + "',"  )  ) ; }
        if (thisWeb.MinimumValue) { jsonZ.push(  this.buildMLineDiv(0 , "minValue: " + thisWeb.MinimumValue + ","  )  ) ; }
        if (thisWeb.MaximumValue) { jsonZ.push(  this.buildMLineDiv(0 , "maxValue: " + thisWeb.MaximumValue + ","  )  ) ; }
        if (thisWeb.Choices) { jsonZ.push(  this.buildMLineDiv(0 , "choices: '" + webChoicesJ + "',"  )  ) ; }
        if (thisWeb.Formula) { jsonZ.push(  this.buildMLineDiv(0 , "formula: '" + thisWeb.Formula + "',"  )  ) ; }

        if (thisWeb.SelectionMode) { jsonZ.push(  this.buildMLineDiv(0 , "selectionMode: " + thisWeb.SelectionMode + ","  )  ) ; }
        if (thisWeb.SelectionGroup) { jsonZ.push(  this.buildMLineDiv(0 , "selectionGroup: " + thisWeb.SelectionGroup + ","  )  ) ; }
        if (thisWeb.DisplayFormat) { jsonZ.push(  this.buildMLineDiv(0 , "displayFormat: '" + thisWeb.DisplayFormat + "',"  )  ) ; }
        if (thisWeb.FriendlyDisplayFormat) { jsonZ.push(  this.buildMLineDiv(0 , "friendlyDisplayFormat: " + thisWeb.FriendlyDisplayFormat + ","  )  ) ; }
        if (thisWeb.DateTimeCalendarType) { jsonZ.push(  this.buildMLineDiv(0 , "calendarType: " + thisWeb.DateTimeCalendarType + ","  )  ) ; }
        if (thisWeb.EnforceUniqueValues) { jsonZ.push(  this.buildMLineDiv(0 , "EnforceUniqueValues: " + thisWeb.EnforceUniqueValues + ","  )  ) ; }

        if ( thisWeb.WebTypeKind == 3 ) { //This is rich text
          jsonZ.push(  this.buildMLineDiv(0 , "richText: true,"  )  ) ;
          jsonZ.push(  this.buildMLineDiv(0 , "numberOfLines: " + thisWeb.NumberOfLines + ","  )  ) ;
          jsonZ.push(  this.buildMLineDiv(0 , "allowHyperlink: " + thisWeb.AllowHyperlink + ","  )  ) ;
          jsonZ.push(  this.buildMLineDiv(0 , "appendOnly: " + thisWeb.AppendOnly + ","  )  ) ;
          jsonZ.push(  this.buildMLineDiv(0 , "restrictedMode: " + thisWeb.RestrictedMode + ","  )  ) ;
          
        }
        if (thisWeb.AddToDefaultContentType) { jsonZ.push(  this.buildMLineDiv(0 , "addToDefaultContentType: " + thisWeb.AddToDefaultContentType + ","  )  ) ; }

        jsonZ.push(  this.buildMLineDiv(0 , "}" )  );
        
        return jsonZ;
    }

    private getWebSpecialValue ( F : IContentsWebInfo ) {


      var specialColumn : string | JSX.Element = "";


      return specialColumn;

    } // End getSpecialColumn
}
