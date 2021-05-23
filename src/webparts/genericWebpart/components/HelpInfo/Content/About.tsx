import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpInfo/Component/ISinglePageProps';

export function aboutTable() {

    let table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus','Notes'],
        rows: [],
    };

    table.rows.push( ['2021-03-14', '1.0.0.2',    <span>Update HelpInfo content to standard method</span>,                                                   ''] );
    table.rows.push( ['2020-11-12', '1.0.0.1',    <span>Testing</span>,                                                   ''] );

    /*
    table.rows.push( ['2021-00-00', '1.0.0.0',    <span>Add support to view <b>List attachments, List link, Stat chart updates</b></span>,    ''] );
    */
    
    return { table: table };

}