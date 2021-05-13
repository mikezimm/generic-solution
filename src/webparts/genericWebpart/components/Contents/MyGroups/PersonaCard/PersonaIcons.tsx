import * as React from 'react';

import { Icon, } from 'office-ui-fabric-react';

import { GuestsIconName, SiteAdminIconName, } from '../IMyGroupsState';

export function getAdminIcon( iconSize, iconLeftPad, iconTextSize ) {
    let AdminIcon = <div style={{ fontSize: iconSize , color: 'darkgreen' , paddingLeft: iconLeftPad, paddingRight: 10, whiteSpace: 'nowrap' }} >
      <Icon iconName={ SiteAdminIconName } title={'Site Admin'} />
      <span style={{ fontSize: iconTextSize }}>Admin</span>
    </div>;
    return AdminIcon;
}

export function getGuestIcon( iconSize, iconLeftPad, iconTextSize ) {
    let GuestIcon = <div style={{ fontSize: iconSize , color: 'saddlebrown' , paddingLeft: iconLeftPad, paddingRight: 4, whiteSpace: 'nowrap' }} >
      <Icon iconName={ GuestsIconName } title={'Guest User'} />
      <span style={{ fontSize: iconTextSize }}>Guest</span>
    </div>;
    return GuestIcon;
}





