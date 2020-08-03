importance: 5

---

# Sono indipendenti i contatori?

Qui costruiamo due contatori: `counter` e `counter2` utilizzando la stessa funzione `makeCounter`.

Sono indipendenti? Cosa mostrerà il secondo contatore? `0,1` oppure `2,3` o qualcos altro?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

