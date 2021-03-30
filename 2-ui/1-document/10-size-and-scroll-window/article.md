# Dimensioni e scorrimento della finestra del browser

Come scoprire la larghezza e l'altezza della finestra del browser? Come ricavare la larghezza e l'altezza totali del documento, incluse le parti fuori dall'area visibile di scorrimento? Come far scorrere la pagina tramite JavaScript?

Per questo genere di informazioni possiamo utilizzare l'elemento radice del documento `document.documentElement`, che corrisponde al tag `<html>`. Ci sono, tuttavia, ulteriori metodi e peculiarità da considerare.

## Larghezza e altezza della finestra

Per ottenere la larghezza e l'altezza della finestra, possiamo far uso delle proprietà `clientWidth/clientHeight` di `document.documentElement`:

![](document-client-width-height.svg)

```online
Ad esempio questo pulsante mostra l'altezza della tua finestra:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

````warn header="Non usare `window.innerWidth/innerHeight`"
I browser supportano inoltre proprietà come `window.innerWidth/innerHeight`. Sembra che facciano al nostro caso, quindi perché non usare queste?

Se esiste una barra di scorrimento ed occupa uno spazio, `clientWidth/clientHeight` forniscono la larghezza e l'altezza al netto della barra (la sottraggono). In altre parole restituiscono le dimensioni della parte visibile del documento disponibile per il contenuto.

Le proprietà `window.innerWidth/innerHeight` includono invece la barra di scorrimento.

Se la barra di scorrimento è presente ed occupa uno spazio, allora queste due linee di codice mostreranno dei valori differenti:
```js run
alert( window.innerWidth ); // larghezza della finestra comprensiva di barra di scorrimento
alert( document.documentElement.clientWidth ); // larghezza della finestra barra esclusa
```

Nella maggior parte dei casi abbiamo bisogno della larghezza della finestra *disponibile* per disegnare o posizionare qualcosa all'interno delle barre di scorrimento (se presenti), quindi dovremmo usare `documentElement.clientHeight/clientWidth`.
````

```warn header="Il `DOCTYPE` è importante"
Si noti che le proprietà geometriche ad alto livello possono funzionare in modo leggermente differente se non c'è `<!DOCTYPE HTML>` nell'HTML. Si potrebbero verificare comportamenti imprevedibili.

Nell'HTML moderno dovremmo sempre indicare il `DOCTYPE`.
```

## Larghezza e altezza del documento

Teoricamente, poiché l'elemento radice del documento è `document.documentElement` e racchiude tutto il contenuto, potremmo misurare le dimensioni totali del documento con `document.documentElement.scrollWidth/scrollHeight`.

Ma su questo elemento, per l'intera pagina, queste proprietà non funzionano come dovrebbero. In Chrome/Safari/Opera, nel caso in cui non ci sia barra di scorrimento, `documentElement.scrollHeight` può essere anche minore di `documentElement.clientHeight`! Strano, no?

Per ottenere l'altezza totale del documento in modo affidabile, dovremmo scegliere il valore maggiore tra queste proprietà:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert("Altezza totale del documento, compresa la parte fuori dall'area visibile di scorrimento: " + scrollHeight);
```

Perché così? Meglio non chiedere. Queste incongruenze provengono da tempi lontani, non c'è alcuna logica.

## Ottenere il valore corrente dello scorrimento [#page-scroll]

DOM elements have their current scroll state in their `scrollLeft/scrollTop` properties.

For document scroll, `document.documentElement.scrollLeft/scrollTop` works in most browsers, except older WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use `document.body` instead of `document.documentElement`.

Luckily, we don't have to remember these peculiarities at all, because the scroll is available in the special properties, `window.pageXOffset/pageYOffset`:

```js run
alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
```

These properties are read-only.

## Scrolling: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
To scroll the page with JavaScript, its DOM must be fully built.

For instance, if we try to scroll the page with a script in `<head>`, it won't work.
```

Regular elements can be scrolled by changing `scrollTop/scrollLeft`.

We can do the same for the page using `document.documentElement.scrollTop/scrollLeft` (except Safari, where `document.body.scrollTop/Left` should be used instead).

Alternatively, there's a simpler, universal solution: special methods [window.scrollBy(x,y)](mdn:api/Window/scrollBy) and [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).

- The method `scrollBy(x,y)` scrolls the page *relative to its current position*. For instance, `scrollBy(0,10)` scrolls the page `10px` down.

    ```online
    The button below demonstrates this:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
- The method `scrollTo(pageX,pageY)` scrolls the page *to absolute coordinates*, so that the top-left corner of the visible part has coordinates `(pageX, pageY)` relative to the document's top-left corner. It's like setting `scrollLeft/scrollTop`.

    To scroll to the very beginning, we can use `scrollTo(0,0)`.

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

These methods work for all browsers the same way.

## scrollIntoView

For completeness, let's cover one more method: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).

The call to `elem.scrollIntoView(top)` scrolls the page to make `elem` visible. It has one argument:

- If `top=true` (that's the default), then the page will be scrolled to make `elem` appear on the top of the window. The upper edge of the element will be aligned with the window top.
- If `top=false`, then the page scrolls to make `elem` appear at the bottom. The bottom edge of the element will be aligned with the window bottom.

```online
The button below scrolls the page to position itself at the window top:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

And this button scrolls the page to position itself at the bottom:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## Forbid the scrolling

Sometimes we need to make the document "unscrollable". For instance, when we need to cover the page with a large message requiring immediate attention, and we want the visitor to interact with that message, not with the document.

To make the document unscrollable, it's enough to set `document.body.style.overflow = "hidden"`. The page will "freeze" at its current scroll position.

```online
Try it:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

The first button freezes the scroll, while the second one releases it.
```

We can use the same technique to freeze the scroll for other elements, not just for `document.body`.

The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free and the content "jumps" to fill it.

That looks a bit odd, but can be worked around if we compare `clientWidth` before and after the freeze. If it increased (the scrollbar disappeared), then add `padding` to `document.body` in place of the scrollbar to keep the content width the same.

## Summary

Geometry:

- Width/height of the visible part of the document (content area width/height): `document.documentElement.clientWidth/clientHeight`
- Width/height of the whole document, with the scrolled out part:

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

Scrolling:

- Read the current scroll: `window.pageYOffset/pageXOffset`.
- Change the current scroll:

    - `window.scrollTo(pageX,pageY)` -- absolute coordinates,
    - `window.scrollBy(x,y)` -- scroll relative the current place,
    - `elem.scrollIntoView(top)` -- scroll to make `elem` visible (align with the top/bottom of the window).
