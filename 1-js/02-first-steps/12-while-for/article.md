# Cicli: while e for

Abbiamo spesso bisogno di eseguire la stessa azione più volte di fila.

Ad esempio, quando abbiamo bisogno di ritornare della merce da una lista una dopo l'altra. O anche solo eseguire lo stesso codice per ogni numero da 1 a 10.

I *Cicli* sono un modo di ripetere la stessa parte di codice più volte.

## Il ciclo "while" 

Il ciclo `while` ha la seguente sintassi:

```js
while (condition) {
  // codice
  // "corpo del ciclo"
}
```

Fino a che la `condition` è `true`, il `code` dal corpo del ciclo viene eseguito.

Ad esempio, il ciclo qui sotto stampa `i` fino a che `i < 3`:

```js run
let i = 0;
while (i < 3) { // mostra 0, poi 1, poi 2
  alert( i );
  i++;
}
```

Una singola esecuzione del corpo del ciclo viene chiamata *un iterazione*. Il ciclo nell'esempio sopra fa tre iterazioni.

Se nell'esempio sopra non ci fosse `i++`, il ciclo si ripeterebbe per sempre (in teoria). Nella pratica, il browser ha dei metodi per bloccare questi cicli, con JavaScript server-side è necessario arrestare il processo.

Qualsiasi espressione o variabile può essere utilizzata come condizione di un ciclo, non solo un confronto. Le espressioni vengono valutate e convertite al tipo bool dal ciclo `while`.

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

<<<<<<< HEAD
````smart header="Le parentesi non sono richieste per un corpo composto da una singola linea"
Se il corpo del ciclo ha una singola istruzione, possiamo omettere le parentesi `{…}`:
=======
````smart header="Curly braces are not required for a single-line body"
If the loop body has a single statement, we can omit the curly braces `{…}`:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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
  // corpo del ciclo
} while (condition);
```

Il ciclo esegue prima il corpo, poi controlla la condizione, se questa è vera, esegue nuovamente il corpo.

Ad esempio:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Questa tipo di sintassi viene usata molto raramente ad eccezione dei casi in cui si vuole che il corpo del ciclo venga eseguito **almeno una volta** senza controllo sulla condizione. La forma più utilizzata è comunque: `while(…) {…}`.

## Il ciclo "for" 

Il ciclo `for` è spesso il più utilizzato.

La sua forma è del tipo:

```js
for (begin; condition; step) {
  // ... corpo del ciclo ...
}
```

Cerchiamo ora di capire il significato tramite degli esempi. Il ciclo sotto esegue `alert(i)` per `i` da `0` fino a (ma non incluso) `3`:

```js run
for (let i = 0; i < 3; i++) { // mostra 0, poi 1, poi 2
  alert(i);
}
```

Esaminiamo l'istruzione `for` parte per parte:

| Parte |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `i = 0`    | Viene eseguito una volta all'entrata nel ciclo.                          |
| condition | `i < 3`| Viene controllata prima di ogni iterazione del ciclo, se fallisce il ciclo si interrompe.|
| step| `i++`      | Viene eseguito prima del corpo ad ogni iterazione, ma dopo il controllo della condizione.|
| body | `alert(i)`| Viene eseguito fino a che vale la condizione.
```
Eseguiamo begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...
```

Se i cicli vi sono nuovi, allora forse vi sarà d'aiuto tornare indietro agli esempi e provare a riprodurli passo-passo su un foglio di carta.

Questo è quello che succede esattamente nel nostro codice:

```js
// for (let i = 0; i < 3; i++) alert(i)

// inizia l'esecuzione
let i = 0
// if condition → esegue il corpo e avanza
if (i < 3) { alert(i); i++ }
// if condition → esegue il corpo e avanza
if (i < 3) { alert(i); i++ }
// if condition → esegue il corpo e avanza
if (i < 3) { alert(i); i++ }
// ...si conclude, perché ora i == 3
```

````smart header="Dichiarazioni di variabili inline"
Qui il "counter" è una variabile `i` che viene dichiarata all'interno del ciclo. Questa viene chiamata una dichiarazione di una variabile "inline". Queste variabili sono visibile solo all'interno del ciclo.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // errore, nessuna variabile
```

Invece che definire una nuova variabile, possiamo utilizzarne una già esistente:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // utilizza una variabile esistente
  alert(i); // 0, 1, 2
}

alert(i); // 3, visibile, perché è stata dichiarata fuori dal ciclo
```

````


### Parti opzionali

Ogni parte del `for` può essere saltata.

Ad esempio, possiamo omettere `begin` se non abbiamo bisogno di fare niente all'inizio del ciclo.

Come in questo esempio:

```js run
let i = 0; // la abbiamo già dichiarata e assegnata

