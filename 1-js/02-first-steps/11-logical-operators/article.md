# Operatori logici

In JavaScript ci sono tre operatori logici: `||` (OR), `&&` (AND), `!` (NOT).

<<<<<<< HEAD
Nonostante si chiamino "logici", possono essere applicati a valori di qualsiasi tipo, non solo ai booleani. Il risultato stesso può essere di qualunque tipo.
=======
Although they are called "logical", they can be applied to values of any type, not only boolean. Their result can also be of any type.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Vediamoli nei dettagli.

## || (OR)

L'operatore "OR" viene rappresentato da due linee verticali:

```js
result = a || b;
```

<<<<<<< HEAD
Nella programmazione classica, l'OR logico è pensato per manipolare solo tipi booleani. Se almeno un argomento è `true`, allora il risultato sarà `true`, altrimenti sarà `false`.

In JavaScript questo operatore è un pò più potente. Ma prima guardiamo come si comporta con valori booleani.
=======
In classical programming, the logical OR is meant to manipulate boolean values only. If any of its arguments are `true`, it returns `true`, otherwise it returns `false`.

In JavaScript, the operator is a little bit trickier and more powerful. But first, let's see what happens with boolean values.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ci sono quattro combinazioni logiche possibili:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Come possiamo vedere, il risultato è sempre `true` tranne nei casi in cui entrambi gli operandi sono `false`.

<<<<<<< HEAD
Se un operando non è booleano, allora viene convertito in booleano per essere valutato.

Ad esempio, il numero `1` viene visto come `true`, il numero `0` -- come `false`:
=======
If an operand is not a boolean, it's converted to a boolean for the evaluation.

For instance, the number `1` is treated as `true`, the number `0` as `false`:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run
if (1 || 0) { // works just like if( true || false )
  alert( 'truthy!' );
}
```

<<<<<<< HEAD
La maggior parte delle volte, OR `||` viene utilizzato in un `if` per verificare se *almeno una* delle condizioni è vera.
=======
Most of the time, OR `||` is used in an `if` statement to test if *any* of the given conditions is `true`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ad esempio:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

Possiamo passare molteplici condizioni:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // it is the weekend
}
```

<<<<<<< HEAD
## OR preleva il primo valore vero

La logica descritta sopra è ovvia. Adesso proviamo ad addentrarci in qualche caratteristica "extra" di JavaScript.
=======
## OR finds the first truthy value

The logic described above is somewhat classical. Now, let's bring in the "extra" features of JavaScript.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Si può estendere l'algoritmo come segue:

Dando molti valori tramite OR:

```js
result = value1 || value2 || value3;
```

L'operatore OR `||` si comporta come segue:

<<<<<<< HEAD
- Valuta gli operandi da sinistra a destra.
- Ogni operando viene converito in booleano. Se il risultato è `true`, allora si ferma e ritorna il valore originale dell'operando.
- Se tutti gli altri operandi sono stati valutati (ad esempio tutti erano `false`), ritorna l'ultimo operando.
=======
- Evaluates operands from left to right.
- For each operand, converts it to boolean. If the result is `true`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were `false`), returns the last operand.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Un valore viene ritornato nella sua forma originale, non nella sua conversione booleana.

In altra parole, una catena di OR `"||"` ritorna il primo valore vero, se invece non ce ne sono ritorna l'ultimo valore trovato.

Ad esempio:

```js run
alert( 1 || 0 ); // 1 (1 is truthy)
alert( true || 'no matter what' ); // (true is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)
alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)
```

<<<<<<< HEAD
Questo ci porta ad alcuni utilizzi interessanti rispetto al "puro e classico OR booleano".boolean-only OR".

1. **Prelevare il primo valore vero da una lista di variabili o espressioni.**

    Immaginiamo di avere diverse variabili, che possono contenere sia dati che `null/undefined`. Abbiamo bisogno di scegliere la prima che contiene dati.

    Possiamo utilizzare OR `||` per questo:
=======
This leads to some interesting usage compared to a "pure, classical, boolean-only OR".

1. **Getting the first truthy value from a list of variables or expressions.**

    Imagine we have several variables which can either contain data or be `null/undefined`. How can we find the first one with data?

    We can use OR `||`:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

    ```js run
    let currentUser = null;
    let defaultUser = "John";

    *!*
    let name = currentUser || defaultUser || "unnamed";
    */!*

    alert( name ); // selects "John" – the first truthy value
    ```

<<<<<<< HEAD
    Se entrambe `currentUser` e `defaultUser` sono false allora il risultato sarà `"unnamed"`.
2. **Valutazione a Corto-Circuito.**

    Gli operandi non possono essere solo valori, ma anche espressioni arbitrarie. OR valuta ed esegue i test da sinistra a destra. La valutazione si ferma quando un viene trovato un valore vero, questo viene poi ritornato. Il processo è chiamata "valutazione a corto-circuito", perchè cerca di terminare il prima possibile partendo da sinistra verso destra.

    Questo si vede chiaramente quando il secondo argomento causerebbe side-effect. Come l'assegnazione di una variabile.

    Se proviamo ad eseguire l'esempio che segue, `x` non verrà assegnata:
=======
    If both `currentUser` and `defaultUser` were falsy, `"unnamed"` would be the result.
2. **Short-circuit evaluation.**

    Operands can be not only values, but arbitrary expressions. OR evaluates and tests them from left to right. The evaluation stops when a truthy value is reached, and the value is returned. This process is called "a short-circuit evaluation" because it goes as short as possible from left to right.

    This is clearly seen when the expression given as the second argument has a side effect like a variable assignment.

    In the example below, `x` does not get assigned:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

    ```js run no-beautify
    let x;

    *!*true*/!* || (x = 1);

    alert(x); // undefined, because (x = 1) not evaluated
    ```

