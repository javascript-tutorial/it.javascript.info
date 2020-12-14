# WebSocket

Il protocollo `WebSocket`, descritto nelle specifiche [RFC 6455](http://tools.ietf.org/html/rfc6455) fornisce un mezzo di scambio dati tra server e browser utilizzando una connessione persistente. I dati vengono scambiati in entrambe le direzioni come dei "pacchetti" (packets), senza la necessit&agrave; di interrompere la connessione o di creare nuovi headers-HTTP per le richieste successive.

I WebSocket sono particolarmente adatti per servizi che richiedono scambi continui di dati, come ad esempio giochi online, sistemi di trading in real-time e cos&igrave; via.

## Un semplice esempio

Per aprire una connessione websocket, dobbiamo creare un `new WebSocket` utilizzando nell'url il protocollo speciale `ws`:

```js
let socket = new WebSocket("ws://javascript.info");
```
C'&egrave; anche il protocollo criptato `wss://`, utilizzato per i websockets HTTPS

```smart header="Scegli sempre `wss://`"
Il procotollo `wss://` non solo &egrave; criptato, ma &egrave; anche pi&ugrave; affidabile.


Questo perch&egrave; i dati del `ws://` non sono criptati, visibili per qualunque intermediario. Server proxy molto vecchi, che non riconoscono l'implementazione WebSocket, potrebbero notare i suoi headers, per così dire, "strani" e decidere di interrompre la connessione.

Invece, `wss://` &egrave; una connessione over TLS  (lo stesso di HTTPS che &egrave; HTTP over TLS), TLS cripta il dato prima di inviarlo e lo decripta in ricezione. Cos&igrave; i dati passano attraverso i proxy in maniera criptata e non potendone vedere il contenuto lo lasciano passare.
```

Appena creato il socket, dovremmo rimanere in ascolto su di esso per gli eventi. Ce ne sono 4:
- **`open`** -- connessione stabilita (established connection),
- **`message`** -- dati ricevuti (data received),
- **`error`** -- errore websocket (websocket error),
- **`close`** -- connessione chiusa (connection closed).

...E nel caso volessimo inviare qualcosa al server, allora abbiamo il metodo `socket.send(data)` che si occupa di questo.

Un esempio:

```js run
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Connessione stabilita");
  alert("Invio al server");
  socket.send("Il mio nome &egrave; John");
};

