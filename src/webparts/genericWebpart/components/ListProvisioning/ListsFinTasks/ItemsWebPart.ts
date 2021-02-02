
import { sp } from '@pnp/sp';


import { IAnyArray } from  '../../../../../services/listServices/listServices';

export const SampleComments = 'This item was created for sample purposes.  Please delete me before using!';

/**
 * https://stackoverflow.com/a/1527820
 * 
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gets a default number or a random chance to get number in range
 * @param def 
 * @param chanceOther Enter whole number for %....  chanceOther = 49 for 49% Chance of getting number outside of default
 * @param min 
 * @param max 
 */
function getRandomChance(def: number, chanceOther: number, min: number, max: number,  ){

    let result = def;
    let thisChance = getRandomInt(1,100);
    //console.log('getRandomChance', thisChance);
    if ( thisChance <= chanceOther ) {
        //Get a randomized number instead of default
        return getRandomInt(min,max);
    } else {
        return def;
    }

}

function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


function createRandomTimeEntry(qty, user = null){

    let allItems : IAnyArray = [];

    const statuss = ['Story A', 'Story B', 'Story C',null];
    const years = ['Chapter 1', 'Chapter 2', 'Chapter 3','Chapter 4', 'Chapter 5', 'Chapter 6',null];
    const periods = ['manual','sinceLast','slider','start'];
    const category1s = ['Cat A', 'Cat B', 'Cat C']; 
    const category2s = ['Cat 1', 'Cat 2', 'Cat 3'];

    const location = ['Office','Customer','Home','Other'];

    for (let i = 0; i < qty ; i++) {
        let thisStory = getRandomFromArray(statuss);
        let thisChapter = getRandomFromArray(years);

        let start = randomDate(new Date(2020, 0, 1), new Date());
        let randomMinutes = getRandomInt(20, 180) * 60 * 1000;
        let end = new Date(start.getTime() + randomMinutes);

        //Based on intial testing, ID 1 is an account, not a name, ID 2 Title is empty.
        let thisUser = user === null ? getRandomInt(3,8) : user;

        allItems.push({
            Title: 'Test for user: ' + thisUser + ' - ' + thisStory + ' - ' + thisChapter + ' # ' + i,
            UserId: thisUser,
            ProjectID1: 'Proj1: ' + getRandomInt(1,50),
            ProjectID2: 'Proj2: ' + getRandomInt(200,300),
            Story: thisStory,
            Chapter: thisChapter,
            StartTime: start.toLocaleString(),
            EndTime: end.toLocaleString(),
            Category1: { results: [getRandomFromArray(category1s)]},
            Category2: { results: [getRandomFromArray(category2s)]},
            EntryType: getRandomFromArray(periods),
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

export function TMTTestTimeItems(currentUser){

    let allItems = createRandomTimeEntry( 10, null);
    let userItems = createRandomTimeEntry( 20, currentUser.Id);
    let returnItems = allItems.concat(userItems);
    console.log('TMTTestTimeItems:', returnItems);
    return returnItems;

} 
