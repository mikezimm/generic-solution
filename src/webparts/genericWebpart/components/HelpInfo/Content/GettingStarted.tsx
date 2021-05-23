import * as React from 'react';

import styles from '../Component/InfoPane.module.scss';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpInfo/Component/ISinglePageProps';

export function gettingStartedContent() {

    let html1 = <div>

        <h2>Add extension to site or Webpart to page</h2>
        <ol>
            <li>Go to <b>WebPart Properties</b> - Edit Page, Edit Webpart.</li>
            <li>Pick list items to show (Entire Site, This Page, This Page targetting towards user</li>
        </ol>
        <h2>How to use</h2>
        <ol>
            <li>Press the <b>+</b> icon to add a new reminder</li>
            <li>Or... Select the reminder to update</li>
        </ol>
    </div>;

    return { html1: html1 };

}
  

