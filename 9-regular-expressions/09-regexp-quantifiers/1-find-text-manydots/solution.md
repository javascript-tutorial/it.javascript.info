
Soluzione:

```js run
<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/1-find-text-manydots/solution.md
let reg = /\.{3,}/g;
alert( "Ciao!... Come va?.....".match(reg) ); // ..., .....
=======
let regexp = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864:9-regular-expressions/09-regexp-quantifiers/1-find-text-manydots/solution.md
```

Si noti che il punto è un carattere speciale pertanto è stato necessario farne l'escape inserendolo come `\.`.
