
# API Fetch

Arrivati fin qui, sappiamo un bel po' di cose su `fetch`.

Guardiamo il resto dell'API, per approfondirne le potenzialità.

```smart
Nota bene: la maggioranza di queste opzioni viene usata raramente. Potresti saltare questo capitolo e comunque continuare ad usare bene `fetch`.

Ma ancora una volta, è una cosa buona sapere cosa fa `fetch`, e inoltre se dovessero sorgere necessità, possiamo tornare e leggere i dettagli.
```

Ecco la lista completa di tutte le opzioni possibili per `fetch` con i loro valori predefiniti (valori alternativi nei commenti):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // l'header del content type solitamente è auto impostato
    // a seconda del corpo della richiesta
    "Content-Type": "text/plain;charset=UTF-8"
  },
<<<<<<< HEAD
  body: undefined // string, FormData, Blob, BufferSource, o URLSearchParams
  referrer: "about:client", // oppure "" per inviare un header di Referer nullo,
  // o un url dalla *origin* attuale
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
=======
  body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // or "" to send no Referer header,
  // or an url from the current origin
  referrerPolicy: "strict-origin-when-cross-origin", // no-referrer-when-downgrade, no-referrer, origin, same-origin...
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // un hash, tipo "sha256-abcdef1234567890"
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

<<<<<<< HEAD
Per non inviare alcun referer, impostare una stringa vuota:
=======
To send no referrer, set an empty string:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
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

<<<<<<< HEAD
- **`"no-referrer-when-downgrade"`** -- il valore predefinito: viene sempre inviato il `Referer` completo, a meno che  non inviamo una richiesta da HTTPS ad HTTP (verso il protocollo meno sicuro).
- **`"no-referrer"`** -- non invia mai il `Referer`.
- **`"origin"`** -- invia solamente l'origin nel `Referer`, non l'URL completo della pagina, ad esempio solo `http://site.com` invece di `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- invia il `Referer` completo per richiesta alla stessa origin, ma solamente l'origin per richieste cross-origin (come sopra).
- **`"same-origin"`** -- invia il `Referer` completo per richieste verso la stessa origin, ma nessun `Referer` per richieste cross-origin.
- **`"strict-origin"`** -- invia solamente l'origin, non il `Referer` per richieste HTTPS→HTTP.
- **`"strict-origin-when-cross-origin"`** -- per richieste same-origin invia il `Referer` completo, per quelle cross-origin invia solo l'origin, a meno che non sia una richiesta HTTPS→HTTP, per le quali non invierebbe nulla.
- **`"unsafe-url"`** -- invia sempre l'url completo nel `Referer`, anche per richieste HTTPS→HTTP.
=======
- **`"strict-origin-when-cross-origin"`** -- the default value: for same-origin send the full `Referer`, for cross-origin send only the origin, unless it's HTTPS→HTTP request, then send nothing.
- **`"no-referrer-when-downgrade"`** -- full `Referer` is always sent, unless we send a request from HTTPS to HTTP (to the less secure protocol).
- **`"no-referrer"`** -- never send `Referer`.
- **`"origin"`** -- only send the origin in `Referer`, not the full page URL, e.g. only `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- send the full `Referer` to the same origin, but only the origin part for cross-origin requests (as above).
- **`"same-origin"`** -- send the full `Referer` to the same origin, but no `Referer` for cross-origin requests.
- **`"strict-origin"`** -- send only the origin, not the `Referer` for HTTPS→HTTP requests.
- **`"unsafe-url"`** -- always send the full url in `Referer`, even for HTTPS→HTTP requests.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ecco una tabella con tutte le combinazioni:

| Value | To same origin | To another origin | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` | full | full | - |
| `"origin"` | origin | origin | origin |
| `"origin-when-cross-origin"` | full | origin | origin |
| `"same-origin"` | full | - | - |
| `"strict-origin"` | origin | origin | - |
| `"strict-origin-when-cross-origin"` or `""` (default) | full | origin | - |
| `"unsafe-url"` | full | full | full |

Immaginiamo di avere un'area di amministrazione con una struttura URL che dovrebbe rimanere nascosta all'esterno del sito.

Se inviamo un `fetch`, per impostazione predefinita invierà sempre l'header `Referer` con l'url completo della nostra pagina (eccetto quando eseguiamo le chiamate da  HTTPS ad HTTP, in cui non ci sarà `Referer`).

Ad esempio `Referer: https://javascript.info/admin/secret/paths`.

Se volessimo che gli altri siti conoscessero solamente la parte relativa all'origin, e non l'URL-path, potremmo impostare l'opzione:

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

Possiamo inserirlo in tutte le chiamate `fetch`, magari integrandolo dentro una libreria JavaScript del nostro progetto che effettuerebbe tutte le richieste usando `fetch`.

La differenza con il comportamento predefinito è che, per richieste verso altri origin, `fetch` invia solamente la parte origin dell'URL (ad esempio `https://javascript.info`, senza il percorso). Per richieste verso la nostra origin otteniamo ancora il `Referer` completo (utile forse a scopo di debugging).

```smart header="Referrer policy non serve solo per `fetch`"
La referrer policy, descritta nelle [specifiche](https://w3c.github.io/webappsec-referrer-policy/), non coinvolge solo `fetch`, ma è più generico.

In particolare, è possibile impostare la policy predefinita per l'intera pagina usando l'header HTTP `Referrer-Policy`, o a livello di link, tramite `<a rel="noreferrer">`.
```

## mode

L'opzione `mode` è una salvaguardia che previene richieste cross-origin occasionali:

- **`"cors"`** -- il comportamento predefinito, le richieste cross-origin sono permesse, come descritto in <info:fetch-crossorigin>,
- **`"same-origin"`** -- le richieste cross-origin sono vietate,
- **`"no-cors"`** -- vengono permesse solamente richieste cross-origin sicure.

Questa opzione può essere utile quando l'URL per il `fetch` su terze parti, e vogliamo un "pulsante di spegnimento" per limitare le funzionalità cross-origin.

## credentials

L'opzione `credentials` specifica se `fetch` deve mandare i cookies e gli headers di HTTP-Authorization insieme alla richiesta.

- **`"same-origin"`** -- predefinito, non li invia per richieste cross-origin,
- **`"include"`** -- li invia sempre, richiede `Accept-Control-Allow-Credentials` dal server cross-origin in modo tale da permettere a JavaScript di accedere alla riposta, l'argomento è stato trattato nel capitolo <info:fetch-crossorigin>,
- **`"omit"`** -- non li invia in nessun caso, nemmeno per richieste same-origin.

## cache

Di default, le richieste con `fetch` fanno uso di caching HTTP standard. In sostanza, tiene conto degli headers `Expires` e `Cache-Control`, invia `If-Modified-Since` e così via. Proprio come una regolare richiesta HTTP.

L'opzione `cache` permette di ignorare la cache HTTP o regolare il suo utilizzo:

- **`"default"`** -- `fetch` utilizza le regole standard e gli headers HTTP-cache,
- **`"no-store"`** -- ignora totalmente HTTP-cache, questa modalità diventa quella predefinita se impostiamo un header tra questi: `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, o `If-Range`,
- **`"reload"`** -- non considera il risultato da HTTP-cache (se presente), ma popola la cache con la risposta (se l'header di risposta lo permette),
- **`"no-cache"`** -- crea una richiesta condizionale se c'è una risposta in cache, altrimenti una normale richiesta. Popola HTTP-cache con la risposta,
- **`"force-cache"`** -- usa la risposta da HTTP-cache, anche se scaduta. Se non c'è contenuto di HTTP-cache, esegue una regolare HTTP-request, si comporta normalmente,
- **`"only-if-cached"`** -- use la risposta di HTTP-cache, anche se è scaduta. Se non c'è risposta in HTTP-cache, va in errore. Funziona solo quando l'opzione `mode` è impostata su `"same-origin"`.

## redirect

Normalmente, `fetch` segue in maniera trasparente i redirect HTTP, come 301, 302 etc.

L'opzione `redirect` ci permette di cambiare questo comportamento:

- **`"follow"`** -- il predefinito, segue gli HTTP-redirects,
- **`"error"`** -- va in errore in caso di HTTP-redirect,
- **`"manual"`** -- permette di processare gli HTTP-redirect manualmente. In caso di redirect otterremo in risposta un oggetto speciale, con `response.type="opaqueredirect"`, status vuoto, e la maggior parte della altre proprietà.

## integrity

L'opzione `integrity` permette di controllare se la risposta combacia con il checksum noto a priori.

Come descritto nelle [specifiche](https://w3c.github.io/webappsec-subresource-integrity/), funzione hash supportate sono SHA-256, SHA-384, e SHA-512, potrebbero essercene altre a discrezione del browser.

<<<<<<< HEAD
Per esempio, stiamo scaricando un file, e sappiamo che il suo checksum SHA-256 è "abcdef" (un checksum reale è più lungo, chiaramente).
=======
For example, we're downloading a file, and we know that its SHA-256 checksum is "abcdef" (a real checksum is longer, of course).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Possiamo inserirlo dentro l'opzione `integrity`:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Quindi `fetch` calcolerà SHA-256 e lo confronterà con la nostra stringa. Nel caso non combaciassero, andrebbe in errore.

## keepalive

L'opzione `keepalive` indica che la richiesta può "sopravvivere" alla pagina che l'ha inizializzata.

Ad esempio, raccogliamo statistiche su come il visitatore attuale usa la nostra pagina (click del mouse, sezioni della pagina che guarda), per analizzare e migliorare l'esperienza utente.

Quando il visitatore abbandona la nostra pagina -- ci piacerebbe salvare il dato nel nostro server.

Per questo scopo, possiamo usare l'evento `window.onunload`:

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

Normalmente, quando un documento viene chiuso, tutte le richieste di rete ad esso associate vengono annullate. Ma l'opzione `keepalive` dice al browser di eseguire la richiesta in background, anche dopo che la pagina viene abbandonata. Quindi questa opzione è essenziale per far si che la nostra richiesta vada a buon fine.

Ha qualche limitazione:

- Non possiamo inviare megabytes: le dimensioni massime del corpo per richieste `keepalive` sono di 64KB.
    - Se dobbiamo raccogliere un bel po' di statistiche sulle visite, dovremmo inviarle regolarmente in pacchetti, cosicché non ve ne sia una troppo grande per l'ultima richiesta `onunload`.
    - Questo limite si applica a tutte le richieste `keepalive` insieme. In altre parole, possiamo effettuare richieste `keepalive` multiple in parallelo, ma la somma dei corpi delle chiamate non devono superare i 64KB.
- Non possiamo gestire la risposta del server se il documento viene chiuso. Quindi nel nostro esempio `fetch` andrà a buon fine grazie al `keepalive`, ma le funzioni conseguenti non verranno eseguite.
    - Nella maggior parte dei casi, come l'invio di statistiche, questo non è un problema, dal momento che il server accetta giusto le richieste inviando una risposta vuota.