for (; i < 3; i++) { // non c'è alcun bisogno di "begin"
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

Il ciclo diventa uguale ad un `while (i < 3)`.

Possiamo rimuovere tutto, questo genererà un ciclo infinito:

```js
for (;;) {
  // ripete senza terminare
}
```

Nota che le due `;` del ciclo `for` devono essere presenti, altrimenti sarebbe un errore di sintassi.

## Interrompere un ciclo 

Normalmente un ciclo termina quando la condizione diventa falsa.

Ma è possibile forzare l'uscita in qualsiasi momento. C'è una speciale direttiva `break` per fare questo.

Ad esempio, il ciclo sotto chiede all'utente una serie di numeri, ma "termina" quando nessun numero viene inserito: 

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

La direttiva `break` viene attivata alla linea `(*)` se l'utente inserisce una linea vuota o annulla la procedura di input. Questo fermerà il ciclo immediatamente, passando il controllo alla prima linea successiva al ciclo. In questo caso, `alert`.

La combinazione "ciclo infinito + `break` quando necessario" è ottima per le situazioni in cui la condizione deve essere verificata in un punto differente dall'inizio/fine del ciclo, che può essere a metà, o in qualsiasi altro punto del corpo.

## Vai alla prossima iterazione [#continue]

La direttiva `continue` è una versione leggera del `break`. Non blocca l'intero ciclo. Invece interrompe solo l'iterazione corrente e forza il ciclo a reiniziare dall'iterazione successiva (se la condizione è soddisfatta).

Possiamo utilizzarla se abbiamo finito con le operazioni che ci interessano in una data iterazione e vogliamo passare a quella seguente.

Il ciclo sotto usa `continue` per ritornare i valori dispari:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // se è true, salta la restante parte di codice
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, poi 3, 5, 7, 9
}
```

Per i valori pari di `i`, la direttiva `continue` interrompe l'esecuzione del corpo e passa il controllo alla successiva iterazione del `for` (con il numero successivo). Quindi l'`alert` viene chiamato solo con i valori dispari.

````smart header="La direttiva `continue` aiuta a diminuire i livelli di nidificazione"
Un ciclo che mostra i valori dispari potrebbe essere:

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Dal punto di vista tecnico è identico all'esempio sopra. Ovviamente possiamo raccogliere il codice in un blocco `if` piuttosto di usare `continue`.

Ma come effetto collaterale abbiamo aggiunto un livello di annidamento ulteriore (la chiamata `alert` all'interno delle parentesi graffe). Se il codice dentro `if` è più lungo di un paio di righe, si rischia di perdere in leggibilità.
````

````warn header="Vietato `break/continue` alla desta di '?'"
Da notare che questo costrutto sintattico non è un espressione e non può quindi essere utilizzato con l'operatore ternario `?`. In particolare, direttive come  `break/continue` non sono concesse.

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

...Questo smetterà di funzionare. Codice scritto cosi vi darà un errore di sintassi:


Questa è solo un'altra ragione per cui non utilizzare l'operatore ternario `?` piuttosto che `if`.
````

## Etichette break/continue

Qualche volta abbiamo bisogno di uscire da una serie di cicli annidati in un colpo solo.

Ad esempio, nel codice sotto cicliamo su `i` e `j` eseguendo prompt sulle coordinate `(i, j)` da `(0,0)` a `(3,3)`:

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

Un semplice `break` dopo `input` interromperebbe solo il break interno. Questo non è sufficiente. Le etichette ci vengono in soccorso.

Una *label* (etichetta) è un identificatore seguito da ":" posti prima di un ciclo:
```js
labelName: for (...) {
  ...
}
```

L'istruzione `break <labelName>` nel ciclo uscirà fino alla label.

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

Nel codice sopra `break outer` va alla ricerca della label (etichetta) chiamata `outer` ed esce dal ciclo.

Quindi il controllo va da `(*)` a `alert('Done!')`.

Possiamo anche spostare l'etichetta in un'altra linea:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

Anche la direttiva `continue` può essere utilizzata con un'etichetta. In questo caso l'esecuzione salta alla prossima iterazione del ciclo con quell'etichetta.

````warn header="Label non equivalgono a \"goto\""
Le Label non permettono di saltare in un punto arbitrario del codice.

Ad esempio, non è possibile fare:
```js
break label;  // salta a label? No.

label: for (...)
```

La chiamata a `break/continue` è possibile solo dall'interno di un ciclo, e l'etichetta deve essere da qualche parte sopra la chiamata.
````

## Summary

Abbiamo coperto 3 tipi di cicli:

- `while` -- La condizione viene controllata prima di ogni iterazione.
- `do..while` -- La condizione viene controllata dopo ogni iterazione.
- `for (;;)` -- La condizione viene controllata prima di ogni iterazione, rende disponibili ulteriori controlli.

Per crere un ciclo infinito, si usa il costrutto `while(true)`. Questo tipo di cicli, come tutti gli altri, possono essere interrotti con la direttiva `break`.

Se non si ha più intenzione di fare nulla nell'iterazione corrente e si vuole quindi saltare alla successiva, la direttiva `continue` lo consente.

`break/continue` supportano le etichette prima del ciclo. Un etichetta è l'unico modo per `break/continue` di uscire da cicli annidati ed andare al ciclo esterno.
