# Page: DOMContentLoaded, load, beforeunload, unload

Il ciclo di vita di una pagina HTML è costituito da 3 importanti eventi:

- `DOMContentLoaded` -- il browser ha completamente caricato l'HTML, e l'albero del DOM è stato costruito, ma risorse esterne come immagini `<img>` e i fogli di stile potrebbero ancora non essere stati caricati.   
- `load` -- non solo l'HTML è caricato ma anche tutte le risorse esterne: immagini, fogli di stile, ecc.
- `beforeunload/unload` -- l'utente sta lasciando la pagina.

Ogni evento potrebbe essere utile: 

- evento di `DOMContentLoaded` quando il DOM è pronto, quindi il gestore può scorrere i nodi del DOM, ed inizializzare l'interfaccia.
- evento di `load` quando tutte le risorse esterne sono state caricate, ed anche gli stili sono stati applicati, le dimensioni delle immagini nella pagina è nota, ecc.
- evento di `beforeunload` quando l'utente sta lasciando la pagina: possiamo controllare se l'utente ha salvato le modifiche effettuate ed eventualmente chiedergli se è sicuro di voler lasciare la pagina.
- evento di `unload` quando l'utente ha quasi lasciato la pagina ma possiamo ancora effettuare alcune operazioni.

Esploriamo i dettagli di questi eventi.

## DOMContentLoaded

L'evento `DOMContentLoaded` viene emesso dall'oggetto `document`.

Dobbiamo quindi utilizzare `addEventListener` per catturarlo:

```js
document.addEventListener("DOMContentLoaded", ready);
// non "document.onDOMContentLoaded = ..."
```

Per esempio:

```html run height=200 refresh
<script>
  function ready() {
    alert('DOM is ready');

    // l'immagine non è stata ancora caricata (a meno che non fosse già presente in cache) quindi la dimensione è 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

Nell'esempio il gestore `DOMContentLoaded` si aziona quando il documento è caricato, quindi può vedere tutti gli elementi del DOM, compresa `<img>` sotto.

Ma non aspetta che l'immagine si carichi. Per questo `alert` mostra zero come dimensione.

Ad una prima occhiata l'evento `DOMContentLoaded` è molto semplice. Ci segnala che l'albero del DOM è pronto, tutto qui. Ci però sono alcune peculiarità.

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

```warn header="Script che non bloccano DOMContentLoaded"
Ci sono 2 eccezioni per questa regola:
1. Gli script con l'attributo `async`, che vedremo successivamente (info:script-async-defer), non bloccano `DOMContentLoaded`.
2. Gli script generati dinamicamente con `document.createElement('script')` e poi aggiunti alla pagina non bloccano questo evento.
```

### DOMContentLoaded e stili

I fogli di stile esterni non influenzano il caricamento del DOM, quindi `DOMContentLoaded` non aspetta il loro caricamento.

Ma c'è una trappola. Se abbiamo uno script dopo uno stile quello script deve aspettare affinché il foglio di stile sia stato caricato.

```html run
<link type="text/css" rel="stylesheet" href="style.css">
<script>
<<<<<<< HEAD
  // lo script non viene eseguito finché il foglio di stile non è caricato
=======
  // the script doesn't execute until the stylesheet is loaded
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  alert(getComputedStyle(document.body).marginTop);
</script>
```

La ragione è che lo script potrebbe voler ottenere le coordinate e altre proprietà dipendenti dallo stile degli elementi, come nell'esempio sopra. Di conseguenza lo script deve aspettare che gli stili siano caricati.

Quindi `DOMContentLoaded` aspetta il caricamento degli script e inoltre anche quello degli stili.

### Riempimento automatico nativo del browser

Firefox, Chrome e Opera riempiono automaticamente i form durante l'evento `DOMContentLoaded`. 

Per esempio, se la pagina contiene un form con username e password, e il browser ha memorizzato i valori, allora durante l'evento `DOMContentLoaded` prova a riempire automaticamente i campi (se approvato dall'utente).

Se l'evento `DOMContentLoaded` viene rinviato a causa dei lunghi tempi di caricamento degli script, allora anche il riempimento automatico dovrà attendere. Probabilmente avrete visto questo comportamento su alcuni siti (se utilizzate browser con riempimento automatico) -- i campi della login/password non vengono riempiti immediatamente, ma c'è un delay(ritardo) finché la pagina non è completamente caricata. Questo è in realtà il ritardo dovuto all'evento `DOMContentLoaded`.


## window.onload [#window-onload]

L'evento `load` sull'oggetto `window` viene emesso quando tutta la pagina è stata caricata, inclusi gli stili, immagini e altre risorse.

L'esempio sotto mostra correttamente le dimensioni dell'immagine, perché `window.onload` aspetta il caricamento di tutte le immagini:

```html run height=200 refresh
<script>
  window.onload = function() { // equivale window.addEventListener('load', (event) => {
    alert('Page loaded');

    // l'immagine è già caricata in questo momento
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

Quando un utente lascia la pagina viene emesso l'evento `unload` sulla `window`. Possiamo effettuare operazioni che non comportano un ritardo, come chiudere le finestre popup relative alla pagina.

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
});
```

- La richiesta è effettuata come POST.
- Non siamo limitati all'invio di sole stringhe, ma sono supportati anche `Form` ed altri formati, come descritto nel capitolo <info:fetch>, anche se solitamente si invia un oggetto sotto forma di stringa.
- La dimensione massima dei dati è 64kb.

Quando la richiesta `sendBeacon` è terminata il browser probabilmente ha già lasciato il document e quindi non c'è modo di ottenere la risposta del server (che comunque di solito è vuota per i dati analitici).

C'è anche un flag `keepalive` per effettuare richieste dopo che la pagina è stata lasciata. Potrai trovare maggiore informazioni nel capitolo <info:fetch-api>.


Se vogliamo cancellare il passaggio ad un'altra pagina non possiamo farlo qui ma dobbiamo utilizzare un altro evento -- `onbeforeunload`.

## window.onbeforeunload [#window.onbeforeunload]

Se un utente sta cambiando pagina o sta cercando di chiudere la finestra, il gestore dell'evento `beforeunload` chiede una conferma aggiuntiva. 

Se cancelliamo l'evento il browser potrebbe chiedere all'utente se confermano l'operazione.

Puoi provare questo comportamento eseguendo questo codice e poi ricaricando la pagina:

```js run
window.onbeforeunload = function() {
  return false;
};
```

Per ragioni storiche, anche tornare una stringa non vuota conta come cancellazione dell'evento. Poco tempo fa i browser lo mostravano come un messaggio ma come dicono le [specifiche moderne](https://html.spec.whatwg.org/#unloading-documents), non dovrebbero.

Qui vediamo un esempio:

```js run
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

