# Page: DOMContentLoaded, load, beforeunload, unload

Il ciclo di vita di una pagina HTML è costituito da 3 importanti eventi:

- `DOMContentLoaded` -- il browser ha completamente caricato l'HTML, e l'alberto del DOM è stato costruito, ma risorse esterne come immagini `<img>` e i fogli di stile potrebbero ancora non essere stati caricati.   
- `load` -- non solo l'HTML è caricato ma anche tutte le risorse esterne: immagini, fogli di stile, ecc.
- `beforeunload/unload` -- l'utente sta lasciando la pagina.

Ogni evento potrebbe essere utile: 

- `DOMContentLoaded` event -- il DOM è pronto, quindi l'handler può scorrere i nodi del DOM, inizializzare l'interfaccia.
- `load` event -- tutte le risorse esterne sono caricate, quindi gli stile sono applicati, la dimensioni delle immagini nella pagina è nota, ecc.
- `beforeunload` event -- l'utente sta lasciando la pagina: possiamo controllare se l'utente ha salvato le modifiche effettuate e chiedere loro se sono sicuri di voler lasciare la pagina.
- `unload` -- l'utente ha quasi lasciato la pagina ma possiamo ancora effettuare alcune operazioni.

Esploriamo i dettagli di questi eventi.

## DOMContentLoaded

L'evento `DOMContentLoaded` avviene sull'oggetto `document`.

Dobbiamo utilizzare `addEventListener` per catturarlo:

```js
document.addEventListener("DOMContentLoaded", ready);
// not "document.onDOMContentLoaded = ..."
```

Per esempio:

```html run height=200 refresh
<script>
  function ready() {
    alert('DOM is ready');

    // l'immagine non è stata ancora caricata(a meno che non fosse cachata quindi la dimensione è 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

Nell'esempio l'handler dell'evento `DOMContentLoaded` si aziona quando il documento è car icato, quindi può vedere tutti gli elementi del DOM, compresa `<img>` sotto.

Ma non aspetta che l'immagine si carichi. Quindi `alert` mostra zero come dimensione.

<<<<<<< HEAD
Ad una prima occhiata l'evento `DOMContentLoaded` è molto semplice. L'albero del DOM è pronto -- questo è l'evento. Ci sono alcune peculiarità però.
=======
At first sight, the `DOMContentLoaded` event is very simple. The DOM tree is ready -- here's the event. There are few peculiarities though.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

### DOMContentLoaded e gli script

Quando il browser processa un documento HTML ed incontra un tag `<script>` deve eseguirlo prima di continuare a costruire il DOM. Questa è una precauzione, visto che gli script potrebbero voler modificare il DOM, e ci potrebbero anche essere dei `document.write` all'interno, quindi `DOMContentLoaded` deve aspettare.

Quindi l'evento DOMContentLoaded avviene sicuramente dopo questi script:

```html run
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM pronto!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Libreria caricata, script inline eseguito");
</script>
```

Nell'esempio sopra, prima vediamo "Libreria caricata...", e poi "DOM pronto!" (tutti gli script sono stati eseguiti).

<<<<<<< HEAD
```warn header="Script che non bloccano DOMContentLoaded"
Ci sono 2 eccezioni per questa regola:
1. Gli script con l'attributo `async`, che vedremo successivamente (info:script-async-defer), non bloccano `DOMContentLoaded`.
2. Gli script generati dinamicamente con `document.createElement('script')` e poi aggiunti alla pagina non bloccano questo evento.
=======
```warn header="Scripts that don't block DOMContentLoaded"
There are two exceptions from this rule:
1. Scripts with the `async` attribute, that we'll cover [a bit later](info:script-async-defer), don't block `DOMContentLoaded`.
2. Scripts that are generated dynamically with `document.createElement('script')` and then added to the webpage also don't block this event.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
```

### DOMContentLoaded e stili

I fogli di stile esterni non influenza il DOM, quindi `DOMContentLoaded` non aspetta il loro caricamento.

Ma c'è una trappola. Se abbiamo uno script dopo uno stile quello script deve aspettare affinche il foglio di stile è caricato.

```html run
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // lo script non viene eseguito finche il foglio di stile non è caricato
  alert(getComputedStyle(document.body).marginTop);
</script>
```

<<<<<<< HEAD
La ragione è che lo script potrebbe voler ottenere le coordinate e altre proprietà dipendenti dallo stile degli elementi, come nell'esempio sopra. Di conseguenza lo script deve aspettare che gli stili siano caricati.
=======
The reason for this is that the script may want to get coordinates and other style-dependent properties of elements, like in the example above. Naturally, it has to wait for styles to load.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

Quindi `DOMContentLoaded` aspetta il caricamento degli script e inoltre anche quello degli stili.

### Riempimento automatico nativo del browser

Firefox, Chrome e Opera riempiono automaticamente le form durante l'evento `DOMContentLoaded`. 

Per esempio, se la pagina a una form con username e password, e il browser si ricorda i valori, allora durante l'evento `DOMContentLoaded` prova a riempire automaticamente i campi (se approvato dall'utente).

