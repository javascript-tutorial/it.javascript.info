La differenza diventa ovvia quando inseriamo il codice all'interno di una funzione.

Il comportamento è diverso se c'è una "uscita anticipata" dal `try...catch`.

Per esempio, quando c'è un `return` all'interno del `try...catch`. La clausola `finally` funziona *qualunque* sia la lcausa dell'uscita dal `try...catch`, anche tramite l'istruzione "return": appena il `try...catch` è terminato, ma prima che il codice richiamato prenda il controllo.

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

...O quando si presenta un `throw`, come:

```js run
function f() {
  try {
    alert('start');
    throw new Error("an error");
  } catch (err) {
    // ...
    if("can't handle the error") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

È `finally` che garantisce la pulizia qui. Se inseriamo del codice alla fine di `f`, in queste situazioni, non verrà eseguito.
