import { sp } from '@pnp/sp';
import { Web, } from '@pnp/sp/presets/all';

import { getHelpfullErrorV2 } from  '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
import { makeid } from  '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';

import { arraysEqual } from 'office-ui-fabric-react';

import { IListInfo, IMyListInfo, IServiceLog, notify } from '@mikezimm/npmfunctions/dist/Lists/listTypes';

import { IListLog } from './listServices/listServices';

import { BaseErrorTrace } from './BaseErrorTrace';

export async function createGridDates ( webUrl : string, listName : string, itemTitle : string, code: string, message1 : string, dates : string[], setProgress: any ): Promise<IListLog[]>{

    let web = Web(webUrl);
    let statusLog : IListLog[] = [];

    let list = web.lists.getByTitle(listName);
    const entityTypeFullName = await list.getListItemEntityTypeFullName();

    let i = 0;

    //let createThisBatch : IAnyArray = [];
    //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
    let totalItems = dates.length;
    for (let thisDate of dates) {
        let newCode = makeid( 4 ) + code + makeid( 3 );
        let now = new Date(thisDate);

        let item = {    'Title': itemTitle,
            'TheDate': now,
            'Message': message1,
            'Code': newCode,   };

        try {

            await list.items.add( item , entityTypeFullName).then(b => {
                statusLog = notify(statusLog, 'Created Item', 'No-batch', null, null, null, true );
                setProgress(false, "I", i, totalItems , 'darkgreen', 'CheckMark',  item.Title, 'Items: ' + item.Code, 'Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 95');
            });

        } catch (e) {
            let errMessage = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'Get Grid Dates', item.Title, item.Code, i, totalItems].join('|') );

            let missingColumn = false;
            let userFieldMissingID = false;

            if ( errMessage.indexOf('missing a column') > -1 ) { missingColumn = true; }
            if ( errMessage.indexOf('does not exist on list') > -1 ) { missingColumn = true; }
            if ( errMessage.indexOf('does not exist on type') > -1 ) { missingColumn = true; }

            if ( errMessage.indexOf("A 'PrimitiveValue' node with non-null value was found when trying to read the value of a navigation property") > -1 ) { userFieldMissingID = true; }

            if ( missingColumn ) {
                let err = errMessage;
                statusLog = notify(statusLog, 'Problem processing item', err, null, null, null, null);
                console.log('Issue trying to create this item:', item );
                setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title, 'Items: ' + item.Code, 'Adding Item ' + i + ' of ' + totalItems + '  item', 'Add item ~ 142 + \n' + err);
            }
        }

    }

    return statusLog;
}

