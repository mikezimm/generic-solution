import * as React from 'react';
import styles from './GenericWebpart.module.scss';
import { IGenericWebpartProps } from './IGenericWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export default class GenericWebpart extends React.Component<IGenericWebpartProps, {}> {

  public render(): React.ReactElement<IGenericWebpartProps> {

    let progressXYZ = <ProgressIndicator label="Loading the Poll analytics" description="Getting all the responses..." percentComplete={.1} />;

    return (
      <div className={ styles.genericWebpart }>
        <div className={ styles.container }>
        <div> { progressXYZ } </div>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
