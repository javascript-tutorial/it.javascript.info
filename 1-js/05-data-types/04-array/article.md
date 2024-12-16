# Array

Gli oggetti consentono la memorizzazione di una collezione di valori associati alle rispettive chiavi.

Ma spesso abbiamo bisogno di una *collezione ordinata*, dove abbiamo un primo, un secondo, un terzo elemento e così via. Ad esempio, abbiamo bisogno di memorizzare una lista di cose: utenti, beni, elementi HTML etc.

Non è conveniente utilizzare un oggetto per questo tipo di lavori, poiché non avremmo alcun metodo per gestire l'ordine degli elementi. Non possiamo inserire una nuova proprietà "tra" due già esistenti.  Gli oggetti non sono stati pensati per questo scopo.

Esistono delle speciali strutture dati chiamate `Array`, che consentono la memorizzazione di collezioni ordinate. 

## Dichiarazione

Ci sono due differenti sintassi per la creazioni di un array vuoto:

```js
let arr = new Array();
let arr = [];
```

Nella maggioranza dei casi, la seconda sintassi è quella preferita. Possiamo già fornire degli elementi da inserire, all'interno delle parentesi quadre:

```js
let fruits = ["Apple", "Orange", "Plum"];
```

Gli elementi di un array sono numerati a partire dallo zero.

Possiamo ottenere un elemento tramite il suo numero di indice:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

Possiamo rimpiazzare un elemento:

```js
fruits[2] = 'Pear'; // ora ["Apple", "Orange", "Pear"]
```

...o aggiungerne uno nuovo:

```js
fruits[3] = 'Lemon'; // ora ["Apple", "Orange", "Pear", "Lemon"]
```

Il numero degli elementi dell'array è `length`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
```

Possiamo anche utilizzare `alert` per mostrare l'intero array.

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
```

Un array può memorizzare elementi di qualsiasi tipo.

Ad esempio:

```js run no-beautify
// insieme di valori
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// prende l'oggetto all'indice 1 e ne mostra il nome
alert( arr[1].name ); // John

// prende la funzione all'indice 3 e la esegue
arr[3](); // hello
```


````smart header="Virgola pendente"
Gli array, proprio come gli oggetti, possono terminare con una virgola:
```js 
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
];
```

La "virgola pendente" rende più semplice inserire/rimuovere elementi, perché tutte le linee seguono la stessa struttura.
````

## Get last elements with "at"

[recent browser="new"]

Let's say we want the last element of the array.

Some programming languages allow the use of negative indexes for the same purpose, like `fruits[-1]`.

Although, in JavaScript it won't work. The result will be `undefined`, because the index in square brackets is treated literally.

We can explicitly calculate the last element index and then access it: `fruits[fruits.length - 1]`.

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[fruits.length-1] ); // Plum
```

A bit cumbersome, isn't it? We need to write the variable name twice.

Luckily, there's a shorter syntax: `fruits.at(-1)`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// same as fruits[fruits.length-1]
alert( fruits.at(-1) ); // Plum
```

In other words, `arr.at(i)`:
- is exactly the same as `arr[i]`, if `i >= 0`.
- for negative values of `i`, it steps back from the end of the array.

## I metodi pop/push, shift/unshift

Una [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) (coda) è una delle più comuni applicazioni di un array. In ambito informatico, questa è una collezione ordinata che consente due operazioni:

- `push` inserisce un elemento in coda.
- `shift` per estrarre un elemento dall'inizio, e scorrere in avanti la coda, di modo che il secondo elemento diventa il primo.

![](queue.svg)

Gli array supportano entrambe le operazioni.

Nella pratica non è strano incontrare questo "tipo" di array. Ad esempio una coda di messaggi che devono essere mostrati sullo schermo.

Esiste un altro caso d'uso degli array -- la struttura dati chiamata [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)). 

Questa supporta due operazioni:

- `push` aggiunge un elemento in coda.
- `pop` estrae un elemento dalla coda.

