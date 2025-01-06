# Native prototypes

La proprietà `"prototype"` viene largamente utilizzata da JavaScript stesso. Tutti i costruttori integrati ne fanno uso.

<<<<<<< HEAD
Come prima cosa andremo ad analizzare questa proprietà nel dettaglio; in un secondo momento vedremo come utilizzarla per aggiungere nuove funzionalità agli oggetti integrati.
=======
First we'll look at the details, and then how to use it for adding new capabilities to built-in objects.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Object.prototype

Ipotizziamo di dover mostrare un oggetto vuoto:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

Da dove arriva il codice che genera la stringa `"[object Object]"`? E' il metodo integrato `toString`, ma dove lo possiamo trovare? L'oggetto `obj` è vuoto!

...La notazione `obj = {}` equivale a `obj = new Object()`, dove `Object` è un costruttore integrato, in cui la proprietà `prototype` fa riferimento ad un oggetto con `toString` e altri metodi.

Questo è ciò che accade:

![](object-prototype.svg)

Quando viene invocato `new Object()` (o viene creato un literal object `{...}`), il suo `[[Prototype]]` viene impostato a `Object.prototype`, come abbiamo studiato nel capitolo precedente:

![](object-prototype-1.svg)

Quindi, quando `obj.toString()` viene invocato, il metodo viene cercato in `Object.prototype`.

Possiamo verificarlo in questo modo:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

Da notare che non esistono ulteriori `[[Prototype]]` nella catena `Object.prototype`:

```js run
alert(Object.prototype.__proto__); // null
```

## Altri prototypes integrati

Altri oggetti integrati, come `Array`, `Date`, `Function` ed altri, hanno i propri metodi in prototypes.

Ad esempio, quando creiamo un array `[1, 2, 3]`, il costruttore di default `new Array()` viene invocato internamente. Quindi `Array.prototype` ne diventa il prototipo e fonisce i suoi metodi. Questo comportamento rende l'utilizzo della memoria molto efficiente.

Come definito nella specifica, tutti i prototype integrati hanno `Object.prototype` in cima. Questo è il motivo per cui alcune persone dicono che "tutto deriva dagli oggetti".

Qui vediamo il quadro complessivo (di 3 oggetti integrati):

![](native-prototypes-classes.svg)

Proviamo a controllare il prototype manualmente:

```js run
let arr = [1, 2, 3];

// eredita da Array.prototype?
alert( arr.__proto__ === Array.prototype ); // true

// e successivamente da Object.prototype?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// e infine null
alert( arr.__proto__.__proto__.__proto__ ); // null
```

Alcuni metodi in prototype potrebbero essere stati sovrascritti, ad esempio, `Array.prototype` possiede una sua implementazione personalizzata di `toString`, che elenca gli elementi separandoli con una virgola:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <-- il risultato di Array.prototype.toString
```

Come abbiamo visto in precedenza, `Object.prototype` possiede una sua implementazione di `toString`, ma poiché `Array.prototype` è molto più vicina nella catena dei prototype, questa sarà la variante utilizzata.


![](native-prototypes-array-tostring.svg)


Strumenti integrati nel browser, come la console che puoi trovare nei Chrome developer tools (strumenti per sviluppatori), mostrano l'ereditarietà (potreste utilizzare `console.dir` per gli oggetti integrati):

![](console_dir_array.png)

Gli altri ogetti integrati funzionano allo stesso modo. Anche le funzioni -- poiché sono oggetti di un costruttore integrato `Function`, e i suoi metodi (`call`/`apply` e gli altri) sono presi da `Function.prototype`. Anche le funzioni possiedono una loro implementazione di `toString`.

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, eredità da objects
```

## Primitivi

La situazione è molto più complessa con strings, numbers e booleans.

Come abbiamo già visto, questi non sono oggetti. Ma se proviamo ad accedere alle loro proprietà, viene creato un oggetto temporaneo utilizzando i rispettivi costruttori `String`, `Number` e `Boolean`. Essi forniscono metodi e poi spariscono.

