# Muovere il mouse: mouseover/out, mouseenter/leave

Entriamo nel dettaglio degli eventi che avvengono quando il mouse si sposta tra gli elementi.

## Eventi mouseover/mouseout, relatedTarget

L'evento `mouseover` avviene quando il puntatore del mouse passa su un elemento, e `mouseout` -- quando passa oltre.

![](mouseover-mouseout.svg)

Sono eventi particolari, perché posseggono la proprietà `relatedTarget`. Questà proprietà è complementare di `target`. Quando il mouse passa da un elemento a un altro, uno di questo diventa il `target`, e l'altro - `relatedTarget`.

Per `mouseover`:

- `event.target` -- é l'elemento appena raggiunto dal mouse.
- `event.relatedTarget` -- è l'elemento dal quale si è spostato il mouse (`relatedTarget` -> `target`).

Per `mouseout` è il contrario:

- `event.target` -- è l'elemento appena lasciato dal mouse.
- `event.relatedTarget` -- è il nuovo elemento sotto il puntatore (`target` -> `relatedTarget`).

```online
Nel seguente esempio ogni faccia e le proprie caratteristiche sono elementi separati. Quando viene spostato il mouse, si vedono gli eventi del mouse nell'area di testo.

Ogni evento contiene entrambe le informazioni su `target` e `relatedTarget`:

[codetabs src="mouseoverout" height=280]
```

```warn header="`relatedTarget` può essere `null`"
La proprietà `relatedTarget` può essere `null`.

È normale e significa solo che il mouse non arriva da un altro elemento della UI, ma esternamente rispetto alla finestra. Oppure può significare che l'ha appena lasciata (per l'evento `mouseover`). 

Dobbiamo tenere a mente questa eventualità nell'utilizzo di `event.relatedTarget` nel nostro codcie. Se accedessimo a `event.relatedTarget.tagName`, andremo incontro ad un errore.
```

## Saltare elementi

L'evento `mousemove` viene scaturito col movimento del mouse. Ma ciò non significa che ogni pixel porta ad un evento.

Il browser controlla la posizione del mouse di tanto in tanto. E se nota qualche cambiamento, allora genera gli eventi.

Questo significa che se l'utente muovesse il mouse molto velocemente, potrebbero essere "saltati" alcuni elementi del DOM:

![](mouseover-mouseout-over-elems.svg)

Se il mouse si muove molto velocemente dagli elementi `#FROM` a `#TO` illustrati qui sopra, allora gli elementi `<div>` intermedi (o alcuni di essi) potrebbero essere ignorati. L'evento `mouseout` potrebbe essere generato su `#FROM` ed il successivo `mouseover` immediatamente su `#TO`.

Ciò è ottimo per le prestazioni, dal momento che potrebbero esserci tanti elementi intermedi. Non vogliamo veramente elaborare l'entrata e uscita di ognuno di essi.

D'altra parte , dovremmo anche tenere a mente che il puntatore del mouse non "visita" tutti gli elementi lungo il suo cammino. Può "saltare".

In particolare, è possibile che il puntatore salti dritto al centro della pagina venendo da fuori dalla finestra. In questo caso `relatedTarget` sarebbe `null`, non arrivando da "nessuna parte":

![](mouseover-mouseout-from-outside.svg)

```online
Potete testare dal "vivo" nel seguente banco di prova.

Il suo HTML ha due elementi nidificati: `<div id="child">` è dentro `<div id="parent">`. Muovendo il mouse velocemente su di loro, potrebbe accedere che l'evento venga generato solo dal div figlio, o magari solo il genitore, oppure ancora, nessun evento del tutto.

Inoltre si può muovere il puntatore dentro il `div` figlio, per poi muoverlo velocemente attraverso il genitore. Se il movimento è abbastanza veloce, allora l'elemento genitore viene ignorato. Il mouse attraverserà l'elemento genitore senza notarlo.

[codetabs height=360 src="mouseoverout-fast"]
```

