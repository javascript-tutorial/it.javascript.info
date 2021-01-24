
Per aggiungere un pulsante possiamo usare sia `position:absolute` (e quindi il suo contenitore dovrà avere `position:relative`) oppure `float:right`. `float:right` ha il vantaggio che il pulsante non si sovrapponga al testo, però `position:absolute` ci dà un po' più di libertà. La scelta è tua.

Quindi per ogni contenitore il codice potrebbe essere come questo:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Il `<button>` diventa `pane.firstChild`, e gli possiamo aggiungere un gestore come questo:

```js
pane.firstChild.onclick = () => pane.remove();
```
