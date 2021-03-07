Per ottenere il numero di secondi, possiamo generare una data usando il giorno corrente e il tempo 00:00:00; la differenza rappresenta il tempo trascorso.

La differenza è il numero di millisecondi trascorsi dall'inizio del giorno, che dovremmo poi dividere per 100 per ottenere i secondi:

```js run
function getSecondsToday() {
  let now = new Date();

  // crea un oggetto utilizzando il giorno/mese/anno corrente
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // differenza in ms
  return Math.round(diff / 1000); // converti a secondi
}

alert( getSecondsToday() );
```

Una soluzione alternativa potrebbe essere quella di ottenere ore/minuti/secondi e convertirli tutti in secondi:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );
```
