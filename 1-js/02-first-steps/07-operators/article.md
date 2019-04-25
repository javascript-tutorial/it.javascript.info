# Operatori

<<<<<<< HEAD
Molti operatori già li conosciamo dalle scuole. Tra cui l'addizione `+`, la moltiplicazione `*`, la sottrazione `-` e molti altri.

In questo capitolo ci concentreremo sugli aspetti che non vengono descritti a scuola.
=======
We know many operators from school. They are things like addition `+`, multiplication `*`, subtraction `-`, and so on.

In this chapter, we'll concentrate on aspects of operators that are not covered by school arithmetic.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Termini: "unario", "binario", "operando"

<<<<<<< HEAD
Prima di procedere, cerchiamo di capire la terminologia.

- *Un operando* -- è quello su cui si applica l'operatore. Ad esempio nella moltiplicazione `5 * 2` ci sono due operandi: l'operando sinistro cioè il `5`, e l'operando di destra cioè il `2`. Qualche volta le persone dicono "argomenti" piuttosto che "operandi".
- Un operatore è *unario* se ha un singolo operando. Ad esempio, la negazione `-` inverte il segno di un numero:
=======
Before we move on, let's grasp some common terminology.

- *An operand* -- is what operators are applied to. For instance, in the multiplication of `5 * 2` there are two operands: the left operand is `5` and the right operand is `2`. Sometimes, people call these "arguments" instead of "operands".
- An operator is *unary* if it has a single operand. For example, the unary negation `-` reverses the sign of a number:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, unary negation was applied
    ```
<<<<<<< HEAD
- Un operatore è *binario* se ha due operandi. Lo stesso operatore "meno" esiste nella forma binaria:
=======
- An operator is *binary* if it has two operands. The same minus exists in binary form as well:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binary minus subtracts values
    ```

<<<<<<< HEAD
    Formalmente, stiamo parlando di due operatori diversi: la negazione unaria (un singolo operando, inverte il segno) e la sottrazione binaria (due operandi, si esegue la sottrazione).

##  Concatenazione di stringhe, operatore binario +

Adesso diamo un'occhiata alle caratteristiche degli operatori in JavaScript, che vanno oltre l'aritmetica scolastica.

L'operatore di somma `+` viene utilizzato per sommare due numeri.

Ma se l'operatore binario `+` viene applicato a delle stringhe, queste verranno unite (concatenate):
=======
    Formally, we're talking about two different operators here: the unary negation (single operand: reverses the sign) and the binary subtraction (two operands: subtracts).

## String concatenation, binary +

Now, let's see special features of JavaScript operators that are beyond school arithmetics.

Usually, the plus operator `+` sums numbers.

But, if the binary `+` is applied to strings, it merges (concatenates) them:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
let s = "my" + "string";
alert(s); // mystring
```

<<<<<<< HEAD
Nota che se almeno uno degli operandi è una stringa, anche gli altri verrano convertiti a stringa.
=======
Note that if one of the operands is a string, the other one is converted to a string too.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD
Come hai visto, non è importante se la stringa è il primo operando o il secondo. La regola è semplice: se uni degli operandi è una stringa, anche gli altri vengono convertiti a stringa.
=======
See, it doesn't matter whether the first operand is a string or the second one. The rule is simple: if either operand is a string, the other one is converted into a string as well.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Comunque, queste operazioni vengono eseguite da sinistra verso destra, Se ci sono due numeri prima di una stringa, prima vengono sommati e il risultato convertito in stringa:


```js run
alert(2 + 2 + '1' ); // "41" and not "221"
```

<<<<<<< HEAD
La concatenazione di stringhe e la conversione è una caratteristica particolare dell'operatore binario `+`. Gli altri operatori aritmetici funzionano solamente con i numeri. Infatti convertono sempre i loro operandi a numeri.
=======
String concatenation and conversion is a special feature of the binary plus `+`. Other arithmetic operators work only with numbers and always convert their operands to numbers.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio, la sottrazione e la divisione:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Conversione numerica, operatore unario +

<<<<<<< HEAD
L'operatore somma `+` esiste in due forme. La forma binaria che abbiamo utilizzato sopra, e quella unaria.

L'operatore unario di somma `+` viene applicato ad un singolo valore, non fa nulla con i numero, ma se l'operando non è un numero, viene convertito in un operando di tipo numerico.
=======
The plus `+` exists in two forms: the binary form that we used above and the unary form.

The unary plus or, in other words, the plus operator `+` applied to a single value, doesn't do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
// No effect on numbers
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Converts non-numbers
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

<<<<<<< HEAD
Si ottiene lo stesso risultato di `Number(...)`, ma in un modo più veloce.

La necessità di convertire stringhe in numeri si presenta molto spesso. Ad esempio, se stiamo prelevando un valore da un campo HTML, questo solitamente sarà di tipo stringa.
=======
It actually does the same thing as `Number(...)`, but is shorter.

The need to convert strings to numbers arises very often. For example, if we are getting values from HTML form fields, they are usually strings.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Come procedere in caso volessimo sommare questi valori?

La somma binaria li concatena come stringhe:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", the binary plus concatenates strings
```

