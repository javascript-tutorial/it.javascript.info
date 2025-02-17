importance: 5

---

# Create una nuova Calculator

Scrivete un costruttore `Calculator` che crea oggetti con 3 metodi:

<<<<<<< HEAD
- `read()` richiede due valori utilizzando `prompt` e li memorizza nelle proprietà dell'oggetto.
- `sum()` ritorna la somma delle proprietà.
- `mul()` ritorna il prodotto delle proprietà.
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Ad esempio:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
