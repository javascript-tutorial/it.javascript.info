
# Oggetti

<<<<<<< HEAD
Come abbiamo appreso nel capitolo <info:types>, ci sono sette tipi di dato in JavaScript. Sei di questi vengono chiamati "primitivi", poiché i loro valori possono essere di un solo tipo (che può essere una stringa, un numero, etc...).
=======
As we know from the chapter <info:types>, there are eight data types in JavaScript. Seven of them are called "primitive", because their values contain only a single thing (be it a string or a number or whatever).
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

In maniera differente, gli oggetti vengono utilizzati per raccogliere vari tipi di dati ed entità più complesse. In JavaScript, gli oggetti coprono quasi ogni aspetto del linguaggio. Quindi dobbiamo capirli bene prima di procedere.

Un oggetto può essere creato con le parentesi `{…}` con una lista opzionale di *proprietà*. Una proprietà è una coppia "chiave: valore", dove la `key` è una stringa (chiamata anche "nome della proprietà"), il `value` può contenere qualsiasi cosa.


Possiamo immaginare un oggetto come un archivio con dei documenti firmati. Ogni dato viene scritto nel documento utilizzandone la chiave (il nome). E' facile trovare un file conoscendone il nome oppure aggiungere di nuovi/rimuovere quelli vecchi.

![](object.svg)

Un oggetto vuoto ("archivio vuoto") può essere creato utilizzando una delle due sintassi:

```js
let user = new Object(); // sintassi "costruttore oggetto"
let user = {};  // sintassi "oggetto letterale"
```

![](object-user-empty.svg)

Solitamente vengono utilizzate le `{...}`. La dichiarazione viene chiamata *object literal* ("oggetto letterale").

## Le proprietà dei literal

Possiamo inserire subito delle proprietà in `{...}` come una coppia "key: value":

```js
let user = {     // un oggetto
  name: "John",  // una chiave "name" memorizza il valore "John"
  age: 30        // una chiave "age" memorizza 30
};
```

Una proprietà ha una chiave (conosciuta anche come "nome" o "identificatore") prima dei due punti `":"` ed un valore alla destra.

Nell'oggetto `user`, ci sono due proprietà:

1. La prima proprietà ha come nome `"name"` e valore `"John"`.
2. La seconda come nome ha `"age"` e valore `30`.

L'oggetto risultate `user` può essere visto come un archivio con due file etichettati con "name" ed "age".

![user object](object-user.svg)

Noi possiamo aggiungere, rimuovere e leggere file in qualsiasi momento.

I valori delle proprietà sono accessibili utilizzando la notazione puntata:

```js
// ottiene i campi dell'oggetto:
alert( user.name ); // John
alert( user.age ); // 30
```

Il valore può essere di qualsiasi tipo. Aggiungiamo un booleano:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

Per rimuovere una proprietà, possiamo utilizzare l'operatore `delete`:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Possiamo anche utilizzare nomi di proprietà composti da più parole ("multi-parola"), ma devono essere compresi tra apici:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // nome di proprietà composta da più parole deve essere racchiusa tra virgolette
};
```

![](object-user-props.svg)

L'ultima proprietà in lista può terminare con una virgola:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
Questa viene chiamata virgola di "trailing" ("trascinamento") o "hanging" ("sospensione"). Rende più facile l'aggiunzione/rimozione/spostamento delle proprietà, poiché tutte le righe risultano essere uguali.

<<<<<<< HEAD
## Parentesi quadre
=======
````smart header="Object with const can be changed"
Please note: an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but no. The `const` fixes the value of `user`, but not its contents.

The `const` would give an error only if we try to set `user=...` as a whole.

There's another way to make constant object properties, we'll cover it later in the chapter <info:property-descriptors>.
````

## Square brackets
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

Per le proprietà con nomi "multi-parola", l'accesso con notazione puntata non funziona:

```js run
// questo darebbe un errore di sintassi
user.likes birds = true
```
Questo perché il punto richiede che la chiave sia un identificatore valido. Un identificatore non deve avere spazi (oltre a seguire le altre limitazioni già studiate).

<<<<<<< HEAD
Esiste una "notazione con parentesi quadre", per aggirare questo vincolo:
=======
JavaScript doesn't understand that. It thinks that we address `user.likes`, and then gives a syntax error when comes across unexpected `birds`.

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn't start with a digit and doesn't include special characters (`$` and `_` are allowed).

There's an alternative "square bracket notation" that works with any string:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```

