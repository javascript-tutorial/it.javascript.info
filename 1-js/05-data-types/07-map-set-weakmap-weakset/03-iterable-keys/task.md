importance: 5

---

# Chiavi iterabili

Vogliamo avere un rray di `map.keys()` e poterci lavorare.

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
