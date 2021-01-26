La risposta è: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

Ogni iterazione del ciclo decrementa `i` di `1`. Il controllo `while(i)` interrompe il ciclo quando `i = 0`.

Quindi, gli step del ciclo sono ("loop unrolled"):

```js
let i = 3;

alert(i--); //mostra 3, decrementa i a 2

alert(i--) // mostra 2, decrementa i a 1

alert(i--) // mostra 1, decrementa i a 0

// finito, `i` è ora 0, che convertito a booleano è falso
```
