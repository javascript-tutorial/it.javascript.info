importance: 2

---

# Concatenazione

<<<<<<< HEAD
Qui abbiamo un oggetto `ladder` che ci consente di salire e scendere:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // shows the current step
    alert( this.step );
  }
};
```

<<<<<<< HEAD
Ora, se abbiamo bisogno di eseguire più chiamate in sequenza, possiamo:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
Modificare il codice di `up`, `down` e `showStep` per rendere le chiamate concatenabili, come in questo esempio:
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
Questo approccio è largamente utilizzato dalle librerie JavaScript.
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
