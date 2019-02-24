importance: 4

---

# Ottenere l'età media+

Scrivete una funzione `getAverageAge(users)` che prende un array di oggetti con la proprietà `age` e ritorni l'età media.

La formula della media è: `(age1 + age2 + ... + ageN) / N`.

Ad esempio:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```

