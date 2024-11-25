# Le proprietà del nodo: tipo, tag e contenuto

Diamo uno sguardo più approfondito ai nodi del DOM.

In questo capitolo vedremo meglio cosa sono e impareremo le loro proprietà più utilizzate.

## Le classi dei nodi del DOM

Nodi del DOM differenti possono avere proprietà differenti. Ad esempio, un nodo elemento corrispondente ad un tag `<a>` avrà proprietà tipiche dei link ed un nodo corrispondente al tag `<input>` avrà proprietà tipiche dei campi di testo e così via. I nodi di testo sono differenti dai nodi elemento, tuttavia condividono alcune proprietà e metodi comuni a tutti, perché tutte le classi dei nodi del DOM costituiscono un'unica gerarchia.

Ogni nodo del DOM appartiene alla corrispondente classe nativa.

<<<<<<< HEAD
La classe base della gerarchia è [EventTarget](https://dom.spec.whatwg.org/#eventtarget), che è ereditata dalla classe [Node](http://dom.spec.whatwg.org/#interface-node) da cui ereditano le altre classi corrispondenti ai nodi del DOM.
=======
The root of the hierarchy is [EventTarget](https://dom.spec.whatwg.org/#eventtarget), that is inherited by  [Node](https://dom.spec.whatwg.org/#interface-node), and other DOM nodes inherit from it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Qui lo schema, le spiegazioni a seguire:

![](dom-class-hierarchy.svg)

Le classi sono:

<<<<<<< HEAD
- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) -- è la classe radice (root class) "astratta". Gli oggetti di questa classe non vengono mai creati. Serve solo come base, in questo modo tutti i nodi del DOM supportano i cosiddetti "eventi" che studieremo successivamente.
- [Node](http://dom.spec.whatwg.org/#interface-node) -- anche questa è una classe "astratta" che serve da base per i nodi del DOM. Fornisce le funzionalità principali della struttura gerarchica: `parentNode`, `nextSibling`, `childNodes` e così via (si tratta di getter). Dalla classe `Node` non vengono mai creati oggetti, tuttavia da questa ereditano classi corrispondenti a nodi concreti, nella fattispecie: `Text` per i nodi di testo, `Element` per i nodi elemento e quelli meno ricorrenti come `Comment` per i nodi commento.
- [Element](http://dom.spec.whatwg.org/#interface-element) -- è la classe base per gli elementi del DOM. Fornisce le funzionalità di navigazione tra elementi come `nextElementSibling`, `children` ed i metodi di ricerca come `getElementsByTagName`, `querySelector`. Un browser non supporta solo HTML, ma anche XML e SVG. La classe `Element` serve da base per le classi più specifiche: `SVGElement`, `XMLElement` e `HTMLElement`.
- [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) -- è, infine, la classe base per tutti gli elementi HTML. Essa è ereditata da elementi HTML concreti:
    - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) -- la classe per gli elementi `<input>`,
    - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) -- la classe per gli elementi `<body>`,
    - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) -- la classe per gli elementi `<a>`,
    - ...e così via, ogni tag ha una propria classe che espone proprietà e metodi specifici.
=======
- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) -- is the root "abstract" class for everything.

    Objects of that class are never created. It serves as a base, so that all DOM nodes support so-called "events", we'll study them later.

