# Proxy e Reflect

Un oggetto `Proxy` racchiude un altro oggetto e ne intercetta le operazioni, come quelle di lettura/scrittura e molte altre; può eventualmente gestirle a modo suo oppure, in maniera del tutto trasparente, lasciare che sia l'oggetto ad occuparsene.

I proxy vengono utilizzati da molte librerie ed alcuni framework per browsers. Ne vedremo molte applicazioni pratiche in questo articolo.

## Proxy

La sintassi:

```js
let proxy = new Proxy(target, handler)
```

- `target` -- è l'oggetto da racchiudere; può essere qualsiasi cosa, anche una funzione.
- `handler` -- configurazione del proxy: un oggetto con "trappole", metodi che intercettano operazioni. Ad esempio una "trappola" `get` per la lettura di una proprietà di `target`, `set` per la scrittura di una proprietà di `target`, e così via.

Per le operazioni sul `proxy`, se c'è un "trappola" corrispondente in `handler`, allora questa verrà eseguita, e il proxy potrà gestirla, altrimenti l'operazione verrà eseguita su `target`.
Come primo esempio, creiamo un proxy senza "trappole":

```js run
let target = {};
let proxy = new Proxy(target, {}); // handler vuoto

proxy.test = 5; // scrittura su proxy (1)
alert(target.test); // 5, la proprietà si trova su target!

alert(proxy.test); // 5, possiamo leggerla anche dal proxy (2)

for(let key in proxy) alert(key); // test, l'iterazione funziona (3)
```

Poiché non ci sono "trappole", tutte le operazioni su `proxy` vengono inoltrate a `target`.

1. Un'operazione di scrittura `proxy.test=` imposta il valore su `target`.
2. Un'operazione di lettura `proxy.test` ritorna il valore da `target`.
3. L'iterazione su `proxy` ritorna valori da `target`.

Come possiamo vedere, senza "trappole", `proxy` è solamente un contenitore per `target`.

![](proxy.svg)

`Proxy` è uno speciale "oggetto esotico". Non possiede proprietà proprie. Con un `handler` vuoto, le operazioni verranno automaticamente inoltrate a `target`.

Per attivare più funzionalità, aggiungiamo qualche "trappola".

Cosa possiamo intercettare?

Per molte operazioni sugli oggetti, esiste un così detto "metodo interno" nella specifiche JavaScript che ne descrive il funzionamento a basso livello. Ad esempio `[[Get]]`, il metodo interno per la lettura delle proprietà, e `[[Set]]`, il metodo interno per la scrittura delle proprietà, e così via. Questi metodi vengono utilizzati solamente nelle specifiche, non possiamo invocarli direttamente utilizzandone il nome.

Le trappole "proxy" intercettano le invocazioni di questi metodi. Queste vengono elencate nelle [specifiche Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots) e nella tabella sottostante.

Per ogni metodo interno, esiste una "trappola" in questa tabella: il nome del metodo che possiamo aggiungere al parametro `handler` del `new Proxy` per intercettare l'operazione:

