

```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```

Notate la somma unaria `+` prima di `prompt`. Converte immediatamente la stringa in numero.

Altrimenti `a` e `b` vengono interpretate come stringhe e la loro somma sarebbe la loro concatenazione, cioè : `"1" + "2" = "12"`.