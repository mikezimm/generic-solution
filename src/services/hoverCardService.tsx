


import * as React from 'react';

import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import styles from '../webparts/genericWebpart/components/Contents/listView.module.scss';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

export function buildPropsHoverCard (item: any, highlightKeys: string[], specialKeys: string[], icon: any ) {

    //let highlightKeys = ["Title","Email","IsSiteAdmin","LoginName", "Id"];
    //let specialKeys = highlightKeys.concat("meta","searchString");

    const iconClassInfo = mergeStyles({
        fontSize: 18,
        margin: '5px',
        verticalAlign: 'bottom',
        padding: '0px !important',
      });

    let iconStyles: any = { root: {
        //color: h.color ? h.color : "blue",
      }};

    let normalIcon = icon !== null ? icon : <Icon iconName={ "Info"} className={ iconClassInfo } styles = { iconStyles }/>;

    const onRenderHoverCard = (item: any): JSX.Element => {

        //Build Highlighted Props:
        let hoverWebStyle = { fontWeight: 700};
        let showTheseProps = [];

        highlightKeys.map( prop => {
            let propType = typeof item[prop];
            let propVal = propType === 'object' || propType === 'boolean' ? JSON.stringify(item[prop]) : item[prop];
            showTheseProps.push(  <p><span style={hoverWebStyle}>{ prop }:</span> { propVal }</p> );
        });

        console.log('spespecialKeys', specialKeys);

        specialKeys.map( prop => {
            let propType = typeof item[prop];
            let propVal = propType === 'object' || propType === 'boolean' ? JSON.stringify(item[prop]) : item[prop];
            showTheseProps.push(  <p><span style={hoverWebStyle}>{ prop }:</span> { propVal }</p> );
        });

        let hoverMinorPropStyle = { fontSize: 'smaller' };

        Object.keys(item).map( prop => {
          if (highlightKeys.indexOf(prop) < 0 && specialKeys.indexOf(prop) < 0 ) {
            let propType = typeof item[prop];
            let propVal = propType === 'object' || propType === 'boolean' ? JSON.stringify(item[prop]) : item[prop];
            showTheseProps.push(  <p><span style={hoverMinorPropStyle}>{ prop }:</span> { propVal }</p> ); }
        });

        return <div className={styles.hoverCard} style={{padding: 30, maxWidth: 800 }}>
          <div>
            { showTheseProps }

          </div>
        </div>;
    };

    let detailsCard = <div>
        <HoverCard
          cardDismissDelay={300}
          type={HoverCardType.plain}
          plainCardProps={{
            onRenderPlainCard: onRenderHoverCard,
            renderData: 'testRenderData'
          }}>
          { normalIcon }
        </HoverCard>
    </div>;

    return detailsCard;

}



