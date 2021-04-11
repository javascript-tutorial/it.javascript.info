importance: 5

---

# Dove andrà a scrivere?

Abbiamo un oggetto `rabbit` che eredita da `animal`.

Se invochiamo `rabbit.eat()`, quale oggetto riceverà la proprietà `full`: `animal` o `rabbit`? 

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
