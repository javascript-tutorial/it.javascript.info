# Shadow DOM styling

Lo shadow DOM può includere i `<style>` e `<link rel="stylesheet" href="…">`. Nel secondo caso, i fogli di stile sono HTTP-cached, e non verranno ricaricati per più componenti che usino lo stesso template.

Come regola generale, gli stili locali hanno effetto solamente all'interno dello shadow tree, mentre quelli del documento hanno effetto al di fuori di esso. Con qualche eccezione.

## :host

Il selettore `:host` permette di selezionare lo shadow host (l'elemento contenente lo shadow tree).

Ad esempio, se stiamo crendo un elemento `<custom-dialog>` da centrare sulla pagina. Per fare ciò dovremmo creare lo all'interno dello stesso `<custom-dialog>`.

Questo è ciò che fa `:host`:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    /* lo stile viene applicato all'interno dell'elemento custom-dialog */
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Ciao!
</custom-dialog>
```

## Cascading

Lo shadow host (`<custom-dialog>`) risiede dentro il light DOM, e quindi viene influenzato dalle regole CSS del documento.

Nel caso ci fosse una proprietà stilizzata localmente sia tramite `:host`, che tramite regola nel documento, quest'ultima avrebbe la precedenza.

Per esempio, se nel documento avessimo:
```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```
...in questo caso il `<custom-dialog>` non avrebbe nessun padding.

Questo cosa può fare comodo, perché in pratica ci permette di impostare gli stili di "default" di un componente nelle sue regole `:host`, per poterle poi facilmente sovrascrivere nel documento.

Un'eccezione a questo comportamento è però quando una proprietà locale viene contrassegnata come `!important`, di conseguenza gli stili locali avranno la precedenza.


## :host(selector)

Come nel caso di `:host`, ma applicato solo se lo shadow host combacia con il `selettore`.

Ad esempio, se volessimo centrare il `<custom-dialog>` contenente l'attributo `centered`:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
*!*
    :host([centered]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  Centrato!
</custom-dialog>

<custom-dialog>
  Non centrato.
</custom-dialog>
```

In tali condizioni gli stili aggiuntivi per centrare l'elemento, verrebbero applicati solamente al primo dialog: `<custom-dialog centered>`.

## :host-context(selector)

Come `:host`, ma applicati solo se lo shadow host o un qualunque dei suoi antenati esterni nel document, combacia con il `selettore`.

Ad esempio `:host-context(.dark-theme)` combacia solo nel caso ci fosse una classe `dark-theme` su `<custom-dialog>` o su qualunque elemento sopra di esso:

```html
<body class="dark-theme">
  <!--
    :host-context(.dark-theme) viene applicata al custom-dialogs dentro .dark-theme
  -->
  <custom-dialog>...</custom-dialog>
</body>
```

Riepilogando, possiamo usare la famiglia dei selettori `:host` per stilizzare l'elemento principale del componente, in riferimento al suo contesto. Questi stili (a meno che non vengano dichiarati con `!important`) possono essere sovrascritti con altri stili nel documento.

## Stili sullo slotted content

Consideriamo ora la situazione con l'uso degli slot.

Gli slotted elements arrivano dal light DOM, quindi useranno gli stili del documento. Gli stili locali non avranno alcun effetto sullo slotted content.

Nel seguente esempio, lo slotted `<span>` è in grassetto, per via dello stile del documento, ed invece `background` non sortirà nessun effetto perché dichiarato dentro lo stile locale
```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Nome: <slot name="username"></slot>
    `;
  }
});
</script>
```

Il risultato sarà in grassetto, ma non rosso.

Se volessimo stilizzare gli slotted elements all'interno del nostro componente, avremmo due scelte.

La prima sarebbe di utilizzare lo `<slot>` stesso e fare affidamento all'ereditarietà dei CSS:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="username"] { font-weight: bold; }
*/!*
      </style>
      Nome: <slot name="username"></slot>
    `;
  }
});
</script>
```

In questo caso `<p>John Smith</p>` sarà in grassetto, perché l'ereditarietà dei CSS è in effetti tra lo `<slot>` ed il suo contenuto. Ma nel CSS stesso non tutte le proprietà vengono ereditate.

L'altra opzione sarebbe quella di usare la pseudo-classe `::slotted(selector)` Essa controlla la corrispondenza degli elementi basandosi su due condizioni:

1. Se si tratta di uno slotted element, proveniente dal light DOM. Lo slot name è irrilevante. È importante invece che sia l'elemento stesso e non i suoi figli.
2. Se l'elemento combacia con il `selettore`.

Nel nostro esempio, `::slotted(div)` seleziona esattamente `<div slot="username">`, ma non i suoi figli:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">
    <div>John Smith</div>
  </div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { border: 1px solid red; }
*/!*
      </style>
      Nome: <slot name="username"></slot>
    `;
  }
});
</script>
```

Nota bene, il selettore `::slotted` non può influenzare ciò che discende ulteriormente dentro lo slot. Questi selettori non sono validi:

```css
::slotted(div span) {
  /* il nostro slotted <div> non combacia con questo */
}

