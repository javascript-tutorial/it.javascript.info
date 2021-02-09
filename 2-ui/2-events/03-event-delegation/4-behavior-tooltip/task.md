importance: 5

---

# Comportamento tooltip

Creare uno script JS per un tooltip.

Quando il mouse passa sopra un elemento HTML con `data-tooltip`, dovrebbe comparire su di esso un tooltip, e scomparire dopo che ha abbandonato la usa area.

Un esempio di HTML con tooltip:
```html
<button data-tooltip="the tooltip is longer than the element">Short button</button>
<button data-tooltip="HTML<br>tooltip">One more button</button>
```

Should work like this:

[iframe src="solution" height=200 border=1]

In questo compito assumiamo che tutti gli elementi con il `data-tooltip` contengano solamente testo. Nessun tag annidato.

Dettagli:

- La distanza tra l'elemento e la sua tooltip dovrebbe essere di `5px`.
- Il tooltip, possibilmente, dovrebbe essere centrato rispetto all'elemento.
- Il tooltip non dovrebbe oltrepassare i bordi della finestra. Normalmente dovrebbe stare sopra l'elemento, ma se quest'ultimo dovesse essere nella parte superiore della finestra, allora dovrebbe stare sotto.
- Il contenuto del tooltip è dato dall'attributo `data-tooltip`. Può essere un qualunque HTML.

Sono necessari due eventi:
- `mouseover` viene innescato quando il puntatore passa sopra l'elemento.
- `mouseout` innescato quando il puntatore abbandona un elemento.

Usare la event delegation: impostare due gestori su `document` per tenere traccia di tutti gli "overs" ed "outs" degli elementi con `data-tooltip` e gestirli da lì.

Dopo che il comportamento è stato implementato, anche persone non avvezze a JavaScript possono aggiungere elementi con i tooltip.

P.S.: Puà essere mostrato solo un tooltip alla volta.
