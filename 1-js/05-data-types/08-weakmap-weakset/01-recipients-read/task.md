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

Ora, quale struttura dati potresti utilizzare per memorizzare quali messaggi "sono stati letti"? La struttura deve calzare bene al problema, e rispondere alla domanda  "è stato letto?".

P.S. Quando un messaggio viene rimosso da `messages`, dovrebbe essere rimosso anche dalla vostra struttura.

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/task.md
P.P.S. Non dovremmo modificare l'oggetto messagge. Poichè se viene gestito dal codice di qualcun altro, aggiungere nuove proprietà potrebbe avere conseguenze disastrose.
=======
P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/task.md
