
La prima idea potrebbe essere elencare i linguaggi separati da `|`.

Ma non funziona bene:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

L'interprete dell'espressione regolare cerca le alternanze una per una. In altre parole: per prima cosa cerca `match:Java`, se non la trova cerca `match:JavaScript` e così via.

Il risultato è che `match:JavaScript` non trova mai corrispondenza proprio perché `match:Java` viene controllato per prima.

Lo stesso accade con `match:C` e `match:C++`.

Ci sono due soluzioni per questo problema:

1. Cambiare l'ordine di verifica mettendo per primo il termine più lungo: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Unire le varianti che cominciano allo stesso modo: `pattern:Java(Script)?|C(\+\+)?|PHP`.

In azione:

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```
