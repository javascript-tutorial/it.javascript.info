# Stringhe

In JavaScript, i dati di tipo testuale vengono memorizzati in stringhe. Non esiste un tipo separato per i caratteri singoli.

Il formato utilizzato per le stringhe è sempre [UTF-16](https://en.wikipedia.org/wiki/UTF-16), non viene influenzato dalla codifica della pagina.

## Apici

Ricapitoliamo i tipi di apice.

Le stringhe possono essere racchiuse tra singoli apici, doppi apici o backticks:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Gli apici singoli e doppi sono essenzialmente uguali. I backticks, invece, ci consentono di includere una qualsiasi espressione all'interno della stringa, inserendola all'interno di `${…}`:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Un altro vantaggio nell'utilizzo di backticks è che consentono di dividere la stringa in più righe:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // una lista di guest, in piu righe
```

Se proviamo a utilizzare gli apici singoli o doppi allo stesso modo, otterremo un errore:
```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

<<<<<<< HEAD
Gli apici singoli e doppi sono nati insieme al linguaggio, quando non era stato ancora messo in conto la possibilità di stringhe multilinea. Le backticks sono apparse più tardi, per questo risultano più versatili.

Le backticks ci consentono anche di specificare un "template di funzione" prima della backtick di apertura. La sintassi è: <code>func&#96;string&#96;</code>. La funzione `func` viene chiamata automaticamente, gli viene passata la "string", può essere cosi trattata dalla funzione. Potete approfondire leggendo la [documentazione](mdn:/JavaScript/Reference/Template_literals#Tagged_templates). Questo viene chiamata "funzione template". Con questa caratteristica diventa più facile raccogliere stringhe da passare a funzioni, ma è raramente utilizzata.

=======
Single and double quotes come from ancient times of language creation, when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This feature is called "tagged templates", it's rarely seen, but you can read about it in the MDN: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Caratteri speciali

E' comunque possibile creare stringhe multilinea con singoli apici utilizzando il "carattere nuova riga", cioè `\n`, che significa appunto nuova riga:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

<<<<<<< HEAD
alert(guestList); // una lista di guest multi riga
```

Ad esempio, queste due funzioni portano allo stesso risultato:
=======
alert(guestList); // a multiline list of guests, same as above
```

As a simpler example, these two lines are equal, just written differently:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str1 = "Hello\nWorld"; // due righe utilizzando il "carattere nuova riga"

// due righe utilizzando le backticks
let str2 = `Hello
World`;
```

<<<<<<< HEAD
Ci sono altri caratteri "speciali" meno comuni. Qui una lista:
=======
There are other, less common special characters:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

| Carattere | Descrizione |
|-----------|-------------|
<<<<<<< HEAD
|`\n`|Nuova linea|
|`\r`|Ritorno a capo: non utilizzato da solo. I file di testo Windows utilizzano una combinazione di due caratteri `\n\r` per rappresentare il termine della riga. |
|`\'`, `\"`|Apici|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`,`\v` | Backspace, Form Feed, Vertical Tab -- mantenuti per retrocompatibilità, oggi non sono utilizzati. |
|`\xXX`|Carattere Unicode rappresentato dal codice esadecimale `XX`, esempio `'\x7A'` equivale a `'z'`.|
|`\uXXXX`|Simbolo unicode rappresentato da codice esadecimale `XXXX` in  codifica UTF-16, ad esempio `\u00A9` -- equivale a `©`. |
|`\u{X…XXXXXX}` (da 1 a 6 caratteri esadecimali)| Un simbolo Unicode in codifica UTF-32. Alcuni caratteri vengono codificati da due simboli unicode, ovvero 4 byte. |

Esempi di unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, un raro geroglifico cinese (long unicode)
alert( "\u{1F60D}" ); // 😍, un simbolo di faccia sorridente (long unicode)
```

Tutti i caratteri speciali iniziano con un backslash `\`. Che viene anche chiamato "carattere di escape".

Dobbiamo utilizzarlo anche se abbiamo intenzione di inserire un apice all'interno della stringa.
=======
|`\n`|New line|
|`\r`|In Windows text files a combination of two characters `\r\n` represents a new break, while on non-Windows OS it's just `\n`. That's for historical reasons, most Windows software also understands `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- mentioned for completeness, coming from old times, not used nowadays (you can forget them right now). |

As you can see, all special characters start with a backslash character `\`. It is also called an "escape character".

Because it's so special, if we need to show an actual backslash `\` within the string, we need to double it:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

So-called "escaped" quotes `\'`, `\"`, <code>\\`</code> are used to insert a quote into the same-quoted string.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Avete visto che abbiamo inserito un backslash `\'` prima dell'apice interno, altrimenti questo avrebbe indicato la fine della stringa.

Ovviamente, questo è valido per un apice uguale a quello utilizzato in apertura. Quindi, possiamo optare per una soluzione più elegante, ad esempio i doppi apici o i backticks:

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

<<<<<<< HEAD
Da notare che il backslash `\` ha l'unico scopo di aiutare JavaScript nella lettura della stringa, questo verrà poi rimosso. La stringa in memoria non avrà `\`. Lo avrete sicuramente notato con gli `alert` dei vari esempi sopra.

Ma se volessimo realmente mostrare un backslash `\` dentro la stringa?

E' possibile farlo, ma dobbiamo esplicitarlo con un doppio backslash `\\`:

```js run
alert( `The backslash: \\` ); // The backslash: \
```
=======
Besides these special characters, there's also a special notation for Unicode codes `\u…`, it's rarely used and is covered in the optional chapter about [Unicode](info:unicode).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## String length

La proprietà `length` (lunghezza) contiene la lunghezza della stringa:

```js run
alert( `My\n`.length ); // 3
```

Da notare che `\n` è contato come unico carattere "speciale", quindi la lunghezza risulta essere `3`.

```warn header="`length` è una proprietà"
Alcune persone abituate ad altri linguaggi possono confondere al chiamata `str.length()` con `str.length`. Questo è un errore.

<<<<<<< HEAD
Infatti `str.length` è una proprietà numerica, non una funzione. Non c'è alcun bisogno delle parentesi.
=======
Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it. Not `.length()`, but `.length`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Accesso ai caratteri

<<<<<<< HEAD
Per ottenere un carattere alla posizione `pos`, si utilizzano le parentesi quadre `[pos]` oppure la chiamata al metodo [str.charAt(pos)](mdn:js/String/charAt). Il primo carattere parte dalla posizione zero:
=======
To get a character at position `pos`, use square brackets `[pos]` or call the method [str.at(pos)](mdn:js/String/at). The first character starts from the zero position:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str = `Hello`;

// il primo carattere
alert( str[0] ); // H
alert( str.at(0) ); // H

// l'ultimo carattere
alert( str[str.length - 1] ); // o
alert( str.at(-1) );
```

<<<<<<< HEAD
L'utilizzo delle parentesi quadre è il modo più classico per accedere ad un carattere, mentre `charAt` esiste principalmente per ragioni storiche.

L'unica differenza sta nel comportamento in casi di carattere non trovato, `[]` ritorna `undefined`, e `charAt` ritorna una stringa vuota:
=======
As you can see, the `.at(pos)` method has a benefit of allowing negative position. If `pos` is negative, then it's counted from the end of the string.

So `.at(-1)` means the last character, and `.at(-2)` is the one before it, etc.

The square brackets always return `undefined` for negative indexes, for instance:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str = `Hello`;

<<<<<<< HEAD
alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (una stringa vuota)
=======
alert( str[-2] ); // undefined
alert( str.at(-2) ); // l
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Possiamo iterare sui caratteri utilizzando `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char diventa "H", poi "e", poi "l" etc)
}
```

## Le stringhe sono immutabili

Le stringhe in JavaScript non possono essere modificate. Risulta impossibile cambiare anche un solo carattere.

Possiamo anche provare a modificarla per vedere che non funziona:

```js run
let str = 'Hi';

