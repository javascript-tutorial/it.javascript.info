importance: 2

---

# Due funzioni – un oggetto

<<<<<<< HEAD
E' possibile creare due funzioni `A` e `B` tali che `new A()==new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Se pensi che sia possibile, prova a scrivere il codice.
