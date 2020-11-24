
# Map e Set

Ora che abbiamo appreso le nozioni di base riguardo le seguenti strutture dati:

- Oggetti, per la memorizzazione di collezioni identificate da chiave.
- Array, per la memorizzazione di collezioni ordinate.

Queste non sono però sufficienti nella vita reale. Per esistono ulteriori strutture dati come `Map` e `Set`.

## Map

[Map](mdn:js/Map) è una collezione di dati identificati da chiavi, prorpio come un `Object` (Oggetto). La principale differenza è che `Map` accetta chiavi di qualsiasi tipo.

I metodi e le proprietà sono:

- `new Map()` -- crea la mappa.
- `map.set(key, value)` -- memorizza il valore `value` con la chiave `key`.
- `map.get(key)` -- ritorna il valore associato alla chiave `key`, `undefined` nel caos in cui `key` non esista.
- `map.has(key)` -- ritorna `true` se la chiave `key` esiste, `false` altrimenti.
- `map.delete(key)` -- rimuove il valore con la chiave `key`.
- `map.clear()` -- rimuove tutti gli elementi.
- `map.size` -- ritorna il numero di elementi contenuti.

Ad esempio:

```js run
let map = new Map();

map.set('1', 'str1');   // una chiave di tipo stringa
map.set(1, 'num1');     // una chiave di tipo numerico
map.set(true, 'bool1'); // una chiave di tipo booleano

// ricordi gli oggetti standard? convertirebbero le chiavi a stringa
// Map invece mantiene il tipo, quindi i seguenti esempi sono differenti:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Come abbiamo potuto osservare, a differenza degli oggetti, le chiavi non vengono convertite a stringa. Sono quindi ammesse chiavi di qualunque tipo.

```smart header="`map[key]` non è il modo corretto di utilizzare una `Map`"
Anche se `map[key]` funziona, ad esempio possiamo impostare `map[key] = 2`, equivale a trattare una `map` come un oggetto semplice, con tutte le limitazioni correlate agli oggetti.

Quindi dovremmo utilizzare i metodi dedicati a `map`: `set`, `get` e gli altri.
```

**Map può utilizzare anche oggetti come chiave.**

Ad esempio:

```js run
let john = { name: "John" };

// per ogni utente, memorizziamo il contatore di visite
let visitsCountMap = new Map();

// john è la chiave
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Il fatto di poter utilizzare oggetti come chiave è una delle caratteristiche più importanti fornite dalla struttura dati `Map`. Per chiavi di tipo string, un normale `Object` può andare bene, ma non vale lo stesso per chiavi di tipo oggetto.

Proviamo:

```js run
let john = { name: "John" };

let visitsCountObj = {}; // proviamo ad utilizzare un oggetto

visitsCountObj[john] = 123; // proviamo ad utilizzare l'oggetto jhon come chiave

*!*
//  Questo è quello che otteniamo!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

Dal momento che `visitsCountObj` è un oggetto, converte tutte le chiavi, come `john` a stringhe, quindi ottenamo la chiave `"[object Object]"`. Senza dubbio non ciò che ci aspettavamo.

```smart header="How `Map` confronta le chiavi"
Per verificare l'equivalenza delle chiavi, `Map`utilizza l'algoritmo [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). E' quasi la stessa cosa dell'uguaglianza stretta `===`, con la differenza che `NaN` viene considerato uguale a `NaN`. Quindi anche `NaN` può essere utilizzato come chiave.

L'algoritmo di confronto non può essere ne cambiato ne modificato.
```

````smart header="concatenamento"
Ogni chiamata a `map.set` la mappa stessa, quindi possiamo concatenare le chiamate:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Iterare su Map

Per iterare attraverso gli elementi di `Map`, esistono 3 metodi:

- `map.keys()` -- ritorna un oggetto per iterare sulle chiavi,
- `map.values()` -- ritorna un oggetto per iterar sui valori,
- `map.entries()` -- ritorna un oggetto per iterare sulle voci `[key, value]`, ed è il metodo utilizzato di default nel ciclo `for..of`.

Ad esempio:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// itera sulle chaivi (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// itera sui valori (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// itera sulle voci [key, value]
for (let entry of recipeMap) { // equivale a recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}
```

```smart header="Viene utilizzato l'ordine di inserimento"
L'iterazione segue l'ordine di inserimento dei valori. `Map` mantiene l'ordine, a differenza degli `Object`.
```

Inoltre, `Map` possiede un suo metodo `forEach`, simile a quello utilizzato dagli `Array`:

```js
// esegue la funzione per ogni coppia (chiave, valore)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Object.entries: Map da Object

Durante la fase di creazione di una `Map`, possiamo passargli un array (o qualsiasi altra struttura dati iterabile) con coppie chiave/valore per inizializzare la `Map`, come nel seguente esempio:

```js run
// array di coppie [chiave, valore] 
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

Se abbiamo un semplice oggetto, e vogliamo utilizzarlo per creare una `Map`, possiamo utilizzare un metodo integrato degli oggetti [Object.entries(obj)](mdn:js/Object/entries) il quale ritorna un array di coppie chiave/valore nello stesso formato.

Quindi possiamo creare una `Map` da un oggetto come questo:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

In questo esempio, `Object.entries` ritorna un array di coppue chiave/valore: `[ ["name","John"], ["age", 30] ]`. Che è quello di cui `Map` ha bisogno.


## Object.fromEntries: Object da Map

Abbiamo appena visto come creare una `Map` partendo da un oggetto con `Object.entries(obj)`.

