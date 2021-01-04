# Server Sent Events

La specifica [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) descrive una classe built-in `EventSource`, che mantiene la connessione con il server e permette di ricevere eventi da esso.

In modo simile ai `WebSocket`, la connessione &egrave; persistente.

Ci sono per&ograve; delle differenze sostanziali:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Bidirezionale: sia il client che il server possono scambiare messaggi | Unidirezionale: solamente il server può inviare messaggi |
| Dati binari e testuali | Solo testuali |
| Protocollo WebSocket | HTTP standard |

`EventSource` &egrave; un modo meno potente di comunicare con il server rispetto ai `WebSocket`.

Perch&egrave; dovremmo usarli?

La ragione principale: &egrave; semplice da usare. In molte applicazioni, la potenza dei `WebSocket` &egrave; anche troppa.

Se abbiamo necessit&agrave; di ricevere un flusso di dati da un server: che siano messaggi di chat o variazioni di prezzo dei mercati. Allora &egrave; ci&ograve; per cui `EventSource` &egrave; fatto. Supporta anche l'auto riconessione, la qualcosa dovremmo invece implementare manualmente nei `WebSocket`. Oltretutto, &egrave; un normalissimo HTTP, e non un nuovo protocollo. 

## Ottenere i messaggi

Per cominciare a ricevere messaggi, dobbiamo solamente creare un `new EventSource(url)`.

Il browser si connetter&agrave; all'url e terr&agrave; la connessione aperta, in attesa di eventi.

Il server dovrebbe rispondere con status 200 ed header `Content-Type: text/event-stream`, dopodich&egrave; mantenere aperta la connessione e scrivere i messaggi all'interno di esso in un formato speciale del tipo:

```
data: Message 1

data: Message 2

data: Message 3
data: of two lines
```

