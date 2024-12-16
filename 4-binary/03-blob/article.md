# Blob

Gli `ArrayBuffer` e i visualizzatori fanno parte dello standard ECMA; sono quindi parte di JavaScript.

Nei browser, abbiamo a disposizione degli oggetti più ad alto livello, descritti in [File API](https://www.w3.org/TR/FileAPI/), in particolare l'oggetto `Blob`.

L'oggetto `Blob` consiste di una stringa opzionale `type` (solitamente di tipo MIME), e di `blobParts`, una sequenza di oggetti `Blob`, stringhe e `BufferSource`.

![](blob.svg)

La sintassi da utilizzare per costruire l'oggetto:

```js
new Blob(blobParts, options);
```

- **`blobParts`** è un array di valori di tipo `Blob`/`BufferSource`/`String`.
- **`options`** oggetto opzionale:
  - **`type`**, di tipo `Blob`, solitamente di tipo MIME, e.g. `image/png`,
  - **`endings`**, se trasformare il carattere di fine riga per far sì che il `Blob` contenga il carattere nuova riga del Sistema Operativo corrente (`\r\n` o `\n`). Di default è `"transparent"` (non fa nulla), ma può assumere il valore `"native"` (effettua la trasformazione).

Ad esempio:

```js
// creiamo un Blob partendo da una stringa
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// da notare: il primo argomento deve essere un array [...]
```

```js
// creiamo un Blob partendo da un TypedArray e da due stringhe
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" nella forma binaria

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


Possiamo estrarre le parti del `Blob` con:

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** - il byte di partenza, di default 0.
- **`byteEnd`** - l'ultimo byte (escluso, fino alla fine di default).
- **`contentType`** - il `type` del nuovo blob, di default lo stesso di quello di origine.

Gli argomenti sono simili al metodo `array.slice`; sono ammessi anche i valori negativi.

```smart header="Gli oggetti `Blob` sono immutabili"
Non possiamo modificare direttamente i dati di un `Blob`, ma possiamo estrarne delle parti, utilizzarle per creare nuovi `Blob`, fonderle insieme in un unico `Blob`, e molto altro.

Questo comportamento è simile alle stringhe JavaScript: non possiamo modificare direttamente un carattere in una stringa, ma possiamo creare una nuova stringa modificata.
```

## Blob come URL

Un `Blob` può essere utilizzato facilmente come URL per `<a>`, `<img>` o altri tag, per mostrarne i contenuti.

Grazie alla proprietà `type`, possiamo anche effettuare download/upload di `Blob`, ed il `type`, naturalmente, diventerà il `Content-Type` nelle richieste network.

Iniziamo con un semplice esempio. Cliccando sul link verrà scaricato come file un `Blob` generato dinamicamente, contenente `hello world`:

```html run
<!-- l'attributo download forza il browser ad effettuare il download anziché navigare -->
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

Possiamo anche creare dinamicamente un link in JavaScript e simularne il click con `link.click()`, in questo modo il download inizierà automaticamente.

Qui vediamo il codice che effettua il download del `Blob` generato dinamicamente, senza alcun HTML:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

`URL.createObjectURL` accetta come parametro un `Blob` e ne crea un corrispondente URL univoco, nella forma `blob:<origin>/<uuid>`.

Questo è un esempio di come potrebbe apparire il valore di un `link.href`:

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

Per ogni URL generato da `URL.createObjectURL` il browser memorizza in una mappa interna la coppia URL -> `Blob`. Così da rendere questi URL più corti, ma in grado di fornire comunque l'accesso al `Blob`.

Un URL generato (e quindi anche il suo link) è valido solamente all'interno del `document` corrente, finché questo rimane aperto. E può essere utilizzato per fare riferimento al `Blob` nei tag `<img>`, `<a>`, e qualsiasi altro oggetto che accetta un URL.

<<<<<<< HEAD
Abbiamo però un effetto collaterale. Poiché i `Blob` sono mappati, ogni oggetto `Blob` risiede in memoria. Quindi il browser non potrà liberarla.
=======
There's a side effect though. While there's a mapping for a `Blob`, the `Blob` itself resides in the memory. The browser can't free it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La mappa verrà automaticamente ripulita al momento dell'`unload` del `document`, quindi gli oggetti di `Blob` verranno eliminati in quel momento. Ma nel caso di applicazioni che "vivono a lungo", questa pulizia non avverrà presto.

**Quindi se creiamo un URL, il relativo `Blob` rimarrà in memoria, anche se non è più necessario.**

`URL.revokeObjectURL(url)` rimuove il riferimento dalla mappa interna, in questo modo sarà possibile eliminare i `Blob` (se questi non possiedono più alcun riferimento), e liberare la memoria.

Nell'ultimo esempio, il nostro intento era di utilizzare il `Blob` solamente una volta, per il download istantaneo, quindi possiamo invocare `URL.revokeObjectURL(link.href)` immediatamente.

Nell'esempio precedente, con il link HTML cliccabile, non invochiamo `URL.revokeObjectURL(link.href)`, poiché questo renderebbe l'URL del `Blob` invalido. Dopo averlo revocato, la coppia URL-`Blob` verrà rimossa dalla mappa, e l'URL non funzionerà più.

## Da Blob a base64

Un alternativa a `URL.createObjectURL` è quella di convertire un `Blob` in una stringa codificata in base 64.

Questo tipo di encoding rappresenta i dati binari come una stringa leggibile di caratteri ultra-safe, con caratteri ASCII-code da 0 a 64. E, molto più importante, possiamo utilizzare questo encoding nei "data-urls".

Un [data url](mdn:/http/Data_URIs) è rappresentato nella forma `data:[<mediatype>][;base64],<data>`. Possiamo utilizzare questi URL ovunque, in alternativa agli URL "regolari".

Ad esempio, qui vediamo un sorriso:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

Il browser decodificherà la stringa e mostrerà l'immagine: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


Per trasformare un `Blob` in base64, utilizzeremo l'oggetto integrato `FileReader`. Può leggere dati da un Blob in diversi formati. Nel [prossimo capitolo](info:file) lo vedremo più in dettaglio.

Qui vediamo un esempio di download di un Blob, utilizzando la base-64:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // convertiamo il Blob in base64 e invochiamo onload
*/!*

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

Entrambi i modi per costruire un URL corrispondente ad un `Blob` sono utilizzabili. Solitamente `URL.createObjectURL(blob)` è più semplice e veloce.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Da Blob a data url"
+ Dobbiamo revocarli per mantenere pulita la memoria.
+ Accesso diretto al Blob, no "encoding/decoding".
- Non dobbiamo ricordarci di revocare nulla.
- Abbiamo perdite di performance e memoria su grandi oggetti di tipo `Blob` a causa dell'encoding.
```

## Da image a blob

Possiamo creare un `Blob` relativo ad un immagine, o addirittura fare uno screenshot della pagina. Può essere molto utile se abbiamo la necessità di caricarla da qualche parte.

Le operazioni sulle immagini sono fatte tramite l'elemento `<canvas>`:

1. Disegniamo un'immagine (o una usa parte) su un canvas utilizziando [canvas.drawImage](mdn:/api/CanvasRenderingContext2D/drawImage).
2. Invochiamo il metodo sui canvas [.toBlob(callback, format, quality)](mdn:/api/HTMLCanvasElement/toBlob) il quale crea un `Blob` ed esegue la `callback` al termine dell'operazione.

Nell'esempio sotto, un'immagine è appena stata copiata, ma potremmo volerla tagliare, o trasformarla utilizzando un canvas, prima di creare un blob:

```js run
// prendiamo un'immagine
let img = document.querySelector('img');

// creiamo un <canvas> delle stesse dimensioni
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// ci copiamo l'immagine al suo interno (questo metodo consente di tagliare l'immagine)
context.drawImage(img, 0, 0);
// possiamo context.rotate(), ed effettuare molte altre operazioni tramite il canvas


// toBlob è un'operazione asincrona, verrà invocata la  funzione di callback al termine
canvas.toBlob(function(blob) {
  // il blob è pronto, lo scarichiamo
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // cancelliamo il riferimento interno al blob, per consentire al browser di rimuoverlo dalla memoria
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

Se preferiamo, possiamo utilizzare `async/await` al posto delle callback:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

Per effettuare lo screenshot di una pagina, possiamo utilizzare una libreria come <https://github.com/niklasvh/html2canvas>. Ciò che fa è semplicemente attraversare la pagina e disegnarla su un `<canvas>`. Successivamente possiamo ottenere un `Blob`, come descritto sopra.

## Da Blob a ArrayBuffer

Il costruttore del `Blob` consente di creare un `Blob` per qualsiasi cosa, inclusi i `BufferSource`.

<<<<<<< HEAD
Se abbiamo bisogno di eseguire operazioni di basso livello, possiamo ottenere il livello più basso, un `ArrayBuffer`, utilizzando `FileReader`:

```js
// otteniamo arrayBuffer da un blob
let fileReader = new FileReader();
=======
But if we need to perform low-level processing, we can get the lowest-level `ArrayBuffer` from `blob.arrayBuffer()`:

```js
// get arrayBuffer from blob
const bufferPromise = await blob.arrayBuffer();
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

// or
blob.arrayBuffer().then(buffer => /* process the ArrayBuffer */);
```

## From Blob to stream

When we read and write to a blob of more than `2 GB`, the use of `arrayBuffer` becomes more memory intensive for us. At this point, we can directly convert the blob to a stream.

A stream is a special object that allows to read from it (or write into it) portion by portion. It's outside of our scope here, but here's an example, and you can read more at <https://developer.mozilla.org/en-US/docs/Web/API/Streams_API>. Streams are convenient for data that is suitable for processing piece-by-piece.

The `Blob` interface's `stream()` method returns a `ReadableStream` which upon reading returns the data contained within the `Blob`.

Then we can read from it, like this:

```js
// get readableStream from blob
const readableStream = blob.stream();
const stream = readableStream.getReader();

while (true) {
  // for each iteration: value is the next blob fragment
  let { done, value } = await stream.read();
  if (done) {
    // no more data in the stream
    console.log('all blob processed.');
    break;
  }

   // do something with the data portion we've just read from the blob
  console.log(value);
}
```

## Riepilogo

Mentre `ArrayBuffer`, `Uint8Array` e gli altri `BufferSource` sono "dati binari", un [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) rappresenta "un dato binario con tipo".

Questo rende i `Blob` convenienti per le operazioni di upload/download, che sono piuttosto comuni nei browser.

I metodi che eseguono richieste web, come [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch) e così via, sono in grado di operare con i `Blob` nativamente, come con tutti gli altri tipi di dato binari.

Possiamo convertire molto rapidamente da `Blob` a dati binari a basso livello:

<<<<<<< HEAD
- Possiamo creare un `Blob` da un `TypedArray` utilizzando il costruttore `new Blob(...)`.
- Possiamo ricostruire un `ArrayBuffer` da un `Blob` utilizzando `FileReader`, e successivamente creare un visualizzatore per visualizzare ed elaborare i dati binari a basso livello.
=======
- We can make a `Blob` from a typed array using `new Blob(...)` constructor.
- We can get back `ArrayBuffer` from a Blob using `blob.arrayBuffer()`, and then create a view over it for low-level binary processing.

Conversion streams are very useful when we need to handle large blob. You can easily create a `ReadableStream` from a blob. The `Blob` interface's `stream()` method returns a `ReadableStream` which upon reading returns the data contained within the blob.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
