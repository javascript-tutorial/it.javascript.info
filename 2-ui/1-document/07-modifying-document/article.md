# Modificare il documento

La modifica del DOM è la chiave della creazione di pagine "live".

Vedremo come creare elementi "al volo" e come modificare il contenuto della pagina già esistente.

## Esempio: mostrare un messaggio

Dimostriamolo con un esempio. Aggiungeremo un messaggio alla pagina, più carino di `alert`.

Sarà così:

```html autorun height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Hi there!</strong> You've read an important message.
</div>
*/!*
```

Questo era l'esempio con HTML. Ora creiamo lo stesso `div` con JavaScript (presupponendo che lo stile sia già in HTML/CSS).

## Creare un elemento

Per creare nodi DOM, ci sono due metodi:

`document.createElement(tag)`
: Crea un nuovo *nodo elemento* con il dato tag:

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
  Crea un nuovo *nodo di testo* con il dato testo:

    ```js
    let textNode = document.createTextNode('Here I am');
    ```

Nella maggior parte dei casi abbiamo bisogno di creare un nodo elemento, come il `div` per il messaggio.

### Creare un messaggio

Creare un messaggio necessita di tre passaggi:

```js
// 1. Creare l'elemento <div> 
let div = document.createElement('div');

// 2. Impostare la sua classe ad "alert"
div.className = "alert";

// 3. Riempirlo con il contenuto
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

Abbiamo creato l'elemento, ma al momento è solo una variabile chiamata `div`, non è ancora nella pagina, perciò non possiamo vederlo.

## I metodi d'inserimento
   
Per rendere visibile `div`, dobbiamo inserirlo da qualche parte nel `document`. Per esempio dentro all'elemento `body`, referenziato da `document.body`.

C'è un metodo speciale per questo, `append`: `document.body.append(div)`.

Qui il codice completo:

```html run height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

*!*
  document.body.append(div);
*/!*
</script>
```

Qui abbiamo chiamato `append` su `document.body`, ma possiamo chiamare `append` su qualsiasi elemento e mettervi dentro un altro elemento. Ad esempio, possiamo appendere qualcosa a `div` chiamando `div.append(anotherElement)`.

Ecco altri metodi d'inserimento; specificano i differenti posti dove inserire un elemento:

- `node.append(...nodi o stringhe)` -- appende nodi o stringhe *alla fine* di `node`,
- `node.prepend(...nodi o stringhe)` -- inserisce nodi o stringhe *all'inizio* di `node`,
- `node.before(...nodi o stringhe)` –- inserisce nodi o stringhe *prima* di `node`,
- `node.after(...nodi o stringhe)` –- inserisce nodi o stringhe *dopo* `node`,
- `node.replaceWith(...nodi o stringhe)` –- rimpiazza `node` con i nodi o le stringhe passate.

Gli argomenti di questi metodi sono liste arbitrarie di nodi DOM da inserire, o stringhe di testo (che diventano automaticamente nodi testo).

Vediamoli in azione.

Ecco un esempio dell'utilizzo di questi metodi per aggiungere elementi a una lista e del testo prima/dopo di essa:

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // inserisce la stringa "before" prima di <ol>
  ol.after('after'); // inserisce la stringa "after" dopo <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // inserisce liFirst all'inizio di <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // inserisce liLast alla fine di <ol>
</script>
```

Ecco uno schema visivo di cosa fanno questi metodi:

![](before-prepend-append-after.svg)

La lista finale sarà:

```html
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

Come già detto, questi metodi possono inserire nodi multipli e pezzi di testo in una singola chiamata.

Ad esempio, qui vengono inseriti una stringa e un elemento:

```html run
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

Nota: il testo viene inserito "come testo", non "come HTML", con i dovugti ecape per caratteri come `<` o `>`.

Quindi l'HTML finale sarà:

```html run
*!*
&lt;p&gt;Hello&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

In altre parole, le stringhe sono inserite in sicurezza, come con `elem.textContent`.

Quindi, questi metodi possono essere usati solo per inserire nodi o pezzi di testo.

E se volessimo inserire stringhe HTML "come HTML", con tutti i tag e le altre funzionalità, come con `elem.innerHTML`?

## insertAdjacentHTML/Text/Element

Per questo abbiamo un altro metodo, molto versatile: `elem.insertAdjacentHTML(where, html)`.


Il primo parametro è una parola-codice che specifica dove inserire in relazione a `elem`. Deve essere una delle seguenti

- `"beforebegin"` -- inserisce `html` immediatamente prima di `elem`,
- `"afterbegin"` -- inserisce `html` dentro `elem`, all'inizio,
- `"beforeend"` -- inserisce `html` dentro `elem`, alla fine,
- `"afterend"` -- inserisce `html` immediatamente dopo `elem`.

Il secondo parametro è una stringa HTML, che viene inserita "come HTML"

Ad esempio:

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
  div.insertAdjacentHTML('afterend', '<p>Bye</p>');
</script>
```

