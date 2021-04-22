Risposta: `pattern:\d\d[-:]\d\d`.

```js run
let regexp = /\d\d[-:]\d\d/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30
```

Fate attenzione al fatto che il trattino `pattern:'-'` ha un significato speciale tra le parentesi quadre, ma solo tra gli altri caratteri, non quando è all'inizio o alla fine, quindi non c'è bisogno dell'escape.
