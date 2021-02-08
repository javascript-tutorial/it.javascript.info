Certo, funziona senza problemi.

La keyword `const` protegge la variabile solo dai cambiamenti *in toto*. 

In altre parole, `user` memorizza un riferimento all'oggetto. Questo non può cambiare. Ma l'oggetto contenuto non ha nessun vincolo.

```js run
const user = {
  name: "John"
};

*!*
// funziona (abbiamo cambiato una properietà dell'oggetto)
user.name = "Pete";
*/!*

// errore (abbiamo cercato di cambiare tutto valore in un colpo solo)
user = 123;
```
