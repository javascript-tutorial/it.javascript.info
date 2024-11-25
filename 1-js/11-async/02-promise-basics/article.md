# Promise

Immagina di essere un cantante famoso, ed i fan ti chiedono giorno e notte del tuo nuovo singolo.

Per avere un pò di sollievo, prometti di inviarglielo quando sarà pubblicato. Fornisci ai tuoi fan una lista. Loro possono compilarla con la loro email, quindi quando la funzione sarà disponibile, tutti gli iscritti la riceveranno. E anche se qualcosa dovesse andare storto, ad esempio un incendio nello studio, che ti impedisce di pubblicare la canzone, i fan verranno comunque notificati.

Tutti sono felici: tu, perché le persone non ti disturbano più, ed i fan, poiché in questo modo non si perderanno nessuna canzone.

1. Un "codice produttore" (producing code) che fa qualcosa e che richiede tempo. Per esempio, il codice che carica uno script remoto. Questo è un "cantante".
2. Un "codice consumatore" (consuming code) che vuole il risultato del "codice produttore" una volta che è pronto. Molte funzioni possono aver bisogno di questo risultato. Queste sono i "fan".
3. Una *promise* è uno speciale oggetto JavaScript che collega il "codice produttore" con il "codice consumatore". Nei termini della nostra analogia: questa è "la lista abbonamenti". Il "codice produttore" si prende tutto il tempo necessario a produrre il risultato promesso, e la "promise" rende il risultato disponibile per tutto il codice iscritto quando è pronto.

L'analogia non è completamente accurata, perché le promise di JavaScript sono più complesse di una semplice lista di abbonamenti: hanno altre caratteristiche e limiti. Ma va bene per iniziare.

La sintassi del costruttore per un oggetto promise è:

```js
let promise = new Promise(function(resolve, reject) {
  // esecutore (il codice produttore, "cantante")
});
```

La funzione passata a `new Promise` è chiamata *esecutore (executor)*. Quando la promise è creata, questa funzione esecutore viene eseguita automaticamente. Contiene il codice produttore, che eventualmente produrrà un risultato. Nei termini dell'analogia precedente: l'esecutore è il "cantante".

I suoi argomenti `resolve` e `reject` sono delle callback fornite da JavaScript stesso. Il nostro codice sta solamente dentro l'esecutore.

- `resolve(value)` — se il processo termina correttamente, col risultato `value`.
- `reject(error)` — se si verifica un errore, `error` è l'oggetto errore.

Ricapitolando: l'esecutore parte automaticamente e tenta di eseguire un compito. Quando l'esecuzione termina, viene invocato `resolve` in caso di successo, oppure `reject` in caso di errore.

L'oggetto `promise` restituito ha le seguenti proprietà interne:

