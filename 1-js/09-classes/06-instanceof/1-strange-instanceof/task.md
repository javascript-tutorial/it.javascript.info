importance: 5

---

# Uno strano instanceof

Nel codice sottostante, perché `instanceof` ritorna `true`? Possiamo facilmente vedere che `a` non è creato da `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
