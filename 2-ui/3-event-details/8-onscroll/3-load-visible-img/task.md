importance: 4

---

# Caricare immagini visibili

Poniamo il caso di avere un client con connessione lenta e che volessimo risparmiare un po' di traffico dal dispositivo mobile.

A questo proposito, decidiamo di non caricare immediatamente le immagini, ma piuttosto di sostituirle con dei segnaposto, così:

```html
<img *!*src="placeholder.svg"*/!* width="128" height="128" *!*data-src="real.jpg"*/!*>
```

Quindi, inizialmente tutte le immagini saranno sostituite da un segnaposto `placeholder.svg`. Quando la pagina viene scrollata fino alla posizione in cui possiamo vedere le singole immagini, andiamo a modificare l'attributo `src` sostituendolo con il valore del `data-src`, in modo che l'immagine venga finalmente caricata.

Ecco un esempio dentro l'`iframe`:

[iframe src="solution"]

Scrollare per vedere le immagini "a richiesta".

Requisiti:
- Quando la pagina viene caricata, le immagini che sono sullo schermo dovrebbero caricarsi immediatamente, prima di qualunque scroll.
- Alcune immagini potrebbero essere normali, prive dell'attributo `data-src`. Queste immagini non dovrebbero essere influenzate dal nostro codice.
- Una volta che l'immagine viene caricata, non dovrebbe più caricarsi, a prescindere che se si stia scrollando oltre o che l'elemento che la contenga torni nuovamente ad essere visibile sullo schermo.

P.S. Se potete, create una soluzione avanzata che effettui un "preload" delle immagini che sono poco sotto la posizione attuale.

P.P.S. Si deve gestire solamente lo scroll verticale, e non quello orizzontale.
