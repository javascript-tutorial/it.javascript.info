Proviamo come prima cosa una soluzione ricorsiva.

La successione di Fibonacci è ricorsiva per definizione:

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // will be extremely slow!
```

...Ma per valori di `n` elevati risulta essere molto lenta. Ad esempio, `fib(77)` potrebbe esaurire completamente le risorse della CPU.

Questo accade perché la funzione esegue troppo sotto-chiamate. Gli stessi valori vengono rivalutati più volte.

Ad esempio, osserviamo una parte del calcolo di `fib(5)`:

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

Qui possiamo vedere che il valore di `fib(3)` è richiesto sia per `fib(5)` che per `fib(4)`. Quindi `fib(3)` verrà chiamato e valutato due volte .

L'albero di ricorsione completo:

![fibonacci recursion tree](fibonacci-recursion-tree.svg)

Possiamo vedere chiaramente che `fib(3)` viene valutato due volte, mentre `fib(2)` viene valutato 3 volte. Il numero di computazioni eseguite cresce molto rapidamente, più di `n`, rendendo `n=77` un operazione molto lenta. 

Possiamo ottimizzare tenendo a mente i valori già valutati: se abbiamo già calcolato `fib(3)`, possiamo semplicemente riutilizzarlo per i calcoli successivi.

Un'altra possibilità è di utilizzare un approccio iterativo.

Piuttosto che partire da `n` e scendere ai valori inferiori, possiamo eseguire un ciclo partendo da `1` e `2`, e proseguire per `fib(3)` come la loro somma, poi `fib(4)` come somma dei due risultati precedenti, successivamente `fib(5)` e cosi via, fino ad arrivare al valore desiderato. Ad ogni step sarà necessario ricordare solamente i due valori precedenti.

Vediamo quindi il nuovo algoritmo.

Inizio:

```js
// a = fib(1), b = fib(2), these values are by definition 1
let a = 1, b = 1;

// get c = fib(3) as their sum
let c = a + b;

/* we now have fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/
```

Vogliamo ottenere `fib(4) = fib(2) + fib(3)`.

Quindi scambiamo le variabili: `a,b` diventeranno `fib(2),fib(3)`, e `c` conterrà la loro somma:

```js no-beautify
a = b; // now a = fib(2)
b = c; // now b = fib(3)
c = a + b; // c = fib(4)

/* now we have the sequence:
   a  b  c
1, 1, 2, 3
*/
```

Il prossimo passo otterrà un altro numero della successione:

```js no-beautify
a = b; // now a = fib(3)
b = c; // now b = fib(4)
c = a + b; // c = fib(5)

/* now the sequence is (one more number):
      a  b  c
1, 1, 2, 3, 5
*/
```

...E cosi via fino al raggiungimento del numero desiderato. Questo approccio risulta essere più rapido di quello ricorsivo e si evitano duplicazioni di calcoli.

Il codice completo:

```js run
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
```

Il ciclo inizia con `i=3`, perché il primo e secondo valore della successione vengono memorizzati in precedenza nelle variabili `a=1`, `b=1`.

Questo approccio viene chiamato [programmazione dinamica bottom-up](https://en.wikipedia.org/wiki/Dynamic_programming).
