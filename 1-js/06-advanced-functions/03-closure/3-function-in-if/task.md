
# Funzionie interna ad if

<<<<<<< HEAD
Guardate il codice. Quale sarà il risultato della chiamata all'ultima riga?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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
