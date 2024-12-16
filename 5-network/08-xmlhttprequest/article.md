# XMLHttpRequest

`XMLHttpRequest` è un oggetto built-in che ci permette di eseguire delle richieste HTTP in JavaScript.

<<<<<<< HEAD
A dispetto del suo nome, contenente il termine "XML", può funzionare con qualunque tipo di dato, e non solo con il formato XML. Possiamo usarlo per effettuare upload e download di files, tenere traccia dei loro progressi e molto altro ancora.
=======
Despite having the word "XML" in its name, it can operate on any data, not only in XML format. We can upload/download files, track progress and much more.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tuttavia oggi c'è il più moderno metodo `fetch`, che in qualche modo ha soppiantato `XMLHttpRequest`.

Nello sviluppo web attuale `XMLHttpRequest` viene utilizzato ancora oggi per tre principali ragioni:

1. Ragioni storiche: per il supporto degli script già esistenti che fanno ancora uso di `XMLHttpRequest`.
2. Se abbiamo bisogno di supportare i vecchi browser, e non vogliamo fare uso di polyfills (ad esempio per mantenere gli script snelli).
3. Se abbiamo bisogno di fare qualcosa che `fetch` non può ancora fare, ad esempio tenere traccia dei progressi in fase di upload.

Vi suona familiare? Se sì, allora possiamo addentrarci nello studio di `XMLHttpRequest`. Altrimenti, potete passare direttamente alla sezione <info:fetch>.

## Le basi

XMLHttpRequest ha due modalità operative: sincrona e asincrona.

Per prima cosa vediamo la modalità asincrona, dato che è usata nella maggior parte dei casi.

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
    - `URL` -- l'URL della richiesta, una stringa che può anche essere un oggetto [URL](info:url).
    - `async` -- se impostato esplicitamente a `false`, la richiesta sarà sincrona, lo affronteremo più avanti.
    - `user`, `password` -- login e password per l'autenticazione HTTP di base (se richiesto).

    Nota bene che la chiamata a `open`, contrariamente al suo nome, non apre la connessione. Configura solo la richiesta, ma l'attività di rete comincia solo dopo la chiamata a `send`.

3. Invio.

    ```js
    xhr.send([body])
    ```

    Questo metodo apre la connessione ed invia la richiesta al server. Il parametro opzionale `body` contiene il corpo della richiesta.

    Alcuni metodi, come ad esempio `GET` non supportano il corpo nella richiesta, mentre altri, come `POST` usano `body` per inviare dati al server. Vedremo degli esempi più avanti.

