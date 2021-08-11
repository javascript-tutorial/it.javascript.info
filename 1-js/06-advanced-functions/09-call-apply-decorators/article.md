# *Decorators* e forwarding, call/apply

JavaScript offre una flessibilità eccezionale quando si tratta di funzioni. Possono essere passate, usate come oggetti, ed ora vedremo come inoltrarle (*forward*) e decorarle (*decorate*).

## Caching trasparente

Immaginiamo di avere una funzione `slow(x)` che richiede alla CPU molte risorse, ma i suoi risultati sono stabili. In altre parole, per lo stesso valore di `x` ritorna sempre il medesimo risultato.

Se la funzione viene chiamata spesso, potremmo voler memorizzare nella cache (ricordare) i risultati, per evitare di dedicare tempo extra nel ripetere gli stessi calcoli.

Ma invece di aggiungere quella funzionalità in `slow ()`, andremo a creare una funzione *wrapper* (che incapsula o avvolge), che aggiunge il caching. Come vedremo, ci sono molti vantaggi in questo metodo.

Ecco il codice e la sua descrizione:

```js run
function slow(x) {
  // qui può esserci un duro lavoro per la CPU
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // se questa chiave è già presente in cache
      return cache.get(x); // leggi il risultato
    }

    let result = func(x);  // altrimenti chiama func

    cache.set(x, result);  // e metti in cache (memorizza) il risultato
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1) viene messo in cache
alert( "Again: " + slow(1) ); // lo stesso

alert( slow(2) ); // slow(2) viene messo in cache
alert( "Again: " + slow(2) ); // lo stesso della linea precedente
```

Nel codice precedente `cachingDecorator` è un *decorator*: una speciale funzione che prende come argomento un'altra funzione e ne altera il comportamento.

L'idea è quella di poter chiamare `cachingDecorator` con qualsiasi funzione per applicare la funzionalità di *caching*. È fantastico, perché in questo modo possiamo avere molte funzioni che utilizzano tale caratteristica, e tutto ciò che dobbiamo fare è applicare ad esse `cachingDecorator`.

Separando la funzionalità di caching dalla funzione principale abbiamo anche il vantaggio di mantenere il codice semplice.

Il risultato di `cachingDecorator(func)` è un "involucro" (*wrapper*): `function(x)` che "incapsula" (*wraps*) la chiamata di `func(x)` nella logica di caching:

![](decorator-makecaching-wrapper.svg)

Per un codice esterno, la funzione "incapsulata" `slow` continua a fare la stessa cosa. Ma, in aggiunta al suo comportamento, ha ricevuto la funzionalità di caching.

Per riassumere, ci sono diversi vantaggi nell'usare separatamente `cachingDecorator` invece di modificare direttamente il codice di` slow`:

- Il *decorator* `cachingDecorator` è riutilizzabile, possiamo applicarlo ad altre funzioni.
- La logica di cache è separata, non aumenta la complessità della funzione `slow`.
- In caso di bisogno possiamo combinare *decorators* multipli (come vedremo più avanti).

## Utilizzo di "func.call" per il contesto

Il *decorator* con funzione di caching menzionato prima, non è adatto a lavorare con i metodi degli oggetti.

Ad esempio, nel codice seguente, `worker.slow()` smette di funzionare dopo la *decoration*:

```js run
// prepariamo worker.slow per essere messo in cache
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // compito terribilmente impegnativo per la CPU
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// stesso codice di prima
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func(x); // (**)
*/!*
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // il metodo originale funziona

worker.slow = cachingDecorator(worker.slow); // ora mettiamolo in cache

*!*
alert( worker.slow(2) ); // Errore! Error: Cannot read property 'someMethod' of undefined
*/!*
```

L'errore avviene alla linea `(*)` la quale cerca di accedere a `this.someMethod`, ma fallisce. Riesci a capire il motivo?

Il motivo è che il *wrapper* chiama la funzione originale come `func(x)` alla linea `(**)`. E, quando chiamata in questo modo, la funzione prende `this = undefined`.

Osserveremmo la stessa cosa se provassimo a eseguire:

```js
let func = worker.slow;
func(2);
```

Quindi, il *wrapper* passa la chiamata al metodo originale, ma senza il contesto `this`. Da qui l'errore.

Correggiamolo.

C'è uno speciale metodo di funzione integrato [func.call(context, ...args)](mdn:js/Function/call) che permette di chiamare una funzione impostando esplicitamente `this`.

La sintassi è:

```js
func.call(context, arg1, arg2, ...)
```

Esegue `func` passando `this` come primo argomento ed i successivi come normali argomenti.

In poche parole, queste due chiamate fanno praticamente la stessa cosa:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

Entrambe chiamano `func` con gli argomenti `1`, `2` e `3`. L'unica differenza è che `func.call` imposta anche `this` su `obj`.

Prendiamo il codice sottostante come esempio, chiamiamo `sayHi` usando il contesto di oggetti differenti: `sayHi.call(user)` invoca `sayHi` passando `this=user`, e nella linea seguente imposta `this=admin`:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// usiamo call per passare oggetti differenti come "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

