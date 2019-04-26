L'idea è semplice: sottrarre il numero di giorni da `date`:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...Ma la funzione non dovrebbe modificare l'oggetto `date`. Questo è un aspetto importante, poiché chi ci fornisce l'oggetto non si aspetta cambiamenti.

Per implementarlo correttamente dovremmo clonare l'oggetto, come nel codice seguente:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```
