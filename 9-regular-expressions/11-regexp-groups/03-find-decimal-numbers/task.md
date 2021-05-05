# Trovate tutti i numeri

Scrivete un'espressione regolare che cerchi tutti i numeri decimali e interi, con virgola mobile e negativi.

Un esempio d'uso:

```js
let regexp = /your regexp/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) ); // -1.5, 0, 2, -123.4
```
