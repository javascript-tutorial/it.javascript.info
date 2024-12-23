# Animazioni JavaScript

Le animazioni JavaScript consentono di gestire cose che con il CSS non è possibile gestire.

Ad esempio, definire movimenti che seguono un percorso complesso, con funzioni di temporizzazione diverse da curve di Bezier, è possibile animare anche oggetti all'interno di un canvas.

## Utilizzo di setInterval

Un animazione può essere implementata come una sequenza di frame, solitamente sfruttando delle piccole modifiche alle proprietà HTML/CSS.

Ad esempio, modificando `style.left` da `0px` a `100px` per spostare l'elemento. Se lo incrementiamo in `setInterval`, applicando incrementi di `2px` con un piccolo ritardo, ad esempio 50 volte per secondo, allora otterremo un'animazione molto fluida. Questo è lo stesso principio applicato nel cinema: 24 frame per secondo sono sufficienti per far si che le immagini appaiano fluide.

Il pseudo codice è qualcosa del genere:

```js
let timer = setInterval(function() {
  if (animation complete) clearInterval(timer);
  else increase style.left by 2px
}, 20); // cambia di 2px ogni 20ms, circa 50 frame per secondo
```

Un esempio più completo dell'animazione:

```js
let start = Date.now(); // memorizziamo il momento di partenza

let timer = setInterval(function() {
  // quanto tempo è passato dall'inizio?
  let timePassed = Date.now() - start;

  if (timePassed >= 2000) {
    clearInterval(timer); // completiamo l'animazione dopo 2 secondi
    return;
  }

  // tracciamo l'animazione all'istante timePassed
  draw(timePassed);

}, 20);

// via via che timePassed va da 0 a 2000
// left assume valori che variano tra 0px e 400px
function draw(timePassed) {
  train.style.left = timePassed / 5 + 'px';
}
```

Cliccate per visualizzare la dimostrazione:

[codetabs height=200 src="move"]

## Utilizzo di requestAnimationFrame

Immaginiamo di avere diverse animazioni in esecuzione contemporaneamente.

Se le eseguissimo separatamente, ed ognuna di esse avesse `setInterval(..., 20)`, allora il browser dovrebbe effettuare operazioni di repaint con molta più frequenza di una ogni `20ms`.

Questo perché le animazioni hanno degli istanti di inizio differenti, quindi "ogni 20ms" è differente per ogni singola animazione. Gli intervalli non sono allineati. Quindi abbiamo molte animazioni indipendenti che vengono eseguite in `20ms`.

In altre parole, questo:

```js
setInterval(function() {
  animate1();
  animate2();
  animate3();
}, 20)
```

...E' molto più leggero rispetto a 3 invocazioni differenti:

```js
setInterval(animate1, 20); // animazioni indipendenti
setInterval(animate2, 20); // in posti diversi dello script
setInterval(animate3, 20);
```

Questa serie di operazioni di repaint dovrebbero essere raggruppate, in modo tale da rendere il repaint più semplice per il browser, portare meno carico alla CPU e rendere il tutto più fluido.

C'è un ulteriore cosa a cui prestare attenzione. Talvolta la CPU potrebbe essere sovraccarica, oppure potrebbero esserci altri motivi per cui potremmo effettuare il repaint con minore frequenza (ad esempio quando la tab del browser non è visibile), quindi non è necessaria l'esecuzione ogni `20ms`.

