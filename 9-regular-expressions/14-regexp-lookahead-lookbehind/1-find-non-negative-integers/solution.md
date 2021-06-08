
La regexp per un numero intero è `pattern:\d+`.

Possiamo escludere i numeri negativi anteponendo il segno meno con il lookbehind: `pattern:(?<!-)\d+`.

Anche se, nel caso in cui lo provassimo ora, potremmo notare un altro risultato inatteso:

```js run
let regexp = /(?<!-)\d+/g;

let str = "0 12 -5 123 -18";

console.log( str.match(regexp) ); // 0, 12, 123, *!*8*/!*
```

Come potete osservare trova `match:8` da `subject:-18`. Per escluderlo, dobbiamo assicurarci che la regexp non cominci a cercare una corrispondenza di un numero dalla metà di un altro numero non corrispondente.

Possiamo farlo specificando un altro lookbehind negativo: `pattern:(?<!-)(?<!\d)\d+`. Ora `pattern:(?<!\d)` assicura che la corrispondenza non cominci dopo un altro numero, proprio quello che volevamo.

Potremmo anche unire il tutto in un singolo lookbehind in questo modo:

```js run
let regexp = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```
