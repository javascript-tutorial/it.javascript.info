# Promise: then versus catch

Questi pezzi di codice sono uguali? In altre parole, si comportano nello stesso modo in ogni circostanza, per ogni funzione handler?

```js
promise.then(f1).catch(f2);
```

Versus:

```js
promise.then(f1, f2);
```
