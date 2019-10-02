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

## Uso

Per cercare in una stringa, possiamo usare il metodo [search](mdn:js/String/search).

Qui un esempio:

```js run
let str = "I love Javascript!"; // cercherà qui

let regexp = /love/;
alert( str.search(regexp) ); // 2
```

Il metodo `str.search` cerca la sequenza `pattern:/love/` e restituisce la sua posizione all'interno della stringa. Come si può immaginare, il pattern `pattern:/love/` è la sequenza più semplice possibile. Quel che fa è la semplice ricerca di una sottostringa.

Il codice qui sopra fa lo stesso di:

```js run
let str = "I love JavaScript!"; // cercherà qui

let substr = 'love';
alert( str.search(substr) ); // 2
```

Quindi se cerchiamo la sequenza `pattern:/love/` avremo lo stesso risultato che otteniamo cercando `"love"`.

Questo vale solo per il momento. Presto creeremo espressioni regolari più complesse e con maggiore potere di ricerca.

```smart header="Colors"
Da qui in avanti, lo schema di colori è il seguente:

- espressione regolare -- `pattern:rosso`
- stringa (all'interno della quale cerchiamo) -- `subject:blu`
- risultato -- `match:verde`
```


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
let str = "I love JavaScript!";

alert( str.search(/LOVE/i) ); // 2 (trovata in minuscolo)

alert( str.search(/LOVE/) ); // -1 (non trova niente senza la flag 'i')
```

Quindi la flag `i` già rende le espressioni regolari più potenti rispetto alla semplice ricerca di una sottostringa. Ma c'è molto di più. Parleremo delle altre flag e caratteristiche nei prossimi capitoli.


## Riepilogo

- Una espressione regolare è formata da una sequenza e eventualmente da alcune flag: `g`, `i`, `m`, `u`, `s`, `y`.
- Senza flag e simboli speciali che studieremo in seguito, cercare con una regexp è lo stesso di cercare con una sottostringa.
- Il metodo `str.search(regexp)` restituisce l'indice dove viene trovata la corrispondenza, oppure `-1` se non ci sono corrispondenze. Nel prossimo capitolo vedremo altri metodi.
