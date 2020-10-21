# WebSocket

Il protocollo `WebSocket`, descritto nelle specifiche [RFC 6455](http://tools.ietf.org/html/rfc6455) fornisce un mezzo di scambio dati tra server e browser utilizzando una connessione persistente. I dati vengono passati in entrambe le direzioni come "pacchetti" (packets), senza la necessit&agrave; di interrompere la connessione e senza la necessità di creare nuovi headers-HTTP per le richieste.

I WebSocket sono particolarmente adatti per servizi che richiedono scambi continui di dati, come ad esempio giochi online, sistemi di trading in real-time e cos&igrave; via.

## Un semplice esempio

Per aprire una connessione websocket, dobbiamo creare un `new WebSocket` utilizzando nell'url il protocollo speciale `ws`:

```js
let socket = new WebSocket("ws://javascript.info");
```
C'è anche il protocollo criptat `wss://`, utilizzato per i websockets HTTPS


```smart header="Scegli sempre `wss://`"
Il procotollo `wss://` non solo è criptato, ma è anche più affidabile.

Questo perchè i dati del `ws://` non sono criptati, visibili per qualunque intermediario. Server proxy molto vecchi, che non riconoscono l'implementazione WebSocket, potrebbero notare i suoi headers strani e chiudere la connessione.

Invece, `wss://` &egrave; una connessione over TLS  (lo stesso di HTTPS che è HTTP over TLS), TLS cripta il dato invio e lo decripta in ricezione. Così i dati passano attraverso i proxy in maniera criptata e non potendone vedere il contenuto lo lasciano passare.
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
  socket.send("Il mio nome è John");
};

