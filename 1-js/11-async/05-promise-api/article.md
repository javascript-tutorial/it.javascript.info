# Promise API

Esistono 5 metodi statici nella classe `Promise` . Qui copriremo rapidamente il loro casi d'uso.

<<<<<<< HEAD
## Promise.resolve

La sintassi:

```js
let promise = Promise.resolve(value);
```

Ritorna la promise risolta  (resolved) con il valore (`value`) dato.

Esattamente come:

```js
let promise = new Promise(resolve => resolve(value));
```

Il metodo è usato quando abbiamo già un valore ma lo vogliamo avre inglobato (wrapped) dentro una promise.

Per esempio, la funzione `loadCached` chiama l'`url` e ricorda il risultato, così che le chiamate future allo stesso URL lo ritorneranno immediatamente:

```js
function loadCached(url) {
  let cache = loadCached.cache || (loadCached.cache = new Map());

  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Possiamo usare `loadCached(url).then(…)`, sappiamo con certezza che la funzione ritornerà una promise. Questo è lo scopo che `Promise.resolve` serve nella linea `(*)`: rende sicuro che l'interfaccia sia unificata. Possiamo sempre usare `.then` dopo `loadCached`.

## Promise.reject

La sintassi:

```js
let promise = Promise.reject(error);
```

Crea una promise respinta (rejected) con l'errore (`error`).

Esattamente come:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

La compriamo per poiché, poichè è usata raramente in codice reale.

=======
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
## Promise.all

Diciamo che vogliamo eseguire molte promise in parallelo, e aspettare che siano tutte pronte.

Per esempio, scaricare da diversi URL in parallelo e processare il contenuto quando abbiamo finito con tutti.

Ecco a cosa serve `Promise.all`.

La sintassi è:

```js
let promise = Promise.all([...promises...]);
```

<<<<<<< HEAD
Accetta un array di promise (tecnicamente si può usare qualsiasi iterabile, ma solitamente si usa un array) e ritorna una nuova promise.

La nuova promise risolve (resolves) quando tutte le promise elencate sono ferme (settled) ed ha un array dei loro risultati (?).
=======
`Promise.all` takes an array of promises (technically can be any iterable, but usually an array) and returns a new promise.

The new promise resolves when all listed promises are settled and the array of their results becomes its result.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Per esempio, il `Promise.all` sotto si ferma (settles) dopo 3 secondi, ed il suo risultato è un array `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 quando le promise sono pronte: ogni promise contribuisce con un membro dell'array
```

<<<<<<< HEAD
È da notare che l'ordine relativo rimane lo stesso. Anche se la prima promise prendesse il tempo più lungo per risolversi (resolve), il suo risultato sarà sempre il primo nell'array dei risultati.
=======
Please note that the order of resulting array members is the same as source promises. Even though the first promise takes the longest time to resolve, it's still first in the array of results.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Un trucco comune consiste nel mappare array of di dati da lavorare in un array di promise, per poi avvolgerli (to wrap) in `Promise.all`.

Per esempio, se abbiamo un array di URL, possiamo scaricarli tutti così:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// mappiamo tutti gli url con la promise ritornata da fetch
let requests = urls.map(url => fetch(url));

/// Promise.all attende fino a quando tutti i job sono risolti (resolved)
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

Un esempio migliore in cui scarichiamo informazioni utente per un array di utenti di GitHub in base al loro nome (potremmo scaricare una matrice di merci in base ai rispettivi id, la logica è la stessa)

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
<<<<<<< HEAD
    // tutte le risposte sono pronte, possiamo mostrare i loro codici di stato HTTP
=======
    // all responses are resolved successfully
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // mostra 200 per ogni url
    }

    return responses;
  })
  // mappa l'array di risposte in un array di response.json() per leggere il loro contenuto
  .then(responses => Promise.all(responses.map(r => r.json())))
  // è stato fatto il parsing JSON di tutte le risposte JSON: "users" è l'array con i risultati
  .then(users => users.forEach(user => alert(user.name)));
```

**Se una qualsiasi delle promise è respinta (rejected), `Promise.all` viene immediatamente respinta (rejects) con l'errore.**

Per esempio:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

Qui la seconda promise viene respinta (rejects) in due secondi. Questo porta al rigetto immediato di `Promise.all`, così `.catch` viene eseguito: l'errore del rigetto diventa il risultato di tutto `Promise.all`.

```warn header="In caso di errore, le altre promise vengono ignorate"
Se una promise è respinta (rejects), `Promise.all` è immediatamente respinto, dimenticando completamente delle altre nella lista. I loro risultati sono ignorati.

Per esempio, se ci sono molte chiamate `fetch` , come nell'esempio sopra, ed una di esse fallisce, le altre continueranno ad essere eseguite, ma `Promise.all` le ignorerà. Probabilmente poi si fermeranno (settle), ma il loro risultato sarà ignorato.

`Promise.all` non fa niente per cancellarle, perché nelle promise non esiste il concetto di "cancellazione". In [un'altro capitolo](fetch-abort) copriremo `AbortController` il cui scopo è aiutarci ocn questo, but ma non è una pare delle API Promise.
```