::slotted(div) p {
  /* non va dentro il light DOM */
}
```

Inoltre, `::slotted` può essere usato solamente con i CSS. Non è possibile usarlo in `querySelector`.

## CSS hooks con proprietà custom

Come si possono stilizzare gli elementi interni di un componente, applicando stili dal documento principale?

I selettori com `:host` applicano le loro regole all'elemento `<custom-dialog>` o `<user-card>`, ma come possiamo stilizzare gli elementi dello shadow DOM al suo interno?

Non abbiamo dei selettori che possano direttamente influire gli stili dello shadow DOM dal documento. Ma dal momento che possiamo esporre dei metodi per interagire con i nostri componenti, possiamo anche esporre delle variabili CSS (proprietà CSS personalizzate) per stilizzarli.

**Le proprietà Custom CSS risiedono in tutti i livelli, sia nel light che nello shadow.**

Per esempio, nello shadow DOM, possiamo usare la variabile CSS `--user-card-field-color` per stilizzare i campi, e l'outer document può impostarne il valore:

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
    /* se --user-card-field-color non è definito, usa il nero*/
  }
</style>
<div class="field">Nome: <slot name="username"></slot></div>
<div class="field">Data di nascita: <slot name="birthday"></slot></div>
```

Quindi, possiamo dichiarare questa proprietà nell'outer document per `<user-card>`:

```css
user-card {
  --user-card-field-color: green;
}
```

Le proprietà Custom CSS permeano anche lo shadow DOM, e sono visibili ovunque, quindi la regola interna `.field` ne farà uso.

Ecco l'esempio completo:

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  user-card {
    --user-card-field-color: green;
  }
*/!*
</style>

<template id="tmpl">
  <style>
*!*
    .field {
      color: var(--user-card-field-color, black);
    }
*/!*
  </style>
  <div class="field">Nome: <slot name="username"></slot></div>
  <div class="field">Data di nascita: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```



## Riepilogo

Lo shadow DOM può includere stili, sia con `<style>` che con `<link rel="stylesheet">`.

Gli stili in locale possono influenzare:
- lo shadow tree,
- lo shadow host attraverso la famiglia di pseudoclassi `:host`,
- gli slotted elements (in arrivo dal light DOM), `::slotted(selector)` permettono di selezionare gli slotted elements stessi, ma non i loro figli.

Gli stili del document possono influenzare:
- lo shadow host (poiché risiede nell'outer document)
- gli slotted elements ed il loro contenuto (anche qui, poiché risiede nell'outer document)

Quando delle proprietà CSS vanno in conflitto, normalmente gli stili del documento hanno la precedenza, a meno che la proprietà non venga contrassegnata come `!important`, ed in questo caso gli stili locali hanno la precedenza.

Le proprietà CSS custom permeano attraverso lo shadow DOM e vengono usati come "hooks" per stilizzare il componente:

1. Il componente usa una proprietà CSS personalizzata, per stilizzare gli elementi chiave, come `var(--component-name-title, <default value>)`.
2. L'autore del componente pubblica queste proprietà per gli sviluppatori, importanti tanto quanti gli altri metodi del componente.
3. Quando una sviluppatore vuole stilizzare un titolo, gli basta assegnare la proprietà CSS `--component-name-title` partendo dallo shadow host o anche più in alto.
4. Utilissimo!