Ora tutto funziona. Da notare che la stringa all'interno delle parentesi va comunque messa tra apici (qualsiasi tipo di apici).

Le parentesi quadre forniscono anche un modo per fornire il nome della proprietà come risultato di un espressione -- a differenza delle stringhe letterali -- ad esempio una variabile:

```js
let key = "likes birds";

// lo stesso di user["likes birds"] = true;
user[key] = true;
```

Qui la variabile `key` può essere calcolata a run-time o dipendere dall'input dell'utente. Successivamente possiamo utilizzarla per accedere alla proprietà. Questa caratteristica ci fornisce una grande flessibilità. La notazione puntata non può essere utilizzata in questo modo.

Ad esempio:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// accesso tramite variabile
alert( user[key] ); // John (se si inserisce "name")
```

The dot notation cannot be used in a similar way:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Proprietà calcolate

<<<<<<< HEAD
In un oggetto letterale possiamo utilizzare le parentesi quadre. Questo viene chiamato *calcolo delle proprietà*.
=======
We can use square brackets in an object literal, when creating an object. That's called *computed properties*.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

Ad esempio:

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
*!*
  [fruit]: 5, // il nome della proprietà viene preso dalla variabile fruit
*/!*
};

alert( bag.apple ); // 5 se fruit="apple"
```

Il significato delle proprietà calcolate è semplice: `[fruit]` significa che il nome della proprietà deve essere preso da `fruit`.

Quindi se un utente inserisce `"apple"`, `bag` diventerà `{apple: 5}`.

Essenzialmente, questo funziona allo stesso modo:
```js run
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// prende il nome della proprietà dalla variabile fruit
bag[fruit] = 5;
```

...Ma è meno carino.

Possiamo utilizzare anche espressioni più complesse all'interno delle parentesi quadre:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Le parentesi quadre sono molto più potenti della notazione puntata. Ci permettono di assegnare qualsiasi nome. Ma sono più ingombranti da scrivere.

Quindi la maggior parte delle volte, quando il nome della proprietà è conosciuto, la notazione puntata viene preferita. Se invece necessitiamo di qualcosa di più complesso, possiamo utilizzare le parentesi quadre.

<<<<<<< HEAD


````smart header="Le parole riservate sono consentite come nomi di proprietà"
Una variabile non può avere un nome uguale ad una parola riservata dal linguaggio come "for", "let", "return" etc.

Ma per una proprietà di un oggetto, non ci sono restrizioni. Qualsiasi nome va bene:

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```
Praticamente ogni nome è consentito, ma c'è n'è uno speciale: `"__proto__"` questo per varie ragioni storiche, gli viene fornito un trattamento speciale. Ad esempio non possiamo settarlo ad un valore diverso da un oggetto:

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object], non funzionerebbe
```

Come possiamo veder dal codice, l'assegnazione alla primitiva `5` viene ignorata.

Questa può diventare una situazione vulnerabile se abbiamo intenzione di memorizzare una coppia chiave-valore in un oggetto, consentendo al visitatore di specificare al chiave.

In questo caso il visitatore potrebbe scegliere "__proto__" come chiave, e l'assegnazione verrebbe rovinata (come abbiamo visto sopra).

C'è un modo per trattare `__proto__` come una prorietà, lo vederemo più avanti, prima abbiamo bisogno di conoscere meglio gli oggetti.
C'è un ulteriore struttura dati [Map](info:map-set), che apprenderemo nel capitolo <info:map-set>, che supporta chiavi arbitrarie.
````


## Abbreviazione per il valore di una proprietà
=======
## Property value shorthand
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

Nella pratica spesso usiamo delle variabili esistenti come valori per i nomi delle proprietà.

Ad esempio:

