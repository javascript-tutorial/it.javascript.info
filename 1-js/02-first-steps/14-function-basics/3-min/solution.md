Una soluzione utilizza `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

Un'altra soluzione con l'operatore `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. Nel caso di uguaglianza `a == b` non ha importanza quale si ritorna.