- Un messaggio di testo che va dopo `data:`, lo spazio dopo la virgola &egrave; opzionale.
- I messaggi sono delimitati con un doppio line break `\n\n`.
- Per inviare un line break `\n`, possiamo inviare immediatamente un altro `data:` (il terzo messaggio nell'esempio qui sopra).

In pratica, i messaggi complessi sono solitamente inviati tramite oggetti codificati in JSO. I Line-breaks sono codificati come `\n` tra essi, e in questo modo i messaggi `data:` multiriga non sono necessari

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
Il server remoto otterr&agrave; l'header `Origin` e dovr&agrave; rispondere con `Access-Control-Allow-Origin` per continuare.

Per inviare credenziali, dovremmo impostare le opzioni aggiuntive `withCredentials`, in questo modo:

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

Si prega di guardare il capitolo <info:fetch-crossorigin> per maggiori informazioni sugli headers cross-origin.


## Riconnessione

In fase di creazione, `new EventSource` si connette al server, e se la connessione si interrompe -- si riconnette.

Ci&ograve; &egrave; molto conveniente, dal momento che non ci dobbiamo curare della cosa.

C'&egrave; un piccolo ritardo tra le riconnessioni, pochi secondi di default.

Il server pu&ograve; impostare il ritardo raccomandato usando `retry:` nella risposta (in millisecondi)

```js
retry: 15000
data: Hello, I set the reconnection delay to 15 seconds
```

Il `retry:` pu&ograve; arrivare insieme ad altri dati, o come messaggio singolo.

Il browser dovrebbe attendere questi millisecondi prima di riconettersi. O anche di pi&ugrave;, ad esempio se il browser sa (dall'OS) che non c'&egrave; connessione in quel momento, pu&ograve; attendere fino a quando la connessione non ritorna, e successivamente riprovare.

- Se il server vuole che il browser smetta di riconnettersi, dovrebbe rispondere con uno status HTTP 204.
- Se il browser vuole chiudere la connessione, dovrebbe chiamare il metodo `eventSource.close()`:

```js
let eventSource = new EventSource(...);

eventSource.close();
```
Inoltre, non avverr&agrave; alcuna riconnessione se la risposta ha un `Content-type` non valido o se il suo HTTP status &egrave; diverso da 301, 307, 200 o 204. In questi casi verr&agrave; emesso l'evento `"error"`, e il browser non si riconnetter&agrave;.

```smart
Quando una connessione &egrave; finalemente chiusa, non ci sar&agrave; modo di "riaprirla". Se volessimo riconnetterci nuovamente, dovremmo ricreare un nuovo `EventSource`.
```

## Message id

Quando una connessione si interrompe per motivi di problemi di rete, ogni lato non pu&ograve; essere sicuro di quale messaggi siano stati ricevuti, e quali no.
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

- Imposta la propriet&agrave; `eventSource.lastEventId` su quel valore.
- In fase di riconnessione invia l'header `Last-Event-ID` con quell'`id`, in modo da permettere al server di reinviare i messaggi successivi.

```smart header="Inserisci `id:` dopo `data:`"
Nota bene: l'`id` viene aggiunto dopo il messaggio `data` dal server, per assicurarsi che `lastEventId` venga aggiornato solamente dopo che il messaggio sia stato ricevuto.
```

## Stato della conessione: readyState

L'oggetto `EventSource` possiede la propriet&agrave; `readyState`, che assume uno tra questi tre valori:

```js no-beautify
EventSource.CONNECTING = 0; // connessione o riconnessione
EventSource.OPEN = 1;       // connesso
EventSource.CLOSED = 2;     // connessione chiusa
```

Quando viene creato un oggetto, o se la connessione &egrave; assente, viene valorizzato sempre a `EventSource.CONNECTING` (equivale a `0`).

Possiamo interrogare questa propriet&agrave; per sapere lo stato di `EventSource`.

## Tipi di evento

Di base l'oggetto `EventSource` genera tre eventi:

- `message` -- un messaggio ricevuto, disponibile come `event.data`.
- `open` -- la connessione &egrave; aperta.
- `error` -- la connessaione non pu&ograve; essere stabilita, ad esempio, il server ha risposto con lo status HTTP 500.

Il server pu&ograve; specificare un altro tipo di evento con `event: ...` all'inizio dell'evento.

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

Qui c'&egrave; il server che invia messaggi con `1`, `2`, `3`, ed infine `bye` interrompendo la connessione.

Dopo il browser si riconnette automaticamente.

[codetabs src="eventsource"]

## Riepilogo

L'oggetto `EventSource` stabilisce automaticamente una connessione persistente e permette al server di inviare dei messaggi attraverso di essa.

Offrendo:
- Riconnessione automatica, con timeout di `retry` regolabili.
- Id dei messaggi per riprendere gli eventi, l'ultimo id ricevuto viene inviato nell'header `Last-Event-ID` in fase di riconnessione.
- Lo stato corrente &egrave; dentro la propriet&agrave; `readyState`.

Ci&ograve; rende `EventSource` una valida alternativa ai `WebSocket`, il quale &egrave; pi&ugrave; a basso livello e manca di alcune funzionalit&agrave; built-in (sebbene possasno essere implementate).

In molte applicazioni reali, la potenza di `EventSource` &egrave; gi&agrave; sufficiente.

Supportato in tutti i browser moderni (non IE).

La sintassi &egrave;:

```js
let source = new EventSource(url, [credentials]);
```

Il secondo argomento consta di una sola opzione possibile: `{ withCredentials: true }`, la quale permette di inviare credenziali cross-origin.

Complessivamente la sicurezza del cross-origin &egrave; la stessa di `fetch` e altri metodi di rete.

### Propriet&agrave; di un oggetto `EventSource`

`readyState`
: Lo stato corrente della connessione: uno tra `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` o `EventSource.CLOSED (=2)`.

`lastEventId`
: L'ultimo `id` ricevuto.In fase di riconnessione il browser lo invia nell'header `Last-Event-ID`.

### Metodi

`close()`
: Chiude la connessione.

### Eventi

`message`
: Messagio ricevuto, il dato &egrave; dentro `event.data`.

`open`
: La connessione &egrave; stabilita.

`error`
: In caso di errori, includendo sia la connessione persa (si riconnetter&agrave; automaticamente), che errori fatali. Possiamo controllare `readyState` per vedere se &egrave; stata tentata la riconnessione.

Il server pu&ograve; impostare un evento custom dentro `event:`. Questi eventi andrebbero gestiti usando `addEventListener`, e non `on<event>`.

### Formato della risposta del server

Il server invia messaggi, delimitati da `\n\n`.

Un messaggio pu&ograve; avere i seguenti campi:

- `data:` -- corpo del messaggio, una sequenza di `data` multipli viene intrpretata come un messaggio singolo, con `\n` tra la parti.
- `id:` -- aggiorna il `lastEventId`, inviato dentro `Last-Event-ID` in fase di riconnnessione.
- `retry:` -- raccomnda una ritardo nel tentativo di riconessione in millisecondi. Non c'&egrave; modo di impostarlo da JavaScript.
- `event:` -- event name, must precede `data:`.

Un messaggio pu&ograve; includere uno o pi&ugrave; campi in qualunque ordine, ma l'`id:` solitamente va per ultimo.
