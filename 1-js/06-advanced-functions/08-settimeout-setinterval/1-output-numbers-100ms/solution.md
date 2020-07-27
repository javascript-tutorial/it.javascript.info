
Usando `setInterval`:

```js run
function stampaNumeri(da, a) {
  let attuale = da;

  let timerId = setInterval(function() {
    alert(attuale);
    if (attuale == a) {
      clearInterval(timerId);
    }
    attuale++;
  }, 1000);
}

// utilizzo:
stampaNumeri(5, 10);
```

<<<<<<< HEAD
Usando `setTimeout` ricorsivo:
=======
Using nested `setTimeout`:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2


```js run
function stampaNumeri(da, a) {
  let attuale = da;

  setTimeout(function vai() {
    alert(attuale);
    if (attuale < a) {
      setTimeout(vai, 1000);
    }
    attuale++;
  }, 1000);
}

// utilizzo:
stampaNumeri(5, 10);
```

Nota che in entrambe le soluzioni c'è un ritardo iniziale prima del primo output. La funzione viene eseguita la prima volta dopo `1000ms`.

Se vogliamo che la funzione venga eseguita subito, possiamo aggiugere una chiamata addizionale su di una linea separata, come questa:

```js run
function stampaNumeri(da, a) {
  let attuale = da;

  function vai() {
    alert(attule);
    if (attuale == a) {
      clearInterval(timerId);
    }
    attuale++;
  }

*!*
  vai();
*/!*
  let timerId = setInterval(vai, 1000);
}

stampaNumeri(5, 10);
```
