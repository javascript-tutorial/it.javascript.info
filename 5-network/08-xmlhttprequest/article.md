# XMLHttpRequest

`XMLHttpRequest` è un oggetto built-in che ci permette di eseguire delle richieste HTTP in JavaScript.

A dispetto del suo nome contenente la parola "XML", può funzionare con qualunque tipo di dato, non solo con il formato XML. Possiamo usarlo per effettuare upload e download di files, tenere traccia dei loro progressi e molto altro.

Oggi c'è il meotodo più moderno `fetch`,  che in qualche modo ha soppiantato `XMLHttpRequest`.

Nello sviluppo web attuale `XMLHttpRequest` viene usato per tre ragioni principali:

1. Ragioni storiche: per il supporto a sgli script esistenti che fanno uso di `XMLHttpRequest`.
2. Se abbiamo bisogno di supportare i vecchi browser, e non vogliamo fare uso di polyfills (ad esempio per mantenere gli script snelli).
3. Abbiamo bisogno di fare qualcosa che `fetch` non può ancora fare, ad esempio tenere traccia dei progressi in fase di upload.

Suona familiare? Se sì, allora possiamo addentrarci nello studio di `XMLHttpRequest`. Altrimenti, si può andare direttamente alla sezione <info:fetch>.

## Le basi

XMLHttpRequest ha due modalità operative: sincrona e asincrona.

Prima vediamo la modalità asincrona, dato che è usata nella maggior parte dei casi.

Per fare una richiesta, dividiamo l'operazione in tre fasi:

1. Creiamo `XMLHttpRequest`:
    ```js
    let xhr = new XMLHttpRequest();
    ```
    Il costruttore è privo di argomenti.

2. Lo inizializziamo, solitamente subito dopo `new XMLHttpRequest`:
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

    Questo metodo specifica i parametri principali della richiesta:

    - `method` -- metodo HTTP. Solitamente `"GET"` o `"POST"`.
    - `URL` -- l'URL della richiesta, una stringa che può essere un oggetto [URL](info:url).
    - `async` -- se impostato esplicitamente a `false`, la richiesta sarà sincrona, lo affronteremo più avanti.
    - `user`, `password` -- login e password per l'autenticazione HTTP di base (se richiesto).

    Nota bene che la chiamata a `open`, contrariamente al suo nome, non apre la connessione. Configura solo la richiesta, ma l'attivita di rete comincia solo con la chiamata a `send`.

3. Invio.

    ```js
    xhr.send([body])
    ```

    Questo metodo apre la connessione ed invia la richiesta al server. Il parametro opzionale `body` contiene il corpo della richiesta.

    Alcuni metodi, come ad esempio `GET` non supportano il corpo nella richiesta, mentre altri, come `POST` usano `body` per inviare dati al server. Vedremo degli esempi più avanti.

4. Mettersi in ascolto sugli eventi `xhr` per la risposta.

    Questi tre eventi sono quelli utilizzati più di frequente:
    - `load` -- quando la richiesta è completa (anche se lo status HTTP è 400 o 500), e la risposta è stata scaricata del tutto.
    - `error` -- quando la richiesta non può essere espletata, ad esempio per problemi di rete o URL non validi.
    - `progress` -- viene innescato periodicamente mentre la risposta viene scaricata, e dà informazioni su quanto è stato scaricato.

    ```js
    xhr.onload = function() {
      alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // viene innescato solo se la richiesta non può essere eseguita per niente
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // viene scatenato periodicamente
      // event.loaded - quanti bytes sono stati scaricati
      // event.lengthComputable = true se il server ha invaito l'header Content-Length
      // event.total - numero totale di bytes (se lengthComputable è true)
      alert(`Ricevuti ${event.loaded} su ${event.total}`);
    };
    ```

Ecco un esempio completo. Il seguente codice scarica il contenuto dell'URL `/article/xmlhttprequest/example/load` dal server e stampa il progresso di download:

```js run
// 1. Crea un nuovo oggetto XMLHttpRequest
let xhr = new XMLHttpRequest();

// 2. Lo configura: richiesta GET per l'URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Invia la richiesta alla rete
xhr.send();

// 4. Questo codice viene chiamato dopo la ricezione della risposta
xhr.onload = function() {
  if (xhr.status != 200) { // analizza lo status HTTP della risposta
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // ad esempio 404: Not Found
  } else { // mostra il risultato
    alert(`Done, got ${xhr.response.length} bytes`); // response contiene la risposta del server
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // nessun Content-Length
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
```

Una volta che il server ha risposto, possiamo ricevere il risultato nelle seguenti proprietà `xhr`:

`status`
: HTTP status code (un valore numerico): `200`, `404`, `403` e così via, e può essere `0` in caso di fallimento non HTTP.

