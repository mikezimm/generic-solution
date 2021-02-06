
import { sp } from '@pnp/sp';


import { IAnyArray } from  '../../../../../services/listServices/listServices';

import { Choice1Periods, Choice2Years, FinTasksFrequencyChoices, FinanceStageChoices , OOTBTaskPriorityChoices, OOTBTaskStatus } from './columnsFinTasks';

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


function createRandomListItem(qty, user : number[] = []){

    let allItems : IAnyArray = [];

    const statuss = ['Story A', 'Story B', 'Story C',null];

    for (let i = 0; i < qty ; i++) {
        let thisStory = getRandomFromArray(statuss);
        let years = getRandomFromArray(Choice1Periods);

        let start = randomDate(new Date(2020, 0, 1), new Date());
        let randomMinutes = getRandomInt(20, 180) * 60 * 1000;

        //Based on intial testing, ID 1 is an account, not a name, ID 2 Title is empty.
        let thisUser1 = user.length === 0 ? getRandomInt(5,15) : getRandomFromArray(user);
        let thisUser2 = user.length === 0 ? getRandomInt(5,15) : getRandomFromArray(user);
        let thisUser3 = user.length === 0 ? getRandomInt(5,15) : getRandomFromArray(user);
        let thisUser4 = user.length === 0 ? getRandomInt(5,15) : getRandomFromArray(user);

        allItems.push({
            Title: 'Test for user: ' + thisUser1 + ' - ' + thisStory + ' - ' + years + ' # ' + i,
            /*            */
            /**
             * NOTE FOR NEXT TIME YOU DO THIS !!!!!!
             * ALWAYS PUT Id After the Single User Field Name here!
             * 
             * https://stackoverflow.com/a/21006981
             * 
             */
            AssignedToId: thisUser1,
            BackupId: thisUser2,
            ReviewerId: thisUser3,
            ReviewerAlternateId: thisUser4,
            Year: getRandomFromArray(Choice2Years),
            Period: getRandomFromArray(Choice1Periods),
            DueDate: start.toLocaleString(),
            ReviewDays: getRandomInt(0, 10),

            Comments: SampleComments,
            Frequency: getRandomFromArray(FinTasksFrequencyChoices),
            Stage: getRandomFromArray( FinanceStageChoices ),
            Priority: getRandomFromArray( OOTBTaskPriorityChoices ),
            Status: getRandomFromArray( OOTBTaskStatus ) ,

        });
    }
    return allItems;
}

export function FinanceTaskItems(currentUser : number[]){

    let allItems = createRandomListItem( 40, currentUser);
    //let returnItems = allItems.concat(userItems);
    //console.log('FinanceTaskItems:', allItems);
    return allItems;

} 
