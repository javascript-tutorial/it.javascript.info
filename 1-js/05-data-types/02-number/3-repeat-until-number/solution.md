
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Enter a number please?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

La soluzione risulta essere leggermente più complessa poiché è necessario trattare i casi `null`/righa vuota.

In questo modo possiamo quindi accettare input finché non viene inserito un "numero valido". Sia `null` (cancel) sia una riga vuota soddisfano questa condizione, poiché la loro forma numerica vale `0`.

Dopo esserci fermati, abbiamo bisogno di di gestire i casi `null` e righa vuota diversamente (ritornando `null`), poichè convertirli alla forma numerica li "trasformerrebbe" in `0`.

