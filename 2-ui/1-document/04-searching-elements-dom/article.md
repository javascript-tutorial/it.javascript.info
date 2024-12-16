# Ricerca: getElement*, querySelector*

Le proprietà di navigazione del DOM funzionano bene per gli elementi vicini. E quando non lo sono? Come possiamo ottenere un elemento arbitrario della pagina?

Ci sono altri metodi di ricerca per questo.

## document.getElementById o semplicemente id

Se un elemento ha un attributo `id` possiamo trovarlo, ovunque esso sia, utilizzando il metodo `document.getElementById(id)`

Ad esempio:

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // trova l'elemento
*!*
  let elem = document.getElementById('elem');
*/!*

  // rendi il suo background rosso
  elem.style.background = 'red';
</script>
```

Inoltre, c'è una variabile globale chiamata come l'`id` che fa riferimento all'elemento:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  // elem e' un riferimento all'elemento del DOM con id="elem"
  elem.style.background = 'red';

  // id="elem-content" contiene un trattino, quindi non può essere il nome di una variabile
  // ...ma possiamo accedervi tramite parentesi quadre: window['elem-content']
</script>
```

...Questo a meno di dichiarare una variabile JavaScript con lo stesso nome: quest'ultima avrebbe la precedenza:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // ora elem è 5, non un riferimento a <div id="elem">

  alert(elem); // 5
</script>
```

<<<<<<< HEAD
```warn header="Non utilizzate le variabili-id globali per accedere agli elementi"
Questo comportamento è descritto [nella specifica](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), quindi è quasi uno standard, ma è supportato principalmente per una questione di compatibilità.
=======
```warn header="Please don't use id-named global variables to access elements"
This behavior is described [in the specification](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object), but it is supported mainly for compatibility.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il browser cerca di aiutarci mischiando i namespaces di JS e del DOM. Questo va bene per un semplice script, ma generalmente non è una buona cosa. Potrebbero esserci conflitti tra i nomi. Inoltre, quando uno legge il codice JS e non ha sott'occhio quello HTML non è ovvia la provenienza di una variabile.

Qui nel tutorial, per brevità e quando è ovvia la provenienza dell'elemento, utilizziamo `id` come diretto riferimento ad esso.

Normalmente `document.getElementById` è il metodo da preferire.
```

```smart header="L'`id` deve essere unico"
Un `id` deve essere unico. Nel documento vi può essere un solo elemento con uno specifico `id`.

Se ci sono più elementi con lo stesso `id` il comportamento dei metodi che lo utilizzano diventa imprevedibile, ad esempio `document.getElementById` potrebbe ritornare un elemento casuale tra questi. Mantenete gli `id` unici.
```

```warn header="Solo `document.getElementById`, non `anyElem.getElementById`"
Il metodo `getElementById` può essere chiamato solo sull'oggetto `document`, cerca l'`id` in tutto il documento.
```

## querySelectorAll [#querySelectorAll]

Tra i metodi più versatili, `elem.querySelectorAll(css)` ritorna tutti gli elementi contenuti in `elem` che combaciano con il selettore CSS specificato.

Qui cerchiamo tutti i `<li>` che sono gli ultimi figli:

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

Questo metodo è molto potente poiché può utilizzare qualsiasi selettore CSS.

```smart header="Può utilizzare anche pseudo-classi"
Le pseudo-classi come `:hover` e `:active` sono altresì supportate. Ad esempio, `document.querySelectorAll(':hover')` ritornerà una collection con gli elementi che attualmente si trovano sotto al puntatore del mouse (seguendo l'ordine di annidamento, dal più esterno `<html>` all'elemento più annidato).
```

## querySelector [#querySelector]

La chiamata a `elem.querySelector(css)` ritorna il primo elemento che combacia con il selettore CSS specificato.

In altre parole, il risultato  è lo stesso di `elem.querySelectorAll(css)[0]`, ma quest'ultimo cerca *tutti* gli elementi per poi prenderne uno, mentre `elem.querySelector` ne cerca solo uno. E' più veloce e più breve da scrivere.

## matches

I metodi visti finora cercavano nel DOM.

