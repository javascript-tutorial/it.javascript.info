# L'istruzione "switch"

L'istruzione `switch` può essere utile per rimpiazzare multipli `if`.

E' infatti un metodo molto più descrittivo per lavorare con un elemento che può avere svariati valori.

## La sintassi

Un istruzione `switch` possiede uno o più `case` ed opzionalmente un blocco *default*.

Un esempio:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- Il valore di `x` viene controllato utilizzando l'uguaglianza stretta con i valori dei blocchi `case` (`value1` e `value2` nell'esempio sopra).
- Se l'uguaglianza viene trovata, `switch` inizia ad eseguire il codice partendo dal corrispondente blocco `case`, fino al `break` più vicino (oppure fino alla fine dello `switch`).
- Se non viene trovata nessuna uguaglianza allora viene eseguito il codice del blocco `default` (se presente).

## Un esempio

Un esempio di `switch`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert( 'Exactly!' );
    break;
*/!*
  case 5:
    alert( 'Too big' );
    break;
  default:
    alert( "I don't know such values" );
}
```

Qui lo `switch` inizia confrontando `a` con il primo `case`, il cui valore è `3`. Non vi è corrispondenza.

Poi valuta `4`. C'è una corrispondenza, quindi l'esecuzione inizia da `case 4` fino al `break` più vicino.

**Se non c'è nessun `break` l'esecuzione procede al prossimo `case`.**

Un esempio senza `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
*/!*
}
```

Nell'esempio sopra, non essendoci un `break`, abbiamo l'esecuzione sequenziale dei tre `alert`:

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="Qualsiasi espressione può essere un argomento `switch/case`."
Sia `switch` che `case` accettano espressioni arbitrarie.

Ad esempio:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;
*/!*

  default:
    alert("this doesn't run");
}
```
```
Qui `+a` viene convertito in `1`, che nei `case` viene confrontato con `b + 1`, ed il codice corrispondente viene eseguito. 
``` 

## Raggruppare i "case"

Possiamo raggruppare diverse varianti di `case` e far loro eseguire lo stesso codice.

Ad esempio, se vogliamo eseguire lo stesso codice per `case 3` e `case 5`:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3: // (*) raggruppiamo due casi
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

Ora sia `3` che `5` mostreranno lo stesso messaggio.

<<<<<<< HEAD
L'abilità di "raggruppare" più `case` è un effetto collaterale di come `switch/case` funziona senza `break`. Qui l'esecuzione del `case 3` inizia dalla linea `(*)` e prosegue fino a `case 5`, perché non c'è alcun `break`.
=======
The ability to "group" cases is a side effect of how `switch/case` works without `break`. Here the execution of `case 3` starts from the line `(*)` and goes through `case 5`, because there's no `break`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Il tipo conta

Mettiamo in risalto che il confronto di uguaglianza è sempre stretto. I valori devono essere dello stesso tipo perché si possa avere una corrispondenza.

Ad esempio, consideriamo il codice:

```js run
let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' );
}
```

1. Per `0` e `1`, viene eseguito il primo `alert`.
2. Per `2` viene eseguito il secondo `alert`.
3. Per `3`, il risultato del `prompt` è una stringa, `"3"`, che non è strettamente uguale `===` al numero `3`. Quindi abbiamo del codice 'morto' nel `case 3`! Verrà quindi eseguito il codice dentro `default`.
