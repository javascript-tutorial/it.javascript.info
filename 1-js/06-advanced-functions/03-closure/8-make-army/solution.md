
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

<<<<<<< HEAD
Qui abbiamo riscritto `while` in `for`.
=======
![](lexenv-makearmy.svg)
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

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

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

Il ciclo `while`, come `for`, crea un nuovo Lexical Environment ad ogni esecuzone. Quindi siamo sicuri di ottener il giusto valore di `shooter`.

Copiamo `let j = i`. Questo rende il corpo del ciclo locale e copia su `j` il valore di `i`. Gli oggetti primitivi vengono copiati per valore, quindi ora abbiamo un copia indipendente di `i`, che appartiene all iterazione corrente.
