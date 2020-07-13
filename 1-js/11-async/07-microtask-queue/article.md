
# Microtasks

I gestori delle Promise `.then`/`.catch`/`.finally` sono sempre asincroni.

<<<<<<< HEAD
Anche quando una Promise è immediatamente risolta, il codice sulle linee *sotto* `.then`/`.catch`/`.finally` verrà sempre eseguito prima dei gestori.

Ecco una dimostrazione:
=======
Even when a Promise is immediately resolved, the code on the lines *below* `.then`/`.catch`/`.finally` will still execute before these handlers.

Here's a demo:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

Come detto nella [specifica](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):
=======
Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal queue `PromiseJobs`, more often referred to as the "microtask queue" (ES8 term).

As stated in the [specification](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

- La coda è primo-dentro-primo-fuori: i task messi in coda per primi sono eseguiti per primi.
- L'esecuzione di un task è iniziata solo quando nient'altro è in esecuzione.

<<<<<<< HEAD
Oppure, per dirla in modo semplice, quando una promise è pronta, i suoi gestori `.then/catch/finally` sono messi nella coda. Non sono ancora eseguiti. Il motore JavaScript prende un task dalla coda e lo esegue, quando diventa libero dal codice corrente.
=======
Or, to say more simply, when a promise is ready, its `.then/catch/finally` handlers are put into the queue; they are not executed yet. When the JavaScript engine becomes free from the current code, it takes a task from the queue and executes it.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Questo è il motivo per cui "codice finito" nell'esempio sopra viene mostrato prima.

![](promiseQueue.svg)

<<<<<<< HEAD
I gestori delle promise passano sempre da quella coda interna.

Se c'è una catena con diversi `.then/catch/finally`, allora ognuno di essi viene eseguito in modo asincrono. Cioè, viene prima messo in coda ed eseguito quando il codice corrente è completo e i gestori messi in coda precedentemente sono finiti.

**Che cosa succede se per noi l'ordine è importante? Come possiamo far funzionare `codice finito` dopo `promise completa`?**
=======
Promise handlers always go through this internal queue.

If there's a chain with multiple `.then/catch/finally`, then every one of them is executed asynchronously. That is, it first gets queued, then executed when the current code is complete and previously queued handlers are finished.

**What if the order matters for us? How can we make `code finished` run after `promise done`?**
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Facile, basta metterlo in coda con `.then`:

```js run
Promise.resolve()
  .then(() => alert("promise done!"))
  .then(() => alert("code finished"));
```

Ora l'ordine è come inteso.

## Rigetto non gestito (Unhandled rejection)

<<<<<<< HEAD
Ricordi l'evento "unhandledrejection" dal capitolo <info:promise-error-handling>?

Ora possiamo vedere esattamente come JavaScript viene a conoscenza che c'è stato un respingimento non gestito (unhandled rejection)

**"Unhandled rejection" avviene quando un errore di una promise non è gestito alla fine della coda dei microtask**
=======
Remember the `unhandledrejection` event from the article <info:promise-error-handling>?

Now we can see exactly how JavaScript finds out that there was an unhandled rejection.

**An "unhandled rejection" occurs when a promise error is not handled at the end of the microtask queue.**
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Normalmente, se ci aspettiamo un errore, aggiungiamo `.catch` alla catena delle promise per gestirlo:

```js run
let promise = Promise.reject(new Error("Promise Fallita!"));
*!*
promise.catch(err => alert('catturato'));
*/!*

// non viene eseguito: errore gestito
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

<<<<<<< HEAD
...Ma se ci dimentichiamo di aggiungere `.catch`, allora, dopo che la coda dei microtask è vuota, il motore innesca l'evento:
=======
But if we forget to add `.catch`, then, after the microtask queue is empty, the engine triggers the event:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

<<<<<<< HEAD
Ora il respingimento non gestito appare di nuovo. Perché? `unhandledrejection` viene innescato quando la coda dei microtask è completa. Il motore esamina le promise e, se qualcuna di esse è in stato "rejected", allora l'evento è generato.

Nell'esempio, il `.catch` aggiunto da `setTimeout` viene es, ovviamente lo fa, ma dopo, quando `unhandledrejection` è già avvenuto.

Se non fossimo a conoscenza della coda dei microtask, potremmo chiederci: "Perché il gestore di `unhandledrejection` viene eseguito? Abbiamo catturato l'errore!".

Ma ora sappiamo che `unhandledrejection` è generato quando la coda dei microtask è completa: il motore esamina le promise e, se una di esse è in stato "rejected", allora l'evento viene innescato.
=======
Now, if we run it, we'll see `Promise Failed!` first and then `caught`.

If we didn't know about the microtasks queue, we could wonder: "Why did `unhandledrejection` handler run? We did catch and handle the error!"

But now we understand that `unhandledrejection` is generated when the microtask queue is complete: the engine examines promises and, if any of them is in the "rejected" state, then the event triggers.

In the example above, `.catch` added by `setTimeout` also triggers. But it does so later, after `unhandledrejection` has already occurred, so it doesn't change anything.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Nell'esempio sopra, anche il `.catch` aggiunto da `setTimeout` viene innescato, ma dopo, quando `unhandledrejection` è già avvenuto, quindi questo non cambia niente.

<<<<<<< HEAD
## Riassunto

La gestione delle promise è sempre asincrona, dato che tutte le azioni delle promise passano attraverso la coda "promise jobs", anche chiamata "microtask queue" (termine di v8).
=======
Promise handling is always asynchronous, as all promise actions pass through the internal "promise jobs" queue, also called "microtask queue" (ES8 term).

So `.then/catch/finally` handlers are always called after the current code is finished.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Così, i gestori `.then/catch/finally` sono sempre chiamati dopo che il codice corrente è finito.

<<<<<<< HEAD
Se abbiamo bisogno della certezza che un pezzo di codice sia eseguito dopo `.then/catch/finally`, possiamo aggiungerlo ad una chiamata `.then` in catena.

Nella maggior parte dei motori JavaScript, inclusi i browser e Node.js, il concetto di microtask è strettamente legato al "loop degli event" (event loop) ed ai "macrotasks". Dato che questi non hanno una relazione diretta con le promise, sono coperti in un'altra parte del tutorial, nel capitolo <info:event-loop>.
=======
In most Javascript engines, including browsers and Node.js, the concept of microtasks is closely tied with the "event loop" and "macrotasks". As these have no direct relation to promises, they are covered in another part of the tutorial, in the article <info:event-loop>.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
