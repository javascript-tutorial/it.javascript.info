# Parametri resto e operatore di espansione

Molte funzioni integrate in JavaScript supportano un numero arbitrario di argomenti.

Ad esempio:

- `Math.max(arg1, arg2, ..., argN)` -- ritorna il maggiore degli argomenti.
- `Object.assign(dest, src1, ..., srcN)` -- copia le proprietà da `src1..N` in `dest`.
- ...e molto altro.

In questo capitolo impareremo come farlo. Ma soprattutto, impareremo come utilizzare al meglio questo tipo di funzioni.

## Parametri resto `...`

Una funzione può essere invocata con un qualsiasi numero di argomenti, non ha importanza come sono definiti.

Come qui:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

<<<<<<< HEAD
In questo caso non ci saranno errori dovuti "all'eccesso" di argomenti. Ma ovviamente il risultato terrò conto solamente dei primi due.
=======
There will be no error because of "excessive" arguments. But of course in the result only the first two will be counted, so the result in the code above is `3`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

I parametri restanti possono essere menzionati nella definizione di una funzione con i tre punti `...`. Che significano letteralmente "raccogli gli altri parametri in un array".

Ad esempio, per raccogliere tutti gli argomenti in un array `args`:

```js run
function sumAll(...args) { // args is the name for the array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Possiamo anche decidere di prendere i primi parametri e memorizzarli in variabili, e i parametri avanzati metterli in un array.

In questo caso i primi due argomenti vengono memorizzati in variabili i restanti finiscono nell'array `titles`:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // the rest go into titles array
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="I parametri resto devono apparire alla fine"
I parametri resto raccolgono tutti gli argomenti che avanzano, quindi non avrebbe senso fare:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

L'array `...rest` deve sempre apparire come ultimo.
````

## La variabile "arguments"

Esiste anche un oggetto simil-array denominato `arguments` che contiene tutti gli argomenti per indice.

Ad esempio:

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // it's iterable
  // for(let arg of arguments) alert(arg);
}

// shows: 2, Julius, Caesar
showName("Julius", "Caesar");

// shows: 1, Ilya, undefined (no second argument)
showName("Ilya");
```

Agli inizi, i parametri resto non esistevano nel linguaggio, e si utilizzava `arguments` per ottenere tutti gli argomenti di una funzione.

Questa funzionalità ovviamente è ancora presente, possiamo quindi utilizzarla.

Il lato negativo è che `arguments` è un oggetto simil-array iterabile, non è un array puro. Non supporta quindi i metodi dedicati agli array, come ad esempio `arguments.map(...)`.

Inoltre, questo conterrà sempre tutti gli elementi. Non possiamo raccoglierli parzialmente, come abbiamo fatto con i parametri resto.

Quindi, in queste sitauzioni, si preferisce utilizzare i parametri resto.

````smart header="Le funzioni freccia non possiedono `\"argomenti\"`"
Se provassimo ad accedere all'oggetto `arguments` all'interno di una funzione freccia, questo preleverebbe le variabili dal contesto esterno.

Un esempio:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

In sostanza, le funzioni freccia non hanno un proprio `this`. Ora sappiamo anche che non possiedono nemmeno l'oggetto `arguments`.

## Operatore di espansione [#spread-operator]

Abbiamo appena visto come ottenere un array da una lista di parametri.

In certe situazioni abbiamo bisogno di fare esattamente il contrario.

Ad esempio, esempio esiste una funzione integrata [Math.max](mdn:js/Math/max) che ritorna il numero maggiore di una lista:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Ora ipotizziamo di avere un array `[3, 5, 1]`. Come invochiamo `Math.max` su un array?

Il semplice passaggio "cosi com'è" non funzionerebbe, perché `Math.max` si aspetta di ricevere una lista di argomenti numerici, non un singolo array:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

E ovviamente non possiamo nemmeno elencare manualmente tutti gli elementi in questo modo: `Math.max(arr[0], arr[1], arr[2])`, poiché il numero di elementi contenuti nell'array potrebbe non essere noto. In ogni caso non sarebbe nemmeno elegante.