...Porterebbe a:

```html run
<p>Hello</p>
<div id="div"></div>
<p>Bye</p>
```

Così possiamo appendere HTML alla pagina.

Qui un'immagine delle varianti d'inserimento:

![](insert-adjacent.svg)

Possiamo facilmente notare similarità tra questa immagine e le precedenti. I punti di inserimento sono gli stessi, ma questo metodo inserisce HTML. 

Il metodo ha due fratelli:

- `elem.insertAdjacentText(where, text)` -- la stessa sintassi, ma una stringa `text` viene inserita "come testo" invece che come HTML,
- `elem.insertAdjacentElement(where, elem)` -- la stessa sintassi, ma inserisce un elemento.

Questi metodi esistono per rendere la sintassi "uniforme". Nella pratica, nella maggioranza dei casi solo `insertAdjacentHTML` viene utilizzato, perché per elementi e testo abbiamo i metodi `append/prepend/before/after`; questi sono più brevi da scrivere e possono inserire nodi/pezzi di testo.

Ecco un variante alternativa per mostrare un messaggio:

```html run
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Hi there!</strong> You've read an important message.
  </div>`);
</script>
```

## Rimozione di nodi

Per rimuovere un nodo, c'è il metodo `node.remove()`.

Facciamo sparire il nostro messaggio dopo un secondo:

```html run untrusted
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
*/!*
</script>
```

Nota: se vogliamo *muovere* un elemento in un altro posto, non c'è bisogno di rimuoverlo dal vecchio. 

**Tutti i metodi d'inserimento rimuovono automaticamente i nodi dal vecchio posto.**

Ad esempio, scambiamo degli elementi:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // nessun bisogno di chiamare remove
  second.after(first); // prende #second e inserisce #first dopo
</script>
```

## Clonare nodi: cloneNode

Come inserire uno o più messaggi simili? 

Potremmo scrivere una funzione a mettervi dentro il codice. Ma l'alternativa sarebbe *clonare* il `div` esistente e modificare il testo dentro (se necessario).

Qualche volta, quando abbiamo un grosso elemento, questo potrebbe rivelarsi più facile e veloce.

La chiamata a `elem.cloneNode(true)` crea un clone "profondo" dell'elemento, con tutti gli attributi e i sub-elementi. Se chiamiamo `elem.cloneNode(false)`, l'elemento viene clonato senza i suoi elementi figlio.

Un esempio copiando un messaggio:

```html run height="120"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Hi there!</strong> You've read an important message.
</div>

<script>
*!*
  let div2 = div.cloneNode(true); // clona il messaggio
  div2.querySelector('strong').innerHTML = 'Bye there!'; // modifica il clone

  div.after(div2); // mostra il clone dopo il div esistente
*/!*
</script>
```

## DocumentFragment [#document-fragment]

`DocumentFragment` è uno speciale nodo DOM che serve come wrapper a liste di nodi.

Possiamo appendervi altri nodi, ma quando viene inserito da qualche parte, viene sostituito con il suo contenuto. 

Nell'esempio sotto, `getListContent` genera un frammento con elementi `<li>`, che dopo vengono inseriti in `<ul>`.

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

*!*
ul.append(getListContent()); // (*)
*/!*
</script>
```

Nota, nell'ultima riga `(*)` appendiamo `DocumentFragment`, ma questo viene
"sciolto", e la risultante struttura sarà:
```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` è raramente utilizzato esplicitamente. Perché appendere elementi a un nodo speciale quando possiamo invece ritornare un array di nodi? Riscriviamo l'esempio:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

*!*
ul.append(...getListContent()); // append + "..." operator = friends!
*/!*
</script>
```

Menzioniamo `DocumentFragment` principalmente perché vi sono alcuni concetti che vi si basano, come un elemento [template](info:template-element), che vedremo molto più avanti. 

## Metodi vecchia scuola di inserimento/rimozione 

[old]

Vi sono dei metodi di manipolazione del DOM "vecchia scuola", che esistono per motivi storici. 

Questi metodi vengono dai vecchi tempi. Oggi non c'è ragione per utilizzarli, giacché i metodi moderni come `append`, `prepend`, `before`, `after`, `remove`, `replaceWith`, sono più flessibili. 

L'unica ragione per cui li elenchiamo è che possiamo ancora trovarli in molti vecchi script:

`parentElem.appendChild(node)`
: Appende `node` come ultimo figlio di `parentElem`.
  

    Il seguente esempio aggiunge un nuovo `<li>` alla fine di `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: Inserisce `node`, prima di `nextSibling`, dentro `parentElem`.

    Il codice seguente inserisce una nuova lista di elementi prima del secondo `<li>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    Per inserire `newLi` come primo elemento, possiamo fare così:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: Rimpiazza `oldChild` con `node` tra i figli di `parentElem`.

