
# Unicode: flag "u"

La flag unicode `/.../u` abilita il corretto supporto delle coppie surrogate.

<<<<<<< HEAD
Le coppie surrogate sono spiegate nel capitolo <info:string>.

Rivediamole brevemente qui. In poche parole, i caratteri normali sono codificati con 2 byte. Questo ci dà un massimo di 65536 caratteri. Ma ci sono più caratteri nel mondo.

Quindi alcuni caratteri più rari sono codificati con 4 byte, come `𝒳` (la X matematica) o `😄` (uno smile).

Qui vi sono i valori unicode da comparare:

| Carattere  | Unicode | Byte  |
=======
Here are the Unicode values of some characters:

| Character  | Unicode | Bytes count in Unicode  |
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5
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

<<<<<<< HEAD
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
=======
For instance, `\p{Letter}` denotes a letter in any language. We can also use `\p{L}`, as `L` is an alias of `Letter`. There are shorter aliases for almost every property.

In the example below three kinds of letters will be found: English, Georgian and Korean.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (no matches, \p doesn't work without the flag "u")
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5
```

Quindi trova solo la "metà sinistra" di `𝒳`.

In altre parole, la ricerca funziona come `'12'.match(/[1234]/)`: solo `1` viene restituito.

## La flag "u"

La flag `/.../u` risolve questo problema.

<<<<<<< HEAD
Essa abilita le coppie surrogate nel motore delle regexp, in modo tale che il risultato sia:
=======
There's a Unicode property `Script` (a writing system), that may have a value: `Cyrillic`, `Greek`, `Arabic`, `Han` (Chinese) and so on, [here's the full list](https://en.wikipedia.org/wiki/Script_(Unicode)).

To look for characters in a given writing system we should use `pattern:Script=<value>`, e.g. for Cyrillic letters: `pattern:\p{sc=Cyrillic}`, for Chinese hieroglyphs: `pattern:\p{sc=Han}`, and so on:
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

Vediamo un altro esempio.

<<<<<<< HEAD
Se dimentichiamo la flag `u` e occasionalmente usiamo le coppie surrogate, possiamo incorrere in errori:
=======
Characters that denote a currency, such as `$`, `€`, `¥`, have Unicode property  `pattern:\p{Currency_Symbol}`, the short alias: `pattern:\p{Sc}`.

Let's use it to look for prices in the format "currency, followed by a digit":
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5

```js run
'𝒳'.match(/[𝒳-𝒴]/); // SyntaxError: intervallo non valido nella classe di caratteri
```

Di solito, le regexp interpretano `[a-z]` come un "intervallo di caratteri con codici tra `a` e `z`.

Ma senza la flag `u`, le coppie surrogate vengono interpretate come "coppie di caratteri indipendenti", quindi `[𝒳-𝒴]` è come `[<55349><56499>-<55349><56500>]` (sostituito a ogni coppia surrogata il codice corrispondente). Ora possiamo vedere con più chiarezza che l'intervallo `56499-55349` non è accettabile, dato che il valore a sinistra dell'intervallo deve essere inferiore rispetto a quello a destra.

Usando la flag `u` tutto funziona di nuovo:

```js run
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
