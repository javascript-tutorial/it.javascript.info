# Operatori condizionali: if, '?'

Qualche volta abbiamo bisogno di eseguire certe azioni solo nel caso valgano determinate condizioni.

Per questo c'è l'istruzione `if` e l'operatore condizionale di valutazione a cui ci riferiremo, per semplicità, con "l'operatore punto di domanda" `?`.

## L'istruzione "if" 

L'istruzione `if(...)` valuta una condizione (racchiusa nelle parentesi); se il risultato è `true`, esegue il codice che segue `if`.

Ad esempio:

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

Nell'esempio sopra, la condizione è un semplice controllo di uguaglianza: `year == 2015`, ma potrebbe essere qualcosa di molto più complesso.

Se dobbiamo eseguire più di un'istruzione, queste vanno raggruppate tramite parentesi graffe:

```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```

E' consigliabile raggruppare sempre il codice all'interno delle parentesi graffe `{}`, quando si usa un `if`, anche se contiene una sola istruzione. La leggibilità ne guadagna.

## Conversione booleana

L'istruzione `if (…)` valuta la condizione tra le parentesi e converte il risultato al tipo booleano.

Ricordiamo le regole di conversione viste nel capitolo <info:type-conversions>:

- Il numero `0`, una stringa vuota `""`, `null`, `undefined` e `NaN` diventano `false`. Per questo vengono chiamati valori "falsi".
- Gli altri valori diventano `true`, quindi vengono chiamati "veri".

Quindi, il codice nell'esempio sotto, non verrà mai eseguito:

```js
if (0) { // 0 è falso
  ...
}
```

...Nel seguente esempio, invece, verrà sempre eseguito:

```js
if (1) { // 1 è vero
  ...
}
```

Possiamo anche passare un valore già valutato in precedenza, come qui:

```js
let cond = (year == 2015); // l'uguaglianza diventa vera o falsa

if (cond) {
  ...
}
```

## La clausola "else" 

<<<<<<< HEAD
L'istruzione `if` può essere seguita da un blocco opzionale "else". Questo viene eseguito quando la condizione è falsa.
=======
The `if` statement may contain an optional `else` block. It executes when the condition is falsy.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio:
```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // qualsiasi valore tranne 2015
}
```

## Condizione multiple: "else if"

Qualche volta vorremmo testare diverse varianti di una condizione. Per questo esiste la clausola `else if`.

Ad esempio:

```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

Nel codice sopra JavaScript controlla anzitutto la prima condizione, `year < 2015`. Se risulta falsa va alla successiva condizione `year > 2015` ed esegue il codice dentro le parentesi graffe, altrimenti esegue il codice dentro al blocco `else`.

Ci possono essere molti blocchi `else if`. L'`else` finale è opzionale.

## Operatore condizionale '?'

Qualche volta abbiamo bisogno di assegnare un valore ad una variabile in base ad una certa condizione.

Ad esempio:

```js run no-beautify
let accessAllowed;
let age = prompt('How old are you?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

Esiste un operatore "condizionale", o "punto interrogativo", che ci consente di farlo in maniera più breve e semplice.

L'operatore viene rappresentato dal punto interrogativo `?`.  Il termine formale è "ternario", perché richiede tre operatori. E' l'unico operatore in JavaScript che ne accetta così tanti.

La sintassi è:
```js
let result = condition ? value1 : value2;
```

La `condition` viene valutata; se risulta vera, viene ritornato `value1`, altrimenti viene ritornato `value2`.

Ad esempio:

```js
let accessAllowed = (age > 18) ? true : false;
```

Tecnicamente, potremmo omettere le parentesi attorno ad `age > 18`. L'operatore condizionale ha una precedenza molto bassa, viene eseguito dopo gli operatori di confronto `>`.

Il risultato dell'esempio sotto è uguale a quello precedente:

```js
// l'operatore di confronto "age > 18" viene eseguito per primo
// (non c'è bisogno di racchiuderlo tra parentesi)
let accessAllowed = age > 18 ? true : false;
```

Ma le parentesi rendono il codice più leggibile, quindi è consigliabile utilizzarle.

````smart
Nell'esempio sopra sarebbe possibile omettere anche l'operatore ternario, perchè l'operatore di confronto `>` ritorna già di suo `true/false`:

```js
// stesso risultato (risulterà in `true` o `false`, a seconda del valore di `age`)
let accessAllowed = age > 18;
```
````

## Multipli operatori '?'

Una sequenza di operatori `?` consente di ritornare un valore che dipende da più condizioni.

Ad esempio:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

Potrebbe essere difficile, inizialmente, capirne la logica. Ma dopo averlo guardato da più vicino ci accorgeremo che è una semplice sequenza di condizioni.

<<<<<<< HEAD
1. Il primo operatore "?" controlla `age < 3`.
2. Se è vero -- ritorna `'Hi, baby!'`, altrimenti -- segue la colonna `":"`, controlla `age < 18`.
3. Se questo è vero -- ritorna `'Hello!'`, altrimenti -- segue la colonna `":"`, controlla `age < 100`.
4. Se questo è vero -- ritorna `'Greetings!'`, altrimenti -- segue la colonna `":"`, ritorna `'What an unusual age!'`.
=======
1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon ":", checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon ":", checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon ":", returning `'What an unusual age!'`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La stessa logica riscritta utilizzando `if..else`:

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## Uso non tradizionale dell'operatore '?'

Qualche volta l'operatore `?` si utilizza per rimpiazzare l'istruzione `if`:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

In base alla valutazione della condizione `company == 'Netscape'`, viene eseguita la prima o la seconda parte (e il rispettivo `alert`).

Qui non assegniamo il risultato ad una variabile. L'idea è di eseguire un codice differente a seconda della condizione.

**Non è consigliabile utilizzare l'operatore ternario in questo modo.**

La notazione risulta essere molto più breve rispetto all'istruzione `if`; questo viene sfruttato da molti programmatori, ma risulta meno leggibile.

Compariamo il codice sopra con una versione che utilizza `if` invece dell'operatore ternario `?`:
```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

I nostri occhi esaminano il codice verticalmente. I costrutti che si estendono per qualche riga risultano più semplici da capire piuttosto di un'unica istruzione che si estende orrizontalmente.

L'idea dell'operatore ternario `?` è di ritornare, in base a una condizione, un valore piuttosto di un altro. Va quindi utilizzato solo in questo tipo di situazioni. Per eseguire diversi codici è consigliabile utilizzare il costrutto `if`.