<<<<<<< HEAD
- `state` — inizialmente "pending", poi cambia in "fulfilled" se viene invocato `resolve` o in "rejected" se viene invocato `reject`.
- `result` — inizialmente `undefined`, poi cambia in `value` se viene invocato `resolve(value)` o in `error` se viene invocato `reject(error)`.
=======
- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` is called or `error` when `reject(error)` is called.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Quindi l'esecutore, alla fine, mette la promise in uno di questi stati:

![](promise-resolve-reject.svg)

Più avanti vedremo come questi cambiamenti diventano noti ai "fan".

Qui vediamo un esempio di costruzione di una Promise ed un semplice esecutore ritardato (tramite `setTimeout`):

```js
let promise = new Promise(function(resolve, reject) {
  // la funzione è eseguita automaticamente quando la promise è costruita

  // dopo 1 secondo segnala che il lavoro è fatto con risultato "done"
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

Possiamo vedere due cose eseguendo il codice sopra:

1. L'esecutore è chiamato automaticamente ed immediatamente (da `new Promise`).
2. L'esecutore riceve due argomenti: `resolve` e `reject` — queste funzioni sono predefinite dal motore JavaScript. Quindi non abbiamo bisogno di crearle. Dovremo invece scrivere l'esecutore per chiamarle quando è il momento.

<<<<<<< HEAD
    Dopo un secondo di "elaborazione" l'esecutore chiama `resolve("done")` per produrre il risultato. Questo cambia lo stato dell'oggetto `promise`:
=======
    After one second of "processing", the executor calls `resolve("done")` to produce the result. This changes the state of the `promise` object:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ![](promise-resolve-1.svg)

Questo era un esempio di un lavoro completato con successo, una "fulfilled promise".

Ed ora un esempio dell'esecutore respingere (rejecting) la promise con un errore:

```js
let promise = new Promise(function(resolve, reject) {
  // dopo 1 secondo segnala che il lavoro è finito con un errore
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

La chiamata a `reject(...)` sposta lo stato della Promise a `"rejected"`:

![](promise-reject-1.svg)

Per riassumere, l'esecutore dovrebbe svolgere un lavoro (di solito qualcosa che richiede tempo) e successivamente chiamare `resolve` o `reject` per cambiare lo stato dell'oggetto Promise corrispondente.

La Promise che è soddisfatta (resolved) o respinta (rejected) è chiamata "ferma (settled)", al contrario di Promise "in attesa (pending)".

````smart header="Può esserci solo un risultato (result) o un errore (error)"
L'esecutore può chiamare solo un `resolve` o un `reject`. Il cambiamento di stato della promise è definitivo.

Tutte le chiamate successive a 'resolve' o 'reject' sono ignorate:

```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("done");
*/!*

  reject(new Error("…")); // ignorato
  setTimeout(() => resolve("…")); // ignorato
});
```

L'idea è che il lavoro fatto dall'esecutore può avere solo un risultato o un errore.

Inoltre, 'resolve'/'reject' prevedono solo un argomento (o nessuno) ed ignoreranno argomenti successivi.
````

```smart header="Reject con oggetti `Error`"
Nel caso in cui qualcosa vada male, possiamo chiamare `reject` con qualunque tipo di argomento (come `resolve`). Ma è raccomandato utilizzare gli oggetti `Error` (o oggetti che estendono `Error`).
La ragione di questo sarà presto evidente.
```

````smart header="Chiamare immediatamente `resolve`/`reject`"
In pratica, un esecutore di norma fa qualcosa in modo asincrono e chiama `resolve`/`reject` dopo un po' di tempo, ma non è obbligato a farlo. Possiamo anche chiamare `resolve` o `reject` immediatamente, come sotto:


```js
let promise = new Promise(function(resolve, reject) {
  // non prendiamo il nostro tempo per svolgere il lavoro
  resolve(123); // diamo immediatamente il risultato: 123
});
```

Per esempio, questo può accadere quando iniziamo a fare un lavoro ma poi vediamo che tutto è già stato completato.

Questo va bene. Abbiamo immediatamente una Promise soddisfatta, non c'è niente di sbagliato in questo.
````

````smart header="`state` e `result` sono interni"
Le proprietà `state` e `result` dell'oggetto Promise sono interne. Non possiamo accedervi direttamente dal nostro "codice consumatore". Possiamo usare i metodi `.then`/`.catch`/`.finally` per questo. Questi metodi sono descritti sotto.
````

<<<<<<< HEAD
## Consumatori (consumers): then, catch, finally

Un oggetto Promise fa da collegamento tra l'esecutore (il "codice produttore" o "cantante") e le funzioni consumatore (i "fan"), che riceveranno il risultato o un errore. Le funzioni consumatori possono essere registrate (subscribed) usando i metodi `.then`, `.catch` e `.finally`.
=======
## Consumers: then, catch

A Promise object serves as a link between the executor (the "producing code" or "singer") and the consuming functions (the "fans"), which will receive the result or error. Consuming functions can be registered (subscribed) using the methods `.then` and `.catch`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

### then

Il più importante e fondamentale è `.then`.

La sintassi è:

```js
promise.then(
  function(result) { *!*/* gestisce un risultato in caso di successo */*/!* },
  function(error) { *!*/* gestisce un errore */*/!* }
);
```

<<<<<<< HEAD
Il primo argomento di `.then` è una funzione che esegue quando una promise viene risolta, e ne riceve il risultato.

Il secondo argomento di `.then` è una funzione che esegue quando una promise viene rifiutata e riceve l'errore.
=======
The first argument of `.then` is a function that runs when the promise is resolved and receives the result.

The second argument of `.then` is a function that runs when the promise is rejected and receives the error.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per esempio, ecco una reazione ad una promise soddisfatta:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("fatto!"), 1000);
});

// resolve esegue la prima funzione in in .then
promise.then(
*!*
  result => alert(result), // mostra "fatto!" dopo 1 secondo
*/!*
  error => alert(error) // non viene eseguito
);
```

