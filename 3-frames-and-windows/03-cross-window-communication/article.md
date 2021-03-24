# Comuniaczione cross-window

La politcia di "Same Origin" ("stessa origine", ovvero stesso sito) limita il reciproco accesso tra finestre ed iframe diversi.

L'idea è che, se un utente ha deu pagine aperte: una su `john-smith.com`, ed un'altra su `gmail.com`, allora non vorrà che uno script ion esecuzione su `john-smith.com` possa leggere tutte le sue mail dalla finestra di `gmail.com`. Quindi, lo scopo della politica "Same Origin" è quello di proteggere l'utente dal furto di informazioni.

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
- altrimenti, se queste provengono da origini differenti, allora non potremo accedere al cotenuto della finestra: variables, il suo document, e qualsiasi altra informazione. L'unica eccezione è sulla proprietà `location`: possiamo modificarla (reindirizzando l'utente). Ma non possiamo *leggerne* il contenuto (quindi non possiamo sapere in quale sito si trova l'utente in un dato momento, nessuna infromazione viene trapelata).

### In azione: iframe

Un tag di `<iframe>` permette di incorporare una finestra separata, la quale avrà i suoi oggetti `document` e `window` separati.

Possiamo accedervi utilizzando le proprietà:

- `iframe.contentWindow` per ottenere il riferiemnto alla finestra all'interno di `<iframe>`.
- `iframe.contentDocument` per ottenere il riferimento al document all'interno di `<iframe>`, abbreviazione per `iframe.contentWindow.document`.

Quando accediamo a qualche proprietà della finestra incorporata, il browser verificherà se l'iframe appartiene alla stessa origine. Se cosi non è, allora l'accesso verrà negatp (rimane l'eccezione sulla scrittura di `location`, che è comunque permessa).

Ad esempio, proviamo a leggere e scrivere su un `<iframe>` da un'altra origine:

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // possiamo ottenere il riferiemento alla finestra integrata
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

Contrariamente a questo, se l'`<iframe>` proviene dalla stessa origine, possiamo farci qualsiasi cosa:

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

Ma se le due finestre condividono lo stesso dominio di secondo livello, ad esempio `john.site.com`, `peter.site.com` e `site.com` (il loro dominio di secondo livello comunue è `site.com`), possiamo far si che il browser ignori la differenza, in questo modo verrannop trattate come se provenissero dalla "stessa origine", per gli scopi della comunicazione tra finestre.

Per far si che questo funzioni, ogni finestra dovrà eseguire il seguente codice:

```js
document.domain = 'site.com';
```

Questo è tutto. Da questo momento in poi potranno interagire senza limitazioni. Nuovamente, questo è possibile solamente per pagine che possiedono lo stesso dominio di secondo livello.

## Iframe: il tranello del document errato

Quando un iframe appartine alla stessa origine, con la possibilità quindi di accere al suo `document`, c'è un piccolo tranello a cui prestare attenzione. Non è strettamente legato al cross-origin, ma è comunque importante esserne a consocenza.

Al momento della creazione, un iframe genera immediatamente un docuement. Ma quest utlimo è diverso da quello che verrà caricato internamente!

Quindi, se qualsiasi operazione effettuata sul document negli istanti dopo al creazione, andrà probabilmente persa.

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

Per essere sicuri di lavorare con il document corretto, dovremmo attendere fin quando verrà emesso l'evento `iframe.onload`. Il quale verrà innescato solemente una volta che l'iframe avrà caricato tutte le risorse.

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

Un modo alternativo per ottenere l'oggetto realtivo ad una finestra di `<iframe>`, è quello di accedervi tramite la collection `window.frames`:

- Tramite indice: `window.frames[0]`: l'oggetto relativo alla prima finestra di iframe nel document.
- By name: `window.frames.iframeName`: l'oggetto realtivo all'iframew con `name="iframeName"`.

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
- `window.parent`: il riferimento alla finestra "padre" (quella esterna).
- `window.top`: il riferiemento alla finestra in cima alla gerarchia.

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

The `sandbox` attribute allows for the exclusion of certain actions inside an `<iframe>` in order to prevent it executing untrusted code. It "sandboxes" the iframe by treating it as coming from another origin and/or applying other limitations.

There's a "default set" of restrictions applied for `<iframe sandbox src="...">`. But it can be relaxed if we provide a space-separated list of restrictions that should not be applied as a value of the attribute, like this: `<iframe sandbox="allow-forms allow-popups">`.

In other words, an empty `"sandbox"` attribute puts the strictest limitations possible, but we can put a space-delimited list of those that we want to lift.

Here's a list of limitations:

`allow-same-origin`
: By default `"sandbox"` forces the "different origin" policy for the iframe. In other words, it makes the browser to treat the `iframe` as coming from another origin, even if its `src` points to the same site. With all implied restrictions for scripts. This option removes that feature.

`allow-top-navigation`
: Allows the `iframe` to change `parent.location`.

`allow-forms`
: Allows to submit forms from `iframe`.

`allow-scripts`
: Allows to run scripts from the `iframe`.

`allow-popups`
: Allows to `window.open` popups from the `iframe`

See [the manual](mdn:/HTML/Element/iframe) for more.

The example below demonstrates a sandboxed iframe with the default set of restrictions: `<iframe sandbox src="...">`. It has some JavaScript and a form.

Please note that nothing works. So the default set is really harsh:

[codetabs src="sandbox" height=140]


```smart
The purpose of the `"sandbox"` attribute is only to *add more* restrictions. It cannot remove them. In particular, it can't relax same-origin restrictions if the iframe comes from another origin.
```

## Cross-window messaging

The `postMessage` interface allows windows to talk to each other no matter which origin they are from.

So, it's a way around the "Same Origin" policy. It allows a window from `john-smith.com` to talk to `gmail.com` and exchange information, but only if they both agree and call corresponding JavaScript functions. That makes it safe for users.

The interface has two parts.

### postMessage

The window that wants to send a message calls [postMessage](mdn:api/Window.postMessage) method of the receiving window. In other words, if we want to send the message to `win`, we should call  `win.postMessage(data, targetOrigin)`.

Arguments:

`data`
: The data to send. Can be any object, the data is cloned using the "structured serialization algorithm". IE supports only strings, so we should `JSON.stringify` complex objects to support that browser.

`targetOrigin`
: Specifies the origin for the target window, so that only a window from the given origin will get the message.

The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can't read it's `location` in the sender window. So we can't be sure which site is open in the intended window right now: the user could navigate away, and the sender window has no idea about it.

Specifying `targetOrigin` ensures that the window only receives the data if it's still at the right site. Important when the data is sensitive.

For instance, here `win` will only receive the message if it has a document from the origin `http://example.com`:

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

If we don't want that check, we can set `targetOrigin` to `*`.

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

To receive a message, the target window should have a handler on the `message` event. It triggers when `postMessage` is called (and `targetOrigin` check is successful).

The event object has special properties:

`data`
: The data from `postMessage`.

`origin`
: The origin of the sender, for instance `http://javascript.info`.

`source`
: The reference to the sender window. We can immediately `source.postMessage(...)` back if we want.

To assign that handler, we should use `addEventListener`, a short syntax `window.onmessage` does not work.

Here's an example:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // something from an unknown domain, let's ignore it
    return;
  }

  alert( "received: " + event.data );

  // can message back using event.source.postMessage(...)
});
```

The full example:

[codetabs src="postmessage" height=120]

## Summary

To call methods and access the content of another window, we should first have a reference to it.

For popups we have these references:
- From the opener window: `window.open` -- opens a new window and returns a reference to it,
- From the popup: `window.opener` -- is a reference to the opener window from a popup.

For iframes, we can access parent/children windows using:
- `window.frames` -- a collection of nested window objects,
- `window.parent`, `window.top` are the references to parent and top windows,
- `iframe.contentWindow` is the window inside an `<iframe>` tag.

If windows share the same origin (host, port, protocol), then windows can do whatever they want with each other.

Otherwise, only possible actions are:
- Change the `location` of another window (write-only access).
- Post a message to it.

Exceptions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.

The `postMessage` interface allows two windows with any origins to talk:

1. The sender calls `targetWin.postMessage(data, targetOrigin)`.
2. If `targetOrigin` is not `'*'`, then the browser checks if window `targetWin` has the origin `targetOrigin`.
3. If it is so, then `targetWin` triggers the `message` event with special properties:
    - `origin` -- the origin of the sender window (like `http://my.site.com`)
    - `source` -- the reference to the sender window.
    - `data` -- the data, any object in everywhere except IE that supports only strings.

    We should use `addEventListener` to set the handler for this event inside the target window.
