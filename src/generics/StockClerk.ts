/**
 * A stock clerk is someone 
 * who can stack various items 
 * in the warehouse
 */
export class StockClerk<T> {

    private items: T[] = [];

    getItems(): T[] {
        // Returning a copy of the array b/c we advocate for immutable programming
        return [...this.items];
    }

    /**
     * Adds a new item to the top of the stack
     * @param item the item to be added
     * @returns the number of items in the stack
     */
    stackItem(item: T): number {
        return this.items.push(item);
    }

    /**
     * Removes the item from on top of the stack
     * @returns the item on top of the stack
     */
    removeItem() {

        if (this.items.length < 1) {
            throw new Error('Can not remove items from  an empty stack');
        }

        return this.items.pop();
    }
}