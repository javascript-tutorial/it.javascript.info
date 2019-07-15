
# Funzionie interna ad if

<<<<<<< HEAD
Guardate il codice. Quale sarà il risultato della chiamata all'ultima riga?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

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
