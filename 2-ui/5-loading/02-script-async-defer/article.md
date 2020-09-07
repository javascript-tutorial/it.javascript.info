
# Scripts: async, defer

Nei moderni browser gli script sono spesso "più pesanti" dell'HTML: la loro dimensione di download è maggiore e anche i tempi di processamento sono più lunghi.

<<<<<<< HEAD
Quando il browser carica l'HTML e si imbatte in un tag `<script>...</script>` non può continuare a costruire il DOM. Deve eseguire lo script al momento. Lo stesso avviene per script esterni `<script src="..."></script>`: il browser deve aspettere che lo script venga scaricato, eseguito e solo dopo può processare il resto della pagina. 
=======
When the browser loads HTML and comes across a `<script>...</script>` tag, it can't continue building the DOM. It must execute the script right now. The same happens for external scripts `<script src="..."></script>`: the browser must wait until the script downloads, execute it, and only after process the rest of the page.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Questo conduce a 2 importanti problematiche:

<<<<<<< HEAD
1. Gli script non possono vedere gli elementi del DOM sotto di essi e quindi non possono aggiungere handler,ecc.
2. Se c'è uno script di grandi dimensioni all'inzio della pagina esso "bloccherà la pagina". Gli utente non potranno vedere il contenuto della pagina fino a quando lo script verrà scaricato ed eseguito: 
=======
1. Scripts can't see DOM elements below them, so they can't add handlers etc.
2. If there's a bulky script at the top of the page, it "blocks the page". Users can't see the page content till it downloads and runs:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```html run height=100
<p>...contenuto prima dello script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- This isn't visible until the script loads -->
<p>...contenuto dopo lo script...</p>
```

Ci sono alcuni accorgimenti per avere il comportamente desiderato. Per esempio, possiamo mettere lo script in fondo alla pagina. In questo modo vedrà gli elementi sopra di esso e non bloccherà la visualizzazione della pagina:

```html
<body>
  ...tutto il contenuto è prima dello script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

Ma questa soluzione è lontana dall'essere perfetta. Per esempio, il browser si accorge dello script (e può iniziarlo a scaricare) solo dopo che è stato scaricato tutto il documento HTML. Per pagine HTML molto lunghe ci potrebbe essere un notevole ritardo nel caricamento dello script.

<<<<<<< HEAD
Such things are invisible for people using very fast connections, but many people in the world still have slower internet speeds and use far-from-perfect mobile internet. Queste cose sono invisibili per persone che utilizzano una connessione molto veloce ma molte persone nel mondo hanno ancora una connessione Internet più lenta e utilizzano connessioni mobile molto scarse.
=======
Such things are invisible for people using very fast connections, but many people in the world still have slow internet speeds and use a far-from-perfect mobile internet connection.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Fortunatamente, ci sono 2 attributi del tag `<script>` che risolvono il problema per noi: `defer` e `async`.

## defer

<<<<<<< HEAD
L'attributo `defer` dice al browser che che deve continuare nel caricamento della pagina e caricare lo script "in background", per poi eseguire lo script quando è caricato.
=======
The `defer` attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads "in the background", and then runs when the DOM is fully built. 
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Di seguito lo stesso esempio di sopra, ma con `defer`:

```html run height=100
<p>...contenuto prima dello script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- visible immediately -->
<p>...contenuto dopo lo script...</p>
```

<<<<<<< HEAD
- Gli script con `defer` non bloccano mai la pagina
- Gli script con `defer` vengono sempre eseguiti quando il DOM è pronto, ma prima dell'evento `DOMContentLoaded`.

Il seguente esempio lo dimostra:
=======
In other words:

- Scripts with `defer` never block the page.
- Scripts with `defer` always execute when the DOM is ready (but before `DOMContentLoaded` event).

The following example demonstrates the second part:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```html run height=100
<p>...contenuto prima dello script...</p>

<script>
<<<<<<< HEAD
  document.addEventListener('DOMContentLoaded', () => alert("DOM pronto dopo defer!")); // (2)
