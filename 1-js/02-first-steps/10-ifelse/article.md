<<<<<<< HEAD
# Operatori condizionali: if, '?'
=======
# Conditional branching: if, '?'
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

Qualche volta abbiamo bisogno di eseguire certe azioni solo nel caso valgano determinate condizioni.

Per questo c'è l'istruzione `if` e anche l'operatore condizionale di valutazione a cui noi ci riferiremo con l'operatore "punto di domanda" `?` per semplicità.

## L'istruzione "if" 

L'istruzione `if(...)` richiede una condizione, la valuta, e se il risultato è `true`, esegue il codice.

Ad esempio:

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

Nell'esempio sopra, la condizione è un semplice controllo di uguaglianza: `year == 2015`, ma potrebbe essere qualcosa di molto più complesso.

Se dobbiamo eseguire più di un'istruzione, queste vanno raggruppate tramite le parentesi graffe:

```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```

E' consigliabile raggruppare sempre il codice all'interno delle parentesi graffe `{}` quando si usa un `if`, anche se contiene una sola istruzione. La leggibilità viene migliorata.

## Conversione booleana

L'istruzione `if (…)` valuta la condizione tra le parentesi e la converte al tipo booleano.

Ricordiamo le regole di conversione viste nel capitolo <info:type-conversions>:

- Il numero `0`, una stringa vuota `""`, `null`, `undefined` e `NaN` diventano `false`. Per questo vengono chiamati valori "falsi".
- Gli altri valori diventano `true`, quindi vengono chiamati "veri".

Quindi, il codice nell'esempio qui sotto, non verrà mai eseguito:

```js
if (0) { // 0 è falso
  ...
}
```

...Invece nel prossimo esempio -- verrà eseguito sempre:

```js
if (1) { // 1 è vero
  ...
}
```

Possiamo anche passare un valore già valutato in precedenza su un `if`, come qui:

```js
let cond = (year == 2015); // l'uguaglianza diventa vera o falsa

if (cond) {
  ...
}
```

## La clausola "else" 

L'istruzione `if` può essere seguita da un blocco opzionale "else". Questo viene eseguito quando la condizione è falsa.

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

Nel codice sopra JavaScript controlla prima `year < 2015`. Se risulta falso allora va alla successiva condizione `year > 2015`, altrimenti mostra il blocco else con l'`alert`.

Ci possono essere molti blocchi `else if`. L'`else` finale è opzionale.

## Operatore condizionale '?'

Qualche volta abbiamo bisogno di assegnare un valore ad una variabile in base ad una condizione.

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

Esiste un'operatore "condizionale" o "punto interrogativo" che ci consente di farlo in maniera più breve e semplice.

L'operatore viene rappresentato dal punto interrogativo `?`.  Il termine formale è "ternario", il che significa che richiede tre operatori. E' l'unico operatore in JavaScript di questo tipo.

La sintassi è:
```js
let result = condition ? value1 : value2;
```

La `condition` viene valutata, se risulta viene ritornato il `value1`, altrimenti viene ritornato il -- `value2`.

Ad esempio:

```js
let accessAllowed = (age > 18) ? true : false;
```

Tecnicamente, potremmo omettere le parentesi su `age > 18`. L'operatore condizionale ha una precedenza molto bassa. Viene eseguito dopo gli operatori di confronto `>`.

Questo esempio porta allo stesso risultato di quello precedente:

```js
// l'operatore di confronto "age > 18" viene eseguito per primo
// (non c'è bisogno di racchiuderlo tra parentesi)
let accessAllowed = age > 18 ? true : false;
```

Le parentesi rendono però il codice più leggibile, quindi è consigliabile utilizzarle.

````smart
Nell'esempio sopra sarebbe possibile evitare l'operatore ternario, perchè l'operatore di confronto ritorna già di suo `true/false`:

```js
// the same
let accessAllowed = age > 18;
```
````

## Operatori '?' multipli

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

Potrebbe essere difficile inizialmente capirne la logica. Ma dopo averlo guardato da più vicino ci accorgiamo è una semplice sequenza di condizioni.

1. Il primo operatore "?" controlla `age < 3`.
2. Se è vero -- ritorna `'Hi, baby!'`, altrimenti -- segue la colonna `":"` e controlla `age < 18`.
3. Se questo è vero -- ritorna `'Hello!'`, altrimenti -- segue la colonna `":"` e controlla `age < 100`.
4. Se questo è vero -- ritorna `'Greetings!'`, altrimenti -- segue la colonna `":"` e ritorna `'What an unusual age!'`.

La stessa logica viene usata con `if..else`:

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

In base al risultato della condizione `company == 'Netscape'`, viene eseguita la prima o la seconda parte, e mostra il giusto alert.

Qui non assegnamo il risultato ad una variabile. L'idea è di eseguire codice differente in base alla condizione.

**Non è consigliabile utilizzare l'operatore ternario in questo modo.**

La notazione risulta essere molto più breve rispetto all'istruzione `if`, questo viene sfruttato da molti programmatori. Ma risulta meno leggibile.

Lo stesso codice realizzato con un istruzione `if`:

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

I nostri occhi scannerizzano il codice verticalmente. Quindi i costrutti che si estendono per qualche riga risultano più semplici da capire piuttosto di un'unica istruzione che si estende orrizontalmente.

L'idea dell'operatore ternario `?` è di ritornare un valore piuttosto che un altro, in base al valore di una condizione. Va quindi utilizzato solo per questo tipo di situazioni. Invece per eseguire diversi codice è consigliabile utilizzare il costrutto `if`.
