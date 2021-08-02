import { Cereal } from "./Cereal";
import { Fruit } from "./Fruit";
import { Grocery } from "./Grocery";

/**
 * Allows a shopper to find fruits in the market.
 * @param fruits list of fruits to be found
 * @returns the fruits after they've been found
 */
export const lookForFruits = (fruits: Fruit[]): string[] => {

    const foundFruits = fruits.map(it => `Found ${it.name}`);
    return foundFruits;
}

/**
 * Allows a shopper to find cereal in the market.
 * @param cereal list of cereal to be found
 * @returns the cereal after they've been found
 */
export const lookForCereal = (cereal: Cereal[]): string[] => {

    const foundCereal = cereal.map(it => `Found ${it.name}`);
    return foundCereal;
}

/**
 * Allows a shopper to find any grocery in the market.
 * @param groceries list of groceries to be found
 * @returns the groceries after they've been found
 */
export const lookForAnyGrocery = (groceries: any[]): string[] => {

    const foundGroceries = groceries.map(it => `Found ${it.name}`);
    return foundGroceries;
}

/**
 * Generic method that will find anything you're looking for.
 * @param things The things you want to look for
 * @returns the things after they've been found
 */
export const lookFor = <T>(things: T[]): string[] => {

    const foundThings = things.map(it => `Found ${it}`);
    return foundThings;
}

/**
 * Allows a shopper to find any grocery in the market.
 * @param groceries list of groceries to be found
 * @returns the groceries after they've been found
 */
export const lookForGrocery = <T extends Grocery>(groceries: T[]): string[] => {

    //N.B. now we're guarenteed that the input will have a name property
    const foundGroceries = groceries.map(it => `Found ${it.name}`);
    return foundGroceries;
}