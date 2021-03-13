# Errore in lettura di una proprietà non esistente

Solitamente, un tentativo di accesso ad una proprietà non esistente ritorna `undefined`.

Create un proxy che generi un errore ad ogni tentativo di accesso ad una proprietà non esistente.

Questo può aiutare a trovare errori di programmazione in anticipo.

Scrivete una funzione `wrap(target)` che prende un oggetto `target` e ne ritorna un proxy con la funzionalità appena descritta.

Così è come dovrebbbe funzionare:

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* il vostro codice */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // ReferenceError: Property doesn't exist: "age"
*/!*
```
