# L'istruzione "switch"

L'istruzione `switch` può essere utile per rimpiazzare `if` multipli.

E' infatti un metodo molto più descrittivo per confrontare un valore che può assumere più varianti.

## La sintassi

Un istruzione `switch` possiede uno o più `case` ed opzionalmente un blocco default.

Appare cosi:

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

- Il valore di `x` viene controllato utilizzando l'uguaglianza stretta con il valore fornito dal primo blocco `case` (che è, `value1`) poi dal secondo (`value2`) e avanti cosi.
- Se l'uguaglianza viene trovata, `switch` inizia ad eseguire il codice partendo dal corrispondente blocco `case`, fino al `break` più vicino (oppure fino alla fine dello `switch`).
- Se non viene trovata nessuna uguaglianza allora viene eseguito il codice del blocco `default` (se questo è presente).

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
    alert( 'Too large' );
    break;
  default:
    alert( "I don't know such values" );
}
```

Qui lo `switch` inizia confrontando `a` con il primo `case`, la sua variante è `3`. Quindi il match fallisce.

Poi valuta `4`. Questo è un match riuscito, quindi l'esecuzione inizia da `case 4` fino al `break` più vicino.

**Se non c'è nessun `break` l'esecuzione procede al prossimo `case` senza alcun controllo.**

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

Nell'esempio sopra abbiamo visto l'esecuzione sequenziale dei tre `alert`:

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
Qui `+a` viene convertito in `1`, che viene confrontato con `b + 1` nei `case`, ed il codice corrispondente viene eseguito.
````

## Raggruppare i "case"

Diverse varianti di `case` che condividono lo stesso codice possono essere raggruppate.

Ad esempio, se vogliamo eseguire lo stesso codice per `case 3` e `case 5`:

```js run no-beautify
let a = 2 + 2;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
<<<<<<< HEAD
  case 3:                    // (*) raggruppiamo due casi
=======
  case 3: // (*) grouped two cases
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
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

L'abilità di "raggruppare" più case è un effetto collaterale di come `switch/case` funziona senza `break`. Qui l'esecuzione del case `case 3` inizia dalla linea `(*)` e prosegue fino a `case 5`, perchè non c'è alcun `break`.

## Il tipo conta

Mettiamo in risalto che il confronto di uguaglianza è sempre stretto. I valori devono essere dello stesso tipo perchè si possa avere un match.

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

1. Per `0`, `1`, viene eseguito il primo `alert`.
2. Per `2` viene eseguito il secondo `alert`.
3. Ma per `3`, il risultato del `prompt` è una stringa `"3"`, che non è strettamente uguale `===` al numero `3`. Quindi qui abbiamo del codice morto in  `case 3`! Verrà quindi eseguita la variante `default`.
