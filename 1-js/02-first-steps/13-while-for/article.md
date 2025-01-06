# Cicli: while e for

Abbiamo spesso bisogno di eseguire la stessa azione più volte di fila.

Ad esempio, quando abbiamo bisogno di ritornare, una dopo l'altra, della merce da una lista; o anche solo eseguire lo stesso codice per ogni numero da 1 a 10.

I *cicli* sono un modo di ripetere una stessa parte di codice più volte.

<<<<<<< HEAD
## Il ciclo "while" 
=======
```smart header="The for..of and for..in loops"
A small announcement for advanced readers.

This article covers only basic loops: `while`, `do..while` and `for(..;..;..)`.

If you came to this article searching for other types of loops, here are the pointers:

- See [for..in](info:object#forin) to loop over object properties.
- See [for..of](info:array#loops) and [iterables](info:iterable) for looping over arrays and iterable objects.

Otherwise, please read on.
```

## The "while" loop
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il ciclo `while` ha la seguente sintassi:

```js
while (condition) {
  // codice
  // "corpo del ciclo"
}
```

Fino a che la `condition` è `true`, il `code` nel corpo del ciclo viene eseguito.

Ad esempio, il ciclo qui sotto mostra `i` fino a che `i < 3`:

```js run
let i = 0;
while (i < 3) { // mostra 0, poi 1, poi 2
  alert( i );
  i++;
}
```

Un'esecuzione del codice nel corpo del ciclo viene chiamata *un'iterazione*. Il ciclo nell'esempio sopra fa tre iterazioni.

Se nell'esempio sopra non ci fosse `i++`, il ciclo si ripeterebbe per sempre; in teoria: in pratica, il browser ha dei metodi per bloccare questi cicli. In JavaScript server-side è necessario arrestare il processo.

Qualsiasi espressione o variabile può essere utilizzata come condizione di un ciclo, non solo un confronto come `i < 3`. Il ciclo `while` converte le espressioni al tipo booleano, che vengono poi valutate.

Ad esempio, un modo più breve di scrivere `while (i != 0)` potrebbe essere `while (i)`:

```js run
let i = 3;
*!*
while (i) { // quando i diventa 0, la condizione diventa falsa e il ciclo si conclude
*/!*
  alert( i );
  i--;
}
```

````smart header="Le parentesi non sono richieste per un corpo composto da una singola linea di codice"
Se il corpo del ciclo ha una singola istruzione, possiamo omettere le parentesi `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## Il ciclo "do..while" 

La condizione da controllare può essere messa *dopo* il corpo del ciclo. Lo si fa utilizzando la sintassi `do..while`:

```js
do {
  // corpo del ciclo
} while (condition);
```

Il ciclo esegue prima il corpo, poi controlla la condizione; se questa è vera, esegue nuovamente il corpo.

Ad esempio:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Questa tipo di sintassi viene usata molto raramente, ad eccezione dei casi in cui si vuole che il corpo del ciclo venga eseguito **almeno una volta**. Questo avviene ancor *prima* del controllo della condizione. La forma più comune, comunque, è `while(…) {…}`.

## Il ciclo "for" 

Il ciclo `for` è forse il più utilizzato.

La sua sintassi è:

```js
for (begin; condition; step) {
  // ... corpo del ciclo ...
}
```
Cerchiamo ora di capire, tramite esempi, il suo funzionamento. 
Il ciclo sotto esegue `alert(i)` fino a quando la variabile `i` è più piccola di 3. A ogni iterazione, il valore di `i` aumenta di 1.

```js run
for (let i = 0; i < 3; i++) { // mostra 0, poi 1, poi 2
  alert(i);
}
```

Esaminiamo l'istruzione `for` parte per parte:

| Parte |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `i = 0`    | Viene eseguito una volta sola, all'entrata nel ciclo.                          |
| condition | `i < 3`| Viene controllata prima di ogni iterazione; se falsa, il ciclo si interrompe.|
| body | `alert(i)`| Viene eseguito fino a quando la condizione è vera.
| step| `i++`      | Viene eseguito ad ogni iterazione, dopo il corpo, fintato che la condizione è `true`.|

L'iterazione, generalmente, funziona nel modo seguente:
```
Eseguiamo begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...
```

Ricapitolando: `begin` viene eseguito per primo, *una volta sola*; subito dopo, inizia l'iterazione. Se `condition`, dopo la conversione a booleano, è `true`, vengono eseguiti `body` e `step`; se è `false`, il ciclo si interrompe. 

Se i cicli vi sono nuovi, forse vi sarà d'aiuto tornare indietro agli esempi e provare a riprodurli, passo passo, su un foglio di carta.

Ecco esattamente, in dettaglio, ciò che avviene nel nostro codice:

```js
// for (let i = 0; i < 3; i++) alert(i)

