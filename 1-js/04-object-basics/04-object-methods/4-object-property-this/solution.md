**Risposta: un errore.**

Provate:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

Questo avviene perché le regole che impostano `this` non guardano agli oggetti letterali. 

Qui il valore di `this` dentro `makeUser()` è `undefined`, perchè viene chiamato come una funzione, non come un metodo.

E gli oggetti letterali non hanno alcun effetto su `this`. Il valore di `this` è unico per tutta la funzione, quindi i blocchi di codice e gli oggetti letterali non hanno alcuna importanza.

Quindi `ref: this` prende il `this` della funzione.

Qui abbiamo il caso opposto:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

Ora funziona, perché `user.ref()` è un metodo. E il valore di `this` viene impostato all'oggetto prima del punto `.`.