```js run
function makeUser(name, age) {
  return {
    name: name,
<<<<<<< HEAD
    age: age
    // ...altre proprietà
=======
    age: age,
    // ...other properties
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

Nell'esempio sopra, le proprietà hanno lo stesso nome delle varibili. Il caso d'uso di creare una proprietà da una varibilie è molto comune, tanto che esiste una speciale *abbreviazione* per comodità.

Invece che scrivere `name:name` possiamo semplicemente scrivere `name`, come in questo esempio:

```js
function makeUser(name, age) {
*!*
  return {
<<<<<<< HEAD
    name, // equivalente a name: name
    age   // equivalente a age: age
=======
    name, // same as name: name
    age,  // same as age: age
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
    // ...
  };
*/!*
}
```
Nello stesso oggetto possiamo usare entrambe ler proprietà:

```js
let user = {
  name,  // equivalente a name:name
  age: 30
};
```

<<<<<<< HEAD
## Controllo di esistenza

Un importante caratteristica degli oggetti è che è possibile accedere qualsiasi proprietà. Non ci sarà alcun errore se la proprietà non esiste! L'accesso ad una variabile non esistente ritornerà `undefined`. Questa caratteristica fornisce un metodo comodo per verificare se una proprietà esiste -- prelevandola e confrontandola con undefined:
=======

## Property names limitations

As we already know, a variable cannot have a name equal to one of language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restriction:

```js run
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

There's a minor gotcha with a special property named `__proto__`. We can't set it to a non-object value:

```js run
let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
```

As we see from the code, the assignment to a primitive `5` is ignored.

We'll cover the special nature of `__proto__` in [subsequent chapters](info:prototype-inheritance), and suggest the [ways to fix](info:prototype-methods) such behavior.

## Property existence test, "in" operator

A notable feature of objects in JavaScript, compared to many other languages, is that it's possible to access any property. There will be no error if the property doesn't exist!

Reading a non-existing property just returns `undefined`. So we can easily test whether the property exists:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true significa "no such property"
```

<<<<<<< HEAD
Esiste anche uno speciale operatore `"in"` per controllare l'esistenza di una proprietà.
=======
There's also a special operator `"in"` for that.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

La sintassi è:
```js
"key" in object
```

Ad esempio:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, significa che user.age esiste
alert( "blabla" in user ); // false, significa che user.blabla non esiste
```

Da notare che alla sinistra di  `in` deve esserci il *nome di una proprietà*. Questa solitamente è una stringa tra apici.

<<<<<<< HEAD
Se omettiamo gli apici, allora verrà cercata una variabile con quel nome e verrà utilizzato il suo contenuto come test. Ad esempio:
=======
If we omit quotes, that means a variable, it should contain the actual name to be tested. For instance:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run
let user = { age: 30 };

let key = "age";
<<<<<<< HEAD
alert( *!*key*/!* in user ); // true, prende il nome da key e controlla l'esistenza della proprietà
```

````smart header="Utilizzare \"in\" con le proprietà che contengono `undefined`"
Solitamente, il confronto stretto con `"=== undefined"` funziona correttamente. Ma c'è un particolare caso in cui questo fallisce, ma `"in"` funziona correttamente.
=======
alert( *!*key*/!* in user ); // true, property "age" exists
```

Why does the `in` operator exist? Isn't it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there's a special case when it fails, but `"in"` works correctly.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

Questo accade quando una proprietà esiste, ma contiene `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // è undefined, quindi -- non esiste la proprietà?

alert( "test" in obj ); // true, la proprietà esiste!
```

<<<<<<< HEAD

Nel codice sopra, la proprietà `obj.test` tecnicamente esiste. Quindi l'operatore `in` funziona.