<<<<<<< HEAD
Se invece vogliamo trattarli come numeri, possiamo prima convertirli e successivamente sommarli:
=======
If we want to treat them as numbers, we need to convert and then sum them:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let apples = "2";
let oranges = "3";

*!*
// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5
*/!*

// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5
```

<<<<<<< HEAD
Dal punto di vista di matematico l'abbondanza di operatori di somma può risultare strano. Diversamente, dal punto di vista informatico, non c'e nulla di speciale: la somma unaria viene applicata per prima, si occupa di convertire stringhe in numeri, successivamente la somma binaria esegue l'addizione.

Perchè la somma unaria viene applicata prima di quella binaria? Come adesso vedremo, questo accade per via della *precedenza maggiore*.

## Precedenza degli operatori

Se un espressione ha più di un operatore, l'ordine d'esecuzione viene definito dalla loro *precedenza*, in altre parole, c'è una priorità implicita tra gli operatori.

Fin dalle scuole sappiamo che la moltiplicazione nell'espressione `1 + 2 * 2` viene eseguita prima dell'addizione. E' proprio questo che si intende con precedenza. La moltiplicazione sta dicendo di avere *una precedenza più alta* rispetto all'addizione.

Le parentesi, superano qualsiasi precedenza, quindi se non siamo soddisfatti dell'ordine d'esecuzione, possiamo utilizzarle: `(1 + 2) * 2`.

Ci sono molti operatori in JavaScript. Ogni operatore ha un suo grado di precedenza. Quello con il grado più elevato viene eseguito per primo. Se il grado di precedenza è uguale si esegue da sinistra a destra.

Un estratto della [tabella delle precedenze](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (non è necessario che ve la ricordiate, ma tenete a mente che gli operatori unari hanno una precedenza più elevata rispetto ai corrispondenti binari):
=======
From a mathematician's standpoint, the abundance of pluses may seem strange. But from a programmer's standpoint, there's nothing special: unary pluses are applied first, they convert strings to numbers, and then the binary plus sums them up.

Why are unary pluses applied to values before the binary ones? As we're going to see, that's because of their *higher precedence*.

## Operator precedence

If an expression has more than one operator, the execution order is defined by their *precedence*, or, in other words, the implicit priority order of operators.

From school, we all know that the multiplication in the expression `1 + 2 * 2` should be calculated before the addition. That's exactly the precedence thing. The multiplication is said to have *a higher precedence* than the addition.

Parentheses override any precedence, so if we're not satisfied with the implicit order, we can use them to change it. For example: `(1 + 2) * 2`.

There are many operators in JavaScript. Every operator has a corresponding precedence number. The one with the larger number executes first. If the precedence is the same, the execution order is from left to right.

Here's an extract from the [precedence table](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (you don't need to remember this, but note that unary operators are higher than corresponding binary ones):
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

| Precedence | Name | Sign |
|------------|------|------|
| ... | ... | ... |
| 16 | unary plus | `+` |
| 16 | unary negation | `-` |
| 14 | multiplication | `*` |
| 14 | division | `/` |
| 13 | addition | `+` |
| 13 | subtraction | `-` |
| ... | ... | ... |
| 3 | assignment | `=` |
| ... | ... | ... |

<<<<<<< HEAD
Come possiamo vedere, la "somma unaria"(unary plus) ha una priorità di `16`, che è maggiore di `13` dell'addizione(somma binaria). Questo è il motivo per cui l'espressione `"+apples + +oranges"` esegue prima la somma unaria, e successivamente l'addizione.
=======
As we can see, the "unary plus" has a priority of `16` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Assegnazione

Da notare che anche l'assegnazione `=` è un operatore. Viene infatti elencato nella tabella delle precedenze con una priorità molto bassa: `3`.

<<<<<<< HEAD
Questo è il motivo per cui quando assegniamo un valore ad una variabile, come `x = 2 * 2 + 1`, i calcoli vengono eseguiti per primi, e successivamente viene valutato l'operatore `=`, che memorizza il risultato in `x`.
=======
That's why, when we assign a variable, like `x = 2 * 2 + 1`, the calculations are done first and then the `=` is evaluated, storing the result in `x`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

E' anche possibile concatenare assegnazioni:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

<<<<<<< HEAD
Le assegnazioni concatenate vengono valutate da destra a sinistra. Prima viene valutata l'espressione più a destra `2 + 2` e successivamente viene valutata l'assegnazione a sinistra: `c`, `b` e `a`. Alla fine, tutte le variabili condivideranno lo stesso valore.

````smart header="L'operatore di assegnazione`\"=\"` ritorna un valore"
Un operatore ritorna sempre un valore. Questo è ovvio per molti operatori come l'addizione `+` o la moltiplicazione `*`. Ma anche l'operatore di assegnazione segue la stessa regola.
=======
Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

