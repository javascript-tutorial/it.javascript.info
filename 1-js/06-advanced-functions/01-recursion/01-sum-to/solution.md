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

<<<<<<< HEAD
P.P.S. Lo standard descrive un ottimizzazione: se la chiamata ricorsiva è l'ultima cosa che avviene nella funzione (come in `sumTo`), allora la funzione esterna non ha alcuna necessita di riprende l'esecuzione e non c'è quindi bisogno di memorizzare il contesto d'esecuzione In questo particolare caso `sumTo(100000)` viene risolta. Ma se il motore JavaScript non lo supporta, ci sarà un errore: "maximum stack size exceeded", che indica il raggiungimento del massimo numero di esecuzioni annidate.
=======
P.P.S. Some engines support the "tail call" optimization: if a recursive call is the very last one in the function, with no other calculations performed, then the outer function will not need to resume the execution, so the engine doesn't need to remember its execution context. That removes the burden on memory. But if the JavaScript engine does not support tail call optimization (most of them don't), there will be an error: maximum stack size exceeded, because there's usually a limitation on the total stack size.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
