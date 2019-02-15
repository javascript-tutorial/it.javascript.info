La chiamata `arr[2]()` è sintatticamente equivalente a `obj[method]()`, al posto di `obj` abbiamo `arr`, e al posto di `method` abbiamo `2`.

Quindi abbiamo una chiamata al metodo `arr[2]`. Naturalmente, riceve il riferimento a `this` e ritorna l'array:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // "a","b",function
```

L'array ha 3 valori: inizialmente ne ha due, successivamente viene aggiunta la funzione. 
