
# Elementi personalizzati

Possiamo creare elementi HTML personalizzati, descritti tramite delle apposite classi, con metodi propri metodi, proprietà, eventi e così via.

Una volta definito un elemento personalizzato, possiamo usarlo al pari qualunque altro elemento HTML built-in.

Ciò è grandioso, dato che il dizionario HTML è molto ricco, ma non infinito. Non ci sono `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>`... Basti pensare a qualunque altro tag di cui abbiamo necessità.

Possiamo definirli con classi speciali, ed usarli come se fossero sempre stati parte dell'HTML.

Gli elementi personalizzati si dividono in due categorie:

1. **Custom elements autonomi** -- elementi "nuovi di zecca", che estendono la casse astratta `HTMLElement`.
2. **Customized built-in elements** -- che estendono gli elementi built-in, ad esempio un pulsante personalizzato, basato su `HTMLButtonElement` etc.

Per primo, affrontiamo gli elementi autonomi, dopodiché ci sposteremo su quelli built-in personalizzati.

Per creare un elemento personalizzato, abbiamo bisogno di comunicare al browser una serie di dettagli su di esso: come mostrarlo, cosa fare una volta che l'elemento venga aggiunto o rimosso dalla pagina, etc.

Ciò viene fatto creando una classe con metodi speciali. È facile, dato che ci sono pochi metodi e sono tutti opzionali.

Ecco uno scheletro per la classe, con la lista completa:

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // elemento creato
  }

  connectedCallback() {
    // il browser chiama questo metodo quando l'elemento viene aggiunto al documento
    // (può essere chiamato tante volte se un elemento viene raggiunto o rimosso)
  }

  disconnectedCallback() {
    // il browser chiama questo metodo quando l'elemento viene rimosso dal documento
    // (può essere chiamato tante volte se un elemento viene aggiunto o rimosso)
  }

  static get observedAttributes() {
    return [/* un array di nomi di attributi per monitorare le modifiche */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // chiamato quadno uno degli attributi della lista precendente viene modificato
  }

  adoptedCallback() {
    // chiamato quando l'elemento viene spostato su un nuovo documento
    // (avviene in document.adoptNode, usato molto raramente)
  }

  // possono esserci altri metodi e proprietà per l'elemento
}
```

Dopodiché, possiamo registrare l'elemento:

```js
// fa in modo che il browser sappia che <my-element> venga fornito dalla nostra classe
customElements.define("my-element", MyElement);
```

Adesso, per ogni elemento HTML con tag `<my-element>`, verrà creata un'istanza di `MyElement`, e chiamati i sopracitati metodi. Possiamo anche chiamare `document.createElement('my-element')` in JavaScript.

```smart header="Il nome degli elementi custom devono contenere un trattino `-`"
I nomi degli elementi personalizzati devono contenere un trattino `-`, ad esempio `my-element` e `super-button` sono nomi validi, al contrario di `myelement`.

Ciò ci assicura l'assenza di conflitti tra i nostri elementi HTML personalizzati e quelli built-in.
```

## Esempio: "time-formatted"

Per esempio, esiste già l'elemento `<time>` nell'HTML, per la data/ora. Solo che da sè non compie alcuna formattazione del dato.

Creiamo un elemento `<time-formatted>` che visualizza l'ora in un bel formato che consideri la lingua:


```html run height=50 autorun="no-epub"
<script>
*!*
class TimeFormatted extends HTMLElement { // (1)
*/!*

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

*!*
customElements.define("time-formatted", TimeFormatted); // (2)
*/!*
</script>

<!-- (3) -->
*!*
<time-formatted datetime="2019-12-01"
*/!*
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

1. La classe contiene solo il metodo `connectedCallback()`, che il browser chiama appena l'elemento `<time-formatted>` viene aggiunto alla pagina (o quando il parser HTML lo riconosce). Il metodo usa il formattatore built-in delle date built-in [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat), ben supportato dai browser, per mostrare l'ora ben formattata.
2. Dobbiamo registrare il nostro nuovo elemento tramite `customElements.define(tag, class)`.
3. A questo punto potremo usarlo ovunque.


```smart header="Aggiornamento degli elementi personalizzati"
Se il browser incontrasse un elemento `<time-formatted>` prima di `customElements.define`, non andrebbe in errore. Ma tratterebbe l'elemento come sconosciuto, come tratterebbe un tag non standard.

Così questi elementi "undefined" possono essere stilizzati con il selettore CSS `:not(:defined)`.

Quando viene chiamato `customElement.define`, vengono "aggiornati": viene creata una nuova istanza di `TimeFormatted` per ognuno di essi, e chiamato il metodo `connectedCallback`. Quindi diventeranno `:defined`.

Per avere informazioni sugli elementi personalizzati, ci sono due metodi:
- `customElements.get(name)` -- restituisce la classe per un elemento con il dato `name`,
- `customElements.whenDefined(name)` -- restituisce una promise che risolve (senza valore) quando un elmemento con il dato nome diventa definito.
```

```smart header="Rendering in `connectedCallback`, not in `constructor`"
In the example above, element content is rendered (created) in `connectedCallback`.

Why not in the `constructor`?

The reason is simple: when `constructor` is called, it's yet too early. The element is created, but the browser did not yet process/assign attributes at this stage: calls to `getAttribute` would return `null`. So we can't really render there.

Besides, if you think about it, that's better performance-wise -- to delay the work until it's really needed.

The `connectedCallback` triggers when the element is added to the document. Not just appended to another element as a child, but actually becomes a part of the page. So we can build detached DOM, create elements and prepare them for later use. They will only be actually rendered when they make it into the page.
```

## Observing attributes

In the current implementation of `<time-formatted>`, after the element is rendered, further attribute changes don't have any effect. That's strange for an HTML element. Usually, when we change an attribute, like `a.href`, we expect the change to be immediately visible. So let's fix this.

We can observe attributes by providing their list in `observedAttributes()` static getter. For such attributes, `attributeChangedCallback` is called when they are modified. It doesn't trigger for other, unlisted attributes (that's for performance reasons).