Situazioni come questa accadono raramente, perché solitamente non si assegna `undefined`. Si usa più comunemente `null` per valori "sconosciuti" o "vuoti". Quindi l'operatore `in` è più un ospite esoterico nel codice.
````
=======
In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` should not be explicitly assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.

>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8


## Il ciclo "for..in" 

Per attraversare tutte le chiavi di un oggetto, esiste una speciale forma di ciclo: `for..in`. Questo è completamente diverso da `for(;;)`.

La sintassi:

```js
for (key in object) {
  // esegue il corpo del ciclo per ogni proprietà dell'oggetto
}
```

Ad esempio, proviamo a stampare tutte le proprietà di `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // valori delle keys
  alert( user[key] ); // John, 30, true
}
```

Da notare che tutti i costrutti "for" ci consentono di dichiarare delle variabili di ciclo da utilizzare all'interno del ciclo stesso, come `let key` in questo esempio.

Inoltre possiamo utilizzare qualsiasi altr variabile al posto di `key`. Ad esempio `"for(let prop in obj)"` è molto utilizzato.

<<<<<<< HEAD

### Ordine degli oggetti
=======
### Ordered like an object
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

Gli oggetti sono ordinati? In altre parole, se cicliamo un oggetto, otterremo le sue proprietà nello stesso ordine in cui le abbiamo aggiunte? 

Una risposta breve è: "sono ordinati in modo speciale": le proprietà di tipo intero vengono ordinate, le altre appaiono seguendo l'ordine di creazione. Seguiranno maggiori dettagli.

Per fare un esempio, consideriamo un oggetto con dei prefissi telefonici:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

L'oggetto può essere utilizzato per suggerire una lista di opzioni all'utente. Se stiamo sviluppato un sito dedicato al pubblico Tedesco propbabilmente vorrano vedersi apparire come primo valore `49`.

Se proviamo ad eseguire il codice, vedremo un risultato totalmente inaspettato:

- USA (1) viene per primo
- po Switzerland (41) e a seguire gli altri.

I prefissi telefonici seguono un ordine crescente, questo accade perché sono interi. Quindi vedremo `1, 41, 44, 49`.

````smart header="Proprietà degli interi? Cos'è?"
La "proprietà degli interi" è un termine che indica una stringa che può essere convertita da e ad un intero senza subire modifiche.

Quindi "49" segue la proprietà degli interi, perché quando viene trasformato in un numero intero e riportato a stringa, rimane uguale. Ad esempio "+49" e "1.2" non lo sono:

```js run
// Math.trunc è una proprietà integrata che rimuove la parte decimale
alert( String(Math.trunc(Number("49"))) ); // "49", rimane uguale
alert( String(Math.trunc(Number("+49"))) ); // "49", è diverso da "+49" ⇒ non è un intero
alert( String(Math.trunc(Number("1.2"))) ); // "1", è diverso da "1.2" ⇒ non è un intero
```
````

...Differentemente, se le chiavi non sono di tipo intero, vengono restituite nell'ordine di creazione, ad esempio:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // aggiungiamone un'altra

*!*
// le proprietà non intere vengono elencate nell'ordine di creazione
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

Quindi per sistemare il problema con i prefissi telefonici, possiamo "barare" rendendo i prefissi non interi. Questo lo otteniamo inserendo un `"+"` prima di ogni numero.

Come nel codice sotto:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Ora funziona come previsto.

<<<<<<< HEAD
## Copia per riferimento

Una delle fondamentali differenze tra un oggetto e un tipo primitivo è che gli oggetti vengono memorizzati e copiati "per riferimento".

I valori primtivi: stringhe, numberi, booleani -- vengono assegnati/copiati "per valore".

Ad esempio:

```js
let message = "Hello!";
let phrase = message;
```

Comre risultato avremmo due variabili indipendenti, ognua delle quali memorizza la stringa `"Hello!"`.

![](variable-copy-value.svg)

Gli oggetti non si comportano cosi.

**La variabile non memorizza l'oggetto stesso, ma il suo "indirizzo in memoria", in altre parole "un suo riferimento".** 

Qui vediamo l'esempio con gli oggetti:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

L'oggetto viene memorizzato da qualche parte in memoria. E la variabile `user` ha un "riferimento" del suo indirizzo.

**Quando viene copiato una variabile di tipo oggetto -- viene in realtà copiato il riferimento, l'oggetto non viene quindi duplicato.**

Se immaginiamo un oggetto com un archivio, allora la variabile possiamo pensarla come la chiave. Copiare una variabile duplica la chiave, non l'archivio nella sua interezza.

Ad esempio:

```js no-beautify
let user = { name: "John" };

