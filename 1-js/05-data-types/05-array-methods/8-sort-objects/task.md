importance: 5

---

# Riordinare oggetti per età

Scrivete una funzione `sortByAge(users)` che prenda un array di oggetti con proprietà `age` e lo riordini per `age`.

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
