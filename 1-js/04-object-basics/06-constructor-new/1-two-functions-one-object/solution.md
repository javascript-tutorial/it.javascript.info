Si, è possibile.

Se una funzione ritorna un oggetto, questo verrà fornito alla `new` piuttosto che `this`.

Quindi, le due funzioni potrebbero ritornare un oggetto definito esternamente `obj`:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
