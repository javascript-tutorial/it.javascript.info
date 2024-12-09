# Metodi di RegExp e String

In questo articolo analizzeremo estensivamente diversi metodi che funzionano con le espressioni regolari.

## str.match(regexp)

Il metodo `str.match(regexp)` trova corrispondenze di `regexp` all'interno della stringa `str`.

Ha 3 modalità:

1. Se la `regexp` non presenta la flag `pattern:g`, essa restituisce la prima corrispondenza sotto forma di array con i gruppi di acquisizione e le proprietà `index` (posizione della corrispondenza) e `input` (la stringa sorgente, ovvero `str`):

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (corrispondenza completa)
    alert( result[1] );     // Script (primo gruppo di acquisizione)
    alert( result.length ); // 2

    // Informazioni aggiuntive:
    alert( result.index );  // 7 (posizione della corrispondenza)
    alert( result.input );  // I love JavaScript (stringa sorgente)
    ```

2. Se la `regexp` presenta la flag `pattern:g`, restituisce un array contenente tutte le corrispondenze sotto forma di stringhe, senza i gruppi di acquisizione o ulteriori dettagli.
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. Se non esistono corrispondenze, indipendentemente dalla presenza o meno della flag `pattern:g`, ci viene restituito `null`.

    È una differenza sottile, ma importante. Se non esistono corrispondenze, infatti, non ci viene restituito un array vuoto, ma `null`. È facile sbagliare dimenticandosene, e.g.:

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null
    ```

    Tuttavia, se desideriamo che il risultato sia un array, possiamo scrivere quanto segue:

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

[recent browser="new"]

Il metodo `str.matchAll(regexp)` è una variante innovativa di `str.match`.

È usato prevalentemente per cercare tutte le corrispondenze con tutti i gruppi di acquisizione.

Ci sono 3 differenze rispetto a `match`:

1. Restituisce, al posto di un array, un oggetto iterabile contenente le corrispondenze. Da esso possiamo creare un array normale usando `Array.from`.
2. Ogni corrispondenza è restituita sotto forma di un array con i gruppi di acquisizione (lo stesso formato di `str.match` senza la flag `pattern:g`).
3. Se non esistono risultati, restituisce un oggetto iterabile vuoto al posto di `null`.

Esempio di utilizzo:

```js run
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], non un array, ma un oggetto iterabile

matchAll = Array.from(matchAll); // ora è un array

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

Se usiamo `for..of` per accedere alle corrispondenze di `matchAll`, non abbiamo più bisogno di usare `Array.from`.

## str.split(regexp|substr, limit)

Questo metodo divide una stringa utilizzando un'espressione regolare (o una sottostringa) come separatore.

Possiamo usare `split` con le stringhe nel seguente modo:

```js run
alert('12-34-56'.split('-')) // ['12', '34', '56']
```

Possiamo dividere le stringhe tramite un'espressione regolare, allo stesso modo:

```js run
alert('12, 34, 56'.split(/,\s*/)) // ['12', '34', '56']
```

## str.search(regexp)

Il metodo `str.search(regexp)` restituisce la posizione della prima corrispondenza, o `-1` se non ne viene trovata alcuna:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( /ink/i ) ); // 10 (posizione della prima corrispondenza)
```

**La limitazione importante: `search` trova solamente la prima corrispondenza.**

Se avessimo bisogno della posizione di una corrispondenza successiva, dovremmo usare altri mezzi, ad esempio `str.matchAll(regexp)` per trovarle tutte.

## str.replace(str|regexp, str|func)

Questo è un metodo generico per cercare e sostituire, ed è uno dei più utili: è l'equivalente di un coltellino svizzero in questo campo.  

Possiamo usarlo senza espressioni regolari, per cercare e sostituire una sottostringa:

```js run
// sostituire un trattino con i due punti
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

Tuttavia, c'è un'insidia.

**Quando il primo argomento di `replace` è una stringa, solo la prima corrispondenza sarà sostituita.**

È possibile osservarlo nell'esempio sopra: solo il primo `"-"` è stato sostituito da `":"`.

Per trovare tutti i trattini, non dobbiamo usare la stringa `"-"`, ma l'espressione regolare `pattern:/-/g`, obbligatoriamente con la flag`pattern:g`:

```js run
// sostituire tutti i trattini con i due punti
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

