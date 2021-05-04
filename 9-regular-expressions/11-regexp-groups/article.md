# I gruppi di acquisizione (capturing group)

Una parte del pattern può essere racchiusa tra parentesi `pattern:(...)`, diventando così un "gruppo di acquisizione" (capturing group).

Ciò comporta due conseguenze:

1. Possiamo acquisire una parte della corrispondenza come elemento separato all'interno di un array di risultati.
2. Se poniamo un quantificatore dopo le parentesi, questo si applica all'intero gruppo di acquisizione.

## Esempi

Vediamo come operano le parentesi attraverso degli esempi.

### Esempio: gogogo

Senza parentesi, il pattern `pattern:go+` significa: il carattere `subject:g` seguito da `subject:o` ripetuto una o più volte. Per esempio `match:goooo` o `match:gooooooooo`.

Le parentesi raggruppano i caratteri, pertanto `pattern:(go)+` significa `match:go`, `match:gogo`, `match:gogogo` e così via.

```js run
alert( 'Gogogo now!'.match(/(go)+/ig) ); // "Gogogo"
```

### Esempio: dominio

Facciamo un esempio un po' più complesso, un'espressione regolare per cercare il dominio di un sito.

Per esempio:

```
mail.com
users.mail.com
smith.users.mail.com
```

Come possiamo vedere, un dominio consiste in parole ripetute, un punto segue ciascuna parola tranne l'ultima.

Tradotto in un'espressione regolare diventa `pattern:(\w+\.)+\w+`:

```js run
let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
```

La ricerca funziona, ma il pattern non trova riscontro con domini contenenti un trattino, es. `my-site.com`, perché il trattino non appartiene alla classe `pattern:\w`.

Possiamo correggere il tiro rimpiazzando `pattern:\w` con `pattern:[\w-]` in ogni parola eccetto l'ultima: `pattern:([\w-]+\.)+\w+`.

### Esempio: email

Il precedente esempio può essere esteso. A partire da questo possiamo creare un'espressione regolare per le email.

Il formato delle email è: `name@domain`. Qualsiasi parola può essere "name", sono consentiti trattini e punti. L'espressione regolare diventa `pattern:[-.\w]+`.

Ecco il pattern:

```js run
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

Questa regexp non è perfetta, ma per lo più funziona e aiuta a correggere errori di battitura accidentali. L'unica verifica davvero efficace per un'email può essere fatta soltanto inviandone una.

## I contenuti tra parentesi della corrispondenza

I gruppi tra parentesi sono numerati da sinistra verso destra. Il motore di ricerca memorizza il contenuto associato a ciascuno di essi e consente di recuperarlo nel risultato.

Il metodo `str.match(regexp)`, se `regexp` non ha il flag `g`, cerca la prima corrispondenza e la restituisce in un array:

1. Nell'indice `0`: l'intera corrispondenza.
2. Nell'indice `1`: il contenuto del primo gruppo tra parentesi.
3. Nell'indice `2`: il contenuto del secondo.
4. ...e così via...

Ad esempio se volessimo trovare i tag HTML `pattern:<.*?>` per elaborarli, sarebbe conveniente averne il contenuto (ciò che è all'interno delle parentesi uncinate) in una variabile separata.

Racchiudiamo il contenuto tra parentesi, in questo modo: `pattern:<(.*?)>`.

Adesso otterremo sia l'intero tag `match:<h1>` sia il suo contenuto `match:h1` nell'array di risultati:

```js run
let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/);

