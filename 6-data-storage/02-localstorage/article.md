# LocalStorage, sessionStorage

Gli oggetti web storage `localStorage` e `sessionStorage` permetto di salvare le coppie key/value nel browser. Ciò che è interessante è che i dati rimangono memorizzati anche in seguito al ricaricamento della pagina (per `sessionStorage`) e anche in seguito a un riavvio del browser (per `localStorage`). Vedremo come.

Abbiamo già a disposizione i cookies. Perché usare altri oggetti?

- Rispetto ai cookies, gli oggetti web storage non vengono inviati al server con ogni richiesta. Per questo motivo, possiamo archiviarne molti di più. La maggior parte dei browser permette almeno 2 megabytes di dati (o più) e possiedono impostazioni per configurare questa scelta.
- Inoltre, il server non può manipolare la memorizzazione degli oggetti tramite HTTP headers. Tutto viene fatto in JavaScript.
- L'archiviazione è legata alla sorgete (origin) (domain/protocol/port triplet). Questo perché, protocolli differenti o sotto domini deducono diverse archiviazioni a oggetti e non possono accedere ai dati tra di loro.

<<<<<<< HEAD
Le due archiviazioni a oggetti propongono stessi metodi e proprietà:

- `setItem(key, value)`: memorizza la coppia key/value.
- `getItem(key)`: lettura del valore dalla key.
- `removeItem(key)`: rimuove la key, ed il relativo value.
- `clear()`: rimuove tutti gli elementi.
- `key(index)`: lettura della key all'indice `index`.
- `length`: il numero di oggetti archiviati.
=======
- Unlike cookies, web storage objects are not sent to server with each request. Because of that, we can store much more. Most modern browsers allow at least 5 megabytes of data (or more) and have settings to configure that.
- Also unlike cookies, the server can't manipulate storage objects via HTTP headers. Everything's done in JavaScript.
- The storage is bound to the origin (domain/protocol/port triplet). That is, different protocols or subdomains infer different storage objects, they can't access data from each other.

Both storage objects provide the same methods and properties:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Come potete vedere, è simile alla collezione `Map` (`setItem/getItem/removeItem`), mantiene comunque l'ordine degli elementi e permette il loro accesso tramite indice con `key(index)`.

Vediamo come funziona.

## localStorage demo

Le caratteristiche principali di `localStorage` sono:

- Condivisione tra le tabs e finestre provenienti dalla stessa origine.
- I dati non scadono. Rimangono in seguito a un riavvio del browser o dell'intero sistema operativo.

Per esempio, il seguente esempio:

```js run
localStorage.setItem('test', 1);
```

...E chiudiamo/apriamo il browser o semplicemente apriamo la stessa pagina in una finestra diversa, possiamo ottenere il risultato atteso in questo modo:

```js run
alert( localStorage.getItem('test') ); // 1
```

Dobbiamo solo essere nello stesso punto di partenza (domain/port/protocol), l'URL di destinazione può essere differente.

Il `localStorage` è condiviso tra tutte le finestre con la stessa provenienza, quindi se impostiamo i dati in una finestra, il cambiamento diventa visibile anche nelle altre schede.

## Accesso in stile oggetto

Possiamo usare la stessa sintassi di lettura/scrittura degli oggetti per accedere agli elementi, in questo modo:

```js run
// imposta un nuovo valore
localStorage.test = 2;

// legge il valore
alert( localStorage.test ); // 2

// rimuove il valore
delete localStorage.test;
```

Questo è permesso per ragioni storiche, e principalmente funziona, ma generalmente non è raccomandato, perché:

<<<<<<< HEAD
1. Se la key è generata dall'utente, può essere qualsiasi cosa, come `length` o `toString`, o un altro metodo integrato di `localStorage`. In questo caso `getItem/setItem` funziona normalmente, mentre l'accesso in stile oggetto non funziona:
=======
1. If the key is user-generated, it can be anything, like `length` or `toString`, or another built-in method of `localStorage`. In that case `getItem/setItem` work fine, while object-like access fails:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```js run
    let key = 'length';
    localStorage[key] = 5; // Error, can't assign length
    ```

2. C'è un evento `storage`, che viene emesso quando modifichiamo dati. Questo evento viene per gli accessi in stile oggetto. Vedremo più avanti nel capitolo.

## Cicli sulle keys

Come abbiamo visto, i metodi forniscono funzionalità get/set/remove. Ma come otteniamo tutti i valori o keys salvate?

Sfortunatamente, gli oggetti archiviati non sono iterabili.

Una soluzione sarebbe quella di eseguire un loop su di loro come un array:

```js run
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Un altro modo è quello di usare un loop `for key in localStorage` , come facciamo con oggetti regolari.

L'iterazione avverrà sulle keys, ma anche sugli outputs di campi associati ad alcune funzioni built-in di cui non abbiamo bisogno:

```js run
// cattivo esempio
for(let key in localStorage) {
  alert(key); // mostra getItem, setItem e altre funzioni integrate
}
```

... dunque dobbiamo filtrare i campi dal prototype con il controllo `hasOwnProperty`:

```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // salta keys come "setItem", "getItem" etc
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

...oppure possiamo ottenere le keys "proprie" con `Object.keys` ed eseguire il loop su di loro se necessario:

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Un lavoro extra, poiché `Object.keys` restituisce solo le keys che appartengono all oggetto, ignorando il prototype.

<<<<<<< HEAD

## Solo stringhe
=======
## Strings only
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Da notare che sia key che i value devono essere stringhe.

<<<<<<< HEAD
Se ci fosse un altro tipo di dato, come un numero, o un object, verrebbe automaticamente convertito a stringa:
=======
If they were any other type, like a number, or an object, they would get converted to a string automatically:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]
```

Possiamo usare `JSON` per archiviare oggetti:

```js run
localStorage.user = JSON.stringify({name: "John"});

