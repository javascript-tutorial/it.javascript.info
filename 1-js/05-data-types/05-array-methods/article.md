# Metodi per gli array

Gli array forniscono una gran quantità di metodi. Per rendere le cose più semplici, in questo capitolo le abbiamo divise per gruppi.

## Aggiungere/rimuovere elementi 

Conosciamo già i metodi che consentono di aggiungere e rimuovere elementi in testa o in coda:

- `arr.push(...items)` -- aggiunge un elemento in coda,
- `arr.pop()` -- estrae un elemento dalla coda,
- `arr.shift()` -- estrae un elemento dalla testa,
- `arr.unshift(...items)` -- aggiunge un elemento in testa.

Vediamone altri.

### splice

Come cancellare un elemento dall'array?

Gli array sono oggetti, quindi possiamo provare ad utilizzare `delete`:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // remove "go"

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3
```

L'elemento viene rimosso, ma possiede ancora 3 elementi, possiamo vederlo tramite `arr.length == 3`.

Non è sorprendente, perché `delete obj.key` rimuove un valore dalla `key`. Questo è tutto quello che fa. Può andare bene per gli oggetti. Con gli array vorremmo che il resto degli elementi scalassero, andando ad occupare il posto che si è liberato. Per questo ci aspetteremmo di avere un array più corto.

Quindi, sono stati sviluppati dei metodi dedicati.

Il metodo [arr.splice(str)](mdn:js/Array/splice) è un coltellino svizzero per array. Può fare qualsiasi cosa: aggiungere e rimuovere elementi ovunque.

La sintassi è:

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
```

Come primo parametro richiede la posizione `index`: rimuove `deleteCount` elementi ed inserisce al suo posto `elem1, ..., elemN`. Infine ritorna un array contenente gli elementi rimossi.

Questo metodo è facile da capire tramite esempi.

Proviamo ad eliminare degli elementi:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // from index 1 remove 1 element
*/!*

alert( arr ); // ["I", "JavaScript"]
```

Facile, vero? Ha rimosso `1` elemento, a partire dall'elemento `1`.

Nel prossimo esempio, rimuoviamo 3 elementi e li rimpiazziamo con altri due:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // now [*!*"Let's", "dance"*/!*, "right", "now"]
```

Possiamo vedere l'array ritornato da `splice` contenente gli elementi rimossi:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// remove 2 first elements
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array of removed elements
```

Il metodo `splice` è anche in grado di inserire elementi senza alcuna rimozione. Per ottenere questo dobbiamo impostare `deleteCount` a `0`:

```js run
let arr = ["I", "study", "JavaScript"];

// from index 2
// delete 0
// then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="Sono permessi indici negativi"
In questo come in altri metodi dedicati agli array, sono permessi indici negativi. Che specificano la posizione dalla fine dell'array, come:

```js run
let arr = [1, 2, 5];

// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

Il metodo [arr.slice](mdn:js/Array/slice) risulta più semplice di `arr.splice`.

La sintassi è:

```js
arr.slice(start, end)
```

<<<<<<< HEAD
Ritorna un nuovo array contente tutti gli elementi a partire da `"start"` fino ad `"end"` (`"end"` esclusa). Sia `start` che `end` possono essere negativi, in tal caso si inizierà a contare dalla coda dell'array.
=======
It returns a new array containing all items from index `"start"` to `"end"` (not including `"end"`). Both `start` and `end` can be negative, in that case position from array end is assumed.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Funziona come `str.slice`, ma crea dei sotto-array piuttosto che sotto-stringhe.

Ad esempio:

```js run
let str = "test";
let arr = ["t", "e", "s", "t"];

alert( str.slice(1, 3) ); // es
alert( arr.slice(1, 3) ); // e,s

alert( str.slice(-2) ); // st
alert( arr.slice(-2) ); // s,t
```

### concat

Il metodo [arr.concat](mdn:js/Array/concat) unisce l'array con altri array o elementi.

La sintassi è:

```js
arr.concat(arg1, arg2...)
```

Accetta un numero arbitrario di argomenti -- sia array che valori.

Il risultato è un nuovo array contenente gli elementi di `arr`, seguiti da `arg1`, `arg2` etc.

Se un argomento è un array o possiede una proprietà `Symbol.isConcatSpreadable`, tutti i suoi elementi vengono copiati. Altrimenti viene copiato solamente l'argomento stesso.

Un esempio:

```js run
let arr = [1, 2];

// merge arr with [3,4]
alert( arr.concat([3, 4])); // 1,2,3,4

// merge arr with [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// merge arr with [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```

