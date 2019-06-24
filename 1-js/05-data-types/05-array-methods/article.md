# Metodi per gli array

Gli array forniscono una gran quantità di metodi. Per rendere le cose più semplici, in questo capitolo le abbiamo divise per gruppi.

## Aggiungere/rimuovere elementi 

Conosciamo già i metodi che consentono di aggiungere e rimuovere elementi in testa o in coda:

- `arr.push(...items)` -- aggiunge un elemento in coda,
- `arr.pop()` -- estrae un elemento dalla coda,
- `arr.shift()` -- estrae un elemento dalla testa,
- `arr.unshift(...items)` -- aggiunge un elemento in testa.

<<<<<<< HEAD
Vediamone altri.
=======
Here are a few others.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

### splice

Come cancellare un elemento dall'array?

Gli array sono oggetti, quindi possiamo provare ad utilizzare `delete`:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // rimuove "go"

alert( arr[1] ); // undefined

// ora arr = ["I",  , "home"];
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
arr.splice(1, 1); // a partire da indice 1 rimuove 1 elemento
*/!*

alert( arr ); // ["I", "JavaScript"]
```

Facile, vero? Ha rimosso `1` elemento, a partire dall'elemento `1`.

Nel prossimo esempio, rimuoviamo 3 elementi e li rimpiazziamo con altri due:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// rimuove i primi 3 elementi e li rimpiazza con altri
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // ora [*!*"Let's", "dance"*/!*, "right", "now"]
```

Possiamo vedere l'array ritornato da `splice` contenente gli elementi rimossi:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// rimuove i primi 2 elementi
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array di elementi rimossi
```

Il metodo `splice` è anche in grado di inserire elementi senza alcuna rimozione. Per ottenere questo dobbiamo impostare `deleteCount` a `0`:

```js run
let arr = ["I", "study", "JavaScript"];

// da indice 2
// ne rimuove 0
// poi inserisce "complex" e "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="Sono permessi indici negativi"
In questo come in altri metodi dedicati agli array, sono permessi indici negativi. Che specificano la posizione dalla fine dell'array, come:

```js run
let arr = [1, 2, 5];

// dall'indice -1 (un passo dalla fine)
// cancella 0 elementi,
// poi inserice 3 e 4
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

Ritorna un nuovo array contente tutti gli elementi a partire da `"start"` fino ad `"end"` (`"end"` esclusa). Sia `start` che `end` possono essere negativi, in tal caso si inizierà a contare dalla coda dell'array.

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

// unisce arr con [3,4]
alert( arr.concat([3, 4])); // 1,2,3,4

// unisce arr con [3,4] e [5,6]
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// unisce arr con [3,4], poi aggiunge i valori 5 e 6
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

## Iterate: forEach

Il metodo [arr.forEach](mdn:js/Array/forEach) consente di eseguire una funzione su ogni elemento dell'array.

La sintassi:
```js
arr.forEach(function(item, index, array) {
  // ... fa qualcosa con l'elemento
});
```

Ad esempio, il codice sotto mostra ogni elemento dell'array:

```js run
// per ogni elemento chiama alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Invece questo codice ne mostra anche la posizione:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

Il risultato di questa funzione (sempre che ci sia) viene scartato.


## Ricerca in un array

Ora vedremo dei metodi per effettuare ricerche in un array.

### indexOf/lastIndexOf e include

I metodi [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) e [arr.includes](mdn:js/Array/includes) hanno la stessa sintassi, e fanno praticamente la stessa cosa della loro controparte per stringhe, semplicemente operano su elementi piuttosto che su caratteri:

