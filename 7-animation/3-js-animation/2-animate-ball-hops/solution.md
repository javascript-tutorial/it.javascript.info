Nell'esercizio <info:task/animate-ball> era richiesto di animare una sola proprietà. Ora dovete animarne una in più: `elem.style.left`.

La coordinata orizzontale deve variare: non deve limitarsi a rimbalzare, ma anche di scorrere verso destra.

Potete scrivere un'ulteriore `animate` per questo.

Potreste utilizzare la funzione di temporizzazione `linear`, ma qualcosa come `makeEaseOut(quad)` renderà l'animazione migliore.

Il codice:

```js
let height = field.clientHeight - ball.clientHeight;
let width = 100;

// anima top (rimbalzo)
animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function(progress) {
    ball.style.top = height * progress + 'px'
  }
});

// anima left (sposta verso destra)
animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function(progress) {
    ball.style.left = width * progress + "px"
  }
});
```
