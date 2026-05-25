/**
 * JavaScript reference topics for the playground (definitions + runnable snippets).
 */
export const jsReferenceTopics = [
  {
    id: "map",
    title: "map()",
    summary: "Creates a new array by transforming each element. Does not mutate the original.",
    note: "Your note is correct. In React you often use map() to turn an array of objects into JSX list items.",
    snippet: `const users = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Lin" },
];

const names = users.map((user) => user.name);
console.log(names); // ["Ada", "Lin"]

// React-style: array of objects → list of elements
// users.map((user) => <li key={user.id}>{user.name}</li>)
names;`,
  },
  {
    id: "some",
    title: "some()",
    summary: "Returns true if at least one element passes the test; otherwise false.",
    note: "Correct: stops as soon as it finds a match.",
    snippet: `const scores = [42, 55, 38, 91];
const hasPassing = scores.some((s) => s >= 50);
console.log(hasPassing); // true

const allBelow30 = scores.some((s) => s < 30);
console.log(allBelow30); // false
hasPassing;`,
  },
  {
    id: "every",
    title: "every()",
    summary: "Returns true only if every element passes the test; false if any one fails.",
    note: "You wrote: \"returns false if any one condition failed\" — that's right. Equivalently: it returns true only when all items pass.",
    snippet: `const ages = [18, 21, 25, 19];
const allAdults = ages.every((age) => age >= 18);
console.log(allAdults); // true

const allOver21 = ages.every((age) => age > 21);
console.log(allOver21); // false (19 fails)
allAdults;`,
  },
  {
    id: "slice",
    title: "slice()",
    summary: "Returns a shallow copy of part of an array. The original array is not changed.",
    note: "Correct. slice(start, end) — end index is not included.",
    snippet: `const fruits = ["apple", "banana", "cherry", "date"];
const middle = fruits.slice(1, 3);
console.log(middle);  // ["banana", "cherry"]
console.log(fruits);  // unchanged — still 4 items
middle;`,
  },
  {
    id: "splice",
    title: "splice()",
    summary: "Changes the array in place (add/remove/replace). Returns an array of removed items.",
    note: "Correct: unlike slice(), splice() mutates the source array.",
    snippet: `const colors = ["red", "green", "blue"];
const removed = colors.splice(1, 1, "yellow"); // at index 1, remove 1, insert "yellow"
console.log(removed); // ["green"]
console.log(colors);  // ["red", "yellow", "blue"] — mutated
colors;`,
  },
  {
    id: "pop",
    title: "pop()",
    summary: "Removes and returns the last element. Mutates the array. Returns undefined if empty.",
    note: "One of the main ways to delete from the end. Changes array.length.",
    snippet: `const stack = ["a", "b", "c"];
const last = stack.pop();
console.log(last);   // "c"
console.log(stack);  // ["a", "b"]

stack.pop();
stack.pop();
console.log(stack.pop()); // undefined (empty)
console.log(stack);       // []
last;`,
  },
  {
    id: "shift",
    title: "shift()",
    summary: "Removes and returns the first element. Mutates the array and shifts other items down.",
    note: "Deletes from the start. Slower on large arrays than pop() because indices are renumbered.",
    snippet: `const queue = ["task-1", "task-2", "task-3"];
const first = queue.shift();
console.log(first);  // "task-1"
console.log(queue);  // ["task-2", "task-3"]

queue.shift();
console.log(queue); // ["task-3"]
first;`,
  },
  {
    id: "array-delete",
    title: "delete array[index]",
    badge: "delete[]",
    summary:
      "The delete operator removes a slot but does not shorten the array — length stays the same and the index becomes empty (hole).",
    note: "Usually avoid delete on arrays. Prefer splice(), pop(), shift(), or filter() for a new array without the item.",
    snippet: `const nums = [10, 20, 30, 40];
delete nums[1]; // removes index 1, does NOT re-pack

console.log(nums);       // [10, empty, 30, 40]
console.log(nums.length); // 4 (unchanged!)
console.log(nums[1]);    // undefined

// Better: remove index 1 and shorten
const cleaned = nums.filter((_, i) => i !== 1);
console.log(cleaned); // [10, 30, 40]

// Or mutate in place:
const items = [10, 20, 30];
items.splice(1, 1);
console.log(items); // [10, 30]
cleaned;`,
  },
  {
    id: "object-delete",
    title: "delete object.property",
    badge: "delete {}",
    summary: "The delete operator removes a property from an object. Returns true if removal succeeded.",
    note: "Only removes own properties. Does not delete array length. For immutable updates in React, prefer destructuring: const { removed, ...rest } = obj.",
    snippet: `const user = { id: 1, name: "Ada", temp: true };

delete user.temp;
console.log(user); // { id: 1, name: "Ada" }
console.log("temp" in user); // false

// Bracket notation for dynamic keys
const key = "draft";
const post = { id: 10, title: "Hi", draft: true };
delete post[key];
console.log(post); // { id: 10, title: "Hi" }

// Immutable pattern (no delete):
const { draft: _, ...published } = { id: 10, title: "Hi", draft: true };
console.log(published);
user;`,
  },
  {
    id: "filter",
    title: "filter()",
    summary: "Returns a new array with elements that pass the condition. Does not mutate the original.",
    note: "Correct.",
    snippet: `const products = [
  { name: "Phone", price: 699 },
  { name: "Case", price: 25 },
  { name: "Laptop", price: 1200 },
];
const affordable = products.filter((p) => p.price < 500);
console.log(affordable.map((p) => p.name)); // ["Case"]
affordable;`,
  },
  {
    id: "find",
    title: "find()",
    summary: "Returns the first element that matches the condition, or undefined if none match.",
    note: "Returns the value, not the index. Use findIndex() for the position, or indexOf() for a simple value search.",
    snippet: `const users = [
  { id: 1, role: "admin" },
  { id: 2, role: "editor" },
  { id: 3, role: "editor" },
];
const firstEditor = users.find((u) => u.role === "editor");
console.log(firstEditor); // { id: 2, role: "editor" }
firstEditor;`,
  },
  {
    id: "index-of",
    title: "indexOf()",
    badge: "indexOf",
    summary:
      "Returns the first index of a value in an array (or string), or -1 if not found. Uses strict equality (===).",
    note: "For objects, indexOf compares by reference, not deep equality. Use findIndex() with a callback to match by property.",
    snippet: `const fruits = ["apple", "banana", "apple", "cherry"];
console.log(fruits.indexOf("banana")); // 1
console.log(fruits.indexOf("apple"));  // 0 (first match only)
console.log(fruits.indexOf("grape"));  // -1 (not found)

// Optional start index: search from position 2
console.log(fruits.indexOf("apple", 2)); // 2
fruits.indexOf("banana");`,
  },
  {
    id: "last-index-of",
    title: "lastIndexOf()",
    badge: "lastIndexOf",
    summary: "Like indexOf(), but searches from the end and returns the last matching index (or -1).",
    note: "Useful for finding the last occurrence. Also works on strings.",
    snippet: `const nums = [10, 20, 10, 30, 10];
console.log(nums.lastIndexOf(10));     // 4
console.log(nums.lastIndexOf(10, 3));  // 2 (search backward from index 3)

const path = "src/components/Button.tsx";
console.log(path.lastIndexOf("/")); // last slash index
nums.lastIndexOf(30);`,
  },
  {
    id: "find-index",
    title: "findIndex()",
    badge: "findIndex",
    summary:
      "Returns the index of the first element that passes a test function, or -1 if none match.",
    note: "Often called \"find index\" — pairs with find(): find() returns the item, findIndex() returns its position.",
    snippet: `const users = [
  { id: 1, role: "viewer" },
  { id: 2, role: "editor" },
  { id: 3, role: "admin" },
];

const editorIndex = users.findIndex((u) => u.role === "editor");
console.log(editorIndex); // 1
console.log(users[editorIndex]); // { id: 2, role: "editor" }

const missing = users.findIndex((u) => u.role === "guest");
console.log(missing); // -1
editorIndex;`,
  },
  {
    id: "find-last-index",
    title: "findLastIndex()",
    badge: "findLastIndex",
    summary: "Returns the index of the last element that passes the test, or -1.",
    note: "ES2023+. Same idea as findIndex(), but searches from the end. Use lastIndexOf() for simple value match without a callback.",
    snippet: `const logs = [
  { level: "info" },
  { level: "warn" },
  { level: "error" },
  { level: "warn" },
];

const lastWarn = logs.findLastIndex((l) => l.level === "warn");
console.log(lastWarn); // 3
console.log(logs[lastWarn]);

const lastError = logs.findLastIndex((l) => l.level === "error");
console.log(lastError); // 2
lastWarn;`,
  },
  {
    id: "at",
    title: "at()",
    summary: "Returns the element at an index, including negative indices (-1 = last item). Does not mutate.",
    note: "Safer than arr[arr.length - 1] for the last item. Does not replace indexOf — it returns the value, not the index.",
    snippet: `const items = ["first", "second", "third"];
console.log(items.at(0));   // "first"
console.log(items.at(1));   // "second"
console.log(items.at(-1));  // "third" (last)
console.log(items.at(-2));  // "second"
console.log(items.at(99));  // undefined

// Old style: items[items.length - 1]
items.at(-1);`,
  },
  {
    id: "reduce",
    title: "reduce()",
    summary: "Reduces the array to a single value using an accumulator. Pass an initial value for safety.",
    note: "Correct. Without an initial value, reduce uses the first element as the seed (risky on empty arrays).",
    snippet: `const numbers = [10, 20, 30];
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 60

const cart = [{ price: 10 }, { price: 25 }];
const total = cart.reduce((acc, item) => acc + item.price, 0);
console.log(total); // 35
total;`,
  },
  {
    id: "includes",
    title: "includes()",
    summary: "Returns true if the array (or string) contains the value. Uses strict equality (===).",
    note: "Correct for arrays. Also works on strings: \"hello\".includes(\"ell\") → true.",
    snippet: `const tags = ["js", "react", "next"];
console.log(tags.includes("react")); // true
console.log(tags.includes("vue"));   // false

const email = "user@test.com";
console.log(email.includes("@")); // true
tags.includes("js");`,
  },
  {
    id: "object-keys",
    title: "Object.keys()",
    summary: "Returns an array of the object's own enumerable string property names (keys).",
    note: "Correct. Related: Object.values(), Object.entries().",
    snippet: `const user = { name: "Vignesh", role: "developer", active: true };
const keys = Object.keys(user);
console.log(keys); // ["name", "role", "active"]

keys.forEach((key) => console.log(key, user[key]));
keys;`,
  },
  {
    id: "promise-all",
    title: "Promise.all()",
    summary: "Runs multiple promises in parallel. Resolves when all succeed; rejects if any one fails.",
    note: "Correct. For \"wait for all, keep partial results on failure\" use Promise.allSettled().",
    snippet: `// Simulated API calls (no real network)
const fetchUser = () => Promise.resolve({ id: 1, name: "Ada" });
const fetchPosts = () => Promise.resolve([{ id: 101, title: "Hello" }]);

Promise.all([fetchUser(), fetchPosts()]).then(([user, posts]) => {
  console.log("User:", user);
  console.log("Posts:", posts);
});

// If one rejects, the whole Promise.all rejects:
// Promise.all([fetchUser(), Promise.reject("fail")])

"Promise.all started — check output above";`,
  },
  {
    id: "sort",
    title: "sort()",
    summary: "Sorts elements in place and returns the same array reference. Default sort converts items to strings.",
    note: "Important: sort() mutates the original array. For numbers or objects, pass a compare function.",
    snippet: `const nums = [10, 2, 30, 1];
nums.sort((a, b) => a - b); // numeric ascending
console.log(nums); // [1, 2, 10, 30]

const people = [
  { name: "Zoe", age: 28 },
  { name: "Amy", age: 22 },
];
people.sort((a, b) => a.age - b.age);
console.log(people.map((p) => p.name)); // ["Amy", "Zoe"]
people;`,
  },
  {
    id: "flat",
    title: "flat()",
    summary: "Returns a new flattened array. Use flat(depth) for deeply nested arrays (default depth is 1).",
    note: "Correct. flatMap() = map() then flat(1) in one step.",
    snippet: `const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]
console.log(nested);           // original unchanged
nested.flat(2);`,
  },
  {
    id: "set",
    title: "Set (not sets())",
    summary: "Set is a built-in object that stores unique values. Spread into an array to remove duplicates.",
    note: "There is no sets() method. Use new Set(array) or [...new Set(array)].",
    snippet: `const withDupes = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(withDupes)];
console.log(unique); // [1, 2, 3]

const set = new Set(["a", "b", "a"]);
console.log(set.size); // 2
unique;`,
  },
  {
    id: "primitives",
    title: "Primitive types",
    summary: "Immutable values stored by value: string, number, boolean, null, undefined, symbol, bigint.",
    note: "You wrote \"bignum\" — the correct name is bigint (e.g. 100n). symbol is also a primitive (ES6+).",
    snippet: `const str = "hello";
const num = 42;
const flag = true;
const empty = null;
let notAssigned; // undefined
const sym = Symbol("id");
const big = 9007199254740991n;

console.log(typeof str, typeof num, typeof flag);
console.log(typeof empty, typeof notAssigned, typeof sym, typeof big);
num;`,
  },
  {
    id: "non-primitives",
    title: "Reference types (non-primitives)",
    summary: "Objects stored by reference — copying assigns a reference to the same heap object unless you clone.",
    note: "Arrays and functions are objects in JavaScript. Dates, Maps, Sets are also reference types.",
    snippet: `const arr = [1, 2, 3];
const obj = { a: 1 };
const fn = (x) => x * 2;

const copy = arr; // same reference, not a new array
copy.push(4);
console.log(arr); // [1, 2, 3, 4] — both point to same array

const clone = [...arr]; // shallow copy of array
console.log(typeof arr, Array.isArray(arr), typeof fn);
clone;`,
  },
  {
    id: "oop",
    title: "OOP concepts",
    summary: "Encapsulation, inheritance, polymorphism, and abstraction — ways to structure and reuse code.",
    note: "Brief overview below; JavaScript uses prototypes and classes (syntactic sugar over prototypes).",
    snippet: `// Encapsulation — bundle data + behavior; hide details
class BankAccount {
  #balance = 0; // private field
  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}

// Inheritance — child extends parent
class SavingsAccount extends BankAccount {
  constructor(interestRate) {
    super();
    this.interestRate = interestRate;
  }
}

// Polymorphism — same interface, different behavior
const accounts = [new BankAccount(), new SavingsAccount(0.05)];
accounts.forEach((a) => a.deposit(100));

// Abstraction — expose simple API, hide complexity
const acc = new BankAccount();
acc.deposit(50);
console.log(acc.getBalance());
acc.getBalance();`,
  },
  {
    id: "spread",
    title: "Spread operator (...)",
    summary: "Expands iterables into elements or object properties — copy, merge, or pass arguments.",
    note: "Not only \"push to new array\" — also merges objects, clones arrays/objects (shallow), and spreads function args.",
    snippet: `const a = [1, 2];
const b = [...a, 3, 4]; // new array
console.log(b); // [1, 2, 3, 4]

const defaults = { theme: "dark", lang: "en" };
const user = { lang: "ta", name: "Dev" };
const settings = { ...defaults, ...user }; // later keys win
console.log(settings);

const nums = [5, 10];
console.log(Math.max(...nums)); // 10
settings;`,
  },
];