Normalmente copia gli elementi da array (li "spreme"). Gli altri oggetti, anche se assomigliano molto ad un array, vengono aggiunti per come sono:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
//[1, 2, arrayLike]
```

...Invece se un oggetto simile ad un array possiede la proprietà `Symbol.isConcatSpreadable`, allora vengono copiati anche i suoi elementi:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

<<<<<<< HEAD
## Ricerca in array
=======
## Iterate: forEach

The [arr.forEach](mdn:js/Array/forEach) method allows to run a function for every element of the array.

The syntax:
```js
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

For instance, this shows each element of the array:

```js run
// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

And this code is more elaborate about their positions in the target array:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

The result of the function (if it returns any) is thrown away and ignored.


## Searching in array
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ora vedremo dei metodi per effettuare ricerche in un array.

### indexOf/lastIndexOf e include

I metodi [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) e [arr.includes](mdn:js/Array/includes) hanno la stessa sintassi, e fanno praticamente la stessa cosa della loro controparte per stringhe, semplicemente operano su elementi piuttosto che su caratteri:

- `arr.indexOf(item, from)` cerca un `item` a partire dall'indirizzo `from`, e ritorna l'indirizzo in cui è stato trovato, altrimenti ritorna `-1`.
- `arr.lastIndexOf(item, from)` -- lo stesso, ma esegue la ricerca a partire da destra verso sinistra.
- `arr.includes(item, from)` -- cerca un `item` a partire dall'indice `from`, e ritorna `true` se lo trova.

Ad esempio:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Da notare che questi metodi usano il confronto `===` comparison. Quindi, se cerchiamo `false`, troveremo esattamente `false` e non zero.

Se vogliamo solo verificare la presenza di un elemento, senza voler conoscere l'indirizzo, è preferibile utilizzare il metodo `arr.includes`.

Inoltre, una piccola differenza è che `includes` gestisce correttamente `NaN`, a differenza di `indexOf/lastIndexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (should be 0, but === equality doesn't work for NaN)
alert( arr.includes(NaN) );// true (correct)
```

### find and findIndex

Immaginiamo di avere un array di oggetti. Come possiamo trovare un oggetto con delle specifiche condizioni?

In questi casi si utilizza il metodo [arr.find](mdn:js/Array/find).

La sintassi è:
```js
let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});
```

La funzione viene chiamata ricorsivamente per ogni elemento dell'array:

- `item` è l'elemento.
- `index` è il suo indice.
- `array` è l'array stesso.

Se la chiamata ritorna `true`, la ricerca verrà interrotta e viene ritornato `item`. Se non viene trovato nulla verrà ritornato `undefined`.

Ad esempio, abbiamo un array di utenti, ognuno con i campi `id` e `name`. Cerchiamo quello con `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

Nella realtà gli array di oggetti sono una cosa molto comune, quindi il metodo `find` risulta molto utile.

<<<<<<< HEAD
Da notare che nell'esempio noi forniamo a `find` un singolo argomento `item => item.id == 1`. Gli altri parametri di `find` sono raramente utilizzati.

Il metodo [arr.findIndex](mdn:js/Array/findIndex) fa essenzialmente la stessa cosa, semplicemente ritorna l'indice in cui è stata trovata la corrispondenza piuttosto di ritornare l'oggetto stesso.
=======
Note that in the example we provide to `find` the function `item => item.id == 1` with one argument. Other arguments of this function are rarely used.

The [arr.findIndex](mdn:js/Array/findIndex) method is essentially the same, but it returns the index where the element was found instead of the element itself and `-1` is returned when nothing is found.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

### filter

Il metodo `find` cerca un singola occorrenza dell'elemento (la prima) e ritorna `true`.

Se vogliamo cercare più occorrenze, possiamo utilizzare [arr.filter(fn)](mdn:js/Array/filter).

<<<<<<< HEAD
La sintassi è pressoché la stessa di `find`, ma ritorna un array contenente tutte le corrispondenze trovate:
=======
The syntax is similar to `find`, but filter continues to iterate for all array elements even if `true` is already returned:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and iteration continues
  // returns empty array for complete falsy scenario
});
```

Ad esempio:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Trasformare un array

Questa sezione di occupa dei metodi che trasformano o riordinano gli array.

### map

Il metodo [arr.map](mdn:js/Array/map) è uno dei più utili e maggiormente utilizzati.

La sintassi è:

```js
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
})
```

La funzione viene chiamata per ogni elemento dell'array e ritorna un array di risultati.

Ad esempio, qui trasformiamo ogni elemento nella sua lunghezza:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

Il metodo [arr.sort](mdn:js/Array/sort) ordina l'array *sul posto*.

Ad esempio:

```js run
let arr = [ 1, 2, 15 ];

