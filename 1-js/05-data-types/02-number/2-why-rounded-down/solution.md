Internamente il decimale `6.35` possiede una rappresentazione binaria infinita. Come sempre in questi casi, viene memorizzato con una perdita di precisione.

Vediamo infatti:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

La perdita di precisione può causare sia incremento che decremento del numero. In questo caso diventa leggermente più piccolo, questa è la spiegazione per cui viene arrotondato per difetto.

Mentre `1.35`?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

In questo caso la perdita di precisione rende il numero più grande, quindi viene arrotondato per eccesso.

**Come possiamo risolvere il problema di `6.35` se vogliamo che venga arrotondato correttamente?**

Dovremmo prima avvicinarlo il più possibile ad un numero intero:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

Notate che `63.5` non provoca perdita di precisione. Infatti la parte decimale `0.5` vale `1/2`. I decimali che sono potenze di `2` vengono rappresentati perfettamente nel sistema binario, ora possiamo quindi arrotondare il numero:


```js run
alert( Math.round(6.35 * 10) / 10 ); // 6.35 -> 63.5 -> 64(rounded) -> 6.4
```

