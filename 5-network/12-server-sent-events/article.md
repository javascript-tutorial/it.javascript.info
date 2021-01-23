# Server Sent Events

La specifica [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) descrive una classe built-in `EventSource`, che mantiene la connessione con il server e permette di ricevere eventi da esso.

In modo simile ai `WebSocket`, la connessione è persistente.

Ci sono però delle differenze sostanziali:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Bidirezionale: sia il client che il server possono scambiare messaggi | Unidirezionale: solamente il server può inviare messaggi |
| Dati binari e testuali | Solo testuali |
| Protocollo WebSocket | HTTP standard |

`EventSource` è un modo meno potente di comunicare con il server rispetto ai `WebSocket`.

Perché dovremmo usarli?

La ragione principale: è semplice da usare. In molte applicazioni, la potenza dei `WebSocket` è anche troppa.

Se abbiamo necessità di ricevere un flusso di dati da un server: che siano messaggi di chat o variazioni di prezzo dei mercati. Allora è ciò per cui `EventSource` è fatto. Supporta anche l'auto riconnessione, la qualcosa dovremmo invece implementare manualmente nei `WebSocket`. Oltretutto, è un normalissimo HTTP, e non un nuovo protocollo. 

## Ottenere i messaggi

Per cominciare a ricevere messaggi, dobbiamo solamente creare un `new EventSource(url)`.

Il browser si connetterà all'url e terrà la connessione aperta, in attesa di eventi.

Il server dovrebbe rispondere con status 200 ed header `Content-Type: text/event-stream`, dopodiché mantenere aperta la connessione e scrivere i messaggi all'interno di esso in un formato speciale del tipo:

```
data: Message 1

data: Message 2

data: Message 3
data: of two lines
```

- Un messaggio di testo segue la stringa `data:`, lo spazio dopo la virgola è opzionale.
- I messaggi sono delimitati con un doppio line break `\n\n`.
- Per inviare un line break `\n`, possiamo inviare immediatamente un altro `data:` (il terzo messaggio nell'esempio precedente).

In pratica, i messaggi complessi sono solitamente inviati tramite oggetti codificati in JSO. I Line-breaks sono codificati come `\n`, e in questo modo i messaggi `data:` multiriga non sono necessari

Ad esempio:

```js
data: {"user":"John","message":"First line*!*\n*/!* Second line"}
```

...In questo modo possiamo assumere che ogni `data` contenga esattamente un messaggio.

Per ognuno di questi messaggi, viene generato l'evento `message`:

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("New message", event.data);
  //logghera' 3 volte per il data stream poco sopra
};

// oppure eventSource.addEventListener('message', ...)
```

### Richieste Cross-origin

`EventSource` supporta le richieste cross-origin, come `fetch` e qualunque altro metodo di rete. Possiamo usare qualunque URL:

```js
let source = new EventSource("https://another-site.com/events");
```
Il server remoto otterrà l'header `Origin` e dovrà rispondere con `Access-Control-Allow-Origin` per continuare.

Per inviare credenziali, dovremmo impostare le opzioni aggiuntive `withCredentials`, in questo modo:

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

Si prega di guardare il capitolo <info:fetch-crossorigin> per maggiori informazioni sugli headers cross-origin.


## Riconnessione

In fase di creazione, `new EventSource` si connette al server, e se la connessione si interrompe -- si riconnette.

Ciò è molto conveniente, dal momento che non ci dobbiamo curare della cosa.

C'è un piccolo ritardo tra le riconnessioni, pochi secondi di default.

Il server può impostare il ritardo raccomandato usando `retry:` nella risposta (in millisecondi)

```js
retry: 15000
data: Hello, I set the reconnection delay to 15 seconds
```

Il `retry:` può arrivare insieme ad altri dati, o come messaggio singolo.

Il browser dovrebbe attendere questi millisecondi prima di riconnettersi. O anche di più, ad esempio se il browser sa (dall'OS) che non c'è connessione in quel momento, può attendere fino a quando la connessione non ritorna, e successivamente riprovare.

- Se il server vuole che il browser smetta di riconnettersi, dovrebbe rispondere con uno status HTTP 204.
- Se il browser vuole chiudere la connessione, dovrebbe chiamare il metodo `eventSource.close()`:

```js
let eventSource = new EventSource(...);

