# Operatori condizionali: if, '?'

<<<<<<< HEAD
Qualche volta abbiamo bisogno di eseguire certe azioni solo nel caso valgano determinate condizioni.

Per questo c'è l'istruzione `if` e anche l'operatore condizionale di valutazione (ternario) a cui noi ci riferiremo con l'operatore "punto di domanda" `?` per semplicità.
=======
Sometimes, we need to perform different actions based on different conditions.

To do that, we use the `if` statement and the conditional (ternary) operator which we will be referring to as the “question mark” operator `?` for simplicity.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## L'istruzione "if" 

<<<<<<< HEAD
L'istruzione `if` richiede una condizione, la valuta, e se il risultato è `true`, esegue il codice.
=======
The `if` statement evaluates a condition and, if the condition's result is `true`, executes a block of code.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ad esempio:

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

<<<<<<< HEAD
Nell'esempio sopra, la condizione è un semplice controllo di uguaglianza: `year == 2015`, ma potrebbe essere qualcosa di molto più complesso.

Se dobbiamo eseguire più di un'istruzione, queste vanno raggruppate tramite le parentesi graffe:
=======
In the example above, the condition is a simple equality check (`year == 2015`), but it can be much more complex.

If we want to execute more than one statement, we have to wrap our code block inside curly braces:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```

<<<<<<< HEAD
E' consigliabile raggruppare sempre il codice all'interno delle parentesi graffe `{}` quando si usa un `if`, anche se contiene una sola istruzione. La leggibilità viene migliorata.
=======
We recommend wrapping your code block with curly braces `{}` every time you use an `if` statement, even if there is only one statement to execute. Doing so improves readability.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## Conversione booleana

<<<<<<< HEAD
L'istruzione `if (…)` valuta la condizione tra le parentesi e la converte al tipo booleano.
=======
The `if (…)` statement evaluates the expression in its parentheses and converts the result to a boolean.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ricordiamo le regole di conversione viste nel capitolo <info:type-conversions>:

<<<<<<< HEAD
- Il numero `0`, una stringa vuota `""`, `null`, `undefined` e `NaN` diventano `false`. Per questo vengono chiamati valori "falsi".
- Gli altri valori diventano `true`, quindi vengono chiamati "veri".
=======
- A number `0`, an empty string `""`, `null`, `undefined`, and `NaN` all become `false`. Because of that they are called "falsy" values.
- Other values become `true`, so they are called "truthy".
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Quindi, il codice nell'esempio qui sotto, non verrà mai eseguito:

```js
if (0) { // 0 is falsy
  ...
}
```

<<<<<<< HEAD
...Invece nel prossimo esempio -- verrà eseguito sempre:
=======
...and inside this condition -- it always will:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js
if (1) { // 1 is truthy
  ...
}
```

<<<<<<< HEAD
Possiamo anche passare un valore booleano già valutato, come qui:
=======
We can also pass a pre-evaluated boolean value to `if`, like this:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js
let cond = (year == 2015); // equality evaluates to true or false

if (cond) {
  ...
}
```

## La clausola "else" 

<<<<<<< HEAD
L'istruzione `if` può essere seguita da un blocco opzionale "else". Questo viene eseguito quando la condizione è falsa.
=======
The `if` statement may contain an optional "else" block. It executes when the condition is false.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ad esempio:
```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // any value except 2015
}
```

## Condizione multiple: "else if"

<<<<<<< HEAD
Qualche volta vorremmo testare diverse varianti di una condizione. Per questo esiste la clausola `else if`.
=======
Sometimes, we'd like to test several variants of a condition. The `else if` clause lets us do that.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

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

<<<<<<< HEAD
Nel codice sopra JavaScript controlla prima `year < 2015`. Se risulta falso allora va alla successiva condizione `year > 2015`, altrimenti mostra il blocco else con l'`alert`.

Ci possono essere molti blocchi `else if`. L'`else` finale è opzionale.
=======
In the code above, JavaScript first checks `year < 2015`. If that is falsy, it goes to the next condition `year > 2015`. If that is also falsy, it shows the last `alert`.

There can be more `else if` blocks. The final `else` is optional.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## Operatore Ternario '?'

<<<<<<< HEAD
Qualche volta abbiamo bisogno di assegnare un valore ad una variabile in base ad una condizione.
=======
Sometimes, we need to assign a variable depending on a condition.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

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

<<<<<<< HEAD
Esiste un'operatore "ternario" o "punto interrogativo" che ci consente di farlo in maniera più breve e semplice.
=======
The so-called "ternary" or "question mark" operator lets us do that in a shorter and simpler way.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

L'operatore viene rappresentato dal punto interrogativo `?`.  Il termine formale è "ternario", il che significa che richiede tre operatori. E' l'unico operatore in JavaScript di questo tipo.

La sintassi è:
```js
let result = condition ? value1 : value2;
```

<<<<<<< HEAD
La `condition` viene valutata, se risulta viene ritornato il `value1`, altrimenti viene ritornato il -- `value2`.
=======
The `condition` is evaluated: if it's truthy then `value1` is returned, otherwise -- `value2`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ad esempio:

```js
let accessAllowed = (age > 18) ? true : false;
```

<<<<<<< HEAD
Tecnicamente, potremmo omettere le parentesi su `age > 18`. L'operatore ternario ha una precedenza molto bassa. Viene eseguito dopo gli operatori di confronto `>`, quindi il risultato sarebbe lo stesso:
=======
Technically, we can omit the parentheses around `age > 18`. The question mark operator has a low precedence, so it executes after the comparison `>`. 

This example will do the same thing as the previous one:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js
// the comparison operator "age > 18" executes first anyway
// (no need to wrap it into parentheses)
let accessAllowed = age > 18 ? true : false;
```

