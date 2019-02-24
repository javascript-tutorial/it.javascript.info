importance: 3

---

# Rimescolare un array

Scrivete una funzione `shuffle(array)` che rimescoli (riordini casualmente) gli elementi dell'array.

Esecuzioni multiple di `shuffle` dovrebbero portare a diversi ordinamenti degli elementi. Ad esempio:

```js
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
```

Tutti gli elementi ordinati dovrebbero avere una probabilità identica. Ad esempio, `[1,2,3]` può essere riordinato come `[1,2,3]` o `[1,3,2]` o `[3,1,2]` etc, ognuno dei casi deve avere la stessa probabilità.
