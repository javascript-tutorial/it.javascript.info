# Drag'n'Drop con gli eventi del mouse

Il Drag'n'Drop, in termini di interfaccia utente, è una soluzione grandiosa. Il fatto di poter prendere qualcosa, trascinarla e rilasciarla è un modo semplice ed intuitivo per fare tantissime operazioni, dal copiare e spostare documenti (come nei gestori di files), al fare un ordine online (rilasciando un prodotto in un carrello).

Nello standard HTML attuale c'è una [sezione sul Drag and Drop](https://html.spec.whatwg.org/multipage/interaction.html#dnd) con eventi speciali come `dragstart`, `dragend`, e via dicendo.

Questi eventi ci permettono di supportare tipi particolari di drag'n'drop, come gestire il trascinamento di un file dal sistema operativo ed il rilascio dentro la finestra del browser, in modo che JavaScript possa accedere al contenuto di tali files.

Ma i Drag Events hanno anche delle limitazioni. Ad esempio, non possiamo prevenire il trascinamento da una certa sezione. Inoltre non possiamo rendere il trascinamento solo "orizzontale" o "verticale". E ci sono tante altre azioni drag'n'drop che non è possibile sfruttare. Inoltre il supporto dei dispositivi mobile per questo tipo di eventi è abbastanza scarso.

Di conseguenza, vedremo come implementare il Drag'n'Drop solo tramite l'utilizzo degli eventi del mouse.

## Algoritmo del Drag'n'Drop

L'algoritmo di base del Drag'n'Drop è qualcosa del genere:

1. Al `mousedown` - prepara l'elemento per lo spostamento, se necessario (magari crea un suo clone, o aggiungi una classe o altro).
2. Quindi al `mousemove` spostalo variando `left/top` con il `position:absolute`.
3. Al `mouseup` - esegui tutte le azioni coinvolte per completare il drag'n'drop.

<<<<<<< HEAD
Queste sono le basi. Dopo vedremo come gestire altre caratteristiche, come evidenziare gli altri elementi sottostanti mentre effettuiamo il trascinamento su di essi.
=======
These are the basics. Later we'll see how to add other features, such as highlighting current underlying elements while we drag over them.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ecco un'implementazione del trascinamento di un pallone:

```js
<<<<<<< HEAD
ball.onmousedown = function(event) { 
  // (1) preparazione dello spostamento: imposta il posizionamento assoluto e lo z-index al massimo valore utile
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // spostamento all'esterno da ogni elemento genitore e direttamente verso il body della pagina
  // per posizionarlo relativamente ad esso
  document.body.append(ball);  
=======
ball.onmousedown = function(event) {
  // (1) prepare to moving: make absolute and on top by z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(ball);
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

  // centratura del pallone alle coordinate (pageX, pageY)
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  // spostamento del nostro pallone con posizionamento assoluto sotto il puntatore
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) spostamento del pallone al mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (3) rilascio del pallone, rimozione dei gestori non necessari
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

Eseguendo il codice, noteremo qualcosa di anomalo. All'inizio del drag'n'drop, il pallone si "duplica": abbiamo cominciato trascinando il suo "clone".

```online
Ecco un esempio in azione:

[iframe src="ball" height=230]

Prova a fare il drag'n'drop con il mouse per vedere questo comportamento anomalo.
```

Questo accade perché il browser ha una sua implementazione del drag'n'drop per immagini e qualche altro elemento. La esegue in automatico e va quindi in conflitto con la nostra.

Per disabilitarlo:

```js
ball.ondragstart = function() {
  return false;
};
```

Ora è tutto a posto.

```online
In azione:

[iframe src="ball2" height=230]
```

Un altro aspetto importante -- noi teniamo traccia di `mousemove` nel `document`, non su `ball`. A prima vista potrebbe sembrare che il mouse sia sempre sopra il pallone, e possiamo attivare `mousemove` su di essa.

 Ma come noto, `mousemove` viene generato spesso, ma non per ogni pixel. Quindi a seguito di qualche movimento rapido potrebbe saltare dal pallone a qualche punto nel bel mezzo del documento (o anche fuori dalla finestra).

Di conseguenza dovremmo metterci in ascolto sul `document` per la cattura.

## Posizionamento corretto

<<<<<<< HEAD
Negli esempi precedenti il pallone viene sempre spostato in modo che il suo centro sia sotto il puntatore:
=======
In the examples above the ball is always moved so that its center is under the pointer:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

<<<<<<< HEAD
Non male, ma c'è un effetto collaterale. Per innescare il drag'n'drop, potremmo cominciare `mousedown` da un punto qualunque del pallone. Ma se lo "prendessimo" dai bordi, si centrerebbe repentinamente sotto il puntatore facendo una specie di "salto".
=======
Not bad, but there's a side effect. To initiate the drag'n'drop, we can `mousedown` anywhere on the ball. But if "take" it from its edge, then the ball suddenly "jumps" to become centered under the mouse pointer.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Sarebbe meglio se mantenessimo lo spostamento iniziale dell'elemento rispetto al puntatore.

Ad esempio, se cominciassimo dal bordo del pallone, il puntatore dovrebbe rimanere sul bordo mentre lo trasciniamo.

![](ball_shift.svg)

Aggiorniamo il nostro algoritmo:

1. Quando un utente preme il pulsante (`mousedown`) - memorizza la distanza del puntatore dall'angolo in alto a sinistra del pallone nelle variabili `shiftX/shiftY`. Manterremo questa distanza durante il trascinamento.

    Per ottenere questi scostamenti possiamo sottrarre le coordinate:

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

2. Quindi, durante il trascinamento posizioneremo il pallone con lo stesso scostamento relativo al puntatore, in questo modo:

    ```js
    // onmousemove
    // il pallone ha position:absolute
    ball.style.left = event.pageX - *!*shiftX*/!* + 'px';
    ball.style.top = event.pageY - *!*shiftY*/!* + 'px';
    ```

Il codice definitivo con un posizionamento ottimale:

```js
ball.onmousedown = function(event) {

*!*
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
*/!*

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // sposta il pallone alle coordinate (pageX, pageY)
  // tenendo conto dello scostamento iniziale
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // muovi il pallone al mousemove
  document.addEventListener('mousemove', onMouseMove);

  // rilascia il pallone, rimuovi i gestori non necessari
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
```

```online
In azione (inside `<iframe>`):

[iframe src="ball3" height=230]
```

La differenza è particolarmente visibile se trasciniamo il pallone dall'angolo in basso a destra. Nell'esempio precedente, il pallone "salterebbe" sotto il puntatore. Adesso segue fluidamente il puntatore dalla posizione corrente.

## Potenziali obiettivi per il drop (droppables)

Negli esempi precedenti il pallone può essere rilasciato "ovunque". In applicazioni concrete generalmente prendiamo un oggetto e lo lasciamo su un altro. Ad esempio, un "file" dentro una "cartella" o cose del genere.

Parlando in maniera astratta, prendiamo un elemento "draggable" e lo rilasciamo su uno "droppable".

Dobbiamo quindi sapere:
- dove viene rilasciato l'elemento alla fine del Drag'n'Drop -- per eseguire l'azione corrispondente,
- e, preferibilmente, conoscere il droppable sul quale lo stiamo rilasciando, per evidenziarlo.

La soluzione è piuttosto interessante e leggermente complicata, e la affronteremo qui.

Quale potrebbe essere l'idea iniziale? Probabilmente quella di impostare dei gestori `mouseover/mouseup` sui potenziali droppables?

Non funzionerebbe.

Il problema principale, sarebbe che durante il trascinamento, l'elemento draggable è sempre sopra gli altri. E gli eventi del mouse vengono generati sull'elemento superiore, e non su quelli sotto.

Per esempio, sotto ci sono due elementi `<div>`, uno rosso sopra uno blu (lo copre del tutto). Non c'è modo di catturare un evento su quello blu, perché il rosso sta sopra:

```html run autorun height=60
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('non funziona mai')"></div>
<div style="background:red" onmouseover="alert('sul rosso!')"></div>
```

Stessa cosa per un elemento draggable. Il pallone sta sempre sopra gli altri elementi, e quindi gli eventi vengono generati su di esso. Qualunque gestore assegnassimo agli elementi sotto, non funzionerebbero.

Questo è il motivo per cui l'idea iniziale di impostare i gestori su dei potenziali droppables non funziona. I gestori non verrebbero eseguiti.

Come fare, quindi?

<<<<<<< HEAD
C'è un metodo chiamato `document.elementFromPoint(clientX, clientY)` che restituisce le coordinate relative alla window, dell'elemento più annidato (o `null` se le coordinate restituite sono fuori dalla window).
=======
There's a method called `document.elementFromPoint(clientX, clientY)`. It returns the most nested element on given window-relative coordinates (or `null` if given coordinates are out of the window). If there are multiple overlapping elements on the same coordinates, then the topmost one is returned.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Possiamo usarlo su qualunque nostro gestore di evento del mouse per rilevare dei potenziali droppable sotto il puntatore, in questo modo:

```js
// dentro un gestore di evento del mouse
ball.hidden = true; // (*) nasconde l'elemento che trasciniamo

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow è l'elemento sotto il pallone, potrebbe essere droppable

ball.hidden = false;
```

Nota bene: abbiamo bisogno di nascondere il pallone prima della chiamata `(*)`. Altrimenti otterremmo la palla a queste coordinate, dato che sarebbe questo l'elemento più in alto sotto il puntatore: `elemBelow=ball`. Quindi lo nascondiamo per mostrarlo nuovamente immediatamente dopo.

Possiamo usare questo codice per sapere quale elemento stiamo "sorvolando" in ogni momento. E gestire il rilascio quando accade.

Un codice esteso di `onMouseMove` per individuare gli elementi "droppable":

```js
// droppable potenziale che stiamo sorvolando in questo momento
let currentDroppable = null;

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

  // gli eventi mousemove possono essere generati fuori dalla window (quando il pallone è trascinato fuori dallo schermo)
  // se clientX/clientY sono fuori dalla window, elementFromPoint restituisce null
  if (!elemBelow) return;

  // i potenziali elementi droppables sono contrassegnati con la classe "droppable" (la logica potrebbe essere anche altra)
  let droppableBelow = elemBelow.closest('.droppable');

  if (currentDroppable != droppableBelow) {
    // sorvolando in entrata o in uscita...
    // nota bene: entrambi i valori potrebbero essere null
    //   currentDroppable=null se non siamo su un elemento prima di questo evento (es. su uno spazio vuoto)
    //   droppableBelow=null se non siamo attualmente droppable, durante questo evento

    if (currentDroppable) {
      // la logica per elaborare "il sorvolo in uscita" dal droppable (rimuove l'evidenziatura)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // la logica per elaborare "il sorvolo in entrata" sul droppable
      enterDroppable(currentDroppable);
    }
  }
}
```

Nel seguente esempio, quando il pallone viene trascinato sopra la porta, la porta viene evidenziata.

[codetabs height=250 src="ball4"]

Adesso abbiamo l'attuale "obiettivo drop", sul quale stiamo sorvolando, dentro la variabile `currentDroppable` durante tutta l'operazione, e possiamo usarlo per evidenziarlo o per altre cose.

## Riepilogo

Abbiamo preso in considerazione un algoritmo base del Drag'n'Drop.

I componenti chiave:

1. Flusso degli eventi: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (non dimenticare di eliminare il `ondragstart` nativo).
2. All'inizio del trascinamento -- ricorda lo scostamento iniziale del puntatore rispetto all'elemento: `shiftX/shiftY` e di mantenerlo durante tutta la fase di trascinamento.
3. Rileva gli elementi droppable sotto il puntatore tramite `document.elementFromPoint`.

Possiamo trarre molto da queste basi.

- Al `mouseup` possiamo completare intelligentemente il rilascio: modificare dati, spostare degli elementi vicini.
- Possiamo evidenziare gli elementi che stiamo sorvolando.
- Possiamo limitare il trascinamento in una certa area o direzione.
- Possiamo usare la event delegation per `mousedown/up`. Un gestore evento per aree vaste che controlla `event.target` può gestire centinaia di elementi.
- E così via.

Esistono frameworks che basano intere architetture su di esso: `DragZone`, `Droppable`, `Draggable` ed altre classi. La maggior parte di essi fanno cose simili a quelle appena descritte, quindi potrebbe essere semplice comprenderle adesso. Oppure potresti preparartelo da te, dal momento che abbiamo visto quanto sia facile da fare, talvolta più semplice di adattare una soluzione di terze parti.
