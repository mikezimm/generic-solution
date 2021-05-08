
/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */

import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import { Panel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { Spinner, SpinnerSize, } from 'office-ui-fabric-react/lib/Spinner';
import { Pivot, PivotItem, IPivotItemProps, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SearchBox, } from 'office-ui-fabric-react/lib/SearchBox';


import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton, CompoundButton, elementContains } from 'office-ui-fabric-react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

 import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
 import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
 import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
 

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      .d8888. d88888b d8888b. db    db d888888b  .o88b. d88888b .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88'  YP 88'     88  `8D 88    88   `88'   d8P  Y8 88'     88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         `8bo.   88ooooo 88oobY' Y8    8P    88    8P      88ooooo `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88           `Y8b. 88~~~~~ 88`8b   `8b  d8'    88    8b      88~~~~~   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         db   8D 88.     88 `88.  `8bd8'    .88.   Y8b  d8 88.     db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         `8888Y' Y88888P 88   YD    YP    Y888888P  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */



 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      db   db d88888b db      d8888b. d88888b d8888b. .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88   88 88'     88      88  `8D 88'     88  `8D 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88ooo88 88ooooo 88      88oodD' 88ooooo 88oobY' `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88~~~88 88~~~~~ 88      88~~~   88~~~~~ 88`8b     `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88   88 88.     88booo. 88      88.     88 `88. db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P 88      Y88888P 88   YD `8888Y' 
 *                                                                                                                       
 *                                                                                                                       
 */

  import { buildPropsHoverCard } from '../../../../../../services/hoverCardService';

  import { createIconButton } from '../../../createButtons/IconButton';
  
  
  import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';
  
  import { IContentsToggles, makeToggles } from '../../../fields/toggleFieldBuilder';
  
 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
 *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
 *                                                                                                                                               
 *                                                                                                                                               
 */

import { IListRailFunction } from '../listsComponent';
import { createProcessSteps, IProcessSteps, IProcessStep, StatusIcons, StatusColors } from './setup';
import { doThisRailFunction } from './functions';


/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */


export interface IMyCreateListPermissionsProps {
    theList: IContentsListInfo;
    user: IUser;
    railFunction: IListRailFunction;
    showPanel: boolean;
    _closePanel: any;
    type: PanelType;
  }

export interface IMyCreateListPermissionsState {

    includeViewers: boolean;
    includeContrib: boolean;
    viewersSiteRead: boolean;
    contribSiteRead: boolean;
    viewersName: string;
    contribName: string;
    disableDo: boolean;

    steps: IProcessSteps;

}

const pivotStyles = {
    root: {
      whiteSpace: "normal",
    //   textAlign: "center"
    }};

const toggleStyles = { root: { width: 160, } };

const panelWidth = '90%';

const groupBottomPadding = '25px';
const toggleBottomPadding = '5px';

export default class MyCreateListPermissions extends React.Component<IMyCreateListPermissionsProps, IMyCreateListPermissionsState> {


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

    constructor(props: IMyCreateListPermissionsProps) {
        super(props);
        this.state = {
            disableDo: false,

            includeViewers: true,
            includeContrib: true,

            viewersSiteRead: true,
            contribSiteRead: true,

            viewersName: this.props.theList.Title + ' Readers',
            contribName: this.props.theList.Title + ' Contributors',

            steps: createProcessSteps(),
        };
    }
        
