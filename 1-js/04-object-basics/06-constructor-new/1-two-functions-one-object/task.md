importance: 2

---

# Due funzioni – un oggetto

<<<<<<< HEAD
E' possibile creare due funzioni `A` e `B` tali che `new A()==new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Se pensi che sia possibile, prova a scrivere il codice.
