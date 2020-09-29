
# Mutation observer

Il `MutationObserver` &egrave; un oggetto incorporato (built-in object) che osserva un elemento DOM e lancia una callback in caso di variazioni.

Prima di tutto vediamo la sintassi, dopodich&egrave; analizzaremo un un caso d'uso del mondo reale.

## Sintassi

Il `MutationObserver` &egrave; semplice da usare.

Come prima cosa, creiamo un observer con una funzione di callback:

```js
let observer = new MutationObserver(callback);
```

quindi lo andiamo ad associare ad un nodo del DOM:

```js
observer.observe(node, config);
```

`config` &egrave; un oggetto che indica delle informazioni del tipo "a quale tipo di variazioni reagire" del tipo:
- `childList` -- cambiamenti nei nodi figli (childrens) di `node`,
- `subtree` -- in tutti i nodi discendenti di `node`,
- `attributes` -- attributi di `node`,
- `attributeFilter` -- un array di attributi, per osservare solo quelli selezionati.
- `characterData` -- se bisogna osservare `node.data` (text content),

Poche altre opzioni:
- `attributeOldValue` -- se impostato a `true`, passer&agrave; alla callback sia il vecchio che il nuovo valore dell'attributo (pi&ugrave; informazioni in basso), altrimenti (`false`) passer&agrave; solamente il nuovo valore (necessita dell'opzione `attributes`).
- `characterDataOldValue` -- se impostato a `true`, passer&agrave; alla callback sia il vecchio che il nuovo valore di `node.data` (pi&ugrave; informazioni in basso), altrimenti (`false`) passer&agrave; solamente il nuovo valore (necessita dell'opzione `characterData`).

Quindi, dopo ogni variazione, la `callback` verr&agrave; eseguita: le variazioni vengono passate nel primo argomento come una lista di oggetti [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord), e l'observer stesso come secondo argomento.

Gli oggetti [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects hanno propriet&agrave;:

- `type` -- tipo di mutation, uno tra:
    - `"attributes"`: attributi modificati
    - `"characterData"`: dati modificati, utilizzati per i nodi testuali,
    - `"childList"`: elementi figlio aggiunti/rimossi,
- `target` --  dove la variazione &egrave; avvenuta: un elemento per `"attributes"`, o nodo testuale per `"characterData"`, o un elemento per un `"childList"` mutation,
- `addedNodes/removedNodes`  -- nodi che sono stati aggiunti/rimossi,
- `previousSibling/nextSibling` -- il nodo di pari livello precedente e successivo rispetto al nodo aggiunto/rimosso,
- `attributeName/attributeNamespace` -- il nome/spazio dei nomi (name/namespace) (per XML) dell'attributo variato,
- `oldValue` -- il valore precedente, solo per variazioni di attributi o di testo, se &egrave; settata la relativa opzione `attributeOldValue`/`characterDataOldValue`.

Per esempio, abbiamo un `<div>` con un attributo `contentEditable`. Questo attributo ci permette di mettere il focus su di esso per poterlo modificare.

```html run
<div contentEditable id="elem">Clicca e <b>modifica</b>, per piacere.</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(le modifiche)
});

// observe everything except attributes
observer.observe(elem, {
  childList: true, // observe direct children
  subtree: true, // and lower descendants too
  characterDataOldValue: true // pass old data to callback
});
</script>
```

Adesso, se noi andiamo a modificare il testo all'interno di  `<b>modifica</b>`, otterremo una sola mutation (single mutation):

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // other properties empty
}];
```
Se invece selezioniamo e rimuoviamo del tutto `<b>modifica</b>`, otterremo una pi&ugrave; mutation (multiple mutations):

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // altre proprieta' vuote
}, {
  type: "characterData"
  target: <text node>
  // ...i dettagli della mutation dipendono da come il browser implementa questa rimozione
  // potrebbe fondere i due nodi adiacenti  "modifica " e ", per piacere" in un nodo
  // oppure potrebbe lasciarli in due nodi testuali separati
}];
```

