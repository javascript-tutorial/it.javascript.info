
# Fetch: Download progress

Il metodo `fetch` consente di tracciare i progressi in fase di *download*.

Nota bene: allo stato attuale non c'è modo per il metodo `fetch` di tracciare i progressi in fase di *upload*. Per questo scopo, consulta il capitolo [XMLHttpRequest](info:xmlhttprequest), di cui ci occuperemo più tardi.

<<<<<<< HEAD
Per tracciare i progressi in fase di download, possiamo usare la proprietà `response.body`. Essa è un `ReadableStream` -- uno speciale oggetto che fornisce un body *chunk-by-chunk*. I Readable streams sono descritti nelle specifiche [Streams API](https://streams.spec.whatwg.org/#rs-class).
=======
To track download progress, we can use `response.body` property. It's `ReadableStream` -- a special object that provides body chunk-by-chunk, as it comes. Readable streams are described in the [Streams API](https://streams.spec.whatwg.org/#rs-class) specification.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

A differenza di `response.text()`, `response.json()` ed altri metodi, `response.body` dà il pieno controllo sul processo di lettura e possiamo quindi valutare quanto viene scaricato in qualsiasi momento.

Ecco una bozza di codice che legge la risposta da `response.body`:

```js
// al posto di response.json() e di altri metodi
const reader = response.body.getReader();

// ciclo infinito durante il download del body
while(true) {
  // done è true nell'ultimo chunk
  // value è la dimensione in byte del chunk in Uint8Array
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Ricevuti ${value.length} bytes`)
}
```

Il risultato della chiamata `await reader.read()` è un oggetto con due proprietà:
- **`done`** -- `true` quando la lettura è completa, altrimenti è `false`.
- **`value`** -- un array tipizzato di bytes: `Uint8Array`.

```smart
Le Stream API descrivono anche l'iterazione asincrona su `ReadableStream` con il ciclo `for await..of`, ma essa non è ampiamente supportata (vedi [browser issues](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), per questa ragione usiamo un ciclo `while`.
```

Riceveremo i chunk di risposta nel loop, sino a che il caricamento non finirà, e quindi `done` non diventerà `true`.

Per tracciare i progressi è sufficiente aggiungere ad un *contantore* il `value` per ogni chunck ricevuto.

Ecco un esempio funzionante e completo (con indicazioni sul funzionamento) che cattura le risposte e registra il risultato in console:

```js run async
// Step 1: inizia il fetch ed ottiene il reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Step 2: riceve la lunghezza totale
const contentLength = +response.headers.get('Content-Length');

// Step 3: legge i dati
let receivedLength = 0; // ancora nessun byte è stato ricevuto
let chunks = []; // array dei chunks binari ricevuti (compreso il body)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Ricevuti ${receivedLength} di ${contentLength}`)
}

// Step 4: concateno i chunks in un singolo Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// Step 5: decodifica in una stringa
let result = new TextDecoder("utf-8").decode(chunksAll);

// Ecco fatto!
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

Spieghiamo il tutto passo-passo:

1. Eseguiamo `fetch` normalmente, ma invece che chiamare `response.json()`, otteniamo uno stream reader con `response.body.getReader()`.

    Si noti che non è possibile utilizzare entrambi questi metodi per leggere la stessa risposta: utilizzare un reader o un metodo per ottenere il risultato.
2. Ancor prima di passare alla lettura, possiamo ottenere la lunghezza totale dall'header `Content-Length`.

    Questo header può essere assente nelle richieste cross-origin (vedi il capitolo <info:fetch-crossorigin>) e, tecnicamente, un server non deve impostarlo obbligatoriamente. Ma di solito lo fa!
3. Chiama `await reader.read()` fino a che non è conclusa la lettura.

    Raccogliamo i *response chunks* nell'array `chunks`. È importante perché dopo che la risposta viene esaurita, non saremo in grado di rileggerla usando `response.json()` o altri metodi (puoi anche provare, ma otterrai un errore).
4. A conclusione avremo `chunks` -- un array di byte dei chunks in `Uint8Array` . Abbiamo la necessità di fonderlo in un unico risultato. Sfortunatamente, non esiste un metodo per concatenarlo e quindi dobbiamo usare alcuni passaggi:
    1. Creiamo `chunksAll = new Uint8Array(receivedLength)` -- un array tipizzato con la lunghezza definita.
    2. Successivamente usiamo il metodo `.set(chunk, position)` per copiare ogni `chunk` in sequenza nell'array creato precedentemente.
5. Abbiamo quindi come risultato l'array `chunksAll`. È una matrice di byte, non una stringa.

    Per creare una stringa, abbiamo bisogno di interpretare questi bytes. Il [TextDecoder](info:text-decoder) fa esattamente questo. Quindi possiamo usare `JSON.parse`, se necessario.

    E se avessimo bisogno del contenuto binario anziché di una stringa? È ancora più semplice. Sostituisci i passaggi 4 e 5 con una sola riga che crea un `Blob` da tutti i blocchi:
    ```js
    let blob = new Blob(chunks);
    ```

<<<<<<< HEAD
Alla fine avremo il risultato (che sia una stringa o un blob, a seconda di ciò che ci serve) ed il tracking dei progressi di *download*.
=======
At the end we have the result (as a string or a blob, whatever is convenient), and progress-tracking in the process.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Nota ancora una volta che non è possibile tracciare progressi di *upload* (non c'è modo con `fetch`), ma solo i progressi di *download*.