str[0] = 'h'; // errore
alert( str[0] ); // non funziona
```

Il metodo utilizzato per aggirare questo problema è creare una nuova stringa ed assegnarla a `str` sostituendo quella vecchia.

Ad esemepio:

```js run
let str = 'Hi';

str = 'h' + str[1];  // rimpiazza str

alert( str ); // hi
```

Nelle prossime sezioni vedremo ulteriori esempi.

## Cambiare il timbro delle lettere

I metodi come [toLowerCase()](mdn:js/String/toLowerCase) e [toUpperCase()](mdn:js/String/toUpperCase) cambiano il timbro delle lettere:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Altrimenti, possiamo agire anche su un singolo carattere:

```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Cercare una sotto-stringa

Ci sono diversi modi per cercare una sotto-stringa all'interno di una stringa.

### str.indexOf

Il primo metodo è [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Quello che fa è cercare `substr` in `str`, ad iniziare dalla posizione `pos`, e ne ritorna la posizione una volta trovata, se non trova corrispondenze ritorna `-1`.

Ad esempio:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, perché 'Widget' è stato trovato all'inizio
alert( str.indexOf('widget') ); // -1, non trovato, la ricerca è case-sensitive

alert( str.indexOf("id") ); // 1, "id" è stato trovato alla posizione di indice 1 
```

Il secondo parametro opzionale ci consente di cercare a partire dalla posizione fornita.

Ad esempio, la prima occorrenza di `"id"` è alla posizione `1`. Per trovare la successiva occorrenza, dovremmo iniziare a cercare dalla posizione `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```


Se siamo interessati a tutte le occorrenze, possiamo utilizzare `indexOf` in un ciclo. Ogni chiamata viene fatta a partire dalla posizione della precedente corrispondenza:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // procediamo con la ricerca

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continua la ricerca a partire dalla prossima posizione
}
```

Lo stesso algoritmo può essere riscritto più brevemente:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Un altro metodo simile è [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf), che effettua la ricerca partendo dalla fine della stringa.

Elenca quindi le occorrenze in ordine inverso.
```

C'è solo un piccolo inconveniente dovuto all'utilizzo di `indexOf` all'interno delle espressioni `if`. Non possiamo inserirlo in un `if` in questo modo:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // non funziona!
}
```

L' `alert` nell'esempio sopra non viene mostrato perché `str.indexOf("Widget")` ritorna `0` (significa che è stata trovata una corrispondenza nella posizione iniziale). Ed è corretto, ma `if` considera `0` come `false`.

Quindi dovremmo verificare il `-1`, in questo modo:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // ora funziona!
}
```

<<<<<<< HEAD
#### Il trucco del NOT bit a bit
Uno dei trucchi più utilizzati è l'operatore di [NOT bit a bit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~`. Questo converte il numero ad un intero in 32bit (rimuovendo la parte decimale se presente) e successivamente inverte tutti i bit.

