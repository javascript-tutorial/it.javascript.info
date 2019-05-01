
# Animated circle with callback

Nel task <info:task/animate-circle> è mostrato un cerchio crescente animato.

Ora diciamo che non vogliamo solo un cerchio, ma anche mostrare un messaggio al suo interno. Il messaggio dovrebbe apparire *dopo* che l'animazione è completa (il cerchio è cresciuto del tutto), altrimenti sarebbe brutto.

Nella soluzione del task, la funzione `showCircle(cx, cy, radius)` disegna il cerchio, ma non da modo di tracciare quando è pronto.

Aggiungi un argomento callback: `showCircle(cx, cy, radius, callback)` da chiamare quando l'animazione è completa. La `callback` dovrebbe il `<div>` cerchio come argomento.

Ecco l'esempio:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Demo:

[iframe src="solution" height=260]

Prendi la soluzione task <info:task/animate-circle> come base.
