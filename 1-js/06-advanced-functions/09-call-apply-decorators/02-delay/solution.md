La soluzione:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // mostra "test" dopo 1000ms
```

Qui, nota come viene utilizzata un arrow function. come sappiamo le arrow functions non hanno un proprio `this` nè `arguments`, quindi `f.apply(this, arguments)` prende `this` e `arguments` dal wrapper.

Se passassimo una funzione regolare, `setTimeout` la chiamerebbe senza argomenti e` this = window` (supponendo essere in un browser). 

Possiamo anche passare il `this` corretto usando una variabile intermedia, ma è un po' più complicato:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // memorizzalo in una variabile intermedia
    setTimeout(function() {
      f.apply(savedThis, args); // usalo qui
    }, ms);
  };

}
```
