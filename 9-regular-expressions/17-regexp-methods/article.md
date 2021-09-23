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

    // Additional information:
    alert( result.index );  // 7 (posizione della corrispondenza)
    alert( result.input );  // I love JavaScript (stringa sorgente)
    ```

2. Se la `regexp` presenta la flag `pattern:g`, restituisce un array contenente tutte le corrispondenze sotto forma di stringhe, senza i gruppi di acquisizione né ulteriori dettagli.
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. Se non esistono corrispondenze, indipendentemente dalla presenza o meno della flag `pattern:g`, è restituito `null`.

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

Se usiamo `for..of` to loop over le corrispondenze di `matchAll`, non necessitiamo più di `Array.from`.

## str.split(regexp|substr, limit)

Divide la stringa usando l'espressione regolare (o una sottostringa) come separatore.

Possiamo usare `split` con le stringhe, nel seguente modo:

```js run
alert('12-34-56'.split('-')) // array di ['12', '34', '56']
```

Possiamo anche dividere con un'espressione regolare, allo stesso modo:

```js run
alert('12, 34, 56'.split(/,\s*/)) // array di ['12', '34', '56']
```

## str.search(regexp)

Il metodo `str.search(regexp)` restituisce la posizione della prima corrispondenza, o `-1` se non ne viene trovata alcuna:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( /ink/i ) ); // 10 (posizione della prima corrispondenza)
```

**La limitazione importante: `search` trova solo la prima corrispondenza.**

Se abbiamo bisogno della posizione di una corrispondenza successiva, dobbiamo usare altri mezzi, ad esempio trovandole tutte con `str.matchAll(regexp)`.

## str.replace(str|regexp, str|func)

Questo è un metodo generico per cercare e sostituire e uno dei più utili: è l'equivalente di un coltellino svizzero in questo campo.  

Possiamo usarlo senza espressioni regolari, per cercare e sostituire una sottostringa:

```js run
// sostituire un trattino con i due punti
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

Tuttavia, vi è un'insidia.

**Quando il primo argomento di `replace` è una stringa, solo la prima corrispondenza viene sostituita.**

Si può vedere nell'esempio sopra: solo il primo `"-"` è stato sostituito da `":"`.

Per trovare tutti i trattini, non dobbiamo usare la stringa `"-"`, ma l'espressione regolare `pattern:/-/g`, obbligatoriamente con la flag`pattern:g`:

```js run
// sostituire tutti i trattini con i due punti
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

Il secondo argomento è una stringa di sostituzione. Possiamo usare caratteri speciali al suo interno:

| Simboli | Azione nella stringa di sostituzione |
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

// inver
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**Per situazioni che richiedono sostituzioni "intelligenti", il secondo argomento può essere una funzione.**

Essa sarà chiamata per ogni corrispondenza, e il valore restituito sarà inserito come sostituto.