Per gli interi in 32bit la chiamata `~n` ha lo stesso risultato di `-(n+1)` (a causa del formato IEEE-754).

Ad esempio:

```js run
alert( ~2 ); // -3, lo stesso di -(2+1)
alert( ~1 ); // -2, lo stesso di -(1+1)
alert( ~0 ); // -1, lo stesso di -(0+1)
*!*
alert( ~-1 ); // 0, lo stesso di -(-1+1)
*/!*
```

Come avete potuto osservare, `~n` vale zero solo se `n == -1`.

Quindi, il test `if ( ~str.indexOf("...") )` è vero allora il risultato di `indexOf` non è `-1`. In altre parole, è stata trovata una corrispondenza.

Le persone lo utilizzano per abbreviare i controlli con `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // funziona
}
```

Solitamente è sconsigliato utilizzare caratteristiche del linguaggio per azioni che possono risultare poco ovvie, ma questo particolare trucco è ampiamente utilizzato, quindi è giusto conoscerlo.

Ricordatevi solo che: `if (~str.indexOf(...))` si legge come "se trovi".

Per essere precisi, numeri molto grandi vengono troncati a 32bit dall'operatore `~`, esistono altri numeri che potrebbero dare `0`, il più piccolo è `~4294967295=0`. Questo fa si che questo tipo di controlli siano corretti solamente se una stringa non è troppo lunga.

