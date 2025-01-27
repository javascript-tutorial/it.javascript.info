libs:
  - lodash

---

# Function binding

Quando passiamo i metodi di un oggetto tramite callback, ad esempio con `setTimeout`, c'è un problema ben conosciuto: "la perdita di `this`".

In questo capitolo vedremo i modi per risolverlo.

## "this" perso

Abbiamo già visto esempi di `this` perso. Quando un metodo viene passato separatamente dall'oggetto che lo contiene -- `this` viene perso.

Ecco quello che accade con `setTimeout`:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

Come possiamo vedere, l'output non mostra "John" come `this.firstName`, ma `undefined`!

Questo perché `setTimeout` ha ricevuto `user.sayHi` separatamente dall'oggetto. L'ultima riga può essere riscritta così:

```js
let f = user.sayHi;
setTimeout(f, 1000); // il contesto user è stato perso
```

Nei browser, il metodo `setTimeout` è un po' speciale: per la chiamata della funzione imposta `this=window` (in Node.js, invece, `this` è l'oggetto timer, ma qui non ci interessa). Quindi per `this.firstName` prova a recuperare `window.firstName`, il quale non esiste. In altri casi simili, di solito `this` diventa semplicemente `undefined`.

Il problema è abbastanza tipico: vogliamo passare un metodo di un oggetto da qualche parte (qui, allo scheduler), dove verrà chiamato. Come assicurarsi che venga chiamato nel giusto contesto?

## Soluzione 1: un wrapper

La soluzione più semplice consiste nell'usare una funzione wrapper:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

Ora funziona, perché riceve `user` dal *lexical environment* esterno, e quindi chiama il metodo normalmente.

Lo stesso, ma più conciso:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Sembra ok, ma nella struttura del nostro codice appare una piccola vulnerabilità.

