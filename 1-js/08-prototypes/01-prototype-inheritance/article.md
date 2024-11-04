# Prototypal inheritance

Nella programmazione, spesso vogliamo prendere qualcosa ed estenderla.

Ad esempio, potremmo avere un oggetto `user` con le sue proprietà e i suoi metodi, e voler definire gli oggetti `admin` e `guest` come sue varianti. Vorremmo però poter riutilizzare ciò che abbiamo nell'oggetto `user`, evitando di copiare e reimplementare nuovamente i suoi metodi, quindi vorremmo semplicemente definire un nuovo oggetto a partire da esso.

La *prototypal inheritance* (ereditarietà dei prototype) è una caratteristica del linguaggio che aiuta in questo senso.

## [[Prototype]]

In JavaScript, gli oggetti possiedono una speciale proprietà nascosta `[[Prototype]]` (come definito nella specifica); questo può valere `null` oppure può contenere il riferimento ad un altro oggetto. Quell'oggetto viene definito "prototype" (prototipo):

![prototype](object-prototype-empty.svg)

Quando leggiamo una proprietà da `object`, e questa non esiste, JavaScript prova automaticamente a recuperarla dal suo prototype. In programmazione, questo comportamento viene definito "prototypal inheritance". Presto vederemo diversi esempi di questo tipo di ereditarietà, e vedremo anche delle interessanti caratteristiche del linguaggio basate su di essa. 

La proprietà `[[Prototype]]` è interna e nascosta, ma esistono diversi modi per poterla impostare.

Uno di questi è quello di utilizzare la nomenclatura speciale `__proto__`:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // imposta il prototype di rabbit,.[[Prototype]] = animal
*/!*
```

Ora se proviamo a leggere una proprietà da `rabbit`, e questa risulta essere mancante, JavaScript andrà a prenderla automaticamente da `animal`.

Ad esempio:

```js
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// ora in rabbit possiamo trovare entrambe le proprietà
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

Nell'esempio la linea `(*)` imposta `animal` come prototype di `rabbit`.

