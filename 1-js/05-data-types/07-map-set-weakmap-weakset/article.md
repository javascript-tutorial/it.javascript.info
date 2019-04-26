
# Map, Set, WeakMap e WeakSet

Fino ad ora abbiamo imparato ad utilizzare le seguenti strutture dati:

- Oggetti per memorizzare collezioni etichettate.
- Array per memorizzare collezioni ordinate.

Ma nel mondo reale non sono sufficienti. Questo è il motivo per cui esistono anche `Map` e `Set`.

## Map

[Map](mdn:js/Map) è una collezione di elementi etichettati proprio come un `Object`. La principale differenza è che le `Map` consentono di utilizzare chiavi di qualsiasi tipo.

I principali metodi sono:

- `new Map()` -- crea la map.
- `map.set(key, value)` -- memorizza il `value` con la `key` fornita.
- `map.get(key)` -- ritorna il valore con la chiave fornita, `undefined` se la `key` non è presente nella map.
- `map.has(key)` -- ritorna `true` se la `key` esiste, `false` altrimenti.
- `map.delete(key)` -- rimuove il valore con la `key` fornita.
- `map.clear()` -- ripulisce la map.
- `map.size` -- ritorna il numero di elementi contenuti.

Ad esempio:

```js run
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Come possiamo vedere, a differenza degli oggetti, le chiavi non vengono convertite a stringhe. E' consentita qualsiasi tipo di chiave.

**Una map può anche usare oggetti come chiavi.**

Ad esempio:
```js run
let john = { name: "John" };

// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

La possibilità di utilizzare oggetti come chiave è una delle caratteristiche fondamentali delle `Map`. Per chiavi di tipo stringa, `Object` può essere sufficiente, ma sarebbe molto difficile rimpiazzare la `Map` dell'esempio sopra, con un `Object`.

Prima che venissero introdotte le `Map`, le persone aggiungevano un identificatore univoco come proprietà dell'oggetto:

```js run
// we add the id field
let john = { name: "John", *!*id: 1*/!* };

let visitsCounts = {};

// now store the value by id
visitsCounts[john.id] = 123;

alert( visitsCounts[john.id] ); // 123
```

...But `Map` is much more elegant.


```smart header="Come confronta le chiavi una `Map`"
Per eseguire test di uguaglianza, `Map` utilizza l'algoritmo [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). E' molto simile al controllo di uguaglianza stretta `===`, la vera differenza è che `NaN` viene considerato uguale a `NaN`. Quindi anche `NaN` può essere utilizzato come chiave.

Questo algoritmo non può essere cambiato o modificato in alcun modo.
```


````smart header="Concatenare"

Ogni chiamata a `map.set` ritorna la mappa stessa, in questo modo possiamo concatenare le chiamate:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Map da un Object

Quando viene creata una `Map`, possiamo fornirgli un array (o un oggetto iterabile) con delle coppie chiave/valore, come nell'esempio:

```js
// array of [key, value] pairs
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

Esiste un metodo integrato [Object.entries(obj)](mdn:js/Object/entries) che ritorna un array di coppie chiave/valore a partire da un oggetto.

Quindi possiamo inizializzare una map a partire da un oggetto in questo modo:

```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
```

Qui, `Object.entries` ritorna l'array di coppie chiave/valore: `[ ["name","John"], ["age", 30] ]`. Che sono necessarie alla `Map`.

## Iterazione su Map

Per eseguire cicli su una `map`, ci sono 3 metodi:

- `map.keys()` -- ritorna un iteratore sulle chiavi,
- `map.values()` -- ritorna un iteratore sui valori,
- `map.entries()` -- ritorna un iteratore per ogni elemento `[key, value]`, viene utilizzato di default in `for..of`.

Ad esempio:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}
```

```smart header="Viene utilizzato l'ordine di inserimento"
L'iterazione segue lo stesso ordine in cui sono stati inseriti i valori. `Map` conserva quindi l'ordine, a differenza di un normale `Object`.
```

Inoltre, `Map` possiede un metodo integrato `forEach`, simile agli `Array`:

```js
// runs the function for each (key, value) pair 
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```


## Set

Un `Set` è un insieme di valori, in cui ogni valore ha una singola occorrenza.

I metodi principali sono:

- `new Set(iterable)` -- crea un set, eventualmente a partire da un array (o un oggetto iterabile).
- `set.add(value)` -- aggiunge `value`, e ritorna il set stesso.
- `set.delete(value)` -- rimuove il `value`, ritorna `true` se `value` esiste, altrimenti `false`.
- `set.has(value)` -- ritorna `true` se il valore è contenuto nel set, altrimenti `false`.
- `set.clear()` -- rimuove tutto il contenuto del set.
- `set.size` -- ritorna il numero di elementi contenuti.