4. Ci mettiamo in ascolto sugli eventi `xhr` per la risposta.

    Questi tre eventi sono quelli utilizzati più di frequente:
    - `load` -- quando la richiesta è completa (anche se lo status HTTP è 400 o 500), e la risposta è stata scaricata del tutto.
    - `error` -- quando la richiesta non può essere espletata, ad esempio per problemi di rete o URL non validi.
    - `progress` -- viene innescato periodicamente mentre la risposta viene scaricata, e dà informazioni su quanti dati sono stati scaricati.

    ```js
    xhr.onload = function() {
      alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // viene innescato solo se la richiesta non puo' essere eseguita
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // viene scatenato periodicamente
      // event.loaded - quanti bytes sono stati scaricati
      // event.lengthComputable = true se il server ha inviato l'header Content-Length
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

Una volta che il server ha risposto, otteniamo il risultato dentro le seguenti proprietà `xhr`:

`status`
: HTTP status code (un valore numerico): `200`, `404`, `403` e così via, e può essere `0` in caso di fallimento non HTTP.

`statusText`
: messaggio dello status HTTP (una stringa): solitamente `OK` per `200`, `Not Found` per `404`, `Forbidden` per `403` e via dicendo.

`response` (vecchi scripts potrebbero usare `responseText`)
: La risposta del server.

Possiamo anche specificare un timeout usando la proprietà corrispondente:

```js
xhr.timeout = 10000; // timeout in millisecondi, 10 secondi
```

Se la richiesta non ha esito nel tempo stabilito, questa viene annullata e viene scatenato l'evento `timeout`.

````smart header="parametri search dell'URL"
Per aggiungere dei parametri all'URL, come `?name=value`, ed assicurarci che vi sia una corretta codifica, possiamo usare l'oggetto [URL](info:url):

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// codifica il parametro 'q'
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

## Response Type

Utilizziamo la proprietà `xhr.responseType` per impostare il formato della risposta:

- `""` (default) -- ottenerlo come stringa,
- `"text"` -- ottenerlo come stringa,
- `"arraybuffer"` -- ottenerlo come `ArrayBuffer` (per dati di tipo binario, guardare il capitolo <info:arraybuffer-binary-arrays>),
- `"blob"` -- ottenerlo come un `Blob` (per dati binari, guardare <info:blob>),
- `"document"` -- ottenerlo come un documento XML (può usare XPath e altri metodi XML) o un documento HTML (basato sul MIME type del dato ricevuto),
- `"json"` -- ottiene un JSON (effettua il parsing automaticamente).

Qui ad esempio, otteniamo una risposta in JSON:

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// la risposta e' {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
Nei vecchi script potremmo imbatterci nelle proprietà `xhr.responseText` oppure `xhr.responseXML`, che esistono per ragioni storiche, per ottenere sia una stringa, che un documento XML. Oggigiorno, dovremmo impostare il formato dentro la proprietà `xhr.responseType` e ottenere `xhr.response` come appena illustrato.
```

## Ready states

`XMLHttpRequest` modifica lo stato mentre la chiamata progredisce, e lo stato corrente è accessibile tramite `xhr.readyState`.

