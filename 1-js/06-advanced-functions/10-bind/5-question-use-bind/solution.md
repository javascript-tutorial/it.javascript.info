
<<<<<<< HEAD
L'errore si verifica perché `askPassword` riceve le funzioni `loginOk/loginFail` senza l'oggetto.
=======
The error occurs because `askPassword` gets functions `loginOk/loginFail` without the object.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Quando le chiamiamo, naturalmente assumono `this=undefined`.

Usiamo `bind` per associare il contesto:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Ora funziona.

Una soluzione alternativa potrebbe essere:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

Di solito anche questo funziona e appare come una buona soluzione.

Tuttavia è un po' meno affidabile in situazioni più complesse, in cui la variabile `user` potrebbe cambiare *dopo* la chiamata di `askPassword`, ma *prima* che il visitatore risponda e venga chiamata `() => user.loginOk()`. 