| Metodo Interno | Handler | Innescato quando... |
|-----------------|----------------|-------------|
| `[[Get]]` | `get` | lettura di un proprietà |
| `[[Set]]` | `set` | scrittura di un proprietà |
| `[[HasProperty]]` | `has` | operatore `in` |
| `[[Delete]]` | `deleteProperty` | operatore `delete` |
| `[[Call]]` | `apply` | invocazione di funzione |
| `[[Construct]]` | `construct` | operatore `new` |
| `[[GetPrototypeOf]]` | `getPrototypeOf` | [Object.getPrototypeOf](mdn:/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) |
| `[[SetPrototypeOf]]` | `setPrototypeOf` | [Object.setPrototypeOf](mdn:/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) |
| `[[IsExtensible]]` | `isExtensible` | [Object.isExtensible](mdn:/JavaScript/Reference/Global_Objects/Object/isExtensible) |
| `[[PreventExtensions]]` | `preventExtensions` | [Object.preventExtensions](mdn:/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| `[[DefineOwnProperty]]` | `defineProperty` | [Object.defineProperty](mdn:/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](mdn:/JavaScript/Reference/Global_Objects/Object/defineProperties) |
| `[[GetOwnProperty]]` | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](mdn:/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries` |
| `[[OwnPropertyKeys]]` | `ownKeys` | [Object.getOwnPropertyNames](mdn:/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](mdn:/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in`, `Object.keys/values/entries` |

```warn header="Invarianti"
JavaScript applica alcune invarianti, ovvero condizioni che devono essere soddisfatte da metodi interni e "trappole".

Molte di queste sono per i valori di ritorno:
- `[[Set]]` deve ritornare `true` se il valore è stato scritto con successo, altrimenti ritorna `false`.
- `[[Delete]]` deve ritornare `true` se il valore è stato rimosso con successo, altrimenti ritorna `false`.
- ...E così via, vedremo più esempi sotto.

Esistono anche altre invarianti, come:
- `[[GetPrototypeOf]]`, applicata all'oggetto proxy, il quale deve ritornare lo stesso valore di `[[GetPrototypeOf]]` che sarebbe ritornato dall'oggetto target. In altre parole, la lettura del prototype del proxy deve sempre ritornare il prototype dell'oggetto target.

Le "trappole" possono intercettare queste operazioni, ma devono seguire le regole viste.

Le invarianti assicurano che le funzionalità del linguaggio si comportino in maniera corretta e consistente. La lista completa delle invarianti è disponibile [nelle specifiche](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots). Probabilmente non le violerai, a meno ché tu non stia facendo qualcosa di strano.
```

Vediamo come funzionano con esempi pratici.

## Valore di default con la trappola "get"

La maggior parte delle "trappole" sono dedicate alla lettura/scrittura di proprietà.

Per intercettare la lettura, l'`handler` dovrebbe possedere un metodo `get(target, property, receiver)`.

Verrà innescato quando una proprietà verrà letta, con i seguenti argomenti:

- `target` -- è l'oggetto target, quello fornito come primo argomento a `new Proxy`,
- `property` -- nome della proprietà,
- `receiver` -- se la proprietà target è un getter, allora `receiver` sarà l'oggetto che verrà utilizzato come `this` in questa chiamata. Solitamente è l'oggetto `proxy` stesso (oppure un oggetto che eredita da esso, se stiamo ereditando dal proxy). Per ora non abbiamo bisogno di questo argomento, quindi lo analizzeremo nel dettagli più avanti.

Utilizziamo `get` per implementare i valore di default di un oggetto.

Costruiremo un array numerico che ritornerà `0` per valori inesistenti.

Solitamente, quando si prova ad accedere ad un elemento non esistente di un array, si ottiene `undefined`, ma noi costruiremo un proxy di un array che ritorna `0` nel caso in cui la proprietà non esistesse:

```js run
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // valore di default
    }
  }
});

*!*
alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (elemento non esistente)
*/!*
```

Come possiamo vedere, è molto semplice da fare con una "trappola" `get`.

Possiamo utilizzare un `Proxy` per implementare una logica per i valori di "default".

Immaginiamo di avere un dizionario, contenente i termini e le rispettive traduzioni:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome'] ); // undefined
```

Attualmente, se non esiste un termine, la lettura dal `dictionary` ritorna `undefined`. Ma nella pratica, ritornare un termine non tradotto è generalmente meglio di `undefined`. Quindi facciamo in modo che ritorni il termine non tradotto piuttosto di `undefined`.

Per farlo, costruiremo un contenitore per `dictionary` con un proxy che intrecetterà le operazioni di lettura:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
*!*
  get(target, phrase) { // intercetta la lettura di una proprietà dal dictionary
*/!*
    if (phrase in target) { // se è contenuto nel dictionary
      return target[phrase]; // ritorna la traduzione
    } else {
      // altrimenti, ritorna il termine non tradotto
      return phrase;
    }
  }
});

// Cerchiamo un termine casuale nel dictionary!
// Nel peggiore dei casi, questo non sarà tradotto.
alert( dictionary['Hello'] ); // Hola
*!*
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (nessuna traduzione)
*/!*
```

````smart
Da notare come il proxy sovrascrive la variabile:

```js
dictionary = new Proxy(dictionary, ...);
```

Il proxy dovrebbe rimpiazzare completamente il target, ovunque. Nessuno dovrebbe più fare riferimento all'oggetto target una volta che questo è stato racchiuso da un proxy. Altrimenti diventerebbe molto facile commettere errori.
````

## Validazione con la trappola "set"

Ipotizziamo di volere un array di soli numeri. Se viene aggiunto un valore di un altro tipo, questo dovrebbe generare un errore.

La "trappola" `set` si innesca quando si accede in scrittura ad una proprietà.

`set(target, property, value, receiver)`:

- `target` -- rappresenta l'oggetto target, quello fornito come primo argomento a `new Proxy`,
- `property` -- il nome della proprietà,
- `value` -- il valore della proprietà,
- `receiver` -- similmente alla trappola `get`, ha importanza solamente per le proprietà di tipo setter.

La trappola `set` dovrebbe ritornare `true` se è stata imposta correttamente, `false` altrimenti (innescando `TypeError`).

Utilizziamola per validare un nuovo valore:

```js run
let numbers = [];

numbers = new Proxy(numbers, { // (*)
*!*
  set(target, prop, val) { // per intercettare la scrittura di proprietà
*/!*
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // aggiunta con successo
numbers.push(2); // aggiunta con successo
alert("Length is: " + numbers.length); // 2

*!*
numbers.push("test"); // TypeError ('set' di proxy ha ritornato false)
*/!*

alert("This line is never reached (error in the line above)");
```

Da notare: la funzionalità interna degli array integrati continuano a funzionare! I valori vengono aggiunti tramite `push`. La proprietà `length` viene auto-incrementata quando i valori vengono aggiunti. Il nostro proxy non rompe nulla.

Non dobbiamo sovrascrivere i metodi di aggiunta valori agli array come `push`, `unshift` e così via per aggiungere i controlli, poiché questi metodi internamente utilizzano operazioni di `[[Set]]` che verranno intercettate dal proxy.

In questo modo il codice rimane pulito e conciso.

```warn header="Non dimenticate di ritornare `true`"
Come detto sopra, vanno tenute in considerazione le invarianti.

Nel caso di `set`, questo deve ritornare `true` per scritture avvenute con successo.

Se ci dimentichiamo di farlo o ritorniamo qualsiasi altro valore, l'operazione innescherà `TypeError`.
```

## Iterazione con "ownKeys" e "getOwnPropertyDescriptor"

I cicli `Object.keys`, `for..in` e molti altri metodi che iterano sulle proprietà degli oggetti utilizzano il metodo interno `[[OwnPropertyKeys]]` (intercettate dalla trappola `ownKeys`) per ottenere la lista delle proprietà.

Questi metodi si distinguono per alcuni dettagli:
- `Object.getOwnPropertyNames(obj)` ritorna le chiavi non-symbol.
- `Object.getOwnPropertySymbols(obj)` ritorna le chiavi symbol.
- `Object.keys/values()` ritorna coppie keys/values non-symbol, con il flag `enumerable` (i flag  sono state spiegate nell'articolo <info:property-descriptors>).
- `for..in` cicla su chiavi non-symbol, con il flag `enumerable`, ed anche sulle chiavi del prototype.

...Ma tutti questi incominciamo dalla stessa lista.

Nell'esempio sotto, utilizziamo la trappola `ownKeys` per far sì che `for..in` cicli su `user`, `Object.keys` e `Object.values`, saltando le proprietà il cui nome incomincia con un underscore `_`:

```js run
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" filtra _password, saltandolo
for(let key in user) alert(key); // name, then: age

// abbiamo lo stesso effetto in questi meotodi:
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
```

Finora, funziona.

Anche se, nel caso in cui ritornassimo una chiave che non esiste nell'oggetto, `Object.keys` non la elencherà:

```js run
let user = { };

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user) ); // <empty>
```

Perché? La motivazione è semplice: `Object.keys` ritorna solamente le proprietà con il flag `enumerable`. Per verificarlo, invoca il metodo interno `[[GetOwnProperty]]`su ogni proprietà per ottenere [i suoi descrittori](info:property-descriptors). E in questo caso, poiché non ci sono proprietà, i descrittori sono vuoti, non abbiamo alcun flag `enumerable`, quindi questa verrà saltata.

Per far sì che `Object.keys` ritorni una proprietà, è necessario che questa esista nell'oggetto con il flag `enumerable`, oppure possiamo intercettare l'invocazione di `[[GetOwnProperty]]` (tramite la trappola `getOwnPropertyDescriptor`), e ritornare un descrittore con `enumerable: true`.

Qui vediamo un esempio:

```js run
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // invocata una volta per ottenere una lista delle proprietà
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // invocata per ogni proprietà
    return {
      enumerable: true,
      configurable: true
      /* ...altri flag, tra cui "value:..." */
    };
  }

});

alert( Object.keys(user) ); // a, b, c
```

Ripetiamolo una volta ancora: è sufficiente intercettare `[[GetOwnProperty]]` se la proprietà non è presente nell'oggetto.

## Proprietà protette da "deleteProperty" e altre trappole

Esiste una convenzione piuttosto diffusa, in cui le proprietà e i metodi il cui nome ha come suffisso un underscore `_`, sono da considerarsi interne. Non dovrebbero quindi essere accedute dall'esterno dell'oggetto.

Anche se rimane tecnicamente possibile accedervi:

```js run
let user = {
  name: "John",
  _password: "secret"
};

alert(user._password); // secret
```

Possiamo utilizzare un proxy per rendere inaccessibile le proprietà che iniziano con  `_`.

Avremo bisogno delle seguenti trappole:
- `get` per ritornare un errore nel tentativo di accedere a questa proprietà,
- `set` per ritornare un errore nel tentativo di scrittura,
- `deleteProperty` per ritornare un errore nel tentativo di rimozione,
- `ownKeys` per escludere le proprietà che iniziano con `_` da `for..in` ed altri metodi come `Object.keys`.

Vediamo il codice:

```js run
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
*!*
  get(target, prop) {
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
*!*
  set(target, prop, val) { // per intercettare la scrittura delle proprietà
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
*!*
  deleteProperty(target, prop) { // per intercettare la rimozione delle proprietà
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
*!*
  ownKeys(target) { // per intercettare lo scorrimento delle proprietà
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" non consente di leggere _password
try {
  alert(user._password); // Errore: Access denied
} catch(e) { alert(e.message); }

// "set" non consente di scrivere _password
try {
  user._password = "test"; // Errore: Access denied
} catch(e) { alert(e.message); }

// "deleteProperty" non consente di rimuovere _password
try {
  delete user._password; // Errore: Access denied
} catch(e) { alert(e.message); }

// "ownKeys" rimuove _password dal ciclo
for(let key in user) alert(key); // name
```

Da notare un dettaglio importante nella trappola `get`, nella riga `(*)`:

```js
get(target, prop) {
  // ...
  let value = target[prop];
*!*
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
*/!*
}
```

Perché abbiamo bisogno di una funzione per invocare `value.bind(target)`?

La motivazione è che i metodi dell'oggetto, come `user.checkPassword()`, devono essere in grado di accedere a `_password`:

```js
user = {
  // ...
  checkPassword(value) {
    // i metodi dell'oggetto devono essere in grado di leggere _password
    return value === this._password;
  }
}
```


Un'invocazione di `user.checkPassword()` passerà al proxy `user` come `this` (l'oggetto prima del punto diventa `this`), quindi quando proverà ad accedere a `this._password`, la trappola `get` si attiverà (viene innescata alla lettura di qualsiasi proprietà) e genererà un errore.

Quindi leghiamo il contesto dei metodi dell'oggetto all'oggetto originale, `target`, alla riga `(*)`. Le future invocazioni utilizzeranno `target` come `this`, senza alcuna trappola.

Questa soluzione solitamente funziona, ma non è ideale, poiché un metodo potrebbe passare l'oggetto senza proxy ovunque, e a quel punto faremmo un errore: dov'è l'oggetto originale, e dov'è quello con il proxy?

Oltretutto, un oggetto potrebbe essere racchiuso in più proxy (più proxy potrebbero aggiungere diverse funzionalità all'oggetto), e nel caso in cui passassimo un oggetto senza proxy ad un metodo, potremmo incorrere in conseguenze inaspettate.

Quindi, un proxy del genere non dovrebbe essere utilizzato ovunque.

```smart header="Proprietà private di una classe"
I motori JavaScript moderni offrono un supporto nativo per le proprietà private nelle classi, aggiungendo il prefisso `#`. Questi sono descritti nell'articolo <info:private-protected-properties-methods>. Non è richiesto alcun proxy.

Anche se questo genere di proprietà hanno i loro problemi. In particolare, questi non vengono ereditati.
```

## "In range" con la trappola "has"

Vediamo altri esempi.

Abbiamo un oggetto `range`:

```js
let range = {
  start: 1,
  end: 10
};
```

Vorremmo usare l'operatore `in` per verificare che un numero appartenga al `range`.

La trappola `has` intercetta le invocazioni di `in`.

`has(target, property)`

- `target` -- è l'oggetto target, passato come primo argomento in `new Proxy`,
- `property` -- nome della proprietà

Qui vediamo la demo:

```js run
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
*!*
  has(target, prop) {
*/!*
    return prop >= target.start && prop <= target.end;
  }
});

