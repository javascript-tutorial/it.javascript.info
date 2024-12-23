# Attributi e proprietà

Quando il browser carica una pagina, "legge" (in altre parole: "analizza") l'HTML e genera gli oggetti DOM. Per i nodi elemento, i più degli attributi HTML standard diventano automaticamente proprietà degli oggetti DOM.

Ad esempio, se il tag è `<body id="page">`, allora l'oggetto DOM ha `body.id="page"`.

Ma la mappatura attributo-proprietà non è uno a uno! In questo capitolo faremo attenzione a separare queste due nozioni, vedremo come lavorare con esse, quando sono la stessa cosa e quando invece sono differenti. 

## Proprietà del DOM

Abbiamo già visto proprietà integrate del DOM. Ce ne sono molte. Ma tecnicamente nessuna di esse ci limita, e se non sono sufficienti, possiamo aggiungerne. 

I nodi del DOM sono regolari oggetti JavaScript. Possiamo modificarli. 

Ad esempio, creiamo una nuova proprietà in `document.body`:

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

Possiamo anche aggiungere un metodo:

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (il valore di "this" nel metodo è document.body)
```

Possiamo anche modificare prototipi integrati come `Element.prototype` e aggiungere metodi a tutti gli elementi:

```js run
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

Quindi, le proprietà e i metodi del DOM si comportano come normali oggetti JavaScript:

- Possono avere qualsiasi valore.
- Sono sensibili alle maiuscole (scrivi `elem.nodeType`, non `elem.NoDeTyPe`).

## Attributi HTML 

In HTML, i tag possono avere attributi. Quando il browser analizza l'HTML per creare gli oggetti DOM corrispondenti, riconosce gli attributi *standard* e crea proprietà del DOM a partire da essi.

Perciò, quando un elemento ha `id` o un altro attributo *standard*, la proprietà corrispondente viene creata. Ma questo non succede se l'attributo non è standard. 

Ad esempio:
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // un attributo non standard non ritorna una proprietà
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

Nota che un attributo standard di un elemento può essere sconosciuto ad un altro. Ad esempio, `"type"` è standard per `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), ma non per `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)). Gli attributi standard sono descritti nella specifica della classe corrispondente dell'elemento.

Possiamo vederlo qui:
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: proprietà del DOM non creata, perché non standard
*/!*
  </script>
</body>
```

Dunque, se un attributo non è standard, non vi sarà una corrispondente proprietà del DOM. C'è un modo per accedere a questi attributi?

Certo. Tutti gli attributi sono accessibili utilizzando i seguenti metodi:

- `elem.hasAttribute(name)` -- controlla l'esistenza.
- `elem.getAttribute(name)` -- ritorna il valore.
- `elem.setAttribute(name, value)` -- imposta un valore.
- `elem.removeAttribute(name)` -- rimuove l'attributo.

Questi metodi operano con quello che è scritto in HTML.

Si possono altresì leggere tutti gli attributi utilizzando `elem.attributes`: una collection di oggetti che appartengono alla classe integrata [Attr](https://dom.spec.whatwg.org/#attr), con proprietà come `name` e `value`.

Segue un esempio di lettura di proprietà non standard:

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // non standard
*/!*
  </script>
</body>
```

Gli attributi HTML hanno le seguenti caratteristiche:

- I loro nomi sono insensibili alle maiuscole (`id` è lo stesso di `ID`). 
- I loro valori sono sempre stringhe.

Ecco un esempio esaustivo di lavoro con gli attributi:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', legge

    elem.setAttribute('Test', 123); // (2), scrive

    alert( elem.outerHTML ); // (3), controlla se l'attributo è nell'HTML (sì)

    for (let attr of elem.attributes) { // (4) li elenca tutti
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

Nota:

1. `getAttribute('About')` -- la prima lettera è maiuscola, mentre in HTML è minuscola. Non ha importanza: i nomi degli attributi sono insensibili alle maiuscole. 
2. Possiamo assegnare qualsiasi cosa a un attributo, ma diventerà una stringa. Perciò qui abbiamo `"123"` come valore.
3. Tutti gli attributi, inclusi quelli che abbiamo impostato, sono visibili in `outerHTML`.
4. La collection `attributes` è iterabile e ha tutti gli attributi dell'elemento (standard e non standard) come oggetti con proprietà `name` e `value`.

## Sincronizzazione proprietà-attributo

Quando un attributo standard viene cambiato, la proprietà corrispondente viene automaticamente aggiornata, e (con qualche eccezione) vice versa.

Nell'esempio sotto `id` viene modificato come attributo, e possiamo vedere che anche la proprietà è cambiata. E questo anche al contrario:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attributo => proprietà
  input.setAttribute('id', 'id');
  alert(input.id); // id (aggiornato)

  // proprietà => attributo
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (aggiornato)
</script>
```

<<<<<<< HEAD
Ma ci sono eccezioni; ad esempio `input.value` si sincronizza solo da attributo a proprietà, ma non al contrario:
=======
But there are exclusions, for instance `input.value` synchronizes only from attribute -> property, but not back:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attributo => proprietà
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // NON proprietà => attributo
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (non aggiornato!)
*/!*
</script>
```

Nell'esempio sopra:
- Cambiare l'attributo `value` aggiorna la proprietà corrispondente.
- Ma la modifica della proprietà non cambia l'attributo. 

Questa caratteristica può essere utile perché le azioni dell'utente potrebbero portare a cambi di `value`, e dopo questi, se vogliamo recuperare il valore "originale" dall'HTML, lo troveremo nell'attributo.

## Le proprietà del DOM sono tipizzate

Le proprietà del DOM non sono sempre stringhe. Ad esempio, la proprietà `input.checked` (per i checkbox) è un booleano:

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // il valore dell'attributo è: stringa vuota
  alert(input.checked); // il valore della proprietà è: true
</script>
```

Ci sono altri esempi. L'attributo `style` è una stringa, ma la proprietà `style` non lo è.

```html run
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // stringa
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // object
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

La maggior parte delle proprietà, comunque, sono stringhe.

Raramente, anche se il tipo di una proprietà è una stringa, questa potrebbe essere diversa dall'attributo. Ad esempio, la proprietà DOM `href` è sempre un URL *completo*, anche se l'attributo contiene un URL relativo o semplicemente un `#hash`.

Un esempio:

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // attributo
  alert(a.getAttribute('href')); // #hello

  // proprietà
  alert(a.href ); // URL intera nella forma http://site.com/page#hello
</script>
```

Se necessitiamo del valore di `href` o di un qualsiasi altro attributo così come si trova nell'HTML, possiamo utilizzare `getAttribute`.


## Attributi non standard, dataset

Quando scriviamo HTML, utilizziamo molti attributi standard. E quelli non standard, personalizzati? Prima di tutto, vediamo se sono utili o meno, e per cosa.

Qualche volta gli attributi non standard sono utilizzati per passare dati personalizzati dall'HTML a JavaScript, o per "contrassegnare" elementi.

Così:

```html run
<!-- qui contrassegna div come "name" -->
<div *!*show-info="name"*/!*></div>
<!-- e qui come age -->
<div *!*show-info="age"*/!*></div>

<script>
  // il codice trova l'elemento con il contrassegno e mostra quel che vi è contenuto
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // inserisci l'info corrispondente nel field
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // prima Pete in "name", poi 25 in "age"
  }
