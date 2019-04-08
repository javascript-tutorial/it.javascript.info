La soluzione che utilizza il ciclo:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

La soluzione ricorsiva:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

La soluzione che sfrutta la formula: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. Naturalmente, la formula risulta essere la soluzione più rapida. Arriva al risultato con solamente 3 operazioni, qualsiasi sia `n`. La matematica serve!

La soluzione che utilizza il ciclo è la seconda in termini di velocità. Sia nella soluzione ricorsiva che in quella iterativa sommiamo gli stessi numeri. La ricorsione però coinvolge un gran numero di chiamate annidate e richiede una gestione dei contesti d'esecuzione. Richiede molte più risorse, questo la rende più lenta.

P.P.S. Lo standard descrive un ottimizzazione: se la chiamata ricorsiva è l'ultima cosa che avviene nella funzione (come in `sumTo`), allora la funzione esterna non ha alcuna necessita di riprende l'esecuzione e non c'è quindi bisogno di memorizzare il contesto d'esecuzione In questo particolare caso `sumTo(100000)` viene risolta. Ma se il motore JavaScript non lo supporta, ci sarà un errore: "maximum stack size exceeded", che indica il raggiungimento del massimo numero di esecuzioni annidate.
