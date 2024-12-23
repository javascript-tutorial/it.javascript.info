
# Unicode: flag "u"

La flag unicode `/.../u` abilita il corretto supporto delle coppie surrogate.

Qui vi sono i valori unicode da comparare:

| Carattere  | Unicode | Bytes  |
|------------|---------|--------|
| `a` | 0x0061 |  2 |
| `≈` | 0x2248 |  2 |
|`𝒳`| 0x1d4b3 | 4 |
|`𝒴`| 0x1d4b4 | 4 |
|`😄`| 0x1f604 | 4 |

Dunque caratteri come `a` e `≈` occupano 2 bytes, e quelli rari ne occupano 4.

Unicode è stato fatto in modo tale che i caratteri a 4 byte abbiano un significato solo considerando l'intero insieme.

In precedenza JavaScript non ne sapeva nulla, e molti metodi delle stringhe ancora presentano problemi. Per esempio, `length` pensa che qui ci siano due caratteri:

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...Ma possiamo vedere che ce n'è solo uno, giusto? Il punto è che `length` tratta i caratteri a 4 byte come due caratteri a 2-byte. Questo non è corretto, perché devono essere considerati solo insieme (per cui chiamati "coppie surrogate").

Usualmente, anche le espressioni regolari trattano questi "caratteri lunghi" come due caratteri a 2-byte.

Questo porta a strani risultati, ad esempio proviamo a cercare `pattern:[𝒳𝒴]` nella stringa `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // risultato strano (in realtà è una corrispondenza errata, "mezzo carattere")
```

Il risultato è errato, perché di default il motore delle regexp non comprende le coppie surrogate.

Dunque, pensa che `[𝒳𝒴]` non siano due, ma quattro caratteri:
1. la metà sinistra di `𝒳` `(1)`,
2. la metà destra di `𝒳` `(2)`,
3. la metà sinistra di `𝒴` `(3)`,
4. la metà destra di `𝒴` `(4)`.

Li possiamo elencare così:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

Quindi trova solo la "metà sinistra" di `𝒳`.

In altre parole, la ricerca funziona come `'12'.match(/[1234]/)`: solo `1` viene restituito.

## La flag "u"

La flag `/.../u` risolve questo problema.

Essa abilita le coppie surrogate nel motore delle regexp, in modo tale che il risultato sia:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

Vediamo un altro esempio.

Se dimentichiamo la flag `u` e occasionalmente usiamo le coppie surrogate, possiamo incorrere in errori:

```js run
<<<<<<< HEAD
'𝒳'.match(/[𝒳-𝒴]/); // SyntaxError: intervallo non valido nella classe di caratteri
=======
let regexp = /\p{Sc}\d/gu;

let str = `Prices: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Di solito, le regexp interpretano `[a-z]` come un "intervallo di caratteri con codici tra `a` e `z`.

Ma senza la flag `u`, le coppie surrogate vengono interpretate come "coppie di caratteri indipendenti", quindi `[𝒳-𝒴]` è come `[<55349><56499>-<55349><56500>]` (sostituito a ogni coppia surrogata il codice corrispondente). Ora possiamo vedere con più chiarezza che l'intervallo `56499-55349` non è accettabile, dato che il valore a sinistra dell'intervallo deve essere inferiore rispetto a quello a destra.

Usando la flag `u` tutto funziona di nuovo:

```js run
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
