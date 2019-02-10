# La soluzione più semplice non funziona

La più semplice, ma errata soluzione genera un valore compreso tra `min` e `max` e lo arrotonda:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

La funzione esegue correttamente, ma il risultato è logicamente errato. La probabilità di ottenere i limiti `min` e `max` è due volte minore di qualsiasi altro numero.

Se provate ad eseguire il codice sopra molte bolte, potrete notare che `2` apparirà molto spesso.

Questo accade perché `Math.round()` genera un numero casuale nell'intervallo `1..3` e lo arrotonda:

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

Ora possiamo vedere chiaramente che `1` ha due volte meno probabilità del `2`. Lo stesso vale per il `3`.

# La soluzione corretta

Ci sono diverse soluzioni funzionanti. Una di queste consiste nell'"aggiustare" i bordi dell'intervallo. Per assicurare i casi limite, possiamo generare valori casuali compresi tra `0.5 to 3.5`, questa tecnica fornirebbe all'intero intervallo la stessa probabilità:

```js run
*!*
function randomInteger(min, max) {
  // now rand is from  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Un modo alternativo potrebbe essere l'utilizzo di `Math.floor` su un numero casuale nell'intervallo `min` - `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Ora l'intero intervallo viene considerato allo stesso modo:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

L'intero intervall ha la stessa lunghezza, rendendo la distribuzione uniforme.
