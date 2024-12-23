
# Gestione degli errori con le promise

Le azioni asincrione a volte possono fallire: in caso di errore la promise corrispondente viene respinta (rejected). Per esempio, `fetch` fallisce se il server remoto non è disponibile. Possiamo usare `.catch` per gestire gli errori (rejections).

IL concatenemanto delle Promise è ottimo sotto questo aspetto. Quando una promise viene rifiutata (rejects), il controllo passa al gestore del rifiuto (rejection handler) più vicino nella catena. Questo è molto conveniente.

Per esempio, nel codice sotto l'URL è errato (no such server) e `.catch` gestisce l'errore:

```js run
*!*
fetch('https://no-such-server.blabla') // viene respinta (rejects)
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (il testo può variare)
```

Oppure, forse, è tutto a posto con il server, ma la risposta non è JSON valido:

```js run
fetch('/') // fetch funziona bene adesso, il server risponde con successo
*!*
  .then(response => response.json()) // viene respinta (rejects): the page is HTML, not a valid json
*/!*
  .catch(err => alert(err)) // SyntaxError: Unexpected token < in JSON at position 0
```

Il modo più facile di catturare (catch) è di mettere `.catch` alla fine della catena:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

Normalmente, `.catch` non viene eseguito, perchè non ci sono errori. Ma se una qualsiasi delle promise sopra viene respinta (un errore di rete o JSON invalido o qualunque cosa), allora l'errore verrebbe catturato.

## Try..catch implicito

Il codice di un esecutore (executor) e dei gestori (handlers) delle promise hanno un "`try..catch` invisibile". Se si verifica un errore, viene catturato e gestitito come un rigettamento (rejection).

Per esempio, questo codice:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...Funziona esattamente come questo:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

Il "`try..catch` invisibile" intorno all'esecutore (executor) cattura (catches) automaticamente l'errore e lo tratta come un rigettamento (rejection).

Questo accade non solo nell'esecutore (executor), ma anche nei suoi gestori (handlers). Se lanciamo (`throw`) dentro un gestore (handler)`.then`, questo significa una promise respinta (rejected), così il controllo salta al gestore (handler)  degli errori più vicino.

Ecco un esempio:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // respinge (rejects) la promise
*/!*
}).catch(alert); // Error: Whoops!
```

Questo accade per tutti gli errori, non solo quelli causati dallo statement `throw`. Per esempio, un errore di programmazione:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // non esiste la funzione
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

Il `.catch` finale non solo cattura (catches) i rigettamenti (rejections) espiciti, ma anche gli errori occasionali nei gestori (handlers) .

## Rethrowing

Come abbiamo già notato, `.catch` si comporta come `try..catch`. Possiamo avere tutti i gestori (handler) `.then` che vogliamo, e poi usare un solo `.catch` alla fine per gestire tutti gli errori al loro interno.

In un normale `try..catch` possiamo analizzare l'errore e magari rilanciarlo (rethrow) se non può essere gestito. È possibile fare lo stesso con le promise.

Se lanciamo (`throw`) dentro `.catch`, allora il controllo va al gestore (handler) più vicino. E se gestiamo l'errore e finiamo normalmente, allora continua al prossimo gestore (handler) `.then` per i casi di successo.

Nell'esempio sotto, `.catch` gestisce con successo l'errore:

```js run
// esecuzione: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("L'errore è gestito, continua normalmente");

}).then(() => alert("Il prossimo gestore (handler) per i casi di successo viene eseguito"));
```

Qui il blocco `.catch` finisce normalmente. Così il prossimo gestore (handler) `.then` viene chiamato.

Nell'esempio sotto vediamo l'altra situazione con  `.catch`. Il gestore (handler) `(*)` cattura (catches) l'errore e non può gestirlo (e.g. sa solo come gestire `URIError`), quindi lo solleva (throws) di nuovo:

```js run
// esecuzione: catch -> catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // gestiscilo
  } else {
    alert("Non posso gestire l'errore");

*!*
    throw error; // lanciare questo o un altro errore ci fa saltare al prossimo catch
*/!*
  }

}).then(function() {
  /* non viene mai eseguito */
}).catch(error => { // (**)

  alert(`Si è verificato un errore sconosciuto: ${error}`);
  // non ritornare nulla => l'esecuzione procede normalmente

});
```

Poi l'esecuzione passa dal primo `.catch` `(*)` al prossimo `(**)` giù per la catena.

Nella sezione sotto vedremo un pratico esempio di risollevamento (rethrowing).

## Gestione degli errori di fetch

Miglioriamo la gestione degli errori per l'esempio del caricamento degli utenti.

La promise ritornata da [fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) viene respinta (rejects) quando è impossibile fare una richiesta. Per esempio, un server remoto non è disponibile, o l'URL è malformato. Ma se il server remoto risponde con un errore 404, o anche un errore 500, allora è considerata una risposta valida.

Cosa accade se il server ritorna una pagina non JSON con un errore 500 nella linea `(*)`? Cosa accade se l'utente non esiste e GitHub ritorna una pagina conun errore 404 a `(**)`?

```js run
fetch('no-such-user.json') // (*)
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`)) // (**)
  .then(response => response.json())
  .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
  // ...
```


