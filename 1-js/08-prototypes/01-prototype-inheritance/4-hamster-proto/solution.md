Guardiamo attentamente a cosa succende nella chiamata `speedy.eat("apple")`.

1. Il metodo `speedy.eat` viene trovato nel prototype (`=hamster`), eseguito con `this=speedy` (l'oggetto prima del punto).

2. Successivamente `this.stomach.push()` deve trovare la proprietà `stomach` ed invocare `push`. Cerca `stomach` in `this` (`=speedy`), ma non trova nulla.

3. Allora segue la catena del prototype e trova `stomach` in `hamster`.

4. Invoca `push` in `hamster`, aggiungendo il cibo nello *stomaco del prototype*.

Quindi tutti i criceti condividono un unico stomaco!

Per entrambi `lazy.stomach.push(...)` e `speedy.stomach.push()`, la proprietà `stomach` viene trovata nel prototype (poiché non si trova negli oggetti), quindi i cambiamenti avvengono li.

Da notare che questo non accade nel caso di una semplice assegnazione `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // assegnamo a this.stomach invece di this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy trova il cibo
speedy.eat("apple");
alert( speedy.stomach ); // apple

// lo stomaco di Lazy è vuoto
alert( lazy.stomach ); // <nothing>
```

Ora tutto funziona bene, perché `this.stomach=` non deve andare alla ricerca di `stomach`. Il valore è scritto direttamente nell'oggetto `this`.

Possiamo anche evitare completamente il problema, facendo in modo che ogni criceto abbia il suo stoamco:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy trova il cibo
speedy.eat("apple");
alert( speedy.stomach ); // apple

// lo stomaco di Lazy è vuoto
alert( lazy.stomach ); // <nothing>
```

Una soluzione comune, tutte le proprietà che descrivono un particolare stato dell'oggetto, come `stomach`, dovrebbero essere memorizzate nell'oggetto. In questo modo eviteremo il problema.
