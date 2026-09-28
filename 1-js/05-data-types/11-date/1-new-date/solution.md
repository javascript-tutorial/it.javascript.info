Il costruttore `new Date` utilizza l'ora locale di default. Quindi l'unica cosa da ricordare è che il conteggio dei mesi comincia da zero.

Quindi Febbraio è il numero 1.

Qui c'è un esempio con i numeri come componenti della data:

```js run
//new Date(anno, mese, data, ora, minuti, secondi, millisecondi)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
Potremmo anche creare una data da una stringa, così:

```js run
//new Date(datastring)
let d2 = new Date("2012-02-20T03:12");
alert( d2 );
```