*!*
alert(5 in range); // true
alert(50 in range); // false
*/!*
```

Semplice zucchero sintattico, vero? Molto semplice da implementare.

## Wrapping con funzioni: "apply" [#proxy-apply]

Possiamo costruire un proxy anche per funzioni.

La trappola `apply(target, thisArg, args)` gestisce l'invocazione di un proxy come funzione:

- `target` è l'oggetto target (le funzioni sono oggetti in JavaScript),
- `thisArg` è il valore di `this`.
- `args` è la lista degli argomenti.

Ad esempio, il decorator `delay(f, ms)`, che abbiamo sviluppato nell'articolo <info:call-apply-decorators>.

In quell'articolo lo abbiamo fatto senza proxy. Un'invocazione di `delay(f, ms)` ritornava una funzione che inoltra le chiamate di `f` dopo `ms` millisecondi.

Qui vediamo la precedente implementazione, basata sulla funzione:

```js run
function delay(f, ms) {
  // ritorna un wrapper che invoca f dopo il timeout
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// dopo il wrapping, le invocazion di sayHi verranno ritardate di 3 secondi
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (dopo 3 secondi)
```

Come abbiamo già visto, questo approccio funziona. La funzione wrapper `(*)` esegue l'invocazione dopo il timeout.

Ma una funzione wrapper non esegue l'inoltro delle operazioni di lettura/scrittura o altro di simile. Dopo il wrapping, l'accesso alle proprietà della funzione originale è perso, come `name`, `length` e altri:

```js run
function delay(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

*!*
alert(sayHi.length); // 1 (la lunghezza della funzione è il numero degli argomenti nella sua dichiarazione)
*/!*

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 0 (nella dichiarazione del wrapper, ci sono zero argomenti)
*/!*
```

Il `proxy` è molto più potente, poiché inoltra tutto all'oggetto target.

Utilizziamo il `Proxy` piuttosto della funzione di wrapping:

```js run
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 1 (*) il proxy inoltra l'operazione "get length" all'oggetto target
*/!*

sayHi("John"); // Hello, John! (after 3 seconds)
```

Il risultato è lo stesso, ma ora non viene inoltrata solamente l'invocazione, anche tutte le altre operazioni sul proxy vengono inoltrate alla funzione originale. Quindi `sayHi.length` viene ritornato correttamente dopo il wrapping alla riga `(*)`.

Abbiamo ottenuto un wrapper più "ricco".

Esistono altre trappole: la lista completa la puoi trovare all'inizio di questo articolo. Il loro utilizzo è molto simile a quanto spiegato sopra.

## Reflect

`Reflect` è un oggetto integrato che semplifica la creazione di `Proxy`.

Come detto in precedenza, i metodi interni, come `[[Get]]`, `[[Set]]` e altri, esistono solamente nelle specifiche, non possono essere invocati direttamente.

L'oggetto `Reflect` lo rende in qualche modo possibile. I suoi metodi sono wrapper dei metodi interni.

Qui vediamo degli esempi di operazioni e invocazioni di `Reflect` che fanno questo:

| Operazione |  invocazione `Reflect` | Metodo interno |
|-----------------|----------------|-------------|
| `obj[prop]` | `Reflect.get(obj, prop)` | `[[Get]]` |
| `obj[prop] = value` | `Reflect.set(obj, prop, value)` | `[[Set]]` |
| `delete obj[prop]` | `Reflect.deleteProperty(obj, prop)` | `[[Delete]]` |
| `new F(value)` | `Reflect.construct(F, value)` | `[[Construct]]` |
| ... | ... | ... |

Ad esempio:

```js run
let user = {};

Reflect.set(user, 'name', 'John');

alert(user.name); // John
```

In particolare, `Reflect` ci consente di invocare operatori (`new`, `delete`...) come funzioni (`Reflect.construct`, `Reflect.deleteProperty`, ...). Questa è una caratteristica interessante, ma qui vediamo un'altra cosa molto importante.

**Per ogni metodo interno a cui possiamo aggiungere una trappola con il `Proxy`, abbiamo un metodo corrispondente in `Reflect`, con lo stesso nome e gli stessi argomenti della trappola `Proxy`.**

Quindi possiamo utilizzare `Reflect` per inoltrare un'operazione all'oggetto originale.

In questo esempio, entrambe le trappole `get` e `set` inoltrano in maniera trasparente (come se non esistessero) le operazioni di lettura/scrittura all'oggetto, mostrando un messaggio:

```js run
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
*!*
    return Reflect.get(target, prop, receiver); // (1)
*/!*
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
*!*
    return Reflect.set(target, prop, val, receiver); // (2)
*/!*
  }
});

