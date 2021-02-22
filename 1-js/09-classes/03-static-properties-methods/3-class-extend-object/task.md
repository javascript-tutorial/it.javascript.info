importance: 3

---

# Class extends Object?

Come ormai sappiamo, tutti gli oggetti, normalmente ereditano da `Object.prototype` ed hanno accesso ai metodi generici di `Object`, come `hasOwnProperty` etc.

Ad esempio:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// hasOwnProperty viene ereditato da Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

Ma se lo esplicitiamo noi in questo modo: `"class Rabbit extends Object"`, allora il risultato sarebbe diverso da un semplice `"class Rabbit"`?

Qual'è la differenza?

Qui vediamo un esempio (non funziona -- perché? è possibile sistemralo?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
