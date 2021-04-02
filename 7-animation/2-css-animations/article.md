# Animazioni CSS

Le animazioni CSS ci consentono di realizzare semplici animazioni senza l'utilizzo di JavaScript.

JavaScript può eventualmente essere utilizzato per controllare le animazioni CSS e migliorare, aggiungendo qualche riga di codice.

## Transizioni CSS [#css-transition]

L'idea che sta alla base delle transizioni CSS è molto semplice. Ci consente di definire come animare i cambiamenti su una determinata proprietà. Quando il valore dei questa proprietà cambierà, il browser mostrerà l'animazione.

Questo è tutto, l'unica cosa di cui abbiamo bisogno ora è di cambiare il valore della proprietà, e la transizione definita verrà eseguita dal browser.

Ad esempio, il codice CSS qui sotto definisce un'animazione al cambiamento della proprietà `background-color` con durata 3 secondi:

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

Quindi ora, se un elemento possiede la class `.animated`, qualsiasi cambiamento al suo `background-color` verrà animato con una durata di 3 secondi.

Provate a clicchare il bottone qui sotto per vedere l'animazione sul background:

```html run autorun height=60
<button id="color">Click me</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

Abbiamo a disposizione 4 proprietà per descrivere le transizioni CSS:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

Le studieremo in dettaglio a breve, per ora notiamo che la proprietà comune `transition` ci consente di dichiararle tutte insieme nell'ordine: `property duration timing-function delay`, e ci consente anche di definire più proprietà da animare.

Ad esempio, nel bottone qui sotto abbiamo definito un'animazione sia su `color` che su `font-size`:

```html run height=80 autorun no-beautify
<button id="growing">Click me</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

Ora, vediamo le proprietà dell'animazione nel dettaglio.

## transition-property

In `transition-property`, elenchiamo una lista di proprietà da animare, ad esempio: `left`, `margin-left`, `height`, `color`. Oppure possiamo scrivere `all`, che significa "anima tutte le proprietà".

Notiamo che ci sono proprietà che non possono essere animate. Anche se [la maggior parte delle proprietà utilizzate sono animabili](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

## transition-duration

In `transition-duration` possiamo definire la durata dell'animazione. Il tempo deve essere nel [formato temporale CSS](http://www.w3.org/TR/css3-values/#time): in secondi `s` o millisecondi `ms`.

## transition-delay

In `transition-delay` possiamo specificare un *ritardo* dell'animazione. Ad esempio, se `transition-delay` è impostato ad `1s` e `transition-duration` vale `2s`, allora l'animazione inizierà con 1 secondo di ritardo rispetto al cambiamento del valore della proprietà a cui fa riferimento, e avrà una durata totale di 2 secondi.

E' possibile definire anche valori negativi. In questo caso l'animazione inizierà immediatamente, ma l'inizio dell'animazione avverrà dopo il tempo fornito. Ad esempio, se `transition-delay` è impostato a `-1s` e `transition-duration` vale `2s`, l'animazione inizierà a metà del tempo fornito ed avrà una durata totale di 1 secondo. 

Qui vediamo un animazione che scorre le cifre da `0` a `9` utilizzando la proprietà CSS `translate`:

[codetabs src="digits"]

La proprietà `transform` viene animata in questo modo:

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

Nell'esempio visto sopra, JavaScript aggiunge la classe `.animate` all'elemento, iniziando cosi l'animazione:

```js
stripe.classList.add('animate');
```

Possiamo anche iniziarla a metà della transizione, da un numero specifico, ad esempio corrispondente al secondo attuale, utilizzano un valore negativo per la proprietà `transition-delay`.

Nell'esempio sotto, se cliccate il numero, l'animazione inizierà dal secondo attuale:

[codetabs src="digits-negative-delay"]

Con JavaScript possiamo fare la stessa cosa, ma con qualche riga di codice in più:

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // ad esempio, -3s in questo caso, farà iniziare l'animazione al terzo secondo
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

La funzione di temporizzazione permette di descrivere la distribuzione dell'animazione lungo la sua durata. Potrà iniziare più lenta e poi accelerare, o vice versa.

A prima vista sembra essere una delle proprietà più complesse. Ma diventa piuttosto semplice se ci dedichiamo un po' di tempo per capirla.

Questa proprietà accetta due tipi di valore: una curva di Bezier oppure degli step. Iniziamo a vedere il caso in cui si utilizza la curva di Bezier, poiché è il più comune.

### Bezier curve

La funziona di temporizzazione può essere definita utilizzando una [curva di Bezier](/bezier-curve) con 4 punti di controllo che soddisfino le seguenti condizioni:

1. Il primo punto di controllo deve essere: `(0,0)`.
2. L'ultimo punto di controllo deve essere: `(1,1)`.
3. Per i valori intermedi, il valore di `x` deve essere compreso nell'intervallo `0..1`, mentre `y` può assumere qualsiasi valore.

La sintassi per descrivere una curva di Bezier nel CSS: `cubic-bezier(x2, y2, x3, y3)`. In questo caso è necessario specificare solamente il terzo ed il quarto punto di controllo, poiché il primo viene impostasto a `(0,0)` ed il quarto a `(1,1)`.

La funzione di temporizzazione descrive la velocità di riproduzione dell'animazione.

- L'asse delle `x` rappresenta il tempo: `0` -- l'inizio, `1` il termine dell'animazione, specificato in `transition-duration`.
- L'asse delle `y` specifica il completamente del processo: `0` il valore iniziale della proprietà, `1` il valore finale.

La variante più semplice è quando un'animazione procede uniformemente, con velocita lineare. Questo tipo di animazione può essere definito con la curva `cubic-bezier(0, 0, 1, 1)`.

Cosi è come appare la curva descritta:

![](bezier-linear.svg)

...Come possiamo vedere, è una semplice linea retta. Al passare del tempo (`x`), la completezza (`y`) dell'animazione passa da `0` a `1`.

Il treno nell'esempio sotto va da sinistra verso desta con velocità costante (provate a cliccarci sopra):

[codetabs src="train-linear"]

La `transition` CSS è basata su questa curva:

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* JavaScript imposta left a 450px */
}
```

...Come potremmo mostrare il treno che rallenta?

Possiamo utilizzare una curva di Bezier differente: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

La curva appare cosi:

![](train-curve.svg)

Come possiamo vedere, il processo inizia velocemente: la curva cresce verso l'alto, e successivamente rallenta.

Qui vediamo la funzione di temporizzazione in azione (cliccate il treno):

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* JavaScript imposta left a 450px */
}
```