Quindi, `MutationObserver` permette di reagire a qualunqe variazione all'interno degli sottonodi del DOM.

## Utilizzo per l'integrazione

Quando questa cosa pu&ograve; essere utile?

Immagina la situazione in cui devi inserire uno script di terze parti che aggiunge delle funzionalit&agrave; utili nella pagina, ma anche che faccia qualcosa di non richiesto, ad esempio, che mostri delle pubblicit&agrave; `<div class="ads">Unwanted ads</div>`.

Ovviamente, lo script di terze parti non fornisce alcun meccanismo per rimuoverla.

Utilizzando i `MutationObserver`, possiamo rilevare quando questi elementi si aggiungono al nostro DOM e rimuoverli. Lasciando per&ograve; la funzionalit&agrave; utile intatta. Tuttavia, quasi sicuramente, i creatori di questo script non sarebbero felici che prendiamo le funzioni utili e rimuoviamo le pubblicit&agrave;.

Ci sono altre situazioni nella quale uno script di terze parti aggiunge qualcosa nel nostro documento, e ci piacerebbe rilevarlo, ove questo succeda, per adattare la nostra pagina, ridimensionare dinamicamente qualcosa, etc.

Il `MutationObserver` pu&ograve; gestirlo facilmente.

## Utilizzo per l'architettura

Ci sono anche delle situazioni in cui il `MutationObserver` &egrave; di utilit&agrave; dal punto di vista architetturale.

Diciamo che stiamo creando un sito sulla programmazione. Naturalmente, gli articoli ed altro materiale pu&ograve; contenere dei frammenti di codice (snippets).

Questi frammenti nel markup HTML appaiono in questa maniera:

```html
...
<pre class="language-javascript"><code>
  // qui il codice
  let hello = "world";
</code></pre>
...
```

