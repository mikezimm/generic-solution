import * as React from 'react';

import { Stack, IStackTokens } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import styles from './InfoPane.module.scss';

import * as choiceBuilders from '../../fields/choiceFieldBuilder';

//import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import WebPartLinks from './WebPartLinks';

import SinglePage from './SinglePage';
import { aboutTable } from '../Content/About';
import { devTable } from '@mikezimm/npmfunctions/dist/HelpInfo/Content/Developer';
import { gettingStartedContent } from '../Content/GettingStarted';

import { errorsContent } from '../Content/Errors';
import { advancedContent } from '../Content/Advanced';
import { futureContent } from '../Content/FuturePlans';

import { basicsContent } from '../Content/Basics';

import { tricksTable } from '../Content/Tricks';

export interface IInfoPagesProps {
    showInfo: boolean;
    allLoaded: boolean;

    parentListURL: string; //Get from list item
    childListURL?: string; //Get from list item

    parentListName: string;  // Static Name of list (for URL) - used for links and determined by first returned item
    childListName?: string;  // Static Name of list (for URL) - used for links and determined by first returned item

    gitHubRepo: any; // replace with IRepoLinks from npmFunctions v0.1.0.3

    hideWebPartLinks?: boolean;  //default = false... set to True if Early Access Banner is visible

    showTricks?: boolean;
    //toggleDebug: any;

}

export interface IInfoPagesState {
    selectedChoice: string;
    lastChoice: string;
    hasScenarioDev: boolean;
    hasAllowOther: boolean;
    hasCrazy: boolean;

}

export default class InfoPages extends React.Component<IInfoPagesProps, IInfoPagesState> {

    private gettingStarted= gettingStartedContent();
    private basics= basicsContent();
    private advanced= advancedContent();
    private futurePlans= futureContent();
    private dev= devTable();
    private errors= errorsContent();
    private about= aboutTable();
    private tricks= tricksTable();

    private options : IChoiceGroupOption[] = []; 

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

public constructor(props:IInfoPagesProps){
    super(props);

    if ( this.gettingStarted != null )   { this.options.push(  {key: 'gettingStarted', text: 'Getting started' }); }
    if ( this.basics != null )           { this.options.push(  {key: 'basics', text: 'Basics' }); }
    if ( this.advanced != null )         { this.options.push(  {key: 'advanced', text: 'Advanced' }); }
    if ( this.errors != null )           { this.options.push(  {key: 'errors', text: 'Errors'  }); }
    if ( this.futurePlans != null )      { this.options.push(  {key: 'futurePlans', text: 'Future Plans'  }); }
    if ( this.dev != null )              { this.options.push(  {key: 'dev', text: 'Developers'  }); }

    if ( this.props.showTricks === true && this.tricks != null )           
                                         { this.options.push(  {key: 'tricks', text: 'Tricks'  }); }

    if ( this.about != null )            { this.options.push(  {key: 'about', text: 'About'  }); }

    let hasScenarioDev = window.location.search.indexOf('scenario=dev') > -1 ? true : false;
    let hasAllowOther = window.location.search.indexOf('scenario=dev') > -1 ? true : false;
    let hasCrazy = window.location.search.indexOf('scenario=dev') > -1 ? true : false;

    this.state = { 
        selectedChoice: 'gettingStarted',
        lastChoice: '',

        hasScenarioDev: hasScenarioDev,
        hasAllowOther: hasAllowOther,
        hasCrazy: hasCrazy,

    };
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

    public render(): React.ReactElement<IInfoPagesProps> {

        const webPartLinks = this.props.hideWebPartLinks === true ? null : <WebPartLinks 
            parentListURL = { this.props.parentListURL } //Get from list item
            childListURL = { this.props.childListURL } //Get from list item

            parentListName = { this.props.parentListName } // Static Name of list (for URL) - used for links and determined by first returned item
            childListName = { this.props.childListName } // Static Name of list (for URL) - used for links and determined by first returned item

            repoObject = { this.props.gitHubRepo }
        ></WebPartLinks>;

        if ( this.props.allLoaded && this.props.showInfo ) {
            //console.log('InfoPagess.tsx', this.props, this.state);

            let thisPage = null;
            let content = null;
            if ( this.state.selectedChoice === 'gettingStarted' ) {
                content = this.gettingStarted;
            } else if ( this.state.selectedChoice === 'basics' ) {
                content= this.basics;
            } else if ( this.state.selectedChoice === 'advanced' ) {
                content=  this.advanced;
            } else if ( this.state.selectedChoice === 'futurePlans' ) {
                content=  this.futurePlans;
            } else if ( this.state.selectedChoice === 'dev' ) {
                content=  this.dev;
            } else if ( this.state.selectedChoice === 'errors' ) {
                content=  this.errors;
            } else if ( this.state.selectedChoice === 'about' ) {
                content= this.about;
            } else if ( this.state.selectedChoice === 'tricks' ) {
                content= this.tricks;
            }

            let pageChoices = choiceBuilders.creatInfoChoices(this.state.selectedChoice, this.options, this._updateChoice.bind(this)); 

            thisPage = <SinglePage 
                allLoaded={ this.props.allLoaded }
                showInfo={ this.props.showInfo }
                content= { content }
            ></SinglePage>;

            const stackButtonTokensBody: IStackTokens = { childrenGap: 40 };

            const ColoredLine = ({ color }) => ( <hr style={{ color: color, backgroundColor: color, height: 1 }}/> );

            return (<div className={ styles.infoPane } style={{paddingBottom: '30px', paddingLeft: '20px' }}>
                        { webPartLinks }
                        <Stack horizontal={true} horizontalAlign={"space-between"} tokens={stackButtonTokensBody}> {/* Stack for Projects and body */}
                            { pageChoices }
                        </Stack>

                        { thisPage }
                        <ColoredLine color="gray" />
                    </div>
            );
        } else {
            //console.log('InfoPagess.tsx return null');
            return ( null );
        }

    }   //End Public Render


/***
 *         db    db d8888b.       .o88b. db   db  .d88b.  d888888b  .o88b. d88888b 
 *         88    88 88  `8D      d8P  Y8 88   88 .8P  Y8.   `88'   d8P  Y8 88'     
 *         88    88 88oodD'      8P      88ooo88 88    88    88    8P      88ooooo 
 *         88    88 88~~~        8b      88~~~88 88    88    88    8b      88~~~~~ 
 *         88b  d88 88           Y8b  d8 88   88 `8b  d8'   .88.   Y8b  d8 88.     
 *         ~Y8888P' 88            `Y88P' YP   YP  `Y88P'  Y888888P  `Y88P' Y88888P 
 *                                                                                 
 *                                                                                 
 */

private _updateChoice(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption){

    let currentChoice = this.state.selectedChoice;
    let newChoice = option.key;

    this.setState({ 
        lastChoice: currentChoice,
        selectedChoice: newChoice,

     });
  }

}