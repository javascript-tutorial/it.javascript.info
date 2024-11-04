# Comunicazione cross-window

La politica di "Same Origin" ("stessa origine", ovvero stesso sito) limita il reciproco accesso tra finestre ed iframe diversi.

L'idea è che, se un utente ha due pagine aperte: una su `john-smith.com`, ed un'altra su `gmail.com`, allora non si vorrà che uno script in esecuzione su `john-smith.com` possa leggere tutte le email dalla finestra di `gmail.com`. Quindi, lo scopo della politica "Same Origin" è quello di proteggere l'utente dal furto di informazioni.

## Same Origin [#same-origin]

Due URL vengono definiti come appartenenti alla "stessa origine" solo se possiedono lo stesso protocollo, dominio e porta.

Ad esempio, questi URL condividono la stessa origine:

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

Questi invece no:

- <code>http://<b>www.</b>site.com</code> (dominio differente: `www.` è diverso)
- <code>http://<b>site.org</b></code> (dominio differente: `.org` è diverso)
- <code><b>https://</b>site.com</code> (protocollo differente: `https`)
- <code>http://site.com:<b>8080</b></code> (porta differente: `8080`)

La politica di "Same Origin" afferma che:

- se abbiamo un riferimento ad un'altra finestra, ad esempio un popup creato tramite `window.open` oppure una finestra all'interno di un `<iframe>`, e queste finestre appartengono alla stessa origine, allora avremo pieno accesso ad esse.
- altrimenti, se queste provengono da origini differenti, allora non potremo accedere al contenuto della finestra: alle variabili, il suo document, e qualsiasi altra informazione. L'unica eccezione è sulla proprietà `location`: possiamo modificarla (reindirizzando l'utente). Ma non possiamo *leggerne* il contenuto (quindi non possiamo sapere in quale sito si trova l'utente in un dato momento, nessuna informazione viene esposta).

### In azione: iframe

Un tag `<iframe>` permette di incorporare una finestra separata, con i propri oggetti `document` e `window`.

Possiamo accedervi utilizzando le proprietà:

- `iframe.contentWindow` per ottenere il riferimento alla finestra all'interno di `<iframe>`.
- `iframe.contentDocument` per ottenere il riferimento al document all'interno di `<iframe>`, abbreviazione per `iframe.contentWindow.document`.

Quando accediamo a qualche proprietà della finestra incorporata, il browser verificherà se l'iframe appartiene alla stessa origine. Se cosi non è, allora l'accesso verrà negato (rimane l'eccezione sulla scrittura di `location`, che è comunque permessa).

Ad esempio, proviamo a leggere e scrivere su un `<iframe>` da un'altra origine:

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // possiamo ottenere il riferimento alla finestra integrata
*!*
    let iframeWindow = iframe.contentWindow; // OK
*/!*
    try {
      // ...ma non al suo document
*!*
      let doc = iframe.contentDocument; // ERROR
*/!*
    } catch(e) {
      alert(e); // Security Error (origine diversa)
    }

    // non possiamo nemmeno LEGGERE l'URL di un iframe
    try {
      // Non possiamo leggere l'URL dall'oggetto Location
*!*
      let href = iframe.contentWindow.location.href; // ERROR
*/!*
    } catch(e) {
      alert(e); // Security Error
    }

    // ...possiamo però SCRIVERE sulla proprietà location (e questo caricherà un'altra pagina nell'iframe)!
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

    iframe.onload = null; // ripuliamo l'handler, per evitare che venga eseguito dopo il cambio di location
  };
</script>
```

Il codice sopra genera errori in tutti i casi ad eccezione di:

- Lettura del riferimento alla finestra interna `iframe.contentWindow`, la quale è permessa.
- Scrittura su `location`.

Al contrario, se l'`<iframe>` proviene dalla stessa origine, possiamo eseguire qualsiasi operazione:

```html run
<!-- iframe dallo stesso sito -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // qualsiasi operazione
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
L'evento di `iframe.onload` (nel tag `<iframe>`) equivale a `iframe.contentWindow.onload` (nell'oggetto della finestra incorporata). Si innesca quando la finestra integrata completaa il caricamento con tutte le risorse.