`parentElem.removeChild(node)`
: Rimuove `node` da `parentElem` (presupponendo che `node` sia suo figlio).

    Il seguente esempio rimuove il primo `<li>` da `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

Tutti questi metodi ritornano i nodi inseriti/rimossi. In altre parole, `parentElem.appendChild(node)` ritorna `node`. Ma solitamente il valore ritornato non viene utilizzato, è il metodo che ci interessa.

## Una parola su "document.write"

C'è un altro metodo, molto vecchio, per aggiungere qualcosa a una pagina web:  `document.write`.

La sintassi:

```html run
<p>Somewhere in the page...</p>
*!*
<script>
  document.write('<b>Hello from JS</b>');
</script>
*/!*
<p>The end</p>
```

La chiamata a `document.write(html)` scrive `html` nella pagina "all'istante". La stringa `html` può essere dinamicamente generata, quindi in un certo senso è flessibile. Possiamo utilizzare JavaScript per creare una pagina web completa e per scrivervi. 

Il metodo viene dai tempi in cui non c'era un DOM, nessun standart... Tempi molto vecchi. E' ancora vivo perché vi sono script che lo utilizzano. 

Negli script moderni possiamo trovarlo raramente a causa della seguente importante limitazione:

**La chiamata a `document.write` funziona solo mentre la pagina sta caricando.**
  
Se lo chiamiamo dopo, il contenuto esistente del documento viene cancellato.

Ad esempio:

```html run
<p>After one second the contents of this page will be replaced...</p>
*!*
<script>
  // document.write dopo 1 secondo
  // questo dopo che la pagina ha caricato, quindi il contenuto esistente viene cancellato
  setTimeout(() => document.write('<b>...By this.</b>'), 1000);
</script>
*/!*
```

Perciò è inutilizzabile dopo il caricamento della pagina, a differenza dei metodi del DOM che abbiamo visto sopra. 

Questo è il lato negativo.

Ma c'è anche un lato positivo. Tecnicamente, quando `document.write` viene chiamato mentre il browser sta leggendo ("analizzando") l'HTML, e vi scrive qualcosa, il browser tratta quel contenuto come se fosse stato dal principio nel testo HTML.

Quindi lavora molto velocemente, perché *non viene modificato il DOM*. Scrive direttamente nel testo della pagina, quando il DOM non è ancora stato costruito.

Perciò se abbiamo bisogno di aggiungere dinamicamente molto testo all'HTML, siamo in fase di caricamento della pagina e la velocità conta, potrebbe essere utile. Ma in pratica questo capita raramente. Di solito troviamo questo metodo in uno script solo perché è vecchio. 

## Riepilogo

  Metodi per creare nuovi nodi:
    - `document.createElement(tag)` -- crea un elemento con il dato tag,
    - `document.createTextNode(value)` -- crea un nodo di testo (raramente utilizzato),
    - `elem.cloneNode(deep)` -- clona un elemento, se `deep==true` include tutti i discendenti.

- Inserzione e rimozione:
    - `node.append(...nodi o stringhe)` -- inserisce dentro `node`, alla fine,
    - `node.prepend(...nodi o stringhe)` -- inserisce dentro `node`, all'inizio,
    - `node.before(...nodi o stringhe)` –- inserisce subito prima di `node`,
    - `node.after(...nodi o stringhe)` –- inserisce subito dopo `node`,
    - `node.replaceWith(...nodi o stringhe)` –- rimpiazza `node`.
    - `node.remove()` –- rimuove `node`.

    Le stringhe di testo vengono iserite "come testo".

- Ci sono anche metodi "vecchia scuola":
    - `parent.appendChild(node)`
    - `parent.insertBefore(node, nextSibling)`
    - `parent.removeChild(node)`
    - `parent.replaceChild(newElem, node)`

    Tutti questi metodi ritornano `node`.

- Data HTML come `html`, `elem.insertAdjacentHTML(where, html)` inserisce in base al valore di `where`:
    - `"beforebegin"` -- inserisce `html` subito prima di `elem`,
    - `"afterbegin"` -- inserisce `html` in `elem`, all'inizio,
    - `"beforeend"` -- inserisce `html` in `elem`, alla fine,
    - `"afterend"` -- inserisce `html` subito dopo `elem`.

    Ci sono altri metodi simili, `elem.insertAdjacentText` e `elem.insertAdjacentElement`, che inseriscono stringhe di testo ed elementi, ma vengono raramente utilizzati.

- Per appendere HTML a una pagina prima che questa carichi:
    - `document.write(html)`

    Dopo che la pagina ha caricato la sua chiamata cancella il contenuto della pagina. Si trova principalmente in vecchi script. 
