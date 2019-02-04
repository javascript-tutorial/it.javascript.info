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

Quando una funzione viene eseguita con `new User(...)`, segue questi passaggi:

1. Un nuovo oggetto vuoto viene creato ed assegnato a `this`.
2. Viene eseguito il corpo della funzione. Solitamente questo modifica `this`, aggiungendo nuove proprietà.
3. Viene ritornato il valore assegnato a `this`.

In altre parole, `new User(...)` fa qualcosa del genere:

```js
function User(name) {
*!*
  // this = {};  (implicitly)
*/!*

  // add properties to this
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (implicitly)
*/!*
}
```

Quindi il risultato di `new User("Jack")` è lo stesso oggetto di:

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

  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
};
```

Il costruttore non può essere chiamato nuovamente, perché non è salvato da nessuna parte, viene solo creato e chiamato. Quindi questo trucco consente di incapsulare codice che costruisce un singolo oggetto, senza possibilità di riutilizzo futuro.
````

## Costruttori con doppia sintassi: new.target

```smart header="Tecniche avanzate"
La sintassi presentata in questa sessione viene utilizzata raramente, potete tranquillamente saltarlo se non siete interessati.
```

Dentro la funzione, possiamo controllare quando questa viene chiamata con `new` e quando senza, utilizzando una speciale proprietà `new.target`.

Questa risulta vuota per le chiamate normali, mentre contiene la funzione se viene chiamata con  `new`:

```js run
function User() {
  alert(new.target);
}

// without "new":
*!*
User(); // undefined
*/!*

// with "new":
*!*
new User(); // function User { ... }
*/!*
```

Questo può essere utilizzato per consentire ad entrambe le chiamate di funzionare (con `new` e senza). Creando comunque lo stesso oggetto:

```js run
function User(name) {
  if (!new.target) { // if you run me without new
    return new User(name); // ...I will add new for you
  }

  this.name = name;
}

let john = User("John"); // redirects call to new User
alert(john.name); // John
```

Questo approccio viene adottato in alcune librerie per rendere la sintassi più flessibile. Rendendo possibile la chiamata della funzione sia senza che con la parola chiave`new`.

Non è un ottima cosa utilizzare la doppia sintassi ovunque, perché omettendo `new` il codice perde di leggibilità. Con la parola chiave `new` possiamo dire con certezza che si sta creando un nuovo oggetto.

## Return nel costruttore


Solitamente, i costruttori non hanno l'istruzione `return`. Il loro compito è di eseguire tutto ciò che è necessario a creare l'oggetto lavorando su `this`, quest'ultimo sarà il risultato.

Se decidiamo di inserire un istruzione di `return`, vanno seguite delle semplici regole:

- Se `return` viene invocato con un oggetto, questo verrà ritornato al posto di `this`.
- Se `return` viene invocato con un tipo primitivo, verrà ignorato.

In altre parole, `return` su un oggetto ritorna quell'oggetto, in tutti gli altri casi verrà ritornato `this`.

Ad esempio, qui `return` sovrascrive `this` ritornando un oggetto:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- returns an object
}

alert( new BigUser().name );  // Godzilla, got that object ^^
```

Qui invece abbiamo un esempio con un `return` vuoto (potremmo anche ritornare un qualsiasi valore di tipo primitivo):

```js run
function SmallUser() {

  this.name = "John";

  return; // finishes the execution, returns this

  // ...

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

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

## Riepilogo

- Le funzioni di costruzione, o meglio, i costruttori, solo delle normali funzioni, che seguono però una regola di accordo comune che prevede di denominarle con la prima lettera maiuscola.
- Un costruttore dovrebbe essere chiamato solamente utilizzando `new`. Questo tipo di chiamata implica la creazione di un oggetto vuoto `this`, che verrà popolato entro la fine della funzione.

Possiamo utilizzare i costruttori per costruire molti oggetti simili tra loro.

JavaScript fornisce costruttori per la maggior parte degli oggetti integrati nel linguaggio: come `Date` per le date, `Set` per gli insiemi e molti altri che studieremo più avanti.

```smart header="Oggetti, ci ritorneremo!"
In questo capitolo abbiamo coperto solamente le basi degli oggetti e dei costruttori. Era necessario conoscerne le basi per capire meglio riguardo i data types e le funzioni che studieremo nel prossimo capitolo.

Dopo averli imparati, nel capitolo <info:object-oriented-programming> ritorneremo sugli oggetti e li copriremo più in profondità, coprendo anche i concetti di ereditarietà e classi.
```