// inizia l'esecuzione, viene dichiarata la variabile i
let i = 0
// if(condition == true) → esegue il corpo e avanza
if (i < 3) { alert(i); i++ }
// if(condition == true) → esegue il corpo e avanza
if (i < 3) { alert(i); i++ }
// if(condition == true) → esegue il corpo e avanza
if (i < 3) { alert(i); i++ }
// ...si conclude, perché ora i == 3 e la condizione i < 3 == false
```

````smart header="Dichiarazioni di variabili inline"
Qui il "counter", che utilizzeremo nella nostra *condition*, è una variabile: `i`. Viene dichiarata all'interno del corpo del ciclo ed è accessibile solo al suo interno. Questo tipo di espressione si chiama "dichiarazione di una variabile *inline*". 

```js run
for (*!*let*/!* i = 0; i < 3; i++) { //'i' è definito, e accessibile, solo dentro il corpo del ciclo
  alert(i); // 0, 1, 2
}
alert(i); // errore, nessuna variabile 'i' fuori dal corpo del ciclo
```

Invece di definire una nuova variabile, possiamo utilizzarne una già esistente:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // utilizza una variabile esistente
  alert(i); // 0, 1, 2
}

alert(i); // 3; la variabile `i` è accessibile (è stata dichiarata fuori dal corpo del ciclo)
```
````

<<<<<<< HEAD

### Parti opzionali
=======
### Skipping parts
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ogni parte del ciclo `for` è opzionale.

Ad esempio, possiamo omettere `begin` se non abbiamo bisogno di una variabile per la nostra `condition`.

Come in questo esempio:

```js run
let i = 0; // la variabile 'i' è stata già dichiarata e assegnata

for (; i < 3; i++) { // saltiamo "begin"
  alert( i ); // 0, 1, 2
}
```

Possiamo anche rimuovere lo`step`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ ); //la variabile 'i' viene incrementata nel corpo del ciclo
}
```

Il ciclo, nell'esempio sopra, diventa uguale ad un `while (i < 3)`.

Possiamo rimuovere tutto, ma questo risulterebbe in un ciclo infinito:

```js
for (;;) {
  // esegue il corpo del ciclo senza mai terminare
}
```

Nota che le due `;` del ciclo `for` devono essere presenti, altrimenti vi sarebbe un errore di sintassi.

## Interrompere un ciclo 

Normalmente un ciclo termina quando la condizione diventa falsa.

Ma è possibile forzare l'uscita in qualsiasi momento. C'è una speciale direttiva per fare questo: `break`.

Ad esempio, il ciclo sotto richiede all'utente una serie di numeri, e termina quando nessun numero viene inserito: 

```js run
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

La direttiva `break` viene attivata alla linea `(*)`, quando l'utente inserisce una linea vuota o annulla la procedura di input. Questo ferma il ciclo immediatamente, passando il controllo alla prima linea successiva al ciclo. In questo caso, `alert`.

La combinazione "ciclo infinito + `break` quando necessario" è utile in situazioni in cui la condizione deve essere verificata in un punto differente dall'inizio/fine del ciclo (questo può avvenire in un qualsiasi altro punto del corpo).

## Vai alla prossima iterazione [#continue]

La direttiva `continue` è una versione leggera del `break`. Non blocca l'intero ciclo: interrompe solo l'iterazione corrente e forza il ciclo a passare all'iterazione successiva.

Possiamo utilizzarla se abbiamo finito con le operazioni che ci interessano e vogliamo passare all'iterazione seguente.

Il ciclo sotto usa `continue` per ritornare *solo* i valori dispari:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // se condizione == true (`i` è pari) salta la restante parte di codice a passa alla prossima iterazione
  *!*if (i % 2 == 0) continue;*/!*
  //se `i` è dispari, esegui codice
  alert(i); // 1, poi 3, 5, 7, 9 (nota le due condizioni sopra: abbiamo solo i con un valore dispari, e inferiore a 10)
}
```

Per i valori pari di `i` la direttiva `continue` interrompe l'esecuzione del corpo e passa il controllo alla successiva iterazione del `for` (`i` viene incrementato, poi si controlla che la condizione sia true). Di conseguenza, l'`alert` viene seguito solo con i valori dispari.

````smart header="La direttiva `continue` aiuta a diminuire i livelli di nidificazione"
Un ciclo che mostra *solo* valori dispari potrebbe essere:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) { //la condizione == 0 quando un numero è pari; 0, ricordiamo, convertito a booleano, è false
    alert( i );
  }

}
```

