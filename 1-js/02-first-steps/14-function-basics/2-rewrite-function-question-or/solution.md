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

Nota che le parentesi su `age > 18` non sono richieste. Vengono utilizzate per migliorarne la leggibilità.
