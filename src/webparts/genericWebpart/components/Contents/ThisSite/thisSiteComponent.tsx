import * as React from 'react';
import { sp, Views, IViews, IWebInfo, Web } from "@pnp/sp/presets/all";

// For Pivot VVVV
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, IPivotItemProps} from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
// For Pivot ^^^^

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { PageContext } from '@microsoft/sp-page-context';

import styles from '../contents.module.scss';

import { escape } from '@microsoft/sp-lodash-subset';

import { IMyPivots, IPivot,  ILink, IUser, IMyIcons, IMyFonts, IChartSeries, ICharNote } from '../../IReUsableInterfaces';

import { IPickedWebBasic } from '../contentsComponent';

//import { analyticsList } from 'InspectThisSiteWebPartStrings';

import { makeSmallTimeObject, ITheTime, getAge, getBestTimeDelta} from '../../../../../services/dateServices';

import { cleanURL, camelize } from '../../../../../services/stringServices';

import { pivotOptionsGroup, } from '../../../../../services/propPane';
 
import { doesObjectExistInArray } from '../../../../../services/arrayServices';

import * as pages from './thisSiteFunctions';

export interface IInspectThisSiteProps {
    // 0 - Context
    
    pageContext: PageContext;

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.
//    webURL?: string;
    pickedWeb? : IPickedWebBasic;
    
    showPane?: boolean;
    allLoaded: boolean;

    currentUser: IUser;

    allowSettings?: boolean;
    allowRailsOff?: boolean;

    showSettings?: boolean;  //property set by toggle to actually show or hide this content
    showRailsOff?: boolean;  //property set by toggle to actually show or hide this content

    WebpartHeight?: number;
    WebpartWidth?: number;

    // 2 - Source and destination list information

}

export interface IPickedSite {

    basic: {
        ServerRelativeUrl: string;
        SiteLogoUrl: string | null;
        Url: string;
        WebTemplate: string;
        Title: string;
        Created: string;

        Description: string;
        WelcomePage: string;
        EnableMinimalDownload: boolean;
        Language: number;
        IsMultilingual: boolean;
        LastItemModifiedDate: string;
        LastItemUserModifiedDate: string;



        timeCreated : ITheTime;
        timeModified : ITheTime;
        userModified: ITheTime;

        bestCreate: string;
        bestMod: string;
        bestUser: string;

    };
    siteFeatures?: {

    };
    webFeatures?: {

    };
    graph?: {

    };
    nav?: {
        MegaMenuEnabled: boolean;
        NavAudienceTargetingEnabled: boolean;
        QuickLaunchEnabled: boolean;
        HorizontalQuickLaunch: boolean;
        TreeViewEnabled: boolean;
    };
    legacy?: {
        ClassicWelcomePage: string | null;
        MasterUrl: string;
    };
    spo?: {
        IsHomepageModernized: boolean;
        FooterEmphasis: number;
        FooterEnabled: boolean;
        FooterLayout: number;
        HeaderEmphasis: number;
        HeaderLayout: number;
    };
    hubs?: {

    };
    advanced?: {
        NoCrawl: boolean;
        ObjectCacheEnabled: boolean;
        OverwriteTranslationsOnChange: boolean;

        RecycleBinEnabled: boolean;
        DocumentLibraryCalloutOfficeWebAppPreviewersDisabled: boolean;
        Configuration: number;
        CustomMasterUrl: string;
        DesignPackageId: string;
        IsRevertHomepageLinkHidden: boolean;

        SyndicationEnabled: boolean;
        TenantAdminMembersCanShare: number;

        Id: string;
        CurrentChangeToken: {
            StringValue: string;
        };

        ResourcePath: {
            DecodedUrl: string;
        };
        SearchScope: number;
    };
    later?: {
        UIVersion: number;
        UIVersionConfigurationEnabled: boolean;
    };
}

export interface IPickedList {
    title: string;
    name: string;
    guid: string;
    isLibrary: boolean;
}

export interface IInspectThisSiteState {

    allowOtherSites?: boolean; //default is local only.  Set to false to allow provisioning parts on other sites.

    webURL?: string;
    tab?: string;

    pickedList? : IPickedList;
    pickedWeb? : IPickedSite;

    allLoaded: boolean;

    allowSettings: boolean;  //property that determines if the related toggle is visible or not
    allowRailsOff: boolean;  //property that determines if the related toggle is visible or not

    showSettings: boolean;  //property set by toggle to actually show or hide this content
    showRailsOff: boolean;  //property set by toggle to actually show or hide this content

    WebpartHeight: number;
    WebpartWidth: number;

}

