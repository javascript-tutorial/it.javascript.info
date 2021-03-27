
Nota bene:
1. Facciamo il clear di `setInterval` del timer quando rimuoviamo l'elemento dal documento. È importante, altrimenti continuerà a ticchettare anche se non più necessario. Ed il browser non sarà in grado di pulire la sua memoria dall'elemento se ha ancora un riferimento.
2. Deve essere possibile accedere alla data corrente tramite la proprietà `elem.date`. Tutti i metodi della classe e le relative proprietà sono anche metodi e proprietà dell'elemento.