let name = user.name; // mostra "GET name"
user.name = "Pete"; // mostra "SET name=Pete"
```

Qui:

- `Reflect.get` legge una proprietà di un oggetto.
- `Reflect.set` scrive una proprietà di un oggetto e ritorna `true` se questa ha successo, `false` altrimenti.

Questo è tutto, piuttosto semplice: se una trappola vuole inoltrare l'invocazione all'oggetto, è sufficiente invocare `Reflect.<method>` con gli stessi argomenti.

In molti casi possiamo ottenere lo stesso risultato senza `Reflect`, ad esempio la lettura di una proprietà `Reflect.get(target, prop, receiver)` può essere sostituita da `target[prop]`. Ci sono però delle sfumature importanti.

### Creare un proxy per un getter

Vediamo un esempio che dimostra perché `Reflect.get` è migliore. E vedremo anche perché `get/set` possiede il terzo argomento `receiver`, che non abbiamo utilizzato finora.

Abbiamo un oggetto `user` con la proprietà `_name` ed il relativo getter.

Costruiamo un proxy:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

*!*
let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  }
});
*/!*

alert(userProxy.name); // Guest
```

La trappola `get` è "trasparente" in questo caso, ritorna la proprietà originale e non fa nient'altro. Questo è sufficiente per il nostro esempio.

