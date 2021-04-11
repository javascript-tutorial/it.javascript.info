Questo è un ottimo uso del pattern event delegation.

In applicazioni concrete, invece di chiedere, potremmo inviare una richiesta di "logging" al server, che salvi l'informazione relativa al momento in cui l'utente ha deciso di abbandonare la pagina. Oppure potremmo caricare il contenuto e mostrarlo direttamente in pagina (se permesso).

Tutto ciò di cui abbiamo bisogno è di catturare i `contents.onclick` ed usare `confirm` per chiedere all'utente. Una buona idea potrebbe essere quella di usare `link.getAttribute('href')` invece di `link.href` per l'URL. Guarda la soluzione per i dettagli.
