# F.prototype

Ricordate, nuovi oggetti possono essere creati con un costruttore, come `new F()`.

Se `F.prototype` è un oggetto, l'operatore `new` si prenderà cura di impostare `[[Prototype]]` per il nuovo oggetto.

```smart
JavaScript support la prototypal inheritance fin dall'inizio. Fù una delle caratteristiche principali del linguaggio.

L'unica differenza era che nei primi tempi non di aveva accesso diretto. L'unica cosa su cui ci si poteva affidare era la proprietà `"prototype"` del costruttore, descritta in questo capitolo. Per questo, esistono ancora molti script che ne fanno utilizzo.
```

Da notare che qui `F.prototype` , sta per una comune proprietà chiamata `"prototype"` in `F`. Sembra molto simile al termine "prototype", ma in questo caso intendiamo realmente riferirci ad una proprietà con questo nome.

Vediamo qui un esempio:

```js run
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = animal;
*/!*

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

Impostare `Rabbit.prototype = animal` fa letteralmente quanto segue: "Quando un nuovo `new Rabbit` viene creato, assegna il suo `[[Prototype]]` ad `animal`".

Questo è il risultato:

![](proto-constructor-animal-rabbit.svg)

In figura, `"prototype"` è una freccia orrizzontale, ciò significa che è una comune proprietà, mentre `[[Prototype]]` è verticale, quindi `rabbit` eredita da `animal`.

```smart header="`F.prototype` viene utilizzato solamente al momento in cui si invoca `new F`"
`F.prototype` viene utilizzata solamente quando si invoca `new F`, e si occupa di assegnare `[[Prototype]]` del nuovo oggetto.

Se, dopo la creazione, `F.prototype` cambia (`F.prototype = <another object>`), allora verrà creato un nuovo oggetto con `new F` che avrà un altro oggetto come `[[Prototype]]`, ma gli oggetti già esistenti faranno riferimento a quello vecchio.
```

## Default F.prototype, la proprietà constructor

Ogni funzione possiede la proprietà `"prototype"` anche se non gliela forniamo direttamente.

Il `"prototype"` di default è un oggetto con un'unica proprietà, il `constructor` che punta alla funzione stessa.

Vediamo un esempio:

```js
function Rabbit() {}

/* default prototype
Rabbit.prototype = { constructor: Rabbit };
*/
```

![](function-prototype-constructor.svg)

Possiamo verificarlo:

```js run
function Rabbit() {}
// di default:
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

Naturalmente, se non facciamo nulla, il `constructor` sarà disponibile a tutti i `rabbit` attraverso `[[Prototype]]`:

```js run
function Rabbit() {}
// di default:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // eredita da {constructor: Rabbit}

alert(rabbit.constructor == Rabbit); // true (dal prototype)
```

![](rabbit-prototype-constructor.svg)

Possiamo utilizzare il `constructor` per creare un nuovo oggetto utilizzando lo stesso costruttore dell'oggetto già esistente.

Come nell'esempio:

```js run
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

*!*
let rabbit2 = new rabbit.constructor("Black Rabbit");
*/!*
```

Questo torna molto utile quando abbiamo un oggetto, ma non sappiamo quale costruttore è stato utilizzato (ad esempio se arriva da una libreria di terze parti), e abbiamo bisogno di crearne un altro dello stesso tipo.

Ma probabilmente la cosa più importante del `"constructor"` è che...

**...JavaScript stesso non garantisce il giusto valore del `"constructor"`.**

Esatto, esiste di default nel `"prototype"` delle funzioni, ma questo è tutto. Ciò che accade dopo -- è  nostra responsabilità.

In particolare, se rimpiazziamo completamente il prototype di default, allora non ci sarà alcun `"constructor"`.

Ad esempio:

```js run
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
*!*
alert(rabbit.constructor === Rabbit); // false
*/!*
```

Quindi, per mantenere il `"constructor"` corretto, possiamo decidere di aggiungere/rimuovere proprietà al `"prototype"` di default, invece che sovrascriverlo completamente:

```js
function Rabbit() {}

// Non sovrascriviamo Rabbit.prototype completamente
// aggiungiamo semplicemente una proprietà
Rabbit.prototype.jumps = true
// il Rabbit.prototype.constructor viene cosi preservato
```

O, in alternativa, possiamo ricreare il `constructor` manualmente:

```js
Rabbit.prototype = {
  jumps: true,
*!*
  constructor: Rabbit
*/!*
};

// ora il costruttore è corretto, perché lo abbiamo aggiunto noi
```


## Riepilogo

In questo capitolo abbiamo descritto brevemente il modo in cui impostare il `[[Prototype]]` per gli oggetti generati tramite il costruttore. Più avantai vedremo dei pattern più avanzati su cui fare affidamento.

E' tutto abbastanza semplice, alcune note per rendere tutto più chiaro:

- La proprietà `F.prototype` (da non confondere con `[[Prototype]]`) imposta `[[Prototype]]` dei nuovi oggetti quando viene invocato `new F()`.
- Il valore di `F.prototype` può essere sia un oggetto che `null`: altri valori verranno ignorati.
- La proprietà `"prototype"` ha un effetto speciale quando impostata in un costruttore, ed invocata con `new`.

Negli oggetti "comuni" la proprietà `prototype` non ha alcun significato speciale:
```js
let user = {
  name: "John",
  prototype: "Bla-bla" // nessuna magia
};
```

Di default tutte le funzioni hanno `F.prototype = { constructor: F }`, quindi possiamo ottenere il costruttore di un oggetto accedendo alla sua proprietà `"constructor"`.
