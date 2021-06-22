import * as React from 'react';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpInfo/Component/ISinglePageProps';

export function tricksTable() {

    let table : IHelpTable  = {
        heading: 'Undocumented and dangerous url parameters',
        headers: ['Param','Value','Active?', 'Notes'],
        rows: [],
    };

    let hasSearchParams = window.location.search.length > 0 ? '&' : '?';
    let hasScenarioDev = window.location.search.indexOf('scenario=dev') > -1 ? makeCenteredBoldSpan( 'true' ) : makeCenteredBoldSpan (<a href={ window.location + hasSearchParams + 'scenario=dev' }>Activate!</a> ) ;
    let hasAllowOther = window.location.search.indexOf('allowOtherSites=true') > -1 ?  makeCenteredBoldSpan('true') : '' ;
    let hasCrazy = window.location.search.indexOf('crazy=true') > -1 ?  makeCenteredBoldSpan('true') : '' ;
    let hasCreate = window.location.search.indexOf('create=true') > -1 ?  makeCenteredBoldSpan('true') : '' ;

    table.rows.push( [ makeCenteredSpan('scenario'), makeCenteredSpan('dev'), hasScenarioDev,    <span>Opens up additional options - 'Rails Off' meaning limited safety checks. </span>] );
    table.rows.push( [ makeCenteredSpan('crazy'), makeCenteredSpan('true'), hasAllowOther,   <span>Opens up additional even more options - 'DO NOT USE UNLESS YOU KNOW WHAT YOU ARE DOING'. { '' } </span>] );
    table.rows.push( [ makeCenteredSpan('allowOtherSites'), makeCenteredSpan('true'), hasCrazy,   <span>Allows you to do some 'Rails Off' functions on other sites</span>] );
    table.rows.push( [ makeCenteredSpan('create'), makeCenteredSpan('true'), hasCreate,   <span>Opens up additional options - create sample items in lists</span>] );
    // table.rows.push( [ makeCenteredSpan('scenario'), makeCenteredSpan('dev'),    <span>Opens up additional options</span>] );

    /*
    table.rows.push( ['2021-00-00', '1.0.0.0',    <span>Add support to view <b>List attachments, List link, Stat chart updates</b></span>,    ''] );
    */
    
    return { table: table };

}

export function makeCenteredSpan( info: any ) {
    return { info: info, style: { textAlign: 'center'} } ;
}

export function makeCenteredBoldSpan( info: any ) {
    return { info: info, style: { textAlign: 'center', fontWeight: 'bolder' } } ;
}