alert( tag[0] ); // <h1>
alert( tag[1] ); // h1
```

### Gruppi annidati

Le parentesi possono essere annidate. Anche in questo caso la numerazione procede da sinistra verso destra.

Per esempio durante la ricerca del tag in `subject:<span class="my">` potrebbe interessarci:

1. L'intero contenuto del tag: `match:span class="my"`.
2. Il nome del tag: `match:span`.
3. Gli attributi del tag: `match:class="my"`.

Aggiungiamo le parentesi per questo scopo: `pattern:<(([a-z]+)\s*([^>]*))>`.

Ecco come sono numerate (da sinistra verso destra, a partire dalla parentesi di apertura):

![](regexp-nested-groups-pattern.svg)

In azione:

```js run
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
```

L'indice zero di `result` contiene sempre l'intera corrispondenza.

Seguono i gruppi, numerati da sinistra verso destra, a partire dalla parentesi di apertura. Il primo gruppo è `result[1]`, esso racchiude l'intero contenuto del tag.

Troviamo il gruppo della seconda parentesi `pattern:([a-z]+)` in `result[2]`, a seguire il nome del tag `pattern:([^>]*)` in `result[3]`.

Ed ecco la rappresentazione del contenuto di ciascun gruppo nella stringa:

![](regexp-nested-groups-matches.svg)

### Gruppi opzionali

Anche se un gruppo è opzionale e non ha alcun riscontro (ad esempio ha il quantificatore `pattern:(...)?`), l'elemento corrispondente nell'array `result` è ugualmente presente ed equivale a `undefined`.

Consideriamo per esempio la regexp `pattern:a(z)?(c)?` che cerca la `"a"` facoltativamente seguita da `"z"` e da `"c"`.

Se la eseguiamo sulla stringa con la singola lettera `subject:a`, questo è il risultato:

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a (l'intera corrispondenza)
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

L'array è costituito da `3` elementi, ma tutti i gruppi sono vuoti.

Ed ora ecco un riscontro più articolato per la stringa `subject:ac`:

```js run
let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (l'intera corrispondenza)
alert( match[1] ); // undefined, perché non c'è riscontro per (z)?
alert( match[2] ); // c
```

La lunghezza dell'array resta in ogni caso: `3`, ma non c'è riscontro per il gruppo `pattern:(z)?`, quindi il risultato è `["ac", undefined, "c"]`.

## Ricerca di tutte le corrispondenze con gruppi: matchAll

```warn header="`matchAll` è un nuovo metodo, potrebbe essere necessario un polyfill"
Il metodo `matchAll` non è supportato nei browsers più datati.

Potrebbe essere richiesto un polyfill come <https://github.com/ljharb/String.prototype.matchAll>.
```

Quando cerchiamo tutte le corrispondenze (flag `pattern:g`), il metodo `match` non restituisce il contenuto dei gruppi.

Cerchiamo ad esempio tutti i tag in una stringa:

```js run
let str = '<h1> <h2>';

let tags = str.match(/<(.*?)>/g);

alert( tags ); // <h1>,<h2>
```

Il risultato è un array di riscontri, ma senza i dettagli di ciascuno di essi. Nella pratica comune, tuttavia, nel risultato ci occorre il contenuto dei gruppi di acquisizione.

Per ottenerlo, dovremmo utilizzare la ricerca con il metodo `str.matchAll(regexp)`.

È stato aggiunto al linguaggio JavaScript molto tempo dopo `match`, come sua "versione nuova e migliorata".

Proprio come `match` cerca le corrispondenze, ma ci sono 3 differenze:

1. Non restituisce un array, ma un oggetto iterabile.
2. Quando è presente il flag `pattern:g`, restituisce ogni riscontro come un array i cui elementi corrispondono ai gruppi.
3. Se non c'è alcun riscontro, non restituisce `null`, bensì un oggetto iterabile vuoto.

Per esempio:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results, non è un array ma un oggetto iterabile
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

results = Array.from(results); // convertiamolo in un array

alert(results[0]); // <h1>,h1 (primo tag)
alert(results[1]); // <h2>,h2 (secondo tag)
```

As we can see, the first difference is very important, as demonstrated in the line `(*)`. We can't get the match as `results[0]`, because that object isn't pseudoarray. We can turn it into a real `Array` using `Array.from`. There are more details about pseudoarrays and iterables in the article <info:iterable>.

There's no need in `Array.from` if we're looping over results:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
  // first alert: <h1>,h1
  // second: <h2>,h2
}
```

...Or using destructuring:

```js
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
```

Every match, returned by `matchAll`, has the same format as returned by `match` without flag `pattern:g`: it's an array with additional properties `index` (match index in the string) and `input` (source string):

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

```smart header="Why is a result of `matchAll` an iterable object, not an array?"
Why is the method designed like that? The reason is simple - for the optimization.

The call to `matchAll` does not perform the search. Instead, it returns an iterable object, without the results initially. The search is performed each time we iterate over it, e.g. in the loop.

So, there will be found as many results as needed, not more.

E.g. there are potentially 100 matches in the text, but in a `for..of` loop we found 5 of them, then decided it's enough and made a `break`. Then the engine won't spend time finding other 95 matches.
```

## Named groups

Remembering groups by their numbers is hard. For simple patterns it's doable, but for more complex ones counting parentheses is inconvenient. We have a much better option: give names to parentheses.

That's done by putting `pattern:?<name>` immediately after the opening paren.

For example, let's look for a date in the format "year-month-day":

```js run
*!*
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
*/!*
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
```

As you can see, the groups reside in the `.groups` property of the match.

To look for all dates, we can add flag `pattern:g`.

We'll also need `matchAll` to obtain full matches, together with groups:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // first alert: 30.10.2019
  // second: 01.01.2020
}
```

## Capturing groups in replacement

Method `str.replace(regexp, replacement)` that replaces all matches with `regexp` in `str` allows to use parentheses contents in the `replacement` string. That's done using `pattern:$n`, where `pattern:n` is the group number.

For example,

```js run
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

For named parentheses the reference will be `pattern:$<name>`.

For example, let's reformat dates from "year-month-day" to "day.month.year":

```js run
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

## Non-capturing groups with ?:

Sometimes we need parentheses to correctly apply a quantifier, but we don't want their contents in results.

A group may be excluded by adding `pattern:?:` in the beginning.

For instance, if we want to find `pattern:(go)+`, but don't want the parentheses contents (`go`) as a separate array item, we can write: `pattern:(?:go)+`.

In the example below we only get the name `match:John` as a separate member of the match:

```js run
let str = "Gogogo John!";

*!*
// ?: exludes 'go' from capturing
let regexp = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(regexp);

alert( result[0] ); // Gogogo John (full match)
alert( result[1] ); // John
alert( result.length ); // 2 (no more items in the array)
```

## Riepilogo

Parentheses group together a part of the regular expression, so that the quantifier applies to it as a whole.

Parentheses groups are numbered left-to-right, and can optionally be named with  `(?<name>...)`.

The content, matched by a group, can be obtained in the results:

- The method `str.match` returns capturing groups only without flag `pattern:g`.
- The method `str.matchAll` always returns capturing groups.

If the parentheses have no name, then their contents is available in the match array by its number. Named parentheses are also available in the property `groups`.

We can also use parentheses contents in the replacement string in `str.replace`: by the number `$n` or the name `$<name>`.

A group may be excluded from numbering by adding `pattern:?:` in its start. That's used when we need to apply a quantifier to the whole group, but don't want it as a separate item in the results array. We also can't reference such parentheses in the replacement string.