Se l'evento `DOMContentLoaded` viene rinviato a causa dei lunghi tempi di caricamento degli script, allora anche il riempimento automatico dovrà attendere. Probabilmente avrete visto questo comportamento su alcuni siti (se utilizzate browser con riempimento automatico) -- i campi della login/password non vengono riempiti immediatamente, ma c'è un delay(ritardo) finchè la pagina non è completamente caricata. Questo è in realtà il ritardo fino all'evento `DOMContentLoaded`.


## window.onload [#window-onload]

<<<<<<< HEAD
L'evento `load` sull'oggetto `window` scatta quando tutta la pagina è stata caricata, inclusi gli stili, immagini e altre risorse.
=======
The `load` event on the `window` object triggers when the whole page is loaded including styles, images and other resources. This event is available via the `onload` property.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

L'esempio sotto mostra correttamente le dimensioni dell'immagine, perchè `window.onload` aspetta il caricamento di tutte le immagini:

```html run height=200 refresh
<script>
  window.onload = function() { // same as window.addEventListener('load', (event) => {
    alert('Page loaded');

    // l'immagine è già caricata in questo momento
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

Quando un utente lascia la pagina viene triggerato l'evento `unload` sulla `window`. Possiamo effettuare operazioni che non comportano un ritardo, come chiudere le finistre popup relative alla pagina.

L'eccezione degna di nota è mandare dati analitici riguardo la pagina.

Diciamo che raccogliamo dati su come viene utilizzata la pagina: click del mouse, scroll, aree della pagina visitate e così via.

Naturalmente, l'evento `unload` si verifica quando l'utente ci sta lasciando e a noi vorremmo salvare i dati sul nostro server.
Esiste un metodo speciale `navigator.sendBeacon(url, data)` per questa necessità, descritto nei dettagli <https://w3c.github.io/beacon/>.

Manda i dati in background. La transizione tra una pagina e l'altra non viene ritardata: il browser lascia la pagina ma esegue comunque `sendBeacon`.

Ecco come utilizzarlo:
```js
let analyticsData = { /* oggetto con i dati raccolti */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
};
```

- La richiesta è effettuata come POST.
- We can send not only a string, but also forms and other formats, as described in the chapter <info:fetch>, but usually it's a stringified object. Non possiamo mandare solo dati di tipo string ma anche form e altri formati, come descritto nel capitolo <info:fetch>, ma di solito è un oggetto sotto forma di stringa.
- La dimensione massima dei dati è 64kb.

Quando la richiesta `sendBeacon` è terminata il browser probabilmente  ha già lasciato il document e quindi non c'è modo di ottenere la risposta del server (che comunque di solito è vuota per i dati analitici).

C'è anche un flag `keepalive` per effettuare richieste dopo che la pagina è stata lasciata. Potrai trovare maggiore informazioni nel capitolo <info:fetch-api>.


<<<<<<< HEAD
Se vogliamo cancellare il passaggio ad un'altra pagina non possiamo farlo qui ma dobbiamo utilizzare un altro evento -- `onbeforeunload`.
=======
If we want to cancel the transition to another page, we can't do it here. But we can use another event -- `onbeforeunload`.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

## window.onbeforeunload [#window.onbeforeunload]

Se un utente sta cambiando pagina o sta cercando di chiudere la finestra, l'handler dell'evento `beforeunload` chiede una conferma aggiuntiva. 

Se cancelliamo l'evento il browser potrebbe chiedere all'utente se confermano l'operazione.

Puoi provare questo comportamento mandando in esecezione questo codice e poi ricaricando la pagina:

```js run
window.onbeforeunload = function() {
  return false;
};
```

<<<<<<< HEAD
Per ragioni storiche, anche tornare una stringa non vuota conta come cancellazione dell'evento. Poco tempo fa i browser lo mostravano come un messaggio ma come dicono le [specifiche moderne](https://html.spec.whatwg.org/#unloading-documents), non dovrebbero.
=======
For historical reasons, returning a non-empty string also counts as canceling the event. Some time ago browsers used to show it as a message, but as the [modern specification](https://html.spec.whatwg.org/#unloading-documents) says, they shouldn't.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

Here's an example:

```js run
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

Il comportamento è stato cambiato perchè alcuni webmaster abusavano di questo evento mostrando messaggi fastidiosi e fuorvianti. Quindi ora i vecchi browser potrebbero mostrare ancora questi messaggi, ma a parte questo -- non c'è modo di customizzare il messaggio che viene mostrato all'utente.

## readyState

Cosa succede se impostiamo l'handler dell'evento `DOMContentLoaded` dopo che il documento è stato caricato?

Naturalmente, non viene mai eseguito.

Ci sono dei casi in cui non siamo sicuri se il document è stato caricato o meno. Vorremmo che la nostra funzione fosse eseguita quando il DOM è stato caricato, sia adesso che dopo. 

