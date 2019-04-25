# Tipi di dato

<<<<<<< HEAD
Una variabile in JavaScript può contenere qualsiasi dato. Una variabile può essere di tipo stringa in un istante e successivamente ricevere un valore numerico:
=======
A variable in JavaScript can contain any data. A variable can at one moment be a string and at another be a number:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
// no error
let message = "hello";
message = 123456;
```

I linguaggi di programmazione che lo consentono sono detti "dinamicamente tipati", questo significa che ci sono tipi di dato, ma le variabili non sono legate ad un tipo.

<<<<<<< HEAD
Ci sono sette tipi di dato in JavaScript. Qui ne studiamo le basi, nel prossimo capitolo lo entreremo nei dettagli.
=======
There are seven basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Tipo Numerico

```js
let n = 123;
n = 12.345;
```

<<<<<<< HEAD
Il tipo *numerico* serve sia per i numeri interi che per quelli in virgola mobile.

Ci sono varie operazioni disponibili con i numeri, ad esempio la moltiplicazione `*`, la divisione `/`, l'addizione `+`, la sottrazione `-` e molte altre.

Oltre i normali numeri, ci sono anche i "valori numerici speciali" che appartengono sempre al tipo numerico: `Infinito`, `-Infinito` e `NaN`.
=======
The *number* type represents both integer and floating point numbers.

There are many operations for numbers, e.g. multiplication `*`, division `/`, addition `+`, subtraction `-`, and so on.

Besides regular numbers, there are so-called "special numeric values" which also belong to this data type: `Infinity`, `-Infinity` and `NaN`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

- `Infinito` rappresenta il concetto matematico [Infinito](https://en.wikipedia.org/wiki/Infinity) ∞. E' un valore speciale che è più grande di qualsiasi altro numero.

    Possiamo ottenerlo come risultato tramite la divisione per zero:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

<<<<<<< HEAD
    O inserendolo direttamente nel codice:
=======
    Or just reference it directly:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` rappresenta un errore di calcolo. E' il risultato di un operazione non corretta o indefinita, per esempio:

    ```js run
    alert( "not a number" / 2 ); // NaN, such division is erroneous
    ```

<<<<<<< HEAD
    `NaN` è appiccicoso. Qualsiasi operazione su `NaN` restituirà `NaN`:
=======
    `NaN` is sticky. Any further operation on `NaN` returns `NaN`:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

<<<<<<< HEAD
    Quindi, se è presente un `NaN` da qualche parte nell'operazione matematica, questo si propagherà fino al risultato.

```smart header="Le operazioni matematiche sono sicure"
In JavaScript le operazioni matematichstrige sono sicure. Possiamo fare qualsiasi cosa: dividere per zero, trattare stringhe non numeriche come numeri, etc.

Lo script non si interromperà mai con un errore fatale ("die"). Nel peggiore dei casi otterremo un `NaN` come risultato.
```

I numeri con valore speciale appartengono formalmente al tipo "numerico". Ovviamente non sono numeri nel vero senso della parola.
=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result.

```smart header="Mathematical operations are safe"
Doing maths is "safe" in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.

The script will never stop with a fatal error ("die"). At worst, we'll get `NaN` as the result.
```

Special numeric values formally belong to the "number" type. Of course they are not numbers in the common sense of this word.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Vedremo di più su come lavorare con i numeri nel capitolo <info:number>.

## Tipo Stringa

<<<<<<< HEAD
Una stringa in JavaScript deve essere tra apici.
=======
A string in JavaScript must be surrounded by quotes.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`;
```

In JavaScript, ci sono 3 tipi di apici. 

1. Apici doppi: `"Hello"`.
2. Apice singolo: `'Hello'`.
3. Accento grave: <code>&#96;Hello&#96;</code>.

Gli apici doppi e singoli sono apici "semplici". Non c'e differenza tra di loro in JavaScript.

L'accento grave (backticks) sono degli apici per le "funzionalità estese". Ci consentono di integrare variabili ed espressioni in una stringa racchiudendole in `${…}`, per esempio:

```js run
let name = "John";

// embed a variable
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// embed an expression
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

<<<<<<< HEAD
L'espressione all'interno di `${…}` viene valutata ed il risultato diventa parte della stringa. Possiamo metterci qualsiasi cosa: una variabile come `name` oppure un espressione aritmetica come `1 + 2` o qualcosa di più complesso.

Nota che questo è possibile sono tramite l'accento grave. Gli altri apici non lo consentono!
=======
The expression inside `${…}` is evaluated and the result becomes a part of the string. We can put anything in there: a variable like `name` or an arithmetical expression like `1 + 2` or something more complex.

Please note that this can only be done in backticks. Other quotes don't have this embedding functionality!
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)
```

Copriremo meglio le stringhe nel capitolo <info:string>.

```smart header="Non c'è il tipo *carattere*."
In alcuni linguaggi, c'è un tipo "carattere" per i caratteri singoli. Per esempio, nel linguaggio C ed in Java c'è `char`.

In JavaScript, non è presente questo tipo. C'è solamente il tipo: `string`. Una stringa può contenere un solo carattere o più di uno.
```

## Tipo booleano (tipo logico)

Il tipo booleano ha solo due valori: `true` e `false`.

Questo tipo viene tipicamente utilizzato per memorizzare valori si/no: `true` significa "Si, corretto", e `false` significa "No, scorretto".

Per esempio:

```js
let nameFieldChecked = true; // yes, name field is checked
let ageFieldChecked = false; // no, age field is not checked
```

I valori booleani si ottengono anche come risultato di operazioni di confronto:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (the comparison result is "yes")
```

<<<<<<< HEAD
Copriremo i valori booleani più in dettaglio nel capitolo <info:logical-operators>.
=======
We'll cover booleans more deeply in the chapter <info:logical-operators>.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Il valore "null"

<<<<<<< HEAD
Il valore speciale `null` non appartiene a nessun tipo di quelli descritti fino ad ora.

Fa parte di un altro tipo, che contiene solo il valore `null`: 
=======
The special `null` value does not belong to any of the types described above.

It forms a separate type of its own which contains only the `null` value:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
let age = null;
```

<<<<<<< HEAD
In JavaScript `null` non è un "riferimento ad un oggetto inesistente" o un "puntatore nullo" come in altri linguaggi.

E' solamente un valore speciale che ha il senso di "nulla", "vuoto" o "valore sconosciuto".

Il codice sopra indica che `age` è sconosciuto o vuoto per qualche motivo.
=======
In JavaScript, `null` is not a "reference to a non-existing object" or a "null pointer" like in some other languages.

It's just a special value which represents "nothing", "empty" or "value unknown".

The code above states that `age` is unknown or empty for some reason.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Il valore "undefined" 

<<<<<<< HEAD
Il valore speciale `undefined` vive a parte. Fa da tipo a se stesso, proprio come `null`.
=======
The special value `undefined` also stands apart. It makes a type of its own, just like `null`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Il significato di `undefined` è che "il valore non è assegnato".

<<<<<<< HEAD
Se una variabile viene dichiarata, ma non assegnata, il suo valore è esattamente `undefined`:
=======
If a variable is declared, but not assigned, then its value is `undefined`:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let x;

