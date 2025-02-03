# Shadow DOM slots, composition

Molti tipi di components, come tabs, menù, gallerie di immagini ed altri ancora, necessitano di contenuti da visualizzare.

Proprio come gli elementi built-in del browser, in cui `<select>` si aspetta gli elementi `<option>`, i nostri `<custom-tabs>` potrebbero avere la necessità che gli venga passato il contenuto attuale del tab. Oppure un `<custom-menu>`, ad esempio, si aspetterebbe gli elementi del menù.

Il codice che fa uso del `<custom-menu>` potrebbe essere questo:

```html
<custom-menu>
  <title>Menù dei dolciumi</title>
  <item>Lecca-lecca</item>
  <item>Toast alla frutta</item>
  <item>Cup Cake</item>
</custom-menu>
```

...Il nostro "component" potrebbe visualizzarsi correttamente in questo modo, come un menù con titolo ed i suoi elementi, la gestione degli eventi e tutto il resto...

Come si può implementare?

Possiamo provare ad analizzare il contenuto dell'elemento, e poi copiare e riarrangiare dinamicamente i nodi DOM. Ciò è sicuramente fattibile, ma se stiamo spostando gli elementi nello shadow DOM, e quindi gli stili CSS del documento non verranno applicati in quella sezione, potremmo incorrere in difetti di visualizzazione degli stili, cosa che richiederebbe un po' di gestione lato codice.

Fortunatamente, non è necessario. Lo Shadow DOM supporta gli elementi `<slot>`, che vengono automaticamente riempiti dal contenuto del light DOM.

## Named slots

Diamo un'occhiata al funzionamento degli slots con un esempio basilare.

Qui, lo shadow DOM `<user-card>` fornisce due slots, riempiti dal light DOM:

```html run autorun="no-epub" untrusted height=80
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Name:
*!*
        <slot name="username"></slot>
*/!*
      </div>
      <div>Birthday:
*!*
        <slot name="birthday"></slot>
*/!*
      </div>
    `;
  }
});
</script>

<user-card>
  <span *!*slot="username"*/!*>John Smith</span>
  <span *!*slot="birthday"*/!*>01.01.2001</span>
</user-card>
```

Nello shadow DOM, `<slot name="X">` definisce un "punto di inserimento", cioè una posizione all'interno della quale vengono visualizzati gli elementi con `slot="X"`.

Quindi, il browser esegue la "composition": prende gli elementi dal light DOM e ne esegue il rendering all'interno degli slots corrispondenti dello shadow DOM. Ed alla fine del processo, avremo esattamente quello che vogliamo: un componente che può essere riempito con dei dati.

Ecco come sarà la struttura dopo lo script, senza il coinvolgimento della composition:

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

Abbiamo creato lo shadow DOM, ed eccolo dentro `#shadow-root`. Ora contiene sia lo shadow che il light DOM.

Per esigenze di rendering, per ogni `<slot name="...">` dello shadow DOM, il browser cerca uno `slot="..."` con lo stesso nome, all'interno del light DOM. Questi elementi vengono renderizzati dentro gli slots:

![](shadow-dom-user-card.svg)

Il risultato viene detto "flattened" DOM:

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <!-- l'elemento slotted viene inserito nello slot -->
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
</user-card>
```

...Tuttavia, il flattened DOM esiste puramente per scopi di rendering e gestione degli eventi. È come se fosse "virtuale". Le cose vengono mostrate così come le vediamo, ma i nodi nel documento non vengono spostati!

Ciò può essere facilmente verificato se eseguiamo`querySelectorAll`: i nodi saranno rimasti al proprio posto.

```js
// i nodi degli <span> del light DOM sono ancora nella stessa posizione, quindi dentro `<user-card>`
alert( document.querySelectorAll('user-card span').length ); // 2
```

Quindi, il flattened DOM deriva dallo shadow DOM con l'inserimento degli slots. Il browser ne effettua il rendering e li usa per ereditare gli stili e la propagazione degli eventi (vedremo questi aspetti più avanti). Ciononostante JavaScript vede ancora il documento "per quello che è", cioè come era prima del processo di flattening.

````warn header="Solo i figli top-level possono avere l'attributo slot=\"...\" "
L'attributo `slot="..."` è valido solamente per i figli diretti dello shadow host (nel nostro esempio, l'elemento `<user-card>`), gli elementi annidati, invece, vengono ignorati.

Ad esempio, qui il secondo `<span>` viene ignorato (dal momento che non è un figlio top-level di `<user-card>`):
```html
<user-card>
  <span slot="username">John Smith</span>
  <div>
    <!-- slot non valido, deve essere un figlio diretto di user-card -->
    <span slot="birthday">01.01.2001</span>
  </div>
