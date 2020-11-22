# Iteratori e generatori asincroni

Gli iteratori asincroni consentono di iterare su dati che arrivano in modo asincrono, a richiesta. Per esempio, quando eseguiamo una serie di download parziali dalla rete. I generatori asincroni ci consentono di semplificare questo processo.

Vediamo prima un semplice esempio per prendere confidenza con la sintassi, dopodiché analizzeremo un caso d'uso reale.

## Iteratori asincroni

Gli iteratori asincroni sono simili ai comuni iteratori, con alcune differenze sintattiche.

Gli oggetti iteratori "comuni", come abbiamo detto nel capitolo <info:iterable>, si presentano in questo modo:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of invoca questo metodo una sola volta all'inizio dell'esecuzione
*!*
  [Symbol.iterator]() {
*/!*
    // ...ritorna l'oggetto iteratore:
    // dopodich&eacute;, for..of interagisce solo con questo oggetto,
    // chiedendogli i valori successivi tramite il metodo next()
    return {
      current: this.from,
      last: this.to,

      // next() viene invocato ad ogni iterazione dal ciclo for..of
*!*
      next() { // (2)
        // dovrebbe ritornare il valore come un oggetto {done:.., value:..}
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 poi 2, poi 3, poi 4, poi 5
}
```

Se necessario, rileggersi il [capitolo sugli iteratori](info:iterable) per avere maggiori dettagli circa gli iteratori comuni.

Per rendere l'oggetto iteratore asincrono:

1. Dobbiamo usare `Symbol.asyncIterator` anzich&eacute; `Symbol.iterator`.
2. `next()` dovrebbe ritornare una promise.
3. Per iterare sui valori di tale oggetto, dobbiamo usare un ciclo del tipo: `for await (let item of iterable)`.

Rendiamo l'oggetto `range` iterabile, come nell'esempio precedente ma, questa volta, ritorner&agrave; i valori in modo asincrono, uno ogni secondo:

```js run
let range = {
  from: 1,
  to: 5,

  // for await..of invoca questo metodo una sola volta all'inizio dell'esecuzione
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...ritorna l'oggetto iteratore:
    // dopodich&egrave;, for await..of interagisce solo con questo oggetto,
    // chiedendogli i valori successivi tramite il metodo next()
    return {
      current: this.from,
      last: this.to,

      // next() viene invocato ad ogni iterazione dal ciclo for await..of
*!*
      async next() { // (2)
        // dovrebbe ritornare il valore come un oggetto {done:.., value:..}
        // (automaticamente racchiuso in una promise dal momento che siamo un metodo 'async')
*/!*

        // possiamo utilizzare await all'interno per eseguire codice asincrono:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

Possiamo notare che la struttura &egrave; simile a quella dei comuni iteratori:

1. Per rendere un oggetto iterabile in modo asincrono, esso deve contenere un metodo `Symbol.asyncIterator` `(1)`.
2. Questo metodo deve ritornare un oggetto contenente il metodo `next()`, che ritorna a sua volta una promise `(2)`.
3. Il metodo `next()` non deve necessariamente essere `async`; pu&ograve; essere un metodo normale che ritorna una promise, anche se `async` ci
   consentirebbe di utilizzare `await`, che pu&ograve; tornarci utile. Nell'esempio, abbiamo utilizzato un ritardo di un secondo `(3)`.
4. Per iterare dobbiamo utilizzare il ciclo `for await(let value of range)` `(4)`, si tratta di aggiungere "await" dopo il "for". Questo ciclo invoca il metodo `range[Symbol.asyncIterator]()` una sola volta, dopodich&eacute; il metodo invocher&agrave; `next()` per ottenere i valori.

Ecco una semplice tabella di riepilogo:

|                                                 | Iteratori         | Iteratori asincroni    |
| ----------------------------------------------- | ----------------- | ---------------------- |
| Metodo dell'oggetto che restituisce l'iteratore | `Symbol.iterator` | `Symbol.asyncIterator` |
| Il valore ritornato da `next()` &egrave;        | qualsiasi valore  | `Promise`              |
| ciclo da utilizzare                             | `for..of`         | `for await..of`        |

````warn header="Lo spread operator `...` non funziona in modo asincrono"
Le funzionalit&agrave; offerte dai comuni iteratori (sincroni) non sono disponibili per gli iteratori asincroni.

Per esempio, lo spread operator non pu&agrave; essere utilizzato:

```js
alert([...range]); // Errore, non c'&agrave; Symbol.iterator
```

Questo &egrave; prevedibile, dal momento che lo spread operator ha bisogno di `Symbol.iterator` anzich&eacute; `Symbol.asyncIterator`. Lo stesso vale per `for..of` (senza `await`).

````

## Generatori asincroni

Come gi&agrave; sappiamo, JavaScript supporta anche i cosiddetti generatori, che sono anche iteratori.

Ricordiamo l'esempio del generatore di una sequenza di numeri da `start` a `end`, nel capitolo [](info:generators):

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, poi 2, poi 3, poi 4, poi 5
}
```

Nei normali generatori non possiamo usare `await`. Tutti i valori devono essere ritornati in modo sincrono: non c'&egrave; modo di ritornare valori "futuri" utilizzando il ciclo `for..of`, dal momento che si tratta di un costrutto di tipo sincrono.

Cosa fare se avessimo bisogno di usare `await` all'interno di un generatore? Per eseguire, ad esempio, una richiesta dalla rete?

Non c'&egrave; problema, sar&agrave; sufficiente anteporre la parola chiave `async`, come nell'esempio seguente:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // yay, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, poi 2, poi 3, poi 4, poi 5
  }

})();
```

In questo modo abbiamo ottenuto il generatore asincrono, che possiamo usare nelle iterazioni con il ciclo `for await..of`.

E' molto semplice. Aggiungiamo la parola chiave `async` ed ecco che il generatore pu&ograve; utilizzare `await` al suo interno e trarre vantaggio delle promise, cos&igrave; come di tutte le altre funzioni asincrone.

Tecnicamente, un'altra importante caratteristica dei generatori asincroni &egrave; che anche il relativo metodo `generator.next()` diventa asincrono, ritornando delle promise.

Con un generatore normale utilizzeremmo `result = generator.next()` per ottenere i valori ritornati. Con i generatori asincroni dobbiamo, invece, aggiungere `await`, come nell'esempio:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## Iteratori asincroni

Come gi&agrave; sappiamo, per rendere un semplice oggetto un oggetto iteratore, dobbiamo aggiungere il metodo `Symbol.iterator`:

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <oggetto che abbia un metodo next() per trasformare l'oggetto in un iteratore>
  }
*/!*
}
```

A common practice for `Symbol.iterator` is to return a generator, rather than a plain object with `next` as in the example before.
Un approccio comune &egrave; quello di far ritornare a `Symbol.iterator` un generatore anzich&eacute; un normale oggetto con il metodo `next`, come nell'esempio precedente.

Let's recall an example from the chapter [](info:generators):

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Here a custom object `range` is iterable, and the generator `*[Symbol.iterator]` implements the logic for listing values.

If we'd like to add async actions into the generator, then we should replace `Symbol.iterator` with async `Symbol.asyncIterator`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // same as [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
```

Now values come with a delay of 1 second between them.

## Real-life example

So far we've seen simple examples, to gain basic understanding. Now let's review a real-life use case.

There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) - "one page", and provides an URL to the next page.

The pattern is very common, it's not about users, but just about anything. For instance, GitHub allows to retrieve commits in the same, paginated fashion:

- We should make a request to URL in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

But we'd like to have is a simpler API: an iterable object with commits, so that we could go over them like this:

```js
let repo = 'javascript-tutorial/en.javascript.info'; // GitHub repository to get commits from

for await (let commit of fetchCommits(repo)) {
  // process commit
}
```

We'd like a call, like `fetchCommits(repo)` to get commits for us, making requests whenever needed. And let it care about all pagination stuff, for us it'll be a simple `for await..of`.

With async generators that's pretty easy to implement:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github requires user-agent header
    });

    const body = await response.json(); // (2) response is JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}
```

1. We use the browser [fetch](info:fetch) method to download from a remote URL. It allows to supply authorization and other headers if needed, here GitHub requires `User-Agent`.
2. The fetch result is parsed as JSON, that's again a `fetch`-specific method.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regexp for that. The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`, it's generated by GitHub itself.
4. Then we yield all commits received, and when they finish -- the next `while(url)` iteration will trigger, making one more request.

An example of use (shows commit authors in console):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // let's stop at 100 commits
      break;
    }
  }

})();
```

That's just what we wanted. The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.

## Summary

Regular iterators and generators work fine with the data that doesn't take time to generate.

When we expect the data to come asynchronously, with delays, their async counterparts can be used, and `for await..of` instead of `for..of`.

Syntax differences between async and regular iterators:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| Object method to provide iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |

Syntax differences between async and regular generators:

|       | Generators | Async generators |
|-------|-----------|-----------------|
| Declaration | `function*` | `async function*` |
| `generator.next()` returns              | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |

In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.

We can use async generators to process such data, but it's also worth to mention that there's also another API called Streams, that provides special interfaces to work with such streams, to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere).

Streams API is not a part of JavaScript language standard.
````