````smart header="The assignment operator `\"=\"` returns a value"
An operator always returns a value. That's obvious for most of them like addition `+` or multiplication `*`. But the assignment operator follows this rule too.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

La chiamata `x = value` scrive `value` dentro `x` *e successivamente la ritorna*.

<<<<<<< HEAD
Qui c'e una demo che usa un assegnazione come parte di un espressione più complessa:
=======
Here's a demo that uses an assignment as part of a more complex expression:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

Nell'esempio qui sopra, il risultato di `(a = b + 1)` è il valore che viene assegnato ad `a` (che è `3`). Viene poi utilizzato per sottrarlo a `3`.

<<<<<<< HEAD
Sembra un codice strano, no? Dovremmo quindi capire perchè e come funzione, poichè potrete incontrarlo in alcune librerie di terze parti, anche se non dovreste mai scrivere nulla di simile. Queste scorciatoie non rendono per niente il codice pulito e leggibile.
=======
Funny code, isn't it? We should understand how it works, because sometimes we see it in 3rd-party libraries, but shouldn't write anything like that ourselves. Such tricks definitely don't make code clearer or readable.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
````

## Resto %

<<<<<<< HEAD
L'operatore di resto `%`, anche se può sembrare, non ha nulla a che fare con le percentuali.
=======
The remainder operator `%`, despite its appearance, is not related to percents.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Il risultato di `a % b` è il resto della divisione intera tra `a` e `b`.

Ad esempio:

```js run
alert( 5 % 2 ); // 1 is a remainder of 5 divided by 2
alert( 8 % 3 ); // 2 is a remainder of 8 divided by 3
alert( 6 % 3 ); // 0 is a remainder of 6 divided by 3
```

## Potenza **

L'operatore potenza `**` è stato aggiunto di recente al linguaggio.

Preso un numero naturale `b`, il risultato di `a ** b` è `a` moltiplicato per se stesso `b` volte.

