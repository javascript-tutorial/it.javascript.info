Utilizzando l'operatore `?`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

Utilizzando OR `||` (la variante più breve):

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

<<<<<<< HEAD
Nota che le parentesi su `age > 18` non sono richieste. Vengono utilizzate per migliorarne la leggibilità.
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
