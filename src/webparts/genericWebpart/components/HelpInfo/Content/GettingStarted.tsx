import * as React from 'react';

import styles from '../Component/InfoPane.module.scss';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpInfo/Component/ISinglePageProps';

export function gettingStartedContent() {

    let html1 = <div>

        <h2>Add extension to site or Webpart to page</h2>
        <h2>How to use</h2>
        <ol>
            <li>Click around and explor your site :)</li>
        </ol>
    </div>;

    return { html1: html1 };

}
  

