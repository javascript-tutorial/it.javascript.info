# Eventi del puntatore

I Pointer events (da adesso in poi, eventi del puntatore) sono una maniera moderna di gestire gli input di una varietà di dispositivi di puntamento, come mouse, penne/stilo, touchscreen e così via.

## Una breve storia

Facciamo una breve panoramica, in modo da avere una visione generale del posto che occupano questi eventi rispetto agli altri.

- Tanto tempo fa, lontano nel passato, c'erano solo gli eventi del mouse.

    Ad un certo punto, iniziarono a diffondersi i dispositivi touch, in particolar modo telefoni e tablet. Per fare in modo che gli script esistenti potessero continuare a funzionare, questi generavano (e lo fanno ancora oggi) eventi del mouse. Ad esempio, un touchscreen, al tocco, genera un `mousedown`. In questa maniera i nuovi dispositivi poterono funzionare correttamente con le pagine web.
    
    Tuttavia i dispositivi touch hanno molte più potenzialità rispetto a quelle di un mouse. Ad esempio, con questi dispositivi, è possibile toccare contemporaneamente più punti dello schermo ("multi-touch"). A dispetto di ciò, gli eventi del mouse non hanno le proprietà necessarie per poterlo gestire.

- Quindi vennero introdotti gli eventi touch, come `touchstart`, `touchend`, `touchmove`, che possiedono delle proprietà dedicate (non le affronteremo adesso in dettaglio, perché gli eventi del puntatore sono migliori).

    Tuttavia, questo non era ancora sufficiente, dal momento che ci sono tanti altri dispositivi, come le penne, che hanno le loro caratteristiche peculiari. Inoltre, scrivere del codice che rimane in ascolto per eventi touch e del mouse, era abbastanza scomodo.

- Per risolvere questi problemi, è stato introdotto il nuovo standard degli eventi del puntatore, il quale supporta tutti i tipi di dispositivi di puntamento.