Ad esempio:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

<<<<<<< HEAD
L'operatore funziona anche con valori non interi di `a` e `b`, ad esempio:
=======
The operator works for non-integer numbers as well.

For instance:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root, that's maths)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```

## Incremento/Decremento

<!-- Can't use -- in title, because built-in parse turns it into – -->

L'incremento o il decremento di un numero di uno è una delle operazioni numeriche più comuni.

<<<<<<< HEAD
Quindi, c'è un operatore speciale per questo:
=======
So, there are special operators for it:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

- **Incremento** `++` incrementa la variabile di 1:

    ```js run no-beautify
    let counter = 2;
    counter++;      // works the same as counter = counter + 1, but is shorter
    alert( counter ); // 3
    ```
- **Decremento** `--` decrementa la variabile di 1:

    ```js run no-beautify
    let counter = 2;
    counter--;      // works the same as counter = counter - 1, but is shorter
    alert( counter ); // 1
    ```

```warn
<<<<<<< HEAD
L'Incremento/decremento possono essere applicati solo a variabili. Se tentiamo di utilizzarli con un valore, come `5++` verrà sollevato un errore.
```

Gli operatori `++` e `--` possono essere inseriti sia prima che dopo la variabile.

- Quando l'operatore viene messo dopo la variabile, viene detto "forma post-fissa": `counter++`.
- La "forma pre-fissa" si ottiene inserendo l'operatore prima della variabile: `++counter`.

Entrambi questi metodi portano allo stesso risultato: incrementano `counter` di `1`.
=======
Increment/decrement can only be applied to variables. Trying to use it on a value like `5++` will give an error.
```

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in "postfix form": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

C'è qualche differenza? Si, ma possiamo notarla solo se andiamo ad utilizzare il valore di ritorno di `++/--`.

<<<<<<< HEAD
Facciamo chiarezza. Come sappiamo, tutti gli operatori ritornano un valore. L'incremento/decremento non fanno eccezione. La forma pre-fissa ritorna il nuovo valore, mentre la forma post-fissa ritorna il vecchio valore(prima dell'incremento/decremento).

Per vedere le differenze, guardiamo un esempio:
=======
Let's clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's an example:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

<<<<<<< HEAD
Nella riga `(*)` la chiamata pre-fissa di `++counter` incrementa `counter` e ritorna il nuovo valore che è `2`. Quindi `alert` mostra `2`.

Adesso proviamo ad utilizzare la forma post-fissa:
=======
In the line `(*)`, the *prefix* form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let's use the postfix form:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

<<<<<<< HEAD
Nella riga `(*)` la forma *post-fissa* `counter++` incrementa `counter`, ma ritorna il *vecchio* valore(prima dell'incremento). Quindi `alert` mostra `1`.
=======
In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Per ricapitolare:

<<<<<<< HEAD
- Se il risultato di un incremento/decremento non viene utilizzato, non ci sarà differenza qualsiasi forma venga utilizzata:
=======
- If the result of increment/decrement is not used, there is no difference in which form to use:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
<<<<<<< HEAD
- Se l'intenzione è di incrementare il valore *e* utilizzare il valore, allora si utilizza la forma pre-fissa:
=======
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
<<<<<<< HEAD
- Se si ha intenzione di incrementare, ma utilizzare il valore precedente, allora sarà necessario utilizzare la forma post-fissa:
=======
- If we'd like to increment a value but use its previous value, we need the postfix form:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

<<<<<<< HEAD
````smart header="Incremento/decremento contro gli operatori"
Gli operatori `++/--` possono essere utilizzati nello stesso modo all'interno di un espressione. La loro precedenza sarà maggiore degli altri operatori aritmetici.
=======
````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Confrontatelo con:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

<<<<<<< HEAD
Sebbene sia tecnicamente permesso, questa notazione rende il codice meno leggibile. Una linea che esegue più operazioni -- non è mai un bene.

Mentre leggiamo il codice, una rapido scorrimento con lo sguardo in "verticale" può facilmente far saltare la lettura di un parte di codice, come ad esempio `counter++`, e potrebbe quindi non essere ovvio che la variabile incrementa.

E' consigliato utilizzare lo stile "una linea -- un'azione":
=======
Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Operatori sui bit

Gli operatori sui bit trattano gli argomenti come numeri interi rappresentati in 32-bit e lavorano sulla loro rappresentazione binaria.

Questi operatori non sono specifici di JavaScript. Sono infatti supportati in molti linguaggi di programmazione.

La lista degli operatori:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

<<<<<<< HEAD
Questi operatori vengono utilizzati raramente. Per capirli, dovremmo entrare nella rappresentazione dei numeri a basso livello, e non è questo il contesto per approfondirli. Specialmente perchè non ne avremmo bisogno presto. Se siete curiosi, potete leggere l'articolo sugli [operatori BitWise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) su MDN. Potrebbero essere molto utili in certe situazioni di necessità.
=======
These operators are used very rarely. To understand them, we need to delve into low-level number representation and it would not be optimal to do that right now, especially since we won't need them any time soon. If you're curious, you can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN. It would be more practical to do that when a real need arises.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Modifica-in-posizione

<<<<<<< HEAD
Abbiamo spesso necessità di applicare un operatore ad una variabile e memorizzare il nuovo risultato.
=======
We often need to apply an operator to a variable and store the new result in that same variable.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

<<<<<<< HEAD
Questa notazione può essere accorciata utilizzando gli operatori `+=` e `*=`:
=======
This notation can be shortened using the operators `+=` and `*=`:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

<<<<<<< HEAD
Gli operatori di abbreviazione "modifica-in-posizione" esistono per tutti gli operatori, anche per quelli bit a bit(bitwise): `/=`, `-=` etc.
=======
Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Questi operatori hanno la stessa precedenza di una normale assegnazione, quindi l'assegnazione verrà effettuata dopo gli altri calcoli:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```

