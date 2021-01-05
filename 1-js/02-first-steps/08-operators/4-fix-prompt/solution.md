La ragione è che il `prompt` ritorna delle stringhe .

Quindi le variabili hanno valori `"1"` e `"2"` rispettivamente.

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

Quello che dovremmo fare è convertire le stringhe in numeri prima che vengano sommate. Questo può essere fatto facendole precedere da `+` o usando `Number()`

Per esempio, appena prima di `prompt`:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

Oppure in `alert`:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

Usando `+` sia in modalità unaria che binaria. Sembra divertente vero?
