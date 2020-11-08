Perchè la seconda parentesi funzioni, la prima deve ritornare una funzione.

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

