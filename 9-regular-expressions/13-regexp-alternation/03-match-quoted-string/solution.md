La soluzione: `pattern:/"(\\.|[^"\\])*"/g`.

Passo dopo passo:

- Innanzitutto cerchiamo un doppio apice di apertura `pattern:"`
- Quindi se abbiamo un backslash `pattern:\\` (dobbiamo raddoppiarlo nel pattern perché è un carattere speciale), qualsiasi carattere dopo di esso è consentito (il punto).
- Altrimenti consideriamo ogni carattere eccetto un doppio apice (che significherebbe la fine della stringa) ed un backslash (per evitare backslashe isolati, il backslash è usato soltanto in congiunzione con altri simboli dopo di esso): `pattern:[^"\\]`
- ...e così via fino al doppio apice di chiusura.

In azione:

```js run
let regexp = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

alert( str.match(regexp) ); // "test me","Say \"Hello\"!","\\ \""
```
