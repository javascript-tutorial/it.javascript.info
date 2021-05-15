# Analizzate un'espressione

Un'espressione aritmetica consiste in 2 numeri e un operatore tra di essi, ad esempio:

- `1 + 2`
- `1.2 * 3.4`
- `-3 / -6`
- `-2 - 2`

L'operatore è uno fra: `"+"`, `"-"`, `"*"` o `"/"`.

Potrebbero esserci ulteriori spazi all'inizio, alla fine o tra gli elementi.

Create una funzione `parse(expr)` che riceva un'espressione e restituisca un array di 3 elementi:

1. Il primo numero.
2. L'operatore.
3. Il secondo numero.

Ad esempio:

```js
let [a, op, b] = parse("1.2 * 3.4");

alert(a); // 1.2
alert(op); // *
alert(b); // 3.4
```
