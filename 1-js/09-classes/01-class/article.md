
# Sintassi base delle classi

```quote author="Wikipedia"
Nella programmazione orientata agli oggetti una classe è un costrutto di un linguaggio di programmazione usato come modello per creare oggetti. Il modello comprende attributi e metodi che saranno condivisi da tutti gli oggetti creati (istanze) a partire dalla classe. Un "oggetto" è, di fatto, l'istanza di una classe.
```

In pratica, spesso abbiamo bisogno di creare più oggetti dello stesso tipo, come utenti, beni o altro.

Come già sappiamo dal capitolo <info:constructor-new>, `new function` ci può aiutare in questo.

Ma nel JavaScript moderno c'è un costrutto "class" più avanzato, che introduce nuove possibilità molto utili per la programmazione ad oggetti.

## La sintassi di "class"

La sintassi base è:

```js
class MyClass {
  // metodi della classe
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

`new MyClass()` creerà un nuovo oggetto con tutti i metodi presenti nella classe.

Il metodo `constructor()` viene chiamato automaticamente da `new`, dunque possiamo usarlo per inizializzare l'oggetto.

Per esempio:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Utilizzo:
let user = new User("John");
user.sayHi();
```

Quando viene chiamato `new User("John")`:

1. Viene creato un nuovo oggetto;
2. Il metodo `constructor()` viene richiamato e assegna a `this.name` l'argomento dato.

...Ora possiamo chiamare i metodi, per esempio `user.sayHi`.

```warn header="Niente virgole tra i metodi"
Un errore comune per i principianti è separare i metodi con delle virgole, portando ad un syntax error.

La notazione delle classi non va confusa con la notazione letterale per gli oggetti. In una classe non sono richieste virgole.
```

## Cos'è una classe?

Dunque, cos'è esattamente una `class`? A differenza di ciò che si potrebbe pensare, non si tratta di un concetto completamente nuovo.

Vediamo quindi cos'è effettivamente una classe. Questo ci aiuterà a comprendere aspetti più complessi.

<<<<<<< HEAD
In JavaScript, una classe è una specie di funzione.
=======
In JavaScript, a class is a kind of function.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Osserva:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// prova: User è una funzione
*!*
alert(typeof User); // function
*/!*
```

Il costrutto `class User {...}` dunque:

1. Crea una funzione chiamata `User`, che diventa il risultato della dichiarazione della classe. Le istruzioni della funzione provengono dal metodo `constructor` (considerato vuoto se non presente);
2. Salva tutti i metodi (come `sayHi`) all'interno di `User.prototype`.

<<<<<<< HEAD
Quando richiameremo da un oggetto un metodo, questo verrà preso dal prototipo (prototype), come descritto nel capitolo <info:function-prototype>. Dunque un oggetto `new User` ha accesso ai metodi della classe.
=======
After `new User` object is created, when we call its method, it's taken from the prototype, just as described in the chapter <info:function-prototype>. So the object has access to class methods.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Possiamo rappresentare il risultato della dichiarazione di `class User` come:

![class-user](class-user.svg)

Il codice seguente ti permetterà di analizzarlo:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// una classe è una funzione
alert(typeof User); // function

// ...o, più precisamente, il costruttore
alert(User === User.prototype.constructor); // true

// I metodi vengono salvati in User.prototype:
alert(User.prototype.sayHi); // alert(this.name);

// ci sono due funzioni all'interno del prototipo
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

<<<<<<< HEAD
## Non solo una semplificazione (syntax sugar)

Talvolta si pensa che `class` in JavaScript sia solo "syntax sugar" (una sintassi creata per semplificare la lettura, ma che non apporta nulla di nuovo), dato che potremmo potremmo dichiarare la stessa cosa senza utilizzare la parola chiave `class`:
=======
## Not just a syntactic sugar

Sometimes people say that `class` is a "syntactic sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same without `class` keyword at all:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
// la classe User usando solo funzioni

// 1. Costruttore
function User(name) {
  this.name = name;
}
// tutte le funzioni hanno un costruttore predefinito (di default)
// dunque non va creato

// 2. Aggiungiamo un metodo al prototipo
User.prototype.sayHi = function() {
  alert(this.name);
};

// Utilizzo:
let user = new User("John");
user.sayHi();
```

<<<<<<< HEAD
Il risultato di questo codice è circa lo stesso. È quindi logico pensare che `class` sia solo una semplificazione sintattica (syntax sugar).

Ci sono però delle importanti differenze.
=======
The result of this definition is about the same. So, there are indeed reasons why `class` can be considered a syntactic sugar to define a constructor together with its prototype methods.

Still, there are important differences.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

