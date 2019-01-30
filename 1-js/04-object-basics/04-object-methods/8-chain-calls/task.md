importance: 2

---

# Concatenazione

Qui abbiamo un oggetto `ladder` che ci consente di salire e scendere:

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

Ora, se abbiamo bisogno di eseguire più chiamate in sequenza, possiamo:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Modificare il codice di `up` e `down` per rendere le chiamate concatenabili, come in questo esempio:

```js
ladder.up().up().down().showStep(); // 1
```

Questo approcio è largamente utilizzato dalle librerie JavaScript.
