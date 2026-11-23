importance: 5

---

# Chiamata di funzione

Qual è il risultato? Perché?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```

