
# Il tipo Symbol

Secondo le specifiche, una proprietà di un oggetto può essere sia di tipo stringa che di tipo symbol("simbolo"). Non sono quindi accettati, numeri, valori booleani, solamente stringhe e symbol.

Finora abbiamo visto solo stringhe. Ora proviamo a vedere i vantaggi forniti dal tipo symbol.

## Symbol

Il valore "Symbol" rappresenta un identificatore unico.

Un valore di questo tipo può essere creato `Symbol()`:

```js
// id è un nuovo symbol
let id = Symbol();
```

Possiamo fornire anche una descrizione al symbol (chiamata nome del symbol), utile per il debugging:

```js run
// id è un symbol con descrizione "id"
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
Se vogliamo veramente mostrare un symbol, dobbiamo utilizzare `.toString()`:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), ora funziona
*/!*
```

Questo blocco è un "controllo di linguaggio" contro gli errori accidentali, perché le stringhe e i symbol sono fondamentalmente differenti e spesso non dovrebbe essere necessario convertirli.
````

## Proprietà "nascoste"

Symbol ci consente di creare delle proprietà "nascoste" dentro un oggetto, quindi nessun'altra parte del codice potrà accedervi o modificarle.

Ad esempio, se vogliamo memorizzare un "identificativo" per l'oggetto `user`, possiamo utilizzare symbol:

```js run
let user = { name: "John" };
let id = Symbol("id");

user[id] = "ID Value";
alert( user[id] ); // possiamo accedere ai dati utilizzando il symbol come chiave
```

Qual'è il beneficio di utilizzare `Symbol("id")` piuttosto che `"id"`?

Cerchiamo di andare più in profondità per capirlo.

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

// il nostro script utilizza la proprietà "id"
user.id = "ID Value";

// ...se in seguito un altro script utilizza "id" per i suoi scopi...

user.id = "Their id value"
// boom! sovrascritto! non intendeva danneggiare il codice del collega, ma lo ha fatto!
```

### Symbol negli oggetti letterali

Se vogliamo utilizzare un symbol in un oggetto letterale, abbiamo bisogno delle parentesi quadre.

Come nell'esempio:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // non basta "id: 123"
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

<<<<<<< HEAD
Come abbiamo visto solitamente i symbol sono differenti, persino quelli con gli stessi nomi. Qualche volta voglia che i symbol con nomi uguali vengano visti come una sola entità.

Ad esempio, parti differente del codice potrebbero voler accedere al symbol `"id"`, volendo utilizzare tutte la stessa proprietà.
=======
As we've seen, usually all symbols are different, even if they have the same name. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol `"id"` meaning exactly the same property.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

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

<<<<<<< HEAD
// prende name da symbol
=======
// get name by symbol
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

La funzione `Symbol.keyFor` internamente utilizza il registro globale dei symbol per cercare la chiave del symbol. Quindi non avrà alcun effetto per symbol non globali. Se gli viene passato un symbol non globale, non sarà in grado di trovarlo e ritornerà `undefined`.

<<<<<<< HEAD
Ad esempio:

```js run
alert( Symbol.keyFor(Symbol.for("name")) ); // name, è un symbol globale

alert( Symbol.keyFor(Symbol("name2")) ); // undefined, l'argomento non è un symbol globale
=======
That said, any symbols have `description` property.

For instance:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
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

1. "Nascondere" le proprietà di un oggetto.
    Se vogliamo aggiungere una proprietà in un oggetto che "appartiene" ad un altro script (o libreria), possiamo creare un symbol ed utilizzarlo come chiave della proprietà. Una proprietà di tipo symbol non sarà disponibile in un `for..in`, quindi non sarà mai resa visibile. Non sarà nemmeno accessibile direttamente poiché uno script diverso non potrà avere i nostri symbol.

    Possiamo quindi "nascondere" una proprietà di un oggetto se ne abbiamo al necessità, senza che nessun altro possa vederlo, usando proprità di tipo symbol.

2. Ci sono diversi sistemi di symbol utilizzati da JavaScript che sono accessibili come `Symbol.*`. Possiamo utilizzarli per modificare alcune caratteristiche incorporate. Ad esempio, più avanti nella guida utilizzeremo `Symbol.iterator` per [iterables](info:iterable), `Symbol.toPrimitive` per impostare la [conversione da oggetto a primitivo](info:object-toprimitive).

<<<<<<< HEAD
Tecnicamente i symbol non sono nascosti al 100%. C'è un metodo integrato in JavaScript [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) che ci consente di ottenere tutti i symbol. Esiste anche un metodo chiamato [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) che ritorna *tutte* le chiavi di un oggetto incluse quelle di tipo symbol. Quindi non sono realmente invisibili. Molte librerie ne fanno utilizzo, come accordo comune. Chi proverà esplicitamente ad utilizzarle probabilmente è abbastanza esperto da capire ciò che sta facendo.
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. So they are not really hidden. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
