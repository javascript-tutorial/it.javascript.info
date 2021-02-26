importance: 5

---

# Applicazione parziale per login

Il compito è una variante leggermente più complessa di <info:task/question-use-bind>. 

L'oggetto `user` è stato modificato. Ora al posto delle due funzioni `loginOk/loginFail`, ha una sola funzione `user.login(true/false)`.

Cosa dovremmo passare a `askPassword` nel codice qui sotto, in modo che chiami `user.login(true)` come `ok` e `user.login(false)` come `fail`?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Le tue modifiche dovrebbero solo interessare la porzione di codice evidenziata.