=======
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...contenuto dopo lo script...</p>
```

<<<<<<< HEAD
1. Il contenuto della pagina viene visualizzato immediatamente.
2. `DOMContentLoaded` aspetta il caricamento degli script con l'attributo defer. Scatta solo quando lo script `(2)` è scaricato ed eseguito. 

Gli script con defer mantengono il loro ordine, come avviene per i normali script

Quindi, se abbiamo prima uno script lungo e poi uno più piccolo, quest'ultimo dovrà aspettare.
=======
1. The page content shows up immediately.
2. `DOMContentLoaded` event handler waits for the deferred script. It only triggers when the script is downloaded and executed.

**Deferred scripts keep their relative order, just like regular scripts.**

Let's say, we have two deferred scripts: the `long.js` and then `small.js`:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

<<<<<<< HEAD
```smart header="Lo script piccolo viene scaricato prima, ma eseguito per secondo"
I browser scansionano la pagina per trovare gli script e li scarica in parallelo, per migliorare le performance. Quindi nell'esempio sopra entrambi gli script sono scaricati in parallelo. `small.js` probabilmente verrà scaricato prima.  

Ma le specifiche indicano che gli script devono essere eseguito secondo l'ordine nel document, quindi `small.js` aspetterà `long.js` per essere eseguito.
```
=======
Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The `small.js` probably finishes first.

...But the `defer` atribute, besides telling the browser "not to block", ensures that the relative order is kept. So even though `small.js` loads first, it still waits and runs after `long.js` executes.

That may be important for cases when we need to load a JavaScript library and then a script that depends on it.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```smart header="L'attributo `defer` è valido solo per script esterni
L'attributo `defer` viene ignorato se il tag `<script>` non ha l'attributo `src`.
```

## async

<<<<<<< HEAD
L'attributo `async` indica che uno script è completamente indipendente:

- La pagina non aspetta gli script con async, il contenuto viene processato e visualizzato
- `DOMContentLoaded` and async scripts don't wait each other:
    - `DOMContentLoaded` può scattare prima di uno script async (se lo script finisce di caricarsi dopo che il caricamento della pagina è terminato)
    - ...o dopo uno script `async` (se lo script è corto o era cachato)
- Anche gli altri script non aspettano il caricamento degli script `async`, e gli script `async` non aspettano il caricamento degli altri script.
=======
The `async` attribute is somewhat like `defer`. It also makes the script non-blocking. But it has important differences in the behavior.

The `async` attribute means that a script is completely independent:

- The browser doesn't block on `async` scripts (like `defer`). 
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them. 
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don't wait for them, and they don't wait for anything. A fully independent script that runs when loaded. As simple, at it can get, right? 

<<<<<<< HEAD
Quindi, se abbiamo parecchi script `async`, potrebbero essere eseguiti in qualunque ordine. Qualunque di essi viene caricato prima -- viene eseguito prima:
=======
Here's an example similar to what we've seen with `defer`: two scripts `long.js` and `small.js`, but now with `async` instead of `defer`.

They don't wait for each other. Whatever loads first (probably `small.js`) -- runs first:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```html run height=100
<p>...contenuto prima degli script...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM pronto!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...contenuto dopo gli script...</p>
```

<<<<<<< HEAD
1. Il contenuto della pagina viene mostrato immediatamente: l'attributo `async` non lo blocca.
2. `DOMContentLoaded` potrebbe scattare sia prima che dopo gli script `async`, non c'è nesusna garanzia in questo caso.
3. Gli script async non si aspettano a vicenda. Uno script più piccolo come `small.js` è stato inserito nella pagina per secondo ma probabilmente verrà caricato prima di `long.js` e quindi anche eseguito per primo. Questo viene chiamato un ordine "load-first".
=======
- The page content shows up immediately: `async` doesn't block it.
- `DOMContentLoaded` may happen both before and after `async`, no guarantees here.
- A smaller script `small.js` goes second, but probably loads before `long.js`, so `small.js` runs first. Although, it might be that `long.js` loads first, if cached, then it runs first. In other words, async scripts run in the "load-first" order.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Gli script async sono ottimali quando dobbiamo integrare uno script di terze parti indipendente: contatori, ads, e così via, visto che essi non dipendono dai nostri script e i nostri script non devono aspettare il loro caricamento:

```html
<!-- Google Analytics viene aggiunto in questo modo di solito -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

