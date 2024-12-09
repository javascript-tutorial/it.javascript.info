# Upload del file ripristinabile

Con il metodo `fetch` è abbastanza semplice eseguire l'upload di un file.

Come possiamo ripristinare l'upload di un file dopo avere perso la connessione? Non esistono opzioni built-in per questa operazione, ma abbiamo dei pezzi di codice per implementarlo.

Il ripristino degli upload dovrebbe andare a braccetto con la possibilità di tenerne traccia durante il trasferimento, come ci aspetteremmo per files di grosse dimensioni (se abbiamo bisogno di ripristinare l'operazione). Dal momento che `fetch` non permette di tenere traccia dell'upload, allora dobbiamo rifarci all'uso di [XMLHttpRequest](info:xmlhttprequest).

## Evento di progresso non-così-utile

Per ripristinare un upload, dobbiamo conoscere la quantità di dati trasferiti prima che la connessione si interrompesse.

Per tenere traccia del progresso di upload possiamo usare `xhr.upload.onprogress`.

Sfortunatamente, questo non ci aiuta nel ripristinare l'upload, dal momento che questo evento viene scatenato solamente quando il dato è stato *inviato*. Ma è stato ricevuto dal server? Il browser non lo sa.

Magari potrebbe essere stato bufferizzato da qualche proxy di rete locale, o magari il processo del server remoto è stato terminato e non è più in grado di processarlo, oppure è stato perso nel bel mezzo del trasferimento e non raggiunge il ricevente.

Questo è il motivo per il quale la sua utilità si limita a mostrare una carinissima barra di caricamento.

Per ripristinare l'upload, abbiamo bisogno di conoscere *esattamente* il numero di bytes ricevuti dal server. E questa informazione può darcela solamente il server, motivo per il quale andiamo a creare una richiesta aggiuntiva.

## Algoritmo

1. Per prima cosa, creiamo un id del file, per identificare univocamente ciò che stiamo andando a trasferire:
    ```js
    let fileId = file.name + '-' + file.size + '-' + file.lastModified;
    ```
    Ciò è necessario per ripristinare l'upload, per dire al server cosa stiamo ripristinando.

    Se il nome, la dimensione, oppure la data di ultima modifica sono differenti, allora ci sarà un `fileId` differente.

2. Inviamo una richiesta al server, chiedendo quanti bytes possiede già di quel file:
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // Il server possiede questo numero di bytes
    let startByte = +await response.text();
    ```

    Questo presume che il server tenga traccia degli upload dei files tramite l'header `X-File-Id`. Dovrebbe essere implementato lato server.

    Se il file non esiste ancora nel server, il valore della risposta dovrebbe essere `0`

3. Quindi, possiamo usare il metodo `slice` di `Blob` per inviare il file partendo da `startByte`:
    ```js
    xhr.open("POST", "upload");

    // File id, in modo tale che il server possa sapere di quale file stiamo eseguendo l'upload
    xhr.setRequestHeader('X-File-Id', fileId);

    // Il byte a partire dal quale stiamo eseguendo il ripristino, in modo da consentire al server di sapere da che punto stiamo cominciando a ripristinare
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

    // il file puo' provenire da input.files[0] o da altra fonte
    xhr.send(file.slice(startByte));
    ```

    Qui inviamo al server sia il file id come `X-File-Id`, di modo che sappia quale file stiamo trasferendo, e da quale byte stiamo ripartendo tramite `X-Start-Byte`, cosicché sappia che non stiamo partendo dall'inizio, ma che, invece, stiamo ripristinando.

    Il server dovrebbe controllare i suoi registri, e nel caso in cui trovasse un upload del file, e la dimensione attualmente caricata fosse esattamente di `X-Start-Byte`, accoderebbe i dati al file.


Ecco una demo con il codice client e la relativa parte server, scritta in Node.js.

Funziona parzialmente su questo sito, dal momento che Node.js sta su un altro server chiamato Nginx, che bufferizza gli uploads, passandoglieli solo a trasferimento completato.

È comunque possibile scaricare l'esempio ed eseguirlo in locale per la dimostrazione completa:

[codetabs src="upload-resume" height=200]

Come possiamo vedere, i moderni metodi di rete sono molto vicini all'essere dei gestori di files nelle loro capacità, controllo degli headers, indicazione del progresso di upload, invio di frammenti di files etc.

Possiamo implementare, quindi, upload ripristinabili e molto altro ancora.
