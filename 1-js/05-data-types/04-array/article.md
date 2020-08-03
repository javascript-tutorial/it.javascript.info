# Array

Gli oggetti consentono la meorizzazione di una collezzione di valori con chiave.

Molto spesso abbiamo bisogno di una *collezione ordinata*, dove abbiamo un primo, un secondo, un terzo elemento e cosi via. Ad esempio, abbiamo bisogno di memorizzare una lista di cose: utenti, beni, elementi HTML etc.

Non è conveniente utilizzare un oggetto per questo tipo di lavori, poiché non avremmo alcun metodo per gestire l'ordine degli elementi. Non possiamo inserire una nuova proprietà "tra" due già esistenti. Infatti gli oggetti non sono pensati per questo scopo.

Esistono delle speciali strutture dati chiamate `Array`, che consentono la memorizzazione di collezioni ordinate. 

## Dichiarazione

Ci sono due differenti sintatti per la creazioni di un array vuoto:

```js
let arr = new Array();
let arr = [];
```

Nella maggioranza dei casi, la seconda sintassi è quella preferita. Possiamo già fornire degli elementi da inserire, all'interno delle parentesi:

```js
let fruits = ["Apple", "Orange", "Plum"];
```

Gli elementi di un array sono numerati, a partire dallo zero.

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

Il contatore locale degli elementi dell'array è `length`:

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

// prende l'oggetto all'indice 1 e ne mostra il name
alert( arr[1].name ); // John

// prende la funzione all'indice 3 e la esegue
arr[3](); // hello
```


````smart header="Virgola pendente"
Negli array, proprio come per gli oggetti, c'è la possibilità di terminare con una virgola:
```js 
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
];
```

La "virgola pendente" rende più semplice inserire/rimuovere elementi, perché tutte le linee seguono la stessa struttura.
````


## I metodi pop/push, shift/unshift

Una [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) (coda) è una delle maggiori applicazioni di un array. In ambito informatico, questa è una collezione ordinata che consente due operazioni:

- `push` inserisce un elemento in coda.
- `shift` per estrarre un elemento dalla testa della cda, e scorrere in avanti la lista, in questo modo il secondo elemento diventa il primo.

![](queue.svg)

Gli array supportano entrambre le operazioni.

Nella pratica non è strano incontrare questo "tipo" di array. Ad esempiom una coda di messaggi che devono essere mostrati a schermo.

Esiste un altro caso d'uso degli array -- la struttrura dati chiamata [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)). 

Questa supporta due operazioni:

- `push` aggiunge un elemento in coda.
- `pop` estrae un elemento dalla coda.

Quindi gli elementi vengono sempre aggiunti o presi dalla "fine".

Uno stack viene spesso illustrato come un pacco di carte: le nuove carte vengono aggiunte sempre in cima o prese dalla cima:

![](stack.svg)

Per gli stack, l'ultimo elemento inserito viene prelevato per primo, questo comportamento viene definito LIFO (Last-In-First-Out). Nel caso delle code, il comportamento viene chiamato FIFO (First-In-First-Out).

Gli array in JavaScript possono implementare sia una queue che uno stack. C'è la possibilità di aggiungere/rimuovere elementi sia in cima che in coda.

<<<<<<< HEAD
In informatica questa struttura dati si chiama [deque](https://en.wikipedia.org/wiki/Double-ended_queue).
=======
In computer science the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

**Metodi che operano sulla coda di un array:**

`pop`
: Estrae l'ultimo elemento dell'array e lo ritorna:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // rimuove "Pear" e lo ritorna con alert

    alert( fruits ); // Apple, Orange
    ```

`push`
: Inserisce l'elemento in coda all'array:

    ```js run
    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear
    ```

    La chiamata `fruits.push(...)` è equivalente a `fruits[fruits.length] = ...`.

**Metodi che operano sulla testa dell'array:**

`shift`
: Estrae il primo elemento dell'array e lo ritorna:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // rimuove Apple e lo ritorna con alert

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: Aggiunge l'elemento in testa dell'array:

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

Un array è uno speciale tipo di oggetto. Le parentesi quadre vengono utilizzate per accedere alla proprietà `arr[0]`, questa sintassi deriva da quella utilizzata per gli oggetti. I numeri vengono utilizzati come chiave. 
Equivale a `obj[key]`, dove `arr` è l'oggetto, mentre i numeri vengono utilizzati come chiavi.

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