Attualmente questo trucco lo troviamo solamente nei codici vecchi, poiché JavaScript moderno fornisce un metodo dedicato, `.includes`(vedi sotto).

=======
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
### includes, startsWith, endsWith

Un metodo più moderno come [str.includes(substr, pos)](mdn:js/String/includes) ritorna `true/false` basandosi solo sull'aver trovato in `str` la `substr`.

E' la scelta migliore se abbiamo bisogno di verificarne solo la corrispondenza, senza dover necessariamente conoscerne la posizione:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

Il secondo argomento opzionale di `str.includes` è la posizioni da cui iniziare a cercare:

```js run
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, dalla posizione 3 non c'è "id"
```

I metodi [str.startsWith](mdn:js/String/startsWith) e [str.endsWith](mdn:js/String/endsWith) fanno esattamente ciò che dicono i loro nomi:

```js run
<<<<<<< HEAD
alert( "Widget".startsWith("Wid") ); // true, "Widget" inizia con "Wid"
alert( "Widget".endsWith("get") );   // true, "Widget" finisce con "get"
=======
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" ends with "get"
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Estrarre una sotto-stringa

Ci sono 3 metodi in JavaScript per estrarre una sotto-stringa: `substring`, `substr` e `slice`.

`str.slice(start [, end])`
: Ritorna la parte di stringa che va da `start` fino a `end` (esclusa).

    Ad esempio:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', la sottostringa da 0 a 5 (escluso 5)
    alert( str.slice(0, 1) ); // 's', da 0 a 1, escluso 1, quindi solamente il carattere 0
    ```

    Se non c'è un secondo argomento, allora `slice` si ferma alla fine della stringa:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, dalla seconda posizione fino alla fine
    ```

    Sono possibili anche valori negativi per `start/end`. Questo significa che la posizione verrà contata a partire dalla fine della stringa:

    ```js run
    let str = "strin*!*gif*/!*y";

    // incomincia dalla 4 posizione a partire da destra, e si termina alla prima a partire da destra
    alert( str.slice(-4, -1) ); // gif
    ```

`str.substring(start [, end])`
<<<<<<< HEAD
: Ritorna la parte di stringa *compresa tra* `start` e `end`.

    E' molto simile a `slice`, ma consente di avere `start` maggiore di `end`.
=======
: Returns the part of the string *between* `start` and `end` (not including `end`).

    This is almost the same as `slice`, but it allows `start` to be greater than `end` (in this case it simply swaps `start` and `end` values).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    Ad esempio:

    ```js run
    let str = "st*!*ring*/!*ify";

    // questi sono identici per substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...non per slice:
    alert( str.slice(2, 6) ); // "ring" (lo stesso)
    alert( str.slice(6, 2) ); // "" (una stringa vuota)

    ```

    Argomenti negativi (a differenza di slice) non sono supportati, vengono trattati come `0`.

`str.substr(start [, length])`
: Ritorna la parte di stringa a partire da `start`, e della lunghezza `length` data.

    Diversamente dai metodi precedenti, questo ci consente di specificare la `length` (lunghezza) piuttosto della posizione in cui terminare l'estrazione:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, dalla seconda posizione prende 4 caratteri
    ```

    Il primo argomento può anche essere negativo come con slice:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, dalla quarta posizione prende 4 caratteri
    ```

<<<<<<< HEAD
Ricapitoliamo questi metodi per evitare confusione:
=======
    This method resides in the [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) of the language specification. It means that only browser-hosted Javascript engines should support it, and it's not recommended to use it. In practice, it's supported everywhere.

Let's recap these methods to avoid any confusion:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

| metodo | selezione... | negativi |
|--------|-----------|-----------|
<<<<<<< HEAD
| `slice(start, end)` | da `start` a `end` (`end` escluso) | indici negativi ammessi |
| `substring(start, end)` | tra `start` e `end` | valori negativi valgono come `0` |
| `substr(start, length)` | da `start` per `length` caratteri | consente indice di `start` negativo |
=======
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` (not including `end`)| negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


