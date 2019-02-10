Questo accede perché `i` non sarà mai uguale `10`.

Eseguitelo per vedere il *vero* risultato di `i`:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Nessuno di questi sarà esattamente `10`.

Questo tipo di errori accadono a causa della perdita di precisione quando sommiamo decimali come `0.2`.

Conclusione: evitate controlli di uguaglianza quando utilizzate numeri decimali.