eventSource.close();
```
Inoltre, non avverrà alcuna riconnessione se la risposta ha un `Content-type` non valido o se il suo HTTP status è diverso da 301, 307, 200 o 204. In questi casi verrà emesso l'evento `"error"`, e il browser non si riconnetterà.

```smart
Quando una connessione è finalemente chiusa, non ci sarà modo di "riaprirla". Se volessimo riconnetterci nuovamente, dovremmo ricreare un nuovo `EventSource`.
```

## Message id

Quando una connessione si interrompe per motivi di problemi di rete, ogni lato non può essere sicuro di quale messaggi siano stati ricevuti, e quali no.
Per riprendere correttamente la connessione, ogni messaggio dovrebbe avere un campo `id`, come questo:
```
data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: of two lines
id: 3
```
Quando viene ricevuto un messaggio con `id:`, il browser:

- Imposta la proprietà `eventSource.lastEventId` su quel valore.
- In fase di riconnessione invia l'header `Last-Event-ID` con quell'`id`, in modo da permettere al server di reinviare i messaggi successivi.

```smart header="Inserisci `id:` dopo `data:`"
Nota bene: l'`id` viene aggiunto dopo il messaggio `data` dal server, per assicurarsi che `lastEventId` venga aggiornato solamente dopo che il messaggio sia stato ricevuto.
```

## Stato della conessione: readyState

L'oggetto `EventSource` possiede la proprietà `readyState`, che può assumere uno dei seguenti valori:

```js no-beautify
EventSource.CONNECTING = 0; // connessione o riconnessione
EventSource.OPEN = 1;       // connesso
EventSource.CLOSED = 2;     // connessione chiusa
```

Quando viene creato un oggetto, o se la connessione è assente, viene valorizzato sempre a `EventSource.CONNECTING` (equivale a `0`).

Possiamo interrogare questa proprietà per sapere lo stato di `EventSource`.

## Tipi di evento

Di base l'oggetto `EventSource` genera tre eventi:

- `message` -- un messaggio ricevuto, disponibile come `event.data`.
- `open` -- la connessione è aperta.
- `error` -- la connessaione non può essere stabilita, ad esempio, il server ha risposto con lo status HTTP 500.

Il server può specificare un altro tipo di evento con `event: ...` all'inizio dell'evento.

Per esempio:

```
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

Per gestire eventi custom, dobbiamo usare `addEventListener`, e non `onmessage`:

```js
eventSource.addEventListener('join', event => {
  alert(`Joined ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Said: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Left ${event.data}`);
});
```

## Esempio completo

Qui c'è il server che invia messaggi con `1`, `2`, `3`, ed infine `bye` interrompendo la connessione.

Dopo il browser si riconnette automaticamente.

[codetabs src="eventsource"]

## Riepilogo

L'oggetto `EventSource` stabilisce automaticamente una connessione persistente e permette al server di inviare dei messaggi attraverso di essa.

Offrendo:
- Riconnessione automatica, con timeout di `retry` regolabili.
- Id dei messaggi per riprendere gli eventi, l'ultimo id ricevuto viene inviato nell'header `Last-Event-ID` in fase di riconnessione.
- Lo stato corrente è dentro la proprietà `readyState`.

Ciò rende `EventSource` una valida alternativa ai `WebSocket`, il quale è più a basso livello e manca di alcune funzionalità built-in (sebbene possano essere implementate).

In molte applicazioni reali, la potenza di `EventSource` è già sufficiente.

Supportato in tutti i browser moderni (non IE).

La sintassi è:

```js
let source = new EventSource(url, [credentials]);
```

Il secondo argomento consta di una sola opzione possibile: `{ withCredentials: true }`, la quale permette di inviare credenziali cross-origin.

Complessivamente la sicurezza del cross-origin è la stessa di `fetch` e altri metodi di rete.

### Proprietà di un oggetto `EventSource`

`readyState`
: Lo stato corrente della connessione: uno tra `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` o `EventSource.CLOSED (=2)`.

`lastEventId`
: L'ultimo `id` ricevuto.In fase di riconnessione il browser lo invia nell'header `Last-Event-ID`.

### Metodi

`close()`
: Chiude la connessione.

### Eventi

`message`
: Messagio ricevuto, il dato è dentro `event.data`.

`open`
: La connessione è stabilita.

`error`
: In caso di errori, inclusi la connessione persa (con riconnessione automatica) ed errori fatali. Possiamo controllare `readyState` per vedere se è stata tentata la riconnessione.

Il server può impostare un evento personalizzato dentro `event:`. Questi eventi andrebbero gestiti usando `addEventListener`, e non `on<event>`.

### Formato della risposta del server

Il server invia messaggi, delimitati da `\n\n`.

Un messaggio può avere i seguenti campi:

- `data:` -- corpo del messaggio, una sequenza di `data` multipli viene interpretata come un messaggio singolo, con `\n` tra la parti.
- `id:` -- aggiorna `lastEventId`, inviato dentro `Last-Event-ID` in fase di riconnessione.
- `retry:` -- raccomanda una ritardo nel tentativo di riconessione in millisecondi. Non c'è modo di impostarlo da JavaScript.
- `event:` -- event name, must precede `data:`.

Un messaggio può includere uno o più campi in qualunque ordine, ma l'`id:` solitamente va per ultimo.
