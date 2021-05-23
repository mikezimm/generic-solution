import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpInfo/Component/ISinglePageProps';

export function tricksTable() {

    let table : IHelpTable  = {
        heading: 'Undocumented and dangerous url parameters',
        headers: ['Param','Value','Notes'],
        rows: [],
    };

    table.rows.push( [ makeCenteredSpan('scenario'), makeCenteredSpan('dev'),    <span>Opens up additional options</span>] );

    /*
    table.rows.push( ['2021-00-00', '1.0.0.0',    <span>Add support to view <b>List attachments, List link, Stat chart updates</b></span>,    ''] );
    */
    
    return { table: table };

}

export function makeCenteredSpan( info: any ) {
    return { info: info, style: { textAlign: 'center'} } ;
}