importance: 5

---

# Il salario massimo

Abbiamo un oggetto `salaries`:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
```

Create la funzione `topSalary(salaries)` che ritorna il nome della persona con il salario maggiore.

- Se `salaries` è vuoto, dovrebbe ritornare `null`.
- Se ci sono più persone con lo stesso salario massimo, ritornatene una.

P.S. utilizzate `Object.entries` e la destrutturazione per iterare sulle coppie chiave/valore.
