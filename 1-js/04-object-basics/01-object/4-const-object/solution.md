Certo, funziona senza problemi.

Il `const` protegge solo la variabile da cambiamenti. 

In altre parole, `user` memorizza un riferimento all'oggetto. Questo non può cambiare. Ma l'oggetto contenuto non ha nessun vincolo.

```js run
const user = {
  name: "John"
};

*!*
// works
user.name = "Pete";
*/!*

// error
user = 123;
```
