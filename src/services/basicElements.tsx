import * as React from 'react';

export function convertTextToListItems ( value: string, delim: string, leftPad: number, type: 'ul' | 'ol', otherSettings = null ) {

    let result : any = value;
  
    if ( value !== null && value !== undefined && value.length > 0 ) {
      let lines = value.split(delim);
      if ( lines.length > 0  ) {
        result = lines.map( line => { return <li style={{paddingLeft:0}}>{ line }</li>; } );
        if (type==='ul') {
          result = <div style={{padding: 0}}><ul style={{paddingLeft: leftPad, margin: 0 }}>{ result } </ul></div>;
        } else if ( type === 'ol' ) {
          result = <div style={{padding: 0}}><ol style={{paddingLeft: leftPad, margin: 0 }}>{ result } </ol></div>;
        }
      }
    }
  
    return result;
  
  }

  //import { createSpanLink } from '../../../../../services/basicElements';
  export function createSpanLink( url, desc, title = null, size = null ) {
    let linkStyle = { cursor: 'pointer', color: '#1a0dab', fontSize: size !== null ? size : 'normal' };
    const thisLink = <span style={ linkStyle } 
                        onClick={ () => _openThisLinkInNewTab( url ) }
                        title={ title !== null ? title : desc }
                      >
                          { desc }
                      </span>;
    return thisLink;
  }

  export function _openThisLinkInNewTab( link ) {
    window.open( link, '_blank' );
  }