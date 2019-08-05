Attraversiamo gli elementi dell'array:
- Per ogni elemento controlliamo se l'array risultante già lo contiene.
- Se lo troviamo, passiamo al prossimo, altrimenti lo aggiungiamo.

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

Il codice funziona, ma c'è un potenziale problmea di performace.

Il metodo `result.includes(str)` internamente attraversa l'array `result` e confronta ogni elemento con `str` per trovare una corrispondenza.

Quindi se ci sono `100` elementi in `result` e nessuna corrispondenza con `str`, attraverseremo l'intero array `result` eseguendo essattamente `100` confronti. Se l'array `result` è grande, ad esempio `10000`, ci sarebbero `10000` di confronti.

Non è propriamente un problema, perché il motore JavaScript è molto rapido, quindi un array grande `10000` è questione di pochi microsecondi.

Ma dovremo eseguire questo test per ogni elemento di `arr`, nel ciclo `for`.

Quindi se `arr.length` è `10000` avremmo qualcosa come `10000*10000` = 100 milioni di confronti. Sono molti.

Quindi la soluzione funziona bene solo con array di piccola taglia.

<<<<<<< HEAD
Più avanti nel capitolo <info:map-set-weakmap-weakset> vedremo come ottimizare questo metodo.
=======
Further in the chapter <info:map-set> we'll see how to optimize it.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
