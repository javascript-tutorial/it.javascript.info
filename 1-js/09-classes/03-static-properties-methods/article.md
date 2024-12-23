
# Proprietà e metodi statici

<<<<<<< HEAD
Possiamo anche assegnare metodi alle classi stesse, non solamente al loro `"prototype"`. Questi metodi sono detti *statici*.

All'interno della classe, questi vengono preceduti dalla keyword `static`, come possiamo vedere nell'esempio:
=======
We can also assign a method to the class as a whole. Such methods are called *static*.

In a class declaration, they are prepended by `static` keyword, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

Questo avrà lo stesso effetto di assegnarla direttamente come proprietà:

```js run
class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
```

Il valore di `this` nella chiamata `User.staticMethod()` è rappresentato dal costruttore dell classe `User` (la regola dell' "oggetto prima del punto").

<<<<<<< HEAD
Solitamente, i metodi statici vengono utilizzati per rappresentare funzioni che appartengono alla classe, ma non ad un oggetto in particolare.

Ad esempio, potremmo avere degli oggetti di tipo `Article` e necessitare di una funzione per confrontarli. Una soluzione naturale sarebbe quella di aggiungere il metodo `Article.compare`, come nell'esempio:
=======
Usually, static methods are used to implement functions that belong to the class as a whole, but not to any particular object of it.

For instance, we have `Article` objects and need a function to compare them.

A natural solution would be to add `Article.compare` static method:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// usage
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

<<<<<<< HEAD
Qui `Article.compare` sta "al di sopra" degli articoli, poiché ha lo scopo di confrontarli. Non è un metodo di un articolo, ma piuttosto dell'intera classe.

Un altro esempio comune è quello del "factory method" (un particolare design pattern). Immaginiamo di avere bisogno di diverse modalità di creazione di un articolo:
=======
Here `Article.compare` method stands "above" articles, as a means to compare them. It's not a method of an article, but rather of the whole class.

Another example would be a so-called "factory" method.

Let's say, we need multiple ways to create an article:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

1. Creazione con i parametri forniti (`title`, `date` etc).
2. Creazione di un articolo vuoto con la data di oggi.
3. ...o qualsiasi altra modalità.

Il primo metodo può essere implementato tramite il costruttore. Mentre per il secondo, possiamo creare un metodo statico appartenente alla classe.

<<<<<<< HEAD
Come `Article.createTodays()` nell'esempio:
=======
Such as `Article.createTodays()` here:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // ricorda, this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Today's digest
```

Ora, ogni volta in cui avremo bisogno di crare un "today's digest", possiamo invocare `Article.createTodays()`. Ripetiamolo nuovamente, questo non è un metodo per uno specifico articolo, ma piuttosto un metodo dell'intera classe.

I metodi statici vengono utilizzati anche nelle classi database-related (relative a database), per poter cercare/salvare/rimuovere elementi dal database, come nell'esempio:

```js
<<<<<<< HEAD
// assumiamo che Article sia una classe speciale per la gestione degli articoli
// metodo statico per la rimozione di un articolo:
Article.remove({id: 12345});
```

## Proprietà statiche
=======
// assuming Article is a special class for managing articles
// static method to remove the article by id:
Article.remove({id: 12345});
```

````warn header="Static methods aren't available for individual objects"
Static methods are callable on classes, not on individual objects.

E.g. such code won't work:

```js
// ...
article.createTodays(); /// Error: article.createTodays is not a function
```
````

## Static properties
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

[recent browser=Chrome]

E' anche possibile definire proprietà statiche, queste sono molto simili alle proprietà della classe, ma sono precedute dalla keyword `static`:

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

Lo stesso che si otterrebbe con un assegnazione diretta ad `Article`:

```js
Article.publisher = "Ilya Kantor";
```

## Ereditarietà delle proprietà e dei metodi statici [#statics-and-inheritance]

Anche le proprietà ed i metodi statici vengono ereditati.

Ad esempio, `Animal.compare` e `Animal.planet` nel codice sotto, vengono ereditate e diventano quindi accessibili come `Rabbit.compare` e `Rabbit.planet`:

```js run
class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Eredita da Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth
```

Ora, quando invochiamo `Rabbit.compare`, verrà invocato il metodo `Animal.compare` ereditato.

Come funziona? Nuovamente, utilizzando il prototypes. Come potrete aver già intuito, `extends` fornisce a `Rabbit` il  riferimento a `[[Prototype]]` di `Animal`.

![](animal-rabbit-static.svg)

![](animal-rabbit-static.svg)

1. La funzione `Rabbit` eredita dalla funzione di `Animal` .
2. `Rabbit.prototype` eredita il prototye di `Animal.prototype`.

Come risultato, l'ereditarietà funziona sia per i metodi regolari che per quelli statici.

Ora, verifichiamo quanto detto guardando al codice:

```js run
class Animal {}
class Rabbit extends Animal {}

// per proprietà statiche
alert(Rabbit.__proto__ === Animal); // true

// per proprietà regolari
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## Riepilogo

I metodi statici vengono utilizzati per funzionalità che appartengono all'intera classe. Non hanno nulla a che fare con l'istanza della classe.

Ad esempio, un metodo per il confronto `Article.compare(article1, article2)` o un factory method `Article.createTodays()`.

Queste vengono precedute dalla keyword `static` all'interno della dichiarazione della classe.

Le proprietà statiche vengono utilizzate quando si ha intenzione di memorizzare dati relativi alla classe, che non sono quindi legati ad un'istanza precisa.

La sintassi è:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

Tecnicamente, le dichiarazioni di proprietà statiche equivalgono all'assegnazione diretta alla classe stessa:

```js
MyClass.property = ...
MyClass.method = ...
```

Le proprietà ed i metodi statici vengono ereditati.

Nel caso in cui `class B extends A` il prototype della classe `B` punta ad `A`: `B.[[Prototype]] = A`. Quindi se un campo non viene trovato in `B`, la ricerca continuerà in `A`.
