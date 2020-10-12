importance: 3

---

<<<<<<< HEAD
# Moltiplica le proprietà numeriche per 2

Crea una funzione `multiplyNumeric(obj)` che moltiplica tutte le prprietà numeriche di `obj` per `2`.
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Ad esempio:

```js
// before the call
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// after the call
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

Nota che `multiplyNumeric` non deve ritornare nulla. Deve solamente modificare l'oggetto.

P.S. Usa `typeof` per controllare il tipo.


