Utilizziamo `eval` per risolvere l'espressione matematica:

```js demo run
let expr = prompt("Type an arithmetic expression?", '2*3+2');

alert( eval(expr) );
```

L'utente può inserire qualsiasi testo o codice.

Per rendere tutto più sicuro, limitiamo ai soli caratteri aritmetici, possiamo verificare `expr` utilizzando un'[espressione regolare](info:regular-expressions), in questo modo potrà contenere solamente cifre e operatori.
