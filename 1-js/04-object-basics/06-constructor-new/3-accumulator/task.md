importance: 5

---

# Create un nuovo Accumulator

Scrivete un costruttore `Accumulator(startingValue)`.

L'oggetto che viene creato dovrebbe:

- Salvare il "valore corrente" nella proprietà `value`. Il valore di partenza viene impostato prendendo il valore passato all'argomentto del costruttore `startingValue`.
- Il metodo `read()` dovrebbe richiedere tramite `prompt` un numero e sommarlo a `value`.

In altre parole, la proprietà `value` è la somma di tutti i numeri inseriti dall'utente partendo dal valore iniziale `startingValue`.

Qui una demo del codice:

```js
let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values
```

[demo]
