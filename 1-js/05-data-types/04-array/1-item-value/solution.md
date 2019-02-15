La risposta è `4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

Questo perché gli array sono oggetti. Quindi `shoppingCart` e `fruits` sono riferimenti allo stesso array.