Ad oggi, la specifica [Pointer Events di livello 2](https://www.w3.org/TR/pointerevents2/) viene supportata in tutti i browser principali, e la nuova specifica [Pointer Events di livello 3](https://w3c.github.io/pointerevents/) ancora in fase di sviluppo, è per la maggior parte compatibile con gli eventi del puntatore di livello 2. 

A meno che non si sviluppi per vecchi browser, come Internet Explorer 10, o Safari dal 12 in giù, non esiste più alcun motivo per usare gli eventi del mouse o touch, e possiamo passare agli eventi del puntatore.

Con la loro introduzione, il codice funziona perfettamente con dispositivi touch e mouse.

Detto ciò, ci sono alcune importanti caratteristiche da conoscere per poter usare gli eventi del puntatore in modo corretto ed evitare sorprese. Ne prenderemo nota in questo articolo.

## Tipi di evento del puntatore

Gli eventi del puntatore vengono chiamati in maniera simile a quelli del mouse:

| Evento del puntatore | Evento del mouse similare |
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

Come possiamo osservare, per ogni `mouse<event>`, c'è un `pointer<event>` che gioca un ruolo simile. Inoltre ci sono 3 eventi del puntatore aggiuntivi, privi della controparte `mouse...`, che verranno spiegati tra poco. 

```smart header="Rimpiazzare `mouse<event>` con `pointer<event>` nel codice"
Possiamo rimpiazzare gli eventi `mouse<event>` con quelli `pointer<event>` nel codice, ed aspettarci che il tutto continui a funzionare perfettamente con il mouse.

Il supporto ai dispositivi touch inoltre migliorerà "magicamente". Sebbene saremo costretti ad aggiungere  `touch-action: none` in alcune sezioni del CSS. Affronteremo questa cosa più avanti nella sezione del `pointercancel`. 
```

## Proprietà degli eventi del puntatore

Gli eventi del puntatore hanno le stesse proprietà di quelli del mouse, come `clientX/Y`, `target`, etc., più altri:

- `pointerId` - un identificatore unico del puntatore che ha generato l'evento.
    
    Generato dal browser. Ci permette di gestire puntatori multipli, come touchscreen con stilo e multi-touch (esempi a seguire).
- `pointerType` - il tipo di dispositivo puntatore. È una stringa tra queste: "mouse", "pen" o "touch". 

    Possiamo usare questa proprietà per reagire differentemente discriminando i diversi tipi di puntatore.
- `isPrimary` - assume il valore `true` per il puntatore principale (il primo dito nel multi-touch).

Alcuni dispositivi di puntamento misurano l'area di contatto e la pressione, ad esempio, nel caso del dito sul touchscreen, esistono delle apposite proprietà aggiuntive:

<<<<<<< HEAD
- `width` - la larghezza dell'area dello schermo toccato dal puntatore (ad esempio un dito). Dove non supportato, il valore è sempre `1`, come nel caso del mouse. 
- `height` - l'altezza dell'area dello schermo toccato dal puntatore. Dove non supportato è sempre `1`.
- `pressure` - la pressione della punta del dispositivo puntatore, in un intervallo di valori che va da 0 a 1. Per dispositivi che non supportano la pressione, i valori potranno essere `0` (non premuto) e `0.5` (premuto).
- `tangentialPressure` - la pressione tangenziale normalizzata.
- `tiltX`, `tiltY`, `twist` - proprietà specifiche delle penne che descrivono come la penna è posizionata rispetto alla superficie dello schermo.
=======
- `width` - the width of the area where the pointer (e.g. a finger) touches the device. Where unsupported, e.g. for a mouse, it's always `1`.
- `height` - the height of the area where the pointer touches the device. Where unsupported, it's always `1`.
- `pressure` - the pressure of the pointer tip, in range from 0 to 1. For devices that don't support pressure must be either `0.5` (pressed) or `0`.
- `tangentialPressure` - the normalized tangential pressure.
- `tiltX`, `tiltY`, `twist` - pen-specific properties that describe how the pen is positioned relative to the surface.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Queste proprietà non sono supportate dalla maggioranza dei dispositivi, per questo vengono usate raramente. In caso di necessità potete trovarne i dettagli nelle [specifiche](https://w3c.github.io/pointerevents/#pointerevent-interface).

## Multi-touch

Una delle cose assolutamente non supportate dagli eventi del mouse è il multi-touch: un utente può toccare lo schermo contemporaneamente in più punti sul telefono o tablet, o eseguire gesti particolari.

I Pointer Events permettono di gestire il multi-touch con l'aiuto delle proprietà `pointerId` e `isPrimary`.

Ecco ciò che succede quando un utente tocca il touchscreen in un punto, e successivamente poggia un altro dito su qualche altro punto dello schermo:

1. Al primo tocco:
    - `pointerdown` con `isPrimary=true` con un determinato `pointerId`.
2. Per il secondo dito e tutti gli altri (dando per assunto che il primo stia ancora toccando):
    - `pointerdown` con `isPrimary=false` con un `pointerId` diverso per ogni altro dito aggiuntivo.

Nota bene: `pointerId` viene assegnato ad ogni dito coinvolto nell'operazione e non al device. Se usassimo 5 dita simultaneamente, avremmo ben 5 eventi `pointerdown`, ognuno con le loro rispettive coordinate e `pointerId`.

Gli eventi associati al primo dito hanno sempre la proprietà `isPrimary=true`.

Possiamo tenere traccia delle dita usando i `pointerId` corrispondenti. Quando l'utente sposta e rimuove un dito, otteniamo gli eventi `pointermove` e `pointerup` aventi lo stesso `pointerId` ottenuto con l'evento `pointerdown`.

```online
Ecco una demo che tiene traccia degli eventi `pointerdown` e `pointerup`:

[iframe src="multitouch" edit height=200]

Nota bene: Per vedere la differenza dei valori di `pointerId/isPrimary` è necessario usare un dispositivo touch, ad esempio un telefono o un tablet. Per dispositivi a tocco singolo, come i mouse, ci sarà sempre lo stesso `pointerId` con `isPrimary=true`, per tutti gli eventi del puntatore.
```

## Evento: pointercancel

L'evento `pointercancel` si genera se, nel bel mezzo di una interazione, avviene qualcosa che ne causa la cancellazione, tale che non venga generato nessun evento del puntatore.

Le cause possono essere: 
- Il dispositivo di puntamento è stato fisicamente disabilitato.
- È cambiato l'orientamento del dispositivo (tablet ruotato). 
- Il browser ha deciso di gestire l'interazione da sè, considerandola un gesto del mouse, oppure un'azione zoom-and-pan o altro.

Ecco un caso reale di evento `pointercancel` per vedere cosa e come ci influenza.

<<<<<<< HEAD
Mettiamo il caso che stiamo implementando il drag'n'drop per un pallone, proprio come fatto all'inizio dell'articolo <info:mouse-drag-and-drop>.
=======
Let's say we're implementing drag'n'drop for a ball, just as in the beginning of the article <info:mouse-drag-and-drop>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ecco il flusso delle azioni dell'utente e gli eventi corrispondenti:

1) L'utente preme su un'immagine, per iniziare il trascinamento
    - viene generato l'evento `pointerdown`
2) Quindi comincia a spostare il puntatore (spostando così l'immagine)
    - viene generato l'evento `pointermove`, magari più volte
3) A quel punto ecco la sorpresa! Il browser avendo il supporto nativo al drag'n'drop per le immagini, subentra nell'azione, prendendo il sopravvento nel processo di drag'n'drop, generando così l'evento `pointercancel`.
    - Il browser ora gestisce il drag'n'drop dell'immagine autonomamente. L'utente può anche trascinare l'immagine del pallone fuori dal browser, dentro il programma delle Mail o su un File Manager.
    - Niente più eventi `pointermove` per noi.

