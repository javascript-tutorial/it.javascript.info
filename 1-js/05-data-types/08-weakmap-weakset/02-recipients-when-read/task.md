importance: 5

---

# Memorizzare le date di lettura

Abbiamo un array di messaggi come nel [compito precedente](info:task/recipients-read). La situazione è simile.

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Ora la domanda è: quale struttura di dati converrebbe utilizzare per memorizzare l'informazione: "quando è stato letto il messaggio?".

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/05-recipients-when-read/task.md
Nel compito precedente la necessità era semplicemente di memorizzare la lettura del messaggio. Ora abbiamo bisogno di memorizzare anche la data, anche in questo caso, se il messaggio viene eliminato questa dovrebbe sparire.
=======
In the previous task we only needed to store the "yes/no" fact. Now we need to store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in `Date` class, that we'll cover later.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923:1-js/05-data-types/08-weakmap-weakset/02-recipients-when-read/task.md
