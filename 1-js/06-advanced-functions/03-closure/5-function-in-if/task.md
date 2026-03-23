importance: 5

<<<<<<< HEAD
# Funzionie interna ad if
=======
---
# Function in if
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

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
