import * as React from 'react';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import { MessageBar, MessageBarType,  } from 'office-ui-fabric-react/lib/MessageBar';

export function createMainRailsWarningBar( panelWidth: number | string, show: boolean, content: any, onClickClose: any ) {

  
  let severeWarningStyles: any = { root: {
      fontSize: 'larger',
      fontWeight: 600,
      color: 'darkred',
      // paddingRight: '10px',
  }};

  let result = <div style={{ width: panelWidth, display: show !== true ? 'none' : null  }}>
    <div style={{ float: 'right', height: '0px', right: '100px', overflow: 'visible', cursor: 'pointer', zIndex: 10 , position: 'absolute', }}>
        <Icon iconName={'ChromeClose'} style={{margin: '10px', padding: '10px' }} onClick={ onClickClose }></Icon>
    </div>
    <MessageBar
        messageBarType={MessageBarType.severeWarning} 
        style={ severeWarningStyles }
        truncated={ true }
        overflowButtonAriaLabel="See more"
        dismissButtonAriaLabel="Close"
    >
      { content }
    </MessageBar>;
  </div>;

  return result
} 
