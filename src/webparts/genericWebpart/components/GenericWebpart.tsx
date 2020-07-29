import * as React from 'react';
import styles from './GenericWebpart.module.scss';
import { IGenericWebpartProps } from './IGenericWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';


export default class GenericWebpart extends React.Component<IGenericWebpartProps, {}> {
  public render(): React.ReactElement<IGenericWebpartProps> {

    //Need to add component Did Update for Progress bar
    
    console.log('GenericWebpart props:', this.props);

    let myProgress = this.props.progress == null ? null : <ProgressIndicator label={this.props.progress.label} description={this.props.progress.description} percentComplete={this.props.progress.percentComplete} progressHidden={this.props.progress.progressHidden}/>;

    return (
      <div className={ styles.genericWebpart }>
        <div className={ styles.container }>
        <div>{ myProgress }</div>
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