let admin = user; // copia il riferiemento
```

Ora abbiamo due variabili, entrambe con un riferimento allo stesso oggetto:

![](variable-copy-reference.svg)

Possiamo usare qualsiasi variabile per accedere all'archivio e modificarne il suo contenuto:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // modificato dal riferimento "admin" 
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

L'esempio sopra dimostra che esiste solo una copia dell'oggetto. Abbiamo un archivio con due chiavi ed utilizziamo una di queste per accedervi (`admin`). Più avanti utilizziamo l'altra chiave (`user`) per vedere i cambiamenti.

### Confronto per riferimento

L'uguaglianza `==` e l'uguaglianza stretta `===` funzionano allo stesso modo.

**Due oggetti sono uguali solamente se sono lo stesso oggetto.**

Ad esempio, due variabili che si riferiscono allo stesso oggetto, sono uguali:

```js run
let a = {};
let b = a; // copia il riferimento

alert( a == b ); // true, entrambe le variabili fanno riferimento allo stesso oggetto
alert( a === b ); // true
```

Qui invece vediamo due oggetti che non sono uguali, nonostante siano entrambi vuoti:

```js run
let a = {};
let b = {}; // due oggetti indipendenti

alert( a == b ); // false
```

Per i confronti del tipo `obj1 > obj2` o per un confronto con un tipo primitivo `obj == 5`, gli oggetti vengono convertiti in primitive. Presto vedremo come funziona questa conversione, ma nella pratica, questo tipo di confronto è veramente raro solitamente è un errore di programmazione.

### Oggetti costanti

Un oggetto dichiarato `const` *può* cambiare.

Ad esempio:

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

Si potrebbe pensare che la riga `(*)` causi un errore, ma non è cosi, funziona correttamente. Questo perchè `const` fissa il valore di `user` stesso. Significa che `user` memorizzerà lo stesso oggetto per tutto il tempo. La riga `(*)` modifica il *contenuto* dell'oggetto, non riassegna la variabile `user`.

Il `const` darebbe un errore se provassimo a impostare `user` a qualcos altro, ad esempio:

```js run
const user = {
  name: "John"
};

*!*
// Errore (non è possibili riassegnare user)
*/!*
user = {
  name: "Pete"
};
```

...Ma come potremmo fare se volessimo rendere constati le proprietà di un oggetto? Quindi l'istruzione `user.age = 25` dovrebbe dare errore. Questo è ovviamente possibile. Lo studieremo nel capitolo <info:property-descriptors>.

## Clonazione e fusione, Object.assign

Quindi, la copia di un oggetto crea un ulteriore riferimento allo stesso oggetto.

Ma come potremmo fare se volessimo ottenere un duplicato dell'oggetto? Creare una copia indipendete, un clone?

Anche questo è possibile, è leggermente più complesso, poichè non c'è un metodo integrato in JavaScript. In realtà, ce raramente bisogno di clonare un oggetto. Nella maggior parte dei casi la copia per riferimento è più che sufficiente.

Ma se avessimo realmente la necessità di creare un clone, dovremmo creare un nuovo oggetto e replicare l'intera struttura di quello da copiare, iterando le proprietà e copiandole una per una a livello di primitiva.

Come nell'esempio:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // un nuovo oggetto vuoto

// copiamoci tutte le proprietà di user
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// ora clone è una copia indipendente
clone.name = "Pete"; // cambiamo i suoi dati 

alert( user.name ); // nell'oggetto originale rimane ancora John
```

Possiamo anche utilizzare il metodo [Object.assign](mdn:js/Object/assign).

La sintassi è:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Gli argomenti `dest`, e `src1, ..., srcN` (possono essere anche di più se necessario) sono oggetti.
- Copia le proprietà di tutti gli oggetti `src1, ..., srcN` in `dest`. In altre parole, tutte le proprietà degli argomenti (a partire dal secondo) verranno copiate nel primo. Verrà poi ritornato `dest`.

Ad esempio, possiamo utilizzare questo metodo per unire diversi oggetti in uno:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copia tutte le proprietà da permissions1 e permissions2 in user
Object.assign(user, permissions1, permissions2);
*/!*

