
# Scripts: async, defer

Nei moderni browser gli script sono spesso "più pesanti" dell'HTML: la loro dimensione di download è maggiore e anche i tempi di processamento sono più lunghi.

<<<<<<< HEAD
Quando il browser carica l'HTML e si imbatte in un tag `<script>...</script>` non può continuare a costruire il DOM. Deve eseguire lo script al momento. Lo stesso avviene per script esterni `<script src="..."></script>`: il browser deve aspettere che lo script venga scaricato, eseguito e solo dopo può processare il resto della pagina. 
=======
When the browser loads HTML and comes across a `<script>...</script>` tag, it can't continue building the DOM. It must execute the script right now. The same happens for external scripts `<script src="..."></script>`: the browser must wait until the script downloads, execute it, and only after process the rest of the page.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

Questo conduce a 2 importanti problematiche:

<<<<<<< HEAD
1. Gli script non possono vedere gli elementi del DOM sotto di essi e quindi non possono aggiungere handler,ecc.
2. Se c'è uno script di grandi dimensioni all'inzio della pagina esso "bloccherà la pagina". Gli utente non potranno vedere il contenuto della pagina fino a quando lo script verrà scaricato ed eseguito: 
=======
1. Scripts can't see DOM elements below them, so they can't add handlers etc.
2. If there's a bulky script at the top of the page, it "blocks the page". Users can't see the page content till it downloads and runs:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

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
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

Fortunatamente, ci sono 2 attributi del tag `<script>` che risolvono il problema per noi: `defer` e `async`.

## defer

L'attributo `defer` dice al browser che che deve continuare nel caricamento della pagina e caricare lo script "in background", per poi eseguire lo script quando è caricato.

Di seguito lo stesso esempio di sopra, ma con `defer`:

```html run height=100
<p>...contenuto prima dello script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- visible immediately -->
<p>...contenuto dopo lo script...</p>
```

- Gli script con `defer` non bloccano mai la pagina
- Gli script con `defer` vengono sempre eseguiti quando il DOM è pronto, ma prima dell'evento `DOMContentLoaded`.

Il seguente esempio lo dimostra:

```html run height=100
<p>...contenuto prima dello script...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM pronto dopo defer!")); // (2)
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...contenuto dopo lo script...</p>
```

<<<<<<< HEAD
1. Il contenuto della pagina viene visualizzato immediatamente.
2. `DOMContentLoaded` aspetta il caricamento degli script con l'attributo defer. Scatta solo quando lo script `(2)` è scaricato ed eseguito. 
=======
1. The page content shows up immediately.
2. `DOMContentLoaded` waits for the deferred script. It only triggers when the script `(2)` is downloaded and executed.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

Gli script con defer mantengono il loro ordine, come avviene per i normali script

Quindi, se abbiamo prima uno script lungo e poi uno più piccolo, quest'ultimo dovrà aspettare.

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

```smart header="Lo script piccolo viene scaricato prima, ma eseguito per secondo"
I browser scansionano la pagina per trovare gli script e li scarica in parallelo, per migliorare le performance. Quindi nell'esempio sopra entrambi gli script sono scaricati in parallelo. `small.js` probabilmente verrà scaricato prima.  

Ma le specifiche indicano che gli script devono essere eseguito secondo l'ordine nel document, quindi `small.js` aspetterà `long.js` per essere eseguito.
```

```smart header="L'attributo `defer` è valido solo per script esterni
L'attributo `defer` viene ignorato se il tag `<script>` non ha l'attributo `src`.
```


## async

L'attributo `async` indica che uno script è completamente indipendente:

<<<<<<< HEAD
- La pagina non aspetta gli script con async, il contenuto viene processato e visualizzato
- `DOMContentLoaded` and async scripts don't wait each other:
    - `DOMContentLoaded` può scattare prima di uno script async (se lo script finisce di caricarsi dopo che il caricamento della pagina è terminato)
    - ...o dopo uno script `async` (se lo script è corto o era cachato)
- Anche gli altri script non aspettano il caricamento degli script `async`, e gli script `async` non aspettano il caricamento degli altri script.
=======
- The page doesn't wait for async scripts, the contents are processed and displayed.
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648


Quindi, se abbiamo parecchi script `async`, potrebbero essere eseguiti in qualunque ordine. Qualunque di essi viene caricato prima -- viene eseguito prima:

```html run height=100
<p>...contenuto prima degli script...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM pronto!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...contenuto dopo gli script...</p>
```

1. Il contenuto della pagina viene mostrato immediatamente: l'attributo `async` non lo blocca.
2. `DOMContentLoaded` potrebbe scattare sia prima che dopo gli script `async`, non c'è nesusna garanzia in questo caso.
3. Gli script async non si aspettano a vicenda. Uno script più piccolo come `small.js` è stato inserito nella pagina per secondo ma probabilmente verrà caricato prima di `long.js` e quindi anche eseguito per primo. Questo viene chiamato un ordine "load-first".

Gli script async sono ottimali quando dobbiamo integrare uno script di terze parti indipendente: contatori, ads, e così via, visto che essi non dipendono dai nostri script e i nostri script non devono aspettare il loro caricamento:

```html
<!-- Google Analytics viene aggiunto in questo modo di solito -->
<script async src="https://google-analytics.com/analytics.js"></script>
```


## Script dinamici

Possiamo anche aggiungere uno script dinamicamente usando Javascript:

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
=======
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";

*!*
script.async = false;
*/!*

document.body.append(script);
```

Per esempio, in questo caso abbiamo aggiunto 2 script. Senza `script.async=false` verrebbero eseguito secondo l'ordine load-first (`small.js` probabilmente per primo). Ma con quel flag l'ordine diventa "come nel documento":

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


## Riepilogo

<<<<<<< HEAD
`async` e `defer` hanno una cosa in comune: il download di questi script non blocca il rendering della pagina. Quindi l'utente può leggere e comprendere il contenuto della pagina immediatamente. 
=======
Both `async` and `defer` have one common thing: downloading of such scripts doesn't block page rendering. So the user can read page content and get acquainted with the page immediately.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

Ma ci sono anche differenze essenziali tra loro:

|         | Order | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Load-first order*. Il loro ordine nel documento non importa  -- dipende da quale script viene caricato prima |  Irrelevante. Potrebbe essere caricato ed eseguito mentre la pagina non è stata ancora stata scaricata. Questo avviene se gli script sono piccoli o cachati, e la pagina è abbastanza lunga. |
| `defer` | *Document order* (cioè come sono posizionati nella pagina). |Vengono eseguiti dopo che il document è stato caricato e parsato (aspettano se necessario), poco prima dell'evento `DOMContentLoaded`. |

```warn header="Una pagina senza script dovrebbe essere utilizzabile"
Ricordati che se stai usando `defer`, allora la pagina è visibile *prima* che lo script sia caricato.

Quindi l'utente potrebbe leggere la pagina ma probabilmente alcuni componenti grafici potrebbero essere non ancora pronti.

<<<<<<< HEAD
Dovrebbero esserci delle indicazioni di "caricamento" negli appositi spazi, i bottoni non funzionanti dovrebbero essere disabilitati, per mostrare chiaramente all'utente cosa è già pronto o cosa no.
=======
There should be "loading" indications in the proper places, and disabled buttons should show as such, so the user can clearly see what's ready and what's not.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

In pratica, `defer` è utilizzato per script che hanno bisogno di tutto il DOM e/o l'ordine di esecuzione è importante. `async` è utilizzato per script indipendenti, come contatori o ads. E il loro ordine relative di esecuzione non conta.
