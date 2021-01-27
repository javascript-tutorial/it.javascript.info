Risposta: `1` e `2`.

Il primo gestore verrà innescato, poiché non viene rimosso da `removeEventListener`. Per rimuovere il gestore dobbiamo passare esattamente la stessa funzione che era stata assegnata. E nel codice viene passata una nuova funzione, che è identica, ma è comunque una nuova funzione.

Per poter rimuovere un oggetto funzione, dobbiamo salvarci un suo riferimento:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

Il gestore `button.onclick` aggiunto ad `addEventListener` funziona perfettamente.
