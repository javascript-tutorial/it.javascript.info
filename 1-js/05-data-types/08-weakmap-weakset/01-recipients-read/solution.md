<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
La scelta più logica è un `WeakSet`:
=======
Let's store read messages in `WeakSet`:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md

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

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
Viene ripulita automaticamente. Il lato negativo è che non possiamo eseguire iterazioni. Non possiamo ottenere direttamente "tutti i messaggi letti". Ma possiamo farlo iterando su tutti i messaggi e filtrando tutti quelli che sono presenti nel set.

P.S. Aggiungere una proprietà ad ogni messaggio potrebbe essere pericoloro, se questo oggetto viene gestito dal codice di un'altra persona, possiamo però utilizzare un symbol per evitare conflitti.
=======
It cleans up itself automatically. The tradeoff is that we can't iterate over it,  can't get "all read messages" from it directly. But we can do it by iterating over all messages and filtering those that are in the set.

Another, different solution could be to add a property like `message.isRead=true` to a message after it's read. As messages objects are managed by another code, that's generally discouraged, but we can use a symbolic property to avoid conflicts.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md

Come qui:
```js
// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
Ora anche se qualcun'altro utilizza `for..in` per avere accesso a tutte le proprietà di messagge, la nostra etichetta sarà segreta.
=======
Now third-party code probably won't see our extra property.

Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md
