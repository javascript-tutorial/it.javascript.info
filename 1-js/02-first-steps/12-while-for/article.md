# Cicli: while e for

<<<<<<< HEAD
Abbiamo spesso bisogno di eseguire la stessa azione più volte di fila.

Ad esempio, quando abbiamo bisogno di ritornare della merce da una lista una dopo l'altra. O anche solo eseguire lo stesso codice per ogni numero da 1 a 10.

I *Cicli* sono un modo di ripetere la stessa parte di codice più volte.
=======
We often need to repeat actions.

For example, outputting goods from a list one after another or just running the same code for each number from 1 to 10.

*Loops* are a way to repeat the same code multiple times.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Il ciclo "while" 

Il ciclo `while` ha la seguente sintassi:

```js
while (condition) {
  // code
  // so-called "loop body"
}
```

Fino a che la `condition` è `true`, il `code` dal corpo del ciclo viene eseguito.

Ad esempio, il ciclo qui sotto stampa `i` fino a che `i < 3`:

```js run
let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  alert( i );
  i++;
}
```

Una singola esecuzione del corpo del ciclo viene chiamata *un iterazione*. Il ciclo nell'esempio sopra fa tre iterazioni.

<<<<<<< HEAD
Se nell'esempio sopra non ci fosse `i++`, il ciclo si ripeterebbe per sempre (in teoria). Nella pratica, il browser ha dei metodi per bloccare questi cicli, con JavaScript server-side è necessario arrestare il processo.

Qualsiasi espressione o variabile può essere utilizzata come condizione di un ciclo, non solo un confronto. Le espressioni vengono valutate e convertite al tipo bool dal ciclo `while`.

Ad esempio, un modo più breve di scrivere `while (i != 0)` potrebbe essere `while (i)`:
=======
If `i++` was missing from the example above, the loop would repeat (in theory) forever. In practice, the browser provides ways to stop such loops, and in server-side JavaScript, we can kill the process.

Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by `while`.

For instance, a shorter way to write `while (i != 0)` is `while (i)`:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let i = 3;
*!*
while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
*/!*
  alert( i );
  i--;
}
```

````smart header="Le parentesi non sono richieste per un corpo composto da una singola linea"
Se il corpo del ciclo ha una singola istruzione, possiamo omettere le parentesi `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## Il ciclo "do..while" 

La condizione da controllare può essere messa *dopo* il corpo del ciclo utilizzando la sintassi `do..while`:

```js
do {
  // loop body
} while (condition);
```

<<<<<<< HEAD
Il ciclo esegue prima il corpo, poi controlla la condizione, se questa è vera, esegue nuovamente il corpo.
=======
The loop will first execute the body, then check the condition, and, while it's truthy, execute it again and again.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

<<<<<<< HEAD
Questa tipo di sintassi viene usata molto raramente ad eccezione dei casi in cui si vuole che il corpo del ciclo venga eseguito **almeno una volta** senza controllo sulla condizione. La forma più utilizzata è comunque: `while(…) {…}`.
=======
This form of syntax should only be used when you want the body of the loop to execute **at least once** regardless of the condition being truthy. Usually, the other form is preferred: `while(…) {…}`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Il ciclo "for" 

<<<<<<< HEAD
Il ciclo `for` è spesso il più utilizzato.
=======
The `for` loop is the most commonly used loop.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

La sua forma è del tipo:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

Cerchiamo ora di capire il significato tramite degli esempi. Il ciclo sotto esegue `alert(i)` per `i` da `0` fino a (ma non incluso) `3`:

```js run
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
  alert(i);
}
```

<<<<<<< HEAD
Esaminiamo l'istruzione `for` parte per parte:
=======
Let's examine the `for` statement part-by-part:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

| Parte |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
<<<<<<< HEAD
| begin | `i = 0`    | Viene eseguito una volta all'entrata nel ciclo.                          |
| condition | `i < 3`| Viene controllata prima di ogni iterazione del ciclo, se fallisce il ciclo si interrompe.|
| step| `i++`      | Viene eseguito prima del corpo ad ogni iterazione, ma dopo il controllo della condizione.|
| body | `alert(i)`| Viene eseguito fino a che vale la condizione.
=======
| begin | `i = 0`    | Executes once upon entering the loop.                                      |
| condition | `i < 3`| Checked before every loop iteration. If false, the loop stops.              |
| step| `i++`      | Executes after the body on each iteration but before the condition check. |
| body | `alert(i)`| Runs again and again while the condition is truthy.                         |


The general loop algorithm works like this:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
```
Eseguiamo begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...
```

<<<<<<< HEAD
Se i cicli vi sono nuovi, allora forse vi sarà d'aiuto tornare indietro agli esempi e provare a riprodurli passo-passo su un foglio di carta.

