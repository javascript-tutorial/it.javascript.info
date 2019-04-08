importance: 5

---

# Successione di Fibonacci 

La successione di [Fibonacci](https://en.wikipedia.org/wiki/Fibonacci_number) la cui formula è <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. In altre parole, il numero successivo è la somma dei due risultati precedenti.

I primi due numeri sono `1`, poi `2(1+1)`, `3(1+2)`, `5(2+3)` e cosi via: `1, 1, 2, 3, 5, 8, 13, 21...`.

La successione di Fibonacci è in relazione con il [rapporto aureo](https://en.wikipedia.org/wiki/Golden_ratio) e con molti altri fenomeni naturali.

Scrivete una funzione `fib(n)` che ritorna l'`n-esimo` numero della successione di Fibonacci.

Un esempio:

```js
function fib(n) { /* your code */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.S. La funzione dovrebbe essere rapida. La chiamata `fib(77)` non dovrebbe richiedere più di una frazione di secondo.