Tutti gli stati, come da [specifica](https://xhr.spec.whatwg.org/#states) sono:

```js
UNSENT = 0; // stato iniziale
OPENED = 1; // chiamata aperta
HEADERS_RECEIVED = 2; // headers della risposta ricevuti
LOADING = 3; // la risposta è in fase di caricamento (è stato già ricevuto un primo pacchetto dati)
DONE = 4; // richiesta completata
```

Un oggetto `XMLHttpRequest` cambia stato durante la chiamata, secondo questo esatto ordine `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. Lo stato `3` si ripete ad ogni pacchetto ricevuto dalla rete.

Possiamo tenerne traccia tramite l'evento `readystatechange`:

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // caricamento
  }
  if (xhr.readyState == 4) {
    // richiesta terminata
  }
};
```

Potremmo trovare listeners per `readystatechange` in codice molto vecchio, anche qui per ragioni storiche, in quanto c'era un periodo in cui l'evento `load`, e altri eventi, non esistevano ancora. Al giorno d'oggi, i gestori `load/error/progress` li hanno deprecati.

## Annullamento delle richieste

Possiamo annullare la richiesta in ogni momento. La chiamata a `xhr.abort()` è adatta allo scopo:

```js
xhr.abort(); // annulla la richiesta
```

Ciò scatena l'evento `abort`, e `xhr.status` diventa `0`.

## Richieste sincrone

Se nel metodo `open` impostiamo il terzo parametro `async` a `false`, la richiesta viene eseguita in maniera sincrona.

In altre parole, l'esecuzione del codice JavaScript viene messa in pausa su `send()` e si riattiva a risposta ricevuta. Avviene una cosa simile a ciò che succede quando eseguiamo le chiamate ad `alert` o `prompt`.

Ecco l'esempio precedente riscritto, impostando però il parametro `open` a `false`:

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
} catch(err) { // invece di onerror
  alert("Request failed");
}
```

Potrebbe sembrare un buon codice, ma le chiamate sincrone vengono usate raramente, in quanto bloccano la pagina fino a che la chiamata non ha avuto esito completo. In alcuni browser, diventa persino impossibile eseguire lo scroll della pagina. Se una chiamata sincrona richiedesse troppo tempo, il browser ci suggerirebbe di chiudere la pagina "bloccata".

Molte capacità avanzate di `XMLHttpRequest`, come le richieste da un altro dominio o l'impostazione di un timeout, non sono disponibili se la richiesta è sincrona. Inoltre, non si può avere alcuna indicazione sul progresso del caricamento.

Per i suddetti motivi, le chiamate sincrone sono usate molto raramente, quasi mai, e non affronteremo più argomenti che le coinvolgono direttamente.

## Headers HTTP

`XMLHttpRequest` permette sia l'invio di headers personalizzati che la loro lettura nelle risposte.

I metodi per gli header HTTP sono 3:

`setRequestHeader(name, value)`
: Imposta un header della richiesta con `name` e `value` voluti.

    Per esempio:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Limitazioni degli headers"
    Molti headers sono gestiti esclusivamente dal browser, come ad esempio `Referer` ed `Host`.
    La lista completa è descritta [nelle specifiche](https://xhr.spec.whatwg.org/#the-setrequestheader()-method).

    Ad `XMLHttpRequest` non è permesso modificarli, per amore della sicurezza dell'utente ed il mantenimento della correttezza della richiesta.
    ```

    ````warn header="Non può rimuovere un header"
    Un'altra caratteristica di `XMLHttpRequest` è la sua impossibilità di annullare `setRequestHeader`.

    Una volta che un header è impostato, resta tale, e qualunque chiamata aggiuntiva non farà altro che aggiungere informazioni all'header stesso, senza sovrascritture.

    Per esempio:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // l'header diventa:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Restituisce l'header di risposta con il dato `name` (tranne `Set-Cookie` e `Set-Cookie2`).

    Esempio:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Restituisce tutti gli headers di risposta, tranne `Set-Cookie` e `Set-Cookie2`.

    Viene restituito una riga per ogni header presente, ad esempio:

    ```http
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    L'interruzione di riga sarà sempre nella forma `"\r\n"` (indipendentemente dal sistema operativo), in modo che si possa dividerli in headers individuali. Il separatore tra il nome ed il valore è sempre un carattere di due punti seguito da uno spazio `": "`. Questo aspetto è ben chiarito nelle specifiche.

    Quindi, se volessimo ottenere un oggetto con coppie di chiave/valore, dovremmo inserire un po' di JS.

    Come in questo esempio (supponendo che nel caso in cui avessimo due headers con lo stesso nome, il secondo sovrascriverebbe il primo):

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

Per eseguire una richiesta POST, usiamo l'oggetto built-in [FormData](mdn:api/FormData).

Ecco la sintassi:

```js
let formData = new FormData([form]); // crea un nuovo oggetto, opzionalmente viene riempito dal <form>
formData.append(name, value); // accoda un campo
```

Lo creiamo, eventualmente lo riempiamo partendo da un form, e se necessario eseguiamo l'`append` di più campi, ed infine:

1. `xhr.open('POST', ...)` – usa il metodo `POST`.
2. `xhr.send(formData)` per inviare il form al server.

Esempio:

```html run refresh
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // precompila FormData dal form
  let formData = new FormData(document.forms.person);

  // aggiunge ancora un campo
  formData.append("middle", "Lee");

  // lo invia
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

Il form viene inviato con la codifica `multipart/form-data`.

O, se preferissimo lavorare con JSON, allora lo convertiremmo tramite `JSON.stringify` e lo invieremmo come stringa.

Solamente, in questo caso, non dobbiamo dimenticarci di impostare l'header `Content-Type: application/json`, perché grazie a questo, molti frameworks server-side saranno in grado di codificare il JSON automaticamente:

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

Il metodo `.send(body)` è abbastanza "onnivoro". Può inviare quasi qualunque tipo di `body`, compresi oggetti `Blob` e `BufferSource`.

## Progresso dell'upload

L'evento `progress` viene scatenato solamente nella fase di download.

Ossia: se eseguiamo il `POST` di qualcosa, come prima cosa `XMLHttpRequest` esegue l'upload dei nostri dati (il corpo della richiesta), e successivamente scarica la risposta.

