# Stili e classi

Prima di cominciare a trattare i modi in cui JavaScript interagisce con gli stili e le classi -- ecco una regola importante. Si spera che sia abbastanza scontata, ma non guasta menzionarla ancora.

Ci sono in genere due modi di applicare uno stile ad un elemento:

1. Creare una classe CSS ed aggiungerla: `<div class="...">`
2. Scrivere direttamente proprietà dentro `style`: `<div style="...">`.

JavaScript può modificare sia le classi sia le proprietà all'interno di `style`.

Dovremmo sempre preferire le classi CSS a `style`. Quest'ultimo dovrebbe essere usato solo se le classi non sono sufficienti.

Per esempio, è ragionevole l'uso di `style` se calcoliamo dinamicamente le coordinate di un elemento e vogliamo impostarle con JavaScript, come in casi analoghi:

```js
let top = /* calcoli complessi */;
let left = /* calcoli complessi */;

elem.style.left = left; // es '123px', calcolato al momento dell'esecuzione
elem.style.top = top; // es '456px'
```

Per gli altri casi, come rendere rosso un testo, aggiungere un'icona di sfondo -- definiamo degli stili CSS e poi applichiamo la classe con JavaScript. È più flessibile e più facile da supportare.

## className e classList

Modificare una classe è una delle operazioni più comuni negli script.

Anticamente c'era una limitazione in JavaScript: una parola riservata come `"class"` non poteva essere una proprietà di un oggetto. Tale limitazione non c'è più, ma a quel tempo era impossibile avere una proprietà `"class"` come `elem.class`.

Quindi per le classi fu introdotta la proprietà `"className"` che è simile: l'attributo `"class"` ha il suo corrispettivo DOM in `elem.className`.

Per esempio:

```html run
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
```

Se assegniamo un valore a `elem.className` rimpiazziamo l'intero contenuto dell'attributo `"class"`. Talvolta è il risultato che vogliamo ottenere, spesso invece vogliamo aggiungere/rimuovere una singola classe.

Esiste un'altra proprietà per quello: `elem.classList`.

La proprietà `elem.classList` è uno speciale oggetto con i metodi `add/remove/toggle` per aggiungere/rimuovere/alternare una singola classe.

Per esempio:

```html run
<body class="main page">
  <script>
*!*
    // aggiunge una classe
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // main page article
  </script>
</body>
```

Possiamo agire pertanto sia sulla stringa intera delle classi rappresentata da `className`, oppure sulle singole classi usando `classList`. La nostra scelta dipende dalle nostre esigenze.

Metodi di `classList`:

- `elem.classList.add/remove("class")` -- aggiunge/rimuove la classe.
- `elem.classList.toggle("class")` -- aggiunge la classe se non esiste, diversamente la rimuove.
- `elem.classList.contains("class")` -- verifica che esista una determinata classe, restituisce `true/false`.

Oltretutto `classList` è iterabile, quindi possiamo elencare tutte le classi con `for..of` in questo modo:

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main, e dopo page
    }
  </script>
</body>
```

## La proprietà style di un elemento

La proprietà `elem.style` è un oggetto corrispondente a ciò che è scritto dentro l'attributo `"style"`. Impostando `elem.style.width="100px"` otteniamo lo stesso effetto che otterremmo scrivendo `width:100px` dentro l'attributo `style`.

Per le proprietà composte da più di una parola, si usa l'iniziale maiuscola dalla seconda parola in poi (camel case):

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

Per esempio:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="Proprietà con prefisso"
Le proprietà con il prefisso del browser come `-moz-border-radius`, `-webkit-border-radius` seguono anch'esse la stessa regola: un trattino comporta l'uso del maiuscolo.

Per esempio:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## Resettare la proprietà style

Talvolta vogliamo assegnare uno stile e successivamente rimuoverlo.

Per esempio, per nascondere un elemento, possiamo impostare `elem.style.display = "none"`.

Successivamente potremmo voler rimuovere `style.display` come se non fosse impostato. Invece di `delete elem.style.display` dovremmo assegnargli una stringa vuota: `elem.style.display = ""`.


```js run
// se eseguiamo questo codice, il <body> lampeggerà
document.body.style.display = "none"; // hide

setTimeout(() => document.body.style.display = "", 1000); // ritorna alla normalità
```

Se assegniamo una stringa vuota a `style.display`, il browser applica come di consueto le classi CSS ed i suoi stili predefiniti, come se non ci fosse alcuna proprietà `style.display`.

````smart header="Riscrittura completa con `style.cssText`"
Di solito usiamo `style.*` per assegnare le proprietà di stile individualmente. Non possiamo impostare tutti gli stili in questo modo `div.style="color: red; width: 100px"`, perché `div.style` è un oggetto ed è in sola lettura.

Per impostare tutti gli stili come stringa c'è una speciale proprietà `style.cssText`:

```html run
<div id="div">Button</div>

<script>
  // qui possiamo impostare speciali clausole di stile come "important"
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

Questa proprietà è usata di rado, poiché un tale assegnamento rimuove tutti gli stili esistenti: non li aggiunge, piuttosto li sostituisce. Potrebbe eliminare in modo fortuito qualcosa di necessario. Possiamo tuttavia usarla in sicurezza per i nuovi elementi, quando siamo certi che non cancelleremo uno stile preesistente.