Esiste un metodo `Object.fromEntries` che fa esattamente l'opposto: dato un array di coppie `[key, value]`, ne crea un oggetto:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Possiamo utilizzare il metodo `Object.fromEntries` per ottenere un oggetto partendo da una `Map`.

Ad esempio memorizziamo i dati in una `Map`, ma abbiamo bisogno di passarli ad un codice di terze parti che si aspetta un oggetto.

Quindi:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // costruisce un oggetto (*)
*/!*

// fatto!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

Una chiamata a `map.entries()` ritorna un array di coppie chiave/valore, esattamente nel formato richiesto da `Object.fromEntries`.

Possiamo rendere la rica `(*)` ancora più corta:
```js
let obj = Object.fromEntries(map); // omettendo .entries()
```

L'espressione è equivalente, poiché `Object.fromEntries` si aspetta di ricevere un oggetto iterabile come argomento. Non necessariamente un array. E l'iterazione standard per `Map` ritorna le stesse coppie chiave/valore di `map.entries()`. Quindi abbiamo ottenuto un oggetto con le stesse coppie chiave/valore della `map`.

## Set

Un `Set` è un tipo di collezione speciale - "set di valori" (senza chiavi), dove ogni valore può apparire una sola volta.

I suoi metodi principali sono:

- `new Set(iterable)` -- crea il set, e se gli viene fornito un oggetto `iterabile` (solitamente un array), ne copia i valori nel set.
- `set.add(value)` -- aggiunge un valore, e ritorna il set.
- `set.delete(value)` -- rimuove il valore, ritorna `true` se `value` esiste, altrimenti `false`.
- `set.has(value)` -- ritorna `true` se il valore esiste nel set, altrimenti `false`.
- `set.clear()` -- rimuove tutti i valori dal set.
- `set.size` -- ritorna la dimensione del set, ovvero il numero di valori contenuti.

La principale caratteristica dei set è che ripetute chiamate di `set.add(value)` con lo stesso valore, non fanno nulla. Questo è il motivo per cui ogni valore può comparire una sola volta in un `Set`.

Ad esempio, abbiamo diversi arrivi di visitatori, e vorremmo ricordarli tutti. Ma visite ripetute dello stesso non dovrebbe portare a duplicati. Un visitatore deve essere conteggiato una volta sola.

`Set` è esattamente la struttura dati che fa al caso nostro:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visitatori, alcuni potrebbero tornare più volte
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set mantiene solo valori unici
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (poi Pete e Mary)
}
```

L'alternativa a `Set` potrebbe essere un array di visitatori, aggiungendo del codice per verificare ongi inserimento ed evitare i duplicati, utilizzando [arr.find](mdn:js/Array/find). Ma le performance sarebbero di molto peggiori, perchè questo metodo attraversa tutto l'array per verificare ogni elemento. `Set` è ottimizzato internamente per controllo di unicità.

## Iterare un Set

Possiamo iterare un set sia con `for..of` che con `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// equivalente con forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Da notare una cosa divertente. La funzione di callback fornita al `forEach` ha 3 argomenti: un `value`, poi *lo stesso valore* `valueAgain`, e poi l'oggetto su cui iterare. Proprio cosi, lo stesso valore appare due volte nella lista degli argomenti.

Questo accade per questioni di compatibilità con `Map` in cui la funzione callback fornita al `forEach` possiede tre argomenti. E' un po strano. Però in alcuni casi può aiutare rimpiazzare `Map` con `Set`, e vice versa.

Sono supportati anche i metodi di iterazione offerti da `Map`:

- `set.keys()` -- ritorna un oggetto per iterare sui valori,
- `set.values()` -- lo stesso di `set.keys()`, per compatibilità con `Map`,
- `set.entries()` -- ritorna un oggetto per iterare sulle voci `[value, value]`, esiste per compatibilità con `Map`.

## Riepilogo

`Map` -- è una collezione di valori identificati da chiave.

Metodi e proprietà:

- `new Map([iterable])` -- crea la mappa, accetta un oggetto iterabile (opzionale, e.g. array) di coppie `[key,value]` per l'inizializzazione.
- `map.set(key, value)` -- memorizza il valore con la chiave fornita.
- `map.get(key)` -- ritorna il valore associata alla chiave, `undefined` se la `key` non è presente nella `Map`.
- `map.has(key)` -- ritorna `true` se la `key` esiste, `false` altrimenti.
- `map.delete(key)` -- rimuove il valore associato alla chiave.
- `map.clear()` -- rimuove ogni elemento dalla mappa.
- `map.size` -- ritorna il numero di elementi contenuti nella map.

Le differenze da un `Object` standard:

- Le chiavi possono essere di qualsiasi tipo, anche oggetti.
- Possiede metodi aggiuntivi, come la proprietà `size`.

`Set` -- è una collezione di valori unici.

Metodi e proprietà:

- `new Set([iterable])` -- crea un set, accetta un oggetto iterabile (opzionale, e.g. array) per l'inizializzazione.
- `set.add(value)` -- aggiunge un valore (non fa nulla nel caso in cui il valore sia già contenuto nel set), e ritorna il set.
- `set.delete(value)` -- rimuove il valore, ritorna `true` se `value` esiste, `false` altrimenti.
- `set.has(value)` -- ritorna `true` se il valore esiste nel set, `false` altrimenti.
- `set.clear()` -- rimuove tutti i valori dal set.
- `set.size` -- ritorna la dimensione del set, ovvero il numero di valori contenuti.

L'iterazione su `Map` e `Set` segue sempre l'ordine di inserimento, quindi posso essere definite delle collezioni ordinate, non è però possibile riordinare gli elementi oppure ottenere un valore tramite il suo indice.
