importance: 5

---

# Proprietà della funzione dopo il bind

C'è un valore nella proprietà di una funzione. Cambierà dopo `bind`? Perché, o perché no?

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // quale sarà l'output? Perché?
*/!*
```

