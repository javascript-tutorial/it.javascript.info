```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Una chiamata a `debounce` restituisce un wrapper. Quando viene chiamato, pianifica la chiamata della funzione originale dopo tot `ms` e annulla il precedente timeout.

