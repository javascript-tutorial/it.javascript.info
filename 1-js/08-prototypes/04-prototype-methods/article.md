
# Metodi di prototype, objects senza __proto__

Nel primo capitolo di questa sezione, abbiamo menzionato il fatto che esistono metodi piu moderni per impostare il prototype.

<<<<<<< HEAD
La proprietà `__proto__` viene considerata datata, e in un certo senso anche deprecata (negli standard JavaScript per i browser).

Alcuni dei metodi più moderni sono:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- crea un oggetto vuoto, impostando il `proto` come `[[Prototype]]` e dei descrittori di proprietà opzionali.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- ritorna il `[[Prototype]]` di `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- imposta il `[[Prototype]]` di `obj` a `proto`.

Questi metodi dovrebbero sempre essere preferiti a `__proto__`.
=======
Setting or reading the prototype with `obj.__proto__` is considered outdated and somewhat deprecated (moved to the so-called "Annex B" of the JavaScript standard, meant for browsers only).

The modern methods to get/set a prototype are:

- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto`.

The only usage of `__proto__`, that's not frowned upon, is as a property when creating a new object: `{ __proto__: ... }`.

Although, there's a special method for this too:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio:

```js run
let animal = {
  eats: true
};

// creiamo un nuovo oggetto con animal come prototype
*!*
let rabbit = Object.create(animal); // same as {__proto__: animal}
*/!*

alert(rabbit.eats); // true

*!*
alert(Object.getPrototypeOf(rabbit) === animal); // true
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // cambia il prototype di rabbit a {}
*/!*
```

<<<<<<< HEAD
`Object.create` supporta un secondo argomento opzionale: il property descriptors (descrittori di proprietà). Possiamo fornire proprietà aggiuntive al nuovo oggetto, in questo modo:
=======
The `Object.create` method is a bit more powerful, as it has an optional second argument: property descriptors.

We can provide additional properties to the new object there, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

I descrittori vanno forniti nel formato descritto nel capitolo <info:property-descriptors>.

Possiamo utilizzare `Object.create` per clonare un oggetto in maniera più efficace rispetto al copiare le proprietà con un `for..in`:

```js
let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
```

Questa chiamata crea una copia esatta di `obj`, inculdendo tutte le proprietà: enumerable e non-enumerable, e i relativi setters/getters -- tutto, impostando anche il giusto `[[Prototype]]`.

<<<<<<< HEAD
## Una breve storia

Se contiamo tutti i modi che abbiamo a disposizione per gestire `[[Prototype]]`, questi sono molti! Abbiamo moltissime modalità per fare la stessa cosa!

Perché?
=======

## Brief history

There're so many ways to manage `[[Prototype]]`. How did that happen? Why?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Motivazioni storiche.

<<<<<<< HEAD
- La proprietà `"prototype"` di un costruttore è disponibile fin dai primi tempi in JavaScript.
- Più tardi, nel 2012, è apparso nello standard `Object.create`. Il quale permette di creare oggetti fornendogli un prototype, ma non consente di impostarlo o di ottenerlo. Quindi i browser implementarono il metodo non-standard `__proto__`, come proprietà di accesso per impostare o otternere il prototype in qualsiasi momento.
- Più tardi, nel 2015, `Object.setPrototypeOf` e `Object.getPrototypeOf` vennero aggiunti allo standard, con le stesse funzionalità di `__proto__`. Poiché `__proto__` era di fatto implementato ovunque, entrò in un fase di deprecazione, nella sezione Annex B dello standard, ovvero: opzionale per gli ambienti non-browser.

Ad oggi abbiamo molti metodi a nostra disposizione.

Perché `__proto__` è stato rimpiazzato dalle funzioni `getPrototypeOf/setPrototypeOf`? Questa è una domanda interessante; dobbiamo capire perché l'utilizzo di `__proto__` non è una buona pratica. Continuate a leggere per avere la risposta.
=======
The prototypal inheritance was in the language since its dawn, but the ways to manage it evolved over time.

- The `prototype` property of a constructor function has worked since very ancient times. It's the oldest way to create objects with a given prototype.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. Some browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time, to give more flexibility to developers.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.
- Later, in the year 2022, it was officially allowed to use `__proto__` in object literals `{...}` (moved out of Annex B), but not as a getter/setter `obj.__proto__` (still in Annex B).

