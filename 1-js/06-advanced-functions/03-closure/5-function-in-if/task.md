importance: 5

<<<<<<< HEAD
# Funzionie interna ad if
=======
---
# Function in if
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Guardate il codice. Quale sarà il risultato della chiamata all'ultima riga?

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