`statusText`
: messaggio dello status HTTP (una stringa): solitamente `OK` per `200`, `Not Found` per `404`, `Forbidden` per `403` e via dicendo.

`response` (vecchi scripts potrebbero usare `responseText`)
: La risposta del server.

Possiamo anche specificare un timeout usando la proprietà corrispondente:

```js
xhr.timeout = 10000; // timeout in millisecondi, 10 seconds
```

Se la richiesta non ha esito nel tempo stabilito, viene annullata e viene scatenato l'evento `timeout`.

````smart header="parametri search dell'URL"
Per aggiungere dei parametri all'URL, come `?name=value`, ed assicurarci di una corretta codifica, possiamo usare l'oggetto [URL](info:url):

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// codifica il parametro 'q'
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

## Tipo di risposta (Response Type)

Possiamo usare la proprietà `xhr.responseType` per impostare il formato della risposta:

- `""` (default) -- ottiene una stringa,
- `"text"` -- ottiene una stringa,
- `"arraybuffer"` -- ottiene un `ArrayBuffer` (per dati di tipo binario, guardare il capitolo <info:arraybuffer-binary-arrays>),
- `"blob"` -- ottiene un `Blob` (per dati binari, guardare <info:blob>),
- `"document"` -- ottiene un documento XML (può usare XPath e altri metodi XML) o un documento HTML (basato sul MIME type del dato ricevuto),
- `"json"` -- ottiene un JSON (effettua il parsing automaticamente).

Per esempio, otteniamo una risposta in JSON:

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// the response is {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
Nei vecchi script potremmo capitarci di incontrare alle proprietà `xhr.responseText` oppure `xhr.responseXML`, che esistono per ragioni storiche, per ottenere sia una stringa che un documento XML. Oggigiorno, dovremmo impostare il formato dentro la proprietà `xhr.responseType` e ottenere `xhr.response` come appena illustrato.
```

## Ready states

`XMLHttpRequest` va modificando lo stato mentre la chiamata progredisce, Lo stato corrente è accessibile tramite `xhr.readyState`.

Tutti gli stati, come da [specifica](https://xhr.spec.whatwg.org/#states) sono:

```js
UNSENT = 0; // stato iniziale
OPENED = 1; // chiamata aperta
HEADERS_RECEIVED = 2; // headers della risposta ricevuti
LOADING = 3; // la risposta è infase di caricamento (è stato già ricevuto un primo pacchetto dati)
DONE = 4; // richiesta completata
```

Un oggetto `XMLHttpRequest` cambia stato durante la chiamata, questo esatto ordine `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. Lo stato `3` si ripete ad ogni pacchetto ricevuto dalla rete.

Possiamo tenerne traccia tramite l'evento `readystatechange`:

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // caricamneto
  }
  if (xhr.readyState == 4) {
    // richiesta terminata
  }
};
```

Potremmo trovare listeners per `readystatechange` in codice molto vecchio, anche qui per ragioni storiche, dal momento che c'era un periodo in cui l'evento `load` e anche altri eventi, non esistevano. Al giorno d'oggi, i gestori `load/error/progress` li hanno deprecati.

## Annullamento delle richieste

Possiamo annullare la richiesta in ogni momento. La chiamata a `xhr.abort()` è adatta allo scopo:

```js
xhr.abort(); // annulla la richiesta
```

Ciò scatena l'evento `abort`, e `xhr.status` diventa `0`.

## Synchronous requests

If in the `open` method the third parameter `async` is set to `false`, the request is made synchronously.

In other words, JavaScript execution pauses at `send()` and resumes when the response is received. Somewhat like `alert` or `prompt` commands.

Here's the rewritten example, the 3rd parameter of `open` is `false`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', *!*false*/!*);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
} catch(err) { // instead of onerror
  alert("Request failed");
}
```

It might look good, but synchronous calls are used rarely, because they block in-page JavaScript till the loading is complete. In some browsers it becomes impossible to scroll. If a synchronous call takes too much time, the browser may suggest to close the "hanging" webpage.

Many advanced capabilities of `XMLHttpRequest`, like requesting from another domain or specifying a timeout, are unavailable for synchronous requests. Also, as you can see, no progress indication.

Because of all that, synchronous requests are used very sparingly, almost never. We won't talk about them any more.

## HTTP-headers

`XMLHttpRequest` allows both to send custom headers and read headers from the response.

There are 3 methods for HTTP-headers:

