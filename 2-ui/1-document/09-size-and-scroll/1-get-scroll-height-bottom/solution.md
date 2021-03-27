La soluzione è:

```js
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
```

In altre parole: (altezza totale) meno (misura dello scorrimento dall'alto) meno (altezza dell'area di scorrimento visibile). Il risultato è esattamente la misura della parte inferiore che resta da scorrere.
