# Pattern e flag

Le espressioni regolari sono dei pattern che forniscono strumenti molto potenti per la ricerca e la sostituzione di testo.

In JavaScript, queste sono disponibili utilizzando l'oggetto [RegExp](mdn:js/RegExp), oltre ad essere integrato negli oggetti di tipo stringa.

## Espressioni regolari

Un'espressione regolare (regular expression,  "regexp" o solo "reg") è formata da una sequenza di caratteri (*pattern*) e da eventuali *flag*.

Esistono due tipi di sintassi per creare un oggetto di tipo "regular expression".

La versione più lunga:

```js
regexp = new RegExp("pattern", "flags");
```

...e la più corta, usando gli slash `"/"`:

```js
regexp = /pattern/; // senza flag
regexp = /pattern/gmi; // con le flag g,m e i (da approfondire a breve)
```

Gli slash `"/"` comunicano a JavaScript che stiamo creando un'espressione regolare. Hanno lo stesso ruolo delle virgolette per le stringhe.

Gli slash `"/"` vengono usati quando conosciamo l'espressione regolare e possiamo includerla staticamente nel codice, questa è la situazione più comune. Invece `new RegExp` viene usato quando dobbiamo creare un'espressione regolare al volo partendo da una stringa generata dinamicamente, come nell'esempio:

```js
let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // equivale a /<h2>/ se nel prompt sopra avete risposto "h2"
```

## Flags

Le espressioni regolari possono avere delle flag che ne influenzano la ricerca.

In JavaScript ne abbiamo a disposizione 6:

`pattern:i`
: Con questo flag, la ricerca è case-insensitive: non c'è alcuna differenza tra `A` ed `a` (vedi gli esempi sotto).

`pattern:g`
: Con questo flag, la ricerca ritornerà tutte le occorrenze, senza questo flag, ritornerebbe solo la prima occorrenza.

Quindi se cerchiamo la sequenza `pattern:/love/` avremo lo stesso risultato che otteniamo cercando `"love"`.

`pattern:s`
: Abilita la modalità "dotall", che consente di utilizzare `pattern:.` per cercare i caratteri nuova riga `\n` (studiati nel capitolo <info:regexp-character-classes>).

`pattern:u`
: Abilita il supporto completo a Unicode. Questo flag consente di processare correttamente le coppie di caratteri surrogati. Visti in maniera più approfondita nel capitolo <info:regexp-unicode>.

`pattern:y`
: Abilita la modalità "Sticky": la quale ricerca ad un'esatta posizione nel testo (studiata in maggior dettaglio nel capitolo <info:regexp-sticky>)

```smart header="Colori"
Da qui in avanti, lo schema di colori è il seguente:

- espressione regolare -- `pattern:rosso`
- stringa (all'interno della quale cerchiamo) -- `subject:blu`
- risultato -- `match:verde`
```

## Searching: str.match

Come detto in precedenza, le espressioni regolari sono integrate nei metodi delle stringhe.

Il metodo `str.match(regexp)` trova tutte le occorrenze di `regexp` nella stringa `str`.

Possiede 3 diverse modalità:

1. Se l'espressione regolare ha la flag `pattern:g`, questa ritornerà un array con tutti i match:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (un array di 2 sotto stringhe contenente i match)
    ```
    Da notare che entrambi `match:We` e `match:we` sono stati trovati, poiché il flag `pattern:i` rende l'espressione regolare case-insensitive.

2. Se non viene fornita questa flag, allora la ricerca ritornerà solamente il primo match sotto forma di array, con con il match completo all'indice `0` ed alcuni ulteriori dettagli:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // senza la flag g

    alert( result[0] );     // We (primo match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position del match)
    alert( result.input );  // We will, we will rock you (stringa originale)
    ```
    L'array potrebbe avere ulteriori indici, oltre allo `0` se una parte dell'espressione regolare è racchiusa tra parentesi. Lo studieremo nel dettaglio nel capitolo <info:regexp-groups>.

3. E infine, se non si ha alcun match, viene ritornato `null` (non ha importanza se c'è il flag `pattern:g` o no).

    Questa sfumatura è molto importante. Se non si ottiene alcun match, non riceveremo un'array vuoto, ma `null`. Dimenticarsene potrebbe portare a diversi errori, ad esempio:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    Se invece preferiamo che il risultato sia sempre sotto forma di array, possiamo riscriverla in questo modo:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // ora funziona correttamente
    }
    ```

## Sostituzioni: str.replace

Il metodo `str.replace(regexp, replacement)` sostituisce i match trovati con l'utilizzo di `regexp` nella stringa `str` con `replacement` (tutti i match nel caso ci sia la flag `pattern:g`, altrimenti, solamente il primo).

Ad esempio:

```js run
// senza la flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// con la flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

Il secondo argomento è la stringa di `replacement` (quella che andrà a sostituire i match). Possiamo utilizzare combinazioni di caratteri speciali per inserire "frammenti" del match:

| Symbols | Azione nella stringa di sostituzione |
|--------|--------|
|`$&`|inserisce l'intero match|
|<code>$&#096;</code>|inserisce una porzione della stringa prima del match|
|`$'`|inserisce una parte della stringa dopo il match|
|`$n`|se `n` è una cifra numerica 1-2, allora inserisce il contenuto dell'n-esima parentesi, più nel dettaglio nel capitolo <info:regexp-groups>|
|`$<name>`|inserisce il contenuto delle parentesi con il `name` fornito, maggiori dettagli nel capitolo <info:regexp-groups>|
|`$$`|inserisce il carattere `$` |

Un esempio con `pattern:$&`:

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

Il metodo `regexp.test(str)` cerca almeno un'occorrenza, se la trova ritorna `true`, altrimenti `false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Più avanti nel capitolo studieremo ulteriori espressioni regolari, vedremo diversi esempi, e altri metodi.

Puoi trovare le informazioni complete riguardo i metodi nell'articolo <info:regexp-methods>.

## Riepilogo

- Un'espressione regolare è formata da una sequenza e eventualmente da alcune flag: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Senza flag e simboli speciali che studieremo in seguito, cercare con una regexp è lo stesso di cercare con una sottostringa.
- Il metodo `str.search(regexp)` restituisce l'indice dove viene trovata la corrispondenza, oppure `-1` se non ci sono corrispondenze. Nel prossimo capitolo vedremo altri metodi.
- Il metodo `str.replace(regexp, replacement)` sostituisce tutte le occorrenze trovate tramite la `regexp` con `replacement`: le sostituirà tutte se la flag `pattern:g` è attiva, altrimenti sostituirà solamente la prima.
- Il metodo `regexp.test(str)` ritorna `true` se trova almeno un match, `false` altrimenti.