// successivamente
let user = JSON.parse( localStorage.user );
alert( user.name ); // John
```

Inoltre è possibile convertire a stringa l'intero archivio di oggetti, per esempio per motivi di debugging:

```js run
// aggiunte le opzioni di formattazione a JSON.stringify per rendere object migliore
alert( JSON.stringify(localStorage, null, 2) );
```

## sessionStorage

L'oggetto `sessionStorage` è usato molto meno spesso del `localStorage`.

Proprietà e metodi sono gli stessi, ma è più limitato:

- La `sessionStorage` esiste solo all'intero della tab del browser corrente.
  - Un'altra tab con la stessa pagina avrà un archiviazione differente.
  - Viene comunque condivisa tra iframes nella stessa tab (assumendo che la loro provenienza sia la stessa).
- I dati sopravvivono al refresh della pagina, ma non alla chiusura/apertura della tab.

Vediamo come si comporta.

Esegui questo codice...

```js run
sessionStorage.setItem('test', 1);
```

...Poi ricarica la pagina. Pra potrai comunque ottenere i dati:

```js run
alert( sessionStorage.getItem('test') ); // dopo il refresh: 1
```

...Ma se apri la stessa pagina in un'altra tab, e provi di nuovo, dal codice otterrai `null`, ovvero "non è stato trovato nulla".

Questo perché `sessionStorage` è legato non solo all'origine, ma anche alla tab del browser. Per questo motivo, `sessionStorage` è usato sporadicamente.

## Evento di storage

<<<<<<< HEAD
Quando i dati vengono aggiornati in `localStorage` o `sessionStorage`, un evento di [storage](https://www.w3.org/TR/webstorage/#the-storage-event) viene emesso, con le seguenti proprietà:
=======
When the data gets updated in `localStorage` or `sessionStorage`, [storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-storageevent-interface) event triggers, with properties:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- `key`: La key che è stata modificata (`null` se è stato invocato `.clear()`).
- `oldValue`: Il vecchio valore (`null` se la chiave è nuova).
- `newValue`: il nuovo valore (`null` se la chiave è sta rimossa).
- `URL`: L'URL del documento in cui è avvenuto l'aggiornamento.
- `storageArea`: se l'aggiornamento è avvenuto in `localStorage` o `sessionStorage`.

La cosa importante è: l'evento si attiva in tutti gli oggetti `window` dove l'archivio è accessibile, ad eccezione per quello in cui è stato causato.

Elaboriamo.

Immaginate di avere due finestre aperte con lo stesso sito all'interno. Quindi `localStorage` è condiviso tra le due.

```online
Dovresti aprire questa pagina in due browser per testare il seguente codice.
```

Se entrambe le finestre sono connesse a `window.onstorage`, allora reagiranno agli aggiornamenti che accadono in una delle due.

```js run
// attiva un aggiornamento fatto dallo stesso archivio degli altri documenti
window.onstorage = event => { // identico a window.addEventListener('storage', event => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.URL);
};

localStorage.setItem('now', Date.now());
```

Notare che l'evento contiene: `event.URL` -- l'URL del documento in cui i dati sono stati aggiornati.
Inoltre, `event.storageArea` contiene lo storage object -- l'evento è lo stesso per entrambi `sessionStorage` e `localStorage`, quindi `event.storageArea` si rivolge a quello che è stato modificato. Potremmo anche impostare qualcosa all'interno, per "rispondere" al cambiamento. 

**That allows different windows from the same origin to exchange messages.**

I browser moderni supportano [Broadcast channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API), un API speciale per comunicazione inter-finestra provenienti dalla stessa sorgente, possiede molte più funzionalità ma è meno supportata. Esistono librerie che sostituiscono quella API, basate su `localStorage`, che lo rendono disponibile ovunque.

## Riepilogo

<<<<<<< HEAD
Gli oggetti web storage `localStorage` e `sessionStorage` permettono di archiviare key/value nel browser.
- Sia `key` e `value` devono essere stringhe.
- Il limite è 2mb+, dipende dal browser.
- Non scadono.
- I dati sono legati alla sorgente (domain/port/protocol).
=======
Web storage objects `localStorage` and `sessionStorage` allow to store key/value pairs in the browser.

- Both `key` and `value` must be strings.
- The limit is 5mb+, depends on the browser.
- They do not expire.
- The data is bound to the origin (domain/port/protocol).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| Condivise tra tutte le tabs e finestre provenienti dalla stessa sorgente| Visibile all'interno di una tab del browser, incluso iframes della stessa origine |
| Sopravvivono al riavvio del browser | Sopravvivono al refresh della pagina (ma non alla chiusura della tab) |

API:

- `setItem(key, value)`: archivia coppia key/value .
- `getItem(key)`: legge il valore dalla chiave.
- `removeItem(key)`: rimuove la chiave con il suo valore.
- `clear()`: cancella tutto.
- `key(index)`: legge il valore all'indice `index`.
- `length`: il numero di oggetti archiviati.
- Utilizza `Object.keys` per ottenere tutte le chiavi.
- Accediamo alle keys come proprietà degli oggetti, in questo caso l'evento `storage` non verrà emesso.

Evento di storage:

- Emesso su chiamata di `setItem`, `removeItem`, `clear` .
- Contiene tutti i data riguardo l'operazione (`key/oldValue/newValue`), il documento `URL` e lo storage object `storageArea`.
- Emesso su tutti gli oggetti `window` che hanno accesso all'archivio eccetto quello da cui è stato generato (all'interno di una tab per `sessionStorage`, globalmente per `localStorage`).