Why was `__proto__` replaced by the functions `getPrototypeOf/setPrototypeOf`?

Why was `__proto__` partially rehabilitated and its usage allowed in `{...}`, but not as a getter/setter?

That's an interesting question, requiring us to understand why `__proto__` is bad.

And soon we'll get the answer.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```warn header="Non cambiate il `[[Prototype]]` ad oggetti esistenti se la velocità è importante"
Tecnicamente, possiamo impostare/ottenere il `[[Prototype]]` in qualsiasi momento. Ma solitamente lo impostiamo in fase di creazione dell'oggetto e successivamente non lo modifichiamo più: `rabbit` eredita da `animal`, e questo non dovrebbe cambiare.

I motori JavaScript sono altamente ottimizzati per questo. Cambiare il prototype durante l'esecuzione, con `Object.setPrototypeOf` o `obj.__proto__=` è un operazione molto lenta, poiché vanifica le ottimizzazioni interne fatte per le operazioni di accesso alle proprietà. Quindi evitate questa pratica, a meno che non siate consci di ciò che state facendo, e la velocità di esecuzione non è un problema per voi.
```

## "Very plain" objects [#very-plain]

Come sappiamo, gli oggetti possono essere utilizzati come un array associativo per memorizzare coppie chiave/valore.

...Ma se proviamo a memorizzare chiavi *fornite dall'utente* (ad esempio, un dizionario con vocaboli forniti dall'utente), noteremo un piccolo bug: tutte le chiavi funzioneranno senza problemi, ad eccezione di `"__proto__"`.

Vediamo un esempio:

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], non "some value"!
```

<<<<<<< HEAD
In questo esempio, se l'utente digita `__proto__`, l'assegnazione è ignorata!

Questo non dovrebbe sorprenderci. La proprietà `__proto__` è speciale: deve contenere un oggetto o `null`. Una stringa non può fungere da prototype.
=======
Here, if the user types in `__proto__`, the assignment in line 4 is ignored!

That could surely be surprising for a non-developer, but pretty understandable for us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype. That's why an assignment a string to `__proto__` is ignored.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ma il nostro *intento* non è quello di implementare questo comportamento, giusto? Vogliamo semplicemente memorizzare una coppia chiave/valore, ma utilizzando come chiave il termine `"__proto__"` questo non viene memorizzato correttamente. Quindi, questo è un bug!

<<<<<<< HEAD
In questo caso le conseguenze non sono così terribili. Ma in altri casi potremmo assegnarli oggetti, andando a modificare il valore del prototype. Risultato: l'esecuzione fallirà in maniera imprevedibile.
=======
Here the consequences are not terrible. But in other cases we may be storing objects instead of strings in `obj`, and then the prototype will indeed be changed. As a result, the execution will go wrong in totally unexpected ways.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ancora peggio -- solitamente gli sviluppatori non pensano affatto a questa eventualità. Questo lo rende un bug veramente difficile da trovare e può portare a diverse vulnerabilità, specialmente se il codice viene eseguito server-side.

<<<<<<< HEAD
Questi comportamenti inaspettati accadono anche se proviamo ad assegnare la chiave `toString`, la quale è una funzione di default, e lo stesso vale per gli altri metodi integrati.
=======
Unexpected things also may happen when assigning to `obj.toString`, as it's a built-in object method.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Come possiamo evitare questo problema?

<<<<<<< HEAD
Come prima cosa, possiamo semplicemente utilizzare `Map` per la memorizzazione dei valori al posto di un oggetto, in questo modo non avremo problemi.

Ma `Object` potrebbe esserci utile, perché i creatori del linguaggio hanno pensato a questo problema molto tempo fa.

`__proto__` non è una proprietà di un oggetto, ma una proprietà di accesso per `Object.prototype`:
=======
First, we can just switch to using `Map` for storage instead of plain objects, then everything's fine:

```js run
let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

alert(map.get(key)); // "some value" (as intended)
```

...But `Object` syntax is often more appealing, as it's more concise.

Fortunately, we *can* use objects, because language creators gave thought to that problem long ago.

As we know, `__proto__` is not a property of an object, but an accessor property of `Object.prototype`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](object-prototype-2.svg)

Quindi, se `obj.__proto__` viene letta o impostata, il corrispondende getter/setter viene chiamato dal suo prototype, il quale legge/imposta il `[[Prototype]]`.