1. Una funzione creata attraverso `class` viene etichettata dalla proprietà interna `[[FunctionKind]]:"classConstructor"`.

<<<<<<< HEAD
    A differenza di una normale funzione, il costruttore di una classe può essere richiamato solo attraverso la parola chiave `new`:
=======
    And unlike a regular function, a class constructor must be called with `new`:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

    ```js run
        class User {
          constructor() {}
        }

        alert(typeof User); // funzione
        User(); // Errore: Il costruttore della classe può essere riciamato solo attraverso 'new'
    ```

    Inoltre, nella maggior parte dei motori JavaScript il costruttore comincia con "class"

    ```js run
        class User {
          constructor() {}
        }

        alert(User); // class User { ... }
    ```

2. I metodi delle classi non sono     numerabili. La definizione di una classe imposta il flag `enumerable` a `false` per tutti i metodi all'interno di `"prototype"`.

    Questo è un bene, dato che non vogliamo visualizzare i metodi quando utilizziamo un ciclo `for..in` per visualizzare un oggetto.

3. Il contenuto di una classe viene sempre eseguito in `strict`.

    Oltre a queste, la sintassi `class` apporta altre caratteristiche, che esploreremo più avanti.

## L'espressione class

<<<<<<< HEAD
Come le funzioni, le classi possono essere definite all'interno di un'altra espressione, passata come parametro, essere ritornata (returned), assegnata (assigned) ecc.
=======
Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Qui c'è un piccolo esempio:

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

In maniera simile alle funzione nominate (Named Function Expression), le classi possono avere o meno un nome.

Se una classe ha un nome, esso è visibile solo all'interno della classe:

```js run
// "Named Class Expression"
// (la classe non ha un nome)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass è visibile solo all'interno della classe
  }
};

new User().sayHi(); // funziona, restituisce la definizione di MyClass

alert(MyClass); // errore, MyClass non è visibile al di fuori della classe
```

Possiamo anche creare delle classi "on-demand":

```js run
function makeClass(phrase) {
  // dichiara una classe e la restituisce
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// Crea una nuova classe
let User = makeClass("Hello");

new User().sayHi(); // Hello
```

## Getters/setters e altre scorciatoie

<<<<<<< HEAD
Così come negli oggetti letterali (literal objects), le classi possono includere getters/setters, generatori, proprietà eccetera.
=======
## Getters/setters, other shorthands

Just like literal objects, classes may include getters/setters, computed properties etc.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

L'esempio seguente implementa `user.name` attraverso `get/set`:

```js run
class User {

  constructor(name) {
    // invoca il setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

<<<<<<< HEAD
user = new User(""); // Nome troppo corto.
=======
user = new User(""); // Name is too short.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
```

La dichiarazione della classe crea i getter e i setter all'interno di `User.prototype`:

```js
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```

<<<<<<< HEAD
A seguire un esempio con le proprietà:
=======
Here's an example with a computed property name in brackets `[...]`:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
function f() { return "sayHi"; }

class User {
  [f()]() {
    alert("Hello");
  }

}

new User().sayHi();
```

<<<<<<< HEAD
Per creare un metodo generatore è sufficiente aggiungere `*` prima del nome della funzione.

## Proprietà di una classe
=======
## Class properties
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```warn header="I vecchi browser potrebbero non supportarle"
Le proprietà di una classe dichiarata in questo modo sono una novità del linguaggio.
```

Negli esempi riportati sopra, la classe `User` conteneva solo dei metodi. Aggiungiamo una proprietà:

```js run
class User {
  name = "Anonymous";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi();

alert(User.prototype.sayHi); // placed in User.prototype
alert(User.prototype.name); // undefined, not placed in User.prototype
```

<<<<<<< HEAD
Le proprietà non vengono inserite all'interno di `User.prototype`, ma vengono create separatamente attraverso `new`, cosicché non vengano condivise tra oggetti creati dalla stessa classe.
=======
The property `name` is not placed into `User.prototype`. Instead, it is created by `new` before calling the constructor, it's a property of the object itself.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

## Riassunto

Il seguente esempio riporta la sintassi base di una classe:

```js
class MyClass {
  prop = value; // proprietà

  constructor(...) { // costruttore
    // ...
  }

  method(...) {} // metodo

  get something(...) {} // metodo getter
  set something(...) {} // metodo setter

  [Symbol.iterator]() {} // metodo creato con un vettore relazionale
  // ...
}
```

<<<<<<< HEAD
`MyClass` è tecnicamente una funzione (che corrisponde a `constructor`), mentre i metodi vengono scritti in `MyClass.prototype`.
=======
`MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and setters are written to `MyClass.prototype`.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Nei prossimi capitoli impareremo altri dettagli riguardo alle classi, come l'ereditarietà.
