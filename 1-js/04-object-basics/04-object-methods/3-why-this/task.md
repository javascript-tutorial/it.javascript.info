importance: 3

---

# Spiegate il valore di "this"

<<<<<<< HEAD
Nel codice sotto vogliamo chiamare il metodo `user.go()`  volte di fila.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

Ma le chiamate `(1)` e `(2)` funzionano diversamente da `(3)` e `(4)`. Perché?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

