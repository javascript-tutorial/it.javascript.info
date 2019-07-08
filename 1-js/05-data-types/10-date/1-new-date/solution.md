<<<<<<< HEAD
Il costruttore `new Date` utilizza l'ora locale di default. Quindi l'unica cosa da ricordare è che il conteggio dei mesi comincia da zero.
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

Quindi Febbraio è il numero 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
