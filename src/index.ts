const world = 'world';

export function hello(whom: string = world) : string {
    return `Hello ${whom}!`;
}

console.log(hello('Richie'));