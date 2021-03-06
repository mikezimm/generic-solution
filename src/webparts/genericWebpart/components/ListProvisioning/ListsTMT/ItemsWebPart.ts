
import { sp } from '@pnp/sp';


import { IAnyArray } from  '../../../../../services/listServices/listServices';

export const SampleComments = 'This item was created for sample purposes.  Please delete me before using!';
import { getRandomInt, getRandomChance, getRandomFromArray, randomDate, generateVals, generateTitles }
    from '@mikezimm/npmfunctions/dist/Services/randomServices';
    
/**
 * Items to create when privisioning the list
 * 
 * NOTE:   Always make the first item in the object be text that can be used to verify if the item was added.
 * 
 */

export const TMTDefaultProjectItems  = [
    { Title: "Training", Everyone: true, Story: 'Training', Chapter: 'Yet more training :)', Category1: { results: ['Training']}},
    { Title: "Category Column Error - not in results", Everyone: true, Story: 'Webpart', Chapter: 'Example', ProjectID1: 'mask=B\\atch99999', ProjectID2: 'My prefix:...', Category1: 'TestWebpart'},
    { TitleX: "Title Column Error", Everyone: true, Story: 'Webpart', Chapter: 'Example', ProjectID1: 'mask=B\\atch99999', ProjectID2: 'My prefix:...', Category1: { results: ['TestWebpart']}},
    { Title: "Email triage", Everyone: true, Story: 'Daily', Chapter: 'Email triage', Category1: { results: ['Daily']}},
    { Title: "Break", Everyone: true, Story: 'Daily', Chapter: 'Break', Category1: { results: ['Daily']}},
    { Title: "Team Meeting", Everyone: true, Story: 'Meetings', Chapter: 'Team Meeting', Category1: { results: ['Meetings']}},
    { Title: "Example for Mask and Prefix in ProjectID columns", Everyone: true, Story: 'Webpart', Chapter: 'Example', ProjectID1: 'mask=B\\atch99999', ProjectID2: 'My prefix:...', Category1: { results: ['TestWebpart']}},

];

function createRandomTimeEntry(qty, user : number[] = []){

    let allItems : IAnyArray = [];

    const stories = ['Story A', 'Story B', 'Story C',null];
    const chapters = ['Chapter 1', 'Chapter 2', 'Chapter 3','Chapter 4', 'Chapter 5', 'Chapter 6',null];
    const category1s = ['Cat A', 'Cat B', 'Cat C']; 
    const category2s = ['Cat 1', 'Cat 2', 'Cat 3'];
    const entryTypes = ['manual','sinceLast','slider','start'];
    const location = ['Office','Customer','Home','Other'];

    for (let i = 0; i < qty ; i++) {
        let thisStory = getRandomFromArray(stories);
        let thisChapter = getRandomFromArray(chapters);

        let start = randomDate(new Date(2020, 0, 1), new Date());
        let randomMinutes = getRandomInt(20, 180) * 60 * 1000;
        let end = new Date(start.getTime() + randomMinutes);

        //Based on intial testing, ID 1 is an account, not a name, ID 2 Title is empty.
        let thisUser = user.length === 0 ? getRandomInt(5,15) : getRandomFromArray(user);
        let leaderUser = user.length === 0 ? getRandomInt(5,15) : getRandomFromArray(user);
        let teamUsers = user.length === 0 ? [getRandomInt(5,15)] : [getRandomFromArray(user),getRandomFromArray(user),getRandomFromArray(user)];

        allItems.push({
            Title: 'Test for user: ' + thisUser + ' - ' + thisStory + ' - ' + thisChapter + ' # ' + i,

            /**
             * NOTE FOR NEXT TIME YOU DO THIS !!!!!!
             * ALWAYS PUT Id After the Single User Field Name here!
             * 
             * https://stackoverflow.com/a/21006981
             * 
             */

            UserId: thisUser,
            LeaderId: leaderUser,
            TeamId: { 'results':teamUsers },

            ProjectID1: 'Proj1: ' + getRandomInt(1,50),
            ProjectID2: 'Proj2: ' + getRandomInt(200,300),
            Story: thisStory,
            Chapter: thisChapter,
            StartTime: start.toLocaleString(),
            EndTime: end.toLocaleString(),
            Category1: { results: [getRandomFromArray(category1s)]},
            Category2: { results: [getRandomFromArray(category2s)]},
            EntryType: getRandomFromArray(entryTypes),
            OriginalStart: start.toLocaleString(),
            OriginalEnd: end.toLocaleString(),
            OriginalHours: randomMinutes / (60000 * 60) * 1 * ( 1 + getRandomChance(0, 30, -20,20)/100 ), // 15% chance that random minutes will be 10-20% higher than original
            Location: getRandomFromArray(location),
            Comments: SampleComments,
            Settings: ''

        });
    }
    return allItems;
}

export function TMTTestTimeItems(currentUser : number[]){

    let allItems = createRandomTimeEntry( 40, currentUser);
    console.log('TMTTestTimeItems:', allItems);
    return allItems;

} 
