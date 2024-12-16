# Metodi per gli array

<<<<<<< HEAD
Gli array forniscono una gran quantità di metodi. Per rendere le cose più semplici, in questo capitolo li abbiamo divisi per gruppi.
=======
Arrays provide a lot of methods. To make things easier, in this chapter, they are split into groups.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Aggiungere/rimuovere elementi 

Conosciamo già i metodi che consentono di aggiungere e rimuovere elementi:

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

delete arr[1]; // rimuove "go"

alert( arr[1] ); // undefined

// ora arr = ["I",  , "home"];
alert( arr.length ); // 3
```

L'elemento viene rimosso, ma l'array ha ancora 3 elementi, possiamo vederlo tramite `arr.length == 3`.

<<<<<<< HEAD
Non è una sorpresa, perché `delete obj.key` rimuove un valore dalla `key`. Questo è tutto quello che fa. Può andare bene per gli oggetti. Con gli array vorremmo che il resto degli elementi scalassero, andando ad occupare il posto che si è liberato. Per questo ci aspetteremmo di avere un array più corto.
=======
That's natural, because `delete obj.key` removes a value by the `key`. It's all it does. Fine for objects. But for arrays we usually want the rest of the elements to shift and occupy the freed place. We expect to have a shorter array now.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per questo scopo sono stati sviluppati dei metodi dedicati.

<<<<<<< HEAD
Il metodo [arr.splice](mdn:js/Array/splice) è un coltellino svizzero per array. Può fare qualsiasi cosa: aggiungere e rimuovere elementi, ovunque.
=======
The [arr.splice](mdn:js/Array/splice) method is a Swiss army knife for arrays. It can do everything: insert, remove and replace elements.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La sintassi è:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

Modifica l'array partendo dall'indice `start`; rimuove `deleteCount` elementi ed inserisce `elem1, ..., elemN`. Infine ritorna un array contenente gli elementi rimossi.

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

<<<<<<< HEAD
Nel prossimo esempio, rimuoviamo 3 elementi e li rimpiazziamo con altri due:
=======
In the next example, we remove 3 elements and replace them with the other two:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
Il metodo `splice` è anche in grado di inserire elementi senza alcuna rimozione. Per ottenere questo dobbiamo impostare `deleteCount` a `0`:
=======
The `splice` method is also able to insert the elements without any removals. For that, we need to set `deleteCount` to `0`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let arr = ["I", "study", "JavaScript"];

// da indice 2
// ne rimuove 0
// poi inserisce "complex" e "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="Sono permessi indici negativi"
In questo come in altri metodi dedicati agli array, sono permessi indici negativi. Essi specificano la posizione dalla fine dell'array, come:

```js run
let arr = [1, 2, 5];

// dall'indice -1 (un passo dalla fine)
// cancella 0 elementi,
// poi inserisce 3 e 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

<<<<<<< HEAD
Il metodo [arr.slice](mdn:js/Array/slice) è più semplice di `arr.splice`.
=======
The method [arr.slice](mdn:js/Array/slice) is much simpler than the similar-looking `arr.splice`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La sintassi è:

```js
arr.slice([start], [end])
```

Ritorna un nuovo array contente tutti gli elementi a partire da `"start"` fino ad `"end"` (`"end"` escluso). Sia `start` che `end` possono essere negativi; in tal caso si inizierà a contare dalla coda dell'array.

<<<<<<< HEAD
Funziona come `str.slice`, ma crea dei sotto-array piuttosto che sotto-stringhe.
=======
It's similar to a string method `str.slice`, but instead of substrings, it makes subarrays.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (copia da 1 a 3)

