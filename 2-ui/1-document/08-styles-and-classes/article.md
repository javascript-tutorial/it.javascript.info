# Stili e classi

Prima di cominciare a trattare i modi in cui JavaScript interagisce con gli stili e le classi, ecco una regola importante. Si spera che sia abbastanza scontata, ma non guasta ripeterla.

Ci sono in genere due modi di applicare uno stile ad un elemento:

1. Creare una classe CSS ed aggiungerla: `<div class="...">`
2. Scrivere direttamente le proprietà dentro `style`: `<div style="...">`.

JavaScript può modificare sia le classi che le proprietà all'interno di `style`.

Dovremmo sempre preferire le classi CSS a `style`. Quest'ultimo dovrebbe essere usato solo se le classi non sono sufficienti.

Per esempio, è ragionevole l'uso di `style` se calcoliamo dinamicamente le coordinate di un elemento e vogliamo impostarle con JavaScript, come in casi analoghi a questo esempio:

```js
let top = /* calcoli complessi */;
let left = /* calcoli complessi */;

elem.style.left = left; // es '123px', calcolato al momento dell'esecuzione
elem.style.top = top; // es '456px'
```

Per gli altri casi, come rendere rosso un testo o aggiungere un'immagine di sfondo, definiamo degli stili CSS e poi applichiamo la classe con JavaScript. È più flessibile e più facile da gestire.

## className e classList

Modificare una classe è una delle operazioni più comuni negli script.

Molto tempo fa c'era una limitazione in JavaScript: una parola riservata come `"class"` non poteva essere una proprietà di un oggetto. Tale limitazione non c'è più, ma a quel tempo era impossibile avere una proprietà `"class"` come `elem.class`.

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

Possiamo agire pertanto sia sulla stringa intera delle classi rappresentata da `className`, oppure sulle singole classi usando `classList`. La scelta dipende dalle nostre esigenze.

Metodi di `classList`:

- `elem.classList.add/remove("class")` -- aggiunge/rimuove la classe.
- `elem.classList.toggle("class")` -- aggiunge la classe se non esiste, diversamente la rimuove.
- `elem.classList.contains("class")` -- verifica che esista una determinata classe, restituisce `true/false`.

In aggiunta `classList` è iterabile, quindi possiamo elencare tutte le classi con `for..of` in questo modo:

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

<<<<<<< HEAD
````smart header="Riscrittura completa con `style.cssText`"
Di solito usiamo `style.*` per assegnare le proprietà di stile individualmente. Non possiamo impostare tutti gli stili in questo modo `div.style="color: red; width: 100px"`, perché `div.style` è un oggetto ed è in sola lettura.
=======
Also there is a special method for that, `elem.style.removeProperty('style property')`. So, We can remove a property like this:

```js run
document.body.style.background = 'red'; //set background to red

setTimeout(() => document.body.style.removeProperty('background'), 1000); // remove background after 1 second
```

````smart header="Full rewrite with `style.cssText`"
Normally, we use `style.*` to assign individual style properties. We can't set the full style like `div.style="color: red; width: 100px"`, because `div.style` is an object, and it's read-only.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

Questa proprietà è usata di rado, poiché un tale assegnamento rimuove tutti gli stili esistenti: non li aggiunge, ma li sostituisce. Potrebbe eliminare inavvertitamente qualcosa di necessario. Possiamo tuttavia usarla in sicurezza per i nuovi elementi, quando siamo certi che non cancelleremo uno stile preesistente.

Lo stesso risultato può essere ottenuto impostando un attributo: `div.setAttribute('style', 'color: red...')`.
````

## Prestate attenzione alle unità di misura

Non dimenticate di aggiungere le unità di misura CSS ai valori.

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

...ma cosa dovremmo fare se avessimo bisogno, ad esempio, di incrementare il margine di `20px`? Dovremmo prima conoscerne il valore corrente.

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

```smart header="Valori computed e resolved"
Ci sono due concetti nei [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. Un valore di uno stile *computed* è il valore derivante dall'applicazione di tutte le regole e dell'ereditarietà dei CSS: il risultato della cascata CSS. Può essere simile a `height:1em` o `font-size:125%`.
2. Un valore di uno stile *resolved* è quello applicato realmente sull'elemento. Valori come `1em` o `125%` sono relativi. Il browser prende i valori computed e li converte tutti in unità di misura fisse e assolute, per esempio: `height:20px` o `font-size:16px`. Per le proprietà geometriche i valori resolved possono avere la virgola, come `width:50.5px`.

Molto tempo addietro `getComputedStyle` è stato creato per ottenere i valori computed, ma si scoprì che i valori resolved erano molto più utili e lo standard è cambiato.

Attualmente, quindi, `getComputedStyle` restituisce il valore resolved della proprietà, di solito espressa in `px` per le proprietà geometriche.
```

````warn header="`getComputedStyle` richiede il nome completo della proprietà"
Dovremmo sempre chiedere l'esatta proprietà che si desidera, come `paddingLeft` o `marginTop` o `borderTopWidth`. Diversamente il risultato corretto non è garantito.

<<<<<<< HEAD
Per esempio, se ci sono le proprietà `paddingLeft/paddingTop`, cosa otterremmo con `getComputedStyle(elem).padding`? Niente, o forse un valore "generato" a partire dai valori di padding noti? Non esiste una regola standard in questo caso.

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
=======
For instance, if there are properties `paddingLeft/paddingTop`, then what should we get for `getComputedStyle(elem).padding`? Nothing, or maybe a "generated" value from known paddings? There's no standard rule here.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

```smart header="Gli stili applicati ai link `:visited` sono nascosti!"
I link visitati possono ricevere un colore tramite la pseudoclasse CSS `:visited`.

Tuttavia `getComputedStyle non dà accesso a quel colore, poiché diversamente, una pagina arbitraria potrebbe scoprire se l'utente ha visitato un link creandolo e verificandone gli stili.

JavaScript potrebbe non rilevare gli stili applicati da `:visited`. C'è una limitazione nei CSS, inoltre, che vieta su `:visited` l'applicazione di stili che modifichino le proprietà geometriche. Questo per garantire che, per una pagina malevola, non ci sia una via traversa di testare se un link è stato visitato e quindi di violare la privacy.
```

## Riepilogo

Per gestire le classi abbiamo a disposizione due proprietà DOM:

- `className` -- il valore stringa, ottimo per gestire l'intero insieme delle classi.
- `classList` -- l'oggetto con i metodi `add/remove/toggle/contains`, ottimo per gestire le classi individualmente.

Per modificare gli stili:

- La proprietà `style` è un oggetto contenente gli stili CSS, le proprietà composte da più di una parola sono trascritte in camel case. Leggere e scrivere con questa proprietà equivale a modificare individualmente gli stili con l'attributo `"style"`. Per vedere come applicare `important` e per altre esigenze poco comuni -- c'è una lista di metodi su [MDN](mdn:api/CSSStyleDeclaration).

- La proprietà `style.cssText` corrisponde al contenuto completo dell'attributo `"style"`, l'intera stringa degli stili.

Per leggere gli stili resolved (che tengono conto di tutte le classi, dopo che tutti i CSS sono stati applicati e sono stati calcolati i valori risultanti):

- Il metodo `getComputedStyle(elem, [pseudo])` restituisce un oggetto simile a `style` con tali valori. Questi sono in sola lettura.
