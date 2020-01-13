# Costruttore, operatore "new"

La sintassi `{...}` ci consente di creare un oggetto. Spesso abbiamo bisogno di creare più oggetti simili, come ad esempio più utenti, oggetti del menu e molto altro.

Questo può essere fatto utilizzando il costruttore e l'operatore `"new"`.

## Costruttore

Il costruttore tecnicamente è una normale funzione. Ci sono due convenzioni:

1. Vengono denominati con la prima lettera maiuscola.
2. Questi dovrebbero essere eseguiti solo con l'operatore `"new"`.

Ad esempio:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

<<<<<<< HEAD
Quando una funzione viene eseguita con `new User(...)`, segue questi passaggi:
=======
When a function is executed with `new`, it does the following steps:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

1. Un nuovo oggetto vuoto viene creato ed assegnato a `this`.
2. Viene eseguito il corpo della funzione. Solitamente questo modifica `this`, aggiungendo nuove proprietà.
3. Viene ritornato il valore assegnato a `this`.

In altre parole, `new User(...)` fa qualcosa del genere:

```js
function User(name) {
*!*
  // this = {};  (implicito)
*/!*

  // aggiungiamo proprietaà a this
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (implicito)
*/!*
}
```

<<<<<<< HEAD
Quindi il risultato di `new User("Jack")` è lo stesso oggetto di:
=======
So `let user = new User("Jack")` gives the same result as:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

Ora se vogliamo creare altri utenti, possiamo chiamare `new User("Ann")`, `new User("Alice")` e cosi via. Molto più rapido piuttosto che utilizzare oggetti letterali ogni volta, risulta anche più facile da leggere.

Questo è il principale scopo dei costruttori -- implementare codice riutilizzabile per la creazione degli oggetti.

Ribadiamo -- tecnicamente, ogni funzione può essere utilizzata come costruttore. Cioè: ogni funzione può essere eseguita con `new`. La "prima lettera maiuscola" è semplicemente una convenzione, per rendere esplicito che la funzione deve essere eseguita con `new`.

````smart header="new function() { ... }"
Se abbiamo molte linee di codice utili alla creazione di un unico oggetto, possiamo raggrupparle in un costruttore, come qui:

```js
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...altro codice per la creazione di user
  // magari logiche complesse e istruzioni
  // variabili locali etc
};
```

Il costruttore non può essere chiamato nuovamente, perché non è salvato da nessuna parte, viene solo creato e chiamato. Quindi questo trucco consente di incapsulare codice che costruisce un singolo oggetto, senza possibilità di riutilizzo futuro.
````

## Costruttori modalità test: new.target

```smart header="Tecniche avanzate"
La sintassi presentata in questa sessione viene utilizzata raramente, potete tranquillamente saltarlo se non siete interessati.
```

Dentro la funzione, possiamo controllare quando questa viene chiamata con `new` e quando senza, utilizzando una speciale proprietà `new.target`.

Questa risulta vuota per le chiamate normali, mentre contiene la funzione se viene chiamata con  `new`:

```js run
function User() {
  alert(new.target);
}

// senza "new":
*!*
User(); // undefined
*/!*

// con "new":
*!*
new User(); // function User { ... }
*/!*
```

Questo può essere utilizzato per consentire ad entrambe le chiamate di funzionare (con `new` e senza), quindi sia in in "modalità costruttore" che in "modalità classica".

Possiamo anche utilizzarli entrambi `new` e chiamata regole, per fare la stessa cosa, come in questo esempio:

```js run
function User(name) {
  if (!new.target) { // se mi esegui senza new 
    return new User(name); // ...Aggiungo new al posto tuo
  }

  this.name = name;
}

let john = User("John"); // reindirizza la chiamata a new User
alert(john.name); // John
```

Questo approccio viene adottato in alcune librerie per rendere la sintassi più flessibile. Rendendo possibile la chiamata della funzione sia senza che con la parola chiave`new`.

