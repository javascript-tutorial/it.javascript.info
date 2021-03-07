Il metodo `date.getDay()` ritorna il numero del giorno della settimana, cominciando da Domenica.

Creiamo quindi un array con i giorni della settimana, che utilizzeremo per assegnare il numero della settimana al giorno corretto:

```js run demo
function getWeekDay(date) {
  let days = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Gen 2014
alert( getWeekDay(date) ); // FR
```