La funzione è chiamata con gli argomenti `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- la corrispondenza,
2. `p1, p2, ..., pn` -- contenuti dei gruppi di acquisizione (se ce ne sono),
3. `offset` -- posizione della corrispondenza,
4. `input` -- la stringa sorgente,
5. `groups` -- un oggetto con i gruppi nominati.

Se non ci sono parentesi all'interno dell'espressione regolare, la funzione avrà solo 3 argomenti: `func(str, offset, input)`.

Per esempio, rendiamo maiuscole tutte le corrispondenze:

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

Rimpiazzare ogni corrispondenza con la sua posizione nella stringa:

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

Nell'esempio seguente ci sono due parentesi, pertanto la funzione di sostituzione è chiamata con 5 argomenti: la prima è la corrispondenza completa, poi le 2 parentesi, e dopo di esse la posizione della corrispondenza e la stringa sorgente (non usate nell'esempio):

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

O, se stiamo usando gruppi nominati, l'oggetto `groups` essi contenente è sempre l'ultimo, così possiamo ottenerlo in questo modo:

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

Usare una funzione ci permette di usare un potere sostitutivo supremo, poiché ottiene tutte le informazioni sulla corrispondenza, ha accesso alle variabili esterne e può fare qualsiasi cosa.

## str.replaceAll(str|regexp, str|func)

Questo metodo è praticamente uguale a `str.replace`, ma con due differenze rilevanti:

1. Se il primo argomento è una stringa, sostituisce *tutte le corrispondenze* della stringa, mentre `replace` sostituisce solamente la *prima corrispondenza*.
2. Se il primo argomento è un'espressione regolare con la flag `g`, sarà generato un errore. Con la `g` flag, funziona come `replace`.

Il caso principale in cui si usa `replaceAll` è la sostituzione di tutte le corrispondenze di una stringa.

In questo modo:

```js run
// sostituire tutti i trattini con i due punti
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
```


## regexp.exec(str)

Il metodo `regexp.exec(str)` restituisce una corrispondenza di `regexp` nella stringa `str`.  A differenza dei metodi precedenti, viene chiamato su un'espressione regolare, non su una stringa.

Si comporta differentemente a seconda della presenza o meno della flag `pattern:g` nell'espressione regolare.

Se non c'è `pattern:g`, `regexp.exec(str)` restituisce la prima corrispondenza, esattamente come  `str.match(regexp)`. Questo comportamento non comporta niente di nuovo.

Ma se c'è una flag `pattern:g`, allora:
- A call to `regexp.exec(str)` returns the first match and saves the position immediately after it in the property `regexp.lastIndex`.
- The next such call starts the search from position `regexp.lastIndex`, returns the next match and saves the position after it in `regexp.lastIndex`.
- ...And so on.
- If there are no matches, `regexp.exec` returns `null` and resets `regexp.lastIndex` to `0`.

So, repeated calls return all matches one after another, using property `regexp.lastIndex` to keep track of the current search position.

In the past, before the method `str.matchAll` was added to JavaScript, calls of `regexp.exec` were used in the loop to get all matches with groups:

```js run
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found JavaScript at position 11, then
  // Found javascript at position 33
}
```

This works now as well, although for newer browsers `str.matchAll` is usually more convenient.

**We can use `regexp.exec` to search from a given position by manually setting `lastIndex`.**

For instance:

```js run
let str = 'Hello, world!';

let regexp = /\w+/g; // without flag "g", lastIndex property is ignored
regexp.lastIndex = 5; // search from 5th position (from the comma)

alert( regexp.exec(str) ); // world
```

If the regexp has flag `pattern:y`, then the search will be performed exactly at the  position `regexp.lastIndex`, not any further.

Let's replace flag `pattern:g` with `pattern:y` in the example above. There will be no matches, as there's no word at position `5`:

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // search exactly at position 5

alert( regexp.exec(str) ); // null
```

That's convenient for situations when we need to "read" something from the string by a regexp at the exact position, not somewhere further.

## regexp.test(str)

The method `regexp.test(str)` looks for a match and returns `true/false` whether it exists.

For instance:

```js run
let str = "I love JavaScript";

// these two tests do the same
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

An example with the negative answer:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

If the regexp has flag `pattern:g`, then `regexp.test` looks from `regexp.lastIndex` property and updates this property, just like `regexp.exec`.

So we can use it to search from a given position:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// start the search from position 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (no match)
```

````warn header="Same global regexp tested repeatedly on different sources may fail"
If we apply the same global regexp to different inputs, it may lead to wrong result, because `regexp.test` call advances `regexp.lastIndex` property, so the search in another string may start from non-zero position.

For instance, here we call `regexp.test` twice on the same text, and the second time fails:

```js run
let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
```

That's exactly because `regexp.lastIndex` is non-zero in the second test.

To work around that, we can set `regexp.lastIndex = 0` before each search. Or instead of calling methods on regexp, use string methods `str.match/search/...`, they don't use `lastIndex`.
````