Questo è quello che succede esattamente nel nostro codice:
=======
If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.

Here's exactly what happens in our case:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
// for (let i = 0; i < 3; i++) alert(i)

// run begin
let i = 0
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// ...finish, because now i == 3
```

<<<<<<< HEAD
````smart header="Dichiarazioni di variabili inline"
Qui il "counter" è una variabile `i` che viene dichiarata all'interno del ciclo. Questa viene chiamata una dichiarazione di una variabile "inline". Queste variabili sono visibile solo all'interno del ciclo.
=======
````smart header="Inline variable declaration"
Here, the "counter" variable `i` is declared right in the loop. This is called an "inline" variable declaration. Such variables are visible only inside the loop.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no such variable
```

<<<<<<< HEAD
Invece che definire una nuova variabile, possiamo utilizzarne una già esistente:
=======
Instead of defining a variable, we could use an existing one:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let i = 0;

for (i = 0; i < 3; i++) { // use an existing variable
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, because declared outside of the loop
```

````


### Parti opzionali

Ogni parte del `for` può essere saltata.

Ad esempio, possiamo omettere `begin` se non abbiamo bisogno di fare niente all'inizio del ciclo.

Come in questo esempio:

```js run
let i = 0; // we have i already declared and assigned

for (; i < 3; i++) { // no need for "begin"
  alert( i ); // 0, 1, 2
}
```

Possiamo anche rimuovere lo`step`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

<<<<<<< HEAD
Il ciclo diventa uguale ad un `while (i < 3)`.

Possiamo rimuovere tutto, questo genererà un ciclo infinito:
=======
This makes the loop identical to `while (i < 3)`.

We can actually remove everything, creating an infinite loop:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
for (;;) {
  // repeats without limits
}
```

<<<<<<< HEAD
Nota che le due `;` del ciclo `for` devono essere presenti, altrimenti sarebbe un errore di sintassi.
=======
Please note that the two `for` semicolons `;` must be present. Otherwise, there would be a syntax error.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Interromper un ciclo 

<<<<<<< HEAD
Normalmente un ciclo termina quando la condizione diventa falsa.

Ma è possibile forzare l'uscita in qualsiasi momento. C'è una speciale direttiva `break` per fare questo.

Ad esempio, il ciclo sotto chiede all'utente una serie di numeri, ma "termina" quando nessun numero viene inserito: 
=======
Normally, a loop exits when its condition becomes falsy.

But we can force the exit at any time using the special `break` directive.

For example, the loop below asks the user for a series of numbers, "breaking" when no number is entered:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
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

<<<<<<< HEAD
La direttiva `break` viene attivata alla linea `(*)` se l'utente inserisce una linea vuota o annulla la procedura di input. Questo fermerà il ciclo immediatamente, passando il controllo alla prima linea successiva al ciclo. In questo caso, `alert`.

La combinazione "ciclo infinito + `break` quando necessario" è ottima per le situazioni in cui la condizione deve essere verificata in un punto differente dall'inizio/fine del ciclo, che può essere a metà, o in qualsiasi altro punto del corpo.
=======
The `break` directive is activated at the line `(*)` if the user enters an empty line or cancels the input. It stops the loop immediately, passing control to the first line after the loop. Namely, `alert`.

The combination "infinite loop + `break` as needed" is great for situations when a loop's condition must be checked not in the beginning or end of the loop, but in the middle or even in several places of its body.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Vai alla prossima iterazione [#continue]

<<<<<<< HEAD
La direttiva `continue` è una versione leggera del `break`. Non blocca l'intero ciclo. Invece interrompe solo l'iterazione corrente e forza il ciclo a reiniziare dall'iterazione successiva (se la condizione è soddisfatta).

Possiamo utilizzarla se abbiamo finito con le operazioni che ci interessano in una data iterazione e vogliamo passare a quella seguente.
=======
The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

We can use it if we're done with the current iteration and would like to move on to the next one.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Il ciclo sotto usa `continue` per ritornare i valori dispari:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

<<<<<<< HEAD
Per i valori pari di `i`, la direttiva `continue` interrompe l'esecuzione del corpo e passa il controllo alla successiva iterazione del `for` (con il numero successivo). Quindi l'`alert` viene chiamato solo con i valori dispari.

````smart header="La direttiva `continue` aiuta a diminuire i livelli di nidificazione"
Un ciclo che mostra i valori dispari potrebbe essere:
=======
For even values of `i`, the `continue` directive stops executing the body and passes control to the next iteration of `for` (with the next number). So the `alert` is only called for odd values.

````smart header="The `continue` directive helps decrease nesting"
A loop that shows odd values could look like this:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

<<<<<<< HEAD
Dal punto di vista tecnico è identico all'esempio sopra. Ovviamente possiamo raccogliere il codice in un blocco `if` piuttosto di usare `continue`.

Ma come effetto collaterale abbiamo aggiunto un livello di annidamento ulteriore (la chiamata `alert` all'interno delle parentesi graffe). Se il codice dentro `if` è più lungo di un paio di righe, si rischia di perdere in leggibilità.
````

````warn header="Vietato `break/continue` alla desta di '?'"
Da notare che questo costrutto sintattico non è un espressione e non può quindi essere utilizzato con l'operatore ternario `?`. In particolare, direttive come  `break/continue` non sono concesse.
=======
From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an `if` block instead of using `continue`.

But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of`if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions cannot be used with the ternary operator `?`. In particular, directives such as `break/continue` aren't allowed there.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio, se prendiamo questo codice:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

<<<<<<< HEAD
...E lo riscriviamo utilizzando l'operatore ternario:
=======
...and rewrite it using a question mark:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

<<<<<<< HEAD
...Questo smetterà di funzionare. Codice scritto cosi vi darà un errore di sintassi:


Questa è solo un'altra ragione per cui non utilizzare l'operatore ternario `?` piuttosto che `if`.
=======
...it stops working. Code like this will give a syntax error:


This is just another reason not to use the question mark operator `?` instead of `if`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
````

## Etichette break/continue

Qualche volta abbiamo bisogno di uscire da una serie di cicli annidati in un colpo solo.

<<<<<<< HEAD
Ad esempio, nel codice sotto cicliamo su `i` e `j` eseguendo prompt sulle coordinate `(i, j)` da `(0,0)` a `(3,3)`:
=======
For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(3,3)`:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if I want to exit from here to Done (below)?

  }
}