Il comportamento è stato cambiato perché alcuni webmaster abusavano di questo evento mostrando messaggi fastidiosi e fuorvianti. Quindi ora i vecchi browser potrebbero mostrare ancora questi messaggi, ma a parte questo -- non c'è modo di personalizzare il messaggio che viene mostrato all'utente.

````warn header="The `event.preventDefault()` doesn't work from a `beforeunload` handler"
That may sound weird, but most browsers ignore `event.preventDefault()`.

Which means, following code may not work:
```js run
window.addEventListener("beforeunload", (event) => {
  // doesn't work, so this event handler doesn't do anything
	event.preventDefault();
});
```

Instead, in such handlers one should set `event.returnValue` to a string to get the result similar to the code above:
```js run
window.addEventListener("beforeunload", (event) => {
  // works, same as returning from window.onbeforeunload
	event.returnValue = "There are unsaved changes. Leave now?";
});
```
````

## readyState

Cosa succede se impostiamo il gestore dell'evento `DOMContentLoaded` dopo che il documento è stato caricato?

Naturalmente, non verrà mai eseguito.

Ci sono dei casi in cui non siamo sicuri se il document è stato caricato o meno. Vorremmo che la nostra funzione venisse eseguita quando il DOM è stato caricato, sia adesso che dopo. 

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

Abbiamo a disposizione anche l'evento `readystatechange` che viene emesso quando lo stato cambia, quindi possiamo stampare il cambiamento di questi stati, come nell'esempio:

```js run
// stato corrente
console.log(document.readyState);

// stampa cambi di stato
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

L'evento `readystatechange` è un meccanismo alternativo per il tracciamento dello stato di caricamento della pagina ed è comparso diverso tempo fa. Al giorno d'oggi viene usato raramente. 

Vediamo il flusso di tutti gli eventi per completezza.

Ecco un documento con `<iframe>`, `<img>` e handler che mostra gli eventi:

```html
<script>
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="https://en.js.cx/clipart/train.gif" id="img">
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

- l'evento `DOMContentLoaded` scatta sul `document` quando il DOM è pronto. Possiamo quindi utilizzare Javascript sugli elementi della pagina in questa fase.
  - Script come `<script>...</script>` o `<script src="..."></script>` bloccano DOMContentLoaded poiché il browser aspetta che finiscano di caricarsi per eseguirlo.
  - Immagini e altre risorse potrebbero prolungare ulteriormente il caricamento.
- l'evento `load` sulla `window` si aziona quando la pagina e tutte le risorse sono caricate. Viene usato raramente perché di solito non c'è bisogno di attendere per così tanto. 
- l'evento `beforeunload` sulla `window` si aziona quando l'utente vuole lasciare la pagina. Se cancelliamo l'evento il browser chiede all'utente se vuole veramente lasciare la pagina (per esempio se ci sono modifiche non salvate).
- l'evento `unload` sulla `window` si aziona quando l'utente sta proprio lasciando la pagina, nelil gestore possiamo solo effettuare operazioni semplici che non comportano nessun ritardo o chiedere cose all'utente. Vista questa limitazione, viene usato raramente. Possiamo mandare richieste di rete con `navigator.sendBeacon`.
- `document.readyState` è lo stato corrente del documento, i cambi possono essere tracciati nell'evento `readystatechange`: 
  - `loading` -- il document si sta caricando.
  - `interactive` -- il document è parsato, si verifica quasi allo stesso tempo di `DOMContentLoaded`, ma prima di esso.
  - `complete` --il document e tutte le risorse sono caricate, si verifica quasi allo stesso tempo di `window.onload`, ma prima di esso.