Allo stato attuale, il codice prova comunque a caricare la risposta come JSON e muore  con un errore di sintassi. Lo puoi vedere eseguendo l'esempio sopra, dato che il file `no-such-user.json` non esiste.

Questo non è buono, perchè l'errore va semplicemente giù nella catena, senza dettagli: cosa è fallito e dove.

Quindi aggiungiamo un altro passo: dovremmo controllare la proprietà `response.status` che ha lo stato HTTP, e se non è 200, allora lanciare un errore.

```js run
class HttpError extends Error { // (1)
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) { // (2)
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // HttpError: 404 for .../no-such-user.json
```

1. Creiamo una classe custom per gli errori HTTP per distinguerli dagli altri tipi di errore. Inoltre, la nuova classe ha un costruttore che accetta l'oggetto `response` e lo salva nell'errore. Così il codice per la gestione degli errori sarà in grado di accedervi.
2. Dopo mettiamo insieme il codice per effettuare la richiesta e per gestire gli errori in una funzione che recupera l'`url` *e* tratta  ogni stato non 200 come un errore. È conveniente, perchè spesso avremo bisogno di una logica simile.
3. Ora `alert` mostra un messaggio più utile e descrittivo.

Il bello di avere una nostra classe per gli errori è che possiamo facilmente verificarli nel nostro codice di gestione degli errori.

Per esempio, possiamo fare una richiesta, e poi se riceviamo un 404 -- chiedere all'utente di modificare l'informazione.

Il codice sotto carica un utente con il nome da GitHub. Se non c'è l'utente, allora chiede il nome corretto:

```js run
function demoGithubUser() {
  let name = prompt("Inserire un nome", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
*!*
      if (err instanceof HttpError && err.response.status == 404) {
*/!*
        alert("Utente inesistente, per favorlo nuovamente.");
        return demoGithubUser();
      } else {
        throw err; // (*)
      }
    });
}

demoGithubUser();
```

Notare che: `.catch` cattura tutti gli errori, ma "sa come gestire" solo `HttpError 404`. In questo caso particolare  significa che non esiste l'utente, e `.catch` in questo caso riprova semplicemente.

Per altri errori, non ha idea di cosa possa andare stoto. Magari un errore di programmazione o altro. Quindi semplicemente lo risoleva nella linea `(*)`.

## Rigetti non gestiti (unhandled rejections)

Cosa accade se un errore non è gestito? Per esempio, dopo il risollevamento `(*)` nell'esempio sopra.

Oppure possiamo semplicemente dimenticarci di aggiungere un gestore (handler) dell'errore alla fine della catena, come qui:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Errore qui (non esiste la funzione)
})
  .then(() => {
    // zero o molti handler di promise
  }); // senza .catch alla fine!
