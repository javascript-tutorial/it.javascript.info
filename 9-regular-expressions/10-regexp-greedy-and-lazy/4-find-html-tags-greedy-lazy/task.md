# Trovate i tag HTML

Create un'espressione regolare per trovare tutti i tag HTML (di apertura e di chiusura) con i loro attributi.

Ecco un esempio d'uso:

```js run
let regexp = /your regexp/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

In questo caso presumiamo che gli attributi dei tag non contengano `<` e `>` dentro i doppi apici per semplificare le cose.