<<<<<<< HEAD
```smart header="Quale scegliere?"
Tutti i metodi esaminati possono portare a termine il lavoro. Formalmente, `substr` ha un piccolo inconveniente: non è descritto nelle specifiche del core JavaScript, ma in quelle di Annex B, che copre solo le caratteristiche utili nello sviluppo browser. Quindi ambienti diversi dal browser potrebbero non supportarla. Ma nella pratica viene utilizzata ovunque.

L'autore della guida si trova spesso ad utilizzare il metodo `slice`.
=======
Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write.

So, for practical use it's enough to remember only `slice`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Confronto tra stringhe

Come sappiamo dal capitolo <info:comparison>, le stringhe vengono confrontate carattere per carattere in ordine alfabetico.

Sebbene ci siano dei casi particolari.

1. Una lettera minuscola è sempre maggiore di una maiuscola:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Le lettere con simboli particolari (come quelle tedesche) non vengono considerate:

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Questo potrebbe portare a strani risultati se provassimo ad ordinare le città per nome. Solitamente ci si aspetta di trovare  `Zealand` dopo `Österreich`.

<<<<<<< HEAD
Per capire cosa succede, dobbiamo guardare alla rappresentazione interna delle stringhe in JavaScript.

Tutte le stringhe vengono codificate utilizzando [UTF-16](https://en.wikipedia.org/wiki/UTF-16). Cioè: ogni carattere ha un suo codice numerico. Ci sono alcuni metodi che consentono di ottenere il carattere dal codice (e viceversa).

`str.codePointAt(pos)`
: Ritorna il codice per il carattere alla posizione `pos`:

    ```js run
    // lettere di timbro differente possiedono codici differenti
    alert( "z".codePointAt(0) ); // 122
=======
To understand what happens, we should be aware that strings in Javascript are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code.

There are special methods that allow to get the character for the code and back:

`str.codePointAt(pos)`
: Returns a decimal number representing the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (if we need a hexadecimal value)
    ```

`String.fromCodePoint(code)`
: Crea un carattere preso dalla sua rappresentazione numerica `code`:

    ```js run
    alert( String.fromCodePoint(90) ); // Z
<<<<<<< HEAD
    ```

    Possiamo anche aggiungere caratteri unicode tramite il loro codice utilizzando `\u` seguito dal codice esadecimale:

    ```js run
    // 90 è 5a nel sistema esadecimale
    alert( '\u005a' ); // Z
