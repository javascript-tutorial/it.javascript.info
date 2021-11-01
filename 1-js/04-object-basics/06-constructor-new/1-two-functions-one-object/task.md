importance: 2

---

# Due funzioni – un oggetto

<<<<<<< HEAD
E' possibile creare due funzioni `A` e `B` tali che `new A()==new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 6989312841d843f2350803ab552d9082437be569

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Se pensi che sia possibile, prova a scrivere il codice.
