# Conversione di tipi

<<<<<<< HEAD
 Nella maggior parte dei casi, operatori e funzioni convertono automaticamente il valore nel tipo corretto. Questo viene detto "conversione di tipi".
=======
Most of the time, operators and functions automatically convert the values given to them to the right type. This is called "type conversion".
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio, `alert` converte automaticamente un valore qualsiasi in una stringa, per poterla mostrare. Le operazioni matematica convertono i valori in numeri.

<<<<<<< HEAD
Ci sono anche casi in cui è necessario convertire esplicitamente i valori per poter non provocare errori.

```smart header="Non parliamo ancora di oggetti"
In questo capitolo non parleremo ancora di oggetti. Ci dedicheremo ai tipi primitivi. Successivamente, dopo aver capito gli oggetti, capire come funziona la conversione di oggetti, nel capitolo <info:object-toprimitive>.
=======
There are also cases when we need to explicitly convert a value to the expected type.

```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. Instead, we'll study primitives first. Later, after we learn about objects, we'll see how object conversion works in the chapter <info:object-toprimitive>.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
```

## ToString

La conversione in stringa è utile quando abbiamo bisogno del formato stringa di un valore.

Ad esempio, `alert(value)` effettua questa conversione per mostrare il valore.

<<<<<<< HEAD
Possiamo anche utilizzare la funzione `String(value)`, per ottenere un risultato simile:
=======
We can also call the `String(value)` function to convert a value to a string:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // now value is a string "true"
alert(typeof value); // string
*/!*
```

<<<<<<< HEAD
La conversione in stringa è quella più ovvia. Il valore `false` diventa la stringa `"false"`, mentre `null` diventa `"null"` etc.
=======
String conversion is mostly obvious. A `false` becomes `"false"`, `null` becomes `"null"`, etc.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## ToNumber

La conversione numerica viene applicata automaticamente nelle funzioni ed espressioni matematiche.

Ad esempio, quando la divisione `/` viene applicata ad un tipo non numerico:

```js run
alert( "6" / "2" ); // 3, strings are converted to numbers
```
<<<<<<< HEAD
funzine
Possiamo utilizzare la funzione `Number(value)` per convertire esplicitamente un valore `value`:
=======

We can use the `Number(value)` function to explicitly convert a `value` to a number:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // becomes a number 123

alert(typeof num); // number
```

<<<<<<< HEAD
Una conversione esplicita è solitamente richiesta quando leggiamo un valore da una risorsa di tipo stringa, come un form testuale, ma ci aspettiamo l'inserimento di un numero.

Se la stringa non risulta essere un numero valido, il risultato della conversione sarà `NaN`, ad esempio:
=======
Explicit conversion is usually required when we read a value from a string-based source like a text form but expect a number to be entered.

If the string is not a valid number, the result of such a conversion is `NaN`. For instance:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

Le regole di conversione numerica:

| Valore |  Diventa... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
<<<<<<< HEAD
|<code>true&nbsp;e&nbsp;false</code> | `1` e `0` |
| `string` | Gli spazi bianchi dall'inizio e dalla fine vengono rimossi. Poi, se il resto della stringa è vuota, il risultato è `0`. Altrimenti, il numero viene "letto" dalla stringa. Un errore restituirà `NaN`. |
=======
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | Whitespaces from the start and end are removed. If the remaining string is empty, the result is `0`. Otherwise, the number is "read" from the string. An error gives `NaN`. |
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Esempi:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

<<<<<<< HEAD
Nota che `null` e `undefined` si comportano diversamente: `null` diventa zero, mentre `undefined` diventa `NaN`.

````smart header="L'addizione '+' concatena le stringhe"
Quasi tutte le operazioni matematiche convertono valori in numeri. Con un importante eccezione per l'addizione `+`. Se uno degli operandi è una stringa, allora anche gli altri vengono convertiti in stringhe.

E successivamente li concatena (unisce):
=======
Please note that `null` and `undefined` behave differently here: `null` becomes zero while `undefined` becomes `NaN`.

````smart header="Addition '+' concatenates strings"
Almost all mathematical operations convert values to numbers. A notable exception is addition `+`. If one of the added values is a string, the other one is also converted to a string.

Then, it concatenates (joins) them:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
alert( 1 + '2' ); // '12' (string to the right)
alert( '1' + 2 ); // '12' (string to the left)
```

