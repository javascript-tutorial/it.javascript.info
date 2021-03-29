libs:
  - d3
  - domtree

---

# Selection e Range

In questo articolo affronteremo la selezione nel documento, così come quella nei campi dei form, come gli `<input>`.
JavaScript può accedere a una selezione esistente, selezionare/deselezionare nodi DOM, interamente o parzialmente, rimuovere il contenuto selezionato dal documento, racchiuderlo in un tag e così via. 

Puoi trovare degli script già pronti per le azioni più comuni, alla fine del capitolo, nel "Riepilogo". Forse faranno fronte alle tue esigenze, ma otterrai molte più informazioni leggendo tutto il capitolo. Gli oggetti sottostanti `Range` e `Selection` sono di facile comprensione, e potrai quindi farne ciò che vuoi senza dover utilizzare script già pronti. 

## Range

Il concetto alla base della selezione è il [Range](https://dom.spec.whatwg.org/#ranges), il quale definisce una coppia di "punti limite": inizio e fine del range.

Un oggetto `Range` viene creato senza parametri:

```js
let range = new Range();
```
Possiamo quindi impostare i limiti della nostra selezione usando `range.setStart(node, offset)` e `range.setEnd(node, offset)`.

<<<<<<< HEAD
Il primo argomento `node` può essere un nodo di tipo testuale o di tipo elemento. Il significato del secondo, invece, dipende dal primo:

- Se `node` è testuale, `offset` sarà la posizione nel testo.
- Se `node` è un elemento, `offset` sarà la posizione del nodo figlio.

Per esempio, creiamo un range in questo frammento:
=======
Then we can set the selection boundaries using `range.setStart(node, offset)` and `range.setEnd(node, offset)`.

As you might guess, further we'll use the `Range` objects for selection, but first let's create few such objects.

### Selecting the text partially

The interesting thing is that the first argument `node` in both methods can be either a text node or an element node, and the meaning of the second argument depends on that.

**If `node` is a text node, then `offset` must be the position in its text.**

For example, given the element `<p>Hello</p>`, we can create the range containing the letters "ll" as follows:

```html run
<p id="p">Hello</p>
<script>
  let range = new Range();
  range.setStart(p.firstChild, 2);
  range.setEnd(p.firstChild, 4);
  
  // toString of a range returns its content as text
  console.log(range); // ll
</script>
```

Here we take the first child of `<p>` (that's the text node) and specify the text positions inside it:

![](range-hello-1.svg)

### Selecting element nodes

**Alternatively, if `node` is an element node, then `offset` must be the child number.** 

That's handy for making ranges that contain nodes as a whole, not stop somewhere inside their text.

For example, we have a more complex document fragment:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

```html autorun
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

<<<<<<< HEAD
Ecco la struttura del DOM:
=======
Here's its DOM structure with both element and text nodes:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

<div class="select-p-domtree"></div>

<script>
let selectPDomtree = {
  "name": "P",
  "nodeType": 1,
  "children": [{
    "name": "#text",
    "nodeType": 3,
    "content": "Example: "
  }, {
    "name": "I",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "italic"
    }]
  }, {
    "name": "#text",
    "nodeType": 3,
    "content": " and "
  }, {
    "name": "B",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "bold"
    }]
  }]
}

drawHtmlTree(selectPDomtree, 'div.select-p-domtree', 690, 320);
</script>

Creaiamo un range per `"Example: <i>italic</i>"`.

<<<<<<< HEAD
Come possiamo vedere, questa frase è composta esattamente dal primo e dal secondo figlio di `<p>`:

![](range-example-p-0-1.svg)

- L'inizio contiene `<p>` come `nodo` genitore, e `0` come offset.
- La fine contiene anch'esso `<p>` come `nodo` genitore, ma `2` come offset (specifica il range fino a `offset`, ma senza includerlo).

Eseguendo la demo potrai vedere il testo che viene selezionato:
=======
As we can see, this phrase consists of exactly two children of `<p>`, with indexes `0` and `1`:

![](range-example-p-0-1.svg)

- The starting point has `<p>` as the parent `node`, and `0` as the offset.

    So we can set it as `range.setStart(p, 0)`.
- The ending point also has `<p>` as the parent `node`, but `2` as the offset (it specifies the range up to, but not including `offset`).

    So we can set it as `range.setEnd(p, 2)`.

Here's the demo. If you run it, you can see that the text gets selected:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
*!*
  let range = new Range();

  range.setStart(p, 0);
  range.setEnd(p, 2);
*/!*

  // toString di un range restituisce il suo contenuto come testo senza i tags
  console.log(range); // Example: italic

<<<<<<< HEAD
  // applichiamo questo range per la selezione del documento (verrà spiegato in seguito)
=======
  // apply this range for document selection (explained later below)
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
  document.getSelection().addRange(range);
</script>
```

<<<<<<< HEAD
Ecco un banco di prova più flessibile, dove provare più varianti:
=======
Here's a more flexible test stand where you can set range start/end numbers and explore other variants:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

```html run autorun
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

From <input id="start" type="number" value=1> – To <input id="end" type="number" value=4>
<button id="button">Click to select</button>
<script>
  button.onclick = () => {
  *!*
    let range = new Range();

    range.setStart(p, start.value);
    range.setEnd(p, end.value);
  */!*

<<<<<<< HEAD
    // applica la selezione, spiegato in seguito
=======
    // apply the selection, explained later below
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>
```

<<<<<<< HEAD
Ad esempio selezionando all'interno della stesso `<p>` da offset `1` a `4` restituisce il range `<i>italic</i> and <b>bold</b>`:

![](range-example-p-1-3.svg)

Non dobbiamo necessariamente usare lo stesso nodo in `setStart` e `setEnd`. Un range può spaziare attraverso un serie di nodi non necessariamente correlati. La sola cosa che importa è che la fine sia effettivamente dopo l'inizio.

### Selezionare porzioni di nodi testuali


![](range-example-p-2-b-3.svg)

Selezioniamo parzialmente il testo, come nell'esempio:
![](range-example-p-2-b-3.svg)

Possiamo fare anche questo, abbiamo solo bisogno di impostare l'inizio e la fine come offset relativo nei nodi testuali.
=======
E.g. selecting in the same `<p>` from offset `1` to `4` gives us the range `<i>italic</i> and <b>bold</b>`:

![](range-example-p-1-3.svg)

```smart header="Starting and ending nodes can be different"
We don't have to use the same node in `setStart` and `setEnd`. A range may span across many unrelated nodes. It's only important that the end is after the start in the document.
```

### Selecting a bigger fragment

Let's make a bigger selection in our example, like this:

![](range-example-p-2-b-3.svg)

We already know how to do that. We just need to set the start and the end as a relative offset in text nodes.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Dobbiamo creare un range che:
- cominci dalla posizione 2 in `<p>` primo figlio (prendendo tutto tranne le prime due lettere di "Ex<b>ample:</b> ")
- finisca alla posizione 3 in `<b>` primo figlio (prendendo le prime tre lettere di "<b>bol</b>d", e nient'altro):

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p.firstChild, 2);
  range.setEnd(p.querySelector('b').firstChild, 3);

  console.log(range); // ample: italic and bol

  // usa questo range per la selezione (spiegato dopo)
  window.getSelection().addRange(range);
</script>
```

<<<<<<< HEAD
=======
As you can see, it's fairly easy to make a range of whatever we want.

If we'd like to take nodes as a whole, we can pass elements in `setStart/setEnd`. Otherwise, we can work on the text level. 

## Range properties

The range object that we created in the example above has following properties:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

L'oggetto Range ha le seguenti proprietà:
![](range-example-p-2-b-3-range.svg)

- `startContainer`, `startOffset` -- nodo e offset di inizio,
  - nell'esempio sopra: primo nodo testuale all'interno di `<p>` e `2`.
- `endContainer`, `endOffset` -- nodo e offset della fine,
  - nell'esempio sopra: primo nodo testuale all'interno di `<b>` e `3`.
- `collapsed` -- booleano, `true` se il range comincia e finisce nello stesso punto (quindi non c'è contenuto nel range),
  - nell'esempio sopra: `false`
- `commonAncestorContainer` -- il più vicino genitore tra tutti i nodi all'interno del range,
  - nell'esempio sopra: `<p>`

<<<<<<< HEAD
## Metodi di Range
=======

## Range selection methods
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Ci sono una serie di metodi convenienti per manipolare i range.

<<<<<<< HEAD
Imposta l'inizio del range:
=======
We've already seen `setStart` and `setEnd`, here are other similar methods.

Set range start:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

- `setStart(node, offset)` imposta l'inizio: alla posizione `offset` del `node`
- `setStartBefore(node)` imposta l'inizio: appena prima di `node`
- `setStartAfter(node)` imposta l'inizio: appena dopo di `node`

Imposta la fine del range (metodi simili):

- `setEnd(node, offset)` imposta la fine: alla posizione `offset` nel `node`
- `setEndBefore(node)` imposta la fine: appena prima di `node`
- `setEndAfter(node)` imposta la fine: appena dopo `node`

<<<<<<< HEAD
**Come visto, `node` può essere sia un nodo testuale che un nodo elemento: per i nodi testuali `offset` salta un equivalente numero di caratteri, mentre per i nodi elemento salta altrettanti nodi figlio.**

Altri metodi:
- `selectNode(node)` Imposta un range per selezionare l'intero `nodo`.
- `selectNodeContents(node)` Imposta un range per selezionare l'intero contenuto del `nodo`.
- `collapse(toStart)` se `toStart=true` imposta `end=start`, altrimenti imposta `start=end`, collassando così il range.
- `cloneRange()` crea un nuovo range con lo stesso inizio e fine

Per manipolare il contenuto attraverso il range:
=======
Technically, `setStart/setEnd` can do anything, but more methods provide more convenience.

In all these methods, `node` can be both a text or element node: for text nodes `offset` skips that many of characters, while for element nodes that many child nodes.

Even more methods to create ranges:
- `selectNode(node)` set range to select the whole `node`
- `selectNodeContents(node)` set range to select the whole `node` contents
- `collapse(toStart)` if `toStart=true` set end=start, otherwise set start=end, thus collapsing the range
- `cloneRange()` creates a new range with the same start/end

## Range editing methods

Once the range is created, we can manipulate its content using these methods:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

- `deleteContents()` -- rimuove il contenuto del range dal documento
- `extractContents()` -- rimuove il contenuto del range dal documento e lo ritorna come [DocumentFragment](info:modifying-document#document-fragment)
- `cloneContents()` -- clona un contenuto del range e lo restituisce come [DocumentFragment](info:modifying-document#document-fragment)
- `insertNode(node)` -- inserisce `node` nel documento all'inizio del range
- `surroundContents(node)` -- avvolge `node` attorno al contenuto range. Per questa azione, il range deve contenere i tag di apertura e chiusura per tutti gli elementi dentro di esso: non possono esserci range del tipo `<i>abc`.

Fondamentalmente, con questi metodi possiamo fare qualunque cosa con i nodi selezionati.

Ecco il banco di prova per vederli in azione:


```html run autorun height=260
Clicca sui pulsanti per eseguire i metodi nella selezione, "resetExample" per resettare.

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<p id="result"></p>
<script>
  let range = new Range();

  // Ogni metodo mostrato è rappresentato qui:
  let methods = {
    deleteContents() {
      range.deleteContents()
    },
    extractContents() {
      let content = range.extractContents();
      result.innerHTML = "";
      result.append("extracted: ", content);
    },
    cloneContents() {
      let content = range.cloneContents();
      result.innerHTML = "";
      result.append("cloned: ", content);
    },
    insertNode() {
      let newNode = document.createElement('u');
      newNode.innerHTML = "NEW NODE";
      range.insertNode(newNode);
    },
    surroundContents() {
      let newNode = document.createElement('u');
      try {
        range.surroundContents(newNode);
      } catch(e) { console.log(e) }
    },
    resetExample() {
      p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
      result.innerHTML = "";

      range.setStart(p.firstChild, 2);
      range.setEnd(p.querySelector('b').firstChild, 3);

      window.getSelection().removeAllRanges();  
      window.getSelection().addRange(range);  
    }
  };

  for(let method in methods) {
    document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
  }

  methods.resetExample();
</script>
```

Ci sono anche metodi per confrontare i range, ma vengono usati raramente. Nel caso in cui ne avessi bisogno puoi fare riferimento alle [specifiche](https://dom.spec.whatwg.org/#interface-range) o sul [manuale MDN](mdn:/api/Range).


## Selection

<<<<<<< HEAD
`Range` è un oggetto generico per la gestione dei range di selezione. Possiamo creare questi oggetti, passarli in giro -- ma non selezionano nulla a livello visivo di per sé.
=======
`Range` is a generic object for managing selection ranges. Although, creating a `Range` doesn't mean that we see a selection on screen.

We may create `Range` objects, pass them around -- they do not visually select anything on their own.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

La selezione del documento è rappresentata da un oggetto `Selection`, che si può ottenere come `window.getSelection()` o tramite `document.getSelection()`. Una selezione può includere zero o più range. Almeno così dice la [Specifica della API Selection](https://www.w3.org/TR/selection-api/).
In pratica, tuttavia, solamente Firefox permette di selezionare range multipli nel documento, attraverso la combinazione di tasti `key:Ctrl+click` (`key:Cmd+click` su Mac).

Qui potete vedere uno screenshot di una selezione con 3 range, fatta su Firefox:

![](selection-firefox.svg)

Gli altri browser supportano al massimo 1 range. Come vedremo, alcuni dei metodi di `Selection` implicano la possibilità di avere più range, ma di nuovo, tutti i browser eccetto Firefox, ne possono avere massimo 1.

## Proprietà di Selection

<<<<<<< HEAD
In modo simile a un range, una selezione ha un inizio, chiamato "anchor", e una fine, chiamata "focus".

Le principali proprietà di selection sono:
=======
Here's a small demo that shows the current selection (select something and click) as text:

<button onclick="alert(document.getSelection())">alert(document.getSelection())</button>

## Selection properties

As said, a selection may in theory contain multiple ranges. We can get these range objects using the method:

- `getRangeAt(i)` -- get i-th range, starting from `0`. In all browsers except Firefox, only `0` is used.

Also, there exist properties that often provide better convenience.

Similar to a range, a selection object has a start, called "anchor", and the end, called "focus".
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

- `anchorNode` -- il nodo dove comincia la selezione,
- `anchorOffset` -- l'offset in `anchorNode` dove comincia la selezione,
- `focusNode` -- il nodo in cui termina la selezione,
- `focusOffset` -- l'offset di `focusNode` in cui termina la selezione,
- `isCollapsed` -- `true` se la selezione non seleziona nulla (range vuoto), o non esiste.
- `rangeCount` -- conto del numero di selezioni, massimo `1` su tutti i browser, eccetto Firefox.


<<<<<<< HEAD
````smart header="Solitamente, l'offset in cui termina la selezione `focusNode`, si trova dopo l'offset di inizio selezione `anchorNode`, ma non è sempre questo il caso"
Esistono diversi modi per selezionare il contenuto, dipende dallo user agent: mouse, hotkeys, tap sullo schermo, etc.

Alcuni di essi, come il mouse, permettono che la selezione possa essere creata nelle due direzioni: "da sinistra a destra" e da "destra a sinistra".

Se l'inizio (anchor) della selezione nel documento si trova prima della fine (focus), si dice che questa selezione ha una direzione "forward" (in avanti)
=======
```smart header="Selection end/start vs Range"

There's an important differences of a selection anchor/focus compared with a `Range` start/end.

As we know, `Range` objects always have their start before the end. 

For selections, that's not always the case.

Selecting something with a mouse can be done in both directions: either "left-to-right" or "right-to-left".

In other words, when the mouse button is pressed, and then it moves forward in the document, then its end (focus) will be after its start (anchor).
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Ad esempio, se l'utente comincia la selezione con il mouse andando da "Example" a "italic":

![](selection-direction-forward.svg)

<<<<<<< HEAD
Diversamente, se la selezione va dalla fine di "italic" fino a "Example", si ha una selezione di tipo "backward" (all'indietro), il suo focus sarà prima dell'anchor:

![](selection-direction-backward.svg)

Questo è diverso dagli oggetti `Range` i quali sono sempre direzionati in avanti: l'inizio del range non può essere dopo la sua fine.
````
=======
...But the same selection could be done backwards: starting from  "italic" to "Example" (backward direction), then its end (focus) will be before the start (anchor):

![](selection-direction-backward.svg)
```
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

## Eventi di Selection

Ci sono eventi per tenere traccia della selezione:

<<<<<<< HEAD
- `elem.onselectstart` -- quando una selezione comincia su `elem`, per esempio, l'utente comincia a muovere il mouse tenendo il pulsante premuto.
    - Prevenire l'azione predefinita (prevent default), fa in modo che la selezione non cominci.
- `document.onselectionchange` -- ogni volta che una selezione viene modificata.
    - Nota bene: questo gestore può essere impostato solo su `document`.
=======
- `elem.onselectstart` -- when a selection *starts* on speficially elemen `elem` (or inside it). For instance, when the user presses the mouse button on it and starts to move the pointer.
    - Preventing the default action cancels the selection start. So starting a selection from this element becomes impossible, but the element is still selectable. The visitor just needs to start the selection from elsewhere.
- `document.onselectionchange` -- whenever a selection changes or starts.
    - Please note: this handler can be set only on `document`, it tracks all selections in it.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

### Demo di tracciamento per Selection

<<<<<<< HEAD
Ecco una piccola demo che mostra i limiti (intesi come confini), della Selection, dinamicamente al variare di essa:
=======
Here's a small demo. It tracks the current selection on the `document` and shows its boundaries:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

```html run height=80
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

From <input id="from" disabled> – To <input id="to" disabled>
<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    let {anchorNode, anchorOffset, focusNode, focusOffset} = selection;

    // anchorNode and focusNode are text nodes usually
    from.value = `${anchorNode?.data}, offset ${anchorOffset}`;
    to.value = `${focusNode?.data}, offset ${focusOffset}`;
  };
</script>
```

<<<<<<< HEAD
### Demo di ottenimento della selezione

Per ottenere l'intera selezione:
- Come testo: è sufficiente chiamare `document.getSelection().toString()`.
- Come nodo DOM: ottenere il range sottostante e chiamare i relativi metodi `cloneContents()` (solo il primo range nel caso non venga supportata la selezione multirange di Firefox).

Ecco la demo per ottenere sia la selezione di testo che di nodi DOM:
=======
### Selection copying demo

There are two approaches to copying the selected content:

1. We can use `document.getSelection().toString()` to get it as text.
2. Otherwise, to copy the full DOM, e.g. if we need to keep formatting, we can get the underlying ranges with `getRangesAt(...)`. A `Range` object, in turn, has `cloneContents()` method that clones its content and returns as `DocumentFragment` object, that we can insert elsewhere.

Here's the demo of copying the selected content both as text and as DOM nodes:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

```html run height=100
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

Cloned: <span id="cloned"></span>
<br>
As text: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    cloned.innerHTML = astext.innerHTML = "";

    // Clona i nodi a partire dal range (qui viene supportata la multiselezione)
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // Ottiene come testo
    astext.innerHTML += selection;
  };
</script>
```

## Metodi per la selezione

<<<<<<< HEAD
I metodi di selezione per aggiungere/rimuovere i range:

- `getRangeAt(i)` -- ottiene il range alla posizione i, partendo da '0'. In tutti i browser, tranne Firefox, viene usato solo `0`.
- `addRange(range)` -- aggiunge `range` alla selezione. Tutti i browser, eccetto Firefox, ignorano la chiamata, se la selezione ha già un range associato.
- `removeRange(range)` -- Rimuove `range` dalla selezione.
- `removeAllRanges()` -- Rimuove tutti i range.
- `empty()` -- alias per `removeAllRanges`.

Inoltre, ci sono metodi di utilità per manipolare direttamente il range di selezione, senza `Range`:
=======
We can work with the selection by addding/removing ranges:

- `getRangeAt(i)` -- get i-th range, starting from `0`. In all browsers except Firefox, only `0` is used.
- `addRange(range)` -- add `range` to selection. All browsers except Firefox ignore the call, if the selection already has an associated range.
- `removeRange(range)` -- remove `range` from the selection.
- `removeAllRanges()` -- remove all ranges.
- `empty()` -- alias to `removeAllRanges`.

There are also convenience methods to manipulate the selection range directly, without intermediate `Range` calls:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

- `collapse(node, offset)` --  rimpiazza il range selezionato con un nuovo range che comincia da `node`, alla posizione `offset`.
- `setPosition(node, offset)` -- alias di `collapse`.
- `collapseToStart()` - collassa (sostituisce con un nodo vuoto) all'inizio della selezione,
- `collapseToEnd()` - collassa alla fine della selezione,
- `extend(node, offset)` - muove il focus della selezione al nodo `node`, alla posizione `offset`,
- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - sostituisce il range selezionato con quello che ha inizio in `anchorNode/anchorOffset` e fine in `focusNode/focusOffset`. Tutto il contenuto in mezzo viene selezionato.
- `selectAllChildren(node)` -- seleziona tutti i figli di `node`.
- `deleteFromDocument()` -- rimuove il contenuto selezionato dal documento.
- `containsNode(node, allowPartialContainment = false)` -- controlla se la selezione contiene `node` (o una sua porzione, se il secondo argomento è `true`)

<<<<<<< HEAD
Nella maggior parte dei casi, quindi, possiamo semplicemente utilizzare i metodi offerti da `Selection`, senza dover accedere agli oggetti `Range` sottostanti.
=======
For most tasks these methods are just fine, there's no need to access the underlying `Range` object.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Per esempio, per selezionare l'intero contenuto del paragrafo `<p>`:

```html run
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  // seleziona dal figlio #0 di <p> all'ultimo figlio
  document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
</script>
```
Stessa cosa, utilizzando però i range:

```html run
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();
  range.selectNodeContents(p); // oppure selectNode(p) per selezionare il tag <p>

  document.getSelection().removeAllRanges(); // pulisce la selezione se esiste
  document.getSelection().addRange(range);
</script>
```

<<<<<<< HEAD
```smart header="Per effettuare una nuova selezione, va prima rimossa la selezione esistente."
Nel caso in cui ci fosse già una selezione attiva, va prima rimossa tramite `removeAllRanges()`. Una volta eliminata, sarà possibile aggiungere un nuovo `Range`. Diversamente, tutti i browser eccetto Firefox, ignoreranno i nuovi range.

L'eccezione a questa regola sono i metodi di selezione, che sostituiscono la selezione esistente, come `setBaseAndExtent`.
``` 
=======
```smart header="To select something, remove the existing selection first"
If a document selection already exists, empty it first with `removeAllRanges()`. And then add ranges. Otherwise, all browsers except Firefox ignore new ranges.

The exception is some selection methods, that replace the existing selection, such as `setBaseAndExtent`.
```
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

## Selezione nei controlli dei form

Gli elementi dei form, come `input` e `textarea` forniscono [API speciali per la selezione](https://html.spec.whatwg.org/#textFieldSelection), senza l'ausilio degli oggetti `Selection` o `Range`. Dato che un valore di input è testo puro, e non HTML, non è necessario l'utilizzo di questi due oggetti, poiché è tutto più semplificato.

Proprietà:
- `input.selectionStart` -- posizione dell'inizio della selezione (scrivibile),
- `input.selectionEnd` -- posizione della fine  della selezione (scrivibile),
- `input.selectionDirection` -- direzione della selezione, un valore tra: "forward", "backward" o "none" (ad esempio, la selezione attraverso il doppio click del mouse),

Eventi:
- `input.onselect` -- viene innescato alla selezione di un elemento.

Metodi:

- `input.select()` -- seleziona l'intero contenuto dell'area di testo (può essere una `textarea` invece che `input`),
- `input.setSelectionRange(start, end, [direction])` -- modifica la selezione, selezionando il contenuto compreso tra `start` fino a `end`, in una data direzione (opzionale).
- `input.setRangeText(replacement, [start], [end], [selectionMode])` -- sostituisce un range di testo con nuovo testo.

    Se forniti, gli argomenti opzionali `start` ed `end`, impostano l'inizio e la fine del range, altrimenti viene usata la selezione dell'utente.

   L'ultimo argomento, `selectionMode`, determina come la selezione verrà impostata dopo che il testo verrà rimpiazzato. I valori possibili sono:

    - `"select"` -- il nuovo testo inserito, verrà selezionato.
    - `"start"` -- il range di selezione collasserà subito prima del testo inserito (il cursore verrà posizionato subito prima di esso).
    - `"end"` -- il range di selezione collassa subito dopo del testo inserito (il cursore verrà posizionato alla sua destra).
    - `"preserve"` -- tenta di preservare la selezione. Questo è il comportamento predefinito.

Vediamo questi metodi in azione.

### Esempio: tenere traccia della selezione

Questo codice usa l'evento `onselect` per tenere traccia della selezione:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Selecting in this text updates values below.
</textarea>
<br>
From <input id="from" disabled> – To <input id="to" disabled>

<script>
  area.onselect = function() {
    from.value = area.selectionStart;
    to.value = area.selectionEnd;
  };
</script>
```

Nota bene:
- `onselect` viene innescato quando viene selezionato un elemento, ma non quando la selezione viene rimossa.
- l'evento `document.onselectionchange` non dovrebbe essere innescato per selezioni dentro un controllo di un form, secondo le [specifiche](https://w3c.github.io/selection-api/#dfn-selectionchange), dal momento che non è correlato alla selezione e range del `document`. Alcuni browser lo emettono in ogni caso, ma non possiamo farci affidamento.


### Esempio: spostare il cursore

Possiamo modificare `selectionStart` e `selectionEnd`, che impostano la selezione.

Un importante caso limite è quando `selectionStart` and `selectionEnd` si equivalgono. Ciò rappresenta esattamente la posizione del cursore. Oppure, riformulando, quando non c'è nulla di selezionato, la selezione è collassata nella posizione del cursore.

In questo modo, impostando `selectionStart` e `selectionEnd` allo stesso valore, spostiamo il cursore.

Ad esempio:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Focus on me, the cursor will be at position 10.
</textarea>

<script>
  area.onfocus = () => {
    // setTimeout impostato a zero, per eseguirlo subito dopo il che il "focus" viene completato.
    setTimeout(() => {
      // Possiamo impostare qualunque selezione
      // se start=end, il cursore è esattamente in quel punto
      area.selectionStart = area.selectionEnd = 10;
    });
  };
</script>
```

### Esempio: modifica della selezione

Per modificare il contenuto della selezione, possiamo usare il metodo `input.setRangeText()`. Di sicuro, possiamo leggere `selectionStart/End` e, conoscendo la selezione, possiamo cambiare la corrispondente sottostringa di `value`, ma `setRangeText` è molto più potente e spesso più conveniente.

Questo è un metodo in qualche maniera complesso. Nella sua forma più semplice con un solo argomento, sostituisce il range selezionato dall'utente e rimuove la selezione.

For example, here the user selection will be wrapped by `*...*`:

```html run autorun
<input id="input" style="width:200px" value="Select here and click the button">
<button id="button">Avvolge la selezione tra asterischi *...*</button>

<script>
button.onclick = () => {
  if (input.selectionStart == input.selectionEnd) {
    return; // nessuna selezione
  }

  let selected = input.value.slice(input.selectionStart, input.selectionEnd);
  input.setRangeText(`*${selected}*`);
};
</script>
```

With more arguments, we can set range `start` and `end`.

In this example we find `"THIS"` in the input text, replace it and keep the replacement selected:

```html run autorun
<input id="input" style="width:200px" value="Replace THIS in text">
<button id="button">Sostituisce THIS</button>

<script>
button.onclick = () => {
  let pos = input.value.indexOf("THIS");
  if (pos >= 0) {
    input.setRangeText("*THIS*", pos, pos + 4, "select");
    input.focus(); // focus per mantenere la selezione visibile
  }
};
</script>
```

### Esempio: inserimento nella posizione del cursore

Se non c'è nulla di selezionato, o se `start` ed `end` si equivalgono in `setRangeText`, allora il nuovo testo verrà solo inserito e non verrà rimosso nulla.

Possiamo anche inserire qualcosa "nella posizione del cursore" usando `setRangeText`.

Qui abbiamo un pulsante che inserisce `"HELLO"` sul cursore, posizionandolo immediatamente dopo. Se la selezione non è vuota, allora verrà sostituita (possiamo riconoscerla confrontando `selectionStart!=selectionEnd` o facendo qualcos'altro):


```html run autorun
<input id="input" style="width:200px" value="Text Text Text Text Text">
<button id="button">Inserisci "HELLO" al cursore</button>

<script>
  button.onclick = () => {
    input.setRangeText("HELLO", input.selectionStart, input.selectionEnd, "end");
    input.focus();
  };    
</script>
```


## Impedire la selezione

Per rendere qualcosa non selezionabile, ci sono tre modi:

1. Utilizzare la proprietà CSS `user-select: none`.

    ```html run
    <style>
    #elem {
      user-select: none;
    }
    </style>
    <div>Selezionabile <div id="elem">Non selezionabile</div> Selezionabile</div>
    ```

    Questo non permette alla selezione di cominciare su `elem`. Tuttavia l'utente può cominciare la selezione ovunque, ed includere `elem` al suo interno.

    Quindi `elem` diverrà parte di `document.getSelection()`, e così la selezione c'è, ma il suo contenuto viene generalmente ignorato nel copia-incolla.


2. Prevenire l'azione predefinita sugli eventi `onselectstart` o `mousedown`.

    ```html run
    <div>Selezionabile <div id="elem">Non selezionabile</div> Selezionabile</div>

    <script>
      elem.onselectstart = () => false;
    </script>
    ```

    Questo impedisce la selezione su `elem`, ma il visitatore può cominciare la selezione su un altro elemento e successivamente estendere la selezione su `elem`.

    Questo è comodo quando c'è un altro gestore di eventi nella stessa azione, che innesca la selezione (ad esempio `mousedown`). Facendo ciò, disabilitiamo la selezione evitando conflitti, lasciando che i contenuti `elem` possano ancora essere copiati.

3. Possiamo anche pulire la selezione successivamente dopo che sia avvenuta tramite `document.getSelection().empty()`. Questa cosa è usata raramente, dato che causa intermittenze non volute sulla selezione che compare-scompare.

## Riferimenti

- [Specifiche DOM: Range](https://dom.spec.whatwg.org/#ranges)
- [API Selection](https://www.w3.org/TR/selection-api/#dom-globaleventhandlers-onselectstart)
- [Specifiche HTML: APIs per il controllo delle selezioni sul testo](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#textFieldSelection)


## Riepilogo

Abbiamo affrontato due differenti API per le selezioni:

1. Per i documenti: oggetti `Selection` e `Range`.
2. Per gli `input`, `textarea`: proprietà e metodi aggiuntivi.

La seconda API è molto semplice, dato che lavora con i testi.

I codici pronti più usati sono probabilmente:     

1. Ottenere la selezione:
    ```js
    let selection = document.getSelection();

    let cloned = /* elemento nel quale clonare i nodi selezionati */;

    // quindi applica i metodi Range su selection.getRangeAt(0)
    // oppure a tutti i range per supportare la multiselezione, come in questo caso
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }
    ```
2. Impostare la selezione:
    ```js
    let selection = document.getSelection();

    // direttamente:
    selection.setBaseAndExtent(...from...to...);

    // oppure possiamo creare una range e:
    selection.removeAllRanges();
    selection.addRange(range);
    ```

Infine, relativamente al cursore. La posizione del cursore negli elementi editabili, come `<textarea>` è sempre all'inizio o alla fine della selezione. Possiamo usarla per ottenere la posizione corrente del cursore o per muovere il cursore impostando `elem.selectionStart` e `elem.selectionEnd`.
