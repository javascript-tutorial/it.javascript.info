# Regexp per la ricerca di colori espressi in formato HTML

Si crei un'espressione regolare per trovare i colori HTML in notazione `#ABCDEF`: all'inizio un carattere `#` quindi 6 cifre esadecimali.

Un esempio di uso:

```js
let reg = /...la tua regexp.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(reg) )  // #121212,#AA00ef
```

P.S. In questo esercizio non è richiesto di intercettare i colori espressi anche in altri formati come: `#123` o `rgb(1,2,3)` ecc.
