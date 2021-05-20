import * as React from 'react';

import { Link } from 'office-ui-fabric-react';

import { sortObjectArrayByNumberKey, } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';

import { IMySharedItem } from './Sharing';
import { PopupWindowPosition } from '@microsoft/sp-property-pane';

import * as fpsAppIcons from '@mikezimm/npmfunctions/dist/Icons/standardEasyContents';


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

        let shortFileName = share.FileLeafRef && share.FileLeafRef.length > 0 ? share.FileLeafRef.substr(0,15) : '';
        if ( shortFileName.length < share.FileLeafRef.length ) { shortFileName += '...' ; }

        sharedElements.push( 
            <tr>
                <td> { share.SharedTime.toLocaleString() } </td>
                <td> { share.FileSystemObjectType === 0 ? 'File' : 'Folder' } </td>
                {/* <td> { share.GUID.split('-')[0] + '...' } </td> */}
                <td title={ share.FileLeafRef }> { <Link onClick={ openLinkInNewTabUsingDatahref } data-href= { share.FileRef }>{ shortFileName }</Link> } </td>
                <td> { sharedByName } </td>
                <td> { share.sharedWith } </td>

            </tr>
          );
    });

    return sharedElements;

}


export function buildWasSharedRows( sharedItems : IMySharedItem[], width: number ) {

    let sharedElements: any[] = [];


    //This builds the elements based on the sorting
    sharedItems.map( ( item, index )  => {

        let shortFileName = item.FileLeafRef && item.FileLeafRef.length > 0 ? item.FileLeafRef.substr(0,25) : '';
        if ( shortFileName.length < item.FileLeafRef.length ) { shortFileName += '...' ; }

        let firstShareDateMS = 3618105359201;
        let lastShareDateMS = 0;

        let firstShareDate = null;
        let lastShareDate = null;

        let sharedByPeopleArray = [];
        let thisFileShares = [];

        const UniquePermIcon: JSX.Element = <div id={ index.toString() } > { fpsAppIcons.UniquePerms } </div>;

        item.SharedArray.map( share =>{
            
            let sharedByName = share.sharedBy.split('@')[0];
            let sharedByDomain = sharedByName[1].split('.')[0] + '...';
            if ( share.sharedWith.indexOf( sharedByDomain ) > 0 ) { share.sharedWith = share.sharedBy.split('@')[0]; }

            if ( share.TimeMS > lastShareDateMS ) { lastShareDate = share.SharedTime; lastShareDateMS = share.TimeMS ; }
            if ( share.TimeMS < firstShareDateMS ) { firstShareDate = share.SharedTime; firstShareDateMS = share.TimeMS ; }
            sharedByPeopleArray.push( share.sharedWith );

            thisFileShares.push( 
                <tr>
                    <td> { share.SharedTime.toLocaleString() } </td>
                    <td> { sharedByName } </td>
                    <td> { share.sharedWith } </td>
                </tr>
              );

        });
        
        let shareTimeFrame = firstShareDate !== null ? firstShareDate.toLocaleString() : null;
        if ( lastShareDate !== null && firstShareDateMS !== lastShareDateMS ) { shareTimeFrame += ' - ' + lastShareDate.toLocaleString() ;  }

        let shareTable = thisFileShares.length === 0 ? null : <table>
            {/* <tr>
                <th>Date</th>
                <th>Shared By</th>
                <th>Shared With</th>
            </tr> */}
            { thisFileShares }
        </table>;

        sharedElements.push( 
            <tr>
                <td > { UniquePermIcon } </td>
                <td> { item.FileSystemObjectType === 0 ? 'File' : 'Folder' } </td>
                {/* <td> { share.GUID.split('-')[0] + '...' } </td> */}
                <td title={ item.FileLeafRef }> { <Link onClick={ openLinkInNewTabUsingDatahref } data-href= { item.FileRef }>{ shortFileName }</Link> } </td>
                <td> { shareTable } </td>

            </tr>
          );
    });

    return sharedElements;

}

// function handleClickOnLink(ev: React.MouseEvent<unknown>) {
function openLinkInNewTabUsingDatahref( e: any ) {
    e.preventDefault();
    let testElement = e.nativeEvent.target;
    const href = testElement.getAttribute('data-href');
    window.open( href, '_blank' );
  }