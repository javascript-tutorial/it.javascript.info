<<<<<<< HEAD
Perchè la seconda parentesi funzioni, la prima deve ritornare una funzione.
=======
For the second parentheses to work, the first ones must return a function.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Come in questo esempio:

```js run
function sum(a) {

  return function(b) {
    return a + b; // takes "a" from the outer lexical environment
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