    public componentDidMount() {
        //this._getListItems();
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

    public componentDidUpdate(prevProps: IMyCreateListPermissionsProps): void {
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


    public render(): React.ReactElement<IMyCreateListPermissionsProps> {

        if ( this.props.theList ) {
          
            let listOrLib = this.props.theList.BaseType === 0 ? 'List' : 'Library' ;

            let panelContent = null;

            let selectedSteps = [];
            if ( this.state.steps.checkListPerms.required === true ) { selectedSteps.push( this.buildSelectedStep( this.state.steps.checkListPerms ) ) ; }
            if ( this.state.steps.breakListPerms.required === true ) { selectedSteps.push( this.buildSelectedStep( this.state.steps.breakListPerms ) ) ; }
            if ( this.state.includeContrib === true ) { 
                selectedSteps.push( this.buildSelectedStep( this.state.steps.checkContribGroup ) ) ;
                selectedSteps.push( this.buildSelectedStep( this.state.steps.createContribGroup ) ) ;
                selectedSteps.push( this.buildSelectedStep( this.state.steps.assignContribListRole ) ) ;
                if ( this.state.contribSiteRead === true ) {
                    selectedSteps.push( this.buildSelectedStep( this.state.steps.assignContribSiteRole ) ) ;
                }
            }

            if ( this.state.includeViewers === true ) { 
                selectedSteps.push( this.buildSelectedStep( this.state.steps.checkReaderGroup ) ) ;
                selectedSteps.push( this.buildSelectedStep( this.state.steps.createReaderGroup ) ) ;
                selectedSteps.push( this.buildSelectedStep( this.state.steps.assignReaderListRole ) ) ;
                if ( this.state.viewersSiteRead === true ) {
                    selectedSteps.push( this.buildSelectedStep( this.state.steps.assignReaderSiteRole ) ) ;
                }
            }
            
            let selectedTable = <table style={{marginTop: '30px' }}>
                <tr><th>Step</th><th>Status</th><th>Info</th><th>Details</th></tr>
                { selectedSteps }
            </table>;

            panelContent = <div>
                <Pivot
                    styles={ pivotStyles }
                    linkFormat={PivotLinkFormat.links}
                    linkSize={PivotLinkSize.normal}
                >
                    <PivotItem headerText="Create Permissions" ariaLabel="Create Permissions" title="Create" key="Create">
                        <h3> { listOrLib + ': ' + this.props.theList.Title }</h3>
                        <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                            { this.makeToggle( 'Create Contributors', this.state.includeContrib, false, this.updateTogggleContrib.bind(this) ) }
                            { this.makeToggle( 'Read site', this.state.contribSiteRead, !this.state.includeContrib, this.updateTogggleContribSiteRead.bind(this) ) }
                        </div>

                        { this.makeGroupName( this.state.contribName , this._updateContribGroup.bind(this) , !this.state.includeContrib, '0px 0px ' + groupBottomPadding + '0px' )}

                        <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                            { this.makeToggle( 'Create Readers', this.state.includeViewers, false, this.updateTogggleReaders.bind(this) ) }
                            { this.makeToggle( 'Read site', this.state.viewersSiteRead, !this.state.includeViewers, this.updateTogggleReadersSiteRead.bind(this) ) }
                        </div>

                        { this.makeGroupName( this.state.viewersName , this._updateVisitorGroup.bind(this) , !this.state.includeViewers, '0px 0px ' + groupBottomPadding + '0px' )}

                        <div style={{ marginTop: '50px', width: panelWidth, boxSizing: 'border-box' }}>
                            <DefaultButton
                                    onClick = { this.props._closePanel }
                                    title="Cancel"
                                    style={{ marginRight: '0px', padding: '20px' }}
                                >
                                Cancel
                            </DefaultButton>
                            <PrimaryButton
                                onClick = { this.startThisRailFunction.bind(this) }
                                title="ClickMe"
                                style={{ padding: '20px', float: 'right' }}
                                disabled={ this.state.disableDo }
                            >
                                Add Groups and Permissions
                            </PrimaryButton>
                        </div>
                    </PivotItem>
                    <PivotItem headerText="Current" ariaLabel="Current" title="Current" itemKey="Current">
                        <div style={{marginTop: '20px'}}>
                            Fetch groups here.  Copy code from PivotTiles
                        </div>
                    </PivotItem>

                </Pivot>
            </div>;

            let panelHeader = 'Create Permissions for ' + listOrLib ;
            return (
                <div><Panel
                        isOpen={ this.props.showPanel }
                        // this prop makes the panel non-modal
                        isBlocking={true}
                        onDismiss={ this.props._closePanel }
                        closeButtonAriaLabel="Close"
                        type = { this.props.type }
                        isLightDismiss = { true }
                        headerText = { panelHeader }
                        >
                        { panelContent }

                        { selectedTable }

                    </Panel>
                </div>

            );

        } else { //No list was detected

            // <div className={ styles.container }></div>
            return ( <div className={ '' }>
                    <Panel
                        isOpen={ this.props.showPanel }
                        // this prop makes the panel non-modal
                        isBlocking={true}
                        onDismiss={ this.props._closePanel }
                        closeButtonAriaLabel="Close"
                        type = { this.props.type }
                        isLightDismiss = { true }
                        headerText = { 'Ooops!' }
                        >
                            { 'OOPS!  We don\'t have a list to show you right now :(' }

                        </Panel>
                </div> );
        } 

    } 

    private startThisRailFunction() {
        doThisRailFunction( this.state.steps, this.props.theList , this.updateStateStatus.bind(this) );
    }

    private updateStateStatus( steps: IProcessSteps ) {
        this.setState({ 
            steps: steps,
         }); 
    }



    private buildSelectedStep( step: IProcessStep ) {
        let info = step.current.error !== '' ? step.current.error : step.current.info; 
        let key = step.current.key;
        let color = StatusColors[ key ];
        return <tr  title={ step.current.info }>
            <td>{ step.label } </td>
            <td style={{ textAlign: 'center' }} ><Icon iconName= { StatusIcons[ key ]} style={{ color: color }}></Icon></td>
            <td style={{ color: color }}>{ info } </td>
            <td>{ step.current.result } </td>
        </tr>;
    }

    private makeGroupName( def: string, onChanged: any, disabled: boolean, margin: any ) {
           return <div style={{ width: panelWidth, margin: margin }}>
                <TextField
                    defaultValue={ def }
                    placeholder={ 'Enter Group Name' }
                    autoComplete='off'
                    onChanged={ onChanged }
                    required={ true }
                    disabled={ disabled }
                    style={{ width: panelWidth }}
                />
            </div>;
    }

    private _updateVisitorGroup(oldVal: any): any {  this.setState({  viewersName: oldVal,  });  }
    private _updateContribGroup(oldVal: any): any {  this.setState({  contribName: oldVal,  });  }


    /***
     *         d888888b  .d88b.   d888b   d888b  db      d88888b .d8888. 
     *         `~~88~~' .8P  Y8. 88' Y8b 88' Y8b 88      88'     88'  YP 
     *            88    88    88 88      88      88      88ooooo `8bo.   
     *            88    88    88 88  ooo 88  ooo 88      88~~~~~   `Y8b. 
     *            88    `8b  d8' 88. ~8~ 88. ~8~ 88booo. 88.     db   8D 
     *            YP     `Y88P'   Y888P   Y888P  Y88888P Y88888P `8888Y' 
     *                                                                   
     *                                                                   
     */
    //            let toggles = <div style={{ float: 'right' }}> { makeToggles(this.getPageToggles()) } </div>;

    private makeToggle( label: string, checked: boolean, disabled: boolean, _onChange: any ) {
        return <div style={{ width: panelWidth, paddingBottom: toggleBottomPadding }}>
            <h3>{ label } </h3>
            <Toggle 
            onText={ 'Include' } 
            offText={ 'Skip' } 
            onChange={ _onChange } 
            checked={ checked }
            disabled= { disabled }
            styles={ toggleStyles }
            />
        </div>;

    }
    
    private updateSteps( step: any, key: string, newValue: any ) {
        if ( step[ key ] === undefined ) {
            alert( 'Unable to update step key: ' + key );
            return step;
        } else {
            step[ key ] = newValue;
            return step;
        }
    }

    private updateCommonSteps( newSteps : IProcessSteps ) {
        let updateList = newSteps.assignContribListRole.required === true || newSteps.assignReaderListRole.required === true ? true : false ;
        newSteps.checkListPerms.required = updateList;
        newSteps.breakListPerms.required = updateList;
        return newSteps;
    }

    private updateTogggleReaders() {  
        let newValue = !this.state.includeViewers;
        let newSteps : IProcessSteps = JSON.parse(JSON.stringify( this.state.steps ));
        newSteps.checkReaderGroup = this.updateSteps( newSteps.checkReaderGroup, 'required', newValue );
        newSteps.assignReaderListRole = this.updateSteps( newSteps.assignReaderListRole, 'required', newValue );
        newSteps = this.updateCommonSteps( newSteps );

        this.setState({  
            includeViewers: newValue, 
            steps: newSteps,
            disableDo: this.state.includeContrib === true || newValue === true ? false : true,
         }); 
    }

    private updateTogggleContrib() {
        let newValue = !this.state.includeContrib;
        let newSteps : IProcessSteps = JSON.parse(JSON.stringify( this.state.steps ));
        newSteps.checkContribGroup = this.updateSteps( newSteps.checkContribGroup, 'required', newValue );
        newSteps.assignContribListRole = this.updateSteps( newSteps.assignContribListRole, 'required', newValue );
        newSteps = this.updateCommonSteps( newSteps );

        this.setState({  
            includeContrib: newValue,  
            steps: newSteps,
            disableDo: this.state.includeViewers === true || newValue === true ? false : true,
        });  
    }

    private updateTogggleReadersSiteRead() {  
        let newValue = !this.state.viewersSiteRead;
        let newSteps : IProcessSteps = JSON.parse(JSON.stringify( this.state.steps ));
        newSteps.assignReaderSiteRole = this.updateSteps( newSteps.assignReaderSiteRole, 'required', newValue );

        this.setState({  
            viewersSiteRead: newValue,  
            steps: newSteps,
        });  
    }

    private updateTogggleContribSiteRead() {  
        let newValue = !this.state.contribSiteRead;
        let newSteps : IProcessSteps = JSON.parse(JSON.stringify( this.state.steps ));
        newSteps.assignContribSiteRole = this.updateSteps( newSteps.assignContribSiteRole, 'required', newValue );

        this.setState({  
            contribSiteRead: newValue,  
            steps: newSteps,
        });  
    }

}
