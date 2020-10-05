
Soluzione:

```js run
<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/1-find-text-manydots/solution.md
let reg = /\.{3,}/g;
alert( "Ciao!... Come va?.....".match(reg) ); // ..., .....
=======
let regexp = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca:9-regular-expressions/09-regexp-quantifiers/1-find-text-manydots/solution.md
```

Si noti che il punto è un carattere speciale pertanto è stato necessario farne l'escape inserendolo come `\.`.
