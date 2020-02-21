
# Scripts: async, defer

Nei moderni browser gli script sono spesso "più pesanti" dell'HTML: la loro dimensione di download è maggiore e anche i tempi di processamento sono più lunghi.

Quando il browser carica l'HTML e si imbatte in un tag `<script>...</script>` non può continuare a costruire il DOM. Deve eseguire lo script al momento. Lo stesso avviene per script esterni `<script src="..."></script>`: il browser deve aspettere che lo script venga scaricato, eseguito e solo dopo può processare il resto della pagina. 

Questo conduce a 2 importanti problematiche:

1. Gli script non possono vedere gli elementi del DOM sotto di essi e quindi non possono aggiungere handler,ecc.
2. Se c'è uno script di grandi dimensioni all'inzio della pagina esso "bloccherà la pagina". Gli utente non potranno vedere il contenuto della pagina fino a quando lo script verrà scaricato ed eseguito: 

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

Such things are invisible for people using very fast connections, but many people in the world still have slower internet speeds and use far-from-perfect mobile internet. Queste cose sono invisibili per persone che utilizzano una connessione molto veloce ma molte persone nel mondo hanno ancora una connessione Internet più lenta e utilizzano connessioni mobile molto scarse.

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

1. Il contenuto della pagina viene visualizzato immediatamente.
2. `DOMContentLoaded` aspetta il caricamento degli script con l'attributo defer. Scatta solo quando lo script `(2)` è scaricato ed eseguito. 

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

- La pagina non aspetta gli script con async, il contenuto viene processato e visualizzato
- `DOMContentLoaded` and async scripts don't wait each other:
    - `DOMContentLoaded` può scattare prima di uno script async (se lo script finisce di caricarsi dopo che il caricamento della pagina è terminato)
    - ...o dopo uno script `async` (se lo script è corto o era cachato)
- Anche gli altri script non aspettano il caricamento degli script `async`, e gli script `async` non aspettano il caricamento degli altri script.


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

`async` e `defer` hanno una cosa in comune: il download di questi script non blocca il rendering della pagina. Quindi l'utente può leggere e comprendere il contenuto della pagina immediatamente. 

Ma ci sono anche differenze essenziali tra loro:

|         | Order | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Load-first order*. Il loro ordine nel documento non importa  -- dipende da quale script viene caricato prima |  Irrelevante. Potrebbe essere caricato ed eseguito mentre la pagina non è stata ancora stata scaricata. Questo avviene se gli script sono piccoli o cachati, e la pagina è abbastanza lunga. |
| `defer` | *Document order* (cioè come sono posizionati nella pagina). |Vengono eseguiti dopo che il document è stato caricato e parsato (aspettano se necessario), poco prima dell'evento `DOMContentLoaded`. |

```warn header="Una pagina senza script dovrebbe essere utilizzabile"
Ricordati che se stai usando `defer`, allora la pagina è visibile *prima* che lo script sia caricato.

Quindi l'utente potrebbe leggere la pagina ma probabilmente alcuni componenti grafici potrebbero essere non ancora pronti.

Dovrebbero esserci delle indicazioni di "caricamento" negli appositi spazi, i bottoni non funzionanti dovrebbero essere disabilitati, per mostrare chiaramente all'utente cosa è già pronto o cosa no.
```

In pratica, `defer` è utilizzato per script che hanno bisogno di tutto il DOM e/o l'ordine di esecuzione è importante. `async` è utilizzato per script indipendenti, come contatori o ads. E il loro ordine relative di esecuzione non conta.