<<<<<<< HEAD

## Script dinamici

Possiamo anche aggiungere uno script dinamicamente usando Javascript:
=======
## Dynamic scripts
 
There's one more important way of adding a script to the page.

We can create a script and append it to the document dynamically using JavaScript:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

Lo script inizia a caricarsi quando è allegato al document `(*)`.

**Gli script dinamici si comportano come quelli "async" di default.**

Cioè:
- Non aspettano nessun altro script e nessuno aspetta loro.
- Lo script che viene caricato per prima viene anche eseguito per primo (ordine "load-first")

<<<<<<< HEAD
Possiamo cambiare l'ordine "load-first" nell'ordine del document (come i normali script) settando l'attributo `async` a `false`:

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";

*!*
script.async = false;
*/!*

document.body.append(script);
```

Per esempio, in questo caso abbiamo aggiunto 2 script. Senza `script.async=false` verrebbero eseguito secondo l'ordine load-first (`small.js` probabilmente per primo). Ma con quel flag l'ordine diventa "come nel documento":
=======
This can be changed if we explicitly set `script.async=true`. Then scripts will be executed in the document order, just like `defer`.

In this example, `loadScript(src)` function adds a script and also sets `async` to `false`.

So `long.js` always runs first (as it's added first):
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js viene eseguito per primo grazie a async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

Without `script.async=false`, scripts would execute in default, load-first order (the `small.js` probably first).

Again, as with the `defer`, the order matters if we'd like to load a library and then another script that depends on it.


## Riepilogo

<<<<<<< HEAD
`async` e `defer` hanno una cosa in comune: il download di questi script non blocca il rendering della pagina. Quindi l'utente può leggere e comprendere il contenuto della pagina immediatamente. 
=======
Both `async` and `defer` have one common thing: downloading of such scripts doesn't block page rendering. So the user can read page content and get acquainted with the page immediately.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Ma ci sono anche differenze essenziali tra loro:

|         | Order | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Load-first order*. Il loro ordine nel documento non importa  -- dipende da quale script viene caricato prima |  Irrelevante. Potrebbe essere caricato ed eseguito mentre la pagina non è stata ancora stata scaricata. Questo avviene se gli script sono piccoli o cachati, e la pagina è abbastanza lunga. |
| `defer` | *Document order* (cioè come sono posizionati nella pagina). |Vengono eseguiti dopo che il document è stato caricato e parsato (aspettano se necessario), poco prima dell'evento `DOMContentLoaded`. |

<<<<<<< HEAD
```warn header="Una pagina senza script dovrebbe essere utilizzabile"
Ricordati che se stai usando `defer`, allora la pagina è visibile *prima* che lo script sia caricato.

Quindi l'utente potrebbe leggere la pagina ma probabilmente alcuni componenti grafici potrebbero essere non ancora pronti.

Dovrebbero esserci delle indicazioni di "caricamento" negli appositi spazi, i bottoni non funzionanti dovrebbero essere disabilitati, per mostrare chiaramente all'utente cosa è già pronto o cosa no.
```

In pratica, `defer` è utilizzato per script che hanno bisogno di tutto il DOM e/o l'ordine di esecuzione è importante. `async` è utilizzato per script indipendenti, come contatori o ads. E il loro ordine relative di esecuzione non conta.
=======
In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important. 

And  `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.

```warn header="Page without scripts should be usable"
Please note: if you're using `defer` or `async`, then user will see the the page *before* the script loads.

In such case, some graphical components are probably not initialized yet.

Don't forget to put "loading" indication and disable buttons that aren't functional yet. Let the user clearly see what he can do on the page, and what's still getting ready.
```
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
