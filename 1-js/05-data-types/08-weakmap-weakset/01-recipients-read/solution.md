Memorizziamo i messaggi letti in `WeakSet`:

```js run
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

//due messaggi sono stati letti
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages ha due elementi

//...leggiamo nuovamente il primo messaggio!
readMessages.add(messages[0]);
// readMessages ha 2 elementi unici

//risposta: message[0] è stato letto?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// ora readMessages ha un elemento (tecnicamente la memoria potrebbe essere ripulita dopo)
```

La struttura `WeakSet` consente di memorizzare un insieme di messaggi e di verificare facilmente la presenza di un dato messaggio.

Viene ripulita automaticamente. Il lato negativo è che non possiamo eseguire iterazioni. Non possiamo ottenere direttamente "tutti i messaggi letti". Ma possiamo farlo iterando su tutti i messaggi e filtrando tutti quelli che sono presenti nel set.

Another, different solution could be to add a property like `message.isRead=true` to a message after it's read. As messages objects are managed by another code, that's generally discouraged, but we can use a symbolic property to avoid conflicts.

Un'altra soluzione potrebbe essere aggiungere una proprietà come `message.isRead=true`, ma farlo potrebbe essere pericoloso, se questo oggetto viene gestito dal codice di un'altra persona;  per evitare conflitti possiamo utilizzare un *symbol*.

Come qui:
```js
//la proprietà simbolica è visibile solo al nostro codice 
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Ora anche se qualcun altro utilizza `for..in` per avere accesso a tutte le proprietà di messages, la nostra proprietà sarà segreta.


Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.
Sebbene i simboli permettano una minore probabilità di problemi, utilizzare `weakSet` è meglio da un punto di vista architetturale.