<<<<<<< HEAD
````smart header="`Promise.all(...)` accetta oggetti non-promise in un `iterable`"
Normalmente, `Promise.all(...)` accetta un iterabile (nella maggior parte dei casi un array) di promises. Ma se uno qualsiasi di questi oggetti non è una promise, viene "avvolto" (wrapped) in `Promise.resolve`.
=======
````smart header="`Promise.all(iterable)` allows non-promise \"regular\" values in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's passed to the resulting array "as is".
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Per esempio, qui i risultati sono `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
<<<<<<< HEAD
  2, // trattato come Promise.resolve(2)
  3  //trattato come Promise.resolve(3)
=======
  2,
  3  
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
]).then(alert); // 1, 2, 3
```

Così siamo in grado di passare valori non-promise a `Promise.all` quando conveniente.

````

## Promise.allSettled

[recent browser="new"]

<<<<<<< HEAD
`Promise.all` viene respinto interamente se una sola delle promise viene respinta. Questo è buono in alcuni casi, quando abbiamo bisogno di *tutti* i risultati per proseguire:
=======
`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results to go on:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
<<<<<<< HEAD
]).then(render); // il metodo render ha bisogno di tutti i risultati
```

`Promise.allSettled` aspetta che tutte le promise siano ferme (settled): anche se una viene respinta (rejects), aspetta per le altre. L'array risultante ha:
=======
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` waits for all promises to settle. The resulting array has:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

- `{status:"fulfilled", value:result}` per le risposte con successo,
- `{status:"rejected", reason:error}` per gli errori.

<<<<<<< HEAD
Per esempio, ci piacerebbe scaricare le informazioni su diversi utenti. Anche se una richiesta fallisce, siamo interessati alle altre .
=======
For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Usiamo `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

I risultati (`results`) nella linea `(*)` sopra saranno:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

<<<<<<< HEAD
Così, per ogni promise otteniamo il suo stato e `valore/ragione`.
=======
So, for each promise we get its status and `value/error`.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

### Polyfill

Se il broser non supporta `Promise.allSettled`, è facile usare un polyfill:

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      state: 'fulfilled',
      value
    }), reason => ({
      state: 'rejected',
      reason
    }))));
  };
}
```

<<<<<<< HEAD
In questo codice, `promises.map` prende i valori in ingresso, li "trasforma" in promises (nel caso in cui sia stata passata una non-promise) con `p => Promise.resolve(p)`, e poi vi aggiunge il gestore (handler) `.then`.
=======
In this code, `promises.map` takes input values, turns into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Il gestore handler "trasforma" un risultato positivo  `v` in `{state:'fulfilled', value:v}`, ed un errore `r` in `{state:'rejected', reason:r}`. Questo è esattamente il formato di `Promise.allSettled`.

Poi possiamo usare il risultato di `Promise.allSettled` per ottenere i risultati di *tutte* le promise date, anche se alcune venissero respinte.

## Promise.race

<<<<<<< HEAD
Similmente a `Promise.all`, accetta un iterabile di promise, ma invece di attendere che siano tutte finite, aspetta per il primo risultato (o errore), e va avanti con quello.
=======
Similar to `Promise.all`, but waits only for the first settled promise, and gets its result (or error).
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

La sintassi è:

```js
let promise = Promise.race(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

<<<<<<< HEAD
Così, il primo risultato/errore diventa il risultato di tutto `Promise.race`. Quando la prima promise ferma (settled) "vince la gara" (wins the race), tutti i risultati/errori successivi sono ignorati.
=======
The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.


## Promise.resolve/reject

Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it in [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness, and for those who can't use `async/await` for some reason.

- `Promise.resolve(value)` creates a resolved promise with the result `value`.

Same as:

```js
let promise = new Promise(resolve => resolve(value));
```

The method is used for compatibility, when a function is expected to return a promise.

For example, `loadCached` function below fetches URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so that the returned value is always a promise:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

We can write `loadCached(url).then(…)`, because the function is guaranteed to return a promise. We can always use `.then` after `loadCached`. That's the purpose of `Promise.resolve` in the line `(*)`.

### Promise.reject

- `Promise.reject(error)` creates a rejected promise with `error`.

Same as:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

In practice, this method is almost never used.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

## Riassunto

There are 5 static methods of `Promise` class:

<<<<<<< HEAD
1. `Promise.resolve(value)` -- crea una promise risolta (resolved) con il valore dato.
2. `Promise.reject(error)` -- crea una promise respinta (rejected) con il valore dato.
3. `Promise.all(promises)` -- aspetta che tutte le promise siano risolte e ritorna  array un array dei loro risultati. Se una qualsiasi delle promise date viene respinta, allora diventa l'errore di `Promise.all`, e tutti gli altri risutlati sono ignorati.
4. `Promise.allSettled(promises)` (un nuovo metodo) -- aspetta che tutte le promises vengano risolte o respinte  e ritornia un array dei loro risultati come oggetti con questa forma:
    - `state`: `'fulfilled'` or `'rejected'`
    - `value` (se risolta ((fulfilled) o `reason` (se respinta (rejected)).
5. `Promise.race(promises)` -- aspetta che la prima promise sia ferma (settle), ed il suo risultato/errore diventa il risultato.
=======
1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, then it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as array of objects with:
    - `state`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.resolve(value)` -- makes a resolved promise with the given value.
5. `Promise.reject(error)` -- makes a rejected promise with the given error.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Di questi cinque, `Promise.all/allSettled` sono i più comuni in pratica.