...Ma non possiamo accedere a `iframe.contentWindow.onload` per un iframe che appartiene ad un'altra origine, utilizzando `iframe.onload`.
```

## Finestre di sotto-domini: document.domain

Per definizione, due URL con domini differenti appartengono ad origini differenti.

Ma se le due finestre condividono lo stesso dominio di secondo livello, ad esempio `john.site.com`, `peter.site.com` e `site.com` (il loro dominio di secondo livello comune è `site.com`), possiamo far si che il browser ignori la differenza, in questo modo verranno trattate come se provenissero dalla "stessa origine", per gli scopi della comunicazione tra finestre.

Per far si che questo funzioni, ogni finestra dovrà eseguire il seguente codice:

```js
document.domain = 'site.com';
```

Questo è tutto. Da questo momento in poi potranno interagire senza limitazioni. Nuovamente, questo è possibile solamente per pagine che appartengono allo stesso dominio di secondo livello.

<<<<<<< HEAD
## Iframe: il tranello del document errato
=======
```warn header="Deprecated, but still working"
The `document.domain` property is in the process of being removed from the [specification](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction). The cross-window messaging (explained soon below) is the suggested replacement.

That said, as of now all browsers support it. And the support will be kept for the future, not to break old code that relies on `document.domain`.
```


## Iframe: wrong document pitfall
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Quando un iframe appartiene alla stessa origine, con la possibilità quindi di accedere al suo `document`, c'è un piccolo tranello a cui prestare attenzione. Non è strettamente legato al cross-origin, ma è comunque importante esserne a conoscenza.

Al momento della creazione, un iframe genera immediatamente un document. Ma quest'ultimo è diverso da quello che verrà caricato internamente!

Quindi, qualsiasi operazione effettuata sul document negli istanti dopo al creazione, andrà probabilmente persa.

Vediamo un esempio di quanto affermato:


```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // il document caricato non equivale a quello iniziale!
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

Dovremmo evitare di effettuare operazioni sul document di un iframe non ancora completamente caricato, poiché questo è il *document sbagliato*. Qualsiasi gestore di evento ad esso collegato, verrà ignorato.

Come possiamo assicurarci che il document sia quello corretto?

Per essere sicuri di lavorare con il document corretto, dovremmo attendere fin quando verrà emesso l'evento `iframe.onload`. Il quale verrà innescato solamente una volta che l'iframe avrà caricato tutte le risorse.

Possiamo provare ad intercettarlo anticipatamente effettuando controlli all'interno di un `setInterval`:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // ogni 100ms verifichiamo se è stato generato il nuovo document
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

    alert("New document is here!");

    clearInterval(timer); // cancelliamo il setInterval, non ne abbiamo più bisogno
  }, 100);
</script>
```

## Collection: window.frames

Un modo alternativo per ottenere l'oggetto relativo ad una finestra di `<iframe>`, è quello di accedervi tramite la collection `window.frames`:

- Tramite indice: `window.frames[0]`: l'oggetto relativo alla prima finestra di iframe nel document.
- By name: `window.frames.iframeName`: l'oggetto relativo all'iframe con `name="iframeName"`.

Ad esempio:

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

Un iframe potrebbe possedere a sua volta degli iframe. I rispettivi oggetti `window` formeranno una gerarchia.

E' possibile navigare tra le finestre della gerarchia utilizzando:

- `window.frames`: la collezione delle finestre "figlie" (per iframe annidati).
- `window.parent`: il riferimento alla finestra "genitore" (quella esterna).
- `window.top`: il riferimento alla finestra in cima alla gerarchia.

Ad esempio:

```js run
window.frames[0].parent === window; // true
```

Possiamo utilizzare la proprietà `top` per verificare se il document corrente è aperto all'interno di un iframe o no:

```js run
if (window == top) { // window == window.top?
  alert('The script is in the topmost window, not in a frame');
} else {
  alert('The script runs in a frame!');
}
```

## L'attributo "sandbox" per iframe

L'attributo `sandbox` permette l'esclusione di determinate azioni all'interno di un `<iframe>`, in modo da prevenire l'esecuzione di codice non affidabile. Consente di "isolare" ("sandbox") l'iframe, facendo si che venga trattato come se appartenesse ad un origine diversa e/o applicando altre limitazioni.

Ci sono una serie di restrizioni "applicate di default" per un `<iframe sandbox src="...">`. Ma possono essere disattivate esplicitamente fornendo, come valore dell'attributo, la lista delle restrizioni da non applicare separate da un carattere di spazio, in questo modo: `<iframe sandbox="allow-forms allow-popups">`.

In altre parole, un attributo `"sandbox"` vuoto, applica tutte le restrizioni, ma possiamo fornirgli la lista di quelle che vogliamo disattivare, separandole con uno spazio.

Di seguito la lista delle limitazioni:

`allow-same-origin`
: Di default l'attributo `"sandbox"` forza la politica di "diversa origine" per un iframe. In altre parole, fa sì che il browser tratti l'`iframe` come se appartenesse ad un origine diversa, anche se in realtà il suo `src` sta puntando allo stesso sito. Con tutte le relative implicazioni viste prima. Questa opzione disabilita la restrizione.

`allow-top-navigation`
: Permette all'iframe` di cambiare `parent.location`.

