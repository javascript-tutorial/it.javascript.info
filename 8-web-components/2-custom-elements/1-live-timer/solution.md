
Nota bene:
1. Quando rimuoviamo l'elemento dal documento, eseguiamo il clear di `setInterval` per il timer. È importante, altrimenti continuerà a ticchettare anche se non più necessario. Inoltre il browser avendo ancora un riferimento ad esso, non sarà in grado di pulire la sua memoria.
2. Deve essere possibile accedere alla data corrente tramite la proprietà `elem.date`. Tutti i metodi della classe e le relative proprietà devono anche essere metodi e proprietà dell'elemento.
