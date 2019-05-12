
1. Per far si che che funzioni *comunque*, il risultato di `sum` deve essere una funzione.
2. Questa funzione deve tenere in memoria il valore corrente.
3. Come richiesto dall'esercizio, la funzione deve essere convertita in numero quando viene utilizzata con `==`. Le funzioni sono oggetti, quindi la conversione avviene come descritto nel capitolo <info:object-toprimitive>, e possiamo fornire un nostro metodo che si occupi di trasformare la funzione in tipo numerico.

Il codice:

```js run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Da notare che la funzione `sum` esegue una sola volta. Ritorna una funzione `f`.

Poi, in ogni chiamata successiva, `f` aggiunge il suo parametro alla somma presente in `currentSum`, e ritorna se stessa.

**Non c'è ricorsione nell'ultima linea di `f`.**

Una ricorsione appare in questo modo:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- chiamata ricorsiva
}
```

Nel nostro caso, semplicemente ritorniamo una funzione, senza effettuare alcuna chiamata:

```js
function f(b) {
  currentSum += b;
  return f; // <-- non viene invocata, ritorna solamente se stessa
}
```

Questa `f` verrà utilizzata dalla prossiama chiamata, e nuovamente ritornerà se stessa, tutte le volte che sarà necessario. Successivamente, quando la utilizzeremo come numero o stringa -- `toString` ritorna la `currentSum`. Possiamo anche utilizzare `Symbol.toPrimitive` o `valueOf` per la conversione.
