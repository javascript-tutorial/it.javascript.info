
# Fetch: Abort

<<<<<<< HEAD
È noto che `fetch` ritorna una prime. JavaScript comunemente non ha però il concetto di "interruzione" di una promise. Come possiamo fare quindi ad interrompere una chiamata `fetch`?

C'è uno speciale operatore built-in per questo scopo: `AbortController`, il quale può essere usato per interromepere `fetch` ed anche altri tasks asincroni.

L'utilizzo è molto semplice:

- Step 1: Creare un controller:
=======
As we know, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we cancel an ongoing `fetch`? E.g. if the user actions on our site indicate that the `fetch` isn't needed any more.

There's a special built-in object for such purposes: `AbortController`. It can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is very straightforward:

## The AbortController object
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Step 1: create a controller:

<<<<<<< HEAD
    Un controller è un oggetto estremamente semplice.

    - Possiede solo il metodo `abort()` e la proprietà `signal`.
    - Quando `abort()` è chiamato:
        - l'evento `abort` si attiva su `controller.signal`
        - la proprietà `controller.signal.aborted` diventa `true`.

    Per valutare le chiamate del metodo `abort()` è necessario impostare un listener su `controller.signal`.

    Un esempio (per ora senza `fetch`):
=======
```js
let controller = new AbortController();
```

A controller is an extremely simple object.

- It has a single method `abort()`,
- And a single property `signal` that allows to set event liseners on it.

When `abort()` is called:
- `controller.signal` emits the `"abort"` event.
- `controller.signal.aborted` property becomes `true`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Generally, we have two parties in the process: 
1. The one that performs an cancelable operation, it sets a listener on `controller.signal`.
2. The one one that cancels: it calls `controller.abort()` when needed.

<<<<<<< HEAD
    // si scatenerà quando controller.abort() sarà chiamato
    signal.addEventListener('abort', () => alert("abort!"));
=======
Here's the full example (without `fetch` yet):
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation 
// gets "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));

// The other party, that cancels (at any point later):
controller.abort(); // abort!

<<<<<<< HEAD
- Step 2: passa la proprietà `signal` nelle opzioni `fetch`:
=======
// The event triggers and signal.aborted becomes true
alert(signal.aborted); // true
```
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

As we can see, `AbortController` is just a means to pass `abort` events when `abort()` is called on it.

<<<<<<< HEAD
    Il metodo `fetch` sa come lavorare con `AbortController` ed ascolta l'`abort` grazie a `signal`.

- Step 3: per interrompere, esegui `controller.abort()`:
=======
We could implement same kind of event listening in our code on our own, without `AbortController` object at all.

But what's valuable is that `fetch` knows how to work with `AbortController` object, it's integrated with it. 
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

## Using with fetch

<<<<<<< HEAD
    Abbiamo completato: `fetch` ottiene l'evento da `signal` ed interrompe la richiesta.

Quando una fetch viene interrotta, la sua promise viene respinta con un errore `AbortError` e quindi dovremmo gestirlo, magari per mezzo di `try...catch`:
=======
To become able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

The `fetch` method knows how to work with `AbortController`. It will listen to `abort` events on `signal`.

Now, to to abort, call `controller.abort()`:

```js
controller.abort();
```

We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`.

Here's the full example with `fetch` aborted after 1 second:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

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

<<<<<<< HEAD
**`AbortController` è scalabile e può cancellare fetches multipli in una volta.**

For instance, here we fetch many `urls` in parallel, and the controller aborts them all:
Ad esempio, qui valutiamo molti `url` in parallelo e il controller li interrompe tutti:
=======
## AbortController is scalable

`AbortController` is scalable, it allows to cancel multiple fetches at once.

Here's a sketch of code that fetches many `urls` in parallel, and uses a single controller to abort them all:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
let urls = [...]; // un elenco di urls di cui fare il fetch in parallelo

let controller = new AbortController();

// an array of fetch promises
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// se controller.abort() è chiamato da qualche parte del codice
// saranno interrotte tutte le fetches
```

<<<<<<< HEAD
Se abbiamo dei jobs asincroni, oltre a `fetch`, possiamo usare un singolo` AbortController` per fermarli insieme alle fetches.

Dobbiamo solo ascoltare il suo evento `abort`:
=======
If we have our own asynchronous tasks, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event in our tasks:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

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

<<<<<<< HEAD
Quindi `AbortController` non è solo per` fetch`. È un oggetto universale per interrompere attività asincrone e `fetch` ha un'integrazione specifica con esso.
=======
## Summary

- `AbortController` is a simple object that generates `abort` event on it's `signal` property when `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass `signal` property as the option, and then `fetch` listens to it, so it becomes possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
