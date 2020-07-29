import { Web } from "@pnp/sp/presets/all";

import { sp, Views, IViews } from "@pnp/sp/presets/all";

import { IListInfo, IMyListInfo, IServiceLog } from '../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList } from '../../../../services/listServices/listServices';

import { IFieldLog, addTheseFields } from '../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { TMTProjectFields, TMTTimeFields} from './columnsWebPart'; //Import column arrays (one file because both lists use many of same columns)

import { projectViews} from './viewsParentList';  //Import view arrays for Project list

import { timeViewsFull } from './viewsChildList'; //Import view arrays for Time list

import { TMTDefaultProjectItems, TMTTestTimeItems, IAnyArray } from './ItemsWebPart'; // Import items to create in the list

import { IMyProgress } from '../IReUsableInterfaces';

export async function provisionTheList( listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{

    let statusLog : IServiceLog[] = [];
    let createTheseFields : IMyFieldTypes[] = [];
    let createTheseViews : IMyView[] = [];
    let createTheseItems : IAnyArray = [];

    let alertMe = false;
    let consoleLog = false;

    let theList = {
        title: listName,
        desc: 'Update List Description below',
        template: 100,
        enableContentTypes: true,
        additionalSettings: { EnableVersioning: true, MajorVersionLimit: 50, OnQuickLaunch: true },
      };

    if (listDefinition === 'ParentListTitle') {
        theList.desc = 'ParentListTitle list for this Webpart';
        createTheseFields = TMTProjectFields();
        createTheseViews = projectViews;
        createTheseItems = TMTDefaultProjectItems;

    } else if (listDefinition === 'ChildListTitle') {
        theList.desc = 'ChildListTitle list for this Webpart';
        createTheseFields = TMTTimeFields();
        createTheseViews = timeViewsFull;

        let currentUser = await sp.web.currentUser.get();
        createTheseItems = TMTTestTimeItems(currentUser);

    }

    const thisWeb = Web(webURL);
    const ensuredList = await thisWeb.lists.ensure(theList.title);
    const listFields = ensuredList.list.fields;
    const listViews = ensuredList.list.views;

    let fieldsToGet = createTheseFields.map ( thisField => {
        return thisField.name;
    });

    let fieldFilter = "StaticName eq '" + fieldsToGet.join("' or StaticName eq '") + "'";

    console.log('fieldFilter:', fieldFilter);

    const  currentFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter(fieldFilter).get();

    const  currentViews = await listViews.get();

    console.log(theList.title + ' list fields and views', currentFields, currentViews);

    alert('Still need to check:  Set Title in onCreate,  changesFinal - hidding original fields and setting and why Hours calculated is single line of text');

    let progress : IMyProgress = {
        label: 'Adding FIELDS to list: ' + theList.title,
        description: 'Checking for FIELDS',
        percentComplete: 0,
        progressHidden: false,
    };

    setProgress(progress);
    /*
*/
    let result = await addTheseFields(['create','changesFinal'], theList, ensuredList, currentFields, createTheseFields, setProgress, alertMe, consoleLog );

    //let testViews = projectViews;
    //alert('adding Views');

    progress = {
        label: 'Adding VIEWS to list: ' + theList.title,
        description: 'Checking for VIEWS',
        percentComplete: 0,
        progressHidden: false,
    };

    setProgress(progress);
    /*
    */

    let result2 = await addTheseViews(['create'],  theList, ensuredList, currentViews, createTheseViews, alertMe, consoleLog);

    let result3 = null;

    let createItems: boolean = false;
    if (listDefinition === 'ParentListTitle') {
        //Auto create new items
        createItems = true;

    } else {
        //let confirmItems = confirm("We created your list, do you want us to create some sample Time entries so you can see how it looks?")
        if (confirm("We created your list, do you want us to create some sample Time entries so you can see how it looks?")) {
            //You pressed Ok, add items
            createItems = true;
          }
    }

    if ( createItems === true ) {
              
        progress = {
            label: 'Adding ITEMS to list: ' + theList.title,
            description: 'Checking for ITEMS',
            percentComplete: 0,
            progressHidden: false,
        };
    
        setProgress(progress);
        /*
        */
        result3 = await addTheseItemsToList(theList, thisWeb, createTheseItems, true, true);
        if (listDefinition === 'ParentListTitle') {
            alert(`Oh... One more thing... We created a few generic Projects under the EVERYONE Category to get you started.  Just refresh the page and click on that heading to see them.`);
        } else {
            alert(`All Test Data present and accounted for!  Don't forget to clear it before you start using this webpart for real!`);
        }


      }
      /*
      progress = {
        label: '',
        description: '',
        percentComplete: 0,
        progressHidden: true,
    };

    setProgress(progress);
    */
    return statusLog;

}