// ora user = { name: "John", canView: true, canEdit: true }
```

Se l'oggetto destinazione (`user`) possiede già un elemento con lo stesso nome, questo verrà sovrascritto:

```js
let user = { name: "John" };

// sovrascriviamo name, add isAdmin
Object.assign(user, { name: "Pete", isAdmin: true });

// ora user = { name: "Pete", isAdmin: true }
```

Possiamo anche utilizzare `Object.assign` per una semplice clonazione:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

Questo copierà tutte le proprietà di `user` in un oggetto vuoto e lo ritornerà. In realtà e la stessa cosa di un ciclo, ma è più breve.

Finora abbiamo assunto che tutte le proprietà di `user` fossero primitive. Ma le proprietà possono essere riferimenti ad altri oggetti. Come dovremmo comportarci con queste?

Come qui sotto:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Ora non è più sufficiente copiare `clone.sizes = user.sizes`, perché `user.sizes` è un oggetto, verrebbe quindi copiato per riferimento. Quindi `clone` e `user` condividerano `sizes`:

Come possiamo vedere:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, stesso oggetto

// user e clone condividono sizes
user.sizes.width++;       // cambia una proprietà in un punto
alert(clone.sizes.width); // 51, ed è possibile vedere il riusltato anche nel clone
```

Per risolvere, dovremmo utilizzare il ciclo di clonazione per esaminare ogni valore di `user[key]`, e se troviamo oggetti, dovremmo replicare la struttura anche di questi. Questa viene definita "copia profonda".

Esiste un algoritmo standard per le copie profonde, che gestisce i casi sopra e quelli ancora più complessi, si chiama [Structured cloning algorithm](http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data). E' inutile reinventare la ruota, conviene quindi utilizzare l'implemetazione fornita dalla libreria JavaScript [lodash](https://lodash.com), il metodo si chiama [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).



## Riepilogo

Gli oggetti sono degli array associativi con delle speciali caratteristiche.
=======
## Summary
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

Possono memorizzare proprietà (coppie di chiave-valore) in cui:
- Il nome della proprietà (chiave) deve essere composta da una o più stringhe o simboli (solitamente stringhe).
- I valori possono essere di qualsiasi tipo.

Per accedere ad una proprietà possiamo utilizzare:
- La notazione puntata: `obj.property`.
- La notazione con parentesi quadre `obj["property"]`. Questa notazione consente di accettare chiavi dalle variabili, come `obj[varWithKey]`.

Operatori specifici:
- Per cancellare una proprietà: `delete obj.prop`.
- Per controllare se un una proprietà con un certo nome esiste: `"key" in obj`.
- Per iterare un oggetto: `for(let key in obj)`.

Gli oggetti vengono assegnati e copiati per riferimento. In altre parole, la variabile non memorizza il "valore dell'oggetto", ma puittosto un "riferimento" (indirizzo di memoria). Quindi copiando questa variabile o passandola come argomento ad una funzione, fornirà un riferimento all'oggetto e non una copia. Tutte le operazioni effettuate su un oggetto copiato per riferimento (come aggiungere/rimuovere proprietà) vengono effettuate sullo stesso oggetto.

<<<<<<< HEAD
Per fare una "copia" (un clone) possiamo utilizzare `Object.assign` oppure [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

Quello che abbiamo studiato in questo capitolo viene chiamato "oggetto semplice", o solo `Object`.

Ci sono altri oggetti in JavaScript:
=======
What we've studied in this chapter is called a "plain object", or just `Object`.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

- `Array` per memorizzare dati ordinati,
- `Date` per memorizzare informazioni riguardo date e orari,
- `Error` per memorizzare informazioni riguardo errori.
- ...e molti altri.


Ognuno di questi ha le sue caratteristiche speciali che studieremo più avanti. Qualche volta le persone dicono cose tipo "Array type" ("tipo Array") o "Date type" ("tipo Data"), ma formalmente non sono dei tipi, appartengono al tipo di dato "object". Sono semplicemente delle estensioni.

Gli oggetti in JavaScript sono molto potenti. Qui abbiamo grattato solamente la superficie, ma l'argomento è veramente grande. Lavoreremo molto con gli oggetti per imparare ulteriori caratteristiche.
