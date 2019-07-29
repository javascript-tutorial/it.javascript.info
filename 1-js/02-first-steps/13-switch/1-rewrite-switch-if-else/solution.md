Per ottener un match preciso con il costrutto `switch`, `if` deve utilizzare l'uguaglianza stretta `'==='`.

Per le stringhe fornite, un semplice `'=='` può bastare.

```js no-beautify
if(browser == 'Edge') {
  alert("У вас браузер Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Мы поддерживаем и эти браузерыo' );
} else {
  alert( 'Надеемся, что эта страница выглядит хорошо!' );
}
```

Da notare: il costrutto `browser == 'Chrome' || browser == 'Firefox' …` viene diviso in più linee per una maggiore leggibilità.

Il costrutto `switch` risulta però più pulito e descrittivo.