## Virgola

<<<<<<< HEAD
L'operatore virgola `,` è uno degli operatori più rari ed inusuali. Qualche volta viene utilizzato per scrivere codice più breve, quindi è necessario capirlo bene per sapere cosa sta succedendo.

L'operatore virgola ci consente di valutare diverse espressioni, dividendole con `,`. Ogni espressione viene valutata, ma solo dell'ultima viene ritornato il risultato.
=======
The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```

<<<<<<< HEAD
Qui la prima espressione `1 + 2` viene valutata, ed il suo risultato viene scartato, successivamente viene eseguito `3 + 4` e il suo risultato viene ritornato.
=======
Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```smart header="La virgola ha una precedenza molto bassa"
L'operatore virgola ha una precedenza molto bassa, più bassa di `=`, quindi le parentesi sono importanti nel'esempio sopra.

<<<<<<< HEAD
Senza parentesi: `a = 1 + 2, 3 + 4` verrebbe valutato `+` prima, sommando i numeri in `a = 3, 7`, poi viene valutato l'operatore di assegnazione `=` che assegna `a = 3`, e successivamente il numero `7` dopo la virgola, che viene ignorato.
```

Perchè dovremmo avere bisogno di un operatore che non ritorna nulla tranne l'ultima parte?

Qualche volta le persone lo utilizzano in costrutti  più complessi per eseguire più azioni in una sola riga.
=======
Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns    `a = 3`, and finally the number after the comma, `7`, is not processed so it's ignored.
```

Why do we need an operator that throws away everything except the last part?

Sometimes, people use it in more complex constructs to put several actions in one line.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

<<<<<<< HEAD
Questo "trick" viene utilizzato in molti framework JavaScript, per questo l'abbiamo menzionato. Ma solitamente non migliora la leggibilità del codice, quindi dovremmo pensarci bene prima di scrivere questo tipo di espressioni.
=======
Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But, usually, they don't improve code readability so we should think well before using them.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
