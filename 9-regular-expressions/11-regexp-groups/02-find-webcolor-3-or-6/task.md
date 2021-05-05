# Trovate un colore nel formato #abc o #abcdef

Scrivete un'espressione regolare che trovi i colori nel formato `#abc` o `#abcdef`. In altre parole: `#` seguito da 3 o 6 cifre esadecimali.

Esempio d'uso:
```js
let regexp = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```

P.S. Dovrebbe trovare esattamente 3 o 6 cifre esadecimali. I valori con 4 cifre, come `#abcd`, non dovrebbero dar luogo a corrispondenza.