Cosa succederebbe se prima che `setTimeout` "scada" (c'è un secondo di ritardo!) `user` cambiasse valore? All'improvviso ci ritroveremmo con l'oggetto sbagliato!


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...il valore di user cambia entro 1 secondo
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Un altro user in setTimeout!
```

La prossima soluzione garantisce che questo genere di cose non accada.

## Soluzione 2: bind

Function fornisce il metodo nativo [bind](mdn:js/Function/bind) che permette di "fissare" `this`.

La sintassi di base è la seguente:

```js
// più avanti vedremo una sintassi più complessa
let boundFunc = func.bind(context);
```

Il risultato di `func.bind(context)` è un "exotic object", una particolare funzione richiamabile come una normale funzione e che passa in maniera trasparente la chiamata a `func` impostando `this=context`.

In altre parole, chiamare `boundFunc` è come chiamare `func` con `this` fisso.

Ad esempio, qui `funcUser` passa la chiamata a `func` con `this=user`:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

Qui `func.bind(user)` è come una "variante" di `func`, con `this=user` fisso.

Tutti gli argomenti vengono passati così come sono a `func` originale, ad esempio:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// bind this a user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (l'argomento "Hello" viene passato, e this=user)
*/!*
```

Ora proviamo con il metodo di un oggetto:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

// puo' funzionare senza un oggetto
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// anche se il valore di user cambia entro 1 secondo
// sayHi utilizza il valore pre-associato che fa riferimento al vecchio oggetto user
user = {
  sayHi() { alert("Un utente differente in setTimeout!"); }
};
```

Alla linea `(*)` prendiamo il metodo `user.sayHi` e lo leghiamo a `user`. `sayHi` è una funzione "associata", che può essere chiamata da sola, o passata a `setTimeout` -- non importa, il contesto sarà sempre esatto.

Qui possiamo vedere che gli argomenti vengono passati "così come sono", solo `this` viene fissato da `bind`:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John (l'argomento "Hello" viene passato a say)
say("Bye"); // Bye, John ("Bye" viene passato a say)
```

````smart header="Un metodo comodo: `bindAll`"
Se un oggetto possiede molti metodi che abbiamo bisogno di passare, allora potremmo eseguire un ciclo per usare `bind` su tutti:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

<<<<<<< HEAD
Alcune librerie JavaScript forniscono utili funzioni per il *binding* di massa, ad esempio [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) in lodash.
=======
JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(object, methodNames)](https://lodash.com/docs#bindAll) in lodash.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

## Funzioni parziali

Finora abbiamo solo parlato di come legare `this`. Portiamo il concetto ad un livello successivo.

Possiamo legare non solo `this`, ma anche argomenti. Questo viene fatto raramente, ma a volte può rivelarsi utile.

La sintassi completa di `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

Questo permette di legare alla funzione un contesto come `this`, e degli argomenti di partenza.

Ad esempio, abbiamo la funzione di moltiplicazione `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Usiamo `bind` per creare una funzione `double` che si basi su di essa:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```
La chiamata a `mul.bind(null, 2)` crea una nuova funzione `double` che passa la chiamata a `mul`, fissa `null` come contesto e `2` come primo argomento. I seguenti argomenti vengono passati "così come sono".

Questa pratica è chiamata "applicazione parziale di funzione" [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- creiamo una nuova funzione fissando alcuni parametri di quella esistente.

Nota che in realtà qui non usiamo `this`, ma `bind` lo richiede, quindi dobbiamo mettere al suo posto qualcosa tipo `null`.

La funzione `triple` nel codice che segue, triplica il valore:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Perché dovremmo aver bisogno di una funzione parziale?

Il vantaggio è che possiamo creare una funzione indipendente con un nome leggibile (`double`,` triple`). Possiamo usarla senza fornire tutte le volte il primo argomento, poiché è stato associato con `bind`.

In altri casi, l'applicazione parziale è utile quando abbiamo una funzione molto generica e per comodità ne vogliamo una variante meno universale.

Ad esempio, abbiamo una funzione `send(from, to, text)`. Ma nell'oggetto `user` potremmo volerne usare una parziale variante: `sendTo(to, text)` che invia dallo user corrente.

## Utilizzo parziale senza contesto

E se volessimo fissare alcuni argomenti, ma non il contesto `this`? Ad esempio, per un metodo in un oggetto.

Il `bind` nativo non lo permette. Non possiamo semplicemente omettere il contesto e saltare agli argomenti.

Fortunatamente una funzione `partial` per legare solo gli argomenti, può essere implementata con facilità.

Così:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Uso:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// aggiunge un metodo parziale con un orario fisso
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Qualcosa tipo:
// [10:00] John: Hello!
```

Il risultato della chiamata di `partial(func[, arg1, arg2...])` è un wrapper `(*)` che chiama `func` con:
- Lo stesso `this` (per la chiamata di `user.sayNow` è `user`)
- quindi passa `...argsBound` -- argomenti dalla chiamata di `partial` (`"10:00"`)
- quindi passa `...args` -- argomenti passati al wrapper (`"Hello"`)

E' molto facile da fare con la sintassi *spread* vero?

Esiste anche un'implementazione già pronta, [_.partial](https://lodash.com/docs#partial) dalla libreria lodash.

## Riepilogo

Il metodo `func.bind(context, ...args)` ritorna una "variante associata" della funzione `func` con il contesto `this` fisso, ed i primi argomenti, se impostati.

Di solito usiamo `bind` per fissare `this` in un metodo di un oggetto, in modo da poterlo passare senza problemi. Ad esempio a `setTimeout`.

Quando leghiamo alcuni argomenti ad una funzione esistente, la funzione risultante (meno universale) è chiamata *parzialmente applicata* o *parziale*.

Le parziali sono utili quando non vogliamo ripetere lo stesso argomento più e più volte. Ad esempio, se abbiamo una funzione `send (from, to)`, e `from` dovrebbe essere sempre lo stesso.
