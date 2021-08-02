import { Cereal } from "./Cereal";
import { Fruit } from "./Fruit";
import { lookFor, lookForAnyGrocery, lookForCereal, lookForFruits, lookForGrocery } from "./shopper";
import { StockClerk } from "./StockClerk";

//
// ------------- SHOPPING LIST --------------
//

/*
- Shopping Cart: Data types and Dynamic typing 
- Item 1: Buying Groceries
- Item 2: Generic Methods
- Item 3: Generic Classes
- Checkout
- Receipt
*/

//
// ----------- Shopping Cart: Data types and Dynamic typing -----------
//

/*
Data typing is a foundation of computer science and programming.
It allows the computer and the programmer to know how data can
be operated and manipulated on.

We've worked with basic data types i.e. integers, longs and strings.
And we've created more complex data types by composing and combining 
basic ones. I.e. Classes and Structs.

All languages use data types, however some languages allow the programmers
to be implicit about the types, or force them to be explicit. 
Languages that allow the implicit typing are called dynamically typed languages
and the opposite are called statically typed languages.

E.g. of dynamically typed languages: Javascript, Groovy, Python
E.g. of statically typed languages:  Typescript, Java, C
*/

/*
There are a number of pros and cons of each type of language, and it'd be 
out of scope to discuss all of them here.

One advantage of statically typed languages is that they provide us compile-time
type safety. In layman terms, it prevents bugs that would be caused by type mismatches.

E.g. Trying to add a number to a word, or trying to feed a Person pet food. 

The purpose of this presentation is to talk about Generics in statically typed languages
and how they can help us write more robust code. 

Since Typescript is statically typed language that supports Generics, we'll be 
using it for this demo, but the concepts are not solely in Typescript. They'll
be transferable to any language which supports Generics. I.e Java, C#, Rust. 
*/

//
// ----------- Item 1: Buying Groceries -----------
//
/*
Let's imagine we in the supermarket looking for fruits.
*/
const fruitsToLookFor: Fruit[] = [
    new Fruit('Apples'),
    new Fruit('Bananas')
];

const foundFruits = lookForFruits(fruitsToLookFor);
console.log(foundFruits);

/*
Ok, simple enough. But we need a balanced breakfast, 
so let's also look for some cereals. 
*/
const cerealsToLookFor: Cereal[] = [
    new Cereal('Pops', 100),
    new Cereal('Lucky Charms', 200),
    new Cereal('Great Value', 50), // It's ok to buy generic brands :)
];

const foundCereal = lookForCereal(cerealsToLookFor);
console.log(foundCereal);

/*
Thankfully, that was also simple. 
But being observant and great engineers, we realize that
the lookForFruits and lookForCereal functions are almost identical.
B/c we're great engineers and we want to follow 
the Don't Repeat Yourself (DRY) principle we're going to 
do some refactoring.
*/

/*
Our first attempt will be to change the methods from
Fruits and Cereals to be Any. Let's see how that works out.
*/
const groceriesToLookFor: any[] = [
    new Fruit('Grapes'),
    new Cereal('Frosted Flakes', 200)
];

const foundGroceries = lookForAnyGrocery(groceriesToLookFor);
console.log(foundGroceries);

/*
Nice, that worked! But is this the safest way for us to accomplish this?
Let's see what happens if we call the method with something other
than a grocery. 
*/

const numbersToLookFor: number[] = [1, 2, 42]; // Potentcial Malicious Code

// Remember that lookForAnyGrocery is expecting the object to have a
// name property. Numbers don't have that property
const foundNumbers = lookForAnyGrocery(numbersToLookFor);
console.log(foundNumbers);

/*
Whoops. Luckily this didn't crash our program, but we see that
'undefined' was printed out. That's not behavior we want.
*/

/*
Ideally, we should strive to narrow our scopes as much as possible.
Whether it be variable visibilites, security access, etc. The same
principle applies to data typing. We want the type to be flexible
enough to support possibilities within it's range, but not too
board to allow mismatches.

Let's see how we can refactor the method to use Generics.
*/

//
// ----------- Item 2: Generic Methods -----------
//

/*
What are Generics? They're a language feature which 
allows functions and classes to be used with various data types.

In the above examples, we noticed that the lookForAnyGrocery function
would work with any datatype, but we lacked safety, b/c if we pass 
in arguments that don't have a name property, we'd get undefined.

Let's refactor the method to use generics.
 */
const foundFruitsPt2 = lookFor<Fruit>(fruitsToLookFor);
console.log(foundFruitsPt2);

const foundCerealPt2 = lookFor<Cereal>(cerealsToLookFor);
console.log(foundCerealPt2);

// N.B. The compiler and IDE will catch the below error for us
// const foundNumbersPt2 = lookFor<Number>(cerealsToLookFor);
// console.log(foundNumbersPt2);

/*
Note how we're able to pass in the data type we want to look for
by specifying it within the <>. 
*/

/*
We were able to make the function generic, but we notice an
issue when we run the code. Instead of "Found {name}" being
returned, we're getting "Found object Object".

That's because the type T in our lookFor function doesn't
know that type T should have a name property. What we'd
like is for us to tell the lookFor function: 
"Hey, I want you do be able to look ANYTHING that's a grocery".

Well turns out that we can. Let's look at the syntax to do so.
*/

/*
First, let's create an interface called Grocery. 
Then we'll use the keyword extends to tell the function
to allow any type that is a Grocery. 
*/
const foundFruitsPt3 = lookForGrocery<Fruit>(fruitsToLookFor);
console.log(foundFruitsPt3);

const foundCerealPt3 = lookForGrocery<Cereal>(cerealsToLookFor);
console.log(foundCerealPt3);

/* 
Awesome it works. Now in the future if someone decides to add more Groceries
we won't have to modify the lookForGrocery method. Write once, and reuse often
is an aspect we should aim for when we're writing code.
*/

//
// ----------- Item 3: Generic Classes -----------
//

/*
Ok so far we've seen how we can use generics with methods,
but wait there's more. We can also use Generics with classes.
This allows us reuse code effectively. 
Let's take a look at an example.
*/
const clerk = new StockClerk<Cereal>();
cerealsToLookFor.forEach(it => clerk.stackItem(it));

console.log('The items on the stack are:');
console.log(clerk.getItems());

const removedItem = clerk.removeItem();
console.log('\nThe clerk removed');
console.log(removedItem);

console.log('\nThe items on the stack are:');
console.log(clerk.getItems());

const numClerk = new StockClerk<number>();
[1,2,3,4].forEach(num => numClerk.stackItem(num));
console.log('\nThe numbers on the stack are:');
console.log(numClerk.getItems());

//
// ----------- Checkout ------------
//
/*
To wrap up, we discussed the following:
1. Data Types and how languages use them
2. How generic methods can be created to reduce duplicate code
3. How classes can be made generic as well

There is more that we can do with Generics i.e. having
multiple data types for methods, or more specific extends i.e.
<T extends {name: string}>. 

This presentation was intended an introduction to Generics,
and I suggest learning more about how they work and when
to use them.

Thanks for your time :)
 */

//
// ----------- Receipt ------------
//
/*
- https://www.digitalocean.com/community/tutorials/typescript-generics-in-typescript
- https://www.typescriptlang.org/docs/handbook/2/generics.html
- https://www.youtube.com/watch?v=IOzkOXSz9gE
 */