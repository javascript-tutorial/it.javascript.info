Abbiamo bisogno di trovare l'inizio del commento `match:<!--`, e dopo tutto quello che c'è fino a `match:-->`.

Una variante accettabile è `pattern:<!--.*?-->`, il quantificatore lazy fa sì che la ricerca si fermi prima di `match:-->`. Dobbiamo, inoltre, aggiungere il flag `pattern:s` in modo che il punto includa gli a capo.

In caso contrario i commenti multilinea non verranno trovati:

```js run
let regexp = /<!--.*?-->/gs;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