L'*operatore di espansione* ci aiuta in questo! La sintassi è simile a quella dei parametri resto, utilizza `...`, ma fa esattamente l'opposto.

Quando si utilizza `...arr` in una chiamata a funzione, l'array `arr` verrà "espanso" in una lista di argomenti.

Nel caso `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)
```

Possiamo anche fornire più oggetti iterabili in questo modo:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

Possiamo anche combinare l'operatore di espansione con valori "normali":


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

Inoltre, l'operatore di spread può essere utilizzato anche per fondere array:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
```

Negli esempi sopra abbiamo utilizzato un array per dimostrare l'operatore di espansione, ma funziona correttamente con qualsiasi oggetto iterabile.

Ad esempio, in questo esempio utilizziamo l'operatore di espansione per convertire la stringa in un array di caratteri:

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

L'operatore di spread internamente sfrutta gli iteratori per ottenere  gli elementi, proprio come `for..of`.

Quindi, per una stringa, `for..of` ritorna dei caratteri e `...str` diventa `"H","e","l","l","o"`. La lista di caratteri viene passata per inizializzare un array `[...str]`.

Per quest'attività in particolare potremmo anche utilizzare `Array.from`, poiché converte un oggetto iterabile (come una stringa) in un array:

```js run
let str = "Hello";

// Array.from converts an iterable into an array
alert( Array.from(str) ); // H,e,l,l,o
```

Il risultato è lo stesso ottenuto con `[...str]`.

C'è però una sottile differenza tra `Array.from(obj)` e `[...obj]`:

- `Array.from` funziona sia con array che con oggetti iterabili.
- L'operatore di espansione opera solamente su oggetti iterabili.

Quindi, per convertire qualcosa in array, la scelta migliore è `Array.from`.


## Copiare un array/oggetto

Ricordate quando abbiamo parlato del metodo [`Object.assign()`](info:object-copy#cloning-and-merging-object-assign)?

E' possibile fare la stessa cosa con l'operatore di espansione (spread).

```js run
let arr = [1, 2, 3];
*!*
let arrCopy = [...arr]; // espande l'array in una lista di parametri
                        // successivamente inserisce il risultato in un nuovo array
*/!*

// l'array ha gli stessi contenuti?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// gli array sono uguali?
alert(arr === arrCopy); // false (non contengono lo stesso riferimento)

// la modifica dell'array iniziale non modifica la copia:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Da notare che è possibile fare la stessa cosa per copiare un oggetto:

```js run
let obj = { a: 1, b: 2, c: 3 };
*!*
let objCopy = { ...obj }; // espande l'oggetto in una lista di parametri
                          // successivamente inserisce il risultato in un oggetto
*/!*

// l'oggetto ha gli stessi contenuti?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// gli oggetti sono uguali?
alert(obj === objCopy); // false (non contengono lo stesso riferimento)

// modificando l'oggetto iniziale non viene modificata la copia:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

Questa modalità di copia di un oggetto è molto più rapida rispetto a `let objCopy = Object.assign({}, obj);` o per un array `let arrCopy = Object.assign([], arr);` per questo preferiamo utilizzarla quando possibile.


## Riepilogo

Quando nel codice incontriamo: `"..."`, potrebbe essere sia i l'operatore di resto dei parametri che l'operatore di espansione.

Un modo semplice per distinguere i due casi:

- Quando `...` si trova alla fine della lista dei parametri della funzione, allora è l'operatore "resto dei parametri", il quale raccoglie tutti i parametri forniti (sotto forma di array) alla funzione che non trovano spazio nelle variabili.
- Quando `...` si trova in una chiamata a funzione o situazioni simili, viene chiamato "operatore operatore di espansione", che espande un array in una lista.

Casi d'uso:

- L'operatore parametri di resto viene utilizzato per creare una funzione che accetta un qualsiasi numero di argomenti.
- L'operatore di espansione viene utilizzato per passare un array ad una funzione che richiede una lista di argomenti.

Insieme questi due operatori consentono di lavorare facilmente con le funzioni e i parametri passati.

Tutti gli argomenti di una funzione sono accessibili anche con il metodo "vecchio stile" `arguments`: un oggetto simil-array.