Here's a new `<time-formatted>`, that auto-updates when attributes change:

```html run autorun="no-epub" height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
```

1. The rendering logic is moved to `render()` helper method.
2. We call it once when the element is inserted into page.
3. For a change of an attribute, listed in `observedAttributes()`, `attributeChangedCallback` triggers.
4. ...and re-renders the element.
5. At the end, we can easily make a live timer.

## Rendering order

When HTML parser builds the DOM, elements are processed one after another, parents before children. E.g. if we have `<outer><inner></inner></outer>`, then `<outer>` element is created and connected to DOM first, and then `<inner>`.

That leads to important consequences for custom elements.

For example, if a custom element tries to access `innerHTML` in `connectedCallback`, it gets nothing:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    alert(this.innerHTML); // empty (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

If you run it, the `alert` is empty.

That's exactly because there are no children on that stage, the DOM is unfinished. HTML parser connected the custom element `<user-info>`, and is going to proceed to its children, but just didn't yet.

If we'd like to pass information to custom element, we can use attributes. They are available immediately.

Or, if we really need the children, we can defer access to them with zero-delay `setTimeout`.

This works:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    setTimeout(() => alert(this.innerHTML)); // John (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Now the `alert` in line `(*)` shows "John", as we run it asynchronously, after the HTML parsing is complete. We can process children if needed and finish the initialization.

On the other hand, this solution is also not perfect. If nested custom elements also use `setTimeout` to initialize themselves, then they queue up: the outer `setTimeout` triggers first, and then the inner one.

So the outer element finishes the initialization before the inner one.

Let's demonstrate that on example:

```html run height=0
<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
  }
});
</script>

*!*
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
*/!*
```

Output order:

1. outer connected.
2. inner connected.
3. outer initialized.
4. inner initialized.

We can clearly see that the outer element finishes initialization `(3)` before the inner one `(4)`.

There's no built-in callback that triggers after nested elements are ready. If needed, we can implement such thing on our own. For instance, inner elements can dispatch events like `initialized`, and outer ones can listen and react on them.

## Customized built-in elements

New elements that we create, such as `<time-formatted>`, don't have any associated semantics. They are unknown to search engines, and accessibility devices can't handle them.

But such things can be important. E.g, a search engine would be interested to know that we actually show a time. And if we're making a special kind of button, why not reuse the existing `<button>` functionality?

We can extend and customize built-in HTML elements by inheriting from their classes.

For example, buttons are instances of `HTMLButtonElement`, let's build upon it.

1. Extend `HTMLButtonElement` with our class:

    ```js
    class HelloButton extends HTMLButtonElement { /* custom element methods */ }
    ```

2. Provide the third argument to `customElements.define`, that specifies the tag:
    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```    

    There may be different tags that share the same DOM-class, that's why specifying `extends` is needed.

3. At the end, to use our custom element, insert a regular `<button>` tag, but add `is="hello-button"` to it:
    ```html
    <button is="hello-button">...</button>
    ```

Here's a full example:

```html run autorun="no-epub"
<script>
// The button that says "hello" on click
class HelloButton extends HTMLButtonElement {
*!*
  constructor() {
*/!*
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

*!*
customElements.define('hello-button', HelloButton, {extends: 'button'});
*/!*
</script>

*!*
<button is="hello-button">Click me</button>
*/!*

*!*
<button is="hello-button" disabled>Disabled</button>
*/!*
```

Our new button extends the built-in one. So it keeps the same styles and standard features like `disabled` attribute.

## References

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Compatiblity: <https://caniuse.com/#feat=custom-elements>.

## Summary

Custom elements can be of two types:

1. "Autonomous" -- new tags, extending `HTMLElement`.

    Definition scheme:

    ```js
    class MyElement extends HTMLElement {
      constructor() { super(); /* ... */ }
      connectedCallback() { /* ... */ }
      disconnectedCallback() { /* ... */  }
      static get observedAttributes() { return [/* ... */]; }
      attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
      adoptedCallback() { /* ... */ }
     }
    customElements.define('my-element', MyElement);
    /* <my-element> */
    ```

2. "Customized built-in elements" -- extensions of existing elements.

    Requires one more `.define` argument, and `is="..."` in HTML:
    ```js
    class MyButton extends HTMLButtonElement { /*...*/ }
    customElements.define('my-button', MyElement, {extends: 'button'});
    /* <button is="my-button"> */
    ```

Custom elements are well-supported among browsers. Edge is a bit behind, but there's a polyfill <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.
