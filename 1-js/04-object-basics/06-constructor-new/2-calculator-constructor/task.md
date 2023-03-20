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
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

Ad esempio:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
