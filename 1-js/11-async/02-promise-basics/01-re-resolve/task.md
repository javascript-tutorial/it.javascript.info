
# Ri-risolvere (re-resolve) una promise?


Qual è l'output del codice sotto?

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
