# Cookies, document.cookie

I cookies sono piccole stringhe di dati, memorizzate direttamente nel browser. Sono parte del protocollo HTTP,
definito dalla [specifica RFC 6265](https://tools.ietf.org/html/rfc6265)

<<<<<<< HEAD
I Cookies vengono solitamente impostati dal web-server utilizzando l'HTTTP-header `Set-Cookie`. In seguito
il browser li aggiunge automaticamente a ogni richiesta (o quasi) dello stesso dominio che sta utilizzando `Cookie` HTTP-header.
=======
Cookies are usually set by a web server using the response `Set-Cookie` HTTP header. Then, the browser automatically adds them to (almost) every request to the same domain using the `Cookie` HTTP header.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


<<<<<<< HEAD
Uno degli usi più comune è l'autenticazione:
=======
1. Upon sign-in, the server uses the `Set-Cookie` HTTP header in the response to set a cookie with a unique "session identifier".
2. Next time the request is sent to the same domain, the browser sends the cookie over the net using the `Cookie` HTTP header.
3. So the server knows who made the request.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

1. In seguito al login, il server usa l'HTTP-header `Set-Cookie` in risposta all'impostazione del cookie che abbia un unico
"identificativo di sessione".
2. La prossima volta quando la richiesta viene impostata nello stesso dominio, il browser invia il Cookie attraverso la rete
usando l'HTTP-header `Cookie`.
3. Così il server sa chi ha fatto la richiesta.

<<<<<<< HEAD
Possiamo accedere ai cookies dal browser, utilizzando la proprietà document.cookie.
=======
There are many tricky things about cookies and their attributes. In this chapter, we'll cover them in detail.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Esistono tanti altri trucchi riguardo i cookies e le loro opzioni. In questo capitolo andremo ad analizzarli nel dettaglio.

## Leggere dal document.cookie

```online
Il tuo browser colleziona cookies dagli altri siti? Vediamo:
```

```offline
Assumendo che tu sia in un sito, è possibile vedere i cookies dello stesso, in questo modo:
```

```js run
// Nel dominio javascript.info, utilizziamo Google Analytics per scopi statistici,
// quindi dovreste trovare dei cookies
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```

Il valore di `document.cookie` consiste nelle coppie `name=value`, delimitate da  `; `. Ognuna rappresenta un cookie a se stante.

<<<<<<< HEAD
Per trovare un cookie particolare, possiamo dividere document.cookie con `; `, e in seguito, trovare il nome corretto.
Possiamo usare una RegEx o una funzione degli array.

Lasciamo il compito in questione al lettore come esercizio. Inoltre, alla fine del capitolo, troverai delle funzioni che ti aiuteranno a manipolare i cookies.
=======
The value of `document.cookie` consists of `name=value` pairs, delimited by `; `. Each one is a separate cookie.

To find a particular cookie, we can split `document.cookie` by `; `, and then find the right name. We can use either a regular expression or array functions to do that.

We leave it as an exercise for the reader. Also, at the end of the chapter, you'll find helper functions to manipulate cookies.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Scrivere nel document.cookie

Possiamo scrivere nel `document.cookie`. Ma fate attenzione che questa non è una proprietà, ma piuttosto un metodo di accesso [accessor (getter/setter)](info:property-accessors). Un assegnazione a quest'ultimo è trattato in modo particolare.

<<<<<<< HEAD
**Un'operazione di scritture nel `document.cookie` aggiorna solo i cookies menzionati all interno del documento stesso, ma non affligge altri cookies.**
=======
**A write operation to `document.cookie` updates only the cookie mentioned in it and doesn't touch other cookies.**
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per esempio, questo comando imposta un cookie con il nome `user` e il valore `John`:

```js run
document.cookie = "user=John"; // aggiorna solo il cookie chiamato 'user'
alert(document.cookie); //  mostra tutti i cookies
```
Se provate ad eseguirlo, probabilmente vedrete diversi cookies. Questo perché l'operazione `document.cookie=` 
non sovrascrive tutti i cookies. Imposta solo il cookie menzionato ovvero `user`.

<<<<<<< HEAD
Tecnicamente, il nome e il valore possono avere qualsiasi carattere, per mantenere la formattazione valida dovrebbero essere
giustificati utilizzando la funzione interna `encodeURIComponent`:

```js run
// il carattere speciale (spazio), necessita di essere codificato
=======
If you run it, you will likely see multiple cookies. That's because the `document.cookie=` operation does not overwrite all cookies. It only sets the mentioned cookie `user`.

Technically, name and value can have any characters. To keep the valid formatting, they should be escaped using a built-in `encodeURIComponent` function:

```js run
// special characters (spaces) need encoding
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
let name = "my name";
let value = "John Smith"

// codifica del cookie come  my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```


<<<<<<< HEAD
```warn header="Limitazioni"
 Ci sono alcune limitazioni:

- La coppia `name=value`, in seguito a `encodeURIComponent`, non dovrebbe essere più grande di 4kb. In modo da non memorizzare valori eccessivamente grandi in un cookie.

- Il numero totale di cookies per dominio è limitato a circa 20+, ma il limite esatto dipende dal browser.
```

I cookies hanno diverse opzioni, molte di queste sono importanti e dovrebbero essere impostate.

Le opzioni sono indicizzate dopo  `key=value`, delimitate da ; in questo modo:

=======
```warn header="Limitations"
There are a few limitations:
- You can only set/update a single cookie at a time using `document.cookie`.
- The `name=value` pair, after `encodeURIComponent`, should not exceed 4KB. So we can't store anything huge in a cookie.
- The total number of cookies per domain is limited to around 20+, the exact limit depends on the browser.
```

Cookies have several attributes, many of which are important and should be set.

The attributes are listed after `key=value`, delimited by `;`, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

<<<<<<< HEAD
## path

- **`path=/mypath`**

Il prefisso del path dell'URL deve essere assoluto. In questo modo sarà accessibile a tutte le pagine che appartengono allo stesso path. Di default, corrisponde al path corrente.

Se un cookie è impostato come `path=/admin`, è visibile nelle pagine `/admin` e `/admin/qualcosa`, ma non in `/home` o `/adminpage`.

Solitamente, dovremmo impostare `path` nella cartella principale: `path=/` affinché il cookie sia accessibile da tutte le pagine del sito.

=======
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
## domain

- **`domain=site.com`**

Un dominio definisce dove il cookie è accessibile. In realtà, ci sono delle limitazioni. Non possiamo impostare nessun dominio.

Di default, un cookie è accessibile solo nel dominio in cui è stato impostato. Cosi se il cookie è stato impostato da `site.com`, non lo otterremo su `other.com`

<<<<<<< HEAD
...Inoltre, non otterremo il cookie nel sotto dominio `forum.site.com`!
=======
Please note, by default, a cookie is not shared with a subdomain, such as `forum.site.com`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
// su site.com
document.cookie = "user=John"

// su forum.site.com
alert(document.cookie); // nessun user
```

**Non c'è un modo per rendere il cookie accessibile da un secondo dominio, ad esempio `other.com`, pertanto non riceverà mai il cookie impostato su `site.com`**

<<<<<<< HEAD
Questa è una restrizione per motivi di sicurezza, per consentirci di immagazzinare dati sensibili nei cookies che dovrebbero essere disponibili solo in un sito.
=======
For that to happen, when setting a cookie at `site.com`, we should explicitly set the `domain` attribute to the root domain: `domain=site.com`. Then all subdomains will see such a cookie.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

...Ma se la nostra intenzione è di renderli accessibili anche a sotto domini come `forum.site.com`? Questo è possibile. Mentre impostiamo un cookie su `site.com`, dovremmo espressamente selezionare l'opzione `domain` nella cartella principale del dominio: `domain=site.com`:

```js
// su site.com
// rende il cookie accessibile su ogni sotto dominio *.site.com:
document.cookie = "user=John; domain=site.com"

// dopo

// su forum.site.com
alert(document.cookie); // possiede un cookie user=John
```

<<<<<<< HEAD
Per ragioni storiche, `domain=.site.com` (un punto prima di `site.com`) funziona nello stesso modo, garantendo accesso al cookie dal sotto dominio. Questa è una vecchia notazione, dovrebbe essere utilizzata se dobbiamo supportare vecchi browsers.


Ricapitolando, l'opzione `domain` ci consente di rendere un cookie accessibile ai sotto domini.

## expires, max-age

Di default, se un cookie non ha una di queste opzioni, sparisce quando il browser viene chiuso. Questo tipo di cookie vengono definiti "cookie di sessione".

Affinché il cookie sopravviva una volta che il browser è stato chiuso, possiamo impostare le opzioni `expires` or `max-age`.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

La data di scadenza del cookie, quando il browser lo cancellerà automaticamente.
=======
```warn header="Legacy syntax"
Historically, `domain=.site.com` (with a dot before `site.com`) used to work the same way, allowing access to the cookie from subdomains. Leading dots in domain names are now ignored, but some browsers may decline to set the cookie containing such dots.
```

To summarize, the `domain` attribute allows to make a cookie accessible at subdomains.

## path

- **`path=/mypath`**

The URL path prefix must be absolute. It makes the cookie accessible for pages under that path. By default, it's the current path.

If a cookie is set with `path=/admin`, it's visible on pages `/admin` and `/admin/something`, but not at `/home`, `/home/admin` or `/`.

Usually, we should set `path` to the root: `path=/` to make the cookie accessible from all website pages. If this attribute is not set the default is calculated using [this method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#path_default_value).

## expires, max-age

By default, if a cookie doesn't have one of these attributes, it disappears when the browser/tab is closed. Such cookies are called "session cookies"

To let cookies survive a browser close, we can set either the `expires` or `max-age` attribute. `max-Age` has precedence if both are set.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

The cookie expiration date defines the time when the browser will automatically delete it (according to the browser's time zone).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La data dovrà essere esattamente in questo formato, nel fuso orario GMT. Possiamo usare `date.toUTCString` per ottenerla. Per esempio, possiamo impostare il cookie affinché scada in un giorno:

```js
// +1 giorno da ora
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

Se impostiamo `expires` a una data nel passato, il cookie verrà cancellato.

-  **`max-age=3600`**

<<<<<<< HEAD
=======
It's an alternative to `expires` and specifies the cookie's expiration in seconds from the current moment.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Se zero o negativa, il cookie viene cancellato:


```js
// cookie verrà cancellato +1 ora da ora.
document.cookie = "user=John; max-age=3600";

// delete cookie (let it expire right now)
document.cookie = "user=John; max-age=0";
```

## secure

- **`secure`**

Il cookie dovrà essere trasferito soltanto tramite HTTPS.

**Di default, se impostiamo un cookie su `http://site.com`, allora apparirà su `https://site.com` e viceversa.**

Questo accade poiché i cookies sono dominio.dipendenti, non distinguono i vari protocolli.

<<<<<<< HEAD
Con questa opzione, se un cookie è impostato su `https://site.com`, non apparirà quando lo stesso sito viene visitato da HTTP, come `http://site.com`. Cosi facendo, se un cookie ha contenuto sensibile che non dovrebbe mai essere inviato tramite protocollo HTTP non criptato, il flag `secure` è la cosa giusta da fare.
=======
With this attribute, if a cookie is set by `https://site.com`, then it doesn't appear when the same site is accessed by HTTP, as `http://site.com`. So if a cookie has sensitive content that should never be sent over unencrypted HTTP, the `secure` flag is the right thing.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
//assumendo sia on https:// now
// imposta il cookie sicuro (Solo accessibile se si utilizza HTTPS)
document.cookie = "user=John; secure";
```

## samesite

<<<<<<< HEAD
Un altro attributo di sicurezza è `samesite`. Progettato per proteggere da attacchi XSRF (cross-site request forgery).
=======
This is another security attribute `samesite`. It's designed to protect from so-called XSRF (cross-site request forgery) attacks.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per comprendere il funzionamento e quando è utile, analizziamo un attacco XSRF.

### XSRF attack

<<<<<<< HEAD
Immagina di effettuare il login nel sito `bank.com`. In questo caso hai un cookie di autenticazione da quel sito. Il tuo browser lo invia a `bank.com` ad ogni richiesta, affinché ti riconosca e esegua tutte le operazioni finanziari personali.
=======
Imagine, you are logged into the site `bank.com`. That is: you have an authentication cookie from that site. Your browser sends it to `bank.com` with every request so that it recognizes you and performs all sensitive financial operations.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ora, mentre stai navigando sul web su un altra finestra, occasionalmente potresti imbatterti nel sito `evil.com`. Questo sito ha un codice JavaScript che invia un form `<form action="https://bank.com/pay">` al sito `bank.com` con campi che iniziano una transazione verso l'account dell'hacker.

<<<<<<< HEAD
Il browser invia i cookies ogni volta che visiti il sito `bank.com`, anche se la richiesta proviene da `evil.com`. In questo modo, la banca pensa che sia tu a effettuare i pagamenti.

![](cookie-xsrf.svg)

Questo processo è chiamato attacco "Cross-site Request Forgery" (in breve, XSRF).

Le banche sono protette da questo tipo di assalto. Tutte le richieste generate da `bank.com` hanno un campo speciale, chiamato "XSRF protection token" (token di protezione), che una pagina maligna non può generare o estrarre da una pagina remota (precisamente,  il form può essere inviato da quella pagina, ma non può ricevere indietro i dati).
Inoltre il sito `bank.com` controlla questo token in ogni richiesta che riceve.
=======
The browser sends cookies every time you visit the site `bank.com`, even if the form was submitted from `evil.com`. So the bank recognizes you and performs the payment.

![](cookie-xsrf.svg)

This is a so-called "Cross-Site Request Forgery" (in short, XSRF) attack.

Real banks are protected from it of course. All forms generated by `bank.com` have a special field, a so-called "XSRF protection token", that an evil page can't generate or extract from a remote page. It can submit a form there, but can't get the data back. The site `bank.com` checks for such a token in every form it receives.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Questa protezione richiede tempo per essere implementata: dobbiamo assicurarci che ogni richiesta abbia il campo per il token, inoltre dobbiamo verificare tutte le richieste in entrata.

<<<<<<< HEAD
### Accedere all'opzione cookie samesite

L'opzione per il cookie `samesite` provvede alla protezione da questo tipo di attacchi in modo diversi, che (in teoria) non dovrebbe richiedere l'utilizzo del "xsrf protection tokens".
=======
### Use cookie samesite attribute

The cookie `samesite` attribute provides another way to protect from such attacks, that (in theory) should not require "xsrf protection tokens".
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Sono presenti due  possibili valori:

- **`samesite=strict`**

Un cookie con `samesite=strict` non viene mai inviato se l'utente proviene dall'esterno del sito stesso.

<<<<<<< HEAD
In altre parole, quando un utente apre un link da una mail o invia una richiesta da `evil.com`, o effettua qualsiasi operazione che origini da un altro dominio, il cookie non viene inviato.

Se i cookies di autenticazione possiedono l'opzione `samesite`, allora l'attacco XSRF non ha speranze di successo, poiché l'invio da `evil.com` arriverà senza cookies. Cosi `bank.com` non riconoscerà l'utente e non procederà con il pagamento.

Questa protezione è affidabile. Solo le operazioni che provengono da `bank.com` invieranno il cookie `samesite`, ad esempio una richiesta proveniente da una pagina all interno di `bank.com`
=======
In other words, whether a user follows a link from their email, submits a form from `evil.com`, or does any operation that originates from another domain, the cookie is not sent.

If authentication cookies have the `samesite=strict` attribute, then an XSRF attack has no chance of succeeding, because a submission from `evil.com` comes without cookies. So `bank.com` will not recognize the user and will not proceed with the payment.

The protection is quite reliable. Only operations that come from `bank.com` will send the `samesite=strict` cookie, e.g. a form submission from another page at `bank.com`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Però è presente un piccolo inconveniente.

<<<<<<< HEAD
Quando un utente apre un link legittimo per `bank.com`, ad esempio nei nostri appunti, sarà sorpreso nel vedere che `bank.com` non li riconoscerà. Questo accade poiché i cookies `samesite=strict` non sono inviati in quel caso.

Possiamo risolvere il problema usando due cookies: uno per il "riconoscimento generale", con l'unico scopo di inviare: "Hello, John", l'altro per le operazioni di cambiamento dati con `samesite=strict`. In seguito, una persona proveniente dall'esterno del sito vedrà il messaggio di benvenuto, ma affinché il secondo cookie venga inviato, i pagamenti dovranno essere inizializzati dal sito della banca.
=======
When a user follows a legitimate link to `bank.com`, like from their notes, they'll be surprised that `bank.com` does not recognize them. Indeed, `samesite=strict` cookies are not sent in that case.

We could work around that by using two cookies: one for "general recognition", only to say: "Hello, John", and the other one for data-changing operations with `samesite=strict`. Then, a person coming from outside of the site will see a welcome, but payments must be initiated from the bank's website, for the second cookie to be sent.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- **`samesite=lax` (same as `samesite` without value)**

Permette un approccio più flessibile ma allo stesso tempo protegge da XSRF e non mina l'esperienza dell utente.

Lax mode, come `strict`, proibisce al browser di inviare cookies quando provengono da siti esterni, ma aggiunge un eccezione.

Un cookie `samesite=lax` è inviato se entrambi queste condizioni sono vere:

<<<<<<< HEAD
1 Il metodo HTTP è "sicuro" (esempio GET, ma non POST).
=======
    The full list of safe HTTP methods is in the [RFC7231 specification](https://tools.ietf.org/html/rfc7231#section-4.2.1). These are the methods that should be used for reading, but not writing the data. They must not perform any data-changing operations. Following a link is always GET, the safe method.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    La lista completa di metodi HTTP si trova nelle specifiche: [RFC7231 specification](https://tools.ietf.org/html/rfc7231). Generalmente questi metodi dovrebbero essere utilizzati per la lettura, ma non per la scrittura dei dati. Non dovrebbero eseguire alcuna operazione per la modifica dei dati. L'apertura di un link è sempre GET, quindi sicura.

<<<<<<< HEAD
2 L'operazione esegue navigazione top-level (cambia l'URL nella barra di indirizzo del browser).

    Questo solitamente è vero, ma se la navigazione viene effettuata in un `<iframe>`, allora non è top-level. Inoltre metodi JavaScript per richieste dal network non eseguono nessuna navigazione, dunque non sono applicabili.
=======
    This is usually true, but if the navigation is performed in an `<iframe>`, then it is not top-level. Additionally, JavaScript methods for network requests do not perform any navigation.

So, what `samesite=lax` does, is to allow the most common "go to URL" operation to have cookies. E.g. opening a website link from notes that satisfy these conditions.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Quindi, ciò che `samesite=lax` fa è semplicemente garantire alla più comune operazione "vai al seguente URL" di avere cookies. Esempio aprire un sito internet da un link all'interno di appunti soddisfa queste condizioni.

Se questo ti è sufficiente, aggiungere `samesite=lax` probabilmente non intaccherà l'esperienza utente e, allo stesso tempo, aggiungerà protezione.

<<<<<<< HEAD
Generalmente, `samesite` è un'ottima scelta.
=======
Overall, `samesite` is a great attribute.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ma c'è uno svantaggio:

<<<<<<< HEAD
- `samesite` viene ignorato (non è supportato) dai vecchi browser, dal 2017 circa.
=======
- `samesite` is ignored (not supported) by very old browsers, the year 2017 or so.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

**Quindi se ci affidiamo a `samesite` per garantire protezione, allora i vecchi browser saranno vulnerabili.**

<<<<<<< HEAD
Possiamo comunque utilizzare `samesite` insieme ad altre misure di protezione, come xsrf tokens, per aggiungere un altro livello di difesa e, in futuro, quando i vecchi  browser verranno deprecati, probabilmente potremo utilizzare i token xsrf.

## httpOnly

Questa opzione non ha nulla a che vedere con JavaScript, ma dobbiamo menzionarla per completezza.

Il web-server usa l'header `Set-Cookie` per impostare un cookie e potrebbe impostare l'opzione `httpOnly`.

Questa opzione proibisce qualsiasi accesso a JavaScript per quel cookie. Non possiamo vederlo ne manipolarlo utilizzando `document.cookie`.

Questo viene utilizzato come precauzione, per proteggere da alcuni attacchi in cui un hacker inietta il proprio codice JavaScript nella pagina e aspetta che un utente visiti quella pagina. Questo non dovrebbe essere possibile in ogni caso, poiché un hacker non dovrebbe essere in grado di iniettare il proprio codice all'interno del nostro sito, ma potrebbero esserci dei bug che gli permetterebbero questa azione.


Normalmente, nel caso in cui accade una cosa del genere, ed un utente visita un sito con il codice JavaScript dell'hacker, in quel caso il codice verrà eseguito e otterrà accesso a `document.cookie` con i cookies dell'utente contenenti le informazioni di autenticazione. Questo è un male.
=======
But we can use `samesite` together with other protection measures, like xsrf tokens, to add a layer of defence and then, in the future, when old browsers die out, we'll probably be able to drop xsrf tokens.

## httpOnly

This attribute has nothing to do with JavaScript, but we have to mention it for completeness.

The web server uses the `Set-Cookie` header to set a cookie. Also, it may set the `httpOnly` attribute.

This attribute forbids any JavaScript access to the cookie. We can't see such a cookie or manipulate it using `document.cookie`.

This is used as a precautionary measure, to protect from certain attacks when a hacker injects his own JavaScript code into a page and waits for a user to visit that page. That shouldn't be possible at all, hackers should not be able to inject their code into our site, but there may be bugs that let them do it.


Normally, if such a thing happens, and a user visits a web-page with a hacker's JavaScript code, then that code executes and gains access to `document.cookie` with user cookies containing authentication information. That's bad.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ma se un cookie è `httpOnly`, allora il `document.cookie` non verrà mostrato, cosi è protetto.

## Appendice: funzioni utili per i Cookie

Qui vediamo un paio di funzioni utili per lavorare con i cookies, più conveniente di una modifica manuale di `document.cookie`.

<<<<<<< HEAD
Esistono tante librerie per i cookie, quindi queste sono semplicemente per dimostrazione, ma comunque perfettamente funzionanti.

=======
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
### getCookie(name)

Il modo più veloce di accedere i cookie è quello di usare un' [espressione regolare](info:regular-expressions).

La funzione `getCookie(name)` restituisce il cookie con il `name` fornito:

```js
// Restituisce il cookie con il nome dato,
// o undefined se questo non esiste
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

Qui `new RegExp` è generato dinamicamente, per corrispondere`; name=<value>`.

Notare che il valore del cookie è criptato, quindi `getCookie` usa una funzione integrata `decodeURIComponent` per decodificarlo.

### setCookie(name, value, attributes)

Imposta il `name` del cookie al `value` dato con `path=/` di default (può essere modificato per aggiungerne altri valori di default):

```js run
function setCookie(name, value, attributes = {}) {

  attributes = {
    path: '/',
<<<<<<< HEAD
    // aggiungi altri percorsi di default se necessario
    ...options
=======
    // add other defaults here if necessary
    ...attributes
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  };

  if (attributes.expires instanceof Date) {
    attributes.expires = attributes.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let attributeKey in attributes) {
    updatedCookie += "; " + attributeKey;
    let attributeValue = attributes[attributeKey];
    if (attributeValue !== true) {
      updatedCookie += "=" + attributeValue;
    }
  }

  document.cookie = updatedCookie;
}

// Esempio:
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

Per cancellare un cookie, dobbiamo chiamarlo con una data di scadenza negativa:

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

<<<<<<< HEAD
```warn header="L'aggiornamento o al rimozione deve utilizzare lo stesso path e domain"
Notare che quando aggiorniamo o cancelliamo un cookie, dobbiamo usare esattamente lo stesso percorso e opzioni di dominio
usate quando è stato creato.
=======
```warn header="Updating or deleting must use same path and domain"
Please note: when we update or delete a cookie, we should use exactly the same path and domain attributes as when we set it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Tutti insieme: [cookie.js](cookie.js).


## Appendice: cookies di terze parti

Un cookie viene definito "third-party" ("di terze parti") se è impostato da un dominio diverso dalla pagina che l'utente sta visitando.

Per esempio:
1. Una pagina `site.com` carica un banner proveniente da un altro sito: `<img src="https://ads.com/banner.png">`.
2. Insieme al banner, il server remote di `ads.com` potrebbe impostare un header `Set-Cookie` con un cookie simile a questo: `id=1234`. Questo cookie proviene dal dominio `ads.com`, e sarà visibile solo su `ads.com`:

    ![](cookie-third-party.svg)

3. La prossima volta che `ads.com` viene visitato, il server remoto ottiene il cookie `id` e riconosce l'utente:

    ![](cookie-third-party-2.svg)

4. La cosa importante è che quando l'utente si sposta da `site.com` ad un altro sito `other.com` che ha un banner, allora `ads.com` ottiene il cookie, come se appartenesse a `ads.com`, riconoscendo il visitatore e tracciandolo mentre si muove tra i siti:

    ![](cookie-third-party-3.svg)


Cookie di terze parti sono tradizionalmente usati per tracciamento e servizi ads(pubblicitari), a causa della loro natura. Sono legati al dominio originale dunque `ads.com` può tracciare lo stesso utente tra siti diversi se vengono visitati.

<<<<<<< HEAD
Naturalmente, alcune persone non amano essere tracciate, cosi il browser fornisce la possibilità di disabilitare questi cookies.
=======
Naturally, some people don't like being tracked, so browsers allow them to disable such cookies.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Inoltre, browser moderni impiegano policy speciali per questi cookies:

- Safari non permette cookie di terze parti.
- Firefox possiede una "black list" di domini di terze parti in cui bloccano i cookies di terze parti.


```smart
Se carichiamo un script da un dominio di terze parti, ad esempio `<script src="https://google-analytics.com/analytics.js">`, e quello script usa 'document.cookie' per impostare un cookie, allora questo cookie non è un cookie third party.

Se uno script imposta un cookie, allora indipendentemente da dove provenga lo script -- il cookie appartiene al dominio della pagina corrente.

<<<<<<< HEAD
```

## Appendice: GDPR
=======
This topic is not related to JavaScript at all, it is just something to keep in mind when setting cookies.

There's a legislation in Europe called GDPR, that enforces a set of rules for websites to respect the users' privacy. One of these rules is to require explicit permission for tracking cookies from the user.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Questo argomento non è legato a JavaScript, ma è qualcosa da tenere a mente mentre si impostano i cookies.

Esiste una legislazione in Europa chiamata GDPR, che rinforza il gruppo di regole dei siti internet per rispettare la privacy dell'utente. E una di queste regole richiede un permesso esplicito per tracciare i cookies di un utente.

<<<<<<< HEAD
Notare che questo consenso riguarda solo cookies tracciamento/identificazione/autorizzazione.

Dunque, se impostiamo un cookie che salva solo alcune informazioni, ma non traccia ne identifica l'utente, allora siamo liberi di poterlo creare.
=======
But if we are going to set a cookie with an authentication session or a tracking ID, then a user must allow that.

Websites generally have two variants of complying with GDPR. You are likely to have seen them both on the web:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Se impostiamo un cookie con una sessione di autenticazione o un id di tracciamento, allora dobbiamo richiedere autorizzazione all'utente.
I siti internet generalmente hanno due varianti per seguire il GDPR. Dovresti averle già incontrate navigando nel web:

1. Se un sito vuole impostare cookies di tracciamento solo per utenti verificati.

    Per fare questo, il documento di registrazione dovrebbe avere una casella con scritto 'accetta le nostre direttive di privacy' (che descrivono come i cookies sono usati), e l'utente dovrà spuntare la casella affinché il sito sia libero di impostare i cookies di autenticazione.

<<<<<<< HEAD
2. Se un sito vuole impostare cookies di tracciamento per chiunque.
=======
    To do so legally, a website shows a modal "splash screen" for newcomers and requires them to agree to the cookies. Then the website can set them and let people see the content. That can be disturbing for new visitors though. No one likes to see such "must-click" modal splash screens instead of the content. But GDPR requires an explicit agreement.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    Per fare ciò legalmente, un sito mostra uno 'splash screen', per i nuovi visitatori e richiede loro di accettare i cookies. In seguito il sito può impostarli e permette alle persone di vederne il contenuto. Questo potrebbe essere disturbante per i nuovi visitatori. A nessuno piace vedere una finestra must-click' anziché il contenuto. Ma il GDPR richiede un contratto esplicito.

<<<<<<< HEAD
GDPR non riguarda solo i cookies, ma anche altri problemi legati alla privacy, ma questo va al di fuori di questa guida.
=======
GDPR is not only about cookies, it is about other privacy-related issues too, but that is beyond our scope.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


## Riepilogo

<<<<<<< HEAD
`document.cookie` fornisce l'accesso ai cookies
- opera la modifica solamente nei cookies menzionati al suo interno.
- name/value devono essere codificati.
- un cookie può contenere fino a 4kb, 20+cookies per sito (dipende dal browser).

Opzioni dei cookie:
- `path=/`, il percorso di default, rende il cookie visibile solo all'interno di quel percorso.
- `domain=site.com`, di default un cookie è visibile solo nel domino corrente. Se esplicito nel dominio, rende il cookie visibile nei sotto domini.
- `expires` or `max-age` imposta la scadenza del cookie, senza questa informazioni, il cookie viene cancellato quando il browser viene chiuso.
- `secure` rende un cookie HTTPS-only.
- `samesite` non permette al browser di inviare il cookie con richieste provenienti da siti esterni, aiuta a prevenire attacchi XSRF.

In aggiunta:
- Cookies di terze parti potrebbero essere bloccati dal browser, esempio Safari è impostato in questo modo di default.
- Quando si imposta un cookie di tracciamento per cittadini Europei, il GDPR impone di richiedere il permesso all'utente.
=======
`document.cookie` provides access to cookies.
- Write operations modify only the cookie mentioned in it.
- Name/value must be encoded.
- One cookie may not exceed 4KB in size. The number of cookies allowed on a domain is around 20+ (varies by browser).

Cookie attributes:
- `path=/`, by default current path, makes the cookie visible only under that path.
- `domain=site.com`, by default a cookie is visible on the current domain only. If the domain is set explicitly, the cookie becomes visible on subdomains.
- `expires` or `max-age` sets the cookie expiration time. Without them, the cookie dies when the browser is closed.
- `secure` makes the cookie HTTPS-only.
- `samesite` forbids the browser to send the cookie with requests coming from outside the site. This helps to prevent XSRF attacks.

Additionally:
- The browser may forbid third-party cookies, e.g. Safari does that by default. There is also work in progress to implement this in Chrome.
- When setting a tracking cookie for EU citizens, GDPR requires to ask for permission.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