Qui il problema è che il browser "dirotta" l'interazione: viene generato `pointercancel` all'inizio del processo di "drag-and-drop", e non vengono più generati eventi `pointermove`.

```online
<<<<<<< HEAD
Ecco una demo con drag'n'drop con il tracciamento degli eventi del puntatore (solo per `up/down`, `move` e `cancel`) nella `textarea`: 
=======
Here's the drag'n'drop demo with logging of pointer events (only `up/down`, `move` and `cancel`) in the `textarea`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

[iframe src="ball" height=240 edit]
```

Vorremmo implementare il drag'n'drop da noi, quindi diremo al browser di non prendere il controllo.

**Prevenire l'azione di default del browser per evitare il `pointercancel`.**

È necessario fare due cose:

1. Prevenire che avvenga il drag'n'drop nativo:
    - Si può fare impostando `ball.ondragstart = () => false`, come descritto nell'articolo <info:mouse-drag-and-drop>.
    - Funziona bene per gli eventi del mouse.
2. Per i dispositivi touch, ci sono altre azioni del browser relative (oltre al drag'n'drop). Per evitare problemi anche con questi:
    - Prevenirli impostando `#ball { touch-action: none }` nel CSS. 
    - In questa maniera il nostro codice comincerà a funzionare anche sui dispositivi touch.

Fatto ciò, gli eventi funzioneranno come previsto, ed il browser non prenderà il controllo del processo e non verrà emesso l'evento `pointercancel`.

```online
Questa demo aggiunge queste righe:

[iframe src="ball-2" height=240 edit]

Come si può notare, non c'è più nessun evento `pointercancel`.
```

Ora possiamo aggiungere il codice per spostare il pallone, ed il nostro drag'n'drop funzionerà sia con i mouse che con i dispositivi touch.

## Cattura del puntatore

La cattura del puntatore è una peculiarità degli eventi del puntatore.

L'idea è molto semplice, anche se all'inizio può risultare un po' stramba, dal momento che non esiste nulla del genere per nessun'altra tipologia di evento.

Il metodo principale è:
- `elem.setPointerCapture(pointerId)` - esegue il binding degli eventi con un certo `pointerId` a `elem`. Dopo la chiamata tutti gli eventi puntatore con il medesimo `pointerId` avranno `elem` come target (come se fossero avvenuti su `elem`), non importa dove sia realmente accaduto nel documento.

In altre parole, `elem.setPointerCapture(pointerId)` reindirizza tutti gli eventi successivi del dato `pointerId` a `elem`.

Il binding viene rimosso:
- automaticamente, al generarsi degli eventi `pointerup` o `pointercancel`,
- automaticamente, se `elem` viene rimosso dal documento,
- quando viene chiamato `elem.releasePointerCapture(pointerId)`.

**La cattura del puntatore può essere usata per semplificare delle tipologie di interazioni di drag'n'drop.**

Per fare un esempio, riprendiamo l'implementazione del cursore/slider personalizzato, come descritto nella sezione <info:mouse-drag-and-drop>.

Creiamo un elemento con la striscia ed il "cursore" (`thumb`) all'interno.

Funziona in questa maniera:

1. L'utente preme sul cursore `thumb`, e viene generato `pointerdown`.
2. Quindi sposta il il puntatore, generando un evento `pointermove`, dopodiché sposterà `thumb` lungo la striscia.
    - ...Spostando il puntatore, potrebbe lasciare il `thumb` dello slider: andando sopra o sotto di esso. L'elemento `thumb` si può muovere solo in orizzontale, rimanendo però allineato verticalmente con il puntatore.

