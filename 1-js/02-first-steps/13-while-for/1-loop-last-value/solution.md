La risposta: `1`.

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

alert(i--); // shows 3, decreases i to 2

alert(i--) // shows 2, decreases i to 1

alert(i--) // shows 1, decreases i to 0

// done, while(i) check stops the loop
```
