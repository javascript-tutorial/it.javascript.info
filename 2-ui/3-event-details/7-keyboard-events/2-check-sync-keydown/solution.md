
Qui dobbiamo usare due gestori: `document.onkeydown` e `document.onkeyup`.

Andiamo ad impostare `pressed = new Set()` per memorizzare i tasti attualmente premuti.

Il primo gestore lo aggiunge, mentre il secondo lo rimuove. Ad ogni `keydown` controlliamo se abbiamo abbastanza tasti premuti, ed in caso affermativo la funzione verrà eseguita.