<<<<<<< HEAD
Le parentesi rendono però il codice più leggibile, quindi è consigliabile utilizzarle.

````smart
Nell'esempio sopra sarebbe possibile evitare l'operatore ternario, perchè l'operatore di confronto ritorna già di suo `true/false`:
=======
But parentheses make the code more readable, so we recommend using them.

````smart
In the example above, you can avoid using the question mark operator because the comparison itself returns `true/false`:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js
// the same
let accessAllowed = age > 18;
```
````

## Operatori '?' multipli

<<<<<<< HEAD
Una sequenza di operatori `?` consente di ritornare un valore che dipende da più condizioni.
=======
A sequence of question mark operators `?` can return a value that depends on more than one condition.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ad esempio:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

<<<<<<< HEAD
Potrebbe essere difficile inizialmente capirne la logica. Ma dopo averlo guardato da più vicino ci accorgiamo è una semplice sequenza di condizioni.

1. Il primo operatore "?" controlla `age < 3`.
2. Se è vero -- ritorna `'Hi, baby!'`, altrimenti -- segue la colonna `":"` e controlla `age < 18`.
3. Se questo è vero -- ritorna `'Hello!'`, altrimenti -- segue la colonna `":"` e controlla `age < 100`.
4. Se questo è vero -- ritorna `'Greetings!'`, altrimenti -- segue la colonna `":"` e ritorna `'What an unusual age!'`.

La stessa logica viene usata con `if..else`:
=======
It may be difficult at first to grasp what's going on. But after a closer look, we can see that it's just an ordinary sequence of tests:

1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon '":"', checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon '":"', checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon '":"', returning `'What an unusual age!'`.

Here's how this looks using `if..else`:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

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

<<<<<<< HEAD
In base al risultato della condizione `company == 'Netscape'`, viene eseguita la prima o la seconda parte, e mostra il giusto alert.

Qui non assegnamo il risultato ad una variabile. L'idea è di eseguire codice differente in base alla condizione.

**Non è consigliabile utilizzare l'operatore ternario in questo modo.**

La notazione risulta essere molto più breve rispetto all'istruzione `if`, questo viene sfruttato da molti programmatori. Ma risulta meno leggibile.

Lo stesso codice realizzato con un istruzione `if`:
=======
Depending on the condition `company == 'Netscape'`, either the first or the second expression after the `?` gets executed and shows an alert.

We don't assign a result to a variable here. Instead, we execute different code depending on the condition.

**We don't recommend using the question mark operator in this way.**

The notation is shorter than the equivalent `if` statement, which appeals to some programmers. But it is less readable.

Here is the same code using `if` for comparison:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

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

<<<<<<< HEAD
I nostri occhi scannerizzano il codice verticalmente. Quindi i costrutti che si estendono per qualche riga risultano più semplici da capire piuttosto di un'unica istruzione che si estende orrizontalmente.

L'idea dell'operatore ternario `?` è di ritornare un valore piuttosto che un altro, in base al valore di una condizione. Va quindi utilizzato solo per questo tipo di situazioni. Invece per eseguire diversi codice è consigliabile utilizzare il costrutto `if`.
=======
Our eyes scan the code vertically. Code blocks which span several lines are easier to understand than a long, horizontal instruction set.

The purpose of the question mark operator `?` is to return one value or another depending on its condition. Please use it for exactly that. Use `if` when you need to execute different branches of code.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
