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

## I contenuti tra parentesi nella corrispondenza

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

Aggiungiamo le parentesi a questo scopo: `pattern:<(([a-z]+)\s*([^>]*))>`.

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

Troviamo il gruppo della seconda parentesi `pattern:([a-z]+)` in `result[2]` ed a seguire il nome del tag `pattern:([^>]*)` in `result[3]`.

Ed ecco la rappresentazione del contenuto di ciascun gruppo nella stringa:

![](regexp-nested-groups-matches.svg)

### Gruppi opzionali

Anche se un gruppo è opzionale e non ha alcun riscontro (ad esempio ha il quantificatore `pattern:(...)?`), l'elemento corrispondente è comunque presente nell'array `result` ed equivale a `undefined`.

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
Il metodo `matchAll` non è supportato nei browser più datati.

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

<<<<<<< HEAD
Come possiamo notare la prima differenza è davvero rilevante, lo dimostra la linea `(*)`. Non possiamo ricavare la corrispondenza come `results[0]` perché quell'oggetto non è uno pseudo array. Possiamo convertirlo in un `Array` a tutti gli effetti tramite `Array.from`. Trovate ulteriori dettagli sugli pseudo array e sugli iterabili nell'articolo <info:iterable>.

Non occorre la conversione con `Array.from` se adoperiamo un ciclo iterativo sui risultati:
=======
As we can see, the first difference is very important, as demonstrated in the line `(*)`. We can't get the match as `results[0]`, because that object is a pseudoarray. We can turn it into a real `Array` using `Array.from`. There are more details about pseudoarrays and iterables in the article <info:iterable>.

There's no need for `Array.from` if we're looping over results:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
  // primo alert: <h1>,h1
  // secondo: <h2>,h2
}
```

...Oppure se ci avvaliamo della sintassi destrutturata:

```js
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
```

Ogni elemento dell'oggetto di risultati restituito da `matchAll` ha lo stesso formato del risultato di `match` senza il flag `pattern:g`: si tratta di un array con le proprietà aggiuntive `index` (la posizione del riscontro nella stringa) e `input` (la stringa sorgente):

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

```smart header="Perché il risultato di `matchAll` è un oggetto iterabile e non un array?"
Perché questo metodo è progettato in questo modo? La ragione è semplice, per l'ottimizzazione.

La chiamata a `matchAll` non esegue la ricerca. Al contrario, restituisce un oggetto iterabile inizialmente privo di risultati. La ricerca è eseguita ogni volta che richiediamo un elemento, ad esempio all'interno di un ciclo iterativo.

Verranno pertanto trovati tutti i risultati necessari, non di più.

Considerate che potrebbero esserci anche 100 riscontri nel testo, ma potremmo decidere che sono sufficienti le prime cinque iterazioni di un ciclo `for..of` e interrompere con `break`. L'interprete a quel punto non sprecherà tempo a recuperare gli altri 95 risultati.
```

## I gruppi nominati

Ricordare i gruppi con i rispettivi numeri è difficoltoso. È fattibile per i pattern semplici, ma per quelli più complessi contare le parentesi è scomodo. Abbiamo a disposizione un'opzione decisamente migliore: dare un nome alle parentesi.

Per farlo inseriamo `pattern:?<name>` subito dopo la parentesi di apertura.

Cerchiamo una data, ad esempio, nel formato "year-month-day":

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

Come potete osservare, troviamo i gruppi dentro la proprietà `.groups`.

Per cercare tutte le date, possiamo aggiungere il flag `pattern:g`.

Abbiamo inoltre bisogno di `matchAll` per ottenere sia le corrispondenze sia il dettaglio dei gruppi:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // primo alert: 30.10.2019
  // secondo: 01.01.2020
}
```

## Sostituire testo con i gruppi di acquisizione

Il metodo `str.replace(regexp, replacement)`, che sostituisce tutti i riscontri con `regexp` in `str`, consente di usare il contenuto tra parentesi nella stringa `replacement`. Per farlo si usa `pattern:$n`, dove `pattern:n` indica il numero del gruppo.

Ad esempio,

```js run
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

Per i gruppi nominati il riferimento sarà `pattern:$<name>`.

Rimoduliamo, ad esempio, le date da "year-month-day" a "day.month.year":

```js run
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

## I gruppi non acquisiti e l'uso di ?:

Talvolta abbiamo bisogno delle parentesi per applicare correttamente un quantificatore, ma non vogliamo il loro contenuto nel risultato.

Un gruppo può essere escluso aggiungendo `pattern:?:` dopo la parentesi di apertura.

Se desideriamo, ad esempio, cercare `pattern:(go)+`, ma non vogliamo il contenuto tra le parentesi (`go`) in un elemento dell'array, scriveremo: `pattern:(?:go)+`.

Nell'esempio qui di seguito otterremo solo il nome `match:John` come elemento distinto nel risultato:

```js run
let str = "Gogogo John!";

*!*
// ?: esclude 'go' dall'acquisizione
let regexp = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(regexp);

alert( result[0] ); // Gogogo John (l'intera corrispondenza)
alert( result[1] ); // John
alert( result.length ); // 2 (non ci sono ulteriori elementi nell'array)
```

## Riepilogo

Le parentesi raggruppano insieme una parte dell'espressione regolare, in modo che il quantificatore si applichi al gruppo nel suo insieme.

I gruppi tra parentesi sono numerati da sinistra verso destra, e, facoltativamente, si può attribuire loro un nome `(?<name>...)`.

Il contenuto di un gruppo può essere ottenuto nei risultati:

- Il metodo `str.match` restituisce i gruppi di acquisizione solo se non è presente il flag `pattern:g`.
- Il metodo `str.matchAll` restituisce in ogni caso i gruppi di acquisizione.

Se le parentesi non hanno alcun nome, il loro contenuto è disponibile nell'array dei risultati col rispettivo numero. I gruppi nominati sono disponibili anche nella proprietà `groups`.

Possiamo usare, inoltre, il contenuto tra parentesi nella sostituzione di stringhe con `str.replace`: in base al numero `$n` o in base al nome `$<name>`.

Un gruppo può essere escluso dalla numerazione aggiungendo `pattern:?:` dopo la parentesi di apertura. Di solito si fa se abbiamo bisogno di applicare un quantificatore ad un intero gruppo, ma non vogliamo che quel gruppo compaia come elemento distinto nell'array dei risultati. In quel caso non possiamo nemmeno usare un riferimento a tali gruppi nella sostituzione di stringhe.