</script>
```

Possono anche essere utilizzati per stilizzare un elemento.

Ad esempio, qui per lo stato degli ordini viene utilizzato l'attributo `order-state`: 

```html run
<style>
  /* lo stile si basa sull'attributo personalizzato "order-state" */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  Un nuovo ordine.
</div>

<div class="order" order-state="pending">
  Un ordine in attesa.
</div>

<div class="order" order-state="canceled">
  Un ordine cancellato.
</div>
```

Perché un attributo dovrebbe essere preferibile a una classe come `.order-state-new`, `.order-state-pending`, `.order-state-canceled`?

Perché un attributo è più semplice da gestire. Lo stato può cambiare così:

```js
// un po' più semplice del rimuovere/aggiungere una nuova classe
div.setAttribute('order-state', 'canceled');
```

Ma c'è un potenziale problema con gli attributi personalizzati. Che succederebbe se utilizzassimo un attributo non standard che in seguito verrebbe reso tale, con le sue caratteristiche? Il linguaggio HTML è vivo, cresce, e altri attributi potrebbero apparire per soddisfare le necessità degli sviluppatori.

Per evitare conflitti, abbiamo a disposizione gli attributi [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes).

**Tutti gli attributi che cominciano con "data-" sono riservati all'uso dei programmatori. Sono disponibili nella proprietà `dataset`.**


Ad esempio, se un `elem` ha un attributo chiamato `"data-about"`, questo sarà disponibile come  `elem.dataset.about`.


Così:

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

Attributi con più parole come  `data-order-state` vengono camel-cased: `dataset.orderState`.

Un esempio di riscrittura di "order state"

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  Un nuovo ordine.
</div>

<script>
  // legge
  alert(order.dataset.orderState); // new

  // modifica
  order.dataset.orderState = "pending"; // (*)
</script>
```

Utilizzare attributi `data-*` è un modo valido e sicuro per passare dati personalizzati. 

Nota, possiamo non solo leggere, ma anche modificare "attributi-data". CSS aggiorna l'aspetto conseguentemente: nell'esempio sopra l'ultima linea `(*)` cambia il colore a blu.

## Riepilogo

- Attributi -- quel che è scritto in HTML.
- Proprietà -- quel che si trova negli oggetti DOM.

Una piccola comparazione:

|            | Proprietà | Attributi  |
|------------|------------|------------|
|Tipo|Qualsiasi valore, le proprietà standard hanno i tipi descritti nella specifica|Una stringa|
|Nome|Nome è sensibile alle maiuscole|Nome non è sensibile alle maiuscole|

I metodi per lavorare con gli attributi sono:

- `elem.hasAttribute(name)` -- controlla l'esistenza.
- `elem.getAttribute(name)` -- ritorna il valore.
- `elem.setAttribute(name, value)` -- imposta un valore.
- `elem.removeAttribute(name)` -- rimuove l'attributo.
- `elem.attributes` una collection di tutti gli attributi.

Nella maggior parte delle situazioni è preferibile utilizzare le proprietà del DOM. Dovremmo riferirci agli attributi solo quando le proprietà non sono sufficienti, quando abbiamo bisogno dell'attributo esatto; ad esempio:

- Abbiamo bisogno di un attributo non standard. Ma se comincia con `data-`, allora dovremmo utilizzare `dataset`.
- Dobbiamo leggere un valore così "come scritto" in HTML. Il valore della corrispondente proprietà DOM potrebbe essere diverso; ad esempio la proprietà `href` è sempre un URL completo, e vorremmo il valore "originale".
