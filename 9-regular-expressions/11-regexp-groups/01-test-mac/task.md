# Controllo MAC-address

Il [MAC-address](https://it.wikipedia.org/wiki/Indirizzo_MAC) di un'interfaccia di rete è composto da 6 coppie di cifre esadecimali separati dai due punti.

Per esempio: `subject:'01:32:54:67:89:AB'`.

Scrivi una regexp che controlli se una stringa sia un MAC-address.

Uso:
```js
<<<<<<< HEAD:9-regular-expressions/12-regexp-anchors/2-test-mac/task.md
let reg = /la tua regexp/;
=======
let regexp = /your regexp/;
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa:9-regular-expressions/11-regexp-groups/01-test-mac/task.md

alert( regexp.test('01:32:54:67:89:AB') ); // true

<<<<<<< HEAD:9-regular-expressions/12-regexp-anchors/2-test-mac/task.md
alert( reg.test('0132546789AB') ); // false (non ci sono i due punti)

alert( reg.test('01:32:54:67:89') ); // false (5 coppie, devono essere 6)

alert( reg.test('01:32:54:67:89:ZZ') ) // false (ZZ alla fine)
=======
alert( regexp.test('0132546789AB') ); // false (no colons)

alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, must be 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ ad the end)
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa:9-regular-expressions/11-regexp-groups/01-test-mac/task.md
```
