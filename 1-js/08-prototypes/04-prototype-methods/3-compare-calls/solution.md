
La prima chiamata ha `this == rabbit`, le altre hanno `this` uguale a `Rabbit.prototype`, perché è l'oggetto prima del punto.

Quindi, solamente la prima chiamata mostra `Rabbit`, le altre mostrano `undefined`:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