```smart header="Se viene generato `mouseover`, allora deve esserci `mouseout`"
Per movimenti veloci, gli elementi intermedi potrebbero essere ignorati, ma una cosa è certa: se il puntatore è entrato "ufficialmente" dentro un elemento (se è stato generato l'evento `mouseover`), allora dopo averlo lasciato otterremo sempre un `mouseout`.
```

## Mouseout when leaving for a child

Un'importante caratteristica di `mouseout` è che -- viene generato, quando il puntatore si muove da un elemento verso un suo discendente, ad esempio da `#parent` verso `#child` nel seguente HTML:

```html
<div id="parent">
  <div id="child">...</div>
</div>
```

Se siamo su `#parent` e spostiamo il mouse del tutto dentro `#child`, otteniamo un `mouseout` on `#parent`!

![](mouseover-to-child.svg)

Può sembrare starno, a può essere facilmente spiegato.

**Coerentemente con la logica del browser, il puntatore del mouse può essere sopra solamente su un *solo* elemnto per volta -- il più annidato e con il valore di z-index più alto.**

Quindi se va su un altro elemento (anche un discendente), allora lascia il precedente.

Fare attenzione ad un importante dettaglio dell'elaborazione dell'evento.

L'evento `mouseover` su un elemento discendente "sale verso l'alto (bubbling). Quindi, se `#parent` ha un gestore `mouseover`, viene attivato:

![](mouseover-bubble-nested.svg)

```online
Potete notare il fenomeno molto bene nel seguente esempio: `<div id="child">` è dentro `<div id="parent">`. Ci sono dei gestori `mouseover/out` sull'elemento `#parent` che generano dettagli sugli eventi.

Spostando il mouse da `#parent` a `#child`, è possibile notare due eventi su `#parent`:
1. `mouseout [target: parent]` (ha laciato il genitore), e poi
2. `mouseover [target: child]` (è arrivato nel figlio, con bubbling).

[codetabs height=360 src="mouseoverout-child"]
```

Come mostrato, quando il puntatore si muove dall'elemento `#parent` al `#child`, vengono attivati due gestori sull'elemento genitore: `mouseout` e `mouseover`:

```js
parent.onmouseout = function(event) {
  /* event.target: elemento genitore */
};
parent.onmouseover = function(event) {
  /* event.target: elemenot figlio (bubbled) */
};
```

**Se non analizzassimo `event.target` dentro i gestori, potrebbe sembrare che il puntatore abbandoni l'elemento genitore per poi rientrarci immediatamente.**

Ma non è questo il caso. Il puntatore è ancora sul genitore, si è solo mosso internamente dentro l'elemento figlio.

Se ci sono alcune azioni che coinvolgono l'abbandono dell'elemento gentore,  ad esempio un'animazone che viene eseguita con `parent.onmouseout`, solitamente non la vogliamo quando il puntatore va in profondità nel `#parent`.

Per evitare questo, possiamo controllare `relatedTarget` nel gestore e, se il mouse è ancora dentro l'elemento, ignorare l'evento.

In alternativa, possiamo usare altri eventi: `mouseenter` e `mouseleave`, che affronteremo proprio adesso, dal momento che non hanno questi problemi.

## Eventi mouseenter e mouseleave

Gli events `mouseenter/mouseleave` sono come `mouseover/mouseout`. Vengono scaturiti quando il puntatore del mouse entra/lascia l'elemento.

Ma con due importanti differenze:

1. Le transizioni dentro l'elemento, da/verso i discendenti, non vengono considerate.
2. Gli eventi `mouseenter/mouseleave` non rislagono in bubbling.

Sono eventi estremamente semplici.

Quando il puntatore entra su un elemento -- viene generato `mouseenter`. La posizione esatta del puntatore dentro l'elemento o dei suoi discendenti non è rilevante.

Quando il puntatore lascia un elemento -- viene generato `mouseleave`.

