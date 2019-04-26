Abbiamo bisogno di far "scorrere" 'intervallo da 0..1 a `min`.. `max`.

Questo può essere ottenuto con due passi:

<<<<<<< HEAD
1. Se moltiplichiamo un numero casuale compreso tra 0..1 per `max-min`, l'intervallo dei possibili valori crese da `0..1` a `0..max-min`.
2. Ora se aggiungiamo `min`, il possibile intervallo diventa `min` - `max`.
=======
1. If we multiply a random number from 0..1 by `max-min`, then the interval of possible values increases `0..1` to `0..max-min`.
2. Now if we add `min`, the possible interval becomes from `min` to `max`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

La funzione:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

