importance: 5

---

# Cosa mostrerà setTimeout?

Nel codice qui sotto è pianificata una chiamata con `setTimeout`, poi viene eseguito un calcolo pesante, che richiede più di 100ms per essere completato.

Quando verrà eseguita la funzione pianificata?

1. Dopo il loop.
2. Prima del loop.
3. All'inizio del loop.


Cosa mostrerà l'`alert`?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// ipotizza che il tempo necessario a eseguire questa funzione sia >100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
