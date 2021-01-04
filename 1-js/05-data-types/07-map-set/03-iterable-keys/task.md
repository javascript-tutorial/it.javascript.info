importance: 5

---

# Chiavi iterabili

<<<<<<< HEAD
Vogliamo avere un rray di `map.keys()` e poterci lavorare.
=======
We'd like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5

Ma c'è un problema:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

Perchè? Come possiamo sistemare il codice per rendere `keys.push` funzionante?
