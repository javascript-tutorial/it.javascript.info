# Shadow DOM

Lo Shadow DOM serve all'incapsulamento. Pemrmette al componente di avere il proprio DOM "shadow" (fantasma), al quale il documento principale non può accedere nemmeno accidentalmente, e può avere regole di stile con scope locale e molto altro acnora

## Shadow DOM built-in

Avete mai pensato a come i controlli del browser, così complessi, vengono creati e stilizzati?

Prendiamo `<input type="range">` ad esempio:

<p>
<input type="range">
</p>

Il browser usa i DOM/CSS internamente per visualizzarli a schermo. Normalmente la struttura del DOM ci è invisibile, ma possiamo vederla negli strumenti dello sviluppatore dei browser. Ad esempio negli strumenti di sviluppo di Chrome, lo facciamo attivando, nelle impostazioni generiche, l'opzione "Show user agent shadow DOM".

Così facendo `<input type="range">` verrà mostrato in questo modo:

![](shadow-dom-range.png)

Quello che vediamo alla voce `#shadow-root` viene chiamato "shadow DOM".

Non possiamo lavorare sugli elementi built-in dello shadow DOM tramite normale chiamate o selettori CSS. Non sono nodi figli normali, ma una potente tecnica di incapsulamento.

Nell'esempio precendente, possiamo notare l'attributo `pseudo`, molto utile. Non è standard, esiste per ragioni storiche e possiamo usarlo per stilizzare i sottoelementi con i CSS, in questo modo:

```html run autorun
<style>
/* colora la traccia di rosso */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

Ripetiamolo, `pseudo` è un attributo non-standard. Cronologicamente, i browser hanno cominciato a sperimentare con le strutture interne del DOM per implementare dei controlli, e con il passare del tempo, lo shadow DOM è stato standardizzato per permettere a noi sviluppatori, di fare alla stessa maniera.

Più avanti, utilizzeremo lo standard shadow DOM moderno, affrontato nella sezione delle [spacifiche DOM](https://dom.spec.whatwg.org/#shadow-trees) ed altre specifiche correlate.  

## Albero shadow

Un elemento DOM può contenere due tipi di sottoalberi:

1. Albero light -- un normale sottoalbero DOM, fatto di figli HTML. Tutti i sottoalberi affrontati nei capitolo precedenti appartengono a questa categoria "light".
2. Albero shadow -- un sottoalbero DOM nascosto, senza corrispettivo nell'HTML, nascosto da "occhi indiscreti".

Se un elemento li ha entrambi, il browser renderizza solo l'albero shadow. Ma possiamo impostare una sorta di composizione tra gli alberi light e shadow. Vedremo in dettaglio l'argomento nell'apposita sezione <info:slots-composition>.

Gli alberi shadow possono essere usati nei Custom Elements per nascondere i componenti interni ed applicare gli stili locali del componente.

Per esempio, questo elemento, `<show-hello>` nasconde il suo DOM interno nell'albero shadow:

```html run autorun height=60
<script>
customElements.define('show-hello', class extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<p>
      Hello, ${this.getAttribute('name')}
    </p>`;
  }  
});
</script>

<show-hello name="John"></show-hello>
```

Ecco come risulta il DOM, negli strumenti di sviluppo di Chrome, con il contenuto inserito in "#shadow-root":

![](shadow-dom-say-hello.png)

Inizialmente, la chiamata a `elem.attachShadow({mode: …})` crea un albero shadow.

Ci sono due limitazioni:
1. Possiamo creare solo una shadow root per ogni elemento.
2. L'elemento `elem` deve essere, o un elemento personalizzato, o uno tra questi elementi: "article", "aside", "blockquote", "body", "div", "footer", "h1..h6", "header", "main" "nav", "p", "section", o "span". Altri elementi, come ad esempio, `<img>`, non possono contenere un albero shadow.

L'opzione `mode` imposta il livello di incapsulamento. Le opzioni possibili sono:
- `"open"` -- la shadow root è disponibile tramite `elem.shadowRoot`.

    L'albero shadow di `elem` è accessibile da qualunque codice.   
- `"closed"` -- `elem.shadowRoot` è sempre `null`.

    Il DOM shadow, è accessibile esclusivamente dal riferimento restituito da `attachShadow` (il quale, con ogni probabilità, sarà nascosto dentro una classe. Alberi shadow nativi del browser come `<input type="range">` appartengono a questa categoria, e non c'è modo di accedervi.

La [shadow root](https://dom.spec.whatwg.org/#shadowroot), restituita con `attachShadow`, è come un elemento: possiamo usare `innerHTML` o i metodi DOM, come `append`, per popolarlo di elementi.

L'elemento con una shadow root viene invece chiamato "shadow tree host", ed è disponibile attraverso la proprietà `host` della shadow root:

```js
// supponiamo di avere {mode: "open"}, altrimenti elem.shadowRoot sarebbe null
alert(elem.shadowRoot.host === elem); // true
```

## Incapsulamnto

Vi è una marcata delimitazione tra il DOM shadow ed il documento principale:

1. Gli elementi del DOM shadow non sono rilevabili tramite `querySelector` del Light DOM. In particolare, gli id degli elementi dello DOM Shadow, potrebbero andare in conflitto con quelli dell'albero del Light DOM.
2. Lo Shadow DOM ha i suoi stylesheets. Le regole di stile del DOM esterno non vengono applicate.

Per esempio:

```html run untrusted height=40
<style>
*!*
  /* document style won't apply to the shadow tree inside #elem (1) */
*/!*
  p { color: red; }
</style>

<div id="elem"></div>

<script>
  elem.attachShadow({mode: 'open'});
*!*
    // shadow tree has its own style (2)
*/!*
  elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p>Hello, John!</p>
  `;

*!*
  // <p> is only visible from queries inside the shadow tree (3)
*/!*
  alert(document.querySelectorAll('p').length); // 0
  alert(elem.shadowRoot.querySelectorAll('p').length); // 1
</script>  
```

1. The style from the document does not affect the shadow tree.
2. ...But the style from the inside works.
3. To get elements in shadow tree, we must query from inside the tree.

## References

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- Compatibility: <https://caniuse.com/#feat=shadowdomv1>
- Shadow DOM is mentioned in many other specifications, e.g. [DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) specifies that shadow root has `innerHTML`.


## Summary

Shadow DOM is a way to create a component-local DOM.

1. `shadowRoot = elem.attachShadow({mode: open|closed})` -- creates shadow DOM for `elem`. If `mode="open"`, then it's accessible as `elem.shadowRoot` property.
2. We can populate `shadowRoot` using `innerHTML` or other DOM methods.

Shadow DOM elements:
- Have their own ids space,
- Invisible to JavaScript selectors from the main document, such as `querySelector`,
- Use styles only from the shadow tree, not from the main document.

Shadow DOM, if exists, is rendered by the browser instead of so-called "light DOM" (regular children). In the chapter <info:slots-composition> we'll see how to compose them.
