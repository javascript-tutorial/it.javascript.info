importance: 5

---

# Utilizzare "this" in un oggetto letterale

Qui la funzione `makeUser` ritorna un oggetto.

Qual'è il risultato dell'accesso a `ref`? Perché?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // What's the result?
```

