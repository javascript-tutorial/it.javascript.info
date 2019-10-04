
# Proprietà dei caratteri Unicode \p

[Unicode](https://en.wikipedia.org/wiki/Unicode), il formato di codifica usato dalle stringhe di JavaScript, ha molte proprietà per diversi caratteri. Esse descrivono a quali "categorie" appartiene il carattere, e una varietà di dettagli tecnici.

Nelle espressioni regolari queste possono essere impostate con `\p{…}`. E deve esserci la flag `'u'`.

Per esempio, `\p{Letter}` indica una lettera in qualsiasi lingua. Possiamo anche usare `\p{L}`, o `L` al posto di `Letter`, ci sono alias più corti quasi per tutte le proprietà.

Qui c'è l'albero principale delle proprietà:

- Lettera `L`:
  - minuscolo `Ll`, modificatore `Lm`, titolo `Lt`, maiuscolo `Lu`, altro `Lo`
- Numero `N`:
  - cifra decimale `Nd`, numero letterale `Nl`, altro `No`
- Punteggiatura `P`:
  - connettore `Pc`, trattino `Pd`, apri virgolette `Pi`, chiudi virgolette `Pf`, apri `Ps`, chiudi `Pe`, altro `Po`
- Mark `M` (accenti ecc.):
  - combinazione di spazi `Mc`, simboli di enclosing `Me`, caratteri non-spacing `Mn`
- Simbolo `S`:
  - valuta `Sc`, modificatore `Sk`, matematico `Sm`, altro `So`
- Separatore `Z`:
  - linea `Zl`, paragrafo `Zp`, spazio `Zs`
- Altro `C`:
  - controllo `Cc`, formato `Cf`, non assegnato `Cn`, uso privato `Co`, surrogato `Cs`

```smart header="Maggiori informazioni"
Ti interessa scoprire quali caratteri appartengono a una proprietà? C'è uno strumento in <http://cldr.unicode.org/unicode-utilities/list-unicodeset> che serve a questo.

Potresti anche esplorare le proprietà in [Character Property Index](http://unicode.org/cldr/utility/properties.jsp).

Per il Database completo dei Caratteri Unicode in formato testuale (insieme a tutte le proprietà), vedi <https://www.unicode.org/Public/UCD/latest/ucd/>.
```

Ci sono anche altre categorie derivate, come:
- `Alphabetic` (`Alpha`), include Lettere `L`, più numeri letterali `Nl` (es. i numeri romani Ⅻ), più qualche altro simbolo `Other_Alphabetic` (`OAltpa`).
- `Hex_Digit` include i numeri esadecimali: `0-9`, `a-f`.
- ...Unicode è un sistema complesso, include moltissime proprietà.

Per esempio, cerchiamo un numero esadecimale a 6 cifre:

```js run
let reg = /\p{Hex_Digit}{6}/u; // è richiesta la flag 'u'

alert("color: #123ABC".match(reg)); // 123ABC
```

Ci sono anche proprietà con un valore. Ad esempio, Unicode "Script" (un sistema di scrittura) può essere Cirillico, Greco, Arabo, Han (Cinese) ecc, la [lista è lunga]("https://en.wikipedia.org/wiki/Script_(Unicode)").

Per cercare caratteri in certi script ("alfabeti"), dovremmo fornire `Script=<value>`, ad esempio per cercare lettere in Cirillico: `\p{sc=Cyrillic}`, per glifi Cinesi: `\p{sc=Han}`, ecc:

```js run
let regexp = /\p{sc=Han}+/gu; // ottieni parole cinesi

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你好
```

## Costruire un multi linguaggio \w

Il pattern `pattern:\w` vuol dire "caratteri per formare parole", ma non funziona per lingue che usano alfabeti non Latini, come il Cirillico e altri. È solo un'abbreviazione per `[a-zA-Z0-9_]`, quindi `pattern:\w+` non troverà nessuna parola Cinese ecc.

Creiamo una regexp "universale", che cerca "caratteri letterari" in qualsiasi lingua. È semplice da fare utilizzando le proprietà di Unicode:

```js
/[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]/u
```

Decifriamolo. Proprio come `pattern:\w` è lo stesso di `pattern:[a-zA-Z0-9_]`, stiamo creando un nostro set personalizzato, che include:

- `Alphabetic` per le lettere,
- `Mark` per accenti, dato che in Unicode gli accenti potrebbero essere rappresentati con codici separati,
- `Decimal_Number` per i numeri,
- `Connector_Punctuation` per il carattere `'_'`  e simili,
- `Join_Control` -– due codici speciali con codice esadecimale `200c` e `200d`, usati ad esempio in Arabo.

O, se sostituiamo nomi lunghi con degli alias (una lista di alias [qui](https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt)):

```js run
let regexp = /([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)/gu;

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // Hello,Привет,你好,123_456
```
