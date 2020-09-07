importance: 5

---

# Filter su funzioni

Abbiamo a disposizione un metodo integrato `arr.filter(f)` per gli array. Questo filtra tutti gli elementi attraverso la funzione `f`. Se ritorna `true `, allora quell'elemento viene ritornato.

Create un insieme di filtri "pronti all'uso":

- `inBetween(a, b)` -- tra `a` e `b` o uguale.
- `inArray([...])` -- contenuto nell'array.

Il loro utilizzo dovrebbe essere:

- `arr.filter(inBetween(3,6))` -- seleziona solo i valori compresi tra 3 e 6.
- `arr.filter(inArray([1,2,3]))` -- seleziona solo gli elementi che corrispondono a `[1,2,3]`.

Ad esempio:

```js
/* .. your code for inBetween and inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

