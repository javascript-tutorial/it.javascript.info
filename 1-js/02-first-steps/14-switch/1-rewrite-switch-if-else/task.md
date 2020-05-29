importance: 5

---

# Riscrivi il costrutto "switch" come un "if"

Riscrivi il codice utilizzando `if..else` in modo tale che corrisponda al seguente `switch`:

```js
switch (browser) {
  case 'Edge':
    alert( "You've got the Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Okay we support these browsers too' );
    break;

  default:
    alert( 'We hope that this page looks ok!' );
}
```