// the method reorders the content of arr (and returns it)
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Notate qualcosa di strano nel risultato?

L'ordine degli elementi è diventato `1, 15, 2`. Errato. Ma perché?

**Gli elementi di default vengono ordinati come stringhe.**

Letteralmente, tutti gli elementi vengono convertiti in stringhe e confrontati. Quindi, viene applicato l'algoritmo di ordinamento lessicografico, quindi `"2" > "15"`.

Per utilizzare un ordinamento arbitrario, dobbiamo fornire una funzione con due argomenti come argomento di `arr.sort()`.

La funzione dovrebbe essere simile a questa:
```js
function compare(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
```

Ad esempio:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Ora funziona come dovrebbe.

Proviamo un attimo a capire cosa sta succedendo. L'array `arr` può contenere qualsiasi cosa, giusto? Può contenere numeri, stringhe, elementi HTML o qualsiasi altra cosa. Abbiamo quindi un insieme di *qualcosa*. Per poterlo ordinare abbiamo bisogno di una *funzione di ordinamento* che conosca gli elementi e sappia come confrontarli. L'ordinamento di default è di tipo stringa.

Il metodo `arr.sort(fn)` possiede un implementazione dell'algoritmo di ordinamento. Non dovremmo preoccuparci di come funzioni esattamente (la maggior parte delle volte è un [quicksort](https://en.wikipedia.org/wiki/Quicksort) ottimizzato). Questo algoritmo, attraverserà l'intero array, e confronterà i valori, tutto quello che dobbiamo fare noi sarà fornirgli una funzione `fn` che esegua il confronto.

In ogni caso, se mai volessimo conoscere quali elementi vengono comparati -- nulla ci vieta di utilizzare alert:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
});
```

L'algoritmo potrebbe confrontare un elemento più volte durante il processo, anche se tenta di fare il minor numero di confronti possibili.


````smart header="Una funzione di confronto può tornare qualsiasi numero"
In realtà, ad una funzione di confronto è solamente richiesto di ritornare un numero positivo per dire "maggiore" ed uno negativo per dire "minore".

Questo consente di scrivere funzioni più brevi:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Le funzioni freccia sono migliori"
Ricordate le [funzioni freccia](info:function-expressions-arrows#arrow-functions)? Possiamo utilizzarle per un miglior ordinamento:

```js
arr.sort( (a, b) => a - b );
```

Questa funziona esattamente come le altre versioni viste sopra, anche se risulta essere più breve.
````

### reverse

Il metodo [arr.reverse](mdn:js/Array/reverse) inverte l'ordine degli elementi contenuti in `arr`.

Ad esempio:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

Inoltre ritorna `arr` dopo averlo invertito.

### split and join

Vediamo una situazione realistica. Stiamo scrivendo un'applicazione di messaggistica, e l'utente inserisce una lista di destinatari: `John, Pete, Mary`. Per noi sarebbe più comodo avere un array di nomi piuttosto di una singola stringa. Come possiamo farlo?

Il metodo [str.split(delim)](mdn:js/String/split) fa esattamente questo. Divide la stringa in un array utilizzando il delimitatore `delim`.

Nell'esempio sotto, utilizziamo come delimitatore una virgola seguita da uno spazio:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
```

Il metodo `split` possiede un secondo argomento opzionale di tipo numero -- è un limite di lunghezza per l'array. Se questo argomento viene fornito, allora gli elementi extra verranno ignorati. Nella pratica è raramente utilizzato:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Split in lettere"
La chiamata a `split(s)` con l'argomento vuoto, dividerà la stringa in un array di lettere:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

<<<<<<< HEAD
La chiamata [arr.join(str)](mdn:js/Array/join) fa esattamente l'inverso di `split`. Crea una stringa con gli elementi di `arr` divisi da un carattere di tipo stringa `str`.
=======
The call [arr.join(separator)](mdn:js/Array/join) does the reverse to `split`. It creates a string of `arr` items glued by `separator` between them.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ad esempio:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';');

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight
Quando vogliamo iterare su un array -- possiamo utilizzare `forEach`.

<<<<<<< HEAD
Quando invece abbiamo la necessità di iterare e ritornare dati per ogni elemento -- possiamo usare `map`.
=======
When we need to iterate over an array -- we can use `forEach`, `for` or `for..of`.

When we need to iterate and return the data for each element -- we can use `map`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

