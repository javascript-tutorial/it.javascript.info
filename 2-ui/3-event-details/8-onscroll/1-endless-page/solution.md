Il cuore della soluzione è una funzione che aggiunge ancora contenuti nella pagina (o carica più cose nei casi reali) una volta arrivati alla fine del documento.

Possiamo chiamarla subito, ed aggiungerla come gestore di `window.onscroll`.

La domanda fondamentale è: "Come possiamo rilevare che la pagina è arrivata alla fine dello scroll?"

Usando le coordinate relative alla finestra.

Il documento è rappresentato (e contenuto) all'interno del tag `<html>`, che è `document.documentElement`.

Possiamo ottenere le coordinate relative alla finestra dell'intero documento con `document.documentElement.getBoundingClientRect()`, la proprietà `bottom` sarà la coordinata relativa alla finestra, della parte bassa del documento.

Per esempio, se l'altezza di tutti il documento HTML è `2000px`, allora avremo che:

```js
// quando siamo all'inizio della pagina
// il top rispetto alla finestra = 0
document.documentElement.getBoundingClientRect().top = 0

// la parte bassa relativa alla finestra = 2000
// il documento è lungo, quindi probabilmente andrà oltre il limite inferiore della finestra
document.documentElement.getBoundingClientRect().bottom = 2000
```

Se scrolliamo verso il basso di `500px`, avremo che:

```js
// la sommita' del documento sta sopra la finestra di 500px
document.documentElement.getBoundingClientRect().top = -500
// la parte bassa del documento, inverce, sara' 500px un po' piu' vicina
document.documentElement.getBoundingClientRect().bottom = 1500
```

Quando avremo scrollato la pagina fino alla fine, posto che l'altezza della finestrta sia di `600px`:


```js
// la sommità del documento stara' sopra la finestra di 1400px
document.documentElement.getBoundingClientRect().top = -1400
// la parte bassa del documento sara' piu' in basso rispetto alla finestra di 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

Notate bene che `bottom` non può essere `0`, perché non arriva mai all'inizio della finestra. Il limite basso delle coordinate di `bottom` è l'altezza della finestra (stiamo ponendo il caso che questa sia `600`), e non può scrollare più in alto.

Ricaviamo, quindi, l'altezza della finestra attraverso `document.documentElement.clientHeight`.

Per i nostri scopi, ci serve sapere momento in cui la fine del documento si troverà a non più di `100px`. (che è a: `600-700px`, se l'altezza è di `600`).

Ecco quindi la funzione:

```js
function populate() {
  while(true) {
    // fine del documento
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // se l'utente non ha scrollato abbastanza (>100px dalla fine)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    
    // aggiungiamo più dati
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