</user-card>
```
````

Se ci sono più elementi nel light DOM con lo stesso slot name, questi vengono inseriti nello slot, uno dopo l'altro in successione.

<<<<<<< HEAD
Come nel seguente esempio:
=======
For example, this:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```html
<user-card>
  <span slot="username">John</span>
  <span slot="username">Smith</span>
</user-card>
```

Restituisce il flattened DOM con due elementi dentro `<slot name="username">`:

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John</span>
        <span slot="username">Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
</user-card>
```

## Slot fallback content

Se inseriamo qualcosa dentro l'elemento `<slot>`, rappresenterà il contenuto di ripiego, cioè quello "predefinito". Quindi, nel caso in cui non vi fossero contenuti corrispondenti nel light DOM, sarà questo il contenuto che verrà visualizzato dal browser.

Per esempio, in questo pezzo di shadow DOM, verrà visualizzato `Anonymous` se non ci sono `slot="username"` nel light DOM.

```html
<div>Name:
  <slot name="username">Anonymous</slot>
</div>
```

## Slot "default": il primo senza nome

Il primo `<slot>` dello shadow DOM privo di nome è uno slot "default". Esso riceve al suo interno tutti i nodi dal light DOM che non sono stati slottati da nessuna parte.

Per esempio, aggiungiamo lo slot default al nostro `<user-card>` che mostrerà tutte le informazioni non slottate dell'utente:

```html run autorun="no-epub" untrusted height=140
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
    <fieldset>
      <legend>Other information</legend>
*!*
      <slot></slot>
*/!*
    </fieldset>
    `;
  }
});
</script>

<user-card>
*!*
  <div>Mi piace nuotare.</div>
*/!*
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
*!*
  <div>...ed anche giocare a pallavolo!</div>
*/!*
</user-card>
```

Tutti i contenuti del light DOM unslotted andranno a finire dentro il fieldset "Other information".

Gli elementi vengono accodati su uno slot, uno dopo l'altro, quindi anche i pezzi di informazione unslotted vanno a finire dentro lo slot default, tutti insieme.

Il flattened DOM apparirà come questo:

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
    <fieldset>
      <legend>Other information</legend>
*!*
      <slot>
        <div>I like to swim.</div>
        <div>...And play volleyball too!</div>
      </slot>
*/!*
    </fieldset>
</user-card>
```

## Esempio di menù

Torniamo adesso al `<custom-menu>`, citato all'inizio del capitolo.

Possiamo usare gli slot per distribuire gli elementi.

Ecco il markup per il `<custom-menu>`:

```html
<custom-menu>
  <span slot="title">Menù dei dolciumi</span>
  <li slot="item">Lecca-lecca</li>
  <li slot="item">Toast alla frutta</li>
  <li slot="item">Cup Cake</li>
</custom-menu>
```

Questo è invece il template dello shadow DOM con gli slot appropriati:

```html
<template id="tmpl">
  <style> /* menu styles */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>
```

<<<<<<< HEAD
1. `<span slot="title">` verrà inserito dentro `<slot name="title">`.
2. Ci sono tanti `<li slot="item">`, ma solo uno `<slot name="item">` nel template. Di conseguenza tutti gli elementi `<li slot="item">` verranno inseriti dentro `<slot name="item">` uno dopo l'altro, così da formare la lista.
=======
1. `<span slot="title">` goes into `<slot name="title">`.
2. There are many `<li slot="item">` in the `<custom-menu>`, but only one `<slot name="item">` in the template. So all such `<li slot="item">` are appended to `<slot name="item">` one after another, thus forming the list.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il flattened DOM diventa:

