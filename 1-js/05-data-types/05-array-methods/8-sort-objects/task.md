importance: 5

---

# Riordinare oggetti

Scrivete una funzione `sortByName(users)` che prenda un array di oggetti con proprietà `name` e lo riordini.

Ad esempio:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ john, pete, mary ];

sortByName(arr);

// now: [john, mary, pete]
alert(arr[1].name); // Mary
```

