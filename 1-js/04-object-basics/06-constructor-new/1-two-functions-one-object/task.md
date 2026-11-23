importance: 2

---

# Due funzioni – un oggetto

E' possibile creare due funzioni `A` e `B` tali che `new A()==new B()`?

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Se pensi che sia possibile, prova a scrivere il codice.
