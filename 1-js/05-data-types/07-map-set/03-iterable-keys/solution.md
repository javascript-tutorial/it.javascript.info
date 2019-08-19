
Questo accade perchè `map.keys()` ritorna un oggetto iterabile, non un array.

Possiamo convertirlo in un array utilizzando `Array.from`:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
