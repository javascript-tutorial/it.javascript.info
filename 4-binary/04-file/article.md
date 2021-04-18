# File e FileReader

Un oggetto di tipo [File](https://www.w3.org/TR/FileAPI/#dfn-file) eredita da `Blob` e lo estende con funzionalità legate al filesystem.

Ci sono due modi per costruirlo.

Il primo, utilizzando il costruttore, molto simile a `Blob`:

```js
new File(fileParts, fileName, [options])
```

- **`fileParts`**, è una array di valori di tipo Blob/BufferSource/String.
- **`fileName`**, il nome del file.
- **`options`**, oggetto opzionale:
    - **`lastModified`**, il timestamp dell'ultima modifica (un intero).

Il secondo modo, si applica quando otteniamo un file tramite `<input type="file">`, con il drag'n'drop o con altre interfacce browser. In questo caso, il file prende le informazioni dal sistema operativo.

Poiché `File` eredita da `Blob`, gli oggetti di tipo `File` possiedono le stesse proprietà, con l'aggiunta di:
- `name`, il nome del file,
- `lastModified`, il timestamp dell'ultima modifica.

Vediamo come ottenere un oggetto `File` tramite `<input type="file">`:

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // e.g my.png
  alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
}
</script>
```

```smart
Tramite l'input è possibile selezionare più file, quindi `input.files` è un array. In questo caso abbiamo solamente un file, quindi è sufficiente prendere `input.files[0]`.
```

## FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) è un oggetto il cui unico scopo è quello di leggere dati da oggetti di tipo `Blob` (e quindi anche da quelli di tipo `File`).

Questo fornisce i dati utilizzando gli eventi, in quanto la lettura da disco potrebbe richiedere tempo.

Il suo costruttore:

```js
let reader = new FileReader(); // no arguments
```

I metodi principali:

- **`readAsArrayBuffer(blob)`**, legge i dati in formato binario da `ArrayBuffer`.
- **`readAsText(blob, [encoding])`**, legge i dati come stringa di testo con uno specifico encoding (`utf-8` di default).
- **`readAsDataURL(blob)`**, legge i dati in formato binario e li codifica come URL in base64.
- **`abort()`**, annulla l'operazione.

La scelta di quale metodo di `read*` utilizzare, dipende molto dal formato che preferiamo utilizzare, e a come andremo ad utilizzare i dati.

- `readAsArrayBuffer`, per file di tipo binario, per eseguire operazioni a basso livello. Per operazioni ad alto livello, come la rimozione di porzioni di file, `File` eredita da `Blob`, quindi possiamo invocare i suoi metodi direttamente, senza iniziare la lettura.
- `readAsText`, per file di tipo testuale, per ottenerli sotto forma di stringa.
- `readAsDataURL`, quando siamo interessati da utilizzare questi dati come `src` su un `img` o un altro tag. In questo caso c'è un ulteriore alternativa , che abbiamo discusso nel capitolo <info:blob>: `URL.createObjectURL(file)`.

Mentre il processo di lettura prosegue, vengono emessi degli eventi:
- `loadstart`, la lettura è iniziata.
- `progress`, durante la lettura.
- `load`, nessun errore, lettura completata.
- `abort`, invocato `abort()`.
- `error`, si è verificato un errore.
- `loadend`, lettura completata con o senza errori.

Quando la lettura è completa, possiamo accedere al risultato come:
- `reader.result` il risultato (se la lettura è avvenuta con successo)
- `reader.error` l'errore (se la lettura è fallita).

Gli eventi più utilizzati sono sicuramente `load` e `error`.

Qui vediamo un esempio di lettura di un file:

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

```smart header="`FileReader` per blobs"
Come accennato nel capitolo <info:blob>, `FileReader` può essere utilizzano non solo per la lettura di file, ma per qualsiasi blob.

Possiamo utilizzarlo per convertire un `Blob` in un altro formato:
- `readAsArrayBuffer(blob)`, per convertirlo ad `ArrayBuffer`,
- `readAsText(blob, [encoding])`, per convertirlo a string (un'alternativa a `TextDecoder`),
- `readAsDataURL(blob)`, per convertirlo ad url in base64.
```


```smart header="`FileReaderSync` è disponibile all'interno dei Web Workers"
Nel caso dei Web Workers, esiste anche una variante sincrona dell'oggetto `FileReader`, chiamata [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

I suoi metodi di lettura `read*` non generano eventi, ma ritorna un risultato, come una qualsiasi funzione regolare.

Questo è possibile solamente all'interno di un Web Worker, a causa dei ritardi dovuti alle chiamate sincrone che si possono verificare quando si legge da file, questi ritardi nei Web Workers sono meno importanti. In quanto non intaccano le performance della pagina.
```

## Riepilogo

Gli oggetti di tipo `File` ereditano da `Blob`.

In aggiunta ai metodi ed alle proprietà ereditate da `Blob`, gli oggetti `File` possiedono le proprietà `name` e `lastModified`, oltre alla capacità di leggere direttamente dal filesystem. Solitamente otteniamo oggetti `File` tramite input da utente, come `<input>` o eventi di Drag'n'Drop (`ondragend`).

Gli oggetti `FileReader` possono leggere un `File` o un `Blob`, in uno dei seguenti formati:
- Stringa (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- Data URL, codificati in base-64 (`readAsDataURL`).

In molti casi però, non necessitiamo di leggere il contenuto di un file. Proprio come abbiamo fatto con i `Blob`, possiamo creare un URL con `URL.createObjectURL(file)` ed assegnarlo ad un tag `<a>` o `<img>`. In questo modo il file potrà essere scaricato o mostrato come immagine, come parte di un canvas etc.

E nel caso in cui provassimo ad inviare un `File` sulla rete, sarà ancora più facile: le API di rete come `XMLHttpRequest` o `fetch` accettano nativamente oggetti di tipo `File`.
