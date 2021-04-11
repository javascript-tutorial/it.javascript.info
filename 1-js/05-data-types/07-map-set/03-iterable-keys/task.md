importance: 5

---

# Chiavi iterabili

Vorremmo avere un array di `map.keys()` in una variabile, quindi potergli applicare un metodo specifico degli arrays, ad esempio `.push`.

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

Perché? Come possiamo sistemare il codice per rendere `keys.push` funzionante?
