
# Microtasks

I gestori delle Promise `.then`/`.catch`/`.finally` sono sempre asincroni.

Anche quando una Promise è immediatamente risolta, il codice sulle linee *sotto* `.then`/`.catch`/`.finally` verrà sempre eseguito prima dei gestori.

Ecco una dimostrazione:

```js run
let promise = Promise.resolve();

promise.then(() => alert("promise completa"));

alert("codice finito"); // questo alert viene mostrato prima
```

Se lo esegui, vedrai prima `codice finito`, in seguito `promise done`.

Questo è strano, perché la Promise è chiaramente completa dall'inizio.

Perché quindi il `.then` viene eseguito dopo? Cosa succede?

## Coda dei Microtask (Microtasks Queue)

<<<<<<< HEAD
I task asincroni hanno bisogno di una gestione appropriata. Per questo motivo, lo standard specifica una coda interna `PromiseJobs`, più spesso riferita come "coda dei microtask" (microtask queue) (termine di v8).
=======
Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal queue `PromiseJobs`, more often referred to as the "microtask queue" (V8 term).
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5

Come detto nella [specifica](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):

- La coda è primo-dentro-primo-fuori: i task messi in coda per primi sono eseguiti per primi.
- L'esecuzione di un task è iniziata solo quando nient'altro è in esecuzione.

Oppure, per dirla in modo semplice, quando una promise è pronta, i suoi gestori `.then/catch/finally` sono messi nella coda. Non sono ancora eseguiti. Il motore JavaScript prende un task dalla coda e lo esegue, quando diventa libero dal codice corrente.

Questo è il motivo per cui "codice finito" nell'esempio sopra viene mostrato prima.

![](promiseQueue.svg)

I gestori delle promise passano sempre da quella coda interna.

Se c'è una catena con diversi `.then/catch/finally`, allora ognuno di essi viene eseguito in modo asincrono. Cioè, viene prima messo in coda ed eseguito quando il codice corrente è completo e i gestori messi in coda precedentemente sono finiti.

**Che cosa succede se per noi l'ordine è importante? Come possiamo far funzionare `codice finito` dopo `promise completa`?**

Facile, basta metterlo in coda con `.then`:

```js run
Promise.resolve()
  .then(() => alert("promise done!"))
  .then(() => alert("code finished"));
```

Ora l'ordine è come inteso.

## Rigetto non gestito (Unhandled rejection)

Ricordi l'evento "unhandledrejection" dal capitolo <info:promise-error-handling>?

Ora possiamo vedere esattamente come JavaScript viene a conoscenza che c'è stato un respingimento non gestito (unhandled rejection)

**"Unhandled rejection" avviene quando un errore di una promise non è gestito alla fine della coda dei microtask**

Normalmente, se ci aspettiamo un errore, aggiungiamo `.catch` alla catena delle promise per gestirlo:

```js run
let promise = Promise.reject(new Error("Promise Fallita!"));
*!*
promise.catch(err => alert('catturato'));
*/!*

// non viene eseguito: errore gestito
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

...Ma se ci dimentichiamo di aggiungere `.catch`, allora, dopo che la coda dei microtask è vuota, il motore innesca l'evento:

```js run
let promise = Promise.reject(new Error("Promise Fallita!"));

// Promise Fallita!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

Cosa succede se gestiamo l'errore dopo? Come qui:

```js run
let promise = Promise.reject(new Error("Promise Fallita!"));
*!*
setTimeout(() => promise.catch(err => alert('caught')), 1000);
*/!*

// Error: Promise Fallita!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

Ora il respingimento non gestito appare di nuovo. Perché? `unhandledrejection` viene innescato quando la coda dei microtask è completa. Il motore esamina le promise e, se qualcuna di esse è in stato "rejected", allora l'evento è generato.

Nell'esempio, il `.catch` aggiunto da `setTimeout` viene es, ovviamente lo fa, ma dopo, quando `unhandledrejection` è già avvenuto.

Se non fossimo a conoscenza della coda dei microtask, potremmo chiederci: "Perché il gestore di `unhandledrejection` viene eseguito? Abbiamo catturato l'errore!".

Ma ora sappiamo che `unhandledrejection` è generato quando la coda dei microtask è completa: il motore esamina le promise e, se una di esse è in stato "rejected", allora l'evento viene innescato.

Nell'esempio sopra, anche il `.catch` aggiunto da `setTimeout` viene innescato, ma dopo, quando `unhandledrejection` è già avvenuto, quindi questo non cambia niente.

<<<<<<< HEAD
## Riepilogo
=======
Promise handling is always asynchronous, as all promise actions pass through the internal "promise jobs" queue, also called "microtask queue" (V8 term).
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5

La gestione delle promise è sempre asincrona, dato che tutte le azioni delle promise passano attraverso la coda "promise jobs", anche chiamata "microtask queue" (termine di v8).

Così, i gestori `.then/catch/finally` sono sempre chiamati dopo che il codice corrente è finito.

Se abbiamo bisogno della certezza che un pezzo di codice sia eseguito dopo `.then/catch/finally`, possiamo aggiungerlo ad una chiamata `.then` in catena.

Nella maggior parte dei motori JavaScript, inclusi i browser e Node.js, il concetto di microtask è strettamente legato al "loop degli event" (event loop) ed ai "macrotasks". Dato che questi non hanno una relazione diretta con le promise, sono coperti in un'altra parte del tutorial, nel capitolo <info:event-loop>.
