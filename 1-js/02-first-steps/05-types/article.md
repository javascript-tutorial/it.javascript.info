# Tipi di dato

<<<<<<< HEAD
Una variabile in JavaScript può contenere qualsiasi dato. Una variabile può essere di tipo stringa in un istante e successivamente ricevere un valore numerico:
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
// nessun errore
let message = "hello";
message = 123456;
```

<<<<<<< HEAD
I linguaggi di programmazione che lo consentono sono detti "dinamicamente tipati", questo significa che ci sono tipi di dato, ma le variabili non sono legate ad un tipo.

Ci sono sette tipi di dato in JavaScript. Qui ne studiamo le basi, nel prossimo capitolo lo entreremo nei dettagli.

## Tipo Numerico
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.

## Number
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
let n = 123;
n = 12.345;
```

Il tipo *numerico* serve sia per i numeri interi che per quelli in virgola mobile.

Ci sono varie operazioni disponibili con i numeri, ad esempio la moltiplicazione `*`, la divisione `/`, l'addizione `+`, la sottrazione `-` e molte altre.

Oltre i normali numeri, ci sono anche i "valori numerici speciali" che appartengono sempre al tipo numerico: `Infinito`, `-Infinito` e `NaN`.

- `Infinito` rappresenta il concetto matematico [Infinito](https://en.wikipedia.org/wiki/Infinity) ∞. E' un valore speciale che è più grande di qualsiasi altro numero.

    Possiamo ottenerlo come risultato tramite la divisione per zero:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    O inserendolo direttamente nel codice:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` rappresenta un errore di calcolo. E' il risultato di un operazione non corretta o indefinita, per esempio:

    ```js run
    alert( "not a number" / 2 ); // NaN, such division is erroneous
    ```

    `NaN` è "appiccicoso". Qualsiasi operazione su `NaN` restituirà `NaN`:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    Quindi, se è presente un `NaN` da qualche parte nell'operazione matematica, questo si propagherà fino al risultato.

```smart header="Le operazioni matematiche sono sicure"
In JavaScript le operazioni matematichstrige sono sicure. Possiamo fare qualsiasi cosa: dividere per zero, trattare stringhe non numeriche come numeri, etc.

Lo script non si interromperà mai con un errore fatale ("die"). Nel peggiore dei casi otterremo un `NaN` come risultato.
```

I numeri con valore speciale appartengono formalmente al tipo "numerico". Ovviamente non sono numeri nel vero senso della parola.

Vedremo di più su come lavorare con i numeri nel capitolo <info:number>.

<<<<<<< HEAD
## Tipo Stringa
=======
## BigInt

In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.

```smart header="Compatibility issues"
Right now `BigInt` is supported in Firefox/Chrome/Edge, but not in Safari/IE.
```

## String
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Una stringa in JavaScript deve essere tra apici.

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

In JavaScript, ci sono 3 tipi di apici. 

1. Apici doppi: `"Hello"`.
2. Apice singolo: `'Hello'`.
3. Accento grave: <code>&#96;Hello&#96;</code>.

<<<<<<< HEAD
Gli apici doppi e singoli sono apici "semplici". Non c'e differenza tra di loro in JavaScript.
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

L'accento grave (backticks) sono degli apici per le "funzionalità estese". Ci consentono di integrare variabili ed espressioni in una stringa racchiudendole in `${…}`, per esempio:

```js run
let name = "John";

// variabile integrata
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// espressione integrata
alert( `the result is *!*${1 + 2}*/!*` ); // il risultato è 3
```

L'espressione all'interno di `${…}` viene valutata ed il risultato diventa parte della stringa. Possiamo metterci qualsiasi cosa: una variabile come `name` oppure un espressione aritmetica come `1 + 2` o qualcosa di più complesso.

Nota che questo è possibile sono tramite l'accento grave. Gli altri apici non lo consentono!
```js run
alert( "the result is ${1 + 2}" ); // il risultato è ${1 + 2} (le virgolette non fanno nulla)
```

Copriremo meglio le stringhe nel capitolo <info:string>.

<<<<<<< HEAD
```smart header="Non c'è il tipo *carattere*."
In alcuni linguaggi, c'è un tipo "carattere" per i caratteri singoli. Per esempio, nel linguaggio C ed in Java c'è `char`.

In JavaScript, non è presente questo tipo. C'è solamente il tipo: `string`. Una stringa può contenere un solo carattere o più di uno.
```

## Tipo booleano (tipo logico)
=======
```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
```

## Boolean (logical type)
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Il tipo booleano ha solo due valori: `true` e `false`.

Questo tipo viene tipicamente utilizzato per memorizzare valori si/no: `true` significa "Si, corretto", e `false` significa "No, scorretto".

Per esempio:

```js
let nameFieldChecked = true; // si, il campo nome è spuntato
let ageFieldChecked = false; // no, il campo age non è spuntato
```

I valori booleani si ottengono anche come risultato di operazioni di confronto:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (il risultato del confronto è "si")
```

Copriremo i valori booleani più in dettaglio nel capitolo <info:logical-operators>.

## Il valore "null"

Il valore speciale `null` non appartiene a nessun tipo di quelli descritti fino ad ora.

Fa parte di un altro tipo, che contiene solo il valore `null`: 

```js
let age = null;
```

In JavaScript `null` non è un "riferimento ad un oggetto inesistente" o un "puntatore nullo" come in altri linguaggi.

E' solamente un valore speciale che ha il senso di "nulla", "vuoto" o "valore sconosciuto".

<<<<<<< HEAD
Il codice sopra indica che `age` è sconosciuto o vuoto per qualche motivo.
=======
The code above states that `age` is unknown.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

## Il valore "undefined" 

Il valore speciale `undefined` vive a parte. Fa da tipo a se stesso, proprio come `null`.

Il significato di `undefined` è che "il valore non è assegnato".

Se una variabile viene dichiarata, ma non assegnata, il suo valore è esattamente `undefined`:

```js run
let age;

<<<<<<< HEAD
alert(x); // mostra "undefined"
```

Tecnicamente, è possibile assegnare `undefined` a qualsiasi variabile:
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
...Ma non è comunque consigliabile farlo. Normalmente, si utilizza `null` per descrivere un valore "vuoto" o "sconosciuto" della variabile, e `undefined` viene utilizzato solo per i controlli, per verificare se la variabile è stata assegnata.
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

## Oggetti e Simboli

Il tipo `object` è speciale.

<<<<<<< HEAD
Tutti gli altri tipi descritti sono chiamati "primitivi", perchè i loro valori possono contenere solo una cosa (può essere una stringa, un numero o altro). Invece, gli oggetti vengono utilizzati per memorizzare una collezione di dati ed entità più complesse. Li tratteremo nel capitolo <info:object> dopo avere appreso abbastanza sui tipi primitivi.

Il tipo `symbol` viene utilizzato per creare identificatori unici per gli oggetti. Li abbiamo citati per completezza, ma è meglio studiarli dopo aver compreso gli oggetti.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

## L'operatore typeof [#type-typeof]

L'operatore `typeof` ritorna il tipo dell'argomento. E' utile quando vogliamo lavorare con valori di tipi differenti, o per eseguire controlli rapidi.

Sono supportate due sintassi:

1. Come operatore: `typeof x`.
2. Come funzione: `typeof(x)`.

In altre parole, funziona sia con le parentesi che senza. Il risultato è lo stesso.

Una chiamata a `typeof x` ritorna una stringa con il nome del tipo:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Le ultime tre linee potrebbero richiedere una spiegazione ulteriore:

<<<<<<< HEAD
1. `Math` è un oggetto integrato che fornisce operazioni matematiche avanzate. Lo studieremo nel capitolo <info:number>. Qui ha il semplice scopo di rappresentare un oggetto.
2. Il risultato di `typerisulaof null` è `"object"`. Questo è errato. E' un errore ufficialmente riconosciuto del `typeof`, mantenuto per retro-compatibilità. Ovviamente, `null` non è un oggetto. E' un valore speciale che fa da tipo a se stesso. Quindi, nuovamente, questo è un errore del linguaggio.
3. Il risultato di `typeof alert` è `"function"`, perchè `alert` è una funzione del linguaggio. Studieremo le funzioni nel prossimo capitolo, e vedremo che non c'e nessun tipo "funzione" nel linguaggio. Le funzioni appartengono al tipo oggetto. Ma `typeof` le tratta differentemente. Formalmente, è errato, ma molto utile nella pratica.

## Riepilogo
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof` behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Ci sono 7 tipi base in JavaScript.

<<<<<<< HEAD
- `number` per numeri di qualsiasi tipo: interi o in virgola mobile.
- `string` per stringhe. Una stringa può contenere uno o più caratteri, non esiste nessun tipo `character`.
- `boolean` per `true`/`false`.
- `null` per valori sconosciuti -- un valore a parte che contiene solo il valore `null`.
- `undefined` per valori non assegnati -- un tipo a parte che ha il solo valore `undefined`.
- `object` per strutture dati più complesse.
- `symbol` per identificatori unici.

L'operatore `typeof` ci consente di vedere quale tipo è memorizzato nella variabile.
=======
There are 8 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point, integers are limited by ±2<sup>53</sup>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

- Due forme: `typeof x` o `typeof(x)`.
- Ritorna una stringa con il nome del tipo, come `"string"`.
- Il valore `null` ritorna `"object"` -- è un errore del linguaggio, infatti non è un oggetto.

Nel prossimo capitolo ci concentreremo nei tipi primitivi e quando avremo preso familiarità, passeremo agli oggetti.