export const contentsTabs = ['Basic','Graph','SPO','Nav','Hub','Advanced', 'RailsOff'];

export default class InspectThisSite extends React.Component<IInspectThisSiteProps, IInspectThisSiteState> {


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


    public constructor(props:IInspectThisSiteProps){
    super(props);

    let parentWeb = cleanURL(this.props.pickedWeb.url);

    let pickedWeb = null; //this.getThisWeb( parentWeb );

    let railsMode = this.props.allowRailsOff && this.props.showRailsOff ? true : false ;
    this.state = {

            //Size courtesy of https://www.netwoven.com/2018/11/13/resizing-of-spfx-react-web-parts-in-different-scenarios/
            WebpartHeight: this.props.WebpartHeight ,
            WebpartWidth:  this.props.WebpartWidth ,
        
            // 2 - Source and destination list information
            webURL: parentWeb,

            pickedWeb: pickedWeb,

            allLoaded: false,

            allowSettings: this.props.allowSettings === true ? true : false,
            allowRailsOff: this.props.allowRailsOff === true ? true : false,

            showRailsOff: railsMode ,
            showSettings: this.props.showSettings,

            tab: 'Lists',
    
    };
    }


    public componentDidMount() {
        let pickedWeb = this.getThisWeb( this.props.pickedWeb.url );
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

        let rebuildPart = prevProps.pickedWeb.url === this.props.pickedWeb.url ? false : true;
        if (rebuildPart === true) {
        this._updateStateOnPropsChange({});
        }
    }

