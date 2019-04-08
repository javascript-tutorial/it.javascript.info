importance: 4

---

# Calcolare il fattoriale

Il [fattoriale](https://en.wikipedia.org/wiki/Factorial) di un numero naturale è il numero moltiplicato per `"numero meno uno"`, poi per `"numero meno due"`, e cosi via fino a `1`. Il fattoriale di `n` si indica con `n!`

Possiamo definire il fattoriale come:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Esempi:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

Si richiede di scrivere una funzione `factorial(n)` che calcola `n!` utilizzando chiamate ricorsive.

```js
alert( factorial(5) ); // 120
```

P.S. Aiuto: `n!` può essere riscritto come `n * (n-1)!` Ad esempio: `3! = 3*2! = 3*2*1! = 6`