```online
L'esempio seguente è simile al precedente, solo che adesso l'elemento superiore è associato a  `mouseenter/mouseleave` piuttosto che `mouseover/mouseout`.

Come puoi vedere, gli unici venti generati sono quelli relativi al movimento del puntatore del mouse dentro e fuori dall'elemento superiore. Quando il puntatore va dentro l'elemento figlio, non succese nulla. Le transizioni tra i figli vengono ignorate

[codetabs height=340 src="mouseleave"]
```

## Event delegation

Gli eventi `mouseenter/leave` sono davvero semplici e facili da usare. Ma non sono soggetti a bubbling. Quindi, con questi non potremmo mai usare la event delegation.

Immaginiamo di voler gestire il movimento del mouse, in entrata e uscita dalle celle di una tabella. E immaginiamo anche che questa tabella abbia centinaia di celle.

La soluzione più naturale sarebbe quella di -- impostare un gestore su `<table>` per elaborare lì gli eventi. Però `mouseenter/leave` non fanno bubbling. Quindi se questi eventi avvengono su `<td>`, allora solo un gestore su `<td>` potrà catturarlo.

I gestori per `mouseenter/leave` sulla `<table>` verrebbero generati solo il puntatore entra/esce da tutta la tabella. Sarebbe impossibili ottenre informazioni sulle transizioni dentro di essa.

Quindi, dovremmo usare `mouseover/mouseout`.

Cominciamo con dei semplici gestori che evidenziano gli elementi sotto il mouse:

```js
// evindenziamo un elemento sotto il puntatore
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
```

```online
Eccoli qui in azione. Quando il mouse viaggia attraveros gli elementi di questa tabella, quello corrente viene evidenziato:

[codetabs height=480 src="mouseenter-mouseleave-delegation"]
```

Nel nostro caso vogliamo gestire i passaggi tra le celle della tabella `<td>`: entrando in una cella e lasciando l'altra. Gli altri passaggi, come quelli all'interno o fuori da ogni altra celle, non ci interessano. Li filtriamo.

Ecco cosa possiamo fare:

- Memorizzare che l'attuale `<td>` evidenziata in una variabiel, che chiameremo `currentElem`.
- Al `mouseover` -- ignorarlo l'evento se siamo ancora dentro l'elemento `<td>` corrente.
- Al `mouseout` -- ignorarlo se non abbiamo lasciato il `<td>` corrente.

Ecco un esempio di codice che tiene conto di tutte le situazioni possibili:

[js src="mouseenter-mouseleave-delegation-2/script.js"]

Ancora una volta, le caratteristiche importanti sono:
1. Usa la event delegation per gestire l'entrata/uscita dai `<td>` dentro la tabella. Quindi si relaziona con `mouseover/out` piuttosto che `mouseenter/leave` i quali non fanno bubbling e di conseguenza non permetterebbero la delegation.
2. Extra events, such as moving between descendants of `<td>` are filtered out, so that `onEnter/Leave` runs only if the pointer leaves or enters `<td>` as a whole.

```online
Here's the full example with all details:

[codetabs height=460 src="mouseenter-mouseleave-delegation-2"]

Try to move the cursor in and out of table cells and inside them. Fast or slow -- doesn't matter. Only `<td>` as a whole is highlighted, unlike the example before.
```

## Summary

We covered events `mouseover`, `mouseout`, `mousemove`, `mouseenter` and `mouseleave`.

These things are good to note:

- A fast mouse move may skip intermediate elements.
- Events `mouseover/out` and `mouseenter/leave` have an additional property: `relatedTarget`. That's the element that we are coming from/to, complementary to `target`.

Events `mouseover/out` trigger even when we go from the parent element to a child element. The browser assumes that the mouse can be only over one element at one time -- the deepest one.

Events `mouseenter/leave` are different in that aspect: they only trigger when the mouse comes in and out the element as a whole. Also they do not bubble.
