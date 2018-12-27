La risposta è: `1`, e poi `undefined`.

```js run
alert( alert(1) && alert(2) );
```

La chiamata `alert` ritorna `undefined` (mostra solo un messaggio, quindi non ha nessuna valore di ritorno significativo).

Per questo `&&` valuta l'operando di sinistra (che mostra `1`), e si ferma immediatamente, perchè `undefined` è un valore falso.  AND `&&` cerca un valore falso e lo ritorna.

