# Upload del file ripristinabile

Con il metodo `fetch` è abbastanza semplice eseguire l'upload di un file.

Come ripristinare l'upload di un file dopo avere perso la connessione? Non esistono opzioni built-in per questa operazione, ma abbiamo dei pezzi di codice per implementarla.

Il ripristino degli upload dovrebbero andare a braccetto con la possibilità di tenerne traccia durante il trasferimento, come ci aspetteremmo per files di grosse dimensioni (se abbiamo bisogno di ripristinare l'operazione). Dal momento che `fetch` non permette di tenere traccia dell'upload, allora dovremmo rifarci all'uso di [XMLHttpRequest](info:xmlhttprequest).

## Evento di progresso non-così-utile

Per ripristinare un upload, dobbiamo conoscere quanto è stato trasferito prima che la connessione si fosse interrotta.

C'è `xhr.upload.onprogress` per tenere traccia del progresso di upload.

Sfortunatamene, non ci aiuta nel ripristinare l'upload, dal momento che qeusto viene scatenato quando il dato è stato *inviato*, ma è stato ricevuto dal server? Il browser non lo sa.

Magari è stato bufferizzato da qualche proxy di rete locale, o magari il processo del server remoto è stato terminato e non può più processarlo, oppure è stato perso nel bel mezzo del trasferiemnto e non raggiunge il ricevente.

Questo è il motivo per il quale è utile solo a mostrare una carinissaima barra di caricamento.

Per riprisitnare l'upload, abbiamo bisogno di conoscere *esattamente* il numero di bytes ricevuti dal server. e solo il server può dircelo, quindi creeremo una richiesta aggiuntiva.

## Algoritmo

1. Per prima cosa, creiamo un id del file, per identificare univocamente il file che stiamo andando a trasferire:
    ```js
    let fileId = file.name + '-' + file.size + '-' + file.lastModified;
    ```
    Ciò è necessario per ripristinare l'upload, per dire al server cosa stiamo ripristinando.

    Se il nome, la dimensione oppure la data di ultima modifica sono differenti, allora ci sarà un altro `fileId`.

2. Inviamo una richiesta al server, chiedendo quanti bytes possiede già:
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // Il serve possiede questo numero di bytes
    let startByte = +await response.text();
    ```

    Questo presume che il server tiene traccia degli upload dei files tramite l'header `X-File-Id`. Dovrebbe essere implmentato lato server.

    Se il file non essite ancora nel server, allora la risposta del server dovrebbe essere `0`

3. Quindi, possiamo usare il metodo `slice` di `Blob` per inviare il file partendo da `startByte`:
    ```js
    xhr.open("POST", "upload", true);

    // File id, in modo tale che il server possa sapere di quale file stiamo eseguendo l'upload
    xhr.setRequestHeader('X-File-Id', fileId);

    // Il byte a partire dal quale stiamo eseguendo il ripristino, in moda da consentire al server di sapre da che punto stiamo cominciando a ripristinare
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

    // il file può provenire da input.files[0] o altra fonte
    xhr.send(file.slice(startByte));
    ```

    Qui inviamo al server sia il file id come `X-File-Id`, di modo che sappia quae file stiamo trasferendo, e da quale byte staimo ripartendo tramite `X-Start-Byte`, cosicché sappia che non stiamo partendo dall'inizio, ma che staimo, invece,  ripristinando.

    Il sefver dovrebbe controllare i suoi registri, e nel caso in cui trovasse un upload di quest file, e la dimensione attualemnte caricata fosse esattaemnte di `X-Start-Byte`, allora accoderebbe i dati a qeusto file.


Ecco una demo con il codice client e la relativa parte server, scritta in Node.js.

Funziona parzialmente su questo sito, dal momento che Node.js sta su un altro server chiamato Nginx, che bufferizza gli uploads, passandoglieli solo a trasferimento completato.

È comunque possibile scaricare l'esempio ed eseguirlo in locale per la dimostrazione completa:

[codetabs src="upload-resume" height=200]

Come possiamo vedere, i moderni metodi di rete sono molto vicini dall'essere dei gestori di files nelle loro capacità, controllo degli headers, indicazione del progresso di upload, invio di frammenti di files etc.

Possiamo implementare upload ripristinabili e molto altro ancora.