Abbiamo a disposizione anche alcune curve integrate: `linear`, `ease`, `ease-in`, `ease-out` e `ease-in-out`.

La curva `linear` è un abbreviazione per `cubic-bezier(0, 0, 1, 1)`, una linea retta, che abbiamo descritto sopra.

Gli altri nomi sono delle abbreviazioni per le seguenti curve `cubic-bezier`:

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.svg) | ![ease-in, figure](ease-in.svg) | ![ease-out, figure](ease-out.svg) | ![ease-in-out, figure](ease-in-out.svg) |

`*` -- di default, se non viene fornita nessuna funzione di temporizzazione, verrà utilizzata `ease`.

Potremmo quindi utilizzare `ease-out` per rallentare l'animazione del treno:


```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Anche se apparirà leggermente diversa.

**Una curva di Bezier può far eccedere l'animazione dal suo intervallo.**

I punti di controllo nella curva, sono liberi di definire un valore qualsiasi per le coordindate `y`: sia valori grandi che negativi. Questo si rifletterà sulla curva di Bezier che potrà essere molto alta o molto bassa, facendo eccedere l'animazione dal suo intervallo normale. 

Nell'esempio sotto il codice dell'animazione è:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* JavaScript imposta left a 400px */
}
```

La proprietà `left` sarà animata da `100px` a `400px`.

Ma se provate a cliccare il treno, vedrete che:

- Primo, il treno va *indietro*: `left` diventa inferiore a `100px`.
- Poi va in avanti, leggermente oltre i `400px`.
- E successivamente torna nuovamente indietro, fino a `400px`.

[codetabs src="train-over"]

Ciò che accadde è abbastanza ovvio, se andiamo a guardare il grafico della curva di Bezier:

![](bezier-train-over.svg)

Abbiamo impostato la coordinata `y` del secondo punto, sotto lo zero, ed il terzo punto va oltre `1`, quindi la curva esce dal quadrante "standard". La `y` eccede quindi l'intervallo "standard" `0..1`.

Come sappiamo, `y` misura il "grado di completezza dell'animazione". Il valore `y = 0` corrisponde al valore iniziale della proprietà, mentre `y = 1` corrisponde al valore finale. Quindi i valori di `y<0` spostando la proprietà sotto il valore iniziale di `left` e `y>1` oltre il valore finale di `left`.

Questa ovviamente è una variante più "leggera". Se impostiamo `y` a valori come `-99` e `99` allora il treno eccederebbe l'intervallo più evidentemente.

Ma come possiamo definire una curva di Bezier per una specifica animazione? Esistono diversi strumenti che ci permettono di farlo. Ad esempio, possiamo utilizzare <http://cubic-bezier.com/>.

### Steps

La funzione di temporizzazione `steps(number of steps[, start/end])` consente di definire un'animazione in steps ("passi").

Vediamolo in azione su un esempio con cifre.

Qui abbiamo un'elenco di cifre, senza alcuna animazione:

[codetabs src="step-list"]

Ciò che faremo sarà far apparire le cifre in modo discreto facendo si che la lista esterna al box rosso sia invisibile, e faremo scorrere la lista a sinistra ad ogni step.

Dovremo definire 9 step, uno per ogni cifra:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

In azione:

[codetabs src="step"]

