# Long polling

<<<<<<< HEAD
Il "long polling" è il modo più semplice per avere una connessione persistente con il server, e contrariamente ai WebSocket o ai Server Side Events, non usa nessun tipo di protocollo specifico. 
=======
Long polling is the simplest way of having persistent connection with server, that doesn't use any specific protocol like WebSocket or Server Sent Events.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Essendo molto semplice da implementare, è anche sufficientemente valido in molti casi d'uso.

## Richiesta semplice

Il modo più semplice per ottenere nuove informazioni dal server è l'interrogazione periodica. Si tratta di una normale richiesta: "Ciao, sono qui, hai nuove informazioni da darmi?". Per esempio, una volta ogni 10 secondi. 

In risposta, come prima cosa, il server prende nota del fatto che il client è online, e poi invia un pacchetto di messaggi disponibili fino a quel momento. 

Funziona, ma ci sono degli svantaggi:
1. I messaggi vengono trasferiti con un ritardo che può arrivare fino a 10 secondi (tra una richiesta e l'altra).
2. Anche se non ci sono messaggi, il server viene bombardato di richieste ogni 10 secondi, pure se l'utente è passato ad altre attività, o è inattivo. In termini di prestazioni, si tratta di un bel carico da gestire.

Quindi, se stiamo parlando di un servizio molto piccolo, l'approccio può essere percorribile, ma generalmente necessita di miglioramenti.

## Long polling

Il cosiddetto "long polling" è un modo di gran lunga migliore per interrogare il server.

Inoltre è davvero semplice da implementare, e recapita i messaggi senza alcun ritardo. 

Flusso:

1. Viene inviata una richiesta al server.
2. Il server non chiude la connessione fino a che ha un messaggio da inviare.
3. Quando compare un messaggio, il server risponde alla richiesta con quest'ultimo.
4. Il browser invia immediatamente una nuova richiesta.

<<<<<<< HEAD
Con questo metodo, la situazione in cui il browser ha inviato una nuova richiesta e ha una connessione pendente con il server, è la situazione standard. La connessione viene ristabilita, solo quando viene consegnato un messaggio.
=======
This situation, where the browser has sent a request and keeps a pending connection with the server, is standard for this method. Only when a message is delivered, the connection is closed and reestablished.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](long-polling.svg)

Se la connessione viene persa, poniamo il caso di un errore di rete, il browser invia una nuova richiesta.

Ecco una bozza di una funzione lato client che effettua richieste long polling:

```js
async function subscribe() {
  let response = await fetch("/subscribe");

  if (response.status == 502) {
    // Lo status 502 indica un errore di timeout,
    // potrebbe succedere per connessioni pendenti da troppo tempo,
    // che il server remoto o un proxy chiudono
    // e quindi avviene una riconnessione
    await subscribe();
  } else if (response.status != 200) {
    // Un errore che andiamo a mostrare
    showMessage(response.statusText);
    // Riconnessione in un secondo
    await new Promise(resolve => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // Otteniamo e mostriamo il messaggio
    let message = await response.text();
    showMessage(message);
    // Chiamiamo subscribe() nuovamente per ottenere il prossimo messaggio
    await subscribe();
  }
}

subscribe();
```

Come potete vedere, la funzione `subscribe` effettua un fetch e rimane in attesa della risposta, e dopo averla gestita, richiama nuovamente sè stessa.

```warn header="Il server dovrebbe continuare a funzionare bene, anche con molte connessioni pendenti"
L'architettura server deve essere idonea per lavorare con molte connessioni pendenti.

Certe architetture server eseguono un processo per ogni connessione, con il risultato di avere tanti processi per quante sono le connessioni, ed ognuno di questi consuma un bel po' di memoria. Quindi, troppe connessioni la consumeranno tutta.

È spesso il caso per backends scritti in linguaggi come PHP e Ruby.

I server scritti in Node.js solitamente non hanno questo tipo di problemi.

Detto ciò, non è un problema di linguaggio di programmazione. La maggior parte dei linguaggi moderni, incluso PHP e Ruby, permettono di implementare un backend adatto. Assicuratevi solo che il vostro server lavori bene con tante connessioni simultanee. 
```

## Dimostrazione: una chat

Ecco una chat dimostrativa, che potete anche scaricare ed eseguire in locale (se avete familiarità con Node.js e potete installare moduli):

[codetabs src="longpoll" height=500]

Il codice per il browser si trova dentro `browser.js`.

## Area di utilizzo

Il long polling lavora ottimamente in situazioni in cui i messaggi sono rari.

Se i messaggi diventano molto frequenti, il grafico dei messaggi richiesta-ricezione prima descritto, assumerà una forma simile a una sega.

Ogni messaggio è una richiesta separata, fornita di intestazioni, overhead di autenticazione e cosi via.

In questo caso, quindi, sono preferibili altri metodi, è il caso dei [Websocket](info:websocket) o dei [Server Sent Events](info:server-sent-events).
