import * as React from 'react';

import { Link, ILinkProps } from 'office-ui-fabric-react';

import { CompoundButton, Stack, IStackTokens, elementContains } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

//import { sp } from '@pnp/sp';

import { provisionTheList } from './provisionWebPartList';

import { IGenericWebpartProps } from '../IGenericWebpartProps';
import { IGenericWebpartState } from '../IGenericWebpartState';
import styles from './provisionList.module.scss';
import { IMyProgress } from '../IReUsableInterfaces';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import ButtonCompound from '../createButtons/ICreateButtons';
import { IButtonProps, ISingleButtonProps, IButtonState } from "../createButtons/ICreateButtons";

import { PageContext } from '@microsoft/sp-page-context';

import { Panel, PanelType, ActionButton } from "office-ui-fabric-react";

export interface IProvisionListsProps {
    // 0 - Context
    
    pageContext: PageContext;

    showPane: boolean;
    allLoaded: boolean;
    parentProps?: IGenericWebpartProps;
    parentState?: IGenericWebpartState;

    // 2 - Source and destination list information

    parentListTitle: string;
    parentListWeb: string;
    parentListConfirmed: boolean;
  
    childListTitle: string;
    childListWeb: string;
    childListConfirmed: boolean;

}

export interface IProvisionListsState {
    allLoaded: boolean;

    progress: IMyProgress;
    history: IMyProgress[];
    
    // 2 - Source and destination list information

    parentListTitle: string;
    parentListWeb: string;
    parentListConfirmed: boolean;
  
    childListTitle: string;
    childListWeb: string;
    childListConfirmed: boolean;

}

export default class ProvisionLists extends React.Component<IProvisionListsProps, IProvisionListsState> {


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
    this.state = { 
        allLoaded: this.props.allLoaded,
        progress: null,
        history: [],

        parentListTitle: this.props.parentListTitle,
        parentListWeb: this.props.parentListWeb,
        parentListConfirmed: this.props.parentListConfirmed,
      
        childListTitle: this.props.childListTitle,
        childListWeb: this.props.childListWeb,
        childListConfirmed: this.props.childListConfirmed,

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
            console.log('provisionList.tsx', this.props, this.state);

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
            
            let myProgress = this.state.progress == null ? null : <ProgressIndicator 
            label={this.state.progress.label} 
            description={this.state.progress.description} 
            percentComplete={this.state.progress.percentComplete} 
            progressHidden={this.state.progress.progressHidden}/>;

            thisPage = <div>Hi!  This is the ProvisionList pane!
                <div> { provisionButtons } </div>
                <div> { myProgress } </div>
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

    let listName = this.state.childListTitle ? this.state.childListTitle : 'ChildListTitle';
    let listCreated = provisionTheList( listName , 'ChildListTitle', this.props.pageContext.web.absoluteUrl, this.setProgress.bind(this));
    
    if ( listCreated ) { 
        this.setState({
            childListTitle: listName,
            childListConfirmed: true,
        });
    }

    return "Finished";  
  } 

  private CreateParentList(oldVal: any): any {

    let listName = this.state.parentListTitle ? this.state.parentListTitle : 'ParentListTitle';
    let listCreated = provisionTheList( listName , 'ParentListTitle', this.props.pageContext.web.absoluteUrl, this.setProgress.bind(this));
    
    if ( listCreated ) { 

        this.setState({
            parentListTitle: listName,
            parentListConfirmed: true,
        });

    }
    return "Finished";  
  } 

  private setProgress(progress: IMyProgress){
    progress.label += ' - at ' + new Date().toLocaleTimeString();
    console.log('setting Progress:', progress);

    let history: IMyProgress[] = this.state.history;
    history.push(progress);

    this.setState({
        progress: progress,
        history: history,
    });

  }

}