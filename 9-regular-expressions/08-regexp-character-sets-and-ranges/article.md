# Insiemi e intervalli [...]

Alcuni caratteri o classi di caratteri inseriti all'interno di parantesi quadre `[…]` significano "cerca qualsiasi carattere tra quelli forniti".

## Insiemi

Per esempio, `pattern:[eao]` significa uno qualunque dei 3 caratteri: `'a'`, `'e'`, od `'o'`.

Questo è chiamato un *insieme* o *set*. I set posso essere usati in una regexp insieme ad altri caratteri:

```js run
// trova [t o m], e quindi "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Si noti che sebbene ci siano più caratteri nel set, corrispondono esattamente a un carattere nel match.

Quindi il seguente esempio non da alcuna corrispondenza:

```js run
// trova "V", poi ['o' o 'i'], quindi "la"
alert( "Voila".match(/V[oi]la/) ); // null, nessuna corrispondenza
```

Il modello di ricerca risulta quindi:

- `pattern:V`,
- poi *una* di queste lettere `pattern:[oi]`,
- quindi `pattern:la`.

Significa che ci dovrebbe essere una corrispondenza per `match:Vola` o `match:Vila`.

## Intervalli

Le parentesi quadre possono contenere anche *intervalli di caratteri*.

Per esempio, `pattern:[a-z]` indica un carattere nell'intervallo che va da `a` a `z`, e `pattern:[0-5]` indica un numero tra `0` e `5`.

Nell'esempio seguente cercheremo una `"x"` seguita da due numeri o lettere da `A` a `F`:

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

Il modello `pattern:[0-9A-F]` ha due intervalli: cerca un carattere che sia una cifra da `0` a `9` o una lettera da `A` a `F`.

Se vorremo cercare anche lettere minuscole, possiamo aggiungere l'intervallo `a-f`: `pattern:[0-9A-Fa-f]`. O aggiungere il flagr `pattern:i`.

Possiamo anche usare la classe di caratteri `[…]`.

Per esempio, se vorremmo cercare qualunque carattere `pattern:\w` o un trattino `pattern:-`, allora l'insieme sarà `pattern:[\w-]`.

È anche possibile combinare diverse classi, a.e. `pattern:[\s\d]` significa "uno spazio o un numero".

```smart header="Le classi di caratteri sono abbreviazioni per determinati set di caratteri"
Per esempio:

- **\d** -- è la stessa cosa di `pattern:[0-9]`,
- **\w** -- è la stessa cosa di `pattern:[a-zA-Z0-9_]`,
- **\s** -- è la stessa cosa di `pattern:[\t\n\v\f\r ]`, pochi altri rari caratteri Unicode.
```

### Esempio: multi lingua \w

La classe di caratteri `pattern:\w` è una scorciatoia per `pattern:[a-zA-Z0-9_]`, che tuttavia non può trovare geroglifici Cinesi, lettere Cirilliche, ecc.

Possiamo allora scrivere un modello più universale, che può trovare qualunque carattere in qualunque lingua. Questo è reso facile dalle proprietà Unicode: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Decifriamolo. Similarmente a `pattern:\w`, stiamo creando un nostro insieme che include i caratteri con le seguenti proprietà Unicode:

- `Alphabetic` (`Alpha`) - per le lettere,
- `Mark` (`M`) - per gli accenti,
- `Decimal_Number` (`Nd`) - per i numeri,
- `Connector_Punctuation` (`Pc`) - per il trattino basso `'_'` e caratteri simili,
- `Join_Control` (`Join_C`) - due codici specialis `200c` e `200d`, usati nelle legature, a.e. in Arabo.

Un esempio di utilizzo:

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

// Cerca tutte le lettere e i numeri:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

Naturalmente, possiamo modificare questo modello: aggiungere proprietà Unicode o rimuoverle. Le proprietà Unicode sono descritte meglio nell'articolo <info:regexp-unicode>.

```warn header="Le proprietà Unicode non sono supportate da IE"
Le proprietà Unicode `pattern:p{…}` non sono implementate in IE. Se ci necessitano veramente, possiamo utilizzare la libreria [XRegExp](http://xregexp.com/).

O giusto utilizzare un intervallo di caratteri nella lingua che ci interessa, a.e.  `pattern:[а-я]` per le lettere Cirilliche.
```

## Esclusione di intervalli

Oltre ai normali intervalli, è possibile creare dei modelli di "esclusione", come `pattern:[^…]`.

Vengono indicati da un accento circonflesso `^` all'inizio e indicano qualunque carattere *tranne quelli forniti*.

Per esempio:

- `pattern:[^aeyo]` -- qualunque carattere tranne  `'a'`, `'e'`, `'y'` o `'o'`.
- `pattern:[^0-9]` -- qualunque carattere tranne un numero, come `pattern:\D`.
- `pattern:[^\s]` -- qualunque carattere che non sia uno spazio, come `\S`.

L'esempio seguente cerca per qualunque carattere eccetto lettere, numeri e spazi:

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ e .
```

## Escaping in […]

In genere quando vogliamo trovare esattamente un carattere speciale, dobbiamo effettuarne l'escape come `pattern:\.`. E se abbiamo bisogno di un backslash, allora dobbiamo usare `pattern:\\`, e così via.

Dentro le parentesi quadre, possiamo usare la stragrande maggioranza di caratteri speciali senza la necessità di effettuarne l'escaping:

- I simboli `pattern:. + ( )` non necessitano mai di escaping.
- Il trattino `pattern:-` non è preceduto da caratteri di escape all'inizio o alla fine (dove non definisce un intervallo).
- Un accento circonflesso `pattern:^` è soggeto ad escape solo all'inizio (dove significa esclusione).
- La parentesi quadra di chiusura `pattern:]` dev'essere sempre soggetta ad escape (se abbiamo bisogno di cercare questo simbolo).

In altre parole, tutti i caratteri speciali sono permessi senza necessita di escape, eccetto quando servono a qualcosa all'interno delle parentesi quadre.

Un punto `.` all'interno delle parentesi quadre significa giusto un punto. Il modello `pattern:[.,]` cercherebbe per uno dei caratteri: o un punto o una virgola.

Nell'esempio seguente la regexp `pattern:[-().^+]` effettua la ricerca per uno dei caratteri `-().^+`:

```js run
// Non necessita di escape
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // Corrispondono +, -
```

...Ma se decidiamo di effettuarne l'escape "giusto per non sbagliare", il risultato non cambierebbe:

```js run
// Escape tutto
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // funziona ugualmente: +, -
```

## Intervalli e flag "u"

Se ci sono coppie surrogate nel set, il flag `pattern:u` è necessario affinché la ricerca funzioni correttamente.

Per esempio, cerchiamo `pattern:[𝒳𝒴]` nella stringa `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // mostra uno strano carattere, come [?]
// (la ricerca è stata eseguita in modo errato, mezzo-carattere restituito)
```

Il risultato non è corretto, perché di base la regular expressions "non sa nulla" riguardo le coppie surrogate.

Il motore delle regular expression pensa che `[𝒳𝒴]` -- non sono due, ma quattro caratteri:
1. metà alla sinistra di `𝒳` `(1)`,
2. metà alla destra di `𝒳` `(2)`,
3. metà alla sinistra di `𝒴` `(3)`,
4. metà alla destra di `𝒴` `(4)`.

Possiamo vedere il suo codice in questo modo:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

Quini, l'esempio qui sopra trova e visualizza la metà alla sinistra di `𝒳`.

Se aggiungiamo il flag `pattern:u`, allora il comportamento sarà corretto:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

Una situazione simile si verifica quando si cerca un intervallo, come `[𝒳-𝒴]`.

Se dimentichiamo di aggiungere il flag `pattern:u`, ci sarà un errore:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Errore: Invalid regular expression
```

La ragione è che senza il flag `pattern:u` le coppie surrogate sono percepite come due caratteri, quindi `[𝒳-𝒴]` è interpretato come `[<55349><56499>-<55349><56500>]` (ogni coppia di surrogato è sostituito con il suo codice). Ora è facile vedere che l'intervallo `56499-55349` non è valido: esso inizia con il codice `56499` che è inferiore che finisce con `55349`. Questa è la ragione formale dell'errore.

Con il flag `pattern:u` il modello funziona correttamente:

```js run
// cerca per i caratteri da 𝒳 a 𝒵
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
