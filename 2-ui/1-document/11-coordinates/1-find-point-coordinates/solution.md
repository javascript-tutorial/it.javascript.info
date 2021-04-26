# Angoli esterni

Gli angoli esterni sono fondamentalmente quello che otteniamo da [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

Le coordinate dell'angolo superiore sinistro `answer1` e quelle dell'angolo inferiore destro `answer2`:

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# Angolo interno superiore sinistro

Questo differisce dall'angolo esterno solo per la larghezza del bordo. Un modo affidabile per calcolare la distanza è `clientLeft/clientTop`:

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# Angolo interno inferiore destro

Nel nostro caso possiamo sottrarre la misura del bordo dalle coordinate esterne.

Potremmo utilizzare il valore CSS:

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

Un'alternativa sarebbe aggiungere `clientWidth/clientHeight` alle coordinate dell'angolo interno superiore sinistro. Questa è probabilmente la soluzione migliore:

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```
