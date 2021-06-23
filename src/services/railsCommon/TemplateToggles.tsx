

import { IContentsToggles, makeToggles } from '../../webparts/genericWebpart/components/fields/toggleFieldBuilder';
import { getTheseDefinedLists, } from '../../webparts/genericWebpart/components/ListProvisioning/component/provisionFunctions';

import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../railsCommon/ProvisionTypes';

export function getPageTogglesNew( 
  lists: IMakeThisList[], 
  listNo: number,
  definedList: IDefinedLists, 
  panelOrPage: 'panel' | 'page',
  doMode: boolean,
  doFields: boolean,
  doViews: boolean,
  doItems: boolean,
  updateGenericToggle: any, 
  updateTogggleDoList: any
  
  ) {

    let toggleLabel = <span style={{ color: '', fontWeight: 700}}>Mode</span>;
    let togDoMode = {
        label: toggleLabel,
        disabled: definedList === availLists[0] ? true : false,
        key: 'togDoMode',
        _onChange: () => updateGenericToggle('togDoMode'),
        checked: doMode,
        onText: 'Build',
        offText: 'Design',
        className: '',
        styles: '',
    };

    let togDoFields = {
        label: `Fields (${lists.length > 0 ? lists[listNo].createTheseFields.length : 0 })`,
        key: 'togDoFields',
        _onChange: () => updateGenericToggle('togDoFields'),
        checked: doFields,
        onText: 'Include',
        offText: 'Skip',
        className: '',
        styles: '',
    };

    let togDoViews = {
        label: `Views (${lists.length > 0 ? lists[listNo].createTheseViews.length : 0 })`,
        key: 'togDoViews',
        _onChange: () => updateGenericToggle('togDoViews'),
        checked: doViews,
        onText: 'Include',
        offText: 'Skip',
        className: '',
        styles: '',
    };

    let togDoItems = {
        label: 'Items ' + ( lists && lists.length > 0 && listNo !== null? `(${lists[listNo].createTheseItems.length})` : '' ),
        key: 'togDoItems',
        _onChange: () => this.updateGenericToggle('togDoItems'),
        checked: doItems,
        onText: 'Include',
        offText: 'Skip',
        className: '',
        styles: '',
    };

    let theseToggles = [togDoMode, togDoFields, togDoViews, ];
    if ( panelOrPage === 'page' ) { theseToggles.push( togDoItems ) ; }
    
    let pageToggles : IContentsToggles = {
        toggles: theseToggles,
        childGap: 20,
        vertical: false,
        hAlign: 'end',
        vAlign: 'start',
        rootStyle: { width: 120, paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
    };

    return pageToggles;

}