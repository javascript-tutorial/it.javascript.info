
# Il tipo Symbol

<<<<<<< HEAD
Secondo le specifiche, le chiavi delle proprietà di un oggetto possono essere di tipo stringa o di tipo symbol("simbolo"). Non sono accettati numeri o valori booleani, solamente stringhe e symbol.

Finora abbiamo utilizzato solo stringhe. Ora proviamo a vedere i vantaggi forniti dal tipo symbol.
=======
By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Symbol

Il valore "Symbol" rappresenta un identificatore univoco.

Un valore di questo tipo può essere creato usando `Symbol()`:

```js
<<<<<<< HEAD
// id è un nuovo symbol
let id = Symbol();
```

Al momento della creazione, possiamo anche fornire una descrizione al symbol (chiamata nome del symbol), utile per il debugging:
=======
let id = Symbol();
```

Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
// id è un symbol con descrizione "id"
let id = Symbol("id");
```

<<<<<<< HEAD
I Symbol garantiscono di essere unici. Anche se creiamo più simboli con la stessa descrizione, saranno comunque valori differenti. La descrizione è utile solamente come etichetta, non ha effetto su nulla.
=======
Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio, qui abbiamo due simboli con la stessa descrizione -- ma non sono uguali:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Se conosci Ruby, od altri linguaggi che possiedono la keyword "symbol", fai attenzione a non confonderti. I symbol in JavaScript sono differenti.

<<<<<<< HEAD
````warn header="I symbol non si auto-convertono a stringa"
Molti valori in JavaScript supportano la conversione implicita a stinga. Ad esempio, possiamo utilizzare `alert` con quasi tutti i valori, e funzionerà ugualmente. Symbol è un tipo speciale, non verrà convertito.
=======
So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio, questo `alert` vi mostrerà un errore:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```
Questo è un "controllo del linguaggio" per prevenire pasticci, perché le stringhe e i symbol sono fondamentalmente differenti e non dovrebbero essere accidentalmente convertiti gli uni negli altri.

Se vogliamo veramente mostrare un symbol, dobbiamo convertirlo esplicitamente utilizzando `.toString()`:

<<<<<<< HEAD
=======
If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), ora funziona
*/!*
```

<<<<<<< HEAD
Oppure usare la proprietà symbol.description per mostrare solo la descrizione:
=======
Or get `symbol.description` property to show the description only:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```
````

<<<<<<< HEAD
## Proprietà "nascoste"
=======
## "Hidden" properties


Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
Poiché l'oggetto `user` appartiene a un altro codice che lo utilizza, non dovremmo aggiungervi alcun campo, non è sicuro. Ma un *symbol* non è accessibile accidentalmente, il codice di terze parti probabilmente non lo vedrà nemmeno, quindi andrà tutto bene.

Inoltre, immagina che un altro script necessiti di avere il proprio identificatore all'interno di `user`. Potrebbe essere un'altra libreria JavaScript, e gli script sarebbero completamente inconsapevoli l'uno dell'altro.
=======
As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
// l'accesso diretto al symbol funziona
alert( "Direct: " + user[id] );
=======
// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
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

<<<<<<< HEAD
In JavaScript, come possiamo vedere, questo è vero solo per i symbol globali.
=======
In JavaScript, as we can see, that's true for global symbols.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

### Symbol.keyFor

<<<<<<< HEAD
Per i symbol globali, non esiste solo `Symbol.for(key)` per accedere ad un symbol, è possibile anche la chiamata inversa: `Symbol.keyFor(sym)`, che fa l'opposto: ritorna il nome di un symbol globale.
=======
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
Detto questo, ogni symbol possiede una proprietà `description`.
=======
That said, all symbols have the `description` property.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
1. "Nascondere" le proprietà di un oggetto. Se vogliamo aggiungere una proprietà ad un oggetto che "appartiene" ad un altro script (o libreria), possiamo creare un symbol ed utilizzarlo come chiave della proprietà. Una proprietà di tipo symbol non sarà disponibile in un `for..in`, quindi non sarà mai resa visibile. Non sarà nemmeno accessibile direttamente poiché uno script diverso non potrà avere i nostri symbol. Quindi la proprietà sarà protetta dall'uso accidentale o dalla sovrascrittura.
=======
1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Possiamo quindi aggiungere "di nascosto" una proprietà in un oggetto se ne abbiamo la necessità, senza che nessun altro possa vederla, usando proprietà di tipo symbol.

2. Ci sono diversi symbol di sistema utilizzati da JavaScript che sono accessibili come `Symbol.*`. Possiamo utilizzarli per modificare alcune caratteristiche native. Ad esempio, più avanti nella guida utilizzeremo `Symbol.iterator` per [iterables](info:iterable), `Symbol.toPrimitive` per impostare la [conversione da oggetto a primitivo](info:object-toprimitive).

<<<<<<< HEAD
Tecnicamente i symbol non sono nascosti al 100%. C'è un metodo nativo in JavaScript [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) che ci consente di ottenere tutti i symbol. Esiste anche un metodo chiamato [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) che ritorna *tutte* le chiavi di un oggetto incluse quelle di tipo symbol. Quindi non sono realmente invisibili. Ma la maggior parte delle  librerie, delle funzioni native e dei costrutti non utilizzano questi metodi.
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
