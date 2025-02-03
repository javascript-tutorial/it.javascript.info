# Metodi di popups e window

L'apertura di una finestra popup è uno dei metodi più vecchi, utilizzato per mostrare pagine aggiuntive all'utente.

Crearne una è molto banale:
```js
window.open('https://javascript.info/')
```

...Il codice visto sopra aprirà una nuova finestra all'indirizzo URL fornito. La maggior parte dei browser moderni aprirà l'url in un'altro tab piuttosto che in una nuova finestra.

Le finestre popup esistono da molto tempo. Lo scopo iniziale era quello di utilizzarle per mostrare del contenuto aggiuntivo senza dover chiudere la finestra principale. Ad oggi, esistono altri modi per farlo: ad esempio, possiamo caricare il contenuto dinamicamente utilizzando [fetch](info:fetch) e mostrando il contenuto in un `<div>` generato dinamicamente. Quindi, i popup, non sono una cosa che utilizziamo molto spesso.

Inoltre, i popup possono essere ingannevoli su dispositivi mobile, poiché questi non mostrano più finestre contemporaneamente.

Ciononostante, esistono alcune applicazioni in cui i popup sono ancora utilizzati, e.g. per il login OAuth (login con Google/Facebook/...), perché:

1. Un popup è una finestra separata con un suo ambiente JavaScript separato. Quindi l'apertura di un popup da un sito di terze parti, che potrebbe non essere affidabile, è un operazione sicura.
2. E' molto semplice aprire un popup.
3. Un popup può navigare (cambiare URL) ed inviare messaggi alla finestra che lo ha generato.

## Blocco dei popup

In passato, i siti con scopi malevoli, abusavano dei popup. Una pagina con pessimi intenti, poteva aprire decine di finestre di ads. Per questo motivo, molti browser moderni tendono a bloccare le finestre popup, per proteggere gli utenti.

**Molti browser bloccano i popup se questi vengono invocati da eventi non generati da utente. Un evento permesso è quello di `onclick`.**

Ad esempio:
```js
// popup bloccato
window.open('https://javascript.info');

// popup permesso
button.onclick = () => {
  window.open('https://javascript.info');
};
```

In questo modo gli utenti sono parzialmente protetti dai popup indesiderati, ma allo stesso tempo la funzionalità di popup non viene completamente disattivata.

<<<<<<< HEAD
Cosa accadrebbe nel caso in cui un popup venisse aperto in seguito ad un evento di `onclick`, ma dopo un `setTimeout`? Questa domanda può essere ingannevole.

Provate voi stessi questo codice:

```js run
// si aprirà dopo 3 secondi
setTimeout(() => window.open('http://google.com'), 3000);
```

Il popup si apre in Chrome, ma viene bloccato in Firefox.

...Se proviamo a ridurre il delay, il popup si aprirà anche in Firefox:

```js run
// si aprirà dopo 1 secondo
setTimeout(() => window.open('http://google.com'), 1000);
```

La differenza sta nel fatto che Firefox tratta un timeout di 2000ms, o inferiore, come accettabile, qualsiasi valore che sia superiore verrà trattato come "inaffidabile", assumendo che un tale timeout sia "fuori dall'azione dell'utente". Quindi nel primo caso il popup viene bloccato, mentre nel secondo no.

=======
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
## window.open

La sintassi da utilizzare per aprire un popup è: `window.open(url, name, params)`:

url
: Un URL da caricare nella nuova finestra.

name
: Un nome per la nuova finestra. Ogni finestra possiede un `window.name`, e qui possiamo specificare quale finestra utilizzare per aprire il popup. Se esiste già una finestra con lo stesso nome, l'URL fornito verrà aperto in quest'ultima, altrimenti verrà aperta una nuova finestra.

params
: La configurazione, sotto forma di stringa, da fornire alla nuova finestra. Contiene le impostazioni, separate da virgola. Non devono essere contenuti spazi nella configurazione, ad esempio: `width=200,height=100`.

Impostazioni disponibili in `params`:

- Posizione:
  - `left/top` (numeric) -- coordinate della finestra rispetto all'angolo in alto a sinistra dello schermo. C'è però una limitazione: una nuova finestra non può essere posizionata fuori dallo schermo.
  - `width/height` (numeric) -- larghezza ed altezza della nuova finestra. Anche le dimensioni width/height hanno delle limitazioni in quanto dimensioni minime, quindi è impossibile creare finestre invisibili.
- Caratteristiche della finestra:
  - `menubar` (yes/no) -- per mostrare o nascondere il menu del browser nella nuova finestra.
  - `toolbar` (yes/no) -- per mostrare o nascondere la barra di navigazione del browser (back, forward, reload etc) nella nuova finestra.
  - `location` (yes/no) -- per mostrare o nascondere il campo URL nella nuova finestra. Firefox and IE non permettono di nasconderlo.
  - `status` (yes/no) -- per mostrare o nascondere la barra di stato. Anche in questo caso, molti browser non permettono di nasconderla.
  - `resizable` (yes/no) -- permette di disabilatare il ridemensionamento della nuova finestra. Sconsigliato.
  - `scrollbars` (yes/no) -- permette di disabilitare la scrollbar nella nuova finestra. Sconsigliato.


 Ci sono molte altre caratterstiche meno supportate e specifiche per alcuni browser, che generalmente non vengono utilizzate. Potete trovare degli esempi di queste nella documentazione <a href="https://developer.mozilla.org/en/DOM/window.open">window.open di MDN</a>.

<<<<<<< HEAD
## Esempio: una finestra minimalista
=======
## Example: a minimalistic window
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Proviamo ad aprire una finestra con un limitato insieme di caratteristiche, in modo tale da renderci conto quali di queste i browser ci permettono di disabilitare:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

In questo esempio, molte delle "caratteristiche della finestra" sono disabilitate e la finestra viene posizionata fuori dallo schermo. Provate ad eseguirla per vedere cosa accade. La maggior parte dei browser sistemerà "le proprietà stane", come ad esempio il valore zero per `width/height` ed il posizionamento fuori dallo schermo impostato con `left/top`. Ad esempio, Chrome aprirà questa finestra a dimensione massima, in modo tale che questa occupi l'intero schermo.

Proviamo ora ad aggiungere delle opzioni di posizionamento impostando `width`, `height`, `left`, `top` con valori ragionevoli:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

La maggior parte dei browser mostrerà l'esempio sopra esattamente come richiesto.

Le regole applicate per le impostazioni omesse sono:

- Se non viene fornito il terzo argomento alla funzione `open`, oppure è vuoto, allora vengono utilizzati i parametri di default della finestra.
- Se viene fornita una stringa di parametri, ma vengono omesse proprietà di tipo `si/no`, allora verranno impostate di default a `no`. Quindi nel caso in cui forniste dei parametri, assicuratevi di impostarli esplicitamente a `yes`.
- Se non vengono forniti i parametri `left/top`, allora il browser aprirà la nuova finestra vicino all'ultima aperta.
- Se non vengono forniti i parametri `width/height`, allora il browser aprirà la nuova finestra con la stessa dimensione dell'ultima aperta.

## Accedere al popup dalla finestra

