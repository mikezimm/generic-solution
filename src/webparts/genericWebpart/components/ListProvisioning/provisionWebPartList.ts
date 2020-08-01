import { Web } from "@pnp/sp/presets/all";

import { sp, Views, IViews } from "@pnp/sp/presets/all";

import { IListInfo, IMyListInfo, IServiceLog } from '../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList, addTheseItemsToListInBatch } from '../../../../services/listServices/listServices';

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

    let result = await addTheseFields(['create','changesFinal'], theList, ensuredList, currentFields, createTheseFields, setProgress, alertMe, consoleLog );

    let result2 = await addTheseViews(['create'],  theList, ensuredList, currentViews, createTheseViews, setProgress, alertMe, consoleLog);

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

        setProgress(false, "I", 0, 0 , '', '', theList.title, 'Adding ITEMS to list: ' + theList.title, 'Checking for ITEMS', 'Add items ~ 101' );
        let createThisBatch : IAnyArray = [];
        //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
        let totalItems = createTheseItems.length;
        let chunk = 3;

        if ( totalItems <= 50 ) {
            result3 = await addTheseItemsToList(theList, thisWeb, createTheseItems, setProgress, true, true);
        } else {
            for (var i=0; i < totalItems; i += chunk) {
                createThisBatch = createTheseItems.slice(i, i+chunk);
                result3 = await addTheseItemsToListInBatch(theList, thisWeb, createThisBatch, setProgress, true, true);
            }
        }



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
