La risposta è: `1`, e poi `undefined`.

```js run
alert( alert(1) && alert(2) );
```

La chiamata `alert` ritorna `undefined` (mostra solo un messaggio, quindi non ha nessuna valore significativo di ritorno).

Per questo `&&`, valutato l'operando di sinistra (che mostra `1`), si ferma: `undefined` è un valore falso e `&&` lo ritorna immediatamente.

