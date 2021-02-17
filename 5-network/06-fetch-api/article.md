
# API Fetch

Arrivati fin qui, sappiamo un bel po' di cose su `fetch`.

Guardiamo il resto dell'API, per approfindirne le potenzialità.

```smart
Nota bene: la maggioranza di queste opzioni viene usata raremente. Potresti saltare questo capitolo e comunque continuare ad usare bene `fetch`.

Ma ancora una volta, è una cosa buona sapere cosa fa `fetch`, e inoltre se dovessero sorgere necessità, possiamo tornare e leggere i dettagli.
```

Ecco la lista completa di tutte le opzioni possibili per `fetch` con i loro valorri predefiniti (valori alternativi nei commenti):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // l'header del content type solitamente è auto impostato
    // a seconda del corpo della richiesta
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, o URLSearchParams
  referrer: "about:client", // oppure "" per inviare un header di Referer nullo,
  // o un url dalla *origin* attuale
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // a hash, tipo "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController per annullare la richiesta
  window: window // null
});
```

Una lista impressionante, giusto?

Abbiamo affrontato per bene `method`, `headers` e `body` nel capitolo <info:fetch>.

L'opzione `signal` è affrontata in <info:fetch-abort>.

Adesso andiamo ad esplorare le rimanenti funzionalità.

## referrer, referrerPolicy

Queste opzioni gestiscono come `fetch` imposta l'header  HTTP `Referer`.

Solitamente questo header viene impostato automaticamente e contiene l'URL della pagina che ha eseguito la richiesta. Nella maggioranza degli scenari, non ha nessuna importanza, ma qualche volta per ragioni di sicurezza ha senso rimuoverlo o abbreviarlo.

**L'opzione `referrer` permette di impostare qualunque `Referer` (all'interno dell'origine attuale) o di rimuoverlo.**

Per non inviare alcun referer, impostare una stringa vuota:
```js
fetch('/page', {
*!*
  referrer: "" // nessun header Referer
*/!*
});
```

Per impostare un altro url, all'interno dello stesso *origin* di quello attuale:

```js
fetch('/page', {
  // assumendo che siamo su https://javascript.info
  // possiamo impostare qualunque header Referer, a patto che faccia parte dello stesso origin
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**L'opzione `referrerPolicy` imposta regole generali per `Referer`.**

Le richieste sono divise in 3 tipi:

1. Richieste alla stessa origine.
2. Richieste ad un altra origine.
3. Richieste da HTTPS ad HTTP (da protocollo sicuro a non sicuro).

Diversamente dall'opzione `referrer` che permette di impostare l'esatto valore di `Referer`, `referrerPolicy` comunica al browser le regole generali per ogni tipo di richiesta.

I valori possibili vengono descritti nelle [Specifiche di Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/):

- **`"no-referrer-when-downgrade"`** -- il valore predefinito: viene sempre inviato il `Referer` completo, a meno che  non inviamo una richiesta da HTTPS ad HTTP (verso il protocollo meno sicuro).
- **`"no-referrer"`** -- non invia mai il `Referer`.
- **`"origin"`** -- invia solamente l'origin nel `Referer`, non l'URL completo della pagina, ad esempio solo `http://site.com` invece di `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- invia il `Referer` completo per richiesta alla stessa origin, ma solamente l'origin per richieste cross-origin (come sopra).
- **`"same-origin"`** -- invia il `Referer` completo per richieste verso la stessa origin, ma nessun `Referer` per richieste cross-origin.
- **`"strict-origin"`** -- invia solamente l'origin, non il `Referer` per richieste HTTPS→HTTP.
- **`"strict-origin-when-cross-origin"`** -- per richieste same-origin invia il `Referer` completo, per quelle cross-origin invia solo l'origin, a meno che non sia una richiesta HTTPS→HTTP request, per le quali non invierebbe nulla.
- **`"unsafe-url"`** -- invia sempre l'url completo nel `Referer`, anche per richieste HTTPS→HTTP.

Ecco una tabella con tutte le combinazioni:

| Value | To same origin | To another origin | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` or `""` (default) | full | full | - |
| `"origin"` | origin | origin | origin |
| `"origin-when-cross-origin"` | full | origin | origin |
| `"same-origin"` | full | - | - |
| `"strict-origin"` | origin | origin | - |
| `"strict-origin-when-cross-origin"` | full | origin | - |
| `"unsafe-url"` | full | full | full |

Immaginiamo di avere un'are di amministrazione con una struttura URL che dovrebbe rimanere nascosta all'esterno del sito.

Se inviamo un `fetch`, per impostazione predefinita invierà sempre l'header `Referer` con l'url completo della nostra pagina (eccetto quando eseguiamo le chiamate da  HTTPS ad HTTP, in cui non ci sarà `Referer`).

Ad esempio `Referer: https://javascript.info/admin/secret/paths`.

Se volessimo che gli altri siti conoscessero solamente la parte dell'origin, e non l'URL-path, possiamo impostare l'opzione:

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

Possiamo inserirlo in tutte le chiamate `fetch`, magari integrandolo dentro una libreria JavaScript del nostro progetto che effettuerebbe tutte le richieste usando `fetch`.

La differenza con il comportamente predefinito è che per richieste verso altri origin `fetch` invia solamente la parte origin dell'URL (ad esempio `https://javascript.info`, senza il percorso). Per richieste verso la nostra origin otteniamo ancora il `Referer` completo (utile forse a scopo di debugging).

```smart header="Referrer policy non serve solo per `fetch`"
La referrer policy, descritta nelle [specifiche](https://w3c.github.io/webappsec-referrer-policy/), non coinvolge solo `fetch`, ma è più generico.

In particolare, è possibile impostare la policy predefinita per l'intera pagina usando l'header HTTP `Referrer-Policy`, o a livello di link, tramite `<a rel="noreferrer">`.
```

## mode

L'opzione `mode` è una salvaguardia che previene richieste cross-origin occasionali:

- **`"cors"`** -- il comportamento predefinito, le richieste cross-origin sono permesse, come descritto in <info:fetch-crossorigin>,
- **`"same-origin"`** -- le richeiste cross-origin sono vietate,
- **`"no-cors"`** -- vengono permesse solamante richieste cross-origin sicure.

Questa opzione può essere utile quando l'URL per il `fetch` su terze parti, e vogliamo un "pulsante di spegnimento" per limitare le funzionalità cross-orgin.

## credentials

L'opzione `credentials` specifica se `fetch` deve mandare i cookies e gli headers di HTTP-Authorization insieme alla richiesta.

- **`"same-origin"`** -- the default, don't send for cross-origin requests,
- **`"include"`** -- always send, requires `Accept-Control-Allow-Credentials` from cross-origin server in order for JavaScript to access the response, that was covered in the chapter <info:fetch-crossorigin>,
- **`"omit"`** -- never send, even for same-origin requests.

## cache

By default, `fetch` requests make use of standard HTTP-caching. That is, it respects the `Expires` and `Cache-Control` headers, sends `If-Modified-Since` and so on. Just like regular HTTP-requests do.

The `cache` options allows to ignore HTTP-cache or fine-tune its usage:

- **`"default"`** -- `fetch` uses standard HTTP-cache rules and headers,
- **`"no-store"`** -- totally ignore HTTP-cache, this mode becomes the default if we set a header `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, or `If-Range`,
- **`"reload"`** -- don't take the result from HTTP-cache (if any), but populate the cache with the response (if the response headers permit this action),
- **`"no-cache"`** -- create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response,
- **`"force-cache"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, make a regular HTTP-request, behave normally,
- **`"only-if-cached"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, then error. Only works when `mode` is `"same-origin"`.

## redirect

Normally, `fetch` transparently follows HTTP-redirects, like 301, 302 etc.

The `redirect` option allows to change that:

- **`"follow"`** -- the default, follow HTTP-redirects,
- **`"error"`** -- error in case of HTTP-redirect,
- **`"manual"`** -- don't follow HTTP-redirect, but `response.url` will be the new URL, and `response.redirected` will be `true`, so that we can perform the redirect manually to the new URL (if needed).

## integrity

The `integrity` option allows to check if the response matches the known-ahead checksum.

As described in the [specification](https://w3c.github.io/webappsec-subresource-integrity/), supported hash-functions are SHA-256, SHA-384, and SHA-512, there might be others depending on the browser.

For example, we're downloading a file, and we know that it's SHA-256 checksum is "abcdef" (a real checksum is longer, of course).

We can put it in the `integrity` option, like this:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Then `fetch` will calculate SHA-256 on its own and compare it with our string. In case of a mismatch, an error is triggered.

## keepalive

The `keepalive` option indicates that the request may "outlive" the webpage that initiated it.

For example, we gather statistics on how the current visitor uses our page (mouse clicks, page fragments he views), to analyze and improve the user experience.

When the visitor leaves our page -- we'd like to save the data to our server.

We can use the `window.onunload` event for that:

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

Normally, when a document is unloaded, all associated network requests are aborted. But the `keepalive` option tells the browser to perform the request in the background, even after it leaves the page. So this option is essential for our request to succeed.

It has a few limitations:

- We can't send megabytes: the body limit for `keepalive` requests is 64KB.
    - If we need to gather a lot of statistics about the visit, we should send it out regularly in packets, so that there won't be a lot left for the last `onunload` request.
    - This limit applies to all `keepalive` requests together. In other words, we can perform multiple `keepalive` requests in parallel, but the sum of their body lengths should not exceed 64KB.
- We can't handle the server response if the document is unloaded. So in our example `fetch` will succeed due to `keepalive`, but subsequent functions won't work.
    - In most cases, such as sending out statistics, it's not a problem, as the server just accepts the data and usually sends an empty response to such requests.