Questi oggetti vengono creati di "nascosto" e in realtà molti motori ottimizzano il loro utilizzo, ma la specifica li descrive in questo modo. I metodi di questi oggetti sono memorizzati nella proprietà del loro prototype, e sono disponibili tramite `String.prototype`, `Number.prototype` e `Boolean.prototype`.

```warn header="I valori `null` e `undefined` non possiedono degli oggetti che li contengono"
I valori speciali `null` e `undefined` si comportano diversamente. Non possiedono degli oggetti contenitori, quindi non avremmo a disposizione proprietà e metodi. E non avremmo nemmeno il propotype corrispondente.
```

## Modificare i native prototypes [#native-prototype-change]

I Native prototypes possono essere modificati. Ad esempio, se aggiungiamo il metodo `String.prototype`, questo diventa disponibile a tutte le string:

```js run
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

Durante lo sviluppo, potremmo avere bisogno di nuovi metodi integrati che ci piacerebbe avere, e potremmo quindi essere tentati di aggiungerli ai native prototype. Generalmente questa è una pessima idea.

```warn
I prototype sono globali, quindi è molto facile generare conflitti. Se due librerie differenti aggiungono un metodo `String.prototype.show`, allora uno dei due sovrascriverà l'altro.

Quindi, generalmente, modificare i native prototype viene considerata una cattiva pratica.
```

**Nella programmazione moderna, esiste solamente un caso in cui è accettabile sovrascrivere i native prototype. Per fare polyfilling.**

Polyfilling è una pratica che prevede di sostituire un oggetto definito nella specifica JavaScript, che non è ancora stato implementato da un particolare engine.

Possiamo implementarlo noi manualmente e popolare i prototype integrati con la nostra implementazione.

Ad esempio:

```js run
if (!String.prototype.repeat) { // se questo metodo non esiste
  // lo aggiungiamo al prototype

  String.prototype.repeat = function(n) {
    // ripetiamo la stringa n volte

    // in realtà, il codice dovrebbe essere leggermente più complesso di cosi
    // (l'algoritmo completo è descritto nella specifica)
    // ma generalemente anche un polyfill imperfetto è considerato sufficiente
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa
```


## Prendere in prestito dai prototypes

Nel capitolo <info:call-apply-decorators#method-borrowing> abbiamo parlato di come "prendere in prestito" metodi.

Questo avviene quando prendiamo un metodo da un oggetto e lo copiamo in un altro.

Alcuni metodi dei native prototype sono presi in prestito.

Ad esempio, se stiamo costruendo un oggetto simil-array, potremmo voler copiare alcuni metodi degli `Array`.

Esempio.

```js run
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

*!*
obj.join = Array.prototype.join;
*/!*

alert( obj.join(',') ); // Hello,world!
```

Funziona perché l'algoritmo integrato del metodo `join` necessita solamente degli indici corretti e della proprietà `length`. Non va a verificare se un oggetto sia effettivamente un array. Molti metodi integrati si comportano in questo modo.

Un'altra possibilità è quella di ereditare di default `obj.__proto__` da `Array.prototype`, quindi tutti i metodi di `Array` diventeranno automaticamente disponibili in `obj`.

Ma questo è impossibile se `obj` eredita già da un altro oggetto. Ricorda, possiamo ereditare solamente da un oggetto per volta.

La pratica di "prendere in prestito" i metodi è flessibile, consente di ereditare funzionalità da oggetti differenti se necessario.

## Riepilogo

- Tutti gli oggetti integrati seguono lo stesso comportamento:
    - I metodi vengono memorizzati nel prototype (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
    - L'oggetto memorizza solamente i dati (gli elementdi dell'array, le proprietà dell'object, la data)
- I tipi di dato primitivi memorizzano i metodi nel prototype, utilizzando degli oggetti "contenitori": `Number.prototype`, `String.prototype` e `Boolean.prototype`. Fanno eccezione `undefined` e `null` che non possiedono alcun oggetto contenitore.
- I prototype integrati possono essere modificati o popolati con nuovi metodi. Ma questa è una pratica sconsigliata. L'unico caso in cui è accettabile aggiungere nuovi metodi è per fornire l'implementazione di funzionalità definite nella specifica JavaScript agli engines che ancora non le supportano.
