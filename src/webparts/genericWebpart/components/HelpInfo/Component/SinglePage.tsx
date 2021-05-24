import * as React from 'react';

import styles from './InfoPane.module.scss';

import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from './ISinglePageProps';
//Moved these to npmFunctions 

export interface ISinglePageState {
}

export default class SinglePage extends React.Component<ISinglePageProps, ISinglePageState> {


/***
 *          .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
 *         d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
 *         8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
 *         8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
 *         Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
 *          `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
 *                                                                                                       
 *                                                                                                       
 */

public constructor(props:ISinglePageProps){
    super(props);
    this.state = { 
    };
  }


  public componentDidMount() {
  }


  /***
 *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
 *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
 *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
 *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
 *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
 *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
 *                                                                                         
 *                                                                                         
 */

  public componentDidUpdate(prevProps){
  }

/***
 *         d8888b. d88888b d8b   db d8888b. d88888b d8888b. 
 *         88  `8D 88'     888o  88 88  `8D 88'     88  `8D 
 *         88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY' 
 *         88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b   
 *         88 `88. 88.     88  V888 88  .8D 88.     88 `88. 
 *         88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD 
 *                                                          
 *                                                          
 */

    public render(): React.ReactElement<ISinglePageProps> {

        if ( this.props.allLoaded && this.props.showInfo ) {
            console.log('SinglePage.tsx', this.props, this.state);

/***
 *              d888888b db   db d888888b .d8888.      d8888b.  .d8b.   d888b  d88888b 
 *              `~~88~~' 88   88   `88'   88'  YP      88  `8D d8' `8b 88' Y8b 88'     
 *                 88    88ooo88    88    `8bo.        88oodD' 88ooo88 88      88ooooo 
 *                 88    88~~~88    88      `Y8b.      88~~~   88~~~88 88  ooo 88~~~~~ 
 *                 88    88   88   .88.   db   8D      88      88   88 88. ~8~ 88.     
 *                 YP    YP   YP Y888888P `8888Y'      88      YP   YP  Y888P  Y88888P 
 *
 *
 */

            let thisTable = null;
            let propsTable = this.props.content.table;
            if ( propsTable && propsTable.rows.length > 0 ) {

                let heading = propsTable.heading ? <h2> { propsTable.heading } </h2> : null;

                let tableHeaders = propsTable.headers.map( header => {
                    return <th>{ header }</th>;
                });

                let tableRows = propsTable.rows.map( row => {
                    let cells = row.map( cell => {
                        let style = null;
                        if ( cell['style'] ) { style = cell['style'];}
                        return <td style={ style }>{ cell['style'] ? cell['info'] : cell } </td>;
                    });
                    return <tr>{ cells }</tr>;
                });

                thisTable = <div>
                    { heading }
                    <table className={styles.infoTable}>
                        { tableHeaders }
                        { tableRows }
                    </table>
                </div>;

            }

/***
 *              d8888b. d88888b d888888b db    db d8888b. d8b   db 
 *              88  `8D 88'     `~~88~~' 88    88 88  `8D 888o  88 
 *              88oobY' 88ooooo    88    88    88 88oobY' 88V8o 88 
 *              88`8b   88~~~~~    88    88    88 88`8b   88 V8o88 
 *              88 `88. 88.        88    88b  d88 88 `88. 88  V888 
 *              88   YD Y88888P    YP    ~Y8888P' 88   YD VP   V8P 
 *
 *
 */

            return (
                <div className={ styles.infoPane } style={{ paddingTop: '10px'}}>
                    { this.props.content.header }
                    { this.props.content.html1 }
                    { thisTable }
                    { this.props.content.html2 }
                    { this.props.content.footer }
                </div>
            ); 
        } else {
            console.log('infoPages.tsx return null');
            return ( null );
        }
    }   //End Public Render
}