Ad esempio, vogliamo tenere una lista di visitatori. Le visite ripetute non devono però produrre dei duplicati. Un visitatore può "apparire" una sola volta.

`Set` è la soluzione corretta in questo tipo di situazione:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

L'alternativa a `Set` potrebbe essere un array di utenti, con un codice che verifichi la presenza di eventuali duplicati ad ogni inserimento, tramite il metodo [arr.find](mdn:js/Array/find). In questo modo le prestazioni calerebbero, poiché questo metodo attraverserebbe l'intero array per controllare ogni elemento. `Set` rimane quindi la struttura migliore, poiché internamente è ottimizzata per i controlli di unicità.

## Iteration su Set
Possiamo eseguire cicli su un set sia con `for..of` che con `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Una cosa divertente. La funzione `forEach` nel caso di `Set` possiede 3 argomenti: un valore, poi *un altro valore*, e infine l'oggetto. Infatti, lo stesso valore appare due volte nella lista degli argomenti.

Questo è per mantenere la compatibilità con `Map` dove `forEach` possiede tre argomenti. Ovviamente risulta essere un po' strano. Ma può aiutare a rimpiazzare `Map` con `Set` con facilità, e vice versa.

Per la gestione degli iteratori supporta gli stessi metodi di `Map`:

- `set.keys()` -- ritorna un oggetto iterabile sui valori,
- `set.values()` -- simile a `set.keys`, per compatibilità con `Map`,
- `set.entries()` -- ritorna un oggetto iterabile per i valori `[value, value]`, esiste per compatibilità con `Map`.

## WeakMap e WeakSet

`WeakSet` è uno speciale tipo di `Set` che non impedisce a JavaScript di rimuovere i suoi elementi dalla memoria. `WeakMap` è analogo per `Map`.

Come abbiamo già compreso nel capitolo <info:garbage-collection>, il motore JavaScript mantiene un valore in memoria fino a che questo risulta accessibile (e potrebbe potenzialmente essere utilizzato).

Ad esempio:
```js
let john = { name: "John" };

// the object can be accessed, john is the reference to it

// overwrite the reference
john = null;

*!*
// the object will be removed from memory
*/!*
```

Solitamente, le  proprietà di un oggetto o gli elementi di un array o di qualsiasi altra struttura dati vengono considerati accessibili e mantenuti in memoria fino a che la struttura di dati rimane in memoria.

Ad esempio, se inseriamo un oggetto in un array, fino a che l'array rimane vivo, anche l'oggetto rimarrà vivo, anche se non sono presenti riferimenti.

Come nell'esempio:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // overwrite the reference

*!*
// john is stored inside the array, so it won't be garbage-collected
// we can get it as array[0]
*/!*
```

O, se utilizziamo un oggetto come chiave in un `Map`, fino a che la `Map` esiste, anche l'oggetto esisterà. Occuperà memoria e non potrà essere ripulito dal garbage collector.

Ad esempio:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

*!*
// john is stored inside the map,
// we can get it by using map.keys()
*/!*
```

`WeakMap/WeakSet` sono fondamentalmente diversi in questo aspetto. Infatti non prevengono l'azione del garbage collector sugli oggetti utilizzati come chiave.

Iniziamo a spiegarle più in dettaglio partendo da `WeakMap`.

La prima differenza tra `Map` è che le chiavi di `WeakMap` devono essere oggetti, non valori primitivi:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // works fine (object key)

*!*
// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object
*/!*
```

Ora, se utilizziamo un oggetto come chiave, e perdiamo tutti i riferimenti a quell'oggetto -- questo verrà rimosso dalla memoria (e dalla map) automaticamente.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference

// john is removed from memory!
```

Fate il confronto con l'esempio di `Map` sopra. Ora se `john` esiste solo come chiave della `WeakMap` -- verrà eliminato automaticamente.

`WeakMap` non supportano gli iteratori e i metodi `keys()`, `values()`, `entries()`, quindi non c'è alcun modo di ottenere tutte le chiavi o valori tramite questi metodi.

`WeakMap` possiede solamente i seguenti metodi:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Perché questa limitazione? Per ragioni tecniche. Se un oggetto ha perso tutti i riferimenti (come `john` nel codice sopra), allora verrà automaticamente eliminato. Ma tecnicamente non è specificato esattamente quando *averrà la pulizia*.

Sarà il motore JavaScript a deciderlo. Potrebbe decidere di effettuare subito la pulizia della memoria oppure aspettare più oggetti per eliminarli in blocco. Quindi, tecnicamente il conteggio degli elementi di un `WeakMap` non è conosciuto. Il motore potrebbe già aver effettuato la pulizia oppure no, o averlo fatto solo parzialmente. Per questo motivo, i metodi che accedono a `WeakMap` per intero, non sopo supportati.

Dove potremmo avere bisogno di una struttura simile?

L'idea di `WeakMap` è che possiamo memorizzare qualcosa relativo ad un oggetto solamente fino a chè anche l'oggetto stesso esiste. Ma non vogliamo forzare la presenza in memoria dell'oggetto solamente perché abbiamo memorizzato un dettaglio collegato ad esso.

```js
weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically
```

Questo diventa utile per situazioni in cui abbiamo memorizzato gli oggetti da qualche parte, ma vogliamo anche tenere nota di alcune informazioni addizionali, che sono rilevanti solamente finché l'oggetto vive.

Proviamo a guardare un esempio.

Possiamo pensare di avere del codice che tiene nota del conteggio delle visite per ogni utente. L'informazioni viene memorizzata in un map: l'utente è la chiave mentre il conteggio delle visite è il valore. Quando l'utente esce, vogliamo smettere di mantenere in memoria il conteggio delle visite.

Un modo potrebbe essere quello di mantenere traccia degli utenti, e all'uscita -- pulire la map manualmente:

```js run
let john = { name: "John" };

