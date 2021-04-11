**Risposta: un errore.**

Provate:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

Questo avviene perché le regole che impostano `this` non guardano agli oggetti letterali. 

Qui il valore di `this` dentro `makeUser()` è `undefined`, perché viene chiamato dentro una funzione, non un metodo.

Gli oggetti letterali non hanno alcun effetto su `this`. Il valore di `this` è unico per tutta la funzione, quindi i blocchi di codice e gli oggetti letterali che vi si trovano dentro non hanno alcuna importanza.

Quindi `ref: this` prende il `this` della funzione.

Possiamo riscrivere la funzione e ritornare lo stesso `this` con valore `undefined`: 

```js run
function makeUser(){
  return this; // questa volta non c'e' un oggetto letterale
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
Come possiamo vedere, il risultato di  `alert( makeUser().name )` è lo stesso di `alert( user.ref.name )` nell'esempio precedente.

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
}

let user = makeUser();

alert( user.ref().name ); // John
```

Ora funziona, perché `user.ref()` è un metodo. E il valore di `this` si riferisce all'oggetto prima del punto `.`.


