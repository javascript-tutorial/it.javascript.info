Una striscia di immagini può essere rappresentata con una lista `ul/li` di immagini `<img>`.

Normalmente, sono strisce che si sviluppano tantissimo in larghezza, quindi creiamo un `<div>` a larghezza fissa attorno ad esse per "tagliarle", di modo che sia visibile sola una parte di esse:

![](carousel1.svg)

Per rendere la lista visibile in orizzontale, dobbiamo applicare le proprietà CSS corrette per gli elementi `<li>`, come `display: inline-block`.

Per `<img>` dovremmo anche aggiustare `display`, dato che per impostazione predefinita è `inline`. Ci sono spazi aggiuntivi riservati negli elementi `inline` per le "codine dei caratteri", e possiamo usare `display:block` per rimuoverle.

Per creare lo scorrimento possiamo spostare l'elemento `<ul>`. Ci sono varie maniere per farlo, ad esempio cambiando il `margin-left` oppure (prestazioni migliori) usare `transform: translateX()`:

![](carousel2.svg)

Il `<div>` esterno avendo una larghezza fissa, fa sì che le immagini "in più" vengono tagliate.

Tutto il carosello è un "componente grafico" auto-contenuto nella pagina, quindi è bene avvolgerlo dentro un singolo `<div class="carousel">`, inserendo le stilizzazioni dentro quest'ultimo.
