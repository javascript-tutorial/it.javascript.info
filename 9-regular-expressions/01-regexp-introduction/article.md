# Pattern e flag

Una espressione regolare (regular expression,  "regexp" o solo "reg") è formata da una sequenza di caratteri (*pattern*) e da eventuali *flag*.

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

Gli slash `"/"` comunicano a JavaScript che stiamo creando una espressione regolare. Hanno lo stesso ruolo delle virgolette per le stringhe.

Gli slash `"/"` vengono usati quando conosciamo l'espressione regolare e possiamo includerla staticamente nel codice, questa è la situazione più comune. Invece `new RegExp` viene usato quando dobbiamo creare un'espressione regolare al volo partendo da una stringa generata dinamicamente.

## Uso

Per cercare in una stringa, possiamo usare il metodo [search](mdn:js/String/search).

Il metodo `str.search` cerca la sequenza `pattern:/love/` e restituisce la sua posizione all'interno della stringa. Come si può immaginare, il pattern `pattern:/love/` è la sequenza più semplice possibile. Quel che fa è la semplice ricerca di una sottostringa.

Il codice qui sopra fa lo stesso di:

```js run
let str = "I love JavaScript!"; // cercherà qui

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`pattern:g`
: With this flag the search looks for all matches, without it -- only the first match is returned.

Quindi se cerchiamo la sequenza `pattern:/love/` avremo lo stesso risultato che otteniamo cercando `"love"`.

`pattern:s`
: Enables "dotall" mode, that allows a dot `pattern:.` to match newline character `\n` (covered in the chapter <info:regexp-character-classes>).

`pattern:u`
: Enables full Unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`pattern:y`
: "Sticky" mode: searching at the exact position in the text  (covered in the chapter <info:regexp-sticky>)

```smart header="Colors"
Da qui in avanti, lo schema di colori è il seguente:

- espressione regolare -- `pattern:rosso`
- stringa (all'interno della quale cerchiamo) -- `subject:blu`
- risultato -- `match:verde`
```

## Searching: str.match

Quando usiamo la sintassi `new RegExp`?
Usualmente usiamo la sintassi più breve `/.../`. Ma non supporta inserimenti di variabili con `${...}`.

Tuttavia, `new RegExp` permette di costruire dinamicamente una sequenza da una stringa, quindi è più flessibile.

Qui un esempio di un'espressione regolare generata dinamicamente:

```js run
let tag = prompt("Quale tag vuoi cercare?", "h2");
let regexp = new RegExp(`<${tag}>`);

// trova <h2> di default
alert( "<h1> <h2> <h3>".search(regexp));
```

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";


## Flag

Le espressioni regolari possono avere flag che modificano la ricerca.

Ce ne sono solo 6 in JavaScript:

`i`
: Con questa flag la ricerca non è sensibile all'uso di maiuscole (è case-insensitive) : non ci sono differenze tra `A` e `a` (vedi esempio in basso).

`g`
: Con questa flag la ricerca trova tutte le corrispondenze, senza la flag troverà solo la prima corrispondenza (ne vedremo gli usi nel prossimo capitolo).

`m`
: Modalità multilinea (multiline mode) (approfondita nel capitolo <info:regexp-multiline-mode>).

`s`
: Modalità "dotall", permette a `.` di ottenere le corrispondenze per le andate a capo (approfondito nel capitolo <info:regexp-character-classes>).

`u`
: Attiva il pieno supporto unicode. La flag consente di processare correttamente le coppie surrogate. Di più a proposito nel capitolo <info:regexp-unicode>.

`y`
: "Sticky mode" (approfondita nel capitolo <info:regexp-sticky>)

Approfondiremo tutte queste flag successivamente nel tutorial.

Per ora, la flag più semplice è `i`, qui un esempio:

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

alert( str.search(/LOVE/i) ); // 2 (trovata in minuscolo)

alert( str.search(/LOVE/) ); // -1 (non trova niente senza la flag 'i')
```

Quindi la flag `i` già rende le espressioni regolari più potenti rispetto alla semplice ricerca di una sottostringa. Ma c'è molto di più. Parleremo delle altre flag e caratteristiche nei prossimi capitoli.

Full information about the methods is given in the article <info:regexp-methods>.

## Riepilogo

- Una espressione regolare è formata da una sequenza e eventualmente da alcune flag: `g`, `i`, `m`, `u`, `s`, `y`.
- Senza flag e simboli speciali che studieremo in seguito, cercare con una regexp è lo stesso di cercare con una sottostringa.
- Il metodo `str.search(regexp)` restituisce l'indice dove viene trovata la corrispondenza, oppure `-1` se non ci sono corrispondenze. Nel prossimo capitolo vedremo altri metodi.