    public render(): React.ReactElement<IInspectThisSiteProps> {

        const pickListMessage = <div>Please pick a list first</div>;
        const pickWebMessage = <div>Please pick a WEB first</div>;
        const noPageAvailable = <div style={{ paddingBottom: 30 }}>This feature is not yet available</div>;


        const pivotGap: Partial<IStyleSet<ILabelStyles>> = {
            root: { marginTop: 10 },
        };


        let MyPivot = <div style={{ paddingLeft: 10, paddingRight: 20, paddingBottom: 20 }}><Pivot 
            aria-label="Contents Options"
            linkSize= { pivotOptionsGroup.getPivSize('normal') }
            linkFormat= { pivotOptionsGroup.getPivFormat('links') }
            selectedKey= { contentsTabs.indexOf(this.state.tab).toFixed() }
            defaultSelectedKey= { contentsTabs.indexOf(this.state.tab).toFixed() }
            onLinkClick={ this.updatePickList2.bind(this) }

        >
            { /* export const contentsTabs = ['Lists','Columns','Views','Types','WebParts','Groups']; */ }
            <PivotItem headerText={ contentsTabs[0] }>
                { ( pages.createBasicPage(this.state.pickedWeb ) ) }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[1] }>
                { ( pages.createDumpAndRunPage(this.state.pickedWeb, contentsTabs[1] ) ) }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[2] }>
            { ( pages.createDumpAndRunPage(this.state.pickedWeb, contentsTabs[2] ) ) }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[3] }>
            { ( pages.createDumpAndRunPage(this.state.pickedWeb, contentsTabs[3] ) ) }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[4] }>
            { ( pages.createDumpAndRunPage(this.state.pickedWeb, contentsTabs[4] ) ) }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[5] }>
            { ( pages.createDumpAndRunPage(this.state.pickedWeb, contentsTabs[5] ) ) }
            </PivotItem>
            <PivotItem headerText={ contentsTabs[6] }>
            { ( pages.createDumpAndRunPage(this.state.pickedWeb, contentsTabs[6] ) ) }
            </PivotItem>
        </Pivot></div>;

        return (
            <div className={ styles.contents }>
            <div className={ styles.container }>
            <div className={ styles.rightContents }>
                { MyPivot }
            </div>
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


   private async getThisWeb ( webURL ) {

    let thisIsNow = new Date().toLocaleString();
    const thisWebObject = Web( webURL );

    let getMinProps = 'Title,Id,Url,ServerRelativeUrl,SiteLogoUrl,Description';
    //const actual = await thisWebObject.select(getMinProps).get();

    const actual: IWebInfo = await thisWebObject.get();

    let thisWeb : IPickedSite = {
        basic: {
            ServerRelativeUrl: actual.ServerRelativeUrl ,
            SiteLogoUrl: actual.SiteLogoUrl ,
            Url: actual.Url ,
            WebTemplate: actual.WebTemplate ,
            Title: actual.Title ,
            Created: actual.Created ,
            Description: actual.Description ,
            WelcomePage: actual.WelcomePage ,

            LastItemModifiedDate: actual.LastItemModifiedDate ,
            LastItemUserModifiedDate: actual.LastItemUserModifiedDate ,

            timeCreated : makeSmallTimeObject(actual.Created),
            timeModified : makeSmallTimeObject(actual.LastItemModifiedDate),
            userModified: makeSmallTimeObject(actual.LastItemUserModifiedDate),

            bestCreate: getBestTimeDelta(actual.Created, thisIsNow),
            bestMod: getBestTimeDelta(actual.Created, thisIsNow),
            bestUser: getBestTimeDelta(actual.LastItemUserModifiedDate, thisIsNow),

            EnableMinimalDownload: actual.EnableMinimalDownload ,
            Language: actual.Language ,
            IsMultilingual: actual.IsMultilingual ,
        },
        legacy: {
            MasterUrl: actual.MasterUrl.indexOf('seattle') > 0 ? 'Seattle' : actual.MasterUrl.indexOf('oslo') > 0 ? 'Oslo' : actual.MasterUrl ,
            ClassicWelcomePage: actual.ClassicWelcomePage,
        },
        advanced: {
            Id: actual.Id ,
            NoCrawl: actual.NoCrawl ,
            ObjectCacheEnabled: actual.ObjectCacheEnabled ,
            OverwriteTranslationsOnChange: actual.OverwriteTranslationsOnChange ,

            RecycleBinEnabled: actual.RecycleBinEnabled ,
            DocumentLibraryCalloutOfficeWebAppPreviewersDisabled: actual.DocumentLibraryCalloutOfficeWebAppPreviewersDisabled ,
            Configuration: actual.Configuration ,
            CustomMasterUrl: actual.CustomMasterUrl ,
            DesignPackageId: actual.DesignPackageId ,
            IsRevertHomepageLinkHidden: actual.IsRevertHomepageLinkHidden ,

            SyndicationEnabled: actual.SyndicationEnabled ,
            TenantAdminMembersCanShare: actual.TenantAdminMembersCanShare ,


            CurrentChangeToken: actual.CurrentChangeToken,
    
            ResourcePath: actual.ResourcePath,
            SearchScope: actual.SearchScope ,
        },
        siteFeatures: {

        },
        webFeatures: {
    
        },
        graph: {
    
        },
        nav: {
            MegaMenuEnabled: actual.MegaMenuEnabled,
            NavAudienceTargetingEnabled: actual.NavAudienceTargetingEnabled ,
            TreeViewEnabled: actual.TreeViewEnabled ,
            HorizontalQuickLaunch: actual.HorizontalQuickLaunch ,
            QuickLaunchEnabled: actual.QuickLaunchEnabled ,
        },
        spo: {
            IsHomepageModernized: actual.IsHomepageModernized ,
            FooterEmphasis: actual.FooterEmphasis ,
            FooterEnabled: actual.FooterEnabled ,
            FooterLayout: actual.FooterLayout ,
            HeaderEmphasis: actual.HeaderEmphasis ,
            HeaderLayout: actual.HeaderLayout ,
        },
        hubs: {
    
        },
        later: {
            UIVersion: actual.UIVersion ,
            UIVersionConfigurationEnabled: actual.UIVersionConfigurationEnabled ,
        },

    };

    this.setState({
        pickedWeb: thisWeb,

    });

    console.log('getThisWeb:', thisWeb);
    return thisWeb;

   }

  private updatePickWeb  = (ev: React.FormEvent<HTMLInputElement>): void => {

    //NEED TO USE THIS LATER WHEN PICKING DIFFERENT WEB
    /*
    let webURL = this.state.webURL;
    let thisWeb : IPickedSite = this.getThisWeb( this.state.webURL );

    this.setState({
        pickedWeb: thisWeb,
        webURL: webURL, 
    });
*/
  }
    // public searchForItems = (item): void => {
    // private updatePickList2  = (ev: React.FormEvent<HTMLInputElement>): void => {
    private updatePickList2  = (item): void => {

        let thisTab = item.props.headerText;
        this.setState({
            tab: thisTab,
        });
    }
   
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
        let thisName = splitID[2];
        let thisTitle = splitID[3];
        let isLibrary : boolean = splitID[4] === 'Libraries' ? true : false;

        console.log('updatePickList:', ev );
        console.log('splitID:', splitID );
        
        let thisList : IPickedList = {
            title: thisTitle,
            name: thisName,
            guid: thisId,
            isLibrary : isLibrary,
        };

        this.setState({
            pickedList: thisList,
            tab: thisTab,
        });
    }

    private _updateStateOnPropsChange(params: any ): void {
        console.log('_updateStateOnPropsChange');
    }

}
