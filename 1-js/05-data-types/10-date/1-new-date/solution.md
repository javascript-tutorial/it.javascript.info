<<<<<<< HEAD
Il costruttore `new Date` utilizza l'ora locale di default. Quindi l'unica cosa da ricordare è che il conteggio dei mesi comincia da zero.
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Quindi Febbraio è il numero 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
