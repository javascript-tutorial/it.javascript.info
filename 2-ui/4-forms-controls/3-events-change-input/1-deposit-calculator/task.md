importance: 5

---

# Calcolo del deposito

Creare una interfaccia che permetta di inserire una somma di un deposito bancario e la percentuale, e che calcoli a quanto ammonteranno dopo un certo periodo di tempo.

La demo:

[iframe src="solution" height="350" border="1"]

Ogni modifica all'input dovrebbe essere processata immediatamente.

La formula è:
```js
// initial: la somma iniziale di denaro
// interest: ad esempio 0.05 significa 5% annualer
// years: quanti anni attendere
let result = Math.round(initial * (1 + interest * years));
```