Se facciamo l'upload di qualcosa di grosso, allora sicuramente saremmo più interessati nel tracciare il progresso di upload. Tuttavia `xhr.onprogress` non serve ai nostri scopi.

Esiste un altro oggetto per tenere traccia degli eventi di upload, privo di metodi: `xhr.upload`.

Genera eventi, in modo simile ad `xhr`, con la differenza che `xhr.upload` viene scatenato solo durante la fase di upload:

- `loadstart` -- upload cominciato.
- `progress` -- viene scatenato periodicamente durante l'upload.
- `abort` -- upload annullato.
- `error` -- errore non HTTP.
- `load` -- upload completato con successo.
- `timeout` -- upload scaduto (se la proprietà `timeout` è stata impostata).
- `loadend` -- upload completato sia con successo che con errori.

Esempio di gestori:

```js
xhr.upload.onprogress = function(event) {
  alert(`Upload di ${event.loaded} su ${event.total} bytes`);
};

xhr.upload.onload = function() {
  alert(`Upload completato con successo.`);
};

xhr.upload.onerror = function() {
  alert(`Errore durante l'upload: ${xhr.status}`);
};
```

Ecco un esempio di un caso d'uso reale: upload di file con indicazione del progresso:

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // tiene traccia del progresso di upload
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

  // completamento del tracciamento: che sia con successo o meno
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

## Richieste cross-origin

`XMLHttpRequest` può eseguire delle richieste cross-origin, usando la stessa policy CORS già vista in [fetch](info:fetch-crossorigin).

Esattamente come `fetch`, non invia cookies ed autorizzazione HTTP verso altre origin di default. Per attivarle, bisogna impostare `xhr.withCredentials` a `true`:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

Guardare il capitolo <info:fetch-crossorigin> per maggiori dettagli riguardanti gli headers cross-origin.


## Riepilogo

Codice di esempio per la richiesta GET tramite `XMLHttpRequest`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // errore HTTP?
    // gestisce l'errore
    alert( 'Error: ' + xhr.status);
    return;
  }

  // ottiene la risposta da xhr.response
};

xhr.onprogress = function(event) {
  // informa sul progresso
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // gestisce un errore non HTTP (ad esempio errori di rete)
};
```

Attualmente ci sono più eventi, la [specifica aggiornata](https://xhr.spec.whatwg.org/#events) li elenca (ordinati secondo il ciclo di vita):

- `loadstart` -- la richiesta è cominciata.
- `progress` -- è arrivato un pacchetto della risposta, tutto il corpo della risposta si trova dentro `response`.
- `abort` -- la richiesta è stata annullata tramite la chiamata a `xhr.abort()`.
- `error` -- c'è stato un errore di connessione, ad esempio un nome di domino errato. Non succede per errori HTTP come 404.
- `load` -- la richiesta è stata completata con successo.
- `timeout` -- la richiesta è stata annullata a causa di un timeout (solo se è stato impostato).
- `loadend` -- viene scatenato dopo `load`, `error`, `timeout` o `abort`.

Gli eventi `error`, `abort`, `timeout`, e `load` sono mutualmente esclusivi. Solamente uno tra questi può essere innescato.

Gli eventi maggiormente usati sono quelli del caricamento avvenuto (`load`), del fallimento del caricamento (`error`), oppure possiamo usare un singolo gestore `loadend` e controllare le proprietà dell'oggetto della richiesta `xhr` per vedere come è andata.

Abbiamo incontrato anche un altro evento: `readystatechange`. Storicamente, è comparso tanto tempo fa, prima della regolamentazione delle specifiche. Oggigiorno, non è più necessario usarlo, e possiamo sostituirlo con i nuovi eventi, ma può essere spesso trovato in vecchi scripts.

Se dobbiamo tenere traccia degli upload, possiamo metterci in ascolto per i medesimi eventi ma sull'oggetto `xhr.upload`.
