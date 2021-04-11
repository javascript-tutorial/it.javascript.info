importance: 5

---

# Algoritmo di ricerca

Il task è suddiviso in due parti.

Dati i seguenti oggetti:

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. Utilizza `__proto__` per assegnare il prototypes in modo che la catena segua il percorso: `pockets` -> `bed` -> `table` -> `head`. Ad esempio, `pockets.pen` dovrebbe essere `3` (in `table`), e `bed.glasses` dovrebbe essere `1` (in `head`).
2. Rispondi alla domanda: è più veloce ottenere `glasses` come `pockets.glasses` o come `head.glasses`? Eseguite test se necessario.
