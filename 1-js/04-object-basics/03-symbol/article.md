
# Il tipo Symbol

Secondo le specifiche, una proprietà di un oggetto può essere sia di tipo stringa che di tipo symbol("simbolo"). Non sono quindi accettati, numeri, valori booleani, solamente stringhe e symbol.

<<<<<<< HEAD
Finora abbiamo visto solo stringhe. Ora proviamo a vedere i vantaggi forniti dal tipo symbol.
=======
Till now we've been using only strings. Now let's see the benefits that symbols can give us.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

## Symbol

<<<<<<< HEAD
Il valore "Symbol" rappresenta un identificatore unico.
=======
A "symbol" represents a unique identifier.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

Un valore di questo tipo può essere creato `Symbol()`:

```js
// id è un nuovo symbol
let id = Symbol();
```

Possiamo fornire anche una descrizione al symbol (chiamata nome del symbol), utile per il debugging:

<<<<<<< HEAD
```js run
// id è un symbol con descrizione "id"
=======
```js
// id is a symbol with the description "id"
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
let id = Symbol("id");
```

I Symbol garantiscono di essere unici. Anche se creiamo più simboli con la stessa descrizione, saranno comunque valori differenti. La descrizione è utile solamente come etichetta.

Ad esempio, qui abbiamo due simboli con la stessa descrizione -- ma non sono uguali:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Se conoscete linguaggi come Ruby che utilizzano una keyword "symbol" fate attenzione. I symbol in JavaScript sono differenti.

````warn header="I symbol non si auto-convertono a stringa"
Molti valori in JavaScript supportano la conversione implicita a stinga. Ad esempio, possiamo utilizzare `alert` con quasi tutti i valori, e funzionerà ugualmente. Symbol è un tipo speciale. Infatti non verrà convertito.

Ad esempio, questo `alert` vi mostrerà un errore:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```
<<<<<<< HEAD
Se vogliamo veramente mostrare un symbol, dobbiamo utilizzare `.toString()`:
=======

That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.

If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), now it works
*/!*
```

Or get `symbol.description` property to show the description only:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), ora funziona
*/!*
```

Questo blocco è un "controllo di linguaggio" contro gli errori accidentali, perché le stringhe e i symbol sono fondamentalmente differenti e spesso non dovrebbe essere necessario convertirli.
````

## Proprietà "nascoste"

<<<<<<< HEAD
Symbol ci consente di creare delle proprietà "nascoste" dentro un oggetto, quindi nessun'altra parte del codice potrà accedervi o modificarle.

Ad esempio, se vogliamo memorizzare un "identificativo" per l'oggetto `user`, possiamo utilizzare symbol:
=======
Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.

For instance, if we're working with `user` objects, that belong to a third-party code. We'd like to add identifiers to them.

Let's use a symbol key for it:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

<<<<<<< HEAD
user[id] = "ID Value";
alert( user[id] ); // possiamo accedere ai dati utilizzando il symbol come chiave
=======
user[id] = 1;

alert( user[id] ); // we can access the data using the symbol as the key
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
```

Qual'è il beneficio di utilizzare `Symbol("id")` piuttosto che `"id"`?

<<<<<<< HEAD
Cerchiamo di andare più in profondità per capirlo.
=======
As `user` objects belongs to another code, and that code also works with them, we shouldn't just add any fields to it. That's unsafe. But a symbol cannot be accessed accidentally, the third-party code probably won't even see it, so it's probably all right to do.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

Immaginiamo che un altro script voglia avere una sua proprietà "id" dentro `user`. Questo potrebbe essere il caso di due librerie, quindi i due script sono ignari l'uno dell'altro.

Quindi ogni script può creare il suo `Symbol("id")`:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Non ci saranno conflitti, poiché i simboli saranno sempre differenti, anche se hanno lo stesso nome.

Invece se proviamo ad utilizzare una stringa `"id"` piuttosto del symbol, *otterremo* un conflitto:

```js run
let user = { name: "John" };

<<<<<<< HEAD
// il nostro script utilizza la proprietà "id"
user.id = "ID Value";

// ...se in seguito un altro script utilizza "id" per i suoi scopi...

user.id = "Their id value"
// boom! sovrascritto! non intendeva danneggiare il codice del collega, ma lo ha fatto!
=======
// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"
// Boom! overwritten by another script!
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
```

### Symbol negli oggetti letterali

Se vogliamo utilizzare un symbol in un oggetto letterale, abbiamo bisogno delle parentesi quadre.

Come nell'esempio:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
<<<<<<< HEAD
  [id]: 123 // non basta "id: 123"
=======
  [id]: 123 // not "id: 123"
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
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
for (let key in user) alert(key); // name, age (no symbols)
*/!*

// l'accesso diretto al symbol funziona
alert( "Direct: " + user[id] );
```

Anche `Object.keys(user)` li ignora. Questo è il meccanisco di occultazione delle proprietà symbol. Se uno script esterno o una libreria tenta di eseguire istruzioni sul nostro oggetto, non avrà la possibilità di accedere ad una proprietà di tipo symbol.

Invece [Object.assign](mdn:js/Object/assign) esegue la copia sia delle proprietà di tipo stringa si di quelle symbol:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Non c'è nulla di strano. E' una semplice scelta di design. L'idea è che quando vogliamo copiare o clonare un oggetto, solitamente abbiamo intenzione di copiarne *tutte* le proprietà (incluse quelle di tipo symbol come `id`).

