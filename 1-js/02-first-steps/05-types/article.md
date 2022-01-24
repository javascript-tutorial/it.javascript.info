# Tipi di dato

Un valore in JavaScript ha sempre un tipo specifico. Ad esempio, string o number.

Ci sono otto tipi di base in JavaScript. In questo articolo, vedremo i loro aspetti generali, mentre nei prossimi capitoli parleremo di ognuno di essi in maniera più dettagliata.

Una variabile in JavaScript può contenere qualsiasi dato. Quindi è possibile avere una variabile di tipo string ed in un secondo momento potrebbe contenere un valore numerico:

```js
// nessun errore
let message = "hello";
message = 123456;
```

I linguaggi di programmazione che lo consentono sono detti "dinamicamente tipati", questo significa che ci sono tipi di dato, ma le variabili non sono legate ad un tipo.

## Number

```js
let n = 123;
n = 12.345;
```

Il tipo *number* viene utilizzato sia per i numeri interi che per quelli in virgola mobile.

Con i valori di tipo number si hanno diverse operazioni a disposizione, ad esempio la moltiplicazione `*`, la divisione `/`, l'addizione `+`, la sottrazione `-` e molte altre.

Oltre a i normali valori numeri, esistono anche i "valori numerici speciali" che appartengono sempre al tipo numerico: `Infinity`, `-Infinity` e `NaN`.

