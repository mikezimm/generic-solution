
import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { IContentsListInfo, IMyListInfo, IServiceLog, IContentsLists } from '@mikezimm/npmfunctions/dist/Lists/listTypes'; //Import view arrays for Time list

import { Panel, IPanelProps, IPanelStyleProps, IPanelStyles, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { IPickedWebBasic, IPickedList } from '@mikezimm/npmfunctions/dist/Lists/IListInterfaces';
import { IMyProgress,  } from '@mikezimm/npmfunctions/dist/ReusableInterfaces/IMyInterfaces';
import { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';

import { buildPropsHoverCard } from '../../../../../services/hoverCardService';

import { createIconButton } from '../../createButtons/IconButton';

import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { Stack, IStackTokens, Alignment } from 'office-ui-fabric-react/lib/Stack';

import { IContentsToggles, makeToggles } from '../../fields/toggleFieldBuilder';

import { TextField,  IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "office-ui-fabric-react";
import { DefaultButton, PrimaryButton, CompoundButton, elementContains } from 'office-ui-fabric-react';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

// const iconStyles: React.CSSProperties = { background: 'white', color: 'black', padding: '5px', margin: '1px', borderRadius: '50%', opacity: '80%'} ;
// const redIconStyles: React.CSSProperties = { background: 'white', color: 'red', padding: '5px', margin: '1px', borderRadius: '50%', opacity: '80%'} ;
// export const UniquePerms = <Icon iconName="Shield" title="Unique Permissions" style={ iconStyles }></Icon>;

export type IListRailFunction = 'ListPermissions' | '';

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

}

const toggleStyles = { root: { width: 160, } };

const panelWidth = '80%';

const fieldTopPadding = '20px';

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
            includeViewers: true,
            includeContrib: true,

            viewersSiteRead: true,
            contribSiteRead: true,

            viewersName: this.props.theList.Title + ' Readers',
            contribName: this.props.theList.Title + ' Contributors',
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
            
            let panelContent = null;
            if ( this.props.railFunction === 'ListPermissions' ) {

                panelContent = <div>

                    <h3> { this.props.theList.Title }</h3>
                    <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                        { this.makeToggle( 'Create Contributors', this.state.includeContrib, this.updateTogggleContrib.bind(this) ) }
                        { this.makeToggle( 'Read site', this.state.contribSiteRead, this.updateTogggleContribSiteRead.bind(this) ) }
                    </div>

                    { this.makeGroupName( this.state.contribName , this._updateContribGroup.bind(this) , !this.state.includeContrib )}

                    <div style={{display: '-webkit-inline-box', paddingBottom: '10px' }}>
                        { this.makeToggle( 'Create Readers', this.state.includeViewers, this.updateTogggleViewers.bind(this) ) }
                        { this.makeToggle( 'Read site', this.state.viewersSiteRead, this.updateTogggleViewersSiteRead.bind(this) ) }
                    </div>

                    { this.makeGroupName( this.state.viewersName , this._updateVisitorGroup.bind(this) , !this.state.includeViewers )}

                    <div style={{ marginTop: '50px', width: panelWidth, boxSizing: 'border-box' }}>
                        <DefaultButton
                                onClick = { () => alert("Hi!") }
                                title="ClickMe"
                                style={{ marginRight: '20px', padding: '20px' }}
                            >
                            Cancel
                        </DefaultButton>
                        <PrimaryButton
                            onClick = { () => alert("Hi!") }
                            title="ClickMe"
                            style={{ padding: '20px', float: 'right' }}
                        >
                            Add Groups and Permissions
                        </PrimaryButton>
                    </div>


                </div>;
            }

        let panelHeader = 'Create Permissions for ' + ( this.props.theList.BaseType === 0 ? 'List' : 'Library' );
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

                </Panel>
            </div>

          );

    } else {


      // <div className={ styles.container }></div>
      return (
        <div className={ '' }>
                { this.props.user.Title }
                { this.props.theList.Title }
        </div>
          );
        } 

    } 



    private makeGroupName( def: string, onChanged: any, disabled: boolean ) {
           return <div style={{ width: panelWidth }}>
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

    private makeToggle( label: string, checked: boolean, _onChange: any ) {
        return <div style={{ width: panelWidth, paddingTop: fieldTopPadding }}>
            <h3>{ label } </h3>
            <Toggle 
            onText={ 'Include' } 
            offText={ 'Skip' } 
            onChange={ _onChange } 
            checked={ checked }
            styles={ toggleStyles }
            />
        </div>;

    }
    
    private updateTogggleViewers() {  this.setState({  includeViewers: !this.state.includeViewers,  });  }
    private updateTogggleContrib() {  this.setState({  includeContrib: !this.state.includeContrib,  });  }

    private updateTogggleViewersSiteRead() {  this.setState({  viewersSiteRead: !this.state.viewersSiteRead,  });  }
    private updateTogggleContribSiteRead() {  this.setState({  contribSiteRead: !this.state.contribSiteRead,  });  }

}