socket.onmessage = function(event) {
  alert(`[message] Ricezione dati dal server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {  
    alert(`[close] Connessione chiusa con successo, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. processo del server teminato o connessione gi&agrave;
    // in questo caso event.code solitamente &egrave; 1006
    alert('[close] Connection morta.');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};
```

A scopo dimostrativo, c'&egrave; un piccolo server funzionante [server.js](demo/server.js) scritto in Node.js, per l'esempio qui sopra. Risponde con "Hello from server, John", attende 5 secondi e poi chiude la connessione.

Quindi vedrai gli eventi `open` -> `message` -> `close`.

Questo &egrave; tutto, possiamo gi&agrave; parlare di WebSocket. Abbastanza semplice, no?

Adesso approfondiamo un po'.


## Aprire un WebSocket

Non appena viene istanziato `new WebSocket(url)`, il websocket tenta immediatamente di stabilire una connessione.

Durante la connessione, il browser (utilizzando degli headers appositi) chiede al server: "Supporti i WebSocket?" e se il server risponde "Si", allora la conversazione continua con il protocollo WebSocket, che non &egrave; per nulla HTTP.

![](websocket-handshake.svg)

Questo &egrave; un esempio di headers impostati dal browser per la richiesta di `new WebSocket("wss://javascript.info/chat")`.


```
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

- `Origin` -- l'origine della pagina del client, ad esempio:  `https://javascript.info`. Gli oggetti WebSocket sono per loro natura cross-origin. Non vi sono headers particolari o altre limitazioni. I server di vecchia data non gestiscono i WebSocket in nessun modo, quindi non ci sono problemi di compatibilit&agrave;. Ma l'header `Origin` &egrave; importante, dal momento che permette al server di decidere se parlare o meno con quel sito.
- `Connection: Upgrade` -- indica che il client vuole cambiare protocollo di comunicazione.
- `Upgrade: websocket` -- il protocollo richiesto &egrave; "websocket".
- `Sec-WebSocket-Key` -- una chiave generata randomicamente dal browser per sicurezza.
- `Sec-WebSocket-Version` -- versione di protocollo del WebSocket, 13 &egrave; quella corrente.

```smart header="L'handsnake del WebSocket non pu&ograve; essere emulato."
Non &egrave; possibile utilizzare  `XMLHttpRequest` oppure `fetch` per fare questo tipo di richieste HTTP, dal momento che a JavaScript non &egrave; premessa la creazione di questi headers.
```
Se il server acconsente allo switch in WebSocket, dovrebbe rispondere con un codice 101:

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

Qui `Sec-WebSocket-Accept` &egrave; `Sec-WebSocket-Key` ricodificato usando un algoritmo speciale. Il browser lo usa per assicurarsi che la risposta sia corrispondente alla richiesta.

In seguito, i dati vengono trasferiti usando il protocollo WebSocket, presto ne vedremo la struttura ("frames"). E questo non ha niente a che vedere con HTTP.

### Estensioni e subprotocolli

Ci possono essere gli headers aggiuntivi `Sec-WebSocket-Extensions` e `Sec-WebSocket-Protocol` i quali descrivo estensioni e subprotocolli.

Ad esempio:

- `Sec-WebSocket-Extensions: deflate-frame` significa che il browser supporta la compressione dei dati. Una estensione &egrave; un qualcosa di collegato al trasferimento dei dati, delle una funzionalit&agrave; che estende il protocollo WebSocket. L'header `Sec-WebSocket-Extensions`, invece, viene inviato in automatico dal browser, con la lista di tutte le estensioni che pu&ograve; supportare.

- `Sec-WebSocket-Protocol: soap, wamp` significa che non vogliamo trasferire qualunque tipo di dato, ma solamente dati con protocollo [SOAP](http://en.wikipedia.org/wiki/SOAP) oppure WAMP ("The WebSocket Application Messaging Protocol"). I subprotocolli dei WebSocket sono registrati nel [catalogo IANA ](http://www.iana.org/assignments/websocket/websocket.xml).

<<<<<<< HEAD
=======
- `Sec-WebSocket-Extensions: deflate-frame` means that the browser supports data compression. An extension is something related to transferring the data, functionality that extends WebSocket protocol. The header `Sec-WebSocket-Extensions` is sent automatically by the browser, with the list of all extensions it supports.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

    Questi headers aggiuntivi vengono settati da noi, per dire al server quali sottoprotocolli supporta il nostro codice, utilizzando il secondo parametro (opzionale) di `new WebSocket`. Questo sarebbe l'array dei subprotocolli se, ad esempio, volessimo usare  SOAP o WAMP:


    ```js
    let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
    ```

Il server potrebbe rispondere con una lista di protocolli ed estensioni che autorizza all'uso.

Per esempio, la richiesta:

```
GET /chat
Host: javascript.info
Upgrade: websocket
Connection: Upgrade
Origin: https://javascript.info
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
*/!*
```

Risposta:

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
*/!*
```
Qui il server risponde che supporta l'estensione "deflate-frame", e solamente SOAP tra i subprotocolli richiesti.

## Trasferimento dati

La comunicazione WebSockt &egrave; basata sui cosidetti "frames" -- frammenti di dati, che possono essere inviati da entrambe le parti e possono essere di tipi differenti.

- "text frames" -- contengono dati in formato testuale che le parti inviano gli uni agli altri.
- "binary data frames" -- contengono dati in formato binario che la parti inviano gli uni agli altri.
- "ping/pong frames" vengono usati per controllare la connessione, inviati dal server, il browser risponde vi risponde automaticamente.
- ci sono anche i "connection close frame" e altri frames di servizio.

**Il metodo WebSocket `.send()` pu&ograve; inviare sia dati binari che testuali.**

Una chiamata `socket.send(body)` permette che il `body` possa essere sia in formato stringa che binario, incluso `Blob`, `ArrayBuffer`, etc. Non sono richieste configurazioni: basta inviarli in uno di questi formati.

**Quando riceviamo il dato, il testo arriva sempre come stringa. Per il formato binario possiamo scegliere tra i formati `Blob` e `ArrayBuffer`.**

Questo &egrave; settato dalla propriet&agrave; `socket.bufferType`, di default &egrave; `"blob"`, cos&igrave; i dati binari arrivano come oggetti `Blob`.

[Blob](info:blob) &egrave; un oggetto binario di alto livello, si integra direttamente con `<a>`, `<img>` e altri tag, cos&igrave; &egrave; un default puro. Ma per operazioni binarie, per accedere ai singoli data bytes, possiamo cambiarlo in`"arraybuffer"`:


```js
socket.binaryType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data is either a string (if text) or arraybuffer (if binary)
};
```

## Rate limiting

Immagina che la nostra app abbia tantissimi dati da inviare. Ma che l'utente abbia una connessione molto lenta, magari internet su rete mobile e fuori citt&agrave;.
Potremmo chiamare `socket.send(data)` in continuazione. Per&ograve; i dati verranno bufferizzati (immagazzinati) in memoria ed inviati solo quando una connessione abbastanza veloce lo permetter&agrave;.

<<<<<<< HEAD
La propriet&agrave; `socket.bufferedAmount` immagazzina i dati che sono bufferizzati in un dato momento, in attesa di inviarli tramite la rete.
=======
The `socket.bufferedAmount` property stores how many bytes remain buffered at this moment, waiting to be sent over the network.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

Possiamo esaminarlo per vedere se il socket &egrave; attualmente disponibile per la trasmissione.

```js
// ogni 100ms esaminiamo il socket ed inviamo altri dati
// ma solamente se quelli precedenti sono stati inviati
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```


## Chiusura della connessione

Normalmente, quando una delle parti desidera chiudere una connessione (sia il browser che il server hanno ognuno gli stessi diritti), inviano un "connection close frame", un frame di chiusura connessione con un codice numerico e una descrizione testuale della motivazione.

Il metodo per farlo &egrave;:
```js
socket.close([code], [reason]);
```

- `code` &egrave; un codice specifico del WebSocket (opzionale)
- `reason` &egrave; una stringa che descrive la motivazione della chiusura (opzionale)

Le altre parti ottengono il codice e la motivazione all'interno dell'handler `close`, ad esempio:

```js
// la parte che chiude:
socket.close(1000, "Work complete");

// l'altra parte
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Lavoro terminato"
  // event.wasClean === true (chiusura pulita)
};
```
I valori pi&ugrave; comuni sono:

<<<<<<< HEAD
- `1000` -- predefinito, chiusura normale (usato se non viene fornito alcun `code`),
- `1006` -- non c'&egrave; modo di settare questo codice manualmente, indica che la connessione &egrave; stata persa (frame di chiusura non presente).
=======
Most common code values:

- `1000` -- the default, normal closure (used if no `code` supplied),
- `1006` -- no way to set such code manually, indicates that the connection was lost (no close frame).
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

Esistono altri codice come:

- `1001` -- la parte non risulta raggiungibile, ad esempio, il server si sta spegnendo o il browser ha chiuso la pagina,
- `1009` -- il messaggio &egrave; troppo grande per essere processato,
- `1011` -- errore non previsto nel server,
- ...e cos&igrave; via.

La lista completa si trova nel documento [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1).

I codici WebSocket sono in qualche modo assimilabili ai codici HTTP, ma diversi. In particolare, ogni codice inferiore a `1000` &egrave; riservato, ci sar&agrave; quindi un errore se tenteremo di settarne uno.

```js
// in caso di connessione interrotta
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (nessun frame di chiusura)
};
```


## stato della connessione

Per ottenere lo stato della connessione, inoltre, c'&egrave; la propriet&agrave; `socket.readyState` con i valori:

- **`0`** -- "CONNECTING": la connessione non &egrave; stato ancora stabilita,
- **`1`** -- "OPEN": in comunicazione,
- **`2`** -- "CLOSING": connessione in chiusura,
- **`3`** -- "CLOSED": connessione chiusa.


## Esempio di chat

Prendiamo in esame un esempio di chat usando le WebSocket API del browser e il modulo Node.js WebSocket <https://github.com/websockets/ws>. Soffermeremo la nostra attenzione sulla parte client, ma quella server &egrave; altrettanto semplice.

HTML: abbiamo bisogno di un tag `<form>` per inviare i messaggi e di un tag `<div>` per i messaggi in arrivo:

```html
<!-- message form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div con i messaggi -->
<div id="messages"></div>
```

Da JavaScript vogliamo tre cose:
1. Aprire la connessione.
2. Gestire il form con l'invio -- `socket.send(message)` per il messaggio.
3. Gestire il messaggio in arrivo -- accodarlo all'elemento `div#messages`.