<<<<<<< HEAD
Questo accade solo quando almeno uno degli argomenti è di tipo stringa. Altrimenti, i valori vengono convertiti in numeri
=======
This only happens when at least one of the arguments is a string. Otherwise, values are converted to numbers.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
````

## ToBoolean

La conversione booleana è quella più semplice.

<<<<<<< HEAD
Questa si verifica con le operazioni logiche (più avanti incontreremo i testi di condizione ed altri tipi di operazione logiche), ma può anche essere richiamato manualmente con la funzione `Boolean(value)`.
=======
It happens in logical operations (later we'll meet condition tests and other similar things) but can also be performed explicitly with a call to `Boolean(value)`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Le regole di conversione:

<<<<<<< HEAD
- I valori che sono intuitivamente "vuoti", come lo `0`, una stringa vuota, `null`, `undefined` e `NaN` diventano `false`.
- Gli altri valori diventano `true`.
=======
- Values that are intuitively "empty", like `0`, an empty string, `null`, `undefined`, and `NaN`, become `false`.
- Other values become `true`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

<<<<<<< HEAD
````warn header="Da notare: una stringa contenente `\"0\"` viene valutata come `true`"
Alcun linguaggi (come il PHP) trattano `"0"` come `false`. Diversamente in JavaScript una stringa non vuota è sempre `true`.
=======
````warn header="Please note: the string with zero `\"0\"` is `true`"
Some languages (namely PHP) treat `"0"` as `false`. But in JavaScript, a non-empty string is always `true`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)
```
````


## Riepilogo

<<<<<<< HEAD
I tre tipi di conversioni più utilizzati sono: a *string*, a *number* e a *boolean*.

**`ToString`** -- Avviene quando stampiamo qualcosa a schermo, può essere richiamato con `String(value)`. La conversione a stringa è solitamente ovvia per i valore primitivi.

**`ToNumber`** -- Utilizzata nelle operazioni matematiche, può essere richiamata esplicitamente con `Number(value)`.
=======
The three most widely used type conversions are to string, to number, and to boolean.

**`ToString`** -- Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**`ToNumber`** -- Occurs in math operations. Can be performed with `Number(value)`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

La conversione segue le seguenti regole:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | La stringa viene letta per "com'è", gli spazi bianchi agli estremi vengono ignorati. Una stringa vuota diventa `0`. Un errore restituisce `NaN`. |

<<<<<<< HEAD
**`ToBoolean`** -- Avviene nelle operazioni logiche, può anche essere richiamato esplicitamente con `Boolean(value)`.
=======
**`ToBoolean`** -- Occurs in logical operations. Can be performed with `Boolean(value)`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Segue le regole:

| Value |  Becomes... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|qualsiasi altro valore| `true` |


La maggior parte di queste regole sono facili da capire e memorizzare. Gli errori più comuni che commettono le persone sono:

- `undefined` vale `NaN` come un numero, non `0`.
- `"0"` e le stringhe che contengono solamente spazi `"   "` vengono interpretate come true.

<<<<<<< HEAD
Qui non abbiamo coperto gli oggetti, ci ritorneremo più avanti nel capitolo <info:object-toprimitive> che è dedicato esclusivamente agli oggetti, dopo che avremmo imparato più cose basilari su JavaScript.
=======
Objects aren't covered here. We'll return to them later in the chapter <info:object-toprimitive> that is devoted exclusively to objects after we learn more basic things about JavaScript.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
