
# Funzionie interna ad if

<<<<<<< HEAD
Guardate il codice. Quale sarà il risultato della chiamata all'ultima riga?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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