Tutto sembra funzionare correttamente. Ma rendiamo l'esempio leggermente più complesso.

Dopo aver ereditato con un oggetto `admin` da `user`, possiamo osservare un comportamento non corretto:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

*!*
let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// Risultato atteso: Admin
alert(admin.name); // outputs: Guest (?!?)
*/!*
```

La lettura di `admin.name` dovrebbe ritornare `"Admin"`, non `"Guest"`!

Qual'è il problema? Magari abbiamo sbagliato qualcosa con l'ereditarietà?

Ma se rimuoviamo il proxy, tutto funziona correttamente.

Il problema sta quindi nel proxy, alla riga `(*)`.

1. Quando leggiamo `admin.name`, poiché l'oggetto `admin` non possiede questa proprietà, la ricerca prosegue nel suo  prototype.
2. Il prototype è `userProxy`.
3. Durante la lettura della proprietà `name` dal proxy, la trappola `get` viene innescata e ritorna la proprietà dell'oggetto originale `target[prop]` alla riga `(*)`.

    Un'invocazione di `target[prop]`, nel caso in cui `prop` sia un getter, ne esegue il codice con contesto `this=target`. Quindi il risultato sarà `this._name` dell'oggetto `target`, quindi: da `user`.

Per evitare questo, abbiamo bisogno di `receiver`, il terzo argomento della trappola `get`. Questo fa riferimento al `this` corretto, quello che deve essere passato al getter. Nel nostro caso `admin`.

Come possiamo passare il contesto per un getter? Per una funzione regolare potremmo usare `call/apply`, ma questo è un getter, non viene "invocato", ma vi si accede semplicemente.

`Reflect.get` fa al caso nostro. Tutto funzionerà correttamente se ne facciamo uso.

Vediamo la variante corretta:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
*!*
    return Reflect.get(target, prop, receiver); // (*)
*/!*
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

*!*
alert(admin.name); // Admin
*/!*
```

