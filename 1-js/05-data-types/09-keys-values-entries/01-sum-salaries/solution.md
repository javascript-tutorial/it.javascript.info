```js run demo
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
O, in alternativa, possiamo ottenere la somma utilizzando `Object.values` e `reduce`:

```js
// reduce itera su un array con i salari,
// li sommiamo
// e ritorniamo il risultato
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}
```