La proprietà `document.readyState` ci da informazioni a proposito dello stato di caricamento corrente.

Può assumere 3 diversi valori:

- `"loading"` -- il document si sta caricando.
- `"interactive"` -- il document è stato completamente letto.
- `"complete"` -- il document è stato completamente letto e anche tutte le risorse (come le immagini) sono state caricate.

Quindi possiamo controllare la proprietà `document.readyState` e in base al suo valore eseguire codice o impostare un handler.

Come questo:

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {
  // sta ancora caricando, si attende l'evento
  document.addEventListener('DOMContentLoaded', work);
} else {
  // Il DOM è pronto
  work();
}
```

<<<<<<< HEAD
C'è anche l'evento `readystatechange` che scatta quando lo stato cambia, quindi possiamo stampare tutti questi stati in questo modo:
=======
There's also the `readystatechange` event that triggers when the state changes, so we can print all these states like this:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js run
// stato corrente
console.log(document.readyState);

// stampa cambi di stato
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

L'evento `readystatechange` è un meccanismo alternativo per il tracciamento dello stato di caricamento della pagina ed è comparso diverso tempo fa. Al giorno d'oggi viene usato raramente. 

Vediamo il flusso di tutti gli eventi per completezza.

Ecco un documento con `<iframe>`, `<img>` e handler che loggano gli eventi:

```html
<script>
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

L'esempio funzionante è [nella sandbox](sandbox:readystate).

L'output tipico:
1. [1] initial readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

I numeri tra le parentesi quadre indicano il tempo approssimativo di quando l'evento si verifica. Gli eventi etichettati con la stessa cifra avvengono allo stesso tempo circa (+- qualche ms)

- `document.readyState` diventa `interactive` appena prima di `DOMContentLoaded`. Queste 2 cose in realtà significano la stessa cosa.
- `document.readyState` diventa `complete` quando tutte le risorse (`iframe` e `img`) sono caricate. Qui possiamo vedere che avviene all'incirca nello stesso tempo di `img.onload` (`img` è l'ultima risorsa) e `window.onload`. Passare allo stato `complete` significa lo stesso di `window.onload`. La differenza è che `window.onload` si attiva sempre dopo tutti gli altri `load` handler.


## Riepilogo

Eventi di caricamento della pagina:

<<<<<<< HEAD
- l'evento `DOMContentLoaded` scatta sul `document` quando il DOM è pronto. Possiamo quindi utilizzare Javascript sugli elementi della pagina in questa fase.
  - Script come `<script>...</script>` o `<script src="..."></script>` bloccano DOMContentLoaded poichè il browser aspetta che finiscano di caricarsi per eseguirlo.
  - Immagini e altre risorse potrebbero prolungare ulteriormente il caricamento.
- l'evento `load` sulla `window` si aziona quando la pagina e tutte le risorse sono caricate. Viene usato raramente perchè di solito non c'è bisogno di attendere per così tanto. 
- l'evento `beforeunload` sulla `window` si aziona quando l'utente vuole lasciare la pagina. Se cancelliamo l'evento il browser chiede all'utente se vuole veramente lasciare la pagina (per esempio se ci sono modifiche non salvate).
- l'evento `unload` sulla `window` si aziona quando l'utente sta proprio lasciando la pagina, nell'handler possiamo solo effettuare operazioni semplici che non comportano nessun ritardo o chiedere cose all'utente. Vista questa limitazione, viene usato raramente. Possiamo mandare richieste di rete con `navigator.sendBeacon`.
- `document.readyState` è lo stato corrente del documento, i cambi possono essere tracciati nell'evento `readystatechange`: 
  - `loading` -- il document si sta caricando.
  - `interactive` -- il document è parsato, si verifica quasi allo stesso tempo di `DOMContentLoaded`, ma prima di esso.
  - `complete` --il document e tutte le risorse sono caricate, si verifica quasi allo stesso tempo di `window.onload`, ma prima di esso.
=======
- The `DOMContentLoaded` event triggers on `document` when the DOM is ready. We can apply JavaScript to elements at this stage.
  - Script such as `<script>...</script>` or `<script src="..."></script>` block DOMContentLoaded, the browser waits for them to execute.
  - Images and other resources may also still continue loading.
- The `load` event on `window` triggers when the page and all resources are loaded. We rarely use it, because there's usually no need to wait for so long.
- The `beforeunload` event on `window` triggers when the user wants to leave the page. If we cancel the event, browser asks whether the user really wants to leave (e.g we have unsaved changes).
- The `unload` event on `window` triggers when the user is finally leaving, in the handler we can only do simple things that do not involve delays or asking a user. Because of that limitation, it's rarely used. We can send out a network request with `navigator.sendBeacon`.
- `document.readyState` is the current state of the document, changes can be tracked in the `readystatechange` event:
  - `loading` -- the document is loading.
  - `interactive` -- the document is parsed, happens at about the same time as `DOMContentLoaded`, but before it.
  - `complete` -- the document and resources are loaded, happens at about the same time as `window.onload`, but before it.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