`allow-forms`
: Permette l'invio di forms dall'`iframe`.

`allow-scripts`
: Permette l'esecuzione di script dall'`iframe`.

`allow-popups`
: Permette all'`iframe` l'apertura di finestre di popup tramite `window.open`

Consulta [il manuale](mdn:/HTML/Element/iframe) per maggiori informazioni.

L'esempio sotto dimostra un iframe "isolato" con le restrizioni di default attivate: `<iframe sandbox src="...">`. Contiene del codice JavaScript ed un form.

Avrete notato che nulla di ciò che è presente funziona. Quindi le restrizioni di default sono piuttosto restrittive:

[codetabs src="sandbox" height=140]


```smart
Lo scopo dell'attributo `"sandbox"` è solamente quello di *aggiungere più* restrizioni, non di rimuoverle. In particolare, non può essere utilizzato per disabilitare la restrizione di "Same Origin" per iframe appartenenti ad origini differenti.
```

## Messaggi Cross-window

L'interfaccia `postMessage` permette alle finestre di comunicare indistintamente dall'origine di appartenenza.

Quindi, è di fatto un modo per aggirare la politica di "Same Origin". Consente infatti ad una finestra proveniente da `john-smith.com` di comunicare con `gmail.com` e scambiarsi informazioni, ma solamente nel caso in cui entrambe acconsentono questo comportamento ed invocano le rispettive funzioni JavaScript. Questo rende il meccaniscmo di comunicazione tra finestre sicuro per l'utente.

L'interfaccia è composta da due parti.

### postMessage

La finestra che vuole inviare un messaggio invoca il metodo [postMessage](mdn:api/Window.postMessage) della finestra destinataria. In altre parole, se volessimo inviare un messaggio a `win`, dovremmo invocare `win.postMessage(data, targetOrigin)`.

Argomenti:

`data`
: I dati da inviare. Possono essere un qualsiasi oggetto, che verrà poi duplicato utilizzando "l'algoritmo di serializzazione strutturato". IE supporta solamente stringhe, quindi dovremo utilizzare `JSON.stringify` per supportarlo.

`targetOrigin`
: Specifica l'origine per la finestra target, in questo modo il messaggio verrà ricevuto solamente dalla giusta finestra.

<<<<<<< HEAD
Il parametro `targetOrigin` è una misura di sicurezza. Ricordate, se una finestra target appartiene ad una diversa origine, non possiamo leggere la sua `location` nella finestra mittente. Quindi non possiamo essere certi di quale sito sia aperto nella finestra a cui vogliamo inviare il messaggio: l'utente potrebbe aver cambiato sito, senza che la finestra mittente ne sia al corrente.
=======
The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can't read its `location` in the sender window. So we can't be sure which site is open in the intended window right now: the user could navigate away, and the sender window has no idea about it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Specificando la proprietà `targetOrigin` ci assicuriamo che la finestra riceva i dati solamente se si trova nel sito che ci aspettiamo li riceva. Questa caratteristica è molto importante, specialmente per dati sensibili.