alert( arr.slice(-2) ); // s,t (copia da -2 fino alla fine)
```

Possiamo anche utilizzarlo senza argomenti: `arr.slice()` crea una copia di `arr`. Questo tipo di chiamata è spesso utilizzata per creare una copia con cui poter liberamente lavorare senza modificare l'array originale. 

### concat

Il metodo [arr.concat](mdn:js/Array/concat) crea un nuovo array che include valori di altri array, o elementi aggiuntivi.

La sintassi è:

```js
arr.concat(arg1, arg2...)
```

Accetta un numero arbitrario di argomenti -- sia array che valori.

Il risultato è un nuovo array contenente gli elementi di `arr`, seguiti da `arg1`, `arg2` etc.

Se un argomento `argN` è un array, tutti i suoi elementi vengono copiati. Altrimenti viene copiato solamente l'argomento stesso.

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

Normalmente copia elementi da un array. Gli altri oggetti, anche se assomigliano molto ad un array, vengono aggiunti interamente:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

...Se, invece, un oggetto simile ad un array possiede la proprietà `Symbol.isConcatSpreadable`, allora viene trattato come un array e i suoi elementi vengono copiati:

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
<<<<<<< HEAD
  // ... fa qualcosa con l'elemento
=======
  // ... do something with an item
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
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

<<<<<<< HEAD
I metodi [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) e [arr.includes](mdn:js/Array/includes) hanno la stessa sintassi, e fanno praticamente la stessa cosa della loro controparte per stringhe, ma operano su elementi invece che su caratteri:

- `arr.indexOf(item, from)` cerca un `item` a partire dall'indirizzo `from`, e ritorna l'indirizzo in cui è stato trovato, altrimenti ritorna `-1`.
- `arr.lastIndexOf(item, from)` -- lo stesso, ma esegue la ricerca a partire da destra verso sinistra.
- `arr.includes(item, from)` -- cerca un `item` a partire dall'indice `from`, e ritorna `true` se lo trova.

Ad esempio:
=======
The methods [arr.indexOf](mdn:js/Array/indexOf) and [arr.includes](mdn:js/Array/includes) have the similar syntax and do essentially the same as their string counterparts, but operate on items instead of characters:

- `arr.indexOf(item, from)` -- looks for `item` starting from index `from`, and returns the index where it was found, otherwise `-1`.
- `arr.includes(item, from)` -- looks for `item` starting from index `from`, returns `true` if found.

Usually, these methods are used with only one argument: the `item` to search. By default, the search is from the beginning.

For instance:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

<<<<<<< HEAD
Da notare che questi metodi usano il confronto `===`. Quindi, se cerchiamo `false`, troveremo esattamente `false` e non zero.

Se vogliamo solo verificare la presenza di un elemento, senza voler conoscere l'indirizzo, è preferibile utilizzare il metodo `arr.includes`.

Inoltre, una piccola differenza è che `includes` gestisce correttamente `NaN`, a differenza di `indexOf/lastIndexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (dovrebbe essere 0, ma l'uguaglianza === non funziona con NaN)
alert( arr.includes(NaN) );// true (corretto)
=======
Please note that `indexOf` uses the strict equality `===` for comparison. So, if we look for `false`, it finds exactly `false` and not the zero.

If we want to check if `item` exists in the array and don't need the index, then `arr.includes` is preferred.

The method [arr.lastIndexOf](mdn:js/Array/lastIndexOf) is the same as `indexOf`, but looks for from right to left.

```js run
let fruits = ['Apple', 'Orange', 'Apple']

alert( fruits.indexOf('Apple') ); // 0 (first Apple)
alert( fruits.lastIndexOf('Apple') ); // 2 (last Apple)
```

````smart header="The `includes` method handles `NaN` correctly"
A minor, but noteworthy feature of `includes` is that it correctly handles `NaN`, unlike `indexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (wrong, should be 0)
alert( arr.includes(NaN) );// true (correct)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
That's because `includes` was added to JavaScript much later and uses the more up-to-date comparison algorithm internally.
````

<<<<<<< HEAD
### find e findIndex

Immaginiamo di avere un array di oggetti. Come possiamo trovare un oggetto che soddisfi specifiche condizioni?
=======
### find and findIndex/findLastIndex

Imagine we have an array of objects. How do we find an object with a specific condition?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In questi casi si utilizza il metodo [arr.find](mdn:js/Array/find).

La sintassi è:
```js
let result = arr.find(function(item, index, array) {
  // se viene ritornato true, viene ritornato l'elemento e l'iterazione si ferma
  // altrimenti ritorna undefined
});
```

La funzione viene chiamata per ogni elemento dell'array:

- `item` è l'elemento.
- `index` è il suo indice.
- `array` è l'array stesso.

<<<<<<< HEAD
Se la chiamata ritorna `true`, la ricerca viene interrotta e viene ritornato `item`. Se non viene trovato nulla verrà ritornato `undefined`.
=======
If it returns `true`, the search is stopped, the `item` is returned. If nothing is found, `undefined` is returned.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
 Gli array di oggetti sono molto comuni, quindi il metodo `find` risulta molto utile.
=======
In real life, arrays of objects are a common thing, so the `find` method is very useful.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Da notare che nell'esempio noi forniamo a `find` un singolo argomento `item => item.id == 1`. Gli altri parametri di `find` sono raramente utilizzati.

<<<<<<< HEAD
Il metodo [arr.findIndex](mdn:js/Array/findIndex) fa essenzialmente la stessa cosa, ma ritorna l'indice in cui è stata trovata la corrispondenza piuttosto di ritornare l'oggetto stesso; se l'oggetto non viene trovato ritorna `-1`.
=======
The [arr.findIndex](mdn:js/Array/findIndex) method has the same syntax but returns the index where the element was found instead of the element itself. The value of `-1` is returned if nothing is found.

The [arr.findLastIndex](mdn:js/Array/findLastIndex) method is like `findIndex`, but searches from right to left, similar to `lastIndexOf`.

Here's an example:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// Find the index of the first John
alert(users.findIndex(user => user.name == 'John')); // 0

// Find the index of the last John
alert(users.findLastIndex(user => user.name == 'John')); // 3
```
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

### filter

Il metodo `find` cerca un singola occorrenza dell'elemento, la prima, e se trovata ritorna `true`.

Se vogliamo cercare più occorrenze, possiamo utilizzare [arr.filter(fn)](mdn:js/Array/filter).

La sintassi è pressoché la stessa di `find`, ma ritorna un array contenente tutte le corrispondenze trovate:

```js
let results = arr.filter(function(item, index, array) {
  // se un item è true viene messo dentro results e l'iterazione continua
  // ritorna un array vuoto qualora nessun elemento ritornasse true
});
```

Ad esempio:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// ritorna un array con i primi due users
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

La funzione viene chiamata per ogni elemento dell'array e ritorna un array con i risultati.

Ad esempio, qui trasformiamo ogni elemento nella propria `length`:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

Il metodo [arr.sort](mdn:js/Array/sort) ordina l'array *sul posto*, ovvero cambia la posizione originale dei suoi elementi.

Ritorna altresì l'array riordinato, ma il risultato viene di solito ignorato, essendo l'`arr` originale modificato.

Ad esempio:

```js run
let arr = [ 1, 2, 15 ];

// il metodo riordina il contenuto di arr (e lo ritorna)
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Notate qualcosa di strano nel risultato?

L'ordine degli elementi è diventato `1, 15, 2`. Errato. Ma perché?

**Di default gli elementi vengono ordinati come stringhe.**

Letteralmente, tutti gli elementi vengono convertiti in stringhe e confrontati. Quindi, viene applicato l'algoritmo di ordinamento lessicografico, perciò `"2" > "15"`.

Per utilizzare un ordinamento arbitrario, dobbiamo fornire una funzione come argomento di `arr.sort()`.

<<<<<<< HEAD
La funzione dovrebbe essere simile a questa:
=======
The function should compare two arbitrary values and return:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js
function compare(a, b) {
  if (a > b) return 1; // se il primo valore è maggiore del secondo
  if (a == b) return 0; // se i valori sono uguali
  if (a < b) return -1; // se il primo valore è inferiore al secondo
}
```

Ad esempio, per ordinare dei numeri:

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
Proviamo un attimo a capire cosa sta succedendo. L'array `arr` può contenere qualsiasi cosa, giusto? Può contenere numeri, stringhe, elementi HTML o qualsiasi altra cosa. Abbiamo quindi un insieme di *qualcosa*. Per poterlo ordinare abbiamo bisogno di una *funzione di ordinamento* che sappia ordinare gli elementi passati come argomenti. L'ordinamento di default è di tipo stringa.
=======
Let's step aside and think about what's happening. The `arr` can be an array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il metodo `arr.sort(fn)` implementa un algoritmo di ordinamento. Non dovremmo preoccuparci di come funzioni esattamente (la maggior parte delle volte è un [quicksort](https://en.wikipedia.org/wiki/Quicksort) ottimizzato). Questo algoritmo attraverserà l'intero array e confronterà i suoi valori; tutto quello che dobbiamo fare sarà fornirgli una funzione `fn` che esegua il confronto.

<<<<<<< HEAD
In ogni caso, se mai volessimo conoscere quali elementi vengono comparati -- nulla ci vieta di utilizzare `alert`:
=======
By the way, if we ever want to know which elements are compared -- nothing prevents us from alerting them:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

L'algoritmo potrebbe confrontare un elemento più volte durante il processo, sebbene tenti di fare il minor numero di confronti possibili.


````smart header="Una funzione di confronto può ritornare qualsiasi numero"
In realtà, ad una funzione di confronto è solamente richiesto di ritornare un numero positivo per dire "maggiore" ed uno negativo per dire "minore".

Questo consente di scrivere funzioni più brevi:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Le arrow functions sono le migliori"
Ricordate le [arrow functions](info:function-expressions-arrows#arrow-functions)? Possiamo utilizzarle per più conciso il codice di ordinamento:

```js
arr.sort( (a, b) => a - b );
```

Questa funziona esattamente come le altre versioni sopra, ma è più breve.
````

````smart header="Use `localeCompare` for strings"
Ricordate  l'algoritmo di comparazione delle [strings](info:string#correct-comparisons)? Di default, compara le lettere usando il loro codice.

Per molti alfabeti è meglio utilizzare `str.localeCompare` per ordinare correttamente lettere come `Ö`.

Per esempio, ordiniamo alcuni paesi in tedesco:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
```
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

### split e join

Vediamo una situazione reale. Stiamo scrivendo un'applicazione di messaggistica, e l'utente inserisce una lista di destinatari: `John, Pete, Mary`. Per noi sarebbe più comodo avere un array di nomi piuttosto di una singola stringa. Come possiamo ottenerlo?

Il metodo [str.split(delim)](mdn:js/String/split) fa esattamente questo. Divide la stringa in un array utilizzando il delimitatore `delim`.

<<<<<<< HEAD
Nell'esempio sotto, utilizziamo come delimitatore una virgola seguita da uno spazio:
=======
In the example below, we split by a comma followed by a space:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo (e altri name)
}
```

Il metodo `split` ha un secondo argomento opzionale di tipo numerico -- è un limite di lunghezza per l'array. Se questo argomento viene fornito, allora gli elementi extra verranno ignorati. Ma nella pratica è raramente utilizzato:

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

La chiamata ad [arr.join(separatore)](mdn:js/Array/join) fa esattamente l'inverso di `split`. Crea una stringa con gli elementi di `arr` incollati tra loro dal `separatore`.

Ad esempio:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // incolla l'array utilizzando ;

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight
Quando vogliamo iterare su un array -- possiamo utilizzare `forEach`, `for` o `for..of`.

Quando invece abbiamo la necessità di iterare e ritornare dati per ogni elemento -- possiamo usare `map`.

I metodi [arr.reduce](mdn:js/Array/reduce) e [arr.reduceRight](mdn:js/Array/reduceRight) fanno parte della stessa categoria, ma sono leggermente più complessi. Vengono utilizzati per calcolare un singolo valore basato sul contenuto dell'array.

La sintassi è:

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

La funzione viene applicata ad ogni elemento dell'array uno dopo l'altro, passando il risultato alla chiamata successiva.

Argomenti:

<<<<<<< HEAD
- `accumulator` -- è il risultato della precedente chiamata, uguale ad `initial` per la prima chiamata (se `initial` viene fornito).
- `item` -- è l'attuale elemento dell'array.
- `index` -- la sua posizione.
- `array` -- l'array.

Quando la funzione è stata applicata, il risultato viene passato alla chiamata successiva.
=======
As the function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end, it becomes the result of `reduce`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Sembra complicato, ma non lo è se pensate al primo argomento come un "accumulatore" che memorizza il risultato delle precedenti esecuzioni. E alla fine diventa il risultato di `reduce`.

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
2. Nella seconda esecuzione, `sum = 1`; gli sommiamo il secondo elemento dell'array(`2`) e ritorniamo il risultato.
3. Nella terza esecuzione, `sum = 3`; gli sommiamo l'elemento successivo, e cosi via...

Il flusso di calcolo:

![](reduce.svg)

O nella forma tabellare, in cui ogni riga rappresenta una chiamata di funzione:

|   |`sum`|`current`|result|
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

// rimosso il valore iniziale da reduce (no 0)
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


<<<<<<< HEAD
Quindi è fortemente consigliato di specificare sempre un valore iniziale.

Il metodo [arr.reduceRight](mdn:js/Array/reduceRight) fa esattamente la stessa cosa, ma da destra verso sinistra.

=======
The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same but goes from right to left.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Array.isArray

Gli array non sono un tipo di dato a sé del linguaggio. Sono basati sulla sintassi degli oggetti.

Quindi `typeof` non aiuta a distinguere un oggetto da un array:

```js run
alert(typeof {}); // object
<<<<<<< HEAD
alert(typeof []); // lo stesso
=======
alert(typeof []); // object (same)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

...Ma gli array vengono utilizzati cosi spesso che esiste un metodo dedicato per questo: [Array.isArray(value)](mdn:js/Array/isArray). Ritorna `true` se `value` è un array, `false` altrimenti.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## la maggior parte dei metodi accetta "thisArg"

Quasi tutti i metodi degli array che richiedono una funzione -- come `find`, `filter`, `map`, fatta eccezione per `sort`, accettano un parametro opzionale `thisArg`.

<<<<<<< HEAD
Questo parametro non è stato spiegato nella sezione sopra, perché viene raramente utilizzato. Studiamolo per completezza.
=======
That parameter is not explained in the sections above, because it's rarely used. But for completeness, we have to cover it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// trova tutti gli users più giovani di user
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

Nella chiamata sopra, utilizziamo `army.canJoin` come filtro e forniamo `army` come contesto. Se non avessimo fornito il contesto, `users.filter(army.canJoin)` avrebbe chiamato `army.canJoin` come funzione a sé stante, con `this=undefined`. Che avrebbe provocato un errore.


Una chiamata a `user.filter(army.canJoin, army)` può essere sostituita da 
`users.filter(user => army.canJoin(user))`, che fa lo stesso. L'ultima versione viene utilizzata più spesso e per molte persone è più semplice da capire.

## Riepilogo

Un breve riepilogo dei metodi per array:

<<<<<<< HEAD
- Per aggiungere/rimuovere elementi:
  - `push(...items)` -- aggiunge elementi in coda,
  - `pop()` -- estrae un elemento dalla coda,
  - `shift()` -- estrae un elemento dalla testa,
  - `unshift(...items)` -- aggiunge un elemento alla testa.
  - `splice(pos, deleteCount, ...items)` -- all'indice `pos` cancella `deleteCount` elementi e al loro posto inserisce `items`.
  - `slice(start, end)` -- crea un nuovo array e copia al suo interno gli elementi da `start` fino ad `end` (escluso).
  - `concat(...items)` -- ritorna un nuovo array: copia tutti gli elementi di quello corrente e ci aggiunge `items`. Se uno degli `items` è un array, allora vengono presi anche i suoi elementi.
=======
- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, and return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- Ricercare elementi:
  - `indexOf/lastIndexOf(item, pos)` -- cerca `item` a partire da `pos`, e ritorna l'indice, oppure `-1` se non lo trova.
  - `includes(value)` -- ritorna `true` se l'array contiene `value`, altrimenti `false`.
  - `find/filter(func)` -- filtra gli elementi tramite una funzione, ritorna il primo/tutti i valori che ritornano `true`.
  - `findIndex` è simile a `find`, ma ritorna l'indice piuttosto del valore.

- Per iterare sugli elementi:
  - `forEach(func)` -- invoca `func` su ogni elemento; non ritorna nulla.

<<<<<<< HEAD
- Per modificare un array:
  - `map(func)` -- crea un nuovo array con i risultati della chiamata `func` su tutti i suoi elementi.
  - `sort(func)` -- ordina l'array "sul posto", e lo ritorna.
  - `reverse()` -- inverte l'array sul posto, e lo ritorna.
  - `split/join` -- converte una stringa in array e vice versa.
  - `reduce/reduceRight(func, initial)` -- calcola un singolo valore chiamando `func` per ogni elemento e passando un risultato temporaneo tra una chiamata e l'altra
=======
- Additionally:
  - `Array.isArray(value)` checks `value` for being an array, if so returns `true`, otherwise `false`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- Un altro metodo utile:
  - `Array.isArray(arr)` controlla che `arr` sia un array.

Da notare che i metodi `sort`, `reverse` e `splice` modificano l'array stesso.

I metodi elencati sono quelli utilizzati più spesso e sono in grado di coprire il 99% dei casi d'uso. Ce ne sono altri che possono tornare utili:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) controlla l'array.

  La funzione `fn` viene invocata su ogni elemento dell'array in maniera simile a `map`. Se qualcuno/tutti i risultati sono `true`, ritorna `true`, altrimenti `false`.
  
  Questi metodi si comportano quasi come gli operatori `||` e `&&`: se `fn` ritorna un valore vero, `arr.some()` ritorna immediatamente  `true` e conclude l'iterazione; se `fn` ritorna un valore falso, `arr.every()` ritorna immediatamente `false` e smette di iterare.

<<<<<<< HEAD
  Possiamo utilizzare `every` per confrontare gli array:
=======
  We can use `every` to compare arrays:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- riempie l'array con `value` da `start` fino a `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- copia gli elementi da `start` fino a `end` dentro *se stesso*,  nella posizione `target` (sovrascrivendo gli elementi contenuti).

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) crea un nuovo array monodimensionale partendo da un array multidimensionale.

Per la lista completa, vedere il [manuale](mdn:js/Array).

<<<<<<< HEAD
A prima vista potrebbero sembrare molti metodi da ricordare. Ma in realtà è molto più semplice di quanto sembri.
=======
At first sight, it may seem that there are so many methods, quite difficult to remember. But actually, that's much easier.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tenente sempre un occhio al riassunto fornito sopra. Provate anche a risolvere gli esercizi di questo capitolo.

In futuro quando avrete bisogno di fare qualcosa con un array, e non saprete come fare -- tornate qui, guardate il riassunto e trovate il metodo corretto. Gli esempi vi aiuteranno molto. In poco tempo vi risulterà naturale ricordare questi metodi, senza troppi sforzi.
