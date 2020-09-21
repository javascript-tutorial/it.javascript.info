importance: 5

---

# Oggetto contatore

Qui l'oggetto contatore viene creato con il costruttore.

Funziona? Cosa mostra?

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

