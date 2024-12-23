# Mixins

In JavaScript possiamo ereditare solamente da un oggetto. Può esserci solamente un `[[Prototype]]` per oggetto. Ed una classe può estendere solamente un'altra classe.

In certi casi questo può essere un limite. Ad esempio, abbiamo una classe `StreetSweeper` ed una classe `Bicycle`, e vogliamo crearne un mix: un `StreetSweepingBicycle`.

Oppure abbiamo una classe `User` ed una classe `EventEmitter` che implementa la generazione degli eventi, e vorremmo poter aggiungere la funzionalità di `EventEmitter` a `User`, cosicché i nostri utenti possano emettere eventi.

Esiste un concetto che può aiutare in questi casi, chiamato "mixins".

Come definito in Wikipedia, un [mixin](https://en.wikipedia.org/wiki/Mixin) è una classe contenente metodi che possono essere utilizzati da altre classi, senza che ci sia la necessità di ereditare da questa classe.

In altre parole, un *mixin* fornisce dei metodi che implementano delle funzionalità specifiche, che non andremo ad utilizzare da soli, ma piuttosto andremo ad aggiungere ad altre classi.

## Un esempio di mixin

Il modo più semplice per implementare un mixin in JavaScript è quello di creare un oggetto con dei metodi utili, in questo modo potremo fonderli molto semplicemente nel prototype di un'altra classe.

Ad esempio, qui vediamo il mixin `sayHiMixin` che viene utilizzato per aggiungere la funzionalità di "parlare" a `User`:

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

*!*
// utilizzo:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// copiamo i metodi
Object.assign(User.prototype, sayHiMixin);

// ora User può salutare
new User("Dude").sayHi(); // Hello Dude!
```

Non abbiamo utilizzato l'ereditarietà, ma abbiamo semplicemente copiato un metodo. Quindi `User` può tranquillamente ereditare da un'altra classe, ed includere il mixin per aggiungere funzionalità, come nell'esempio:

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

I mixins possono utilizzare a loro volta l'ereditarietà.

Ad esempio, qui abbiamo `sayHiMixin` che erediata da `sayMixin`:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (oppure potremmo utilizzare Object.setPrototypeOf per impostare il prototype)

  sayHi() {
    *!*
    // invocazione del metodo genitore
    */!*
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// copiamo i metodi
Object.assign(User.prototype, sayHiMixin);

// ora User può salutare
new User("Dude").sayHi(); // Hello Dude!
```

Da notare che l'invocazione al metodo padre `super.say()` da `sayHiMixin` (alla riga etichettata con `(*)`) cerca il metodo nel prototype di quel mixin, non in quello della classe.

![](mixin-inheritance.svg)

![](mixin-inheritance.svg)

Questo accade perché i metodi `sayHi` e `sayBye` sono stati creati in `sayHiMixin`. Quindi, anche dopo essere stati copiati, le loro proprietà `[[HomeObject]]` fanno riferimento a `sayHiMixin`, come mostrato nella figura.

<<<<<<< HEAD
Poiché `super` ricerca i metodi in `[[HomeObject]].[[Prototype]]`, ciò significa che ricerca `sayHiMixin.[[Prototype]]`, non `User.[[Prototype]]`.
=======
As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## EventMixin

Ora creiamo un mixin per la vita reale.

Una caratteristica importante di molti oggetti del browser (ad esempio) è che questi possono generare eventi. Gli eventi sono un'ottimo modo per "trasmettere informazioni" a chiunque ne sia interessato. Quindi creiamo un mixin che ci consenta di aggiungere funzioni relative agli eventi, ad una qualsiasi classe/oggetto.

- Il mixin fornirà un metodo `.trigger(name, [...data])` per "generare un evento" quando qualcosa di significativo accade. L'argomento `name` è il nome dell'evento, ed altri argomenti opzionali possono essere aggiunti con dati relativi all'evento.
- Anche il metodo `.on(name, handler)`, che aggiunge una funzione `handler` come listener degli eventi con il nome fornito. Sarà invocato nel momento in cui un evento con il `name` fornito verrà invocato dalla chiamata `.trigger`.
- ...Ed il metodo `.off(name, handler)` che rimuove il listener `handler`.

Dopo aver aggiunto il mixin, un oggetto `user` sarà in grado di generare un evento di `"login"` quando l'utente effettua l'accesso. Ed un altro oggetto, diciamo, `calendar` può stare in ascolto di questi eventi in modo da caricare il calendario della persona autenticata.

Oppure un `menu` può generare un evento di `"select"` quando un elemento viene selezionato, ed un altro oggetto stare in ascolto dell'evento. E così via.

Qui vediamo il codice:

```js run
let eventMixin = {
  /**
   * Iscrizione ad un evento, utilizzo:
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Cancellare l'iscrizione, utilizzo:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Generare un evento con uno specifico nome ed i dati relativi
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // nessun gestore per questo evento
    }

    // invochiamo i gestori
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```


- `.on(eventName, handler)` -- assegna la funzione `handler` in modo tale che venga eseguita quando l'evento con il nome fornito viene generato. Tecnicamente, avremmo a disposizione anche la proprietà `_eventHandlers` che memorizza un array di gestori per ogni tipo di evento, quindi potremmo semplicemente aggiungerlo alla lista.
- `.off(eventName, handler)` -- rimuove la funzione dalla lista dei gestori.
- `.trigger(eventName, ...args)` -- genera l'evento: tutti i gestori in `_eventHandlers[eventName]` vengono invocati con la lista degli argomenti `...args`.

Utilizzo:

```js run
// Definiamo una classe
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// Aggiungiamo il mixin con i metodi relativi agli eventi
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// aggiungiamo un gestore, da invocare alla selezione:
*!*
menu.on("select", value => alert(`Value selected: ${value}`));
*/!*

// inneschiamo l'evento => il gestore definito sopra verrà invocato e mostrerà:
// Value selected: 123
menu.choose("123");
```

Ora, nel caso volessimo che un'altra parte di codice reagisca alla selezione nel menu, ci basterà semplicemente aggiungere un listener con `menu.on(...)`.

E grazie al mixin `eventMixin`, questo comportamento diventa molto semplice da integrare in tutte le classi in cui desideriamo aggiungerlo, senza che questo vada ad interferire con l'ereditarietà.

## Riepilogo

*Mixin* -- è un termine utilizzato nella programmazione orientata agli oggetti: un classe che contiene metodi utili per altre classi.

Molti altri linguaggi di programmazione consentono l'ereditarietà multipla. JavaScript non la supporta, ma possiamo implementare i mixin copiando i loro metodi all'interno del prototype.

Possiamo utilizzare i mixins per migliorare una classe, andando ad aggiungere diversi comportamenti, come la gestione degli eventi vista sopra.

I mixins potrebbero creare conflitti nel caso in cui andassero a sovrascrivere metodi già esistenti nella classe. Quindi, generalmente, i nomi dei metodi nei mixin vanno scelti con attenzione, in modo tale da minimizzare il rischio che si generino tali conflitti.
