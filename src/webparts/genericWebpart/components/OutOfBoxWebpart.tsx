import * as React from 'react';
import styles from './GenericWebpart.module.scss';
import { IGenericWebpartProps } from './IGenericWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class GenericWebpart extends React.Component<IGenericWebpartProps, {}> {
  public render(): React.ReactElement<IGenericWebpartProps> {
    return (
      <div className={ styles.genericWebpart }>
        <div className={ styles.container }>
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