Utilizziamo anche una libreria di evidenziatura del codice Javascript, ad esempio [Prism.js](https://prismjs.com/). Una chiamata al metodo `Prism.highlightElem(pre)` esaminer&agrave; il contenuto di questo elemento `pre` e lo inserir&agrave; dentro dei tags specifici, generando degli stili CSS appositi per creare la colorazione dell'evidenziatura della sintassi, similmente a quello che puoi notare nell'esempio di questa pagina.

Quando esattamente eseguire questo metodo per l'evidenziatura? Possiamo farlo nell'evento `DOMContentLoaded`, oppure alla fine della pagina. Nel momento in cui abbiamo il DOM pronto, potr&agrave; effettuare la ricerca degli elementi `pre[class*="language"]` e chiamare il metodo `Prism.highlightElem` su di essi. 

```js
// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Finora &egrave; tutto molto semplice, giusto? Ci sono degli frammenti di codice`<pre>` nell'HTML, e noi li coloriamo.

Adesso andiamo avanti. Diciamo che andiamo ad eseguire il "fetch" di materiale da un server. Studieremo questi metodi [pi&ugrave; avanti nel tutorial](info:fetch). Per adesso importa solamente che noi eseguiamo una richiesta (utilizzando il metodo "fetch") di un articolo HTML da un webserver lo lo visualizziamo on demand:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;
```

Il nuovo `article` HTML potrebbe contenere dei frammenti di codice. Abbiamo bisogno di chiamare `Prism.highlightElem` su di essi, altrimenti il loro codice non verr&agrave; evidenziato.

**Dove e quando chiamare `Prism.highlightElem` per un articolo caricato dinamicamente?**

Potremmo accodare questa chiamata al codice che carica un articolo, cos&igrave;:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

...Ma immaginiamo, abbiamo un sacco di punti nel codice nei quali carichiamo contenuti, articoli, quiz, messaggi di forum. Dovremmo mettere la chiamata per l'evidenziatura dovunque? Non sarebbe molto conveniente ed &egrave; anche facile dimenticare di farlo ogni volta.

E che succederebbe, inoltre, se il contenuto venisse caricato da un modulo terze parti? Ad esempio, abbiamo un forum scritto da qualcuno altro, che carica contenuti dinamicamente, e ci piacerebbe aggiungergli l'evidenziatura del codice. A nessuno piace patchare script di terze parti.

Fortunatamente, esiste un'altra opzione.

Possiamo usare il `MutationObserver` per rilevare automaticamente i frammenti di codice che vengono inseriti nella pagina ed evidenziarli.

In questo modo gestiamo la funzionalit&agrave; di evidenziatura soltanto in un posto, liberandoci della necessit&agrave; di integrarla.

### Demo di evidenziatura dinamica

Qui l'esempio funzionante.

Se esegui questo codice, comincer&agrave; osservando l'elemento sotto ed evidenziando qualunque frammento di codice che apparir&agrave; l&igrave;:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // esamina i nuovi nodi, c'e' qualcosa da evidenziare?

    for(let node of mutation.addedNodes) {
      // teniamo traccia solo degli elementi, ignorando sugli altri nodi (ad esempio i nodi testuali)
      if (!(node instanceof HTMLElement)) continue;

      // controlla che l'elemento inserito sia un frammento di codice (code snippet)
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // o forse c'e' un frammento di codice da qualche parte tra i suo nodi figlio?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```
Qui c'&egrave; un elemento HTML e JavaScript che lo riempie dinamicamente utilizzando `innerHTML`.

Esegui il codice precedente (sopra, osserver&agrave; quell'elemento), e poi il codice sotto. Vedrai come il `MutationObserver` rilever&agrave; ed evidenzier&agrave; il frammento.

<p id="highlight-demo" style="border: 1px solid #ddd">Демо-элемент с <code>id="highlight-demo"</code>, за которым следит код примера выше.</p>

Il codice sotto popoler&agrave; `innerHTML`. Esegui prima il codice sopra, il quale osserver&agrave; ed evidenzier&agrave; il nuovo contenuto:

```js run
let demoElem = document.getElementById('highlight-demo');

//inserisce dinamicamente del contenuto con dei code snippets
demoElem.innerHTML = `Gi&ugrave; c'&egrave; un code snippet:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Un altro:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```
Ora abbiamo il `MutationObserver` che pu&ograve; tenere traccia di tutte le evidenzaiture negli elementi osservati  oppure l'intero `document`. Possiamo aggiungere/rimuovere frammenti di codice nell'HTML senza doverci preoccupare di gestirli.

## Metodi addizionali

C'&egrave; un metodo per interrompere l'osservazione del nodo:

- `observer.disconnect()` -- ferma l'osservazione.

Un altro metodo utilizzato spesso insieme:

- `mutationRecords = observer.takeRecords()` -- ottiene una lista di mutation records non processati, quelli che sono avvenuti, ma che non sono stati gestiti dalla callback.

```js
// ci piacerebbe smettere di tenere traccia delle variazioni
observer.disconnect();

//potrebbe non avere ancora gestito alcune mutations
let mutationRecords = observer.takeRecords();
// process mutationRecords
```

## Garbage collection

Gli observer utilizzano internamente dei riferimenti deboli ai nodi. Si tratta di questo: se un nodo viene rimosso dal DOM, diventando quindi irraggiungibile, allora diventa eliggibile per la garbage collection, e un observer certamente non lo previene.

## Riassumendo  

I `MutationObserver` possono reagire alle variazioni nel DOM: attributi, elementi aggiunti/rimossi, contenuto testuale.

Possiamo usarli per tenere traccia di modifiche introdotte da altre parti del nostro codice, cos&igrave; come quando integriamo script di terze parti.

I `MutationObserver` possono tenere traccia di ogni variazione. Le opzioni di configurazione "cosa osservare" vengono utilizzate per le ottimizzazioni, non per impiegare risorse in invocazioni di callback non richieste.
