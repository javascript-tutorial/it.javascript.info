Il gestore `onscroll` dovrebbe controllare quali immagini sono visibili e mostrarle.

Vogliamo anche eseguirla al caricamento della pagina, per rilevare immediatamente le immagini visibili e caricarle.

Il codice dovrebbe essere eseguito al caricamento del documento, in modo che abbia accesso al suo contenuto.

Oppure, per fare ciò, si potrebbe mettere alla del `<body>`:

```js
// ...il contenuto della pagina sta sopra...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // il bordo superiore dell'elemento risulta visibile?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // il bordo inferiore risulta visibile?
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:

```js
function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

P.S. La soluzione ha anche una variante di `isVisible` che "precarica" le immagini che sono distano solo una pagina di scroll sopra o sotto lo scroll corrente del documento.
