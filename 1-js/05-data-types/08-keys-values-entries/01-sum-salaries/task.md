importance: 5

---

# Sommare le proprietà

Abbiamo un oggetto `salaries` con un numero arbitrario di salari. 

Scrivete la funzione `sumSalaries(salaries)` che ritorna la somma di tutti i salari utilizzando `Object.values` e il ciclo `for..of`.

Se `salaries` è vuoto, allora il risultato deve essere `0`.

Ad esempio:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

