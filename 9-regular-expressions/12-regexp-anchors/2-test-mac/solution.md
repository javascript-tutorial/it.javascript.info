Una coppia di cifre esadecimali è `pattern:[0-9a-f]{2}` (assumendo che la flag `pattern:i` sia abilitata).

Abbiamo bisogno di quella coppia `NN`, e dopo `:NN` ripetuto per 5 volte (altre coppie);

La regexp è: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Ora dimostriamo che la corrispondenza catturi tutto il testo: che inizi con l'indirizzo MAC e finisca al suo termine. Otteniamo questo risultato circondando il pattern da `pattern:^...$`.

Infine:

```js run
let reg = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

alert( reg.test('01:32:54:67:89:AB') ); // true

alert( reg.test('0132546789AB') ); // false (non ci sono i due punti)

alert( reg.test('01:32:54:67:89') ); // false (5 numeri, devono essere 6)

alert( reg.test('01:32:54:67:89:ZZ') ) // false (ZZ alla fine)
```