- `Infinity` rappresenta il concetto matematico [Infinito](https://en.wikipedia.org/wiki/Infinity) ∞. E' un valore speciale che è più grande di qualsiasi altro numero.

    Possiamo ottenerlo come risultato tramite la divisione per zero:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    O inserendolo direttamente nel codice:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` rappresenta un errore di calcolo. E' il risultato di un'operazione non corretta o indefinita, ad esempio:

    ```js run
    alert( "not a number" / 2 ); // NaN, è una divisione errata
    ```

<<<<<<< HEAD
    `NaN` è "fisso". Qualsiasi operazione su `NaN` restituirà `NaN`:
=======
    `NaN` is sticky. Any further mathematical operation on `NaN` returns `NaN`:
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

<<<<<<< HEAD
    Quindi, se è presente un `NaN` da qualche parte nell'operazione matematica, questo si propagherà fino al risultato.
=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result (there's only one exception to that: `NaN ** 0` is `1`).
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

```smart header="Le operazioni matematiche sono sicure"
In JavaScript le operazioni matematiche sono sicure. Possiamo fare qualsiasi cosa: dividere per zero, trattare stringhe non numeriche come numeri, etc.

Lo script non si interromperà mai con un errore fatale. Nel peggiore dei casi otterremo un `NaN` come risultato.
```

I numeri con valore speciale appartengono formalmente al tipo "numerico". Ovviamente non sono numeri nel vero senso della parola.

Vedremo di più su come lavorare con i numeri nel capitolo <info:number>.

## BigInt [#bigint-type]

In JavaScript, il tipo "number" non può rappresentare valori interni più grandi di <code>(2<sup>53</sup>-1)</code> (che equivale a `9007199254740991`), o minori di <code>-(2<sup>53</sup>-1)</code>. Questa è una limitazione tecnica dovuta alla loro rappresentazione interna.

Per la maggior parte degli scopi, questo intervallo è sufficiente, ma in alcuni casi potremmo aver bisogno di numeri molto grandi, ad esempio per la crittografia o timestamp con precisione al microsecondo.

Il tipo `BigInt` è stato aggiunto di recente al linguaggio, e consente di rappresentare numeri interi di lunghezza arbitraria.

Un valore di tipo `BigInt` viene creato aggiungendo `n` alla fine del numero:

```js
// la "n" alla fine del numero indica che è un BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

Poiché i `BigInt` sono utilizzati raramente, non li analizzeremo in questo articolo, ma li vedremo più in dettaglio nel capitolo dedicato <info:bigint>.


```smart header="Problemi di compatibilità"
Attualmente, `BigInt` sono supportati da Firefox/Chrome/Edge/Safari, ma non da IE.
```

Potete sempre verificare [la tabella di compatibilità di *MDN* BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) per sapere quali versioni dei browser li supportano.

## String

Una stringa in JavaScript deve essere tra apici.

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

In JavaScript, ci sono 3 tipi di apici. 

1. Apici doppi: `"Hello"`.
2. Apice singolo: `'Hello'`.
3. Backtick: <code>&#96;Hello&#96;</code>.

Gli apici doppi e singoli sono apici "semplici". In JavaScript li tratta allo stesso modo.

Il backtick è un tipo di apice utilizzato per definire stringhe con "funzionalità estese". Ci consente di integrare variabili ed espressioni in una stringa racchiudendola tra `${…}`, per esempio:

```js run
let name = "John";

// variabile integrata
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// espressione integrata
alert( `the result is *!*${1 + 2}*/!*` ); // il risultato è 3
```

L'espressione all'interno di `${…}` viene valutata ed il risultato diventa parte della stringa. Possiamo metterci qualsiasi cosa: una variabile come `name` oppure un espressione aritmetica come `1 + 2` o qualcosa di più complesso.

Nota che questo è possibile sono tramite l'uso del backtick. Gli altri apici non lo consentono!
```js run
alert( "the result is ${1 + 2}" ); // il risultato è ${1 + 2} (le virgolette non fanno nulla)
```

Copriremo meglio le stringhe nel capitolo <info:string>.

```smart header="Non c'è il tipo *carattere*."
In alcuni linguaggi, c'è un tipo "carattere" per i caratteri singoli. Per esempio, nel linguaggio C ed in Java c'è `char`.

In JavaScript, non è presente questo tipo. C'è solamente il tipo: `string`, che può essere utilizzato per contenere un singolo carattere o più di uno.
```

## Tipo boolean (tipo logico)

Il tipo boolean ha solo due valori: `true` e `false`.

Questo tipo viene tipicamente utilizzato per memorizzare valori "si/no": `true` significa "Si, corretto", e `false` significa "No, scorretto".

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

E' solamente un valore speciale utilizzato per indicare il valore "nullo", "vuoto" o "valore sconosciuto".

Il codice sopra indica che `age` è sconosciuto o vuoto per qualche motivo.

## Il valore "undefined" 

Il valore speciale `undefined` è un tipo a se stante. Fa da tipo a se stesso, proprio come `null`.

Il significato di `undefined` è che "il valore non è assegnato".

Se una variabile viene dichiarata, ma non assegnata, il suo valore è esattamente `undefined`:

```js run
let age;

alert(age); // mostra "undefined"
```

Tecnicamente, è possibile assegnare `undefined` a qualsiasi variabile:

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

...Ma non è comunque consigliabile farlo. Normalmente, si utilizza `null` per descrivere un valore "vuoto" o "sconosciuto" della variabile, e `undefined` viene utilizzato solo per i controlli, per verificare se la variabile è stata assegnata.

## Object e Symbol

Il tipo `object` è un tipo speciale.

Tutti gli altri tipi descritti sono definiti "primitivi", perché i loro valori possono contenere solo una cosa (può essere una stringa, un numero o altro). Invece, gli oggetti vengono utilizzati per memorizzare una collezione di dati ed entità più complesse. Li tratteremo nel capitolo <info:object> dopo avere appreso abbastanza sui tipi primitivi.

Il tipo `symbol` viene utilizzato per creare identificatori unici per gli oggetti. Li abbiamo citati per completezza, ma è meglio studiarli dopo aver compreso gli oggetti.

## L'operatore typeof [#type-typeof]

L'operatore `typeof` ritorna il tipo dell'argomento. E' utile quando vogliamo lavorare con valori di tipi differenti, o per eseguire controlli rapidi.

Sono supportate due sintassi:

<<<<<<< HEAD
1. Come operatore: `typeof x`.
2. Come funzione: `typeof(x)`.

In altre parole, funziona sia con le parentesi che senza. Il risultato è lo stesso.

Una chiamata a `typeof x` ritorna una stringa con il nome del tipo:
=======
A call to `typeof x` returns a string with the type name:
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

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
2. Il risultato di `typeof null` è `"object"`. Questo è un errore del linguaggio, ufficialmente riconosciuto e mantenuto per retro-compatibilità. Ovviamente, `null` non è un oggetto. E' un valore speciale che fa da tipo a se stesso. Quindi, nuovamente, questo è un errore del linguaggio.
3. Il risultato di `typeof alert` è `"function"`, poiché `alert` è una funzione del linguaggio. Studieremo le funzioni nel prossimo capitolo, e vedremo che non c'e nessun tipo "funzione" nel linguaggio. Le funzioni appartengono al tipo oggetto. Ma `typeof` le tratta differentemente. Formalmente, è errato, ma molto utile nella pratica.

## Riepilogo
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Summary
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Ci sono 7 tipi base in JavaScript.

- `number` per numeri di qualsiasi tipo: interi o in virgola mobile.
- `bigint` viene utilizzato per definire interi di lunghezza arbitraria.
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
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Nel prossimo capitolo ci concentreremo nei tipi primitivi e quando avremo preso familiarità, passeremo agli oggetti.
