# Introduzione agli eventi del browser

*Un evento* è un segnale che sta ad indicare che è avvenuto qualcosa. Tutti i nodi DOM generano questi segnali (anche se gli eventi non sono limitati al DOM).

Ecco quindi una lista, degli eventi DOM più utili:

**Eventi del mouse:**
- `click` -- quando si clicca col mouse su un elemento (i dispositivi touch lo generano tramite il tocco).
- `contextmenu` -- quando si clicca col tasto destro su un elemento.
- `mouseover` / `mouseout` -- quando il cursore passa sopra/abbandona un elemento.
- `mousedown` / `mouseup` -- quando viene premuto/rilasciato il pulsante del mouse su un elemento.
- `mousemove` -- quando si sposta il mouse.

**Eventi da tastiera:**
- `keydown` e `keyup` -- quando viene premuto e rilasciato un tasto.

**Eventi degli elementi del form:**
- `submit` -- quando l'utente invia un `<form>`.
- `focus` --  quando l'utente attiva il focus su un elemento, ad esempio su un `<input>`.

**Eventi del Document:**
- `DOMContentLoaded` -- quando l'HTML viene caricato e processato, e la costruzione del DOM è stata completata.

**Eventi dei CSS:**
- `transitionend` -- quando termina un'animazione CSS (CSS-animation).

<<<<<<< HEAD
Ci sono molti altri eventi più specifici, che verranno affrontati in dettaglio nei prossimi capitoli.
=======
There are many other events. We'll get into more details of particular events in upcoming chapters.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Gestori di evento

Per reagire agli eventi possiamo assegnare un *gestore* (handler). Questo non è altro che una funzione che viene eseguita contestualmente alla generazione di un evento.

I gestori, quindi, sono un modo per eseguire codice JavaScript al verificarsi delle azioni dell'utente ed esistono vari modi per assegnare un evento. 

Partiamo dal più semplice.

### Attributo HTML

Un gestore può essere impostato in HTML con un attributo chiamato `on<event>`.

Ad esempio, per assegnare un gestore al `click` di un `input`, possiamo usare `onclick`:

```html run
<input value="Cliccami" *!*onclick="alert('Click!')"*/!* type="button">
```

Al click del mouse, il codice dentro `onclick` verrà eseguito.

Nota bene che dentro `onclick` useremo gli apici singoli, in quanto l'attributo stesso è già inserito all'interno di apici doppi. Se ci dimenticassimo che il codice stesse dentro l'attributo, ed usassimo gli apici doppi come in questo caso:  `onclick="alert("Click!")"`, il codice non funzionerebbe.

Un attributo HTML non è un buon posto per scrivere tanto codice, quindi è molto meglio creare una funzione JavaScript per poterla richiamare.

In questo esempio, al click viene eseguita la funzione `countRabbits()`:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Coniglio numero " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Conta i conigli!">
```
Come sappiamo, gli attributi HTML non sono case-sensitive, quindi scrivere `ONCLICK` va bene tanto quanto `onClick` e `onCLICK`...ma solitamente vengono scritti in minuscolo: `onclick`.

### Proprietà del DOM

Possiamo assegnare un gestore usando una proprietà DOM `on<event>`.

Ad esempio, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Cliccami">
<script>
*!*
  elem.onclick = function() {
    alert('Grazie');
  };
*/!*
</script>
```

Se il gestore viene assegnato usando un attributo HTML, il browser lo riconosce, crea una nuova funzione partendo dal contenuto dell'attributo e la scrive nella proprietà del DOM.

In sostanza, questa modalità equivale alla precedente.

I due codici messi a confronto, infatti, lavorano alla stessa maniera:

