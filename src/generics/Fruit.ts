import { Grocery } from "./Grocery";

export class Fruit implements Grocery {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}