importance: 5

---

# Filtrare gli elementi dell'array unici

Avete un array `arr`.

Create una funzione `unique(arr)` che ritorni un array con tutti gli elementi unici presi da `arr`.

Ad esempio:

```js
function unique(arr) {
  /* your code */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

P.S. Qui vengono utilizzate stringhe, ma potrebbero essere valori di qualsiasi tipo.

P.P.S. utilizzate `Set` per memorizzare valori unici.
