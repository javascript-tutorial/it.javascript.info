importance: 5

---

# Ordinare per campo

Abbiamo un array di oggetti da ordinare:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

Il modo più classico per farlo sarebbe:

```js
// by name (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// by age (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Possiamo renderlo anche più breve, ad esempio:

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Quindi, piuttosto che scrivere una funzione, utilizziamo `byField(fieldName)`.

Scrivete la funzione `byField`.
