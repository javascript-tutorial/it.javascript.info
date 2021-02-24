Una finestra modale può essere implementata usando un `<div id="cover-div">` semitrasparente che copre l'intera finestra, in questa maniera:

```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

Dato che il `<div>` copre ogni cosa, sarà questo elemento a catturare tutti i click, e non la pagina sottostante.

Inoltre può essere prevenuto lo scrolling della pagina impostando `body.style.overflowY='hidden'`.

Il form non dovrebbe essere dentro il `<div>`, ma subito dopo nel codice della pagina (quindi starà anche sopra), perché non vogliamo che sia soggetto alla trasparenza dovuta ad `opacity`.
