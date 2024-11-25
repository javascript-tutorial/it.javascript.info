
# Fetch: Abort

È noto che `fetch` ritorna una prime. JavaScript comunemente non ha però il concetto di "interruzione" di una promise. Come possiamo fare quindi ad interrompere una chiamata `fetch`?

C'è uno speciale operatore built-in per questo scopo: `AbortController`, il quale può essere usato per interrompere `fetch` ed anche altri tasks asincroni.

L'utilizzo è molto semplice:

- Step 1: Creare un controller:

Create a controller:

```js
let controller = new AbortController();
```

Un controller è un oggetto estremamente semplice.

- Possiede un solo metodo `abort()`,
- Ed un'unica proprietà `signal` che permette di impostare dei controllori di evento (event listeneres).

Quando viene invocato il metodo `abort()`:
- `controller.signal` emette l'evento `"abort"`.
- la proprietà `controller.signal.aborted` diventa `true`.

<<<<<<< HEAD
Generalmente il processo si suddivide in due parti: 
1. quella che esegue l'operazione annullabile, imposta il listener su `controller.signal`.
2. quella che annulla: essa chiama `controller.abort()` quando necessario.
=======
Generally, we have two parties in the process:
1. The one that performs a cancelable operation, it sets a listener on `controller.signal`.
2. The one that cancels: it calls `controller.abort()` when needed.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Qui vediamo un esempio completo (ancora senza `fetch`):

```js run
let controller = new AbortController();
let signal = controller.signal;

<<<<<<< HEAD
// La parte che esegue un'operazione annullabile
// ottiene l'oggetto "signal"
// ed imposta il controllore di eventi di attivarsi quando viene invocato controller.abort()
=======
// The party that performs a cancelable operation
// gets the "signal" object
// and sets the listener to trigger when controller.abort() is called
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
signal.addEventListener('abort', () => alert("abort!"));

// L'altra parte, che cancella (in un qualsiasi punto più avanti):
controller.abort(); // abort!

// L'evento si innesca e il segnale di aborted diventa true
alert(signal.aborted); // true
```


Potremmo implementare lo stesso tipo controllo di eventi nel nostro codice, anche senza l'oggetto `AbortController`.

Ma ciò che dà valore è che `fetch` è ottimizzato per lavorare con l'oggetto `AbortController`, poiché è integrato. 


```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

Il metodo `fetch` è in grado di lavorare con `AbortController`. Starà in attesa dell'event `abort` su `signal`.

Ora, per abortire la richiesta, invochiamo `controller.abort()`:

```js
controller.abort();
```

Abbiamo finito: `fetch` riceve l'event da `signal` ed interrompe la richiesta.

Quando un fetch viene interrotto, la promise viene rifiutata con un errore `AbortError`, quindi dovremmo prevedere una sua gestione, e.g. all'interno di un `try..catch`.

Qui vediamo l'esempio completo con `fetch`, che viene interrotto dopo 1 secondo:

```js run async
// interrompi in 1 secondo
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // gestisci l'abort()
    alert("Aborted!");
  } else {
    throw err;
  }
}
```

## AbortController è scalabile

`AbortController` è scalabile e può cancellare fetches multipli in una volta.

Ad esempio, qui valutiamo molti `url` in parallelo e il controller li interrompe tutti:

```js
let urls = [...]; // un elenco di urls di cui fare il fetch in parallelo

let controller = new AbortController();

// un array di fetch promises
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// se controller.abort() è chiamato da qualche parte del codice
// saranno interrotte tutte le fetches
```

Se abbiamo dei jobs asincroni, oltre a `fetch`, possiamo usare un singolo` AbortController` per fermarli insieme alle fetches.

Dobbiamo solo ascoltare il suo evento `abort`:

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // un nostro task
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Attende per le and ed il nostro task in parallelo
let results = await Promise.all([...fetchJobs, ourJob]);

// se controller.abort() è chiamato da qualche parte del codice
// saranno interrotte tutte le fetches e ourJob
```

## Riepilogo

<<<<<<< HEAD
- `AbortController` è un semplice oggetto che genera eventi di `abort` sulla proprietà `signal` quando viene invocato il metodo `abort()` (ed imposta anche `signal.aborted` a `true`).
- `fetch` si integra con esso: se passiamo la proprietà `signal` come opzione, `fetch` è in grado di controllarla, quindi sarà possibile interrompere l'operazione di `fetch`.
- Possiamo utilizzare `AbortController` nel nostro codice. La chiamata `abort()`" -> "ascolterà l'evento `abort`". Possiamo utilizzarla anche senza `fetch`.
=======
- `AbortController` is a simple object that generates an `abort` event on its `signal` property when the `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass the `signal` property as the option, and then `fetch` listens to it, so it's possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
