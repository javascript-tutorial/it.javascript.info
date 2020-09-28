importance: 4

---

# Riscrivi la funzione utilizzando '?' o '||'

La seguente funzione ritorna `true` se il parametro `age` è maggiore di `18`.

Altrimenti richiede la conferma e ritorna il risultato.

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Did parents allow you?');
  }
}
```

Riscrivila, in modo che il comportamento sia uguale, ma senza utilizzare `if`, in una sola riga.

Fai due varianti di `checkAge`:

1. Utilizzando l'operatore `?`
2. Utilizzando OR `||`
