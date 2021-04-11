La soluzione consiste di due parti:

1. Quando `.observe(handler)` viene invocato, dobbiamo memorizzare l'handler da qualche parte, per poter essere in grado di invocarlo più tardi. Possiamo memorizzare gli handler nell'oggetto, utilizzando un symbol come chiave della proprietà.
2. Abbiamo bisogno di un proxy con la trappola `set` per poter invocare gli handlers in caso di cambiamenti.

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Inizializziamo lo store per gli handlers
  target[handlers] = [];

  // Memorizziamo l'handler nell'array per poterlo invocare successivamente
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Creiamo un proxy per gestire le modifiche
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // inoltriamo l'operazione all'oggetto
      if (success) { // se non è stato generato alcun errore durante il cambiamento della proprietà
        // invochiamo tutti gli handlers
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