```


Nel caso di un errore, lo stato della promise diventa "rejected", e l'esecuzione dovrebbe saltare al gestore del respingimento (rejection handler). Ma negli esempi sopra non c'è questo gestore (handler). Quindi l'errore porta ad un "blocco".

In pratica, proprio come con un normale errore non gestito, significa che qualcosa è andato terribilmente storto.

Cosa accade quando viene sollevato un errore e non viene gestito da `try..catch`? Lo script muore. Lo stesso accade con una promise rigettata che non viene gestita.

La maggior parte dei motori JavaScript tracciano queste situazioni e generano un errore globale in questo caso. Possiamo vederlo nella console.


Nel browser possiamo catturare (catch) questi errori usando `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // L'oggetto evento ha due proprietà speciali:
  alert(event.promise); // [object Promise] - la promise che ha causato l'errore
  alert(event.reason); // Error: Whoops! - L'oggetto errore non gestito
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // nessun catch per gestire l'errore 
```

L'evento è parte dello [standard HTML](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

Se un errore si verifica, e non c'è nessun `.catch`, il gestore (handler) `unhandledrejection` viene lanciato, e riceve l'oggetto `event` con le informazioni riguardanti l'errore, in questo modo possiamo fare qualcosa.

Solitamente questi errori sono irrecuperabili, quindi la cosa migliore da fare è informare l'utente del problema e probabilmente riportare l'incidente al server.

In ambienti esterni al browser come Node.js ci sono altri modi simili di tracciare gli errori non gestiti.


## Riepilogo

- `.catch` gestisce i respingimenti (rejections) delle promise di tutti i tipi: che sia una chiamata `reject()`, o un errore sollevato in un gestore (handler).
- Dovremmo mettere `.catch` esattamente nei posti in cui  vogliamo gestire gli errori sapendo come gestirli. Il gestore (handler) dovrebbe analizzare gli errori (Le classi di errori ci sono di aiuto) e ri-sollevare (rethrow) quelli sconosciuti.
- È normale non usare `.catch` se non sappiamo come gestire gli errori (tutti gli errori sono irrecuperabili).
- In ogni caso dovremmo avere i gestore (handler) dell'evento `unhandledrejection` (per il browser e quelli analoghi per gli altri ambienti), per tracciare gli errori non gestiti ed informarne l'utente (e probabilmente il nostro server), così che non accada mai che la nostra app "muoia e basta".

Ed infine, se abbiamo l'indicatore di caricamento, allora `.finally` è un ottimo gestore (handler) per fermarlo quando il caricamento è completo:

```js run
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

*!*
  document.body.style.opacity = 0.3; // (1) avvia l'indicatore
*/!*

  return loadJson(`https://api.github.com/users/${name}`)
*!*
    .finally(() => { // (2) stop the indication
      document.body.style.opacity = '';
      return new Promise(resolve => setTimeout(resolve)); // (*)
    })
*/!*
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Utente inesistente, per favorlo nuovamente.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

Qui nella linea `(1)` indichiamo il caricamento oscurando il documento. Il metodo non conta, avremmo potuto usare qualunque altro tipo di indicazione.

Quando la promise è ferma (settled), che sia un fetch con successo o un errore, `finally` viene lanciato nella linea `(2)`  ferma l'indicatore.

<<<<<<< HEAD
C'è un piccolo trucco per i browser `(*)` nel ritornare una promise con timeout zero da `finally`. Questo perché alcuni browser (come Chrome) hanno bisogno "di un po' di tempo" fuori dai gestori (handlers) per diegnare cambiamenti al documento. Questo assicura che l'indicazione è visivamente ferma prima di andare avanti nella catena.
=======
- `.catch` handles errors in promises of all kinds: be it a `reject()` call, or an error thrown in a handler.
- `.then` also catches errors in the same manner, if given the second argument (which is the error handler).
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
- It's ok not to use `.catch` at all, if there's no way to recover from an error.
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never "just dies".
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