Quindi, per tenere traccia di tutti i movimenti del puntatore, incluso quando va sopra o sotto il `thumb`, abbiamo dovuto assegnare il gestore evento `pointermove` all'intero `document`.

Questa soluzione sembra un po' "sporca". Uno dei problemi è che i movimenti del puntatore sul documento possono causare effetti collaterali, innescare altri gestori evento, per nulla correlati allo slider.

La cattura del puntatore fornisce il mezzo per effettuare il binding di `pointermove` a `thumb` ed evitare questo tipo di problemi:

- Possiamo chiamare `thumb.setPointerCapture(event.pointerId)` nel gestore `pointerdown`,
- A quel punto i successivi eventi fino al `pointerup/cancel` verranno reindirizzati a `thumb`. 
- Al verificarsi dell'evento `pointerup` (trascinamento completato), il binding viene rimosso automaticamente, e non abbiamo bisogno di curarcene.

Così, anche se l'utente sposta il cursore in un qualsiasi punto della pagina, i gestori evento verranno chiamati su `thumb`. Oltretutto, le coordinate degli oggetti evento, come `clientX/clientY` saranno ancora corrette, perché la cattura influenza solamente `target/currentTarget`.

Ecco il codice essenziale:

```js
thumb.onpointerdown = function(event) {
  // reindirizza tutti gli eventi del puntatore (fino al pointerup) su thumb
  thumb.setPointerCapture(event.pointerId);

thumb.onpointermove = function(event) {
  // spostando lo slider: si mette in ascolto su thumb, dal momento che tutti gli eventi del puntatore vengono reindirizzati su di esso
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

// nota: non necessita la chiamata a thumb.releasePointerCapture, 
// avviene automaticamente al pointerup
```

```online
La demo completa:

[iframe src="slider" height=100 edit]

<p></p>

In the demo, there's also an additional element with `onmouseover` handler showing the current date.

Please note: while you're dragging the thumb, you may hover over this element, and its handler *does not* trigger.

So the dragging is now free of side effects, thanks to `setPointerCapture`.
```

In fin dei conti, la cattura del puntatore ci dà due benefici:
1. Il codice diventa più pulito, dal momento che non dobbiamo bisogno di aggiungere/rimuovere gestori sull'intero `document`. Il binding viene rimosso automaticamente.
2. Nel caso vi fossero altri gestori `pointermove` nel documento, non verrebbero innescati dal puntatore mentre l'utente è intento a trascinare il cursore.

### Eventi di cattura del puntatore

Ci sono due eventi del puntatore associati:

- `gotpointercapture` viene generato quando un elemento usa `setPointerCapture` per abilitare la cattura.
- `lostpointercapture` viene generato quando la cattura viene rilasciata: o esplicitamente con la chiamata a `releasePointerCapture`, o automaticamente attraverso `pointerup`/`pointercancel`.

## Riepilogo

Gli eventi del puntatore permettono di gestire gli eventi del mouse, del touch e delle penne simultaneamente, con un'unica porzione di codice.

Gli eventi del puntatore estendono gli eventi del mouse. Possiamo sostituire `mouse` con `pointer` nei nomi degli eventi ed aspettarci che il codice continui a funzionare per il mouse, con un supporto migliore per altri tipi di dispositivi.

Per i drag'n'drop ed interazioni touch complesse che il browser potrebbe decidere di dirottare sulla propria gestione, dobbiamo ricordarci di disabilitarne l'azione predefinita sugli eventi ed impostare sul CSS `touch-events: none`, per gli elementi che vogliamo coinvolgere.

Le abilità aggiuntive degli eventi del puntatore sono:

- Supporto al multi-touch con `pointerId` e `isPrimary`.
- Proprietà specifiche per alcuni dispositivi, come `pressure`, `width/height`, ed altri.
- Cattura del puntatore: possiamo reindirizzare tutti i puntatori evento su uno specifico elemento fino al verificarsi degli eventi `pointerup`/`pointercancel`.

Ad oggi, gli eventi del puntatore sono supportati da tutti i principali browser, quindi possiamo passare a questi, specialmente se IE10- e Safari 12- non sono necessari. Tuttavia, anche con questi browser, esistono i polyfill che abilitano il supporto degli eventi di tipo puntatore.
