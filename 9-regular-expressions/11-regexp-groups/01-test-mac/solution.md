Un numero esadecimale a due cifre è `pattern:[0-9a-f]{2}` (dando per scontato che il flag `pattern:i` sia presente).

Dobbiamo trovare quel numero `NN`, seguito da `:NN` ripetuto 5 volte.

L'espressione regolare è: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Osserviamo, a questo punto, che la corrispondenza dovrebbe catturare tutto il testo: dall'inizio alla fine. A questo scopo racchiudiamo il pattern all'interno di `pattern:^...$`.

Quindi:

```js run
let regexp = /^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (non ci sono i due punti)

alert( regexp.test('01:32:54:67:89') ); // false (5 numeri invece di 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ alla fine)
```
