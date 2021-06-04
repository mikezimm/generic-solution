
import { sp } from '@pnp/sp';


import { IAnyArray } from  '../../../../../services/listServices/listServices';

export const SampleComments = 'This item was created for sample purposes.  Please delete me before using!';


import {
    Date01Turn,
    Date01TurnCalc,
    Choice01Turn,
    Choice01TurnCalc,
    ItemCategoryTurn,
    ItemCategoryTurnCalc,
    StatusTurn,
    StatusTurnCalc,
    URL01Turn,
    Text01Turn,
    Text01TurnCalc,
    IdNumberTurn,
    IdNumberTurnCalc,
    Number01Turn,
    Number01TurnCalc,
    Number02Turn,
    Number02TurnCalc,
    Number03Turn,
    Number03TurnCalc,
    Number04Turn,
    Number04TurnCalc,
    Number05Turn,
    Number05TurnCalc,
    Number06Turn,
    Number06TurnCalc,
    Number07Turn,
    Number07TurnCalc,
    KPI01TurnCalc,
    KPI02TurnCalc,
    KPI03TurnCalc,
    KPI04TurnCalc,
    KPI05TurnCalc,
  
  } from './columnsTurnover';

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

/**
 * Items to create when privisioning the list
 * 
 * NOTE:   Always make the first item in the object be text that can be used to verify if the item was added.
 * 
 */

function createRandomTurnoverEntry(qty, user : number[] = []){

    let allItems : IAnyArray = [];

    for (let i = 0; i < qty ; i++) {
        let saveItem : any = {};

        saveItem[ ItemCategoryTurn.name ] = getRandomFromArray(ItemCategoryTurn.choices);
        saveItem[ Choice01Turn.name ] = getRandomFromArray(Choice01Turn.choices);
        saveItem[ StatusTurn.name ] = getRandomFromArray(StatusTurn.choices);

        saveItem[ Date01Turn.name ] = randomDate(new Date(2020, 0, 1), new Date());

        saveItem[ Number01Turn.name ] = getRandomChance(0, 20, 1, 100);
        saveItem[ Number02Turn.name ] = getRandomChance(0, 20, 1, 100);
        saveItem[ Number03Turn.name ] = getRandomChance(0, 20, 1, 100);
        saveItem[ Number04Turn.name ] = getRandomChance(0, 20, 1, 100);

        saveItem[ Number05Turn.name ] = getRandomChance(0, 20, 1, 100);
        saveItem[ Number06Turn.name ] = getRandomChance(0, 20, 1, 100);
        saveItem[ Number07Turn.name ] = getRandomChance(0, 20, 1, 100);
        // saveItem[ Number08Turn.name ] = getRandomInt(0, 20, 1, 100);

        allItems.push( saveItem );
    }
    
    return allItems;
}

export function TurnoverItems(currentUser : number[]){

    let allItems = createRandomTurnoverEntry( 40, currentUser);
    console.log('TurnoverItems:', allItems);
    return allItems;

} 