Qui, invece, usiamo `call` per chiamare `say` passando il contesto e l'argomento frase:


```js run
function say(frase) {
  alert(this.name + ': ' + frase);
}

let user = { name: "John" };

// user diventa this e "Hello" diventa il primo argomento (frase)
say.call( user, "Hello" ); // John: Hello
```

Nel nostro caso possiamo usare `call` nel *wrapper* per passare il contesto alla funzione originale:

```js run
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func.call(this, x); // ora "this" è passato nel modo corretto
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // ora abilitiamo il caching

alert( worker.slow(2) ); // funziona
alert( worker.slow(2) ); // funziona, non viene chiamato l'originale dalla cache
```

Ora funziona tutto correttamente.

Per renderlo ancora più chiaro, vediamo più approfonditamente come viene passato `this`:

1. Dopo la *decoration* `worker.slow` diventa il *wrapper* `function (x) { ... }`.
2. Quindi quando viene eseguito `worker.slow(2)`, il *wrapper* prende `2` come argomento e `this=worker` (è l'oggetto prima del punto).
3. All'interno del *wrapper*, assumendo che il risultato non sia stato ancora messo in cache, `func.call(this, x)` passa `this` (`=worker`) e l'argomento (`=2`) al metodo originale.

## Passando argomenti multipli

Rendiamo `cachingDecorator` un po' più universale. Finora abbiamo lavorato solamente con funzioni con un solo argomento.

Come fare per gestire il caching del metodo con argomenti multipli `worker.slow`?

```js
let worker = {
  slow(min, max) {
    return min + max; // il solito processo terribilmente assetato di CPU
  }
};

// dovrebbe ricordare le chiamate con lo stesso argomento
worker.slow = cachingDecorator(worker.slow);
```
Precedentemente, con un singolo argomento `x` potevamo usare `cache.set(x, result)` per salvare il risultato, e `cache.get(x)` per richiamarlo. Ma ora abbiamo bisogno di memorizzare il risultato per più combinazioni di argomenti `(min,max)`, e il comando `Map` prende un solo argomento come chiave.

Sono possibili diverse soluzioni:

1. Implementare una nuova (o usarne una di terze parti) struttura simile a *map*, ma più versatile e che permetta chiavi multiple.
2. Usare *maps* annidate: `cache.set(min)` sarà un `Map` che conterrà le coppie `(max, result)`. Quindi potremo avere `result` come `cache.get(min).get(max)`.
3. Unire i due valori in uno. Nel nostro caso potemmo usare una semplice stringa `"min,max"` come chiave del `Map`. 
Per maggiore flessibilità potremmo dotare il decorator di una funzione di *hashing*, che sappia trasformare più valori in uno solo.

Per molte applicazioni pratiche, la terza soluzione è sufficiente, quindi ci atterremo ad essa.

Non abbiamo bisogno di passare solo `x`, ma anche gli altri argomenti in `func.call`.  
Ricordiamo che in una `function()` sono disponibili tutti i suoi argomenti tramite il *pseudo-array* `arguments`. Quindi `func.call(this, x)` può essere sostituito con `func.call(this, ...arguments)`.

Il seguente è `cachingDecorator` migliorato:

```js run
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
*!*
    let key = hash(arguments); // (*)
*/!*
    if (cache.has(key)) {
      return cache.get(key);
    }

*!*
    let result = func.call(this, ...arguments); // (**)
*/!*

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // funziona
alert( "Again " + worker.slow(3, 5) ); // anche qui funziona (dalla cache)
```

Ora funziona con qualsiasi numero di argomenti (anche la funzione hash dovrebbe essere sistemata per consentire un numero qualsiasi di argomenti. Un modo interessante per farlo sarà trattato di seguito).

Ci sono due cambiamenti:

- Nella linea `(*)` viene chiamato `hash` per creare una chiave unica da `arguments`. In questo caso abbiamo usato una semplice funzione di unione che trasforma gli argomenti `(3, 5)` nella chiave `"3,5"`. Casi più complessi potrebbero richiedere approcci differenti per la funzione di *hashing*.
- Successivamente `(**)` usa `func.call(this, ...arguments)` per passare alla funzione originale sia il contesto che tutti gli argomenti ricevuti dal *wrapper*.

## func.apply

Anziché `func.call(this, ...arguments)` potremmo usare `func.apply(this, arguments)`.

La sintassi del metodo [func.apply](mdn:js/Function/apply) è:

```js
func.apply(context, args)
```

Questo esegue `func` impostando `this=context` ed usando l'oggetto (simil-array) `args` come lista di argomenti.

L'unica differenza di sintassi tra `call` e` apply` è che `call` si aspetta una lista di argomenti, mentre` apply` vuole un oggetto simil-array.

Queste due chiamate sono praticamente identiche:

```js
func.call(context, ...args); // passa un array come lista, usando la sintassi spread
func.apply(context, args);   // è uguale all'uso di call
```

Eseguono la medesima chiamata a `func` con un dati contesto ed argomenti.

C'è solo una sottile differenza:

- La sintassi `...` permette di passare `args` *iterabili* come lista a `call`.
- `apply` accetta solo *simil-array* `args`.

Quindi, se ci aspettiamo un iterabile usiamo `call`, se invece ci aspettiamo un array, usiamo ` apply`.

E per oggetti che sono sia iterabili che simil-array, come un vero array, possiamo usarne uno qualsiasi, ma `apply` sarà probabilmente più veloce, perché è meglio ottimizzato nella maggior parte dei motori JavaScript.

Il passaggio di tutti gli argomenti insieme al contesto a un'altra funzione è chiamato *call forwarding* (inoltro di chiamata).

Questa è la sua forma più semplice:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

Quando un codice esterno chiama il `wrapper`, è indistinguibile dalla chiamata della funzione originale `func`.


## Prendere in prestito un metodo [#method-borrowing]

Ora facciamo un ulteriore piccolo miglioramento nella funzione di hashing:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

Per ora funziona solo su due argomenti. Sarebbe meglio se potesse unire un numero qualsiasi di `args`.

La soluzione più immediata sarebbe usare il metodo [arr.join](mdn:js/Array/join):

```js
function hash(args) {
  return args.join();
}
```

...Sfortunatamente non funziona, perché stiamo chiamando `hash(arguments)`, e l'oggetto `arguments` è sia iterabile che simil-array, ma non è un vero array.

Quindi chiamare `join` su di esso darebbe errore, come possiamo vedere di seguito:

```js run
function hash() {
*!*
  alert( arguments.join() ); // Error: arguments.join is not a function
*/!*
}

hash(1, 2);
```

Tuttavia, c'è un modo semplice per utilizzare il metodo `join`:

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

Il trucco è chiamato *method borrowing*.

Prendiamo (in prestito) il metodo `join` da un normale array (`[].join`) ed usiamo `[].join.call` per eseguirlo nel contesto di `arguments`.

Perché funziona?

Perché l'algoritmo interno del metodo nativo `arr.join(glue)` è molto semplice.

Preso quasi letteralmente dalla specifica:

1. Imposta `glue` come primo argomento, o, se non ci sono argomenti, una virgola `","`.
2. Imposta `result` come stringa vuota.
3. Aggiungi `this[0]` a `result`.
4. Aggiungi `glue` e `this[1]`.
5. Aggiungi `glue` e `this[2]`.
6. ...Continua fino a che `this.length` elementi sono stati "incollati".
7. Ritorna `result`.


Quindi, tecnicamente prende `this` ed unisce `this[0]`, `this[1]` ...ecc. E' scritto intenzionalmente in modo da permette l'uso di un simil-array come `this` (non è una coincidenza se molti metodi seguono questa pratica). E' per questo motivo che funziona anche con `this=arguments`.

## Decorators e proprietà di funzione

In genere è sicuro sostituire una funzione o un metodo con una sua versione "decorata", tranne per una piccola cosa. Se la funzione originale aveva proprietà associate, come `func.calledCount` o qualsiasi altra cosa, allora quella decorata non le fornirà. Perché quello è un *wrapper*, quindi bisogna stare attenti a come lo si usa.

Es. nell'esempio sopra, se la funzione `slow` avesse avuto delle proprietà, allora `cachingDecorator(slow)` sarebbe stato un *wrapper* senza di esse.

Alcuni *decorators* possono fornire le proprie proprietà. Per esempio, un *decorator* può contare quante volte una funzione è stata invocata e quanto tempo ha impiegato, ed esporre queste informazioni tramite le proprietà del *wrapper*.

Esiste un modo per creare *decorators* che mantengono l'accesso alle proprietà della funzione, ma questo richiede l'uso di uno speciale oggetto `Proxy` per racchiudere una funzione. Ne parleremo più avanti nell'articolo <info:proxy#proxy-apply>.

## Riepilogo

*Decorator* è un *wrapper* attorno a una funzione che ne altera il comportamento. Il compito principale è ancora svolto dalla funzione.

I *decorators* possono essere visti come "caratteristiche" o "aspetti" che possono essere aggiunti a una funzione. Possiamo aggiungerne uno o aggiungerne molti. E tutto questo senza cambiarne il codice!

Per implementare `cachingDecorator`, abbiamo studiato i metodi:

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- chiama `func` con un dato contesto ed argomenti.
- [func.apply(context, args)](mdn:js/Function/apply) -- chiama `func` passando `context` come `this` ed un simil-array `args` come lista di argomenti.

Generalmente il *call forwarding* viene eseguito usando `apply`:

```js
let wrapper = function() {
  return original.apply(this, arguments);
};
```

Abbiamo anche visto un esempio di *method borrowing*, quando prendiamo un metodo da un oggetto ed usiamo `call` per chiamarlo nel contesto di un altro oggetto. È abbastanza comune prendere metodi array e applicarli ad `argomenti`. L'alternativa è utilizzare l'oggetto parametri `...rest` che è un vero array.

Esisto molti usi dei *decorators*, vediamone alcuni risolvendo i tasks di questo capitolo.
