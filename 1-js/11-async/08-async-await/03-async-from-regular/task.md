
# Call async from non-async

Abbiamo una funzione "regolare". Come chiamare `async` da questa ed usare il suo risultato?

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...cosa bisonga scrivere qui?
  // dobbiamo chiamare async wait() ed aspettare per ricevere 10
  // ricorda, non possiamo usare "await"
}
```

P.S. Il task è tecnicamente molto semplice, ma la domanda è piuttosto comune per gli sviluppatori nuovi ad async/await.
