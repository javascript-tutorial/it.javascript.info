```js run demo
function filterRange(arr, a, b) {
  //aggiunte parentesi attorno all'espressione per una migliore leggibilità
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (i valori filtrati)

alert( arr ); // 5,3,8,1 (non modificato)
```