Ad esempio, in questo caso `win` riceverà il messaggio solamente se si trova nel sito `http://example.com`:

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

Se non abbiamo intenzione di effettuare tale verifica, possiamo impostare `targetOrigin` a `*`.

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

*!*
  win.postMessage("message", "*");
*/!*
</script>
```


### onmessage

Per poter ricevere un messaggio, la finestra target deve aver definito un handler per gestire l'evento `message`. Questo verrà innescato al momento dell'invocazione di `postMessage` (se la verifica del `targetOrigin` avrà successo).

L'oggetto innescato dall'evento possiede le seguenti proprietà:

`data`
: I dati inviati da `postMessage`.

`origin`
: L'origine del mittente, ad esempio `http://javascript.info`.

`source`
: Il riferimento alla finestra mittente. Potremmo quindi rispondere immediatamente utilizzando `source.postMessage(...)`, se è ciò che vogliamo fare.

Per assegnare il gestore, dovremo utilizzare `addEventListener`. Non abbiamo a disposizione la sintassi abbreviata `window.onmessage`,

Vediamo un esempio:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // qualcosa da un dominio sconosciuto, lo ignoriamo
    return;
  }

  alert( "received: " + event.data );

  // rispondiamo al messaggio utilizzando event.source.postMessage(...)
});
```

Ecco l'esempio completo:

[codetabs src="postmessage" height=120]

## Riepilogo

Per poter invocare metodi ed accedere al contenuto di un'altra finestra, dobbiamo come prima cosa ottenere un riferimento ad essa.

Per le finestre di popup abbiamo i seguenti riferimenti:
- Dalla finestra che innesca l'apertura: `window.open`, consente di aprire una nuova finestra e ne ritorna il riferimento,
- Dalla finestra di popup: `window.opener`, è il riferimento alla finestra che ha innescato l'apertura.

Per gli iframe, possiamo accedere alle finestre genitrici/figlie utilizzando:
- `window.frames`, una collection di oggetti relativi alle finestre annidate,
- `window.parent`, `window.top` sono i riferimenti alle finestre genitrici e figlia,
- `iframe.contentWindow` è la finestra all'interno di un tag `<iframe>`.

Se le finestre condividono la stessa origine (host, porta e protocollo), allora queste potranno accedere reciprocamente alle proprietà.

Altrimenti, le uniche azioni possibili saranno:
- Cambio di `location` di un'altra finestra (accesso in scrittura).
- Inviare un messaggio.

Le uniche eccezioni sono:
- Finestre che condividono lo stesso dominio di secondo livello: `a.site.com` e `b.site.com`. E che abbiano entrambe impostato: `document.domain='site.com'`. In questo caso verranno interpretate come appartenenti alla stessa origine.
- Se un iframe possiede l'attributo `sandbox`, allora questo verrà forzato ad uno stato di "origine differente", a meno che non venga esplicitamente disattivato passando come valore dell'attributo `allow-same-origin`. In questo caso verrà permessa l'esecuzione di codice esterno all'interno dell'iframe (se appartengono alla stessa origine).

L'interfaccia `postMessage` consente a due finestre, qualsiasi sia la loro origine, di comunicare:

1. Il mittente invocherà `targetWin.postMessage(data, targetOrigin)`.
2. Se `targetOrigin` non è impostato a `'*'`, allora il browser verificherà se la finestra `targetWin` appartiene all'origine `targetOrigin`.
3. Se questo è il caso, allora `targetWin` innescherà l'evento `message`, il quale possiede le seguenti proprietà:
    - `origin`: l'origine della finestra mittente (ad esempio `http://my.site.com`)
    - `source`: il riferimento alla finestra mittente.
    - `data`: i dati inviati, sono supportati tutti i tipi di oggetto, ad eccezione di IE che accetta solamente stringhe.

    Dobbiamo utilizzare `addEventListener` all'interno delle finestra target per impostare il gestore dell'evento.
