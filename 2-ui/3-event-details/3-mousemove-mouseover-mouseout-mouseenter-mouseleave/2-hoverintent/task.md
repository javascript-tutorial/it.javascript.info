importance: 5

---

# "Smart" tooltip

Scrivere una funzione che mostra un tooltip su un elemento solo se l'utente sposta il mouse *su di esso*, e non *attraverso di esso*.

In altre parole, se il visitatore sposta il mouse su questo elemento e si ferma lì -- mostra il tooltip. E se invece ha solo spostato il mouse passandoci sopra, non ce n'è bisogno, chi vuole elementi lampeggianti non desiderati?

Tecnicamente, possiamo misurare la velocità del mouse su un elemento, e se è lento possiamo assumere che sta arrivando "sull'elemento" e mostrare il tooltip, se è veloce -- allora lo ignoriamo.

Creare un oggetto universale `new HoverIntent(options)` allo scopo.

Le sue opzioni `options`:
- `elem` -- elemento da tracciare.
- `over` -- una funzione da chiamare se il mouse arriva sull'elemento: ossia, se si muove lentamente o si ferma sull'elemento.
- `out` -- una funzione da chiamare quando il mouse abbandona l'elemento (se è stato chiamato `over`).

Un esempio dell'uso di questo oggetto per il tooltip:

```js
// un tooltip di esempio
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// l'oggetto tiene traccia del mouse e chiama over/out
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

La demo:

[iframe src="solution" height=140]

Muovendo il mouse oltre la velocità di "clock" non succede nulla, e facendolo lentamente o fermandosi lì, verrà mostrato un tooltip.

Nota bene: il tooltip non "lampeggia" quando il cursore si muove tra i sottoelementi dell'orologio.
