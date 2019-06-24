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

<<<<<<< HEAD
Questo avviene perché le regole che impostano `this` non guardano agli oggetti letterali. 

Qui il valore di `this` dentro `makeUser()` è `undefined`, perchè viene chiamato come una funzione, non come un metodo.

E gli oggetti letterali non hanno alcun effetto su `this`. Il valore di `this` è unico per tutta la funzione, quindi i blocchi di codice e gli oggetti letterali non hanno alcuna importanza.
=======
That's because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with "dot" syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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

<<<<<<< HEAD
Ora funziona, perché `user.ref()` è un metodo. E il valore di `this` viene impostato all'oggetto prima del punto `.`.


=======
Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
