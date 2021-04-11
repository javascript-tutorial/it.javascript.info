Dobbiamo cercare il carattere `#` seguito da 6 cifre esadecimalis.

Possiamo descrivere una cifra esadecimale con il `pattern:[0-9a-fA-F]`, oppure, usando il flag `i` possiamo usare `pattern:[0-9a-f]`.

Dunque si cerchino 6 pattern usando il quantificatore `pattern:{6}`.

Il risultato sar� l'espressione regolare: `pattern:/#[a-f0-9]{6}/gi`.

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(regexp) );  // #121212,#AA00ef
```

Il problema � che cos� si trova il colore anche in sequenze pi� lunghe di 6 caratteri:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456
```

Per sisolvere tale problema si pu� aggiungere `pattern:\b` in coda all'espressione:

```js run
// Un valore corrispondente colore
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// Un valore non corrispondente a un colore
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```