alert(x); // shows "undefined"
```

Tecnicamente, è possibile assegnare `undefined` a qualsiasi variabile:

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

<<<<<<< HEAD
...Ma non è comunque consigliabile farlo. Normalmente, si utilizza `null` per descrivere un valore "vuoto" o "sconosciuto" della variabile, e `undefined` viene utilizzato solo per i controlli, per verificare se la variabile è stata assegnata.
=======
...But we don't recommend doing that. Normally, we use `null` to assign an "empty" or "unknown" value to a variable, and we use `undefined` for checks like seeing if a variable has been assigned.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Oggetti e Simboli

Il tipo `object` è speciale.

<<<<<<< HEAD
Tutti gli altri tipi descritti sono chiamati "primitivi", perchè i loro valori possono contenere solo una cosa (può essere una stringa, un numero o altro). Invece, gli oggetti vengono utilizzati per memorizzare una collezione di dati ed entità più complesse. Li tratteremo nel capitolo <info:object> dopo avere appreso abbastanza sui tipi primitivi.

Il tipo `symbol` viene utilizzato per creare identificatori unici per gli oggetti. Li abbiamo citati per completezza, ma è meglio studiarli dopo aver compreso gli oggetti.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities. We'll deal with them later in the chapter <info:object> after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for completeness, but it's better to study this type after objects.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## L'operatore typeof [#type-typeof]

<<<<<<< HEAD
L'operatore `typeof` ritorna il tipo dell'argomento. E' utile quando vogliamo lavorare con valori di tipi differenti, o per eseguire controlli rapidi.
=======
The `typeof` operator returns the type of the argument. It's useful when we want to process values of different types differently or just want to do a quick check.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Sono supportate due sintassi:

<<<<<<< HEAD
1. Come operatore: `typeof x`.
2. Come funzione: `typeof(x)`.

In altre parole, funziona sia con le parentesi che senza. Il risultato è lo stesso.
=======
1. As an operator: `typeof x`.
2. As a function: `typeof(x)`.

In other words, it works with parentheses or without them. The result is the same.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Una chiamata a `typeof x` ritorna una stringa con il nome del tipo:

```js
typeof undefined // "undefined"

typeof 0 // "number"

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

<<<<<<< HEAD
Le ultime tre linee potrebbero richiedere una spiegazione ulteriore:

1. `Math` è un oggetto integrato che fornisce operazioni matematiche avanzate. Lo studieremo nel capitolo <info:number>. Qui ha il semplice scopo di rappresentare un oggetto.
2. Il risultato di `typerisulaof null` è `"object"`. Questo è errato. E' un errore ufficialmente riconosciuto del `typeof`, mantenuto per retro-compatibilità. Ovviamente, `null` non è un oggetto. E' un valore speciale che fa da tipo a se stesso. Quindi, nuovamente, questo è un errore del linguaggio.
3. Il risultato di `typeof alert` è `"function"`, perchè `alert` è una funzione del linguaggio. Studieremo le funzioni nel prossimo capitolo, e vedremo che non c'e nessun tipo "funzione" nel linguaggio. Le funzioni appartengono al tipo oggetto. Ma `typeof` le tratta differentemente. Formalmente, è errato, ma molto utile nella pratica.
=======
The last three lines may need additional explanation:

1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's wrong. It is an officially recognized error in `typeof`, kept for compatibility. Of course, `null` is not an object. It is a special value with a separate type of its own. So, again, this is an error in the language.
3. The result of `typeof alert` is `"function"`, because `alert` is a function of the language. We'll study functions in the next chapters where we'll see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently. Formally, it's incorrect, but very convenient in practice.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Riepilogo

Ci sono 7 tipi base in JavaScript.

- `number` per numeri di qualsiasi tipo: interi o in virgola mobile.
- `string` per stringhe. Una stringa può contenere uno o più caratteri, non esiste nessun tipo `character`.
- `boolean` per `true`/`false`.
- `null` per valori sconosciuti -- un valore a parte che contiene solo il valore `null`.
- `undefined` per valori non assegnati -- un tipo a parte che ha il solo valore `undefined`.
- `object` per strutture dati più complesse.
- `symbol` per identificatori unici.

L'operatore `typeof` ci consente di vedere quale tipo è memorizzato nella variabile.

<<<<<<< HEAD
- Due forme: `typeof x` o `typeof(x)`.
- Ritorna una stringa con il nome del tipo, come `"string"`.
- Il valore `null` ritorna `"object"` -- è un errore del linguaggio, infatti non è un oggetto.

Nel prossimo capitolo ci concentreremo nei tipi primitivi e quando avremo preso familiarità, passeremo agli oggetti.
=======
The `typeof` operator allows us to see which type is stored in a variable.

- Two forms: `typeof x` or `typeof(x)`.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.

In the next chapters, we'll concentrate on primitive values and once we're familiar with them, we'll move on to objects.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
