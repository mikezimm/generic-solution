


import * as React from 'react';

import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import styles from '../webparts/genericWebpart/components/Contents/listView.module.scss';

import { ColoredLine, ProjectTitleElement, MyIcon } from './drawServices';

import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Fabric, Stack, IStackTokens, initializeIcons } from 'office-ui-fabric-react';

export function buildPropsHoverCard (item: any, highlightKeys: string[], specialKeys: string[], showOthers: boolean, icon: any ) {

    //let highlightKeys = ["Title","Email","IsSiteAdmin","LoginName", "Id"];
    //let specialKeys = highlightKeys.concat("meta","searchString");

    const iconClassInfo = mergeStyles({
        fontSize: 18,
        margin: '2px',
        verticalAlign: 'bottom',
        padding: '0px !important',
        fontWeight: 600,
      });

      const iconClassInfoSmaller = mergeStyles({
        fontSize: 16,
        margin: '2px',
        verticalAlign: 'unset',
        padding: '0px !important',
        fontWeight: 600,
      });

    let iconStyles: any = { root: {
        //color: h.color ? h.color : "blue",
      }};

    let normalIcon = icon !== null ? icon : <Icon iconName={ "Info"} className={ iconClassInfo } styles = { iconStyles }/>;
    let hiddenIcon = item.Hidden === true ? <Icon title={ 'Hidden' } iconName={ "Hide3"} className={ iconClassInfoSmaller } styles = { { root: { color: 'blue'}} }/> : null;
    let requiredIcon = item.Required === true ? <Icon title={ 'Required' } iconName={ "AsteriskSolid"} className={ iconClassInfoSmaller } styles = {{ root: { color: 'red'}}}/> : null;
    let readOnly = item.ReadOnlyField === true ? <Icon title={ 'ReadOnly' } iconName={ "Lock12"} className={ iconClassInfoSmaller } styles = { { root: { color: 'green'}} }/> : null;
    let indexed = item.Indexed === true ? <Icon title={ 'Indexed' } iconName={ "Database"} className={ iconClassInfoSmaller } styles = { { root: { color: 'purple'}} }/> : null; 

    const onRenderHoverCard = (): JSX.Element => {

        //Build Highlighted Props:
        let hoverWebStyle = { fontWeight: 700};
        let showTheseProps = [];

        let missingProp = "Error:  prop not available";
        highlightKeys.map( prop => {
            if ( prop === 'refElement') { showTheseProps.push(  buildRefElement( item['ref']) );

            } else  {
                let propType = typeof item[prop];
                let propVal = propType === 'object' || propType === 'boolean' ? JSON.stringify(item[prop]) : item[prop];
                if ( propVal === undefined ) { propVal = missingProp ; }
                showTheseProps.push(  <p><span style={hoverWebStyle}>{ prop }:</span> { propVal }</p> );
            }
        });

        //console.log('spespecialKeys', specialKeys);
        
        //showTheseProps.push( <div><ColoredLine color='black' height='1px'></ColoredLine></div> );
        if ( specialKeys.length > 0 ) { showTheseProps.push( <div><h2>Special Props</h2></div> ); }
        specialKeys.map( prop => {
            if ( prop === 'refElement') { showTheseProps.push(  buildRefElement( item['ref']) );

            } else  {
                let propType = typeof item[prop];
                let propVal = propType === 'object' || propType === 'boolean' ? JSON.stringify(item[prop]) : item[prop];
                if ( propVal === undefined ) { propVal = missingProp ; }
                showTheseProps.push(  <p><span style={hoverWebStyle}>{ prop }:</span> { propVal }</p> );
            }
        });

        if ( showOthers ) {

            showTheseProps.push( <div><h2>Other Props</h2></div> );
            let hoverMinorPropStyle = { fontSize: 'smaller', fontWeight: 700 };

            Object.keys(item).map( prop => {

                if ( prop === 'refElement') { showTheseProps.push( buildRefElement( item['ref']) );

                } else if (highlightKeys.indexOf(prop) < 0 && specialKeys.indexOf(prop) < 0) {
                    let propType = typeof item[prop];
                    let propVal = propType === 'object' || propType === 'boolean' ? JSON.stringify(item[prop]) : item[prop];
                    if ( propVal === undefined ) { propVal = missingProp ; }
                    showTheseProps.push(  <p><span style={hoverMinorPropStyle}>{ prop }:</span> { propVal }</p> ); }
            });
        }

        let tipLine = showTheseProps.length > 20 ?  <p><span style={{fontSize: 'x-large', fontWeight: 600, color: 'darkblue'}}><mark>TIP: </mark>Use Mouse Wheel to scroll down page, Don't use scroll bar!</span></p> : null ;

        return <div className={styles.hoverCard} style={{padding: 30, maxWidth: 800 }}>
          <div>
            { tipLine }
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
          <div style={{ whiteSpace: 'nowrap'}}>{ normalIcon } { hiddenIcon } { requiredIcon } { readOnly } { indexed }</div>
        </HoverCard>
    </div>;

    return detailsCard;

}

export function buildRefElement( ref: any ) {

  if  ( ref != null && ref.indexOf('\n') > 0 ) {
    //Remove left padding:  https://stackoverflow.com/a/13939142
    ref = <ul style={{paddingLeft:15}}>{
      ref.replace('-- FULL ERROR', '\n-- FULL ERROR').split('\n').map( x => { return <li style={{paddingLeft:0}}>{x}</li>; } )
      }</ul>;
  }
  
  return ref;

}