Ora `receiver` fa riferimento al `this` corretto (cioè `admin`), e verrà passato al getter utilizzando `Reflect.get`, come in riga `(*)`.

Possiamo riscrivere la trappola in maniera ancora più breve:

```js
get(target, prop, receiver) {
  return Reflect.get(*!*...arguments*/!*);
}
```


Le funzioni `reflect` hanno lo stesso nome delle trappole ed accettano gli stessi argomenti. Sono stati progettati in questo modo.

Quindi, `return Reflect...` è un modo sicuro e semplice per inoltrare le operazioni ed essere sicuri di non dimenticarci nulla.

## Limitazioni del proxy

I proxy forniscono un modo unico per alterare o aggirare il comportamento a basso livello degli oggetti esistenti. Non è comunque perfetto. Ha delle limitazioni.

### Oggetti integrati: slot interni

Molti oggetti integrati, ad esempio `Map`, `Set`, `Date`, `Promise` e altri, fanno uso dei così detti "internal slots".

Questi sono come le proprietà, ma sono riservati ad usi interni, fanno parte solamente delle specifiche. Ad esempio, `Map` memorizza gli elementi nello slot interno `[[MapData]]`. I metodi integrati accedono direttamente a questi, non utilizzano i metodi `[[Get]]/[[Set]]`. Quini `Proxy` non potrà intercettarli.

