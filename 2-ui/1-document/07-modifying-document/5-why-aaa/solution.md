L'HTML nel task è incorretto. Questa è la ragione della stranezza.

Il browser deve sistemarlo automaticamente. Ma non vi può essere testo dentro a `<table>`: secondo la specifica, solo gli specifici tag per le tabelle sono permessi. Perciò il browser aggiunge `"aaa"` *prima* di `<table>`.

Ora è ovvio perché, rimuovendo la tabella, il testo rimane.

La domanda può facilmente trovare risposta esplorando il DOM con gli strumenti del browser. Mostra `"aaa"` prima di `<table>`.

Lo standard HTML specifica in dettaglio come processare cattivo HTML, e questo comportamento del browser è corretto. 
