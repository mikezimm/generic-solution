import * as React from 'react';
import { sp, Views, IViews } from "@pnp/sp/presets/all";

// For Pivot VVVV
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
// For Pivot ^^^^

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { PageContext } from '@microsoft/sp-page-context';

import styles from './contents.module.scss';

import { escape } from '@microsoft/sp-lodash-subset';

import { IMyPivots, IPivot,  ILink, IUser, IMyIcons, IMyFonts, IChartSeries, ICharNote } from '../IReUsableInterfaces';

import InspectLists from './Lists/listsComponent';

//import { analyticsList } from 'InspectContentsWebPartStrings';

import { cleanURL } from '../../../../services/stringServices';

import { pivotOptionsGroup, } from '../../../../services/propPane';
 
import { doesObjectExistInArray } from '../../../../services/arrayServices';

export interface IInspectContentsProps {
    // 0 - Context
    
    pageContext: PageContext;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.
    webURL?: string;

    showPane: boolean;
    allLoaded: boolean;

    currentUser: IUser;
    advanced: boolean;
    railsOff: boolean;

    WebpartHeight: number;
    WebpartWidth: number;

    // 2 - Source and destination list information

}

export interface IPickedList {
    title: string;
    name: string;
    guid: string;
}

export interface IInspectContentsState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    webURL?: string;
    tab?: string;

    pickedList? : IPickedList;
    allLoaded: boolean;
    advanced: boolean;
    railsOff: boolean;

    WebpartHeight: number;
    WebpartWidth: number;

}

export default class InspectContents extends React.Component<IInspectContentsProps, IInspectContentsState> {


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


    public constructor(props:IInspectContentsProps){
    super(props);

    let parentWeb = cleanURL(this.props.webURL);

    this.state = {

            //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
            WebpartHeight: this.props.WebpartHeight ,
            WebpartWidth:  this.props.WebpartWidth ,
        
            // 2 - Source and destination list information
            webURL: parentWeb,

            allLoaded: false,

            advanced: true,
            railsOff: true,

            tab: 'Lists',
    
    };
    }


    public componentDidMount() {

    }


    //        
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

        let rebuildPart = prevProps.webURL === this.props.webURL ? true : false;
        if (rebuildPart === true) {
        this._updateStateOnPropsChange({});
        }
    }

    public render(): React.ReactElement<IInspectContentsProps> {

        const pickListMessage = <div>Please pick a list first</div>;
        const noPageAvailable = <div>This feature is not yet available</div>;

        const listPage = <div>
            <InspectLists 
                pageContext = { this.props.pageContext }
                currentUser = { this.props.currentUser }
                allowOtherSites = { true }
                allLoaded = { true }
                pickedList = { this.state.pickedList }
                pickThisList = { this.updatePickList.bind(this) }
            ></InspectLists>
        </div>;

        const columnsPage = <div>
            { !this.state.pickedList ? pickListMessage : 
                <InspectLists 
                    pageContext = { this.props.pageContext }
                    currentUser = { this.props.currentUser }
                    allowOtherSites = { true }
                    allLoaded = { true }
                    pickedList = { this.state.pickedList }
                    pickThisList = { this.updatePickList.bind(this) }
                ></InspectLists> }
            </div>;

        const viewsPage = <div>
                { noPageAvailable }
        </div>;

        const typesPage = <div>
                { noPageAvailable }
        </div>;

        const groupsPage = <div>
                { noPageAvailable }
        </div>;

        const pivotGap: Partial<IStyleSet<ILabelStyles>> = {
            root: { marginTop: 10 },
        };


        let MyPivot = <Pivot 
            aria-label="Contents Options"
            linkSize= { pivotOptionsGroup.getPivSize('normal') }
            linkFormat= { pivotOptionsGroup.getPivFormat('tabs') }
        >
            <PivotItem headerText="Lists">
                { listPage }
            </PivotItem>
            <PivotItem headerText="Columns">
                <h3>Columns</h3>
                { columnsPage }
            </PivotItem>
            <PivotItem headerText="Views">
                <h3>Views</h3>
                { viewsPage }
            </PivotItem>
            <PivotItem headerText="Types">
                <h3>Types</h3>
                { typesPage }
            </PivotItem>
            <PivotItem headerText="Groups">
                <h3>Groups</h3>
                { groupsPage }
            </PivotItem>
        </Pivot>;

        return (
        <div className={ styles.contents }>
        <div className={ styles.container }>
            { MyPivot }
        </div>
        </div>

        );
    }

  /***
   *         db    db d8888b. d8888b.  .d8b.  d888888b d88888b      .d8888. d888888b  .d8b.  d888888b d88888b 
   *         88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'          88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
   *         88    88 88oodD' 88   88 88ooo88    88    88ooooo      `8bo.      88    88ooo88    88    88ooooo 
   *         88    88 88~~~   88   88 88~~~88    88    88~~~~~        `Y8b.    88    88~~~88    88    88~~~~~ 
   *         88b  d88 88      88  .8D 88   88    88    88.          db   8D    88    88   88    88    88.     
   *         ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P      `8888Y'    YP    YP   YP    YP    Y88888P 
   *                                                                                                          
   *                                                                                                          
   */

    private updatePickList  = (ev: React.FormEvent<HTMLInputElement>): void => {

        //let itemID = (item.title + '|Splitme|' + item.activity);
        let parent = ev.currentTarget.parentElement;
        let buttonID = parent.id;

        //2020-05-11:  Issue 44 Added so activity can have / or \ from partial URLs
        buttonID = buttonID.replace(/forwardSSlash/gi, '\/');
        buttonID = buttonID.replace(/backwardSSlash/gi, '\\');

        let splitID = buttonID.split('|Splitme|');
        let thisTab = splitID[0];
        let thisId = splitID[1];
        let thisTitle = splitID[2];
        let thisName = splitID[3];

        console.log('updatePickList:', ev );
        console.log('splitID:', splitID );
        
        let thisList : IPickedList = {
            title: thisTitle,
            name: thisName,
            guid: thisId,
        };

        this.setState({
            pickedList: thisList,
            tab: thisTab,
        });
    }

    private _updateStateOnPropsChange(params: any ): void {
        this.setState({

        });
    }

}
