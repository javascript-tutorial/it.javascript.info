Il costruttore `new Date` utilizza l'ora locale di default. Quindi l'unica cosa da ricordare è che il conteggio dei mesi comincia da zero.

Quindi Febbraio è il numero 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
