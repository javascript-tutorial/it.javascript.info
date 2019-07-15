importance: 4

---

# Quale giorno del mese era qualche giorno fa?

Create una funzione `getDateAgo(date, days)` che ritorna il giorno del mese di `days` giorni fa, a partire da `date`.

Ad esempio, se oggi è il 20, allora da `getDateAgo(new Date(), 1)` dovrebbe risultare il 19, e `getDateAgo(new Date(), 2)` dovrebbe ritornare 18.

<<<<<<< HEAD
Dovrebbe funzionare in maniera affidabile anche con i mesi/anni:
=======
Should work reliably for `days=365` or more:
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.S. La funzione non deve modificare l'oggetto `date`.
