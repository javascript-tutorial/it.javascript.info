importance: 5

---

# "Smart" tooltip

Scrivere una funzione che mostri un tooltip su un elemento solo se l'utente sposta il mouse *su di esso*, e non *attraverso di esso*.

In altre parole, se il visitatore sposta il mouse su questo elemento e si ferma lì -- mostra il tooltip. Se invece ha solo spostato il mouse passandoci sopra, non ce n'è bisogno, d'altronde chi mai vorrebbe altri elementi lampeggianti non desiderati?

Tecnicamente, possiamo misurare la velocità del mouse su un elemento, e se è abbastanza lento possiamo supporre che sta arrivando proprio "sull'elemento", mostrando il tooltip, se è troppo veloce -- lo ignoriamo.

Creare un oggetto universale `new HoverIntent(options)` utile allo scopo.

Le opzioni possibili `options`:
- `elem` -- elemento da tracciare.
- `over` -- una funzione da chiamare se il mouse arriva sull'elemento: ossia, se si muove lentamente o se si ferma sull'elemento.
- `out` -- una funzione da chiamare quando il mouse abbandona l'elemento (se è stato chiamato `over`).

Ecco un esempio dell'uso di questo oggetto per il tooltip:

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

Muovendo il mouse oltre la velocità di "clock" non succede nulla, facendolo lentamente o fermandocisi sopra, viene mostrato il tooltip.

Nota bene: il tooltip non "lampeggia" quando il cursore si muove tra i sottoelementi dell'orologio.
