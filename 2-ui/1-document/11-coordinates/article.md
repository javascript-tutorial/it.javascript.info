# Coordinate

Per spostare gli elementi dovremmo conoscere bene le coordinate.

La gran parte dei metodi JavaScript ha a che fare con uno di questi due sistemi di coordinate:

1. **Coordinate relative alla finestra** - paragonabili a `position:fixed`, calcolate dal bordo superiore sinistro della finestra.
    - indicheremo queste coordinate con `clientX/clientY`, il ragionamento per tale nome diventerà evidente in seguito, quando studieremo le proprietà degli eventi.
2. **Coordinate relative al documento** - paragonabili a `position:absolute` riferito alla radice del documento, calcolate dal bordo superiore sinistro del documento.
    - le indicheremo con `pageX/pageY`.

Quando la pagina è al suo inizio, così che l'angolo superiore sinistro della finestra coincide esattamente con l'angolo superiore sinistro del documento, queste coordinate sono uguali tra loro. Ma dopo che si scorre la pagina, le coordinate relative alla finestra cambiano via via che gli elementi si spostano all'interno di questa, mentre le coordinate relative al documento rimangono invariate.

In questa immagine consideriamo un punto nel documento e mostriamo le sue coordinate prima dello scorrimento (riquadro a sinistra) e dopo di esso (riquadro a destra):

![](document-and-window-coordinates-scrolled.svg)

