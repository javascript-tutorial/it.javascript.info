Per ricavare la larghezza della barra di scorrimento, possiamo creare un elemento con scorrimento ma senza bordi e padding.

In quel caso la sottrazione tra la larghezza totale `offsetWidth` e la larghezza dell'area interna del contenuto `clientWidth` equivarrà esattamente alla larghezza della barra di scorrimento:

```js run
// creiamo un div con scorrimento
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// dobbiamo inserirlo nel flusso del documento, altrimenti le dimensioni saranno pari a 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
