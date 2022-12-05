importance: 5

<<<<<<< HEAD
# Funzionie interna ad if
=======
---
# Function in if
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043

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
