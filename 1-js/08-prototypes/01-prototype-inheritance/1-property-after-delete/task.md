importance: 5

---

# Lavorare con prototype

Il seguente codice crea due oggetti, e successivamente li modifica.

Quali valori vengono mostrati nel processo?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

Dovrebbero esserci 3 risposte.
