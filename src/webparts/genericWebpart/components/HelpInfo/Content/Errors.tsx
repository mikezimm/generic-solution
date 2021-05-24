import * as React from 'react';

import styles from '../Component/InfoPane.module.scss';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '@mikezimm/npmfunctions/dist/HelpInfo/Component/ISinglePageProps';

export function errorsContent() {

    let html1 = <div>
        <h2>Please submit any issues or suggestions on github (requires free account)</h2>
    </div>;
    return { html1: html1 };

}
  

