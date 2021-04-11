
Prima, vediamo come *non* farlo:

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

Questo non funziona perché la chiamata a `remove()` muove la collezione `elem.childNodes`, quindi gli elementi partono ogni volta dall'indice `0`. Ma `i` aumenta, perciò alcuni elementi verranno saltati.

Il loop `for..of` fa lo stesso.

La corretta variante potrebbe essere:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

C'è un modo più semplice per fare lo stesso:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
