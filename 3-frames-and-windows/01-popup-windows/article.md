# Metodi per popups and window

L'apertura di una finestra di popup è uno dei metodi più antichi utilizzato per mostrare ulteriori pagine all'utente.

Crearne una è molto banale:
```js
window.open('https://javascript.info/')
```

...Il codice visto sopra aprirà una nuova finestra all URL fornito. La maggior parte dei browser moderni aprirà l'url in un'altra tab piuttosto che aprire una nuova finestra.

Le finestre a popup esistono da molto tempo. Lo scopo iniziale era quello di utilizzarle per mostrare del contenuto aggiuntivo senza dover chiudere la finestra principale. Ad oggi, esistono altri modi per farlo: ad esempio, possiamo caricare il contenuto dinamicamente utilizzando [fetch](info:fetch) e mostrando il contenuto in un `<div>` generato dinamicamente. Quindi, i popup, non sono una cosa che utilizziamo molto spesso.

Inoltre, i popup possono essere ingannevoli su dispositivi mobile, poiché non verranno mostrare più finestra contemporaneamente.

Ciònonostante, esistono alcune applicazioni in cui i popup sono ancora utilizzati, e.g. per il login OAuth (login con Google/Facebook/...), perché:

1. Un popup è una finestra separata con un suo ambiente JavaScript separato. Quindi l'apertura di un popup da un sito di terze parti, che potrebbe non essere affidabile, è un operazione sicura.
2. E' molto semplice aprire un popup.
3. Un popup può navigare (cambiare URL) ed inviare messaggi alla finestra che lo ha generato.

## Blocco dei popup

In passato, i siti con scopi maligni, abusavano dei popup. Una pagina con pessimi intenti, poteva aprire decine di finestre di ads. Per questo motivo, molti browser moderni tendono a bloccare le finestere di popup, per proteggere gli utenti.

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

In questo modo gli utenti sono protetti. almeno parzialmente, dai popup indesiderati, ma allo stesso tempo la funzionalità di popup non viene completamente disattivata.

Cosa accadrebbe nel caso in cui un popup viene aperto in seguito ad un evento di `onclick`, ma dopo un `setTimeout`? Questa domanda può essere ingannevole.

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

La differenza sta nel fatto che Firefox tratta un timeout di 2000ms, o inferiore, come accettabile, qualsiasi valore che sia superiore verrà trattato come "inaffidabile", assumendo che un tale tiemeout is "fuori dall'azione dell'utente". Quindi nel primo caso il popup viene bloccato, mentre nel secondo no.

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

## Esempio: una finestra minimalista

Proviamo ad aprire una finestra con un limitato insieme di caratteristiche, in modo tale da renderci conto quali di queste i browser ci permettono di disabilitare:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

In questo esempio, molte delle "caratteristiche della finestra" sono disabilitate e la finestra viene posizionata fuori dallo schermo. Provate ad eseguirla per vedere cosa accade. La maggior parte dei browser sistemerà "le proprietà stane", come ad esempio il valore zero per `width/height` ed il posizionamento fuori dallo schermo impostato con `left/top`. Ad esempio, Chrome aprirà questa finestra a dimensione massima, in modo tale che questa occupi l'intero schermo.

Proviamo ora ad aggiungere delle opzioni di posizionamento impstando `width`, `height`, `left`, `top` con valori ragionevoli:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

La maggior parte dei browser mostrerà l'esempio sopra esattamente con i parametri come richiesti.

Le regole applicate per le impostazioni omesse sono:

- Se non viene fornito il terzo argomento alla funzione `open`, oppure è vuoto, allora vengono utilizzati i parametri di default della finestra.
- Se viene fornita una stringa di parametri, ma vengono omesse proprietà di tipo `si/no`, allora verranno impostate di default a `no`. Quindi nel caso in cui forniste dei parametri, assicuratevi di impostarli esplicitamente a `yes`.
- Se non vengono forniti i parametri `left/top`, allora il browser aprirà la nuova finestra vicino all'ultima aperta.
- Se non vengono forniti i parametri `width/height`, allora il browser aprirà la nuova finestra con la stessa diemensione dell'ultima aperta.

## Accedere al popup dalla finestra

L'invocazione di `open` torna un riferimento alla finestra appena aperta. Può quindi essereu utilizzato per manipolarne le proprietà, cambiarne la posizione e molto altro.

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

Da notare: nel momento immediatamente successivo a `window.open`, la nuova finestra non è ancora stata caricata. Lo abbiamo dimostrato tramite `alert` in riga `(*)`. Quindi dovremo attendere l'evento `onload`, prima di poter effetuare modifiche. Possiamo utilizzare anche l'handler `DOMContentLoaded` per `newWin.document`.

```warn header="Politica della stessa origine"
Le finestre possono accedere liberamente al contenuto delle altre, ma solamente se queste appartengono alla stessa origine (lo stesso protocol://domain:port).

Ad esempio, nel caso in cui il dominio della finestra principale sia `site.com`, mentre quello del popup sia `gmail.com`, allora l'accesso contenuto di quest'ultima non è permesso, per questioni di sicurezza. Per maggiori dettagli, vedi il capitolo <info:cross-window-communication>.
```

