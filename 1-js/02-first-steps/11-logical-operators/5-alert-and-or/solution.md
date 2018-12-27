La risposta è: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

La precedenza di AND `&&` è maggiore di `||`, quindi verrà eseguito per primo.

Il risultato di `2 && 3 = 3`, quindi l'espressione diventa:

```
null || 3 || 4
```

Adesso il risultato è il primo valore vero: `3`.

