importance: 5

---

# Riscrivi il costrutto "switch" come un "if"

Riscrivi il codice utilizzando `if..else` in modo tale che corrisponda al seguente `switch`:

```js
switch (browser) {
  case 'Edge':
    alert( "У вас браузер Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Мы поддерживаем и эти браузеры' );
    break;

  default:
    alert( 'Надеемся, что эта страница выглядит хорошо!' );
}
```
