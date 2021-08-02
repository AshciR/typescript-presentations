import { Grocery } from "./Grocery";

export class Cereal implements Grocery {
    readonly name: string;
    readonly calories: number;

    constructor(name: string, calories: number) {
        this.name = name;
        this.calories = calories;
    }
}