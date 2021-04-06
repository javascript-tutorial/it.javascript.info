
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

Successivamente, la chiamata `army[5]()` recupererà l'elemento `army[5]` dall'array (cioè una funzione) e la invocherà.

Ora perché tutte le funzione mostrano lo stesso risultato, `10`?

Questo accade perché non c'è alcuna variabile locale `i` interna alla funzione `shooter`. Quando questa funzione viene invocata, prende `i` dal lexical environment esterno.

Quale sarà il valore di `i`?

Se guardiamo il codice:

```js
function makeArmy() {
  ...
  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter function
      alert( i ); // dovrebbe mostrare il suo numero
    };
    shooters.push(shooter); // aggiunge function all'array
    i++;
  }
  ...
}
```

Possiamo notare che la funzione `shooter` viene creata nel lexical environment di `makeArmy()`. Ma quando invochiamo `army[5]()`, `makeArmy` ha già terminato l'esecuzione, ed il valore finale di `i` è `10` (`while` si ferma a `i=10`).

Il risultato è che tutte le funzioni `shooter` prendono lo stesso valore dal lexical envrironment esterno, in cui l'ultimo valore è `i=10`.

![](lexenv-makearmy-empty.svg)

Come puoi vedere qui sotto, a ogni iterazione del blocco `while {...}` viene creato un nuovo lexical environment. Quindi, per correggere, possiamo copiare il valore di `i` in una variabile all'interno del blocco `while {...}` stesso, così:

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    *!*
      let j = i;
    */!*
      let shooter = function() { // shooter function
        alert( *!*j*/!* ); // dovrebbe mostrare il suo numero
      };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

// Ora il codice funziona correttamente
army[0](); // 0
army[5](); // 5
```

Qui `let j = i` dichiara la variabile `j` "locale all'iterazione" e copia `i` al suo interno. I tipi primitivi vengo copiato "per valore", quindi otteniamo una copia indipendente di `i`, appartenente all'iterazione corrente del ciclo.

Shooters funziona correttamente, perché il valore di `i` è un po' più vicino. Non è nel Lexical Environment di `makeArmy()`, ma nel Lexical Environment che corrisponde all'iterazione corrente del ciclo:

![](lexenv-makearmy-while-fixed.svg)

Questo tipo di problema può anche essere evitato usando `for` all'inizio, in questo modo:

```js run demo
function makeArmy() {

  let shooters = [];

*!*
  for(let i = 0; i < 10; i++) {
*/!*
    let shooter = function() { // shooter function
      alert( i ); // dovrebbe mostrare il suo numero
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

Essenzialmente è la stessa cosa, perché ad ogni iterazione `for` viene generato un nuovo lexical environment, con la propria variabile `i`. Quindi `shooter` generato in ogni iterazione fa riferimento alla propria `i`, in quella stessa iterazione.

![](lexenv-makearmy-for-fixed.svg)