Perché questo ha importanza? Sono comunque entità interne!

Non proprio, vediamo qual'è il problema. Dopo aver creato un proxy per un oggetto integrato, il proxy non avrà questi slot interni, quindi i metodi integrati falliranno.

Ad esempio:

```js run
let map = new Map();

let proxy = new Proxy(map, {});

*!*
proxy.set('test', 1); // Errore
*/!*
```

Internamente, una `Map` memorizza i suoi dati nello slot `[[MapData]]`. Il proxy non possiede questo slot. Il [metodo integrato `Map.prototype.set`](https://tc39.es/ecma262/#sec-map.prototype.set) prova ad accedere alla proprietà interna `this.[[MapData]]`, ma poiché `this=proxy`, non la trova nel `proxy` e fallisce.

Fortunatamente, esiste un modo per evitare questo:

```js run
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
*!*
    return typeof value == 'function' ? value.bind(target) : value;
*/!*
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (funziona!)
```

Ora funziona senza problemi, poiché la trappola `get` si lega alle proprietà della funzione, come `map.set`, per ottenere l'oggetto target (`map`) stesso.

A differenza dell'esempio precedente, il valore di `this` all'interno di `proxy.set(...)` non sarà `proxy`, ma piuttosto l'oggetto originale `map`. Quindi quando l'implementazione interna di `set` proverà ad accedere allo slot interno `this.[[MapData]]`, l'operazione avverrà con successo.

```smart header="`Array` non possiede slot interni"
Un'eccezione degna di nota: l'oggetto integrato `Array` non utilizza slot interni. Questo per ragioni storiche, poiché esistono da molto tempo.

Quindi non avremo nessun problema nel creare proxy per un array.
```

### Campi privati

Un comportamento simile avviene con i campi privati di una classe.

Ad esempio, il metodo `getName()` accede alla proprietà privata `#name` e comporta il fallimento del proxy:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

*!*
alert(user.getName()); // Errore
*/!*
```

La motivazione è che i campi privati sono implementati utilizzando gli slot interni. JavaScript non utilizza `[[Get]]/[[Set]]` per accedervi.

Nell'invocazione `getName()` il valore di `this` è il proxy di `user`, e questo non possiede lo slot interno con i campi privati.

Nuovamente, la soluzione di legare il metodo è corretta anche in questo caso:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest
```

Detto questo, la soluzione avrà degli svantaggi, come spiegato in precedenza: espone l'oggetto originale al metodo, consentendo, potenzialmente, che questo venga passato ulteriormente rompendo la funzionalità avvolta nel proxy.

### Proxy != target

Il proxy e l'oggetto originale sono due oggetti differenti. Normale, giusto?

Quindi se utilizziamo l'oggetto originale come chiave, e successivamente ne creiamo un proxy, allora il proxy non sarà accessibile:

```js run
let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

*!*
alert(allUsers.has(user)); // false
*/!*
```

Come possiamo vedere, dopo aver aggiunto il proxy, non riusciamo ad accedere a `user` con il setter `allUsers`, poiché il proxy è un oggetto differente.

```warn header="I proxy non possono intercettare un test di uguaglianza stretta `===`"
I proxy possono intercettare molti operatori, come `new` (con `construct`), `in` (con `has`), `delete` (con `deleteProperty`) e così via.

Ma non esiste alcun modo per poter intercettare un test di uguaglianza stretta tra oggetti. Un oggetto è strettamente uguale solamente a se stesso, e a nient'altro.

Quindi tutte le operazioni ed le classi integrate che verificano l'uguaglianza tra oggetti differenzieranno l'oggetto dal suo proxy. Non c'è alcun sistema di sostituzione "trasparente" in questo caso.
```

## Proxy revocabili

Un proxy *revocabile* è un proxy che può essere disabilitato.

Ipotizziamo di avere una risorsa, di cui vorremmo poter bloccare gli accessi in qualsiasi momento.

Quello che possiamo fare è creare un proxy *revocabile*, senza alcuna trappola. Un proxy di questo tipo inoltrerà tutte le operazioni all'oggetto originale, e possiamo disabilitarlo in ogni momento.

La sintassi da utilizzare è la seguente:

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

L'invocazione ritorna un oggetto con le funzioni `proxy` e `revoke` per disabilitarlo.

Vediamo un esempio:

```js run
let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// passiamo il proxy da qualche parte, piuttosto dell'oggetto...
alert(proxy.data); // Dati preziosi

// più tardi nel nostro codice
revoke();

// il proxy non funzionerà più (revocato)
alert(proxy.data); // Errore
```

L'invocazione di `revoke()` rimuove dal proxy tutti i referimenti interni all'oggetto, quindi questi non risulteranno essere più connessi.

Inizialmente, `revoke`  è separato da `proxy`, in questo modo possiamo passare il `proxy` in giro, mantenendo il `revoke` nello scope attuale.

Possiamo anche legare il metodo `revoke` al proxy, impostando `proxy.revoke = revoke`.

Un'altra opzione è quella di creare una `WeakMap` che possiede il `proxy` come chiave e il corrispondente `revoke` come valore; questo consente di trovare facilmente il `revoke` per un proxy:

```js run
*!*
let revokes = new WeakMap();
*/!*

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..da qualche altra parte nel nostro codice..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Errore (revocato)
```

In questo caso utilizziamo una `WeakMap` piuttosto di `Map` di modo che non blocchi il processo di garbage collection. Se un proxy diventa "irraggiungibile" (e.g. nessuna variabile fa riferimento ad esso), `WeakMap` consente di rimuoverlo dalla memoria insieme al relativo `revoke` che non sarà più necessario.

## Riferimenti

- Specifiche: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots).
- MDN: [Proxy](mdn:/JavaScript/Reference/Global_Objects/Proxy).