Quindi gli elementi vengono sempre aggiunti o presi dalla "fine".

Uno stack viene spesso illustrato come un pacco di carte: le nuove carte vengono aggiunte sempre in cima o da lì estratte:

![](stack.svg)

Negli gli stack, l'ultimo elemento inserito viene prelevato per primo. Questo comportamento viene definito LIFO (Last-In-First-Out). Nel caso delle code, il comportamento viene chiamato FIFO (First-In-First-Out).

<<<<<<< HEAD
Gli array in JavaScript possono implementare sia una queue che uno stack. C'è la possibilità di aggiungere/rimuovere elementi sia in cima che in coda.

In informatica questa struttura dati si chiama [deque](https://en.wikipedia.org/wiki/Double-ended_queue).
=======
Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements, both to/from the beginning or the end.

In computer science, the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

**Metodi che operano sulla coda di un array:**

`pop`
: Estrae l'ultimo elemento dell'array e lo ritorna:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // rimuove "Pear" e lo ritorna con alert

    alert( fruits ); // Apple, Orange
    ```

    Both `fruits.pop()` and `fruits.at(-1)` return the last element of the array, but `fruits.pop()` also modifies the array by removing it.

`push`
: Inserisce l'elemento in coda all'array:

    ```js run
    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear
    ```

    La chiamata `fruits.push(...)` è equivalente a `fruits[fruits.length] = ...`.

**Metodi che operano sull'inizio dell'array:**

`shift`
: Estrae il primo elemento dell'array e lo ritorna:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // rimuove Apple e lo ritorna con alert

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: Aggiunge l'elemento alla testa dell'array:

    ```js run
    let fruits = ["Orange", "Pear"];

    fruits.unshift('Apple');

    alert( fruits ); // Apple, Orange, Pear
    ```

I metodi `push` e `unshift` possono aggiungere anche più elementi in una volta sola:

```js run
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```

## Internamente


Un array è uno speciale tipo di oggetto. Le parentesi quadre utilizzate per accedere alla proprietà `arr[0]` derivano dalla sintassi utilizzata con gli oggetti. Questo equivale a `obj[key]`, dove `arr` è l'oggetto, mentre i numeri vengono utilizzati come chiavi.

Inoltre estendono gli oggetti fornendo speciali metodi per operare ordinatamente su collezioni di dati, e contengono la proprietà `length`. Ma internamente rimane sempre un oggetto.

Ricordate, ci sono solo 7 tipi di base in JavaScript. Gli array sono oggetti e si comportano come tali. 

Ad esempio, vengono copiati per riferimento:

```js run
let fruits = ["Banana"]

let arr = fruits; // copia per riferimento (due variabili fanno riferimento allo stesso array)

alert( arr === fruits ); // true
 
arr.push("Pear"); // modifica l'array per riferimento

alert( fruits ); // Banana, Pear - ora sono 2 elementi
```

... Ma ciò che li rende realmente speciali è la loro rappresentazione interna. Il motore prova a memorizzare gli elementi in aree di memoria contigue, uno dopo l'altro, proprio come nelle illustrazioni di questo capitolo, e ci sono anche altre ottimizzazioni per rendere gli array molto veloci.

Se iniziamo a trattare gli array come oggetti ordinari tutte le ottimizzazioni vengono meno.

Ad esempio, tecnicamente possiamo fare:

```js
let fruits = []; // crea una array

fruits[99999] = 5; // assegna una proprietà con indice maggiore della sua lunghezza

fruits.age = 25; // crea una proprietà con un nome a scelta
```

Questo è possibile, perché gli array sono comunque degli oggetti. Possiamo aggiungervi qualsiasi proprietà.

Ma *l'engine* si accorgerà che stiamo utilizzando gli array come comuni oggetti. Le ottimizzazioni specifiche per gli array non sono studiate per questi casi, e verranno quindi disattivate.

I modi per usare incorrettamente un array:

- Aggiungere una proprietà non numerica, come `arr.test = 5`. 
- Creare buchi: aggiungendo `arr[0]` e poi `arr[1000]` (lasciando spazio vuoto tra di loro).
- Riempire l'array nell'ordine inverso, ad esempio `arr[1000]`, `arr[999]`.

E' molto conveniente pensare agli array come delle speciali strutture utili a lavorare con *dati ordinati*. Forniscono speciali metodi utili a questo scopo, inoltre sono attentamente ottimizzati dal motore JavaScript per lavorare con dati ordinati e memorizzati in posizioni contigue. Quindi se doveste aver bisogno di utilizzare una proprietà con una chiave arbitraria, molto probabilmente un oggetto soddisferà le vostre necessità.

## Performance

I metodi `push/pop` vengono eseguiti rapidamente, mentre `shift/unshift` sono più lenti.

![](array-speed.svg)

Perché è più veloce eseguire operazioni sulla coda degli array rispetto a quelle sulla testa? Andiamo a vedere cosa accade durante l'esecuzione:

```js
fruits.shift(); // prende 1 elemento dall'inizio
```

<<<<<<< HEAD
Non è sufficiente prelevare e rimuovere l'elemento con l'indice `0`. Gli altri elementi dovranno essere rinumerati.
=======
It's not enough to take and remove the element with the index `0`. Other elements need to be renumbered as well.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

L'operazione di `shift` deve seguire 3 passi:

1. Rimuovere l'elemento con indice `0`.
2. Spostare tutti gli elementi a sinistra, rinumerare gli indici da `1` a `0`, da `2` a `1` e cosi via.
3. Aggiornare la proprietà `length`.

![](array-shift.svg)

**Maggiore sarà il numero di elementi, maggiore sarà il tempo richiesto, e maggiori saranno il numero di operazioni in memoria.**

Una cosa simile accade con `unshift`: per aggiungere un elemento in testa all'array, abbiamo prima bisogno di spostare tutti gli elementi a destra e aggiornare gli indici.
Invece con `push/pop`? Non richiedono lo spostamento di nulla in memoria. Per poter prelevare un elemento dalla coda, il metodo `pop` pulisce l'indirizzo e decrementa `length`.

Le azioni eseguite da `pop`:

```js
fruits.pop(); // prende 1 elemento dalla fine
```

![](array-pop.svg)

**Il metodo `pop` non richiede spostamenti, perché ogni elemento mantiene il suo indice. Questo è il motivo per cui risulta essere un'operazione molto veloce.**

Una cosa simile accade con il metodo `push`.

## Cicli

Uno dei modi più vecchi per eseguire cicli sugli elementi di un array è il `for` utilizzando gli indici:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

Per gli array c'è un'altra forma di ciclo, `for..of`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// itera sugli elementi dell'array
for (let fruit of fruits) {
  alert( fruit );
}
```

Il ciclo `for..of` non fornisce il numero d'indice dell'elemento corrente, solo il suo valore; in molte situazioni questo è più che sufficiente. E più breve.

Tecnicamente, poiché gli array sono oggetti, è anche possibile utilizzare `for..in`:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

Non è comunque un'ottima idea. Si possono verificare diversi errori:

1. Il ciclo `for..in` itera su *tutte le proprietà*, non solo su quelle numeriche.

    Ci sono anche degli oggetti chiamati "array-like" (simili ad array), nei browser e in altri ambienti, che *assomigliano ad array*. Infatti come proprietà possiedono `length` e degli indici, ma allo stesso tempo contengono proprietà e metodi di tipo non numerico, di cui solitamente non abbiamo bisogno. Il ciclo `for..in` li passerà tutti. Quindi se stiamo utilizzando degli oggetti array-like, questi "extra" potrebbero rivelarsi un problema.

2. Il ciclo `for..in` è ottimizzato per gli oggetti generici, non gli array, e può risultare quindi 10-100 volte più lento. Ovviamente rimane comunque un'operazione molto veloce. Può essere un problema solo in caso si verifichino ingorghi. 

Generalmente, non dovremmo utilizzare `for..in` per gli array.


## Una parola riguardo "length"

La proprietà `length` si aggiorna automaticamente ad ogni modifica. Volendo essere precisi non ne rappresenta la lunghezza, ma l'ultimo indice numerico più uno.

Ad esempio, un singolo elemento con un indice molto alto fornisce un altrettanto grande lunghezza:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

Ovviamente questo non è il modo corretto di utilizzare un array. 

Un'altra cosa interessante riguardo la proprietà `length` è che è sovrascrivibile.

Se provassimo ad incrementarla manualmente, non accadrebbe nulla di interessante. Se invece la decrementiamo, l'array verrà troncato. Il processo è irreversibile. Vediamo un esempio:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // tronca a 2 elementi
alert( arr ); // [1, 2]

arr.length = 5; // ritorna alla lunghezza precedente
alert( arr[3] ); // undefined: i valori non vengono ritornati
```

Quindi il modo più semplice per ripulire un array è: `arr.length = 0;`.


## new Array() [#new-array]

C'è un ulteriore sintassi per creare un array:

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

<<<<<<< HEAD
Viene utilizzata raramente, le parentesi `[]` risultano più brevi. Anche se c'è una caratteristica interessante che va osservata.
=======
It's rarely used, because square brackets `[]` are shorter. Also, there's a tricky feature with it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Se utilizziamo `new Array` con un solo argomento di tipo numerico, allora verrà creato un array *vuoto, ma con lunghezza data*.

<<<<<<< HEAD
Quindi vediamo come ci si potrebbe sparare da soli al piede:
=======
Let's see how one can shoot themselves in the foot:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let arr = new Array(2); // creerà un array [2] ?

alert( arr[0] ); // undefined! nessun elemento.

alert( arr.length ); // length 2
```

Nel codice sopra, `new Array(number)` ha tutti gli elementi `undefined`.

Per evitare queste spiacevoli sorprese, solitamente si utilizzano le parentesi quadre, a meno di non sapere davvero che cosa si sta facendo.

## Array multi-dimensionali

Gli array possono contenere oggetti che sono a loro volta array. Possiamo quindi utilizzare questa proprietà per creare array multi-dimensionali, ad esempio per memorizzare matrici:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

<<<<<<< HEAD
alert( matrix[1][1] ); // l'elemento centrale
=======
alert( matrix[0][1] ); // 2, the second value of the first inner array
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## toString

Gli array hanno una propria implementazione del metodo `toString`, il quale ritorna la lista degli elementi separati da una virgola.

Ad esempio:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

Proviamo anche:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

Gli array non possiedono `Symbol.toPrimitive`, e nemmeno `valueOf`; implementano solamente la conversione `toString`, quindi `[]` diventa una stringa vuota, `[1]` diventa `"1"` e `[1,2]` diventa `"1,2"`.

Quando l'operatore di somma binaria `"+"` aggiunge qualcosa ad una stringa, converte tutto a stringa, quindi l'esempio di prima sarà equivalente a:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## Non confrontate gli array con ==

In JavaScript gli array, a differenza di altri linguaggi di programmazione, non dovrebbero essere confrontati con l'operatore `==`.

Questo operatore non offre alcun tipo di trattamento speciale per gli array: li considera come oggetti.

Ricordando velocemente le regole:

- Due oggetti sono uguali con `==` solamente se fanno riferimento allo stesso oggetto.
- Se uno dei due argomenti forniti all'operatore `==` è un oggetto, e l'altro è un tipo primitivo, allora l'oggetto viene convertito a primitivo, come spiegato nel capitolo <info:object-toprimitive>.
- ...Con l'eccezione di `null` e `undefined` che sono uguali solamente tra di loro.

<<<<<<< HEAD
Il confronto stretto con l'operatore `===` è ancora più semplice, poiché non converte i tipi. 
=======
The strict comparison `===` is even simpler, as it doesn't convert types.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Quindi, se confrontiamo array con `==`, non saranno mai equivalenti, a meno chè non confrontiamo due variabili che fanno riferimento allo stesso array.

Ad esempio:
```js run
alert( [] == [] ); // false
alert( [0] == [0] ); // false
```

Questi array sono tecnicamente oggetti differenti. Quindi non si equivalgono. L'operatore `==` non effettua il confronto elemento per elemento.

Anche il confronto con tipi primitivi potrebbe dare risultati strani:

```js run
alert( 0 == [] ); // true

alert('0' == [] ); // false
```

<<<<<<< HEAD
Qui, in entrambi i casi, stiamo confrontando un tipo primitivo con un array. Quindi l'array `[]` viene convertito in tipo primitivo per effettuare il confronto e diventa una stringa vuota `''`. 
=======
Here, in both cases, we compare a primitive with an array object. So the array `[]` gets converted to primitive for the purpose of comparison and becomes an empty string `''`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Successivamente il processo di confronto procede come descritto nel capitolo <info:type-conversions>:

```js run
// dopo averlo convertito, l'array [] equivale a ''
alert( 0 == '' ); // true, poiché '' viene convertito nel numero 0

alert('0' == '' ); // false, nessuna conversione di tipo, sono stringhe differenti
```

Quindi, come possiamo confrontare gli array?

Molto semplice: non utilizzando l'operatore`==`. Invece, vanno confrontati con un ciclo che confronta ogni elemento dei due array, oppure utilizzando uno dei metodi di iterazione che vedremo nel prossimo capitolo.

## Riepilogo

Gli array sono uno speciale tipo di oggetto, studiati per immagazzinare e gestire collezioni ordinate di dati.

<<<<<<< HEAD
- La dichiarazione:

    ```js
    // parentesi quadre (usuale)
    let arr = [item1, item2...];

    // new Array (eccezionalmente raro)
    let arr = new Array(item1, item2...);
    ```

    La chiamata a `new Array(number)` crea un array con la lunghezza data, ma senza elementi.

- La proprietà `length` è la lunghezza dell'array; in realtà, per essere precisi, contiene l'indice dell'ultimo elemento più uno. Questo valore viene aggiornato automaticamente. 
- Se decrementiamo manualmente `length`, l'array viene troncato.
=======
The declaration:

```js
// square brackets (usual)
let arr = [item1, item2...];

// new Array (exceptionally rare)
let arr = new Array(item1, item2...);
```

The call to `new Array(number)` creates an array with the given length, but without elements.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Possiamo eseguire sugli arrays le seguenti operazioni:

<<<<<<< HEAD
- `push(...items)` aggiunge `items` in coda.
- `pop()` rimuove un elemento dalla coda e lo ritorna.
- `shift()` rimuove un elemento dalla testa e lo ritorna.
- `unshift(...items)` aggiunge un elemento alla testa.
=======
Getting the elements:

- we can get element by its index, like `arr[0]`
- also we can use `at(i)` method that allows negative indexes. For negative values of `i`, it steps back from the end of the array. If `i >= 0`, it works same as `arr[i]`.

We can use an array as a deque with the following operations:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per iterare sugli elementi di un array:

- `for (let i = 0; i < arr.length; i++)` - il più veloce, compatibile con i vecchi browsers.
- `for (let item of arr)` - la moderna sintassi, solo per gli elementi.
- `for (let i in arr) ` - da non usare.

Per confrontare gli array, non utilizzate l'operatore  `==` (lo stesso vale per `>`, `<` ecc), poiché non riservano alcun trattamento speciale per gli array. Li trattano come degli oggetti comuni, e solitamente non è quello che vogliamo.

Piuttosto si possono utilizzare i cicli come `for..of` per confrontare ogni elemento dei due array.

Continueremo con lo studio degli array e di altri metodi per aggiungere, rimuovere, estrarre elementi ed ordinarli, nel prossimo capitolo <info:array-methods>.
