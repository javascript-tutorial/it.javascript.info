Abbiamo bisogno di far "scorrere" 'intervallo da 0..1 a `min`.. `max`.

Questo può essere ottenuto con due passi:

1. Se moltiplichiamo un numero casuale compreso tra 0..1 per `max-min`, l'intervallo dei possibili valori crese da `0..1` a `0..max-min`.
2. Ora se aggiungiamo `min`, il possibile intervallo si estende da `min` a `max`.

La funzione:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

