importance: 5

---

# Assegnamento di destrutturazione

Abbiamo un oggetto:

```js
let user = {
  name: "John",
  years: 30
};
```

Scrivete l'assegnamento di destrutturazione che legge:

- la proprietà `name` nella variabile `name`.
- la proprietà `years` nella variabile `age`.
- la proprietà `isAdmin` nella variabile `isAdmin` (falsa se assete)

I valori dopo l'assegnazione dovrebbero essere:

```js
let user = { name: "John", years: 30 };

// your code to the left side:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