<<<<<<< HEAD
Il metodo [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) non cerca nulla; controlla semplicemente se `elem` combacia con il selettore CSS specificato, e ritorna `true` o `false`.
=======
The [elem.matches(css)](https://dom.spec.whatwg.org/#dom-element-matches) does not look for anything, it merely checks if `elem` matches the given CSS-selector. It returns `true` or `false`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Questo metodo è utile quando stiamo iterando sopra degli elementi (come in un array) e cerchiamo di filtrare quelli che ci interessano.

Ad esempio:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // può essere una qualsiasi collezione piuttosto di document.body.children
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

## closest

Gli *antenati* di un elemento sono: il genitore, il genitore del genitore, il genitore di quest'ultimo e così via. Gli antenati formano la catena di genitori dall'elemento in cima.

Il metodo `elem.closest(css)` cerca l'antenato più vicino che combacia il selettore CSS specificato. `elem` stesso è incluso nella ricerca.

In altre parole, il metodo `closest` parte dall'elemento e controlla tutti i suoi genitori. Se uno di essi combacia con il selettore, la ricerca si interrompe e l'antenato viene ritornato.

Ad esempio:

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (perché h1 non è un antenato)
</script>
```

## getElementsBy*

Ci sono altri metodi per cercare nodi tramite tag, classi ecc.

Oggi sono più che altro storia, essendo `querySelector` più potente e più breve da scrivere.

Qui li studiamo per completezza, poiché possono essere ancora trovati nei vecchi script.

- `elem.getElementsByTagName(tag)` cerca gli elementi con il tag specificato e ritorna una loro collection. Il parametro `tag` può anche essere `*`, che equivale a "qualsiasi tag"
- `elem.getElementsByClassName(className)` ritorna gli elementi con la data classe.
- `document.getElementsByName(name)` ritorna gli elementi con l'attributo `name`, ovunque nel documento. Raramente usato.

Ad esempio:
```js
// trova tutti i div del documento
let divs = document.getElementsByTagName('div');
```

Troviamo tutti gli `input` tag dentro la tabella:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Non dimenticate la lettera `\"s\"`"
Gli sviluppatori principianti scordano qualche volta la lettera `"s"`. Cercano di chiamare `getElementByTagName` invece di <code>getElement<b>s</b>ByTagName</code>.

La lettera `"s"` manca in `getElementById`, perché esso ritorna un singolo elemento. Ma `getElementsByTagName` ritorna una collezione di elementi, quindi c'è una `"s"`.
```

````warn header="Ritorna una collection, non un elemento!"
Un altro errore diffuso tra principianti è quello di scrivere:

```js
// non funziona
document.getElementsByTagName('input').value = 5;
```
Non funziona perché prende una *collection* di input e le assegna un valore, invece che assegnare il valore agli elementi contenuti. 

Dovremmo iterare sopra la collection, oppure selezionare un elemento tramite il suo indice e quindi eseguire l'assegnazione, così:

```js
// dovrebbe funzionare (se c'è un input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Cerchiamo gli elementi con `.article`:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // cerca tramite il nome dell'attributo
  let form = document.getElementsByName('my-form')[0];

  // trova tramite la classe contenuta in form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, trovati due elementi con la classe "article"
</script>
```

## Collections vive

Tutti i metodi `"getElementsBy*"` ritornano una collection *viva*. Questa collection rispecchia sempre lo stato corrente del documento e si "auto-aggiorna" quando questo cambia.

Nell'esempio sotto ci sono due script.

1. Il primo crea una referenza alla collezione di `<div>`. Inizialmente la sua length è `1`.
2. Il secondo script viene eseguito dopo di che il browser incontra un altro `<div>`, quindi la sua length diventa `2`.

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

`querySelectorAll`, invece, ritorna una collection *statica*. E' come un array con degli elementi fissi.

Se lo utilizziamo al posto di `getElementsBy*`, entrambi gli script mostreranno `1`:


```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Ora possiamo facilmente vedere la differenza. La collection statica non viene incrementata dopo l'apparizione del nuovo `div` nel documento. 

## Riepilogo

Ci sono sei metodi principali per cercare nodi nel DOM:

<table>
<thead>
<tr>
<td>Metodo</td>
<td>Cerca tramite...</td>
<td>Può essere chiamato su un elemento?</td>
<td>Vivo?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag o <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>classe</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

I più utilizzati sono `querySelector` e `querySelectorAll`, ma `getElement(s)By*` può essere utile in alcuni casi, e si trova nei vecchi script.

Inoltre:

- C'è `elem.matches(css)` per controllare se `elem` combacia con il selettore CSS specificato.
- C'è `elem.closest(css)` per cercare l'antenato più vicino che combacia con il selettore CSS specificato. Anche `elem` viene controllato.

Menzioniamo anche un altro metodo, che a volte può essere utile per controllare il rapporto figlio-genitore:

-  `elemA.contains(elemB)` ritorna `true` se `elemB` è dentro `elemA` (un discendente di `elemA`) o quando `elemA==elemB`.
