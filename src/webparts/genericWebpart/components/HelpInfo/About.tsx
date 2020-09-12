import * as React from 'react';

import * as links from './AllLinks';

import { Link, ILinkProps } from 'office-ui-fabric-react';
import { CompoundButton, Stack, IStackTokens, elementContains } from 'office-ui-fabric-react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import { IGenericWebpartProps } from '../IGenericWebpartProps';
import { IGenericWebpartState } from '../IGenericWebpartState';

import WebPartLinks from './WebPartLinks';
import { IWebPartLinksProps, IWebPartLinksState } from './WebPartLinks';

import styles from './InfoPane.module.scss';

export interface IInfoAboutMeProps {
    showInfo: boolean;
    allLoaded: boolean;
    parentProps: IGenericWebpartProps;
    parentState: IGenericWebpartState;

}

export interface IInfoAboutMeState {
    selectedChoice: string;
    lastChoice: string;
}

export default class InfoAboutMe extends React.Component<IInfoAboutMeProps, IInfoAboutMeState> {


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

public constructor(props:IInfoAboutMeProps){
    super(props);
    this.state = { 
        selectedChoice: 'About',
        lastChoice: '',

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

    public render(): React.ReactElement<IInfoAboutMeProps> {

        if ( this.props.allLoaded && this.props.showInfo ) {
            console.log('About.tsx', this.props, this.state);

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
            
            const stackTokensBody: IStackTokens = { childrenGap: 20 };

            let thisPage = null;

            thisPage = <div>
                <WebPartLinks
                    parentListURL={ this.props.parentState.parentListURL }
                    parentListName={ this.props.parentState.parentListTitle }
                    childListURL={ this.props.parentState.childListURL }
                    childListName={ this.props.parentState.childListTitle }
                ></WebPartLinks>

                <h2>Version History</h2>
                {/* 3 files to update version number:  package-solution.json, package-lock.json, package.json*/}
                <table className={styles.infoTable}>
                    <tr><th>Date</th><th>Version</th><th>Focus</th><th>Notes</th></tr>
                    <tr><td>2020-09-10</td><td>{'1.1.7.1'}</td><td>Add List Views</td><td></td></tr>
                    <tr><td>2020-09-10</td><td>{'1.1.6.1'}</td><td>Add experimental DrillDown</td><td>With basic Pivot and Command bar options</td></tr>
                    <tr><td>2020-08-31</td><td>{'1.1.5.1'}</td><td>Add Groups and Users tab</td><td>Also refactor HoverCard code and others</td></tr>
                    <tr><td>2020-08-31</td><td>{'1.1.4.1'}</td><td>Add Features Tab</td><td>Improved WebParts tab as well</td></tr>
                    <tr><td>2020-08-14</td><td>{'1.1.3.1'}</td><td>Add Groups Tab</td><td>Includes getting Users based on groups</td></tr>
                    <tr><td>2020-08-14</td><td>{'1.1.2.2'}</td><td>Add Webs and ThisSite</td><td>2.2 fixed WebParts error</td></tr>
                    <tr><td>2020-08-14</td><td>{'1.1.1.1'}</td><td>Columns almost done</td><td>Also moved WebParts under Contents pivot</td></tr>
                    <tr><td>2020-08-09</td><td>{'1.1.1.0'}</td><td>List Contents Updated, almost done</td><td>Set as default component, added Advanced and Rails Off mode</td></tr>
                    <tr><td>2020-08-09</td><td>{'1.1.0.0'}</td><td>Contents added</td><td>Nothing special</td></tr>
                    <tr><td>2020-08-07</td><td>{'1.0.0.0'}</td><td>Web Parts and Pages start</td><td>Nothing special</td></tr>
                    <tr><td>2020-07-27</td><td>{'1.0.0.0'}</td><td>Intial Build</td><td>Nothing special</td></tr>
                </table>
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
            console.log('infoPages.tsx return null');
            return ( null );
        }
    }   //End Public Render
}
