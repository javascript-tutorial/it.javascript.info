importance: 5

---

# Calcolo del deposito

Create una interfaccia che permetta di inserire una somma di un deposito bancario e la percentuale, e che calcoli a quanto ammonteranno dopo un certo periodo di tempo.

La demo:

[iframe src="solution" height="350" border="1"]

Ogni modifica all'input dovrebbe essere processata immediatamente.

La formula è:
```js
<<<<<<< HEAD
// initial: la somma iniziale di denaro
// interest: ad esempio 0.05 significa 5% annualer
// years: quanti anni attendere
let result = Math.round(initial * (1 + interest * years));
=======
// initial: the initial money sum
// interest: e.g. 0.05 means 5% per year
// years: how many years to wait
let result = Math.round(initial * (1 + interest) ** years);
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
```
