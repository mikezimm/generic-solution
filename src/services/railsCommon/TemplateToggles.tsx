import * as React from 'react';

import { IContentsToggles, IToggleItem, makeToggles } from '../../webparts/genericWebpart/components/fields/toggleFieldBuilder';

import { IValidTemplate, IMakeThisList, IDefinedLists, IDefinedComponent, IListDefintionReports, IListDefintionHarmonie, IListDefintionCustReq, IListDefintionFinTasks, IListDefintionTMT, IListDefintionTurnOver, IListDefintionPivot, IListDefintionPreConfig } from '../railsCommon/ProvisionTypes';

import { availLists, DefStatusField, DefEffStatusField, availComponents, definedLists, } from '../railsCommon/ProvisionTypes';

export function getPageTogglesNew( 
  lists: IMakeThisList[], 
  listNo: number,
  definedList: IDefinedLists, 
  panelOrPage: 'panel' | 'page',
  doMode: boolean,
  doList: boolean,
  doFields: boolean,
  doViews: boolean,
  doItems: boolean,
  updateGenericToggle: any, 
  updateTogggleDoList: any
  
  ) {

    let toggleLabel = <span style={{ color: '', fontWeight: 700}}>Mode</span>;
    let togDoMode: IToggleItem = {
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

    let togDoList: IToggleItem = {
      label: doList === true ? 'Make List' : 'Make Library',
      key: 'togDoList',
      _onChange: updateTogggleDoList,
      checked: doList,
      onText: '-',
      offText: '-',
      className: '',
      styles: '',
    };

    let togDoFields: IToggleItem = {
        label: `Fields (${lists.length > 0 ? lists[listNo].createTheseFields.length : 0 })`,
        key: 'togDoFields',
        _onChange: () => updateGenericToggle('togDoFields'),
        checked: doFields,
        onText: 'Include',
        offText: 'Skip',
        className: '',
        styles: '',
    };

    let togDoViews: IToggleItem = {
        label: `Views (${lists.length > 0 ? lists[listNo].createTheseViews.length : 0 })`,
        key: 'togDoViews',
        _onChange: () => updateGenericToggle('togDoViews'),
        checked: doViews,
        onText: 'Include',
        offText: 'Skip',
        className: '',
        styles: '',
    };

    let togDoItems: IToggleItem = {
        label: 'Items ' + ( lists && lists.length > 0 && listNo !== null? `(${lists[listNo].createTheseItems.length})` : '' ),
        key: 'togDoItems',
        _onChange: () => updateGenericToggle('togDoItems'),
        checked: doItems,
        onText: 'Include',
        offText: 'Skip',
        className: '',
        styles: '',
    };

    let theseToggles : IToggleItem[] = [ togDoMode ];
    if ( doList !== null ) { theseToggles.push( togDoList ) ; }

    theseToggles.push( togDoFields );
    theseToggles.push( togDoViews );

    if ( panelOrPage === 'page' ) { theseToggles.push( togDoItems ) ; }

    let pageToggles : IContentsToggles = {
        toggles: theseToggles,
        childGap: 20,
        vertical: false,
        hAlign: 'end',
        vAlign: 'start',
        rootStyle: { width: 120, paddingTop: 0, paddingRight: 0, }, //This defines the styles on each toggle
    };

    let toggleDiv = makeToggles( pageToggles );

    return toggleDiv;

}