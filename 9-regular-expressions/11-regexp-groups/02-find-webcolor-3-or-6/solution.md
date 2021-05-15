L'espressione regolare per cercare il codice di un colore di 3 cifre `#abc` è : `pattern:/#[a-f0-9]{3}/i`.

Possiamo aggiungere esattamente 3 ulteriori cifre esadecimali opzionali. Non abbiamo bisogno di altro. Il codice di un colore è composto da 3 o 6 cifre.

Usiamo il quantificatore `pattern:{1,2}` a questo scopo: avremo `pattern:/#([a-f0-9]{3}){1,2}/i`.

In questo caso il pattern `pattern:[a-f0-9]{3}` è racchiuso tra parentesi per applicare ad esso il quantificatore `pattern:{1,2}`.

Eccolo in azione:

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef #abc
```

C'è un piccolo problema adesso: il pattern `match:#abc` trovato in `subject:#abcd`. Per evitarlo possiamo aggiungere `pattern:\b` alla fine:

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```
