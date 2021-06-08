# Trovate gli interi non negativi

Data una stringa di numeri interi, create una regexp che cerchi solo quelli non negativi (lo zero è consentito).

Un esempio d'uso:
```js
let regexp = /your regexp/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```
