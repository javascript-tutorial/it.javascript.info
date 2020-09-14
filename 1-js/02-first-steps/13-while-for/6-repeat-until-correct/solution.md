
```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

Il ciclo `do..while` si ripete fino a chè entrambe le condizioni non risultano vere:

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/6-repeat-until-correct/solution.md
1. Il controllo `num <= 100` -- controlla se il valore non risulta ancora maggiore di `100`.
2. Il controllo `&& num` è falso quando `num` è `null` o una stringa. Quindi il ciclo `while` termina.
=======
1. The check for `num <= 100` -- that is, the entered value is still not greater than `100`.
2. The check `&& num` is false when `num` is `null` or an empty string. Then the `while` loop stops too.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/02-first-steps/13-while-for/6-repeat-until-correct/solution.md

P.S. Se `num` è `null` allora la condizione `num <= 100` è `true`, quindi senza il secondo controllo il ciclo non terminerebbe nel caso in cui l'utente prema CANCEL. Entrambi i controlli sono necessari.
