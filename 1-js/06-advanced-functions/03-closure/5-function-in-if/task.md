importance: 5

<<<<<<< HEAD
# Funzionie interna ad if
=======
---
# Function in if
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

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
