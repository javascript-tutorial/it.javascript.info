importance: 5

---

# Comportamento del tooltip migliorato

Scrivete del codice JavaScript che mostri un tooltip su un elemento con un attributo `data-tooltip`. Il valore di questo attributo dovrebbe rappresentare il testo del tooltip.

Questo compito è come quello di <info:task/behavior-tooltip>, con la differenza che qui gli elementi delle annotazioni possono essere annidati. Deve essere mostrato il tooltip più annidato.

Può essere mostrato solo un tooltip alla volta.

Per esempio:

```html
<div data-tooltip="Qui – l'interno della casa" id="house">
  <div data-tooltip="Qui – il tetto" id="roof"></div>
  ...
  <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Leggi…">Hover su di me</a>
</div>
```

Il risultato dell'iframe:

[iframe src="solution" height=300 border=1]
