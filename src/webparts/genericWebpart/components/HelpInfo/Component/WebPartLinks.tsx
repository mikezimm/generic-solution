import * as React from 'react';

import * as links from '@mikezimm/npmfunctions/dist/HelpInfo/Links/AllLinks';

import { Stack, IStackTokens } from 'office-ui-fabric-react';

export interface IWebPartLinksProps {
    parentListURL: string; //Get from list item
    childListURL?: string; //Get from list item

    parentListName: string;  // Static Name of list (for URL) - used for links and determined by first returned item
    childListName?: string;  // Static Name of list (for URL) - used for links and determined by first returned item

    repoObject: any;  // Looking for structure from AllLinks.tsx like:  links.gitRepoTrackMyTime
}

export interface IWebPartLinksState {
    selectedChoice: string;
    lastChoice: string;
}

export default class WebPartLinks extends React.Component<IWebPartLinksProps, IWebPartLinksState> {

    private parentListURL : any = this.props.parentListURL;
    private parentListName : any = this.props.parentListName;

    private childListURL : any = this.props.childListURL;
    private childListName : any = this.props.childListName;

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

public constructor(props:IWebPartLinksProps){
    super(props);
    this.state = {
        selectedChoice: 'About',
        lastChoice: '',

    };
  }

  // public componentDidMount() { }

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

 // public componentDidUpdate(prevProps : any){ }

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

    public render(): React.ReactElement<IWebPartLinksProps> {

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

        let doParentList = this.parentListURL && this.parentListName && this.parentListURL.length > 0 && this.parentListName.length > 0 ? true : false;
        let doChildList = this.childListURL && this.childListName && this.childListURL.length > 0 && this.childListName.length > 0 ? true : false;

        let parentListURL = doParentList ? links.createLink(this.parentListURL,'_blank', this.parentListName ) : null;

        let childListURL = doChildList ? links.createLink(this.childListURL,'_blank', this.childListName ) : null;

        let showLists = doParentList === true || doChildList === true ? true : false ;

        thisPage = <div style={{paddingTop: '10px' , paddingBottom: '10px' }}>
            <Stack horizontal={true} wrap={true} horizontalAlign={"stretch"} tokens={stackTokensBody}>
                { ( showLists === true ? <div><b>Your Lists:</b></div> : null ) }
                { ( doParentList === true ? parentListURL : null ) }
                { ( doChildList === true ? childListURL : null ) }
                { ( showLists === true ? <span style={{width: '30px' }}> </span> : null ) }
                { this.props.repoObject ? <div style={{paddingLeft: doChildList === true ? '30px' : '' }}><b>Webpart info:</b></div> : null }
                { this.props.repoObject ? this.props.repoObject.repo : null }
                { this.props.repoObject ? this.props.repoObject.issues : null }
                { this.props.repoObject ? this.props.repoObject.wiki : null }
            </Stack>
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

        return ( thisPage ); 
    }
}
