
# Funzionie interna ad if

<<<<<<< HEAD
Guardate il codice. Quale sarà il risultato della chiamata all'ultima riga?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

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
