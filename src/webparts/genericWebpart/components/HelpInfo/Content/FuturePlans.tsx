import * as React from 'react';

import styles from '../Component/InfoPane.module.scss';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpInfo/Component/ISinglePageProps';

export function futureContent() {

    let html1 = <div>
        <h2>Were thinking of making this an extension so it doesn't need to be added to a page!</h2>
    </div>;

    return { html1: html1 };

}
  

