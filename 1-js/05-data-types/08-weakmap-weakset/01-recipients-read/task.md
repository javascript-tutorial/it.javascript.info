importance: 5

---

# Memorizzare le bandiere non visualizzate

Abbiamo un array di messaggi:

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Il vostro codice vi può accedere, ma i messaggi sono gestiti dal codice di qualcun altro. Vengono aggiunti nuovi messaggi, quelli vecchi vengono rimossi, e voi non avete modo di sapere quando ciò accade.

<<<<<<< HEAD
Ora, quale struttura dati potresti utilizzare per memorizzare quali messaggi "sono stati letti"? La struttura deve calzare bene al problema, e rispondere alla domanda  "è stato letto?".
=======
Now, which data structure could you use to store information about whether the message "has been read"? The structure must be well-suited to give the answer "was it read?" for the given message object.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

P.S. Quando un messaggio viene rimosso da `messages`, dovrebbe essere rimosso anche dalla vostra struttura.

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/task.md
P.P.S. Non dovremmo modificare l'oggetto messagge. Poichè se viene gestito dal codice di qualcun altro, aggiungere nuove proprietà potrebbe avere conseguenze disastrose.
=======
P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> 9bfc8cfa9c055bdcbc8f40471fc52e011687a728:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/task.md
