# Ereditarietà delle classi

L'ereditarietà è una caratteristica che permette ad una classe di estendere 
le proprietà di altre classi.

## La parola chiave "extends" 

Ipotizziamo di avare una classe `Animal`:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");
```

QUi vediamo come rappresentare l'oggetto `animal` e la classe `Animal` graficamente:

![](rabbit-animal-independent-animal.svg)

...Potremmo voler creare un'altra `class Rabbit`.

Poiché i conigli sono animali, la classe `Rabbit` dovrebbe essere basata su `Animal`, avendo accesso a tutti i metodi di `Animal`, in questo modo `Rabbit` può assumere tutti i comportamenti di base di un `Animal`.

La sintassi utilizzate per estendere un'altra classe è: `class Child extends Parent`.

Creiamo `class Rabbit` che eredita da `Animal`:

```js
*!*
class Rabbit extends Animal {
*/!*
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```

L'oggetto della classe `Rabbit` ha accesso sia ai metodi di `Rabbit` (ad esempio `rabbit.hide()`) che a quelli di `Animal` (`rabbit.run()`).

Internamente, `extends` aggiunge da `Rabbit.prototype` un riferimento `[[Prototype]]` a `Animal.prototype`:

![animal-rabbit-extends](animal-rabbit-extends.svg)

Ad esempio, per trovare il metodo `rabbit.run`, il motore JavaScript controlla (dal basso verso l'alto in figura):
1. L'oggetto `rabbit` (non possiede `run`).
2. Il suo prototype, che è `Rabbit.prototype` (possiede `hide`, ma non `run`).
3. Il suo prototype, che è (a causa di `extends`) `Animal.prototype`, che possiede il metodo `run`.

Come ricordiamo dal capitolo <info:native-prototypes>, JavaScript stesso usa l'ereditarietà per prototipi per gli oggetti integrati. E.g. `Date.prototype.[[Prototype]]` è `Object.prototype`. Questo è il motivo per cui le date hanno accesso ai metodi generici di un oggetto.

````smart header="Qualsiasi espressione è ammessa dopo `extend`"
Usare la parola chiave `class` permette di specificare non solo una classe, ma anche un'espressione dopo la parola `extends`.

Per esempio, una chiamata ad una funzione che genera la classe padre:

``js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

*!*
class User extends f("Hello") {}
*/!*

new User().sayHi(); // Hello
````

In questo codice la `class User` eredita dal risultato della funzione `f("Hello")`.

Questa particolarità può tornare utile nella programmazione avanzata, quando abbiamo bisogno di generare delle classi padre a seconda di vari parametri.
``

## Sovrascrivere un metodo

Proseguiamo ora e vediamo come sovrascrivere un metodo. Di base, tutti i metodi che non vengono definiti in `class Rabbit` vengono presi "cosi come sono" da `class Animal`.

Ma se specifichiamo un metodo in `Rabbit`, come `stop()` allora verrà utilizzato questo:

```js
class Rabbit extends Animal {
  stop() {
    // ...questo verrà utilizzato per rabbit.stop()
    // piuttosto di stop() dal padre, class Animal
  }
}
```

<<<<<<< HEAD
...Normalmente però non vogliamo rimpiazzare completamente il metodo ereditato, ma piuttosto costruire su di esso, modificarlo leggermente o estendere le sue funzionalità. Nel nostro metodo compiamo delle azioni, ma ad un certo punto richiamiamo il metodo ereditato.
=======
Usually, however, we don't want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Le classi forniscono la parola chiave `"super"` per questo scopo.

- `super.method(...)` per richiamare un metodo dal padre;
- `super(...)` per richiamare il costruttore del padre (valido solo all'interno del nostro costruttore).

Per esempio, facciamo sì che il nostro coniglio si nasconda automaticamente quando si ferma:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

*!*
  stop() {
    super.stop(); // richiama il metodo stop() dal padre
    this.hide(); // and then hide
  }
*/!*
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
```

Ora `Rabbit` contiene il metodo `stop`, che richiama al suo interno il metodo `super.stop()`.

````smart header="Le funzioni a freccia (Arrow functions) non hanno `super`"
Come accennato nel capitolo <info:arrow-functions>, all'interno delle funzioni a freccia (arrow functions)non si può utilizzare la parola `super` 

<<<<<<< HEAD
Se acceduto, esso viene preso dalla funzione esterna. Per esempio:
=======
If accessed, it's taken from the outer function. For instance:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // richiama il metodo stop dal padre dopo 1 secondo
  }
}
```

Il `super` nella funzione a freccia (arrow function) è lo stesso di `stop()`, quindi funziona come dovrebbe. Se specificassimo una funzione "regolare" (regular) otterremmo un errore:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````

<<<<<<< HEAD
## Sovrascrivere il costruttore

Sovrascrivere un costruttore è leggermente più complicato.
=======
## Overriding constructor
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Finora, `Rabbit` non ha avuto il suo metodo`constructor`.

Secondo le [specifiche](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation), se una classe ne estende un'altra e non ha un suo metodo `constructor` viene generato il seguente `constructor` "vuoto":

```js
class Rabbit extends Animal {
  // generato per classi figlie senza un costruttore proprio
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

Come possiamo vedere, esso richiama il `constructor` del padre, passandogli tutti gli argomenti. Questo accade se non creiamo un costruttore ad hoc.

Aggiungiamo quindi un `constructor` personalizzato per `Rabbit`, che specificherà, oltre al `name`, anche la proprietà `earLength`:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
// Non funziona!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined. (Errore: "this" non è definito)
*/!*
```

Ops! Abbiamo ricevuto un errore. Ora non possiamo creare conigli (rabbits). Cosa è andato storto?

La risposta breve è:

- **I costruttori nelle classi che ereditano devono chiamare `super(...)`, e bisogna farlo (!) prima di utilizzare `this`.**

...Ma perché? Cosa sta succedendo?
In effetti, questa richiesta sembra un po' strana.

Ovviamente una spiegazione c'è. Addentriamoci nei dettagli, così da capire cosa effettivamente succede.

In JavaScript vi è una netta distinzione tra il "metodo costruttore di una classe figlia" e tutte le altre. In una classe figlia, il costruttore viene etichettato con una proprietà interna speciale: `[[ConstructorKind]]:"derived"`.

La differenza è:

- Quando viene eseguito un costruttore normale, esso crea un oggetto vuoto chiamato `this` e continua a lavorare su quello. Questo non avviene quando il costruttore di una classe figlia viene eseguito, dato che si aspetta che il costruttore del padre lo faccia per lui.

Se stiamo creando il costruttore di un figlio dobbiamo per forza richiamare `super`, altrimenti l'oggetto referenziato da `this` non verrebbe creato. E riceveremmo un errore.

Per far funzionare `Rabbit` dobbiamo richiamare `super()` prima di usare `this`:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
// finalmente
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```

<<<<<<< HEAD

### Sovrascrivere i campi di una classe

```warn header="Nota avanzata"
Questa nota assume che voi abbiate una certa esperienza con le classi, anche in altri linguaggi di programmazione.
=======
### Overriding class fields: a tricky note

```warn header="Advanced note"
This note assumes you have a certain experience with classes, maybe in other programming languages.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Fornisce una spiegazione più dettagliata del linguaggio e ne illustra il comportamento che potrebbe essere fonte di errori (anche se molto rari).

Se trovate questa sezione troppo difficile da capire, saltatela pure, continuate a leggere, e rileggetela in un secondo momento.
```

In una sotto-classe possiamo estendere non solo i metodi, ma anche i campi di classe.

Anche se, si verifica un comportamento strano quando proviamo ad accedere ad un campo sovrascritto nel costruttore genitore, piuttosto differente da altri linguaggi di programmazione.

Consideriamo questi esempio:

```js run
class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
*!*
new Rabbit(); // animal
*/!*
```

Qui, la classe `Rabbit` estende `Animal` e sovrascrive il campo `name` con il suo valore.

Non c'è alcun costruttore in `Rabbit`, quindi viene invocato quello di `Animal`.

E' interessante notare che in entrambi i casi: `new Animal()` e `new Rabbit()`, l'istruzione di `alert` nella riga `(*)` mostra `animal`.

**In altre parole, il costruttore genitore utilizza sempre i suoi campi dati, non quelli sovrascritti.**

Cosa c'è di strano in questo?

Se non è ancora chiaro, confrontiamo con i metodi.

Qui abbiamo lo stesso codice, ma invece del campo `this.name` invochiamo il metodo `this.showName()`:

```js run
class Animal {
  showName() {  // invece di this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // invece di alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
*!*
new Rabbit(); // rabbit
*/!*
```

Notiamo che l'output è differente.

E questo è quello che ci aspetteremmo. Quando il costruttore genitore viene invocato da una classe derivata, utilizzate i metodi sovrascritti.

...Ma per i campi dati non è cosi. Come già detto, il costruttore genitore utilizza sempre i suoi campi dati.

Perché c'è questa differenza?

Il motivo sta nell'ordine di inizializzazione dei campi dati. I campi dati di una classe vengono inizializzati:
- Prima del costruttore per la classe base,
- Subito dopo `super()` per le classi derivate.

Nel nostro caso, `Rabbit` è la classe derivata. Non c'è alcun `constructor()` al suo interno. Come detto precedentemente, questo equivale ad avere un costruttore vuoto con la sola chiamata a `super(...args)`.

Quindi, `new Rabbit()` invoca `super()`, che esegue il costruttore genitore, e (per le regole che segue la classe derivata) solamente dopo vengono inizializzati i suoi campi dati. Al momento dell'esecuzione del costruttore genitore, non esiste alcun capo dato in `Rabbit`, questo è il motivo per cui vengono utilizzati i campi dati di `Animal`.

<<<<<<< HEAD
Abbiamo quindi una sottile differenza di trattamento tra i campi dati ed i metodi in JavaScript.
=======
This subtle difference between fields and methods is specific to JavaScript.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Fortunatamente, questo comportamento si verifica solamente se un campo dati va a sovrascrivere quelli della classe genitore. Potrebbe essere difficile da capire come comportamento, per questo lo abbiamo spiegato.

Se dovesse verificarsi questo problema, si possono utilizzare i metodi invece dei campi dati.

<<<<<<< HEAD

## Super: internamente, [[HomeObject]]
=======
## Super: internals, [[HomeObject]]
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```warn header="Informazioni avanzate"
Se state leggendo il tutorial per la prima volta - questa sezione può essere saltata.

Qui spiegheremo i meccanismi interni che stanno dietro l'ereditarietà e `super`.
```

Andiamo un pò più a fondo del metodo `super`. Scopriremo alcune cose interessanti a riguardo.

Beh, proviamo a chiederci, come può funzionare? Quando un metodo viene eseguito, il suo oggetto di appartenenza viene indicato con `this`. Se richiamiamo `super.method()`, dunque, esso dovrà recuperare il metodo dal prototipo dell'oggetto corrente. 

Questa attività può sembrare semplice, ma non lo è. Il motore (engine) conosce l'oggetto `this`, quindi potrebbe ottenere il metodo dalla classe padre attraverso `this.__proto__.method`. Sfortunatamente, una soluzione così "naif" non funzionerà.

Dimostriamo il problema, usando per semplicità degli oggetti piani (plain objects).

Nell'esempio sottostante, `rabbit.__proto__ = animal`. Ora proviamo: in `rabbit.eat()` richiamiamo `animal.eat()` attraverso `this.__proto__`:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
*!*
    // super.eat() dovrebbe funzionare presumibilmente così
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```

Alla linea `(*)` prendiamo `eat` dal prototipo (`animal`) e lo richiamiamo all'interno dell'oggetto. Nota che `.call(this)` è importante, dato che `this.__proto__.eat()` richiamerebbe il metodo `eat` nel contesto della classe padre, non nella classe figlio.

Nell'esempio precedente in effetti il metodo funzionava a dovere: abbiamo ricevuto l'`alert` corretto.

Ora proviamo ad aggiungere un altro oggetto. Vedremo cosa non va:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...salta in giro come un coniglio e richiama il metodo dalla classe padre (animal)
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...fa qualcosa con longEar e richiama il metodo dalla classe padre (rabbit)
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Error: Maximum call stack size exceeded (Errore: limite massimo di chiamate allo stack superato)
*/!*
```

Il codice non funziona più! Possiamo vedere l'errore provando a richiamare `longEar.eat()`.

Potrebbe non essere così scontato, ma se tracciamo la chiamata di `longEar.eat()` possiamo capire perché ciò accade. Nelle linee `(*)`
 e `(**)` il valore di `this` è l'oggetto corrente (`longEar`). Questo è fondamentale: tutti i metodi di un oggetto ricevono l'oggetto corrente come `this`, non attraverso un prototipo o simili.

 Quindi, sia nella linea `(+)` che nella linea `(**)` il valore di `this.__proto__` è esattamente lo stesso: `rabbit`. Entrambi richiamano `rabbit.eat` senza salire la catena, generando un ciclo (loop) infinito.

 Questa immagine rappresenta ciò che accade: 

 ![this-super-loop.svg](this-super-loop.svg)

 1. Dentro a `longEar.eat()`, la linea `(**)` richiama `rabbit.eat`assieme a `this=longEar`.
  
  ```js
    // dentro a longEar.eat() abbiamo this = longEar
    this.__proto__.eat.call(this) // (**)
    // diventa
    longEar.__proto__.eat.call(this)
    // che è uguale a
    rabbit.eat.call(this);
    ```  

2. Poi nella linea `(*)` di `rabbit.eat` vorremo passare la chiamata ancora più in alto nella catena, ma `this=longEar`, dunque `this.__proto__.eat` è ancora `rabbit.eat`!

    ```js
    // dentro a rabbit.eat() abbiamo ancora this = longEar
    this.__proto__.eat.call(this) // (*)
    // diventa
    longEar.__proto__.eat.call(this)
    // oppure (nuovamente)
    rabbit.eat.call(this);
    ```

3. ...Dunque `rabbit.eat` richiama sé stesso in un ciclo (loop) infinito, perché non può più salire.

Il problema non può essere risolto utilizzando solo `this`.

### `[[HomeObject]]`

Per dare una soluzione, JavaScript ha un'altra speciale proprietà interna per le funzioni: `[[HomeObject]]`.

Quando una funzione appartiene ad una classe o ad un metodo, la sua proprietà `[[HomeObject]]` diventa l'oggetto.

Quindi viene utilizzata da `super` per capire il prototipo del padre e i suoi metodi.

Vediamo come funziona:

```js run
let animal = {
  name: "Animal",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

*!*
// funziona correttamente
longEar.eat();  // Long Ear eats.
*/!*
```

Funziona come dovrebbe, grazie alle meccaniche di `[[HomeObject]]`. Un metodo, per esempio `longEar.eat`, conosce il suo `[[HomeObject]]` e prende il metodo della classe padre da quel prototipo, senza utilizzare `this`.

### I metodi non sono "liberi"

Come abbiamo già visto, generalmente le funzioni sono libere, ovvero non sono legate ad un oggetto in JavaScript, così da poter essere copiate tra gli oggetti ed essere richiamate con un altro `this`.

L'esistenza di `[[HomeObject]]` viola questo principio, perché i metodi "ricordano" i loro oggetti. `[[HomeObject]]` non può essere modificato, quindi questo legame dura per sempre.

L'unico posto in cui `[[HomeObject]]` viene utilizzato è in `super`. Quindi, se un metodo non utilizza `super` è ancora libero e copiabile. Ma con `super` le cose potrebbero andar male.

Qui di seguito è rappresentato un utilizzo sbagliato di `super`:

```js run
let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

// rabbit inherits from animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

// tree inherits from plant
let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi
*/!*
};

*!*
tree.sayHi();  // I'm an animal (?!?)
*/!*
```

Una chiamata a `tree.sayHi()` mostra "I'm an animal". Completamente sbagliato.

- Quindi il suo `[[HomeObject]]` è `rabbit`, dato che è stato creato in `rabbit`. Non c'è modo di cambiare `[[HomeObject]]`;

- Il codice di `tree.sayHi()` contiene `super.sayHi()`, che va fino a `rabbit` e prende il metodo da `animal`.

![super-homeobject-wrong](super-homeobject-wrong.svg)

### Metodi, non proprietà di una funzione

`[[HomeObject]]` viene definito per metodi appartenenti a classi e ad oggetti piani (plain objects), ma per gli oggetti i metodi vanno definiti come `method()`, non `"method: function()"`.

La differenza potrebbe non essere rilevante per noi, ma lo è per JavaScript.

Nel prossimo esempio, viene utilizzata una sintassi errata (non-method syntax) per fare un confronto. La proprietà `[[HomeObject]]`non viene impostata e l'ereditarietà non funziona: 

```js run
let animal = {
  eat: function() { // dovrebbe corrispondere a eat(){...}
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // Errore nella chiamata a super (dato che [[HomeObject non esiste]])
*/!*
```

## Riepilogo

1. Per estendere una classe: `class Child extends Parent`:
    - Questo significa che `Child.prototype.__proto__` diventerà `Parent.prototype`, quindi i metodi vengono ereditati.
2. Quando sovrascriviamo un costruttore:
    - Dobbiamo richiamare il costruttore del padre attraverso `super()` nel costruttore di `Child` prima di utilizzare `this`.
3. Quando sovrascriviamo un metodo:
    - Possiamo usare `super.method()` in un metodo di `Child` per richiamare il metodo da `Parent`.
4. Meccanismi interni:
    - I metodi tengono traccia del loro oggetto o della loro classe nella proprietà `[[HomeObject]]`, così da poter utilizzare `super` per accedere ai metodi della classe padre.
    - Non è quindi sicuro copiare un metodo in un altro oggetto attraverso `super`.

Inoltre:
- Le funzioni a freccia (arrow functions) non hanno un loro `this` o `super`, dunque si adattano al contesto in cui si trovano.