Ecco il codice:

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// invio del messaggio dal form
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// messaaggio ricevuto - mostra il messaggio su div#messages
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```Il codice server-side va un pochino oltre i nostri scopi. Qui useremo Node.js, ma non siamo obbligati. Le altre piattaforme hanno i loro mezzi per lavorare con i WebSocket.

L'algoritmo server-side:

1. Crea `clients = new Set()` -- un set di sockets.
2. Per ogni weboscket accettato, questo viene aggiunto`clients.add(socket)` e configura il listener all'evento `message` per riceverne i messaggi.
3. Quando viene ricevuto un messaggio: cicla tutti i clients ed invia il messaggio ad ognuno.
4. Quando una connessione viene chiusa: `clients.delete(socket)`.

```js
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // qui gestiamo solamente le connessioni websocket
  // in progetti veri dovremmo avere anche fare con altro codice per gestire richieste che non non-websocket
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // lunghezza massima dei messaggi di 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```


Ecco l'esempio funzionante:

[iframe src="chat" height="100" zip]

Puoi anche scaricarlo (pulsante in alto a destra nell'iframe) ed eseguirlo localmente. Solamente non dimenticare di installare [Node.js](https://nodejs.org/en/) e di fare partire `npm install ws` prima di avviarlo.

## Riepilogo

WebSocket sono una maniera moderna di avere connessioni persistenti browser-server.

- WebSockets non hanno le limitazioni cross-origin.
- sono ben supportati dai browser.
- Possono inviare e ricevere dati in formato stringa o in formato binario.

Le API sono semplici.

Metodi:
- `socket.send(data)`,
- `socket.close([code], [reason])`.

Eventi:
- `open`,
- `message`,
- `error`,
- `close`.

I WebSocket di per s&egrave; non includono la riconnessione, l'autenticazione e molti altri meccanismi di alto livello. Per quello, ci sono una infinit&agrave; di librerie, ma &egrave; anche possibile implementare queste funzionalit&agrave; manualmente.

A volte, per integrare i WebSocket in progetti gi&agrave; esistenti,la gente esegue un WebSocket server in parallelo con il server HTTP principale, e condividono un unico database. Le richieste ai WebSocket usano `wss://ws.site.com`, un sottodominio (subdomain) che conduce al server WebSocket, mentre `https://site.com` va al server HTTP principale.

Sicuramente, sono possibili altre modalit&agrave; di integrazione.
