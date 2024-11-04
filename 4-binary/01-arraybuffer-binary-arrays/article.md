# ArrayBuffer, array binari

Nello sviluppo web incontriamo dati di tipo binario principalmente quando lavoriamo con i file (creazione, upload o download). Un altro tipico caso d'uso è l'elaborazione di immagini.

Sono tutte cose possibili con JavaScript, e le operazioni binarie ottimizzano le prestazioni.

Sebbene ci sia un po' di confusione, poiché esistono molte classi. Per citarne alcune:
- `ArrayBuffer`, `Uint8Array`, `DataView`, `Blob`, `File`, etc.

I dati binari in JavaScript sono implementati in maniera non standard, rispetto ad altri linguaggi. Ma se riusciamo a riorganizzare le idee, tutto diventa piuttosto semplice.

**L'oggetto binario di base è `ArrayBuffer`, un riferimento ad un'area di memoria contigua di lunghezza fissa.**

Lo possiamo creare in questo modo:
```js run
let buffer = new ArrayBuffer(16); // creiamo un buffer di lunghezza 16
alert(buffer.byteLength); // 16
```

Questo alloca un'area di memoria contigua di 16 byte, e la popola con degli zeri.

```warn header="`ArrayBuffer` è un array di "qualcosa""
Eliminiamo subito una possibile fonte di confusione. `ArrayBuffer` non ha nulla in comune con `Array`:
- Ha una dimensione prefissata, non possiamo aumentarla o diminuirla.
- Occupa esattamente quello spazio in memoria.
- Per accedere a uno specifico byte, è richiesto un ulteriore oggetto. `buffer[index]` non  funzionerebbe.
```

`ArrayBuffer` rappresenta un'area di memoria. Cosa vi è memorizzano? Non ne ha assolutamente idea. Semplicemente una sequenza di byte.

**Per manipolare un `ArrayBuffer`, dobbiamo utilizzare un oggetto "visualizzatore".**

<<<<<<< HEAD
Un oggetto visualizzatore non memorizza nulla. Funge da "lente di ingrandimento" che fornisce un interpretazione dei byte memorizzati in un `ArrayBuffer`.
=======
A view object does not store anything on its own. It's the "eyeglasses" that give an interpretation of the bytes stored in the `ArrayBuffer`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio:

- **`Uint8Array`**: tratta ogni byte contenuto nell'`ArrayBuffer` come un numero separato, che può assumere valori compresi tra 0 e 255 (un byte è composta da 8-bit, quindi quell'intervallo è il massimo rappresentabile). Questo valore viene definito un "interno a 8-bit senza segno".
- **`Uint16Array`**: interpreta 2 byte come un intero, possono quindi assumere valori nell'intervallo da 0 a 65535. Questo viene definito un "intero a 16-bit senza segno".
- **`Uint32Array`**: interpreta 4 byte come un intero, possono quindi assumere valori nell'intervallo da 0 a 4294967295. Questo viene definito un "intero a 32-bit senza segno".
- **`Float64Array`**: interpreta 8 byte come un numero in virgola mobile, possono quindi assumere valori nell'intervallo da <code>5.0x10<sup>-324</sup></code> a <code>1.8x10<sup>308</sup></code>.

Quindi, i dati binari contenuti in un `ArrayBuffer` di 16 byte possono essere interpretati con 16 "piccoli numeri", oppure 8 "grandi numeri" (2 byte ciascuno), oppure 4 "numeri ancora più grandi" (4 byte ciascuno), oppure 2 valori in virgola mobile ad alta precisione (8 byte ciascuno).

![](arraybuffer-views.svg)

`ArrayBuffer` è l'oggetto principale, la radice di tutto, quello che contiene i dati binari.

Ma nel momento in cui andiamo a scriverci qualcosa, o iteriamo su di esso, e per praticamente qualsiasi altra operazione, dobbiamo utilizzare un visualizzatore, e.g:

```js run
let buffer = new ArrayBuffer(16); // crea un buffer di lunghezza 16

*!*
let view = new Uint32Array(buffer); // interpreta un buffer come una sequenza di interi a 32 bit

alert(Uint32Array.BYTES_PER_ELEMENT); // intero a 4 byte
*/!*

alert(view.length); // 4, numero di interi memorizzati
alert(view.byteLength); // 16, la dimensione in byte

// scriviamo un valore
view[0] = 123456;

// iteriamo sui valori
for(let num of view) {
  alert(num); // 123456, poi 0, 0, 0 (4 valori in totale)
}

```

## TypedArray

<<<<<<< HEAD
Il termine comune utilizzato per i visualizzatori (`Uint8Array`, `Uint32Array`, etc) è [TypedArray](https://tc39.github.io/ecma262/#sec-typedarray-objects). Questi condividono lo stesso insieme di metodi e proprietà.
=======
The common term for all these views (`Uint8Array`, `Uint32Array`, etc) is [TypedArray](https://tc39.github.io/ecma262/#sec-typedarray-objects). They share the same set of methods and properties.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Da notare, non esiste alcun costruttore per il tipo `TypedArray`, è semplicemente un "ombrello" comune per rappresentare un visualizzatore per `ArrayBuffer`: `Int8Array`, `Uint8Array` e così via, vedremo la lista completa a breve.

Quando vedete qualcosa come `new TypedArray`, equivale a: `new Int8Array`, `new Uint8Array`, etc.

I TypedArray si comportano come gli array regolari: sono indicizzabili ed iterabili.

Un costruttore di TypedArray (che sia `Int8Array` o `Float64Array`, non ha importanza) si comporta diversamente in base al tipo degli argomenti.

Esistono 5 varianti degli argomenti:

```js
new TypedArray(buffer, [byteOffset], [length]);
new TypedArray(object);
new TypedArray(typedArray);
new TypedArray(length);
new TypedArray();
```

1. Se viene fornito un `ArrayBuffer` come argomento, il visualizzatore verrà creato su questo. Abbiamo già usato questa sintassi.

    Come parametri opzionali, possiamo fornire il `byteOffset` da cui iniziare (0 di default) e la `length` (fino alla fine del buffer di default), in questo modo il visualizzatore coprirà solamente una parte del `buffer`.

2. Se viene fornito un `Array`, o un oggetto simil-array, viene creato un TypedArray delle stessa lunghezza e ne viene copiato il contenuto.

    Possiamo utilizzarlo per pre-popolare l'array con dei dati:
    ```js run
    *!*
    let arr = new Uint8Array([0, 1, 2, 3]);
    */!*
    alert( arr.length ); // 4, creazione di un array binario delle stessa lunghezza
    alert( arr[1] ); // 1, popolato con 4 byte (intero a 8-bit senza segno) con i valori forniti
    ```
3. Se viene fornito un ulteriore `TypedArray`, accadrà la stessa cosa: verrà creato un TypedArray delle stessa lunghezza e ne verrà copiato il contenuto. I valori verranno convertiti al nuovo tipo, se necessario.
    ```js run
    let arr16 = new Uint16Array([1, 1000]);
    *!*
    let arr8 = new Uint8Array(arr16);
    */!*
    alert( arr8[0] ); // 1
    alert( arr8[1] ); // 232, prova a copiare 1000, ma non può essere rappresentato con 8 bit (vedi la spiegazione sotto)
    ```

4. Per una argomento numerico `length`, verrà creato un TypedArray in grado di contenere quel numero di elementi. La sua dimensione in byte sarà `length` moltiplicato per il numero di byte per singolo elemento `TypedArray.BYTES_PER_ELEMENT`:
    ```js run
    let arr = new Uint16Array(4); //  crea un TypedArray per 4 interi
    alert( Uint16Array.BYTES_PER_ELEMENT ); // 2 byte per intero
    alert( arr.byteLength ); // 8 (dimensione in byte)
    ```

5. Senza argomenti, crea un TypedArray di lunghezza zero.

Possiamo creare un `TypedArray` direttamente, senza menzionare `ArrayBuffer`. Ma un visualizzatore non può esistere senza un relativo `ArrayBuffer`, quindi questo verrà creato automaticamente in tutti i casi, ad eccezione del primo (in cui viene fornito).

Per accedere all'`ArrayBuffer`, abbiamo a disposizione le seguenti proprietà:
- `arr.buffer`, che fa riferimento a `ArrayBuffer`.
- `arr.byteLength`, la lunghezza dell'`ArrayBuffer`.

Quindi possiamo sempre cambiare da un visualizzatore ad un altro:
```js
let arr8 = new Uint8Array([0, 1, 2, 3]);

// un altro visualizzatore per gli stessi dati
let arr16 = new Uint16Array(arr8.buffer);
```


Qui vediamo la lista dei TypedArray:

- `Uint8Array`, `Uint16Array`, `Uint32Array`: per numeri interi a 8, 16 e 32 bit.
  - `Uint8ClampedArray`: per interi a 8-bit, "bloccati" in fase di assegnazione (vedi sotto).
- `Int8Array`, `Int16Array`, `Int32Array`: per numeri interi con segno (possono essere negativi).
- `Float32Array`, `Float64Array`: per numeri in virgola mobile con segno, a 32 e 64 bit.

```warn header="Non esistono `int8`, o simili, tipi a singolo valore"
Da notare che, nonostante i nomi, come `Int8Array`, non esiste alcun tipo a singolo valore come `int`, o `int8` in JavaScript.

E' abbastanza logico, poiché `Int8Array` non è un array per questi valori, ma piuttosto un visualizzatore su un `ArrayBuffer`.
```

### Comportamento per valori fuori dai limiti

Cosa accade se proviamo a scrivere un valore fuori dai limiti in un TypedArray? Non verrà generata alcuna eccezione. Ma i bit di troppo verranno ignorati.

Ad esempio, proviamo a scrivere 256 in `Uint8Array`. Nella forma binaria, 256 equivale a `100000000` (9 bit), ma `Uint8Array` fornisce solamente 8 bit per valore, questo fa si che l'intervallo di valori disponibili vada da 0 a 255.

Per numeri più grandi, vengono memorizzati solamente gli 8 bit più a destra (meno significativi), gli altri verranno ignorati:

![](8bit-integer-256.svg)

Quindi otterremo uno zero.

Nel caso di 257, la forma binaria è `100000001` (9 bit), vengono memorizzati gli 8 bit più a destra, quindi il valore memorizzato nell'array sarà `1`:

![](8bit-integer-257.svg)

In altre parole, viene memorizzato il numero modulo 2<sup>8</sup>.

Qui vediamo un esempio:

```js run
let uint8array = new Uint8Array(16);

let num = 256;
alert(num.toString(2)); // 100000000 (rappresentazione binaria)

uint8array[0] = 256;
uint8array[1] = 257;

alert(uint8array[0]); // 0
alert(uint8array[1]); // 1
```

`Uint8ClampedArray` è speciale sotto questo aspetto, il suo comportamento è differente. Memorizza 255 per qualsiasi numero maggiore di 255, e 0 per qualsiasi valore negativo. Questo comportamento risulta essere molto utile nell'elaborazione di immagini.

## Metodi dei TypedArray

`TypedArray` possiede gli stessi metodi di `Array`, con un paio di eccezioni.

Possiamo iterare su di essi con `map`, `slice`, `find`, `reduce` etc.

Ci sono però un pò di cose che non possiamo fare:

- Non possiamo utilizzare `splice`. Non possiamo "eliminare" un valore, poiché i TypedArray sono dei visualizzatori su un buffer, e questi sono di dimensioni fissata, su un'area contigua di memoria. Tutto ciò che possiamo fare è assegnargli zero.
- Non esiste il metodo `concat`.

Abbiamo a disposizione due metodi aggiuntivi:

- `arr.set(fromArr, [offset])` copia tutti gli elementi da `fromArr` a `arr`, iniziando dalla posizione `offset` (0 di default).
- `arr.subarray([begin, end])` crea un nuovo visualizzatore dello stesso tipo, a partire da `begin` fino a `end` (esclusi). Questo comportamento è molto simile al metodo `slice` (il quale è supportato), ma non copia nulla, crea semplicemente un nuovo visualizzatore, utile per operare in uno specifico pezzo di dati.

Questi metodi ci consentono di copiare i TypedArray, mescolarli, creare nuovi array partendo da quelli già esistenti, e così via.



## DataView

[DataView](mdn:/JavaScript/Reference/Global_Objects/DataView) è uno speciale, super flessibile visualizzatore "non tipizzato" su `ArrayBuffer`. Consente di accedere ai dati in qualsiasi offset in qualsiasi formato.

- Nel caso di TypedArray, il costruttore ne definiva il formato. Si supponeva che l'intero array fosse uniforme. L'i-esimo numero è `arr[i]`.
- Con `DataView` accediamo ai dati con metodi come `.getUint8(i)` o `.getUint16(i)`. Scegliamo il formato al momento della lettura, piuttosto che al momento della costruzione.

La sintassi:

```js
new DataView(buffer, [byteOffset], [byteLength])
```

- **`buffer`**, l'`ArrayBuffer` di riferimento. A differenza dei TypedArray, `DataView` non crea un suo buffer. Dobbiamo averne già uno pronto.
- **`byteOffset`**, la posizione del byte di partenza del visualizzatore (di default 0).
- **`byteLength`**, la lunghezza in byte del visualizzatore (di default fino alla fine di `buffer`).

Ad esempio, qui estraiamo numeri in formati differenti dallo stesso buffer:

```js run
// array binario di 4 byte, tutti con valore massimo 255
let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

let dataView = new DataView(buffer);

// prendiamo un numero a 8 bit all'offset 0
alert( dataView.getUint8(0) ); // 255

// ora prendiamo un numero a 16 bit all'offset 0, consiste di 2 byte, insieme vengono interpretati come 65535
alert( dataView.getUint16(0) ); // 65535 (il più grande intero a 16-bit senza segno)

// prendiamo un numero a 32-bit all'offset 0
alert( dataView.getUint32(0) ); // 4294967295 (il più grande intero a 32-bit senza segno)

dataView.setUint32(0, 0); // imposta un numero a 4 byte a zero, questo imposta tutti i byte a 0
```

`DataView` è ottimo quando memorizziamo dati in formati misti nello stesso buffer. Ad esempio, quando memorizziamo una sequenza di coppie (intero a 16-bit, 32-bit in virgola mobile), `DataView` ci consente di accedervi in maniera semplice.

## Riepilogo

`ArrayBuffer` è l'oggetto principale, un riferimento un'area di memoria contigua di lunghezza fissa.

Per eseguire qualsiasi operazioni su un `ArrayBuffer`, abbiamo bisogno di un visualizzatore.

- Questo può essere un `TypedArray`:
    - `Uint8Array`, `Uint16Array`, `Uint32Array`, per interi senza segno a 8, 16, e 32 bit.
    - `Uint8ClampedArray`, per interi a 8 bit, fissati in fase di assegnazione.
    - `Int8Array`, `Int16Array`, `Int32Array`, per numeri interi con segno (possono essere negativi).
    - `Float32Array`, `Float64Array`, per numeri in virgola mobile con segno di 32 e 64 bit.
- Oppure un `DataView`, un visualizzatore che utilizza che utilizza i metodi per specificare un formato, e.g. `getUint8(offset)`.

Nella maggior parte dei casi creiamo ed operiamo direttamente sui TypedArray, tenendo `ArrayBuffer` sotto copertura, come "denominatore comune". Possiamo accedervi come `.buffer` e creare un altro visualizzatore, se necessario.

Ci sono due ulteriori termini, utilizzati nei descrittori dei metodi che operano sui dati binari:
- `ArrayBufferView` è un "termine ombrello" che fa riferimento a tutti questi tipi di visualizzatori.
- `BufferSource` è un "termine ombrello" per `ArrayBuffer` o `ArrayBufferView`.

Vederemo questi termini nei prossimi capitoli. `BufferSource` è uno dei termini più comuni, poiché equivale a "qualsiasi tipo di dato binario"; un `ArrayBuffer` o un suo visualizzatore.

Eccovi un cheatsheet:

![](arraybuffer-view-buffersource.svg)