=======
    alert( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```

Ora vediamo i caratteri con il codice compreso tra `65..220` (l'alfabeto latino e qualche extra) creando una stringa:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Visto? Le lettere maiuscole vengono prima, poi ci sono un po di caratteri speciali e successivamente le lettere minuscole.

Ora è molto più ovvio il motivo per cui `a > Z` risulta vero.

I caratteri vengono confrontati utilizzando il loro codice numerico. Un codice maggiore significa che il carattere è maggiore. Il codice di `a` (97) è maggiore del codice di `Z` (90).

- Tutte le lettere minuscole vengono dopo quelle maiuscole perché il loro codice è maggiore.
- Alcune lettere come `Ö` vengono escluse dall'alfabeto. Il suo codice viene considerato maggiore di qualsiasi lettera compresa tra `a` e `z`.

### Confronto tra stringhe corretto [#correct-comparisons]

L'algoritmo più corretto da utilizzare per confrontare stringhe è più complesso di quanto si possa pensare, poiché l'alfabeto è diverso per ogni lingua. Lettere uguali possono avere posizioni diverse nei vari alfabeti.

Quindi il browser deve sapere quale lingua utilizzare nel confronto.

<<<<<<< HEAD
Fortunatamente, tutti i browser moderni (IE10 richiede una libreria esterna [Intl.js](https://github.com/andyearnshaw/Intl.js/)) supportano lo standard internazionale  [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).
=======
Luckily, modern browsers support the internationalization standard [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Questo fornisce uno speciale metodo per confrontare stringhe in lingue diverse, seguendo delle regole.

La chiamata [str.localeCompare(str2)](mdn:js/String/localeCompare):

- Ritorna `1` se `str` è maggiore di `str2` seguendo le regole della lingua.
- Ritorna `-1` se `str` è minore di `str2`.
- Ritorna `0` se sono uguali.

Ad esempio:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Questo metodo in realtà ha due argomenti opzionali specificati nella [documentazione](mdn:js/String/localeCompare), che consentono di specificare la lingua (di default viene presa dall'ambiente) e impostare delle regole aggiuntive come il timbro delle lettere, oppure se `"a"` e `"á"` dovrebbero essere trattate ugualmente etc.

<<<<<<< HEAD
## Internamente, Unicode

```warn header="Apprendimento avanzato"
Questa sezione andrà più in profondità riguardo le stringhe. Quello che leggerai ti potrà essere utile se hai intenzione di utilizzare emoji, simboli matematici o geroglifici.

Puoi semplicemente saltare questa sezione se non hai in programma di utilizzarle.
```

### Coppie surrogate

Molti simboli hanno un codice composto da 2 byte. Molte lettere di alfabeti europei, numeri, e anche molti geroglifici, hanno una rappresentazione in 2 byte.

Ma con 2 byte sono consentite solamente 65536 combinazioni, non sono comunque sufficienti per ogni tipo di simbolo possibile. Quindi molti simboli vengono codificati con una coppia di 2 byte chiamati "coppia surrogata".

La lunghezza di questi simboli è `2`:

```js run
alert( '𝒳'.length ); // 2, X matematica
alert( '😂'.length ); // 2, faccia con lacrime di felicità
alert( '𩷶'.length ); // 2, un raro geroglifico cinese
```

Da notare che le coppie surrogate non esistevano al momento della creazione di JavaScript, non vengono quindi processate correttamente dal linguaggio!

In realtà abbiamo un solo simbolo in ogni stringa sopra, ma la `length` vale `2`.

`String.fromCodePoint` e `str.codePointAt` sono dei metodi utilizzati per lavorare con le coppie surrogate. Sono apparsi di recente nel linguaggio. Prima di loro, esisteva solo [String.fromCharCode](mdn:js/String/fromCharCode) e [str.charCodeAt](mdn:js/String/charCodeAt). Sono esattamente la stessa cosa di `fromCodePoint/codePointAt`, semplicemente non funzionano con le coppie surrogate.

Però cercare di ottenere un simbolo può essere difficile, poiché una coppia surrogata viene trattata come due caratteri:

```js run
alert( '𝒳'[0] ); // uno strano simbolo...
alert( '𝒳'[1] ); // ...parte di una coppia surrogata
```

Da notare che un pezzo di una coppia surrogata non ha alcun senso senza l'altro. Quindi nell'esempio sopra verrà mostrata "spazzatura".

Tecnicamente, le coppie surrogate sono decifrabili anche per i loro codici: se il primo carattere ha un intervallo di codice di `0xd800..0xdbff`. Allora il successivo carattere (seconda parte) deve avere l'intervallo `0xdc00..0xdfff`. Questi intervalli sono riservati esclusivamente per coppie surrogate definite dallo standard.

Nell'esempio sopra:

```js run
// charCodeAt non è consapevole delle coppie surrogate, quindi fornisce i codici delle due parti

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, tra 0xd800 e 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, tra 0xdc00 e 0xdfff
```

Nel capitolo <info:iterable> troverete molti altri modi per operare con le coppie surrogate. Ci sono anche delle librerie dedicate, ma nulla di abbastanza completo da meritare di essere menzionato.

### Lettere speciali e normalizzazione

In molte lingue ci sono lettere composte da un carattere di base completato da un simbolo che può stare sopra/sotto.

Ad esempio, la lettera `a` può essere il carattere di base per: `àáâäãåā`. Molti dei caratteri "composti" hanno una loro rappresentazione nella tabella UTF-16. Però non tutte, poiché le combinazioni possibili sono veramente molte.

Per supportare composizioni arbitrarie, UTF-16 ci consente di utilizzare diversi caratteri unicode. Un carattere di base ed uno o più "simboli" con cui "decorare" il carattere di base.

Ad esempio, se abbiamo `S` con uno speciale "punto sopra" (codice `\u0307`), viene mostrato Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Se abbiamo bisogno di un ulteriore segno sopra la lettera (o sotto) -- nessun problema, è sufficiente aggiungere il simbolo necessario.

Ad esempio, se vogliamo aggiungere un "punto sotto" (codice `\u0323`), allora otterremo una "S con due punti, sopra e sotto": `Ṩ`.

Ad esempio:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Questo consente una grande flessibilità, ma crea anche un potenziale problema: due caratteri potrebbero sembrare uguali, ma differire per la loro composizione di codici unicode.

Ad esempio:

```js run

alert( s1 == s2 ); // false, nonostante i due caratteri sembrino identici (?!)

```

Per risolvere questo, esiste un algoritmo di "normalizzazione unicode" che porta ogni stringa alla forma "normale".

Questo algoritmo viene implementato da [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

E' divertente notare che nella nostra situazione `normalize()` trasforma una sequenza di 3 caratteri in una che ne contiene solo uno: `\u1e68` (S con due punti).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

In realtà, non è sempre cosi. La ragione è che il simbolo `Ṩ` è "abbastanza comune", quindi la tabella UTF-16 lo contiene già.

Se volete approfondire il tema della normalizzazione e le sue varianti -- vengono descritte nell'appendice dello standard Unicode: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), nella pratica le informazioni fornite in questa sezione, ti saranno sufficienti.


## Riepilogo

- Ci sono 3 tipi di apici. Le backticks consentono stringhe multi-linea ed espressioni integrate.
- Le stringhe in JavaScript vengono codificate usando UTF-16.
- Possiamo utilizzare caratteri speciali come `\n` ed inserire lettere tramite il codice unicode `\u...`.
- Per ottenere un carattere, si utilizza: `[]`.
- Per ottenere una sotto-stringa, si utilizza: `slice` o `substring`.
- Per cambiare il timbro delle lettere di una stringa si utilizza: `toLowerCase/toUpperCase`.
- Per cercare una sotto-stringa, usate: `indexOf`, o `includes/startsWith/endsWith` per controlli semplici.
- Per confrontare stringhe seguendo le regole della lingua, usate: `localeCompare`, altrimenti verranno comparate in base al codice del singolo carattere.
=======
## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- We can use special characters, such as a line break `\n`.
- To get a character, use: `[]` or `at` method.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ci sono molti altri metodi utili per operare con le stringhe:

- `str.trim()` -- rimuove gli spazi all'inizio e alla fine della stringa.
- `str.repeat(n)` -- ripete la stringa `n` volte.
- ...e molto altro. Guarda il [manuale](mdn:js/String) per maggiori dettagli.

<<<<<<< HEAD
Le stringhe possiedono anche metodi per eseguire ricerche/rimpiazzi con le regular expression. Ma l'argomento merita un capitolo separato, quindi ci ritorneremo più avanti, <info:regular-expressions>.
=======
Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.

Also, as of now it's important to know that strings are based on Unicode encoding, and hence there're issues with comparisons. There's more about Unicode in the chapter <info:unicode>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
