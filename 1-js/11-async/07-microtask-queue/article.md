
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

I task asincroni hanno bisogno di una gestione appropriata. Per questo motivo, lo standard specifica una coda interna `PromiseJobs`, più spesso riferita come "coda dei microtask" (microtask queue) (termine di v8).

Come detto nella [specifica](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):

- La coda è primo-dentro-primo-fuori: i task messi in coda per primi sono eseguiti per primi.
- L'esecuzione di un task è iniziata solo quando nient'altro è in esecuzione.

<<<<<<< HEAD
Oppure, per dirla in modo semplice, quando una promise è pronta, i suoi gestori `.then/catch/finally` sono messi nella coda. Non sono ancora eseguiti. Il motore JavaScript prende un task dalla coda e lo esegue, quando diventa libero dal codice corrente.
=======
Or, to say that simply, when a promise is ready, its `.then/catch/finally` handlers are put into the queue. They are not executed yet. When the JavaScript engine becomes free from the current code, it takes a task from the queue and executes it.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

Questo è il motivo per cui "codice finito" nell'esempio sopra viene mostrato prima.

![](promiseQueue.svg)

<<<<<<< HEAD
I gestori delle promise passano sempre da quella coda interna.
=======
Promise handlers always go through this internal queue.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

Se c'è una catena con diversi `.then/catch/finally`, allora ognuno di essi viene eseguito in modo asincrono. Cioè, viene prima messo in coda ed eseguito quando il codice corrente è completo e i gestori messi in coda precedentemente sono finiti.

<<<<<<< HEAD
**Che cosa succede se per noi l'ordine è importante? Come possiamo far funzionare `codice finito` dopo `promise completa`?**
=======
**What if the order matters for us? How can we make `code finished` run after `promise done`?**
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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
=======
Remember the `unhandledrejection` event from the chapter <info:promise-error-handling>?

Now we can see exactly how JavaScript finds out that there was an unhandled rejection.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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

<<<<<<< HEAD
Ora il respingimento non gestito appare di nuovo. Perché? `unhandledrejection` viene innescato quando la coda dei microtask è completa. Il motore esamina le promise e, se qualcuna di esse è in stato "rejected", allora l'evento è generato.

Nell'esempio, il `.catch` aggiunto da `setTimeout` viene es, ovviamente lo fa, ma dopo, quando `unhandledrejection` è già avvenuto.
=======
Now, if you run it, we'll see `Promise Failed!` first and then `caught`. 

If we didn't know about the microtasks queue, we could wonder: "Why did `unhandledrejection` handler run? We did catch the error!".
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

Se non fossimo a conoscenza della coda dei microtask, potremmo chiederci: "Perché il gestore di `unhandledrejection` viene eseguito? Abbiamo catturato l'errore!".

Ma ora sappiamo che `unhandledrejection` è generato quando la coda dei microtask è completa: il motore esamina le promise e, se una di esse è in stato "rejected", allora l'evento viene innescato.

Nell'esempio sopra, anche il `.catch` aggiunto da `setTimeout` viene innescato, ma dopo, quando `unhandledrejection` è già avvenuto, quindi questo non cambia niente.

## Riassunto

La gestione delle promise è sempre asincrona, dato che tutte le azioni delle promise passano attraverso la coda "promise jobs", anche chiamata "microtask queue" (termine di v8).

Così, i gestori `.then/catch/finally` sono sempre chiamati dopo che il codice corrente è finito.

Se abbiamo bisogno della certezza che un pezzo di codice sia eseguito dopo `.then/catch/finally`, possiamo aggiungerlo ad una chiamata `.then` in catena.

Nella maggior parte dei motori JavaScript, inclusi i browser e Node.js, il concetto di microtask è strettamente legato al "loop degli event" (event loop) ed ai "macrotasks". Dato che questi non hanno una relazione diretta con le promise, sono coperti in un'altra parte del tutorial, nel capitolo <info:event-loop>.
