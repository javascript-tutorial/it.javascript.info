importance: 4

---

# Filtrare un range "sul post"

Scrivi una funzione `filterRangeInPlace(arr, a, b)` che prenda un array `arr` e ne rimuova tutti i valori, tranne quelli contenuti tra `a` e `b`. Il test è: `a ≤ arr[i] ≤ b`.

La funzione dovrebbe solamente modificare l'array. Senza ritornare nulla.

Ad esempio:
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

alert( arr ); // [3, 1]
```
