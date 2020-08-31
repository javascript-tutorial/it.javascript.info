Per ottener un match preciso con il costrutto `switch`, `if` deve utilizzare l'uguaglianza stretta `'==='`.

Per le stringhe fornite, un semplice `'=='` può bastare.

```js no-beautify
if(browser == 'Edge') {
  alert("You've got the Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Okay we support these browsers too' );
} else {
  alert( 'We hope that this page looks ok!' );
}
```

Da notare: il costrutto `browser == 'Chrome' || browser == 'Firefox' …` viene diviso in più linee per una maggiore leggibilità.

Il costrutto `switch` risulta però più pulito e descrittivo.
