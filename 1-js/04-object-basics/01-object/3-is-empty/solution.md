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
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
