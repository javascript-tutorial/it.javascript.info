# Le proprietà del nodo: tipo, tag e contenuto

Diamo uno sguardo più approfondito ai nodi del DOM.

In questo capitolo vedremo meglio cosa sono e impareremo le loro proprietà più utilizzate.

## Le classi dei nodi del DOM

Nodi del DOM differenti possono avere proprietà differenti. Ad esempio, un nodo elemento corrispondente ad un tag `<a>` avrà proprietà tipiche dei link ed un nodo corrispondente al tag `<input>` avrà proprietà tipiche dei campi di testo e così via. I nodi di testo sono differenti dai nodi elemento, tuttavia condividono anche proprietà e metodi comuni a tutti perché tutte le classi dei nodi del DOM costituiscono un'unica gerarchia.

Ogni nodo del DOM appartiene alla corrispondente classe nativa.

La classe base della gerarchia è [EventTarget](https://dom.spec.whatwg.org/#eventtarget), che è ereditata dalla classe [Node](http://dom.spec.whatwg.org/#interface-node) che, a sua volta, è ereditata dalle altre classi corrispondenti ai nodi del DOM.

Qui lo schema, le spiegazioni a seguire:

![](dom-class-hierarchy.svg)

Le classi sono:

- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) -- è la classe radice (root class) "astratta". Gli oggetti di questa classe non vengono mai creati. Serve solo come base, in questo modo tutti i nodi del DOM supportano i cosiddetti "eventi" che studieremo successivamente.
- [Node](http://dom.spec.whatwg.org/#interface-node) -- anche questa è una classe "astratta" che serve da base per i nodi del DOM. Fornisce le funzionalità principali della struttura gerarchica: `parentNode`, `nextSibling`, `childNodes` e così via (si tratta di getters). Dalla classe `Node` non vengono mai creati oggetti, tuttavia da questa  ereditano classi corrispondenti a nodi concreti, nella fattispecie: `Text` per i nodi di testo, `Element` per i nodi elemento e quelli meno ricorrenti come `Comment` per i nodi commento.
- [Element](http://dom.spec.whatwg.org/#interface-element) -- è la classe base per gli elementi del DOM. Fornisce le funzionalità di navigazione tra elementi come `nextElementSibling`, `children` ed i metodi di ricerca come `getElementsByTagName`, `querySelector`. Un browser non supporta solo HTML, ma anche XML e SVG. La classe `Element` serve da base per le classi più specifiche: `SVGElement`, `XMLElement` e `HTMLElement`.
- [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) -- è, infine, la classe base per tutti gli elementi HTML. Essa è ereditata da elementi HTML concreti:
    - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) -- la classe per gli elementi `<input>`,
    - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) -- la classe per gli elementi `<body>`,
    - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) -- la classe per gli elementi `<a>`,
    - ...e così via, ogni tag ha una propria classe che espone proprietà e metodi specifici.

In definitiva, la lista completa delle proprietà e dei metodi di un nodo è il risultato dell'ereditarietà.

Consideriamo, ad esempio, l'oggetto DOM per un elemento `<input>` che appartiene alla classe [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement).

Esso riceve proprietà e metodi per effetto della sovrapposizione di (elencate in ordine di ereditarietà):


- `HTMLInputElement` -- questa classe fornisce le proprietà specifiche per un campo di testo,
- `HTMLElement` -- espone i metodi (e i getters/setters) comuni agli elementi HTML,
- `Element` -- fornisce i metodi generici propri di un elemento,
- `Node` -- fornisce i metodi generici propri di un nodo DOM,
- `EventTarget` -- consente il supporto agli eventi (che tratteremo in seguito),
- ...e, infine, esso eredita da `Object`, quindi saranno disponibili anche i metodi della classe Object come `hasOwnProperty`.

Per conoscere il nome della classe di un nodo DOM, ricordiamoci che un oggetto ha solitamente la proprietà `constructor`. Questa si riferisce al costruttore della classe e il suo nome è `constructor.name`:

```js run
alert( document.body.constructor.name ); // HTMLBodyElement
```

...O possiamo semplicemente eseguire il metodo `toString`:

```js run
alert( document.body ); // [object HTMLBodyElement]
```

Possiamo inoltre usare `instanceof` per verificare l'ereditarietà:

```js run
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
```

Come possiamo notare i nodi DOM sono regolari oggetti JavaScript ed usano classi basate sui prototipi per l'ereditarietà.

Questo è anche facile da osservare esaminando un elemento in un browser con `console.dir(elem)`. Nella console potremo vedere `HTMLElement.prototype`, `Element.prototype` e così via.

```smart header="`console.dir(elem)` versus `console.log(elem)`"
La maggior parte dei browser supportano due comandi nei loro strumenti di sviluppo: `console.log` e `console.dir` che mostrano in console i loro argomenti. Per quanto riguarda gli oggetti JavaScript solitamente questi comandi funzionano allo stesso modo.

Ma per gli elementi DOM sono differenti:

- `console.log(elem)` mostra l'alberatura DOM dell'elemento.
- `console.dir(elem)` mostra l'elemento come oggetto DOM, ottimo per esplorarne le proprietà.

Provatelo con `document.body`.
```

````smart header="L'IDL della specifica"
Nella specifica, le classi DOM non sono descritte con JavaScript, ma con uno speciale [Interface description language](https://en.wikipedia.org/wiki/Interface_description_language) (IDL), che di solito è facile da capire.

Nell'IDL tutte le proprietà sono precedute dai rispettivi tipi. Per esempio `DOMString`, `boolean` e così via.

Eccone un estratto, con commenti:

```js
// Definisce HTMLInputElement
*!*
// I due punti ":" significano che HTMLInputElement eredita da HTMLElement
*/!*
interface HTMLInputElement: HTMLElement {
  // seguono le proprietà ed i metodi degli elementi <input>

*!*
  // "DOMString" significa che il valore di una proprietà è una stringa
*/!*
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

*!*
  // proprietà con valore booleano (true/false)
  attribute boolean autofocus;
*/!*
  ...
*!*
  // ora un metodo: "void" significa che il metodo non restituisce alcun valore
*/!*
  void select();
  ...
}
```
````

## La proprietà "nodeType"

La proprietà `nodeType` offre un altro modo "vecchio stile" per ricavare il "tipo" di un nodo DOM.

Ha un valore numerico:
- `elem.nodeType == 1` per i nodi elemento,
- `elem.nodeType == 3` per i nodi testo,
- `elem.nodeType == 9` per l'oggetto documento,
- c'è qualche altro valore nella [specifica](https://dom.spec.whatwg.org/#node).

Per esempio:

```html run
<body>
  <script>  
  let elem = document.body;

  // esaminiamo di cosa si tratta
  alert(elem.nodeType); // 1 => nodo elemento

  // e il primo nodo figlio è...
  alert(elem.firstChild.nodeType); // 3 => nodo testo

  // per l'oggetto documento il tipo è 9
  alert( document.nodeType ); // 9
  </script>
</body>
```

Nel codice moderno possiamo usare `instanceof` e altri test basati sulle classi per ottenere il tipo di nodo, ma, talvolta, può risultare più immediato l'uso di `nodeType`. La proprietà `nodeType` è in sola lettura, non possiamo modificarla.

## Tag: nodeName e tagName

Dato un nodo DOM, possiamo leggerne il tag tramite le proprietà `nodeName` o `tagName`:

Per esempio:

```js run
alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
```

Esiste una differenza tra `tagName` e `nodeName`?

Certamente, i nomi stessi delle proprietà suggeriscono la sottile differenza.

- La proprietà `tagName` esiste solo per i nodi `Element`.
- La proprietà `nodeName` è definita per ogni `Node`:
    - per i nodi elemento ha lo stesso valore di `tagName`.
    - per gli altri tipi di nodo (testo, commento, ecc.) contiene una stringa che indica il tipo di nodo.

In altre parole, `tagName` è supportata solo dai nodi elemento (poiché ha origine dalla classe `Element`), mentre `nodeName` riesce a dare un'indicazione sugli altri tipi di nodo.

Per esempio paragoniamo `tagName` e `nodeName` per `document` e per un commento:

```html run
<body><!-- comment -->

  <script>
    // per un commento
    alert( document.body.firstChild.tagName ); // undefined (non si tratta di un elemento)
    alert( document.body.firstChild.nodeName ); // #comment

    // per il documento
    alert( document.tagName ); // undefined (non si tratta di un elemento)
    alert( document.nodeName ); // #document
  </script>
</body>
```

Se abbiamo a che fare solo con elementi allora possiamo usare senza distinzione `tagName` e `nodeName`

```smart header="Il nome del tag è sempre in maiuscolo tranne che per l'XML"
Il browser ha due modalità di elaborazione dei documenti: HTML e XML. Solitamente per le pagine web usa la modalità HTML. La modalità XML è abilitata quando il browser riceve un documento XML con l'intestazione `Content-Type: application/xml+xhtml`.

In modalità HTML `tagName/nodeName` è sempre maiuscola: restituisce `BODY` sia per `<body>` sia per `<BoDy>`.

In modalità XML il case viene mantenuto "così com'è". Ai giorni nostri la modalità XML è usata raramente.
```

## innerHTML: i contenuti

La proprietà [innerHTML](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) consente di ottenere una stringa contenente l'HTML dentro l'elemento.

Possiamo anche modificarla e pertanto è uno dei più potenti strumenti per cambiare la pagina.

L'esempio mostra il contenuto di `document.body` e quindi lo rimpiazza completamente:

```html run
<body>
  <p>A paragraph</p>
  <div>A div</div>

  <script>
    alert( document.body.innerHTML ); // legge il contenuto corrente
    document.body.innerHTML = 'The new BODY!'; // lo rimpiazza
  </script>

</body>
```

Se proviamo a inserire HTML non valido, il browser correggerà i nostri errori:

```html run
<body>

  <script>
    document.body.innerHTML = '<b>test'; // tag non chiuso correttamente
    alert( document.body.innerHTML ); // <b>test</b> (corretto)
  </script>

</body>
```

```smart header="I tag <script> non vengono eseguiti"
Se `innerHTML` inserisce un tag `<script>` nel documento -- esso diviene parte dell'HTML ma non viene eseguito.
```

### Attenzione: "innerHTML+=" esegue una sovrascrittura completa

Possiamo aggiungere HTML a un elemento usando `elem.innerHTML+="more html"`.

In questo modo:

```js
chatDiv.innerHTML += "<div>Hello<img src='smile.gif'/> !</div>";
chatDiv.innerHTML += "How goes?";
```

Tuttavia dovremmo stare molto attenti nel fare un'operazione del genere, perché *non* stiamo facendo una semplice aggiunta ma una sovrascrittura completa.

Tecnicamente queste due righe sono equivalenti:

```js
elem.innerHTML += "...";
// è un modo più rapido di scrivere:
*!*
elem.innerHTML = elem.innerHTML + "..."
*/!*
```

In altre parole, `innerHTML+=` fa questo:

1. Rimuove il contenuto precedente.
2. Il nuovo valore di `innerHTML` è inserito al suo posto (una concatenazione del vecchio e del nuovo).

**Poiché il contenuto viene "azzerato" e riscritto da zero, tutte le immagini e le altre risorse verranno ricaricate**.

Nell'esempio `chatDiv` sopra, la linea `chatDiv.innerHTML+="How goes?"` ricrea il contenuto HTML e ricarica `smile.gif` (speriamo sia in cache). Se `chatDiv` ha molto altro testo e immagini, in quel caso, il tempo di ricaricamento potrebbe diventare chiaramente percepibile.

Ci sono anche altri effetti collaterali. Per esempio, se il testo esistente era stato selezionato con il mouse, la maggior parte dei browser rimuoveranno la selezione al momento della riscrittura con `innerHTML`. Se un elemento `<input>` conteneva un testo digitato dal visitatore il testo sarà rimosso, e altri casi simili.

Fortunatamente ci sono altri modi di aggiungere HTML oltre che con `innerHTML`, presto li studieremo.

## outerHTML: l'HTML completo di un elemento

La proprietà `outerHTML` contiene tutto l'HTML di un elemento. In pratica equivale a `innerHTML` più l'elemento stesso.

Di seguito un esempio:

```html run
<div id="elem">Hello <b>World</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
</script>
```

**Attenzione: diversamente da `innerHTML`, la scrittura in `outerHTML` non cambia l'elemento ma lo sostituisce nel DOM.**

Proprio così, sembra strano, e lo è. Ecco perché ne parliamo subito con una nota a parte. Prestate attenzione.

Considerate l'esempio:

```html run
<div>Hello, world!</div>

<script>
  let div = document.querySelector('div');

*!*
  // sostituisce div.outerHTML con <p>...</p>
*/!*
  div.outerHTML = '<p>A new element</p>'; // (*)

*!*
  // Wow! 'div' non è cambiato!
*/!*
  alert(div.outerHTML); // <div>Hello, world!</div> (**)
</script>
```

Sembra davvero strano, vero?

Nella linea `(*)` sostituiamo `div` con `<p>A new element</p>`. Nel documento (il DOM) possiamo osservare che il nuovo contenuto ha preso il posto di `<div>`. Tuttavia, come possiamo notare nella linea `(**)`, il precedente valore della variabile `div`non è cambiato!

L'assegnazione con `outerHTML` non cambia l'elemento (cioè l'oggetto a cui fa riferimento, in questo caso, la variabile 'div'), però lo rimuove dal DOM e inserisce il nuovo HTML al suo posto.

Ricapitolando ciò che è successo in `div.outerHTML=...` è:
- `div` è stato rimosso dal documento.
- Un pezzo di HTML differente `<p>A new element</p>` è stato inserito al suo posto.
- `div` mantiene ancora il suo valore precedente. L'HTML inserito in seguito non è stato memorizzato in alcuna variabile.

È molto semplice commettere un errore a questo punto: modificare `div.outerHTML` e procedere con `div` come se avesse recepito il nuovo contenuto. Ma questo non avviene. Tale  convinzione è corretta per `innerHTML`, ma non per `outerHTML`.

Possiamo scrivere tramite `elem.outerHTML`, ma dovremmo tenere bene presente che non cambia l'elemento ('elem') su cui stiamo scrivendo, sostituisce invece il nuovo HTML al suo posto. Per avere un riferimento valido al nuovo elemento dobbiamo interrogare nuovamente il DOM.

## nodeValue/data: il contenuto testuale del nodo

La proprietà `innerHTML` è valida soltanto per i nodi elemento.

Other node types, such as text nodes, have their counterpart: `nodeValue` and `data` properties. These two are almost the same for practical use, there are only minor specification differences. So we'll use `data`, because it's shorter.

An example of reading the content of a text node and a comment:

```html run height="50"
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
*!*
    alert(text.data); // Hello
*/!*

    let comment = text.nextSibling;
*!*
    alert(comment.data); // Comment
*/!*
  </script>
</body>
```

For text nodes we can imagine a reason to read or modify them, but why comments?

Sometimes developers embed information or template instructions into HTML in them, like this:

```html
<!-- if isAdmin -->
  <div>Welcome, Admin!</div>
<!-- /if -->
```

...Then JavaScript can read it from `data` property and process embedded instructions.

## textContent: pure text

The `textContent` provides access to the *text* inside the element: only text, minus all `<tags>`.

For instance:

```html run
<div id="news">
  <h1>Headline!</h1>
  <p>Martians attack people!</p>
</div>

<script>
  // Headline! Martians attack people!
  alert(news.textContent);
</script>
```

As we can see, only text is returned, as if all `<tags>` were cut out, but the text in them remained.

In practice, reading such text is rarely needed.

**Writing to `textContent` is much more useful, because it allows to write text the "safe way".**

Let's say we have an arbitrary string, for instance entered by a user, and want to show it.

- With `innerHTML` we'll have it inserted "as HTML", with all HTML tags.
- With `textContent` we'll have it inserted "as text", all symbols are treated literally.

Compare the two:

```html run
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

1. The first `<div>` gets the name "as HTML": all tags become tags, so we see the bold name.
2. The second `<div>` gets the name "as text", so we literally see `<b>Winnie-the-Pooh!</b>`.

In most cases, we expect the text from a user, and want to treat it as text. We don't want unexpected HTML in our site. An assignment to `textContent` does exactly that.

## The "hidden" property

The "hidden" attribute and the DOM property specifies whether the element is visible or not.

We can use it in HTML or assign it using JavaScript, like this:

```html run height="80"
<div>Both divs below are hidden</div>

<div hidden>With the attribute "hidden"</div>

<div id="elem">JavaScript assigned the property "hidden"</div>

<script>
  elem.hidden = true;
</script>
```

Technically, `hidden` works the same as `style="display:none"`. But it's shorter to write.

Here's a blinking element:


```html run height=50
<div id="elem">A blinking element</div>

<script>
  setInterval(() => elem.hidden = !elem.hidden, 1000);
</script>
```

## More properties

DOM elements also have additional properties, in particular those that depend on the class:

- `value` -- the value for `<input>`, `<select>` and `<textarea>` (`HTMLInputElement`, `HTMLSelectElement`...).
- `href` -- the "href" for `<a href="...">` (`HTMLAnchorElement`).
- `id` -- the value of "id" attribute, for all elements (`HTMLElement`).
- ...and much more...

For instance:

```html run height="80"
<input type="text" id="elem" value="value">

<script>
  alert(elem.type); // "text"
  alert(elem.id); // "elem"
  alert(elem.value); // value
</script>
```

Most standard HTML attributes have the corresponding DOM property, and we can access it like that.

If we want to know the full list of supported properties for a given class, we can find them in the specification. For instance, `HTMLInputElement` is documented at <https://html.spec.whatwg.org/#htmlinputelement>.

Or if we'd like to get them fast or are interested in a concrete browser specification -- we can always output the element using `console.dir(elem)` and read the properties. Or explore "DOM properties" in the Elements tab of the browser developer tools.

## Summary

Each DOM node belongs to a certain class. The classes form a hierarchy. The full set of properties and methods come as the result of inheritance.

Main DOM node properties are:

`nodeType`
: We can use it to see if a node is a text or an element node. It has a numeric value: `1` for elements,`3` for text nodes, and a few others for other node types. Read-only.

`nodeName/tagName`
: For elements, tag name (uppercased unless XML-mode). For non-element nodes `nodeName` describes what it is. Read-only.

`innerHTML`
: The HTML content of the element. Can be modified.

`outerHTML`
: The full HTML of the element. A write operation into `elem.outerHTML` does not touch `elem` itself. Instead it gets replaced with the new HTML in the outer context.

`nodeValue/data`
: The content of a non-element node (text, comment). These two are almost the same, usually we use `data`. Can be modified.

`textContent`
: The text inside the element: HTML minus all `<tags>`. Writing into it puts the text inside the element, with all special characters and tags treated exactly as text. Can safely insert user-generated text and protect from unwanted HTML insertions.

`hidden`
: When set to `true`, does the same as CSS `display:none`.

DOM nodes also have other properties depending on their class. For instance, `<input>` elements (`HTMLInputElement`) support `value`, `type`, while `<a>` elements (`HTMLAnchorElement`) support `href` etc. Most standard HTML attributes have a corresponding DOM property.

However, HTML attributes and DOM properties are not always the same, as we'll see in the next chapter.
