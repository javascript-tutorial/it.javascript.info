importance: 5

<<<<<<< HEAD
# Funzionie interna ad if
=======
---
# Function in if
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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
