<<<<<<< HEAD
Creiamo un oggetto `date` con il mese successivo, e come giorno passiamo zero:
```js run
=======
Let's create a date using the next month, but pass zero as the day:
```js run demo
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Formalmente, le date cominciano da 1, ma tecnicamente possiamo passare qualsiasi numero, l'oggetto si aggiusterà automaticamente. Quindi quando gli passiamo 0, allora significherà "il giorno precedente al primo giorno del mese", in altre parole: "l'ultimo giorno del mese precedente".
