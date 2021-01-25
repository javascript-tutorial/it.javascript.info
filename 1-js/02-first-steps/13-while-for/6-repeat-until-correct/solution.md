
```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

Il ciclo `do..while` si ripete fintanto che entrambe le condizioni non risultano vere:

1. Il controllo `num <= 100` -- controlla se il valore non risulti ancora maggiore di `100`.
2. Il controllo `&& num` diventa falso quando `num` è `null` o una stringa. Quindi il ciclo `while` termina.

P.S. Se `num` è `null` allora la condizione `num <= 100` è `true`, quindi senza la seconda condizione il ciclo non terminerebbe nel caso in cui l'utente prema CANCEL. Entrambe le condizioni sono necessarie.
