```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

La chiamata a `throttle(func, ms)` ritorna `wrapper`.

1. Durante la prima chiamata, il `wrapper` semplicemente esegue `func` ed imposta lo stato cooldown (`isThrottled = true`).
2. In questo stato, tutte le chiamate vengono memorizzate in `savedArgs/savedThis`. Va notato che sia il contesto che gli argomenti sono ugualmente importanti e dovrebbero essere memorizzati. Ne abbiamo bisogno contemporaneamente per riprodurre la chiamata.
3. Dopo che sono passati `ms` millisecondi, `setTimeout` scatta. Lo stato cooldown viene rimosso (`isThrottled = false`) e, nel caso fossero state ignorate delle chiamate, `wrapper` viene eseguito con gli ultimi argomenti e contesto memorizzati.

Il terzo passaggio non esegue `func`, ma `wrapper`, perché non abbiamo bisogno solo di eseguire `func`, ma anche di impostare nuovamente lo stato di cooldown ed il timeout per resettarlo.
