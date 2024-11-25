Come prima cosa, cerchiamo di capire perché il codice non funziona.

La motivazione appare piuttosto ovvia se proviamo ad eseguire il codice. Un classe che eredita, deve invocare `super()`. Diversamente, il valore di `"this"` non sarà "definito".

Vediamo come sistemarlo:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // dobbiamo chiamare il costruttore padre della classe da cui stiamo ereditando
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

Ma non è tutto.

<<<<<<< HEAD
Anche dopo questo fix, c'è ancora un grande differenza tra `"class Rabbit extends Object"` e `class Rabbit`.
=======
Even after the fix, there's still an important difference between `"class Rabbit extends Object"` and `class Rabbit`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Come già sappiamo, la sintassi "extends" imposta due prototype:

1. Tra `"prototype"` del costruttore (per i metodi).
2. Tra i costruttori stessi (per i metodi statici).

<<<<<<< HEAD
Nel nostro caso, `class Rabbit extends Object` significa:
=======
In the case of `class Rabbit extends Object` it means:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

<<<<<<< HEAD
In questo modo, tramite `Rabbit` abbiamo accesso ai metodi statici di `Object`, come nell'esempio:
=======
So `Rabbit` now provides access to the static methods of `Object` via `Rabbit`, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
class Rabbit extends Object {}

*!*
// normalmente invochiamo Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Ma se non estendiamo l'oggetto, con`extends Object`, allora `Rabbit.__proto__` non sarà impostato a `Object`.

Qui una demo:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // come qualsiasi funzione di default

*!*
// errore, funzione non esistente in Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

Quindi `Rabbit`, in questo caso, non fornisce l'accesso ai metodi statici di `Object`.

<<<<<<< HEAD
In ogni caso, `Function.prototype` possiede metodi "generici", come `call`, `bind` etc. Questi saranno disponibili in entrambi i casi, grazie al costruttore di `Object`, `Object.__proto__ === Function.prototype`.
=======
By the way, `Function.prototype` also has "generic" function methods, like `call`, `bind` etc. They are ultimately available in both cases, because for the built-in `Object` constructor, `Object.__proto__ === Function.prototype`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Come mostrato in figura:

![](rabbit-extends-object.svg)

Quindi, per riassumere, ci sono due principali differenze:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | dobbiamo invocare `super()` nel costruttore |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