... Ma ciò che li rende realmente speciali è la loro rappresentazione interna. Il motore prova a memorizzare gli elementi in aree di memoria contigue, uno dopo l'altro, propri come nelle illustrazioni di questo capitolo, ci sono anche altre ottimizzazioni per rendere gli array molto veloci.

Se iniziamo a trattare gli array come oggetti ordinari tutte le ottimizzazioni vengono a meno.

Ad esempio, tecnicamente possiamo fare:

```js
let fruits = []; // crea una array

fruits[99999] = 5; // assegna una proprietà con indice maggiore della sua lunghezza

fruits.age = 25; // crea una proprietà con un nome a scelta
```

Questo è possibile, perché gli array sono comunque degli oggetti. Possiamo anche aggiungere proprietà.

Il motore si accorgerà che stiamo gli array come comuni oggetti. Le ottimizzazioni specifiche per gli array non sono studiate per questi casi, verranno quindi disattivate.

I modi per "maltrattare" un array:

- Aggiungere una proprietà non numerica, come `arr.test = 5`. 
- Creare buchi: aggiungendo `arr[0]` e poi `arr[1000]` (lasciando spazio vuoto tra di loro).
- Riempire l'array nell'ordine inverso, ad esempio `arr[1000]`, `arr[999]`.

E' molto conveniente pensare agli array come delle speciali strutture utili a lavorare con *dati ordinati*. Infatti contengono degli speciali metodi per poterli trattare. Inoltre sono attentamente ottimizzati dal motore JavaScript per lavorare con dati ordinati e memorizzati in posizioni contigue. Quindi se dovreste aver bisogno di utilizzare una proprietà con una chiave arbitraria, molto probabilmente un oggetto soddisferà maggiormente le vostre necessità.

## Performance

I metodi `push/pop` vengono eseguiti rapidamente, mentre `shift/unshift` sono più lenti.

![](array-speed.svg)

Perché è più veloce eseguire operazioni sulla coda degli array piuttosto che in testa? Andiamo a vedere cosa accade durante l'esecuzione:

```js
fruits.shift(); // prende 1 elemento dall'inizio
```

Non è sufficiente prelevare e rimuovere l'elemento con l'indice `0`. Gli altri elementi dovranno essere rinumerati.

L'operazione di `shift` deve seguire 3 passi:

1. Rimuovere l'elemento con indice `0`.
2. Spostare tutti gli elementi a sinistra, rinumerare gli indici da `1` a `0`, da `2` a `1` e cosi via.
3. Aggiornare la propreità `length`.

![](array-shift.svg)

**Maggiore sarà il numero di elementi, maggiore sarà il tempo richiesto, e maggiori saranno il numero di operazioni in memoria.**

Una cosa simile accade con `unshift`: per aggiungere un elemento in testa all'array, abbiamo prima bisogno di spostare tutti gli elementi a destra e aggiornare gli indici.
Invece con `push/pop`? Non richiedono lo spostamento di nulla in memoria. Per poter prelevare un elemento dalla coda, il metodo `pop` pulisce l'indirizzo e decrementa la `length`.

Le azioni eseguite da `pop`:

```js
fruits.pop(); // prende 1 elemento dalla fine
```

![](array-pop.svg)

**Il metodo `pop` non richiede spostamenti, perché ogni elemento mantiene il suo indice. Questo è il motivo per cui risulta essere un operazione molto veloce.**

Una cosa simile accade con il metodo `push`.

## Cicli

Uno dei modi più utilizzati per eseguire cicli sugli elementi di un array è il `for` utilizzando gli indici:

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

Il ciclo `for..of` non fornisce il numero dell'indice dell'elemento corrente, solo il suo valore, in molte situazioni questo è più che sufficiente. E più breve.

Tecnicamente, poiché gli array sono oggetti, è anche possibile utilizzare `for..in`:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

Non è comunque un ottima idea. Si possono verificare diversi errori:

1. Il ciclo `for..in` itera su *tutte le proprietà*, non solo su quelle numeriche.

    Ci sono anche degli oggetti chiamati "array-like" (simili ad array) nei browser e in altri ambienti, che *assomigliano ad array*. Infatti come proprietà possiedono `length` e degli indici, ma allo stesso tempo contengono proprietà e metodi di tipo non numerico, di cui solitamente non abbiamo bisogno. Il ciclo `for..in` li passerà tutti. Quindi se stiamo utilizzando degli oggetti array-like, questi "extra" potrebbero rivelarsi un problema.

2. Il ciclo `for..in` è ottimizzato per oggetti generici, non array, può risultare quindi 10-100 volte più lento. Ovviamente rimane comunque un operazione molto veloce. Può essere un problema solo in caso si verifichino ingorghi. 

Generalmente, non dovremmo utilizzare `for..in` per array.


## Una parola riguardo "length"

La prorietà `length` si aggiorna automaticamente ad ogni modifica. Volendo essere precisi non ne rappresenta la lunghezza, ma l'indirizzo più grande più uno.

Ad esempio, un singolo elemento con un indirizzo molto alto fornisce una grande lunghezza:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

Ovviamente questo non è il modo corretto di utilizzare un array. 

Un'altra cosa interessante riguardo la proprietà `length` è che è sovra scrivibile.

Se provassimo ad incrementarla manualmente, non accadrebbe nulla di interessante. Se invece la decrementiamo, l'array verrà troncato. Il processo è irreversibile, vediamo questo esempio:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // tronca a 2 elementi
alert( arr ); // [1, 2]

arr.length = 5; // ritorna alla lunghezza precedente
alert( arr[3] ); // undefined: i valori non vegono ritornati
```

Quindi il modo più semplice per ripulire un array è: `arr.length = 0;`.


## new Array() [#new-array]

C'è un ulteriore sintassi per creare un array:

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

Viene utilizzata raramente, le parentesi `[]` risultano più brevi. Anche se c'è una caratteristica interessante che va osservata.

Se utilizziamo `new Array` con un solo argomento di tipo numerico, allora verrà creato un array *vuoto, ma con lunghezza data*.

Quindi vediamo come ci si potrebbe sparare sui piedi:

```js run
let arr = new Array(2); // creerà un array di [2] ?

alert( arr[0] ); // undefined! nessun elemento.

alert( arr.length ); // length 2
```

Nel codice sopra, `new Array(number)` ha tutti gli elementi `undefined`.

Per evitare queste spiacevoli sorprese, solitamente si utilizzano le parentesi, senza doversi preoccupare di cosa stia accadendo.

## Array multi-dimensionali

Gli array possono contenere oggetti che sono a loro volta array. Possiamo quindi utilizzare questa proprietà per creare array multi-dimensionali, per memorizzare matrici:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // l'elemento centrale
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

Gli array non possiedono `Symbol.toPrimitive`, e nemmeno `valueOf`, implementano solamente la conversione `toString`, quindi `[]` diventa una stringa vuota, `[1]` diventa `"1"` e `[1,2]` diventa `"1,2"`.

Quando l'operatore di somma binaria `"+"` aggiunge qualcosa ad una stringa, converte tutto a stringa, quindi l'esempio di prima sarà equivalente a:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## Riepilogo

Gli array sono uno speciale tipo di oggetto, studiati per immagazzinare e gestire collezioni ordinate di dati.

- La dichiarazione:

    ```js
    // parentesi quadrea (usuale)
    let arr = [item1, item2...];

    // new Array (eccezionalmente raro)
    let arr = new Array(item1, item2...);
    ```

    La chiamata a `new Array(number)` crea un array con lunghezza data, ma senza elementi.

- La proprietà `length` è la lunghezza dell'array, in realtà per essere precisi, contiene l'indice dell'ultimo elemento più uno. Questo valore viene aggiornato automaticamente. 
- Se decrementiamo manualmente `length`, l'array viene troncato.

Possiamo utilizzare un array come deque con le seguenti operazioni:

- `push(...items)` aggiunge `items` in coda.
- `pop()` rimuove un elemento dalla coda e lo ritorna.
- `shift()` rimuove un elemento dalla testa e lo ritorna.
- `unshift(...items)` aggiunge un elemento in testa.

Ritorneremo sugli array e studieremo più metodi per aggiungere, rimuovere, estrarre ed ordinare elementi nel capitolo <info:array-methods>.

