<<<<<<< HEAD
E' sufficiente eseguire un ciclo e `return false` (ritornare falso) se l'oggetto contiene almeno una proprietà.

```js
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
```
=======
Just loop over the object and `return false` immediately if there's at least one property.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