<<<<<<< HEAD
- `arr.indexOf(item, from)` cerca un `item` a partire dall'indirizzo `from`, e ritorna l'indirizzo in cui è stato trovato, altrimenti ritorna `-1`.
- `arr.lastIndexOf(item, from)` -- lo stesso, ma esegue la ricerca a partire da destra verso sinistra.
- `arr.includes(item, from)` -- cerca un `item` a partire dall'indice `from`, e ritorna `true` se lo trova.
=======
- `arr.indexOf(item, from)` -- looks for `item` starting from index `from`, and returns the index where it was found, otherwise `-1`.
- `arr.lastIndexOf(item, from)` -- same, but looks for from right to left.
- `arr.includes(item, from)` -- looks for `item` starting from index `from`, returns `true` if found.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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
alert( arr.indexOf(NaN) ); // -1 (dovrebbe essere 0, ma l'uguaglianza === non funziona con NaN)
alert( arr.includes(NaN) );// true (corretto)
```

### find and findIndex

Immaginiamo di avere un array di oggetti. Come possiamo trovare un oggetto con delle specifiche condizioni?

In questi casi si utilizza il metodo [arr.find](mdn:js/Array/find).

La sintassi è:
```js
let result = arr.find(function(item, index, array) {
  // se viene ritornato true, viene ritornato l'elemento e l'iterazione si ferma
  // altrimenti ritorna undeined
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

Da notare che nell'esempio noi forniamo a `find` un singolo argomento `item => item.id == 1`. Gli altri parametri di `find` sono raramente utilizzati.

Il metodo [arr.findIndex](mdn:js/Array/findIndex) fa essenzialmente la stessa cosa, semplicemente ritorna l'indice in cui è stata trovata la corrispondenza piuttosto di ritornare l'oggetto stesso, se l'oggetto non viene trovato ritorna `-1`.

### filter

Il metodo `find` cerca un singola occorrenza dell'elemento (la prima) e ritorna `true`.

Se vogliamo cercare più occorrenze, possiamo utilizzare [arr.filter(fn)](mdn:js/Array/filter).

La sintassi è pressoché la stessa di `find`, ma ritorna un array contenente tutte le corrispondenze trovate:

```js
let results = arr.filter(function(item, index, array) {
  // se viene messo un item true su results e l'iteazione continua
  // ritorna un array vuoto per uno scenario falso
});
```

Ad esempio:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// ritorna un array dei primi due users
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
  // ritorna il nuovo valore piuttosto di item
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

// il metodo riordina il contenuto di arr (e lo ritorna)
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

<<<<<<< HEAD
Proviamo un attimo a capire cosa sta succedendo. L'array `arr` può contenere qualsiasi cosa, giusto? Può contenere numeri, stringhe, elementi HTML o qualsiasi altra cosa. Abbiamo quindi un insieme di *qualcosa*. Per poterlo ordinare abbiamo bisogno di una *funzione di ordinamento* che conosca gli elementi e sappia come confrontarli. L'ordinamento di default è di tipo stringa.
=======
Let's step aside and think what's happening. The `arr` can be array of anything, right? It may contain numbers or strings or HTML elements or whatever. We have a set of *something*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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

<<<<<<< HEAD
Vediamo una situazione realistica. Stiamo scrivendo un'applicazione di messaggistica, e l'utente inserisce una lista di destinatari: `John, Pete, Mary`. Per noi sarebbe più comodo avere un array di nomi piuttosto di una singola stringa. Come possiamo farlo?
=======
Here's the situation from real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: `John, Pete, Mary`. But for us an array of names would be much more comfortable than a single string. How to get it?
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

Il metodo [str.split(delim)](mdn:js/String/split) fa esattamente questo. Divide la stringa in un array utilizzando il delimitatore `delim`.

Nell'esempio sotto, utilizziamo come delimitatore una virgola seguita da uno spazio:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo (e altri name)
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

La chiamata [arr.join(separator)](mdn:js/Array/join) fa esattamente l'inverso di `split`. Crea una stringa con gli elementi di `arr` incollati tra loro dal carattere `separator`.

Ad esempio:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';');

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight
Quando vogliamo iterare su un array -- possiamo utilizzare `forEach`, `for` o `for..of`.

Quando invece abbiamo la necessità di iterare e ritornare dati per ogni elemento -- possiamo usare `map`.

I metodi [arr.reduce](mdn:js/Array/reduce) e [arr.reduceRight](mdn:js/Array/reduceRight) fanno parte della stessa categoria, ma sono leggermente più complessi. Vengono utilizzati per calcolare un singolo valore basato sul contenuto dell'array.

La sintassi è:

```js
let value = arr.reduce(function(previousValue, item, index, array) {
  // ...
}, initial);
```

La funzione viene applicata agli elementi. Potrete notare che fra gli argomenti ce ne sono alcuni di familiari, a partire dal secondo:

- `item` -- è l'elemento corrente.
- `index` -- è la sua posizione.
- `arr` -- è l'array.

Finora, è uguale a `forEach/map`. Ma c'è un ulteriore argomento:

- `previousValue` -- è il risultato della precedente chiamata, `initial` per la prima chiamata.

Il modo più semplice per spiegarlo è tramite esempi.

<<<<<<< HEAD
Qui otterremo una somma degli elementi dell'array in una riga:
=======
Here we get a sum of an array in one line:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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

O nella forma tabellare, in cui ogni riga rappresenta una chiamata di funzione:

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

// rimosso il valore iniziale da rimuover (no 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

Il risultato sarebbe lo stesso. Questo perché se non c'è un valore iniziale, allora `reduce` prende il primo elemento dell'array come valore iniziale ed inizia l'iterazione dal secondo elemento.

La tabella dei calcoli è uguale a quella precedente, viene saltata solo la prima riga.

Questo tipo di utilizzo richiede particolare cura. Se l'array è vuoto, allora `reduce` effettua la chiamata senza valore iniziale e provoca un errore.

Vediamo un esempio:

```js run
let arr = [];

// Errore: Riduzione di un array vuoto senza valore iniziale
// se il valore iniziale esistesse, reduce lo restituirebbe all'array vuoto.
arr.reduce((sum, current) => sum + current);
```


Quindi è fortemente consigliato di specificare sempre un valore iniziale.

Il metodo [arr.reduceRight](mdn:js/Array/reduceRight) fa esattamente la stessa cosa, ma da destra verso sinistra.


## Array.isArray

Gli array non utilizzano una sintassi differente. Sono comunque basati sugli oggetti.

Quindi `typeof` non aiuta a distinguere un oggetto da un array:

```js run
alert(typeof {}); // object
alert(typeof []); // lo stesso
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
// thisArg è l'ultimo argomento opzionale
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
// trova tutti gli users più giovani di user
let youngerUsers = users.filter(user.younger, user);
*/!*

alert(youngerUsers.length); // 2
```

Nella chiamata sopra, utilizziamo `user.younger` come filtro e forniamo `user` come contesto. Se non avessimo fornito il contesto, `users.filter(user.younger)` avrebbe chiamato `user.younger` come funzione a se stante, con `this=undefined`. Che avrebbe provocato un errore.

## Riepilogo

Un breve riepilogo dei metodi per array:

<<<<<<< HEAD
- Per aggiungere/rimuovere elementi:
  - `push(...items)` -- aggiunge elementi in coda,
  - `pop()` -- estrae un elemento dalla coda,
  - `shift()` -- un estrae un elemento in testa,
  - `unshift(...items)` -- aggiunge un elemento in testa.
  - `splice(pos, deleteCount, ...items)` -- all'indirizzo `pos` cancella `deleteCount` elementi e al loro posto inserisce `items`.
  - `slice(start, end)` -- crea un nuovo array, e copia al suo interno gli elementi da `start` fino ad `end` (esclusa).
  - `concat(...items)` -- ritorna un nuovo array: copia tutti gli elementi di quello corrente e ci aggiunge `items`. Se uno degli `items` è un array, allora vengono presi anche i suoi elementi.
=======
A cheat sheet of array methods:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

- Ricercare elementi:
  - `indexOf/lastIndexOf(item, pos)` -- cerca `item` a partire da `pos`, e ritorna l'indice, oppure `-1` se non lo trova.
  - `includes(value)` -- ritorna `true` se l'array contiene `value`, altrimenti `false`.
  - `find/filter(func)` -- filtra gli elementi tramite la funzione, ritorna il primo/tutti i valori che ritornano `true`.
  - `findIndex` è simile a `find`, ma ritorna l'indice piuttosto del valore.

- Per iterare sugli elementi:
  - `forEach(func)` -- invoca `func` su ogni elemento, al termine non ritorna nulla.

- Per modificare un array:
  - `map(func)` -- crea un nuovo array con i risultati della chiamata `func` su tutti i suoi elementi.
  - `sort(func)` -- ordina l'array "sul posto", e lo ritorna.
  - `reverse()` -- inverte l'array sul posto, e lo ritorna.
  - `split/join` -- converte una stringa in array e vice versa.
  - `reduce(func, initial)` -- calculate a single value over the array by calling `func` for each element and passing an intermediate result between the calls.

- Un altro metodo utile:
  - `Array.isArray(arr)` controlla che `arr` sia un array.

Da notare che i metodi `sort`, `reverse` e `splice` modificano l'array stesso.

I metodi elencati sono quelli utilizzati più spesso, sono in grado di coprire il 99% dei casi d'uso. Ce ne sono altri che possono tornare utili:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) controlla l'array.

  La funzione `fn` viene invocata su ogni elemento dell'array in maniera simile a `map`. Se qualcuno/tutti i risultati sono `true`, ritorna `true`, altrimenti `false`.

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- riempie l'array con `value` da `start` fino a `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- copia gli elementi da `start` fino a `end` dentro *se stesso*,  nella posizione `target` (sovrascrivendo gli elementi contenuti).

Per la lista completa, vedere il [manuale](mdn:js/Array).

A prima vista potrebbero sembrare molti metodi da ricordare. Ma in realtà è molto più semplice di quanto sembri.

<<<<<<< HEAD
Tenente sempre un occhio al riassunto fornito sopra. Provate anche a risolvere gli esercizi di questo capitolo.

In futuro quando avrete bisogno di fare qualcosa con un array, e non saprete come fare -- tornate qui, guardate il riassunto e trovate il metodo corretto. Gli esempi vi aiuteranno molto. In poco tempo vi risulterà naturale ricordare questi metodi, senza troppi sforzi.
=======
Look through the cheat sheet just to be aware of them. Then solve the tasks of this chapter to practice, so that you have experience with array methods.

Afterwards whenever you need to do something with an array, and you don't know how -- come here, look at the cheat sheet and find the right method. Examples will help you to write it correctly. Soon you'll automatically remember the methods, without specific efforts from your side.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
