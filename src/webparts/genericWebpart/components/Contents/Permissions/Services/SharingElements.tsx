import * as React from 'react';

import { sortObjectArrayByNumberKey, } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';

import { IMySharedItem } from './Sharing';

export function buildSharingRows( sharedItems : IMySharedItem[], width: number ) {

    let sharedItemDetails : any[] = [];
    let sharedElements: any[] = [];

    //This gets all the individual shares currently under a list item, and puts them into a separate array so all shares can be resorted by timestamp and not by item.
    sharedItems.map( item => {
        item.SharedArray.map( share =>{
            sharedItemDetails.push( share );
        });
    });

    //This sorts all the individual details by share timestamp
    sharedItemDetails = sortObjectArrayByNumberKey( sharedItemDetails, 'dec', 'TimeMS' );

    //This builds the elements based on the sorting
    sharedItemDetails.map( share => {
        let sharedByName = share.sharedBy.split('@')[0];
        let sharedByDomain = sharedByName[1].split('.')[0] + '...';
        if ( share.sharedWith.indexOf( sharedByDomain ) > 0 ) { share.sharedWith = share.sharedBy.split('@')[0]; }
        sharedElements.push( 
            <tr>
                <td> { share.SharedTime.toLocaleString() } </td>
                <td> { share.FileSystemObjectType === 0 ? 'File' : 'Folder' } </td>
                <td> { share.GUID.split('-')[0] + '...' } </td>
                <td> { sharedByName } </td>
                <td> { share.sharedWith } </td>

            </tr>
          );
    });

    return sharedElements;

}