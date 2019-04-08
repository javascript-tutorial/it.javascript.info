importance: 5

---

# Sommare tutti i numeri fino a quello dato

Scrivete una funzione `sumTo(n)` che calcola la somma dei numeri `1 + 2 + ... + n`.

Ad esempio:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

Scrivete 3 diverse varianti della soluzione:

1. Utilizzando un ciclo for.
2. Utilizzando la ricorsione, poiché `sumTo(n) = n + sumTo(n-1)` per `n > 1`.
3. Utilizzate la formula della [progressione aritmetica](https://en.wikipedia.org/wiki/Arithmetic_progression).

Un esempio:

```js
function sumTo(n) { /*... your code ... */ }

alert( sumTo(100) ); // 5050
```

P.S. Quale soluzione risulta essere la più rapida? La più lenta? Perché?

P.P.S. Possiamo utilizzare la ricorsione per calcolare `sumTo(100000)`? 
