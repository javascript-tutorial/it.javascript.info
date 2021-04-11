La differenza diventa ovvia quando inseriamo il codice all'interno di una funzione.

The behavior is different if there's a "jump out" of `try...catch`.

For instance, when there's a `return` inside `try...catch`. The `finally` clause works in case of *any* exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.

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