socket.onmessage = function(event) {
  alert(`[message] Ricezione dati dal server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {  
    alert(`[close] Connessione chiusa con successo, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. processo del server teminato o connessione già
    // in questo caso event.code solitamente è 1006
    alert('[close] Connection morta.');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};
```

A scopo dimostrativo, c'è un piccolo server funzionante [server.js](demo/server.js) scritto in Node.js, per l'esempio qui sopra. Risponde con "Hello from server, John" quindi attende 5 secondi e chiude la connessione.

Quindi vedrai gli eventi `open` -> `message` -> `close`.

Questo è tutto, possiamo già parlare di WebSocket. Abbastanza semplice, no?

Adesso approfondiamo un po'.


## Aprire un WebSocket


Non  appena viene istanziato `new WebSocket(url)`, questo tenta immediatamente una connessione.

Dureante la connessione, il browser (utilizzando degli headers appositi) chiede al server: "Supporti i WebSocket?" e se il server risponde di "si", allora la conversazione continua con il protocollo WebSocket, che non è per nulla HTTP.

![](websocket-handshake.svg)

Questo è un esempio di headers impostati dal browser per la richiesta di `new WebSocket("wss://javascript.info/chat")`.


```
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

- `Origin` -- l'origine della pagina del client, ad esempio:  `https://javascript.info`. Gli oggetti WebSocket sono per loro natura cross-origin. Non vi sono headers particolari o altre limitazioni. Server di vecchia data non gestiscono i WebSocket in nessun modo, quindi non ci sono problemi di compatibilità. Ma l'header `Origin` è importante, dal momento che permette al server di decidere se parlare o meno con quel sito.
- `Connection: Upgrade` -- indica che il client vuole cambiare protocollo  di comunicazione.
- `Upgrade: websocket` -- il protocollo richiesto è "websocket".
- `Sec-WebSocket-Key` -- una chiave generata randomicamente dal browser per sicurezza.
- `Sec-WebSocket-Version` -- versione di protocollo del WebSocket, 13 è quella corrente.

```smart header="L'handsnake del WebSocket non può essere emulato."
Non è possibile utilizzare  `XMLHttpRequest` oppure `fetch` per fare questo tipo di richieste HTTP, dal momento che a JavaScript non è peremessa la creazione di questi headers.
```
Se il server acconsente allo switch in WebSocket, dovrebbe rispondere con un codice 101:
If the server agrees to switch to WebSocket, it should send code 101 response:

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

Qui `Sec-WebSocket-Accept` è `Sec-WebSocket-Key` ricodificato usando un algoritmo speciale. Il browser lo usa per assicurarsi che la risposta sia corrispondente alla richiesta.

In seguito, i dati vengono trasferiti usando il protocollo WebSocket, presto ne vedremo vedremo la struttura ("frames"). E questo non ha niente a che vedere con HTTP.

### Estensioni e subprotocolli

Ci possono essere gli headers aggiuntivi `Sec-WebSocket-Extensions` e `Sec-WebSocket-Protocol` i quali descrivo etensioni e subprotocolli.

Ad esempio:

- `Sec-WebSocket-Extensions: deflate-frame` significa che il browser supporta la compressione dei dati. Una estensione è un qualcosa di collegato al trasferimento dei dati, delle una funzionalità che estende il protocollo WebSocket. L'header `Sec-WebSocket-Extensions`, invece, viene inviato in automatico dal browser, con la lista di tutte le estensioni che può supportare.

- `Sec-WebSocket-Protocol: soap, wamp` significa che non vogliamo trasferire qualunque tipo di dato, ma solamente dati con protocollo [SOAP](http://en.wikipedia.org/wiki/SOAP) oppure WAMP ("The WebSocket Application Messaging Protocol"). I subprotocolli dei WebSocket sono registrati nel [catalogo IANA ](http://www.iana.org/assignments/websocket/websocket.xml).


    Questi headers aggiuntivi vengono settati da noi, per dire al server quali sottoprotocolli supporta il nostro codice, utilizzando il secondo parametro (opzionale) di `new WebSocket`. Questo sarebbe l'array dei subprotocolli se, ad esempio, volessimo usare  SOAP o WAMP:

    ```js
    let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
    ```

Il server potrebbe rispondere con una lista di protocolli ed estensioni che acconsente di usare.

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

WebSocket communication consists of "frames" -- data fragments, that can be sent from either side, and can be of several kinds:

- "text frames" -- contain text data that parties send to each other.
- "binary data frames" -- contain binary data that parties send to each other.
- "ping/pong frames" are used to check the connection, sent from the server, the browser responds to these automatically.
- there's also "connection close frame" and a few other service frames.

In the browser, we directly work only with text or binary frames.

**WebSocket `.send()` method can send either text or binary data.**

A call `socket.send(body)` allows `body` in string or a binary format, including `Blob`, `ArrayBuffer`, etc. No settings required: just send it out in any format.

**When we receive the data, text always comes as string. And for binary data, we can choose between `Blob` and `ArrayBuffer` formats.**

That's set by `socket.bufferType` property, it's `"blob"` by default, so binary data comes as `Blob` objects.

[Blob](info:blob) is a high-level binary object, it directly integrates with `<a>`, `<img>` and other tags, so that's a sane default. But for binary processing, to access individual data bytes, we can change it to `"arraybuffer"`:

```js
socket.bufferType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data is either a string (if text) or arraybuffer (if binary)
};
```

## Rate limiting

Imagine, our app is generating a lot of data to send. But the user has a slow network connection, maybe on a mobile internet, outside of a city.

We can call `socket.send(data)` again and again. But the data will be buffered (stored) in memory and sent out only as fast as network speed allows.

The `socket.bufferedAmount` property stores how many bytes are buffered at this moment, waiting to be sent over the network.

We can examine it to see whether the socket is actually available for transmission.

```js
// every 100ms examine the socket and send more data  
// only if all the existing data was sent out
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```


## Connection close

Normally, when a party wants to close the connection (both browser and server have equal rights), they send a "connection close frame" with a numeric code and a textual reason.

The method for that is:
```js
socket.close([code], [reason]);
```

- `code` is a special WebSocket closing code (optional)
- `reason` is a string that describes the reason of closing (optional)

Then the other party in `close` event handler gets the code and the reason, e.g.:

```js
// closing party:
socket.close(1000, "Work complete");

// the other party
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
};
```

Most common code values:

- `1000` -- the default, normal closure (used if no `code` supplied),
- `1006` -- no way to such code manually, indicates that the connection was lost (no close frame).

There are other codes like:

- `1001` -- the party is going away, e.g. server is shutting down, or a browser leaves the page,
- `1009` -- the message is too big to process,
- `1011` -- unexpected error on server,
- ...and so on.

The full list can be found in [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1).

WebSocket codes are somewhat like HTTP codes, but different. In particular, any codes less than `1000` are reserved, there'll be an error if we try to set such a code.

```js
// in case connection is broken
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (no closing frame)
};
```


## Connection state

To get connection state, additionally there's `socket.readyState` property with values:

- **`0`** -- "CONNECTING": the connection has not yet been established,
- **`1`** -- "OPEN": communicating,
- **`2`** -- "CLOSING": the connection is closing,
- **`3`** -- "CLOSED": the connection is closed.


## Chat example

Let's review a chat example using browser WebSocket API and Node.js WebSocket module <https://github.com/websockets/ws>. We'll pay the main attention to the client side, but the server is also simple.

HTML: we need a `<form>` to send messages and a `<div>` for incoming messages:

```html
<!-- message form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div with messages -->
<div id="messages"></div>
```

From JavaScript we want three things:
1. Open the connection.
2. On form submission -- `socket.send(message)` for the message.
3. On incoming message -- append it to `div#messages`.

Here's the code:

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// send message from the form
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// message received - show the message in div#messages
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```

Server-side code is a little bit beyond our scope. Here we'll use Node.js, but you don't have to. Other platforms also have their means to work with WebSocket.

The server-side algorithm will be:

1. Create `clients = new Set()` -- a set of sockets.
2. For each accepted websocket, add it to the set `clients.add(socket)` and setup `message` event listener to get its messages.
3. When a message received: iterate over clients and send it to everyone.
4. When a connection is closed: `clients.delete(socket)`.

```js
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // here we only handle websocket connections
  // in real project we'd have some other code here to handle non-websocket requests
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // max message length will be 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```


Here's the working example:

[iframe src="chat" height="100" zip]

You can also download it (upper-right button in the iframe) and run locally. Just don't forget to install [Node.js](https://nodejs.org/en/) and `npm install ws` before running.

## Summary

WebSocket is a modern way to have persistent browser-server connections.

- WebSockets don't have cross-origin limitations.
- They are well-supported in browsers.
- Can send/receive strings and binary data.

The API is simple.

Methods:
- `socket.send(data)`,
- `socket.close([code], [reason])`.

Events:
- `open`,
- `message`,
- `error`,
- `close`.

WebSocket by itself does not include reconnection, authentication and many other high-level mechanisms. So there are client/server libraries for that, and it's also possible to implement these capabilities manually.

Sometimes, to integrate WebSocket into existing project, people run WebSocket server in parallel with the main HTTP-server, and they share a single database. Requests to WebSocket use `wss://ws.site.com`, a subdomain that leads to WebSocket server, while `https://site.com` goes to the main HTTP-server.

Surely, other ways of integration are also possible.