<<<<<<< HEAD
Ma come facciamo ad avere controllo su questo utilizzando JavaScript? Abbiamo a disposizione [Animation timing](http://www.w3.org/TR/animation-timing/) definita nelle specifiche, che ci fornisce la funzione `requestAnimationFrame`. Questa ha lo scopo di aiutarci a risolvere questo tipo di problemi.
=======
But how do we know about that in JavaScript? There's a specification [Animation timing](https://www.w3.org/TR/animation-timing/) that provides the function `requestAnimationFrame`. It addresses all these issues and even more.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La sintassi:
```js
let requestId = requestAnimationFrame(callback)
```

In questo modo pianifichiamo la funzione `callback` in modo tale che venga eseguita appena il browser vorrà eseguire animazioni.

Se facciamo modifiche agli elementi nella `callback`, allora questi verranno raggruppati con le altre callbacks in `requestAnimationFrame` e con le animazioni CSS. In questo modo avremo un solo ricalcolo geometrico ed un repaint, piuttosto di averne molti.

Il valore ritornato, `requestId`, può essere utilizzato per annullare l'invocazione:
```js
// annulla l'esecuzione programmata per una specifica callback
cancelAnimationFrame(requestId);
```

<<<<<<< HEAD
La `callback` riceve un solo argomento, il tempo trascorso dall'inizio del caricamento della pagina, in microsecondi. Possiamo ottenere questa informazione anche invocando [performance.now()](mdn:api/Performance/now).
=======
The `callback` gets one argument -- the time passed from the beginning of the page load in milliseconds. This time can also be obtained by calling [performance.now()](mdn:api/Performance/now).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Solitamente `callback` viene eseguita molto presto, a meno che la CPU non sia in uno stato di sovraccarico, la batteria del portatile non sia quasi scarica, o per altri motivi.

Il codice sotto mostra il tempo trascorso tra le prime 10 esecuzioni di `requestAnimationFrame`. Solitamente è circa 10-20ms:

```html run height=40 refresh
<script>
  let prev = performance.now();
  let times = 0;

  requestAnimationFrame(function measure(time) {
    document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
    prev = time;

    if (times++ < 10) requestAnimationFrame(measure);
  })
</script>
```

## Animazione strutturata

Ora possiamo definire una funzione di animazione universale basata su `requestAnimationFrame`:

```js
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction va da  0 a 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calcola lo stato corrente dell'animazione
    let progress = timing(timeFraction)

    draw(progress); // la esegue

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
```

La funzione `animate` accetta 3 parametri che descrivono l'animazione:

`duration`
: Durata totale dell'animazione. Ad esempio, `1000`.

`timing(timeFraction)`
: Funzione di temporizzazione, proprio come la proprietà CSS `transition-timing-function` che prende come input la frazione di tempo passato (`0` all'inizio, `1` alla fine) e ritorna lo stato di completamento dell'animazione (ad esempio `y` nelle curve di Bezier).

    Ad esempio, una funzione lineare significa che l'animazione procede uniformemente con la stessa velocità:

    ```js
    function linear(timeFraction) {
      return timeFraction;
    }
    ```

<<<<<<< HEAD
    La curva corrispondente:
=======
    Its graph:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ![](linear.svg)

    Proprio come `transition-timing-function: linear`. Vengono mostrare altre varianti sotto.

`draw(progress)`
: La funzione che accetta come input lo stato di completamento dell'animazione e la esegue. Il valore `progress=0` indica lo stato iniziale dell'animazione, mentre `progress=1` lo stato finale.

    Questa è la funzione che si occupa di eseguire l'animazione.

    Può spostare l'elemento:
    ```js
    function draw(progress) {
      train.style.left = progress + 'px';
    }
    ```

    ...O fare altro, possiamo animare qualunque cosa, in qualunque modo.


Proviamo ad animare la `width` dell'elemento da `0` a `100%`, utilizzando la nostra funzione.

Cliccate sull'elemento per visualizzare la dimostrazione:

[codetabs height=60 src="width"]

Il codice corrispondente:

```js
animate({
  duration: 1000,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    elem.style.width = progress * 100 + '%';
  }
});
```

A differenza dell'animazione CSS, possiamo definire qualsiasi funzione di temporizzazione e di animazione. La funzione di temporizzazione non è limitata alle curve di Bezier. Mentre `draw` può andare oltre le proprietà, creando nuovi elementi per animare fuochi d'artificio o qualunque altra cosa.

## Funzioni di temporizzazione

Sopra abbiamo visto la più semplice delle funzioni di temporizzazione, quella lineare.

Vediamone altre. Proveremo a definre animazioni con diverse funzioni di temporizzazione in modo da capirne il funzionamento.

### Potenza di n

Se vogliamo velocizzare l'animazione, possiamo fornire come `progress` una potenza di `n`.

Ad esempio, una parabola:

```js
function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}
```

La curva corrispondente:

![](quad.svg)

Vediamola in azione (cliccate per attivare):

[iframe height=40 src="quad" link]

...Oppure una curva di grado tre o maggiore. L'incremento del grado della curva renderà l'animazione più veloce.

Qui vediamo la curva `progress` con una potenza di grado `5`:

![](quint.svg)

In azione:

[iframe height=40 src="quint" link]

### L'arco

Funzione:

```js
function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}
```

Il grafico:

![](circ.svg)

[iframe height=40 src="circ" link]

### Indietro: tiro con l'arco

Questa funzione simula il "tiro con l'arco". Prima "tendiamo l'arco" e poi "spariamo".

A differenza delle funzioni precedenti, abbiamo una dipendenza sul parametro addizionale `x`, il "coefficiente di elasticità". Ovvero la distanza di "tensione dell'arco", definita appunto dal parametro.

Il codice:

```js
function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}
```

**La curva relativa a `x = 1.5`:**

![](back.svg)

Per eseguire l'animazione utilizzeremo un valore specifico per `x`. Ad esempio `x = 1.5`:

[iframe height=40 src="back" link]

### Rimbalzo

Immaginiamo di star facendo cadere una palla. Prima cade a terra, poi rimbalza un paio di volte e infine si ferma.

La funzione `bounce` simula questo comportamento, ma nell'ordine inverso: il "rimbalzo" inizia immediatamente. Utilizza un paio di coefficienti per farlo:

```js
function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}
```

In azione:

[iframe height=40 src="bounce" link]

### Animazione elastica

Un ulteriore funzione "elastica" che accetta un parametro addizionale `x` come "intervallo iniziale".

```js
function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}
```

**The graph for `x=1.5`:**
![](elastic.svg)

In azione con `x=1.5`:

[iframe height=40 src="elastic" link]

## Inversione: ease*

Abbiamo visto una serie di funzioni di temporizzazione. La loro diretta applicazione viene chiamata "easeIn".

Talvolta abbiamo però bisogno di mostrare l'animazione nell'ordine inverso. Possiamo farlo con la trasformazione "easeOut".

### easeOut

Nella modalità "easeOut" la funzione di `timing` (funzione di temporizzazione) viene posta in un contenitore `timingEaseOut`:

```js
timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction)
```

In altre parole, abbiamo una funzione di "trasformazione" `makeEaseOut`, la quale riceve come input una funzione di temporizzazione "normale" e ne ritorna una versione racchiusa in un contenitore:

```js
// accetta in input una funzione di temporizzazione, e ne ritorna una variante trasformata
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
```

Ad esempio, possiamo prendere la funzione `bounce`, descritta poco sopra, ed applicarci `makeEaseOut`:

```js
let bounceEaseOut = makeEaseOut(bounce);
```

In questo modo il "rimbalzo" non avverrà all'inizio dell'animazione, ma alla fine. Sarà più carina:

[codetabs src="bounce-easeout"]

Qui possiamo vedere come la funzione di "trasformazione" ne cambia il comportamento:

![](bounce-inout.svg)

Se abbiamo un animazione all'inizio, come il rimbalzo, questa verrà mostrata alla fine.

Nel grafico sopra il <span style="color:#EE6B47">rimbalzo normale</span> è identificato dal colore rosso, mentre il <span style="color:#62C0DC">rimbalzo easeOut</span> è di colore blue.

- Rimbalzo normale: l'oggetto rimbalza verso basso, poi alla fine rimbalza nettamente verso l'alto.
- Rimbalzo `easeOut`: rimbalza verso l'alto, fino a fermarsi.

### easeInOut

Possiamo anche decidere di mostrare l'effetto sia all'inizio che al termine dell'animazione. La trasformazione viene chiamata "easeInOut".

Data la funzione di temporizzazione, calcoliamo lo stato dell'animazione in questo modo:

```js
if (timeFraction <= 0.5) { // prima 
  return timing(2 * timeFraction) / 2;
} else { // seconda metà dell'animazione
  return (2 - timing(2 * (1 - timeFraction))) / 2;
}
```

Il codice che esegue la trasformazione:

```js
function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

bounceEaseInOut = makeEaseInOut(bounce);
```

In azione, `bounceEaseInOut`:

[codetabs src="bounce-easeinout"]

La trasformazione "easeInOut" unisce due grafici in uno: `easeIn` (normale) per la prima metà dell'animazione, `easeOut` (inverso) epr la seconda metà.

L'effetto è chiaramente visibile se compariamo i grafici di `easeIn`, `easeOut` e `easeInOut` della funzione di temporizzazione di `circ`:

![](circ-ease.svg)

- <span style="color:#EE6B47">Rosso</span> è la variante normale di `circ` (`easeIn`).
- <span style="color:#8DB173">Verde</span>, `easeOut`.
- <span style="color:#62C0DC">Blu</span>, `easeInOut`.

Come possiamo vedere, il grafico della prima metà di animazione è una versione ridimensionata di `easeIn`, mentre la seconda metà è una versione ridimensionata di `easeOut`. Il risultato è che l'animazione inizia e termina con la stessa animazione.

## "Effetti" più interessanti

Piuttosto di limitarci a muovere un elemento, possiamo fare altro. Tutto ciò che dobbiamo fare è scrivere una funzione di `draw`.

Qui vediamo l'animazione di scrittura con "rimbalzo":

[codetabs src="text"]

## Riepilogo

Per le animazione che il CSS non è in grado di gestire molto bene, o per quelle in cui è richiesto un controllo preciso, JavaScript può aiutare. Le animazioni JavaScript dovrebbero essere implementate via `requestAnimationFrame`. Questo metodo integrato ci consente di impostare le funzione di callback in modo tale che vengano eseguite nel momento in cui il browser effettua il repaint. Solitamente questo intervallo di tempo è breve, ma dipende molto dal browser.

Quando la pagina è in background, non si ha alcun repaint, quindi le callback non verranno invocate: le animazioni vengono sospese, e non avremo alcuno spreco di risorse. Questo è grandioso.

Qui vediamo la funzione `animate` che può aiutare nell'impostare la maggior parte delle animazioni:

```js
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction va da 0 a 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calcola lo stato attuale dell'animazione
    let progress = timing(timeFraction);

    draw(progress); // la esegue

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
```

Opzioni:

- `duration`: la durata totale dell'animazione in ms.
- `timing`: la funzione per calcolare lo stato dell'animazione. Accetta in input una frazione di tempo che va da 0 a 1, e ritorna il progresso dell'animazione, solitamente da 0 a 1.
- `draw`: la funzione per disegnare l'animazione.

Ovviamente potremmo migliorarla aggiungendo più opzioni, ma le animazioni JavaScript non vengono utilizzate quotidianamente. Vengono piuttosto utilizzate per costruire qualcosa di più interessante e non standard. Quindi potrete aggiungere più funzionalità nel momento in cui ne avrete bisogno.

Le animazioni JavaScript possono utilizzare qualsiasi funzione di temporizzazione. Abbiamo visto molti esempi e trasformazioni che le rendono molto versatili. A differenza del CSS, non siamo limitati alle sole curve di Bezier.

<<<<<<< HEAD
Lo stesso vale per `draw`: possiamo animare qualsiasi cosa, non solamente le proprietà CSS.
=======
The same is true about `draw`: we can animate anything, not just CSS properties.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
