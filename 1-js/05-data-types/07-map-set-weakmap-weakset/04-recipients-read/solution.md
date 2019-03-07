La scelta più logica è un `WeakSet`:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages has 2 elements

// ...let's read the first message again!
readMessages.add(messages[0]);
// readMessages still has 2 unique elements

// answer: was the message[0] read?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)
```

La struttura `WeakSet` consente di memorizzare un insieme di messaggi e di verificare molto rapidamente la presenza di un dato messaggio.

Viene ripulita automaticamente. Il lato negativo è che non possiamo eseguire iterazioni. Non possiamo ottenere direttamente "tutti i messaggi letti". Ma possiamo farlo iterando su tutti i messaggi e filtrando tutti quelli che sono presenti nel set.

P.S. Aggiungere una proprietà ad ogni messaggio potrebbe essere pericoloro, se questo oggetto viene gestito dal codice di un'altra persona, possiamo però utilizzare un symbol per evitare conflitti.

Come qui:
```js
// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Ora anche se qualcun'altro utilizza `for..in` per avere accesso a tutte le proprietà di messagge, la nostra etichetta sarà segreta.