Successivamente, quando `alert` proverà a leggere la proprietà `rabbit.eats` `(**)`, non la troverà in rabbit, quindi JavaScript seguirà il riferimento in `[[Prototype]]` e la troverà in  `animal` (ricerca dal basso verso l'alto):

![](proto-animal-rabbit.svg)

In questo caso possiamo dire che "`animal` è il prototype di `rabbit`" o, in alternativa, che "`rabbit` *prototypically inherits* (eredità dal prototipo) da `animal`"

Quindi se `animal` possiede molte proprietà e metodi utili, questi saranno automaticamente disponibili in `rabbit`. Queste proprietà vengono definite come "ereditate".

Se abbiamo un metodo in `animal`, possiamo invocarlo anche in `rabbit`:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal walk");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk viene ereditato dal prototype
*!*
rabbit.walk(); // Animal walk
*/!*
```

Il metodo viene preso automaticamente dal prototipo, in questo modo:

![](proto-animal-rabbit-walk.svg)

La catena dei prototype può esser anche più lunga:

```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

// walk viene presa dalla catena di prototype
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (da rabbit)
```

![](proto-animal-rabbit-chain.svg)

Ora, se provassimo a leggere qualcosa da `longEar`, e non esistesse, JavaScript andrebbe a guardare prima in `rabbit`, e poi in `animal`.

Ci sono solamente due limitazioni:

1. Non possono esserci riferimenti circolari. JavaScript restituirebbe un errore se provassimo ad assegnare a `__proto__` un riferimento circolare.
2. Il valore di `__proto__` può essere o un oggetto o `null`. Gli altri valori vengono ignorati.

Inoltre, anche se dovrebbe essere già ovvio: può esserci solamente un `[[Prototype]]`. Un oggetto non può ereditare da più oggetti.

<<<<<<< HEAD

```smart header="`__proto__` è un getter/setter storico per `[[Prototype]]`"
E' un errore comune tra i principianti quello di non conoscere la differenza tra questi due.
=======
```smart header="`__proto__` is a historical getter/setter for `[[Prototype]]`"
It's a common mistake of novice developers not to know the difference between these two.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Da notare che `__proto__` non è *la stessa cosa* della proprietà `[[Prototype]]`. E' solamente un getter/setter per `[[Prototype]]`. Più avanti vedremo alcune situazioni in cui questa differenza avrà importanza, ma per ora tenetelo solo a mente.

La proprietà `__proto__` è leggermente datata. Esiste solamente per ragioni storiche, la versione attuale di JavaScript suggerisce di utilizzare le funzioni `Object.getPrototypeOf/Object.setPrototypeOf` per impostare il prototype. Vedremo meglio queste funzioni più avanti.

Secondo la specifica, `__proto__` deve essere supportato solamente dai browser. In realtà, tutti gli ambienti, inclusi quelli server-side, supportano `__proto__`, quindi il suo utilizzo è piuttosto sicuro.

Poiché la notazione `__proto__` risulta essere più intuitiva, la utilizzeremo nei nostri esempi.
```

## La scrittura non utilizza prototype

Il prototype viene utilizzato solamente per la lettura delle proprietà.

Le operazioni di scrittura/rimozione utilizzano direttamente l'oggetto.

Nell'esempio che vediamo sotto, assegniamo un metodo `walk` a `rabbit`, che sarà solo suo:

```js run
let animal = {
  eats: true,
  walk() {
    /* questo metodo non verrà utilizzato da rabbit */
  }
};

let rabbit = {
  __proto__: animal
};

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```

Da questo punto in poi, la chiamata `rabbit.walk()` troverà il metodo direttamente nell'oggetto e lo eseguirà, senza utilizzare il prototype:

![](proto-animal-rabbit-walk-2.svg)

Le proprietà di accesso sono delle eccezioni, poiché l'assegnazione viene gestita da un setter. Quindi scrivere su una proprietà di questo tipo equivale ad invocare una funzione.

Per questo motivo, `admin.fullName` funziona correttamente nel codice sotto:

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// il setter viene invocato!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper, lo stato di admin è stato modificato
alert(user.fullName); // John Smith, lo stato di user è protetto
```

Nell'esempio, alla linea `(*)` la proprietà `admin.fullName` ha un getter nel prototype `user`, quindi viene invocato. E alla linea `(**)` la proprietà ha un setter nel prototype, che viene quindi invocato.

## Il valore di "this"

Dall'esempio sopra potrebbe sorgere una domanda interessante: qual è il valore di `this` all'interno `set fullName(value)`? Dove vengono scritte le proprietà `this.name` e `this.surname`: in `user` o `admin`?

La risposta è semplice: `this` non viene influenzato dai prototype.

**Non ha importanza dove viene trovato il metodo: nell'oggetto o in un suo prototype. Quando invochiamo un metodo, `this` fa sempre riferimento all'oggetto che precede il punto.**

Quindi, l'invocazione del setter `admin.fullName=` utilizza `admin` come `this`, non `user`.

Questo è molto importante, poiché potremmo avere un oggetto molto grande con molti metodi, e avere diversi oggetti che ereditano da esso. Quando gli oggetti che ereditano eseguono un metodo ereditato, andranno a modificare solamente il loro stato, non quello dell'oggetto principale da cui ereditano.

Ad esempio, qui `animal` rappresenta un "archivio di metodi", che `rabbit` utilizza.

La chiamata `rabbit.sleep()` imposta `this.isSleeping` nell'oggetto `rabbit`:

```js run
// animal possiede dei metodi
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// modifica rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (non esiste questa proprietà nel prototype)
```

Il risultato:

![](proto-animal-rabbit-walk-3.svg)

Se avessimo altri oggetti, come `bird`, `snake`, etc., che ereditano da `animal`, avrebbero a loro volta accesso ai metodi di `animal`. In ogni caso, `this` all'interno della chiamata farebbe riferimento all'oggetto corrispondente, che viene valutato al momento dell'invocazione (appena prima del punto), e non ad `animal`. Quindi quando scriviamo dati utilizzando `this`, questi verranno memorizzati nell'oggetto corrispondente.

Come risultato i metodi sono condivisi, mentre lo stato degli oggetti non lo è.

## Il ciclo for..in

Il ciclo `for..in` itera anche le proprietà ereditate.

Ad esempio:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// Object.keys ritorna solamente le chiavi
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// il ciclo for..in itera sia le proprietà di rabbit, che quelle ereditate da animal
for(let prop in rabbit) alert(prop); // jumps, then eats
*/!*
```

Se questo non è ciò che ci aspettiamo, e vogliamo escludere le proprietà ereditate, esiste un metodo integrato [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): ritorna `true` se `obj` possiede la propria proprietà `key` (non ereditata).

Quindi possiamo filtrare le proprietà ereditate (o farci qualcos'altro):

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}
```

Qui abbiamo la seguente catena di ereditarietà: `rabbit` eredita da `animal`, che eredita da `Object.prototype` (poiché `animal` è un *literal objects* `{...}`), e infine `null`:

![](rabbit-animal-object.svg)

Da notare, c'è una cosa divertente. Da dove arriva il metodo `rabbit.hasOwnProperty`? Noi non lo abbiamo mai definito. Osservando la catena ci accorgiamo che il metodo viene fornito da `Object.prototype.hasOwnProperty`. In altre parole, è ereditato.

...Ma perché `hasOwnProperty` non appare nel ciclo `for..in` come `eats` e `jumps`, se `for..in` elenca tutte le proprietà ereditate?

La risposta è semplice: la proprietà è *non enumerable*. Come tutte le altre proprietà di `Object.prototype`, possiedono la flag `enumerable:false`. Quindi `for..in` elenca solamente le proprietà enumerable. Questo è il motivo per cui le proprietà di `Object.prototype` non vengono elencate.

```smart header="Quasi tutti gli altri metodi getter key-value ignorano le proprietà ereditate"
Quasi tutti gli altri metodi getter key-value, come `Object.keys`, `Object.values` e cosi via, ignorano le proprietà ereditate.

Questi metodi lavorano solamente sull'oggetto stesso. Le proprietà di prototype *non* vengono prese in considerazione.
```

## Riepilogo

- In JavaScript, tutti gli oggetti possiedono una proprietà nascosta `[[Prototype]]` che può essere il riferimento ad un altro oggetto, oppure `null`.
- Possiamo utilizzare `obj.__proto__` per accedervi (una proprietà getter/setter storica, ci sono altri modi che vederemo presto).
- L'oggetto a cui fa riferimento `[[Prototype]]` viene chiamato "prototype".
- Se vogliamo leggere una proprietà di `obj` o invocare un metodo, ma questo non esiste, allora JavaScript andrà a cercarlo nel prototype.
- Le operazioni di scrittura/rimozione agiscono direttamente sull'oggetto, non utilizzano il prototype (assumendo che questa sia una proprietà e non un setter).
- Se invochiamo `obj.method()`, e il `method` viene prelevato dal prototype, `this` farà comunque riferimento a `obj`. Quindi i metodi lavoreranno sempre con l'oggetto corrente, anche se questi sono ereditati.
- Il ciclo `for..in` itera sia le proprietà dell'oggetto che quelle ereditate. Tutti gli altri metodi di tipo getter key/value operano solamente sull'oggetto stesso.
