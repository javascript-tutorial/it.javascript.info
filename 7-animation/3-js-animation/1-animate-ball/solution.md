Per il rimbalzo potete utilizzare la proprietà CSS `top` e `position:absolute` sulla palla dentro il campo con `position:relative`.

Le coordinate del fondo del campo sono `field.clientHeight`. La proprietà CSS `top` fa riferimento al bordo alto della palla. Quindi dovrebbe andare da `0` fino a `field.clientHeight - ball.clientHeight`, questa è la posizione finale, quella più bassa rispetto al bordo alto della palla.

Per dare l'effetto di "rimbalzo" possiamo utilizzare la funzione di temporizzazione `bounce` in modalità `easeOut`.

Here's the final code for the animation:

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```
