I primi due controlli vengono trasmormati in due `case`. Il terzo controllo viene diviso in due casi:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Da notare: il `break` alla fine non è richiesto. Lo abbiamo messo per rendere il codice pronto ad aggiornamenti futuri.

In futuro, potremmo voler aggiungere un ulteriore `case`, ad esempio `case 4`. E se ci dimentichiamo di aggiungere il break prima di scrivere il nuovo case, al termine del `case 3` ci sarà un errore. Quindi aggiungere il break è una sorta di auto-certezza.