Quando il documento scorre:
- `pageY` - la coordinata relativa al documento non cambia, si prende a riferimento la parte superiore del documento (che ora fuori dall'area visibile di scorrimento).
- `clientY` - la coordinata relativa alla finestra è cambiata (la freccia è diventata più corta), dal momento che lo stesso punto è più vicino al bordo superiore della finestra.

## Le coordinate di un elemento: getBoundingClientRect

Il metodo `elem.getBoundingClientRect()` restituisce le coordinate relative alla finestra del rettangolo minimo che racchiude `elem` come oggetto della classe nativa [DOMRect](https://www.w3.org/TR/geometry-1/#domrect).

Ecco le principali proprietà di `DOMRect`:

- `x/y` -- le coordinate X/Y dell'origine rettangolo relative alla finestra,
- `width/height` -- larghezza/altezza del rettangolo (possono avere valori negativi).

Ci sono, inoltre, proprietà derivate:

- `top/bottom` -- la coordinata Y per i bordi superiore/inferiore del rettangolo,
- `left/right` -- la coordinata X per i bordi sinistro/destro del rettangolo.

```online
Clicca, per esempio, su questo pulsante per conoscere le sue coordinate relative alla finestra:

<p><input id="brTest" type="button" value="Ottieni le coordinate utilizzando button.getBoundingClientRect() per questo pulsante" onclick='showRect(this)'/></p>

<script>
function showRect(elem) {
  let r = elem.getBoundingClientRect();
  alert(`x:${r.x}
y:${r.y}
width:${r.width}
height:${r.height}
top:${r.top}
bottom:${r.bottom}
left:${r.left}
right:${r.right}
`);
}
</script>

Se scorrete la pagina e ripetete il test, noterete che quando cambia la posizione relativa alla finestra del pulsante, cambiano anche le sue coordinate relative alla finestra (`y/top/bottom` se scorri verticalmente)
```

Di seguito un'immagine descrittiva dell'output di `elem.getBoundingClientRect()`:

![](coordinates.svg)

Come potete osservare, `x/y` e `width/height` descrivono pienamente il rettangolo. A partire da queste si possono calcolare agevolmente le proprietà derivate:

- `left = x`
- `top = y`
- `right = x + width`
- `bottom = y + height`

Nota bene:

- Le coordinate possono avere valori decimali, come `10.5`. È normale, il browser internamente usa frazioni nei calcoli. Non dobbiamo arrotondare quando assegniamo i valori a `style.left/top`.
- Le coordinate possono essere negative. Per esempio se la pagina scorre in modo che `elem` sia al di là del bordo della finestra, allora `elem.getBoundingClientRect().top` è negativa.

```smart header="Perché le proprietà derivate sono necessarie? Perché esistono `top/left` se ci sono già `x/y`?"
In matematica un rettangolo è definito unicamente dalla sua origine `(x,y)` e dal vettore di direzione `(width,height)`. Le proprietà aggiuntive derivate esistono quindi per comodità.

Tecnicamente è possibile per `width/height` essere negativi in base alla "direzione" del rettangolo, ad esempio per rappresentare la selezione del mouse con l'inizio e la fine contrassegnati adeguatamente.

Valori negativi per `width/height` comportano che il rettangolo abbia inizio dal suo angolo in basso a destra e si sviluppi a sinistra verso l'alto.

Ecco un rettangolo con `width` e `height` negativi (es. `width=-200`, `height=-100`):

![](coordinates-negative.svg)

Come potete notare, in casi del genere `left/top` non sono equivalenti a `x/y`.

Ma in pratica `elem.getBoundingClientRect()` restituisce sempre valori positivi per width/height. Qui menzioniamo i valori negativi per `width/height` solo per farvi comprendere il motivo per cui queste proprietà apparentemente duplicate in realtà non lo siano.
```

```warn header="Internet Explorer non supporta `x/y`"
Internet Explorer non supporta le proprietà `x/y` per ragioni storiche.

Possiamo quindi ricorrere ad un polyfill (aggiungendo dei getter in `DomRect.prototype`) o utilizzare semplicemente `top/left`, dal momento che, queste ultime, corrispondono sempre a `x/y` per i valori positivi di `width/height` restituiti da `elem.getBoundingClientRect()`.
```

```warn header="Le coordinate right/bottom sono differenti dalle proprietà di posizione CSS"
Ci sono delle evidenti rassomiglianze tra le coordinate relative alla finestra e `position:fixed` dei CSS.

Nel posizionamento CSS, tuttavia, la proprietà `right` indica la distanza dal bordo destro, e la proprietà `bottom` indica la distanza dal bordo in basso.

Se diamo una semplice occhiata all'immagine sopra, possiamo notare che in JavaScript non è così. Tutte le coodinate relative alla finestra sono calcolate a partire dall'angolo superiore sinistro e queste non fanno eccezione.
```

## elementFromPoint(x, y) [#elementFromPoint]

La chiamata a `document.elementFromPoint(x, y)` restituisce l'elemento più annidato alle coordinate `(x, y)` relative alla finestra.

La sintassi è:

```js
let elem = document.elementFromPoint(x, y);
```

Il codice sotto, ad esempio, evidenzia e mostra il tag dell'elemento che si trova adesso al centro della finestra:

```js run
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert(elem.tagName);
```

Dal momento che usa le coordinate relative alla finestra, l'elemento può variare in base alla posizione di scorrimento corrente.

````warn header="Per coordinate al di fuori della finestra `elementFromPoint` restituisce `null`"
Il metodo `document.elementFromPoint(x,y)` funziona solo se `(x,y)` sono dentro l'area visibile.

Se una delle coordinate è negativa o eccede le dimensioni della finestra, restituisce `null`.

Ecco un tipico errore che può verificarsi se non prestiamo attenzione a questa eventualità:

```js
let elem = document.elementFromPoint(x, y);
// se le coordinate sono fuori dalla finestra elem = null
*!*
elem.style.background = ''; // Error!
*/!*
```
````

## Uso per il posizionamento "fisso"

Most of time we need coordinates in order to position something.

To show something near an element, we can use `getBoundingClientRect` to get its coordinates, and then CSS `position` together with `left/top` (or `right/bottom`).

For instance, the function `createMessageUnder(elem, html)` below shows the message under `elem`:

```js
let elem = document.getElementById("coords-show-mark");

function createMessageUnder(elem, html) {
  // create message element
  let message = document.createElement('div');
  // better to use a css class for the style here
  message.style.cssText = "position:fixed; color: red";

*!*
  // assign coordinates, don't forget "px"!
  let coords = elem.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";
*/!*

  message.innerHTML = html;

  return message;
}

// Usage:
// add it for 5 seconds in the document
let message = createMessageUnder(elem, 'Hello, world!');
document.body.append(message);
setTimeout(() => message.remove(), 5000);
```

```online
Click the button to run it:

<button id="coords-show-mark">Button with id="coords-show-mark", the message will appear under it</button>
```

The code can be modified to show the message at the left, right, below, apply CSS animations to "fade it in" and so on. That's easy, as we have all the coordinates and sizes of the element.

But note the important detail: when the page is scrolled, the message flows away from the button.

The reason is obvious: the message element relies on `position:fixed`, so it remains at the same place of the window while the page scrolls away.

To change that, we need to use document-based coordinates and `position:absolute`.

## Document coordinates [#getCoords]

Document-relative coordinates start from the upper-left corner of the document, not the window.

In CSS, window coordinates correspond to `position:fixed`, while document coordinates are similar to `position:absolute` on top.

We can use `position:absolute` and `top/left` to put something at a certain place of the document, so that it remains there during a page scroll. But we need the right coordinates first.

There's no standard method to get the document coordinates of an element. But it's easy to write it.

The two coordinate systems are connected by the formula:
- `pageY` = `clientY` + height of the scrolled-out vertical part of the document.
- `pageX` = `clientX` + width of the scrolled-out horizontal part of the document.

The function `getCoords(elem)` will take window coordinates from `elem.getBoundingClientRect()` and add the current scroll to them:

```js
// get document coordinates of the element
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
```

If in the example above we used it with `position:absolute`, then the message would stay near the element on scroll.

The modified `createMessageUnder` function:

```js
function createMessageUnder(elem, html) {
  let message = document.createElement('div');
  message.style.cssText = "*!*position:absolute*/!*; color: red";

  let coords = *!*getCoords(elem);*/!*

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}
```

## Riepilogo

Any point on the page has coordinates:

1. Relative to the window -- `elem.getBoundingClientRect()`.
2. Relative to the document -- `elem.getBoundingClientRect()` plus the current page scroll.

Window coordinates are great to use with `position:fixed`, and document coordinates do well with `position:absolute`.

Both coordinate systems have their pros and cons; there are times we need one or the other one, just like CSS `position` `absolute` and `fixed`.