1. Solo HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Click!')"*/!* value="Button">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Button">
    <script>
    *!*
      button.onclick = function() {
        alert('Click!');
      };
    */!*
    </script>
    ```
L'unica differenza è che nel primo esempio, l'attributo HTML viene usato per inizializzare il `button.onclick`, invece nel secondo per inizializzare lo script.

**Dal momento che c'è solo una proprietà `onclick`, non è possibile assegnare più di un gestore evento.**

Aggiungendo un gestore tramite JavaScript, si va a sovrascrivere il gestore esistente:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Prima')" value="Click me">
<script>
*!*
  elem.onclick = function() { // sovrascrive il gestore precedente
    alert('Dopo'); // viene mostrato solo questo
  };
*/!*
</script>
```

Per rimuovere un gestore, assegnare `elem.onclick = null`.

## Accedere all'elemento: this

Il valore di `this` all'interno di un gestore è l'elemento contenente il gestore.

Qui il `button` mostra il suo contenuto tramite `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Cliccami</button>
```

## Possibili errori

Se stai affrontando da poco l'argomento degli eventi, nota bene alcune sottigliezze.

Possiamo impostare come gestore una funzione esistente:

```js
function sayThanks() {
  alert('Grazie!');
}

elem.onclick = sayThanks;
```

Ma attenzione: la funzione deve essere assegnata scrivendo `sayThanks`, e non `sayThanks()`.

```js
// corretto
button.onclick = sayThanks;

// errato
button.onclick = sayThanks();
```

Se aggiungessimo le parentesi, allora `sayThanks()` diverrebbe una chiamata a funzione. Di conseguenza il valore dell'assegnazione dell'ultima riga dell'esempio, sarebbe il risultato della chiamata, ossia `undefined` (dato che la funzione non restituisce nulla), e verrebbe assegnato ad `onclick`. Ovviamente così non potrebbe andare bene, ed inoltre non sarebbe nemmeno l'effetto voluto.

...D'altra parte, però, nel markup abbiamo bisogno delle parentesi:

```html
<input type="button" id="button" onclick="sayThanks()">
```

La differenza è molto semplice: quando il browser legge l'attributo, crea una funzione che fa da gestore, il cui corpo è il contenuto dell'attributo.

Quindi il markup crea questa proprietà:
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- il contenuto dell'attributo va a finire qui
*/!*
};
```

**Non usare `setAttribute` per i gestori.**

Ed ancora, una chiamata del genere non funzionerà:

```js run no-beautify
// un click sul <body> genera errori,
// perché gli attributi sono sempre stringhe, e la funzione diventa una stringa
document.body.setAttribute('onclick', function() { alert(1) });
```

**Il case della proprietà DOM è rilevante.**

Assegnare un gestore a `elem.onclick`, e non a `elem.ONCLICK`, in quanto le proprietà del DOM sono case-sensitive.

## addEventListener

<<<<<<< HEAD
Il problema principale della sopracitata maniera di assegnare i gestori è che non abbiamo modo di assegnare dei gestori multipli a un evento.
=======
The fundamental problem of the aforementioned ways to assign handlers is that we *can't assign multiple handlers to one event*.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ipotizziamo che una parte del nostro codice serva ad evidenziare un pulsante al click, e che un altro serva a mostrare un messaggio al medesimo click.

Per fare questo sarebbe bello poter assegnare due eventi distinti, ma sappiamo che ogni nuova proprietà DOM con lo stesso nome, sovrascriverà la precedente:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // sostituisce il gestore precedente
```

<<<<<<< HEAD
Gli sviluppatori degli standard web hanno intuito la cosa tempo addietro, e hanno suggerito un modo alternativo per trattare i gestori, usando i metodi speciali `addEventListener` e `removeEventListener`, i quali non sono affetti da questi problemi.
=======
Developers of web standards understood that long ago and suggested an alternative way of managing handlers using the special methods `addEventListener` and `removeEventListener` which aren't bound by such constraint.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ecco la sintassi per aggiungere un gestore:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: Nome dell'evento, ad esempio `"click"`.

`handler`
: La funzione che fa da gestore.