```html
<custom-menu>
  #shadow-root
    <style> /* menu styles */ </style>
    <div class="menu">
      <slot name="title">
        <span slot="title">Menù dei dolciumi</span>
      </slot>
      <ul>
        <slot name="item">
          <li slot="item">Lecca-lecca</li>
          <li slot="item">Toast alla frutta</li>
          <li slot="item">Cup Cake</li>
        </slot>
      </ul>
    </div>
</custom-menu>
```

Qualcuno potrebbe notare che, in un DOM valido, un `<li>` dovrebbe essere figlio diretto di `<ul>`. Tuttavia questo è un flattened DOM, che descrive la maniera nella qualre il componente verrà renderizzato, quindi è perfettamente lecito e regolare.

Dobbiamo solo aggiungere una gestione per il `click`, per poter aprire e chiudere la lista, ed il `<custom-menu>` sarà pronto:

```js
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    // tmpl e' il template dello shadow DOM (sopra)
    this.shadowRoot.append( tmpl.content.cloneNode(true) );

    // non possiamo selezionare nodi del light DOM, quindi andiamo a gestire gli eventi nello slot
    this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
      // apre e chiude il menu'
      this.shadowRoot.querySelector('.menu').classList.toggle('closed');
    };
  }
});
```

Ecco la demo completa:

[iframe src="menu" height=140 edit]

Certamente possiamo andare ad aggiungere più funzionalità: eventi metodi e via dicendo.

## Aggiornamento degli slots

E se volessimo aggiungere e rimuovere elementi del menù dinamicamente?

**Il browser monitora gli slots e aggiorna la visualizzazione all'inserimento o rimozione di elementi slotted.**

Inoltre, dal momento che i nodi del light DOM non vengono copiati, ma solamente visualizzati negli slots, le modifiche al loro interno saranno immediatamente visibili.

Ne consegue che non dobbiamo fare assolutamente nulla per aggiornare la visualizzazione. Ma se il codice del componente vuole dei dettagli sulla modifica degli slots, allora si potrà usare l'evento `slotchange`.

Per esempio, qui l'elemento del menù viene inserito dinamicamente dopo un secondo, ed il titolo cambia dopo 2 secondi:

```html run untrusted height=80
<custom-menu id="menu">
  <span slot="title">Menù dei dolciumi</span>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // shadowRoot non puo' gestire l'evento, quindi usiamo il primo nodo figlio
    this.shadowRoot.firstElementChild.addEventListener('slotchange',
      e => alert("slotchange: " + e.target.name)
    );
  }
});

setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Lecca-lecca</li>')
}, 1000);

setTimeout(() => {
  menu.querySelector('[slot="title"]').innerHTML = "Nuovo menù";
}, 2000);
</script>
```

Il rendering del menù, viene aggiornato ogni volta senza la necessità di un nostro intervento.

In questo esempio, ci sono due eventi `slotchange`:

1. Nella inizializzazione:

    `slotchange: title` viene scaturito immediatamente, dal momento che `slot="title"` dal light DOM va a finire nello slot corrispondente.
2. Dopo 1 secondo:

    `slotchange: item` viene scaturito quando viene aggiunto un nuovo `<li slot="item">`.

Nota bene: non ci sono eventi `slotchange` dopo 2 secondi, quando viene modificato il contenuto di `slot="title"`. Questo perché non ci sono modifiche slot. Abbiamo modificato il contenuto dentro l'elemento slotted, che è una cosa differente e non collegata.

Volendo però tenere traccia delle modifiche interne nel light DOM tramite JavaScript, potremmo anche usare un meccanismo più generico come quello dei [MutationObserver](info:mutation-observer).

## Slot API

Infine, citiamo i metodi JavaScript inerenti gli slots.

