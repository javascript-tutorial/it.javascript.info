Per ottenere il numero di millisecondi mancanti al giorno successivo, possiamo sottrarre da "domani alle 00:00:00" la data attuale.

Prima generiamo l'oggetto "domani":

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // tomorrow date
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}
```

Soluzione alternativa:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Da notare che molti stati potrebbero sottostare a DST, quindi alcuni giorni potrebbero durare 23 ore mentre altri 25. Vorremmo trattare queste situazioni separatamente.