Il primo argomento di `steps(9, start)` è il numero di step. La `transform` verrà divisa in 9 parti (10% ad ognuna). Anche l'intervallo di tempo sarà diviso automaticamente in 9 parti, quindi `transition: 9s` farà durare l'animazione 9 secondi, 1 secondo per ogni cifra.

Il secondo argomento è una delle due parole chiave: `start` o `end`.

La parola chiave `start` significa che il primo step verrà eseguito immediatamente all'inizio dell'animazione.

Possiamo osservarlo durante l'animazione: quando clicchiamo su una cifra cambia ad `1` (il primo step) immediatamente, e successivamente cambierà al termine del secondo successivo.

Il processo progredirà in questo modo:

- `0s` -- `-10%` (il primo cambiamento all'inizio del primo secondo, immediatamente)
- `1s` -- `-20%`
- ...
- `8s` -- `-80%`
- (l'ultimo secondo mostra il valore finale).

In alternativa il valore `end` starà a significare che il cambiamento dovrebbe essere applicato non dall'inizio, ma alla fine di ogni secondo.

Il processo progredirà in questo modo:

- `0s` -- `0`
- `1s` -- `-10%` (il primo cambiamento alla fine del primo secondo)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

Qui vediamo `steps(9, end)` in azione (da notare la pausa tra il cambiamento della prima cifra):

[codetabs src="step-end"]

Anche in questo caso esistono delle abbreviazioni:

- `step-start` equivale a `steps(1, start)`. Ovvero, l'animazione inizierà immediatamente e compierà il primo step. Quindi inizierà e terminerà immediatamente, come se non ci fosse alcuna animazione.
- `step-end` equivale a `steps(1, end)`: compie l'animazione in un solo step al termine di `transition-duration`.

Questi valori vengono utilizzati raramente. Poiché non definiscono delle vere animazioni, ma piuttosto un cambiamento di un solo step.

## L'evento transitionend

Al termine dell'animazione CSS, verrà innescato l'evento `transitionend`.

Viene spesso utilizzato per compiere un'azione al termine dell'animazione. In questo modo possiamo unire le animazioni.

Ad esempio, la nave che vediamo nell'esempio sotto inizia a navigare quando cliccata, e poi torna indietro, ogni volta si allontana sempre di più verso destra:

[iframe src="boat" height=300 edit link]

L'animazione viene avviata dalla funzione `go` che viene rieseguita al termine di ogni transizione, invertendo la direzione:

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // naviga verso destra
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // naviga verso sinistra
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

L'oggetto emesso dall'evento `transitionend` possiede un paio di proprietà specifiche:

`event.propertyName`
: La proprietà che ah concluso l'animazione. Può essere utile seh abbiamo definito animazioni per più proprietà.

`event.elapsedTime`
: Il tempo (in secondi) impiegato per concludere l'animazione, senza considerare `transition-delay`.

## Keyframes

Possiamo unire tra di loro più animazioni utilizzando la regola CSS `@keyframes`.

Specifica il "nome" dell'animazione e della regola: cosa, quando e dove eseguire l'animazione. Successivamente, utilizzando la proprietà `animation`, possiamo attaccare l'animazione all'elemento ed eventualmente specificare parametri addizionali.

Qui vediamo un'esempio commentato:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* gli diamo un nome: "go-left-right" */
    from { left: 0px; }             /* amima da sinistra: 0px */
    to { left: calc(100% - 50px); } /* anima verso sinistra: 100%-50px */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* applichiamo l'animazione "go-left-right" all'elemento
       durata 3 secondi
       ripetizioni: infinite
       alterna le direzione ad ogni iterazione
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

Potete trovare molti articoli sul tema `@keyframes` e [la specifica dettagliata](https://drafts.csswg.org/css-animations/).

Probabilmente non avrete bisogno di utilizzare `@keyframes` spesso, a meno che tutto nel vostro sito sia in costante movimento.

## Riepilogo

Le animazioni CSS consentono di definire delle animazioni su una o più proprietà CSS.

Sono utili nella maggior parte dei casi in cui dobbiamo definire delle animazioni. Possiamo anche utilizzare JavaScript per definire le animazioni, ed il prossimo capitolo sarà infatti dedicato a questo.

Le limitazioni delle animazioni CSS rispetto a quelle definite utilizzando JavaScript:

```compare plus="Animazioni CSS" minus="Animazioni JavaScript"
+ Le cose semplici sono facili da realizzare.
+ Più veloci e leggere per la CPU.
- Le animazioni JavaScript sono più flessibili. Possono implementare qualsiasi logica, come un "esplosione" di un elemento.
- Non si limitano a cambiamenti di proprietà. Con JavaScript possiamo anche creare nuovi elementi da aggiungere all'animazione.
```

La maggior parte delle animazioni possono essere implementate con CSS come descritto in questo articolo. Insieme all'evento `transitionend` possiamo eseguire codice al termine dell'animazione, integrandoci perfettamente con l'animazione.

Nel prossimo articolo vedremo le animazioni con JavaScript, andando a coprire casi più complessi.
