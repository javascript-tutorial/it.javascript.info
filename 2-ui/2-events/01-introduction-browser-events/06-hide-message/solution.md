
Per aggiungere un pulsante possiamo usare sia `position:absolute` (e quindi il suo contenitore dovrà avere `position:relative`) oppure `float:right`. `float:right` ha il vantaggio di non fare sovrapporre il pulsante al testo,  `position:absolute` invece ci dà un po' più di libertà. La scelta è tua.

Quindi per ogni contenitore il codice potrebbe essere come questo:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Il `<button>` diventa `pane.firstChild`, e gli possiamo aggiungere un gestore come questo:

```js
pane.firstChild.onclick = () => pane.remove();
```
