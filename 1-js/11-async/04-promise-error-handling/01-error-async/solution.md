La risposta è: **no, non sarà eseguito**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

Come detto nel capitolo, c'è un"`try..catch` implicito" attorno al codice della funzione. In questo modo tutti gli errori sincroni sono gestiti.

Tuttavia qui l'errore è generato non mentre sta venendo eseguito l'esecutore, ma dopo. Per questo motivo la promise non può gestirlo. 
