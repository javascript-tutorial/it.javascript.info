importance: 4

---

# E' richiesto "else"?

La seguente funzione ritorna `true` se il parametro `age` è maggiore di `18`.

Altrimenti richiede una conferma e ritorna il risultato:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

La funzione lavorerebbe diversamente se rimovessimo `else`?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

Ci sono differenze nel comportamento di queste due varianti?
