# Cookies, document.cookie

I cookies sono piccole stringhe di dati, memorizzate direttamente nel browser. Sono parte del protocollo HTTP,
definito dalla [specifica RFC 6265](https://tools.ietf.org/html/rfc6265)

I Cookies vengono solitamente impostati dal web-server utilizzando l'HTTTP-header `Set-Cookie`. In seguito
il browser li aggiunge automaticamente a ogni richiesta (o quasi) dello stesso dominio che sta utilizzando `Cookie` HTTP-header.


Uno degli usi più comune è l'autenticazione:

1. In seguito al login, il server usa l'HTTP-header `Set-Cookie` in risposta all'impostazione del cookie che abbia un unico
"identificativo di sessione".
2. La prossima volta quando la richiesta viene impostata nello stesso dominio, il browser invia il Cookie attraverso la rete
usando l'HTTP-header `Cookie`.
3. Così il server sa chi ha fatto la richiesta.

Possiamo accedere ai cookies dal browser, utilizzando la proprietà document.cookie.

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

Per trovare un cookie particolare, possiamo dividere document.cookie con `; `, e in seguito, trovare il nome corretto.
Possiamo usare una RegEx o una funzione degli array.

Lasciamo il compito in questione al lettore come esercizio. Inoltre, alla fine del capitolo, troverai delle funzioni che ti aiuteranno a manipolare i cookies.

## Scrivere nel document.cookie

Possiamo scrivere nel `document.cookie`. Ma fate attenzione che questa non è una proprietà, ma piuttosto un metodo di accesso [accessor (getter/setter)](info:property-accessors). Un assegnazione a quest'ultimo è trattato in modo particolare.

**Un'operazione di scritture nel `document.cookie` aggiorna solo i cookies menzionati all interno del documento stesso, ma non affligge altri cookies.**

Per esempio, questo comando imposta un cookie con il nome `user` e il valore `John`:

```js run
document.cookie = "user=John"; // aggiorna solo il cookie chiamato 'user'
alert(document.cookie); //  mostra tutti i cookies
```
Se provate ad eseguirlo, probabilmente vedrete diversi cookies. Questo perché l'operazione `document.cookie=` 
non sovrascrive tutti i cookies. Imposta solo il cookie menzionato ovvero `user`.

Tecnicamente, il nome e il valore possono avere qualsiasi carattere, per mantenere la formattazione valida dovrebbero essere
giustificati utilizzando la funzione interna `encodeURIComponent`:

```js run
// il carattere speciale (spazio), necessita di essere codificato
let name = "my name";
let value = "John Smith"

// codifica del cookie come  my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```


```warn header="Limitazioni"
 Ci sono alcune limitazioni:

- La coppia `name=value`, in seguito a `encodeURIComponent`, non dovrebbe essere più grande di 4kb. In modo da non memorizzare valori eccessivamente grandi in un cookie.

- Il numero totale di cookies per dominio è limitato a circa 20+, ma il limite esatto dipende dal browser.
```

I cookies hanno diverse opzioni, molte di queste sono importanti e dovrebbero essere impostate.

Le opzioni sono indicizzate dopo  `key=value`, delimitate da ; in questo modo:


```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

Il prefisso del path dell'URL deve essere assoluto. In questo modo sarà accessibile a tutte le pagine che appartengono allo stesso path. Di default, corrisponde al path corrente.

Se un cookie è impostato come `path=/admin`, è visibile nelle pagine `/admin` e `/admin/qualcosa`, ma non in `/home` o `/adminpage`.

Solitamente, dovremmo impostare `path` nella cartella principale: `path=/` affinché il cookie sia accessibile da tutte le pagine del sito.

## domain

- **`domain=site.com`**

Un dominio definisce dove il cookie è accessibile. In realtà, ci sono delle limitazioni. Non possiamo impostare nessun dominio.

<<<<<<< HEAD
Di default, un cookie è accessibile solo nel dominio in cui è stato impostato. Cosi se il cookie è stato impostato da `site.com`, non lo otterremo su `other.com`

...Inoltre, non otterremo il cookie nel sotto dominio `forum.site.com`!

```js
// su site.com
document.cookie = "user=John"

// su forum.site.com
alert(document.cookie); // nessun user
```

**Non c'è un modo per rendere il cookie accessibile da un secondo dominio, ad esempio `other.com`, pertanto non riceverà mai il cookie impostato su `site.com`**

Questa è una restrizione per motivi di sicurezza, per consentirci di immagazzinare dati sensibili nei cookies che dovrebbero essere disponibili solo in un sito.

...Ma se la nostra intenzione è di renderli accessibili anche a sotto domini come `forum.site.com`? Questo è possibile. Mentre impostiamo un cookie su `site.com`, dovremmo espressamente selezionare l'opzione `domain` nella cartella principale del dominio: `domain=site.com`:

```js
// su site.com
// rende il cookie accessibile su ogni sotto dominio *.site.com:
document.cookie = "user=John; domain=site.com"
=======
**There's no way to let a cookie be accessible from another 2nd-level domain, so `other.com` will never receive a cookie set at `site.com`.**

It's a safety restriction, to allow us to store sensitive data in cookies that should be available only on one site.

By default, a cookie is accessible only at the domain that set it.

Please note, by default a cookie is also not shared to a subdomain as well, such as `forum.site.com`.

```js
// if we set a cookie at site.com website...
document.cookie = "user=John"

// ...we won't see it at forum.site.com
alert(document.cookie); // no user
```

...But this can be changed. If we'd like to allow subdomains like `forum.site.com` to get a cookie set at `site.com`, that's possible.

For that to happen, when setting a cookie at `site.com`, we should explicitly set the `domain` option to the root domain: `domain=site.com`. Then all subdomains will see such cookie.

For example:

```js
// at site.com
// make the cookie accessible on any subdomain *.site.com:
document.cookie = "user=John; *!*domain=site.com*/!*"
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

// dopo

// su forum.site.com
alert(document.cookie); // possiede un cookie user=John
```

<<<<<<< HEAD
Per ragioni storiche, `domain=.site.com` (un punto prima di `site.com`) funziona nello stesso modo, garantendo accesso al cookie dal sotto dominio. Questa è una vecchia notazione, dovrebbe essere utilizzata se dobbiamo supportare vecchi browsers.


Ricapitolando, l'opzione `domain` ci consente di rendere un cookie accessibile ai sotto domini.
=======
For historical reasons, `domain=.site.com` (with a dot before `site.com`) also works the same way, allowing access to the cookie from subdomains. That's an old notation and should be used if we need to support very old browsers.

To summarize, the `domain` option allows to make a cookie accessible at subdomains.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

## expires, max-age

Di default, se un cookie non ha una di queste opzioni, sparisce quando il browser viene chiuso. Questo tipo di cookie vengono definiti "cookie di sessione".

Affinché il cookie sopravviva una volta che il browser è stato chiuso, possiamo impostare le opzioni `expires` or `max-age`.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

La data di scadenza del cookie, quando il browser lo cancellerà automaticamente.

La data dovrà essere esattamente in questo formato, nel fuso orario GMT. Possiamo usare `date.toUTCString` per ottenerla. Per esempio, possiamo impostare il cookie affinché scada in un giorno:

```js
// +1 giorno da ora
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

Se impostiamo `expires` a una data nel passato, il cookie verrà cancellato.

-  **`max-age=3600`**


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

Con questa opzione, se un cookie è impostato su `https://site.com`, non apparirà quando lo stesso sito viene visitato da HTTP, come `http://site.com`. Cosi facendo, se un cookie ha contenuto sensibile che non dovrebbe mai essere inviato tramite protocollo HTTP non criptato, il flag `secure` è la cosa giusta da fare.

```js
//assumendo sia on https:// now
// imposta il cookie sicuro (Solo accessibile se si utilizza HTTPS)
document.cookie = "user=John; secure";
```

## samesite

Un altro attributo di sicurezza è `samesite`. Progettato per proteggere da attacchi XSRF (cross-site request forgery).

Per comprendere il funzionamento e quando è utile, analizziamo un attacco XSRF.

### XSRF attack

Immagina di effettuare il login nel sito `bank.com`. In questo caso hai un cookie di autenticazione da quel sito. Il tuo browser lo invia a `bank.com` ad ogni richiesta, affinché ti riconosca e esegua tutte le operazioni finanziari personali.

Ora, mentre stai navigando sul web su un altra finestra, occasionalmente potresti imbatterti nel sito `evil.com`. Questo sito ha un codice JavaScript che invia un form `<form action="https://bank.com/pay">` al sito `bank.com` con campi che iniziano una transazione verso l'account dell'hacker.

Il browser invia i cookies ogni volta che visiti il sito `bank.com`, anche se la richiesta proviene da `evil.com`. In questo modo, la banca pensa che sia tu a effettuare i pagamenti.

![](cookie-xsrf.svg)

Questo processo è chiamato attacco "Cross-site Request Forgery" (in breve, XSRF).

Le banche sono protette da questo tipo di assalto. Tutte le richieste generate da `bank.com` hanno un campo speciale, chiamato "XSRF protection token" (token di protezione), che una pagina maligna non può generare o estrarre da una pagina remota (precisamente,  il form può essere inviato da quella pagina, ma non può ricevere indietro i dati).
Inoltre il sito `bank.com` controlla questo token in ogni richiesta che riceve.

Questa protezione richiede tempo per essere implementata: dobbiamo assicurarci che ogni richiesta abbia il campo per il token, inoltre dobbiamo verificare tutte le richieste in entrata.

### Accedere all'opzione cookie samesite

L'opzione per il cookie `samesite` provvede alla protezione da questo tipo di attacchi in modo diversi, che (in teoria) non dovrebbe richiedere l'utilizzo del "xsrf protection tokens".

Sono presenti due  possibili valori:

- **`samesite=strict` (same as `samesite` without value)**

Un cookie con `samesite=strict` non viene mai inviato se l'utente proviene dall'esterno del sito stesso.

In altre parole, quando un utente apre un link da una mail o invia una richiesta da `evil.com`, o effettua qualsiasi operazione che origini da un altro dominio, il cookie non viene inviato.

Se i cookies di autenticazione possiedono l'opzione `samesite`, allora l'attacco XSRF non ha speranze di successo, poiché l'invio da `evil.com` arriverà senza cookies. Cosi `bank.com` non riconoscerà l'utente e non procederà con il pagamento.

Questa protezione è affidabile. Solo le operazioni che provengono da `bank.com` invieranno il cookie `samesite`, ad esempio una richiesta proveniente da una pagina all interno di `bank.com`

Però è presente un piccolo inconveniente.

Quando un utente apre un link legittimo per `bank.com`, ad esempio nei nostri appunti, sarà sorpreso nel vedere che `bank.com` non li riconoscerà. Questo accade poiché i cookies `samesite=strict` non sono inviati in quel caso.

Possiamo risolvere il problema usando due cookies: uno per il "riconoscimento generale", con l'unico scopo di inviare: "Hello, John", l'altro per le operazioni di cambiamento dati con `samesite=strict`. In seguito, una persona proveniente dall'esterno del sito vedrà il messaggio di benvenuto, ma affinché il secondo cookie venga inviato, i pagamenti dovranno essere inizializzati dal sito della banca.

- **`samesite=lax`**

Permette un approccio più flessibile ma allo stesso tempo protegge da XSRF e non mina l'esperienza dell utente.

Lax mode, come `strict`, proibisce al browser di inviare cookies quando provengono da siti esterni, ma aggiunge un eccezione.

Un cookie `samesite=lax` è inviato se entrambi queste condizioni sono vere:

1 Il metodo HTTP è "sicuro" (esempio GET, ma non POST).

    La lista completa di metodi HTTP si trova nelle specifiche: [RFC7231 specification](https://tools.ietf.org/html/rfc7231). Generalmente questi metodi dovrebbero essere utilizzati per la lettura, ma non per la scrittura dei dati. Non dovrebbero eseguire alcuna operazione per la modifica dei dati. L'apertura di un link è sempre GET, quindi sicura.

2 L'operazione esegue navigazione top-level (cambia l'URL nella barra di indirizzo del browser).

    Questo solitamente è vero, ma se la navigazione viene effettuata in un `<iframe>`, allora non è top-level. Inoltre metodi JavaScript per richieste dal network non eseguono nessuna navigazione, dunque non sono applicabili.

Quindi, ciò che `samesite=lax` fa è semplicemente garantire alla più comune operazione "vai al seguente URL" di avere cookies. Esempio aprire un sito internet da un link all'interno di appunti soddisfa queste condizioni.

Se questo ti è sufficiente, aggiungere `samesite=lax` probabilmente non intaccherà l'esperienza utente e, allo stesso tempo, aggiungerà protezione.

<<<<<<< HEAD
Generalmente, `samesite` è un'ottima scelta.
=======
Overall, `samesite` is a great option.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Ma c'è uno svantaggio:

- `samesite` viene ignorato (non è supportato) dai vecchi browser, dal 2017 circa.

**Quindi se ci affidiamo a `samesite` per garantire protezione, allora i vecchi browser saranno vulnerabili.**

Possiamo comunque utilizzare `samesite` insieme ad altre misure di protezione, come xsrf tokens, per aggiungere un altro livello di difesa e, in futuro, quando i vecchi  browser verranno deprecati, probabilmente potremo utilizzare i token xsrf.

## httpOnly

Questa opzione non ha nulla a che vedere con JavaScript, ma dobbiamo menzionarla per completezza.

Il web-server usa l'header `Set-Cookie` per impostare un cookie e potrebbe impostare l'opzione `httpOnly`.

Questa opzione proibisce qualsiasi accesso a JavaScript per quel cookie. Non possiamo vederlo ne manipolarlo utilizzando `document.cookie`.

Questo viene utilizzato come precauzione, per proteggere da alcuni attacchi in cui un hacker inietta il proprio codice JavaScript nella pagina e aspetta che un utente visiti quella pagina. Questo non dovrebbe essere possibile in ogni caso, poiché un hacker non dovrebbe essere in grado di iniettare il proprio codice all'interno del nostro sito, ma potrebbero esserci dei bug che gli permetterebbero questa azione.


Normalmente, nel caso in cui accade una cosa del genere, ed un utente visita un sito con il codice JavaScript dell'hacker, in quel caso il codice verrà eseguito e otterrà accesso a `document.cookie` con i cookies dell'utente contenenti le informazioni di autenticazione. Questo è un male.

Ma se un cookie è `httpOnly`, allora il `document.cookie` non verrà mostrato, cosi è protetto.

## Appendice: funzioni utili per i Cookie

Qui vediamo un paio di funzioni utili per lavorare con i cookies, più conveniente di una modifica manuale di `document.cookie`.

<<<<<<< HEAD
Esistono tante librerie per i cookie, quindi queste sono semplicemente per dimostrazione, ma comunque perfettamente funzionanti.

=======
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78
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

### setCookie(name, value, options)

Imposta il `name` del cookie al `value` dato con `path=/` di default (può essere modificato per aggiungerne altri valori di default):

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // aggiungi altri percorsi di default se necessario
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
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

```warn header="L'aggiornamento o al rimozione deve utilizzare lo stesso path e domain"
Notare che quando aggiorniamo o cancelliamo un cookie, dobbiamo usare esattamente lo stesso percorso e opzioni di dominio
usate quando è stato creato.
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

Naturalmente, alcune persone non amano essere tracciate, cosi il browser fornisce la possibilità di disabilitare questi cookies.

Inoltre, browser moderni impiegano policy speciali per questi cookies:

- Safari non permette cookie di terze parti.
- Firefox possiede una "black list" di domini di terze parti in cui bloccano i cookies di terze parti.


```smart
Se carichiamo un script da un dominio di terze parti, ad esempio `<script src="https://google-analytics.com/analytics.js">`, e quello script usa 'document.cookie' per impostare un cookie, allora questo cookie non è un cookie third party.

Se uno script imposta un cookie, allora indipendentemente da dove provenga lo script -- il cookie appartiene al dominio della pagina corrente.

```

## Appendice: GDPR

Questo argomento non è legato a JavaScript, ma è qualcosa da tenere a mente mentre si impostano i cookies.

Esiste una legislazione in Europa chiamata GDPR, che rinforza il gruppo di regole dei siti internet per rispettare la privacy dell'utente. E una di queste regole richiede un permesso esplicito per tracciare i cookies di un utente.

Notare che questo consenso riguarda solo cookies tracciamento/identificazione/autorizzazione.

Dunque, se impostiamo un cookie che salva solo alcune informazioni, ma non traccia ne identifica l'utente, allora siamo liberi di poterlo creare.

Se impostiamo un cookie con una sessione di autenticazione o un id di tracciamento, allora dobbiamo richiedere autorizzazione all'utente.
I siti internet generalmente hanno due varianti per seguire il GDPR. Dovresti averle già incontrate navigando nel web:

1. Se un sito vuole impostare cookies di tracciamento solo per utenti verificati.

    Per fare questo, il documento di registrazione dovrebbe avere una casella con scritto 'accetta le nostre direttive di privacy' (che descrivono come i cookies sono usati), e l'utente dovrà spuntare la casella affinché il sito sia libero di impostare i cookies di autenticazione.

2. Se un sito vuole impostare cookies di tracciamento per chiunque.

    Per fare ciò legalmente, un sito mostra uno 'splash screen', per i nuovi visitatori e richiede loro di accettare i cookies. In seguito il sito può impostarli e permette alle persone di vederne il contenuto. Questo potrebbe essere disturbante per i nuovi visitatori. A nessuno piace vedere una finestra must-click' anziché il contenuto. Ma il GDPR richiede un contratto esplicito.

GDPR non riguarda solo i cookies, ma anche altri problemi legati alla privacy, ma questo va al di fuori di questa guida.


## Riepilogo

<<<<<<< HEAD
`document.cookie` fornisce l'accesso ai cookies
- opera la modifica solamente nei cookies menzionati al suo interno.
- name/value devono essere codificati.
- un cookie può contenere fino a 4kb, 20+cookies per sito (dipende dal browser).
=======
`document.cookie` provides access to cookies.
- Write operations modify only cookies mentioned in it.
- Name/value must be encoded.
- One cookie may not exceed 4KB in size. The number of cookies allowed on a domain is around 20+ (varies by browser).
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

Opzioni dei cookie:
- `path=/`, il percorso di default, rende il cookie visibile solo all'interno di quel percorso.
- `domain=site.com`, di default un cookie è visibile solo nel domino corrente. Se esplicito nel dominio, rende il cookie visibile nei sotto domini.
- `expires` or `max-age` imposta la scadenza del cookie, senza questa informazioni, il cookie viene cancellato quando il browser viene chiuso.
- `secure` rende un cookie HTTPS-only.
- `samesite` non permette al browser di inviare il cookie con richieste provenienti da siti esterni, aiuta a prevenire attacchi XSRF.

In aggiunta:
- Cookies di terze parti potrebbero essere bloccati dal browser, esempio Safari è impostato in questo modo di default.
- Quando si imposta un cookie di tracciamento per cittadini Europei, il GDPR impone di richiedere il permesso all'utente.