## Riepilogo

Il `Proxy` è un contenitore per un oggetto, che inoltra tutte le operazioni su di esso all'oggetto originale, e consente di definire delle "trappole" per determinate operazioni.

E' possibile creare un proxy per qualsiasi tipo di oggetto, incluse le classi e le funzioni.

La sintassi da utilizzare è la seguente:

```js
let proxy = new Proxy(target, {
  /* trappole */
});
```

...Successivamente, dovremmo utilizzare il `proxy` ovunque, ed evitare l'utilizzo di `target`. Un proxy non possiede proprietà o metodi propri. Si occupa di intercettare le operazioni (se sono definite le relative trappole), altrimenti le inoltra all'oggetto `target`.

Possiamo intercettare:
- Lettura (`get`), scrittura (`set`), rimozione (`deleteProperty`) di una proprietà (anche di quelle non esistenti).
- Invocazione di funzione (trappola `apply`).
- Operatore `new` (trappola `construct`).
- Molte altre operazioni (puoi trovare la lista completa a inizio articolo e nella [documentazione](mdn:/JavaScript/Reference/Global_Objects/Proxy)).

Questo ci consente di creare proprietà e metodi "virtuali", implementare valori di default, oggetti observables, decorators e molto altro.

Possiamo anche costruire proxy multipli di un oggetto, decorandolo con diverse funzionalità.

L'API [Reflect](mdn:/JavaScript/Reference/Global_Objects/Reflect) è stata progettata per completare l'utilizzo dei [Proxy](mdn:/JavaScript/Reference/Global_Objects/Proxy). Per ogni trappola `Proxy`, esiste un'invocazione di `Reflect` con gli stessi argomenti. Possiamo utilizzarlo per inoltrare le invocazioni agli oggetti target.

I proxy hanno però delle limitazioni:

- Gli oggetti integrati possiedono degli "slot interni", ma l'accesso a questi non può essere intercettato dai proxy. Guardate il workaround descritto sopra.
- Lo stesso vale per i campi privati delle classi; questi vengono implementati internamente utilizzando gli slot. Quindi le invocazioni dei metodi tramite proxy devono possedere il target object assegnato a `this` per potervi accedere.
- I test di uguaglianza `===` non possono essere intercettati.
- Performance: i benchmark dipendono molto dal motore JavaScript, ma generalmente l'accesso alle proprietà utilizzando un proxy, richiede più tempo. Anche se, nella pratica, questo ha importanza solo per oggetti che creano "colli di bottiglia".