Il secondo argomento è una stringa di sostituzione. Possiamo usare caratteri speciali al suo interno:

| Caratteri | Azione eseguita nella stringa di sostituzione |
|--------|--------|
|`$&`|inserisce l'intera corrispondenza|
|<code>$&#096;</code>|inserisce una parte della stringa prima della corrispondenza|
|`$'`|inserisce una parte della stringa dopo la corrispondenza|
|`$n`|se `n` è un numero a una o 2 cifre, inserisce il contenuto dell'n-esimo gruppo di acquisizione, per i dettagli consultare [](info:regexp-groups)|
|`$<name>`|inserisce il contenuto delle parentesi con il `name` fornito, per i dettagli consultare [](info:regexp-groups)|
|`$$`|inserisce il carattere `$` |

Per esempio:

```js run
let str = "John Smith";

// invertire nome e cognome
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**Per situazioni che richiedono sostituzioni "intelligenti", il secondo argomento può essere una funzione.**

Essa sarà chiamata per ogni corrispondenza, e il valore restituito sarà la sostituzione.

La funzione è chiamata con gli argomenti `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- la corrispondenza,
2. `p1, p2, ..., pn` -- i contenuti dei gruppi di acquisizione (se ce ne sono),
3. `offset` -- la posizione della corrispondenza,
4. `input` -- la stringa sorgente,
5. `groups` -- un oggetto con i gruppi nominati.

Se non ci sono parentesi all'interno dell'espressione regolare, la funzione avrà solo 3 argomenti: `func(str, offset, input)`.

Per esempio, per rendere maiuscole tutte le corrispondenze:

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

Per rimpiazzare ogni corrispondenza con la sua posizione nella stringa:

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

Nell'esempio seguente ci sono due parentesi, di conseguenza la funzione di sostituzione è chiamata con 5 argomenti: la prima è la corrispondenza completa, poi le 2 parentesi, e dopo di esse la posizione della corrispondenza e la stringa sorgente (omesse nell'esempio):

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

Se sono presenti numerosi gruppi, è conveniente usare i parametri rest per accedervi:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

Altrimenti, se stiamo usando gruppi nominati, l'oggetto `groups` essi contenente è sempre l'ultimo e possiamo ottenerlo in questo modo:

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

Usare una funzione ci permette di adoperare un potere sostitutivo supremo, poiché essa ottiene tutte le informazioni sulla corrispondenza, ha accesso alle variabili esterne e può fare qualsiasi cosa.

## str.replaceAll(str|regexp, str|func)

Questo metodo è praticamente uguale a `str.replace`, ma con due differenze rilevanti:

<<<<<<< HEAD
1. Se il primo argomento è una stringa, sostituisce *tutte le corrispondenze* della stringa, mentre `replace` sostituisce solamente la *prima corrispondenza*.
2. Se il primo argomento è un'espressione regolare con la flag `g`, sarà restituito un errore. Con la `g` flag, infatti, funziona come `replace`.

Il motivo principale per cui si usa `replaceAll` è la necessità di sostituire ogni corrispondenza in una stringa.
=======
1. If the first argument is a string, it replaces *all occurrences* of the string, while `replace` replaces only the *first occurrence*.
2. If the first argument is a regular expression without the `g` flag, there'll be an error. With `g` flag, it works the same as `replace`.

The main use case for `replaceAll` is replacing all occurrences of a string.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In questo modo:

```js run
// sostituire tutti i trattini con i due punti
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
```


## regexp.exec(str)

Il metodo `regexp.exec(str)` restituisce una corrispondenza di `regexp` nella stringa `str`.  A differenza dei metodi precedenti, viene chiamato su un'espressione regolare, non su una stringa.

Si comporta differentemente a seconda della presenza o meno della flag `pattern:g` nell'espressione regolare.

Se non c'è `pattern:g`, `regexp.exec(str)` restituirà la prima corrispondenza, esattamente come  `str.match(regexp)`. Questo comportamento non comporta niente di nuovo.

