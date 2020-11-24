importance: 4

---
# Formattare la data

Scrivete una funzione `formatDate(date)` che dovrebbe formattare `date` come segue:

- Se da `date` è passato meno di 1 secondo, allora ritorna `"right now"`.
- Altrimenti, se da `date` è passato meno di 1 minuto, allora ritorna `"n sec. ago"`.
- Altrimenti, se è passata meno di 1 ora, ritorna `"m min. ago"`.
- Altrimenti, l'intera data nel formato `"DD.MM.YY HH:mm"`. Ovvero: `"day.month.year hours:minutes"`, tutto nel formato due cifre,ad esempio `31.12.16 10:00`.

Un esempio:

```js
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
