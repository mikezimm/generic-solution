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

  let iconName = show === true ? 'ChevronUp' : 'ChevronDown';
  let height = show === true ? '100%' :'3.4em';

  let result = <div style={{ width: panelWidth, height: height, overflow: 'hidden', cursor: 'pointer',  }} onClick={ onClickClose }>
    <div style={{ float: 'right', height: '0px', right: '100px', overflow: 'visible', zIndex: 10 , position: 'absolute', }}>
        <Icon iconName={iconName} style={{margin: '0px 15px 10px 10px', padding: '10px', fontWeight: 600 }} ></Icon>
    </div>
    <MessageBar
        messageBarType={MessageBarType.severeWarning} 
        style={ severeWarningStyles }
        truncated={ true }
        overflowButtonAriaLabel="See more"
        dismissButtonAriaLabel="Close"
    >
      { content }
    </MessageBar>
  </div>;

  return result;
} 