<<<<<<< HEAD
Come già visto, JavaScript tiene d'occhio il DOM "effettivo", privo di flattening. Ma, se lo shadow tree ha il `{mode: 'open'}`, possiamo vedere quali elementi vengono assegnati a uno slot o, viceversa, lo slot con l'elemento al suo interno:
=======
As we've seen before, JavaScript looks at the "real" DOM, without flattening. But, if the shadow tree has `{mode: 'open'}`, then we can figure out which elements assigned to a slot and, vice-versa, the slot by the element inside it:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- `node.assignedSlot` -- restituisce l'elemento `<slot>` a cui è assegnato il `node`.
- `slot.assignedNodes({flatten: true/false})` -- nodi DOM, assegnati allo slot. L'opzione `flatten` è `false` di default. Se impostata esplicitamente a `true`, analizzerà più in profondità all'interno del flattened DOM, restituendo gli slot annidati in caso di componenti annidati o il fallback content, in assenza di nodi assegnati.
- `slot.assignedElements({flatten: true/false})` -- Elementi DOM, assegnati allo slot (come sopra, ma solo elementi di tipo nodo).

Questi metodi sono utili quando dobbiamo mostrare, non solo lo slotted content, ma anche tenerne traccia con JavaScript.

Ad esempio, se il componente `<custom-menu>` vuole sapere cosa sta mostrando, può tracciare `slotchange` ed ottenere gli elementi da `slot.assignedElements`:

```html run untrusted height=120
<custom-menu id="menu">
  <span slot="title">Menù dei dolciumi</span>
  <li slot="item">Lecca-lecca</li>
  <li slot="item">Toast alla frutta</li>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  items = []

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // viene generato quando cambia il contenuto dello slot
*!*
    this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
      let slot = e.target;
      if (slot.name == 'item') {
        this.items = slot.assignedElements().map(elem => elem.textContent);
        alert("Items: " + this.items);
      }
    });
*/!*
  }
});

// gli elementi vengono aggiornati dopo 1 secondo
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Cup Cake</li>')
}, 1000);
</script>
```


## Riepilogo

Generalmente, se un elemento ha lo shadow DOM, il suo light DOM non viene mostrato. Gli slots permettono di mostrare gli elementi del light DOM nei punti contrassegnati dello shadow DOM.

Esistono due tipi di slots:

- Named slots: `<slot name="X">...</slot>` -- ottiene i figli light tramite `slot="X"`.
- Default slot: il primo `<slot>` senza un nome (i successivi elementi privi di nome vengono ignorati) -- ottiene i figli light unslotted.
- Se ci sono più elementi per uno stesso slot -- vengono accodati uno dopo l'altro.
- Il contenuto dell'elemento `<slot>` viene usato come un ripiego (fallback). Viene mostrato se non ci sono figli light per un determinato slot.

Il processo di rendering degli elementi slotted all'interno dei loro slots viene chiamato "composition". Il risultato viene soprannominato "flattened DOM".

La Composition non sposta realmente i nodi, dal punto di vista di JavaScript il DOM rimane immutato.

JavaScript può accedere agli slots tramite:
- `slot.assignedNodes/Elements()` -- restituisce i nodi o gli elementi dentro lo `slot`.
- `node.assignedSlot` -- la proprietà inversa, restituisce lo slot partendo dal nodo.

Se volessimo conoscere cosa stiamo mostrando, possiamo tracciare il contenuto degli slot tramite:
- `slotchange` evento -- viene generato la prima volta che uno slot viene riempito, e per ogni operazione di aggiunta/rimozione degli elementi slotted, ma non i loro figli. Lo slot sarà `event.target`.
- [MutationObserver](info:mutation-observer) se vogliamo andare in profondità all'interno dello slot content, e tenere traccia dei cambiamenti all'interno di essi.

Ora, dal momento che conosciamo come mostrare gli elementi dal light DOM allo shadow DOM, possiamo vedere come stilizzarli in maniera consona. La regola di base è che gli elementi shadow vengono stilizzati dentro, mentre gli elementi light esternamente, ma ci sono delle eccezioni degne di nota.

Lo vedremo in dettaglio nel prossimo capitolo.
