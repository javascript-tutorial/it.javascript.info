Importanza: 5

---

#  Come trovare i puntini di sospensione "..." ?

Si crei un'espressione regolare che individui i puntini di sospensione: 3 (o più) punti in fila

Prova:

```js
<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/1-find-text-manydots/task.md
let reg = /la tua regex/g;
alert( "Ciao!... come va?.....".match(reg) ); // ..., .....
=======
let regexp = /your regexp/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779:9-regular-expressions/09-regexp-quantifiers/1-find-text-manydots/task.md
```
