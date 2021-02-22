

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// controlla
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // mostra 3 dopo 1 secondo
```

Da notare: utilizziamo `this` in `f.apply` per far sì che il nostro decorator funzioni con i metodi degli oggetti.

Quindi se la nostra funzione viene invocata come metodo di un oggeto, allora `this` viene passato al metodo originale `f`.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