`options`
: Un oggetto opzionale aggiuntivo con delle proprietà:
    - `once`: se `true`, il listener viene rimosso automaticamente una volta innescato.
    - `capture`: la fase in cui deve essere gestito l'evento, argomento affrontato più avanti nel capitolo <info:bubbling-and-capturing>. Per ragioni storiche, `options` possono essere anche `false/true`, ed è equivale a scrivere `{capture: false/true}`.
    - `passive`: se `true`, il gestore non chiamerà `preventDefault()`, anche questo, verrà spiegato successivamente nel capitolo <info:default-browser-action>.

Per rimuovere l'evento, si usa `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="La rimozione richiede la stessa identica funzione"
Per rimuovere un gestore dobbiamo passare come parametro, la stessa funzione che abbiamo usato per l'assegnazione.

Il seguente codice non fa quello che ci aspetteremmo:

```js no-beautify
elem.addEventListener( "click" , () => alert('Grazie!'));
// ....
elem.removeEventListener( "click", () => alert('Grazie!'));
```

Il gestore non verrà rimosso, perchè `removeEventListener` prende come parametro un'altra funzione: è certamente con lo stesso codice, ma questo non ha alcuna rilevanza, dal momento che è un oggetto funzione differente (fanno riferimento a due differenti indirizzi di memoria).

La maniera corretta per farlo è questa:

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Nota bene: se non assegnassimo la funzione a una variabile, non potremmo rimuoverla: non c'è alcun modo di "risalire" ai gestori assegnati tramite `addEventListener`.
````

<<<<<<< HEAD
Chiamate multiple a `addEventListener` permettono di aggiungere gestori multipli:
=======
Multiple calls to `addEventListener` allow it to add multiple handlers, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run no-beautify
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Grazie!');
  };

  function handler2() {
    alert('Grazie di nuovo!');
  }

*!*
  elem.onclick = () => alert("Ciao");
  elem.addEventListener("click", handler1); // Grazie!
  elem.addEventListener("click", handler2); // Grazie di nuovo!
*/!*
</script>
```

Come visto nell'esempio, possiamo impostare i gestori *in entrambi i modi* sia con l'ausilio di una proprietà DOM che di `addEventListener`. Generalmente però, scegliamo un solo approccio.

````warn header="Per alcuni eventi, i gestori funzionano solo con `addEventListener`"
Esistono eventi che non possono essere assegnati tramite una proprietà DOM, ma solo con `addEventListener`.

<<<<<<< HEAD
Un esempio di ciò, è l'evento `DOMContentLoaded`, innescato quando viene completamente caricato il documento e costruita tutta la struttura del DOM.
=======
For instance, the `DOMContentLoaded` event, that triggers when the document is loaded and the DOM has been built.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
// non viene mai eseguito
document.onDOMContentLoaded = function() {
  alert("DOM costruito");
};
```

```js
// in questo modo funziona
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM costruito");
});
```
Conseguentemente, `addEventListener` è più universale, benché questi eventi siano un'eccezione più che la regola.
````

## Oggetto evento

Per gestire correttamente un evento, vorremmo saperne di più su cosa è avvenuto. Non solamente se è stato un "click" o un "keydown", ma, ad esempio, quali erano le coordinate del puntatore? Che tasto è stato premuto? E così via.

Quando c'è un evento, il browser crea un *oggetto evento* (event object), inserisce i dettagli al suo interno e lo passa come argomento al gestore.

Ecco un esempio per ottenere le coordinate dall'oggetto evento:

```html run
<input type="button" value="Clicami" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // mostra il tipo di evento, l'elemento e le coordinate del click
    alert(event.type + " su " + event.currentTarget);
    alert("Coordinate: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Alcune proprietà dell'oggetto `event`:

`event.type`
: Tipo di evento, in questo caso è un `"click"`.

`event.currentTarget`
: L'elemento che ha gestito l'evento. Questo è equivalente a `this`, ma se il gestore è una arrow function, o se il suo `this` è legato a qualcos'altro, possiamo usare `event.currentTarget`.

<<<<<<< HEAD
`event.clientX / event.clientY`
: Coordinate del cursore relative alla Window, per eventi del puntatore.

Esistono tante altre proprietà., molte delle quali dipendono dal tipo di evento: gli eventi della tastiera hanno un gruppo di proprietà, gli eventi del puntatore un altro ancora, e li studieremo più avanti quando andremo a vedere i vari eventi nel dettaglio.
=======
`event.clientX` / `event.clientY`
: Window-relative coordinates of the cursor, for pointer events.

There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events - another one, we'll study them later when as we move on to the details of different events.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

````smart header="L'oggetto evento è disponibile anche nei gestori HTML"
Anche se assegniamo un gestore dentro l'HTML, possiamo usare l'oggetto `evento`:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

Questo è possibile perché quando il browser legge l'attributo, crea un gestore con questa forma:  `function(event) { alert(event.type) }`. Il primo argomento viene chiamato `"event"`, e il corpo è preso dall'attributo.
````


## Gestori oggetto: handleEvent

Con `addEventListener` possiamo assegnare non solo una funzione, ma anche un oggetto. Quando viene generato un evento, viene chiamato il suo metodo `handleEvent`.

Ad esempio:

```html run
<button id="elem">Cliccami</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " su " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

<<<<<<< HEAD
Come possiamo osservare, se `addEventListener` riceve un oggetto come gestore, allora chiama `obj.handleEvent(event)` nel caso ci sia un evento.
=======
As we can see, when `addEventListener` receives an object as the handler, it calls `obj.handleEvent(event)` in case of an event.

We could also use objects of a custom class, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Possiamo usare anche una classe:

```html run
<button id="elem">Cliccami</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Premuto un pulsante del mouse";
          break;
        case 'mouseup':
          elem.innerHTML += "...e rilasciato.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

L'oggetto gestisce entrambi gli eventi. Nota bene che usando `addEventListener` dobbiamo impostare esplicitamente gli eventi affinché rimangano in ascolto.


Nel nostro esempio, l'oggetto `menu` rimane in ascolto solamente per `mousedown` e `mouseup`, e nessun altro tipo di evento.
Tuttavia, il metodo `handleEvent` non deve necessariamente fare tutto il lavoro da solo. Può infatti chiamare altri metodi specifici per tipologia di evento:

```html run
<button id="elem">Cliccami</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Premuto il pulsante del mouse";
    }

    onMouseup() {
      elem.innerHTML += "...e rilasciato.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Qui i gestori sono chiaramente separati, il che può essere più comodo da gestire.

## Riepilogo

Ci sono 3 modalità per assegnare dei gestori di evento:

1. Attributo HTML: `onclick="..."`.
2. Proprietà DOM: `elem.onclick = function`.
3. Metodi: `elem.addEventListener(event, handler[, phase])` per aggiungerlo, `removeEventListener` per rimuoverlo.

Gli attributi HTML vengono usati raramente, perchè un JavaScript nel bel mezzo di un tag HTML, non solo è un po' strano, ma è anche avulso dal contesto. Inoltre in questo modo non vi si può inserire dentro tanto codice.

Le proprietà DOM si possono usare, ma non potremo assegnare più di un gestore per un particolare evento. In molti casi questa limitazione non è troppo pesante.

L'ultimo modo è il più flessibile, ma è anche il più lungo da scrivere. Alcuni eventi funzionano solo con quest'ultima modalità, ad esempio `transitionend` e `DOMContentLoaded` (affrontato più avanti). Inoltre `addEventListener` supporta gli oggetti come gestori di evento. In questo caso, però, verrà chiamato il metodo  `handleEvent` al verificarsi degli eventi.

Non importa come assegni un gestore, in ogni caso il primo argomento passato sarà un oggetto evento, contenente i dettagli su ciò che è avvenuto.

Nei prossimi capitoli, avremo modo di approfondire il tema degli eventi in generale e le loro differenti tipologie.
