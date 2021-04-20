# Trova l'orario come hh:mm o hh-mm

L'orario può essere nel formato `ore:minuti` o `ore-minuti`. Entrambi ore e minuti hanno 2 numeri:  `09:00` o `21-30`.

Scrivi una regexp per trovare l'orario:

```js
let regexp = /your regexp/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30
```

P.S. In questo esercizio che l'orario è sempre corretto, non c'è necessità di filtrare stringhe come "45:67". Più tardi ci occuperemo anche di questo.
