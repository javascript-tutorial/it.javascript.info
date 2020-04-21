
Ogni `setTimeout` verrà eseguito solo dopo che il codice corrente è completo.

La `i` sarà l'ultimo: `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// ipotizza che il tempo necessario a eseguire questa funzione sia >100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