<<<<<<< HEAD
Ovviamente possiamo raccogliere il codice in un blocco `if` piuttosto di usare `continue`. Dal punto di vista tecnico l'esempio sopra è identico a quello che lo precede, che invece utilizza `continue`. Nell'esempio sopra il codice dentro il corpo di `if` è una semplice chiamata ad `alert`; ma se il codice fosse più lungo di un paio di righe si rischierebbe di perdere in leggibilità.
=======
From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an `if` block instead of using `continue`.

But as a side effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

````warn header="Vietato `break/continue` alla desta di '?'"
Va notato che questo costrutto sintattico non è un espressione e non può quindi essere utilizzato con l'operatore ternario `?`. In particolare, direttive come  `break/continue` non sono permesse.

Ad esempio, se prendiamo questo codice:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...E lo riscriviamo utilizzando l'operatore ternario:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue non è consentito qui
```

...Questo smetterà di funzionare. Un codice come quello sopra risulterà in un errore di sintassi:


Questa è solo un'altra ragione per cui non utilizzare l'operatore ternario `?` piuttosto di `if`.
````

## Etichette break/continue

Qualche volta abbiamo bisogno di uscire da una serie di cicli annidati in un *colpo solo*.

Ad esempio, nel codice sotto abbiamo due cicli `for` che usano `(i, j)` nelle proprie condizioni; fino a quando le variabili sono minori di 3, il ciclo viene eseguito; dentro al ciclo più interno un prompt mostra le due variabili 
`(i, j)` in una stringa di testo:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // come potremmo fare per uscire di qui e proseguire verso Done (sotto)?

  }
}

alert('Done!');
```

Abbiamo bisogno di un modo per bloccare il processo se l'utente annulla l'input.

Un semplice `break` dopo la variabile `input` interromperebbe solo il ciclo più interno. Questo non è sufficiente. I *label* ci vengono in soccorso.

<<<<<<< HEAD
Un *label* ("etichetta") è un identificatore seguito da ":" e da un ciclo:
=======
A *label* is an identifier with a colon before a loop:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js
labelName: for (...) {
  ...
}
```

L'istruzione `break <labelName>` interrompe il ciclo e passa il controllo a *label*.

Come nell'esempio:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // se si ha una stringa vuota, allora si esce da entrambi i cicli
    if (!input) *!*break outer*/!*; // (*)

    // fa qualcosa con i valori...
  }
}

alert('Done!');
```

Nel codice sopra `break outer` interrompe il ciclo e va all'etichetta chiamata `outer`.

Quindi il controllo va da `(*)` a `alert('Done!')`.

Possiamo anche spostare l'etichetta in un'altra linea:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

Anche la direttiva `continue` può essere utilizzata con un'etichetta. In questo caso l'esecuzione salta alla prossima iterazione del ciclo con quell'etichetta.

````warn header="I *label* non equivalgono a \"goto\""
I *label* non permettono di saltare in un punto arbitrario del codice.

<<<<<<< HEAD
Ad esempio, non è possibile:
=======
For example, it is impossible to do this:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js
break label;  // non salta all'etichetta sotto

label: for (...)
```

<<<<<<< HEAD
La direttiva `break` deve essere all'interno del blocco di codice. Tecnicamente l'etichettatura funzionerà con qualsiasi blocco di codice, ad esempio:
=======
A `break` directive must be inside a code block. Technically, any labelled code block will do, e.g.:

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js
label: {
  // ...
  break label; // funziona
  // ...
}
```

...Comunque, nel 99.9% dei casi, `break` viene usato nei cicli, come abbiamo visto negli esempi precedenti.

La chiamata a `continue` è possibile solo dall'interno di un ciclo
````

## Riepilogo

Abbiamo visto tre tipi di cicli:

- `while` -- La condizione viene controllata prima di ogni iterazione.
- `do..while` -- La condizione viene controllata dopo una prima iterazione.
- `for (;;)` -- La condizione viene controllata prima di ogni iterazione; sono possibili altre condizioni all'interno del ciclo.

Per creare un ciclo infinito, si usa il costrutto `while(true)`. Questo tipo di cicli, come tutti gli altri, possono essere interrotti con la direttiva `break`.

Se non si ha più intenzione di fare nulla nell'iterazione corrente e si vuole quindi saltare alla successiva, possiamo usare la direttiva `continue`.

`break/continue` supportano le etichette prima del ciclo. Un etichetta è l'unico modo per `break/continue` di uscire da cicli annidati ed arrivare ciclo esterno.
