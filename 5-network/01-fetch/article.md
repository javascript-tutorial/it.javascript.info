
# Fetch

JavaScript può inviare richieste di rete al server e caricare nuove informazioni ogni volta che è necessario.

Per esempio, possiamo usare le richieste di rete per:

- Inviare un ordine,
- Caricare informazioni di un utente,
- Ricevere gli ultimi aggiornamenti del server,
- etc...

...e tutto senza alcun ricaricamento della pagina!

Ti sarà capitato di ascoltare o leggere il termine "AJAX" (acronimo di <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) che è comunemente utilizzato per accomunare (sotto un'unica effige) le richieste di rete in JavaScript. Non è però necessario usare XML: il termine proviene da un retaggio del passato ed è per questo che fa parte dell'abbreviazione.

Ci sono molti modi per inviare richieste di rete per richiedere informazioni dal server.

Il metodo `fetch()` è tra tutti il più moderno e versatile, e per questo inizieremo ad analizzare proprio questo. Questo metodo non è supportato dai browser più datati (ma è possibile risolvere con dei polyfills), ma lo è ampiamente tra quelli recenti.

La sintassi base è:

```js
let promise = fetch(url, [options])
```

- **`url`** -- l'URL da raggiungere.
- **`options`** -- parametri opzionali: metodi, headers etc.

Senza `options`, questa è una semplice richiesta GET che scarica il contenuto di `url`.

Ottenere una risposta è comunemente un processo che si svolge in due fasi.

Possiamo valutare gli status HTTP dalle proprietà:

- **`status`** -- HTTP status code, ad esempio 200.
- **`ok`** -- boolean, `true` se l'HTTP status code è 200-299.

Per esempio:

```js
let response = await fetch(url);

if (response.ok) { // se l'HTTP-status è 200-299
  // ricevi il body della risposta (il metodo sarà spiegato di seguito)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**Seconda fase: per prelevare il body della risposta, abbiamo bisogno di un ulteriore metodo.**

`Response` fornisce molteplici metodi promise-based per accedere al body in svariati formati:

- **`response.text()`** -- legge il la risposta e ritorna un testo,
- **`response.json()`** -- interpreta e ritorna la risposta come un JSON,
- **`response.formData()`** -- ritorna la risposta come un oggetto (object) `FormData` (spiegato nel [prossimo capitolo](info:formdata)),
- **`response.blob()`** -- ritorna la risposta come [Blob](info:blob) (binary data con type),
- **`response.arrayBuffer()`** -- ritorna la risposta come [ArrayBuffer](info:arraybuffer-binary-arrays) (rappresentazione low-level di binary data),
- inoltre, `response.body` è un oggetto (object) [ReadableStream](https://streams.spec.whatwg.org/#rs-class), che consente di leggere il body "pezzo per pezzo" (chunk-by-chunk), come vedremo dopo in un esempio.

Ad esempio, otteniamo un oggetto (object) JSON con gli ultimi commit da GitHub:

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); // legge il body della risposta e lo interpreta come JSON
*/!*

alert(commits[0].author.login);
```

O facciamo lo stesso senza `await`, utilizzando la sintassi canonica delle promises:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

Per ottenere il testo della risposta, `await response.text()` invece del `.json()`:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // legge il body della risposta come testo

alert(text.slice(0, 80) + '...');
```

Come caso d'uso per la lettura del binary format, richiediamo e mostriamo l'immagine del logo delle [specifiche "fetch"](https://fetch.spec.whatwg.org) (vedi il capitolo [Blob](info:blob) per i dettagli sulle possibilità offerte dai `Blob`):

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // download del Blob object
*/!*

// crea un tag <img>
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// mostra il logo
img.src = URL.createObjectURL(blob);

setTimeout(() => { // nascondi dopo tre secondi
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
Possiamo solo scegliere un metodo di lettura del body.

Se per esempio abbiamo già prelevato il response con `response.text()`, successivamente `response.json()` non funzionerà, dato che il body sarà stato già processato.

```js
let text = await response.text(); // elaborazione del response body
let parsed = await response.json(); // fallisce (già elaborato)
````

## Headers della risposta (o response headers)

Le response headers sono disponibili nell'oggetto (object) Map-like `response.headers`.

In realtà non è esattamente un oggetto (object) Map, ma ha metodi molto simili per ottenere le singole header per nome o iterare tra tutte le headers:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// ricevo un header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// itero tra tutte le headers
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

## Headers della richiesta (o request headers)

Per settare un header della request in `fetch`, possiamo usare la chiave `headers` dell'oggetto (object) passato come parametro delle opzioni, come ad esempio:
```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```

...ci sono però una serie di [HTTP headers proibiti](https://fetch.spec.whatwg.org/#forbidden-header-name), che non siamo autorizzati a settare:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

Queste headers sono  controllate esclusivamente dal browser perché aiutano a garantire una comunicazione HTTP corretta e sicura.

## Richieste POST (o POST requests)

Per eseguire una richiesta `POST` o una richiesta con un altro metodo, possiamo usare le opzioni di `fetch`:

<<<<<<< HEAD
- **`method`** -- metodo HTTP, es. `POST`,
- **`body`** -- il body della richiesta, scegliendo tra:
  - una stringa (string) (es. JSON-encoded),
  - oggetto (object) `FormData`, per inviare i dati come `form/multipart`,
  - `Blob`/`BufferSource` per inviare binary data,
  - [URLSearchParams](info:url), per inviare i dati in `x-www-form-urlencoded` encoding, anche se raramente utilizzato.
=======
- **`method`** -- HTTP-method, e.g. `POST`,
- **`body`** -- the request body, one of:
  - a string (e.g. JSON-encoded),
  - `FormData` object, to submit the data as `multipart/form-data`,
  - `Blob`/`BufferSource` to send binary data,
  - [URLSearchParams](info:url), to submit the data in `x-www-form-urlencoded` encoding, rarely used.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il formato più comunemente utilizzato è il JSON.

Per esempio, il codice seguente invia l'oggetto (object) `user` come JSON:

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

Nota che, se il `body` della richiesta è una stringa (string), la `Content-Type` header è settata di default a `text/plain;charset=UTF-8`.

Se stiamo invece inviando un JSON, usiamo `application/json` come `Content-Type` corretto per i dati nelle opzioni `headers`.

## Inviare un'immagine

Possiamo anche inviare binary data con `fetch` usando oggetti `Blob` o `BufferSource`.

In questo esempio, c'è un `<canvas>` sul quale possiamo disegnare spostarci sopra con il mouse. Al clic sul bottone "Invia" invieremo l'immagine al server:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Invia" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // il server risponde con la conferma e la dimensione dell'immagine
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Nota che in questa occasione, invece, non impostiamo manualmente l'header `Content-Type`, perché un oggetto (object)` Blob` ha un tipo incorporato (in questo caso `image/png`,  generato da `toBlob`). Per gli oggetti `Blob`, il tipo generato diventa il valore di` Content-Type`.

La funzione `submit()` può essere riscritta senza `async/await` come ad esempio:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Riepilogo

Una tipica richiesta fetch consiste in 2 chiamate `await`:

```js
let response = await fetch(url, options); // ritorna le response headers
let result = await response.json(); // legge il body come JSON
```

O la versione senza `await`:

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* processa qui il result */)
```

<<<<<<< HEAD
Proprietà del response:
- `response.status` -- codice HTTP della risposta,
- `response.ok` -- `true` se lo status è 200-299.
- `response.headers` -- oggetto (object) Map-like con le HTTP headers.

Metodi per ricevere il response body:
- **`response.text()`** -- ritorna la risposta come testo,
- **`response.json()`** -- ritorna ed interpreta la risposta come oggetto (object) JSON,
- **`response.formData()`** -- ritorna la risposta come oggetto (object) `FormData` (per il form/multipart encoding, vedi il prossimo capitolo),
- **`response.blob()`** -- ritorna la risposta come oggetto (object) [Blob](info:blob) (binary data con type),
- **`response.arrayBuffer()`** -- ritorna la risposta come oggetto (object) [ArrayBuffer](info:arraybuffer-binary-arrays) (low-level binary data),
=======
Response properties:
- `response.status` -- HTTP code of the response,
- `response.ok` -- `true` if the status is 200-299.
- `response.headers` -- Map-like object with HTTP headers.

Methods to get response body:
- **`response.text()`** -- return the response as text,
- **`response.json()`** -- parse the response as JSON object,
- **`response.formData()`** -- return the response as `FormData` object (`multipart/form-data` encoding, see the next chapter),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (low-level binary data),
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Altre opzioni di fetch:
- `method` -- metodo HTTP,
- `headers` -- un oggetto (object) con le headers della richiesta (non tutte le headers sono concesse),
- `body` -- i dati da inviare (request body) come `string` o come oggetti `FormData`, `BufferSource`, `Blob`, `UrlSearchParams`.

Nei prossimi capitoli vedremo ulteriori opzioni e casi d'uso di `fetch`.