<<<<<<< HEAD
L'invocazione di `open` ritorna un riferimento alla finestra appena aperta. Può quindi essere utilizzato per manipolarne le proprietà, cambiarne la posizione e molto altro.
=======
The `open` call returns a reference to the new window. It can be used to manipulate its properties, change location and even more.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In questo esempio, generiamo del contenuto per il popup tramite JavaScript:

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
```

Ed ora, dopo il caricamento, lo modifichiamo:

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

alert(newWindow.location.href); // (*) about:blank, il caricamento non è ancora iniziato

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

Da notare: nel momento immediatamente successivo a `window.open`, la nuova finestra non è ancora stata caricata. Lo abbiamo dimostrato tramite `alert` in riga `(*)`. Quindi dovremo attendere l'evento `onload`, prima di poter effettuare modifiche. Possiamo utilizzare anche l'handler `DOMContentLoaded` per `newWin.document`.

```warn header="Politica della stessa origine"
Le finestre possono accedere liberamente al contenuto delle altre, ma solamente se queste appartengono alla stessa origine (lo stesso protocol://domain:port).

Ad esempio, nel caso in cui il dominio della finestra principale sia `site.com`, mentre quello del popup sia `gmail.com`, allora l'accesso al contenuto di quest'ultima non è permesso per questioni di sicurezza. Per maggiori dettagli, vedi il capitolo <info:cross-window-communication>.
```

## Accedere alla finestra dal popup

Un popup può accedere alla finestra che lo ha generato, utilizzando il riferimento `window.opener`, il quale è impostato a `null` per tutte le finestre ad eccezione di quelle di popup.

Se provate ad eseguire il codice qui sotto, vedrete che il contenuto della pagina principale (opener) verrà sostituito con la stringa "Test":

```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

Quindi la connessione tra le finestre è bidirezionale: sia la pagina principale che quella popup possiedono un riferimento l'una dell'altra.

## Chiudere un popup

Per chiudere una finestra popup, possiamo utilizzare: `win.close()`.

Invece, per verificare se una finestra è chiusa possiamo utilizzare: `win.closed`.

Tecnicamente, il metodo `close()` è disponibile su tutte le finestre, ma nella pratica, `window.close()` viene ignorato dalla maggior parte dei browser se la finestra non è stata creata tramite un comando esplicito di `window.open()`. Quindi funzionerà solamente con le finestre a popup.

La proprietà `closed` vale `true` se la finestra è chiusa. Questa risulta essere molto utile per verificare se il popup (oppure la finestra principale) è ancora aperto. Un utente potrebbe chiudere la finestra popup in qualsiasi istante, ed il nostro codice dovrà essere pronto a gestire tale eventualità.

Il codice qui sotto, carica una finestra e la chiude immediatamente
```js run
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```


## Riposizionamento e ridimensionamento

Abbiamo a disposizione metodi per il riposizionamento/ridimensionamente di una finestra:

`win.moveBy(x,y)`
: Muove la finestra rispetto alla posizione attuale, di `x` pixels a destra e `y` pixels verso il basso. Sono ammessi anche i valori negativi (per spostare a sinistra o verso l'alto).

`win.moveTo(x,y)`
: Posiziona la finestra alle coordinate `(x,y)` sullo schermo.

`win.resizeBy(width,height)`
: Ridimensiona la finestra secondo i parametri `width/height` forniti, rispetto alla dimensione attuale. Sono ammessi anche i valori negativi.

`win.resizeTo(width,height)`
: Ridimensiona la finestra secondo le dimensioni fornite.

Abbiamo a disposizione anche l'evento `window.onresize`.

```warn header="Solamente i popup"
Per prevenire qualsiasi abuso di queste funzionalità, il browser solitamente blocca questi metodi. Questi infatti funzioneranno come atteso solamente con le finestre popup aperte dall'utente e che non hanno altri tabs.
```

```warn header="Non è possibile miniaturizzare/massimizzare"
JavaScript non ha la possibilità di minimizzare o massimizzare una finestra. Queste funzionalità a livello di OS (Sistema Operativo) sono nascoste agli sviluppatori frontend.

I metodi di riposizionamento e ridimensionamento non hanno alcun effetto su finestre minimizzate o massimizzate.
```

## Scorrere all'interno di una finestra

Abbiamo già affrontato l'argomento relativo allo scorrimento all'interno delle finestre nel capitolo <info:size-and-scroll-window>.

`win.scrollBy(x,y)`
: Scorre la finestra di `x` pixels a destra e `y` pixels verso il basso, rispetto alla posizione attuale. Sono ammessi anche valori negativi.

`win.scrollTo(x,y)`
: Scorre la finestra alle coordinate fornite `(x,y)`.

`elem.scrollIntoView(top = true)`
: Scorre la finestra fino a rendere `elem` visibile all'inizio della finestra (comportamento di default) o a fondo finestra con `elem.scrollIntoView(false)`.

Abbiamo a disposizione anche l'evento `window.onscroll`.

## Focus/blur su una finestra

Teoricamente, avremmo a disposizione i metodi `window.focus()` e `window.blur()` per innescare il focus/unfocus su una finestra. E anche gli eventi `focus/blur` che ci permettono di verificare il momento in cui un utente entra in una finestra(focus) o la abbandona(blur).

<<<<<<< HEAD
Comunque, nella pratica, questi metodi sono fortemente limitati, perché in passato pagine con scopi malevoli ne hanno abusato. 
=======
Although, in practice they are severely limited, because in the past evil pages abused them.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio, date un'occhiata al seguente codice:

```js run
window.onblur = () => window.focus();
```

Quando un utente tenta di abbandonare la finestra (`window.onblur`), questo riporta la finestra in focus. Lo scopo è quello di bloccare l'utente all'interno della finestra.

Quindi i browser hanno dovuto introdurre molte limitazioni per evitare codice come quello appena visto e proteggere l'utente da pubblicità e pagine malevole. Queste limitazioni so diverse di browser in browser.

Ad esempio, un browser mobile solitamente ignora completamente `window.focus()`. Inoltre il focus, non funziona nemmeno quando apriamo il popup in un nuovo tab piuttosto che in una nuova finestra.

Esistono però situazioni in cui l'utilizzo del focus è permesso e può tornare utile.

Ad esempio:

<<<<<<< HEAD
- Quando apriamo un popup, potrebbe essere una buona idea, invocare `newWindow.focus()`. In questo caso, su alcune combinazioni di OS/browser potrebbe funzionare ed assicurarci che l'utente si trovi nella nuova finestra.
- Se vogliamo tracciare quando un utente utilizza la nostra web app, possiamo osservare gli eventi `window.onfocus/onblur`. Questo ci consente di sospendere/riprendere alcune azioni, come le animazioni. Da notare però che, l'evento di `blur` sta a significare che l'utente è uscito dal contesto della finestra, ma potrebbe continuare ad osservarla. La finestra è in background, ma potrebbe essere ancora visibile.

## Riepilogo
=======
- When we open a popup, it might be a good idea to run `newWindow.focus()` on it. Just in case, for some OS/browser combinations it ensures that the user is in the new window now.
- If we want to track when a visitor actually uses our web-app, we can track `window.onfocus/onblur`. That allows us to suspend/resume in-page activities, animations etc. But please note that the `blur` event means that the visitor switched out from the window, but they still may observe it. The window is in the background, but still may be visible.

## Summary
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Le finestre popup vengono utilizzate raramente, ad oggi esistono diverse alternative: caricare e mostrare informazioni direttamente in pagina, oppure utilizzare un iframe.

Se la nostra intenzione è quella di aprire una finestra popup, una buona pratica è di informare prima l'utente. Un icona di "apertura nuova finestra" vicino al link o al bottone può aiutare l'utente a "sopravvivere" al cambio contesto, mantenendo a mente entrambe le finestre.

- Una finestra popup può essere aperta con l'invocazione di `open(url, name, params)`. Questa ritornerà il riferimento alla nuova pagina aperta.
- I browser bloccano il metodo `open` se non invocato da un'azione diretta dell'utente. Solitamente, viene mostrata una notifica, in modo che l'utente possa rifiutare/acconsentire.
- I browser di default aprono un nuovo tab, ma se vengono fornite delle dimensioni, allora verrà aperta una nuova finestra.
- La finestra popup può accedere alla finestra che l'ha aperta, tramite la proprietà `window.opener`.
- La finestra principale e quella popup possono interagire liberamente, se appartengono alla stessa origine. Altrimenti, possono solamente modificarne la posizione e [scambiarsi messaggi](info:cross-window-communication).

Per chiudere un popup: utilizziamo il metodo `close()`. Anche l'utente può chiuderlo manualmente (come qualsiasi altra finestra). La proprietà `window.closed` assumerà il valore `true`, dopo la chiusura della finestra.

- I metodi `focus()` e `blur()` permettono di innescare focus/unfocus su una finestra. Ma non funzionano in tutti i casi.
- Gli eventi `focus` e `blur` consentono di tracciare i cambi di contesto di una finestra. Ma tenete a mente che una finestra, dopo l'evento di `blur`, potrebbe continuare ad essere visibile anche se si trova in background.
