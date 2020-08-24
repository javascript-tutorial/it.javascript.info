# Regexp per la ricerca di colori espressi in formato HTML

Si crei un'espressione regolare per trovare i colori HTML in notazione `#ABCDEF`: all'inizio un carattere `#` quindi 6 cifre esadecimali.

Un esempio di uso:

```js
<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/2-find-html-colors-6hex/task.md
let reg = /...la tua regexp.../
=======
let regexp = /...your regexp.../
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1:9-regular-expressions/09-regexp-quantifiers/2-find-html-colors-6hex/task.md

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(regexp) )  // #121212,#AA00ef
```

P.S. In questo esercizio non è richiesto di intercettare i colori espressi anche in altri formati come: `#123` o `rgb(1,2,3)` ecc.
