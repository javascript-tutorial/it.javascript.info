
# Fetch: Abort

È noto che `fetch` ritorna una prime. JavaScript comunemente non ha però il concetto di "interruzione" di una promise. Come possiamo fare quindi ad interrompere una chiamata `fetch`?

C'è uno speciale operatore built-in per questo scopo: `AbortController`, il quale può essere usato per interromepere `fetch` ed anche altri tasks asincroni.

L'utilizzo è molto semplice:

- Step 1: Creare un controller:

    ```js
    let controller = new AbortController();
    ```

    Un controller è un oggetto estremamente semplice.

    - Possiede solo il metodo `abort()` e la proprietà `signal`.
    - Quando `abort()` è chiamato:
        - l'evento `abort` si attiva su `controller.signal`
        - la proprietà `controller.signal.aborted` diventa `true`.

    Per valutare le chiamate del metodo `abort()` è necessario impostare un listener su `controller.signal`.

    Un esempio (per ora senza `fetch`):

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

    // si scatenerà quando controller.abort() sarà chiamato
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // abort!

    alert(signal.aborted); // true
    ```

- Step 2: passa la proprietà `signal` nelle opzioni `fetch`:

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

    Il metodo `fetch` sa come lavorare con `AbortController` ed ascolta l'`abort` grazie a `signal`.

- Step 3: per interrompere, esegui `controller.abort()`:

    ```js
    controller.abort();
    ```

    Abbiamo completato: `fetch` ottiene l'evento da `signal` ed interrompe la richiesta.

Quando una fetch viene interrotta, la sua promise viene respinta con un errore `AbortError` e quindi dovremmo gestirlo, magari per mezzo di `try...catch`:

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

**`AbortController` è scalabile e può cancellare fetches multipli in una volta.**

For instance, here we fetch many `urls` in parallel, and the controller aborts them all:
Ad esempio, qui valutiamo molti `url` in parallelo e il controller li interrompe tutti:

```js
let urls = [...]; // un elenco di urls di cui fare il fetch in parallelo

let controller = new AbortController();

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

Quindi `AbortController` non è solo per` fetch`. È un oggetto universale per interrompere attività asincrone e `fetch` ha un'integrazione specifica con esso.