## Accedere alla finestra dal popup

Un popup può accedere alla finestra che lo ha generato, utilizzando il riferimento `window.opener`. Il quale è impostato a `null` per tutte le finestre ad eccezione di quelle di popup.

Se provate ad eseguire il codice qui sotto, vederte che il contenuto di questa pagina (pagina principale) verrà sostituito con la stringa "Test":

```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

Quindi la connesione tra le finestre è bidirezionale: sia la pagina principale che quella di popup, possiedono entrambe dei riferiementi.

## Chiudere un popup

Per chiudere una finestra di popup, possiamo utilizzare: `win.close()`.

Invece, per verificare se una finestra è chiusa possiamo utilizzare: `win.closed`.

Tecnicamente, il metodo `close()` è disponibile su tutte le finestre, ma nella pratica, `window.close()` viene ignorato dalla maggior parte dei browser se la finestra non è stata creata tramite un comando esplicito di `window.open()`. Quindi fuzionerà solamente con le finestre a popup.

La proprietà `closed` vale `true` se la finestra è chiusa. Questa risulta essere molto utile per verificare se il popup (oppure la finestra principale) è ancora aperto. Un utente potrebbe chiudere la finestra di popup in qualsiasi istante, ed il nostro codice dovrà essere pronto a gestire tale eventualità.

Il codice qui sotto, carica una finestra e la chiude immediatamente
```js run
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```


## Moving and resizing

There are methods to move/resize a window:

`win.moveBy(x,y)`
: Move the window relative to current position `x` pixels to the right and `y` pixels down. Negative values are allowed (to move left/up).

`win.moveTo(x,y)`
: Move the window to coordinates `(x,y)` on the screen.

`win.resizeBy(width,height)`
: Resize the window by given `width/height` relative to the current size. Negative values are allowed.

`win.resizeTo(width,height)`
: Resize the window to the given size.

There's also `window.onresize` event.

```warn header="Only popups"
To prevent abuse, the browser usually blocks these methods. They only work reliably on popups that we opened, that have no additional tabs.
```

```warn header="No minification/maximization"
JavaScript has no way to minify or maximize a window. These OS-level functions are hidden from Frontend-developers.

Move/resize methods do not work for maximized/minimized windows.
```

## Scrolling a window

We already talked about scrolling a window in the chapter <info:size-and-scroll-window>.

`win.scrollBy(x,y)`
: Scroll the window `x` pixels right and `y` down relative the current scroll. Negative values are allowed.

`win.scrollTo(x,y)`
: Scroll the window to the given coordinates `(x,y)`.

`elem.scrollIntoView(top = true)`
: Scroll the window to make `elem` show up at the top (the default) or at the bottom for `elem.scrollIntoView(false)`.

There's also `window.onscroll` event.

## Focus/blur on a window

Theoretically, there are `window.focus()` and `window.blur()` methods to focus/unfocus on a window. And there are also `focus/blur` events that allow to catch the moment when the visitor focuses on a window and switches elsewhere.

Although, in practice they are severely limited, because in the past evil pages abused them. 

For instance, look at this code:

```js run
window.onblur = () => window.focus();
```

When a user attempts to switch out of the window (`window.onblur`), it brings the window back into focus. The intention is to "lock" the user within the `window`.

So browsers had to introduce many limitations to forbid the code like that and protect the user from ads and evils pages. They depend on the browser.

For instance, a mobile browser usually ignores `window.focus()` completely. Also focusing doesn't work when a popup opens in a separate tab rather than a new window.

Still, there are some use cases when such calls do work and can be useful.

For instance:

- When we open a popup, it's might be a good idea to run a `newWindow.focus()` on it. Just in case, for some OS/browser combinations it ensures that the user is in the new window now.
- If we want to track when a visitor actually uses our web-app, we can track `window.onfocus/onblur`. That allows us to suspend/resume in-page activities, animations etc. But please note that the `blur` event means that the visitor switched out from the window, but they still may observe it. The window is in the background, but still may be visible.

## Summary   

Popup windows are used rarely, as there are alternatives: loading and displaying information in-page, or in iframe.

If we're going to open a popup, a good practice is to inform the user about it. An "opening window" icon near a link or button would allow the visitor to survive the focus shift and keep both windows in mind.

- A popup can be opened by the `open(url, name, params)` call. It returns the reference to the newly opened window.
- Browsers block `open` calls from the code outside of user actions. Usually a notification appears, so that a user may allow them.
- Browsers open a new tab by default, but if sizes are provided, then it'll be a popup window.
- The popup may access the opener window using the `window.opener` property.
- The main window and the popup can freely read and modify each other if they have the same origin. Otherwise, they can change location of each other and [exchange messages](info:cross-window-communication).

To close the popup: use `close()` call. Also the user may close them (just like any other windows). The `window.closed` is `true` after that.

- Methods `focus()` and `blur()` allow to focus/unfocus a window. But they don't work all the time.
- Events `focus` and `blur` allow to track switching in and out of the window. But please note that a  window may still be visible even in the background state, after `blur`.
