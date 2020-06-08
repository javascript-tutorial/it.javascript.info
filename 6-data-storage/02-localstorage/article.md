# LocalStorage, sessionStorage

Gli oggetti web storage `localStorage` e `sessionStorage` permetto di salvare le coppie key/value nel browser.Ciò che è interessante è che i dati sopravvivono al ricaricamento della pagina (per `sessionStorage`) e anche in seguito a un restart del browser (for `localStorage`). Vedremo come.

Abbiamo già i cookies. Perchè usiamo altri oggetti?

- Rispetto ai cookies, gli oggetti web storage non vengono inviati al server con ogni richiesta. Per questo motivo, possiamo archiviarne molti di più. La maggior parte dei browser permette almeno 2 megabytes di dati (o più) e possiedono impostazioni per configurare questa scelta.
- Inoltre, il server non può manipolare la memorizzazione degli oggetti tramite HTTP headers. Tutto viene fatto in JavaScript.
- l'archiviazione è legata alla sorgete (origin) (domain/protocol/port triplet). Questo perchè, protocolli differenti o subdomini deducono diverse archiviazioni a oggetti e non possono accedere ai dati tra di loro.

Le due archiviazioni a oggetti propongono stessi metodi e propietà:

- `setItem(key, value)` -- archivia la coppia key/value.
- `getItem(key)` -- ottiene il valore dalla key.
- `removeItem(key)` -- rimuove la key con il suo value.
- `clear()` -- cancella tutto.
- `key(index)` -- ottieni la key in una posizione data.
- `length` -- il numero di oggetti archiviati.

Come potete vedere, è simile alla collezione `Map` (`setItem/getItem/removeItem`), mantiene comunque l'ordine degli elementi e permette il loro accesso tramite indice con `key(index)`.

<<<<<<< HEAD
Vediamo come funziona.
=======
As you can see, it's like a `Map` collection (`setItem/getItem/removeItem`), but also allows access by index with `key(index)`.

Let's see how it works.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

## localStorage demo

Le funzioni principali di `localStorage` sono:

- Condivisione tra le tabs e finestre provenienti dalla stessa origine.
- I dati non scadono. Rimangono in seguito a un riavvio del browser o dell'intero sistema operativo.

Per esempio, se usiamo questo codice...

```js run
localStorage.setItem('test', 1);
```

...E chiudiamo/apriamo il browser o semplicemente apriamo la stessa pagina in una finestra diversa, possiamo ottenere il risultato atteso in questo modo:

```js run
alert( localStorage.getItem('test') ); // 1
```

Dobbiamo solo essere nello stesso punto di partenza (domain/port/protocol), l'url di destinazione può essere differente.

Il `localStorage` è condiviso tra tutte le finestre con la stessa provenienza, quindi se impostiamo i dati in una finestra, il cambiamento diventa visibile in un altra scheda.

## Object-like access

Possiamo usare un plain object per getting/setting le keys, in questo modo:

```js run
// set key
localStorage.test = 2;

// get key
alert( localStorage.test ); // 2

// remove key
delete localStorage.test;
```

Questo è permetto per ragioni storiche, e principalmente funziona , ma generalmente non è raccomandato, perchè:

1. Se la key è generata dall utente, può essere qualsiasi cosa,, come `length` o `toString`, o un altro built-in method of `localStorage`. In questo caso `getItem/setItem` funziona normalmente, mentre l'accesso object-like fallisce:
    ```js run
    let key = 'length';
    localStorage[key] = 5; // Error, can't assign length
    ```

2. C'è un evento `storage`, che si attiva quando modifichiamo dati. Questo evento non accade per accessi object-like. Vedremo più avanti nel capitolo.

## Looping sulle keys

Come abbiamo visto, i metodi forniscono funzionalità get/set/remove. Ma come otteniamo tutti i valori o keys salvate?

Sfortunatamente, gli objects archiviati non sono iterabili.

Una soluzione sarebbe quella di eseguire un loop su di loro come una matrice:

```js run
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Un altro modo è quello di usare un loop `for key in localStorage` , come facciamo con oggetti regolari.

L'iterazione avverrà sulle keys, ma anche sugli outputs di campi associati ad alcune funzioni built-in di cui non abbbiamo bisogno:

```js run
// cattivo esempio
for(let key in localStorage) {
  alert(key); // mostra getItem, setItem e altre funzioni built-in
}
```

... dunque dobbiamo filtrare i camp dal prototipo con il controllo `hasOwnProperty`:

```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // salta keys come "setItem", "getItem" etc
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

...oppure ottieni le keys "proprie" con `Object.keys` e esegui il loop su di loro se necessario:

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Un lavoro extra, poichè `Object.keys` restituisce solo le keys che appartengono all oggetto, ignorando il prototipo.


## Strings only

Notare che sia key che i value devono essere stringhe.

Se ci fosse un altro tipo di dato,come un numero, o un object, verrebbe automaticamente convertito a stringa :

```js run
sessionStorage.user = {name: "John"};
alert(sessionStorage.user); // [object Object]
```

Possiamo usare `JSON` per archiviare objects:

```js run
sessionStorage.user = JSON.stringify({name: "John"});

// subito dopo
let user = JSON.parse( sessionStorage.user );
alert( user.name ); // John
```

inoltre è possibile convertire a stringa l'intero archivio di object, per esempio per motivi di debugging:

```js run
// aggiunte leopzioni di formattazione a JSON.stringify per rendere object migliore
alert( JSON.stringify(localStorage, null, 2) );
```


## sessionStorage
 <
L'object `sessionStorage` è usato molto meno spesso del `localStorage`.

Proprietà e metodi sono gli stessi, ma è più limitato:

- La `sessionStorage` esiste solo all'intero della tab del browser corrente.
- Un altra tab con la stessa pagina avrà un archiviazione differente.
  -Viene comunque condivisa tra iframes nella stessa tab (assumendo che la loro provenienza sia la stessa).
- I dati sopravvivono al refresh della pagina, ma non alla chiusura/apertura della tab.

Vediamo come si comporta.

Usa questo codice...

```js run
sessionStorage.setItem('test', 1);
```

...Poi ricarica la pagina. ora puoi comunque ottenere i dati:

```js run
alert( sessionStorage.getItem('test') ); // after refresh: 1
```

...Ma se apri la stessa pagina inun altra tab, e provi di nuovo, dal codice otterrai  `null`, Significa "non è stato trovato nulla".

Questo perchè `sessionStorage` è legato non solo all'origine, ma anche alla tab del browser. Per questo motivo, `sessionStorage` è usato sporadicamente.

## Storage event

Quando i dati vengono aggiornati in `localStorage` o `sessionStorage`, [storage](https://www.w3.org/TR/webstorage/#the-storage-event)un evento si attiva, con le seguenti propietà:

- `key` –La key che è stata cambiata (`null` if `.clear()` is called).
- `oldValue` – Il vecchio vallue (`null` if the key is newly added).
- `newValue` – il nuovo value (`null` if the key is removed).
- `url` – L'url del documento in cui è avvenuto l'aggiornamento.
- `storageArea` – o `localStorage` o `sessionStorage` object in cui è avvenuto l'aggiornamento.

La cosa importante è: l'evento si attiva in tutti gli objects `window` dove l'archivio è accessibile, ad eccezzione per quello in cui è stato causato.

Elaboriamo.

Immaginate di avere due finestre aperte con lo stesso sito all'interno.Quindi `localStorage` è condiviso tra le due.

```online
dovresti aprire questa pagina in due browser per testare il seguente codice.
```

Se entrambe le finestre sono connesse a `window.onstorage`, allora reagiranno agli aggiornamenti che accadono in una delle due.

```js run
<<<<<<< HEAD
// attiva un aggiornamento fatto dallo stesso archivio degli altri documenti
window.onstorage = event => {
=======
// triggers on updates made to the same storage from other documents
window.onstorage = event => { // same as window.addEventListener('storage', () => {
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

Notare che l'evento contiene: `event.url` -- l'url del documento in cui i dati sono stati aggiornati.
Inoltre, `event.storageArea` contiene lo storage object -- l'evento è lo stesso per entrambi `sessionStorage` e `localStorage`, quindi `event.storageArea` si rivolge a quello che è stato motificato. Potremmo anche impostare qualcosa all'interno, per "rispondere" al cambiamento.**That allows different windows from the same origin to exchange messages.**

I Browser moderni supportano [Broadcast channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API),  API speciale per comunicazione inter-finestra provenienti dalla stessa sorgente, possiede molte più funzione ma è meno supportata.Esistono librerie che sostituiscono quella API,basate su `localStorage`, che lo rendono disponibile ovunque.

## Summary

Web storage objects `localStorage` e `sessionStorage` permettono di archiviare key/value nel browser.
- Sia `key` e `value` devono essere stringhe.
- Il limite è 2mb+, dipende dal browser.
- Non scadono.
- I dati sono legati alla sorgente (domain/port/protocol).

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| Condivise tra tutte le tabs e finestre provenienti dalla stessa sorgente| Visibile all'interno di una tab del browser, incluso iframes della stessa origine |
| sopravvivono al riavvio del browser | sopravvivono al refresh della pagina (ma non alla chiusura della tab) |

API:

- `setItem(key, value)` -- archivia coppia key/value .
- `getItem(key)` -- ottieni il valore dalla chiave.
- `removeItem(key)` -- rimuovi la chiave con il suo valore.
- `clear()` -- cancella tutto.
- `key(index)` -- ottieni il numero della key `index`.
- `length` -- il numero di oggetti archiviati.
- Use `Object.keys` ottieni tutte le chiavi.
- accediamo alle keys come propietà degli object, in questo caso un evento `storage` non viene attivato.

Storage event:

- attivato su chiamata di `setItem`, `removeItem`, `clear` .
- COntiene tutti i data riguardo l'operazione (`key/oldValue/newValue`), il documento `url` e lo storage object `storageArea`.
- Attivato su tutti gli oggetti `window` che hanno accesso all'archivio eccetto quello da cui è stato generato (all'intenro di una tab per `sessionStorage`, globalmente per `localStorage`).