Ma se c'è una flag `pattern:g`, allora:
- Una chiamata a `regexp.exec(str)` restituisce la prima corrispondenza e salva la posizione immediatamente successiva a essa nella proprietà `regexp.lastIndex`.
- La successiva chiamata di tale tipo inizia la ricerca a partire dalla posizione `regexp.lastIndex`, restituisce la corrispondenza successiva e salva la posizione seguente in `regexp.lastIndex`.
- ...E così via.
- Se non esistono corrispondenze, `regexp.exec` restituirà `null` e reimposterà `regexp.lastIndex` a `0`.

Perciò le chiamate ripetute restituiscono tutte le corrispondenze una dopo l'altra, usando la proprietà `regexp.lastIndex` per tenere traccia della posizione di ricerca corrente.

Nel passato, prima che il metodo `str.matchAll` fosse implementato in JavaScript, le chiamate a `regexp.exec` erano usate nei loop per ottenere tutte le corrispondenze con i gruppi:

```js run
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // JavaScript trovato alla posizione 11, quindi
  // javascript trovato alla posizione 33
}
```

Questo approccio funziona anche adesso, anche se per i browser moderni solitamente `str.matchAll` è più conveniente rispetto a un loop contenente `regexp.exec`. 

**Possiamo usare `regexp.exec` per cercare a partire da una posizione da noi scelta impostando manualmente `lastIndex`.**

Per esempio:

```js run
let str = 'Hello, world!';

let regexp = /\w+/g; // senza la flag "g", la proprietà lastIndex viene ignorata
regexp.lastIndex = 5; // ricerca a partire dalla quinta posizione (dalla virgola)

alert( regexp.exec(str) ); // world
```

Se l'espressione regolare presenta la flag `pattern:y`, la ricerca sarà eseguita esattamente alla posizione `regexp.lastIndex`, senza andare oltre.

Sostituiamo la flag `pattern:g` con `pattern:y` nell'esempio sopra. Non ci saranno corrispondenze, perché non c'è una parola alla posizione `5`:

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // ricerca esattamente alla posizione 5

alert( regexp.exec(str) ); // null
```

Ciò è conveniente per le situazioni in cui abbiamo bisogno di "leggere" qualcosa dalla stringa con un'espressione regolare alla posizione esatta, non a un'altra posizione più avanti.

## regexp.test(str)

Il metodo `regexp.test(str)` cerca una corrispondenza in una stringa `str` e restituisce `true/false` a seconda della sua esistenza.

Per esempio:

```js run
let str = "I love JavaScript";

// questi due esempi fanno la stessa cosa
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

Un esempio con l'esito negativo:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

Se l'espressione regolare ha la flag `pattern:g`, `regexp.test` cerca a partire dal valore della proprietà `regexp.lastIndex` e l'aggiorna, come fa `regexp.exec`.

Pertanto possiamo usarlo per cercare a partire da una posizione da noi scelta:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// la ricerca inizia dalla posizione 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (nessuna corrispondenza)
```

````warn header="Same global regexp tested repeatedly on different sources may fail"
Se applichiamo la stessa espressione regolare globale a stringhe differenti potrebbero verificarsi risultati errati, poiché la chiamata di `regexp.test` aggiorna la proprietà `regexp.lastIndex`, per cui la ricerca in un'altra stringa potrebbe iniziare da una posizione diversa da 0.

Per esempio, qui chiamiamo `regexp.test` due volte sullo stesso testo, e la seconda volta fallisce:

```js run
let regexp = /javascript/g;  // (espressione regolare appena creata: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (ora regexp.lastIndex=10)
alert( regexp.test("javascript") ); // false
```

Ciò avviene proprio perché `regexp.lastIndex` è diverso da 0 nella seconda prova.

Per risolvere il problema, possiamo impostare `regexp.lastIndex = 0` prima di ogni ricerca, o piuttosto che chiamare metodi sull'espressione regolare, usare i metodi delle stringhe `str.match/search/...`: essi infatti non usano la proprietà `lastIndex`.
````
