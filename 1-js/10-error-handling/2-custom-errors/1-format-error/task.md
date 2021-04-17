importance: 5

---

# Eredita da SyntaxError

Crea una classe `FormatError` che eredita dalla classe incorporata `SyntaxError`.

Dovrebbe supportare le proprietà `message`, `name` e `stack`.

Esempio di esecuzione:

```js
let err = new FormatError("formatting error");

alert( err.message ); // Errore nella formattazione
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // vero
alert( err instanceof SyntaxError ); // vero (poiché eredita SyntaxError)
```
