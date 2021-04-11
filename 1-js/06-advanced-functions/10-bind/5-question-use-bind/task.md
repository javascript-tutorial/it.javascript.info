importance: 5

---

# Correggi una funzione che ha perso "this"

La chiamata di `askPassword()` nel codice sottostante dovrebbe controllare la password e quindi chiamare `user.loginOk/loginFail` a seconda della risposta.

Ma porta a un errore. Perché?

Correggi la riga evidenziata affinché tutto funzioni correttamente (le altre righe non devono essere modificate).

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
askPassword(user.loginOk, user.loginFail);
*/!*
```
