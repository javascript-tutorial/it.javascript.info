
Esaminiamo cosa accade dentro `makeArmy`, e la soluzioni ci apparirà ovvia.

1. Crea un array vuoto `shooters`:

    ```js
    let shooters = [];
    ```
2. Lo riempie con un ciclo `shooters.push(function...)`.

    Ogni elemento è una funzione, quindi l'array finale risulterà essere:

    ```js no-beautify
    shooters = [
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); }
    ];
    ```

<<<<<<< HEAD
3. L'array viene ritornato dalla funzione.

Successivamente, la chiamata `army[5]()` otterrà l'elemento `army[5]` dall'array (cioè una funzione) e la invocherà.

Ora perchè tutte le funzione mostrano lo stesso risultato?

Questo accade perchè non c'è alcuna variabile locale `i` interna alla funzione `shooter`. Quando questa funzione viene invocata, prende `i` dal lexical environment esterno.

Quale sarà il valore di `i`?

Se guardiamo il codice:

```js
function makeArmy() {
  ...
  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    ...
  }
  ...
}
```

...Notiamo che si trova nel lexival environment associato a `makeArmy()`. Ma quando invochiamo `army[5]()`, `makeArmy` ha già terminato l'esecuzione, e `i` possiede l'ultimo valore: `10`.

Il risultato è che tutte le funzioni `shooter` la prendono dallo stesso lexical envrironment esterno, in cui l'ultimo valore è `i=10`.

Questo può essere sistemato molto facilmente:

```js run
function makeArmy() {

  let shooters = [];

*!*
  for(let i = 0; i < 10; i++) {
*/!*
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```
Ora funziona correttamente, perché ogni volta che viene eseguito il blocco di codice `for (..) {...}`, viene creato un nuovo Lexical Environment, con il corrispondente valore `i`.

Quindi, il valore di `i` ora si trova più "vicino". Non più nel lexical environment di `makeArmy()`, ma in quello del corrispondente ciclo. Uno `shooter` preleva il valore esattamente da dove è stato creato.

![](lexenv-makearmy.svg)

Qui abbiamo riscritto `while` in `for`.

Eì possibile farlo in un altro modo, vediamolo per capirlo meglio:


```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
*!*
    let j = i;
*/!*
    let shooter = function() { // shooter function
      alert( *!*j*/!* ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}
=======
3. The array is returned from the function.
    
    Then, later, the call to any member, e.g. `army[5]()` will get the element `army[5]` from the array (which is a function) and calls it.
    
    Now why do all such functions show the same value, `10`?
    
    That's because there's no local variable `i` inside `shooter` functions. When such a function is called, it takes `i` from its outer lexical environment.
    
    Then, what will be the value of `i`?
    
    If we look at the source:
    
    ```js
    function makeArmy() {
      ...
      let i = 0;
      while (i < 10) {
        let shooter = function() { // shooter function
          alert( i ); // should show its number
        };
        shooters.push(shooter); // add function to the array
        i++;
      }
      ...
    }
    ```
    
    We can see that all `shooter` functions are created in the lexical environment of `makeArmy()` function. But when `army[5]()` is called, `makeArmy` has already finished its job, and the final value of `i` is `10` (`while` stops at `i=10`).
    
    As the result, all `shooter` functions get the same value from the outer lexical environment and that is, the last value, `i=10`.
    
    ![](lexenv-makearmy-empty.svg)
    
    As you can see above, on each iteration of a `while {...}` block, a new lexical environment is created. So, to fix this, we can copy the value of `i` into a variable within the `while {...}` block, like this:
    
    ```js run
    function makeArmy() {
      let shooters = [];
    
      let i = 0;
      while (i < 10) {
        *!*
          let j = i;
        */!*
          let shooter = function() { // shooter function
            alert( *!*j*/!* ); // should show its number
          };
        shooters.push(shooter);
        i++;
      }
    
      return shooters;
    }
    
    let army = makeArmy();
    
    // Now the code works correctly
    army[0](); // 0
    army[5](); // 5
    ```
    
    Here `let j = i` declares an "iteration-local" variable `j` and copies `i` into it. Primitives are copied "by value", so we actually get an independent copy of `i`, belonging to the current loop iteration.
    
    The shooters work correctly, because the value of `i` now lives a little bit closer. Not in `makeArmy()` Lexical Environment, but in the Lexical Environment that corresponds to the current loop iteration:
    
    ![](lexenv-makearmy-while-fixed.svg)
    
    Such a problem could also be avoided if we used `for` in the beginning, like this:
    
    ```js run demo
    function makeArmy() {
    
      let shooters = [];
    
    *!*
      for(let i = 0; i < 10; i++) {
    */!*
        let shooter = function() { // shooter function
          alert( i ); // should show its number
        };
        shooters.push(shooter);
      }
    
      return shooters;
    }
    
    let army = makeArmy();
    
    army[0](); // 0
    army[5](); // 5
    ```
    
    That's essentially the same, because `for` on each iteration generates a new lexical environment, with its own variable `i`. So `shooter` generated in every iteration references its own `i`, from that very iteration.
    
    ![](lexenv-makearmy-for-fixed.svg)
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

Il ciclo `while`, come `for`, crea un nuovo Lexical Environment ad ogni esecuzone. Quindi siamo sicuri di ottener il giusto valore di `shooter`.

Copiamo `let j = i`. Questo rende il corpo del ciclo locale e copia su `j` il valore di `i`. Gli oggetti primitivi vengono copiati per valore, quindi ora abbiamo un copia indipendente di `i`, che appartiene all iterazione corrente.
