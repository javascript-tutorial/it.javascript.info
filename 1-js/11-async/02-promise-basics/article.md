# Promise

Immagina di essere un cantante famoso, ed i fan ti chiedono giorno e notte del tuo nuovo singolo.

<<<<<<< HEAD
Per ottenere un po' di sollievo, gli prometti di inviarglielo una volta pubblicato. Dai ai tuoi fan una lista a cui si possono abbonare per gli aggiornamenti. Inserendo i propri indirizzi email, tutti gli abbonati riceveranno simultaneamente la canzone non appena disponibile. E anche se qualcosa andasse veramente male, ad esempio, se la pubblicazione della canzone fosse cancellata, ne riceveranno comunque notifica.
=======
To get some relief, you promise to send it to them when it's published. You give your fans a list. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, fire in the studio, so that you can't publish the song, they will still be notified.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Tutti sono felici, tu perchè le persone non ti staranno più con il fiato sul collo, e i fan, perchè non perderanno il singolo.

Questa è un'analogia, nella vita reale, di cose con cui abbiamo a che fare spesso nella programmazione:

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

<<<<<<< HEAD
La funzione passata a 'new Promise' è chiamata *esecutore (executor)*. Quando la promise è creata, questa funzione esecutore viene eseguita automaticamente. Contiene il codice produttore, che eventualmente produrrà un risultato. Nei termini dell'analogia precedente: l'esecutore è il "cantante".

L'oggetto `promise` risultante ha queste proprietà interne:

- `state` — inizialmente "pending", poi cambia con "fulfilled" o "rejected",
- `result` — un valore arbitrario di tua scelta, inizialmente `undefined`.

Quando l'esecutore finisce il lavoro (job), dovrebbe chiamare una delle funzioni che riceve come argomento:

- `resolve(value)` — per indicare che il lavoro è finito con successo:
    - imposta `state` come `"fulfilled"`,
    - imposta `result` come `value`.
- `reject(error)` — per indicare che si è verificato un errore:
    - imposta `state` come `"rejected"`,
    - imposta `result` come `error`.

![](promise-resolve-reject.svg)

Più avanti vedremo come questi cambiamenti diventano noti ai "fan".

Ecco un esempio del costruttore di una Promise ed una semplice funzione esecutore con il suo "codice produttore" (il `setTimeout`):
=======
The function passed to `new Promise` is called the *executor*. When the promise is created, it runs automatically. It contains the producing code, that should eventually produce a result. In terms of the analogy above: the executor is the "singer".

Its arguments `resolve` and `reject` are callbacks provided by JavaScript itself. Our code is only inside executor.

When the executor obtains the result, be it soon or late - doesn't matter, it should call one of these callbacks:

- `resolve(value)` — if the job finished successfully, with result `value`.
- `reject(error)` — if an error occurred, `error` is the error object.

So to summarize: the executor runs automatically, it should do a job and then call either `resolve` or `reject`.

The `promise` object returned by `new Promise` constructor has internal properties:

- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` called or `error` when `reject(error)` is called.

So the executor moves `promise` to one of these states:

![](promise-resolve-reject.svg)

Later we'll see how "fans" can subscribe to these changes.

Here's an example of a Promise constructor and a simple executor function with delayed "producing code" (via `setTimeout`):
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js run
let promise = new Promise(function(resolve, reject) {
  // la funzione è eseguita automaticamente quando la promise è costruita

  // dopo 1 secondo segnala che il lavoro è fatto con risultato "done"
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

Possiamo vedere due cose eseguendo il codice sopra:

1. L'esecutore è chiamato automaticamente ed immediatamente (da `new Promise`).
2. L'esecutore riceve due argomenti: `resolve` e `reject` — queste funzioni sono predefinite dal motore JavaScript. Quindi non abbiamo bisogno di crearle. Dovremo invece scrivere l'esecutore per chiamarle quando è il momento.

Dopo un secondo di "elaborazione" l'esecutore chiama `resolve("done")` per produrre il risultato:

![](promise-resolve-1.svg)

Questo era un esempio di un lavoro completato con successo, una "fulfilled promise".

Ed ora un esempio dell'esecutore respingere (rejecting) la promise con un errore:

```js
let promise = new Promise(function(resolve, reject) {
  // dopo 1 secondo segnala che il lavoro è finito con un errore
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

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

<<<<<<< HEAD
```smart header="Reject con oggetti `Error`"
Nel caso in cui qualcosa vada male, possiamo chiamare `reject` con qualunque tipo di argomento (come `resolve`). Ma è raccomandato utilizzare gli oggetti `Error` (o oggetti che estendono `Error`).
La ragione di questo sarà presto evidente.
=======
```smart header="Reject with `Error` objects"
In case something goes wrong, we must call `reject`. That can be done with any type of argument (just like `resolve`). But it is recommended to use `Error` objects (or objects that inherit from `Error`). The reasoning for that will soon become apparent.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
```

````smart header="Chiamare immediatamente `resolve`/`reject`"
In pratica, un esecutore di norma fa qualcosa in modo asincrono e chiama `resolve`/`reject` dopo un po' di tempo, ma non è obbligato a farlo. Possiamo anche chiamare `resolve` o `reject` immediatamente, come sotto:

```js
let promise = new Promise(function(resolve, reject) {
  // non prendiamo il nostro tempo per svolgere il lavoro
  resolve(123); // diamo immediatamente il risultato: 123
});
```

<<<<<<< HEAD
Per esempio, questo può accadere quando iniziamo a fare un lavoro ma poi vediamo che tutto è già stato completato.
=======
For instance, this might happen when we start to do a job but then see that everything has already been completed and cached.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Questo va bene. Abbiamo immediatamente una Promise soddisfatta, non c'è niente di sbagliato in questo.
````

<<<<<<< HEAD
```smart header="`state` e `result` sono interni"
Le proprietà `state` e `result` dell'oggetto Promise sono interne. Non possiamo accedervi direttamente dal nostro "codice consumatore". Possiamo usare i metodi `.then`/`.catch`/`.finally` per questo. Questi metodi sono descritti sotto.
=======
```smart header="The `state` and `result` are internal"
The properties `state` and `result` of the Promise object are internal. We can't directly access them. We can use the methods `.then`/`.catch`/`.finally` for that. They are described below.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
```

## Consumatori (consumers): then, catch, finally

Un oggetto Promise fa da collegamento tra l'esecutore (il "codice produttore" o "cantante") e le funzioni consumatore (i "fan"), che riceveranno il risultato o un errore. Le funzioni consumatori possono essere registrate (subscribed) usando i metodi `.then`, `.catch` e `.finally`.

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
Il primo argomento di `.then` è una funzione che:

1. viene eseguita quando la Promise è soddisfatta (resolved), e
2. riceve il risultato.

Il secondo argomento di `.then` è una funzione che:

1. viene eseguita quando la Promise è respinta, e
2. riceve l'errore.
=======
The first argument of `.then` is a function that runs when the promise is resolved, and receives the result.

The second argument of `.then` is a function that runs when the promise is rejected, and receives the error.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

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

### finally

Proprio come c'è la clausola `finally` in un regolare `try {...} catch {...}`, c'è `finally` nelle promise.

<<<<<<< HEAD
La chiamata `.finally(f)` è simile a `.then(f, f)` nel senso che viene sempre eseguita quando la promise è ferma (settled): che sia soddisfatta o respinta.
=======
The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` always runs when the promise is settled: be it resolve or reject.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

`finally` è un buon handler per fare pulizia, ad esempio fermare i nostri indicatori di caricamento, dato che non sono più necessari, indipendentemente dall'esito.

Ad esempio:

```js
new Promise((resolve, reject) => {
  /* fa qualcosa che prende tempo, poi chiama resolve/reject */
})
*!*
  // viene eseguito quando la promise è ferma (settled), non conta se con successo o no
  .finally(() => ferma l'indicatore di caricamento)
*/!*
  .then(result => show result, err => mostra l'errore)
```

Tuttavia non è esattamente un alias. Ci sono diverse importanti differenze:

1. Un handler `finally` non ha argomenti. In `finally` non sappiamo se la promise ha successo oppure no. Questo va bene, dato che il nostro compito è solitamente quello di eseguire procedure di finalizzazione "generiche".
2. Finally passa risultati ed errori al prossimo handler.

    Per esempio, qui il risultato è passato da `finally` a `then`:
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("result"), 2000)
    })
      .finally(() => alert("Promise ready"))
      .then(result => alert(result)); // <-- .then gestisce il risultato
    ```

    Ed ecco un errore nella promise, passata da `finally` a `catch`:

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
      .finally(() => alert("Promise ready"))
      .catch(err => alert(err));  // <-- .catch gestisce l'oggetto errore
    ```  

    Questo è molto utile, perché finally non è inteso per processare i risultati della promise. Quindi li passa avanti.

    Parleremo di più della catena di promise ed il passaggio di risultati tra handler nel prossimo capitolo

3. Ultimo, ma non meno importante, `.finally(f)` è una sintassi più conveniente di `.then(f, f)`: non c'è bisogno di duplicare la funzione.

<<<<<<< HEAD
````smart header="Sulle promise ferme gli handler vengono eseguiti immediatamente"
Se una promise è pending, gli handler `.then/catch/finally` aspettano il risultato. Altrimenti, se una promise è già ferma, vengono eseguiti immediatamente:
=======
````smart header="On settled promises handlers runs immediately"
If a promise is pending, `.then/catch/finally` handlers wait for it. Otherwise, if a promise has already settled, they execute immediately:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js run
// una promise risolta immediatamente
let promise = new Promise(resolve => resolve("fatto!"));

promise.then(alert); // fatto! (viene mostrato in questo momento)
```
<<<<<<< HEAD

La cosa buona è: un handler `.then` è garantito per l'esecuzione sia che la promise prenda tempo o che si fermi immediatamente.
=======
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
````

Ora, vediamo esempi più pratici di come le promise possano aiutarci a scrivere codice asincrono.

## Esempio: loadScript [#loadscript]

Abbiamo la funzione `loadScript` per caricare uno script dal capitolo precedente.

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

<<<<<<< HEAD
promise.then(script => alert('Un altro handler per fare qualcos\'altro'));
=======
promise.then(script => alert('Another handler...'));
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
```

Possiamo immediatamente vedere alcuni benefit su pattern basato sulle callback:


| Promises | Callbacks |
|----------|-----------|
| Le promise ci permettono di fare le cose nell'ordine naturale. Prima, eseguiamo `loadScript(script)`, e poi (`.then`) scriviamo cosa fare con il risultato. | Dobbiamo avere una funzione `callback` a nostra disposizione quando chiamiamo `loadScript(script, callback)`. In altre parole, dobbiamo sapere cosa fare con il risultato *prima* che `loadScript` sia chiamato. |
| Possiamo chiamare `.then` su una Promise quante volte vogliamo. Ciascuna volta, stiamo aggiungendo un nuovo "fan", una nuova funzione iscritta (subscribing function), alla "lista degli abbonamenti (subscription list)". Maggiori informazioni a tal proposito nel prossimo capitolo: [](info:promise-chaining). | Ci può essere solo una callback. |

<<<<<<< HEAD
Quindi le Promise ci offrono un flusso migliore e maggiore flessibilità. Ma c'è di più. Lo vedremo nei prossimi capitoli
=======
So promises give us better code flow and flexibility. But there's more. We'll see that in the next chapters.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
