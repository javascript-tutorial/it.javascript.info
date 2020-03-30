importance: 2

---

# Il sotto-array massimo

Come input si ha un array di numeri, ad esempio `arr = [1, -2, 3, 4, -9, 6]`.

Il compito è: trovate il sotto-array contiguo di `arr` con la massima somma degli elementi.

Scrivete la funzione `getMaxSubSum(arr)` che ritorna quella somma.

<<<<<<< HEAD
Ad esempio: 
=======
For instance:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (the sum of highlighted items)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (take all)
```

Se tutti gli elementi sono negativi, significa che non prendiamo nulla (il sotto-array vuoto), quindi la somma è zero:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Provate a pensare ad una soluzione rapida: [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) o addirittura O(n) se riuscite.
