import * as React from 'react';

import * as devLinks from '@mikezimm/npmfunctions/dist/HelpInfo/Links/LinksDevDocs';
import * as chartJSLinks from '@mikezimm/npmfunctions/dist/HelpInfo/Links/LinksChartJS';
import * as repoLinks from '@mikezimm/npmfunctions/dist/HelpInfo/Links/LinksRepos';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpInfo/Component/ISinglePageProps';

export function devTable() {

    let table : IHelpTable  = {
        heading: 'Open source components and docs used in webparts',
        headers: ['MS Dev Docs','Github','Description'],
        rows: [],
    };

    table.rows.push( [ devLinks.devDocsWeb, devLinks.gitRepoSPFxContReact , 'MSFT Dev Docs for Fabric React UI Components' ] );
    table.rows.push( [ devLinks.devDocsPnpJSsp, devLinks.gitRepoPnpJSsp, 'PNP JS sp:  Library for interacting with SPO' ] );
    table.rows.push( [ devLinks.devDocsIcon, '', '' ] );
    table.rows.push( [ devLinks.devDocsText, '', '' ] );
    table.rows.push( [ devLinks.devDocsDate, devLinks.gitSampleReactDate, '' ] );
    table.rows.push( [ devLinks.devDocsSlider, '', '' ] );
    table.rows.push( [ devLinks.devDocsToggle, '', '' ] );
    table.rows.push( [ devLinks.devDocsChoice, '', '' ] );
    
    table.rows.push( [ devLinks.devDocsButton, '', '' ] );
    table.rows.push( [ devLinks.devDocsStack, '', '' ] );
    table.rows.push( [ devLinks.devDocsList, devLinks.gitSampleReactList, '' ] );

    table.rows.push( [ devLinks.devDocsPivo, '', '' ] );
    table.rows.push( [ devLinks.devDocsReGr, '', '' ] );
    table.rows.push( [ devLinks.devDocsLink, '', '' ] );

    table.rows.push( [ chartJSLinks.chartJSSamples, '', '' ] );
    table.rows.push( [ '', devLinks.gitSampleWebPartTitle , 'React Webpart Title' ] );

    return { table: table };
}