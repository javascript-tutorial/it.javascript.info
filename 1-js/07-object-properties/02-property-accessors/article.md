
# Proprietà getters e setters

Esistono due tipi di proprietà per gli oggetti.

Il primo tipo sono le *data properties* (proprietà di tipo "dato"). Sappiamo già come utilizzarle, poiché tutte le proprietà viste fino ad ora erano *date properties*.

<<<<<<< HEAD
Il secondo tipo di proprietà è qualcosa di nuovo. Sono definite *accessor properties* (proprietà accessorie). Sono essenzialmente funzioni che vengono eseguite quando viene letto o impostato un valore, ma al codice esterno appaiono come normali proprietà.
=======
The second type of property is something new. It's an *accessor property*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Getters e setters

Le *accessor properties* sono rappresentate dai metodi *"getter"* e *"setter"*. In un *object literal* vengono indicate da *`get`* e *`set`*:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, il codice eseguito per ottenere obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, il codice eseguito per impostare il valore di obj.propName = value
  }
};
```

La proprietà *getter* viene eseguita quando `obj.propName` viene letto, la proprietà *setter*, invece, quando viene assegnato.

Ad esempio, abbiamo un oggetto `user` con le proprietà `name` e `surname`:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

Ora vogliamo aggiungere una proprietà `fullName`, che dovrebbe valere `"John Smith"`. Ovviamente vorremmo evitare di copiare ed incollare informazioni già esistenti, quindi possiamo implementare questa funzionalità tramite un *accessor*:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

Vista esternamente, una *accessor property* è del tutto simile ad una normale proprietà, è questa l'idea che sta dietro alle *accessor properties*. Non *invochiamo* `user.fullName` come una normale funzione, ma la *leggiamo* come una normale proprietà: in questo caso il *getter* sta lavorando per noi.

Per ora, `fullName` possiede un solo getter. Se provassimo ad assegnare `user.fullName=`, otterremo un errore:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (la proprietà possiede solo un getter)
*/!*
```

Aggiungiamo quindi un *setter* per `user.fullName`:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// set fullName viene eseguito con i valori forniti
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

Come risultato finale, abbiamo un proprietà "virtuale" `fullName`. Che possiamo sia leggere che scrivere.

## Descrittori degli *accessors*

I descrittori per le *accessor prorperties* sono diversi da quelli per le *data properties*.

Per le *accessor properties*, non ci sono `value` o `writable`, ma ci sono invece le funzioni `get` or `set`.

Un descrittore di *accessor properties* può possedere:

- **`get`** -- una funzione che non accetta argomenti, che specifica come accedere in lettura ad una proprietà,
- **`set`** -- una funzione con un solo argomento, che specifica come impostare il valore della proprietà,
- **`enumerable`** -- stesso comportamento visto per le *data properties*,
- **`configurable`** -- stesso comportamento visto per le *data properties*.

Ad esempio, possiamo creare un *accessor* `fullName` con `defineProperty`, passando un *descriptor* con `get` e `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

Da notare che una proprietà può essere o un *accessor* (con i metodi `get/set`) o una *data property* (con un `value`), ma non entrambe.

Se proviamo a fornire sia `get` che `value`, nello stesso *descriptor*, otterremo un errore:

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Getters/setters intelligenti

*Getters/setters* possono essere utilizzati come *wrappers* (contenitori) per le proprietà "reali", in questo modo avremo più controllo sulle operazioni di lettura/scrittura.

Ad esempio, potremmo vietare nomi troppo brevi per la proprietà `name`, possiamo definire un *setter* `name` e mantenere il valore in una proprietà diversa `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Il nome è troppo corto...
```

Quindi, il nome viene memorizzato nella prorietà `_name`, e gli accessi vengono effettuati tramite *getter* e *setter*.

Tecnicamente, il codice all'esterno potrebbe accedere direttamente al nome utilizzando `user._name`. Ma esiste una convezione molto diffusa che specifica di non utilizzare direttamente le proprietà che iniziano con `"_"`.


## Utilizzato per compatibilità

Uno dei principali vantaggi offerti dagli *accessors* è che permettono di migliorare il controllo di una normale *data property* rimpiazzandola con le proprietà *getter* e *setter* e lavorando sul loro comportamento.

Immaginiamo di inziare ad implementare l'oggetto `user` con le proprietà `name` e `age`°

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...Ma prima o poi, le cose potrebbero cambiare. Invece di `age` potremmo decidere di memorizzare `birthday`, poiché è più preciso e conveniente:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Ora come ci comportiamo con il codice "vecchio" che utilizza ancora la proprietà `age`?

Possiamo provare a cercare tutti i posti in cui viene utilizzata nel codice e sistemarlo, ma questo potrebbe richiedere tempo e potrebbe essere ancora più complesso se lo stesso codice viene utilizzato da altre persone. E in ogni caso, `age` è una proprietà utile da avere in `user`, giusto?

Quindi manteniamola.

Aggiungere un *getter* per `age` risolve il problema:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age viene calcolata utilizzando la data attuale ed il compleanno
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday è disponibile
alert( john.age );      // ...è lo è anche age
```

In questo modo il codice "vecchio" continua a funzionare e abbiamo anche guadagnato un'ottima proprietà aggiuntiva.
