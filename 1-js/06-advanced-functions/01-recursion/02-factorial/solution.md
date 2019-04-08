Per definizione, il fattoriale `n!` può essere riscritto come `n * (n-1)!`.

In altre parole, il risultato di `factorial(n)` può essere calcolato come `n` moltiplicato per il risultato di `factorial(n-1)`. E la chiamata per `n-1` decresce ricorsivamente, fino a `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

La base della ricorsione è il valore `1`. Potremmo anche utilizzare `0` come caso base, non ha molta importanza, ma esegue uno step in più:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
