# Promise

Immagina di essere un cantante famoso, ed i fan ti chiedono giorno e notte del tuo nuovo singolo.

Per ottenere un po' di sollievo, gli prometti di inviarglielo una volta pubblicato. Dai ai tuoi fan una lista a cui si possono abbonare per gli aggiornamenti. Inserendo i propri indirizzi email, tutti gli abbonati riceveranno simultaneamente la canzone non appena disponibile. E anche se qualcosa andasse veramente male, ad esempio, se la pubblicazione della canzone fosse cancellata, ne riceveranno comunque notifica.

Tutti sono felici, tu perchè le persone non ti staranno più con il fiato sul collo, e i fan, perchè non perderanno il singolo.

Questa è un'analogia, nella vita reale, di cose con cui abbiamo a che fare spesso nella programmazione:

<<<<<<< HEAD
1. Un "codice produttore" (producing code) che fa qualcosa e che richiede tempo. Per esempio, il codice che carica uno script remoto. Questo è un "cantante".
2. Un "codice consumatore" (consuming code) che vuole il risultato del "codice produttore" una volta che è pronto. Molte funzioni possono aver bisogno di questo risultato. Queste sono i "fan".
3. Una *promise* è uno speciale oggetto JavaScript che collega il "codice produttore" con il "codice consumatore". Nei termini della nostra analogia: questa è "la lista abbonamenti". Il "codice produttore" si prende tutto il tempo necessario a produrre il risultato promesso, e la "promise" rende il risultato disponibile per tutto il codice iscritto quando è pronto.
=======
1. A "producing code" that does something and takes time. For instance, the code loads data over a network. That's a "singer".
2. A "consuming code" that wants the result of the "producing code" once it's ready. Many functions  may need that result. These are the "fans".
3. A *promise* is a special JavaScript object that links the "producing code" and the "consuming code" together. In terms of our analogy: this is the "subscription list". The "producing code" takes whatever time it needs to produce the promised result, and the "promise" makes that result available to all of the subscribed code when it's ready.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

L'analogia non è completamente accurata, perché le promise di JavaScript sono più complesse di una semplice lista di abbonamenti: hanno altre caratteristiche e limiti. Ma va bene per iniziare.

La sintassi del costruttore per un oggetto promise è:

```js
let promise = new Promise(function(resolve, reject) {
  // esecutore (il codice produttore, "cantante")
});
```

La funzione passata a 'new Promise' è chiamata *esecutore (executor)*. Quando la promise è creata, questa funzione esecutore viene eseguita automaticamente. Contiene il codice produttore, che eventualmente produrrà un risultato. Nei termini dell'analogia precedente: l'esecutore è il "cantante".

L'oggetto `promise` risultante ha queste proprietà interne:

<<<<<<< HEAD
- `state` — inizialmente "pending", poi cambia con "fulfilled" o "rejected",
- `result` — un valore arbitrario di tua scelta, inizialmente 'undefined'.
=======
- `state` — initially "pending", then changes to either "fulfilled" or "rejected",
- `result` — an arbitrary value, initially `undefined`.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Quando l'esecutore finisce il lavoro (job), dovrebbe chiamare una delle funzioni che riceve come argomento:

- `resolve(value)` — per indicare che il lavoro è finito con successo:
    - imposta `state` come `"fulfilled"`,
    - imposta `result` come `value`.
- `reject(error)` — per indicare che si è verificato un errore:
    - imposta `state` come `"rejected"`,
    - imposta `result` come `error`.

![](promise-resolve-reject.png)

Più avanti vedremo come questi cambiamenti diventano noti ai "fan".

Ecco un esempio del costruttore di una Promise ed una semplice funzione esecutore con il suo "codice produttore" (il `setTimeout`):

