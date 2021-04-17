# Shadow DOM

Lo Shadow DOM serve all'incapsulamento e permette al componente di avere il proprio DOM "shadow", al quale il documento principale non può accedere nemmeno accidentalmente. Inoltre può avere regole di stile con scope locale e molto altro ancora.

## Shadow DOM built-in

Avete mai pensato a come, dei controlli così complessi come quelli del browser, vengono creati e stilizzati?

Prendiamo `<input type="range">` come esempio:

<p>
<input type="range">
</p>

Il browser usa la combinazione DOM e CSS internamente, per visualizzarli a schermo. Normalmente la struttura del DOM ci è invisibile, ma possiamo visualizzarla negli strumenti dello sviluppatore dei browser. Ad esempio, negli strumenti di sviluppo di Chrome, si può attivarne la visualizzazione nelle impostazioni generiche, l'opzione "Show user agent shadow DOM".

Così facendo `<input type="range">` verrà mostrato in questo modo:

![](shadow-dom-range.png)

Quello che vediamo alla voce `#shadow-root` viene chiamato "Shadow DOM".

Non possiamo lavorare sugli elementi built-in dello Shadow DOM tramite normale chiamate o selettori CSS. Non sono nodi figli normali, ma una potente tecnica di incapsulamento.

Nell'esempio precedente, possiamo notare l'attributo `pseudo` che è molto utile. Non è un attributo standard, esiste per ragioni storiche e possiamo usarlo per stilizzare i sottoelementi tramite CSS, in questo modo:

```html run autorun
<style>
/* colora la traccia di rosso */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

Ripetiamolo ancora una volta, `pseudo` non è un attributo standard. Storicamente, i browser hanno cominciato a sperimentare con le strutture interne del DOM per implementare dei controlli, e con il passare del tempo, lo Shadow DOM è stato standardizzato per permettere a noi sviluppatori, di fare alla stessa maniera.

Più avanti, utilizzeremo lo standard Shadow DOM moderno, nella sezione delle [specifiche DOM](https://dom.spec.whatwg.org/#shadow-trees) ed altre specifiche correlate.  

## Shadow tree

Un elemento DOM può contenere due tipi di sottoalberi:

1. Light tree -- un normale sottoalbero DOM, fatto di figli HTML. Tutti i sottoalberi affrontati nei capitoli precedenti appartengono a questa categoria "light".
2. Shadow tree -- un sottoalbero DOM nascosto, senza un elemento corrispondente nell'HTML, nascosto da "occhi indiscreti".

Se un elemento li ha entrambi, il browser renderizza solo lo Shadow tree. Tuttavia possiamo impostare una sorta di composizione tra gli il light e lo Shadow tree. Vedremo in dettaglio l'argomento nell'apposita sezione <info:slots-composition>.

Lo Shadow tree può essere usato all'interno dei Custom Elements per nascondere i componenti interni ed applicare gli stili localmente all'interno componente.

Per esempio, questo elemento, `<show-hello>` nasconde il suo DOM interno dell' Shadow tree:

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

Inizialmente, la chiamata a `elem.attachShadow({mode: …})` crea uno Shadow tree.

Ci sono due limitazioni:
1. Possiamo creare solo una Shadow root per ogni elemento.
2. L'elemento `elem` deve essere, o un elemento personalizzato, o uno tra questi elementi: "article", "aside", "blockquote", "body", "div", "footer", "h1..h6", "header", "main" "nav", "p", "section", o "span". Altri elementi, come ad esempio, `<img>`, non possono contenere uno Shadow tree.

L'opzione `mode` imposta il livello di incapsulamento. Le opzioni possibili sono:
- `"open"` -- la Shadow root è disponibile tramite `elem.shadowRoot`.

    Lo Shadow tree di `elem` è accessibile da qualunque punto del codice.   
- `"closed"` -- `elem.shadowRoot` è sempre `null`.

    Lo Shadow DOM è accessibile esclusivamente dal riferimento restituito da `attachShadow` (il quale, con ogni probabilità, sarà nascosto dentro una classe. Shadow tree nativi del browser, come `<input type="range">`, appartengono a questa categoria, e non c'è modo di accedervi.

La [Shadow root](https://dom.spec.whatwg.org/#shadowroot), restituita con `attachShadow`, è come un elemento: possiamo usare `innerHTML` o i metodi DOM, come `append`, per popolarlo di elementi.

L'elemento con una Shadow root viene invece chiamato "Shadow tree host", ed è disponibile attraverso la proprietà `host` della Shadow root:

```js
// supponiamo di avere {mode: "open"}, altrimenti elem.shadowRoot sarebbe null
alert(elem.shadowRoot.host === elem); // true
```

## Incapsulamento

Vi è una separazione marcata tra lo Shadow DOM ed il documento principale:

1. Gli elementi dello Shadow DOM non sono rilevabili tramite `querySelector` del light DOM. In particolare, gli id degli elementi dello Shadow DOM, potrebbero andare in conflitto con quelli dell'albero del light DOM.
2. Lo Shadow DOM ha i suoi fogli di stile e le regole di stile del DOM esterno non vengono applicate.

Per esempio:

```html run untrusted height=40
<style>
*!*
  /* lo stile del documento non viene applicato allo Shadow tree contenuto in #elem (1) */
*/!*
  p { color: red; }
</style>

<div id="elem"></div>

<script>
  elem.attachShadow({mode: 'open'});
*!*
    // Lo Shadow tree possiede un proprio stile (2)
*/!*
  elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p>Hello, John!</p>
  `;

*!*
  // <p> e' visibile solamente da queries dentro lo Shadow tree (3)
*/!*
  alert(document.querySelectorAll('p').length); // 0
  alert(elem.shadowRoot.querySelectorAll('p').length); // 1
</script>  
```

1. Lo stile del documento non influenza lo Shadow tree.
2. ...ma lo stile all'interno sì.
3. Per avere gli elementi dentro lo Shadow tree, dobbiamo fare le query da dentro l'albero.

## Riferimenti

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- Compatibilità: <https://caniuse.com/#feat=shadowdomv1>
- Lo Shadow DOM viene menzionato in molte altre specifiche, ad esempio in [DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) specifica che la Shadow root possiede la proprietà `innerHTML`.


## Riepilogo

Lo "Shadow DOM" è una modalità di creazione di un componente DOM locale.

1. Il comando `shadowRoot = elem.attachShadow({mode: open|closed})` crea uno Shadow DOM per `elem`. Se `mode="open"`, allora sarà possibile accedervi attraverso la proprietà `elem.shadowRoot`.
2. Possiamo popolare `shadowRoot` usando `innerHTML` o altri metodi DOM.

Gli elementi dello Shadow DOM:
- Hanno la loro area per gli id
- Sono invisibili ai selettori JavaScript dal documento principale, se cercati con `querySelector`
- Usano gli stili dello Shadow tree, e non quelli del documento principale.

Lo Shadow DOM, se esiste, viene renderizzato dal browser al posto del cosiddetto "light DOM" (normali nodi figli). Nel capitolo <info:slots-composition> vedremo come comporli.