La prima funzione è stata eseguita.

E in caso di rifiuto (rejection) -- la seconda:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise.then(
  result => alert(result), // non vene eseguita
*!*
  error => alert(error) // mostra "Error: Whoops!" dopo 1 secondo
*/!*
);
```

Se siamo interessati solo ai completamenti con successo, allora possiamo fornire solo una funzione come argomento a `.then`:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("fatto!"), 1000);
});

*!*
promise.then(alert); // mostra "fatto!" dopo 1 secondo
*/!*
```

### catch

Se siamo interessati solo agli errori, allora possiamo usare `null` come primo argomento: `.then(null, errorHandlingFunction)`. Oppure possiamo usare `.catch(errorHandlingFunction)`, che è esattamente lo stesso:


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // mostra "Error: Whoops!" dopo 1 secondo
*/!*
```

La chiamata `.catch(f)` è completamente analoga a `.then(null, f)`, è solo un'abbreviazione.

## Cleanup: finally

Proprio come c'è la clausola `finally` in un regolare `try {...} catch {...}`, c'è `finally` nelle promise.

<<<<<<< HEAD
La chiamata `.finally(f)` è simile a `.then(f, f)` nel senso che viene sempre eseguita quando la promise è ferma (settled): che sia soddisfatta o respinta.

`finally` è un buon handler per fare pulizia, ad esempio fermare i nostri indicatori di caricamento, dato che non sono più necessari, indipendentemente dall'esito.

Ad esempio:

```js
new Promise((resolve, reject) => {
  /* fa qualcosa che prende tempo, poi chiama resolve/reject */
})
*!*
  // viene eseguito quando la promise è ferma (settled), non conta se con successo o no
  .finally(() => ferma l'indicatore di caricamento)
=======
The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` runs always, when the promise is settled: be it resolve or reject.

The idea of `finally` is to set up a handler for performing cleanup/finalizing after the previous operations are complete.

E.g. stopping loading indicators, closing no longer needed connections, etc.

Think of it as a party finisher. No matter was a party good or bad, how many friends were in it, we still need (or at least should) do a cleanup after it.

The code may look like this:

```js
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
})
*!*
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we go on
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
*/!*
  .then(result => show result, err => mostra l'errore)
```

<<<<<<< HEAD
Tuttavia non è esattamente un alias. Ci sono diverse importanti differenze:

1. Un handler `finally` non ha argomenti. In `finally` non sappiamo se la promise ha successo oppure no. Questo va bene, dato che il nostro compito è solitamente quello di eseguire procedure di finalizzazione "generiche".
2. Finally passa risultati ed errori al prossimo handler.

    Per esempio, qui il risultato è passato da `finally` a `then`:
=======
Please note that `finally(f)` isn't exactly an alias of `then(f,f)` though.

There are important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.

    Please take a look at the example above: as you can see, the `finally` handler has no arguments, and the promise outcome is handled by the next handler.
2. A `finally` handler "passes through" the result or error to the next suitable handler.

    For instance, here the result is passed through `finally` to `then`:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("value"), 2000);
    })
<<<<<<< HEAD
      .finally(() => alert("Promise ready"))
      .then(result => alert(result)); // <-- .then gestisce il risultato
    ```

    Ed ecco un errore nella promise, passata da `finally` a `catch`:
=======
      .finally(() => alert("Promise ready")) // triggers first
      .then(result => alert(result)); // <-- .then shows "value"
    ```

    As you can see, the `value` returned by the first promise is passed through `finally` to the next `then`.

    That's very convenient, because `finally` is not meant to process a promise result. As said, it's a place to do generic cleanup, no matter what the outcome was.

    And here's an example of an error, for us to see how it's passed through `finally` to `catch`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
<<<<<<< HEAD
      .finally(() => alert("Promise ready"))
      .catch(err => alert(err));  // <-- .catch gestisce l'oggetto errore
    ```  

    Questo è molto utile, perché finally non è inteso per processare i risultati della promise. Quindi li passa avanti.

    Parleremo di più della catena di promise ed il passaggio di risultati tra handler nel prossimo capitolo

3. Ultimo, ma non meno importante, `.finally(f)` è una sintassi più conveniente di `.then(f, f)`: non c'è bisogno di duplicare la funzione.

````smart header="Sulle promise ferme gli handler vengono eseguiti immediatamente"
Se una promise è pending, gli handler `.then/catch/finally` aspettano il risultato. Altrimenti, se una promise è già ferma, vengono eseguiti immediatamente:
=======
      .finally(() => alert("Promise ready")) // triggers first
      .catch(err => alert(err));  // <-- .catch shows the error
    ```

3. A `finally` handler also shouldn't return anything. If it does, the returned value is silently ignored.

    The only exception to this rule is when a `finally` handler throws an error. Then this error goes to the next handler, instead of any previous outcome.

To summarize:

- A `finally` handler doesn't get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
- If a `finally` handler returns something, it's ignored.
- When `finally` throws an error, then the execution goes to the nearest error handler.

These features are helpful and make things work just the right way if we use `finally` how it's supposed to be used: for generic cleanup procedures.

````smart header="We can attach handlers to settled promises"
If a promise is pending, `.then/catch/finally` handlers wait for its outcome.

Sometimes, it might be that a promise is already settled when we add a handler to it.

In such case, these handlers just run immediately:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
// una promise risolta immediatamente
let promise = new Promise(resolve => resolve("fatto!"));
      .catch(err => alert(err));  // <-- .catch handles the error object
   
promise.then(alert); // fatto! (viene mostrato in questo momento)
```

La cosa buona è: un handler `.then` è garantito per l'esecuzione sia che la promise prenda tempo o che si fermi immediatamente.

````

<<<<<<< HEAD
Ora, vediamo esempi più pratici di come le promise possano aiutarci a scrivere codice asincrono.

## Esempio: loadScript [#loadscript]

Abbiamo la funzione `loadScript` per caricare uno script dal capitolo precedente.
=======
## Example: loadScript [#loadscript]

Next, let's see more practical examples of how promises can help us write asynchronous code.

We've got the `loadScript` function for loading a script from the previous chapter.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ecco la variante basata sulle callback, giusto per ricordarcene:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

Riscriviamola usando le Promise.

La nuova funzione `loadScript` non richiederà una callback. Invece, creerà e ritornerà un oggetto Promise che risolve quando il caricamento è completo. Il codice esterno può aggiungervi handler (subscribing functions) usando `.then`:

```js run
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Errore di caricamento dello script per: ${src}`));

    document.head.append(script);
  });
}
```

Usage:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Un altro handler per fare qualcos\'altro'));
```

Possiamo immediatamente vedere alcuni benefit su pattern basato sulle callback:


| Promises | Callbacks |
|----------|-----------|
| Le promise ci permettono di fare le cose nell'ordine naturale. Prima, eseguiamo `loadScript(script)`, e poi (`.then`) scriviamo cosa fare con il risultato. | Dobbiamo avere una funzione `callback` a nostra disposizione quando chiamiamo `loadScript(script, callback)`. In altre parole, dobbiamo sapere cosa fare con il risultato *prima* che `loadScript` sia chiamato. |
| Possiamo chiamare `.then` su una Promise quante volte vogliamo. Ciascuna volta, stiamo aggiungendo un nuovo "fan", una nuova funzione iscritta (subscribing function), alla "lista degli abbonamenti (subscription list)". Maggiori informazioni a tal proposito nel prossimo capitolo: [](info:promise-chaining). | Ci può essere solo una callback. |

Quindi le Promise ci offrono un flusso migliore e maggiore flessibilità. Ma c'è di più. Lo vedremo nei prossimi capitoli
