importance: 5

---

<<<<<<< HEAD
# Riordinare oggetti

Scrivete una funzione `sortByName(users)` che prenda un array di oggetti con proprietà `name` e lo riordini.
=======
# Sort users by age

Write the function `sortByAge(users)` that gets an array of objects with the `age` property and sorts them by `age`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ad esempio:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// now: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
