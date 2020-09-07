La risposta: prima `1`, poi `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

La chiamata ad `alert` non ritorna alcun valore. In altre parole, ritorna `undefined`.

<<<<<<< HEAD
1. Il primo OR `||` valuta il suo operando sinistro `alert(1)`. Questo mostra il primo messaggio con `1`.
2. La funzione `alert` ritorna `undefined`, quindi OR prosegue con il secondo operando alla ricerca di un valore vero.
3. Il secondo operando `2` è vero; quindi l'esecuzione si ferma, viene ritornato `2` e mostrato dall'alert esterno.
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Non ci sarà il `3`, perchè la valutazione non arriva a `alert(3)`.
