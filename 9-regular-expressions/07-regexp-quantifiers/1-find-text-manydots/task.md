Importanza: 5

---

#  Come trovare i puntini di sospensione "..." ?

Si crei un'espressione regolare che individui i puntini di sospensione: 3 (o più) punti in fila

Prova:

```js
let reg = /la tua regex/g;
alert( "Ciao!... come va?.....".match(reg) ); // ..., .....
```
