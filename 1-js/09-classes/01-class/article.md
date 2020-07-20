
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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
// la classe User usando solo funzioni

// 1. Costruttore
function User(name) {
  this.name = name;
}
<<<<<<< HEAD
// tutte le funzioni hanno un costruttore predefinito (di default)
// dunque non va creato
=======
// a function prototype has "constructor" property by default,
// so we don't need to create it
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

1. Una funzione creata attraverso `class` viene etichettata dalla proprietà interna `[[FunctionKind]]:"classConstructor"`.

<<<<<<< HEAD
    A differenza di una normale funzione, il costruttore di una classe può essere richiamato solo attraverso la parola chiave `new`:
=======
    The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with `new`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
    There are other differences, we'll see them soon.

2. I metodi delle classi non sono     numerabili. La definizione di una classe imposta il flag `enumerable` a `false` per tutti i metodi all'interno di `"prototype"`.

    Questo è un bene, dato che non vogliamo visualizzare i metodi quando utilizziamo un ciclo `for..in` per visualizzare un oggetto.

3. Il contenuto di una classe viene sempre eseguito in `strict`.

    Oltre a queste, la sintassi `class` apporta altre caratteristiche, che esploreremo più avanti.

## L'espressione class

<<<<<<< HEAD
Come le funzioni, le classi possono essere definite all'interno di un'altra espressione, passata come parametro, essere ritornata (returned), assegnata (assigned) ecc.
=======
Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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

<<<<<<< HEAD
Possiamo anche creare delle classi "on-demand":
=======
We can even make classes dynamically "on-demand", like this:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
## Getters/setters

Just like literal objects, classes may include getters/setters, computed properties etc.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
```

La dichiarazione della classe crea i getter e i setter all'interno di `User.prototype`:
=======
user = new User(""); // Name is too short.
```

Technically, such class declaration works by creating getters and setters in `User.prototype`.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

## Computed names [...]

<<<<<<< HEAD
A seguire un esempio con le proprietà:
=======
Here's an example with a computed method name using brackets `[...]`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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

```warn header="I vecchi browser potrebbero non supportarle"
Le proprietà di una classe dichiarata in questo modo sono una novità del linguaggio.
```

Negli esempi riportati sopra, la classe `User` conteneva solo dei metodi. Aggiungiamo una proprietà:

```js run
class User {
  name = "Anonymous";
=======
Such features are easy to remember, as they resemble that of literal objects.

## Class fields

```warn header="Old browsers may need a polyfill"
Class fields are a recent addition to the language.
```

Previously, our classes only had methods.

"Class fields" is a syntax that allows to add any properties.

For instance, let's add `name` property to `class User`:

```js run
class User {
*!*
  name = "John";
*/!*
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

So, we just write "<property name> = <value>" in the declaration, and that's it.

The important difference of class fields is that they are set on individual objects, not `User.prototype`:

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

We can also assign values using more complex expressions and function calls:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```


### Making bound methods with class fields

As demonstrated in the chapter <info:bind> functions in JavaScript have a dynamic `this`. It depends on the context of the call.

So if an object method is passed around and called in another context, `this` won't be a reference to its object any more.

For instance, this code will show `undefined`:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

<<<<<<< HEAD
Le proprietà non vengono inserite all'interno di `User.prototype`, ma vengono create separatamente attraverso `new`, cosicché non vengano condivise tra oggetti creati dalla stessa classe.
=======
The problem is called "losing `this`".

There are two approaches to fixing it, as discussed in the chapter <info:bind>:

1. Pass a wrapper-function, such as `setTimeout(() => button.click(), 1000)`.
2. Bind the method to object, e.g. in the constructor.

Class fields provide another, quite elegant syntax:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

The class field `click = () => {...}` is created on a per-object basis, there's a separate function for each `Button` object, with `this` inside it referencing that object. We can pass `button.click` around anywhere, and the value of `this` will always be correct.

That's especially useful in browser environment, for event listeners.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

Nei prossimi capitoli impareremo altri dettagli riguardo alle classi, come l'ereditarietà.