alert('Done!');
```

Abbiamo bisogno di un modo per bloccare il processo se l'utente annulla l'input.

<<<<<<< HEAD
Un semplice `break` dopo `input` interromperebbe solo il break interno. Questo non è sufficiente. Le etichette ci vengono in soccorso.
=======
The ordinary `break` after `input` would only break the inner loop. That's not sufficient--labels, come to the rescue!
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Una *label* (etichetta) è un identificatore seguito da ":" posti prima di un ciclo:
```js
labelName: for (...) {
  ...
}
```

<<<<<<< HEAD
L'istruzione `break <labelName>` nel ciclo uscirà fino alla label.

Come nell'esempio:
=======
The `break <labelName>` statement in the loop below breaks out to the label:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
  }
}
alert('Done!');
```

<<<<<<< HEAD
Nel codice sopra `break outer` va alla ricerca della label (etichetta) chiamata `outer` ed esce dal ciclo.
=======
In the code above, `break outer` looks upwards for the label named `outer` and breaks out of that loop.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Quindi il controllo va da `(*)` a `alert('Done!')`.

Possiamo anche spostare l'etichetta in un'altra linea:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

<<<<<<< HEAD
Anche la direttiva `continue` può essere utilizzata con un'etichetta. In questo caso l'esecuzione salta alla prossima iterazione del ciclo con quell'etichetta.

````warn header="Label non equivalgono a \"goto\""
Le Label non permettono di saltare in un punto arbitrario del codice.
=======
The `continue` directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

````warn header="Labels are not a \"goto\""
Labels do not allow us to jump into an arbitrary place in the code.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio, non è possibile fare:
```js
break label;  // jumps to label? No.

label: for (...)
```

<<<<<<< HEAD
La chiamata a `break/continue` è possibile solo dall'interno di un ciclo, e l'etichetta deve essere da qualche parte sopra la chiamata.
=======
A call to `break/continue` is only possible from inside a loop and the label must be somewhere above the directive.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
````

## Summary

Abbiamo coperto 3 tipi di cicli:

- `while` -- La condizione viene controllata prima di ogni iterazione.
- `do..while` -- La condizione viene controllata dopo ogni iterazione.
- `for (;;)` -- La condizione viene controllata prima di ogni iterazione, rende disponibili ulteriori controlli.

Per crere un ciclo infinito, si usa il costrutto `while(true)`. Questo tipo di cicli, come tutti gli altri, possono essere interrotti con la direttiva `break`.

<<<<<<< HEAD
Se non si ha più intenzione di fare nulla nell'iterazione corrente e si vuole quindi saltare alla successiva, la direttiva `continue` lo consente.

`break/continue` supportano le etichette prima del ciclo. Un etichetta è l'unico modo per `break/continue` di uscire da cicli annidati ed andare al ciclo esterno.
=======
If we don't want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

`break/continue` support labels before the loop. A label is the only way for `break/continue` to escape a nested loop to go to an outer one.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
