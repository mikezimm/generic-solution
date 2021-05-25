import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpInfo/Component/ISinglePageProps';

export function aboutTable() {

    let table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus','Notes'],
        rows: [],
    };

    table.rows.push( ['2021-05-25', '1.1.13.5',    <span>Improve Compare List Fields, summary, accordion, styling.</span>,                ''] );
    table.rows.push( ['2021-05-22', '1.1.13.4',    <span>Compare List Fields.</span>,                ''] );
    table.rows.push( ['2021-05-20', '1.1.13.3',    <span>Create Library Permissions.  Compare List Properties.</span>,                ''] );
    table.rows.push( ['2021-05-13', '1.1.13.2',    <span>Add Groups Panel to get current groups users.</span>,                ''] );
    table.rows.push( ['2021-05-13', '1.1.13.1',    <span>CreateListGroups, Upgrade to npmFunctions</span>,                ''] );

    table.rows.push( ['2021-03-07', '1.1.12.8',    <span>Carrot Charts Pre-Config List updates</span>,                ''] );
    table.rows.push( ['2021-03-03', '1.1.12.7',    <span>General Improvements, FPS Prop Pane</span>,                ''] );
    table.rows.push( ['2021-02-24', '1.1.12.6',    <span>Add create items tab</span>,                ''] );
    table.rows.push( ['2021-02-24', '1.1.12.5',    <span>Fix Group Settings link, Pattern Provisioning analytics, Help styling</span>,   'Improve prevention locks'] );
    table.rows.push( ['2021-02-19', '1.1.12.4',    <span>Fix Current list display</span>,                ''] );
    table.rows.push( ['2021-02-19', '1.1.12.3',    <span>Fix allIndex on showItems bug</span>,                ''] );
    table.rows.push( ['2021-02-19', '1.1.12.2',    <span>Fix when Patterns sitepages has Templates folder (null items error)</span>,                ''] );
    table.rows.push( ['2021-02-18', '1.1.12.1',    <span>Add <b>Pattern provisioning</b></span>,                ''] );

    table.rows.push( ['2021-02-08', '1.1.11.1',    <span>Add <b>Field Provisioning</b> and <b>Improvements, fixes</b></span>,    <span>BK's-BD &gt;w&lt;</span>] );
    table.rows.push( ['2020-10-22', '1.1.9.1',    <span>Add <b>View Details</b> and improve <b>XML Formatting</b></span>,                ''] );
    table.rows.push( ['2020-10-12', '1.1.8.3',    <span>Add <b>Early Access bar</b></span>,                ''] );
    table.rows.push( ['2020-10-10', '1.1.8.2',    <span>List Contents railsOff Link updates</span>,                ''] );
    table.rows.push( ['2020-10-10', '1.1.8.1',    <span>Start railsOff Mode for normal use</span>,                ''] );
    table.rows.push( ['2020-10-10', '1.1.7.1',    <span>Add List Views</span>,                ''] );
    table.rows.push( ['2020-09-10', '1.1.6.1',    <span>Add experimental DrillDown</span>,                'With basic Pivot and Command bar options'] );
    table.rows.push( ['2020-08-31', '1.1.5.1',    <span>Add Groups and Users tab</span>,                'Also refactor HoverCard code and others'] );
    table.rows.push( ['2020-08-31', '1.1.4.1',    <span>Add Features Tab</span>,                'Improved WebParts tab as well'] );
    table.rows.push( ['2020-08-14', '1.1.3.1',    <span>Add Groups Tab</span>,                'Includes getting Users based on groups'] );
    table.rows.push( ['2020-08-14', '1.1.2.2',    <span>Add Webs and ThisSite</span>,                '2.2 fixed WebParts error'] );

    table.rows.push( ['2020-08-14', '1.1.2.1',    <span>Columns almost done</span>,                'Also moved WebParts under Contents pivot'] );


    table.rows.push( ['2020-08-09', '1.1.1.1',    <span>List Contents Updated, almost done</span>,                'Set as default component, added Advanced and Rails Off mode'] );
    table.rows.push( ['2020-08-09', '1.1.1.0',    <span>Contents added</span>,                ''] );
    table.rows.push( ['2020-08-07', '1.1.0.0',    <span>Web Parts and Pages start</span>,                ''] );
    table.rows.push( ['2020-07-27', '1.0.0.0',    <span>Intial Build</span>,                ''] );


    /*
    table.rows.push( ['2021-00-00', '1.0.0.0',    <span>Add support to view <b>List attachments, List link, Stat chart updates</b></span>,    ''] );
    */
    
    return { table: table };

}