Un numero positivo con una parte decimale opzionale è: `pattern:\d+(\.\d+)?`.

Aggiungiamo all'inizio il segno meno facoltativo `pattern:-`:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
