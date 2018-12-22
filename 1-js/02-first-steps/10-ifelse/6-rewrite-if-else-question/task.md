importance: 5

---

# Riscrivi 'if..else' con '?'

Riscrivi `if..else` utilizzando più volte l'operatore ternario `'?'`.

Per migliorare la leggibilità, è consigliato dividere il codice in più linee.

```js
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
```
