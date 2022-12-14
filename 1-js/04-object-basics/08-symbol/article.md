
# Il tipo Symbol

Secondo le specifiche, le chiavi delle proprietà di un oggetto possono essere di tipo stringa o di tipo symbol("simbolo"). Non sono accettati numeri o valori booleani, solamente stringhe e symbol.

Finora abbiamo utilizzato solo stringhe. Ora proviamo a vedere i vantaggi forniti dal tipo symbol.

## Symbol

Il valore "Symbol" rappresenta un identificatore univoco.

Un valore di questo tipo può essere creato usando `Symbol()`:

```js
// id è un nuovo symbol
let id = Symbol();
```

Al momento della creazione, possiamo anche fornire una descrizione al symbol (chiamata nome del symbol), utile per il debugging:

```js
// id è un symbol con descrizione "id"
let id = Symbol("id");
```

I Symbol garantiscono di essere unici. Anche se creiamo più simboli con la stessa descrizione, saranno comunque valori differenti. La descrizione è utile solamente come etichetta, non ha effetto su nulla.

Ad esempio, qui abbiamo due simboli con la stessa descrizione -- ma non sono uguali:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Se conosci Ruby, od altri linguaggi che possiedono la keyword "symbol", fai attenzione a non confonderti. I symbol in JavaScript sono differenti.

````warn header="I symbol non si auto-convertono a stringa"
Molti valori in JavaScript supportano la conversione implicita a stinga. Ad esempio, possiamo utilizzare `alert` con quasi tutti i valori, e funzionerà ugualmente. Symbol è un tipo speciale, non verrà convertito.

Ad esempio, questo `alert` vi mostrerà un errore:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```
Questo è un "controllo del linguaggio" per prevenire pasticci, perché le stringhe e i symbol sono fondamentalmente differenti e non dovrebbero essere accidentalmente convertiti gli uni negli altri.

Se vogliamo veramente mostrare un symbol, dobbiamo convertirlo esplicitamente utilizzando `.toString()`:

```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), ora funziona
*/!*
```

Oppure usare la proprietà symbol.description per mostrare solo la descrizione:

```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```
````

## Proprietà "nascoste"

Symbol ci consente di creare delle proprietà "nascoste" dentro un oggetto, che nessun'altra parte del codice potrà leggere o modificare.

Ad esempio, se stiamo lavorando con l'oggetto `user`, che appartiene a un codice di terze parti, e vogliamo aggiungere identificatore.

```js run
let user = { // appartiene ad un altro codice
  name: "John"
};

let id = Symbol("id");

user[id] = "ID Value";

alert( user[id] ); // possiamo accedere ai dati utilizzando il symbol come chiave
```

Qual'è il beneficio di utilizzare `Symbol("id")` piuttosto che `"id"`?

Poiché l'oggetto `user` appartiene a un altro codice che lo utilizza, non dovremmo aggiungervi alcun campo, non è sicuro. Ma un *symbol* non è accessibile accidentalmente, il codice di terze parti probabilmente non lo vedrà nemmeno, quindi andrà tutto bene.

Inoltre, immagina che un altro script necessiti di avere il proprio identificatore all'interno di `user`. Potrebbe essere un'altra libreria JavaScript, e gli script sarebbero completamente inconsapevoli l'uno dell'altro.

Quindi ogni script può creare il suo `Symbol("id")`:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Non ci saranno conflitti, poiché i simboli saranno sempre differenti, anche se hanno lo stesso nome.

Invece se proviamo ad utilizzare una stringa `"id"` piuttosto che symbol, otterremo un conflitto:

```js
let user = { name: "John" };

// il nostro script utilizza la proprietà "id"
user.id = "ID Value";

// ...se in seguito un altro script utilizza "id" per i suoi scopi...

user.id = "Their id value"
// boom! sovrascritto! non intendeva danneggiare il codice del collega, ma lo ha fatto!
```

### Symbol in un *object literal*

Se vogliamo utilizzare un symbol in un *object literal* `{...}`, abbiamo bisogno di includerlo nelle parentesi quadre.

Come nell'esempio:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // non "id: 123"
*/!*
};
```
Questo è necessario perché abbiamo bisogno del valore di `id` come chiave, e non della stringa "id".

### I symbol vengono ignorati da for..in

Le proprietà di tipo symbol non vengono considerate dal ciclo `for..in`.

Ad esempio:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (nessun symbol)
*/!*

