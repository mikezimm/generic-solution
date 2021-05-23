import * as React from 'react';

export type IHelpTableRow = any[];

export interface IHelpTable {
    heading?: any;
    headers: any[];
    rows: IHelpTableRow[];
}

export interface IPageContent {
    header?: any;
    html1?: any;
    table?: IHelpTable;
    html2?: any;
    footer?: any;
}

export interface ISinglePageProps {
    showInfo: boolean;
    allLoaded: boolean;
    content: IPageContent;
}