Non è un ottima cosa utilizzare la doppia sintassi ovunque, perché omettendo `new` il codice perde di leggibilità. Con la parola chiave `new` possiamo dire con certezza che si sta creando un nuovo oggetto.

## Return nel costruttore


Solitamente, i costruttori non hanno l'istruzione `return`. Il loro compito è di eseguire tutto ciò che è necessario a creare l'oggetto lavorando su `this`, quest'ultimo sarà il risultato.

<<<<<<< HEAD
Se decidiamo di inserire un istruzione di `return`, vanno seguite delle semplici regole:
=======
- If `return` is called with an object, then the object is returned instead of `this`.
- If `return` is called with a primitive, it's ignored.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

- Se `return` viene invocato con un oggetto, questo verrà ritornato al posto di `this`.
- Se `return` viene invocato con un tipo primitivo, verrà ignorato.

In altre parole, `return` su un oggetto ritorna quell'oggetto, in tutti gli altri casi verrà ritornato `this`.

Ad esempio, qui `return` sovrascrive `this` ritornando un oggetto:

```js run
function BigUser() {

  this.name = "John";

<<<<<<< HEAD
  return { name: "Godzilla" };  // <-- ritorna un oggetto
}

alert( new BigUser().name );  // Godzilla, preso l'oggetto ^^
=======
  return { name: "Godzilla" };  // <-- returns this object
}

alert( new BigUser().name );  // Godzilla, got that object
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
```

Qui invece abbiamo un esempio con un `return` vuoto (potremmo anche ritornare un qualsiasi valore di tipo primitivo):

```js run
function SmallUser() {

  this.name = "John";

<<<<<<< HEAD
  return; // al termine dell'esecuzione, ritorna this

  // ...

=======
  return; // <-- returns this
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
}

alert( new SmallUser().name );  // John
```

Solitamente i costruttori non possiedono l'istruzione `return`. Qui per completezza abbiamo citato gli eventuali comportamenti, se si tenta di ritornare un oggetto.

````smart header="Omettere le parentesi"
Possiamo anche omettere le parentesi dopo `new`, se non ci sono argomenti:

```js
let user = new User; // <-- no parentheses
// same as
let user = new User();
```

L'omissione delle parentesi non viene considerata come "buona programmazione", la sintassi comunque lo permette.
````

## Metodi in un costruttore

Utilizzare costruttori per creare degli oggetti fornisce una grande vantaggio in termini di flessibilità. Il costruttore può avere dei parametri che definiscono come costruire l'oggetto, e cosa "metterci dentro".

Ovviamente, possiamo aggiunger a `this` non solo proprietà, ma anche metodi.

Ad esempio, `new User(name)` crea un oggetto con un nome dato `name` e un metodo `sayHi`:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // Il mio nome è: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

Per creare oggetti più complessi, esiste una sintassi più avanzata, [classes](info:classes), che copriremo più avanti.

## Riepilogo

- Le funzioni di costruzione, o meglio, i costruttori, solo delle normali funzioni, che seguono però una regola di accordo comune che prevede di denominarle con la prima lettera maiuscola.
- Un costruttore dovrebbe essere chiamato solamente utilizzando `new`. Questo tipo di chiamata implica la creazione di un oggetto vuoto `this`, che verrà popolato entro la fine della funzione.

Possiamo utilizzare i costruttori per costruire molti oggetti simili tra loro.

JavaScript fornisce costruttori per la maggior parte degli oggetti integrati nel linguaggio: come `Date` per le date, `Set` per gli insiemi e molti altri che studieremo più avanti.

```smart header="Oggetti, ci ritorneremo!"
In questo capitolo abbiamo coperto solamente le basi degli oggetti e dei costruttori. Era necessario conoscerne le basi per capire meglio riguardo i data types e le funzioni che studieremo nel prossimo capitolo.

Dopo averli compresi, ritorneremo sugli oggetti e li analizzeremo più in dettaglio nei capitoli <info:prototypes> e <info:classes>.
```
