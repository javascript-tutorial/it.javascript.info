La differenza diventa ovvia quando inseriamo il codice all'interno di una funzione.

Il comportamento è differente se c'è un salto dall'interno del `try..catch`.

Per esempio, quando c'è un `return` all'interno del `try..catch`. La clausola `finally` funziona indipendentemente da come termina il `try..catch`, anche nel caso avvenga tramite un `return`: subito dopo la conclusione del `try..catch`, ma prima che il codice richiamato prenda il controllo.

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (e) {
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
  } catch (e) {
    // ...
    if("can't handle the error") {
*!*
      throw e;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

È `finally` che garantisce la pulizia qui. Se inseriamo del codice alla fine di `f`, in queste situazioni, non verrà eseguito.
