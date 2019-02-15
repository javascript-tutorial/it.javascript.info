Da notare un dettaglio sottile ma importante. Non convertiamo immediatamente `value` ad un numero subito dopo averlo prelevato con `prompt`, perchè successivamente `value = +value` non saremo in grado di distinguere una stringa vuota da uno zero. Quindi è necessario eseguire la conversione in un secondo momento.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // should we cancel?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