// l'accesso diretto al symbol funziona
alert( "Direct: " + user[id] );
```

Anche [Object.keys(user)](mdn:js/Object/keys) li ignora. Questo fa parte del principio generale di occultazione delle proprietà symbol. Se uno script esterno o una libreria eseguisse un ciclo sul nostro oggetto, non avrebbe inaspettatamente accesso a una proprietà di tipo symbol.

Invece [Object.assign](mdn:js/Object/assign) esegue la copia sia delle proprietà di tipo stringa sia di quelle symbol:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Non c'è nulla di strano. E' una semplice scelta di design. L'idea è che quando vogliamo clonare o unire oggetti, solitamente abbiamo intenzione di copiarne *tutte* le proprietà (incluse quelle di tipo symbol come `id`).

## Symbol globali

Come abbiamo visto, solitamente i symbol sono differenti, anche se hanno lo stesso nome. Ma a volte vogliamo che symbol con nomi uguali vengano visti come la stessa entità. Ad esempio, parti differenti del codice potrebbero voler accedere al symbol `"id"`, riferendosi alla stessa proprietà.

Per soddisfare questa necessità, esiste un *registro globale dei symbol*. Possiamo creare dei symbol al suo interno ed accedervi successivamente, e questo garantirà che lo stesso nome ritornerà esattamente lo stesso symbol.

Per poter leggere (o creare in caso di assenza) un symbol nel registro va usata la sintassi `Symbol.for(key)`.

Questa chiamata controlla il registro globale, se trova un symbol descritto dalla `key`, lo ritorna, altrimenti crea un nuovo simbolo `Symbol(key)` e lo memorizza nel registro con la chiave `key`.

Ad esempio:

```js run
// lettura dal registro globale
let id = Symbol.for("id"); // se il symbol non esiste, allora viene creato

// lo legge nuovamente
let idAgain = Symbol.for("id");

// lo stesso symbol
alert( id === idAgain ); // true
```

I symbols dentro il registro vengono chiamati *symbol globali*. Se abbiamo bisogno di molti symbol, che siano accessibili ovunque nel codice -- questo è il modo.

```smart header="Assomigliano a Ruby"
In alcuni linguaggi di programmazione, come Ruby, c'è un solo symbol per nome.

In JavaScript, come possiamo vedere, questo è vero solo per i symbol globali.
```

### Symbol.keyFor

Per i symbol globali, non esiste solo `Symbol.for(key)` per accedere ad un symbol, è possibile anche la chiamata inversa: `Symbol.keyFor(sym)`, che fa l'opposto: ritorna il nome di un symbol globale.

Ad esempio:

```js run
// estraiamo symbol dal nome
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// estraiamo il nome dal symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

La funzione `Symbol.keyFor` internamente utilizza il registro globale dei symbol per cercare la chiave del symbol. Quindi non avrà alcun effetto per symbol non globali. Se gli viene passato un symbol non globale, non sarà in grado di trovarlo e ritornerà `undefined`.

Detto questo, ogni symbol possiede una proprietà `description`.

Ad esempio:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, symbol globale
alert( Symbol.keyFor(localSymbol) ); // undefined, non globale

alert( localSymbol.description ); // name
```

## Symbol di sistema

In JavaScript esistono diversi *symbol di sistema*, e possiamo utilizzarli per gestire vari aspetti dei nostri oggetti.

Questi sono elencati in dettaglio nella tabella [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) :

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...e molti altri.

Ad esempio, `Symbol.toPrimitive` ci consente di descrivere l'oggetto per la conversione ad un tipo primitivo. Vedremo meglio come utilizzarlo a breve.

Altri symbol diventeranno più familiari quando studieremo le corrispondenti caratteristiche del linguaggio.

## Riepilogo

`Symbol` è un tipo primitivo per definire identificatori univoci.

I symbol vengono creati con una chiamata a `Symbol()`, aggiungendo una descrizione opzionale (nome).

I symbol sono sempre differenti, anche se hanno lo stesso nome. Se abbiamo bisogno di avere symbol con lo stesso nome ed uguali tra loro, dovremmo utilizzare il registro globale: `Symbol.for(key)` ritorna un symbol globale con la `key` (se non esiste la crea). Diverse chiamate di `Symbol.for` ritorneranno sempre lo stesso symbol.

I symbol hanno due principali ambiti d'uso:

1. "Nascondere" le proprietà di un oggetto. Se vogliamo aggiungere una proprietà ad un oggetto che "appartiene" ad un altro script (o libreria), possiamo creare un symbol ed utilizzarlo come chiave della proprietà. Una proprietà di tipo symbol non sarà disponibile in un `for..in`, quindi non sarà mai resa visibile. Non sarà nemmeno accessibile direttamente poiché uno script diverso non potrà avere i nostri symbol. Quindi la proprietà sarà protetta dall'uso accidentale o dalla sovrascrittura.

Possiamo quindi aggiungere "di nascosto" una proprietà in un oggetto se ne abbiamo la necessità, senza che nessun altro possa vederla, usando proprietà di tipo symbol.

2. Ci sono diversi symbol di sistema utilizzati da JavaScript che sono accessibili come `Symbol.*`. Possiamo utilizzarli per modificare alcune caratteristiche native. Ad esempio, più avanti nella guida utilizzeremo `Symbol.iterator` per [iterables](info:iterable), `Symbol.toPrimitive` per impostare la [conversione da oggetto a primitivo](info:object-toprimitive).

Tecnicamente i symbol non sono nascosti al 100%. C'è un metodo nativo in JavaScript [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) che ci consente di ottenere tutti i symbol. Esiste anche un metodo chiamato [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) che ritorna *tutte* le chiavi di un oggetto incluse quelle di tipo symbol. Quindi non sono realmente invisibili. Ma la maggior parte delle  librerie, delle funzioni native e dei costrutti non utilizzano questi metodi.
