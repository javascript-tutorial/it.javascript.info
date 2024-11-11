# Dispatching di eventi personalizzati

Oltre ad assegnare gestori, possiamo anche generare eventi attraverso JavaScript.

Gli eventi personalizzati (custom events) possono essere usati per creare "componenti grafici". Ad esempio un elemento radice del nostro menù basato su JavaScript, potrebbe innescare eventi che indicano al menù come comportarsi: `open` (aprire il menu), `select` (selezionare un elemento) e così via. Del codice in altre aree, potrebbe mettersi in ascolto per questi eventi e tenere traccia di cosa sta avvenendo nel menù.

Possiamo generare non solo eventi del tutto nuovi, creati apposta per i nostri scopi, ma anche quelli predefiniti del linguaggio, come `click`, `mousedown` etc. Questo può essere utile per i test automatici.

## Costruttore dell'evento 

<<<<<<< HEAD
Le classi degli eventi predefiniti formano una gerarchia, similmente alle classi degli elementi del DOM. La classe base è [Event](http://www.w3.org/TR/dom/#event).
=======
Built-in event classes form a hierarchy, similar to DOM element classes. The root is the built-in [Event](https://dom.spec.whatwg.org/#events) class.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Gli oggetti `Event` vengono creati così:

```js
let event = new Event(type[, options]);
```

Argomenti:

- *type* -- tipo dell'evento, una stringa come `"click"` oppure una personalizzata come `"mio-evento"`.
- *options* -- l'oggetto con due proprietà opzionali:
  - `bubbles: true/false` -- se `true`, l'evento sarà soggetto a bubbling.
  - `cancelable: true/false` -- se `true`, "l'azione predefinita" può essere impedita. Successivamente vedremo cosa questo significhi per gli eventi personalizzati.

  Di default sono entrambi impostati a false: `{bubbles: false, cancelable: false}`.

## dispatchEvent

Dopo la creazione di un evento, dovremmo "eseguirlo" su un elemento, attraverso la chiamata `elem.dispatchEvent(event)`.

A questo punto, il gestore reagisce su di esso come se fosse un normale evento del browser. Se l'evento è stato creato con l'opzione `bubbles` attivata, allora procederà con il bubbling.

Nel seguente esempio, l'evento `click` viene inizializzato attraverso JavaScript. Il gestore si comporta esattamente come se il pulsante fosse stato cliccato:

```html run no-beautify
<button id="elem" onclick="alert('Click!');">Click automatico</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
Per poter distinguere un evento generato da un utente "reale", da uno generato da script esiste un modo.

La proprietà `event.isTrusted` sarà `true` per eventi che provengono da azioni reali dell'utente e `false` per quelli generati da script.
```

## Esempio di bubbling

Possiamo creare un evento soggetto a bubbling con il nome `"hello"` e catturarlo attraverso `document`.

Tutto quello che dobbiamo fare è impostare `bubbles` a `true`:

```html run no-beautify
<h1 id="elem">Ciao dallo script!</h1>

<script>
  // catturato in document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Ciao da " + event.target.tagName); // Ciao da H1
  });

  // ...generazione da elem!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // il gestore su document si attiverà e visualizzerà il messaggio.

</script>
```


Note:

1. Per i nostri eventi personalizzati dobbiamo usare `addEventListener`, in quanto `on<event>` esiste solo per quelli predefiniti: quindi `document.onhello` non funzionerà.
2. Dobbiamo impostare `bubbles:true`, altrimenti l'evento non risalirà attraverso i nodi genitori.

La meccanica del bubbling è la stessa per gli eventi predefiniti (`click`) e personalizzati (`hello`), comprese anche le fasi di capturing e bubbling.

## MouseEvent, KeyboardEvent e altri

Ecco una breve lista di classi per gli eventi della UI estratta dalla [UI Event specification](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

Dovremmo usare queste anziché `new Event` se vogliamo creare questo tipo di eventi. Ad esempio, `new MouseEvent("click")`.

Il costruttore adatto ci permette di specificare delle proprietà standard per questo tipo di evento.

Come ad esempio `clientX/clientY` per gli eventi del mouse:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

Nota bene: il costruttore generico `Event` non permette di fare quanto appena descritto:

```js run
let event = new Event("click", {
  bubbles: true, // only bubbles and cancelable
  cancelable: true, // work in the Event constructor
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, la proprietà sconosciuta viene ignorata!
*/!*
```

Tecnicamente, possiamo aggirare il problema assegnandogli direttamente `event.clientX=100` dopo la creazione. Ma è una questione di comodità oltre che di aderenza alle regole. Gli eventi generati dal browser garantiscono sempre di avere il tipo corretto.

La lista completa delle proprietà, per i vari eventi della UI sono descritti nelle specifiche, ad esempio, [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## Eventi personalizzati (custom events)

Per i nostri nuovi eventi come `"hello"` dovremmo usare `new CustomEvent`. Tecnicamente [CustomEvent](https://dom.spec.whatwg.org/#customevent) è equivalente a `Event`, senza eccezioni.

Nel secondo argomento (object) possiamo aggiungere la proprietà aggiuntiva `detail` per qualunque informazione personalizzata che vogliamo passare insieme all'evento.

Esempio:

```html run refresh
<h1 id="elem">Ciao a Giovanni!</h1>

<script>
  // insieme all'evento, al gestore, arrivano anche dei dettagli aggiuntivi
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "Giovanni" }
*/!*
  }));
</script>
```

La proprietà `detail` può contenere qualunque tipo di dato. Tecnicamente si potrebbe farne a meno, dato che possiamo assegnare qualunque proprietà dentro un normalissimo oggetto `new Event`, dopo la sua creazione. Ma `CustomEvent` fornisce il campo speciale `detail` adatto allo scopo, con cui ci si assicura di evitare conflitti con le altre proprietà dell'evento.

Oltretutto, la classe evento descrive "che tipo di evento" sia, e se si tratta di un evento personalizzato, quindi potremmo usare `CustomEvent` anche solo per palesare di cosa si tratti.

## event.preventDefault()

Molti browser hanno una "azione predefinita", come una navigazione verso un link, l'inizio di una selezione, e così via.

Gli eventi personalizzati, invece, ne sono sprovvisti, ma di sicuro il codice che li genera, ha dei piani ben definiti circa il da farsi dopo che questo tipo di eventi sia stato generato.

Chiamando `event.preventDefault()`, un gestore è in grado di inviare un segnale che queste azioni devono essere annullate.

In questo caso la chiamata a `elem.dispatchEvent(event)` restituisce `false`, ed il codice che lo ha generato sa che non deve continuare.

Vediamo un pratico esempio: un coniglio che si nasconde (potrebbe essere un menù collassabile o qualcos'altro).

Nell'esempio possiamo vedere un `#rabbit` e una funzione `hide()` che invia un evento `"hide"` su di esso, per informare tutte le parti interessate che il coniglio sta per nascondersi.

Qualunque gestore può mettersi in ascolto per questo evento tramite `rabbit.addEventListener('hide',...)` e, se necessario, annullare l'azione con `event.preventDefault()`. In questo modo il coniglio non scomparirà:

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Nascondi()</button>

<script>
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // senza questo flag preventDefault non funziona
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('Azione annullata da un gestore');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```

Nota bene: l'evento deve avere il flag `cancelable: true`, altrimenti la chiamata `event.preventDefault()` verrà ignorata.

## Gli eventi annidati sono sincroni

<<<<<<< HEAD
Solitamente gli eventi vengono elaborati in una coda. Ossia: se il browser sta elaborando `onclick` e viene generato un nuovo evento, ad esempio il mouse viene mosso, il suo gestore verrà messo in coda, ed i corrispondenti gestori di `mousemove` verranno chiamati dopo che l'elaborazione di `onclick` sarà terminata.
=======
Usually events are processed in a queue. That is: if the browser is processing `onclick` and a new event occurs, e.g. mouse moved, then its handling is queued up, corresponding `mousemove` handlers will be called after `onclick` processing is finished.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

L'eccezione degna di nota è quando un evento viene inizializzato all'interno di un altro, ad esempio usando `dispatchEvent`. Questi eventi vengono elaborati immediatamente: i gestori del nuovo evento vengono chiamati, e successivamente viene ristabilita la gestione dell'evento corrente.

Per esempio, nel codice seguente l'evento `menu-open` viene innescato durante `onclick`.

Viene processato immediatamente, senza attendere che il gestore di `onclick` abbia terminato:


```html run autorun
<button id="menu">Menù (cliccami)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  // viene innescato tra 1 e 2
  document.addEventListener('menu-open', () => alert('annidato'));
</script>
```

L'ordine di output è: 1 -> annidato -> 2.

Nota bene che l'evento annidato `menu-open` viene catturato nel `document`. La propagazione e la gestione dell'evento annidato vengono eseguiti e completati prima che l'elaborazione torni al codice esterno (`onclick`).

Questo non vale solo per `dispatchEvent`, ma esistono altri casi. Se un gestore di evento chiama metodi che innescano altri eventi -- anche questi vengono elaborati in maniera sincrona, in modo annidato.

Ora mettiamo il caso che questa cosa non ci stia bene, e che invece volessimo che `onclick` venisse elaborato per primo, indipendentemente da `menu-open` o prima di qualunque altro evento interno.

Allora potremmo sia inserire `dispatchEvent` (o un altra chiamata che generi un evento) alla fine di  `onclick` oppure, forse anche meglio, incapsularlo in un `setTimeout` a ritardo zero:

```html run
<button id="menu">Menù (cliccami)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

Adesso `dispatchEvent` viene eseguito in maniera asincrona dopo che l'esecuzione del codice corrente è terminata, incluso `menu.onclick`, ed in questo modo i gestori sono totalmente separati.

L'ordine di output diventa: 1 -> 2 -> annidato.

## Riepilogo

Per generare un evento dal codice, dobbiamo prima di tutto, creare un oggetto evento.

Il costruttore generico `Event(name, options)` accetta un nome di evento arbitrario e un oggetto `options`, con due proprietà:
- `bubbles: true` se l'evento deve fare bubbling.
- `cancelable: true` se `event.preventDefault()` deve poter funzionare.

Altri costruttori di eventi nativi come `MouseEvent`, `KeyboardEvent` e così via, accettano proprietà specifiche per quel tipo di evento. Ad esempio, `clientX` per gli eventi del mouse.

Per eventi personalizzati dovremmo usare il costruttore `CustomEvent`, il quale ha una opzione aggiuntiva chiamata `detail`, per potervi assegnare i dati specifici del tipo di evento, ai quali i gestori potranno accedere tramite `event.detail`.

Nonostante tecnicamente esista la possibilità di generare eventi del browser come `click` o `keydown`, dovremmo usarli con molta attenzione.

Non dovremmo generare eventi del browser perché è una pratica poco elegante e sporca nell'esecuzione dei gestori. La maggior parte delle volte, si tratta di cattiva architettura.

Gli eventi nativi possono essere generati:

- Come un modo poco pulito per far sì che delle librerie di terze parti lavorino nella maniera voluta, se queste non forniscono altri modi con cui poter interagire.
- Per test automatici, per "cliccare il pulsante" nello script e vedere se l'interfaccia risponde correttamente.

Gli eventi personalizzati di nostra creazione, vengono spesso generati per scopi architetturali, per segnalare cosa succede dentro i nostri menù, sliders, caroselli, etc.
