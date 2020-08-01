import * as React from 'react';

import { Link, ILinkProps } from 'office-ui-fabric-react';

import { CompoundButton, Stack, IStackTokens, elementContains, initializeIcons } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

//import { sp } from '@pnp/sp';

import { provisionTheList, IValidTemplate } from '../ListsTMT/provisionWebPartList';

import { IGenericWebpartProps } from '../../IGenericWebpartProps';
import { IGenericWebpartState } from '../../IGenericWebpartState';
import styles from './provisionList.module.scss';
import { IMyProgress } from '../../IReUsableInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ButtonCompound from '../../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../../createButtons/ICreateButtons";

import { PageContext } from '@microsoft/sp-page-context';

import { Panel, PanelType, ActionButton } from "office-ui-fabric-react";

import MyLogList from './listView';

import * as links from '../../HelpInfo/AllLinks';

export interface IProvisionListsProps {
    // 0 - Context
    
    pageContext: PageContext;

    allowOtherSites: boolean; //default is local only.  Set to false to allow provisioning lists on other sites.

    showPane: boolean;
    allLoaded: boolean;
    parentProps?: IGenericWebpartProps;
    parentState?: IGenericWebpartState;

    // 2 - Source and destination list information

    parentListTitle: string;
    parentListWeb: string;
    parentListConfirmed: boolean;
    parentListTemplate: IValidTemplate;
    //parentListURL: string;
  
    childListTitle: string;
    childListWeb: string;
    childListConfirmed: boolean;
    childListTemplate: IValidTemplate;
    //childListURL: string;

}

export interface IMyHistory {
    count: number;
    errors: IMyProgress[];
    columns: IMyProgress[];
    views: IMyProgress[];
    items: IMyProgress[];
}

export interface IProvisionListsState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning lists on other sites.

    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyHistory;

    currentList: string;
    
    // 2 - Source and destination list information

    parentListTitle: string;
    parentListWeb: string;
    parentListConfirmed: boolean;
    parentListURL: string;

    childListTitle: string;
    childListWeb: string;
    childListConfirmed: boolean;
    childListURL: string;

}

export default class ProvisionLists extends React.Component<IProvisionListsProps, IProvisionListsState> {

private clearHistory() {
    let history: IMyHistory = {
        count: 0,
        errors: [],
        columns: [],
        views: [],
        items: [],
    };
    return history;

}
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

public constructor(props:IProvisionListsProps){
    super(props);

    let parentListWeb = this.props.allowOtherSites ?  this.props.parentListWeb : this.props.pageContext.web.absoluteUrl;
    let childListWeb = this.props.allowOtherSites ?  this.props.childListWeb : this.props.pageContext.web.absoluteUrl;

    let parentListName = this.props.parentListTitle ? this.props.parentListTitle : 'ParentListTitle';
    let childListName = this.props.childListTitle ? this.props.childListTitle : 'ChildListTitle';

    this.state = { 

        allowOtherSites: this.props.allowOtherSites,
        currentList: 'Click Button to start',
        allLoaded: this.props.allLoaded,
        progress: null,
        history: this.clearHistory(),

        parentListTitle: parentListName,
        parentListWeb:  parentListWeb,
        parentListConfirmed: this.props.parentListConfirmed,
        parentListURL:  parentListWeb + ( this.props.parentListTemplate === 100 ? '/Lists/' : '') + parentListName,

        childListTitle: childListName,
        childListWeb: childListWeb,
        childListConfirmed: this.props.childListConfirmed,
        childListURL:  childListWeb + ( this.props.childListTemplate === 100 ? '/Lists/' : '') + childListName,

    };

    // because our event handler needs access to the component, bind 
    //  the component to the function so it can get access to the
    //  components properties (this.props)... otherwise "this" is undefined
    // this.onLinkClick = this.onLinkClick.bind(this);

    
  }

