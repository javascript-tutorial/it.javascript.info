# Promise API

Esistono 6 metodi statici nella classe `Promise`. Qui copriremo rapidamente il loro casi d'uso.

## Promise.all

Diciamo che vogliamo eseguire molte promise in parallelo, e aspettare che siano tutte pronte.

Per esempio, scaricare da diversi URL in parallelo e processare il contenuto quando abbiamo finito con tutti.

Ecco a cosa serve `Promise.all`.

La sintassi è:

```js
let promise = Promise.all(iterable);
```

<<<<<<< HEAD
`Promise.all` accetta un array di promise (tecnicamente si può usare qualsiasi iterabile, ma solitamente si usa un array) e ritorna una nuova promise.
=======
`Promise.all` takes an iterable (usually, an array of promises) and returns a new promise.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La nuova promise si risolve quando tutte le promise elencate vengono risolte, e l'array dei loro risultati diventa il risultato finale.

Per esempio, il `Promise.all` sotto si ferma (settles) dopo 3 secondi, ed il suo risultato è un array `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 quando le promise sono pronte: ogni promise contribuisce con un membro dell'array
```

È da notare che l'ordine relativo rimane lo stesso. Anche se la prima promise prendesse il tempo più lungo per risolversi (resolve), il suo risultato sarà sempre il primo nell'array dei risultati.

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
    // tutte le risposte sono pronte, possiamo mostrare i loro codici di stato HTTP
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

`Promise.all` non fa niente per cancellarle, perché nelle promise non esiste il concetto di "cancellazione". In [un altro capitolo](fetch-abort) copriremo `AbortController` il cui scopo è aiutarci ocn questo, but ma non è una pare delle API Promise.
```

````smart header="`Promise.all(...)` accetta oggetti non-promise in un `iterable`"
Normalmente, `Promise.all(...)` accetta un iterabile (nella maggior parte dei casi un array) di promises. Ma se uno qualsiasi di questi oggetti non è una promise, viene "avvolto" (wrapped) in `Promise.resolve`.

Per esempio, qui i risultati sono `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // trattato come Promise.resolve(2)
  3  //trattato come Promise.resolve(3)
]).then(alert); // 1, 2, 3
```

Così siamo in grado di passare valori non-promise a `Promise.all` quando conveniente.

````

## Promise.allSettled

[recent browser="new"]

`Promise.all` viene respinto interamente se una sola delle promise viene respinta. Questo è buono in alcuni casi, quando abbiamo bisogno di *tutti* i risultati per proseguire:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // il metodo render ha bisogno di tutti i risultati
```

`Promise.allSettled` aspetta che tutte le promise siano ferme (settled): anche se una viene respinta (rejects), aspetta per le altre. L'array risultante ha:

- `{status:"fulfilled", value:result}` per le risposte con successo,
- `{status:"rejected", reason:error}` per gli errori.

Per esempio, ci piacerebbe scaricare le informazioni su diversi utenti. Anche se una richiesta fallisce, siamo interessati alle altre .

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

Così, per ogni promise otteniamo il suo stato e `valore/ragione`.

### Polyfill

Se il browser non supporta `Promise.allSettled`, è facile usare un polyfill:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

In questo codice, `promises.map` prende i valori in ingresso, li "trasforma" in promises (nel caso in cui sia stata passata una non-promise) con `p => Promise.resolve(p)`, e poi vi aggiunge il gestore (handler) `.then`.

Il gestore handler "trasforma" un risultato positivo  `v` in `{state:'fulfilled', value:v}`, ed un errore `r` in `{state:'rejected', reason:r}`. Questo è esattamente il formato di `Promise.allSettled`.

Poi possiamo usare il risultato di `Promise.allSettled` per ottenere i risultati di *tutte* le promise date, anche se alcune venissero respinte.

## Promise.race

Similmente a `Promise.all`, accetta un iterabile di promise, ma invece di attendere che siano tutte finite, aspetta per il primo risultato (o errore), e va avanti con quello.

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

Così, il primo risultato/errore diventa il risultato di tutto `Promise.race`. Quando la prima promise ferma (settled) "vince la gara" (wins the race), tutti i risultati/errori successivi sono ignorati.


## Promise.any

Similar to `Promise.race`, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with [`AggregateError`](mdn:js/AggregateError) - a special error object that stores all promise errors in its `errors` property.

The syntax is:

```js
let promise = Promise.any(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise "wins the race", all further results are ignored.

Here's an example when all promises fail:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
```

As you can see, error objects for failed promises are available in the `errors` property of the `AggregateError` object.

## Promise.resolve/reject

I metodi `Promise.resolve` e `Promise.reject` vengono utilizzati raramente nel codice moderno, poiché la sintassi `async/await` (che studieremo [più avanti](info:async-await)) li rende obsoleti.

Li studiamo per completezza e per quelli che non possono utilizzare `async/await` per qualche ragione.

### Promise.resolve

`Promise.resolve(value)` risolve una Promise con il risultato `value`.

Come nell'esempio:

```js
let promise = new Promise(resolve => resolve(value));
```

Il metodo viene utilizzato per compatibilità, quando ci si aspetta che una funzione ritorni una promise.

Ad esempio, la funzione `loadCached` sotto, analizza un URL e ne memorizza (sulla cache) il suo contenuto. Per le future chiamate allo stesso URL verrà immediatamente ritornato il contenuto dalla cache, ma utilizzando `Promise.resolve` per renderlo una promise, in questo modo il valore ritornato sarà sempre una promise:

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

Possiamo scrivere `loadCached(url).then(…)`, perché ci viene garantito che la funzione ritorni una promise. Possiamo sempre utilizzare `.then` dopo `loadCached`. Questo è lo scopo di `Promise.resolve` nella riga `(*)`.

### Promise.reject

`Promise.reject(error)` rifiuta una promise con `error`.

Come nell'esempio:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

Nella pratica, questo metodo non viene quasi mai utilizzato.

## Riepilogo

There are 6 static methods of `Promise` class:

1. `Promise.all(promises)` -- aspetta che tutte le promise siano risolte e ritorna  array un array dei loro risultati. Se una qualsiasi delle promise date viene respinta, allora diventa l'errore di `Promise.all`, e tutti gli altri risultati sono ignorati.
2. `Promise.allSettled(promises)` (un nuovo metodo) -- aspetta che tutte le promises vengano risolte o respinte  e ritorna un array dei loro risultati come oggetti con questa forma:
    - `state`: `'fulfilled'` or `'rejected'`
    - `value` (se risolta ((fulfilled) o `reason` (se respinta (rejected)).
3. `Promise.race(promises)` -- aspetta che la prima promise sia ferma (settle), ed il suo risultato/errore diventa il risultato.
4. `Promise.any(promises)` (metodo aggiunto di recente) -- aspetta che la prima promise venga risolta e restituisca il risultato. Se tutte le promises vengono respinte,[`AggregateError`](mdn:js/AggregateError) diventa l'errore di `Promise.any`.
5. `Promise.resolve(value)` -- crea una promise risolta (resolved) con il valore dato.
6. `Promise.reject(error)` -- crea una promise respinta (rejected) con il valore dato.

Di tutti questi, il più comunemente utilizzato è `Promise.all`.
