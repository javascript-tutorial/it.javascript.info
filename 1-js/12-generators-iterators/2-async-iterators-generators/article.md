# Iteratori e generatori asincroni


Gli iteratori asincroni consentono di iterare su dati che arrivano in modo asincrono, a richiesta. Per esempio, quando eseguiamo una serie di download parziali dalla rete. I generatori asincroni ci consentono di semplificare questo processo.

Vediamo prima un semplice esempio per prendere confidenza con la sintassi, dopodiché analizzeremo un caso d'uso reale.

## Iteratori asincroni


Gli iteratori asincroni sono simili ai comuni iteratori, con alcune differenze sintattiche.

Gli oggetti iteratori "comuni", come abbiamo detto nel capitolo [iteratori](info:iterable), si presentano in questo modo:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of invoca questo metodo una sola volta all'inizio dell'esecuzione

*!*
  [Symbol.iterator]() { // called once, in the beginning of for..of
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


````warn header="Lo spread operator '...' non funziona in modo asincrono"
Le funzionalit&agrave; offerte dai comuni iteratori (sincroni) non sono disponibili per gli iteratori asincroni.

Per esempio, lo spread operator non pu&agrave; essere utilizzato:

```js
alert([...range]); // Errore, non c'&agrave; Symbol.iterator
```

Questo &egrave; prevedibile, dal momento che lo spread operator ha bisogno di `Symbol.iterator` anzich&eacute; `Symbol.asyncIterator`. Lo stesso vale per `for..of` (senza `await`).

````

## Generatori asincroni

Come gi&agrave; sappiamo, JavaScript supporta anche i cosiddetti generatori, che sono anche iteratori.

Ricordiamo l'esempio del generatore di una sequenza di numeri da `start` a `end`, nel capitolo [generatori](info:generators):

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (let value of generateSequence(1, 5)) {
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
    // Wow, can use await!
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
That's why async generators work with `for await...of`.
````

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

Un approccio comune &egrave; quello di far ritornare a `Symbol.iterator` un generatore anzich&eacute; un normale oggetto con il metodo `next`, come nell'esempio precedente.

Ricordiamo di seguito un esempio dal capitolo [](info:generators):

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // sintassi compatta di [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

for (let value of range) {
  alert(value); // 1, poi 2, poi 3, poi 4, poi 5
}
```

In questo esempio l'oggetto `range` &egrave; un iteratore e il generatore `*[Symbol.iterator]` implementa la logica per elencare i valori.

Se volessimo aggiungere delle funzionalit&agrave; asincrone al generatore, dovremmo sostituire `Symbol.iterator` con async `Symbol.asyncIterator`:

```js run
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() { // come per [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // mettiamo una pausa tra i volori ritornati, aspettando un secondo
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, poi 2, poi 3, poi 4, poi 5
  }

})();
```

Adesso i valori verranno ritornati con un ritardo di 1 secondo tra l'uno e l'altro.

## Esempio reale

Finora abbiamo visto esempi molto semplici, tanto per prendere confidenza. Vediamo ora un esempio di caso d'uso reale.

Ci sono molti servizi online che restituiscono dati paginati. Per esempio, quando abbiamo bisogno di una lista di utenti, una richiesta ritorna un numero predefinito di risultati (ad esempio 100 utenti) - "una pagina", e ci ritorna anche una URL per ottenere la pagina successiva.

E' un modello molto comune, non solo per gli utenti, ma per qualsiasi cosa. Ad esempio, GitHub consente di ottenere la lista di commit allo stesso modo, tramite la paginazione:

- Eseguiamo una richiesta alla URL nella forma `https://api.github.com/repos/<repo>/commits`.
- Il server risponde con un JSON di 30 commit e ci ritorna anche un link alla pagina successiva nell'header `Link`.
- Dopodich&eacute; possiamo usare tale link per la richiesta successiva, ottenendo le commit successive e cos&igrave; via.

Ci piacerebbe, tuttavia, avere una API pi&ugrave; semplice: un oggetto iteratore per le commit, che ci consenta di elencarle nel seguente modo:

```js
let repo = "javascript-tutorial/en.javascript.info"; // repository GitHub dal quale ottenere le commit

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

Ci piacerebbe un'invocazione, come ad esempio `fetchCommits(repo)` per ottenere le commit, che esegua richieste ogni volta che ne abbiamo bisogno e senza preoccuparci della logica di paginazione. Ad esempio, una soluzione semplice del tipo `for await..of`.

Grazie ai generatori asincroni diventa piuttosto semplice da implementare:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, {
      // (1)
      headers: { "User-Agent": "Our script" }, // github richiede un header user-agent
    });

    const body = await response.json(); // (2) la risposta &egrave; un JSON (array di commit)

    // (3) la URL della pagina successiva &egrave; negli header, dunque dobbiamo estrarla
    let nextPage = response.headers.get("Link").match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for (let commit of body) {
      // (4) restituisce (yield) le commit una ad una fino alla fine della pagina
      yield commit;
    }
  }
}
```

1. Utilizziamo il metodo [fetch](info:fetch) del browser per ottenere i dati dalla URL remota. Questo ci consente di fornire al server le autorizzazioni e le intestazioni (header) richieste. Ad esempio GitHub richiede `User-Agent`:
2. Il risultato di fetch viene interpretato come un JSON, altra caratteristica del metodo `fetch`.
3. Dovremmo, quindi, ottenere la URL alla pagina successiva dal header `Link` della risposta. Siccome ha un formato particolare, utilizziamo un'espressione regolare. La URL della pagina successiva potrebbe essere simile a `https://api.github.com/repositories/93253246/commits?page=2` e viene generata dallo stesso GitHub.
4. Infine, ritorniamo tutte le commit ricevute tramite `yield` e, una volta terminate, la successiva iterazione `while(url)` verr&agrave; invocata, eseguendo un'ulteriore richiesta.

<<<<<<< HEAD
Un esempio di utilizzo (visualizza gli autori delle commit nella console):
=======
    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in [Regular expressions](info:regular-expressions)).
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.

An example of use (shows commit authors in console):
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```js run
(async () => {
  let count = 0;

  for await (const commit of fetchCommits(
    "javascript-tutorial/en.javascript.info"
  )) {
    console.log(commit.author.login);

    if (++count == 100) {
      // let's stop at 100 commits
      break;
    }
  }
})();
```

Questo &egrave; esattamente quello che volevamo. I meccanismi interni delle richieste paginate sono invisibili dall'esterno. Per noi non &egrave; altro che un generatore asincrono che ritorna delle commit.

## Riepilogo

I normali iteratori e generatori funzionano bene con dati che non richiedono tempo per essere generati.

Quando i dati ci arrivano in modo asincrono, con dei ritardi, possiamo usare iteratori e generatori asincroni, tramite il ciclo `for await..of` anzich&eacute; `for..of`.

Differenze sintattiche tra iteratori sincroni e asincroni:

|                                    | Iteratori         | Iteratori asincroni    |
| ---------------------------------- | ----------------- | ---------------------- |
| Metodo che ci fornisce l'iteratore | `Symbol.iterator` | `Symbol.asyncIterator` |
| valore ritornato da `next()`       | qualsiasi valore  | `Promise`              |

Differenze sintattiche tra generatori asincroni e sincroni:


|                               | Generators                    | Async generators                                               |
| ----------------------------- | ----------------------------- | -------------------------------------------------------------- |
| Dichiarazione                 | `function*`                   | `async function*`                                              |
| `generator.next()` ritorna... | `{value:…, done: true/false}` | `Promise` che risolve ritornando `{value:…, done: true/false}` |

Nello sviluppo web incontriamo spesso flussi di dati che vengono ritornati "in gruppi". Per esempio, il download o l'upload di file grandi.

Possiamo usare i generatori asincroni per processare questo tipo di dati but vale anche la pena di menzionare che c'&egrave; un'altra API, chiamata Streams, che ci fornisce delle interfacce speciali per gestire questi flussi di dati, per trasformarli e passarli ad altri flussi per ulteriori manipolazioni (ad esempio scaricare dati da qualche sorgente e poi immediatamente inviarli da qualche parte).

Le Streams API non fanno parte del linguaggio JavaScript standard.
