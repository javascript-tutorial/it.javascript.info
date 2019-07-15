<<<<<<< HEAD
Il costruttore `new Date` utilizza l'ora locale di default. Quindi l'unica cosa da ricordare è che il conteggio dei mesi comincia da zero.
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

Quindi Febbraio è il numero 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
