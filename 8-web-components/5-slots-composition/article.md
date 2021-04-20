# Shadow DOM slots, composition

Molti tipi di components, come tabs, menù, gallerie di immagini e così via, necessitano di contenuti da visualizzare.

Proprio come gli elementi built-in del browser, dove `<select>` si aspetta degli elementi `<option>`, i nostri `<custom-tabs>` potrebbero aspettarsi che gli venga passato l'attuale contenuto del tab. Ed un `<custom-menu>`, ad esempio, si aspetterebbe degli elemetni del menù.

Il codice che fa uso del `<custom-menu>` potrebbe essere questo:

```html
<custom-menu>
  <title>Menù dei dolciumi</title>
  <item>Lecca-lecca</item>
  <item>Toast alla frutta</item>
  <item>Cup Cake</item>
</custom-menu>
```

...Quindi il nostro "component" dovrebbe visualizzarsi correttamente, come un menù con titolo e relativi elementi, gestione degli eventi e tutto il resto...

Come si può implementare?

Possiamo provare ad analizzare il contenuto dell'elemento, e copiare e poi riarrangiare dinamicamente i nodi DOM. Ciò è sicuramente fattibile, ma se stiamo spostando gli elementi nello shadow DOM, e quindi gli stili CSS del documento non verranno applicati in quella sezione, potremmo perdere lo stile visuale. Ed anche questo richiederebbe un po' di gestione lato codice.

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

Nello shadow DOM, `<slot name="X">` definisce un "punto di inserimento", un posto dove vengono visualizzati gli elementi con `slot="X"`.

Quindi il browser esegue la "composizione": prende gli elementi dal light DOM e ne esegue il rendering negli slots corrispondenti dello shadow DOM. Quindi alla fine, avremo esattamente quello che vogliamo: un componente che può essere riempito con dei dati.

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

Abbiamo creato lo shadow DOM, quindi eccolo, dentro `#shadow-root`. Ora ha sia lo shadow che il light DOM.

Per esigenze di rendering, per ogni `<slot name="...">` dello shadow DOM, il browser cerca uno `slot="..."` con lo stesso nome all'interno del light DOM. Questi elementi vengono renderizzati dentro gli slots:

![](shadow-dom-user-card.svg)

Il risultato viene soprannominato "flattened" DOM:

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

...Ma il flattened DOM esiste poer scopi puramente di rendering e di gestione degli eventi. È come se fosse "virtuale". Le cose vengono mostrate così. Ma i nodi nel documento non vengono spostati!

Ciò può essere facilmente verificato se andiamo ad eseguire `querySelectorAll`: i nodi saranno al proprio posto.

```js
// gli nodi degli <span> del light DOM sono ancora nella stessa posizione, dentro `<user-card>`
alert( document.querySelectorAll('user-card span').length ); // 2
```

Quindi, il flattened DOM deriva dallo shadow DOM andando ad inserire gli slots. Il browser ne effettua il rendering e li usa per ereditare gli stili e per la propagazione degli eventi (vedremo questi aspetti più avanti). Ma JavaScript vede ancora il documento "per quello che è", cioè come era prima del flattening.

````warn header="Solo i figli top-level possono avere l'attributo slot=\"...\" "
L'attrbibuto `slot="..."` è valido solamente per i figli diretti dello shadow host (nel nostro esempio, l'elemento `<user-card>`). Per gli elementi annidati vengono ignorati.

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

Se ci sono più elementi nel light DOM con lo stesso slot name, vengono inseriti nello slot, uno dopo l'altro, in successione.

Per esempio, qui abbiamo:
```html
<user-card>
  <span slot="username">John</span>
  <span slot="username">Smith</span>
</user-card>
```

Restituisce questo flattened DOM con due elementi dentro `<slot name="username">`:

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

Se inseriamo qualcosa dentro uno `<slot>`, diverrà il contenuto di ripiego, quello "default". Il browser mostrerà questo, nel caso in cui non vi fossero contenuti corrispondenti nel light DOM.

Per esempio, in questo pezzo di shadow DOM, verrà visualizzato `Anonymous` se non ci sono `slot="username"` nel light DOM.

```html
<div>Name:
  <slot name="username">Anonymous</slot>
</div>
```

## Slot "default": il primo senza nome

Il primo `<slot>` dello shadow DOM privo di nome è uno slot "default". Esso riceve tutti i nodi dal light DOM che non sono stati slottati da nessuna parte.

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

Tutti i contenuti del light DOM non slottati andranno a finire dentro il fieldset "Other information".

Glie elementi vengono accodati su uno slot, uno dopo l'altro, quindi anche i pezzi di informazione non slottare vanno a finire dentro lo slot default tutti insieme.

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