<<<<<<< HEAD
````smart header="Le chiavi delle proprietà vengono convertite a stringhe"
Possiamo utilizzare solamente stringhe o symbol come chiavi in un oggetto. Gli altri tipi vengono convertiti a stringa.

Ad esempio, un numero `0` diventa una stringa `"0"` quando lo utilizziamo come chiave di una proprietà:

```js run
let obj = {
  0: "test" // equivale a "0": "test"
};

// entrambi gli alert accedono alla stessa proprietà (il numero 0 è convertito a stringa "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (stessa proprietà)
```
````

## Symbol globali

Come abbiamo visto solitamente i symbol sono differenti, persino quelli con gli stessi nomi. Qualche volta voglia che i symbol con nomi uguali vengano visti come una sola entità.
=======
## Global symbols
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

Ad esempio, parti differente del codice potrebbero voler accedere al symbol `"id"`, volendo utilizzare tutte la stessa proprietà.

Per soddisfare questa necessità, esiste un *registro globale dei symbol*. Possiamo creare dei symbol al suo interno ed accedervi successivamente, e questo garantirà che lo stesso nome ritornerà esattamente lo stesso symbol.

Per poter leggere (o creare in caso di assenza) un symbol nel registro va usata la sintassi `Symbol.for(key)`.

Questa chiamata controlla il registro globale, se trova un symbol descritto dalla `key`, lo ritorna, altrimenti crea un nuovo simbolo  `Symbol(key)` e lo memorizza nel registro con la chiave `key`.

Ad esempio:

```js run
// lettura dal registro globale
let id = Symbol.for("id"); // se il symbol non esiste, allora viene creato

// lo legge nuovamente
let idAgain = Symbol.for("id");

// lo stesso symbol
alert( id === idAgain ); // true
```

I symbol dentro il registro vengono chiamati *symbol globali*. Se abbiamo bisogno di molti symbol, che siano accessibili ovunque nel codice -- questo è il modo.

```smart header="Assomigliano a Ruby"
In alcuni linguaggi di programmazione, come Ruby, c'è un solo symbol per nome.

In JavaScript, come possiamo vedere, questo è vero solo per i symbol globali.
```

### Symbol.keyFor

Per i symbol globali, non esiste solo `Symbol.for(key)` per accedere ad un symbol, è possibile anche la chiamata inversa: `Symbol.keyFor(sym)`, che fa l'opposto: ritorna il nome di un symbol globale.

Ad esempio:

```js run
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// prende name da symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

<<<<<<< HEAD
La funzione `Symbol.keyFor` internamente utilizza il registro globale dei symbol per cercare la chiave del symbol. Quindi non avrà alcun effetto per symbol non globali. Se gli viene passato un symbol non globale, non sarà in grado di trovarlo e ritornerà `undefined`.
=======
The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and returns `undefined`.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

Questo significa che ogni symbol possiede una proprietà `description`.

Ad esempio:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, non global

alert( localSymbol.description ); // name
```

## Sistemi per symbol

In JavaScript esistono diversi "sistemi" per symbol, e possiamo utilizzarli per gestire vari aspetti dei nostri oggetti.

Questi sono elencati in dettaglio nella tabella [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) :

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...e molti altri.

Ad esempio, `Symbol.toPrimitive` ci consente di descrivere l'oggetto per la conversione ad un tipo primitivo. Vedremo meglio come utilizzarlo a breve.

Altri simboli diventeranno più familiari man mano che studieremo il linguaggio.

## Riepilogo

`Symbol` è un tipo primitivo per definire identificatori unici.

I symbol vengono creati con una chiamata a `Symbol()`, aggiungendo una descrizione opzionale.

I symbol sono sempre differenti, anche se hanno lo stesso nome. Se abbiamo bisogno di avere symbol con lo stesso nome che uguali tra lo, dovremmo utilizzare il registro globale: `Symbol.for(key)` ritorna un symbol globale con la `key` (se non esiste la crea). Diverse chiamate di `Symbol.for` ritorneranno sempre lo stesso symbol.

I symbol hanno due principali ambiti d'uso:

<<<<<<< HEAD
1. "Nascondere" le proprietà di un oggetto.
    Se vogliamo aggiungere una proprietà in un oggetto che "appartiene" ad un altro script (o libreria), possiamo creare un symbol ed utilizzarlo come chiave della proprietà. Una proprietà di tipo symbol non sarà disponibile in un `for..in`, quindi non sarà mai resa visibile. Non sarà nemmeno accessibile direttamente poiché uno script diverso non potrà avere i nostri symbol.
=======
1. "Hidden" object properties.
    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

    Possiamo quindi "nascondere" una proprietà di un oggetto se ne abbiamo al necessità, senza che nessun altro possa vederlo, usando proprità di tipo symbol.

2. Ci sono diversi sistemi di symbol utilizzati da JavaScript che sono accessibili come `Symbol.*`. Possiamo utilizzarli per modificare alcune caratteristiche incorporate. Ad esempio, più avanti nella guida utilizzeremo `Symbol.iterator` per [iterables](info:iterable), `Symbol.toPrimitive` per impostare la [conversione da oggetto a primitivo](info:object-toprimitive).

Tecnicamente i symbol non sono nascosti al 100%. C'è un metodo integrato in JavaScript [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) che ci consente di ottenere tutti i symbol. Esiste anche un metodo chiamato [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) che ritorna *tutte* le chiavi di un oggetto incluse quelle di tipo symbol. Quindi non sono realmente invisibili. Molte librerie ne fanno utilizzo, come accordo comune. Chi proverà esplicitamente ad utilizzarle probabilmente è abbastanza esperto da capire ciò che sta facendo.
