# Error in setTimeout

Che cosa pensi? Il `.catch` sarà eseguito? Spiega la tua risposta.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
