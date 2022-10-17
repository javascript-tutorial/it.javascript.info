Non possiamo "rimpiazzare" il primo carattere, perché in JavaScript le stringhe sono immutabili.

Possiamo invece creare una nuova stringa basata su quella già esistente, con la prima lettera maiuscola:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

C'è comunque un piccolo problema. Se `str` è vuota, allora `str[0]` è `undefined`, quindi otterremo un errore.

<<<<<<< HEAD
Ci sono due possibili varianti qui:

1. Utilizzare `str.charAt(0)`, che ritorna sempre una stringa (eventualmente vuota).
2. Aggiungere una verifica di stringa vuota.

Qui abbiamo scelto la seconda variante:
=======
The easiest way out is to add a test for an empty string, like this:
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
