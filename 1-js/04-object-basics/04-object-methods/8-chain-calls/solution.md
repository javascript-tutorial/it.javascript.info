La soluzione sta nel ritornare l'oggetto stesso ad ogni chiamata.

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
}

ladder.up().up().down().up().down().showStep(); // 1
```

Possiamo anche scrivere una singola chiamata per riga. Per catene molto lunghe diventa più leggibile:

```js
ladder
  .up()
  .up()
  .down()
  .up()
  .down()
  .showStep(); // 1
```
