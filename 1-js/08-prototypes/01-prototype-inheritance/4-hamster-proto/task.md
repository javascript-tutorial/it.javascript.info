importance: 5

---

# Perché entrabi i criceti sono sazi?

Abbiamo due criceti: `speedy` e `lazy`, che erditano dall'oggetto `hamster`. 

Quando nutriamo uno di loro, anche l'altro è sazio. Perché? Come possiamo sistemare?

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Questo ha trovato il cibo
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Anche questo lo ha ricevuto, perché? provate a sistemarlo
alert( lazy.stomach ); // apple
```

