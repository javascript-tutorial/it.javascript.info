**La risposta: da `0` a `4` in entrambi i casi.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Questo può eserre facilmete dedotto dall'algoritmo  `for`:

1. Esegue un asola volta `i = 0` come prima cosa (begin)
2. Verifica la condizione `i < 5`
3. Se è `true` -- esegue il corpo del ciclo `alert(i)`, successivamente `i++`

L'incremento `i++` è separato dal controllo della condizione(2). E' un istruzione differente.

Il valore ritornato non viene utilizzato, quindi non c'è differenza tra `i++` e `++i`.