Come detto all'inizio di questa sezione: `__proto__` è un modo per accedere al `[[Prototype]]`, non è il `[[Prototype]]` stesso.

Ora, se il nostro scopo è quello di utilizzare un oggetto come array associativo, e vogliamo evitare questo tipo di problemi, possiamo farlo in questo modo:

```js run
*!*
let obj = Object.create(null);
// or: obj = { __proto__: null }
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)` crea un oggetto vuoto senza un prototype (`[[Prototype]]` vale `null`):

![](object-prototype-null.svg)

Quindi, non si ha alcun getter/setter ereditato per `__proto__`. D'ora in poi verrà trattata come una comune proprietà; l'esempio visto sopra funzionerà senza problemi.

Questo tipo di oggetti vengono chiamati "very plain" ("molto semplici") o "pure dictionary" ("dizionari puri"), poiché sono molto più semplici dei normali plain object `{...}`.

Il lato negativo di questi oggetti è che mancano di tutti i metodi integrati, ad esempio `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (non esiste toString)
```

...Ma questo può andarci bene per gli array associativi.

Da notare che molti dei metodi relativi agli oggetti sono come `Object.something(...)`, ad esempio `Object.keys(obj)` -- non sono contenuti all'interno del prototype, quindi continueranno a funzionare anche con questo tipo di oggetti:


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## Riepilogo

<<<<<<< HEAD
I metodi moderni per impostare e leggere il prototype sono:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- crea un oggetto vuoto utilizzando `proto` come `[[Prototype]]` (può essere anche `null`) e dei property descriptors (descrittori di proprietà).
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- ritorna il `[[Prototype]]` di `obj` (equivale a `__proto__`).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- imposta il `[[Prototype]]` di `obj` a `proto` (equivale a `__proto__`).

La proprietà integrata `__proto__`, utilizzata come getter/setter, non è sicura nel caso in cui volessimo inserire in un oggetto chiavi fornite dall'utente. Un utente potrebbe inserire `"__proto__"` come chiave, che genererebbe un errore; potrebbe non avere gravi conseguenze, ma generalmente non è prevedibile.

Le alternative disponibili sono: usare `Object.create(null)` per creare un "very plain" object, senza `__proto__`, o in alternativa, utilizzare `Map`.

Inoltre, `Object.create` consente di creare una shallow-copy ('copia non profonda') di un oggetto, compresi i suoi property descriptors:
=======
- To create an object with the given prototype, use:

    - literal syntax: `{ __proto__: ... }`, allows to specify multiple properties
    - or [Object.create(proto[, descriptors])](mdn:js/Object/create), allows to specify property descriptors.

    The `Object.create` provides an easy way to shallow-copy an object with all descriptors:

    ```js
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- Modern methods to get/set the prototype are:

<<<<<<< HEAD
Abbiamo anche chiarito che `__proto__` è un getter/setter per `[[Prototype]]` e risiede in `Object.prototype`, proprio come gli altri metodi.

Possiamo creare un oggetto senza prototype utilizzando `Object.create(null)`. Questo tipo di oggetti vengono utilizzati come "puri dizionari", e non causano problemi nel caso in cui venga utilizzata `"__proto__"` come chiave.

Altri metodi:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- ritorna un array di stringhe contenente le proprietà enumerable, i valori e le coppie chaive/valore.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- ritorna un array con tutte le chiavi di tipo Symbol che appartengono all'oggetto.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- ritorna un array di stringhe con tutte le proprietà che appartengono all'oggetto.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- ritorna un array con tutte le chiavi che appartengono all'oggetto.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): ritorna `true` se `obj` possiede una sua chiave `key` (non ereditata).

Tutti i metodi che ritornano le proprietà di un oggetto  (come `Object.keys` e le altre) -- ritornano le proprietà "possedute". Se vogliamo ottenere anche le proprietà ereditate dobbiamo utilizzare un ciclo `for..in`.
=======
    - [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
    - [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

- Getting/setting the prototype using the built-in `__proto__` getter/setter isn't recommended, it's now in the Annex B of the specification.

- We also covered prototype-less objects, created with `Object.create(null)` or `{__proto__: null}`.

    These objects are used as dictionaries, to store any (possibly user-generated) keys.

    Normally, objects inherit built-in methods and `__proto__` getter/setter from `Object.prototype`, making corresponding keys "occupied" and potentially causing side effects. With `null` prototype, objects are truly empty.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
