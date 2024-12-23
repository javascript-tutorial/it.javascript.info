
# Event delegation

<<<<<<< HEAD
Capturing e bubbling ci permettono di implementare uno dei pattern più potenti nella gestione degli eventi, e cioè *event delegation*.
=======
Capturing and bubbling allow us to implement one of the most powerful event handling patterns called *event delegation*.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il concetto di base è che se abbiamo una serie di elementi gestiti in maniera simile, allora, invece di assegnare un gestore per ognuno di essi, possiamo metterne uno solo sui loro antenati comuni.

Nel gestore avremo a disposizione `event.target` per controllare l'elemento dal quale è partito l'evento e poterlo quindi gestire di conseguenza.

Guardiamo un esempio -- il [diagramma Ba-Gua](http://en.wikipedia.org/wiki/Ba_gua) che riflette l'antica filosofia Cinese.

Eccola qui:

[iframe height=350 src="bagua" edit link]

Questo è l'HTML:

```html
<table>
  <tr>
    <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
  </tr>
  <tr>
    <td class="nw"><strong>Northwest</strong><br>Metal<br>Silver<br>Elders</td>
    <td class="n">...</td>
    <td class="ne">...</td>
  </tr>
  <tr>...2 more lines of this kind...</tr>
  <tr>...2 more lines of this kind...</tr>
</table>
```

La tabella è composta da 9 celle, ma potrebbero anche essercene 99 o 9999, è irrilevante.

**Il nostro compito è quello di evidenziare un cella `<td>` al click.**

Invece di assegnare un gestore all'`onclick` per ogni `<td>` (potrebbero essercene tantissime) -- andiamo a impostare un gestore che sarà in grado di "catturali tutti" sull'elemento `<table>`.

Verrà utilizzato `event.target` per ottenere l'elemento cliccato ed evidenziarlo.

Ecco il codice:

```js
let selectedTd;

*!*
table.onclick = function(event) {
  let target = event.target; // dove e' stato il click?

  if (target.tagName != 'TD') return; // non era un TD? Allora non siamo interessati

  highlight(target); // evidenzialo
};
*/!*

function highlight(td) {
  if (selectedTd) { // rimuove l'evidenziazione esistente, se presente
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // evidenzia il nuovo td
}
```

Con un codice del genere non importa quante celle ci sono nella tabella. Possiamo aggiungere e rimuovere `<td>` dinamicamente in qualunque momento e l'evidenziazione continuerà a funzionare.

Ma abbiamo ancora un inconveniente.

Il click potrebbe avvenire non sul `<td>`, ma in un elemento interno.

Nel nostro cosa se osserviamo dentro l'HTML, possiamo vedere dei tags annidati dentro il `<td>`, come ad esempio `<strong>`:

```html
<td>
*!*
  <strong>Northwest</strong>
*/!*
  ...
</td>
```

Naturalmente, se cliccassimo su questo `<strong>` proprio questo sarebbe il valore assunto da `event.target`.

![](bagua-bubble.svg)

Nel gestore `table.onclick`, dovremmo perndere questo `event.target` e scoprire se il click sia avvenuto dentro il `<td>` oppure no.

Ecco il codice migliorato:

```js
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
```

Chiarimenti:
1. Il metodo `elem.closest(selector)` ritorna l'antenato più vicino che combacia con il selettore. Nel nostro caso cerchiamo un `<td>` verso l'alto dall'elemento di origine dell'evento.
2. Se `event.target` non è dentro nessun `<td>`, la chiamata esce immediatamente, dal momento che non c'è nulla da fare.
3. Ne caso di tabelle annidate, `event.target` potrebbe riferirsi ad `<td>`, ma fuori dalla tabelle corrente. Quindi andiamo a controllare se `<td>`  appartiene alla *nostra tabella*.
4. E se così, la evidenziamo.

Come risultato, averemo un codice di evidenziazione veloce ed efficiente, indipendente dal numero di `<td>` nella tabella.

## Esempio di delegation: azioni nel markup

Esistono altri utilizzi per l'event delegation.

Poniamo il caso che volessimo fare un menù con i pulsanti "Save", "Load", "Search" e cosi via, e che vi sia un oggetto con i metodi `save`, `load`, `search`... Come potremmo distinguerli?

La prima idea potrebbe essere quella di assegnare dei gestori separati per ogni pulsante. Esiste però una soluzione più elegante. Possiamo aggiungere un gestore per l'intero menù e degli attributi `data-action` per i pulsanti che devono chiamare il metodo:

```html
<button *!*data-action="save"*/!*>Clicca per salvare</button>
```

Il gestore legge l'attributo ed esegue il metodo. Diamo uno sguardo all'esempio:

```html autorun height=60 run untrusted
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('saving');
    }

    load() {
      alert('loading');
    }

    search() {
      alert('searching');
    }

    onClick(event) {
*!*
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
*/!*
    };
  }

  new Menu(menu);
</script>
```

Nota bene che `this.onClick` è collegato a `this` nel punto `(*)`.  Questo è importante, altrimenti `this` si riferirebbe all'elemento del DOM (`elem`), e non l'oggetto `Menu`, di conseguenza `this[action]` non farebbe quello di cui abbiamo bisogno.

Quindi, quali vantaggi apporta delegation qui?

```compare
+ Non abbiamo bisogno di scrivere del codice per assegnare un gestore ad ogni pulsante. Ma solo di un metodo e porlo dentro il markup.
+ La struttura HTML è flessibile, possiamo aggiungere e rimuovere pulsanti in ogni momento.
```

Possiamo anche usare classi come `.action-save`, `.action-load`, ma un attributo `data-action` è semanticamente migliore. Inoltre possiamo usarlo nelle regole CSS.

## Il pattern "comportamentale"

Possiamo anche usare la event delegation per aggiungere "comportamenti" agli elementi in modo *dichiarativo*, con speciali attributi e classi.

Il pattern consta di due parti:
1. Aggiungiamo un attributo personalizzato a un elemento, che descrive il suo comportamento.
2. Un gestore su tutto il documento tiene traccia degli eventi, e se viene attivato un evento su un elemento con quell'attributo -- esegue l'azione.

### Comportamento: contatore

Per esempio, qui l'attributo `data-counter` aggiunge un comportamento: "incrementa il valore al click" sui pulsanti:

```html run autorun height=60
Counter: <input type="button" value="1" data-counter>
Contatore di addizione: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // se esiste l'attributo...
      event.target.value++;
    }

  });
</script>
```

Se clicchiamo un pulsante -- il suo valore aumenterà. Non sono importanti i pulsanti qui, ma l'approccio in generale.

Possono esserci quanti attributi `data-counter` vogliamo. Possiamo aggiungerne di nuovi all'HTML in ogni momento. Usando la event delegation abbiamo "esteso" HTML, aggiunto un attributo che descrive un nuovo comportamento.

```warn header="Per gestori a livello di documento -- usare sempre `addEventListener`"
Quando assegniamo un gestore di eventi all'oggetto `document`, dovremmo sempre usare `addEventListener`, e non `document.on<event>`, perché il secondo causerebbe conflitti: i nuovi gestori sovrascriverebbero i precedenti.

Per progetti reali è normale che vi siano molti gestori su `document` impostati in punti differenti del codice.
```

### Comportamento: toggler

Ancora un esempio di comportamento. Un click su un elemento con l'attributo `data-toggle-id` mostrerà o nasconderà l'elemento con il dato `id`:

```html autorun run height=60
<button *!*data-toggle-id="subscribe-mail"*/!*>
  Mostra il form di sottoscrizione
</button>

<form id="subscribe-mail" hidden>
  La tua mail: <input type="email">
</form>

<script>
*!*
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
*/!*
</script>
```

Notiamo ancora una volta cosa abbiamo fatto. Adesso, per aggiungere la funzionalità di toggling su un elemento -- non è necessario conoscere JavaScript, è sufficiente usare l'attributo `data-toggle-id`.

Questo può essere davvero conveniente -- nessuna necessità di scrivere codice JavaScript per ogni nuovo elemento di questo genere. Ci basta solo applicare il comportamento. Il gestore a livello di documento fa in modo che funzioni per ogni elemento nella pagina.

Possiamo pure combinare comportamenti multipli su un singolo elemento.

Il pattern "comportamentale" può essere una alternativa a mini frammenti di JavaScript.

## Riepilogo

Event delegation è davvero fico! Uno dei pattern più utili per gli eventi del DOM.

Spesso è usato per aggiungere dei gestori per molti elementi simili, ma non solo per quello.

L'algoritmo:

1. Inserire un gestore singolo a un contenitore.
2. Nel gestore -- controlla l'elemento che ha originato l'evento con `event.target`.
3. Se l'evento è avvenuto dentro un elemento che ci interessa, allora gestire l'evento.

Benefici:

```compare
+ Semplifica l'inizializzazione e salva memoria: nessuna necessità di aggiungere molti gestori.
+ Meno codice: aggiungendo o rimuovendo elemento non c'è necessità di aggiungere e rimuovere gestori.
+ Modifiche al DOM: possiamo aggiungere e rimuovere elementi in massa con `innerHTML` e simili.
```

Delegation ha i suoi limiti ovviamente:

```compare
- Per prima cosa, l'evento deve essere di tipo bubbling. Alcuni eventi non lo sono. Inoltre, i gestori di basso livello non dovrebbero usare `event.stopPropagation()`.
- Secondo, delegation può aggiungere carico alla CPU, perché il gestore a livello di container reagisce agli eventi di qualunque posizione del container, non importa se sono degni di nota o meno. Solitamente il carico è irrisorio, e quindi non lo prendiamo in minima considerazione.
```
