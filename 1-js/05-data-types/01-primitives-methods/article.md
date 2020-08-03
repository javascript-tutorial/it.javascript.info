# Metodi dei tipi primitivi

JavaScript ci consente di trattare i tipi primitivi (stringhe, numeri, etc.) come se fossero oggetti.

Possiedono dei metodi per fare ciò. Molto presto li studieremo, prima dobbiamo vedere come funzionano, perché ovviamente i tipi primitivi non sono oggetti (cercheremo quindi di fare chiarezza).

Vediamo quali sono i punti chiave che distinguono i tipi primitivi dagli oggetti.

<<<<<<< HEAD
Un primitivo
=======
- Is a value of a primitive type.
- There are 7 primitive types: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` and `undefined`.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

- E' un valore di tipo primitivo.
- Ci sono 6 tipi primitivi: `string`, `number`, `boolean`, `symbol`, `null` e `undefined`.

Un oggetto

- E' in grado di memorizzare molti valori come proprietà.
- Può essere creato con `{}`, ad esempio: `{name: "John", age: 30}`. Ci sono altri tipi di oggetto in JavaScript; le funzioni ad esempio sono oggetti.

Uno dei migliori vantaggi degli oggetti è che possiamo memorizzarci funzioni come proprietà dello stesso.

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

In questo esempio abbiamo creato un oggetto `john` con il metodo `sayHi`.

Esistono molti oggetti integrati, come quelli per manipolare le date, errori, elementi HTML, etc. Che possiedono diverse proprietà e metodi.

Ma tutte queste caratteristiche hanno un costo!

Gli oggetti sono più "pesanti" dei tipi primitivi. Richiedono risorse extra per supportarne il pieno funzionamento. Ma poiché queste proprietà sono fondamentali, JavaScript cerca di ottimizzarne l'utilizzo della memoria.

## Un primitivo come un oggetto

Questo è il paradosso contro cui si è scontato il creatore di JavaScript:

- Ci sono molte operazioni che uno vorrebbe fare con i tipi primitivi (come una stringa o un numero). Sarebbe molto bello poterli utilizzare con dei metodi.
- I tipi primitivi devono essere veloci e il più leggeri possibile.

La soluzione sembra un po' strana:

1. Le primitive rimangono primitive. Contengono un singolo valore.
2. Il linguaggio consente di accedere alle proprietà e ai metodi di stringhe, numeri, booleani e symbol.
3. Quando questo accade, viene creato uno speciale "oggetto contenitore" che fornisce le funzionalità extra, successivamente verrà distrutto.

Gli "oggetti contenitore" sono diversi per ogni primitiva e sono chiamati: `String`, `Number`, `Boolean` e `Symbol`. Questi forniscono diversi insiemi di metodi.

<<<<<<< HEAD
Ad esempio, esiste un metodo [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) che ritorna la stringa con la prima lettera maiuscola.
=======
For instance, there exists a string method [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns a capitalized `str`.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Funziona in questo modo:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Semplice, vero?  Questo è quello che accade realmente in `str.toUpperCase()`:

1. La stringa `str` è una variabile primitiva. Quindi nel momento in cui si accede ad una sua proprietà, viene creato uno speciale oggetto che memorizza il valore della stringa, e contiene metodi utili come `toUpperCase()`.
2. Questo metodo viene eseguito e ritorna una nuova stringa (mostrata da `alert`).
3. L'oggetto speciale viene distrutto, lasciando solamente la primitiva `str`.

In questo modo le primitive possono fornire i vantaggi portati dai metodi, rimanendo allo stesso tempo molto leggere.

JavaScript cerca di ottimizzare il più possibile questo processo. In alcuni casi riesce ad evitare la creazione di oggetti inutili. Deve comunque aderire e comportarsi come definito dallo standard, quindi deve comportarsi come se ne fosse stato creato uno.

Un numero ha dei propri metodi, ad esempio [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) che arrotonda il numero alla precisioni richiesta:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

Vedremo più nello specifico altri metodi nei capitoli <info:number> e <info:string>.


````warn header="I costruttori di `String/Number/Boolean` vengono utilizzati solo internamente"
Alcuni linguaggi come Java ci consento di creare "oggetti contenitori" esplicitamente utilizzando la sintassi `new Number(1)` o `new Boolean(false)`.

In JavaScript, è altrettanto possibile per ragioni storiche, ma è altamente **sconsigliato**. Poiché molte cose potrebbero non funzionare come dovrebbero.

Ad esempio:

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

Gli oggetti valutati da un `if` sono sempre true, quindi l'alert verrà mostrato:

```js run
let zero = new Number(0);

if (zero) { // zero è true, perché è un oggetto
  alert( "zero is truthy?!?" );
}
```

In altre parole, utilizzare le stesse funzioni con `String/Number/Boolean` senza `new` è completamente sicuro. Poiché le variabili primitive verranno convertite all'oggetto corrispondente: ad una stringa, ad un numero, o ad un bool (primitive).

Ad esempio, è corretto fare:
```js
let num = Number("123"); // converte una string in number
```
````


````warn header="null/undefined non hanno metodi"
Le primitive speciali `null` e `undefined` sono delle eccezioni. Non possiedono degli speciali "oggetti contenitori", quindi non forniscono metodi. In questo senso, sono "molto primitive".

Un tentativo di accedere ad una proprietà con questi tipi di valore, lancerà un errore:

```js run
alert(null.test); // errore
````

## Riepilogo

- Le primitive, ad eccezioni di `null` e `undefined` forniscono molti metodi utili. Li studieremo nei prossimi capitoli.
- Formalmente, questi metodi lavorano su oggetti temporanei, JavaScript però è ottimizzato per sfruttare al meglio le risorse, non risultano quindi molto "costosi".
