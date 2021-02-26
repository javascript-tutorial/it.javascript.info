importance: 5

---

# Funzione associata come metodo

Quale sarà l'output?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

