# Long polling

Il long polling è l'esempio più semplice di connessione persistente con il server, che non usa nessun tipo di protocollo specifico come nel caso dei WebSocket o dei Server Side Events.

Essendo molto semplice da implementare, è anche sufficientemente valido in molti casi d'uso.

## Richiesta semplice

Il modo più semplice per ottenere nuove informazioni dal server è l'interrogazione periodica. Si tratta di una normale richiesta: "Ciao, sono qui, hai nuove informazioni da darmi?". Per esempio, una volta ogni 10 secondi. 

Come risposta, prima il server prende nota del fatto che il client è online, e poi invia un pacchetto di messaggi che può inviare fino a quel momento. 

Funzione, ma ci sono degli svantaggi:
1. I messaggi vengono trasferiti con un ritardo che può arrivare fino a 10 secondi (tra uan richiesta e l'altra).
2. Anche se non ci sono messaggi, il server viene bombardato di richieste ogni 10 secondi, anche se l'utente è passato ad altre attività, o se è dormiente. Si tratta di un bel carico da gestire, parlando in termini di prestazioni.

Quindi, se stiamo parlando di un servizio molto piccolo, l'approccio puàò essere percorribile, ma generalmente necessita di un miglioramento.

## Long polling

Il cosiddetto "long polling" è un modo di grand lunga migliore per interrogare il server.

Inoltre è davvero semplice da implementare, e recapita i messaggi senza alcun ritardo. 

Flusso:

1. Viene inviata una richiesta al server.
2. Il server non chiude la connessione fino a che non ha un mesaaggio da inviare.
3. Quando compare un messaggio, il server risponde alla richiesta con quest'ultimo.
4. Il browser invia immediatamente una nuova richiesta.

Con questo metodo, la situazione in cui il browser ha inviato una nuova richiesta e ha una connessione pendente con il server, è la situazione standard. La connessione viene ristabilita, solo quando viene consegnato un messaggio.

![](long-polling.svg)

Se la connessione viene persa, poniamo il caso, a causa un errore di rete, il browser invia una nuova richiesta.

Ecco una bozza di una funzione lato client che effettua richieste long polling:

```js
async function subscribe() {
  let response = await fetch("/subscribe");

  if (response.status == 502) {
    // Lo status 502 indica un errore di timeout,
    // potrebbe succedere quando la connessione e' stata pendente per troppo tempo,
    // ed il server remoto o un proxy l'ha chiusa
    // riconnettiamoci
    await subscribe();
  } else if (response.status != 200) {
    // Un errore - mostriamolo
    showMessage(response.statusText);
    // Riconnession in un secondo
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

Come potete vedere, la funzione `subscribe` effettua un fetch, quindi, rimane in attesa della risposta, la gestisce e richiama nuovamente sè stessa.

```warn header="Il server dovrebbe rimanere tranquillo con molte connessioni pendenti"
L'architettura server deve essere adatra per lavorare con molte connessioni pendenti.

Certe architetture server eseguono un processo per ogni connessione, con il risultato di avere tanti processi per quante sono le connessioni, ed ogni processo consuma un bel po' di memoria. Quindi, troppe connessioni la consumeranno tutta.

È spesso il caso per backends scritti in linguaggi come PHP e Ruby.

I server scritti in Node.js solitamente non hanno questo tipo di problemi.

Detto questo, non è un problema di linguaggio di programmanzione. La maggior parte dei linguaggi moderni, incluso PHP e Ruby, permettono di implementare il backend adatto. Assicuratevi solo che il vostro server lavori bene con tante connessioni suultanee. 
```

## Dimostrazione: una chat

Ecco una chat dimostrativa, potete anche scaricarla ed eseguirla in locale (se avete familiarità con Node.js e potete insallare moduli):

[codetabs src="longpoll" height=500]

Il codice per il broser si trova dentro `browser.js`.

## Area di utilizzo

Long polling lavora ottimamente in situazioni in cui i messaggi sono rari.

Se i messaggi diventano molto frequenti, il grafico dei messaggi richiesta-ricezione prima descritto, assumerà una forma simile a una sega.

Ogni messaggio è una riciesta separata, fornita con intestazioni, overhead di autenticazione e cosi via.

In questo caso, quindi, è preferibile un altro metodo, è il caso dei [Websocket](info:websocket) o dei [Server Sent Events](info:server-sent-events).