  public componentDidMount() {
    
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

  public componentDidUpdate(prevProps){

    let rebuildTiles = false;
    /*
    if (rebuildTiles === true) {
      this._updateStateOnPropsChange({});
    }
    */

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

    public render(): React.ReactElement<IProvisionListsProps> {

        if ( this.props.showPane ) {
            //console.log('provisionList.tsx', this.props, this.state);

/***
 *              d888888b db   db d888888b .d8888.      d8888b.  .d8b.   d888b  d88888b 
 *              `~~88~~' 88   88   `88'   88'  YP      88  `8D d8' `8b 88' Y8b 88'     
 *                 88    88ooo88    88    `8bo.        88oodD' 88ooo88 88      88ooooo 
 *                 88    88~~~88    88      `Y8b.      88~~~   88~~~88 88  ooo 88~~~~~ 
 *                 88    88   88   .88.   db   8D      88      88   88 88. ~8~ 88.     
 *                 YP    YP   YP Y888888P `8888Y'      88      YP   YP  Y888P  Y88888P 
 *                                                                                     
 *                                                                                     
 */


            let thisPage = null;
            let stringsError = <tr><td>  </td><td>  </td><td>  </td></tr>;


            const buttons: ISingleButtonProps[] =
            [{  disabled: false,  checked: true, primary: false,
                label: "Create Parent List", buttonOnClick: this.CreateParentList.bind(this),
            },{ 
                disabled: false,  checked: true, primary: false,
                label: "Create Child List", buttonOnClick: this.CreateChildList.bind(this),
            }];

            let provisionButtons = <div style={{ paddingTop: '20px' }}>
                    <ButtonCompound
                    buttons={buttons} horizontal={true}
                    />
                </div>;

            console.log('this.state', this.state);

            let parentLink = this.state.parentListConfirmed ? links.createLink( this.state.parentListURL, '_blank',  this.state.parentListTitle ) : null; 
            let childLink = this.state.childListConfirmed ? links.createLink( this.state.childListURL, '_blank',  this.state.childListTitle ) : null; 

            const stackProvisionTokens: IStackTokens = { childrenGap: 70 };

            let provisionButtonRow = <Stack horizontal={true} wrap={true} horizontalAlign={"start"} verticalAlign= {"center"} tokens={stackProvisionTokens}>{/* Stack for Buttons and Fields */}
                    { provisionButtons }
                    { parentLink }
                    { childLink }
                </Stack>;

            let myProgress = this.state.progress == null ? null : <ProgressIndicator 
                label={this.state.progress.label} 
                description={this.state.progress.description} 
                percentComplete={this.state.progress.percentComplete} 
                progressHidden={this.state.progress.progressHidden}/>;


            let errorList = <MyLogList 
                title={ 'Errors'}           items={ this.state.history.errors }
                descending={false}          titles={null}            ></MyLogList>;

            let fieldList = <MyLogList 
                title={ 'Columns'}           items={ this.state.history.columns }
                descending={false}          titles={null}            ></MyLogList>;

            let viewList = <MyLogList 
                title={ 'Views'}           items={ this.state.history.views }
                descending={false}          titles={null}            ></MyLogList>;

            let itemList = <MyLogList 
                title={ 'Items'}           items={ this.state.history.items }
                descending={false}          titles={null}            ></MyLogList>;

            let disclaimers = <div>
                <h2>Disclaimers.... still need to work on</h2>
                <ul>
                    <li>Set Title in onCreate</li>
                    <li>changesFinal - hidding original fields and setting and why Hours calculated is single line of text</li>
                    <li>enable localOnly</li>
                </ul>
            </div>;

            const stackListTokens: IStackTokens = { childrenGap: 10 };

            thisPage = <div><div>{ disclaimers }</div>
                <div> { provisionButtonRow } </div>
                <div style={{ height:30} }> {  } </div>
                <div> { myProgress } </div>
                <div> {  } </div>
                <div> <h2>{ this.state.currentList }</h2> </div>
                <div>
                <Stack horizontal={true} wrap={true} horizontalAlign={"center"} tokens={stackListTokens}>{/* Stack for Buttons and Fields */}
                    { errorList }
                    { fieldList }  
                    { viewList }  
                    { itemList }  
                </Stack>
                </div>

            </div>;

/***
 *              d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *              88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *              88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *              88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *              88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *              88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *                                                                 
 *                                                                 
 */

            return (
                <div className={ styles.infoPane }>
                    { thisPage }
                </div>
            );
            
        } else {
            console.log('provisionList.tsx return null');
            return ( null );
        }

    }   //End Public Render

    
  /***
   *          .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      db      d888888b .d8888. d888888b .d8888. 
   *         d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88        `88'   88'  YP `~~88~~' 88'  YP 
   *         8P      88oobY' 88ooooo 88ooo88    88    88ooooo      88         88    `8bo.      88    `8bo.   
   *         8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      88         88      `Y8b.    88      `Y8b. 
   *         Y8b  d8 88 `88. 88.     88   88    88    88.          88booo.   .88.   db   8D    88    db   8D 
   *          `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      Y88888P Y888888P `8888Y'    YP    `8888Y' 
   *                                                                                                         
   *                                                                                                         
   */

  private CreateChildList(oldVal: any): any {

    this.setState({ currentList: 'Child list: ' + this.state.childListTitle, history: this.clearHistory(),  });

    let listName = this.state.childListTitle ? this.state.childListTitle : 'ChildListTitle';

    let listCreated = provisionTheList( this.props.childListTemplate, listName , 'ChildListTitle', this.state.childListWeb, this.setProgress.bind(this));
    
    if ( listCreated ) { 
        this.setState({
            childListTitle: listName,
            childListConfirmed: true,
            currentList: 'Working on: ' + listName,
        });
    }

    return "Finished";  
  } 

  private CreateParentList(oldVal: any): any {

    this.setState({ currentList: 'Parent list: ' + this.state.parentListTitle, history: this.clearHistory(),  });

    let listName = this.state.parentListTitle ? this.state.parentListTitle : 'ParentListTitle';
    let listCreated = provisionTheList( this.props.parentListTemplate, listName , 'ParentListTitle', this.state.parentListWeb, this.setProgress.bind(this));
    
    if ( listCreated ) { 

        this.setState({
            parentListTitle: listName,
            parentListConfirmed: true,
            currentList: 'Working on: ' + listName,
        });

    }
    return "Finished";  
  } 

   /**
    * 
    * @param progressHidden 
    * @param list : list you want to add this to 'E' | 'C' | 'V' | 'I'
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in list
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
    */
  private setProgress(progressHidden: boolean, list: 'E' | 'C' | 'V' | 'I', current: number , ofThese: number, color: string, icon: string, logLabel: string, label: string, description: string, ref: string = null ){
    let thisTime = new Date().toLocaleTimeString();
    const percentComplete = ofThese !== 0 ? current/ofThese : 0;

    logLabel = current > 0 ? current + '/' + ofThese + ' - ' + logLabel : logLabel ;
    let progress: IMyProgress = {
        ref: ref,
        time: thisTime,
        logLabel: logLabel,
        label: label + '- at ' + thisTime,
        description: description,
        percentComplete: percentComplete,
        progressHidden: progressHidden,
        color: color,
        icon: icon,
      };

    //console.log('setting Progress:', progress);

    let history: IMyHistory = this.state.history;
    //let newHistory = null;
    

    if ( history === null ){

    } else {
        history.count ++;
        if ( list === 'E') {
            history.errors = history.errors.length === 0 ? [progress] : [progress].concat(history.errors);
        } else if ( list === 'C') {
            history.columns = history.columns.length === 0 ? [progress] : [progress].concat(history.columns);
        } else if ( list === 'V') {
            history.views = history.views.length === 0 ? [progress] : [progress].concat(history.views);
        } else if ( list === 'I') {
            history.items = history.items.length === 0 ? [progress] : [progress].concat(history.items);
        }
    }

    this.setState({
        progress: progress,
        history: history,
    });

  }

}