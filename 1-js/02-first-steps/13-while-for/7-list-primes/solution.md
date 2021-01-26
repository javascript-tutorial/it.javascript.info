Ci sono diversi possibili algoritmi per il nostro scopo.

Usiamo un ciclo annidato:

```js
For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

Il codice usa un'etichetta:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // per ogni i...

  for (let j = 2; j < i; j++) { // controlla i suoi divisori..
    if (i % j == 0) continue nextPrime; // se è divisibile per uno di essi, non è un numero primo; passa a prossima iterazione
  }

  alert( i ); // un numero primo
}
```

Ci sono molti modi per ottimizzare questo algoritmo. Ad esempio, potremmo controllare i divisori di `2` fino alla radice di `i`. In ogni caso, se vogliamo essere veramete efficenti su grandi intervalli, abbiamo bisogno di cambiare approcio ed affidarci ad algoritmi matematici più avanzati e complessi, come [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.