Lo stesso risultato può essere ottenuto impostando un attributo: `div.setAttribute('style', 'color: red...')`.
````

## Presta attenzione alle unità di misura

Non dimenticare di aggiungere le unità di misura CSS ai valori.

Ad esempio, non dovremmo impostare `elem.style.top` a `10`, piuttosto a `10px`. Altrimenti non funzionerebbe:

```html run height=100
<body>
  <script>
  *!*
    // non funziona!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (stringa vuota, l'assegnamento è stato ignorato)
  */!*

    // aggiungiamo ora l'unità di misura CSS (px) - e funziona
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

Nota: il browser "spacchetta" la proprietà `style.margin` nelle ultime linee e deduce da essa `style.marginLeft` e `style.marginTop`.

## Stili calcolati: getComputedStyle

Modificare uno stile, quindi, è semplice. Ma come *leggerlo*?

Vogliamo, ad esempio, conoscere la dimensione, i margini, il colore di un elemento. Come fare?

**La proprietà `style` agisce solo sul valore dell'attributo `"style"`, senza considerare alcuna cascata CSS.**

Pertanto non possiamo leggere nulla che derivi dalle classi CSS tramite `elem.style`.

Qui, per esempio, `style` non rileva il margine:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
*!*
    alert(document.body.style.color); // vuoto
    alert(document.body.style.marginTop); // vuoto
*/!*
  </script>
</body>
```

...ma cosa dovremmo fare se avessimo bisogno, per dire, di incrementare il margine di `20px`? Dovremmo prima conoscerne il valore corrente.

C'è un altro metodo per quello: `getComputedStyle`.

La sintassi è:

```js
getComputedStyle(element, [pseudo])
```

element
: L'elemento di cui leggere il valore.

pseudo
: Uno pseudo-elemento se richiesto, per esempio `::before`. Una stringa vuota o nessun argomento significa l'elemento stesso.

Il risultato è un oggetto con gli stili, come `elem.style`, ma, a differenza di quello, tiene conto di tutte le classi CSS.

Per esempio:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // adesso possiamo ricavarne il margine ed il colore

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Valori calcolati e determinati"
Ci sono due concetti nei [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. Un valore stile *calcolato* (computed value) è il valore derivante dall'applicazione di tutte le regole e dell'ereditarietà dei CSS: il risultato della cascata CSS. Può essere simile a `height:1em` o `font-size:125%`.
2. Un valore stile *determinato* (resolved value) è quello applicato alla fine sull'elemento. Valori come `1em` o `125%` sono relativi. Il browser prende i valori calcolati e li converte tutti in unità di misura fisse e assolute, per esempio: `height:20px` o `font-size:16px`. Per le proprietà geometriche i valori determinati possono avere la virgola, come `width:50.5px`.

Molto tempo addietro `getComputedStyle` è stato creato per ottenere i valori calcolati, ma si scoprì che i valori determinati erano molto più utili e lo standard è cambiato.

Attualmente, quindi, restituisce il valore determinato della proprietà, di solito espressa in `px` per le proprietà geometriche.
```

````warn header="`getComputedStyle` richiede il nome completo della proprietà"
Dovremmo sempre chiedere l'esatta proprietà che si desidera, come `paddingLeft` o `marginTop` o `borderTopWidth`. Diversamente il risultato corretto non è garantito.

Per esempio, se ci sono le proprietà `paddingLeft/paddingTop`, cosa dovremmo ottenere con `getComputedStyle(elem).padding`? Niente, o forse un valore "generato" a partire dai valori di padding noti? Non esiste una regola standard in questo caso.

Ci sono altre incongruenze. Ad esempio, alcuni browser (Chrome) mostrano `10px` nel documento in basso, ed altri (Firefox) -- invece no:

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // Firefox restituisce una stringa vuota
</script>
```
````

```smart header="Gli stili applicati ai link `:visited` sono nascosti!"
I link visitati possono ricevere un colore tramite la pseudoclasse CSS `:visited`.

Tuttavia `getComputedStyle non dà accesso a quel colore, poiché diversamente una pagina arbitraria potrebbe scoprire se l'utente ha visitato un link creandolo sulla pagina e verificandone gli stili.

JavaScript may not see the styles applied by `:visited`. And also, there's a limitation in CSS that forbids applying geometry-changing styles in `:visited`. That's to guarantee that there's no side way for an evil page to test if a link was visited and hence to break the privacy.
```

## Riepilogo

To manage classes, there are two DOM properties:

- `className` -- the string value, good to manage the whole set of classes.
- `classList` -- the object with methods `add/remove/toggle/contains`, good for individual classes.

To change the styles:

- The `style` property is an object with camelCased styles. Reading and writing to it has the same meaning as modifying individual properties in the `"style"` attribute. To see how to apply `important` and other rare stuff -- there's a list of methods at [MDN](mdn:api/CSSStyleDeclaration).

- The `style.cssText` property corresponds to the whole `"style"` attribute, the full string of styles.

To read the resolved styles (with respect to all classes, after all CSS is applied and final values are calculated):

- The `getComputedStyle(elem, [pseudo])` returns the style-like object with them. Read-only.