```js run
let promise = new Promise(function(resolve, reject) {
  // la funzione è eseguita automaticamente quando la promise è costruita

  // dopo 1 secondo segnala che il lavoro è fatto con risultato "done"
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

Possiamo vedere due cose eseguendo il codice sopra:

<<<<<<< HEAD
1. L'esecutore è chiamato automaticamente ed immediatamente (da `new Promise`).
2. L'esecutore riceve due argomenti: `resolve` e `reject` — queste funzioni sono predefinite dal motore JavaScript. Quindi non abbiamo bisogno di crearle. Dovremo invece scrivere l'esecutore per chiamarle quando è il momento.
=======
1. The executor is called automatically and immediately (by the `new Promise`).
2. The executor receives two arguments: `resolve` and `reject` — these functions are pre-defined by the JavaScript engine. So we don't need to create them. We only should call one of them when ready.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Dopo un secondo di "elaborazione" l'esecutore chiama `resolve("done")` per produrre il risultato:

![](promise-resolve-1.png)

Questo era un esempio di un lavoro completato con successo, una "fulfilled promise".

Ed ora un esempio dell'esecutore respingere (rejecting) la promise con un errore:

```js
let promise = new Promise(function(resolve, reject) {
  // dopo 1 secondo segnala che il lavoro è finito con un errore
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

![](promise-reject-1.png)

Per riassumere, l'esecutore dovrebbe svolgere un lavoro (di solito qualcosa che richiede tempo) e successivamente chiamare `resolve` o `reject` per cambiare lo stato dell'oggetto Promise corrispondente.

<<<<<<< HEAD
La Promise che è soddisfatta (resolved) o respinta (rejected) è chiamata "ferma (settled)", al contrario di Promise "in attesa (pending)".
=======
The Promise that is either resolved or rejected is called "settled", as opposed to a initially "pending" Promise.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

````smart header="Può esserci solo un risultato (result) o un errore (error)"
L'esecutore può chiamare solo un `resolve` o un `reject`. Il cambiamento di stato della promise è definitivo.

Tutte le chiamate successive a 'resolve' o 'reject' sono ignorate:

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

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

<<<<<<< HEAD
Per esempio, questo può accadere quando iniziamo a fare un lavoro ma poi vediamo che tutto è già stato completato.

Questo va bene. Abbiamo immediatamente una Promise soddisfatta, non c'è niente di sbagliato in questo.
=======
For instance, this might happen when we start to do a job but then see that everything has already been completed and  cached.

That's fine. We immediately have a resolved promise.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
````

```smart header="`state` e `result` sono interni"
Le proprietà `state` e `result` dell'oggetto Promise sono interne. Non possiamo accedervi direttamente dal nostro "codice consumatore". Possiamo usare i metodi `.then`/`.catch`/`.finally` per questo. Questi metodi sono descritti sotto.
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

Il primo argomento di `.then` è una funzione che:

<<<<<<< HEAD
1. viene eseguita quando la Promise è soddisfatta (resolved), e
2. riceve il risultato.
=======
1. runs when the promise is resolved, and
2. receives the result.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Il secondo argomento di `.then` è una funzione che:

<<<<<<< HEAD
1. viene eseguita quando la Promise è respinta, e
2. riceve l'errore.

Per esempio, ecco una reazione ad una promise soddisfatta:
=======
1. runs when the promise is rejected, and
2. receives the error.

For instance, here's a reaction to a successfully resolved promise:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

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
*/!*
  .then(result => show result, err => mostra l'errore)
```

<<<<<<< HEAD
Tuttavia non è esattamente un alias. Ci sono diverse importanti differenze:

1. Un handler `finally` non ha argomenti. In `finally` non sappiamo se la promise ha successo oppure no. Questo va bene, dato che il nostro compito è solitamente quello di eseguire procedure di finalizzazione "generiche".
2. Finally passa risultati ed errori al prossimo handler.
=======
It's not exactly an alias of `then(f,f)` though. There are several important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.
2. A `finally` handler passes through results and errors to the next handler.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

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

<<<<<<< HEAD
    Questo è molto utile, perché finally non è inteso per processare i risultati della promise. Quindi li passa avanti.
=======
    That's very convenient, because `finally` is not meant to process a promise result. So it passes it through.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    Parleremo di più della catena di promise ed il passaggio di risultati tra handler nel prossimo capitolo

<<<<<<< HEAD
3. Ultimo, ma non meno importante, `.finally(f)` è una sintassi più conveniente di `.then(f, f)`: non c'è bisogno di duplicare la funzione.
=======
3. Last, but not least, `.finally(f)` is a more convenient syntax than `.then(f, f)`: no need to duplicate the function `f`.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

````smart header="Sulle promise ferme gli handler vengono eseguiti immediatamente"
Se una promise è pending, gli handler `.then/catch/finally` aspettano il risultato. Altrimenti, se una promise è già ferma, vengono eseguiti immediatamente:

```js run
// una promise risolta immediatamente
let promise = new Promise(resolve => resolve("fatto!"));

promise.then(alert); // fatto! (viene mostrato in questo momento)
```

La cosa buona è: un handler `.then` è garantito per l'esecuzione sia che la promise prenda tempo o che si fermi immediatamente.
````

Ora, vediamo esempi più pratici di come le promise possano aiutarci a scrivere codice asincrono.

## Esempio: loadScript

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
<<<<<<< HEAD
    script.onerror = () => reject(new Error(`Errore di caricamento dello script per: ${src}`));
=======
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

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