<<<<<<< HEAD
    ...Se il primo argomento è `false`, allora `OR` prosegue e valuta il secondo, in questo caso l'assegnazione funziona:
=======
    If, instead, the first argument is `false`, `||` evaluates the second one, thus running the assignment:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

    ```js run no-beautify
    let x;

    *!*false*/!* || (x = 1);

    alert(x); // 1
    ```

<<<<<<< HEAD
    Un assegnazione è un caso semplice, potrebbero essere coinvolti altri tipi di side-effect.

    Quello che abbiamo visto, è un "modo breve di fare `if`". Il primo operando viene convertito a booleano e solo se è falso viene eseguito il secondo.

    La maggior parte delle volte è meglio utilizzare un " `if` "regolare", per mantenere il codice leggibile, in alcuni casi però può risultare utile.
=======
    An assignment is a simple case. Other side effects can also be involved.

    As we can see, such a use case is a "shorter way of doing `if`". The first operand is converted to boolean. If it's false, the second one is evaluated.

    Most of time, it's better to use a "regular" `if` to keep the code easy to understand, but sometimes this can be handy.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## && (AND)

L'operatore AND viene rappresentato con `&&`:

```js
result = a && b;
```

<<<<<<< HEAD
Nella programmazione classica AND ritorna `true` se entrambri gli operandi sono veri, altrimenti ritorna `false`:
=======
In classical programming, AND returns `true` if both operands are truthy and `false` otherwise:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

Un esempio con `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

<<<<<<< HEAD
Proprio come per OR, qualsiasi valore è consentito come operando per AND:
=======
Just as with OR, any value is allowed as an operand of AND:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run
if (1 && 0) { // evaluated as true && false
  alert( "won't work, because the result is falsy" );
}
```


<<<<<<< HEAD
## AND cerca il primo valore falso
=======
## AND finds the first falsy value
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Fornire più valori AND:

```js
result = value1 && value2 && value3;
```

L'operatore AND `&&` si comporta come segue:

<<<<<<< HEAD
- Valuta gli operandi da sinistra a destra.
- Ogni operando viene convertito in booleano. Se il risultato è `false`, si ferma e ritorna il valore originale dell'operando.
- Se tutti gli operandi precedenti sono stati valutati (ad esempio nel caso siano tutti veri) , ritorna l'ultimo operando.
=======
- Evaluates operands from left to right.
- For each operand, converts it to a boolean. If the result is `false`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were truthy), returns the last operand.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

In altre parole, AND ritorna il primo valore falso se lo trova, altrimenti ritorna l'ultimo valore.

Le regole sono molto simili a quelle dell'OR. La differenza è che AND ritorna il primo valore *falso* mentre OR ritorna il primo valore *VERO*.

Esempi:

```js run
// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

Possiamo anche passare diversi valori in una sola riga. Vediamo come viene ritornato il primo valore falso:

```js run
alert( 1 && 2 && null && 3 ); // null
```

Quando tutti i valori sono veri, viene ritornato l'ultimo valore:

```js run
alert( 1 && 2 && 3 ); // 3, the last one
```

````smart header="Precedenza di AND `&&` è maggiore dell'OR `||`"
La precedenza dell'operatore AND`&&` è maggiore di quella dell'OR `||`.

<<<<<<< HEAD
Quindi il codice `a && b || c && d` è praticamente uguale all'espressione: `(a && b) || (c && d)`.
=======
So the code `a && b || c && d` is essentially the same as if the `&&` expressions were in parentheses: `(a && b) || (c && d)`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
````

Proprio come l'OR, anche AND `&&` può qualche volta rimpiazzare `if`.

Ad esempio:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

<<<<<<< HEAD
Le azione nella parte destra di `&&` vengono eseguite solamente se la valutazione non si ferma prima. Cioè: solo se `(x > 0)` è vera.
=======
The action in the right part of `&&` would execute only if the evaluation reaches it. That is, only if `(x > 0)` is true.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Quindi sostanzialmente è analogo a:

```js run
let x = 1;

if (x > 0) {
  alert( 'Greater than zero!' );
}
```

<<<<<<< HEAD
La variante con `&&` sembra essere più corta. Ma l'istruzione `if` è più ovvia e tende ad essere più leggibile.

Quindi è consigliato usare ogni costrutto solo per i suoi scopi. Usate un `if` se volete imporre una condizione. Utilizzate invece `&&` se volete un AND.
=======
The variant with `&&` appears shorter. But `if` is more obvious and tends to be a little bit more readable.

So we recommend using every construct for its purpose: use `if` if we want if and use `&&` if we want AND.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## ! (NOT)

L'operatore booleano NOT viene rappresentato dal punto esclamativo `!`.

La sintassi è piuttosto semplice:

```js
result = !value;
```

L'operatore accetta un solo argomento e si comporta come segue:

<<<<<<< HEAD
1. Converte l'operando al tipo booleano: `true/false`.
2. Ritorna il valore inverso.
=======
1. Converts the operand to boolean type: `true/false`.
2. Returns the inverse value.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

Ad esempio:

```js run
alert( !true ); // false
alert( !0 ); // true
```

Un doppio NOT `!!` viene talvolta utilizzato per convertire un valore al tipo booleano:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

<<<<<<< HEAD
Quello che accade è che il primo NOT converte il tipo a booleano e ritorna il suo inverso, il secondo NOT lo inverte nuovamente. Alla fine abbiamo un valore di tipo booleano.
=======
That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

C'è un modo molto più lungo per fare la stessa cosa -- una funzione del linguaggio `Boolean`:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

<<<<<<< HEAD
La precedenza del NOT `!` è la più alta fra tutti gli operatori logici quindi viene sempre eseguita per prima, precede `&&`, `||`.
=======
The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
