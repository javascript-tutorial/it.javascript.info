importance: 4

---

# Caricare immagini con una callback

Normalmente, le immagini vengono caricate quando sono create. Quindi quando aggiungiamo `<img>` alla pagina, l'utente non vede l'immagine immediatamente. Il Browser deve prima caricarla.

Per visualizzare un'immagine immediatamente dobbiamo crearla "in anticipo", come in questo caso:

```js
let img = document.createElement('img');
img.src = 'my.jpg';
```

Il browser inizia a caricare l'immagine e la salva nella cache. In seguito, quando la stessa immagine comparirà nel document, si visualizzerà immediatamente.

**Crea una funzione `preloadImages(sources, callback)` che carica tutte le immagini da un array `sources` e, quando pronte, esegue `callback`.**

Per esempio, questo pezzo di codice visualizzerà un `alert` dopo che le immagini sono caricate:

```js
function loaded() {
  alert("Images loaded")
}

preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);
```

In caso di errore la funzione dovrebbe comunque considerare l'immagine "caricata"

In altre parole, la funzione di `callback` è eseguita quando tutte le immagini sono caricate o sono andate in errore.

La funzione, ad esempio, è utile quando dobbiamo mostrare una galleria scrollabile di immagini e vogliamo essere sicuri che tutte le immagini siano caricate.

Nel documento sorgente puoi trovare i link alle immagini di test ed anche il codice per verificare se le immagini sono state caricate o meno. L'output dovrebbe essere `300`.