Invece il template dello shadow DOM con gli slot appropriati:

```html
<template id="tmpl">
  <style> /* menu styles */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>
```

1. `<span slot="title">` andrà a finire dentro `<slot name="title">`.
2. Ci sono tanti `<li slot="item">`, ma solo uno `<slot name="item">` nel template. Quindi tutti questi `<li slot="item">` verranno inseriti dentro `<slot name="item">` uno dopo l'altro, così da formare la lista.

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

Qualcuno potrebbe fare notare che, in un DOM valido, un `<li>` dovrebbe essere figlio diretto di `<ul>`. Ma questo è un flattened DOM, che descrive come il componente verrà renderizzato, quindi è perfettamente regolare.

Dobbiamo solo aggiungere un gestire al `click` per aprire e chiudere la lista, ed il `<custom-menu>` sarà pronto:

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

**Il browser monitora dgli slots e aggiorna la visualizzazione all'inserimento o rimozione di elementi slottati.**

Inoltre, dal momento che i nodi del light DOM non vengono copiati, ma solo visualizzati negli slots, le modifiche al loro interno divengono immmediatamente visibili.

Quindi non dobbiamo fare nulla per aggiornare la visualizzazione. Ma se il codice del componente vuole avere dei dettagli sulla modifica degli slots, allora si potrà usare l'evento `slotchange`.

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

    // shadowRoot non puo' gestori di evento, quindi usiamo il primo nodo figlio
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

Norta bene: non ci sono eventi `slotchange` dopo 2 secondi, quando viene modificato il contenuto di `slot="title"`. Questo perché non ci sono modifiche slot. Abbiamo modificato il contenuto dentro l'elemento slotted, che è tutt'altra cosa.

Se volessimo tenere traccia delle modifiche interne del light DOM tramite JavaScript, si potrebbe anche usare un meccanismo più generico: I [MutationObserver](info:mutation-observer).

## Slot API

Infine, citiamo i metodi JavaScript inerenti gli slots.

Come già visto, JavaScript osserva il DOM "effettivo", privo di flattening. Ma, se lo shadow tree ha il `{mode: 'open'}`, possiamo vedere quali elementi vengono assegnati a uno slot e, vice versa, lo slot con l'elemento al suo interno:

- `node.assignedSlot` -- restiuisce l'elemento `<slot>` a cui è assegnato il `node`.
- `slot.assignedNodes({flatten: true/false})` -- nodi DOM, assegnati allo slot. L'opzione `flatten` è `false` di default. Se impostata explicitly set to `true`, then it looks more deeply into the flattened DOM, returning nested slots in case of nested components and the fallback content if no node assigned.
- `slot.assignedElements({flatten: true/false})` -- DOM elements, assigned to the slot (same as above, but only element nodes).

These methods are useful when we need not just show the slotted content, but also track it in JavaScript.

For example, if `<custom-menu>` component wants to know, what it shows, then it could track `slotchange` and get the items from `slot.assignedElements`:

```html run untrusted height=120
<custom-menu id="menu">
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
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

    // triggers when slot content changes
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

// items update after 1 second
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Cup Cake</li>')
}, 1000);
</script>
```


## Summary

Usually, if an element has shadow DOM, then its light DOM is not displayed. Slots allow to show elements from light DOM in specified places of shadow DOM.

There are two kinds of slots:

- Named slots: `<slot name="X">...</slot>` -- gets light children with `slot="X"`.
- Default slot: the first `<slot>` without a name (subsequent unnamed slots are ignored) -- gets unslotted light children.
- If there are many elements for the same slot -- they are appended one after another.
- The content of `<slot>` element is used as a fallback. It's shown if there are no light children for the slot.

The process of rendering slotted elements inside their slots is called "composition". The result is called a "flattened DOM".

Composition does not really move nodes, from JavaScript point of view the DOM is still same.

JavaScript can access slots using methods:
- `slot.assignedNodes/Elements()` -- returns nodes/elements inside the `slot`.
- `node.assignedSlot` -- the reverse property, returns slot by a node.

If we'd like to know what we're showing, we can track slot contents using:
- `slotchange` event -- triggers the first time a slot is filled, and on any add/remove/replace operation of the slotted element, but not its children. The slot is `event.target`.
- [MutationObserver](info:mutation-observer) to go deeper into slot content, watch changes inside it.

Now, as we know how to show elements from light DOM in shadow DOM, let's see how to style them properly. The basic rule is that shadow elements are styled inside, and light elements -- outside, but there are notable exceptions.

We'll see the details in the next chapter.
