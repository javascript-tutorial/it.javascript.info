Risposta: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

Il contesto di una funzione associata e fisso. Non esiste alcun modo di cambiarlo successivamente.

Quindi, anche se eseguiamo `user.g()`, la funzione originale verrà chiamata con `this=null`.
