La risposta: il primo e il terzo verranno eseguiti.

I dettagli:

```js run
// Viene eseguito
// Il risultato di -1 || 0 = -1 è vero
if (-1 || 0) alert( 'first' );

// Non viene eseguito
// -1 && 0 = 0, falso
if (-1 && 0) alert( 'second' );

// Eseguito
// L'operatore && ha la precedenza su ||,
// quindi -1 && 1 vengono eseguiti per primi; la catena dentro `if` diventa:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'third' );
```