`setRequestHeader(name, value)`
: Sets the request header with the given `name` and `value`.

    For instance:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Headers limitations"
    Several headers are managed exclusively by the browser, e.g. `Referer` and `Host`.
    The full list is [in the specification](https://xhr.spec.whatwg.org/#the-setrequestheader()-method).

    `XMLHttpRequest` is not allowed to change them, for the sake of user safety and correctness of the request.
    ```

    ````warn header="Can't remove a header"
    Another peculiarity of `XMLHttpRequest` is that one can't undo `setRequestHeader`.

    Once the header is set, it's set. Additional calls add information to the header, don't overwrite it.

    For instance:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // the header will be:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Gets the response header with the given `name` (except `Set-Cookie` and `Set-Cookie2`).

    For instance:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Returns all response headers, except `Set-Cookie` and `Set-Cookie2`.

    Headers are returned as a single line, e.g.:

    ```http
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    The line break between headers is always `"\r\n"` (doesn't depend on OS), so we can easily split it into individual headers. The separator between the name and the value is always a colon followed by a space `": "`. That's fixed in the specification.

    So, if we want to get an object with name/value pairs, we need to throw in a bit JS.

    Like this (assuming that if two headers have the same name, then the latter one overwrites the former one):

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});

    // headers['Content-Type'] = 'image/png'
    ```

## POST, FormData

To make a POST request, we can use the built-in [FormData](mdn:api/FormData) object.

The syntax:

```js
let formData = new FormData([form]); // creates an object, optionally fill from <form>
formData.append(name, value); // appends a field
```

We create it, optionally fill from a form, `append` more fields if needed, and then:

1. `xhr.open('POST', ...)` – use `POST` method.
2. `xhr.send(formData)` to submit the form to the server.

For instance:

```html run refresh
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // pre-fill FormData from the form
  let formData = new FormData(document.forms.person);

  // add one more field
  formData.append("middle", "Lee");

  // send it out
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

The form is sent with `multipart/form-data` encoding.

Or, if we like JSON more, then `JSON.stringify` and send as a string.

Just don't forget to set the header `Content-Type: application/json`, many server-side frameworks automatically decode JSON with it:

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

The `.send(body)` method is pretty omnivore. It can send almost any `body`, including `Blob` and `BufferSource` objects.

## Upload progress

The `progress` event triggers only on the downloading stage.

That is: if we `POST` something, `XMLHttpRequest` first uploads our data (the request body), then downloads the response.

If we're uploading something big, then we're surely more interested in tracking the upload progress. But `xhr.onprogress` doesn't help here.

There's another object, without methods, exclusively to track upload events: `xhr.upload`.

It generates events, similar to `xhr`, but `xhr.upload` triggers them solely on uploading:

- `loadstart` -- upload started.
- `progress` -- triggers periodically during the upload.
- `abort` -- upload aborted.
- `error` -- non-HTTP error.
- `load` -- upload finished successfully.
- `timeout` -- upload timed out (if `timeout` property is set).
- `loadend` -- upload finished with either success or error.

Example of handlers:

```js
xhr.upload.onprogress = function(event) {
  alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
};

xhr.upload.onload = function() {
  alert(`Upload finished successfully.`);
};

xhr.upload.onerror = function() {
  alert(`Error during the upload: ${xhr.status}`);
};
```

Here's a real-life example: file upload with progress indication:

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // track upload progress
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

  // track completion: both successful or not
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

## Cross-origin requests

`XMLHttpRequest` can make cross-origin requests, using the same CORS policy as [fetch](info:fetch-crossorigin).

Just like `fetch`, it doesn't send cookies and HTTP-authorization to another origin by default. To enable them, set `xhr.withCredentials` to `true`:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

See the chapter <info:fetch-crossorigin> for details about cross-origin headers.


## Summary

Typical code of the GET-request with `XMLHttpRequest`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
    // handle error
    alert( 'Error: ' + xhr.status);
    return;
  }

  // get the response from xhr.response
};

xhr.onprogress = function(event) {
  // report progress
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // handle non-HTTP error (e.g. network down)
};
```

There are actually more events, the [modern specification](https://xhr.spec.whatwg.org/#events) lists them (in the lifecycle order):

- `loadstart` -- the request has started.
- `progress` -- a data packet of the response has arrived, the whole response body at the moment is in `response`.
- `abort` -- the request was canceled by the call `xhr.abort()`.
- `error` -- connection error has occurred, e.g. wrong domain name. Doesn't happen for HTTP-errors like 404.
- `load` -- the request has finished successfully.
- `timeout` -- the request was canceled due to timeout (only happens if it was set).
- `loadend` -- triggers after `load`, `error`, `timeout` or `abort`.

The `error`, `abort`, `timeout`, and `load` events are mutually exclusive. Only one of them may happen.

The most used events are load completion (`load`), load failure (`error`), or we can use a single `loadend` handler and check the properties of the request object `xhr` to see what happened.

We've already seen another event: `readystatechange`. Historically, it appeared long ago, before the specification settled. Nowadays, there's no need to use it, we can replace it with newer events, but it can often be found in older scripts.

If we need to track uploading specifically, then we should listen to same events on `xhr.upload` object.
