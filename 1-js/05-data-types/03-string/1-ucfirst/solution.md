Non possiamo "rimpiazzare" il primo carattere, perché in JavaScript le stringhe sono immutabili.

Possiamo invece creare una nuova stringa basata su quella già esistente, con la prima lettera maiuscola:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

<<<<<<< HEAD
C'è comunque un piccolo problema. Se `str` è vuota, allora `str[0]` è undefined, quindi otterremo un errore.
=======
There's a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn't have the `toUpperCase()` method, we'll get an error.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

Ci sono due possibili varianti qui:

1. Utilizzare `str.charAt(0)`, che ritorna sempre una stringa (eventualmente vuota).
2. Aggiungere una verifica di stringa vuota.

Qui abbiamo scelto la seconda variante:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