// map: user => visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

// now john leaves us, we don't need him anymore
john = null;

*!*
// but it's still in the map, we need to clean it!
*/!*
alert( visitsCountMap.size ); // 1
// and john is also in the memory, because Map uses it as the key
```

Un'altra strada potrebbe essere quella di utilizzare una `WeakMap`:

```js
let john = { name: "John" };

let visitsCountMap = new WeakMap();

visitsCountMap.set(john, 123);

// now john leaves us, we don't need him anymore
john = null;

// there are no references except WeakMap,
// so the object is removed both from the memory and from visitsCountMap automatically
```

Con una normale `Map`, la pulizia dopo l'uscita dell'utente potrebbe diventare un compito tedioso: non dobbiamo solamente preoccuparci di rimuovere l'utente (che potrebbe una variabile o un array), ma vanno pulite anche le informazioni addizionali come `visitsCountMap`. Può diventare quindi ingombrante e molto complesso quando le informazioni dell'utente sono memorizzate in diverse sezioni.

```summary
`WeakMap` può rendere certe operazioni più semplici, poiché la pulizia degli "scarti" viene effettuata automaticamente. Le informazioni contenute, come il conteggio delle visite nell'esempio sopra, vivono solamente fino a chè l'oggetto stesso vive.
```

`WeakSet` si comporta in maniera simile:

- E' analogo a `Set`, ma possiamo solamente aggiungere oggetti a `WeakSet` (non primitive).
- Un oggetto esiste in un set solamente finché rimane accessibile in un altro punto del codice.
- Come `Set`,  supporta `add`, `has` e `delete`, ma non `size`, `keys()` e nemmeno gli iteratori.

Ad esempio, possiamo utilizzarlo per tenere traccia dei messaggi letti:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

// fill it with array elements (3 items)
let unreadSet = new WeakSet(messages);

// use unreadSet to see whether a message is unread
alert(unreadSet.has(messages[1])); // true

// remove it from the set after reading
unreadSet.delete(messages[1]); // true

// and when we shift our messages history, the set is cleaned up automatically
messages.shift();

*!*
// no need to clean unreadSet, it now has 2 items
*/!*
// (though technically we don't know for sure when the JS engine clears it)
```

La maggior limitazione di `WeakMap` e `WeakSet` è l'assenza di iteratori, e la mancanza della possibilità di ottenere tutti gli elementi contenuti. Potrebbe sembrare un inconveniente, ma non vieta a `WeakMap/WeakSet` di compiere il proprio lavoro -- essere una struttura "addizionale" per memorizzare informazioni relative a dati memorizzati in un altro posto.

## Riepilogo

Strutture dati classiche:
- `Map` -- è una collezione di valori etichettati.

    Le differenze da un normale `Object` sono:

    - Qualsiasi chiave è consentita, anche una chiave di tipo oggetto.
    - Possibilità di iterare in ordine di inserimento.
    - Metodi addizionali come la proprietà `size`.

- `Set` -- è una collezione di valori unici.

    - A differenza di un array, non consente di riordinare gli elementi.
    - Mantiene l'ordine di inserimento.

Esistono strutture dati che consentono la pulizia automatica:

- `WeakMap` -- è una variante di `Map` che consente di utilizzare solamente oggetti come chiave e rimuovendoli automaticamente quando questi diventano inaccessibili.

    - Non supporta operazioni alla struttura nella sua interezza: come `size`, `clear()`, e gli iteratori.

- `WeakSet` -- è una variante di `Set` che memorizza solamente oggetti e li rimuove automaticamente quando questi diventano inaccessibili.

    - Non supporta `size/clear()` e gli iteratori.

`WeakMap` e `WeakSet` vengono utilizzati come strutture dati "secondarie", per memorizzare informazioni addizionali all'oggetto "principale". Quando l'oggetto viene rimosso dalla struttura principale, verrà rimosso anche da `WeakMap/WeakSet`.
