Come prima cosa, cerchiamo di capire perché il codice non funziona.

La motivazione diventa piuttosto ovvia se proviamo ad eseguire il codice. Un classe che eredita, deve invocare `super()`. Diversamente, il valore di `"this"` non sarà "definito".

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

Anche dopo questo fix, c'è ancora un grande differenza tra `"class Rabbit extends Object"` e `class Rabbit`.

Come già sappiamo, la sintassi "extends" imposta due prototype:

1. Tra `"prototype"` del costruttore (per i metodi).
2. Tra i costruttori stessi (per i metodi statici).

Nel nostro caso, `class Rabbit extends Object` significa:

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

In questo modo, tramite `Rabbit` abbiamo accesso ai metodi statici di `Object`, come nell'esempio:

```js run
class Rabbit extends Object {}

*!*
// normalmente invochiamo Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Ma se non estendiamo l'oggetto, con`extends Object`, allore `Rabbit.__proto__` non sarà impostato a `Object`.

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

In ogni caso, `Function.prototype` possiede metodi "generici", come `call`, `bind` etc. Questi saranno disponibili in ogni caso, grazie al costruttore di `Object`, `Object.__proto__ === Function.prototype`.

Come mostrato in figura:

![](rabbit-extends-object.svg)

Quindi, per riassumere, ci sono due principali differenze:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | dobbiamo invocare `super()` nel costruttore |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