- [Node](https://dom.spec.whatwg.org/#interface-node) -- is also an "abstract" class, serving as a base  for DOM nodes.

    It provides the core tree functionality: `parentNode`, `nextSibling`, `childNodes` and so on (they are getters). Objects of `Node` class are never created. But there are other classes that inherit from it (and so inherit the `Node` functionality).

- [Document](https://dom.spec.whatwg.org/#interface-document), for historical reasons often inherited by `HTMLDocument` (though the latest spec doesn't dictate it) -- is a document as a whole.

    The `document` global object belongs exactly to this class. It serves as an entry point to the DOM.

- [CharacterData](https://dom.spec.whatwg.org/#interface-characterdata) -- an "abstract" class, inherited by:
    - [Text](https://dom.spec.whatwg.org/#interface-text) -- the class corresponding to a text inside elements, e.g. `Hello` in `<p>Hello</p>`.
    - [Comment](https://dom.spec.whatwg.org/#interface-comment) -- the class for comments. They are not shown, but each comment becomes a member of DOM.

- [Element](https://dom.spec.whatwg.org/#interface-element) -- is the base class for DOM elements.

    It provides element-level navigation like `nextElementSibling`, `children` and searching methods like `getElementsByTagName`, `querySelector`.

    A browser supports not only HTML, but also XML and SVG. So the `Element` class serves as a base for more specific classes: `SVGElement`, `XMLElement` (we don't need them here) and `HTMLElement`.

- Finally, [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) is the basic class for all HTML elements. We'll work with it most of the time.

    It is inherited by concrete HTML elements:
    - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) -- the class for `<input>` elements,
    - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) -- the class for `<body>` elements,
    - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) -- the class for `<a>` elements,
    - ...and so on.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In definitiva, la lista completa delle proprietà e dei metodi di un nodo è il risultato dell'ereditarietà.

<<<<<<< HEAD
Consideriamo, ad esempio, l'oggetto DOM per un elemento `<input>` che appartiene alla classe [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement).
=======
So, the full set of properties and methods of a given node comes as the result of the chain of inheritance.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Esso riceve proprietà e metodi per effetto della sovrapposizione di (elencate in ordine di ereditarietà):


- `HTMLInputElement` -- questa classe fornisce le proprietà specifiche per un campo di testo,
- `HTMLElement` -- espone i metodi (e i getter/setter) comuni agli elementi HTML,
- `Element` -- fornisce i metodi generici propri di un elemento,
- `Node` -- fornisce i metodi generici propri di un nodo DOM,
- `EventTarget` -- consente il supporto agli eventi (che tratteremo in seguito),
- ...e, infine, esso eredita da `Object`, quindi saranno disponibili anche i metodi di un oggetto semplice come `hasOwnProperty`.

Per conoscere il nome della classe di un nodo DOM, ricordiamoci che un oggetto ha solitamente la proprietà `constructor`. Questa contiene un riferimento al costruttore della classe e `constructor.name` indica il suo nome:

```js run
alert( document.body.constructor.name ); // HTMLBodyElement
```

...Oppure possiamo semplicemente eseguire il metodo `toString`:

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

Come possiamo notare i nodi DOM sono oggetti JavaScript regolari ed usano classi basate sui prototipi per l'ereditarietà.

Questo è facilmente osservabile esaminando un elemento in un browser con `console.dir(elem)`. Nella console potremo vedere `HTMLElement.prototype`, `Element.prototype` e così via.

```smart header="`console.dir(elem)` versus `console.log(elem)`"
La maggior parte dei browser supportano due comandi nei loro strumenti per sviluppatori: `console.log` e `console.dir` che mostrano in console i loro argomenti. Per quanto riguarda gli oggetti JavaScript, solitamente questi comandi funzionano allo stesso modo.

Ma per gli elementi DOM sono differenti:

- `console.log(elem)` mostra l'alberatura DOM dell'elemento.
- `console.dir(elem)` mostra l'elemento come oggetto DOM, ottimo per esplorarne le proprietà.

Provatelo con `document.body`.
```

````smart header="L'IDL della specifica"
Nella specifica, le classi DOM non sono descritte con JavaScript, ma con uno speciale [Interface description language](https://en.wikipedia.org/wiki/Interface_description_language) (IDL), che di solito è facile da comprendere.

Nell'IDL tutte le proprietà sono precedute dai rispettivi tipi. Per esempio `DOMString`, `boolean` e così via.

Eccone un estratto commentato:

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
  // ora un metodo: "void" per indicare che il metodo non restituisce alcun valore
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

<<<<<<< HEAD
  // esaminiamo di cosa si tratta
  alert(elem.nodeType); // 1 => nodo elemento

  // e il primo nodo figlio è...
  alert(elem.firstChild.nodeType); // 3 => nodo testo
=======
  // let's examine: what type of node is in elem?
  alert(elem.nodeType); // 1 => element

  // and its first child is...
  alert(elem.firstChild.nodeType); // 3 => text
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

Possiamo anche modificarla e pertanto è uno dei più potenti strumenti per cambiare l'HTML di un elemento della pagina.

L'esempio mostra il contenuto di `document.body` e poi lo rimpiazza completamente:

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

```smart header="I tag `<script>` non vengono eseguiti"
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
2. Il nuovo valore di `innerHTML` (una concatenazione del vecchio e del nuovo) è inserito al suo posto.

**Poiché il contenuto viene "azzerato" e riscritto da zero, tutte le immagini e le altre risorse verranno ricaricate**.

Nell'esempio `chatDiv` sopra, la linea `chatDiv.innerHTML+="How goes?"` ricrea il contenuto HTML e ricarica `smile.gif` (speriamo sia in cache). Se `chatDiv` ha molto altro testo e immagini il tempo di ricaricamento potrebbe diventare chiaramente percepibile.

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

Nella linea `(*)` sostituiamo `div` con `<p>A new element</p>`. Nel documento (il DOM) possiamo osservare che il nuovo contenuto ha preso il posto di `<div>`. Tuttavia, come possiamo notare nella linea `(**)`, il precedente valore della variabile `div` non è cambiato!

L'assegnazione con `outerHTML` non cambia l'elemento (cioè l'oggetto a cui fa riferimento, in questo caso, la variabile 'div'), però lo rimuove dal DOM e inserisce il nuovo HTML al suo posto.

Ricapitolando ciò che è successo in `div.outerHTML=...` è:
- `div` è stato rimosso dal documento.
- Un pezzo di HTML differente `<p>A new element</p>` è stato inserito al suo posto.
- `div` mantiene ancora il suo valore precedente. L'HTML inserito in seguito non è stato memorizzato in alcuna variabile.

È molto semplice commettere un errore a questo punto: modificare `div.outerHTML` e procedere con `div` come se avesse recepito il nuovo contenuto. Ma questo non avviene. Tale convinzione è corretta per `innerHTML`, ma non per `outerHTML`.

Possiamo scrivere tramite `elem.outerHTML`, ma dovremmo tenere bene presente che non cambia l'elemento ('elem') su cui stiamo scrivendo, sostituisce invece il nuovo HTML al suo posto. Per avere un riferimento valido al nuovo elemento dobbiamo interrogare nuovamente il DOM.

## nodeValue/data: il contenuto testuale del nodo

La proprietà `innerHTML` è valida soltanto per i nodi elemento.

Gli altri tipi di nodo, come i nodi di testo, hanno il loro corrispettivo: le proprietà `nodeValue` e `data`. Nell'uso pratico questi due si comportano quasi alla stessa maniera, ci sono solo piccole differenze nella specifica. Useremo perciò `data` dal momento che è più breve.

Ecco un esempio di lettura del contenuto di un nodo di testo e di un commento:

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

Per i nodi di testo possiamo ipotizzare un motivo per leggerne o modificarne il contenuto testuale, ma perché i commenti?

Talvolta gli sviluppatori incorporano informazioni o istruzioni per i template nei commenti all'interno dell'HTML, in questo modo:

```html
<!-- if isAdmin -->
  <div>Welcome, Admin!</div>
<!-- /if -->
```

...così JavaScript può leggerle tramite la proprietà `data` ed elaborare le istruzioni contenute.

## textContent: solo il testo

La proprietà `textContent` fornisce l'accesso al *testo* dentro l'elemento: solo il testo, al netto di tutti i `<tag>`.

Per esempio:

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

Come possiamo notare viene restituito solo il testo, come se tutti i `<tag>` fossero stati eliminati, ma il testo in essi fosse rimasto.

Leggere il testo in questa maniera è un'esigenza rara nell'uso pratico.

**È molto più utile scrivere con `textContent`, perché consente di inserire testo "in sicurezza".**

Supponiamo di avere una stringa arbitraria, ad esempio inserita da un utente, e di volerla mostrare.

- Con `innerHTML` la inseriremo "come HTML", compresi tutti i tag HTML.
- Con `textContent` la inseriremo "come testo", tutti i simboli sono trattati letteralmente.

Paragoniamo le due opzioni:

```html run
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

1. Il primo `<div>` riceve il nome "come HTML": tutti i tag diventano tali, perciò vedremo il nome in grassetto.
2. Il secondo `<div>` riceve il nome "come testo", perciò vedremo letteralmente `<b>Winnie-the-Pooh!</b>`.

Nella maggior parte dei casi da un utente ci aspettiamo testo e desideriamo gestirlo in quanto tale. Non vogliamo codice HTML inatteso sul nostro sito. Un'assegnazione con `textContent` fa esattamente questo.

## La proprietà "hidden"

L'attributo "hidden" e la corrispettiva proprietà del DOM specificano se l'elemento debba essere visibile o meno.

Possiamo agire da codice HTML o da JavaScript in questo modo:

```html run height="80"
<div>Both divs below are hidden</div>

<div hidden>With the attribute "hidden"</div>

<div id="elem">JavaScript assigned the property "hidden"</div>

<script>
  elem.hidden = true;
</script>
```

Tecnicamente, `hidden` funziona alla stessa maniera di `style="display:none"` ma è più breve da scrivere.

Ecco come ottenere un elemento lampeggiante:


```html run height=50
<div id="elem">A blinking element</div>

<script>
  setInterval(() => elem.hidden = !elem.hidden, 1000);
</script>
```

## Altre proprietà

Gli elementi DOM hanno inoltre proprietà aggiuntive, in particolare quelle che dipendono dalla classe:

- `value` -- il valore di `<input>`, `<select>` e `<textarea>` (`HTMLInputElement`, `HTMLSelectElement`...).
- `href` -- il valore dell'attributo "href" di `<a href="...">` (`HTMLAnchorElement`).
- `id` -- il valore dell'attributo "id" per tutti gli elementi (`HTMLElement`).
- ...e molte altre...

Per esempio:

```html run height="80"
<input type="text" id="elem" value="value">

<script>
  alert(elem.type); // "text"
  alert(elem.id); // "elem"
  alert(elem.value); // value
</script>
```

La maggior parte degli attributi HTML standard ha la corrispondente proprietà DOM e possiamo accedervi in questo modo.

Se desideriamo conoscere la lista completa delle proprietà supportate per una classe precisa, le possiamo trovare nella specifica. Per esempio la classe `HTMLInputElement` è documentata su <https://html.spec.whatwg.org/#htmlinputelement>.

In alternativa, se vogliamo ricavarle rapidamente o siamo interessati ad una concreta implementazione del browser -- possiamo sempre esaminare l'elemento con `console.dir(elem)` e leggerne le proprietà o, ancora, esplorare le "Proprietà DOM" nel tab Elementi degli strumenti per sviluppatori del browser.

## Riepilogo

Ciascun nodo del DOM appartiene ad una determinata classe. Le classi costituiscono una gerarchia. L'elenco completo delle proprietà e dei metodi è il risultato dell'ereditarietà.

Le principali proprietà di un nodo DOM sono:

`nodeType`
: Possiamo utilizzarla per sapere se si tratta di un nodo di testo o di un nodo elemento. Ha un valore numerico: `1` per gli elementi, `3` per i nodi di testo e pochi altri valori per gli altri tipi di nodo. La proprietà è in sola lettura.

`nodeName/tagName`
: Per gli elementi indica il nome del tag (in lettere maiuscole a meno che il browser non sia in modalità XML). Per tutti gli altri nodi `nodeName` contiene una stringa descrittiva. La proprietà è in sola lettura.

`innerHTML`
: Il contenuto HTML dell'elemento. Può essere modificato.

`outerHTML`
: L'HTML completo dell'elemento. Un'operazione di scrittura in `elem.outerHTML` non modifica `elem` ma viene sostituito nel documento con il nuovo HTML.

`nodeValue/data`
: Il contenuto dei nodi che non sono elementi (testi, commenti). Le due proprietà sono quasi del tutto equiparabili, solitamente usiamo `data`. Può essere modificata.

`textContent`
: Il testo dentro un elemento: l'HTML al netto di tutti i `<tag>`. Scrivere testo dentro un elemento con questa proprietà fa sì che tutti i caratteri speciali ed i tag siano resi esattamente come testo. Può trattare il testo digitato da un utente in modo sicuro prevenendo gli inserimenti di HTML indesiderato.

`hidden`
: Quando è impostata a `true`, è equivalente alla dichiarazione CSS `display:none`.

I nodi del DOM hanno inoltre altre proprietà in base alla loro classe di appartenenza. Per esempio gli elementi `<input>` (`HTMLInputElement`) supportano `value`, `type`, mentre gli elementi `<a>` (`HTMLAnchorElement`) supportano `href` etc. La maggior parte degli attributi HTML standard hanno una proprietà DOM corrispondente.

Ad ogni modo, come vedremo nel prossimo capitolo, gli attributi HTML e le proprietà del DOM non sono sempre corrispondenti.