I metodi [arr.reduce](mdn:js/Array/reduce) e [arr.reduceRight](mdn:js/Array/reduceRight) fanno parte della stessa categoria, ma sono leggermente più complessi. Vengono utilizzati per calcolare un singolo valore basato sul contenuto dell'array.

La sintassi è:

```js
let value = arr.reduce(function(previousValue, item, index, array) {
  // ...
}, initial);
```

La funzione viene applicata agli elementi. Potrete notare che fra gli argomenti ce ne sono alcuni di familiari, a partire dal secondo:

<<<<<<< HEAD
- `item` -- è l'elemento corrente.
- `index` -- è la sua posizione.
- `arr` -- è l'array.
=======
- `item` -- is the current array item.
- `index` -- is its position.
- `array` -- is the array.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Finora, è uguale a `forEach/map`. Ma c'è un ulteriore argomento:

- `previousValue` -- è il risultato della precedente chiamata, `initial` per la prima chiamata.

Il modo più semplice per spiegarlo è tramite esempi.

Qui otterremo una somma degli elementi dell'array in una riga:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

Qui abbiamo utilizzato la variante più comune di `reduce` con solo 2 argomenti.

Proviamo a vedere nel dettaglio cosa succede.

1. Nella prima esecuzione, `sum` è il valore iniziale (l'ultimo argomento di `reduce`), cioè `0`, e `current` è il primo elemento dell'array, cioè `1`. Quindi il risultato è `1`.
2. Nella seconda esecuzione, `sum = 1`, gli sommiamo il secondo elemento dell'array(`2`) e ritorniamo il risultato.
3. Nella terza esecuzione, `sum = 3` gli sommiamo l'elemento, e cosi via...

Il flusso di calcolo:

![](reduce.png)

<<<<<<< HEAD
O nella forma tabellare, in cui ogni riga rappresenta una chiamata di funzione:
=======
Or in the form of a table, where each row represents a function call on the next array element:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

|   |`sum`|`current`|`result`|
|---|-----|---------|---------|
|prima chiamata|`0`|`1`|`1`|
|seconda chiamata|`1`|`2`|`3`|
|terza chiamata|`3`|`3`|`6`|
|quarta chiamata|`6`|`4`|`10`|
|quinta chiamata|`10`|`5`|`15`|


Come abbiamo potuto osservare, il risultato della chiamata precedente diventa il primo argomento della chiamata successiva.

Possiamo anche omettere il valore iniziale:

```js run
let arr = [1, 2, 3, 4, 5];

// removed initial value from reduce (no 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

Il risultato sarebbe lo stesso. Questo perché se non c'è un valore iniziale, allora `reduce` prende il primo elemento dell'array come valore iniziale ed inizia l'iterazione dal secondo elemento.

La tabella dei calcoli è uguale a quella precedente, viene saltata solo la prima riga.

Questo tipo di utilizzo richiede particolare cura. Se l'array è vuoto, allora `reduce` effettua la chiamata senza valore iniziale e provoca un errore.

Vediamo un esempio:

```js run
let arr = [];

// Error: Reduce of empty array with no initial value
// if the initial value existed, reduce would return it for the empty arr.
arr.reduce((sum, current) => sum + current);
```


Quindi è fortemente consigliato di specificare sempre un valore iniziale.

Il metodo [arr.reduceRight](mdn:js/Array/reduceRight) fa esattamente la stessa cosa, ma da destra verso sinistra.


<<<<<<< HEAD
## Iterate: forEach

Il metodo [arr.forEach](mdn:js/Array/forEach) consente di eseguire una funzione per ogni elemento dell'array.

La sintassi è:
```js
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

Ad esempio, questo mostra ogni elemento dell'array:

```js run
// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Questo codice è più elaborato e mostra anche la posizione:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

Il risultato della funzione (sempre se ritorna qualcosa) viene ignorato.

=======
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
## Array.isArray

Gli array non utilizzano una sintassi differente. Sono comunque basati sugli oggetti.

Quindi `typeof` non aiuta a distinguere un oggetto da un array:

```js run
alert(typeof {}); // object
alert(typeof []); // same
```

...Ma vengono utilizzati cosi spesso che esiste un metodo dedicato per farlo: [Array.isArray(value)](mdn:js/Array/isArray). Ritorna `true` se `value` è un array, `false` altrimenti.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Molti metodi accettano "thisArg"

Quasi tutti i metodi dedicati ad array, che richiedono una funzione -- come `find`, `filter`, `map`, fatta eccezione per `sort`, accettano un parametro opzionale `thisArg`.

Questo parametro non è stato spiegato nella sezione sopra, perché viene raramente utilizzato. Per completezza lo studiamo.

Vediamo la sintassi di questi metodi:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg is the optional last argument
```

Il valore del parametro `thisArg` diventa `this` per `func`.

Ad esempio, qui utilizziamo il metodo di un oggetto come filtro e `thisArg` ci risulta utile:

```js run
let user = {
  age: 18,
  younger(otherUser) {
    return otherUser.age < this.age;
  }
};

let users = [
  {age: 12},
  {age: 16},
  {age: 32}
];

*!*
// find all users younger than user
let youngerUsers = users.filter(user.younger, user);
*/!*

alert(youngerUsers.length); // 2
```

Nella chiamata sopra, utilizziamo `user.younger` come filtro e forniamo `user` come contesto. Se non avessimo fornito il contesto, `users.filter(user.younger)` avrebbe chiamato `user.younger` come funzione a se stante, con `this=undefined`. Che avrebbe provocato un errore.

## Riepilogo

Un breve riepilogo dei metodi per array:

- Per aggiungere/rimuovere elementi:
  - `push(...items)` -- aggiunge elementi in coda,
  - `pop()` -- estrae un elemento dalla coda,
  - `shift()` -- un estrae un elemento in testa,
  - `unshift(...items)` -- aggiunge un elemento in testa.
  - `splice(pos, deleteCount, ...items)` -- all'indirizzo `pos` cancella `deleteCount` elementi e al loro posto inserisce `items`.
  - `slice(start, end)` -- crea un nuovo array, e copia al suo interno gli elementi da `start` fino ad `end` (esclusa).
  - `concat(...items)` -- ritorna un nuovo array: copia tutti gli elementi di quello corrente e ci aggiunge `items`. Se uno degli `items` è un array, allora vengono presi anche i suoi elementi.

<<<<<<< HEAD
- Ricercare elementi:
  - `indexOf/lastIndexOf(item, pos)` -- cerca `item` a partire da `pos`, e ritorna l'indice, oppure `-1` se non lo trova.
  - `includes(value)` -- ritorna `true` se l'array contiene `value`, altrimenti `false`.
  - `find/filter(func)` -- filtra gli elementi tramite la funzione, ritorna il primo/tutti i valori che ritornano `true`.
  - `findIndex` è simile a `find`, ma ritorna l'indice piuttosto del valore.
=======
- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.
  
- To iterate over elements:
  - `forEach(func)` -- calls `func` for every element, does not return anything.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

- Per modificare un array:
  - `map(func)` -- crea un nuovo array con i risultati della chiamata `func` su tutti i suoi elementi.
  - `sort(func)` -- ordina l'array "sul posto", e lo ritorna.
  - `reverse()` -- inverte l'array sul posto, e lo ritorna.
  - `split/join` -- converte una stringa in array e vice versa.
  - `reduce(func, initial)` -- calculate a single value over the array by calling `func` for each element and passing an intermediate result between the calls.

<<<<<<< HEAD
- Per iterare sugli elementi:
  - `forEach(func)` -- chiama `func` su ogni elemento, ma non ritorna nulla.

- Un altro metodo utile:
  - `Array.isArray(arr)` controlla se `arr` è un array.
=======
- Additionally:
  - `Array.isArray(arr)` checks `arr` for being an array.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Da notare che i metodi `sort`, `reverse` e `splice` modificano l'array stesso.

I metodi elencati sono quelli utilizzati più spesso, sono in grado di coprire il 99% dei casi d'uso. Ce ne sono altri che possono tornare utili:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) controlla l'array.

  La funzione `fn` viene invocata su ogni elemento dell'array in maniera simile a `map`. Se qualcuno/tutti i risultati sono `true`, ritorna `true`, altrimenti `false`.

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- riempie l'array con `value` da `start` fino a `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- copia gli elementi da `start` fino a `end` dentro *se stesso*,  nella posizione `target` (sovrascrivendo gli elementi contenuti).

Per la lista completa, vedere il [manuale](mdn:js/Array).

A prima vista potrebbero sembrare molti metodi da ricordare. Ma in realtà è molto più semplice di quanto sembri.

Tenente sempre un occhio al riassunto fornito sopra. Provate anche a risolvere gli esercizi di questo capitolo.

In futuro quando avrete bisogno di fare qualcosa con un array, e non saprete come fare -- tornate qui, guardate il riassunto e trovate il metodo corretto. Gli esempi vi aiuteranno molto. In poco tempo vi risulterà naturale ricordare questi metodi, senza troppi sforzi.
