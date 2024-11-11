# La soluzione più lenta

Possiamo calcolare tutte le somme possibili.

La via più semplice è di prendere ogni elemento e calcolare la somma di tutti i sotto-array possibili.

Ad esempio, per `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Starting from -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Starting from 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Starting from 3:
3
3 + (-9)
3 + (-9) + 11

// Starting from -9
-9
-9 + 11

// Starting from 11
11
```

Il codice è un ciclo annidato: il ciclo esterno processa tutti gli elementi dell'array, quello interno esegue le somme a partire dall'elemento corrente.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // if we take no elements, zero will be returned

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

La soluzione ha una complessità di [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). In altre parole, se l'array fosse 2 volte più grande, l'algoritmo lavorerebbe 4 volte più lentamente.

<<<<<<< HEAD
Per grandi array (1000, 10000 o più elementi) questi algoritmi possono portare ad enormi attese.
=======
For big arrays (1000, 10000 or more items) such algorithms can lead to serious sluggishness.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

# Soluzione performante

Iniziamo ad esaminare l'array mantenendo la somma parziale degli elementi nella variabile `s`. Se `s` diventa negativa, allora assegniamo `s=0`. La somma di tutte queste `s` sarà la risposta.

Se la risposta vi sembra troppo vaga, date un'occhiata al codice:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

L'algoritmo richiede esattamente uno solo scorrimento dell'array, quindi la complessità è O(n).

<<<<<<< HEAD
Potete trovare maggiori dettagli riguardo l'algoritmo qui: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Se ancora non vi risulta ovvio il funzionamento, esaminate più in dettaglio il codice fornito sopra.
=======
You can find more detailed information about the algorithm here: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). If it's still not obvious why that works, then please trace the algorithm on the examples above, see how it works, that's better than any words.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
